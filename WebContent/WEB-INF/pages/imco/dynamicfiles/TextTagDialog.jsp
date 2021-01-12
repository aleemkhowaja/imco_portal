<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<html>
	<body>
		<ps:hidden  id="selectedTxtArea_${_pageRef}"/>
		<div id="dynamicTextEditorTagsDialog_${_pageRef}" class="collapsibleContainer dynamicTextEditorTagsDialog" title="<ps:text name='DynamicStructureFiles'/>">
			<ps:form id="uploadDynamicStructureFile_${_pageRef}" target="_blank" applyChangeTrack="true" useHiddenProps="true" namespace="/path/groupDefinition" method="post" enctype="multipart/form-data" >
				<table cellpadding="2" cellspacing="1">
					<tr>
						<td> <ps:label id="lbl_extractionCriteria_${_pageRef}" key="extraction_criteria_key" for="extractionCriteria_${_pageRef}"></ps:label> </td>
						<td>
							<ps:select id="dialogExtractionCriteria_${_pageRef}" name="dialogExtractionCriteria" 
								list="extractionCriteriaList" listKey="code" listValue="descValue" required="true" tabindex="3" onchange="dynamicStructureData_changeExtractionCriteria();">
							</ps:select>			
						</td>
					</tr>
					<tr id="fileSepratorDialogRow" >
						<td> <ps:label id="lbl_uploadDynamicStructureFileDialogDelimiter_${_pageRef}" key="delimiter_key" for="dynamicStructureFileDialogDelimiter_${_pageRef}"></ps:label> </td>
						<td>
							<ps:textfield id='dynamicStructureFileDialogDelimiter_${_pageRef}'
								name="Delimiter"
								readonly="false" mode="text"  
								required="false"
								disabled="false" onblur="TextEditorByDelimiter_processTagsAfterPuttingDelimiter();" >
							</ps:textfield>				
						</td>
					</tr>
					<tr>
						<td> <ps:label id="lbl_uploadDynamicStructureDelimiterHeader_${_pageRef}" key="delimiter_header_key" for="dynamicStructureFileDelimiterHeader_${_pageRef}"></ps:label> </td>
						<td>
							<ps:checkbox id="dynamicStructureFileDelimiterHeader_${_pageRef}" name="delimiterHeader"></ps:checkbox>			
						</td>
					</tr>
				</table>
				
				<br />
				<div id="dialogTextEditorDetails_${_pageRef}" class="connectedSortable ui-helper-reset" style="margin-bottom: 5px;">
					<div id="dialogTextEditorDetailsInner_${_pageRef}" class="collapsibleContainer" title="<ps:text name="textEditor_key" />">
						<ps:textarea id="dialogDynamicEditor_${_pageRef}" name="dialogDynamicEditor" cssClass="jqte-dialogDynamicEditor" disabled="true"></ps:textarea>
					</div>
				</div>
					<psjg:grid 
							id							="dynamicTagsDetailDialogGrid_Id_${_pageRef}"					
							href						="%{urlgroupCOAGrid}" 
							dataType					="json"
							caption    					="Tag Details"
							filter						="flase"
							gridModel					="gridModel"
							navigator					="true"
							navigatorRefresh			="false"
							navigatorSearch				="false"
							navigatorAdd				="true"
							navigatorDelete				="true"
							navigatorEdit				="false"
							pager            			="true"
							rowNum           			="5"
							rowList          			="5,10,15,20"
							sortable         			="true"
							addfunc						="dynamicTextFile_addNewRow"
							delfunc						="dynamicStructureData_deleteRow('dynamicTagsDetailDialogGrid_Id_')"
							onEditInlineBeforeTopics	=""
							editinline					="true"
							editurl						="abc"
							autowidth		 			="false"
					        shrinkToFit      			="true"
					        width						="675"
					        height						="150"
				            onSelectRowTopics			="rowselect"
						>
						    <psjg:gridColumn id="INDEX_NO" colType="text" editable="false"
								name="INDEX_NO" index="INDEX_NO"
								title="%{getText('index_no_key')}"
								width="10" hidden="true" />

								 <psjg:gridColumn id="TEXT_TYPE" colType="text" editable="false"
								name="TEXT_TYPE" index="TEXT_TYPE"
								title="%{getText('message_type_key')}"
								width="20" hidden="true" />
								
							<psjg:gridColumn id="TAG_NAME" colType="text" editable="true"
								name="TAG_NAME" index="TAG_NAME"
								title="%{getText('tag_name')}"
								width="20" required="true" autoSearch="false" />
								
							<psjg:gridColumn id="TAG_DESCRIPTION" colType="text" editable="false"
								name="TAG_DESCRIPTION" index="TAG_DESCRIPTION"
								title="%{getText('tag_desc_key')}" 
								width="40" hidden="true" />
								
							<psjg:gridColumn id="STR_POS" colType="text" editable="false"
								name="STR_POS" index="STR_POS"
								title="%{getText('start_position_key')}"
								width="20" />
								
							<psjg:gridColumn id="TAG_LEN" colType="text" editable="false"
								name="TAG_LEN" index="TAG_LEN"
								title="%{getText('tag_length_key')}"
								width="20" />
							
							<psjg:gridColumn id="COLOR" colType="COLOR" editable="false"
								name="COLOR" index="COLOR"
								title="%{getText('color_key')}"
								width="20" />
								
							<psjg:gridColumn id="COLOR_VALUE" colType="COLOR_VALUE" editable="false"
								name="COLOR_VALUE" index="COLOR_VALUE"
								title="%{getText('COLOR_VALUE')}"
								width="20" hidden="true" />
								
							<psjg:gridColumn id="TAG_VALUE" colType="text" editable="false"
								name="TAG_VALUE" index="TAG_VALUE"
								title="%{getText('Tag Value')}"
								width="20" hidden="true" />
								
							<psjg:gridColumn id="TAG_TYPE" colType="text" editable="false"
								name="TAG_TYPE" index="TAG_TYPE"
								title="%{getText('Tag Type')}"
								width="20" hidden="true" />
								
							<psjg:gridColumn id="TAG_ID" colType="text" editable="false"
								name="TAG_ID" index="TAG_ID"
								title="%{getText('Tag Id')}"
								width="20" hidden="true" />
								
							<psjg:gridColumn id="OVERRIDEN_TAG_LENGTH" colType="text" editable="false"
								name="OVERRIDEN_TAG_LENGTH" index="OVERRIDEN_TAG_LENGTH"
								title="%{getText('Overriden Tag Length')}"
								width="20" hidden="true" />
						</psjg:grid>

						<!-- Dynamic File Text Dialog Hidden Fields -->
						<ps:hidden id="dialogSelectedTextStartPos"></ps:hidden>
						<ps:hidden id="dialogSelectedText"></ps:hidden>
						<ps:hidden id="dialogTagIndex"></ps:hidden>
			</ps:form>
		</div>
		
		 <script>
			 $(document).ready(function() 
			 {
				  $(".jqte-dialogDynamicEditor").jqte();
				  $(".jqte").find(".jqte_toolbar").html("");
				  $("#fileSepratorDialogRow").hide();
				  $('#dynamicTextEditorTagsDialog_'+_pageRef).find('.jqte_editor').css("height","0px");
				  $('#dynamicTextEditorTagsDialog_'+_pageRef).find('.jqte_editor').mousedown(function(event) {
				    var color  = $("#te-color-picker").val();
			 	  	switch (event.which) {
			 	  		case 1:
			 	  			$('::selection').css("background",color);
			 	  			$(this).attr('id','jqte_editor_dialog_id')
			 	  		    break;
			 	    	case 3:
			 	    		$(this).attr('id','jqte_editor_dialog_id')
			 	    		dynamicStructureData_showOptionsDialog();
			 	    		$(".iw-contextMenu").css("z-index",1004);
			 	            break;
			 	        default:
			 	    }
			 	});
				  
				  $('#dynamicTextEditorTagsDialog_'+_pageRef).find('.jqte_editor').mouseup(function(event) {
					switch (event.which) {
						case 1:
						    if (window.getSelection) {
								var sel = window.getSelection();
								var div = document.getElementById("jqte_editor_dialog_id");
								var startPos = getSelectionCharOffsetsWithin(div);
								$("#dialogSelectedTextStartPos").val(startPos.start);
						        $("#dialogSelectedText").val(sel);
							}
							break;
							case 3:
				 	    		$(".iw-contextMenu").css("z-index",1050);
				 	    		var div = document.getElementById("jqte_editor_dialog_id");
								var startPos = getSelectionCharOffsetsWithin(div);
								$("#dialogSelectedTextStartPos").val(startPos.start);
								var lines = $("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").text();
								var delimiter = $("#dynamicStructureFileDialogDelimiter_"+_pageRef).val();
								var data = lines.split(delimiter);
								var fullText = "";
								for(var i=0; i<data.length; i++)
								{
									fullText+=data[i]
									if(i < data.length-1)
									{
									    fullText+=delimiter;
									}
									if(startPos.start < fullText.length)
									{
									    $("#dialogTagIndex").val(i);
										break;
									}
								}
				 	            break;
							default:
					    }
				  });
				  $("div#dialogTextEditorDetails_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
			 });
			 
			 </script>
			 
			 <style>
			 	.dynamicTextEditorTagsDialog .jqte
			 	{
			 		margin: 0px 0;
			 		height: 122px;
			 	}
			 </style>
 	</body>
</html>