/**
 * This funnction will be called upon clicking on status button 
 * @param {Object} param
 */
function merchantPosMgnt_onStatusClicked() 
{
	var merchantPosCode = $("#code_" + _pageRef).val();
	if (merchantPosCode == "")
		return;
	var loadSrc = jQuery.contextPath+ "/path/merchantposmgnt/merchantPosMgntStatusAction_search.action?code="+ merchantPosCode + "&_pageRef=" + _pageRef;
	showStatus("merchantPosMgntMaintFormId_" + _pageRef, _pageRef, loadSrc, {});
}

//used for save/delete/approve
function merchantPosMgnt_setMethodName(methodName) 
{
	$("#merchantPosMethodName_" + _pageRef).val(methodName);
}

//used for save/delete/approve
function merchantPosMgnt_BtnFunc() 
{
	var methodName = $("#merchantPosMethodName_" + _pageRef).val();
	if (methodName != "delete") 
	{
		applyMerchantPosMgntFunct(methodName);
	}
	else 
	{
		deleteMerchantPosMgntFunct();
	}
}
//used for delete
function deleteMerchantPosMgntFunct() 
{
	_showConfirmMsg(Confirm_Delete_Process_key, Warning_key, function(yesNo) 
		{
		if (yesNo) 
		{
			applyMerchantPosMgntFunct("delete");
		}
	});
}

//used for save/approve
function applyMerchantPosMgntFunct(methodName) 
{
	var iv_crud = $("#iv_crud_" + _pageRef).val();
	var changes = "";

	if (methodName == 'saveNew') 
	{
		changes = $("#merchantPosMgntMaintFormId_" + _pageRef).hasChanges(true);
	}
	if ((changes == 'true' || changes == true) || (methodName != 'saveNew'))
	{
		var actionSrc = jQuery.contextPath+ "/path/merchantposmgnt/MerchantPosMgntMaint_" + methodName+ "?iv_crud=" + iv_crud;

		var theForm = $("#merchantPosMgntMaintFormId_" + _pageRef).serializeForm();
		_showProgressBar(true);
		$.ajax( {
			url : actionSrc,
			type : "post",
			dataType : "json",
			data : theForm,
			success : function(data) 
			{
				_showProgressBar(false);
				if (typeof data["_error"] == "undefined" || data["_error"] == null) 
				{
					if (iv_crud == "R") 
					{
						merchantPosMgnt_newAfterConfrm();
					} 
					
					//Code to show alert for the action performed
					if(methodName == 'saveNew')
					{
						 _showErrorMsg(record_saved_Successfully_key, info_msg_title, 300,100);
						 if(iv_crud == 'UP')
						 {
							showHideSrchGrid('merchantPosMgntGridTbl_Id_'+_pageRef);
							$("#merchantPosMgntListMaintDiv_id_" + _pageRef).html("");
						 }
						 else
						 {
							 merchantmgnt_initializeAfterConfirm(true); 
						 }
					}
					else if(methodName == 'delete')
					{
						 _showErrorMsg(record_was_Deleted_Successfully_key, info_msg_title, 300,100);
						 merchantmgnt_initializeAfterConfirm(true);
					}
					else if(methodName == 'approve')
					{
						_showErrorMsg(record_was_Approved_Successfully_key, info_msg_title, 300,100);
						showHideSrchGrid('merchantPosMgntGridTbl_Id_'+_pageRef);
						$("#merchantPosMgntListMaintDiv_id_" + _pageRef).html("");
					}
					else if(methodName == 'toCancel')
					{
						showHideSrchGrid('merchantPosMgntGridTbl_Id_'+_pageRef);
						$("#merchantPosMgntListMaintDiv_id_" + _pageRef).html("");
					}
					else if(methodName == 'cancel')
					{
						_showErrorMsg(record_was_canceled_successfully_key, info_msg_title, 300,100);
						showHideSrchGrid('merchantPosMgntGridTbl_Id_'+_pageRef);
						$("#merchantPosMgntListMaintDiv_id_" + _pageRef).html("");
					}
					
					$("#merchantPosMgntGridTbl_Id_" + _pageRef).trigger("reloadGrid");
				}
			}
		});
	}
}
