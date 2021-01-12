function dynamicFileStructureMaint_processSubmit()
{
   if ($("#saveRecord_" + _pageRef).val() == 0) 
   {
	_showConfirmMsg(Confirm_Save_Process_key, info_msg_title,dynamicFileStructureMaint_save, {}, '', '', 300, 100);
   }
}

function dynamicFileStructureMaint_changeCase(element)
{
	var value = $("#"+element.id).val();
	$("#"+element.id).val(value.toUpperCase());
}

function DynamicFileStructureList_uploadFile()
{
	var fileName = document.getElementById("upload_" + _pageRef).value;
	var ext = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
	ext = ext.toUpperCase();
	$('#fileType_'+_pageRef).val(ext);
	if (ext == "XML" || ext == "XSD") 
	{
		var files = document.getElementById("upload_" + _pageRef).files;
	    var file = files[0];
		var fileSizeKB = file.size / 1024;
	    if(fileSizeKB > 100)
	    {
	    	_showErrorMsg("File size must be upto 100 KB", info_msg_title, 300,100);
	    	return; 
	    }
		$("#xmlEditor_"+_pageRef).show();
		$("#textEditor_"+_pageRef).hide();
		xmlEditor_uploadFile();
	}
	else if(ext == "CSV" || ext == "TXT")
	{
		$("#xmlEditor_"+_pageRef).hide();
		$("#textEditor_"+_pageRef).show();
		dynamicStructureData_uploadTxtFile(false);
	}
	else
	{
		_showProgressBar(false)
		$("#xmlEditor_"+_pageRef).hide();
		$("#textEditor_"+_pageRef).hide();
		_showErrorMsg("File type not allowed");
	}
}

