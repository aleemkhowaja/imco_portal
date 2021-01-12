function sytmsetMaint_processSubmit()
{

	var changed = $("#sytmsetMaintFormId_" + _pageRef).hasChanges();

	if (changed == 'true' || changed == true)

	{
		_showConfirmMsg("data_has_changed_do_you_want_to_save_changes_key ",
				Warning_key, "sytmsetMaint_processSubmitrConfirmed", "yesNo");

		// _showConfirmMsg("Changes Made,Are you sure want to ", Warning_key,
		// "sytmsetMaint_processSubmitrConfirmed", "yesNo");
	}
	else
	{
		sytmsetMaint_processSubmitrConfirmed(true);
	}

	
}

function sytmsetMaint_processSubmitrConfirmed(yesNo)
{
	var changed = $("#sytmsetMaintFormId_" + _pageRef).hasChanges();
	if (changed == 'true' || changed == true)
	{

		if (yesNo)
		{
			var action = jQuery.contextPath
					+ "/path/sytmset/SytmsetMaintAction_saveNew.action";

			var formData = $("#sytmsetMaintFormId_" + _pageRef).serializeForm();

			$
					.ajax({
						url : action,
						type : "post",
						data : formData,
						dataType : "json",
						success : function(data)
						{

							
							$("#sytmsetListGridTbl_Id_" + _pageRef).trigger(
									"reloadGrid");

							var reloadAction = jQuery.contextPath
									+ "/path/sytmset/SytmsetMaintAction_loadMaintanenceDetails.action";
							var reloadParams = {};
							var iv_Crud = returnHtmlEltValue("ivcrud_"
									+ _pageRef);
							reloadParams["iv_crud"] = iv_Crud;
							reloadParams["_pageRef"] = _pageRef;
							_showProgressBar(true);
							$.ajax({
								url : reloadAction,
								type : "post",
								data : reloadParams,
								success : function(data)
								{

									// if (typeof data["_error"] !=
									// "undefined"
									// || data["_error"] != null)
									_showErrorMsg(
											'data_inserted_successfully_key',
											info_msg_title);
									$("#sytmsetListMaintDiv_id_" + _pageRef)
											.html(data);
									$("#sytmsetListMaintDiv_id_" + _pageRef)
											.hide();
									showSearchGrid("sytmsetListGridTbl_Id_"
											+ _pageRef);
									_showProgressBar(false);
								}

							

							});

						}

					});
		}
	}
	else
	{
		_showErrorMsg('no_changes_made_key');
	}
}

function showSearchGrid(gridId)
{
	if (checkSearchGridVisible(gridId) == 0)
	{
		showHideSrchGrid(gridId);
	}
}
function hideSearchGrid(gridId)
{
	if (checkSearchGridVisible(gridId) == 1)
	{
		showHideSrchGrid(gridId);
	}
}
function checkSearchGridVisible(gridId)
{
	if ($('#gview_' + gridId).size <= 0)
	{
		alert("Invalid Grid:" + gridId);
		return 0;
	}
	var styleVal = $('#gview_' + gridId + ' .ui-state-default').attr("style");
	if (styleVal.indexOf('display: none') > 0)
	{
		return 0;
	}
	else if (styleVal.indexOf('display: block') > 0)
	{
		return 1;
	}
	else
	{
		return -1;
	}
}

function sytmsetMaint_processDelete()
{

	var action = jQuery.contextPath
			+ "/path/sytmset/SytmsetMaintAction_deleteSytmsetData.action";
	var formData = $("#sytmsetMaintFormId_" + _pageRef).serializeForm();

	$
			.ajax({
				url : action,
				type : "post",
				data : formData,
				dataType : "json",
				success : function(data)
				{
					_showErrorMsg('Delete successfully', info_msg_title);
					$("#sytmsetListGridTbl_Id_" + _pageRef).trigger(
							"reloadGrid");

					var reloadAction = jQuery.contextPath
							+ "/path/sytmset/SytmsetMaintAction_loadMaintanenceDetails.action";
					var reloadParams = {};
					var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
					reloadParams["iv_crud"] = iv_Crud;
					reloadParams["_pageRef"] = _pageRef;
					_showProgressBar(true);
					$
							.ajax({
								url : reloadAction,
								type : "post",
								data : reloadParams,
								success : function(data)
								{
									$("#sytmsetListMaintDiv_id_" + _pageRef)
											.html(data);
									_showProgressBar(false);
								}
							});

				}

			});

}

