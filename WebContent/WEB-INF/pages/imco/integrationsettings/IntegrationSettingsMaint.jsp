<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:form useHiddenProps="true"
	id="integrationSettingsMaintFormId_${_pageRef}"
	namespace="/path/integrationSettings">
	<ps:hidden id="_pageRef" name="_pageRef" />
	<ps:hidden id="iv_crud_${_pageRef}" name="iv_crud" />
	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
	<table width="100%" cellpadding="0" cellspacing="0">
		<br>
		<tr>
			<td width="30%"></td>
			<td width="10%" class="fldDataEdit">
			<ps:hidden id="entity_code_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.ENTITY_CODE"></ps:hidden>
				
			</td>
			<td width="10%"></td>
			<td width="10%" class="fldDataEdit">
			<ps:hidden id="br_code_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.BR_CODE"></ps:hidden>
			</td>
			<td width="40%"></td>
		</tr>
		</table>
		<br>
		<table width="100%">
		<tr>
			<td width="10%" class="fldLabelView"><ps:label
					key="integration_settings_for_entity_key"
					id="integrationSettingsforentity_lbl_${_pageRef}"
					for="integrationSettingsforentity_${_pageRef}">
				</ps:label></td>
			<td width="10%" class="fldDataEdit"><ps:textfield
					id="integrationSettingsforentity_${_pageRef}" name="integrationSettingsCO.sync_entityVO.ENTITY_NAME" maxlength="40"></ps:textfield></td>
			<td width="10%"></td>
			<td width="5%" class="fldLabelView"><ps:label
					key="in_system_key" id="integrationSettingsinsys_lbl_${_pageRef}"
					for="integrationSettingsinsys_${_pageRef}">
				</ps:label></td>
			<td width="10%" class="fldDataEdit"><ps:textfield
					id="integrationSettingsinsys_${_pageRef}" name="integrationSettingsCO.sync_branchVO.DESCRIPTION" maxlength="100"></ps:textfield></td>
			<td width="55%"></td>
		</tr>

	</table>

	<table width="100%" cellpadding="0" cellspacing="0">
		<br>
		<tr>
			<ptt:toolBar id="integrationSettingsTool_${_pageRef}"></ptt:toolBar>
		</tr>
		<br>
	</table>
	<table width="100%">
		<tr>
			<td width="10%"><ps:label key="replication_type_key"
					id="replicationType_lbl_${_pageRef}"
					for="replicationType_${_pageRef}">
				</ps:label></td>
			<td width="10%"><ps:select list="replicaList"
					id="replica_${_pageRef}" parameter="replica_${_pageRef}"
					name="integrationSettingsCO.sync_entity_parametersblobVO.REPL_TYPE" listKey="code"
					listValue="descValue" emptyOption="false"></ps:select></td>

			<td width="5%"></td>
			<td width="10%"><ps:label key="external_system_key"
					id="extsys_lbl_${_pageRef}" for="extsys_${_pageRef}"></ps:label></td>
			<td width="5%"><psj:livesearch
					
					name="integrationSettingsCO.sync_entity_parametersblobVO.TO_BR"
					id="intsetbranchVO_BR_CODE_${_pageRef}"
					actionName="${pageContext.request.contextPath}/path/integrationSettings/SyncBranchLookupAction_constructSyncBranchLookup"
					searchElement="BR_CODE" autoSearch="false" mode="number"
					resultList="lookuptxt_intsetbranchVO_BR_CODE_${_pageRef}:BR_CODE" minValue="0"
					maxlength="4" readOnlyMode="${_recReadOnly}"
					parameter="integrationSettingsCO.sync_branchVO.BR_CODE:lookuptxt_intsetbranchVO_BR_CODE_${_pageRef}"
					dependency="lookuptxt_intsetbranchVO_BR_CODE_${_pageRef}:integrationSettingsCO.sync_branchVO.BR_CODE,intsetDescription_${_pageRef}:integrationSettingsCO.sync_branchVO.DESCRIPTION"
					dependencySrc="${pageContext.request.contextPath}/path/integrationSettings/IntegrationEventMgmtAction_onChangeCode">
				</psj:livesearch></td>
			<td width="10%"><ps:textfield
					name="integrationSettingsCO.sync_branchVO.DESCRIPTION"
					id="intsetDescription_${_pageRef}" readonly="true" /></td>

			<td width="2%"><ps:checkbox id="enable_ent_${_pageRef}"
					name="integrationSettingsCO.sync_entity_parametersblobVO.ENABLE_TRIGGER" valOpt="Y:N"></ps:checkbox></td>

			<td><ps:label key="enable_entity_key"
					id="enable_ent_lbl_${_pageRef}" for="enable_ent_${_pageRef}"></ps:label></td>
			<td width="48%"></td>
		</tr>
	</table>
	<table width="100%">
		<td width="40%">
			<fieldset>
				<legend><ps:text name="error_management_parameters_key"></ps:text>
				</legend>
				<table width="100%" >
					<tr>
						<td width="5%"><ps:label key="resend_error_every_key"
								id="resendError_lbl_${_pageRef}" for="resendError_${_pageRef}"></ps:label>
						</td>
						<td width="2%"><ps:textfield id="resendError_${_pageRef}" mode="number" minValue="0" name="integrationSettingsCO.sync_entity_parametersblobVO.ERR_PERIOD"></ps:textfield>
						</td>
						<td width="13%"><ps:select list="resendList"
								id="resend_${_pageRef}" parameter="resend_${_pageRef}"
								name="IntegrationSettingsCO.sync_entity_parametersblobVO.ERR_PERIOD_TYPE" listKey="code"
								listValue="descValue" emptyOption="false"></ps:select></td>
						<td width="8%"></td>
					</tr>
					<tr>
						<td width="10%"><ps:label key="stop_resending_after_key"
								id="stopAfter_lbl_${_pageRef}" for="stopAfter_${_pageRef}"></ps:label>
						</td>

						<td width="2%"><ps:textfield id="stopAfter_${_pageRef}" mode="number" minValue="0" name="integrationSettingsCO.sync_entity_parametersblobVO.ERR_STOP_AFTER"></ps:textfield>
						</td>
						<td><ps:label key="times_key" id="intsettime_lbl_${_pageRef}"></ps:label></td>
						<td width="20%"></td>
					</tr>
					<tr>
						<td width="40%"><ps:label key="suspend_error_key"
								id="suspendError_lbl_${_pageRef}" for="suspenError_${_pageRef}"></ps:label>
							<ps:checkbox id="integrationSettingschkbox_${_pageRef}"
								name="integrationSettingsCO.sync_entity_parametersblobVO.ERR_SUSPENDED" valOpt="Y:N"></ps:checkbox> <%--  <ps:checkbox id="integrationSettingschkBox_${_pageRef}" --%>
							<%--       name="newapiCO.imImalApiVO.SUSPENDED" cssClass="ui-widget-content checkboxheight" valOpt="1:0" ></ps:checkbox> --%>

						</td>
						<td width="10%"></td>
					</tr>
				</table>
		</td>
		<td width="40%">
			<fieldset>
				<legend><ps:text name="offline_replication_parameters_key"></ps:text></legend>
				<table width="100%">
				<tr>
						<td width="5%"><ps:label key="send_every_key"
								id="intsetsend_lbl_${_pageRef}" for="intsend_${_pageRef}"></ps:label>
						</td>
						<td width="2"><ps:textfield id="intsend_${_pageRef}" mode="number" minValue="0" name="integrationSettingsCO.sync_entity_parametersblobVO.PERIOD"></ps:textfield>
						</td>
						<td width="13%">
						<ps:select list="periodList"
								id="period_${_pageRef}" parameter="period_${_pageRef}"
								name="integrationSettingsCO.sync_entity_parametersblobVO.PERIOD_TYPE" listKey="code"
								listValue="descValue" emptyOption="false"></ps:select></td>
						<td width="8%"></td>
				</tr>
				<tr>	
						<td width="10%"><ps:label key="start_from_date_key"
								id="startdate_lbl_${_pageRef}" for="startdate_${_pageRef}"></ps:label>
						</td>
						<td width="10%"><psj:datepicker
								name="integrationSettingsCO.sync_entity_parametersblobVO.REPL_DATETIME"
								id="intsetrepl_Date_${_pageRef}" buttonImageOnly="true"
								readonly="${_nameAddressTabReadOnlyMode}"></psj:datepicker></td>
					    <td width="12%">
					</tr>
					
					<tr>
					<td width="10"><ps:label key="period_day_key"
							id="period_day_lbl_${_pageRef}" for="period_day_${_pageRef}"></ps:label>
					</td>
					<td width="2"><ps:textfield id="period_day_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.PERIOD_DAY" mode="number" minValue="0"></ps:textfield>
					</td>
					<td width="28%"></td>
					</tr>
				</table>
			</fieldset>
		</td>
		<td width="20%"></td>
	</table>
	</fieldset>
	<table width="100%">
		<tr>
			<td width="20%"><ps:label key="condition_for_integration_key"
					id="intsetcondn_integ_${_pageRef}"
					for="intsetcondn_integ_${_pageRef}">
				</ps:label></td>
		</tr>
		<tr>
			<td width="100%"><ps:textarea id="intsetcondn_integ_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.CRITERIA" maxlength="4000"></ps:textarea>
			</td>
		</tr>
	</table>
	<table width="100%">
		<tr>
			<td width="20%"><ps:label
					key="name_of_entity_in_external_system_key"
					id="intset_ext_sys_lbl_${_pageRef}"
					for="intset_ext_sys_${_pageRef}"></ps:label></td>
			<td width="20%"><ps:textfield id="intset_ext_sys_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.ENTITY_NAME" maxlength="40"></ps:textfield>
			</td>
			<td width="10%"></td>
			<td width="20%"><ps:label key="type_of_entity_key"
					id="entity_type_lbl_${_pageRef}" for="entity_type_${_pageRef}"></ps:label>
			</td>
			<td width="10%">
							<ps:select list="entityList"
								id="entity_${_pageRef}" parameter="entity_${_pageRef}"
								name="IntegrationSettingsCO.sync_entity_parametersblobVO.ENTITY_TYPE" listKey="code"
								listValue="descValue" emptyOption="false"></ps:select>
			</td>
			<td width="20%"></td>
		</tr>
		<tr>
			<td width="20%"></td>
			<td width="20%"></td>
			<td width="10%"></td>
			<td width="20%"><ps:label key="int_level_key"
					id="int_level_lbl_${_pageRef}" for="int_level_${_pageRef}">
				</ps:label></td>
			<td width="10%"><ps:textfield id="int_level_${_pageRef}" minValue="0" name="integrationSettingsCO.sync_entity_parametersblobVO.INT_LEVEL" maxlength="50"></ps:textfield>
			</td>
			<td width="20%"></td>
		</tr>
	</table>
	<table width="100%">
		<tr>
			<td width="20%"><ps:label key="request_api_code_key"
					id="request_api_lbl_${_pageRef}" for="request_api_${_pageRef}"></ps:label>
			</td>
			<td width="10%"><ps:textfield id="request_api_${_pageRef}"  mode="number" minValue="0" name="integrationSettingsCO.sync_entityVO.REQUEST_API_CODE" maxlength="4"></ps:textfield>
			</td>
			<td width="10%"></td>
			<td width="20%"><ps:label key="api_name_key"
					id="api_name_lbl_${_pageRef}" for="api_name_${_pageRef}"></ps:label>
			</td>
			<td width="10%"><ps:textfield id="api_name_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.SP_NAME" maxlength="40"></ps:textfield>
			</td>
			<td width="30%"></td>
		</tr>
		<tr>
			<td width="20%"><ps:label key="response_api_code_key"
					id="response_api_lbl_${_pageRef}" for="response_api_${_pageRef}"></ps:label>
			</td>
			<td width="10%"><ps:textfield id="response_api_${_pageRef}"  mode="number" minValue="0" name="integrationSettingsCO.sync_entityVO.RESPONSE_API_CODE" maxlength="4"></ps:textfield>
			</td>
			<td width="10%"></td>
			<td width="20%"><ps:label key="external_api_name_key"
					id="ext_api_lbl_${_pageRef}" for="ext_api_${_pageRef}"></ps:label>
			</td>
			<td width="10%"><ps:textfield id="ext_api_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.EXT_SP_NAME" maxlength="40"></ps:textfield>
			</td>
			<td width="30%"></td>
		</tr>
	</table>
	<br>
	<table width="100%">
		<tr>
			<td width="20%"><ps:label key="api_specifications_key"
					id="api_speci_lbl_${_pageRef}" for="api_speci_${_pageRef}" ></ps:label>
			</td>
		</tr>
		<tr>
		<td width="100%">
		<ps:textarea id="api_speci_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.SP_SPECIFICATIONS" maxlength="4000"></ps:textarea>
		</td>
		</tr>
		<tr>
		<td width="100%">
		<ps:textarea id="api_speci_${_pageRef}"  name="integrationSettingsCO.sync_entity_parametersblobVO.QUERY_SPECIFICATIONS" maxlength="4000"></ps:textarea>
		</td>
		</tr>
		<tr>
		<td width="100%">
		<ps:textarea id="api_speci1_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.QUERY_SPECIFICATIONS1" maxlength="4000"></ps:textarea>
		</td>
		</tr>
		<tr>
		<td width="100%">
		<ps:textarea id="api_speci2_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.QUERY_SPECIFICATIONS2" maxlength="4000"></ps:textarea>
		</td>
		</tr>
		<tr>
		<td width="100%">
		<ps:textarea id="api_speci3_${_pageRef}" name="integrationSettingsCO.sync_entity_parametersblobVO.QUERY_SPECIFICATIONS3" maxlength="4000"> </ps:textarea>
		</td>
		</tr>
	</table>
	<ptt:toolBar id="integrationSettingsMaintToolBar_${_pageRef}"
		hideInAlert="true">
			<psj:submit id="integrationSettingsMaint_save_${_pageRef}"
				button="true" freezeOnSubmit="true">
				<ps:label key="Save_key"
					for="integrationSettingsMaint_save_${_pageRef}" />
			</psj:submit>
			
	</ptt:toolBar>
</ps:form>
<script type="text/javascript">
	$(document).ready(
			function()
			{
				$("#integrationSettingsMaintFormId_" + _pageRef)
						.processAfterValid(
								"integrationSettingsMaint_processSubmit", []);
			});
</script>
