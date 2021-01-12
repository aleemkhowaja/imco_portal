function appSetMaint_processSubmit()
{

	var changed = $("#appSetMaintFormId_" + _pageRef).hasChanges();

	 if(changed == 'true' || changed == true)
		
	{
		_showConfirmMsg("Data has to changed do you want to save changes ", Warning_key,
				"appsetMaint_processSubmitConfirmed", "yesNo");
		
		// _showConfirmMsg("Changes Made,Are you sure want to ", Warning_key,
		// "sytmsetMaint_processSubmitrConfirmed", "yesNo");
	}
	
}

function formchange()
{
	
	$("#appSetMaintFormId_" + _pageRef).data("changeTrack", true);


}
	

function appsetMaint_processSubmitConfirmed(yesNo)
{
	

	if (yesNo)
	{
		
	var action = jQuery.contextPath
	+ "/path/appSet/AppSetMaintAction_saveGroupData.action";

var gridAllRecords = $("#ApplicationGrid_id_" + _pageRef).jqGrid(
	'getAllRows');

setInputValue("updateMode_hdn_appGroupsetGrid_Id_" + _pageRef, gridAllRecords);

var formData = $("#appSetMaintFormId_" + _pageRef).serializeForm();
_showProgressBar(true);
$
	.ajax({
		url : action,
		type : "post",
		data : formData,
		dataType : "json",
		success : function(data)
		{
			if (typeof data["_error"] == "undefined"
					|| data["_error"] == null)
			{

				$("#ApplicationGrid_id_" + _pageRef).trigger(
						"reloadGrid");

					_showErrorMsg(record_was_Updated_Successfully_key,
									info_msg_title);
							
							_showProgressBar(false);
						}
						else
						{
							_showProgressBar(false);
						}
		}
				});
			
	}
		
	 

}

