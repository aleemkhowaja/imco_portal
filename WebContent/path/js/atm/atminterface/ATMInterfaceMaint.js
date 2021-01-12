function AtmIntMaint_onDeleteClicked()
{
	$("#saveRecord_" + _pageRef).val(1);
	_showConfirmMsg(Confirm_Delete_Process_key, info_msg_title,
			AtmIntMaint_handleDeleteProcess, {}, '', '', 300, 100);
}

function AtmIntMaint_handleDeleteProcess(confirm)
{
	if (confirm) 
	{
		_showProgressBar(true);
		var form = $("#atmInterfaceForm_" + _pageRef).serializeForm();
		var actionUrl = jQuery.contextPath+ "/path/atmInterface/ATMInterfaceMaintAction_deleteForm.action";

		$.ajax({
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : form,

			success : function(data) {
				if (data["_error"] == null || data["_error"] == "undefined") {
					$("#interfaceListGridTbl_Id_" + _pageRef).trigger("reloadGrid");

					ATMMnt_InterfaceEmptyForm();

					_showProgressBar(false);
					_showErrorMsg(record_was_Deleted_Successfully_key, info_msg_title,300, 100);
				} else {
					_showProgressBar(false);
				}
			}
		});
	}
	$("#saveRecord_" + _pageRef).val(0);
}

function AtmIntMaint_processApprove()
{
	$("#saveRecord_" + _pageRef).val(1);
	_showConfirmMsg(Confirm_Approve_Process_key, info_msg_title,
			AtmIntMaint_handleStatusProcess, {
			isReject : false,
			mode	 : 'P',
			infoMessageDet : record_was_Approved_Successfully_key
	}, '', '', 300, 100);
}

function AtmIntMaint_processSuspend() 
{
	$("#saveRecord_" + _pageRef).val(1);
	_showConfirmMsg(Confirm_Suspend_Process_key, info_msg_title,
			AtmIntMaint_handleStatusProcess, {
			isReject : true,
			mode	 : 'S',
			infoMessageDet : record_was_Suspended_Successfully_key
	}, '', '', 300, 100);
}

function AtmIntMaint_processReactivate() {
	$("#saveRecord_" + _pageRef).val(1);
	_showConfirmMsg(Confirm_Reactivate_Process_key, info_msg_title,
			AtmIntMaint_handleStatusProcess, {
			isReject : true,
			mode	 : 'RA',
			infoMessageDet : record_reactivated_successfully_key
	}, '', '', 300, 100);
}

function AtmIntMaint_handleStatusProcess(confirm, args) {
	if (confirm) {

		var reject = args.isReject;
		var mode = args.mode;
		$("#crudMode_" + _pageRef).val(mode);
		_showProgressBar(true);
		var form = $("#atmInterfaceForm_" + _pageRef).serializeForm();

		var actionUrl = jQuery.contextPath+ "/path/atmInterface/ATMInterfaceMaintAction_handleStatusProcess.action";

		$.ajax({
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : form,

			success : function(data) 
			{
				if (data["_error"] == null || data["_error"] == "undefined") 
				{
					$("#interfaceListGridTbl_Id_" + _pageRef).trigger("reloadGrid");

					showHideSrchGrid('interfaceListGridTbl_Id_'+_pageRef);
					$("#atmInterfaceMaintDiv_id_" + _pageRef).html("");
					_showProgressBar(false);
					if(mode == 'P')
					{
						//reload the left menu
						accordionReloadMenuItem('ROOT');
					}
					_showErrorMsg(args.infoMessageDet, info_msg_title, 300, 100);

				} else {
					_showProgressBar(false);
				}
			}
		});
	}
}

