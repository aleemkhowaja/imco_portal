function pwsGeneration_showHideGrid(id)
{
	var display = $("#"+id).css('display');
	if('none' == display)
	{
		$("#"+id).show();
	}
	else{
		$("#"+id).hide();
	}
}

function pwsGeneration_onDbClickedEvent(data)
{
	_showProgressBar(true);	
	var grid = $("#pws_geration_Api_Id_searchGrid_"+_pageRef);
	var selectedRowId = grid.jqGrid('getGridParam', 'selrow');
	var rowData = grid.jqGrid('getRowData', selectedRowId);
    var operationID = rowData["OPERATION_ID"];
	$("#pwsGenerationOperationId_" + _pageRef).val(operationID);
	var loadSrc = jQuery.contextPath + "/path/PWSGeneration/PWSGenerationMaint_loadPWSRecord?_pageRef="+_pageRef+"&iv_crud="+$("#iv_crud_"+_pageRef).val()+"&pwsGenerationCO.operationId="+operationID;
	$.post(loadSrc, {}, function(data) {
		$("#pwsGenerationMaint_div_id_" +_pageRef).html(data);
		reloadArgGrid(operationID);
		pwsGeneration_showHideGrid("pws_generation_searchGrid_"+_pageRef)
		_showProgressBar(false);
	}, "html");
}

function reloadApiGrid(operationId)
{
		$("#pws_geration_Api_Id_"+_pageRef).jqGrid("clearGridData", true).jqGrid('setGridParam',
					  {
					   url :jQuery.contextPath+"/path/PWSGeneration/PWSGenerationAPIList_loadApiList",
					   datatype : 'json',
					   postData : { 
								"pwsGenerationCO.operationId" : operationId,
						}
					  }).trigger("reloadGrid");
	
		 setTimeout(function(){
		 }, 300);
}


function reloadArgGrid(operationId)
{
	$("#pwsGenerationParamTbl_Id_"+_pageRef).jqGrid("clearGridData", true).jqGrid('setGridParam',
			  {
		   url :jQuery.contextPath+"/path/PWSGeneration/PWSGenerationProcParamList_loadProcedureArgumentsSavedData",
			   datatype : 'json',
			   postData : { 
					"pwsGenerationCO.operationId" : operationId,
			   }
			  }).trigger("reloadGrid");

	setTimeout(function(){
	}, 300);
}
