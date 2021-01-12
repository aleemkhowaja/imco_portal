function fileEditor_uploadFile(){
	var fileName = document.getElementById("upload_" + _pageRef).value;
	var ext = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
	ext = ext.toUpperCase();
	
	if (ext == "XML") {
		$("#xmlEditor_"+_pageRef).show();
		$("#textEditor_"+_pageRef).hide();
		xmlEditor_uploadFile();
	}
	else if(ext == "CSV" || ext == "TXT"){
		$("#xmlEditor_"+_pageRef).hide();
		$("#textEditor_"+_pageRef).show();
		dynamicStructureData_uploadTxtFile(false);
	}
	else{
		_showProgressBar(false)
		$("#xmlEditor_"+_pageRef).hide();
		$("#textEditor_"+_pageRef).hide();
		_showErrorMsg("File type not allowed");
	}
}

function fileEditor_onDbClickedEvent()
{
    var changed = $("#uploadDynamicFile_" + _pageRef).hasChanges();
    if (changed == 'true' || changed == true)
    {
	_showConfirmMsg(changes_made_confirm_msg, "","fileEditor_DbClicked", "yesNo", '', '', 300, 100);
    }
    else
    {
	fileEditor_DbClicked(true);
    }
}

function fileEditor_DbClicked(yesNo)
{
    if (yesNo)
    {
	_showProgressBar(true);
	var $table = $("#mxMessageDefinitionGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	// get the selected rowId
	var dynamicFileStructured = myObject["dyn_FILE_STRUCTUREVO.FILE_STRUCTURE_ID"];
	var fileTypeId = myObject["dyn_FILE_STRUCTUREVO.FILE_TYPE"];
	var action = jQuery.contextPath+"/path/fileStructure/DynamicFileStructureMaintAction_loadDynamicFileStructure.action";
	var params = {};
	params["dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_STRUCTURE_ID"] = dynamicFileStructured;
	params["dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_TYPE"] = fileTypeId;
	params["iv_crud"] = $("#iv_crud_" + _pageRef).val();
	params["_pageRef"] = _pageRef;
	$.post(action, params, function(param)
	{
	    if (param.indexOf("<script type=") != -1)
	    {
		$("#dynamicFileStructureMaintDiv_id_" + _pageRef).html(param);
		$("#textEditor_"+_pageRef).hide();
		var fileType = myObject["dyn_FILE_STRUCTUREVO.FILE_TYPE"];
		
		if (fileType == "XML") {
		  //Fill Xonomy Editor
			$("#xmlEditor_"+_pageRef).show();
			 $("#textEditor_"+_pageRef).hide();
			fillMainEditor();
			var fileId = $("#DYNAMIC_FILE_STRUCTURE_ID_"+ _pageRef).val();
			if(fileId != null && fileId != ""){
			    $("#dynamicFileStructurXMLMessageListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
			}
		}
		else if(fileType == "csv" || fileType == "txt"){
		    $("#textEditor_"+_pageRef).show();
		    $("#xmlEditor_"+_pageRef).hide();
		    //dynamicStructureData_uploadTxtFile(false);
		}
		_showProgressBar(false);
	    }
	    else
	    {
		_showProgressBar(false);
		var response = jQuery.parseJSON(param);
		_showErrorMsg(response["_error"], response["_msgTitle"], 350,
		100);
	    }
	}, "html");
    }
}