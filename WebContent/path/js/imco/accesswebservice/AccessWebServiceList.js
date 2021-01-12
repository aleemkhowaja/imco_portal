function accessWebServiceList_onDbClickedEvent()
{
	var $table = $("#accessWebServiceListGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var actionSrc = jQuery.contextPath
			+ '/path/accessWebService/AccessWebServiceMaintAction_retrieveSelectedTemplateId.action';
	params = {};
	params["_pageRef"] = _pageRef;
	params["iv_crud"] = ivCrud;
	params["templateId"] = myObject["imcoPwsTmpltMasterVO.TEMPLATE_ID"];
	params["templateIdOldStatus"] = myObject["imcoPwsTmpltMasterVO.STATUS"];

	$.post(actionSrc, params, function(param)
	{
		_showProgressBar(false);

		if (param.indexOf("<script type=") != -1)
		{
			$("#accessWebServiceListMaintDiv_id_" + _pageRef).show();
			$("#accessWebServiceListMaintDiv_id_" + _pageRef).html(param);
			//disable the Template Id
			document.getElementById('template_id_'+_pageRef).disabled = true
			showHideSrchGrid('accessWebServiceListGridTbl_Id_' + _pageRef);
		}
		else
		{
			var response = jQuery.parseJSON(param);
			_showErrorMsg(response["_error"], response["_msgTitle"], 400, 100);
		}
	}, "html");
}

/**
 * @description function to create a new record
 * @returns
 */
function accessWebServiceList_onAddClicked()
{
	var changes = $("#accessWebServiceMaintFormId_"+_pageRef).hasChanges();
	if(changes == 'true' || changes == true)
	{
		_showConfirmMsg(changes_made_confirm_msg,"","accessWebService_initializeAfterConfirm","yesNo");// Confirmation call if changes made
	}
	else
	{
		accessWebService_initializeAfterConfirm(true);
	}
}

/**
 * 
 * @param yesNo
 * @returns
 */
function accessWebService_initializeAfterConfirm(yesNo) 
{
	if (yesNo == true) 
	{
		var loadSrc = jQuery.contextPath + '/path/accessWebService/AccessWebServiceMaintAction_loadAccessWebServicePage.action?iv_crud=R&_pageRef=AW00MT';

		$.ajax( {
			url : loadSrc,
			type : "post",
			success : function(data) {
				if ($("#iv_crud_" + _pageRef).val() == "R")
				{
					$("#accessWebServiceList_" + _pageRef).html(data);
				}
				else
				{
					$("#accessWebServiceListMaintDiv_id_" + _pageRef).empty();
					showHideSrchGrid('accessWebServiceListGridTbl_Id_' + _pageRef);
				}
				_showProgressBar(false);

			}
		});
	}
	
	
}
