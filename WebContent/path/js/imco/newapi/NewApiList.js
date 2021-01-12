
function newApiList_onDbClickedEvent()
{
	var changed = $("#newApiMaintFormId_" + _pageRef).hasChanges();
	 if (changed == 'true' || changed == true)
	 {
	  _showConfirmMsg(changes_made_confirm_msg, "",
	    "newApiList_onDbClickedEventConfirmed", "yesNo");
	 }
	 else
	 {
		 newApiList_onDbClickedEventConfirmed(true);
	 }
	 showHideSrchGrid('newApiListGridTbl_Id_'+_pageRef);
//	var action = jQuery.contextPath
//			+ "/path/newApi/NewApiMaintAction_loadMaintanenceDetails.action";
//	var params = {};
//
//	var $table = $("#newApiListGridTbl_Id_" + _pageRef);
//	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
//	var myObject = $table.jqGrid('getRowData', selectedRowId);
//	// get the selected rowId
//	var apicode = myObject["imImalApiVO.API_CODE"];
//	params["newapiCO.imImalApiVO.API_CODE"] = apicode;
//	// var des = myObject["imImalApiVO.DESCRIPTION"];
//	// params["newapiCO.imImalApiVO.DESCRIPTION"] = des;
//	// var proname = myObject["imImalApiVO.PROCEDURE_NAME"];
//	// params["newapiCO.imImalApiVO.PROCEDURE_NAME"] = proname;
//	// var webserv = myObject["imImalApiVO.WB_SERVICE_NAME"];
//	// params["newapiCO.imImalApiVO.WB_SERVICE_NAME"] = webserv;
//	var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
//	// alert(iv_Crud);
//	params["iv_crud"] = iv_Crud;
//	params["_pageRef"] = _pageRef;
//	_showProgressBar(true);
//
//	$.ajax({
//
//		url : action,
//		type : "post",
//		data : params,
//		success : function(data)
//		{
//
//			$("#newApiListMaintDiv_id_" + _pageRef).html(data);
//			_showProgressBar(false);
//		}
//
//	});

}

function newApiList_onDbClickedEventConfirmed(yesNo)
{
	if (yesNo)
		{
		
		var action = jQuery.contextPath
		+ "/path/newApi/NewApiMaintAction_loadMaintanenceDetails.action";
var params = {};

var $table = $("#newApiListGridTbl_Id_" + _pageRef);
var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
var myObject = $table.jqGrid('getRowData', selectedRowId);
// get the selected rowId
var apicode = myObject["imImalApiVO.API_CODE"];
params["newapiCO.imImalApiVO.API_CODE"] = apicode;
// var des = myObject["imImalApiVO.DESCRIPTION"];
// params["newapiCO.imImalApiVO.DESCRIPTION"] = des;
// var proname = myObject["imImalApiVO.PROCEDURE_NAME"];
// params["newapiCO.imImalApiVO.PROCEDURE_NAME"] = proname;
// var webserv = myObject["imImalApiVO.WB_SERVICE_NAME"];
// params["newapiCO.imImalApiVO.WB_SERVICE_NAME"] = webserv;
var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
// alert(iv_Crud);
params["iv_crud"] = iv_Crud;
params["_pageRef"] = _pageRef;
_showProgressBar(true);

$.ajax({

	url : action,
	type : "post",
	data : params,
	success : function(data)
	{

		$("#newApiListMaintDiv_id_" + _pageRef).html(data);
		_showProgressBar(false);
	}

});
		
		}
}
function newApiList_onAddClicked()
{
	var action = jQuery.contextPath
			+ "/path/newApi/NewApiMaintAction_loadMaintanenceDetails.action";
	var params = {};
	var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
	params["iv_crud"] = iv_Crud;
	params["_pageRef"] = _pageRef;
	_showProgressBar(true);
	$.ajax({
		url : action,
		type : "post",
		data : params,
		success : function(data)
		{
			$("#newApiListMaintDiv_id_" + _pageRef).html(data);
			_showProgressBar(false);
		}

	});
}

function newApiUserOnAddClicked()
{
	var lineID = $("#newApiUserGrid_Id_" + _pageRef).jqGrid("addInlineRow", {});
}

function newApiUserOnDeleteClicked()
{
	var table = $("#newApiUserGrid_Id_" + _pageRef);
	var selectedRowId = table.jqGrid('getGridParam', 'selrow');
	table.jqGrid('deleteGridRow', selectedRowId);
}

function machineOnAddClicked()

{
	var lineID = $("#machineGrid_Id_" + _pageRef).jqGrid("addInlineRow", {});
}

function machineOnDeleteClicked()
{
	var table = $("#machineGrid_Id_" + _pageRef);
	var selectedRowId = table.jqGrid('getGridParam', 'selrow');
	table.jqGrid('deleteGridRow', selectedRowId);
}

function newApiArgumentOnAddClicked()
{
	var lineID = $("#argumentsGrid_Id_" + _pageRef).jqGrid("addInlineRow", {});
}

function newApiArgumentOnDeleteClicked()
{
	var table = $("#argumentsGrid_Id_" + _pageRef);
	var selectedRowId = table.jqGrid('getGridParam', 'selrow');
	table.jqGrid('deleteGridRow', selectedRowId);
}
