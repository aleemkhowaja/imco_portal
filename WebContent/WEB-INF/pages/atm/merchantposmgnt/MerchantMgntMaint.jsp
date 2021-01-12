<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<ps:form id="merchantMgntDefFormId_${_pageRef}" useHiddenProps="true" namespace="/path/merchantMgnt">
<ps:set name="ivcrud_${_pageRef}"  value="iv_crud"/>
<ps:hidden id="crud_${_pageRef}" name="iv_crud"></ps:hidden>
<ps:hidden id="methodName_${_pageRef}"/>
<ps:hidden id="DATE_UPDATED_${_pageRef}" 	name="merchantMgntCO.ctsMerchantVO.DATE_UPDATED" />
<ps:hidden id="DATE_CREATED_${_pageRef}" 	name="merchantMgntCO.ctsMerchantVO.DATE_CREATED" />
<ps:hidden id="CREATED_BY_${_pageRef}"   	name="merchantMgntCO.ctsMerchantVO.CREATED_BY" />
<ps:hidden id="DATE_APPROVED_${_pageRef}" 	name="merchantMgntCO.ctsMerchantVO.DATE_APPROVED" />
<ps:hidden id="APPROVED_BY_${_pageRef}" 	name="merchantMgntCO.ctsMerchantVO.APPROVED_BY" />
<ps:hidden id="DATE_MODIFIED_${_pageRef}" 	name="merchantMgntCO.ctsMerchantVO.DATE_MODIFIED" />
<ps:hidden id="MODIFIED_BY_${_pageRef}" 	name="merchantMgntCO.ctsMerchantVO.MODIFIED_BY" />
<ps:hidden id="DATE_TOBE_CANCELED_${_pageRef}" 	name="merchantMgntCO.ctsMerchantVO.DATE_TOBE_CANCELED" />

<table width="100%" cellpadding="2" cellspacing="1">
	<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
	<tr>
		<td style="width: 1%"></td>
		<td style="width: 10%"></td>
		<td style="width: 25%"></td>
		<td style="width: 10%"></td>
		<td style="width: 25%"></td>
		<td class="fldLabelView"  style="width:20%; text-align:right" >
			<ps:label key="status_key" for="status_${_pageRef}" id="lbl_statusId_${_pageRef}"/>	
		</td>
		<td style="width:10%;">
			<ps:hidden id="statusId_${_pageRef}"  name="merchantMgntCO.ctsMerchantVO.STATUS"></ps:hidden>
			<ps:textfield id="status_${_pageRef}" name="merchantMgntCO.statusDesc" readonly="true"
				cssStyle="width:100px;text-align:center!important" />
		</td>
		<td style="width:20%;text-align:right" >
			 <psj:a button="true" buttonIcon="ui-icon-triangle-2-s" onclick="merchantMgnt_onStatusClicked()"><ps:text name='status_key'/></psj:a>
		</td>
		<td  style="width: 10%"></td>
		<td  style="width: 25%"></td>
		<td  style="width: 10%"></td>
	</tr>
</table>

