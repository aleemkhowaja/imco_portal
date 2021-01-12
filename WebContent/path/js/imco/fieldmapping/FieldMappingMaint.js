function settlChargesNotInstalmentLink(cellValue, options, rowObject)
{
	// //debugger;
	// var gridId = $("#fieldmapping_Id_" + _pageRef);
	// alert(gridId.jqGrid('getCell', 0,'syncolmappingVO.ACTION'));
	// var rowIds = gridId.jqGrid('getDataIDs');
	// alert(rowIds);
	//
	// var checkaction;
	//
	// for (var i = 0; i < rowIds.length; i++) {
	// rowId = rowIds[i];
	// //ar val1 = gridId.jqGrid('getCell', rowId, 'kpiORMatrix');
	//	
	// checkaction = gridId.jqGrid('getCell', rowId,'syncolmappingVO.ACTION');
	// // var checkaction = $myGrid
	// // .jqGrid('getCell',rowId, 'syncolmappingVO.ACTION');
	// alert(checkaction)
	//		
	// switch(checkaction)
	// {
	// case "D":
	// name = "Default Mapping";break;
	// case "F" :
	// name = "Fix Mapping";break;
	// case "G" :
	// name = "Global Mapping";break;
	//			
	//			
	//		
	// }
	//
	// }
	//
	//
	// var name;
	/*
	 * var $myGrid = $("#fieldmapping_Id_" + _pageRef); var gridAllRecords =
	 * $("#fieldmapping_Id_" + _pageRef).jqGrid('getAllRows');
	 */

	// alert(checkaction)
	//
	// if (checkaction == 'D')
	// {
	// name = "Default Mapping";
	// }
	// else if (checkaction == 'F')
	// {
	// name = "Fix Mapping";
	// }
	// else
	// (checkaction == 'G')
	// {
	// name = "Global Mapping";
	// }
	fieldformchange();

	return "<a class='fg-button ui-state-default  ui-corner-all fg-button-icon-left'  "
			+ " href='javascript:syncolmapWindow("
			+ options.rowId
			+ ")';>"
			+ "<span class='ui-icon ui-icon-newwin'/>"
			+ "<span>Mapping</span>"
			+ "</a>";

}

function syncolmapWindow(rowId)
{
	var mySrc = jQuery.contextPath
			+ "/path/fieldMapping/FieldMappingMaintAction_SyncColMapLoadDetails.action";
	var $myGrid = $("#fieldmapping_Id_" + _pageRef);
	// var iv_crud= $("#ivcrud_"+ _pageRef);

	var checkaction = $myGrid
			.jqGrid('getCell', rowId, 'syncolmappingVO.ACTION');
	var brcode = $myGrid.jqGrid('getCell', rowId, 'syncolmappingVO.BR_CODE');
	var entityCode = $myGrid.jqGrid('getCell', rowId,
			'syncolmappingVO.ENTITY_CODE');
	var colNBR = $myGrid.jqGrid('getCell', rowId, 'syncolmappingVO.COL_NBR');

	var gridAllRecords = $("#fieldmapping_Id_" + _pageRef).jqGrid('getAllRows');

	setInputValue("updateMode_hdn_fieldmapGrid_Id_" + _pageRef, gridAllRecords);

	var params = {};
	params["fieldmapCO.checkactions"] = checkaction;
	params["fieldmapCO.brcode"] = brcode;
	params["fieldmapCO.entityCode"] = entityCode;
	params["fieldmapCO.colNBR"] = colNBR;
	params["fieldmapCO.rowId"] = rowId;

	params["_pageRef"] = _pageRef;
	params["fieldmapCO.fieldmapGridListString"] = $(
			'#updateMode_hdn_fieldmapGrid_Id_' + _pageRef).val();

	if (checkaction == 'F' || checkaction == 'D' || checkaction == 'G')
	{

		dialogOptions = {
			'height' : returnMaxHeight(300),
			'width' : returnMaxWidth(950),
			'dialogClass' : "no-close"
		};

		var MergePlanDiv = $('<div id="SyncColMapping1_' + _pageRef
				+ '"></div>');

		MergePlanDiv.dialog({
			autoOpen : false,
			modal : true,
			title : 'Column Mapping',
			hide : 'clip',
			beforeClose : function(event, ui)
			{
			},
			close : function(ev, ui)
			{
				$(this).dialog("destroy");
				$(this).remove();
			}
		});

		$("#SyncColMapping1_" + _pageRef).load(mySrc, params, function()
		{

			$("#SyncColMapping1_" + _pageRef).dialog(dialogOptions);
			$("#SyncColMapping1_" + _pageRef).dialog("open");

		});
	}

}

