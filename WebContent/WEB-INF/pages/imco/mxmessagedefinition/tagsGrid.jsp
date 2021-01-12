<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<psjg:grid id="mxMsgDefTagListGridTbl_Id_${_pageRef}"
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
	subGridOptions="{reloadOnExpand:false}"
	navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
	shrinkToFit="true" 
	pagerButtons="false" 
	autowidth="false" 
	width="1400"
	height="400" 
	multiselect="true" 
	onSelectRowTopics="MainTagsGridSelect_Row_${_pageRef}"
	>


	<psjg:grid id="webServiceGuiSubGridTbl_SubGrid_Id_${_pageRef}"
		subGridUrl="" gridModel="" subGridOptions="{reloadOnExpand:false}">

	</psjg:grid>
	 
		<psjg:gridColumn id="parentTagName" colType="text"
			index="parentTagName" name="parentTagName"
			title="%{getText('parent_key')}" editable="false" sortable="true"
			search="true" hidden="true" />

		<psjg:gridColumn id="tagName" colType="text" index="tagName"
			name="tagName" title="%{getText('tag_name')}" editable="false"
			sortable="true" search="true" key="true" />

		<psjg:gridColumn id="minOccur" colType="text" index="minOccur"
				name="minOccur" title="%{getText('min_occur_key')}" editable="false"
				sortable="false" search="false" />
				
		<psjg:gridColumn id="maxOccur" colType="text" index="maxOccur"
				name="maxOccur" title="%{getText('max_occur_key')}" editable="false"
				sortable="false" search="false" />
				
		
		<psjg:gridColumn id="simpleTypeCO.minLength" colType="text"
			index="simpleTypeCO.minLength" name="simpleTypeCO.minLength"
			title="%{getText('mini_length_key')}" editable="false"
			sortable="true" search="true" />

		<psjg:gridColumn id="simpleTypeCO.maxLength" colType="text"
			index="simpleTypeCO.maxLength" name="simpleTypeCO.maxLength"
			title="%{getText('maxi_length_key')}" editable="false"
			sortable="true" search="true" />

		<psjg:gridColumn id="simpleTypeCO.restrictionType" colType="text"
			index="simpleTypeCO.restrictionType"
			name="simpleTypeCO.restrictionType" title="%{getText('type_key')}"
			editable="false" sortable="true" search="true" />


		<psjg:gridColumn id="description" colType="text" index="description"
			name="description" title="%{getText('description_key')}"
			editable="true" sortable="true" search="true" />

		<psjg:gridColumn id="STATUS" colType="text" index="STATUS"
			name="STATUS" title="%{getText('STATUS')}" hidden="true" />

		<psjg:gridColumn id="childTags" colType="text" index="childTags"
			name="childTags" title="%{getText('childTags')}" hidden="true" />

	</psjg:grid>
	
	
	<script type="text/javascript">
	
		$("#mxMsgDefTagListGridTbl_Id_"+_pageRef).subscribe("MainTagsGridSelect_Row_"+_pageRef,function(rowObj)
		{
			var rowId = rowObj.originalEvent.id
			var gridId = "mxMsgDefTagListGridTbl_Id_"+_pageRef;
			var status = $("#STATUS_"+_pageRef).val();
			
			//if record is mandatory  or apprvoed or in approve screen should be disable and retrun not to add in hidden fields
			if(status == 'P' || _pageRef == 'MXMD00P')
			{
				$("#"+gridId).jqGrid('setSelection', rowId, false);
				return;
			}
			
			var theform = document.getElementById("mxMessageDefForm_"+_pageRef);
		    $.data(theform, 'changeTrack', true);
		    
			//add all records of active grid in hidden fields
			$("#"+gridId).find("#"+rowId).attr("changed","1");
			
			
			//add selected row in hidden fiends
			//MxMessageDefinitionMaint_AddSelectedRowsInDynamicHiddenField(gridId);
			
		});
	
		$("#mxMsgDefTagListGridTbl_Id_"+_pageRef).subscribe("tagsGridOnGridCompleteFn_"+_pageRef,function(event,data){		
			MxMessageDefinitionMaint_onTagsGridCompleteTopics(event,data);
		});
		
		$("#cb_mxMsgDefTagListGridTbl_Id_"+_pageRef).remove();
	</script>