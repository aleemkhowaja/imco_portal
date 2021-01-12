function newApiMaint_processSubmit()
{

	var changed = $("#newApiMaintFormId_" + _pageRef).hasChanges();

	if (changed == 'true' || changed == true)
		
	{
		_showConfirmMsg("confirm_save_process_key ", Warning_key,
				"newApiMaint_processSubmitConfirmed", "yesNo");
		
		// _showConfirmMsg("Changes Made,Are you sure want to ", Warning_key,
		// "sytmsetMaint_processSubmitrConfirmed", "yesNo");
	}
	else
	{
		newApiMaint_processSubmitConfirmed(true);
	}
	
//	var action = jQuery.contextPath
//			+ "/path/newApi/NewApiMaintAction_saveNew.action";
//
//	var gridAllRecords = $("#newApiUserGrid_Id_" + _pageRef).jqGrid(
//			'getAllRows');
//	var gridAllRecords2 = $("#machineGrid_Id_" + _pageRef).jqGrid('getAllRows');
//	var gridAllRecords3 = $("#argumentsGrid_Id_" + _pageRef).jqGrid(
//			'getAllRows');
//	setInputValue("updateMode_hdn_userGrid_" + _pageRef, gridAllRecords);
//	setInputValue("updateMode_hdn_machineGrid_" + _pageRef, gridAllRecords2);
//	setInputValue("updateMode_hdn_argumentsGrid_" + _pageRef, gridAllRecords3);
//	var formData = $("#newApiMaintFormId_" + _pageRef).serializeForm();
//
//	$
//			.ajax({
//				url : action,
//				type : "post",
//				data : formData,
//				dataType : "json",
//				success : function(data)
//				{
//					if (typeof data["_error"] == "undefined"
//							|| data["_error"] == null)
//					{
//
//						$("#newApiListGridTbl_Id_" + _pageRef).trigger(
//								"reloadGrid");
//
//						var reloadAction = jQuery.contextPath
//								+ "/path/newApi/NewApiMaintAction_loadMaintanenceDetails.action";
//						var reloadParams = {};
//						var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
//						reloadParams["iv_crud"] = iv_Crud;
//						reloadParams["_pageRef"] = _pageRef;
//						_showProgressBar(true);
//						$.ajax({
//							url : reloadAction,
//							type : "post",
//							data : reloadParams,
//							success : function(data)
//							{
//								if (typeof data["_error"] == "undefined"
//										|| data["_error"] == null)
//								{
//									_showErrorMsg('Data Saved Successfully',
//											info_msg_title);
//									$("#newApiListMaintDiv_id_" + _pageRef)
//											.html(data);
//									_showProgressBar(false);
//								}
//								else
//								{
//									_showProgressBar(false);
//								}
//							}
//						});
//					}
//				}
//
//			});
}


function newApiMaint_processSubmitConfirmed(yesNo)
{
	var changed = $("#newApiMaintFormId_" + _pageRef).hasChanges();
	 if (changed == 'true' || changed == true)
		{ 

	if (yesNo)
	{
		var action = jQuery.contextPath
		+ "/path/newApi/NewApiMaintAction_saveNew.action";

var gridAllRecords3 = $("#argumentsGrid_Id_" + _pageRef).jqGrid('getAllRows');
setInputValue("updateMode_hdn_argumentsGrid_" + _pageRef, gridAllRecords3);
var formData = $("#newApiMaintFormId_" + _pageRef).serializeForm();

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

					$("#newApiListGridTbl_Id_" + _pageRef).trigger(
							"reloadGrid");

					var reloadAction = jQuery.contextPath
							+ "/path/newApi/NewApiMaintAction_loadMaintanenceDetails.action";
					var reloadParams = {};
					var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
					reloadParams["iv_crud"] = iv_Crud;
					reloadParams["_pageRef"] = _pageRef;
					_showProgressBar(true);
					$.ajax({
						url : reloadAction,
						type : "post",
						data : reloadParams,
						success : function(data)
						{
							if (typeof data["_error"] == "undefined"
									|| data["_error"] == null)
							{
								_showErrorMsg(record_was_Updated_Successfully_key, info_msg_title);
								$("#newApiListMaintDiv_id_" + _pageRef)
										.html(data);
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

		});

}
		}
	 else
	 {
	  _showErrorMsg(changes_not_available_key,info_msg_title);
	 }
}


 function newapiMaint_processDelete() {

	var action = jQuery.contextPath
			+ "/path/newApi/NewApiMaintAction_deleteApiData.action";
	var formData = $("#newApiMaintFormId_" + _pageRef).serializeForm();

	$.ajax({
				url : action,
				type : "post",
				data : formData,
				dataType : "json",
				success : function(data) {
					if (typeof data["_error"] == "undefined"
							|| data["_error"] == null) {
						_showErrorMsg('Delete successfully', info_msg_title);
						$("#newApiListGridTbl_Id_" + _pageRef).trigger(
								"reloadGrid");

						var reloadAction = jQuery.contextPath
								+ "/path/newApi/NewApiMaintAction_loadMaintanenceDetails.action";
						var reloadParams = {};
						var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
						reloadParams["iv_crud"] = iv_Crud;
						reloadParams["_pageRef"] = _pageRef;
						_showProgressBar(true);
						$.ajax({
							url : reloadAction,
							type : "post",
							data : reloadParams,
							success : function(data) {
								$("#newApiListMaintDiv_id_" + _pageRef).html(
										data);
								_showProgressBar(false);
							}
						});
					}
				}

			});

}

function reloadParamGrid(){
	
	var argumentsGridId = $("#argumentsGrid_Id_" + _pageRef);

	var postDataObj = argumentsGridId.jqGrid("getGridParam","postData")

	var procedureName = $("#newApiMaintprocedure_" + _pageRef).val();

	postDataObj["criteria.procedureName"] = procedureName;

	
	argumentsGridId.jqGrid("setGridParam",{url:jQuery.contextPath+"/path/newApi/NewApiListAction_loadArgGridParams",postData:postDataObj}).trigger("reloadGrid");	

}
