function setoffMaint_setoff()

{
//	_showConfirmMsg("are_you_sure_that_you_want_to_proceed_key",
//			Warning_key, "setoffMaint_setoffConfirmed", "yesNo");
	
	
	
	var action = jQuery.contextPath
	+ "/path/setoff/SetoffMaintAction_setoff.action";
	

checkSetoff();
	var gridAllRecords = $("#setoffListGridTbl_Id_" + _pageRef).jqGrid(
	'getAllRows');
	
var $myGrid = $("#setoffListGridTbl_Id_" + _pageRef);

var selRowId = $myGrid.jqGrid("getGridParam", "selrow");

setInputValue("updateMode_hdn_setoffGrid_Id_" + _pageRef,
	gridAllRecords);
// alert(gridAllRecords);
var formData = $("#setoffMaintFormId_" + _pageRef)
	.serializeForm();
_showProgressBar(true);
$
	.ajax({
		url : action,
		type : "post",
		data : formData,
		dataType : "json",
		success : function(data)
		{
			// alert(data["_error"]);
			if (typeof data["_error"] == "undefined"
					|| data["_error"] == null)
			{
				_showErrorMsg(setoff_successfully_key,
						info_msg_title);

				$("#setoffListGridTbl_Id_" + _pageRef).trigger(
						"reloadGrid");
				_showProgressBar(false);
			}
			else
			{

				$("#setoffListGridTbl_Id_" + _pageRef).trigger(
						"reloadGrid");
				$myGrid.jqGrid('setCellValue', selRowId,
						'setoffchck', 'Y');
				_showProgressBar(false);
			}

		}
	});
	
	


}







function checkSetoff()
{

	var myGrid = $("#setoffListGridTbl_Id_" + _pageRef);
	var selRowIds = myGrid.jqGrid('getGridParam', 'selarrrow');
	// alert(selRowIds);

	for (var i = 0; i < selRowIds.length; i++)
	{
		// alert("selRowIds[i]:" + selRowIds[i]);

		myGrid.jqGrid('setCellValue', selRowIds[i], "setoffchck", 'Y');
	}

}


function setoffMaint_refresh()
{

	var changed = $("#setoffMaintFormId_" + _pageRef).hasChanges();
	(changed == 'true' || changed == true)
	{
		_showConfirmMsg(do_you_want_to_refresh_key, "",
				"setoffMaint_refreshConfirmed", "yesNo");
	}

}



function setoffMaint_refreshConfirmed(yesNo)
{
	if (yesNo)
		{
	
	var action = jQuery.contextPath + "/path/setoff/SetoffMaintAction_refresh.action";
	var formData = $("#setoffMaintFormId_" + _pageRef).serializeForm();
	
	
	$.ajax({
		 url: action,
		 type:"post",		 
		 data: formData,
		 dataType:"json",
		 success: function(data)
		 {	
			 _showErrorMsg(refreshed_successfully_key, info_msg_title);
			 $("#setoffListGridTbl_Id_" + _pageRef).trigger(
				"reloadGrid");
		 }
		
	});
		}
	
}