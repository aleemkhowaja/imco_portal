function accessWebServiceMaint_processSubmit() 
{
	var tempId = $("#template_id_"+_pageRef).val();
	if(tempId == "")
	{
		_showErrorMsg(missing_template_id,info_msg_title,300,100);
		return;
	}
	var formChanged = $("#accessWebServiceMaintFormId_" + _pageRef).hasChanges();
	if (_pageRef == 'AW00MT' || _pageRef == 'AW00UP') 
	{
		if (!formChanged)
		{
			accessWebServiceMaint_handleSaveProcess(0);
			return;
		}
		else
		{
			_showConfirmMsg(Confirm_Save_Process_key, info_msg_title,
					accessWebServiceMaint_handleSaveProcess);
		}
	}
}

function accessWebServiceMaint_handleSaveProcess(confirm) 
{
	if (confirm) {
		var jsonStringUpdates = $("#treeGridOpt_"+_pageRef).jqGrid('getChangedRowData');
//		var jsonStringUpdates = $("#treeGridOpt_"+_pageRef).jqGrid('getAllRows');
		$("#updateAwSParameter_"+_pageRef).val(jsonStringUpdates); 
		var form = $("#accessWebServiceMaintFormId_" + _pageRef).serializeForm();
		var actionUrl = jQuery.contextPath	+ "/path/accessWebService/AccessWebServiceMaintAction_saveNew.action";
		var params = {};
		_showProgressBar(true);
		
		$.ajax( {
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : form,
			success : function(param) {
				if (typeof param["_error"] == "undefined"
						|| param["_error"] == null) {
					//empty form
					reloadUrl = jQuery.contextPath + "/path/accessWebService/AccessWebServiceMaintAction_clearStpForm.action";
					var ivCrud = returnHtmlEltValue("iv_crud_"+ _pageRef);
					var reloadParams = {};
					reloadParams["iv_crud"] = ivCrud;
					reloadParams["_pageRef"] = _pageRef;
					$.post(reloadUrl,
									reloadParams,
									function(param) 
									{
										showHideSrchGrid('accessWebServiceListGridTbl_Id_'+ _pageRef);
										$("#accessWebServiceListMaintDiv_id_"+ _pageRef).html(param);
										//reload grid
										$("#accessWebServiceListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
										_showProgressBar(false);
										_showErrorMsg(record_saved_Successfully_key,info_msg_title,300,100);
									}, "html");
					
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
		_showProgressBar(false);
	}
}

function accessWebService_processApprove() {
	_showConfirmMsg(Confirm_Approve_Process_key, info_msg_title,
			accessWebService_handleApproveProcess, {
				infoMessageDet : record_was_Approved_Successfully_key
			});
}

function accessWebService_handleApproveProcess(confirm)
{
	if (confirm) {
		var jsonStringUpdates = $("#treeGridOpt_"+_pageRef).jqGrid('getChangedRowData');
		//var jsonStringUpdates = $("#treeGridOpt_"+_pageRef).jqGrid('getAllRows');
		$("#updateAwSParameter_"+_pageRef).val(jsonStringUpdates); 
		var form = $("#accessWebServiceMaintFormId_" + _pageRef).serializeForm();
		var actionUrl = jQuery.contextPath	+ "/path/accessWebService/AccessWebServiceMaintAction_awsApprove.action";
		var params = {};
		_showProgressBar(true);
		
		$.ajax( {
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : form,
			success : function(param) {
				if (typeof param["_error"] == "undefined"
						|| param["_error"] == null) {
					//empty form
					reloadUrl = jQuery.contextPath + "/path/accessWebService/AccessWebServiceMaintAction_clearStpForm.action";
					var ivCrud = returnHtmlEltValue("iv_crud_"+ _pageRef);
					var reloadParams = {};
					reloadParams["iv_crud"] = ivCrud;
					reloadParams["_pageRef"] = _pageRef;
					$.post(reloadUrl,
									reloadParams,
									function(param) 
									{
										showHideSrchGrid('accessWebServiceListGridTbl_Id_'+ _pageRef);
										$("#accessWebServiceListMaintDiv_id_"+ _pageRef).html(param);
										//reload grid
										$("#accessWebServiceListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
										_showProgressBar(false);
										_showErrorMsg(record_was_Approved_Successfully_key,info_msg_title,300,100);
									}, "html");
					
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
		_showProgressBar(false);
	}
}

function accessWebService_processDelete() {
	_showConfirmMsg(Confirm_Delete_Process_key, info_msg_title,
			accessWebService_handleDeleteProcess, {
				infoMessageDet : record_was_Deleted_Successfully_key
			});
}

function accessWebService_handleDeleteProcess(confirm)
{
	if (confirm) {
		var jsonStringUpdates = $("#treeGridOpt_"+_pageRef).jqGrid('getChangedRowData');
		//var jsonStringUpdates = $("#treeGridOpt_"+_pageRef).jqGrid('getAllRows');
		$("#updateAwSParameter_"+_pageRef).val(jsonStringUpdates); 
		var form = $("#accessWebServiceMaintFormId_" + _pageRef).serializeForm();
		var actionUrl = jQuery.contextPath	+ "/path/accessWebService/AccessWebServiceMaintAction_awsDelete.action";
		var params = {};
		_showProgressBar(true);
		
		$.ajax( {
			url : actionUrl,
			type : "post",
			dataType : "json",
			data : form,
			success : function(param) {
				if (typeof param["_error"] == "undefined"
						|| param["_error"] == null) {
					//empty form
					reloadUrl = jQuery.contextPath + "/path/accessWebService/AccessWebServiceMaintAction_clearStpForm.action";
					var ivCrud = returnHtmlEltValue("iv_crud_"+ _pageRef);
					var reloadParams = {};
					reloadParams["iv_crud"] = ivCrud;
					reloadParams["_pageRef"] = _pageRef;
					$.post(reloadUrl,
									reloadParams,
									function(param) 
									{
										showHideSrchGrid('accessWebServiceListGridTbl_Id_'+ _pageRef);
										$("#accessWebServiceListMaintDiv_id_"+ _pageRef).html(param);
										//reload grid
										$("#accessWebServiceListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
										_showProgressBar(false);
										_showErrorMsg(record_was_Deleted_Successfully_key,info_msg_title,300,100);
									}, "html");
					
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
		_showProgressBar(false);
	}
}

function onCheckBoxClick(e,obj) 
{
	var $table = $("#treeGridOpt_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var currentCustomDetails = myObject["CUSTOM_DETAILS"];
	var isLeaf = myObject["isLeaf"];
	//operation
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var nodeid = myObject["nodeId"];
	
	var arr = nodeid.split('-');
	var operationName = arr[0];
	var serviceName = arr[1];
	var appName = arr[2];
	
	var parentid = myObject["parent"]
	//service
	var myObject = $table.jqGrid('getRowData', parentid);
	//application 
	var mainParentId = myObject["parent"];
	if(document.getElementById(e.currentTarget.id).checked)
	{
		//checked if it is leaf and his parents
		var returnCheck = checkExcludeAccess(parentid,nodeid);
		if(returnCheck == "1")
		{
			return;
		}
	}
	else
	{
		if(isLeaf == "false")
		{
			aws_ChangeType("1");
		}
	}
	if(isLeaf == "false")
	{
		return;
	}
	
	$("#treeGridOpt_" + _pageRef).jqGrid("setGridRowStatus",e.currentTarget.id, 2)
	checkSelectedRow(e,obj,"1");
}

function onChangeExclYn(e,obj) 
{
	var selectedCheckboxRowId = e.currentTarget.id;

	var rowId = $("#"+selectedCheckboxRowId).parents('tr')[0].id;
	
	var excludeNodeYn = "0";
	if($("#"+selectedCheckboxRowId).is(":checked"))
	{
		excludeNodeYn = "1";
	}
	var $table = $("#treeGridOpt_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var jsonString = myObject["CUSTOM_DETAILS"];
	if( jsonString != undefined && jsonString != null && jsonString != '')
    {
		currentCustomDetails = JSON.parse(jsonString);
    }
	//replace AW00UP with AW00MT
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	if(ivCrud == "UP")
	{
		var find = _pageRef;
		var re = new RegExp(find, 'g');
		rowId = rowId.replace(re, 'AW00MT');
		selectedCheckboxRowId = selectedCheckboxRowId.replace(re, 'AW00MT');
	}
	var extendCustomJson = {};
	extendCustomJson[rowId] = selectedCheckboxRowId;
	if(excludeNodeYn == "1")
	{
		if(jsonString != undefined && jsonString != null && jsonString != '' && jsonString != 'undefined')
		{
			extendCustomJson = $.extend({},currentCustomDetails,extendCustomJson);
			var obj = JSON.stringify(extendCustomJson);
			$table.jqGrid('setCellValue',selectedRowId,'CUSTOM_DETAILS',obj);
		}
		else
		{
			var obj = JSON.stringify(extendCustomJson);
			$table.jqGrid('setCellValue',selectedRowId,'CUSTOM_DETAILS',obj);
		}
		$table.jqGrid("setGridRowStatus",selectedRowId, 2)
	}
	else
	{
		var key = rowId;
		delete currentCustomDetails[key];
		var obj = JSON.stringify(currentCustomDetails);
		$table.jqGrid('setCellValue',selectedRowId,'CUSTOM_DETAILS',obj);
		$table.jqGrid("setGridRowStatus",selectedRowId, 2)
	}
}

function checkSelectedRow(e,obj,calledFromCheckbox) 
{
	var $table = $("#treeGridOpt_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var isLeaf = myObject["isLeaf"];
	var ExcludeAWS = myObject["imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN"]
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	
	var oldStatus = $("#accessWebServiceStatus_"+_pageRef).val();
	
	if(isLeaf == "false")
	{
		return;
	}
	if(myObject["isLeaf"] == "true")
	{
		$table.jqGrid("setCellReadOnly",selectedRowId, 'imcoPwsTmpltDetVO.TYPE', "true");
	}
	var currentCustomDetails = myObject["CUSTOM_DETAILS"];
	if(currentCustomDetails != undefined 
			&& currentCustomDetails != null
			&& currentCustomDetails.length > 0
			||calledFromCheckbox == "1"
			||(ExcludeAWS =="1" && isLeaf == "true"))
	{
		if(e !=null && !document.getElementById(e.currentTarget.id).checked)
		{
			$("#webServiceGuiGrid_"+ _pageRef).html("");
			$table.jqGrid('setCellValue',selectedRowId,'CUSTOM_DETAILS',null);
			return;
		}
		//operation
		var myObject = $table.jqGrid('getRowData', selectedRowId);
		var nodeid = myObject["nodeId"];
		
		var arr = nodeid.split('-');
		var operationName = arr[0];
		var serviceName = arr[1];
		var appName = arr[2];
		
		//load the parameter grid
		$("#application_name_desc_"+_pageRef).val(appName);
		$("#webservice_name_desc_"+_pageRef).val(serviceName);
		$("#operation_name_lkp_desc_"+_pageRef).val(operationName);
		$("#serviceDataId_"+_pageRef).val("");
		if(operationName != undefined && serviceName != undefined && appName != undefined)
		    {
		     var loadSrc = jQuery.contextPath +"/path/accessWebService/AccessWebServiceExplorerList_loadMainGridFn?webServiceExplorerCO.requestType=request&iv_crud="+ivCrud+"&oldStatus="+oldStatus;
		     var serializedForm = $("#accessWebServiceMaintFormId_"+_pageRef).serializeForm();
		     _showProgressBar(true);
		   
		     $.ajax( {
		      url : loadSrc,
		      type:"post",
		      dataType:"html",
		      data: serializedForm,     
		      success : function(data) 
		         { 
		       $("#webServiceGuiGrid_" +_pageRef).html(data);
		       
				clearConfigLookUp();
		       
		         var xhttp = new XMLHttpRequest();
		           xhttp.onreadystatechange = function() {
		               if (this.readyState == 4 && this.status == 200) {
		                   this.responseText;
		              }
		           };
		           
		       _showProgressBar(false);
		      }
		     });
		    }
	}
}

function checkExcludeAccess(parentID,nodeID) 
{
	var $table = $("#treeGridOpt_" + _pageRef);
	var myObject = $table.jqGrid('getRowData', nodeID);
	if(parentID.indexOf("ROOT") == 0)
	{
		if(myObject["imcoPwsTmpltDetVO.TYPE"] == "" || myObject["imcoPwsTmpltDetVO.TYPE"] == "A" || myObject["isLeaf"] == "false")
		{
			//
		}
		else if(myObject["imcoPwsTmpltDetVO.TYPE"] == "S" && myObject["isLeaf"] == "false")
		{
			document.getElementById(nodeID + "_imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN").checked = true;
		}
		return "1";
	}
	else
	{
//		if(myObject["isLeaf"] == "false" && (myObject["imcoPwsTmpltDetVO.TYPE"] == "A" || $("#"+parentID+ "_imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN").is(":checked")))
//		{
//			return "1";
//		}
		document.getElementById(nodeID + "_imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN").checked = true;
//		document.getElementById(nodeID + "_imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN").value = (Number(1));
//		document.getElementById(parentID + "_imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN").value = (Number(1));
		document.getElementById(parentID + "_imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN").checked = true;
		var myObject = $table.jqGrid('getRowData', parentID);
		var newNodeId = myObject["nodeId"];
		var newParentId = myObject["parent"];
		checkExcludeAccess(newParentId,newNodeId) 
	}
}

function selectRowsFromDB() 
{
	var $table = $("#accessWebServiceListGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var templateId = myObject["imcoPwsTmpltMasterVO.TEMPLATE_ID"];
	//get the level
	var $table = $("#treeGridOpt_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	if (selectedRowId == null || typeof "undefined" || selectedRowId == "undefined")
	{
		selectedRowId = $("#rowIdOnExpand_" + _pageRef).val();
	}
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var level = myObject["level"];
	var feName = myObject["feName"];
	if(templateId == null)
	{
		return;
	}
	var url = jQuery.contextPath
			+ "/path/accessWebService/AccessWebServiceMaintAction_selectRowsFromDB.action";
	var params = {};
	params["_pageRef"] = _pageRef;
	params["iv_crud"] = ivCrud;
	params["accessWebServiceSC.tempID"] = templateId;
	params["accessWebServiceSC.level"] = level;
	params["accessWebServiceSC.feName"] = feName;
	
	$.post(url, params, function(param) 
	{
		var imcoPwsTmpltDetVOList = JSON.parse(param)["accessWebServiceSC"]["accessCOList"];
		var allGridTreeData = JSON.parse($("#treeGridOpt_" +_pageRef).jqGrid('getAllRows'))["root"];
		
		for (var i = 0; i < allGridTreeData.length; i++) 
		{
			var fename = allGridTreeData[i].feName;
			var nodeID = allGridTreeData[i].nodeId;
			var isLeaf = allGridTreeData[i].isLeaf;
			for (var j = 0; j < imcoPwsTmpltDetVOList.length; j++)
			{
				var selectedAppName = imcoPwsTmpltDetVOList[j]["imcoPwsTmpltDetVO"]["APP_NAME"];
				var selectedWSName = imcoPwsTmpltDetVOList[j]["imcoPwsTmpltDetVO"]["WS_NAME"];
				var selectedOperation = imcoPwsTmpltDetVOList[j]["imcoPwsTmpltDetVO"]["OPERATION"];
				var selectedType = imcoPwsTmpltDetVOList[j]["imcoPwsTmpltDetVO"]["TYPE"];
				var selectedCustomDetails = imcoPwsTmpltDetVOList[j]["CUSTOM_DETAILS"];
				if(isLeaf == "true" && fename == selectedOperation)
				{
					$("#treeGridOpt_" + _pageRef).jqGrid('setCellValue',nodeID,'CUSTOM_DETAILS',selectedCustomDetails);
					$("#treeGridOpt_" + _pageRef).jqGrid('setCellValue',nodeID,'imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN',1)
				}
				else if (fename == selectedAppName && selectedWSName == "All"||
					fename == selectedWSName||
					fename == selectedOperation) 
				{
					$("#treeGridOpt_" + _pageRef).jqGrid('setCellValue',nodeID,'imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN',1)
					$("#treeGridOpt_" + _pageRef).jqGrid('setCellValue',nodeID,'imcoPwsTmpltDetVO.TYPE',selectedType);
				}
				
			}
		 }
	}, "html");
}

function onGridCompleteAccessWebService(event,data) 
{
	applyWebServiceExplorerDefaultFunctionality(event,data);
	var $table = $("#treeGridOpt_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var selectedCustomDetails = myObject["CUSTOM_DETAILS"];
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	if (selectedCustomDetails != undefined 
			&& selectedCustomDetails != null
			&& selectedCustomDetails.length > 0) 
	{
		var fullCustomDetailsArray = $.parseJSON(selectedCustomDetails);
		$.each(fullCustomDetailsArray, function(index, value) 
		{
			//on grid complete replace AW00MT with PageRef
			if(ivCrud == "P" || ivCrud == "UP")
			{
				var find = 'AW00MT';
				var re = new RegExp(find, 'g');
				value = value.replace(re, _pageRef);
			}
			if(document.getElementById(value) != null)
			{
				document.getElementById(value).checked = true;
			}
		});
	}
	applyAccessWebServiceServiceExplorerGridDefaultParams(event,data);
	
	/*
	 * fares
	 */
	// set div readonly in case iv_crud = 'P'
    var $table = $("#accessWebServiceListGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
    var status  = myObject["imcoPwsTmpltMasterVO.STATUS"];
    
	var gridSelectorName = data.id;
	var grid = $("#" + gridSelectorName);
	var ids = grid.jqGrid('getDataIDs');
	$.each(ids, function(i, v) 
	{
		var mandatory = grid.jqGrid('getCell', v, 'mandatory');
		if (mandatory == 'mandatory') 
		{
			grid.jqGrid('setCellReadOnly', v, 'include', "true");
		}
		
		if (ivCrud == "P" || (ivCrud == "R" && (status == "P"||status == "D"))) 
	    {
			grid.jqGrid('setCellReadOnly', v, 'include', "true");
		}
	});
}

function onSubGridCompleteAccessWebService(event,data) 
{
	applyWebServiceExplorerSubGridDefaultFunctionality(event,data);
	var $table = $("#treeGridOpt_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	var selectedCustomDetails = myObject["CUSTOM_DETAILS"];
	var ivCrud = $("#iv_crud_" + _pageRef).val();
	if (selectedCustomDetails != undefined 
			&& selectedCustomDetails != null
			&& selectedCustomDetails.length > 0) 
	{
		var fullCustomDetailsArray = $.parseJSON(selectedCustomDetails);
		$.each(fullCustomDetailsArray, function(index, value) 
		{
			//on subgrid complete replace AW00MT with PageRef
			if(ivCrud == "P" || ivCrud == "UP")
			{
				var find = 'AW00MT';
				var re = new RegExp(find, 'g');
				value = value.replace(re, _pageRef);
			}
			if(document.getElementById(value) != null)
			{
				document.getElementById(value).checked = true;
			}
		});
	}
	applyAccessWebServiceServiceExplorerGridDefaultParams(event,data);
	
	/*
	 * fares
	 */
	// set div readonly in case iv_crud = 'P'
    var $table = $("#accessWebServiceListGridTbl_Id_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
    var status  = myObject["imcoPwsTmpltMasterVO.STATUS"];
    
	var gridSelectorName = data.id;
	var grid = $("#" + gridSelectorName);
	var ids = grid.jqGrid('getDataIDs');
	$.each(ids, function(i, v) 
	{
		var mandatory = grid.jqGrid('getCell', v, 'mandatory');
		if (mandatory == 'mandatory') 
		{
			grid.jqGrid('setCellReadOnly', v, 'include', "true");
		}
		
		if (ivCrud == "P"|| (ivCrud == "R" && (status == "P"||status == "D"))) 
	    {
			grid.jqGrid('setCellReadOnly', v, 'include', "true");
		}
	});
}

function aws_ChangeType(e)
{
	var $table = $("#treeGridOpt_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	//in case unchecked and it is not leaf
	if(e == "1")
	{
		var type = "A";
	}
	else
	{
		var type = myObject["imcoPwsTmpltDetVO.TYPE"];
	}
	
	if (type == "A") 
	{
		var children =  $table.jqGrid("getNodeChildren",$table.jqGrid('getLocalRow',selectedRowId));
		resetSubChildren(children)
		if(e != "1")
		{
			$(document.getElementById(selectedRowId)).find("div.treeclick").click();
		}
	}
	else
	{
		$table.jqGrid('setCellValue',selectedRowId,'imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN','0');
	}
}

/**
 * 
 * @returns
 */
function accessbywebservice_onStatusClicked()
{
	var tempId = $("#template_id_"+_pageRef).val();
	var loadSrc  = jQuery.contextPath + "/path/accessWebService/AccessWebServiceStatusList_search?criteria.tempID="+tempId;
	showStatus("accessWebServiceMaintFormId_"+_pageRef,_pageRef, loadSrc,	{} );
}

/**
 * @description apply default functionality related to Access webservice Grids
 * @param event
 * @param data
 * @returns
 */
function applyAccessWebServiceServiceExplorerGridDefaultParams(event,data)
{
	var gridSelectorName = data.id;
	var grid = $("#"+gridSelectorName);
	var ids = grid.jqGrid('getDataIDs');
	for (var i = 0; i < ids.length; i++) 
	{
	    var rowid=ids[i];
	    var columnId = grid.jqGrid ('getCell', rowid, 'gridColumnID'); 
	    var fieldType = grid.jqGrid ('getCell', rowid, 'fieldType');    
	    var restriction =  grid.jqGrid ('getCell', rowid, 'restriction');
    	grid.jqGrid("setCellRequired", rowid,'include',false);
	    var idArr = columnId.split("_concat_");
	    var idArrLength = idArr.length;
		if("HashMap" == checkForType(fieldType))
		{
	    	unbindSubGrid(rowid);
	    	grid.jqGrid('setCellReadOnly', rowid, 'include',"true");
		}
		else if("List" == checkForType(fieldType) || "List<Object>" == checkForType(fieldType))
		{
	    	unbindSubGrid(rowid);
	    	grid.jqGrid('setCellReadOnly', rowid, 'include',"true");
		}
	}
	removeLastHighlightedRow(data.id);
}

function resetSubChildren(children)
{
	$(children).each(function(i){
		document.getElementById(children[i]["nodeId"] + "_imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN").checked = false;
		$("#treeGridOpt_"+_pageRef).jqGrid('setCellValue',children[i]["nodeId"],'CUSTOM_DETAILS',"");
		var isLeaf = $("#treeGridOpt_"+_pageRef).jqGrid("getCell", children[i]["nodeId"], "isLeaf");
		if(isLeaf =="false")
		{
			var subChildren = $("#treeGridOpt_"+_pageRef).jqGrid("getNodeChildren",children[i])
			if(subChildren.length > 0)
			{
				resetSubChildren(subChildren);
			}
			$("#treeGridOpt_"+_pageRef).jqGrid('setCellValue',children[i]["nodeId"],'imcoPwsTmpltDetVO.TYPE',"A");
			$(document.getElementById(children[i]["nodeId"])).find("div.treeclick").click();
			
		}
	});
	$("#webServiceGuiGrid_"+ _pageRef).html("");	
}

function expandRowBeforeTopic()
{
	var $table = $("#treeGridOpt_" + _pageRef);
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var localRow = $table.jqGrid('getLocalRow',selectedRowId);
	if(!localRow.loaded || typeof localRow.loaded == "undefined" || !localRow.expanded)
	{
		$(document.getElementById(selectedRowId)).find("div.treeclick").click();
	}
}

function onSelRow(rowObj)
{
	var gridSelectorName = rowObj.target.id;
	var rowId = rowObj.originalEvent.id
	var gridId = getGridIdFromRow(rowId);
	grid = $("#"+gridId);
	var isMandatory = null;
	var id = null; 
	var idArr = null;
	var idArrLength = null;
	try{
		isMandatory = grid.jqGrid ('getCell', rowId, 'mandatory');
		id =  grid.jqGrid ('getCell', rowId, 'gridColumnID');
		idArr = id.split("_concat_");
		idArrLength = idArr.length;
	}
	catch(e)
	{
		console.log(e);

	}
	if(isMandatory == "mandatory")
	{
		grid.jqGrid('setCellReadOnly', rowId, 'include', "true");
	}
	var hasSubGrid = $("#"+rowId).attr('hasSubGrid');
	if('true' == hasSubGrid || true == hasSubGrid)
	{
		grid.jqGrid('setCellReadOnly', rowId, 'include', "true");
	}

}

function onSubSelRow(rowObj)
{
	var subGrid = rowObj.originalEvent.grid.selector;
	subGrid = $(subGrid);
	var rowId = rowObj.originalEvent.id
    var  isMandatory = subGrid.jqGrid ('getCell', rowId, 'mandatory');
	if(isMandatory == "mandatory")
	{
		subGrid.jqGrid('setCellReadOnly', rowId, 'include', "true");
	}
	var hasSubGrid = $("#"+rowId).attr('hasSubGrid');
	if('true' == hasSubGrid || true == hasSubGrid)
	{
		grid.jqGrid('setCellReadOnly', rowId, 'include', "true");
	}
}