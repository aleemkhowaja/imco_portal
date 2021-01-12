function channelList_onDbClickedEvent()
{

	var action = jQuery.contextPath
			+ "/path/channel/ChannelMaintAction_loadMaintanenceDetails.action";
	var params = {};

	var $table = $("#channelListGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	// get the selected rowId
	var channel = myObject["imApiChannelsVO.CHANNEL_ID"];
	params["channelCO.imApiChannelsVO.CHANNEL_ID"] = channel;
	params["channelIdOldStatus"] = myObject["imApiChannelsVO.STATUS"];
	var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
	// alert(iv_Crud);
	params["iv_crud"] = iv_Crud;
	params["_pageRef"] = _pageRef;
	_showProgressBar(true);
	$.post(action, params, function(param) {
		_showProgressBar(false);

		if (param.indexOf("<script type=") != -1) 
		{
			$("#channelListMaintDiv_id_" + _pageRef).show();
			$("#channelListMaintDiv_id_" + _pageRef).html(param);
			//disable the channel Id
			document.getElementById('channel_id_'+_pageRef).disabled = true
			showHideSrchGrid('channelListGridTbl_Id_' + _pageRef);
			
			//hide/show component according to communication protocol
			channelMaint_onChangeCommuncationProtocol();
		} else 
		{
			var response = jQuery.parseJSON(param);
			_showErrorMsg(response["_error"], response["_msgTitle"], 400, 100);
		}
	}, "html");
}

function channelList_onAddClicked()
{
	var action = jQuery.contextPath
			+ "/path/channel/ChannelMaintAction_loadMaintanenceDetails.action";
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
			$("#channelListMaintDiv_id_" + _pageRef).html(data);
			_showProgressBar(false);
		}

	});
}