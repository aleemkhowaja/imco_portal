<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<script type="text/javascript">
	$.struts2_jquery.require("ChannelMaint.js", null, jQuery.contextPath
			+ "/path/js/imco/channel/");
</script>

<ps:hidden id='channelStatus_${_pageRef}' name='channelCO.imApiChannelsVO.STATUS'  />
<ps:set name="channelStatus_${_pageRef}"    value="channelCO.imApiChannelsVO.STATUS"/>
<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
<ps:set name="Duplicate_Value_var" 	 value="%{getEscText('Duplicate_Value_key')}"/>	
<ps:set name="at_least_one_host_is_required_var" 	 value="%{getEscText('at_least_one_host_is_required_key')}"/>	

<ps:form useHiddenProps="true" id="channelMaintFormId_${_pageRef}"
	namespace="/path/channel">
	<ps:hidden name="channelCO.updateMode" 	id="updateMode_hdn_${_pageRef}" />
	<ps:hidden id="DATE_UPDATED_${_pageRef}" name="channelCO.imApiChannelsVO.DATE_UPDATED" />	
	<div id="machineIDHeaderDiv_${_pageRef}" style="margin-bottom : 5px" title="<ps:text name="channel_details_key"/>">
		<table width="100%" cellpadding="2" cellspacing="2">
			<tr>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
				<td width="10%"></td>
			</tr>
			<tr>
				<td colspan="10">
					<br> 
				</td>
			</tr>
			<tr>
				<td colspan="1">
					<ps:label key="channel_id_key" for="channel_id_${_pageRef }" id="channel_id_lbl_${_pageRef}">
				</ps:label></td>
				<td colspan="1">
					<ps:textfield mode="number" id="channel_id_${_pageRef }"
						dependencySrc="${pageContext.request.contextPath}/path/channel/ChannelMaintAction_onChangeChannelID"
						parameter="channelCO.imApiChannelsVO.CHANNEL_ID:channel_id_${_pageRef }"
						dependency="channel_id_${_pageRef }:channelCO.imApiChannelsVO.CHANNEL_ID"
						name="channelCO.imApiChannelsVO.CHANNEL_ID" leadZeros="2"
						minValue="0" maxlength="2" required="true" tabindex="1">
					</ps:textfield>
				</td>
			  	<td colspan="6"></td>
			  	<td colspan="1">
					<ps:textfield name="channelCO.statusDesc"
						id="statusDesc_${_pageRef}" readonly="true"
						cssStyle="text-align:center">
					</ps:textfield>
				</td>
				  <td colspan="1">
				  	<psj:a button="true" href="#" buttonIcon="ui-icon-triangle-2-s"
						onclick="channel_onStatusClicked()">
						<ps:text name='status_key' />
					</psj:a>
				</td>
			</tr>
			<tr>			  
				<td colspan="1" width="13%;">
					<ps:label key="Description_key" for="Description_id_${_pageRef }"
						id="Description_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td colspan="5"><ps:textfield id="Description_id_${_pageRef }"
						name="channelCO.imApiChannelsVO.DESCRIPTION" maxlength="40"
						required="true" tabindex="2"></ps:textfield>
				</td>
			</tr>
			<tr>			  
				<td><ps:label key="communication_protocol_key" for="communicationProtocol_id_${_pageRef }" id="communicationProtocol_lbl_${_pageRef}"></ps:label></td>
				
				<td >
					<ps:select
						id="communicationProtocol_id_${_pageRef}"
					 	list="communicationProtocolList"  
					 	listKey="code" 
					 	listValue="descValue" 
					 	name="channelCO.imApiChannelsVO.COMMUNICATION_PROTOCOL"
						tabindex="3"
						onchange="channelMaint_onChangeCommuncationProtocol()" cssStyle="width:100%"
						dependencySrc="${pageContext.request.contextPath}/path/channel/ChannelMaintAction_fillServerTypeCombo"
						dependency="serverType_${_pageRef}:serverTypeList"
						parameter="criteria.communicationProtocol:communicationProtocol_id_${_pageRef}" />
				</td>
				
				<td nowrap="nowrap" align="right">
					<ps:label id="serverTypeLbl_${_pageRef}" key="server_type_key"
						for="type_${_pageRef}">
					</ps:label>
				</td>
				<td nowrap="nowrap">
					<ps:select id="serverType_${_pageRef}"
						name="channelCO.imApiChannelsVO.SERVER_TYPE" tabindex="4"
						list="serverTypeList" listKey="code" listValue="descValue"
						onchange="channelMaint_onChangeServerType();"
						cssStyle="width: 125px;"
						>
					</ps:select>
				</td>
				
				<%-- <td nowrap="nowrap" align="right">
					<ps:label id="serverTypeLbl_${_pageRef}" key="server_type_key" for="type_${_pageRef}" cssStyle="display:none;"></ps:label>
				</td>
				<td nowrap="nowrap">
					<ps:select id="serverType_${_pageRef}" name="atmInterfaceCO.iso_INTERFACESVO.TCP_TYPE" tabindex="3" list="tcpServerTypeList" 
							listKey="code" listValue="descValue"  onchange="channelMaint_onChangeServerType();" cssStyle="width: 125px; display:none;"> </ps:select>
				</td> --%>
				
			</tr>
			<tr id="networkDetails_${_pageRef }" style="display: none;">			  
				<td >
					<ps:label key="ip_address_key" for="ip_id_${_pageRef }"
						id="ip_lbl_${_pageRef}" cssClass="tcp_client">
					</ps:label>
				</td>
				<td colspan="1">
					<ps:textfield id="ip_id_${_pageRef }" name="channelCO.imApiChannelsVO.IP_ADDRESS"
						maxlength="40" required="false" cssStyle="width:100%"
						cssClass="tcp_client" tabindex="5">
					</ps:textfield>
				</td>
					
				<td align="right">
					<ps:label key="port_key" for="port_id_${_pageRef }"
						id="port_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td>
					<ps:textfield id="port_id_${_pageRef }" name="channelCO.imApiChannelsVO.PORT"
						maxlength="40" required="false" cssStyle="width:68%" tabindex="6">
					</ps:textfield>
				</td>
			</tr>
			<tr class="http_client" style="display: none">
				<td colspan="6">
					<fieldset>
						<legend><b><ps:text name='basic_authentication_credentials_key'/></b></legend>
						<table width="100%">
							<tr>
								<td width="10%"></td>
								<td width="9%"></td>
								<td width="10%"></td>
								<td width="10%"></td>
								<td width="10%"></td>
								<td width="10%"></td>
								<td width="10%"></td>
								<td width="10%"></td>
								<td width="10%"></td>
								<td width="10%"></td>
							</tr>
							<tr>
								<td colspan="2" nowrap="nowrap">
									<ps:label key="username_key" for="httpUsername_${_pageRef }"
										id="httpUsername_lbl_${_pageRef}">
									</ps:label>
								</td>
								<td colspan="3">
									<ps:textfield id="httpUsername_${_pageRef }"
										name="channelCO.imApiChannelsVO.HTTP_USER" maxlength="20"
										cssStyle="text-transform:uppercase" tabindex="5">
									</ps:textfield>
								</td>
								<td colspan="1" nowrap="nowrap">
									<ps:label key="password_key" for="httpPassword_${_pageRef }"
										id="httpPassword_lbl_${_pageRef}">
									</ps:label>
								</td>
								<td colspan="3">
									<ps:password style="height:20px" id="httpPassword_${_pageRef}"
										name="channelCO.imApiChannelsVO.HTTP_PASSWORD" value="" showPassword="true"
										maxlength="30" tabindex="6" mode="character"  />
								</td>
							</tr>
						</table>
					</fieldset>
				</td>
				
			</tr>
			<tr>			  
				<td>
					<ps:label key="interface_key" for="communicationFormat_id_${_pageRef }" id="communicationFormat_lbl_${_pageRef}"></ps:label>
				</td>
				<td >
					<psj:livesearch id="interface_id_${_pageRef}"
						name="channelCO.imApiChannelsVO.INTERFACE_CODE"
						actionName="${pageContext.request.contextPath}/path/channel/InterfaceLookupAction_constructInterfaceLookup"
						searchElement="TEMPLATE_ID" autoSearch="false" tabindex="11">
					</psj:livesearch>
				</td>
			</tr>
			<tr>
				<td nowrap="nowrap" >
					<ps:label id="lbl_activeJMS_${_pageRef}" key="activeQueue_key"
						for="activeJMS_${_pageRef}">
					</ps:label>
				</td>
				<td nowrap="nowrap">
					<ps:checkbox id="activeJMS_${_pageRef}" name="channelCO.imApiChannelsVO.ACTIVE_QUEUE_YN"
						valOpt="1:0" tabindex="8"
						onchange="channelMaint_onChangeActiveJMS();"  />
				</td>
				<td nowrap="nowrap" >
					<ps:label id="lbl_parallelismControl_${_pageRef}"
						key="parallelismControl_key" for="parallelismControl_${_pageRef}"
						cssStyle="display: none;">
					</ps:label>
				</td>
				<td nowrap="nowrap">
					<ps:textfield id="parallelismControl_${_pageRef }"
						name="channelCO.imApiChannelsVO.PARALLELISM_CONTROL" maxlength="40"
						required="false" mode="number" cssStyle="width:68%;display: none;" tabindex="9">
					</ps:textfield>
				</td>
			</tr>
			<tr id="usernameRow_${_pageRef }" >
				<td nowrap="nowrap" class="http_server">
					<ps:label key="User_Name_key" for="userId_${_pageRef }"
						id="userId_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td colspan="3" class="http_server">
					<ps:textfield id="userId_${_pageRef }"
						name="channelCO.imApiChannelsVO.USER_ID"
						onchange="channelMaint_emptyPass()"
						dependencySrc="${pageContext.request.contextPath}/path/channel/ChannelMaintAction_onChangeUserID"
						parameter="channelCO.imApiChannelsVO.USER_ID:userId_${_pageRef }"
						dependency="userId_${_pageRef }:channelCO.imApiChannelsVO.USER_ID"
						maxlength="20" required="true" cssStyle="text-transform:uppercase"
						afterDepEvent="channelMaint_regenerateNewToken" tabindex="10"></ps:textfield>
				</td>
				<td align="right" nowrap="nowrap" class="http_server">
					<ps:label key="Access By Services" for="template_id_${_pageRef }"
						id="template_id_lbl_${_pageRef}">
					</ps:label>
				</td>
				<td class="http_server">
					<ps:hidden id = "selTempId_${_pageRef}" name ="channelCO.jsonMultiselectArray"></ps:hidden>
					<psj:livesearch id="template_id_${_pageRef}"
						name="channelCO.imApiChannelsVO.TEMPLATE_ID"
						multiSelect="true" multiResultInput="selTempId_${_pageRef}"
						selectColumn="TEMPLATE_ID"
						actionName="${pageContext.request.contextPath}/path/channel/QueryLookupAction_constructQryLookup"
						searchElement="TEMPLATE_ID" autoSearch="false" tabindex="11">
					</psj:livesearch>
				</td>
			</tr>
			<tr class="communication_protocol_tcp" style="display: none;" >
				<td colspan="2" nowrap="nowrap">
					<ps:label
						id="lbl_restart_time_${_pageRef}"
						key="restart_socket_if_no_message_recieve_after_key"
						for="restart_time_${_pageRef}"></ps:label>
				</td>
				<td nowrap="nowrap">
					<ps:textfield
						id="restart_time_${_pageRef}"
						name="channelCO.imApiChannelsVO.SOCKET_RESTART_INTERVAL"
						tabindex="10" maxValue="60" mode="number">
					</ps:textfield>
				</td>
				<td nowrap="nowrap">
					<ps:label id="lbl_minutes_${_pageRef}"
						key="minutes_key"></ps:label>
				</td>
			</tr>
			
			<tr class="communication_protocol_http">
				<td colspan="1" nowrap="nowrap" >
					<ps:label
						id="request_time_out_lbl_${_pageRef}"
						key="request_time_out_key"
						for="request_time_out_${_pageRef}"></ps:label>
				</td>
				<td nowrap="nowrap" >
					<ps:textfield
						id="request_time_out_${_pageRef}"
						name="channelCO.imApiChannelsVO.HTTP_REQUEST_TIME_OUT"
						tabindex="10" maxValue="60" mode="number">
					</ps:textfield>
				</td>
				<td nowrap="nowrap">
					<ps:label id="lbl_minutes_${_pageRef}"
						key="minutes_key"></ps:label>
				</td>
			</tr>
		</table>
	
	</div>
	<br>
	<div id="machineIDGridrDiv_${_pageRef}" style="margin-bottom: 5px"
		title="<ps:text name="varification_details_key"/>" class="http_server">
		<ps:url id="urlchannelMachineId" escapeAmp="false"
			action="ChannelListAction_loadMachineIdGrid"
			namespace="/path/channel">
			<ps:param name="iv_crud" value="ivcrud_${_pageRef}"></ps:param>
			<ps:param name="_pageRef" value="_pageRef"></ps:param>
			<ps:param name="criteria.ChannelId"
				value="channelCO.imApiChannelsVO.CHANNEL_ID" />
		</ps:url>
		
		<psjg:grid id="channelMachineIdGridTbl_Id_${_pageRef}" caption=" "
			href="%{urlchannelMachineId}" editurl="%{urlchannelMachineId}"
			editinline="true" dataType="json" hiddengrid='' pager="true"
			sortable="true" filter="false" gridModel="gridModel" rowNum="20"
			rowList="20,25,50,75,100" viewrecords="true" navigator="true"
			navigatorDelete="true" navigatorEdit="false" navigatorRefresh="false"
			navigatorAdd="true" navigatorSearch="false"
			navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
			altRows="true" addfunc="addMachineIdRows(this)"
			delfunc="deleteMachineIdRows" shrinkToFit="true" height="225">

			<psjg:gridColumn id="imApiChannelsDetVO.HOST_NAME" colType="text"
				name="imApiChannelsDetVO.HOST_NAME"
				index="imApiChannelsDetVO.HOST_NAME" align="center"
				title="%{getText('host_name_key')}" sortable="true" search="true"
				required="true" editable="true"
				editoptions="{maxlength : 40,dataEvents: [{ type: 'change', fn: function(e) { channelMaint_generateKey()}}]}"
				width="30" />

			<psjg:gridColumn id="imApiChannelsDetVO.HASH_KEY" colType="text"
				name="imApiChannelsDetVO.HASH_KEY"
				index="imApiChannelsDetVO.HASH_KEY" title="%{getText('hash_key')}"
				editable="false" sortable="true" search="true" maxValue="128"
				width="70" />

		</psjg:grid>
	</div>
	<!-- 		</td>
	</tr>	
	</table> -->
	<div>
	<ptt:toolBar id="channelMaintToolBar_${_pageRef}" hideInAlert="true">
		<ps:if test='%{#ivcrud_${_pageRef}=="R"}'>
			<ps:if test='%{#channelStatus_${_pageRef}==null || #channelStatus_${_pageRef}=="A"}'>
					<psj:submit id="channelMaint_save_${_pageRef}" button="true"
						tabindex="12" freezeOnSubmit="true">
						<ps:label key="Save_key" for="channelMaint_save_${_pageRef}" />
					</psj:submit>
				</ps:if>
			<ps:if test='%{#channelStatus_${_pageRef}=="A"}'>
					<psj:submit id="channelMaint_del_${_pageRef}" button="true"
						onclick="channelMaint_processDelete()" freezeOnSubmit="true"
						tabindex="13" type="button">
						<ps:text name="Delete_key"></ps:text>
					</psj:submit>
				</ps:if>
		</ps:if>	
		<ps:if test='%{#ivcrud_${_pageRef}=="P"}'>
				<psj:submit id="channelMaint_approve_${_pageRef}" button="true" tabindex="14"
					freezeOnSubmit="true" onclick="channelMaint_processApprove()">
					<ps:label key="approve_key" for="channelMaint_approve_${_pageRef}" />
				</psj:submit>
			</ps:if>
		<ps:if test='%{#ivcrud_${_pageRef}=="J"}'>
				<psj:submit id="channelMaint_reject_${_pageRef}" button="true" tabindex="15"
					freezeOnSubmit="true" onclick="channelMaint_processReject()">
					<ps:label key="reject_key" for="channelMaint_reject_${_pageRef}" />
				</psj:submit>
			</ps:if>
		<ps:if test='%{#ivcrud_${_pageRef}=="UP"}'>
				<psj:submit id="channelMaint_UpdateAfterApprove_${_pageRef}" tabindex="16"
					button="true" freezeOnSubmit="true">
					<ps:label key="update_key"
						for="channelMaint_UpdateAfterApprove_${_pageRef}" />
				</psj:submit>
			</ps:if>
		<ps:if test='%{#ivcrud_${_pageRef}=="S"}'>
				<psj:submit id="channelMaint_Suspend_${_pageRef}" button="true" tabindex="17"
					freezeOnSubmit="true" onclick="channelMaint_processSuspend()">
					<ps:label key="suspend_key" for="channelMaint_Suspend_${_pageRef}" />
				</psj:submit>
			</ps:if>
		<ps:if test='%{#ivcrud_${_pageRef}=="RA"}'>
				<psj:submit id="channelMaint_Reactivate_${_pageRef}" button="true" tabindex="18"
					freezeOnSubmit="true" onclick="channelMaint_processReactivate()">
					<ps:label key="reactivate_key"
						for="channelMaint_Reactivate_${_pageRef}" />
				</psj:submit>
			</ps:if>
	</ptt:toolBar>
	</div>
	<ps:hidden name="updates" id="updateMachineIdParameter_${_pageRef}"></ps:hidden>
</ps:form>
<script type="text/javascript">
	var Duplicate_Value_key = "${Duplicate_Value_var}";
	var at_least_one_host_is_required_key = "${at_least_one_host_is_required_var}";
	$(document).ready(
			function() {
				$("#channelMaintFormId_" + _pageRef).processAfterValid(
						"channelMaint_processSubmit", {});
			});
	$("#machineIDHeaderDiv_" + _pageRef).collapsiblePanel();
	$("#machineIDGridrDiv_" + _pageRef).collapsiblePanel();
</script>