function sytmsetMaint_pingNetwork()
{

	var action = jQuery.contextPath
			+ "/path/sytmset/SytmsetMaintAction_pingNetwork.action";
	var params = {};
	params["sytmsetCO.syncBranchVO.BR_CODE"] = returnHtmlEltValue("sytmsetMaintcode_"
			+ _pageRef);
	_showProgressBar(true);

	$.ajax({
		url : action,
		type : "post",
		data : params,
		dataType : "json",
		success : function(data)
		{

			if (typeof data["_error"] == "undefined" || data["_error"] == null)
			{
				var pingStatus = data.sytmsetCO.pingStatus;
				if (pingStatus == 'true')
				{

					_showErrorMsg('ping_successfully_key', info_msg_title);
				}
				else
				{

					_showErrorMsg('ping_unsuccessfully_key', info_msg_title);
				}
				_showProgressBar(false);
			}
			else
			{
				_showProgressBar(false);
			}
		}
	});
}

function sytmsetMaint_pingDatabase()
{

	var action = jQuery.contextPath
			+ "/path/sytmset/SytmsetMaintAction_pingDatabase.action";
	var params = {};
	params["sytmsetCO.syncBranchVO.BR_CODE"] = returnHtmlEltValue("sytmsetMaintcode_"
			+ _pageRef);
	_showProgressBar(true);
	$
			.ajax({
				url : action,
				type : "post",
				data : params,
				dataType : "json",
				success : function(data)
				{

					if (typeof data["_error"] == "undefined"
							|| data["_error"] == null)
					{

						var pingStatus = data.sytmsetCO.pingStatus;
						// alert(data.sytmsetCO.PingStatus);
						if (pingStatus == 'true')
						{

							_showErrorMsg(
									'succeeded_database_server_is_on_key',
									info_msg_title);
						}
						else
						{

							_showErrorMsg(

									'failed_could_not_establish_connection_to_the_database_server_key',
									info_msg_title);
						}
						_showProgressBar(false);
					}
					else
					{
						_showProgressBar(false);
					}
				}
			});
}

function sytmsetMaint_pingSendCartridge()
{

	var action = jQuery.contextPath
			+ "/path/sytmset/SytmsetMaintAction_pingSendCartridge.action";
	var params = {};
	params["sytmsetCO.syncBranchVO.BR_CODE"] = returnHtmlEltValue("sytmsetMaintcode_"
			+ _pageRef);

	_showProgressBar(true);
	$.ajax({
		url : action,
		type : "post",
		data : params,
		dataType : "json",
		success : function(data)
		{
			if (typeof data["_error"] == "undefined" || data["_error"] == null)
			{
				var pingStatus = data.sytmsetCO.pingStatus;
				if (pingStatus == "true")
				{

					_showErrorMsg('succeeded_send_cartridge_is_on_key',
							info_msg_title);
				}
				else
				{

					_showErrorMsg('failed_send_cartridge_is_off_key',
							info_msg_title);
				}
				_showProgressBar(false);
			}
			else
			{
				_showProgressBar(false);
			}

		}
	});
}

function sytmsetMaint_pingReciveCartridge()
{

	var action = jQuery.contextPath
			+ "/path/sytmset/SytmsetMaintAction_pingReciveCartridge.action";
	var params = {};
	params["sytmsetCO.syncBranchVO.BR_CODE"] = returnHtmlEltValue("sytmsetMaintcode_"
			+ _pageRef);
	_showProgressBar(true);
	$.ajax({
		url : action,
		type : "post",
		data : params,
		dataType : "json",
		success : function(data)
		{
			if (typeof data["_error"] == "undefined" || data["_error"] == null)
			{
				var pingStatus = data.sytmsetCO.sendcartridge;
				if (pingStatus == "true")
				{

					_showErrorMsg('succeeded_receive_cartridge_is_on_key',
							info_msg_title);
				}
				else
				{

					_showErrorMsg('failed_receive_cartridge_is_off_key',
							info_msg_title);
				}
				_showProgressBar(false);
			}
			else
			{
				_showProgressBar(false);
			}
		}
	});
}