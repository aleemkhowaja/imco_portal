//function entitiesList_onDbClickedEvent()
//{
//	var action = jQuery.contextPath
//	+ "/path/entities/EntitiesMaintAction_loadMaintanenceDetails.action";
//	var params = {};
//	var $table = $("#entitiesListGridTbl_Id_" + _pageRef);
//	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
//	var myObject = $table.jqGrid('getRowData', selectedRowId);
//	// get the selected rowId
//
//	var entityCode = myObject["syncEntityVO.ENTITY_CODE"];
//	
//	params["entitiesCO.syncEntityVO.ENTITY_CODE"] = entityCode;
//	
//	var iv_Crud = returnHtmlEltValue("ivcrud_" + _pageRef);
//	// alert(iv_Crud);
//	params["iv_crud"] = iv_Crud;
//	params["_pageRef"] = _pageRef;
//	_showProgressBar(true);
//
//	
//	$.ajax({
//
//		url : action,
//		type : "post",
//		data : params,
//		success : function(data)
//		{
//		
//		$("#entitiesListMaintDiv_id_" + _pageRef).show();
//			$("#entitiesListMaintDiv_id_" + _pageRef).html(data);
//			
//			_showProgressBar(false);
//
//		}
//
//	});
//}



function entitiesList_onDbClickedEvent()
{

 var changed = $("#entitiesMaintFormId_" + _pageRef).hasChanges();
 if (changed == 'true' || changed == true)
 {
	
  _showConfirmMsg(changes_made_confirm_msg, "",
    "entitiesList_onDbClickedEventConfirmed", "yesNo");
 }
 else
 {
	 entitiesList_onDbClickedEventConfirmed(true);
 }
 showHideSrchGrid('entitiesListGridTbl_Id_'+_pageRef);
}

function entitiesList_onDbClickedEventConfirmed(yesNo)
{

 if (yesNo)
 {
  var action = jQuery.contextPath
    +  "/path/entities/EntitiesMaintAction_loadMaintanenceDetails.action";
  var params = {};

  var $table = $("#entitiesListGridTbl_Id_" + _pageRef);
  var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
  var myObject = $table.jqGrid('getRowData', selectedRowId);
  var entityCode = myObject["syncEntityVO.ENTITY_CODE"];
  params["entitiesCO.syncEntityVO.ENTITY_CODE"] = entityCode;
  params["_pageRef"] = _pageRef;
  params["iv_crud"] = returnHtmlEltValue("ivcrud_" + _pageRef);
 // alert( $("#ivcrud_" + _pageRef).val())
  $("#lllll").show();

  $
    .ajax({
     url : action,
     type : "post",
     data : params,
     success : function(data)
     {

      $("#entitiesListMaintDiv_id_" + _pageRef)
        .html(data);
      $("#entitiesListMaintDiv_id_" + _pageRef)
        .show();

     }

    });
 }
}














