<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/path/js/imco/dynamicfiles/xonomy/xonomy.css" />
<script type="text/javascript">
	$(document).ready(
		function() 
		{
			$("div#file_structure_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
		}
	);

	function colorPickerMain(cellValue, options, rowObject){
		return "<input id='COLOR_PickerMain_"+options.rowId+"' value='"+rowObject['TAG_COLOR']+"' title='Highlight Color' type='color' onchange='mainTags_changeHighlightColor("+options.rowId+");' />";
	}

	function mainTags_changeHighlightColor(rowId){
		var color = $("#COLOR_PickerMain_"+rowId.id).val();
		$("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', rowId.id, "TAG_COLOR", color);

		var myObject = $("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('getRowData', rowId.id);
		var parentList = xmlEditor_getDivPath(myObject['TAG_NAME'], myObject['PARENT_PATH']);
		$("#editor_"+_pageRef).find(eval(parentList)).find('.opening:first').attr("style","background:"+color+";");
		
		saveUpdatedTagsIntoMessage();
	}

	function returnSettingIcon(cellValue, options, rowObject){
		return '<img border="0" src="${pageContext.request.contextPath}/common/images/options-icon.png">';
	}
</script>

<ps:url id="urldynamicFileMessageListGrid" escapeAmp="false" action="DynamicFileStructureListAction_loadDynamicXmlFileStructureMessageGrid" namespace="/path/fileStructure">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
   <ps:param name="criteria.fileType" value="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_TYPE"></ps:param>
   <ps:param name="criteria.dynamicStructureFileId" value="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_STRUCTURE_ID"></ps:param>
</ps:url>
<div id="file_structure_${_pageRef}" class="connectedSortable ui-helper-reset" >
	<div id="file_structureInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="File_Structure_key" />">
		<table width="100%">
		  <tr>
		  	<td width="50%" style="vertical-align: top;">
		  		<div id="messageGridDiv_${_pageRef}" class="connectedSortable ui-helper-reset" >
					<div id="messageGridDiv_Inner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="messagedetail_key" />">
						<psjg:grid id		="dynamicFileStructurXMLMessageListGridTbl_Id_${_pageRef}" 
					      	altRows       	="true"
					 	  	editinline 		="true"
					 	  	editurl			="%{urldynamicFileMessageListGrid}"
					 	  	href			="%{urldynamicFileMessageListGrid}"
					      	dataType   		="json"
					   	  	pager      		="false"
					   	  	sortable   		="true"
						  	filter         	="false"
					   	  	gridModel   	="gridModel"
					   	  	rowNum    		="5"
					   	  	rowList        	="5,10,15,20"
					      	viewrecords 	="true"
					      	navigator    	="true"
					      	navigatorAdd    ="false"
					      	navigatorRefresh="false"
					      	navigatorEdit	="false"
					      	navigatorDelete	="true"
					      	navigatorSearch	="false"
					      	subGridOptions="{reloadOnExpand:false}"
					      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
						  	ondblclick		="messageList_onDbClickedEvent()"
						  	delfunc			="dynamicXMLFile_deleteMessageRow"
					      	shrinkToFit		="true"
					      	pagerButtons	="false"
					      	autowidth		="false"
							width			="550"
							height			="125"
						>				
							<psjg:gridColumn id="TAG_NAME" colType="text" index="TAG_NAME" name="TAG_NAME" title="%{getText('message_name_key')}"     
								editable="false" sortable="true" search="true"/>
								
							<psjg:gridColumn id="MSG_DESC" colType="text" index="dyn_FILE_MESSAGEVO.DESCRIPTION" name="dyn_FILE_MESSAGEVO.DESCRIPTION" 
								title="%{getText('description_key')}" editable="true" sortable="true" search="true"/>
								
							<psjg:gridColumn id="MESSAGE_JOB" colType="MESSAGE_JOB" editable="false" name="MESSAGE_JOB" index="MESSAGE_JOB"
								formatter="returnSettingIconMultiMappingButton" title="%{getText('job_key')}"  />
												
							<psjg:gridColumn id="MESSAGE_SAMPLE" name="MESSAGE_SAMPLE" index="MESSAGE_SAMPLE" colType="text" hidden="true"
								title="%{getText('message_sample')}" sortable="false" search="false" editable="false" tabindex = "6" align="center" />
								
							<psjg:gridColumn id="TAG_LIST" name="TAG_LIST" index="TAG_LIST" colType="text" hidden="true"
								title="%{getText('tag_list')}" sortable="false" search="false" editable="false" tabindex = "6" align="center" />
								
							<psjg:gridColumn id="MESSAGE_ID" name="dyn_FILE_MESSAGEVO.MESSAGE_ID" key="true"
								index="dyn_FILE_MESSAGEVO.MESSAGE_ID" colType="text" hidden="true"
								title="%{getText('message_id')}"  />
								
							<psjg:gridColumn id="dyn_FILE_MESSAGEVO.JOB_ID" colType="text" index="dyn_FILE_MESSAGEVO.JOB_ID" 
								name="dyn_FILE_MESSAGEVO.JOB_ID" title="%{getText('tags_id')}" hidden="true" />
								
							<psjg:gridColumn id="MSG_UPDATE_MODE" name="MSG_UPDATE_MODE" index="MSG_UPDATE_MODE" colType="text" hidden="true"
								title="%{getText('msg_update_mode')}"  />
								
							<psjg:gridColumn id="MSG_STATUS" name="dyn_FILE_MESSAGEVO.STATUS" index="MSG_STATUS" colType="text" hidden="true"
								title="%{getText('msg_status')}"  />
							      
						</psjg:grid> 
					</div>
				</div>
				<div id="tagGridDiv_${_pageRef}" class="connectedSortable ui-helper-reset" >
					<div id="tagGridDivInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="tag_list_key" />">
						<psjg:grid id		="dynamicFileStructurXMLTagListGridTbl_Id_${_pageRef}" 
					      	altRows       	="true"
					 	  	editinline 		="true"
					 	  	editurl			="abc"
					      	dataType   		="json"
					   	  	pager      		="false"
					   	  	sortable   		="true"
						  	filter         	="false"
					   	  	gridModel   	="gridModel"
					   	  	rowNum    		="5"
					   	  	rowList        	="5,10,15,20"
					      	viewrecords 	="true"
					      	navigator    	="true"
					      	navigatorAdd    ="false"
					      	navigatorRefresh="false"
					      	navigatorEdit	="false"
					      	navigatorDelete	="true"
					      	navigatorSearch	="false"
					      	subGridOptions="{reloadOnExpand:false}"
					      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
					      	shrinkToFit		="true"
					      	pagerButtons	="false"
					      	autowidth		="false"
							width			="550"
							height			="130"
							delfunc			="delete_tagMainGrid"
						>				
						
							<psjg:gridColumn id="PARENT_PATH" colType="text" index="PARENT_PATH" name="PARENT_PATH" title="%{getText('parent_key')}"     
								editable="false" sortable="true" search="true" hidden="false" /> 
								
							<psjg:gridColumn id="TAG_NAME" colType="text" index="TAG_NAME" name="TAG_NAME" title="%{getText('tag_name')}"     
								editable="false" sortable="true" search="true"/>
								
							<psjg:gridColumn id="DESCRIPTION" colType="text" index="DESCRIPTION" name="DESCRIPTION" title="%{getText('description_key')}"     
								editoptions="{dataEvents: [{type: 'change', fn: function(e) { saveUpdatedTagsIntoMessage()} }] }"
								editable="true" sortable="true" search="true"/>
								
							<psjg:gridColumn name="IS_MULTIPLE_YN" index="IS_MULTIPLE_YN" colType="text" title="%{getText('list_key')}" align="center" editable="false" 
						    	formatoptions="{disabled:${_recReadOnly=='true'}}" 
						    	editoptions="{value:'1:0',align:'middle', dataEvents: [{type: 'change', fn: function(e) { saveUpdatedTagsIntoMessage()} }]}"
						    	formatter="checkbox" edittype="checkbox" sortable="false"/> 
							      
							<psjg:gridColumn id="DATA_TYPE" name="DATA_TYPE" title="%{getText('type_key')}" index="DATA_TYPE" 
								colType="select" edittype="select" formatter="select" sortable="true" editable="true" search="false" 
								tabindex="3" align="center" required="true" 
								editoptions="{ value:function() { return loadCombo('${pageContext.request.contextPath}/path/fileStructure/DynamicFileEditorsAction_initTextEditorJobList.action?','dataTypeList', 'code', 'descValue');}, dataEvents: [{type: 'change', fn: function(e) { saveUpdatedTagsIntoMessage()} }] }"/>
							      
							<psjg:gridColumn id="COLOR_PickerMain" colType="COLOR_PickerMain" editable="false" name="COLOR_PickerMain"
								index="COLOR_PickerMain" formatter="colorPickerMain" title="%{getText('color_key')}"  />
					
							<psjg:gridColumn id="EXPRESSION" name="EXPRESSION" index="EXPRESSION" colType="text" formatter="dialogExpression_openMain"
								title="%{getText('expression_key')}" sortable="false" search="false" editable="false" tabindex = "6" align="center" />
									 
							<psjg:gridColumn id="TEXT_EDITOR_JOB" colType="TEXT_EDITOR_JOB" editable="false" name="TEXT_EDITOR_JOB" index="TEXT_EDITOR_JOB"
								formatter="returnSettingIconMultiMappingButton" title="%{getText('job_key')}"  />
									 
							<psjg:gridColumn id="ExpressionDetails" colType="text" index="ExpressionDetails" name="ExpressionDetails" 
								editoptions="{dataEvents: [{type: 'change', fn: function(e) { saveUpdatedTagsIntoMessage()} }] }"
								title="%{getText('expression_details_key')}" hidden="true" />	
									
							<psjg:gridColumn id="dyn_FILE_TAGVO.TAGS_ID" colType="text" index="dyn_FILE_TAGVO.TAGS_ID" 
								name="dyn_FILE_TAGVO.TAGS_ID" title="%{getText('tags_id')}" hidden="true" />
								
							<psjg:gridColumn id="dyn_FILE_TAGVO.JOB_ID" colType="text" index="dyn_FILE_TAGVO.JOB_ID" 
								name="dyn_FILE_TAGVO.JOB_ID" title="%{getText('TAGS_ID')}" hidden="true" />
								
							<psjg:gridColumn id="STATUS" colType="text" index="STATUS" name="STATUS" title="%{getText('STATUS')}" hidden="true" />
									
							<psjg:gridColumn id="IS_ATTR_YN" colType="text" index="IS_ATTR_YN" name="IS_ATTR_YN" title="%{getText('IS_ATTR')}" hidden="true" />
									
							<psjg:gridColumn id="TAG_COLOR" colType="TAG_COLOR" editable="false" name="TAG_COLOR" index="TAG_COLOR" title="%{getText('Color')}" hidden="true" /> 
						</psjg:grid>
					</div>
				</div>
			</td>
		    <td width="50%" style="vertical-align: top;" >
		    	<div id="coadetails_${_pageRef}" class="connectedSortable ui-helper-reset" >
					<div id="coadetailsInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="xml_editor_key" />">
						<div id="editor_${_pageRef}" style="margin-left: 25px; height: 380px; overflow: auto;"></div>
					</div>
				</div>
		    </td>
		  </tr>
		</table>
	</div>
</div>
<div id = "constraintsMainDialog_${_pageRef}"></div>
<div id="xmlFileDialog_${_pageRef}"></div>