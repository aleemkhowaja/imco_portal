
/**
 * Process before Submit
 * @returns
 */
function channelMaint_processSubmit() {
	var formChanged = $("#channelMaintFormId_" + _pageRef).hasChanges();
	if (_pageRef == 'CHNLMT' || _pageRef == 'CHNLUP') 
	{
		if (!formChanged)
		{
			channelMaint_handleSaveProcess(0);
			return;
		}
		else
		{
			_showConfirmMsg(Confirm_Save_Process_key, confirm_msg_title,channelMaint_handleSaveProcess, {}, '', '', 300, 100);
		}
	}
}

/**
 * After Conformation save 
 * @returns
 */
function channelMaint_handleSaveProcess()
{

	if (confirm) 
	{
		var communicationProtocol = $("#communicationProtocol_id_"+_pageRef).val();
		var servertype = $("#serverType_"+_pageRef).val();
		
		var action = jQuery.contextPath
				+ "/path/channel/ChannelMaintAction_saveNew.action";
		
		var jsonStringUpdates = $("#channelMachineIdGridTbl_Id_" + _pageRef).jqGrid(
		'getAllRows');
		if(communicationProtocol != "T" && servertype == "HS" && jsonStringUpdates == "{\"root\":[]}")
		{
			_showErrorMsg(at_least_one_host_is_required_key,
					error_msg_title, 300, 100);
			return;
		}
		$("#updateMachineIdParameter_" + _pageRef).val(jsonStringUpdates);
		
		var formData = $("#channelMaintFormId_" + _pageRef).serializeForm();
		_showProgressBar(true);
		$.ajax({
			url : action,
			type : "post",
			data : formData,
			dataType : "json",
			success : function(data)
			{
				if (typeof data["_error"] == "undefined"
					|| data["_error"] == null)
				{
					_showProgressBar(false);
					_showErrorMsg(record_saved_Successfully_key,info_msg_title,300,100);
					
					$("#channelListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
					
					var reloadAction = jQuery.contextPath
					+ "/path/channel/ChannelMaintAction_loadMaintanenceDetails.action";
					var reloadParams = {};
					var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
					reloadParams["iv_crud"] = iv_Crud;
					reloadParams["_pageRef"] = _pageRef;
					_showProgressBar(false);
					$.ajax({
						url : reloadAction,
						type : "post",
						data : reloadParams,
						success : function(data)
						{
							$("#channelListMaintDiv_id_" + _pageRef).html(data);
							_showProgressBar(false);
						}
				
					});
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
		_showProgressBar(false);
	}
}

function channelMaint_processApprove() {
	_showConfirmMsg(Confirm_Approve_Process_key, info_msg_title,
			channelMaint_handleApproveProcess, {
				infoMessageDet : record_was_Approved_Successfully_key
			});
}

function channelMaint_handleApproveProcess(confirm)
{
	if (confirm) 
	{
		var actionUrl = jQuery.contextPath
				+ "/path/channel/ChannelMaintAction_approveChannelId.action";
		
		var jsonStringUpdates = $("#channelMachineIdGridTbl_Id_" + _pageRef).jqGrid(
		'getAllRows');
		$("#updateMachineIdParameter_" + _pageRef).val(jsonStringUpdates);
		
		var formData = $("#channelMaintFormId_" + _pageRef).serializeForm();
		_showProgressBar(true);
		$.ajax( {
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : formData,
			success : function(param) {
				if (typeof param["_error"] == "undefined"
						|| param["_error"] == null) {
					//empty form
					reloadUrl = jQuery.contextPath + "/path/channel/ChannelMaintAction_clearStpForm.action";
					var ivCrud = returnHtmlEltValue("iv_crud_"+ _pageRef);
					var reloadParams = {};
					reloadParams["iv_crud"] = ivCrud;
					reloadParams["_pageRef"] = _pageRef;
					$.post(reloadUrl,
									reloadParams,
									function(param) 
									{
										showHideSrchGrid('channelListGridTbl_Id_'+ _pageRef);
										$("#channelListMaintDiv_id_"+ _pageRef).html(param);
										//reload grid
										$("#channelListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
										_showProgressBar(false);
										_showErrorMsg(record_was_Approved_Successfully_key,info_msg_title,300,100);
									}, "html");
					
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
		_showProgressBar(false);
	}
}

function channelMaint_processSuspend() {
	_showConfirmMsg(Confirm_Suspend_Process_key, info_msg_title,
			channelMaint_handleSuspendProcess, {
				infoMessageDet : record_was_Suspended_Successfully_key
			});
}

function channelMaint_handleSuspendProcess(confirm)
{
	if (confirm) 
	{
		var actionUrl = jQuery.contextPath
				+ "/path/channel/ChannelMaintAction_suspendChannelId.action";
		
		var jsonStringUpdates = $("#channelMachineIdGridTbl_Id_" + _pageRef).jqGrid(
		'getAllRows');
		$("#updateMachineIdParameter_" + _pageRef).val(jsonStringUpdates);
		
		var formData = $("#channelMaintFormId_" + _pageRef).serializeForm();
		_showProgressBar(true);
		$.ajax( {
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : formData,
			success : function(param) {
				if (typeof param["_error"] == "undefined"
						|| param["_error"] == null) {
					//empty form
					reloadUrl = jQuery.contextPath + "/path/channel/ChannelMaintAction_clearStpForm.action";
					var ivCrud = returnHtmlEltValue("iv_crud_"+ _pageRef);
					var reloadParams = {};
					reloadParams["iv_crud"] = ivCrud;
					reloadParams["_pageRef"] = _pageRef;
					$.post(reloadUrl,
									reloadParams,
									function(param) 
									{
										showHideSrchGrid('channelListGridTbl_Id_'+ _pageRef);
										$("#channelListMaintDiv_id_"+ _pageRef).html(param);
										//reload grid
										$("#channelListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
										_showProgressBar(false);
										_showErrorMsg(record_was_Suspended_Successfully_key,info_msg_title,300,100);
									}, "html");
					
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
		_showProgressBar(false);
	}
}

function channelMaint_processReactivate() {
	_showConfirmMsg(Confirm_Reactivate_Process_key, info_msg_title,
			channelMaint_handleReactivateProcess, {
				infoMessageDet : record_reactivated_successfully_key
			});
}

function channelMaint_handleReactivateProcess(confirm)
{
	if (confirm) 
	{
		var actionUrl = jQuery.contextPath
				+ "/path/channel/ChannelMaintAction_reactivateChannelId.action";
		
		var jsonStringUpdates = $("#channelMachineIdGridTbl_Id_" + _pageRef).jqGrid(
		'getAllRows');
		$("#updateMachineIdParameter_" + _pageRef).val(jsonStringUpdates);
		
		var formData = $("#channelMaintFormId_" + _pageRef).serializeForm();
		_showProgressBar(true);
		$.ajax( {
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : formData,
			success : function(param) {
				if (typeof param["_error"] == "undefined"
						|| param["_error"] == null) {
					//empty form
					reloadUrl = jQuery.contextPath + "/path/channel/ChannelMaintAction_clearStpForm.action";
					var ivCrud = returnHtmlEltValue("iv_crud_"+ _pageRef);
					var reloadParams = {};
					reloadParams["iv_crud"] = ivCrud;
					reloadParams["_pageRef"] = _pageRef;
					$.post(reloadUrl,
									reloadParams,
									function(param) 
									{
										showHideSrchGrid('channelListGridTbl_Id_'+ _pageRef);
										$("#channelListMaintDiv_id_"+ _pageRef).html(param);
										//reload grid
										$("#channelListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
										_showProgressBar(false);
										_showErrorMsg(record_reactivated_successfully_key,info_msg_title,300,100);
									}, "html");
					
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
		_showProgressBar(false);
	}
}





function channelMaint_processDelete() {
	_showConfirmMsg(Confirm_Delete_Process_key, info_msg_title,
			channelMaint_handleDeleteProcess, {
				infoMessageDet : record_was_Deleted_Successfully_key
			});
}

function channelMaint_handleDeleteProcess(confirm)
{
	if (confirm) 
	{
		var actionUrl = jQuery.contextPath
				+ "/path/channel/ChannelMaintAction_deleteChannel.action";
		
		var jsonStringUpdates = $("#channelMachineIdGridTbl_Id_" + _pageRef).jqGrid(
		'getAllRows');
		$("#updateMachineIdParameter_" + _pageRef).val(jsonStringUpdates);
		
		var formData = $("#channelMaintFormId_" + _pageRef).serializeForm();
		_showProgressBar(true);
		$.ajax( {
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : formData,
			success : function(param) {
				if (typeof param["_error"] == "undefined"
						|| param["_error"] == null) {
					//empty form
					reloadUrl = jQuery.contextPath + "/path/channel/ChannelMaintAction_clearStpForm.action";
					var ivCrud = returnHtmlEltValue("iv_crud_"+ _pageRef);
					var reloadParams = {};
					reloadParams["iv_crud"] = ivCrud;
					reloadParams["_pageRef"] = _pageRef;
					$.post(reloadUrl,
									reloadParams,
									function(param) 
									{
										showHideSrchGrid('channelListGridTbl_Id_'+ _pageRef);
										$("#channelListMaintDiv_id_"+ _pageRef).html(param);
										//reload grid
										$("#channelListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
										_showProgressBar(false);
										_showErrorMsg(record_was_Deleted_Successfully_key,info_msg_title,300,100);
									}, "html");
					
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
		_showProgressBar(false);
	}
}

function channelMaint_checkUsrPwd()
{
	_showProgressBar(true);
	var approveUser=$("#userId_"+_pageRef).val();
	var approvePassword=$("#Password_id_"+_pageRef).val();
  
    var dataObj = { "channelCO.imApiChannelsVO.USER_ID": approveUser,
					"channelCO.channelUserPassword": approvePassword
				  };
		
	$.ajax({
				url: jQuery.contextPath+"/path/channel/ChannelMaintAction_chanelCheckUsrPwd?_pageRef="+_pageRef,
				type:"get",
				dataType:"json",
			  	data: dataObj,
				success: function(data){
		            _showProgressBar(false);
					if(data["channelCO"]["allowUserAccess"] == 1)
		 			{
						channelMaint_regenerateNewToken();
					}	
					else
					{
						_showErrorMsg("Invalid Password",
								info_msg_title, 300, 100);
						$("#Password_id_"+_pageRef).val('');
					}
		        },
			});
}

function channelMaint_emptyPass()
{
	$("#Password_id_"+_pageRef).val('');
}

function channelMaint_regenerateNewToken()
{
	var approveChanelId=$("#channel_id_"+_pageRef).val();
	var approveUser=$("#userId_"+_pageRef).val();
//	var approvePassword=$("#Password_id_"+_pageRef).val();
	var $table = $("#channelMachineIdGridTbl_Id_" + _pageRef);
	
	//get the data from the grid
	var rows = $("#channelMachineIdGridTbl_Id_"+_pageRef).jqGrid('getAllRows');
	var jsonStringUpdates = $("#channelMachineIdGridTbl_Id_" + _pageRef).jqGrid(
	'getAllRows');
	jsonMachineGrid = JSON.parse(jsonStringUpdates);
	var listMachineName = [];
	
	for (var i=0;i<jsonMachineGrid.root.length;i++)
	{
		var cur = jsonMachineGrid.root[i];
		listMachineName.push(cur["imApiChannelsDetVO.HOST_NAME"]);
	}	
	var dataObj = { "channelCO.imApiChannelsVO.CHANNEL_ID": approveChanelId,
					"channelCO.imApiChannelsVO.USER_ID": approveUser,
//					"channelCO.channelUserPassword": approvePassword,
					"channelCO.listMachineId": listMachineName
		  		  };
		$.ajax({
			url: jQuery.contextPath+"/path/channel/ChannelMaintAction_generateKey?_pageRef="+_pageRef,
			type:"get",
			dataType:"json",
		  	data: dataObj,
			success: function(data){
	            _showProgressBar(false);
				if(data["channelCO"]["imApiChannelsDetVO"]["HASH_KEY"] != null||data["channelCO"]["imApiChannelsDetVO"]["HASH_KEY"] != "")
	 			{
					var ids = $("#channelMachineIdGridTbl_Id_"+_pageRef).jqGrid('getDataIDs');
					for (var i=0;i<ids.length;i++)
					{
							
							$("#channelMachineIdGridTbl_Id_"+_pageRef).jqGrid('setCellValue',ids[i],'imApiChannelsDetVO.HASH_KEY',data["channelCO"]["listMachineId"][i]);
					}
				}
	        },
		});
}

function channelMaint_generateKey()
{
	_showProgressBar(true);
	var approveChanelId=$("#channel_id_"+_pageRef).val();
	var approveUser=$("#userId_"+_pageRef).val();
	var approvePassword=$("#Password_id_"+_pageRef).val();
	
	var $table = $("#channelMachineIdGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var machineId = myObject["imApiChannelsDetVO.HOST_NAME"];
	
	//check duplicate value
	var machineIdArr = $table.jqGrid('getCol','imApiChannelsDetVO.HOST_NAME');
	for (var i=0;i<machineIdArr.length;i++)
	{
		var cur = machineIdArr[i];
		for (var j=i+1;j<machineIdArr.length;j++)
		{
				var next = machineIdArr[j];
				if(cur!="" && next!="" && cur==next)
				{	
					_showErrorMsg(Duplicate_Value_key,error_msg_title,300,100);
					rowid = $table.jqGrid('getGridParam','selrow');
					$table.jqGrid('setCellValue',rowid,'imApiChannelsDetVO.HOST_NAME'," ");	
					_showProgressBar(false);
					return;
				}
		}
	}
  
    var dataObj = { "channelCO.imApiChannelsVO.CHANNEL_ID": approveChanelId,
    				"channelCO.imApiChannelsVO.USER_ID": approveUser,
					"channelCO.channelUserPassword": approvePassword,
					"channelCO.imApiChannelsDetVO.HOST_NAME": machineId
				  };
		
	$.ajax({
				url: jQuery.contextPath+"/path/channel/ChannelMaintAction_generateKey?_pageRef="+_pageRef,
				type:"get",
				dataType:"json",
			  	data: dataObj,
				success: function(data){
		            _showProgressBar(false);
					if(data["channelCO"]["imApiChannelsDetVO"]["HASH_KEY"] != null||data["channelCO"]["imApiChannelsDetVO"]["HASH_KEY"] != "")
		 			{
						$("#channelMachineIdGridTbl_Id_"+_pageRef).jqGrid('setCellValue',selectedRowId,'imApiChannelsDetVO.HASH_KEY',data["channelCO"]["imApiChannelsDetVO"]["HASH_KEY"]);
						$("#channelMachineIdGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",selectedRowId, 'imApiChannelsDetVO.HASH_KEY', "true");
					}
		        },
			});
}

function addMachineIdRows() 
{
	var result = $("#channelMachineIdGridTbl_Id_" + _pageRef).jqGrid('checkRequiredCells');
	if (!result)
	{
	    _showProgressBar(false);
		return;		
	}
	else
	{
		$("#channelMachineIdGridTbl_Id_"+_pageRef).jqGrid('addInlineRow',{});
	}
}

/**
 * Delete User rows
 * @param rowId
 */
function deleteMachineIdRows(rowId) 
{
	$("#channelMachineIdGridTbl_Id_"+_pageRef).jqGrid('deleteGridRow',rowId);	
}

function channel_onStatusClicked()
{
	var ChannelId = $("#channel_id_" + _pageRef).val();
	if (ChannelId == "")
	{
		return;
	}
	var loadSrc = jQuery.contextPath
			+ "/path/channel/ChannelMaintAction_search.action?ChannelId="
			+ ChannelId + "&_pageRef=" + _pageRef;
	var theFormId = "channelMaintFormId_" + _pageRef;
	showStatus(theFormId, _pageRef, loadSrc, {});
}

function channelMaint_onChangeCommuncationProtocol()
{
	var communicationProtocol = $("#communicationProtocol_id_"+_pageRef).val();
	/*if(communicationProtocol != "" && communicationProtocol == "F")
	{
		 $("#folderLocation_lbl_"+_pageRef).attr("style","display: block;");
		 $("#folderLocation_id_"+_pageRef).attr("style","display: block;");
	}
	else
	{
		$("#folderLocation_lbl_"+_pageRef).attr("style","display: none;");
		 $("#folderLocation_id_"+_pageRef).attr("style","display: none;");
	}*/
	
	
	if(communicationProtocol != "" && communicationProtocol == "T")
	{
		$("#usernameRow_"+_pageRef).attr("style","display: none");
		$("#userId_"+_pageRef).removeAttr("required");
		
		$("#accessByserviceRow_"+_pageRef).attr("style","display: none");
		$("#machineIDGridrDiv_"+_pageRef).attr("style","display: none");
		
		$("#serverTypeLbl_"+_pageRef).attr("style","display: block");
		//$("#serverType_"+_pageRef).attr("style","display: block;");
		//$("#serverType_"+_pageRef).val("TS");
		
		$("#networkDetails_"+_pageRef).attr("style","display: contents");
		$(".tcp_client").attr("style","display: none");
		$(".http_client").attr("style","display: none");
		$(".http_server").attr("style","display: none");
		
		$(".communication_protocol_tcp").attr("style","display: table-row");
		$(".communication_protocol_http").attr("style","display: none");
	}
	else
	{
		 $("#usernameRow_"+_pageRef).attr("style","display: contents;");
		 $("#userId_"+_pageRef).attr("required", "true");
		 
		 $("#accessByserviceRow_"+_pageRef).attr("style","display: contents;");
		 $("#machineIDGridrDiv_"+_pageRef).attr("style","display: contents;");
		 
		 $("#networkDetails_"+_pageRef).attr("style","display: none");
		 
		// $("#serverType_"+_pageRef).val("HS");
		 $(".http_client").attr("style","display: none;");
		 
		 $(".communication_protocol_tcp").attr("style","display: none;");
		 $(".communication_protocol_http").attr("style","display: table-row;");
		 $(".http_server").attr("style","display: table-cell;");
		 
		 $(".tcp_client").attr("style","display: none");
		 $(".tcp_server").attr("style","display: none");
	}
	
	channelMaint_onChangeServerType();
	
	
}


function channelMaint_onChangeActiveJMS()
{
	var isChecked = $( "#activeJMS_"+_pageRef+":checked" ).val();
	if(isChecked != undefined && (isChecked == "true" || isChecked == true))
	{
		$("#lbl_parallelismControl_"+_pageRef).attr("style","display: block;");
		$("#parallelismControl_"+_pageRef).attr("style","display: block;");
	}
	else
	{
		$("#lbl_parallelismControl_"+_pageRef).attr("style","display: none;");
		$("#parallelismControl_"+_pageRef).attr("style","display: none;");
	}
}


function channelMaint_onChangeServerType()
{
	var servertype = $("#serverType_"+_pageRef).val();
	var communicationProtocol = $("#communicationProtocol_id_"+_pageRef).val();
	
	if(communicationProtocol != "" && communicationProtocol == "T")
	{
		if(servertype != "" && servertype == "TC")
		{
			 $(".tcp_client").attr("style","display: block");
			 
		}
		else
		{
			 $(".tcp_client").attr("style","display: none;");
		}
		
	} else if(communicationProtocol != "" && communicationProtocol == "H")
	{
		if(servertype != "" && servertype == "HC")
		{
			 $(".http_client").attr("style","display: contents");
			 $(".http_server").attr("style","display: none;");
			 $("#userId_"+_pageRef).removeAttr("required");
		}
		else
		{
			 $(".http_client").attr("style","display: none;");
			 $(".http_server").attr("style","display: table-cell;");
			 $("#userId_"+_pageRef).attr("required", "true");
		}
	}
	
}