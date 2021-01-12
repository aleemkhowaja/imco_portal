<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<ps:hidden id="_pageRef" name="_pageRef" />
<ps:hidden id="iv_crud" name="iv_crud" />

<ps:url id="urlintegrationSettingsListGrid" escapeAmp="false" action="IntegrationSettingsListAction_loadIntegrationSettingsGrid" namespace="/path/integrationSettings">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<psjg:grid
	id               ="integrationSettingsListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlintegrationSettingsListGrid}"
    dataType         ="json"
    hiddengrid       ="false"
	pager            ="true"
	sortable         ="true"
	filter           ="true"
	gridModel        ="gridModel"
	rowNum           ="5"
	rowList          ="5,10,15,20"
    viewrecords      ="true"
    navigator        ="true"
    navigatorDelete  ="false"
    navigatorEdit    ="false"
    navigatorRefresh ="false"
    navigatorAdd     ="false"
    navigatorSearch  ="true"
    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
    altRows          ="true"
    ondblclick       ="integrationSettingsList_onDbClickedEvent()"
    addfunc          ="integrationSettingsList_onAddClicked"
    shrinkToFit      ="false" height="125">
     
    <psjg:gridColumn id="sync_entity_parametersblobVO.BR_CODE" colType="number" name="sync_entity_parametersblobVO.BR_CODE" index="sync_entity_parametersblobVO.BR_CODE" title="%{getText('br_code_key')}" editable="false" sortable="true" search="true" hidden="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.ENTITY_CODE" colType="number" name="sync_entity_parametersblobVO.ENTITY_CODE" index="sync_entity_parametersblobVO.ENTITY_CODE" title="%{getText('entity_code_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.TO_BR"  colType="number" name="sync_entity_parametersblobVO.TO_BR" index="sync_entity_parametersblobVO.TO_BR" title="%{getText('To_Branch_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.REPL_TYPE" colType="number" name="sync_entity_parametersblobVO.REPL_TYPE" index="sync_entity_parametersblobVO.REPL_TYPE" title="%{getText('replication_type_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.REPL_DATETIME" colType="date" name="sync_entity_parametersblobVO.REPL_DATETIME" index="sync_entity_parametersblobVO.REPL_DATETIME" title="%{getText('repl_datetime_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.PERIOD" colType="number" name="sync_entity_parametersblobVO.PERIOD" index="sync_entity_parametersblobVO.PERIOD" title="%{getText('period_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.PERIOD_TYPE" colType="text" name="sync_entity_parametersblobVO.PERIOD_TYPE" index="sync_entity_parametersblobVO.PERIOD_TYPE" title="%{getText('period_type_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.WHO_WINS" hidden="true"	colType="text" name="sync_entity_parametersblobVO.WHO_WINS" index="sync_entity_parametersblobVO.WHO_WINS" title="%{getText('who_wins_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.ENABLE_TRIGGER" colType="text" name="sync_entity_parametersblobVO.ENABLE_TRIGGER" index="sync_entity_parametersblobVO.ENABLE_TRIGGER" title="%{getText('enable_entity_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.SYS_REPLICATION" 	hidden="true"	colType="text" name="sync_entity_parametersblobVO.SYS_REPLICATION" index="sync_entity_parametersblobVO.SYS_REPLICATION" title="%{getText('sys_replication_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.ERR_SUSPENDED" colType="text" name="sync_entity_parametersblobVO.ERR_SUSPENDED" index="sync_entity_parametersblobVO.ERR_SUSPENDED" title="%{getText('err_suspend_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.ERR_PERIOD" colType="number" name="sync_entity_parametersblobVO.ERR_PERIOD" index="sync_entity_parametersblobVO.ERR_PERIOD" title="%{getText('err_period_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.ERR_PERIOD_TYPE" colType="text" name="sync_entity_parametersblobVO.ERR_PERIOD_TYPE" index="sync_entity_parametersblobVO.ERR_PERIOD_TYPE" title="%{getText('err_period_type_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.ERR_STOP_AFTER" colType="number" name="sync_entity_parametersblobVO.ERR_STOP_AFTER" index="sync_entity_parametersblobVO.ERR_STOP_AFTER" title="%{getText('err_stop_after_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.PERIOD_DAY" colType="number" name="sync_entity_parametersblobVO.PERIOD_DAY" index="sync_entity_parametersblobVO.PERIOD_DAY" title="%{getText('period_day_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entityVO.ENTITY.NAME" colType="text" name="sync_entityVO.ENTITY_NAME" index="sync_entityVO.ENTITY_NAME" hidden="true" title="%{getText('entity_name_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.ENTITY_NAME" colType="text" name="sync_entity_parametersblobVO.ENTITY_NAME" index="sync_entity_parametersblobVO.ENTITY_NAME" title="%{getText('entity_name_key')}" editable="false" sortable="true" search="true" />   
    <psjg:gridColumn id="sync_branchVO.DESCRIPTION" colType="text" name="sync_branchVO.DESCRIPTION" index="sync_branchVO.DESCRIPTION" title="%{getText('description_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.REPL_INSERT" hidden="true" colType="number" name="sync_entity_parametersblobVO.REPL_INSERT" index="sync_entity_parametersblobVO.REPL_INSERT" title="%{getText('repl_insert_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.REPL_UPDATE" hidden="true" colType="number" name="sync_entity_parametersblobVO.REPL_UPDATE" index="sync_entity_parametersblobVO.REPL_UPDATE" title="%{getText('repl_update_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.REPL_DELETE" hidden="true" colType="number" name="sync_entity_parametersblobVO.REPL_DELETE" index="sync_entity_parametersblobVO.REPL_DELETE" title="%{getText('repl_delete_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="relativeBr" hidden="true" colType="text" name="RELATIVE_BR" index="RELATIVE_BR" title="%{getText('relative_br_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.SP_NAME" colType="text" name="sync_entity_parametersblobVO.SP_NAME" index="sync_entity_parametersblobVO.SP_NAME" title="%{getText('api_name_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.ENTITY_TYPE" colType="text" name="sync_entity_parametersblobVO.ENTITY_TYPE" index="sync_entity_parametersblobVO.ENTITY_TYPE" title="%{getText('entity_type_key')}" editable="false" sortable="true" search="true" />
   	<psjg:gridColumn id="sync_entity_parametersblobVO.INT_LEVEL" colType="text" name="sync_entity_parametersblobVO.INT_LEVEL" index="sync_entity_parametersblobVO.INT_LEVEL" title="%{getText('int_level_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entity_parametersblobVO.EXT_SP_NAME" colType="text" name="sync_entity_parametersblobVO.EXT_SP_NAME" index="sync_entity_parametersblobVO.EXT_SP_NAME" title="%{getText('external_api_name_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entityVO.REQUEST_API_CODE" colType="number" name="sync_entityVO.REQUEST_API_CODE" index="sync_entityVO.REQUEST_API_CODE" title="%{getText('request_api_code_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="sync_entityVO.RESPONSE_API_CODE" colType="number" name="sync_entityVO.RESPONSE_API_CODE" index="sync_entityVO.RESPONSE_API_CODE" title="%{getText('response_api_code_key')}" editable="false" sortable="true" search="true" />
     	
</psjg:grid>
<div id="integrationSettingsListMaintDiv_id_${_pageRef}" style="width:100%; display:none;" class="DSS">
   <ps:if test='iv_crud == "R"'>   
      <%@include file="IntegrationSettingsMaint.jsp"%>
   </ps:if>     
</div>
<script  type="text/javascript">
	$.struts2_jquery.require(
			"IntegrationSettingsList.js,IntegrationSettingsMaint.js", null,
			jQuery.contextPath + "/path/js/imco/integrationsettings/");
	$(
			"#gview_integrationSettingsListGridTbl_Id_" + _pageRef
					+ " div.ui-jqgrid-titlebar").hide();
</script>