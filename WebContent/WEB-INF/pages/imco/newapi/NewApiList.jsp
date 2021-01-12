<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<ps:hidden id="ivcrud_${_pageRef}" name="iv_crud" ></ps:hidden>
<ps:url id="urlnewApiListGrid" escapeAmp="false" action="NewApiListAction_loadNewApiGrid" namespace="/path/newApi">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>

</ps:url>
<psjg:grid
	id               ="newApiListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlnewApiListGrid}"
    dataType         ="json"
    hiddengrid       ='%{iv_crud== "R"}'
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
    ondblclick       ="newApiList_onDbClickedEvent()"
    addfunc          ="newApiList_onAddClicked"
    shrinkToFit      ="false" height="125">
     
    <psjg:gridColumn id="imImalApiVO.API_CODE" colType="number" name="imImalApiVO.API_CODE" index="imImalApiVO.API_CODE" title="%{getText('api_code_key')}" editable="false" sortable="true" search="true" />
    
    <psjg:gridColumn id="imImalApiVO.DESCRIPTION" colType="text" name="imImalApiVO.DESCRIPTION" index="imImalApiVO.DESCRIPTION" title="%{getText('description_key')}" editable="false" sortable="true" search="true" />
    
    <psjg:gridColumn id="imImalApiVO.PROCEDURE_NAME" colType="text" name="imImalApiVO.PROCEDURE_NAME" index="imImalApiVO.PROCEDURE_NAME" title="%{getText('procedure_name_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="imImalApiVO.WB_SERVICE_NAME" colType="text" name="imImalApiVO.WB_SERVICE_NAME" index="imImalApiVO.WB_SERVICE_NAME" title="%{getText('web_service_name_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="imImalApiVO.SUSPENDED" colType="number" name="imImalApiVO.SUSPENDED" index="imImalApiVO.SUSPENDED" title="%{getText('suspended_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="imImalApiVO.RELATED_APP" colType="text" name="imImalApiVO.RELATED_APP" index="imImalApiVO.RELATED_APP" title="%{getText('related_app_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="imImalApiVO.API_TYPE" colType="text" name="imImalApiVO.API_TYPE" index="imImalApiVO.API_TYPE" title="%{getText('api_type_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="imImalApiVO.API_VERSION" colType="text" name="imImalApiVO.API_VERSION" index="imImalApiVO.API_VERSION" title="%{getText('api_version_key')}" editable="false" sortable="true" search="true" />
     	
</psjg:grid>
<div id="newApiListMaintDiv_id_${_pageRef}" style="width:100%;">
   <ps:if test='iv_crud == "R"'>   
      <%@include file="NewApiMaint.jsp"%>
   </ps:if>     
</div>
<script  type="text/javascript">
    $.struts2_jquery.require("NewApiList.js" ,null,jQuery.contextPath+"/path/js/imco/newapi/");
    $("#gview_newApiListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>
