function serviceSetMaint_processSubmit()
{
	var changed = $("#serviceSetMaintFormId_" + _pageRef).hasChanges();
	if (changed == 'true' || changed == true)
	{
	var action = jQuery.contextPath
	+ "/path/serviceSet/ServiceSetMaintAction_saveNew.action";

	var gridAllRecords = $("#serviceSetListGridTbl_Id_" + _pageRef).jqGrid('getAllRows');
	// var selRowId = gridId.jqGrid("getGridParam", "selrow");
	setInputValue("updateMode_hdn_statusGrid_Id_" + _pageRef, gridAllRecords);

	var formData = $("#serviceSetMaintFormId_" + _pageRef).serializeForm();

	$.ajax({
		url : action,
		type : "post",
		data : formData,
		dataType : "json",
		success : function(data)
		{
			_showErrorMsg(record_was_Updated_Successfully_key, info_msg_title);
			$("#serviceSetListGridTbl_Id_" + _pageRef).trigger(
			"reloadGrid");
		}

	});
	}
	else
	{
		_showErrorMsg(changes_not_available_key);
	}

	
}

function serviceSet_setReadonly()
{

	var gridId = $("#serviceSetListGridTbl_Id_" + _pageRef);
	var selectedRowId = gridId.jqGrid('getGridParam', 'selrow');
	var myObject = gridId.jqGrid('getRowData', selectedRowId);
	var process = myObject["syncConnVO.PROCESS"];
	//process = "R";
	if (process == "R" || process == "S")
	{
		gridId.jqGrid('setCellReadOnly', selectedRowId, 'syncConnVO.RECONNECT',	"false");
//		gridId.jqGrid('showCol','syncConnVO.RECONNECT');
	}
	else
	{
		gridId.jqGrid('setCellReadOnly', selectedRowId, 'syncConnVO.RECONNECT',	"true");
	//	gridId.jqGrid('hideCol','syncConnVO.RECONNECT');
	}
}
