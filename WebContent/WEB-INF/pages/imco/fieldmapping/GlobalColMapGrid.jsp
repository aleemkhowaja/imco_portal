<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:url id="urlglobalcolmapping" escapeAmp="false" action="FieldMappingListAction_loadglobalcolmapGrid" namespace="/path/fieldMapping">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
     <ps:param name="criteria.brcode"  value="%{fieldmapCO.brcode}"></ps:param>
	    <ps:param name="criteria.entityCode"  value="%{fieldmapCO.entityCode}"></ps:param>
	      <ps:param name="criteria.colNBR"  value="%{fieldmapCO.colNBR}"></ps:param>
   </ps:url>
    <psjg:grid id="globalcolmapping_Id_${_pageRef}" 
    dataType="json"
 	href="%{urlglobalcolmapping}" 
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
 		  navigatorSearch="false" autowidth="false" width="910"
 		addfunc="globalcolmapAddClicked" 
 		delfunc="globalcolmapOnDeleteClicked" shrinkToFit="true"
 			editurl="1234" editinline="true">
 			
 			 	<psjg:gridColumn id="forcenull_YN" 
    name="forcenull_YN" index="forcenull_YN"
    title="%{getText('Null_key')}" 
    colType="checkbox" 
    edittype="checkbox"
    formatter="checkbox"
    editable="true"
    sortable="true" 
    search="true" 
    width="50" 
    editoptions="{value:'1:0',align:'middle', dataEvents: [{ type: 'change', fn: function(e) {}}]}"
    align="center"
    searchoptions="{sopt:['eq']}"
    formatoptions="{disabled:false}"
   />	
 			
 	<psjg:gridColumn id="syncolmappingVO.BR_CODE" hidden="true" colType="text" name="syncolmappingVO.BR_CODE" index="syncolmappingVO.BR_CODE" title="%{getText('BR_CODE_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncolmappingVO.ENTITY_CODE" hidden="true" colType="text" name="syncolmappingVO.ENTITY_CODE" index="syncolmappingVO.ENTITY_CODE" title="%{getText('ENTITY_CODE_key')}" editable="false" sortable="true" search="true" />
<%--   	    <psjg:gridColumn id="syncolmappingVO.COL_DEFAULT" colType="text" name="syncolmappingVO.COL_DEFAULT" index="syncolmappingVO.COL_DEFAULT" title="%{getText('COL_DEFAULT_key')}" editable="false" sortable="true" search="true" /> --%>
  	    <psjg:gridColumn id="syncolmappingVO.COL_NBR" hidden="true" colType="text" name="syncolmappingVO.COL_NBR" index="syncolmappingVO.COL_NBR" title="%{getText('COL_NBR_key')}" editable="false" sortable="true" search="true" />
  	
  	<psjg:gridColumn id="syncolmappingVO.COL_DEFAULT" name="syncolmappingVO.COL_DEFAULT" 
   index="syncolmappingVO.COL_DEFAULT" title="%{getText('col_default_key')}" editable="true" sortable="false"
   edittype="select" colType="select" search="true" formatter="select"
   editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/fieldMapping/FieldMappingMaintAction_loadfieldmapTypeSelect','customeLov', 'code', 'descValue');}}" />
  	
 			
 			</psjg:grid>
 			
 <script  type="text/javascript">

    $.struts2_jquery.require("GlobalColMap.js" ,null,jQuery.contextPath+"/path/js/imco/fieldmapping/");
    $("#gview_globalcolmapping_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>