function fixcolmapOnDeleteClicked()
{

	var $myGrid = $("#fieldmapping_Id_" + _pageRef);
	var table = $("#fixcolmapping_Id_" + _pageRef);
	var selectedRowId = table.jqGrid('getGridParam', 'selrow');
	table.jqGrid('deleteGridRow', selectedRowId);
}

function FixColMap_save1()
{

	var action = jQuery.contextPath
			+ "/path/fieldMapping/FieldMappingMaintAction_fixDataSave.action";

	var gridAllRecords = $("#fixcolmapping_Id_" + _pageRef)
			.jqGrid('getAllRows');

	var $myGrid = $("#fixcolmapping_Id_" + _pageRef);

	var selRowId = $myGrid.jqGrid("getGridParam", "selrow");
	setInputValue("updateMode_hdn_fixColMapGrid_Id_" + _pageRef, gridAllRecords);
	var params = {};
	params["fieldmapCO.fixGridListString"] = $(
			'#updateMode_hdn_fixColMapGrid_Id_' + _pageRef).val();
	params["fieldmapCO.brcode"] = $('#brcode_' + _pageRef).val();
	params["fieldmapCO.entityCode"] = $('#entityCode_' + _pageRef).val();
	params["fieldmapCO.colNBR"] = $('#colNBR_' + _pageRef).val();

	// params["fieldmapCO.fieldmapGridListString"]
	// =$('#updateMode_hdn_fieldColMapGrid_Id_' + _pageRef).val();

	// var formData = $("#fixcolmapping_Id_" + _pageRef).serializeForm();
	// var gridAllRecords = $("#fixcolmapping_Id_1" + _pageRef).jqGrid(
	// 'getAllRows');
	// var $table = $("#fixcolmapping_Id");
	// var gridData = $table.jqGrid("getAllRows");
	// alert("gridData: "+gridData);
	// setInputValue("updateMode_hdn_fixColMapGrid_Id_" , gridData);
	// var formData = $("#fixcolmapping_Id_").serializeForm();
	// alert(formData);

	$.ajax({
		url : action,
		type : "post",
		data : params,
		// dataType : "json",
		success : function(data)
		{
			$("#SyncColMapping1_" + _pageRef).dialog("destroy");
			$("#SyncColMapping1_" + _pageRef).remove();

		}

	});

}

function fixcolmapAddClicked()
{
	{
		var $myGrid = $("#fixcolmapping_Id_" + _pageRef);

		var rowIds = $myGrid.jqGrid('getDataIDs');
		var counter = 0;
		for (var i = 0; i < rowIds.length; i++)
		{
			var rowId = rowIds[i];
			var lineNo = $myGrid.jqGrid('getCell', rowId,
					'syncfixedmappingVO.LINE_NBR');
			if (lineNo == '' || lineNo == null || lineNo == undefined)
			{
				counter++;
			}
		}
		if (counter > 0 && rowIds.length > 0)
		{
			_showErrorMsg("missing_information_key", "cannot proceed");

		}
		else
		{
			var rowId = $myGrid.jqGrid("addInlineRow", {});
			// var $customizeWkspceGrid = $("#customizeWkspceGrid");
			// $myGrid.jqGrid("setCellValue", rowId,
			// "userWorkspaceVO.PROG_REF",res["progRef"]);
			// var adsa = $('#brcode_' + _pageRef).val();

			$myGrid.jqGrid('setCellValue', rowId, 'syncfixedmappingVO.BR_CODE',
					$('#brcode_' + _pageRef).val());

			$myGrid.jqGrid('setCellValue', rowId,
					'syncfixedmappingVO.ENTITY_CODE', $(
							'#entityCode_' + _pageRef).val());
			$myGrid.jqGrid('setCellValue', rowId, 'syncfixedmappingVO.COL_NBR',
					$('#colNBR_' + _pageRef).val());
		}
	}

}

