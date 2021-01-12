<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<psjg:grid id="mxMessageDefinitionXMLTagListGridTbl_Id_${_pageRef}"
	altRows="true" 
	editinline="true" 
	editurl="abc" 
	dataType="json"
	pager="false" 
	sortable="true" 
	filter="false" 
	gridModel="gridModel"
	rowNum="5" 
	rowList="5,10,15,20" 
	viewrecords="true" 
	navigator="true"
	navigatorAdd="false" 
	navigatorRefresh="false" 
	navigatorEdit="false"
	navigatorDelete="true" 
	navigatorSearch="false"
	subGridOptions="{reloadOnExpand:true}"
	navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
	shrinkToFit="true" 
	pagerButtons="false" 
	autowidth="false" 
	width="600"
	height="300" 
	multiselect="true" 
	delfunc="delete_tagMainGrid">

	<psjg:gridColumn id="parentTagName" colType="text"
		index="parentTagName" name="parentTagName"
		title="%{getText('parent_key')}" editable="false" sortable="true"
		search="true" hidden="false" />

	<psjg:gridColumn id="tagName" colType="text" index="tagName"
		name="tagName" title="%{getText('tag_name')}" editable="false"
		sortable="true" search="true" />

	<psjg:gridColumn id="simpleTypeCO.minLength" colType="text"
		index="simpleTypeCO.minLength" name="simpleTypeCO.minLength"
		title="%{getText('mini_length_key')}" editable="false" sortable="true"
		search="true" />

	<psjg:gridColumn id="simpleTypeCO.maxLength" colType="text"
		index="simpleTypeCO.maxLength" name="simpleTypeCO.maxLength"
		title="%{getText('maxi_length_key')}" editable="false" sortable="true"
		search="true" />

	<psjg:gridColumn id="simpleTypeCO.restrictionType" colType="text"
		index="simpleTypeCO.restrictionType"
		name="simpleTypeCO.restrictionType" title="%{getText('type_key')}"
		editable="false" sortable="true" search="true" />


	<psjg:gridColumn id="DESCRIPTION" colType="text" index="DESCRIPTION"
		name="DESCRIPTION" title="%{getText('description_key')}"
		editoptions="{dataEvents: [{type: 'change', fn: function(e) { saveUpdatedTagsIntoMessage()} }] }"
		editable="true" sortable="true" search="true" />

	<psjg:gridColumn id="simpleTypeCO.restrictionType"
		name="simpleTypeCO.restrictionType" title="%{getText('type_key')}"
		index="simpleTypeCO.restrictionType" colType="select"
		edittype="select" formatter="select" sortable="true" editable="true"
		search="false" tabindex="3" align="center" required="true"
		hidden="true"
		editoptions="{ value:function() { return loadCombo('${pageContext.request.contextPath}/path/fileStructure/DynamicFileEditorsAction_initTextEditorJobList.action?','dataTypeList', 'code', 'descValue');}, dataEvents: [{type: 'change', fn: function(e) { saveUpdatedTagsIntoMessage()} }] }" />

	<psjg:gridColumn id="EXPRESSION" name="EXPRESSION" index="EXPRESSION"
		colType="text" formatter="dialogExpression_openMain"
		title="%{getText('expression_key')}" sortable="false" search="false"
		editable="false" tabindex="6" align="center" />

	<psjg:gridColumn id="ExpressionDetails" colType="text"
		index="ExpressionDetails" name="ExpressionDetails"
		editoptions="{dataEvents: [{type: 'change', fn: function(e) { saveUpdatedTagsIntoMessage()} }] }"
		title="%{getText('expression_details_key')}" hidden="true" />

	<psjg:gridColumn id="dyn_FILE_TAGVO.TAGS_ID" colType="text"
		index="dyn_FILE_TAGVO.TAGS_ID" name="dyn_FILE_TAGVO.TAGS_ID"
		title="%{getText('tags_id')}" hidden="true" />

	<psjg:gridColumn id="STATUS" colType="text" index="STATUS"
		name="STATUS" title="%{getText('STATUS')}" hidden="true" />

	<psjg:gridColumn id="IS_ATTR_YN" colType="text" index="IS_ATTR_YN"
		name="IS_ATTR_YN" title="%{getText('IS_ATTR')}" hidden="true" />

</psjg:grid>