<table width="100%" cellpadding="2" cellspacing="1" id="merchant_form_table_<ps:property value="_pageRef" escapeHtml="true"/>">
	<tr>
		<td nowrap="nowrap" width="5%">
			<ps:label key="Code_key" for="code_${_pageRef}" id="lbl_code_${_pageRef}" />
		</td>
		<td nowrap="nowrap">
			<table>
				<tr>
					<td nowrap="nowrap">
						<ps:textfield id="code_${_pageRef}" name="merchantMgntCO.ctsMerchantVO.CODE" mode="number"
							nbFormat="######" readonly="true" cssStyle="width:100px"/>
					</td>
					<td nowrap="nowrap" align="right" >
						<ps:label key="ContractNum_key" for="contractnum_${_pageRef}" id="lbl_contractnum_${_pageRef}" />					
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="contractnum_${_pageRef}" name="merchantMgntCO.ctsMerchantVO.CONTRACT_NUM" mode="text" 
						cssStyle="width:130px"  readonly="true" />	
					</td>
				</tr>
			</table>
		</td><td width="60%"></td><td></td>
	</tr>
	<tr>
		<td nowrap="nowrap" width="5%">
			<ps:label key="Type_key"  id="lbl_type" for="merchantType_${_pageRef}" />
		</td>		
		<td nowrap="nowrap">
			<ps:select id="merchantType_${_pageRef}" name="merchantMgntCO.ctsMerchantVO.MERCHANT_TYPE" list="typeList" listKey="code" 
				listValue="descValue" cssStyle="width:60%;" parameter="merchantMgntCO.ctsMerchantVO.MERCHANT_TYPE:merchantType_${_pageRef}"
				dependencySrc="${pageContext.request.contextPath}/path/merchantposmgnt/MerchantMgntMaint_dependencyOnMerchantType"
			    dependency="merchantType_${_pageRef}:merchantMgntCO.ctsMerchantVO.MERCHANT_TYPE">
			</ps:select>
		</td>
		<td nowrap="nowrap">
			<ps:checkbox name="merchantMgntCO.ctsMerchantVO.BLOCK_MERCHANT_POS_YN" valOpt="1:0" id="blockMerchantPos_${_pageRef}" />
			<ps:label key="block_merchant_key" for="blockMerchantPos_${_pageRef}" />
		</td>
		<td width="60%"></td>
	</tr>
	<tr>
		<td nowrap="nowrap" width="5%">
			<ps:label key="acc_no_key" id="lbl_account_${_pageRef}" for="acc_br_${_pageRef}"></ps:label>
		</td>		
		<td  nowrap="nowrap" >
			<ps:account
				id="merchantAccount_${_pageRef}"
				inputIds      ="acc_br_${_pageRef}~acc_cy_${_pageRef}~acc_gl_${_pageRef}~acc_cif_${_pageRef}~acc_sl_${_pageRef}~acc_addRef_${_pageRef}"
				inputNames    ="merchantMgntCO.ctsMerchantVO.ACC_BR~merchantMgntCO.ctsMerchantVO.ACC_CY~merchantMgntCO.ctsMerchantVO.ACC_GL~merchantMgntCO.ctsMerchantVO.ACC_CIF~merchantMgntCO.ctsMerchantVO.ACC_SL~merchantMgntCO.ctsMerchantVO.ACC_ADDITIONAL_REF"
				accountLabel  ="" 
				inputSizes    ="50~50~60~90~50~N"
				readOnly      ="${_recReadOnly}~${_recReadOnly}~${_recReadOnly}~${_recReadOnly}~${_recReadOnly}~${_recReadOnly}"
				mode          ="number~number~number~number~livesearch~livesearch"
				rowLocation   ="1~1~1~1~1~2" 
				colSpan       ="1~1~1~1~1~5" 
                parameter     ="N~N~N
							   ~ctsMerchantVO.ACC_BR:acc_br_${_pageRef},ctsMerchantVO.ACC_CY:acc_cy_${_pageRef},ctsMerchantVO.ACC_GL:acc_gl_${_pageRef},ctsMerchantVO.ACC_CIF:acc_cif_${_pageRef}
							   ~ctsMerchantVO.ACC_BR:acc_br_${_pageRef},ctsMerchantVO.ACC_CY:acc_cy_${_pageRef},ctsMerchantVO.ACC_GL:acc_gl_${_pageRef},ctsMerchantVO.ACC_CIF:acc_cif_${_pageRef},merchantMgntCO.ctsMerchantVO.ACC_SL:lookuptxt_acc_sl_${_pageRef}
							   ~ctsMerchantVO.ACC_BR:acc_br_${_pageRef},ctsMerchantVO.ACC_CY:acc_cy_${_pageRef},ctsMerchantVO.ACC_GL:acc_gl_${_pageRef},ctsMerchantVO.ACC_CIF:acc_cif_${_pageRef},merchantMgntCO.ctsMerchantVO.ACC_SL:lookuptxt_acc_sl_${_pageRef}, merchantMgntCO.ctsMerchantVO.ACC_ADDITIONAL_REF:lookuptxt_acc_addRef_${_pageRef}"
                dependencySrc ="N~N~N
                				~${pageContext.request.contextPath}/path/merchantposmgnt/MerchantMgntMaint_dependencyByAccCIF?colName=acc_cif
                   				~${pageContext.request.contextPath}/path/merchantposmgnt/MerchantMgntMaint_dependencyByAccSL?colName=acc_sl
                   				~${pageContext.request.contextPath}/path/merchantposmgnt/MerchantMgntMaint_dependencyByAddRef"
                dependency    ="N~N~N
                   				~acc_cif_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_CIF,acc_br_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_BR,acc_cy_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_CY,acc_gl_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_GL,lookuptxt_acc_sl_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_SL,lookuptxt_acc_addRef_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_ADDITIONAL_REF
                   				~lookuptxt_acc_sl_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_SL,acc_br_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_BR,acc_cy_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_CY,acc_gl_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_GL,acc_cif_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_CIF,lookuptxt_acc_addRef_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_ADDITIONAL_REF
                   				~lookuptxt_acc_addRef_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_ADDITIONAL_REF,acc_cif_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_CIF,acc_br_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_BR,acc_cy_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_CY,acc_gl_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_GL,lookuptxt_acc_sl_${_pageRef}:merchantMgntCO.ctsMerchantVO.ACC_SL"
                paramList     ="N~N~N~N~criteria.branchCode:acc_br_${_pageRef},criteria.currencyCode:acc_cy_${_pageRef},criteria.glCode:acc_gl_${_pageRef},criteria.cifCode:acc_cif_${_pageRef},criteria.columnId:acc_col_${_pageRef},_pageRef:pageRef_${_pageRef}
                   				~criteria.branchCode:acc_br_${_pageRef},criteria.currencyCode:acc_cy_${_pageRef},criteria.glCode:acc_gl_${_pageRef},criteria.cifCode:acc_cif_${_pageRef},criteria.slNbr:lookuptxt_acc_sl_${_pageRef},criteria.columnId:acc_col_${_pageRef},_pageRef:pageRef_${_pageRef}"
                actionName    ="N~N~N~N~${pageContext.request.contextPath}/pathdesktop/AccountLookup_constructLookup
                				~${pageContext.request.contextPath}/pathdesktop/AccountLookup_constructLookup" 
                searchElement ="N~N~N~N~amfVO.SL_NO~amfVO.ADDITIONAL_REFERENCE"  
                onOk          ="N~N~N~N~merchantMgnt_setAccountData()~merchantMgnt_setAccountDataRef()"
                autoSearch    ="N~N~N~N~false~false"  >
        	</ps:account>
		</td>
		<td nowrap="nowrap">
			<psj:a id="cifNew_${_pageRef}" button="true" buttonIcon="ui-icon-triangle-2-s" onclick="merchantMgnt_onCIFDetailsClicked()">
				<ps:text name="%{getText('CIF_Details_key')}"></ps:text>
			</psj:a>
		</td>
		<td width="60%"></td>
	</tr>
	<tr>
		<td nowrap="nowrap" width="5%">
			<ps:label key="Contact_Type_key"  id="lbl_contact_type" for="contact_type_${_pageRef}" />
		</td>		
		<td nowrap="nowrap">
			<ps:select id="contact_type_${_pageRef}" name="merchantMgntCO.ctsMerchantVO.CONTACT_TYPE" 
					list="contactTypeList" listKey="code" listValue="descValue" cssStyle="width:60%;">
			</ps:select>
		</td>
		<td width="60%"></td><td></td>
	</tr>
	<ps:hidden id="ctsMerchantVO_SHOW_IN_POS_${_pageRef}" value="1"></ps:hidden>
	<tr>
		<td nowrap="nowrap" width="5%">
			<ps:label key="Economic_Sector_key" id="lbl_ECO_SECTOR_CODE_${_pageRef}" for="lookuptxt_ECO_SECTOR_CODE_${_pageRef}"/>
		</td>	
		<td nowrap="nowrap">
			<table>
				<tr>
					<td>
						<psj:livesearch id="ECO_SECTOR_CODE_${_pageRef}" name="merchantMgntCO.ctsMerchantVO.ECO_SECTOR_CODE"
				         actionName="${pageContext.request.contextPath}/pathdesktop/EconomicSector_constructEconomicSectorLookupAddRef"
				         paramList="showInPos:ctsMerchantVO_SHOW_IN_POS_${_pageRef}"
				         resultList="SECTOR_CODE:lookuptxt_ctsMerchantVO_ECO_SECTOR_${_pageRef}"	
				         searchElement="SECTOR_CODE"  autoSearch="false" size="10" mode="number" maxlength="4"
				         dependencySrc="${pageContext.request.contextPath}/pathdesktop/EconomicSectorDependencyAction_dependencyBySectorCode"
				         dependency="merchantMgntCO_ecoSectorsDesc_${_pageRef}:ecoSectorsVO.BRIEF_DESC_ENG
				                     ,lookuptxt_ECO_SECTOR_CODE_${_pageRef}:ecoSectorsVO.SECTOR_CODE
				                     ,ctsMerchantVO_MAX_AMOUNT_${_pageRef}:ecoSectorsVO.LIMIT"
				         parameter="showInPos:ctsMerchantVO_SHOW_IN_POS_${_pageRef},sectorCode:lookuptxt_ECO_SECTOR_CODE_${_pageRef}"
				       />
					</td>
					<td width="75%">
						<ps:textfield name="merchantMgntCO.ecoSectorDesc" id="merchantMgntCO_ecoSectorsDesc_${_pageRef}" disabled="true"/>
					</td>
				</tr>
			</table>
		</td>
		<td width="60%"></td><td></td>
	</tr>
	<tr>
		<td width="5%" nowrap="nowrap">
			<ps:label key="Max_Amount_key"  id="lbl_Max_Amount_${_pageRef}" for="ctsMerchantVO_MAX_AMOUNT_${_pageRef}"/>
		</td>		
		<td nowrap="nowrap" >
			<ps:textfield id="ctsMerchantVO_MAX_AMOUNT_${_pageRef}"  name="merchantMgntCO.ctsMerchantVO.MAX_AMOUNT"
			 	nbFormat="base" mode="number" cssStyle="width:60%;" maxlength="20" minValue="0"/>	
		</td>
		<td width="60%"></td><td></td>
	</tr>
	<tr>
		<td width="5%" nowrap="nowrap">
			<ps:label key="remarks_key" for="statusRemark_${_pageRef}" id="lbl_statusRemarkId_${_pageRef}"/>
		</td>		
		<td nowrap="nowrap">
			<ps:textarea id="statusRemark_${_pageRef}" name="merchantMgntCO.ctsMerchantVO.STATUS_REMARK"  rows="5" />
		</td>
		<td width="60%"></td><td></td>
	</tr>
