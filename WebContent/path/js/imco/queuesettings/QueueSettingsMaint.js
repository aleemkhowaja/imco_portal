function queueSettingsMaint_processSubmit()
{
	var changed = $("#queueSettingsMaintFormId_" + _pageRef).hasChanges();
	if (changed == 'true' || changed == true)
	{

		var action = jQuery.contextPath + "/path/queueSettings/QueueSettingsMaintAction_saveNew.action";
		
		var gridAllRecords = $("#queueSettingsListGridTbl_Id_" + _pageRef).jqGrid('getAllRows');
		// var selRowId = gridId.jqGrid("getGridParam", "selrow");
		setInputValue("updateMode_hdn_queuesGrid_Id_" + _pageRef, gridAllRecords);
		
		var formData = $("#queueSettingsMaintFormId_" + _pageRef).serializeForm();

		$.ajax({
			url : action,
			type : "post",
			data : formData,
			dataType : "json",
			success : function(data)
			{

				_showErrorMsg(record_was_Updated_Successfully_key, info_msg_title);
				

			}

		});
	}
	else
	{
		_showErrorMsg(changes_not_available_key);
	}
}

function queueSettingsMaint_selectRadio()
{
	
	
	var order = returnHtmlEltValue("order_flag_" + _pageRef);

	if (order == "E")
	{
		$("#queueSettingsMaintDiv_id_" + _pageRef).show();
	}
	else
	{
		$("#queueSettingsMaintDiv_id_" + _pageRef).hide();
	}
}
