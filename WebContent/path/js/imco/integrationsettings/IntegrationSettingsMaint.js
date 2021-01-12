function integrationSettingsMaint_processSubmit()
{
	var changed = $("#integrationSettingsMaintFormId_" + _pageRef).hasChanges();
	if (changed == 'true' || changed == true)
	{

		var action = jQuery.contextPath
				+ "/path/integrationSettings/IntegrationSettingsMaintAction_saveNew.action";
		var formData = $("#integrationSettingsMaintFormId_" + _pageRef)
				.serializeForm();

		$.ajax({
			url : action,
			type : "post",
			data : formData,
			dataType : "json",
			success : function(data)
			{
				
				_showErrorMsg(record_was_Updated_Successfully_key, info_msg_title);
				$("#integrationSettingsListMaintDiv_id_" + _pageRef).hide();
				$("#integrationSettingsListGridTbl_Id_" + _pageRef).trigger(
						"reloadGrid");
				
				
			}

		});
	}
	else
	{
		_showErrorMsg(changes_not_available_key);
	}
}
