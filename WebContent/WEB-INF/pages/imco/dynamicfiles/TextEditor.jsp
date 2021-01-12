<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>

<ps:set name="ivcrud_${_pageRef}"    value="iv_crud"/>
<ps:hidden id="iv_crud_${_pageRef}"  name="iv_crud"/>
<ps:set name="ok_var" 	 value="%{getEscText('Ok_key')}"/>
<ps:set name="cancel_var"  value="%{getEscText('cancel_key')}"/>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/path/css/imco/dynamicFiles/dynamicFileTextEditor/contextMenu.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/path/css/imco/dynamicFiles/dynamicFileTextEditor/jquery-te-1.4.0.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/path/css/imco/dynamicFiles/dynamicFileTextEditor/jquery-confirm.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/path/css/imco/dynamicFiles/dynamicFileTextEditor/font-awesome.min.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/path/css/imco/dynamicFiles/dynamicFileTextEditor/TextEditor.css" />

<script  type="text/javascript">
	var ok_var 	= "${ok_var}";
    var cancel_var 	= "${cancel_var}";
    function returnSettingIcon(cellValue, options, rowObject)
	{
		return '<img border="0" src="${pageContext.request.contextPath}/common/images/options-icon.png">';
	}
    
	$(document).ready(function() {
		$.struts2_jquery.require("contextMenu.js,TextEditor.js,TextEditorByPrecision.js,TextEditorByDelimiter.js,jquery-te-1.4.0.min.js,jquery-confirm.js", null,jQuery.contextPath+"/path/js/imco/dynamicfiles/dynamicFileTextEditor/");
	});
</script>

<%-- <ps:form id="uploadDynamicStructureFile_${_pageRef}" target="_blank" applyChangeTrack="true" useHiddenProps="true" namespace="/path/fileEditors" method="post" enctype="multipart/form-data" >
 --%>
