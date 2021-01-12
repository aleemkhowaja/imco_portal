function DynamicFileStructureList_onDbClickedEvent()
{
    var changed = $("#uploadDynamicFile_" + _pageRef).hasChanges();
    if (changed == 'true' || changed == true)
    {
    	_showConfirmMsg(changes_made_confirm_msg, "","fileEditor_DbClicked", "yesNo", '', '', 300, 100);
    }
    else
    {
    	DynamicFileStructureList_DbClicked(true);
    }
}

function DynamicFileStructureList_DbClicked(yesNo)
{
    if (yesNo)
    {
		_showProgressBar(true);
		var $table = $("#dynamicFileStructureListGridTbl_Id_" + _pageRef);
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
				
				if (fileType == "XML") 
				{
				  //Fill Xonomy Editor
					$("#xmlEditor_"+_pageRef).show();
					$("#textEditor_"+_pageRef).hide();
					_showProgressBar(false);
					fillMainEditor();
					var fileId = $("#DYNAMIC_FILE_STRUCTURE_ID_"+ _pageRef).val();
					if(fileId != null && fileId != "")
					{
					    $("#dynamicFileStructurXMLMessageListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
					}
				}
				else if(fileType == "csv" || fileType == "txt")
				{
				    $("#textEditor_"+_pageRef).show();
				    $("#xmlEditor_"+_pageRef).hide();
				    //dynamicStructureData_uploadTxtFile(false);
				}
				_showProgressBar(false);
				showHideSrchGrid('dynamicFileStructureListGridTbl_Id_' + _pageRef);
		    }
		    else
		    {
				_showProgressBar(false);
				var response = jQuery.parseJSON(param);
				_showErrorMsg(response["_error"], response["_msgTitle"], 350, 100);
		    }
		}, "html");
    }
}

function DynamicFileStructureList_onAddClicked()
{
	var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
	if (ivCrud == 'R')
	{
		var changed = $("#uploadDynamicFile_" + _pageRef).hasChanges();
		if (changed == 'true' || changed == true)
		{
			_showConfirmMsg(changes_made_confirm_msg, "", "DynamicFileStructureList_NewClicked", "yesNo");
		}
		else
		{
			DynamicFileStructureList_NewClicked(true);
		}

	}
}

function DynamicFileStructureList_NewClicked(yesNo)
{
	if (yesNo)
	{
		_showProgressBar(true);
		var reloadUrl = jQuery.contextPath + "/path/fileStructure/DynamicFileStructureMaintAction_dynamicFileStructureEmptyForm.action";
		var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
		var reloadParams = {};
		reloadParams["iv_crud"] = ivCrud;
		reloadParams["_pageRef"] = _pageRef;

		$.post(reloadUrl, reloadParams, function(param) {
			$("#dynamicFileStructureMaintDiv_id_" + _pageRef).html(param);
			$("#xmlEditor_"+_pageRef).hide();
			$("#textEditor_"+_pageRef).hide(); 
			jQuery("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('clearGridData');
			jQuery("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('clearGridData');
			jQuery("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('clearGridData');
			jQuery("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('clearGridData');
			_showProgressBar(false);
		}, "html");
	}
}