function fixColMap_close()
{
	$("#SyncColMapping1_" + _pageRef).dialog("destroy");
	$("#SyncColMapping1_" + _pageRef).remove();
}

function defaultcolMap_okprocess()

{

	var action = jQuery.contextPath
			+ "/path/fieldMapping/FieldMappingMaintAction_defaultValueCheck.action";
	var $myGrid = $("#defaultcolmapping_Id_" + _pageRef);
	var $fieldGrid = $("#fieldmapping_Id_" + _pageRef);

	var params = {};
	var selectedRowId = $myGrid.jqGrid('getGridParam', 'selrow');

	// params["fieldmapCO.forcenull"] = $('#brcode_' + _pageRef).val();
	var forcenull = $myGrid.jqGrid('getCell', selectedRowId, 'forcenull_YN');

	if (forcenull == 1)
	{
		var selectedRowId = $myGrid.jqGrid('getGridParam', 'selrow');
		var colDefult = $myGrid.jqGrid('setCellValue', selectedRowId,
				'syncolmappingVO.COL_DEFAULT', null);

	}
	else
	{
		var selectedRowId = $myGrid.jqGrid('getGridParam', 'selrow');
		var colDefult = $myGrid.jqGrid('getCell', selectedRowId,
				'syncolmappingVO.COL_DEFAULT');
	}

	// var selectedRowId = $fieldGrid.jqGrid('getGridParam', 'selrow');
	var rowId = returnHtmlEltValue('rowId_' + _pageRef);

	$fieldGrid.jqGrid('setCellValue', rowId, 'syncolmappingVO.COL_DEFAULT',
			colDefult);

	$("#SyncColMapping1_" + _pageRef).dialog("destroy");
	$("#SyncColMapping1_" + _pageRef).remove();

}

function globalcolMap_okprocess()

{

	var action = jQuery.contextPath
			+ "/path/fieldMapping/FieldMappingMaintAction_globalValueCheck.action";
	var $myGrid = $("#globalcolmapping_Id_" + _pageRef);
	var $fieldGrid = $("#fieldmapping_Id_" + _pageRef);
	var params = {};
	var selectedRowId = $myGrid.jqGrid('getGridParam', 'selrow');

	// params["fieldmapCO.forcenull"] = $('#brcode_' + _pageRef).val();
	var forcenull = $myGrid.jqGrid('getCell', selectedRowId, 'forcenull_YN');

	if (forcenull == 1)
	{

		var selectedRowId = $myGrid.jqGrid('getGridParam', 'selrow');
		$myGrid.jqGrid('setCellValue', selectedRowId,
				'syncolmappingVO.COL_DEFAULT', null);
		//
		// var params = {};
		// params["fieldmapCO.globalGridListString"] = $(
		// '#updateMode_hdn_globalColMapGrid_Id_' + _pageRef).val();
		//		
		// $.ajax({
		// url : action,
		// type : "post",
		// data : params,
		// // dataType : "json",
		// success : function(data)
		// {
		// // _showProgressBar(false);
		// // _showErrorMsg('Data Inserted Successfully', info_msg_title);
		//
		// }
		//
		// });

	}
	else
	{
		var selectedRowId = $myGrid.jqGrid('getGridParam', 'selrow');
		var colDefult = $myGrid.jqGrid('getCell', selectedRowId,
				'syncolmappingVO.COL_DEFAULT');
	}

	var rowId = returnHtmlEltValue('rowId_' + _pageRef);

	$fieldGrid.jqGrid('setCellValue', rowId, 'syncolmappingVO.COL_DEFAULT',
			colDefult);

	$("#SyncColMapping1_" + _pageRef).dialog("destroy");
	$("#SyncColMapping1_" + _pageRef).remove();
	// var params = {};
	// params["fieldmapCO.globalGridListString"] = $(
	// '#updateMode_hdn_globalColMapGrid_Id_' + _pageRef).val();
	//		
	// $.ajax({
	// url : action,
	// type : "post",
	// data : params,
	// // dataType : "json",
	// success : function(data)
	// {
	// // _showProgressBar(false);
	// // _showErrorMsg('Data Inserted Successfully', info_msg_title);
	//
	// }
	//
	// });

}