function dynamicFileStructureMaint_save()
{
    if(confirm)
    {
    	var fileType = $('#fileType_'+_pageRef).val();
    	if(fileType == 'XML' || fileType == 'xml')
    	{
    		$('#structuredData_id').val("");
    		var jsonStringUpdates = $("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid("getAllRows");
    		var dynamicXMLEditorMsgGridData = $("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('getChangedRowData');
    		$("#xmlMessagesGridData_"+_pageRef).val(jsonStringUpdates);
    		$("#xmlMsgGridChangedData_"+_pageRef).val(dynamicXMLEditorMsgGridData);
    		$("#fileType_"+_pageRef).val("XML");
    		
    		_showProgressBar(true);
    		//save /update
    		var url = jQuery.contextPath+"/path/fileStructure/DynamicFileStructureMaintAction_saveDynamicFileStructure";
    		var myObject = $("#uploadDynamicFile_" + _pageRef).serializeForm();
    		$.ajax({
    			url : url,
    			type : "post",
    			dataType : "json",
    			data : myObject,
    			success : function(data) 
    			{
    				if (data["_error"] == null || data["_error"] == "undefined") 
    				{
    					$("#dynamicFileStructureListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
    					
    					dynamicFileStructureMaint_clearForm();
    					_showErrorMsg(record_saved_Successfully_key, info_msg_title, 300,100);
    					_showProgressBar(false);
    				}
    				else
    				{
    					_showProgressBar(false);
    				}
    			}
    		});
    	}
    	else
    	{
    		var $table = $("#dynamicFileStructurTextMessageListGridTbl_Id_" + _pageRef);
    		//set tag grid data into tag column of message Grid
    		var fileType = $("#fileType_"+_pageRef).val();
    		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
    		var tagsDataByMessageGrid = $("#clickedMessageGridRowId").val();
    		var dialogExtractionCriteria = $("#dialogExtractionCriteria").val();
    		var delimiter = $("#dynamicStructureFileDelimiter_"+_pageRef).val();
    		delimiter = delimiter.replace(/ /g,"{sp}");
    		$("#dynamicStructureFileDelimiter_"+_pageRef).val(delimiter);
    		dynamicStructureData_setTagsDataInMessageGrid(tagsDataByMessageGrid , selectedRowId, dialogExtractionCriteria);
    		//set the COA grid updated data into hidden fields
    		var dynamicTextEditorMessageGridData = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getChangedRowData');
    		var dynamicTextEditorTagGridData = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getChangedRowData');
    		$("#textEditorMessageGridData_"+_pageRef).val(dynamicTextEditorMessageGridData);
    		$("#textEditorTagGridData_"+_pageRef).val(dynamicTextEditorTagGridData);
    		_showProgressBar(true);
    		//save /update
    		var url = jQuery.contextPath+"/path/fileStructure/DynamicFileStructureMaintAction_saveDynamicFileStructure";
    		var myObject = $("#uploadDynamicFile_" + _pageRef).serializeForm();
    		$.ajax({
    			url : url,
    			type : "post",
    			dataType : "json",
    			data : myObject,
    			success : function(data) 
    			{
    			    if (data["_error"] == null || data["_error"] == "undefined") 
    			    {
    			    $("#dynamicFileStructureListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
    				_showErrorMsg(record_saved_Successfully_key, info_msg_title, 300,100);
    				dynamicFileStructureMaint_clearForm();
    				_showProgressBar(false);
    			    }
    			    else
    			    {
    				_showProgressBar(false);
    			    }
    			}
    		});
    	}
    	$("#xmlEditor_"+_pageRef).hide();
 		$("#textEditor_"+_pageRef).hide();
    }
}

function dynamicFileStructureMaint_onDeleteClicked() 
{
	$("#saveRecord_" + _pageRef).val(1);
	_showConfirmMsg(Confirm_Delete_Process_key, info_msg_title,dynamicFileStructureMaint_delete, {}, '', '', 300, 100);
}

function dynamicFileStructureMaint_delete(confirm) 
{
	if (confirm) 
	{
	    _showProgressBar(true);
	    var form = $("#uploadDynamicFile_" + _pageRef).serializeForm();
	    var actionUrl = jQuery.contextPath+ "/path/fileStructure/DynamicFileStructureMaintAction_deleteDynamicFileStructure.action";
	    $.ajax({
		url : actionUrl,
		type : "post",
		dataType : "json",
		data : form,
		success : function(data) 
		{
		    if (data["_error"] == null || data["_error"] == "undefined") 
		    {
				$("#dynamicFileStructureListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
				
				dynamicFileStructureMaint_clearForm();
				_showProgressBar(false);
				_showErrorMsg('Deleted_Successfully_key', info_msg_title,300, 100);
		    } else 
		    {
		    	_showProgressBar(false);
		    }
		}
	    });
	}
	$("#saveRecord_" + _pageRef).val(0);
}

function dynamicFileStructureMaint_clearForm()
{
    var reloadUrl = jQuery.contextPath + "/path/fileStructure/DynamicFileStructureMaintAction_dynamicFileStructureEmptyForm.action";
	var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
	var reloadParams = {};
	reloadParams["iv_crud"] = ivCrud;
	reloadParams["_pageRef"] = _pageRef;

	$.post(reloadUrl, reloadParams, function(param) {
		$("#dynamicFileStructureMaintDiv_id_" + _pageRef).html(param);
		$("#xmlEditor_"+_pageRef).hide();
		$("#textEditor_"+_pageRef).hide(); 
	}, "html");
}

function dynamicXMLFile_deleteMessageRow()
{
	var table = $("#dynamicFileStructurXMLMessageListGridTbl_Id_" + _pageRef);
	var selectedRowId = table.jqGrid('getGridParam', 'selrow');
	table.jqGrid('setCellValue', selectedRowId,"dyn_FILE_MESSAGEVO.STATUS",'D');
	var myObject = table.jqGrid('getRowData', selectedRowId);
	//table.jqGrid('deleteGridRow', selectedRowId);
	$("#dynamicFileStructurXMLMessageListGridTbl_Id_" + _pageRef).jqGrid('deleteGridRow');
	fillMainEditor();	
	jQuery("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('clearGridData');
}

function dynamicFileStructure_onStatusClicked()
{
	var theParams = {};
	var loadSrc  = jQuery.contextPath+"/path/dynamicFileStructure/DynamicFileStructureStatusAction_search.action";
	var theFormId = "dynamicFileStructureMaintFormId_"+_pageRef;
	showStatus(theFormId, _pageRef, loadSrc, theParams);
}

function messageList_onDbClickedEvent()
{
	var selectedRowId = $("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
	var selectedRowObject = $("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('getRowData', selectedRowId);
	var dialogParameters = {};
    dialogUrl= jQuery.contextPath+ "/path/fileStructure/DynamicFileEditorsAction_openDynamicTextDefinitionDialog.action?_pageRef="+_pageRef;
    dialogOptions ={ 
    	autoOpen: false,
		height:587,
		title:"Message" ,
		position : 'center',
		width:705,
		modal: true,
		close : function() {
			$(this).dialog("destroy");
			fillMainEditor();
		},
		buttons: [{ text : "OK", click : 
		    function(){
				$(this).dialog('close');
				copyDataFromDialog();
				fillMainEditor();
		    } 
		},
		{ text : "Cancel", click :
			function(){
				$(this).dialog('close');
			}
		}
	]}
	$.post(dialogUrl,dialogParameters, function( param )
	{
	    $('#xmlFileDialog_'+_pageRef).html(param) ;
	    $('#xmlFileDialog_'+_pageRef).dialog(dialogOptions)
	    $('#xmlFileDialog_'+_pageRef).dialog('open');
	    var xml = selectedRowObject['MESSAGE_SAMPLE'];
	    var tagRows = selectedRowObject['TAG_LIST'].split(".&.");

	    for(var i=0; i<tagRows.length-1; i++){
			var cols = tagRows[i].split(",.,");
			var data = {};
			var rowId = "new_"+(new Date()).getTime()+i;
			data['TAG_NAME'] 		 	= cols[0];
			data['PARENT_PATH'] 		= cols[1];
			data['IS_MULTIPLE_YN'] 		= cols[2];
			data['TAG_COLOR'] 			= cols[3];
			data['TEXT_EDITOR_JOB'] 	= cols[4];
			data['DATA_TYPE'] 		 	= cols[5];
			data['ExpressionDetails']	= cols[6];
			data['DESCRIPTION']		 	= cols[7];
			data['TAGS_ID']				= cols[8];
			data['IS_ATTR_YN']			= cols[9];
			data['STATUS']			    = cols[10];
			jQuery("#xmlDialogGrid_Id_"+_pageRef).jqGrid('addRowData', rowId, data, 'last');
			if(data['STATUS'] == "D")
			{
				$("#"+rowId).hide();
				$("#colorPicker_"+rowId).val(cols[3]);
			}
			//$("#"+cols[3]).find('.opening:first').attr("style","background:#d0e5f5");
		}
		fillDialogEditor(selectedRowObject['MESSAGE_SAMPLE']);
	},"html");
}

function dynamicFileStructure_checkRefUnique()
{
	var fileReference = $("#file_reference_" +  _pageRef).val();
	var reloadParams = {};
	reloadParams["criteria.fileReference"] = fileReference;
	reloadParams["criteria.pageRef"] = _pageRef;
	var actionUrl = jQuery.contextPath+ "/path/fileStructure/DynamicFileStructureMaintAction_checkRefUnique.action";
	$.ajax({
		url : actionUrl,
		type : "post",
		dataType : "json",
		data : reloadParams,
		success : function(data) 
		{
			var updates = data.updates;
			if(updates == '1')
			{
				_showErrorMsg("msg_duplicate_entry_Of_record_key", info_msg_title, 300,100,
                        function() {dynamicFileStructure_focusOnReference()});
			}
		}
	});
}

function dynamicFileStructure_focusOnReference()
{
	$("#file_reference_" +  _pageRef).val("");
	$("#file_reference_" +  _pageRef).focus();
}

function returnSettingIconMultiMappingButton(cellValue, options, rowObject)
{
	var mappingId;
	if(options.gid == "dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef )
	{
		mappingId = 300000;
	}
	else if(options.gid == "dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef )
	{
		mappingId = 300001;
	}	
	else if(options.gid == "dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef )
	{
		mappingId = 300002;
	}
	else if(options.gid == "dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef )
	{
		mappingId = 300003;
	}
	return "<a onclick='openCommonMultiMapping("+mappingId+")' class='ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only' role='button'>"+
	"<span class='ui-button-text'>"+
	"<img border='0' src='"+jQuery.contextPath +"/common/images/options-icon.png'>"+
	"</span></a>";
}
