function sytmsetList_onDbClickedEvent()
{

	var changed = $("#sytmsetMaintFormId_" + _pageRef).hasChanges();
	if (changed == 'true' || changed == true)
	{
		_showConfirmMsg(changes_made_confirm_msg, "",
				"sytmsetList_onDbClickedEventConfirmed", "yesNo");
	}
	else
	{
		sytmsetList_onDbClickedEventConfirmed(true);
	}
	showHideSrchGrid('sytmsetListGridTbl_Id_' + _pageRef);

	
}

function sytmsetList_onDbClickedEventConfirmed(yesNo)
{
	if (yesNo)
	{

		var action = jQuery.contextPath
		+ "/path/sytmset/SytmsetMaintAction_loadMaintanenceDetails.action";
		var params = {};

		var $table = $("#sytmsetListGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		// get the selected rowId
		var sytmCode = myObject["syncBranchVO.BR_CODE"];
		params["SytmsetCO.syncBranchVO.BR_CODE"] = sytmCode;
		
		var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
		// alert(iv_Crud);
		params["iv_crud"] = iv_Crud;
		params["_pageRef"] = _pageRef;
		_showProgressBar(true);

		$("#lllll").show();
		$.ajax({

			url : action,
			type : "post",
			data : params,
			success : function(data)
			{
				$("#sytmsetListMaintDiv_id_" + _pageRef).show();
				$("#sytmsetListMaintDiv_id_" + _pageRef).html(data);
				_showProgressBar(false);

			}

		});
	}

}

function sytmsetList_onAddClicked()
{
	var action = jQuery.contextPath
	+ "/path/sytmset/SytmsetMaintAction_loadMaintanenceDetails.action";
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
			$("#sytmsetListMaintDiv_id_" + _pageRef).html(data);
			_showProgressBar(false);
		}

	});
}