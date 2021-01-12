<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<ps:url id="urlfieldMappingListGrid" escapeAmp="false" action="FieldMappingListAction_loadFieldMappingGrid" namespace="/path/fieldMapping">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<psjg:grid
	id               ="fieldMappingListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlfieldMappingListGrid}"
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
    ondblclick       ="fieldMappingList_onDbClickedEvent()"
    addfunc          ="fieldMappingList_onAddClicked"
    shrinkToFit      ="false" height="125">
     
    
	 <psjg:gridColumn id="syncolmappingVO.BR_CODE" colType="text" name="syncolmappingVO.BR_CODE" index="syncolmappingVO.BR_CODE" title="%{getText('BR_CODE_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.ENTITY_CODE" colType="text" name="syncolmappingVO.ENTITY_CODE" index="syncolmappingVO.ENTITY_CODE" title="%{getText('ENTITY_CODE_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.COL_NBR" colType="text" name="syncolmappingVO.COL_NBR" index="syncolmappingVO.COL_NBR" title="%{getText('COL_NBR_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.FROM_COL" colType="text" name="syncolmappingVO.FROM_COL" index="syncolmappingVO.FROM_COL" title="%{getText('FROM_COL_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.FROM_LABEL" colType="text" name="syncolmappingVO.FROM_LABEL" index="syncolmappingVO.FROM_LABEL" title="%{getText('FROM_LABEL_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.TO_COL" colType="text" name="syncolmappingVO.TO_COL" index="syncolmappingVO.TO_COL" title="%{getText('TO_COL_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.TO_LABEL" colType="text" name="syncolmappingVO.TO_LABEL" index="syncolmappingVO.TO_LABEL" title="%{getText('TO_LABEL_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.IN_OUT" colType="text" name="syncolmappingVO.IN_OUT" index="syncolmappingVO.IN_OUT" title="%{getText('IN_OUT_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.COL_TYPE" colType="text" name="syncolmappingVO.COL_TYPE" index="syncolmappingVO.COL_TYPE" title="%{getText('COL_TYPE_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.ACTION" colType="text" name="syncolmappingVO.ACTION" index="syncolmappingVO.ACTION" title="%{getText('ACTION_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.COL_DEFAULT" colType="text" name="syncolmappingVO.COL_DEFAULT" index="syncolmappingVO.COL_DEFAULT" title="%{getText('COL_DEFAULT_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="forcenull" colType="text" name="forcenull" index="forcenull" title="%{getText('forcenull_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.API_CODE" colType="number" name="syncolmappingVO.API_CODE" index="syncolmappingVO.API_CODE" title="%{getText('API_CODE_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.VALUE_SUCCESS" colType="text" name="syncolmappingVO.VALUE_SUCCESS" index="syncolmappingVO.VALUE_SUCCESS" title="%{getText('VALUE_SUCCESS_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.VALUE_ERROR" colType="text" name="syncolmappingVO.VALUE_ERROR" index="syncolmappingVO.VALUE_ERROR" title="%{getText('VALUE_ERROR_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.MSG_TYPE" colType="text" name="syncolmappingVO.MSG_TYPE" index="syncolmappingVO.MSG_TYPE" title="%{getText('MSG_TYPE_key')}" editable="false" sortable="true" search="true" />
     	
</psjg:grid>
<div id="fieldMappingListMaintDiv_id_${_pageRef}" style="width:100%;">
   <ps:if test='iv_crud == "R"'>   
      <%@include file="FieldMappingMaint.jsp"%>
   </ps:if>     
</div>
<script  type="text/javascript">
    $.struts2_jquery.require("FieldMappingList.js,FieldMappingMaint.js" ,null,jQuery.contextPath+"/path/js/imco/fieldmapping/");
    $("#gview_fieldMappingListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>