function ATMMnt_CopyFields()
{
	var rows = $("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid('getAllRows'); 
	$('#isoFieldsGridData_' + _pageRef).val(rows);
	
	var localJson = $('#isoFieldsGridData_' + _pageRef); //json from hidden field 
 	var jsonSaved = "";
 	
 	if(typeof localJson != "undefined" && localJson.val() != "")
 	{
 		var newRow = null;
  		jQuery('#isoFieldsListGridTbl_Id_' + _pageRef).jqGrid('clearGridData');
  		jQuery('#isoResponseFieldsListGridTbl_Id_' + _pageRef).jqGrid('clearGridData');
  		var AllRows = localJson.val();
     	var AllRowsArray = JSON.parse(AllRows)["root"];
     	for (var i = 0; i < AllRowsArray.length; i++) 
  		{
     		newRow = {};
      		obj = AllRowsArray[i];
      		newRow['iso_INT_FLDSVO.FIELD_NO'] 		= obj['iso_FIELDVO.ID'];
      		newRow['iso_INT_FLDSVO.FIELD_NAME'] 	= obj['iso_FIELDVO.NAME'];
      		newRow['iso_INT_FLDSVO.FIELD_LENGTH'] 	= obj['iso_FIELDVO.LENGTH'];
      		newRow['iso_INT_FLDSVO.FIELD_LENL'] 	= obj['FIELD_LENL'];
      		newRow['iso_INT_FLDSVO.PARTIAL_MASK'] 	= obj['PARTIAL_MASK'];
      		newRow['iso_INT_FLDSVO.TOTAL_MASK'] 	= obj['TOTAL_MASK'];
      		newRow['iso_INT_FLDSVO.EXPRESSION'] 	= obj['EXPRESSION'];
      		newRow['iso_INT_FLDSVO.FIELD_TYPE'] 	= obj['iso_FIELDVO.FIELD_TYPE'];
      		newRow['iso_INT_FLDSVO.IS_DECIMAL_YN'] 	= obj['IS_DECIMAL_YN'];
      		$("#isoFieldsListGridTbl_Id_" + _pageRef).jqGrid('addRowData', obj['iso_FIELDVO.ID'], newRow); 
      		$("#isoResponseFieldsListGridTbl_Id_" + _pageRef).jqGrid('addRowData', obj['iso_FIELDVO.ID'], newRow); 
 		}
	}
 	ATMMnt_chechUncheckAfterLoad();
 	ATMMnt_chechUncheckResponseAfterLoad();
 	//Close Progress which is started by Grid DBClick
 	_showProgressBar(false);
}

function ATMMnt_saveInterface()
{
	if ($("#saveRecord_" + _pageRef).val() == 0) 
	{
		var isoMessageGridData = $("#isoMessageListGridTbl_Id_"+_pageRef).jqGrid('getChangedRowData');
		var isoFieldsGridData = $("#isoFieldsListGridTbl_Id_"+_pageRef).jqGrid('getChangedRowData');
		var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
		
		$("#isoMessageGridData_"+_pageRef).val(isoMessageGridData);
		$("#isoFieldsGridData_"+_pageRef).val(isoFieldsGridData);
		initSubgridData();
		_showProgressBar(true);
		
		//save /update
		var url = jQuery.contextPath+"/path/atmInterface/ATMInterfaceMaintAction_saveInterface";
		var myObject = $("#atmInterfaceForm_" + _pageRef).serializeForm();
		$.ajax({
			url : url,
			type : "post",
			dataType : "json",
			data : myObject,
			success : function(data) 
			{
			    if (data["_error"] == null || data["_error"] == "undefined") 
			    {
			    	$("#interfaceListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
			    	ATMMnt_InterfaceEmptyForm();
			    	if(ivCrud == 'UP')
			    	{
			    		//reload the left menu
						accordionReloadMenuItem('ROOT');
			    	}
					_showErrorMsg(record_saved_Successfully_key, info_msg_title, 300,100);
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

function ATMMnt_InterfaceEmptyForm()
{
    var reloadUrl = jQuery.contextPath + "/path/atmInterface/ATMInterfaceMaintAction_atmInterfaceEmptyForm.action";
	var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
	var reloadParams = {};
	reloadParams["iv_crud"] = ivCrud;
	reloadParams["_pageRef"] = _pageRef;

	$.post(reloadUrl, reloadParams, function(param) {
		$("#atmInterfaceMaintDiv_id_" + _pageRef).html(param);
	}, "html");
}

function openATM_InterfaceExpressionDialog(rowId)
{			
	var params = {};
	params["_pageRef"]		=_pageRef;
	var rowData 	= $("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid('getRowData', rowId);
	var cellData    = $("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("getCell", rowId, 'EXPRESSION'); 
	var dialogUrl	= jQuery.contextPath+ "/path/atmInterface/ATMInterfaceMaintAction_openFormateExpressionDialog"
	var dialogOptions={ autoOpen: false,
			height:460,
			title:expression_details_key,
			width:600 ,
			modal: true,
			close: function( event, ui ) {closeATM_InterfaceDialog},
			buttons: [{ text : ok_label_trans,click : saveATM_InterfaceConstr},
			{ text : cancel_label_trans, click : closeATM_InterfaceDialog}]
	}
	$.post(dialogUrl ,params , function( param )
	{
		$('#fieldFormatDialog_'+_pageRef).html(param) ;
		$('#fieldFormatDialog_'+_pageRef).dialog(dialogOptions)
		$('#fieldFormatDialog_'+_pageRef).dialog('open');
		$("#rowId_"+_pageRef).val(rowId);
		//populate data in form dialog
		if(cellData != null && cellData != "")
		{
			$("#comparisonId_"+_pageRef).val(cellData);
		}
		ATMInterface_compShowHideData();
	},"html");  
}

function saveATM_InterfaceConstr()
{
	var params = "";
	params+=$("#comparisonId_"+_pageRef).val();
	params["rowId"]				= $("#rowId_"+_pageRef).val();
	$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid('setCellValue',$("#rowId_"+_pageRef).val(),'EXPRESSION', params);
	$('#fieldFormatDialog_'+_pageRef).dialog('close');	
	ATMMnt_CopyFields();
}	

function closeATM_InterfaceDialog()
{
	 $('#fieldFormatDialog_'+_pageRef).dialog('close');	
	 $("#fieldFormatDialog_" + _pageRef).dialog("destroy");
}

function ATMInterface_compShowHideData()
{
	params={};
	params["_pageRef"]		=_pageRef;
	var url =jQuery.contextPath+"/path/atmInterface/ATMInterfaceMaintAction_retAutoCompleteData";
	$.ajax({
		url: url,
		type:"post",
		dataType:"json",
		data: params,
		success: function(param)
		{
			var expression_comparison=(param["updates1"]).split(";");
			autoCompleteConstraints("comparisonId_"+_pageRef,expression_comparison);
			//Show Data elements into Dialog grid
			var gridData = $("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid('getAllRows');
			showDataElementsInDialog(gridData);
		}
	}); 
}

function showDataElementsInDialog(data)
{
	if(typeof data != "undefined" && data != "" && data.length > 0)
 	{
		var obj, newRow;
		var AllRowsArray = JSON.parse(data)["root"];
		for (var i = 0; i < AllRowsArray.length; i++) 
  		{
     		newRow = {};
      		obj = AllRowsArray[i];
      		newRow['DATA_ELEMENT'] = obj['iso_FIELDVO.ID']+" - "+obj['iso_FIELDVO.NAME'];
      		$("#dataElementsGridTbl_Id_"+_pageRef).jqGrid('addRowData', i, newRow); 
 		}
 	}
}

function elementDialogGridClicked()
{
	var ivCrud = $("#iv_crud_"+_pageRef).val();
	var status = $("#statusId_"+_pageRef).val();
	if((ivCrud == 'R' && (status == 'A' || status == null || status == "")) || (ivCrud == 'UP' && status == 'P'))
	{
		var $table = $("#dataElementsGridTbl_Id_" + _pageRef);
		var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		// get the selected rowId
		var dataElement = myObject["DATA_ELEMENT"];
		var ele = dataElement.split(' -')[0];
		var pos = $('#comparisonId_'+_pageRef).getCursorPosition();
		
		var previousTxt = $('#comparisonId_'+_pageRef).val();
		var position = 6;
		var output = [previousTxt.slice(0, pos), "<DE"+ele+">", previousTxt.slice(pos)].join('');
		
		$('#comparisonId_'+_pageRef).val(output);
	}
}

function ATMMnt_CheckLengthLimit(event, data)
{
	var subGridId = $(data).parents('table').attr('id');
	var mainRowId =  subGridId.split("isoFieldsGridTbl_Id_"+_pageRef+"_")[1].split('_table')[0];
	var mainRowObject = $("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid('getRowData', mainRowId);
	var mainFieldLength = mainRowObject["iso_FIELDVO.LENGTH"];
	var isMainFieldDynamicLength = mainRowObject["FIELD_LENL"];
	
	var rowids = $("#"+subGridId).jqGrid('getDataIDs');
	var subGridRowObject = null;
	var subLengthTotal = Number(0);
 	for(var i = 0 ; i< rowids.length; i++)
	{
 		subGridRowObject = $("#"+subGridId).jqGrid('getRowData', rowids[i]);
 		subLengthTotal += Number(subGridRowObject['sub_FLDSVO.SUB_FLD_LENGTH'])
	}
 	
 	if((isMainFieldDynamicLength == null || isMainFieldDynamicLength == "") && subLengthTotal > mainFieldLength)
 	{
 		$(data).val("");
 		_showErrorMsg(sub_field_length_error_key, error_msg_title, 300,100);
 		return;
 	}
 	else if((isMainFieldDynamicLength != null && isMainFieldDynamicLength != "") && subLengthTotal > isMainFieldDynamicLength)
 	{
 		$(data).val("");
 		_showErrorMsg(sub_field_length_error_key, error_msg_title, 300,100);
 		return;
 	}
}

(function($, undefined) {  
	$.fn.getCursorPosition = function() {  
		var el = $(this).get(0);  
		var pos = 0;  
		if ('selectionStart' in el) {  
			pos = el.selectionStart;  
		} else if ('selection' in document) {  
			el.focus();  
			var Sel = document.selection.createRange();  
			var SelLength = document.selection.createRange().text.length;  
			Sel.moveStart('character', -el.value.length);  
			pos = Sel.text.length - SelLength;  
		}  
		return pos;  
	}  
})(jQuery); 

autoCompleteConstraints = function(theInputId,expression_cust_tags)
{ 
	var theInput = $("#"+theInputId);
	// don't navigate away from the field on tab when selecting an item
    theInput.bind( "keydown", function( event )
    {
    	if( event.keyCode === $.ui.keyCode.DOWN && !theInput.isopened)
	   	{
	       	theInput.autocomplete( "search", "" );
	   	}
    })
    .autocomplete({
    	minLength: 0,
    	inputId:theInputId,
    	source: expression_cust_tags,
    	open: function( event, ui )
    	{
    		theInput.isopened = true;
    	},
    	close: function( event, ui )
    	{
    		theInput.isopened = false;
    	},
    	focus: function()
    	{
    		// prevent value inserted on focus
    		return false;
    	},
    	select: function( event, ui )
    	{
			var cursPosition   = returnCursorPosStart(document.getElementById(theInputId));
			var strTillCurrPos = this.value.substring(0,cursPosition)
			/**
			 * [MarwanMaddah]: this pattern will catch all the words 
			 * that are exists in the input from index 0 untill the current cursor position
			 * then the last word will be replaced by the selected value from the Search result
			 */
			var patt       = /\w+/g;
			var result     = strTillCurrPos.match(patt);
			var firstPart  = "";
			if(result!= null && result.length > 0)
			{        	  
				var resultLgth = result.length;
				
				firstPart  = strTillCurrPos.substring(0,strTillCurrPos.lastIndexOf(result[resultLgth-1])); 
			}
			else
			{
				firstPart = strTillCurrPos; 
			}
			this.value = firstPart + " " +ui.item.value +" "+ this.value.substring(cursPosition);
			return false;
    	}
    });
};	


function ATMInterface_interfaceTypeChangeDep()
{
	var interfaceType = $("#int_type_"+_pageRef).val();
	if(typeof interfaceType != "undefined")
	{
		if(interfaceType == "1")
		{
			$(".iso_required_fields_"+_pageRef).attr("style", "display: table-row");
		
		}
		else
		{
			$(".iso_required_fields_"+_pageRef).attr("style", "display: none;");
		}
	}
}