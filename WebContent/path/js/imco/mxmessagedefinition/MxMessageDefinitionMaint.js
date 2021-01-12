function MxMessageDefMaint_processSubmit()
{
	MxMessageDefMaint_save();
}


/**
 * Save Ms Message Definition Record
 * @returns
 */
function MxMessageDefMaint_save()
{
	if ($("#saveRecord_" + _pageRef).val() == 1) return;
	var isFormChanged =  $("#isFormChanged_" + _pageRef).val();
	var changes = $("#mxMessageDefForm_" + _pageRef).hasChanges();
	if ((changes == 'false' || changes == false) || isFormChanged === "0")
	{
		_showErrorMsg(changes_not_available_key, info_msg_title);
		return;
	}
		
	var fileType = $('#fileType_' + _pageRef).val();
	_showProgressBar(true);
	// save /update
	var url = jQuery.contextPath
			+ "/path/mxmessagedefinition/MxMessageDefinitionMaintAction_save";
	var myObject = $("#mxMessageDefForm_" + _pageRef).serializeForm();
    $.ajax({
    	url : url,
    	type : "post",
    	dataType : "json",
    	data : myObject,
    	success : function(data) 
    	{
    		if (data["_error"] == null || data["_error"] == "undefined") 
    		{
    			$("#mxMessageDefinitionGridTbl_Id_" + _pageRef).trigger("reloadGrid");
    			MxMessageDefMaint_clearForm();
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




function dynamicFileStructureMaint_changeCase(element)
{
	var value = $("#"+element.id).val();
	$("#"+element.id).val(value.toUpperCase());
}

function MxMessageDefinitionMaint_uploadFile()
{
	var fileName = document.getElementById("upload_" + _pageRef).value;
	var ext = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
	ext = ext.toUpperCase();
	$('#fileType_'+_pageRef).val(ext);
	if (ext == "XML" || ext == "XSD") 
	{
//		var files = document.getElementById("upload_" + _pageRef).files;
//	    var file = files[0];
//		var fileSizeKB = file.size / 1024;
//	    if(fileSizeKB > 100)
//	    {
//	    	_showErrorMsg("File size must be upto 100 KB", info_msg_title, 300,100);
//	    	return; 
//	    }
		$("#xmlEditor_"+_pageRef).show();
		$("#textEditor_"+_pageRef).hide();
		xmlEditor_uploadFile();
	}
	else if(ext == "CSV" || ext == "TXT")
	{
		$("#xmlEditor_"+_pageRef).hide();
		$("#textEditor_"+_pageRef).show();
		dynamicStructureData_uploadTxtFile(false);
	}
	else
	{
		_showProgressBar(false)
		$("#xmlEditor_"+_pageRef).hide();
		$("#textEditor_"+_pageRef).hide();
		_showErrorMsg("File type not allowed");
	}
}

/**
 * Clear form
 * @returns
 */
function MxMessageDefMaint_clearForm()
{
	$("#mxMessageDefinitionGridTbl_Id_" + _pageRef).trigger("reloadGrid");

	var reloadAction = jQuery.contextPath
			+ "/path/mxmessagedefinition/MxMessageDefinitionMaintAction_clearForm.action";
	var reloadParams = {};
	reloadParams["_pageRef"] = _pageRef;
	reloadParams["iv_crud"] = $("#iv_crud_" + _pageRef).val();
	
	_showProgressBar(true);
	$.ajax({
		url : reloadAction,
		type : "post",
		data : reloadParams,
		success : function(data)
		{
			$("#mxMessageDefMaintDiv_id_" + _pageRef).html(data);
			_showProgressBar(false);
		}

	});
}


function dynamicFileStructure_onStatusClicked()
{
	var theParams = {};
	var loadSrc  = jQuery.contextPath+"/path/dynamicFileStructure/DynamicFileStructureStatusAction_search.action";
	var theFormId = "dynamicFileStructureMaintFormId_"+_pageRef;
	showStatus(theFormId, _pageRef, loadSrc, theParams);
}



/**
 * Process approve after clicking the approve button
 * @returns
 */
function MxMessageDefinitionMaint_processApprove()
{
	$("#saveRecord_" + _pageRef).val("1");
	_showConfirmMsg(
		Confirm_Approve_Process_key, 
		info_msg_title,
		"MxMessageDefinitionMaint_handleStatusProcess", 
		{
			isReject : false,
			mode : 'P',
			infoMessageDet : record_was_Approved_Successfully_key
		}, '', '', 300, 100);
}

/**
 * Process Delete after clicking the delete button
 * @returns
 */
function MxMessageDefinitionMaint_processDelete()
{
	$("#saveRecord_" + _pageRef).val("1");
	_showConfirmMsg(
		Confirm_Delete_Process_key, 
		info_msg_title,
		"MxMessageDefinitionMaint_handleStatusProcess", 
		{
			isReject : false,
			mode : 'D',
			infoMessageDet : record_was_Deleted_Successfully_key
		}, '', '', 300, 100);
}


/**
 * Handle all statuses like delete, approve, suspend, reactivate
 * @param confirm
 * @param args
 * @returns
 */
function MxMessageDefinitionMaint_handleStatusProcess(confirm, args) {
	if (confirm) 
	{
		var reject = args.isReject;
		var mode = args.mode;
		$("#crudMode_" + _pageRef).val(mode);
		_showProgressBar(true);
		var form = $("#mxMessageDefForm_" + _pageRef).serializeForm();

		var actionUrl = jQuery.contextPath
				+ "/path/mxmessagedefinition/MxMessageDefinitionMaintAction_handleStatusProcess.action";

		$.ajax({
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : form,
			success : function(data) {
				if (data["_error"] == null
					|| data["_error"] == "undefined") 
				{
						$("#mxMessageDefinitionGridTbl_Id_" + _pageRef).trigger("reloadGrid");
						showHideSrchGrid('mxMessageDefinitionGridTbl_Id_'+ _pageRef);
						$("#mxMessageDefMaintDiv_id_" + _pageRef).html("");

						_showProgressBar(false);
						_showErrorMsg(args.infoMessageDet, info_msg_title,300, 100);
						
						/**
						 * Clear form for Delete
						 */
						if(mode == "D")
						{
							MxMessageDefMaint_clearForm();
						}

				} else {
					_showProgressBar(false);
				}
			}
		});
	}
}



/**
 * load Main Tags Grid
 * 
 * @returns
 */
function MxMessageDefinitionMaint_loadTagsGrd(co)
{
	var status = $("#STATUS_"+_pageRef).val();
	var msgDefid = $("#DGTL_MSG_DEF_ID_"+_pageRef).val();
	
	if(co == null || typeof co == "undefined") return;
	//get all tag cos
	var tagsList = co.tagsCos;
	
	if(tagsList == null || typeof tagsList == "undefined" || tagsList.length <= 0 ) return;
	
	for(var i=0; i<tagsList.length; i++)
	{
		var childRows = tagsList[i].childTagList;
		var rowdata = JSON.stringify(childRows);
		if(rowdata != "")
		{
			//add root for json string
			rowdata  = "{"+ "\"root\":"+rowdata +"}";
		}
		
		tagsList[i].childTags = rowdata;
		
		$("#mxMsgDefTagListGridTbl_Id_" + _pageRef).jqGrid('addRowData', i, tagsList[i]);	
		
		
		var newRowId = tagsList[i].tagName+"_"+_pageRef+"_"+i;
		
		//change main grid row menually
		$("#mxMsgDefTagListGridTbl_Id_" + _pageRef+" tr[id="+i+"]").attr('id',newRowId);
		
		/**
		 * disable checkbox id the status will approve
		 */
		if(status == 'P' || _pageRef == 'MXMD00P')
		{
			$("#"+newRowId).find("input[type=checkbox]").attr('disabled', 'disabled');
			$("#"+newRowId).find("input[type=checkbox]").attr('readonly', 'readonly');
		}
		
		/**
		 * if the tag contains the child rows then remove checkbox
		 */
    	if(typeof childRows != "undefined" && childRows != "")
    	{
    		$("#"+newRowId).find("input[type=checkbox]").remove();
    		if(msgDefid != null && typeof msgDefid != "undefined")
    		{
    			$("#mxMsgDefTagListGridTbl_Id_" + _pageRef).find("#"+newRowId).addClass("ui-state-highlight");
    		}
    	}
    	
		//add simple type details
		if(!$.isEmptyObject(tagsList[i].simpleTypeCO) && tagsList[i].simpleTypeCO.minLength > 0)
		{
			//select rows which manadatory
			if( !$('#mxMsgDefTagListGridTbl_Id_'+_pageRef).find("#"+newRowId).hasClass("ui-state-highlight"))
			{
				$('#mxMsgDefTagListGridTbl_Id_'+_pageRef).jqGrid('setSelection',newRowId, true);// select rows for manadatory tags
			}
		}
	}
}


/**
 * 
 * @param event
 * @param data
 * @returns
 */
function MxMessageDefinitionMaint_onTagsGridCompleteTopics(gridId)
{
	//adjust the width of child grids
	$("#"+gridId+",#gbox_"+gridId+",#gview_"+gridId).css("width","inherit");
	$("#gview_"+gridId).children(".ui-jqgrid-bdiv").css("width","inherit");
	
	//remove grean color from rows
	$('td').removeClass("path-subgrd-hdr");
	
	
	var grid = $("#"+gridId); 
	//$("#mxMsgDefTagListGridTbl_Id_"+_pageRef)
	var ids = grid.jqGrid('getDataIDs');
	for (var i = 0; i < ids.length; i++) 
	{
		var rowid = ids[i];
		
		var myObject = grid.jqGrid('getRowData', rowid);
		var childData = myObject["childTags"];
		
		var gridExpand = "0";
		var hField = rowid + "_subGrid_" + _pageRef;
		
		/**
		 * if there is no any child record then continue and 
		 * no to add the + button
		 */ 
		if(childData == "" || typeof childData == "undefined") continue;
		
		$('#' + rowid).children("td.sgcollapsed").unbind().html("");
		$('#' + rowid).children("td.sgcollapsed").append('<span id="icon_' + rowid + '_' + _pageRef + '" onclick = "loadDynamicSubGrid(event, ' + rowid + ')"  class="ui-icon ui-icon-plus"></span>');
		
		
		/**
		 *  dynamically create a hidden field having id field_pageRef 
		**/
		var fId = rowid + "_subGrid_" + _pageRef;
		var fName = rowid + "_subGrid_" + _pageRef;
		var fValue = gridExpand;
		returnHiddenField(fId, fName, fValue, 'form');
	}

	/**
	 * After db clicking from main grid
	 * and after loading the tags grid
	 * the saved records should be selected
	 */
	var msgDefId = $("#DGTL_MSG_DEF_ID_"+_pageRef).val();
	var selectedtags = $("#selectedTagsData_" + _pageRef).val();
	if(msgDefId != "" && typeof msgDefId != "undefined" && selectedtags != "" && typeof selectedtags != "undefined")
	{
		MxMessageDefinitionMaint_selectSavedRows(gridId);
	}
}

/**
 * select row if that row is already saved after dbclick the record from main grid
 * 1- convert jso to list object
 * 2 - itertate and match the condition
 */
function MxMessageDefinitionMaint_selectSavedRows(gridId) 
{
	var grid = $("#" + gridId);
	var ids = grid.jqGrid('getDataIDs');
	for (var i = 0; i < ids.length; i++) {
		var rowid = ids[i];

		var rowObject = grid.jqGrid('getRowData', rowid);
        var gridRowIsLeaf = rowObject["isLeafYN"];
		var gridRowTagHierarchy = rowObject["tagHierarchy"];
		var gridRowTagName = rowObject["tagName"];
		
		var selectedtags = $("#selectedTagsData_" + _pageRef).val();
		selectedtags = JSON.parse(selectedtags);

		for (var j = 0; j < selectedtags.length; j++) 
		{
			var selectedobj  = selectedtags[j];
			var tagHierarchy = selectedobj.tagHierarchy;
			var name 		 = selectedobj.tagName;
			var description  = selectedobj.description;
			var tagId 		 = selectedobj.tagId;
			
			/**
			 * Select parent row if these is any child leaf tag saved
			 */
			if(gridRowIsLeaf == ""  || typeof gridRowIsLeaf == "undefined" || gridRowIsLeaf == "N")
			{
				var tagHierarchySplited = tagHierarchy.split("_");
				var temp = "";
				for(var k=0; k<tagHierarchySplited.length; k++)
				{
					temp+=tagHierarchySplited[k];
					if((gridRowTagHierarchy+"_"+gridRowTagName) == temp)
					{
						console.log("temp::"+temp);
						console.log(gridRowTagHierarchy+"_"+gridRowTagName);
						
						if( !$("#" + gridId).find("#"+rowid).hasClass("ui-state-highlight"))
						{
							$("#" + gridId).find("#"+rowid).addClass("ui-state-highlight");
						}
					}
					temp+="_";
				}
				
//				if((gridRowTagHierarchy+"_"+gridRowTagName) == tagHierarchy)
//				{
//					if( !$("#" + gridId).find("#"+rowid).hasClass("ui-state-highlight"))
//					{
//						$("#" + gridId).find("#"+rowid).addClass("ui-state-highlight");
//					}
//				}
			}
			/**
			 * if there is leaf/child tag saved the select the row
			 */
			else
				if (name == gridRowTagName && tagHierarchy == gridRowTagHierarchy) 
				{
																// manadatory tags
					$("#" + rowid).find("input[type=checkbox]").attr('checked',true);
					grid.find("#" + rowid).attr("changed", "1");
					
					grid.jqGrid('setCellValue',rowid,'description',description);
					grid.jqGrid('setCellValue',rowid,'tagId',tagId);
					
					/**
					 * the row is not selected the select
					 */
					if( !$("#" + gridId).find("#"+rowid).hasClass("ui-state-highlight"))
					{
						grid.jqGrid('setSelection', rowid, true);// select rows for
					}
				}
		}
	}
}



/**
 * load dynamic sub grid from action and return the jsp where sub grid is
 * defined
 * 
 * @param event
 * @param rowObj
 * @param fn
 * @returns
 */
function loadDynamicSubGrid(event,rowObj, fn) 
{
	var parentRowId = rowObj.id;
	var parentGridId = null;
	var hFSelector = parentRowId + "_subGrid_" + _pageRef;
	var closed = $("#" + hFSelector).val();
	var iconId = "icon_" + parentRowId + "_" + _pageRef;
	if (undefined == parentRowId) 
	{
		rowObj = rowObj[rowObj.length - 1];
	}
	
	parentRowId = rowObj.id;
	if(rowObj.offsetParent != null)
	{
		parentGridId = rowObj.offsetParent.id;
	}
	else{
		parentGridId = getGridIdFromRow(parentRowId);
	}
	
	var parentGrid = $("#" + parentGridId);
	var status = $("#STATUS_"+_pageRef).val();
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	
	if (hasSubGrid(parentRowId) && closed == "0") 
	{
		showSubGridByParentRowId(parentRowId);
		return;
	}
	
	
	if (undefined == closed || closed == "0") 
	{
		$("#" + hFSelector).val("1");
		var gridParam = {
			"mxMessageDefinitionCO.parentGridId": parentGridId,
			"mxMessageDefinitionCO.parentRowId" : parentRowId,
			"mxMessageDefinitionCO.dgtl_MSG_DEFVO.STATUS" : status,
			"_pageRef" : _pageRef,
			"iv_crud" : ivCrud
		}
		var loadSrc = jQuery.contextPath + "/path/mxmessagedefinition/MxMessageDefinitionMaintAction_returnSubGridPage";
		
		$("#" + iconId).switchClass("ui-icon-plus", "ui-icon-minus", 0, "easeInOutQuad");
		
		$.ajax({
			url : loadSrc,
			type : "post",
			dataType : "html",
			data : gridParam,
			success : function(data) {
				while ("ui-subgrid" == $("#" + parentRowId).next('tr').attr('class')) {
					$("#" + parentRowId).next('tr').remove();
				}
				
				/**
				 * Sub Grid page load on bellow of selected row
				 */
				$(data).insertAfter("#" + parentRowId);
				
				/**
				 * Add Count of subgrids
				 */
				var count = $("#countGridData_"+_pageRef).val();
				if(count == "" || count == "undefined") count =0;
				++count;
				$("#countGridData_"+_pageRef).val(count);
				
				/**
				 * Load data inside sub-grid
				 */
				MxMessageDefinitionMaint_loadSubGrid(parentGridId, parentRowId);
			}
		}).done(function(result) {
			if (hasSubGrid(parentRowId)) 
			{
				var subGridId = getSubGridIdFromParentRowId(parentRowId);
				removeGridHeader(subGridId);
			}
			if (null != fn && undefined != fn && typeof (fn) == "function") {
				fn();
			}
		}
		);
	}
	else
	{
		//$("#"+parentId).next().remove();
		hideSubGridByParentRowId(parentRowId);
		$("#" + iconId).switchClass("ui-icon-minus", "ui-icon-plus", 0, "easeInOutQuad");
		$("#" + hFSelector).val("0"); // to indicate that the sub grid is closed
	}
}

/**
 * Load Data in Sub Grid by parsing the json of its parent row
 * @param parentGridId
 * @param parentRowId
 * @returns
 */
function MxMessageDefinitionMaint_loadSubGrid(parentGridId, parentRowId)
{
	var $table = $("#" + parentGridId);
	var myObject = $table.jqGrid('getRowData', parentRowId);
	var childData = myObject["childTags"];
	var status = $("#STATUS_"+_pageRef).val();
	
	if(typeof childData != "undefined" && childData != "")
	{
		//jQuery('#otherSubscriberLanguagesGrid_Id_' +_pageRef).jqGrid('clearGridData');
		var allRows = childData;
	    var allRowsArray = JSON.parse(allRows)["root"];
	    var subGridId =   "webServiceGuiSubGridTbl_SubGrid_Id"+parentRowId+"_"+_pageRef;
	    	//getSubGridIdFromParentRowId(parentRowId);
	    for (var i = 0; i < allRowsArray.length; i++) 
		{
	    	var data = {};
	    	obj = allRowsArray[i];
	    	
	    	/**
	    	 * generate new row id
	    	 */
	    	var newRowId = parentRowId+"__"+obj.tagName+"_"+_pageRef+"_"+i;
	    	
	    	var childRows = obj.childTagList;
	    	if(typeof childRows != "undefined" && childRows != "")
	    	{
	    		var rowdata = JSON.stringify(childRows);
				if(rowdata != "")
				{
					//add root for json string
					rowdata  = "{"+ "\"root\":"+rowdata +"}";
				}
				obj.childTags = rowdata;
	    	}
	    	
	    	/**
	    	 * Added parent grid id and parent row Id
	    	 */
	    	obj.parentGridId = parentGridId;
	    	obj.parentRowId =  parentRowId;
			
	    	/**
	    	 * Add Row in sub grid
	    	 */
	    	$("#" + subGridId).jqGrid('addRowData', i, obj);
	    	
			//change main grid row menually
			$("#"+subGridId+" tr[id="+i+"]").attr('id',newRowId);
			
			/**
			 * if the tag contains the child rows then remove checkbox
			 */
	    	if(typeof childRows != "undefined" && childRows != "")
	    	{
	    		$("#"+newRowId).find("input[type=checkbox]").remove();
	    	}
			
			/**
			 * remove + button when there is no child records
			 */
			if(obj.childTags == "" || typeof obj.childTags == "undefined")
			{
				$('#' + newRowId).children("td.sgcollapsed").unbind().html("");
			}
			
			
			/**
			 * diable checkbox id the status will approve
			 */
			if(status == 'P' || _pageRef == 'MXMD00P')
			{
				$("#"+newRowId).find("input[type=checkbox]").attr('disabled', 'disabled');
				$("#"+newRowId).find("input[type=checkbox]").attr('readonly', 'readonly');
				$($table).jqGrid('setSelection',newRowId, false);
			}
			
			
			/**
			 * add simple type details
			 * if there is minimum then then the rows should be selected and disable
			 */
			if(!$.isEmptyObject(obj.simpleTypeCO))
			{
				if(obj.simpleTypeCO.minLength > 0 ) 
				{
					//select rows which manadatory
					if( !$($table).find("#"+parentRowId).hasClass("ui-state-highlight"))
					{
						//$($table).jqGrid('setSelection',parentRowId, true);
					}

					$("#"+newRowId).find("input[type=checkbox]").remove();
					//$("#" + subGridId).jqGrid('setSelection',newRowId, true);// select rows for manadatory tags
					$("#"+newRowId).find("input[type=checkbox]").attr('checked', true);
					$("#"+newRowId).find("input[type=checkbox]").attr('disabled', 'disabled');
					$("#"+newRowId).find("input[type=checkbox]").attr('readonly', 'readonly');
					
					$("#"+subGridId).find("#"+newRowId).attr("changed","1");
				//	$("#"+newRowId).addClass('not-editable-row');
					$("#" + newRowId).css({
						'color' : 'red',
						'font-weight' : 'bold'
					});
				}
				
				//add the value of isleaf=Y if the tag has simple type
				$("#"+subGridId).jqGrid('setCellValue', newRowId,"isLeafYN",'Y');
				
			}
			else
			{
				$("#"+subGridId).find("#"+newRowId).attr("added","0");
				$("#"+subGridId).find("#"+newRowId).attr("changed","0");
			}
		}
	    
	    /**
	     * Add Hidden field for sub grid 
	     * and add all selected rows inside it
	     */
	    //MxMessageDefinitionMaint_AddSelectedRowsInDynamicHiddenField(subGridId);
	    
	    /**
	     * After loading the grid 
	     * the function will bind with + button to load its child grid
	     */
	    MxMessageDefinitionMaint_onTagsGridCompleteTopics(subGridId);
	}
}

/**
 * Add Hidden field for sub grid 
 * and add all selected rows inside it
 */
function MxMessageDefinitionMaint_AddSelectedRowsInDynamicHiddenField(gridId)
{
	//	var selectedIDs = $("#"+gridId).jqGrid('getGridParam', 'selarrrow');

	var subGridData = removeSubGridJsonFromTableJson(gridId);
	
	//if(subGridData != "" && typeof subGridData != "undefined" && subGridData != "{\"root\":[]}")
	//	returnHiddenField(gridId+"_sbGrd", "mxMessageDefinitionCO.gridData", subGridData, '#gridData_'+_pageRef);
	//else
	//	if(parentGridId != "")
	//		$("#" + parentGridId + "_sbGrd").remove();
	
}

/**
 * remove subfields from grid json and return
 * @param gridId
 * @returns
 */
function removeSubGridJsonFromTableJson(gridId)
{
	 var selectedRows = $("#" + gridId).jqGrid('getGridParam','selarrrow');
	 var allRowsArray = [];
	 for(var i=0; i<selectedRows.length; i++)
	 {
		 var rowObject = $("#" + gridId).jqGrid('getRowData', selectedRows[i]);
		 rowObject["childTags"] = "";
		 
		 var tagName =  	 rowObject["tagName"];
		 var tagHierarchy =  rowObject["tagHierarchy"];
		 
		 tagHierarchy = tagHierarchy+"_"+tagName;
		 var rowdata = JSON.stringify(rowObject);
		 if (rowdata != "") {
			// add root for json string
			rowdata = "{" + "\"root\":[" + rowdata + "]}";
		 }
		 
		// remove hidden field if exist
		 $("#" + tagHierarchy + "_sbGrd").remove();
		 
		 returnHiddenField(tagHierarchy+"_sbGrd", "mxMessageDefinitionCO.gridData", rowdata, '#gridData_'+_pageRef);
	 }
	 return rowdata;
}


/**
 * Prepare hidden fields of all data which is saved in db
 * @returns
 */
function MxMessageDefinitionMaint_prepareHiddenFieldsForSavedTags()
{
	
	var selectedtags = $("#selectedTagsData_" + _pageRef).val();
	selectedtags = JSON.parse(selectedtags);

	for (var i = 0; i < selectedtags.length; i++) 
	{
		var selectedobj  = selectedtags[i];
		var tagName =  	 selectedobj["tagName"];
		var tagHierarchy =  selectedobj["tagHierarchy"];
		 
		 tagHierarchy = tagHierarchy+"_"+tagName;
		 var rowdata = JSON.stringify(selectedobj);
		 if (rowdata != "") {
			// add root for json string
			rowdata = "{" + "\"root\":[" + rowdata + "]}";
		 }
		 
		// remove hidden field if exist
		 $("#" + tagHierarchy + "_sbGrd").remove();
		 
		 returnHiddenField(tagHierarchy+"_sbGrd", "mxMessageDefinitionCO.gridData", rowdata, '#gridData_'+_pageRef);

	}
}



/**
 * @description function to check if a certain row has a sub grid
 * @param gridId
 * @returns
 */
function hasSubGrid(rowId) {
	var $tr = $("#" + rowId).next('tr.jqgrow');
	if ($tr.length == 0) {
		$tr = $("#" + rowId).next('tr.ui-subgrid');
		if ($tr.length > 0) {
			return true;
		}
	}
	return false;
}


/**
 * @description hide sub grid by passing parent row id
 * @param parentRowId
 * @returns
 */
function hideSubGridByParentRowId(parentRowId) 
{
	$("#gbox_webServiceGuiSubGridTbl_SubGrid_Id"+parentRowId+"_"+_pageRef).hide();
	var iconId = "icon_" + parentRowId + "_" + _pageRef;
	var hFieldId = parentRowId + "_subGrid_" + _pageRef;
	$("#" + iconId).switchClass("ui-icon-minus", "ui-icon-plus", 0, "easeInOutQuad");
	$("#" + hFieldId).val("0")
}

/**
 * @description show sub grid by passing parent row id
 * @param parentRowId
 * @returns
 */
function showSubGridByParentRowId(parentRowId) 
{
	$("#gbox_webServiceGuiSubGridTbl_SubGrid_Id"+parentRowId+"_"+_pageRef).show();
	var iconId = "icon_" + parentRowId + "_" + _pageRef;
	var hFieldId = parentRowId + "_subGrid_" + _pageRef;
	$("#" + iconId).switchClass("ui-icon-plus", "ui-icon-minus", 0, "easeInOutQuad");
	$("#" + hFieldId).val("1")
}


/**
 * return hidden fields with particular grid selected data
 * @param id
 * @param name
 * @param value
 * @returns
 */
function returnHiddenField(id, name, value, appendTo) {
	$('<input>').attr({
	    type: 'hidden',
	    id: id,
	    name: name,
	    value : value
	}).appendTo(appendTo);
}

/**
 * 
 * @param parentRowId
 * @description get the subgrid id for a specific row
 * @returns
 */
function getSubGridIdFromParentRowId(parentRowId) {
	//var subGridId = $("#"+parentRowId).next('tr.ui-subgrid').children('td.subgrid-data').children('div.ui-jqgrid')[0].id;
	var subGridId;
	if (hasSubGrid(parentRowId)) {
		subGridId = $("#" + parentRowId).next('tr.ui-subgrid').find('table.ui-jqgrid-btable').attr('id');
		subGridId = subGridId.replace("gbox_", "");
	}
	return subGridId;
}


/**
 * @Description returns grid ID from row ID
 * @param rowId
 * @returns
 */
function getGridIdFromRow(rowId) {
	var gridId = null;
	var $t = $("#" + rowId).parents('table.ui-jqgrid-btable');
	if ($t.length > 0) {
		gridId = $t[0].id;
	}
	return gridId;
}


/**
 * @description function to remove the grid header containing titles
 * @param gridId
 * @returns
 */
function removeGridHeader(gridId) {
	if ($("#" + gridId).parent().find('.ui-jqgrid-hdiv').length > 0) {
		$("#" + gridId).parent().find('.ui-jqgrid-hdiv').remove();
	} else {
		var gview = "#gview_";
		var id = gview + gridId;
		//	$(id).children()[1].remove();
		$(id).children('div.ui-jqgrid-hdiv').remove();
	}
}

/**
 * This function will After Adding description, json of the active grid will add in hidden field
 * 
 * @param event
 * @param data
 * @param isMainGrid
 * @returns
 */
function MxMessageDefinitionMaint_AddDescInJsonOfActiveGrid(event, data, isMainGrid)
{
	var gridId = $(data).parents('table').attr('id');
	var rowId = MxMessageDefinitionMaint_gridSelectedRowId(gridId);
	$("#"+gridId).find("#"+rowId).attr("changed","1");
	
	
	/**
	 * Add all selected rows of particular grid in hidden field 
	 */
	MxMessageDefinitionMaint_AddSelectedRowsInDynamicHiddenField(gridId);
}



/**
 * get selected row by passing the grid id
 * @param gridId e.g gridId = isoFieldGridId
 * @returns
 */
function MxMessageDefinitionMaint_gridSelectedRowId(gridId)
{
	var $table = $("#"+gridId);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	return selectedRowId;
}


/**
 * Handle if user click the non mandatory parent
 * @param rowObject
 * @returns
 */
function MxMessageDefinitionMaint_hndleMandtryWithNonMndtryPrnt(rowObject)
{
	/**
	 * validate row object not null otherwise return
	 */
	if(rowObject == "" || typeof rowObject == "undefined") return;
	
	/**
	 * If select row is leaf then return back
	 */
	//if(rowObject["isLeafYN"] != "" && typeof rowObject["isLeafYN"] != "undefined" &&  rowObject["isLeafYN"] == "Y") return;
	
	/**
	 * If selected parent row has min occur empty or 1 then return back
	 */
	//if(rowObject["minOccur"] == "" || typeof rowObject["minOccur"] == "undefined" || rowObject["minOccur"] == "1") return;
	
	var tagName = rowObject["tagName"];
	var taghierarchy = rowObject["tagHierarchy"];
	
	/**
	 * get all parent/non-leaf/parent fields json
	 */
	var allParentTagsJson = $("#parentTagsJson_"+_pageRef).val();
	
	/**
	 * get all mandatory leaf/child fields json
	 */
	var allMandatoryTagsJson = $("#mandatoryTagsJson_"+_pageRef).val();
	
	/**
	 * prepare tag hierarchy of selected row 
	 */
	var  selectedTagHirarchy = taghierarchy+"_"+tagName;
	
	/**
	 * If there is no mandatory tags then return back
	 */
	if(allMandatoryTagsJson == "" || typeof allMandatoryTagsJson == "undefined") return;
	
	var allMadatoryTagsArray = JSON.parse(allMandatoryTagsJson)["root"];
	var allParentTagsArray = JSON.parse(allParentTagsJson)["root"];
	
	var allChildOfSlectedParentTags   = [];

	var allParentOfSelectedParentTags = new Map();
	
	var count=0;
	var nonmandatoryParentOfSelectedParentTags = [];
	
    /**
     * iterate over all parent tags
     */
	for(var i=0; i<allParentTagsArray.length; i++)
	{
		var tagName = allParentTagsArray[i].tagName;
		var tagHierarchy = allParentTagsArray[i].tagHierarchy;
		
		if(tagHierarchy == "" || typeof tagHierarchy == "undefined") continue;
		
		/**
		 * Check if the the current parent tag hierarchy is starts with the selected row hierarchy
		 * then add in the map of parents tags
		 */
		if(tagHierarchy.startsWith(selectedTagHirarchy))
		{
			allParentOfSelectedParentTags.set(tagHierarchy+"_"+tagName, allParentTagsArray[i]);
		}	
	}
	
    /**
     * iterate all mandatory leaf/child tags
     */
	for(var i=0; i<allMadatoryTagsArray.length; i++)
	{
		var mandatoryTagHierarchy = allMadatoryTagsArray[i].tagHierarchy;
		
		/**
		 * Check if the the current leaf tag hierarchy is starts with the selected row hierarchy
		 * then add in the leaf/child tags map
		 */
		if(mandatoryTagHierarchy.startsWith(selectedTagHirarchy))
		{
			allChildOfSlectedParentTags.push(allMadatoryTagsArray[i]);
		}
	}
	
	/**
	 * check if there is rows already inside hidden field then 
	 */
	var nonMandatoryParentSelectedRequiredChilds = [];
	var nonMandatoryParentSelectedRequiredChildsJSON =  $("#nonMandatoryParentSelectedRequiredChildsJSON_"+_pageRef).val();
	if(nonMandatoryParentSelectedRequiredChildsJSON != "" && typeof nonMandatoryParentSelectedRequiredChildsJSON != "undefined")
	{
		var allRowsArray = JSON.parse(nonMandatoryParentSelectedRequiredChildsJSON)["root"];
		nonMandatoryParentSelectedRequiredChilds = allRowsArray;
	}
	
	var mandatoryTagsParent = new Map();
	
	for(var i=0; i<allChildOfSlectedParentTags.length; i++)
	{
		var tagHierarchy = allChildOfSlectedParentTags[i].tagHierarchy;
		var tagHierarchySplittedData = tagHierarchy.split("_");
		
		var temp = "";
		var isParentRequired = true;
		
		var tempMap = new Map();
		for(var j=0; j<tagHierarchySplittedData.length; j++)
		{
    		temp+=tagHierarchySplittedData[j];
    		
    		var parentTagCo = allParentOfSelectedParentTags.get(temp);
    		if(parentTagCo == null || typeof parentTagCo == "undefined" && parentTagCo.tagHierarchy == temp && parentTagCo.minOccur == "0")
    		{
    			temp+="_";
    			continue;
    		}
    		
    		if(parentTagCo.minOccur == "0")
    		{
    			isParentRequired = false;
    			break;
    		}
    		
    		/**
    		 * Add parent tags for saving
    		 */
   			tempMap.set(parentTagCo.tagHierarchy+"_"+parentTagCo.tagName, parentTagCo);
   			
    		temp+="_";
		}
		
		if(isParentRequired)
		{
			/**
			 * add all parents which is mandatory from temp to selected  tag array
			 */
			for (let value of tempMap.values()) {
				nonMandatoryParentSelectedRequiredChilds.push(value);
			}
			
			nonMandatoryParentSelectedRequiredChilds.push(allChildOfSlectedParentTags[i]);
			
			//console.log(allChildOfSlectedParentTags[i].tagHierarchy +"_"+allChildOfSlectedParentTags[i].tagName);
		}
		
	}
	
	var rowdata = JSON.stringify(nonMandatoryParentSelectedRequiredChilds);
	if (rowdata != "") {
		// add root for json string
		rowdata = "{" + "\"root\":" + rowdata + "}";
	}
	$("#nonMandatoryParentSelectedRequiredChildsJSON_"+_pageRef).val(rowdata);
}


/**
 * while upload a file or edit the recoed get all mandatory 
 * tags and its parent and set in hidden fields for processing
 * @param parentTagsJson
 * @param mandatoryTagsJson
 * @returns
 */
function MxMessageDefinitionMaint_setAllMandatoryTagsAndParents(parentTagsJson, mandatoryTagsJson)
{
	//**************** Remove use less properties from json ***********************
	/**
	 * Add All tags in json format
	 */
	var allRowsArray = [];
	var mandatoryTagsArray = [];

	$("#parentTagsJson_"+_pageRef).val(parentTagsJson);

	if (typeof mandatoryTagsJson != "undefined" && mandatoryTagsJson != "") {
		allRowsArray = JSON.parse(mandatoryTagsJson)["root"];
		for (var i = 0; i < allRowsArray.length; i++) 
		{
			allRowsArray[i].childTags = "";
			allRowsArray[i].parentTagsCo = "";
			allRowsArray[i].simpleTypeCO = "";
				
			mandatoryTagsArray.push(allRowsArray[i]);
		}
	}
	var rowdata = JSON.stringify(mandatoryTagsArray);
	if (rowdata != "") {
		// add root for json string
		rowdata = "{" + "\"root\":" + rowdata + "}";
	}
	$("#mandatoryTagsJson_"+_pageRef).val(rowdata);

	//******************************************************************************
}

/**
 * Highlight all leaf child mandatory tags
 * If user select the root mandatory or non - mandatory tag 
 * @param rowObj
 * @returns
 */
function MxMessageDefinitionMaint_highlightMandatoryLeafTags(rowObj)
{
	var rowId = rowObj.originalEvent.id
	var gridId = getGridIdFromRow(rowId);
	
	var myObject = $("#"+gridId).jqGrid('getRowData', rowId);
	
//	var parentGridId = myObject["parentGridId"];
//	var parentGridRowId = myObject["parentRowId"];
	
	if (hasSubGrid(rowId)) 
	{
		var subGridId = getSubGridIdFromParentRowId(rowId);
		var grid = $("#"+subGridId); 
		var subGridRowIds = grid.jqGrid('getDataIDs');
		for (var i = 0; i < subGridRowIds.length; i++) 
		{
			var subRowId = subGridRowIds[i];
			var subGridObject = grid.jqGrid('getRowData', subRowId);


			var isLeafYN = subGridObject["isLeafYN"];
			var isMandatoryYN = subGridObject["isMandatoryYN"];
			
			var minOcuur = subGridObject["minOccur"];
			
			
			if(
				(isLeafYN == "Y" && isMandatoryYN == "Y")
			    || 	(isLeafYN != "Y" && (minOcuur == "1" || minOcuur == ""))
			)
			{
				$("#"+subGridId).find("#"+subRowId).addClass("ui-state-highlight");
				//$("#"+subGridId).jqGrid('setSelection', subRowId, true);
			}
		}
		
	}
	
}


