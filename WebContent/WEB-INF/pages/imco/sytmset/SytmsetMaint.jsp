
<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:form useHiddenProps="true" id="sytmsetMaintFormId_${_pageRef}"
	namespace="/path/sytmset">
	<ps:hidden name="sytmsetCO.updateMode" id="updateMode_hdn_${_pageRef}" />
	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />


	<fieldset class="ui-widget-content ui-corner-all">

		<table table style="width: 100%">
			<tr>
				<td width="25%">
					<center>
						<psj:submit id="sytmsetMaint_pingNetwork_${_pageRef}"
							button="true" onclick="sytmsetMaint_pingNetwork()"
							freezeOnSubmit="true" type="button">
							<ps:text name="ping_network_key"></ps:text>
						</psj:submit>
					</center>
				</td>

				<td width="25%">
					<center>
						<psj:submit id="sytmsetMaint_pingDatabasee_${_pageRef}"
							button="true" onclick="sytmsetMaint_pingDatabase()"
							freezeOnSubmit="true" type="button">
							<ps:text name="ping_database_key"></ps:text>
						</psj:submit>
					</center>

				</td>
				<td width="25%">
					<center>
						<psj:submit id="sytmsetMaint_pingSendCartridge_${_pageRef}"
							button="true" onclick="sytmsetMaint_pingSendCartridge()"
							freezeOnSubmit="true" type="button">
							<ps:text name="ping_sendcartridge_key"></ps:text>
						</psj:submit>
					</center>

				</td>
				<td width="25%">
					<center>
						<psj:submit id="sytmsetMaint_pingReciveCartridge_${_pageRef}"
							button="true" onclick="sytmsetMaint_pingReciveCartridge()"
							freezeOnSubmit="true" type="button">
							<ps:text name="ping_recivecartridge_key"></ps:text>
						</psj:submit>
					</center>

				</td>



			</tr>




		</table>
		<table style="width: 100%">
			<tr>
				<td width="15%"></td>
				<td width="35%"></td>
				<td width="15%"></td>
				<td width="35%"></td>
			</tr>
			<tr>
				<%-- 			<psj:submit id="sytmsetMaint_pingnetwork_${_pageRef}" button="true" --%>
				<%-- 				buttonIcon="ui-button-icon-primary ui-icon ui-icon-disk" --%>
				<%-- 				freezeOnSubmit="true"> --%>
				<%-- 				<ps:label key="pingnetwork_key" for="sytmsetMaint_pingnetwork_${_pageRef}" /> --%>
				<%-- 			</psj:submit> --%>



			</tr>
			<tr>
				<!-- 				<td width="1%"></td> -->

				<td class="fldLabelView"><ps:label key="systemcode_key"
						id="sytmsetMaintcode_lbl_${_pageRef}"
						for="sytmsetMaintcode_${_pageRef}"></ps:label></td>

				<td><ps:textfield id="sytmsetMaintcode_${_pageRef}"
						mode="number" maxlength="6"
						dependency="sytmsetMaintcode_${_pageRef}:sytmsetCO.syncBranchVO.BR_CODE"
						readonly="true"
						leadZeros="4"
						parameter="sytmsetCO.syncBranchVO.BR_CODE:sytmsetMaintcode_${_pageRef}"
						name="sytmsetCO.syncBranchVO.BR_CODE"></ps:textfield></td>

				<td class="fldLabelView"><ps:label key="description_key"
						id="sytmsetMaintdesc_lbl_${_pageRef}"
						for="sytmsetMaintdesc_${_pageRef}"></ps:label></td>

				<td><ps:textfield id="sytmsetMaintdesc_${_pageRef}"
						 maxlength="6"
						dependency="sytmsetMaintdesc_${_pageRef}:sytmsetCO.syncBranchVO.DESCRIPTION"
						readonly="true"
						parameter="sytmsetCO.syncBranchVO.DESCRIPTION:sytmsetMaintdesc_${_pageRef}"
						name="sytmsetCO.syncBranchVO.DESCRIPTION"></ps:textfield></td>

			</tr>


			<tr>

				<td class="fldLabelView"><ps:label key="network_ip_address_key"
						id="sytmsetMaintnet_lbl_${_pageRef}"
						for="sytmsetMaintnet_${_pageRef}"></ps:label></td>

				<td><ps:textfield id="sytmsetMaintnet_${_pageRef}"
						 maxlength="60"
						dependency="sytmsetMaintnet_${_pageRef}:sytmsetCO.syncBranchVO.IP_ADDRESS"
						parameter="sytmsetCO.syncBranchVO.IP_ADDRESS:sytmsetMaintnet_${_pageRef}"
						name="sytmsetCO.syncBranchVO.IP_ADDRESS"></ps:textfield></td>


				<td class="fldLabelView"><ps:label
						key="database_service_name_key"
						id="sytmsetMaintdata_lbl_${_pageRef}"
						for="sytmsetMaintdata_${_pageRef}"></ps:label></td>

				<td><ps:textfield id="sytmsetMaintdata_${_pageRef}"
						 maxlength="60"
						dependency="sytmsetMaintdata_${_pageRef}:sytmsetCO.syncBranchVO.SERVICE_NAME"
						parameter="sytmsetCO.syncBranchVO.SERVICE_NAME:sytmsetMaintdata_${_pageRef}"
						name="sytmsetCO.syncBranchVO.SERVICE_NAME"></ps:textfield></td>

			</tr>
		</table>
	</fieldset>

	<!-- 	</table> -->

	<fieldset class="ui-widget-content ui-corner-all">
		<table style="width: 100%;">
			<tr>

				<td width="50%"></td>
				<td width="50%"></td>
			</tr>
			<tr>
				<td colspan="2" align="left"><ps:label
						key="In case of disconnection send emails to the following
							email addresses"
						id="pendingOnlineSalaryBlockingHeader_${_pageRef}"
						cssStyle="font-weight:bold!important;text-align:center;font-size:125%!important" /></td>

			</tr>
			<tr>
				<td colspan="2">
					<table style="width: 100%;">
						<tr>
							<td width="5%"></td>
							<td width="45%"></td>
							<td width="5%"></td>
							<td width="45%"></td>
						</tr>
						<tr>
							<td class="fldLabelView"><ps:label
									id="sytmsetMaintFormId1_lbl_${_pageRef}"
									for="sytmsetMaintFormId1_${_pageRef}"></ps:label> 1</td>
							<td><ps:textfield id="sytmsetMaintFormId1_${_pageRef}"
									 maxlength="250"
									dependency="sytmsetMaintFormId1_${_pageRef}:sytmsetCO.syncBranchVO.EMAIL1"
									parameter="sytmsetCO.syncBranchVO.EMAIL1:sytmsetMaintFormId1_${_pageRef}"
									name="sytmsetCO.syncBranchVO.EMAIL1"></ps:textfield></td>
							<td class="fldLabelView"><ps:label
									id="sytmsetMaintFormId2_lbl_${_pageRef}"
									for="sytmsetMaintFormId2_${_pageRef}"></ps:label>2</td>
							<td><ps:textfield id="sytmsetMaintFormId2_${_pageRef}"
									 maxlength="250"
									dependency="sytmsetMaintFormId2_${_pageRef}:sytmsetCO.syncBranchVO.EMAIL2"
									parameter="sytmsetCO.syncBranchVO.EMAIL2:sytmsetMaintFormId2_${_pageRef}"
									name="sytmsetCO.syncBranchVO.EMAIL2"></ps:textfield></td>


						</tr>

						<tr>
							<td class="fldLabelView"><ps:label
									id="sytmsetMaintFormId3_lbl_${_pageRef}"
									for="sytmsetMaintFormId3_${_pageRef}"></ps:label> 3</td>
							<td><ps:textfield id="sytmsetMaintFormId3_${_pageRef}"
									 maxlength="250"
									dependency="sytmsetMaintFormId3_${_pageRef}:sytmsetCO.syncBranchVO.EMAIL3"
									parameter="sytmsetCO.syncBranchVO.EMAIL3:sytmsetMaintFormId3_${_pageRef}"
									name="sytmsetCO.syncBranchVO.EMAIL3"></ps:textfield></td>
							<td class="fldLabelView"><ps:label
									id="sytmsetMaintFormId4_lbl_${_pageRef}"
									for="sytmsetMaintFormId4_${_pageRef}"></ps:label>4</td>
							<td><ps:textfield id="sytmsetMaintFormId4_${_pageRef}"
									maxlength="250"
									dependency="sytmsetMaintFormId4_${_pageRef}:sytmsetCO.syncBranchVO.EMAIL4"
									parameter="sytmsetCO.syncBranchVO.EMAIL4:sytmsetMaintFormId4_${_pageRef}"
									name="sytmsetCO.syncBranchVO.EMAIL4"></ps:textfield></td>

						</tr>
						<tr>
							<td class="fldLabelView"><ps:label
									id="sytmsetMaintFormId5_lbl_${_pageRef}"
									for="sytmsetMaintFormId5_${_pageRef}"></ps:label> 5</td>
							<td><ps:textfield id="sytmsetMaintFormId5_${_pageRef}"
									 maxlength="250"
									dependency="sytmsetMaintFormId5_${_pageRef}:sytmsetCO.syncBranchVO.EMAIL5"
									parameter="sytmsetCO.syncBranchVO.EMAIL5:sytmsetMaintFormId5_${_pageRef}"
									name="sytmsetCO.syncBranchVO.EMAIL5"></ps:textfield></td>


						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<table style="width: 100%;">
						<tr>
							<td width="15%"></td>
							<td width="85%"></td>
						</tr>
						<tr>
							<td class="fldLabelView"><ps:label key="email_subject_key"
									id="sytmsetMaintemail_lbl_${_pageRef}"
									for="sytmsetMaintemail_${_pageRef}"></ps:label></td>
							<td style="width: 100%;"><ps:textfield
									id="sytmsetMaintemail_${_pageRef}"  maxlength="250"
									dependency="sytmsetMaintemail_${_pageRef}:sytmsetCO.syncBranchVO.SUBJECT"
									parameter="sytmsetCO.syncBranchVO.SUBJECT:sytmsetMaintemail_${_pageRef}"
									name="sytmsetCO.syncBranchVO.SUBJECT"></ps:textfield></td>
						</tr>

						<tr>
							<td class="fldLabelView"><ps:label key="email_message_key"
									id="sytmsetMaintemail_lbl_${_pageRef}"
									for="sytmsetMaintemail_${_pageRef}"></ps:label></td>
							<td width="25%"><ps:textarea
									id="sytmsetMaintmessage_${_pageRef}" 
									maxlength="4000"
									dependency="sytmsetMaintmessage_${_pageRef}:sytmsetCO.syncBranchVO.MESSAGE1"
									parameter="sytmsetCO.syncBranchVO.MESSAGE1:sytmsetMaintmessage_${_pageRef}"
									name="sytmsetCO.syncBranchVO.MESSAGE1"></ps:textarea></td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		</td>
		</tr>
		</table>
	</fieldset>
	<ptt:toolBar id="sytmsetMaintToolBar_${_pageRef}" hideInAlert="true">
		<ps:if test='%{#ivcrud_${_pageRef}=="R"}'>
			<psj:submit id="sytmsetMaint_save_${_pageRef}" button="true"
				buttonIcon="ui-button-icon-primary ui-icon ui-icon-disk"
				freezeOnSubmit="true">
				<ps:label key="Save_key" for="newApiMaint_save_${_pageRef}" />
			</psj:submit>
			<%-- 			<ps:if test='%{XXXXXX!="false"}'> --%>
			<%-- 				<psj:submit id="sytmsetMaint_del_${_pageRef}" button="true" --%>
			<%-- 					freezeOnSubmit="true" onclick="sytmsetMaint_processDelete()"> --%>
			<%-- 					<ps:label key="Delete_key" for="sytmsetMaint_del_${_pageRef}" /> --%>
			<%-- 				</psj:submit> --%>
			<%-- 			</ps:if> --%>
		</ps:if>
	</ptt:toolBar>
</ps:form>
<script type="text/javascript">
	$(document).ready(
			function()
			{
				$.struts2_jquery.require("SytmsetMaint.js", null,
						jQuery.contextPath + "/path/js/imco/sytmset/");
				$("#sytmsetMaintFormId_" + _pageRef).processAfterValid(
						"sytmsetMaint_processSubmit", {});
			});
</script>