<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<ps:hidden id="ivcrud_${_pageRef}" name="iv_crud" ></ps:hidden>
<ps:url id="urlentitiesListGrid" escapeAmp="false" action="EntitiesListAction_loadEntitiesGrid" namespace="/path/entities">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<psjg:grid
	id               ="entitiesListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlentitiesListGrid}"
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
    ondblclick       ="entitiesList_onDbClickedEvent()"
    addfunc          ="entitiesList_onAddClicked"
    shrinkToFit      ="false" height="125">
     
    <psjg:gridColumn id="syncEntityVO.ENTITY_CODE" colType="number" name="syncEntityVO.ENTITY_CODE" index="syncEntityVO.ENTITY_CODE" title="%{getText('entity_code_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncEntityVO.ENTITY_NAME" colType="text" name="syncEntityVO.ENTITY_NAME" index="syncEntityVO.ENTITY_NAME" title="%{getText('entity_name_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncEntityVO.DESCRIPTION" colType="text" name="syncEntityVO.DESCRIPTION" index="syncEntityVO.DESCRIPTION" title="%{getText('description_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncEntityVO.BR_FIELD_NAME" colType="text" name="syncEntityVO.BR_FIELD_NAME" index="syncEntityVO.BR_FIELD_NAME" title="%{getText('br_field_name_key')}" editable="false" sortable="true" search="true" hidden="true"/>
    <psjg:gridColumn id="syncEntityVO.REQUEST_API_CODE" colType="number" name="syncEntityVO.REQUEST_API_CODE" index="syncEntityVO.REQUEST_API_CODE" title="%{getText('request_api_code_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncEntityVO.RESPONSE_API_CODE" colType="number" name="syncEntityVO.RESPONSE_API_CODE" index="syncEntityVO.RESPONSE_API_CODE" title="%{getText('response_api_code_key')}" editable="false" sortable="true" search="true" />
     	
</psjg:grid>
<div id="entitiesListMaintDiv_id_${_pageRef}" style="width:100%;display: none;" class="lllll">
   <ps:if test='iv_crud == "R"'>   
      <%@include file="EntitiesMaint.jsp"%>
   </ps:if>     
</div>
<script  type="text/javascript">
    $.struts2_jquery.require("EntitiesList.js" ,null,jQuery.contextPath+"/path/js/imco/entities/");
    $("#gview_entitiesListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>