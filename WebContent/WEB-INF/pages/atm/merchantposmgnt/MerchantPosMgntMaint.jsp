<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>


<ps:form id="merchantPosMgntMaintFormId_${_pageRef}" useHiddenProps="true" namespace="/path/merchantposmgnt">
	
	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
	<ps:hidden id="crud_${_pageRef}" name="iv_crud"></ps:hidden>
	<ps:hidden id="merchantPosMethodName_${_pageRef}" />
	<ps:hidden id="dateUpdated_${_pageRef}" name="ctsMerchantPosVO.DATE_UPDATED" />
	<ps:hidden id="TODO_ALERT_REFRESH_DATA_${_pageRef}" name="merchantPosMgntCO.alertsParamCO.shouldRefreshAlert"/>
			
	<div id="posdetails_<ps:property value="_pageRef" escapeHtml="true"/>" class="connectedSortable ui-helper-reset">
		<div id="posdetailsInner_<ps:property value="_pageRef" escapeHtml="true"/>" class="collapsibleContainer" title="<ps:text name='Pos_details_key'/>">
			<table width="100%" cellpadding="2" cellspacing="1">
				<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr>
				<tr>
					<td style="width: 1%"></td>
					<td style="width: 10%"></td>
					<td style="width: 25%"></td>
					<td style="width: 10%"></td>
					<td style="width: 25%"></td>
					<td class="fldLabelView"  style="width:20%; text-align:right" >
						<ps:label key="status_key" for="status_${_pageRef}" id="lbl_statusId_${_pageRef}" />
					</td>
					<td style="width:10%;">
						<ps:hidden id="statusId_${_pageRef}" name="merchantPosMgntCO.ctsMerchantPosVO.STATUS"></ps:hidden>
						<ps:textfield id="status_${_pageRef}" name="merchantPosMgntCO.statusDesc" readonly="true" 
							cssStyle="width:100px;text-align:center!important" />
					</td>
					<td style="width:20%;text-align:right" >
						 <psj:a button="true" buttonIcon="ui-icon-triangle-2-s" onclick="merchantPosMgnt_onStatusClicked()">
							<ps:text name='status_key' />
						</psj:a>
					</td>
					<td  style="width: 10%"></td>
					<td  style="width: 25%"></td>
					<td  style="width: 10%"></td>
				</tr>
			</table>
			<table width="100%" cellpadding="2" cellspacing="1" id="pos_form_table_<ps:property value="_pageRef" escapeHtml="true"/>">
				<tr>
					<td nowrap="nowrap" width="5%">
						<ps:label key="Code_key" for="code_${_pageRef}" id="lbl_code_${_pageRef}" />
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="code_${_pageRef}" name="merchantPosMgntCO.ctsMerchantPosVO.CODE" mode="number" nbFormat="######" readonly="true" />
					</td><td></td><td width="60%"></td>
				</tr>
				<tr>
					<td nowrap="nowrap" width="5%">
						<ps:label key="Merchant_key" id="lbl_merchantCode_${_pageRef}" for="lookuptxt_merchantCode_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<psj:livesearch id="merchantCode_${_pageRef}"
							name="merchantPosMgntCO.ctsMerchantPosVO.MERCHANT_CODE"
							maxlength="6" mode="number" required="true"
							actionName="${pageContext.request.contextPath}/pathdesktop/merchantLookup_constructMerchantCodeLookup"
							searchElement="CODE" paramList=""
							resultList="CODE:lookuptxt_merchantCode_${_pageRef}"
							parameter="merchantPosMgntCO.ctsMerchantPosVO.MERCHANT_CODE:lookuptxt_merchantCode_${_pageRef}"
							dependencySrc="${pageContext.request.contextPath}/path/merchantposmgnt/MerchantPosMgntMaint_dependencyByMerchantCode"
							dependency="lookuptxt_merchantCode_${_pageRef}:merchantPosMgntCO.ctsMerchantPosVO.MERCHANT_CODE,merchantCodeDesc_${_pageRef}:merchantPosMgntCO.merchantCodeDesc">
						</psj:livesearch>
					</td>
					<td nowrap="nowrap">
						<ps:textfield id="merchantCodeDesc_${_pageRef}" name="merchantPosMgntCO.merchantCodeDesc" readonly="true" />
					</td><td width="60%"></td>
				</tr>
				<tr>
					<td nowrap="nowrap" width="5%">
						<ps:label key="Pos_desc_key" id="lbl_posDescId_${_pageRef}" for="posDescId_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap" colspan="2">
						<ps:textfield id="posDescId_${_pageRef}" required="true" name="merchantPosMgntCO.ctsMerchantPosVO.POS_DESC" maxlength="60"/>
					</td><td width="60%"></td>
				</tr>
				<tr>
					<td nowrap="nowrap" width="5%">
						<ps:label key="Pos_type_key" id="lbl_posTypeId_${_pageRef}" for="posTypeId_${_pageRef}"></ps:label>
					</td>
					<td width="20%" colspan="2">
						<ps:select id="posTypeId_${_pageRef}" required="true"
							name="merchantPosMgntCO.ctsMerchantPosVO.POS_TYPE" 
							emptyOption="true" list="posTypeList" listKey="code" listValue="descValue">
						</ps:select>
					</td><td width="60%"></td>
				</tr>
				<tr>
					<td nowrap="nowrap" width="5%">
						<ps:label key="Terminal_Id_key" id="lbl_terminalId_${_pageRef}" for="lookuptxt_terminalId_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<psj:livesearch id="terminalId_${_pageRef}"
							name="merchantPosMgntCO.ctsMerchantPosVO.TERMINAL_ID" maxlength="16"
							actionName="${pageContext.request.contextPath}/pathdesktop/servicesLookup_constructTerminalIDLookup"
							resultList="ATM_T_ID:lookuptxt_terminalId_${_pageRef}" paramList=""
							searchElement="SERVICE_CODE"
							parameter="merchantPosMgntCO.ctsMerchantPosVO.TERMINAL_ID:lookuptxt_terminalId_${_pageRef},merchantPosMgntCO.ctsMerchantPosVO.CODE:code_${_pageRef}"
							dependencySrc="${pageContext.request.contextPath}/path/merchantposmgnt/MerchantPosMgntMaint_dependencyByTerminalId"
							dependency="lookuptxt_terminalId_${_pageRef}:merchantPosMgntCO.ctsMerchantPosVO.TERMINAL_ID">
						</psj:livesearch>
					</td><td></td><td width="60%"></td>
				</tr>
				<tr>
					<td nowrap="nowrap" width="5%">
						<ps:label key="Ins_date_key" id="lbl_installationDateId_${_pageRef}" for="installationDateId_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap">
						<psj:datepicker id="installationDateId_${_pageRef}"
							name="merchantPosMgntCO.ctsMerchantPosVO.INSTALLATION_DATE"
							buttonImageOnly="true"
							parameter="merchantPosMgntCO.ctsMerchantPosVO.INSTALLATION_DATE:installationDateId_${_pageRef}"
							dependencySrc="${pageContext.request.contextPath}/path/merchantposmgnt/MerchantPosMgntMaint_dependencyByInstallationDate"
							dependency="installationDateId_${_pageRef}:merchantPosMgntCO.ctsMerchantPosVO.INSTALLATION_DATE" />
					</td><td></td><td width="60%"></td>
				</tr>
				<tr>
					<td nowrap="nowrap" width="5%">
						<ps:label key="remarks_key" for="statusRemark_${_pageRef}"></ps:label>
					</td>
					<td nowrap="nowrap" colspan="2">	
						<ps:textarea id="statusRemark_${_pageRef}" name="merchantPosMgntCO.ctsMerchantPosVO.STATUS_REMARK" rows="5" maxlength="255" > </ps:textarea>
					</td><td width="60%"></td>
				</tr>
			</table>
		</div>
	</div>
	<div id="addressdetails_<ps:property value="_pageRef" escapeHtml="true"/>" class="connectedSortable ui-helper-reset" style="margin-top: 5px;">
		<div id="addressdetailsInner_<ps:property value="_pageRef" escapeHtml="true"/>" class="collapsibleContainer" title="<ps:text name='address_contact_det'/>">
			<div id="fom_MoreAddressDivContent_${_pageRef}">
				<%-- <%@include file="../../businesscommon/address/MoreAddressDetail.jsp"%> --%>
			</div>
		</div>
	</div>
		
	<ptt:toolBar id="merchantPosMgntToolBar_${_pageRef}" hideInAlert="true">
		<ps:if
			test='%{#ivcrud_${_pageRef}=="R" && (merchantPosMgntCO.ctsMerchantPosVO.STATUS=="A" || merchantPosMgntCO.ctsMerchantPosVO.STATUS==null)}'>
			<psj:submit id="merchantPosMgnt_save_${_pageRef}" button="true" freezeOnSubmit="true"  buttonIcon="ui-icon-disk"
				onclick="merchantPosMgnt_setMethodName('saveNew')" >
				<ps:label key="btn.save" for="merchantPosMgnt_save_${_pageRef}" />
			</psj:submit>
			<ps:if
				test='%{merchantPosMgntCO!=null&&merchantPosMgntCO.ctsMerchantPosVO!=null&&merchantPosMgntCO.ctsMerchantPosVO.CODE!=null}'>
				<psj:submit id="merchantPosMgnt_delete_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-trash"
				          onclick="merchantPosMgnt_setMethodName('delete')" >
					<ps:label key="btn.del" for="merchantPosMgnt_delete_${_pageRef}" />
				</psj:submit>
			</ps:if>
		</ps:if>
		<ps:if
			test='%{merchantPosMgntCO!=null&&merchantPosMgntCO.ctsMerchantPosVO!=null&&merchantPosMgntCO.ctsMerchantPosVO.CODE!=null}'>
			<ps:if test='%{#ivcrud_${_pageRef}=="P"}'>
				<psj:submit id="merchantPosMgnt_approve_${_pageRef}" button="true" freezeOnSubmit="true" 
				            onclick="merchantPosMgnt_setMethodName('approve')" progRef="POS00P">
					<ps:label key="Approve_key" for="merchantPosMgnt_approve_${_pageRef}" />
				</psj:submit>
			</ps:if>
			<ps:if test='%{#ivcrud_${_pageRef}=="UP"}'>
				<psj:submit id="merchantPosMgnt_updateAfterApprove_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-disk"
				         onclick="merchantPosMgnt_setMethodName('saveNew')" progRef="POS00UP">
					<ps:label key="Update_After_Approve_key" for="merchantPosMgnt_updateAfterApprove_${_pageRef}" />
				</psj:submit>
			</ps:if>
			<ps:if test='%{#ivcrud_${_pageRef}=="K"}'>
				<psj:submit id="merchantPosMgnt_toCancel_${_pageRef}" button="true" freezeOnSubmit="true" 
				           onclick="merchantPosMgnt_setMethodName('toCancel')" progRef="POS00K">
					<ps:label key="toCancel_key" for="merchantPosMgnt_toCancel_${_pageRef}" />
				</psj:submit>
			</ps:if>
			<ps:if test='%{#ivcrud_${_pageRef}=="N"}'>
				<psj:submit id="merchantPosMgnt_cancel_${_pageRef}" button="true" freezeOnSubmit="true" 
				                 onclick="merchantPosMgnt_setMethodName('cancel')" progRef="POS00N">
					<ps:label key="Cancel_key" for="merchantPosMgnt_cancel_${_pageRef}"/>
				</psj:submit>
			</ps:if>
		</ps:if>
	</ptt:toolBar>
</ps:form>

<style>
	.disableRequiredDropDown{
		background: #E1E1E1 !important;
		border: 1px solid #999999 !important;
		-webkit-box-shadow: inset 0 0 2px red;
		color: #3C3C3C !important;
	}
</style>

<script type="text/javascript">
	$.struts2_jquery.require("MerchantPosMgntMaint.js", null, jQuery.contextPath + "/path/js/atm/merchantposmgnt/posmgnt/");
	$("#merchantPosMgntMaintFormId_" + _pageRef).processAfterValid("merchantPosMgnt_BtnFunc", []);
	$("div#posdetails_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
	$("div#addressdetails_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
	
	var checkDisable = $("#_recReadOnly_"+_pageRef).val();
	if(checkDisable == "true")
	{
		$("#posTypeId_"+_pageRef).addClass('disableRequiredDropDown');
		$("#posTypeId_"+_pageRef).attr('tabindex', '-1');
	}
</script>
