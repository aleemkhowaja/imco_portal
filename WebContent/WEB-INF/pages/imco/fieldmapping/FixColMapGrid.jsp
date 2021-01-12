<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:url id="urlfixcolmapping" escapeAmp="false"
	action="FieldMappingListAction_loadFixcolmapGrid"
	namespace="/path/fieldMapping">
	<ps:param name="iv_crud" value="ivcrud_${_pageRef}"></ps:param>
	<ps:param name="_pageRef" value="_pageRef"></ps:param>
	  <ps:param name="criteria.brcode"  value="%{fieldmapCO.brcode}"></ps:param>
	    <ps:param name="criteria.entityCode"  value="%{fieldmapCO.entityCode}"></ps:param>
	      <ps:param name="criteria.colNBR"  value="%{fieldmapCO.colNBR}"></ps:param>
	      

</ps:url>

<psjg:grid id="fixcolmapping_Id_${_pageRef}" dataType="json"
	href="%{urlfixcolmapping}" pager="true" filter="false"
	gridModel="gridModel" rowNum="5" rowList="5,10,15,20"
	viewrecords="true" navigator="true" navigatorAdd="true"
	navigatorDelete="true" navigatorEdit="false" navigatorRefresh="false"
	height="120" altRows="true" pagerButtons="false"
	navigatorSearch="false" addfunc="fixcolmapAddClicked" autowidth="false"
	width="910" delfunc="fixcolmapOnDeleteClicked" shrinkToFit="false"
	editurl="1234" editinline="true">

	<psjg:gridColumn id="syncfixedmappingVO.IMAL_VALUE" colType="text"
		name="syncfixedmappingVO.IMAL_VALUE"
		index="syncfixedmappingVO.IMAL_VALUE"
		title="%{getText('imal_value_key')}" editable="true" sortable="true"
		search="true" />
	<psjg:gridColumn id="syncfixedmappingVO.EXT_SYS_VALUE" colType="text"
		name="syncfixedmappingVO.EXT_SYS_VALUE"
		index="syncfixedmappingVO.EXT_SYS_VALUE"
		title="%{getText('ext_sys_value_key')}" editable="true"
		sortable="true" search="true" />
	<psjg:gridColumn id="syncfixedmappingVO.BR_CODE" colType="text"
		hidden="true" name="syncfixedmappingVO.BR_CODE"
		index="syncfixedmappingVO.BR_CODE" title="%{getText('br_code_key')}"
		editable="true" sortable="true" search="true" />
	<psjg:gridColumn id="syncfixedmappingVO.ENTITY_CODE" hidden="true"
		colType="text" name="syncfixedmappingVO.ENTITY_CODE"
		index="syncfixedmappingVO.ENTITY_CODE"
		title="%{getText('entity_code_key')}" editable="true" sortable="true"
		search="true" />
	<psjg:gridColumn id="syncfixedmappingVO.COL_NBR" hidden="true"
		colType="text" name="syncfixedmappingVO.COL_NBR"
		index="syncfixedmappingVO.COL_NBR" title="%{getText('col_nbr_key')}"
		editable="true" sortable="true" search="true" />
	<psjg:gridColumn id="syncfixedmappingVO.LINE_NBR" colType="text"
		name="syncfixedmappingVO.LINE_NBR" index="syncfixedmappingVO.LINE_NBR"
		title="%{getText('line_nbr_key')}" editable="true" sortable="true"
		search="true" />


</psjg:grid>
