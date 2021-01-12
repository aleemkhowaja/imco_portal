function merchantPosMgnt_onLoad()
{
	$("div#merchantPosMgntDiv_id.collapsibleContainer").collapsiblePanel();
	$("#gview_merchantPosMgntGridTbl_Id_" + _pageRef+ " div.ui-jqgrid-titlebar").hide();
}

//reload upon clicking on new button
function merchantPosMgnt_onAddClicked()
{
	if ($("#merchantPosMgntMaintFormId_" + _pageRef).hasChanges())
	{
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(yesNo)
		 {
			if (yesNo) 
			{
				merchantPosMgnt_newAfterConfrm();
			}
		});
	}
	else
	{
		merchantPosMgnt_newAfterConfrm();
	}
}

function merchantPosMgnt_newAfterConfrm()
{
	var actionSrc = jQuery.contextPath
			+ "/path/merchantposmgnt/MerchantPosMgntMaint_loadMerchantPosMgntMaint?_pageRef="
			+ _pageRef + "&iv_crud=" + $("#iv_crud_" + _pageRef).val();
	_showProgressBar(true);
	$.post(actionSrc, {}, function(param) 
	{
		$("#merchantPosMgntListMaintDiv_id_" + _pageRef).html(param);
		_showProgressBar(false);
	}, "html");
}

//load data upon double click on main grid records
function merchantPosMgnt_onDbClickedEvent() 
{
	var changes = false;
	if ($("#merchantPosMgntMaintFormId_" + _pageRef).length != 0) 
	{
		changes = $("#merchantPosMgntMaintFormId_" + _pageRef).hasChanges();
	}
	if (changes == 'true' || changes == true)
	{
		_showConfirmMsg(changes_made_confirm_msg, "", "merchantPosMgnt_onDbClickedAfterConfirm");
	} 
	else 
	{
		merchantPosMgnt_onDbClickedAfterConfirm(true);
	}
}

//load data upon double click on main grid records
function merchantPosMgnt_onDbClickedAfterConfirm(yesNo)
{
	_showProgressBar(true);
	if (yesNo == true) 
	{
		var posMgntGrid = $("#merchantPosMgntGridTbl_Id_" + _pageRef);
		var selectedRowId = posMgntGrid.jqGrid('getGridParam', 'selrow');
		var myObject = posMgntGrid.jqGrid('getRowData', selectedRowId);
		var mCode = myObject["ctsMerchantPosVO.CODE"];
		var posStatusCode = myObject["ctsMerchantPosVO.STATUS"];
		var actionSrc = jQuery.contextPath
				+ "/path/merchantposmgnt/merchantmgnt/MerchantPosMgntMaint_loadMerchantPosMgntDetails";
		var params = {
						"code" : mCode,
						"posStatusCode" : posStatusCode,
						"_pageRef" : _pageRef,
						"iv_crud" : $("#iv_crud_" + _pageRef).val()
					};

		$.ajax({
            url: actionSrc,
            type:"post",
            dataType:"html",
            data:params, 
            success: function(data)
		    {
				var isHTML = true;
				var jsonObj = null;
				try
				{
					jsonObj = JSON.parse(data);
					isHTML = false;
				}
				catch(e)
				{
					isHTML = true;
				}
				
				if(isHTML == false)
				{
					_showErrorMsg(jsonObj["_error"], Cannot_Proceed_Key);
				}
				else
				{	
					$("#merchantPosMgntListMaintDiv_id_" + _pageRef).html(data);
					showHideSrchGrid('merchantPosMgntGridTbl_Id_' + _pageRef);
				}	
				_showProgressBar(false);
            }
         });
	}
}
