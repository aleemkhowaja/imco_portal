function integrationSettingsList_onDbClickedEvent()
{

	var changed = $("#integrationSettingsMaintFormId_" + _pageRef).hasChanges();
	if (changed == 'true' || changed == true)
	{
		_showConfirmMsg(changes_made_confirm_msg, "",
				"integrationSettingsList_onDbClickedEventConfirmed", "yesNo");
	}
	else
	{
		integrationSettingsList_onDbClickedEventConfirmed(true);
	}
	showHideSrchGrid('integrationSettingsListGridTbl_Id_'+_pageRef);
}

function integrationSettingsList_onDbClickedEventConfirmed(yesNo)
{

	if (yesNo)
	{
		var action = jQuery.contextPath
				+ "/path/integrationSettings/IntegrationSettingsMaintAction_loadMaintanenceDetails.action";
		var params = {};

		var $table = $("#integrationSettingsListGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		var brCode = myObject["sync_entity_parametersblobVO.BR_CODE"];
		var entityCode = myObject["sync_entity_parametersblobVO.ENTITY_CODE"];
		params["integrationSettingsCO.sync_entity_parametersblobVO.BR_CODE"] = brCode;
		params["integrationSettingsCO.sync_entity_parametersblobVO.ENTITY_CODE"] = entityCode;
		params["_pageRef"] = _pageRef;
		params["iv_crud"] = $("#iv_crud_" + _pageRef).val();
		$("#DSS").show();

		$
				.ajax({
					url : action,
					type : "post",
					data : params,
					success : function(data)
					{

						$("#integrationSettingsListMaintDiv_id_" + _pageRef)
								.html(data);
						$("#integrationSettingsListMaintDiv_id_" + _pageRef)
								.show();
						
					}

				});
	}
}