<ps:hidden id='saveRecord_${_pageRef}' value="0"  ></ps:hidden>
<div id="file_structureTextEditor_${_pageRef}" class="connectedSortable ui-helper-reset" >
	<div id="file_structureTextEditorInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="File_Structure_key" />">
		<table width="100%">
			<tr>
				<td width="50%" style="vertical-align: top;">
					<div id="dynamicFileTextMessageGridDiv_${_pageRef}" class="connectedSortable ui-helper-reset" >
						<div id="dynamicFileTextMessageGridDiv_Inner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="messagedetail_key" />">
							<ps:url id="urlDynamicFileMessageListGrid" escapeAmp="false" action="DynamicFileStructureListAction_loadDynamicTextFileStructureMessageGrid" namespace="/path/fileStructure/">
							   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
							   <ps:param name="_pageRef" value="_pageRef"></ps:param>
							   <ps:param name="dynamicFileStructureId" value="DYNAMIC_FILE_STRUCTURE_ID_${_pageRef}"></ps:param>
							   <ps:param name="criteria.fileType" value="FILETYPE_${_pageRef}"></ps:param>
							</ps:url>
										
							<psjg:grid 
								id							="dynamicFileStructurTextMessageListGridTbl_Id_${_pageRef}"					
								href						="%{urlDynamicFileMessageListGrid}"
								dataType         			="json"
								hiddengrid      			='false'
								pager            			="true"
								sortable         			="true"
								filter           			="false"
								gridModel        			="gridModel"
								rowNum           			="5"
								rowList          			="5,10,15,20"
								viewrecords      			="true"
								navigator        			="true"
								navigatorDelete  			="true"
								navigatorEdit    			="false"
								navigatorRefresh		 	="false"
								navigatorAdd     			="false"
								navigatorSearch  			="false"
								navigatorSearchOptions		="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
								altRows          			="true"
								addfunc			 			="dynamicTextFile_addNewRow"
								delfunc			 			="dynamicStructureData_deleteRow('dynamicFileStructurTextMessageListGridTbl_Id_')"
								onEditInlineBeforeTopics	=""
								ondblclick       			="dynamicStructureData_onMessageDbClickedEvent()"
								editinline		 			="false"
								editurl			 			="abc"
								autowidth		 			="false"
						        shrinkToFit      			="true"
						        width						="550"
								height						="125"
								onSelectRowTopics			="onMessageRowselect">
											
									<psjg:gridColumn id="MESSAGE_ID" colType="number" 
										name="dyn_FILE_MESSAGEVO.MESSAGE_ID" index="MESSAGE_ID" 
										title="MESSAGE_ID" hidden="true"  />
												
									<psjg:gridColumn id="TEXT_EDITOR_MESSAGE_JOB" colType="text" editable="false"
										name="JOB_ID" index="TEXT_EDITOR_JOB"
										title="%{getText('message_job_key')}"
										width="40" sortable="true" search="true" formatter="returnSettingIconMultiMappingButton" hidden="true" />
			 							
			 						<psjg:gridColumn id="MESSAGE_TYPE" colType="text" editable="false"
										name="dyn_FILE_MESSAGEVO.MESSAGE_TYPE" index="MESSAGE_TYPE"
										title="%{getText('message_type_key')}"
										width="60" sortable="true" search="true" />
														
									<psjg:gridColumn id="INDEX_NO" colType="text" editable="false"
										name="dyn_FILE_MESSAGEVO.INDEX_NO" index="INDEX_NO"
										title="%{getText('Index No')}"
										width="60" sortable="true" search="true" hidden="true"/>
												
									<psjg:gridColumn id="IDENTIFIER" colType="text" editable="false"
										name="dyn_FILE_MESSAGEVO.IDENTIFIER" index="IDENTIFIER"
										title="%{getText('identifier_key')}" />
									
									<psjg:gridColumn id="START_POS" colType="text" editable="false"
										name="dyn_FILE_MESSAGEVO.START_POS" index="START_POS"
										title="%{getText('start_position_key')}" sortable="true" search="true"
										width="40" hidden="true" />
													
									<psjg:gridColumn id="DESCRIPTION" colType="text" editable="false"
										name="dyn_FILE_MESSAGEVO.DESCRIPTION" index="DESCRIPTION"
										title="%{getText('description_key')}" sortable="true" search="true" 
										width="50" hidden="true" />
									
									<psjg:gridColumn id="Tags" colType="text" editable="false"
										name="tags" index="Tags"
										title="%{getText('Tags')}" sortable="true" search="true"
										width="40" hidden="true" />
												
									<psjg:gridColumn id="DELETED_Tags" colType="text" editable="false"
										name="DELETED_Tags" index="DELETED_Tags"
										title="%{getText('DELETED_Tags')}" sortable="true" search="true"
										width="40" hidden="true" />
												
									<psjg:gridColumn id="TAG_COLOR" colType="text" editable="false"
										name="dyn_FILE_MESSAGEVO.IDENTIFIER_COLOR" index="TAG_COLOR"
										title="%{getText('TAG_COLOR')}" sortable="true" search="true"
										width="40" hidden="true" />
												
									<psjg:gridColumn id="MESSAGE_SAMPLE" colType="text" editable="false"
										name="dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE" index="MESSAGE_SAMPLE"
										title="%{getText('MESSAGE_SAMPLE')}" sortable="true" search="true"
										width="40" hidden="true" />
												
									<psjg:gridColumn id="DELIMITER" colType="text" editable="false"
										name="dyn_FILE_MESSAGEVO.DELIMITER" index="DELIMITER"
										title="%{getText('DELIMITER')}" sortable="true" search="true"
										width="40" hidden="true" />
										
									<psjg:gridColumn id="dyn_FILE_MESSAGEVO.JOB_ID" colType="text" index="dyn_FILE_MESSAGEVO.JOB_ID" 
										name="dyn_FILE_MESSAGEVO.JOB_ID" title="%{getText('TAGS_ID')}" hidden="true" />
									
									<psjg:gridColumn id="IsUpdate" colType="text" editable="false"
										name="IsUpdate" index="DELIMITER" sortable="true" search="true" 
										title="%{getText('IsUpdate')}" 
										width="40" hidden="true" key="true"/>
										
									<psjg:gridColumn id="MESSAGE_JOB" colType="MESSAGE_JOB" editable="false" name="MESSAGE_JOB" index="MESSAGE_JOB"
										formatter="returnSettingIconMultiMappingButton" title="%{getText('job_key')}" width="20" />
								</psjg:grid>
							</div>
						</div>		
						<div id="dynamicFileTextTagsGrid_${_pageRef}" class="connectedSortable ui-helper-reset" >
							<div id="dynamicFileTextTagsGridInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name='tagdetails_key'/>">
								<psjg:grid 
										id							="dynamicFileStructurTextTagListGridTbl_Id_${_pageRef}"					
										dataType         			="json"
										hiddengrid      			='false'
										pager            			="true"
										sortable         			="true"
										filter           			="false"
										gridModel        			="gridModel"
										rowNum           			="5"
										rowList          			="5,10,15,20"
										viewrecords      			="true"
										navigator        			="false"
										navigatorDelete  			="false"
										navigatorEdit    			="false"
										navigatorRefresh		 	="false"
										navigatorAdd     			="false"
										navigatorSearch  			="true"
										navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
										altRows          			="true"
										addfunc			 			="dynamicTextFile_addNewRow"
										delfunc			 			="dynamicStructureData_deleteRow('dynamicFileStructurTextTagListGridTbl_Id_')"
										onEditInlineBeforeTopics	=""
										ondblclick       			="TextEditorByDelimiter_HighlightTagsOfMainEditorOnDbClickFromTagGrid()"
										editinline		 			="true"
										editurl			 			="abc"
										autowidth		 			="false"
									    shrinkToFit      			="true"
									    width						="550"
										height						="125">
										
										<psjg:gridColumn id="TAGS_ID" colType="number" 
											name="dyn_FILE_TAGVO.TAGS_ID" index="TAGS_ID" 
											title="TAGS_ID" key="true" hidden="true" />
							
										<psjg:gridColumn id="INDEX" colType="text" editable="false"
											name="dyn_FILE_TAGVO.INDEX" index="INDEX"
											title="%{getText('index_no_key')}"
											width="40" hidden="true"/>
														
										<psjg:gridColumn id="TAG_NAME" colType="text" editable="false"
											name="dyn_FILE_TAGVO.TAG_NAME" index="TAG_NAME"
											title="%{getText('tag_name')}" width="30" />
												
										<psjg:gridColumn id="START_POS" colType="text" editable="false"
											name="dyn_FILE_TAGVO.START_POS" index="START_POS"
											title="%{getText('start_position_key')}"
											width="40" hidden="true" />
													
										<psjg:gridColumn id="TAG_LENGTH" colType="text" editable="false"
											name="dyn_FILE_TAGVO.TAG_LENGTH" index="TAG_LENGTH"
											title="%{getText('tag_length_key')}"
											width="30" hidden="true" />
													
										<psjg:gridColumn id="TAG_DESCRIPTION" colType="text" editable="false"
											name="dyn_FILE_TAGVO.DESCRIPTION" index="TAG_DESCRIPTION"
											title="%{getText('description_key')}" width="30" hidden="true"/>
												
										<psjg:gridColumn id="TAG_LINE" colType="text" editable="false"
											name="TAG_LINE" index="TAG_LINE"
											title="%{getText('tag_line_key')}"
											width="40" hidden="true" />
												
										<psjg:gridColumn id="TAG_COLOR" colType="text" editable="false"
											name="dyn_FILE_TAGVO.COLOR" index="TAG_COLOR"
											title="%{getText('tag_color_key')}"
											width="40" hidden="true" />
												
										<psjg:gridColumn id="TAG_VALUE" colType="text" editable="false"
											name="dyn_FILE_TAGVO.TAG_VALUE" index="TAG_VALUE"
											title="%{getText('tag_length_key')}"
											width="30" hidden="true" />
												
										<psjg:gridColumn id="COLOR_PickerMain" colType="COLOR_PickerMain"
										 	editable="false" name="COLOR_PickerMain" index="COLOR_PickerMain" 
										 	title="%{getText('color_key')}" width="20" />
												 	
										<psjg:gridColumn id="TEXT_EDITOR_TAG_JOB" colType="text" editable="false"
											name="JOB_ID" index="TEXT_EDITOR_JOB"
											title="%{getText('tag_job_key')}"
											width="20" sortable="true" search="true" formatter="returnSettingIconMultiMappingButton"/>
										
										<psjg:gridColumn name="GROUP_BY" index="GROUP_BY" colType="text" title="%{getText('group_by_key')}" align="center" editable="true" 
									     	editoptions="{value:'1:0',align:'middle', dataEvents: [{type: 'change', fn: function(e) {} }]}"
									    	formatter="checkbox" edittype="checkbox" sortable="false" width="10"/> 
						    	
										<psjg:gridColumn id="VALIDATION" colType="text" editable="false"
											name="JOB_ID" index="VALIDATION"
											title="%{getText('validation_key')}"
											width="20" sortable="true" search="true" formatter="returnSettingIconMultiMappingButton"/>
												
										<psjg:gridColumn id="TAG_MESSAGE_TYPE" colType="text" editable="false"
											name="TAG_MESSAGE_TYPE" index="TAG_MESSAGE_TYPE"
											title="%{getText('tag_length_key')}"
											width="30" hidden="true" />
												
									</psjg:grid>
								</div>
							</div>
						</td>
						
						<td style="vertical-align: top;">
							<div id="dynamicFileTextEditorDetails_${_pageRef}" class="connectedSortable ui-helper-reset" style="width: 100%;">
								<div id="dynamicFileTextEditorDetailsInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="textEditor_key" />">
									<ps:textarea id="structuredData_id" name="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_SAMPLE" cssClass="jqte-test" ></ps:textarea>
								</div>
							</div>
						</td>
				</tr>

			</table>
		</div>
	</div>
	
	<ps:hidden id="selectedTextLine" ></ps:hidden>
	<ps:hidden id="selectedText_${_pageRef}"></ps:hidden>
	<ps:hidden id="isHighlight"></ps:hidden>
	<ps:hidden id="selectedTextIndex"></ps:hidden>
	<ps:hidden id="selectedTextStartPos"></ps:hidden>
	<ps:hidden id="fileSize"></ps:hidden>
	<ps:hidden id="dialogExtractionCriteria" name="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.EXTRACTION_CRITERIA"></ps:hidden>
	<ps:hidden id="dynamicStructureFileDelimiter_${_pageRef}" name="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.DELIMITER"></ps:hidden>
	<ps:hidden id="identifier"></ps:hidden>
	<ps:hidden id="identifierStartPosition"></ps:hidden>
	<ps:hidden id="textEditorMessageGridData_${_pageRef}"  name="textEditorMessageGridData"></ps:hidden>
	<ps:hidden id="textEditorTagGridData_${_pageRef}"      name="textEditorTagGridData"></ps:hidden>
	<ps:hidden id="fileData_${_pageRef}"  name="dynamicFileStructureCO.fullText"></ps:hidden>
	<ps:set name="messageId_${_pageRef}" value="messageId" />
	<ps:hidden id="clickedMessageGridRowId"></ps:hidden>
	<ps:hidden id="delimiter-identifier"></ps:hidden>
	<ps:hidden id="messageType_${_pageRef}" ></ps:hidden>	
 <script>
	 $(document).ready(function() {
		 
		$("div#file_structureTextEditor_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
		$("#fileSepratorRow").hide();
		$(".jqte-test").jqte();
		$("#dynamicFileTextEditorDetailsInner_"+_pageRef).find('.jqte_editor').css("width","507px");
		$("#dynamicFileTextEditorDetailsInner_"+_pageRef).find('.jqte_editor').css("height","355px");
		$("#dynamicFileTextEditorDetailsInner_"+_pageRef).find('.jqte').css("height","375px");
		
	      $(".jqte").find(".jqte_toolbar").html("");
		  $('.jqte_editor').mousedown(function(event) {
		      var color  = $("#te-color-picker").val();
	 	  	switch (event.which) {
	 	  		case 1:
	 	  		 $('::selection').css("background",color);
	 	  		    break;
	 	    	case 3:
	 	        	showOptions();
	 	        	
	 	            break;
	 	        default:
	 	    }
	 	});
	});
	 
	 $('.jqte_editor').mouseup(function(event) 
	{
		switch (event.which) {
			case 1:
			    var lines = $(".jqte_editor").text().split("\n");
			    var fileSeprator = $("#dynamicStructureFileSeprator_"+_pageRef).val();
			    var fileType = $("#FILETYPE_"+_pageRef).val();
			    $(this).attr('id','jqte_editor_id')
				var selectedText = getSelectedText();
				$("#selectedTextIndex").val(selectedText.toString());
				var totalLength = 0;
			    var isMatch = true;
			    $(this).attr('id','jqte_editor_id')
			    if (window.getSelection) {
					var sel = window.getSelection();
			        var div = document.getElementById("jqte_editor_id");
			        //get start position of selected text from Editor
			        var startPos = getSelectionCharOffsetsWithin(div);
			        $("#selectedTextStartPos").val(startPos.start);
			        $("#selectedText_"+_pageRef).val($.trim(sel));
			        dynamicStructureData_getSelectedLineNo(startPos.start);
				}
				break;
				default:
		    }
		});
	 
	 	//binds to onchange event of your input field
	 	$('#myFile').bind('change', function() {
	   		alert(this.files[0].size);
	 	});
 </script>
 
