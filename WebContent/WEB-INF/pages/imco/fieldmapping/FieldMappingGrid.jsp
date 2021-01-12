<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<script  type="text/javascript">
    $.struts2_jquery.require("FieldMappingList.js,FieldMappingMaint.js" ,null,jQuery.contextPath+"/path/js/imco/fieldmapping/");
    $("#gview_fieldMappingListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>
<ps:url id="urlfieldMappingListGrid" escapeAmp="false" action="FieldMappingListAction_loadFieldMappingGrid" namespace="/path/fieldMapping">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
   
   </ps:url>
    <psjg:grid id="fieldmapping_Id_${_pageRef}" 
    dataType="json"
 	href="%{urlfieldMappingListGrid}" 
 	pager="true" 
 	filter="false" 
 	gridModel="gridModel"
 	rowNum="5" 
 	rowList="5,10,15,20" 
 	viewrecords="true" 
 	navigator="true"
 	navigatorAdd="false" 
 	navigatorDelete="false"
 	navigatorEdit="false"
 	navigatorRefresh="false"
 	height="120"
 	altRows="true" 
 	pagerButtons="false" 
 	navigatorSearch="false"
 	addfunc="fieldmappingOnAddClicked" 
 	delfunc="fieldmappingOnDeleteClicked" shrinkToFit="true"
 	editurl="1234" editinline="true">

    
<%-- 	<psjg:gridColumn id="statuschck_id_${_pageRef}" colType="checkbox" formatter="checkbox"
				edittype="checkbox" align="center" name="statuschck"
				title="%{getText('Select_key')}" index="statuschck" editable="true"
				sortable="true" search="true" editoptions="{value:'Y:N'}" />   --%>
				
	<psjg:gridColumn id="syncolmappingVO.BR_CODE" colType="text" name="syncolmappingVO.BR_CODE" index="syncolmappingVO.BR_CODE" title="%{getText('br_code_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.ENTITY_CODE" colType="text" name="syncolmappingVO.ENTITY_CODE" index="syncolmappingVO.ENTITY_CODE" title="%{getText('entity_code_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.COL_NBR" colType="text" name="syncolmappingVO.COL_NBR" index="syncolmappingVO.COL_NBR" title="%{getText('col_nbr_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.FROM_COL" editable="true" colType="text" name="syncolmappingVO.FROM_COL" index="syncolmappingVO.FROM_COL" title="%{getText('from_col_key')}"  sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.FROM_LABEL" colType="text" name="syncolmappingVO.FROM_LABEL" index="syncolmappingVO.FROM_LABEL" title="%{getText('from_label_key')}" editable="true" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.TO_COL" colType="text" name="syncolmappingVO.TO_COL" index="syncolmappingVO.TO_COL" title="%{getText('to_col_key')}" editable="true" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.TO_LABEL" colType="text" name="syncolmappingVO.TO_LABEL" index="syncolmappingVO.TO_LABEL" title="%{getText('to_label_key')}" editable="true" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.IN_OUT" colType="text" name="syncolmappingVO.IN_OUT" index="syncolmappingVO.IN_OUT" title="%{getText('in_out_key')}" editable="true" sortable="true" search="true" 
    />
<%--  <psjg:gridColumn id="syncolmappingVO.COL_TYPE" colType="text" name="syncolmappingVO.COL_TYPE" index="syncolmappingVO.COL_TYPE" title="%{getText('COL_TYPE_key')}" editable="false" sortable="true" search="true" /> --%>
   
   <psjg:gridColumn id="syncolmappingVO.ACTION" name="syncolmappingVO.ACTION"
   index="syncolmappingVO.ACTION" title="%{getText('actions_key')}" editable="true" sortable="false"
   edittype="select" colType="select" search="true" formatter="select" 
   editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/fieldMapping/FieldMappingMaintAction_loadfieldmapTypeSelect','colTypeList', 'code', 'descValue');}}" /> 
	<%--<psjg:gridColumn id="syncolmappingVO.ACTION" colType="text" name="syncolmappingVO.ACTION" index="syncolmappingVO.ACTION" title="%{getText('actions_key')}" editable="false" sortable="true" search="true" /> --%>
    <psjg:gridColumn id="syncolmappingVO.COL_DEFAULT" colType="text"     formatter="settlChargesNotInstalmentLink"  name="syncolmappingVO.COL_DEFAULT" index="syncolmappingVO.COL_DEFAULT" title="%{getText('COL_DEFAULT_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.COL_DEFAULT" colType="text"  name="syncolmappingVO.COL_DEFAULT" index="syncolmappingVO.COL_DEFAULT" title="%{getText('col_default1_key')}" editable="false" sortable="true" search="true" hidden="true"/>
    <psjg:gridColumn id="forcenull" colType="text" name="forcenull" index="forcenull" title="%{getText('forcenull_key')}" editable="true" sortable="true" search="true" hidden="true"/>
    <psjg:gridColumn id="syncolmappingVO.API_CODE" colType="number" name="syncolmappingVO.API_CODE" index="syncolmappingVO.API_CODE" title="%{getText('api_code_key')}" editable="true" sortable="true" search="true" hidden="true" />
    <psjg:gridColumn id="syncolmappingVO.VALUE_SUCCESS" colType="text" name="syncolmappingVO.VALUE_SUCCESS" index="syncolmappingVO.VALUE_SUCCESS" title="%{getText('value_success_key')}" editable="true" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.VALUE_ERROR" colType="text" name="syncolmappingVO.VALUE_ERROR" index="syncolmappingVO.VALUE_ERROR" title="%{getText('value_error_key')}" editable="true" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.MSG_TYPE" colType="text" name="syncolmappingVO.MSG_TYPE" index="syncolmappingVO.MSG_TYPE" title="%{getText('msg_type_key')}" editable="true" sortable="true" search="true" />
<%-- <psjg:gridColumn id="syncolmappingVO_COL_TYPE" name="syncolmappingVO.COL_TYPE" --%>
<%--    index="syncolmappingVO.COL_TYPE" title="%{getText('col_type_key')}" editable="true" sortable="false" --%>
<%--    edittype="select" colType="select" search="true" formatter="select" --%>
<%--    editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/fieldMapping/FieldMappingMaintAction_loadfieldmapTypeSelect','colTypeList', 'code', 'descValue');}}" /> --%>
</psjg:grid>

