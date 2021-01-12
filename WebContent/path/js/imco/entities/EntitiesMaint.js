function entitiesMaint_processSubmit()
{

	
	var changed = $("#entitiesMaintFormId_" + _pageRef).hasChanges();
	var Confirm_Save_key = "${Confirm_Save_key}";
	

	if (changed == 'true' || changed == true)

	{
		_showConfirmMsg(Confirm_Save_Process_key, info_msg_title,"entitiesMaint_processSubmitConfirmed", {}, '', '', 300, 100);
	}
	else
	{
		entitiesMaint_processSubmitConfirmed(true);
	}
	
	
}

function entitiesMaint_processSubmitConfirmed(yesNo)
{
	
	var changed = $("#entitiesMaintFormId_" + _pageRef).hasChanges();
	if (changed == 'true' || changed == true)
	{

		if (yesNo)
		{

			var action = jQuery.contextPath + "/path/entities/EntitiesMaintAction_saveNew.action";
			var formData = $("#entitiesMaintFormId_" + _pageRef).serializeForm();
			_showProgressBar(true);
			
			$.ajax({
				 url: action,
				 type:"post",		 
				 data: formData,
				 dataType:"json",
				 success: function(data)
				 {	
						_showProgressBar(false);
						if (typeof data["_error"] == "undefined"
								|| data["_error"] == null) {
							_showErrorMsg(record_saved_Successfully_key, info_msg_title, 300, 100);
					 $("#entitiesListGridTbl_Id_" + _pageRef).trigger(
						"reloadGrid");

				var reloadAction = jQuery.contextPath
						+ "/path/entities/EntitiesMaintAction_loadMaintanenceDetails.action";
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
						
					 $("#entitiesListMaintDiv_id_" + _pageRef)
							.html(data);
					$("#entitiesListMaintDiv_id_" + _pageRef)
						.hide();
					 showSearchGrid("entitiesListGridTbl_Id_"
								+ _pageRef);
						_showProgressBar(false);
					
						
					}

				// else
				// {
				// _showProgressBar(false);
				// }

				});

			
				
				
						}
				 }
				
			});
}
	}

else
{
	_showErrorMsg(changes_not_available_key);
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