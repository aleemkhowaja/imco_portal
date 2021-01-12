/**
 * DbClick Event on main grid row
 * @returns
 */
function MxMessageDefList_onDbClickedEvent()
{
	var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
	if (ivCrud == 'R')
	{
		var changed = $("#mxMessageDefForm_" + _pageRef).hasChanges();
		var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	    if (changed == 'true' || changed == true || isFormChanged === "1")
	    {
	    	_showConfirmMsg(changes_made_confirm_msg, "","MxMessageDefList_DbClicked", "yesNo", '', '', 300, 100);
	    }
	    else
	    {
	    	MxMessageDefList_DbClicked(true);
	    }
	}
	else
	{
		MxMessageDefList_DbClicked(true);
	}
}

/**
 * Db click on Mian grid after event
 * @param yesNo
 * @returns
 */
function MxMessageDefList_DbClicked(yesNo)
{
    if (yesNo)
    {
		_showProgressBar(true);
		var $table = $("#mxMessageDefinitionGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		// get the selected rowId
		var msgDefId = myObject["dgtl_MSG_DEFVO.DGTL_MSG_DEF_ID"];
		var action = jQuery.contextPath+"/path/mxmessagedefinition/MxMessageDefinitionMaintAction_edit";
		var params = {};
		params["criteria.mxMsgDefinitionId"] = msgDefId;
		params["_pageRef"] = _pageRef;
		params["iv_crud"] = $("#iv_crud_" + _pageRef).val();
		
		$.post(action, params, function(param)
		{
		    if (param.indexOf("<script type=") != -1)
		    {
				$("#mxMessageDefMaintDiv_id_" + _pageRef).html(param);
				_showProgressBar(false);
				showHideSrchGrid('mxMessageDefinitionGridTbl_Id_' + _pageRef);
		    }
		    else
		    {
				_showProgressBar(false);
				var response = jQuery.parseJSON(param);
				_showErrorMsg(response["_error"], response["_msgTitle"], 350, 100);
		    }
		    /**
		     * Load String 
		     * @param yesNo
		     * @returns
		     */
		    xmlEditor_loadTagsGridAfterDBClick();
		    
		}, "html");
    }
}

/**
 * Function call when clicking on status button
 * @returns
 */
function MxMessageDefList_onStatusClicked()
{
	var msgDefId = $("#DGTL_MSG_DEF_ID_" + _pageRef).val();
	if (msgDefId == "")
		return;

	var loadSrc = jQuery.contextPath
			+ "/path/mxmessagedefinition/MxMessageDefinitionStatusAction_search.action?mxMsgDefinitionId="
			+ msgDefId + "&_pageRef=" + _pageRef;
	var theFormId = "mxMessageDefForm_" + _pageRef;
	showStatus(theFormId, _pageRef, loadSrc, {});
}

/**
 * Function used to call after clicking the new button
 * @returns
 */
function MxMessageDefList_NewClickedConform()
{
	var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
	if (ivCrud == 'R')
	{
		var changed = $("#mxMessageDefForm_" + _pageRef).hasChanges();
		if (changed == 'true' || changed == true)
		{
			_showConfirmMsg(changes_made_confirm_msg, "","MxMessageDefList_NewClicked", "yesNo", '', '', 300, 100);
		}
		else
		{
			MxMessageDefList_NewClicked(true);
		}
	}
}


/**
 * Function used to after confirmation 
 * @returns
 */
function MxMessageDefList_NewClicked(yesNo)
{
	if (yesNo)
	{
		MxMessageDefMaint_clearForm();
	}
}