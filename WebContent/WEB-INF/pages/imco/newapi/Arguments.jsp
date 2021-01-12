<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:url id="urEbillList" namespace="/path/newApi" escapeAmp="false"
	action="NewApiListAction_reurnArgumentsGrid">
	<ps:param name="criteria.apiCode"
		value="${newapiCO.imImalApiVO.API_CODE}"></ps:param>

</ps:url>



<psjg:grid id="argumentsGrid_Id_${_pageRef}" dataType="json"
	href="%{urEbillList}" pager="true" filter="false" gridModel="gridModel"
	rowNum="5" rowList="5,10,15,20" viewrecords="true" navigator="true"
	navigatorAdd="false" navigatorDelete="false" navigatorEdit="false"
	navigatorRefresh="false" height="120" altRows="true" pagerButtons="false" navigatorSearch="false"
	addfunc="newApiArgumentOnAddClicked"
	delfunc="newApiArgumentOnDeleteClicked" shrinkToFit="true"
	editurl="1234" editinline="true"
	rownumbers="true" sortname="imApiArgumentVO.ARG_ID" sortorder="asc">

	<psjg:gridColumn id="imApiArgumentVO_ARG_ID" colType="number" hidden="true"
		name="imApiArgumentVO.ARG_ID" index="imApiArgumentVO.ARG_ID"
		editable="true" autoSearch="true"   title="%{getText('argument_id_key')}"/>

	<psjg:gridColumn id="imApiArgumentVO_ARG_NAME" colType="text"
		name="imApiArgumentVO.ARG_NAME" index="imApiArgumentVO.ARG_NAME"
		editable="false" autoSearch="true"  title="%{getText('argument_name_key')}"/>


	<psjg:gridColumn id="imApiArgumentVO_DESCRIPTION" colType="text"
		name="imApiArgumentVO.DESCRIPTION" index="imApiArgumentVO.DESCRIPTION"
		editable="true" autoSearch="true" title="%{getText('description_key')}" />


	<psjg:gridColumn id="imApiArgumentVO_ARG_TYPE"
		name="imApiArgumentVO.ARG_TYPE" index="imApiArgumentVO.ARG_TYPE"
		title="%{getText('arguments_type_key')}" editable="false"
		sortable="false" edittype="select" colType="select" formatter="select"
		editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/newApi/NewApiMaintAction_loadArgumentTypeSelect','argumentTypeList', 'code', 'descValue');}}"
		search="true" />

	
<%-- 	<psjg:gridColumn id="imApiArgumentVO_STATUS" colType="text" --%>
<%-- 		name="imApiArgumentVO.STATUS" index="imApiArgumentVO.STATUS" --%>
<%-- 		editable="true" autoSearch="true" title="Status " /> --%>



<psjg:gridColumn id="imApiArgumentVO_STATUS"
		name="imApiArgumentVO.STATUS" index="imApiArgumentVO.STATUS"
		title="%{getText('status_key')}" editable="false" sortable="false"
		edittype="select" colType="select" search="true"  formatter="select"
		editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/newApi/NewApiMaintAction_loadstatusTypeSelect','statusTypeList', 'code', 'descValue');}}" />




	<psjg:gridColumn id="imApiArgumentVO_DEFAULT_VALUE" colType="text"
		name="imApiArgumentVO.DEFAULT_VALUE"
		index="imApiArgumentVO.DEFAULT_VALUE" editable="true"
		autoSearch="true"  title="%{getText('default_value_key')}" />


</psjg:grid>