</table>

<ptt:toolBar id="merchantMgntToolBar_${_pageRef}" hideInAlert="true">
	<ps:if
		test='%{#ivcrud_${_pageRef}=="R" && (merchantMgntCO.ctsMerchantVO.STATUS=="A" || merchantMgntCO.ctsMerchantVO.STATUS==null)}'>
		<psj:submit id="merchantmgnt_save_${_pageRef}" button="true" buttonIcon="ui-icon-disk"
			freezeOnSubmit="true" onclick="merchantMgnt_setMethodName('saveNew')">
			<ps:label key="btn.save" for="merchantmgnt_save_${_pageRef}" />
		</psj:submit>

		<!-- menuOptionsHm: used to validate user access privilege  to  -->
		<ps:if
			test='%{merchantMgntCO!=null&&merchantMgntCO.ctsMerchantVO!=null&&merchantMgntCO.ctsMerchantVO.CODE!=null}'>
			<psj:submit id="merchantmgnt_delete_${_pageRef}" button="true" buttonIcon="ui-icon-trash"
				freezeOnSubmit="true" onclick="merchantMgnt_setMethodName('delete')">
				<ps:label key="btn.del" for="merchantmgnt_delete_${_pageRef}" />
			</psj:submit>
		</ps:if>
	</ps:if>

	<ps:if
		test='%{merchantMgntCO!=null&&merchantMgntCO.ctsMerchantVO!=null&&merchantMgntCO.ctsMerchantVO.CODE!=null}'>
		<ps:if test='%{#ivcrud_${_pageRef}=="P"}'>
			<psj:submit id="merchantmgnt_approve_${_pageRef}" button="true"
				freezeOnSubmit="true" progRef="${menuOptionsHm[iv_crud]}" onclick="merchantMgnt_setMethodName('approve')">
				<ps:label key="Approve_key" for="merchantmgnt_approve_${_pageRef}" />
			</psj:submit>
		</ps:if>

		<ps:if test='%{#ivcrud_${_pageRef}=="UP"}'>
			<psj:submit id="merchantmgnt_updateAfterApprove_${_pageRef}" buttonIcon="ui-icon-disk"
				button="true" freezeOnSubmit="true" progRef="${menuOptionsHm[iv_crud]}" onclick="merchantMgnt_setMethodName('saveNew')">
				<ps:label key="Update_After_Approve_key" for="merchantmgnt_updateAfterApprove_${_pageRef}" />
			</psj:submit>
		</ps:if>

		<ps:if test='%{#ivcrud_${_pageRef}=="K"}'>
			<psj:submit id="merchantmgnt_toCancel_${_pageRef}" button="true"
				freezeOnSubmit="true" progRef="${menuOptionsHm[iv_crud]}" onclick="merchantMgnt_setMethodName('toCancel')">
				<ps:label key="toCancel_key" for="merchantmgnt_toCancel_${_pageRef}" />
			</psj:submit>
		</ps:if>

		<ps:if test='%{#ivcrud_${_pageRef}=="N"}'>
			<psj:submit id="merchantmgnt_cancel_${_pageRef}" button="true"
				freezeOnSubmit="true" progRef="${menuOptionsHm[iv_crud]}" onclick="merchantMgnt_setMethodName('cancel')">
				<ps:label key="Cancel_key" for="merchantmgnt_cancel_${_pageRef}" />
			</psj:submit>
		</ps:if>
	</ps:if>
</ptt:toolBar>
</ps:form>

<style>
	.disableDropDown{
		background: #E1E1E1 !important;
		border: 1px solid #999999 !important;
		color: #3C3C3C !important;
	}
</style>

<script type="text/javascript">
	$.struts2_jquery.require("MerchantMgntMaint.js" ,null,jQuery.contextPath+"/path/js/atm/merchantposmgnt/merchantmgnt/");	
    $("#merchantMgntDefFormId_"+_pageRef).processAfterValid("merchantMgnt_BtnFunc",[]);
    
    var checkDisable = $("#_recReadOnly_"+_pageRef).val();
	if(checkDisable == "true")
	{
		$("#merchantType_"+_pageRef).addClass('disableDropDown');
		$("#merchantType_"+_pageRef).attr('tabindex', '-1');
		
		$("#contact_type_"+_pageRef).addClass('disableDropDown');
		$("#contact_type_"+_pageRef).attr('tabindex', '-1');
	}
</script>

