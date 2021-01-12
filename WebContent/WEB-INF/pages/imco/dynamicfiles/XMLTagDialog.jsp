<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<script type="text/javascript">
	$(document).ready(
		function(){
			$("div#dialog_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
			$("div#dialogTagGridDiv_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
		}
	);

	function xmlTags_changeHighlightColor(rowId){
		var color = $("#colorPicker_"+rowId.id).val();
		$("#xmlDialogGrid_Id_"+_pageRef).jqGrid('setCellValue', rowId.id, "TAG_COLOR", color);
		//get Tag name from current row
		var tagName = $("#xmlDialogGrid_Id_"+_pageRef).jqGrid('getRowData', rowId.id)['TAG_NAME'];
		var parent = $("#xmlDialogGrid_Id_"+_pageRef).jqGrid('getRowData', rowId.id)['PARENT_PATH'];
		//Apply Color
		var parentList = xmlEditor_getDivPath(tagName, parent);
		$("#xmlDialogEditor_"+_pageRef).find(eval(parentList)).find('.opening:first').attr("style","background:"+color);
	}
	
	function colorPicker(cellValue, options, rowObject) {
		var color = '#d0e5f5';
		if(rowObject !=null && rowObject != undefined && rowObject['TAG_COLOR'] !=null && rowObject['TAG_COLOR'] != '')
		{
			color = rowObject['TAG_COLOR'];
		}
		return "<input value="+color+" title='Highlight Color' id='colorPicker_"+options.rowId+"' type='color' onchange='xmlTags_changeHighlightColor("+options.rowId+");'/>";
	}

	function returnSettingIcon(cellValue, options, rowObject){
		return '<img border="0" src="${pageContext.request.contextPath}/common/images/options-icon.png">';
	}

</script>
<ps:hidden  id="selectedTxtArea_${_pageRef}"/>
<ps:form id="uploadDynamicStructureFile_${_pageRef}" target="_blank" applyChangeTrack="true" useHiddenProps="true" namespace="/path/groupDefinition" method="post" enctype="multipart/form-data" >
	<div id="dialog_${_pageRef}" class="connectedSortable ui-helper-reset" style="margin-bottom: 5px;">
		<div id="dialogInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="xml_editor_key" />">
			<div id="xmlDialogEditor_${_pageRef}" style="margin-left: 25px; height: 280px; overflow: auto;"></div>
		</div>
	</div>
	<ps:url id="urltagsDetailDialogGrid" escapeAmp="false" action="GroupDefinitionCOAListAction_loadGroupCOAGrid" namespace="/path/groupDefinition">
	   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
	   <ps:param name="_pageRef" value="_pageRef"></ps:param>
	</ps:url>
	
	<div id="dialogTagGridDiv_${_pageRef}" class="connectedSortable ui-helper-reset" >
		<div id="dialogTagGridDivInner_${_pageRef}" class="collapsibleContainer" title="Tag List">
			<psjg:grid 
				id							="xmlDialogGrid_Id_${_pageRef}"					
				href						="%{urlgroupCOAGrid}" 
				dataType					="json"
				filter						="flase"
				gridModel					="gridModel"
				navigator					="true"
				navigatorRefresh			="false"
				navigatorSearch				="false"
				navigatorAdd				="true"
				navigatorDelete				="true"
				navigatorEdit				="false"
				pager            			="false"
				sortable         			="true"
				addfunc						="dynamicTextFile_addNewRow"
				delfunc						="dynamicXMLFile_deleteRowDialog"
				onEditInlineBeforeTopics	=""
				editinline					="true"
				editurl						="abc"
				autowidth		 			="false"
		        shrinkToFit      			="true"
		        width="675"
		        height="100"
			>
			
				<psjg:gridColumn id="PARENT_PATH" colType="text" index="PARENT_PATH" name="PARENT_PATH" title="%{getText('parent_key')}"     
					editable="false" sortable="true" search="true" hidden="false" /> 
					
				<psjg:gridColumn id="TAG_NAME" colType="text" index="TAG_NAME" name="TAG_NAME" title="%{getText('tag_name')}"     
					editable="false" sortable="true" search="true"/>
					
				<psjg:gridColumn id="DESCRIPTION" colType="text" index="DESCRIPTION" name="DESCRIPTION" title="%{getText('description_key')}"     
						editable="true" sortable="true" search="true"/>
						
				<psjg:gridColumn name="IS_MULTIPLE_YN" index="IS_MULTIPLE_YN" colType="text" title="%{getText('list_key')}" align="center" editable="false" 
			    	editoptions="{value:'1:0',align:'middle'}" formatoptions="{disabled:${_recReadOnly=='true'}}" 
			    	formatter="checkbox" edittype="checkbox" sortable="false"/>
					
				<psjg:gridColumn id="DATA_TYPE" name="DATA_TYPE" title="%{getText('Type_Key')}" index="DATA_TYPE" 
					colType="select" edittype="select" formatter="select" sortable="true" editable="true" search="false" 
					tabindex="3" align="center" required="true" 
					editoptions="{ value:function() {  return loadCombo('${pageContext.request.contextPath}/path/fileStructure/DynamicFileEditorsAction_initTextEditorJobList.action?','dataTypeList', 'code', 'descValue');}}"/>			
					
				<psjg:gridColumn id="COLOR_Picker" colType="COLOR_Picker" editable="false" name="COLOR_Picker" index="COLOR_Picker"
					formatter="colorPicker" title="%{getText('Color')}"  />
					
				<psjg:gridColumn id="TAG_COLOR" colType="TAG_COLOR" editable="false" name="TAG_COLOR" index="TAG_COLOR"
					title="%{getText('color_key')}" hidden="true" />	
						
				<psjg:gridColumn id="EXPRESSION" name="EXPRESSION" index="EXPRESSION" colType="text" formatter="dialogExpression_openDialog"
					title="%{getText('expression_key')}" sortable="false" search="false" editable="false" tabindex = "6" align="center" />
						 
				<psjg:gridColumn id="TEXT_EDITOR_JOB" colType="TEXT_EDITOR_JOB" editable="false" name="TEXT_EDITOR_JOB" index="TEXT_EDITOR_JOB"
					formatter="returnSettingIcon" title="%{getText('job_key')}"  />
									 
				<psjg:gridColumn id="ExpressionDetails" colType="text" index="ExpressionDetails" name="ExpressionDetails" 
					title="%{getText('ExpressionDetails')}" hidden="true" />	
					
				<psjg:gridColumn id="TAGS_ID" colType="text" index="TAGS_ID" name="TAGS_ID" title="%{getText('TAGS_ID')}" hidden="true" />	
						
				<psjg:gridColumn id="IS_ATTR_YN" colType="text" index="IS_ATTR_YN" name="IS_ATTR_YN" title="%{getText('IS_ATTR')}" hidden="true" />
						
				<psjg:gridColumn id="STATUS" colType="text" index="STATUS" name="STATUS" title="%{getText('STATUS')}" hidden="true" />							
			</psjg:grid>
		</div>
	</div>
	<ps:hidden id="dialogSelectedTextStartPos"></ps:hidden>
	<ps:hidden id="dialogSelectedText"></ps:hidden>
</ps:form>