function fieldMap_save()
{
	var changed = $("#fieldMappingMaintFormId_" + _pageRef).hasChanges();

	if (changed == 'true' || changed == true)

	{
		_showConfirmMsg("Data has to changed do you want to save changes ",
				Warning_key, "fieldMap_savetConfirmed", "yesNo");

		// _showConfirmMsg("Changes Made,Are you sure want to ", Warning_key,
		// "sytmsetMaint_processSubmitrConfirmed", "yesNo");
	}
	else
	{
		fieldMap_savetConfirmed(false);
	}

}

function fieldMap_savetConfirmed(yesNo)
{

	if (yesNo == 'true' || yesNo == true)
	{

		var action = jQuery.contextPath
				+ "/path/fieldMapping/FieldMappingMaintAction_fieldGridSave.action";

		var gridAllRecords = $("#fieldmapping_Id_" + _pageRef).jqGrid(
				'getAllRows');
		var $myGrid = $("#fieldmapping_Id_" + _pageRef);

		var selRowId = $myGrid.jqGrid("getGridParam", "selrow");
		setInputValue("updateMode_hdn_fieldmapGrid_Id_" + _pageRef,
				gridAllRecords);
		var formData = $("#fieldMappingMaintFormId_" + _pageRef)
				.serializeForm();
		_showProgressBar(true);
		$.ajax({
			url : action,
			type : "post",
			data : formData,
			dataType : "json",
			success : function(data)
			{

				if (typeof data["_error"] == "undefined"
						|| data["_error"] == null)
				{

					_showErrorMsg(record_was_Updated_Successfully_key,
							info_msg_title);
					$("#fieldmapping_Id_" + _pageRef).trigger("reloadGrid");
					_showProgressBar(false);

				}
				else
				{
					_showProgressBar(false);

				}
			}
		});

	}
	else
	{
		_showErrorMsg(changes_not_available_key,info_msg_title, 300, 100);
	}

}
function fieldformchange()
{

	$("#fieldMappingMaintFormId_" + _pageRef).data("changeTrack", true);

}

function forcenullProcess()
{

	var $myGrid = $("#defaultcolmapping_Id_" + _pageRef);

	var selectedRowId = $myGrid.jqGrid('getGridParam', 'selrow');

	// params["fieldmapCO.forcenull"] = $('#brcode_' + _pageRef).val();
	var forcenull = $myGrid.jqGrid('getCell', selectedRowId, 'forcenull_YN');

	if (forcenull == 1)
	{

		$myGrid.jqGrid("setCellReadOnly", selectedRowId,
				"syncolmappingVO.COL_DEFAULT", true);

	}

	else
	{

		$myGrid.jqGrid("setCellReadOnly", selectedRowId,
				"syncolmappingVO.COL_DEFAULT", false);

	}

}

function forcenullProcessglobal()
{

	var $globGrid = $("#globalcolmapping_Id_" + _pageRef);

	var selectedRowId = $globGrid.jqGrid('getGridParam', 'selrow');

	// params["fieldmapCO.forcenull"] = $('#brcode_' + _pageRef).val();
	var forcenull = $globGrid.jqGrid('getCell', selectedRowId, 'forcenull_YN');

	if (forcenull == 1)
	{

		$globGrid.jqGrid("setCellReadOnly", selectedRowId,
				"syncolmappingVO.COL_DEFAULT", true);
	}

	else
	{

		$globGrid.jqGrid("setCellReadOnly", selectedRowId,
				"syncolmappingVO.COL_DEFAULT", false);

	}

}
