/**
 * This funnction will be called upon clicking on status button 
 * @param {Object} param
 */
function pwsGeneration_onStatusClicked() {
	var adapterId = $("#pwsGenerationAdapterId_" + _pageRef).val();
	if (adapterId == "" || undefined == adapterId)
		return;
	var loadSrc = jQuery.contextPath + "/path/PWSGeneration/PWSGenerationStatus_search?pwsGenerationSC.adapterId=" + adapterId + "&adapterId=" + adapterId + "&_pageRef=" + _pageRef;
	showStatus("pwsGenerationDefFormId_" + _pageRef, _pageRef, loadSrc, {});
}

/**
 * process screen actions like save and approve
 */
function pwsGeneration_processRequest(methodName) {
	var confirmMsg;
	if (methodName == 'save') {
		confirmMsg = "Confirm_Save_Record_key";
	}
	if (methodName == 'update') {
		confirmMsg = "Confirm_Update_Record_key";
	} else if (methodName == 'approve') {
		confirmMsg = "Confirm_Approve_Record_key";
	} else if (methodName == 'delete') {
		confirmMsg = "Confirm_Delete_Process_msg_key";
	} else if (methodName == 'deploy') {
		confirmMsg = "Confirm_Deploy_Process_msg_key";
	}
	_showConfirmMsg(confirmMsg, "", "applyPWSGenerationBtnAction", {
		methodName : methodName
	});
}

/**
 * function that encapsulates screen param into json object
 */
function applyPWSGenerationBtnAction(confirm, args) {
	if (confirm) {
		_showProgressBar(true);
		var type = $("#generation_type_" + _pageRef).val();
		var actionSrc = "";
		if (type == "Wsdl")
		{
		    var reqRespArrayParams  = returnRequestResponseGridParamsAsJson();
		    var request_json = reqRespArrayParams[0];
		    var response_json = reqRespArrayParams[1];
		    $("#webServiceExplorerGridUpdates_"+_pageRef).val(request_json);
			$("#webServiceExplorerResponseGridUpdates_"+_pageRef).val(response_json);
			var serializedForm = $("#webServiceGuiDefFormId_"+returnOrgiPageRef()).serializeForm();
		    var adapterType = $("#generation_type_"+_pageRef).val();
		    var mappingId = "-1";
		}
		else if (type == "Api" || type == "BPEL") 
		{
			var iv_crud = $("#iv_crud_" + _pageRef).val();
			var gridData = loadRecordData();
			var strData = JSON.stringify(gridData);
			var jsonObject = JSON.parse(strData);
			$("#pwsGenerationRecordUpdates_" + _pageRef).val(jsonObject);
			/*if('approve' == methodName || 'update' == methodName)
			{   
				$.post(actionSrc, {}, function(data) {
					$("#pws_generation_searchGrid_" +_pageRef).html(data);
					_showProgressBar(false);
				}, "html");
			}*/
			//else
			//{
			var pageData = {};
			_showProgressBar(true);
			var serializedForm = $("#pwsGenerationRecordUpdates_" + _pageRef).serializeForm();
		}
		var methodName = args.methodName;
	    actionSrc = jQuery.contextPath + "/path/PWSGeneration/PWSGenerationMaint_" + methodName + "?pwsGenerationCO.ivCrud=" + $("#iv_crud_" + _pageRef).val();
	    $.ajax({
				url : actionSrc,
				type : "post",
				dataType : "json",
				data : serializedForm,
				success : function(data) {
					initializePWSGenerationScreen(true);
					_showProgressBar(false);
				}
			});
	}
}

function pwsGeneration_save_wsdl()
{
    var reqRespArrayParams  = returnRequestResponseGridParamsAsJson();
    var request_json = reqRespArrayParams[0];
    var response_json = reqRespArrayParams[1];
    $("#webServiceExplorerGridUpdates_"+_pageRef).val(request_json);
	$("#webServiceExplorerResponseGridUpdates_"+_pageRef).val(response_json);
	var serializedForm = $("#webServiceGuiDefFormId_"+returnOrgiPageRef()).serializeForm();
    var adapterType = $("#generation_type_"+_pageRef).val();
    var mappingId = "1";
	var actionSrc = jQuery.contextPath +"/path/common/pws/PWSGenerationMaint_save?webServiceExplorerCO.mappingID="+mappingId+"&webServiceExplorerCO.adapterType="+adapterType;
    $.ajax({
		url : actionSrc,
		type : "post",
		dataType : "json",
		data : serializedForm,
		success : function(data) {
			initializePWSGenerationScreen(true);
			_showProgressBar(false);
		}
	});

}

///**
// * @description import wsdl file 
// */
//function pws_importBpel()
//{
//	var importBpel = $("#uploadBPEL_"+_pageRef).val();
//	//var importBpelLen = $("#uploadBPEL_"+_pageRef).length;
//	_showProgressBar(true);
//	var options = {};
//	if(""!=importBpel && undefined != importBpel)
//	{
//		options = {
//				url : jQuery.contextPath+"/path/PWSGeneration/"+"PWSGenerationMaint_importBPEL",
//				type:'post',
//				success: function(response,status,xhr)
//				{
//					_showProgressBar(false);
//					alert("success");
//				}
//		}	
//	}
//	else{
//		return false;
//	}
//	$("#bpel_import_"+_pageRef).ajaxSubmit(options);
//}

/**
 * function to load record data
 */
function loadRecordData() {
	var procName = $("#procedureName_" + _pageRef).val();
	var serviceName = $("#serviceName_" + _pageRef).val();
	//	var operationName = $("#operationName_"+_pageRef).val();
	var operationName = $("#serviceName_" + _pageRef).val();
	var generationType = $("#generation_type_" + _pageRef).val();
	var adapterId = $("#pwsGenerationAdapterId_" + _pageRef).val();
	var connectionId = $("#lookuptxt_connId_" + _pageRef).val();
	var connectionDesc = "";
	if (undefined == adapterId) {
		adapterId = '';
	}
	var jsonStr = "{\"pwsGenerationCO.dgtlAdapterVO.ADAPTER_ID\"" + ":" + "\"" + adapterId + "\"" + ","
		+
		"\"pwsGenerationCO.dgtlAdapterVO.APP_NAME\"" + ":" + "\"" + "\"" + ","
		+
		"\"pwsGenerationCO.dgtlAdapterVO.BUSINESS_AREA\"" + ":" + "\"" + "\"" + ","
		+
		"\"pwsGenerationCO.dgtlAdapterVO.BUSINESS_DOMAIN\"" + ":" + "\"" + "\"" + ","
		+
		"\"pwsGenerationCO.dgtlAdapterVO.SERVICE_DOMAIN\"" + ":" + "\"" + "\"" + ","
		+
		"\"pwsGenerationCO.dgtlAdapterVO.VERSION\"" + ":" + "\"" + "\"" + ","
		+
		"\"pwsGenerationCO.dgtlAdapterVO.API_NAME\"" + ":" + "\"" + procName + "\"" + ","
		+
		"\"pwsGenerationCO.dgtlAdapterVO.OPERATION_NAME\"" + ":" + "\"" + operationName + "\"" + ","
		+
		"\"pwsGenerationCO.dgtlAdapterVO.SERVICE_NAME\"" + ":" + "\"" + serviceName + "\"" + ","
		+
		"\"pwsGenerationCO.dgtlAdapterVO.ADAPTER_TYPE\"" + ":" + "\"" + generationType + "\"" + ","
		+
		"\"pwsGenerationCO.connId\"" + ":" + "\"" + connectionId + "\"" + ","
		+
		"\"pwsGenerationCO.lstDgtlAdapterVO\"" + ":" + "[" + loadApiParamData() + "]"
		+ "}";
	return jsonStr;
}

/**
 * function to load grid parameters
 */
function loadApiParamData() {
	var paramGrid = $("#pwsGenerationParamTbl_Id_" + _pageRef);
	var jsonData = "";
	var gridRows = [];
	var $tr = paramGrid.children().children();
	$.each($tr, function(i, v) {
		var paramGridRowData = paramGrid.jqGrid("getRowData", i);
		if ("jqgfirstrow" != v.className) {
			jsonData = "{\"dgtlAdapterParamVO.OPERATION_ID\"" + ":" + "\"" + "\"" + ","
				+
				"\"dgtlAdapterParamVO.PARAMETER_NAME\"" + ":" + "\"" + paramGridRowData["allArgumentsVO.ARGUMENT_NAME"] + "\"" + ","
				+
				"\"dgtlAdapterParamVO.PARAM_TYPE\"" + ":" + "\"" + paramGridRowData["allArgumentsVO.DATA_TYPE"] + "\"" + ","
				+
				"\"dgtlAdapterParamVO.IS_MANDATORY_YN\"" + ":" + "\"" + "\"" + ","
				+
				"\"dgtlAdapterParamVO.IN_OUT\"" + ":" + "\"" + paramGridRowData["allArgumentsVO.IN_OUT"] + "\"" + ","
				+
				"\"dgtlAdapterParamVO.DEFAULT_VALUE\"" + ":" + "\"" + "\"" + ","
				+
				"\"dgtlAdapterParamVO.MAPPED_PARAM_NAME\"" + ":" + "\"" + paramGridRowData["dgtlAdapterParamVO.MAPPED_PARAM_NAME"] + "\"" + ","
				+
				"\"dgtlAdapterParamVO.NILLABLE\"" + ":" + "\"" + "\""
				+ "}";
			gridRows.push(jsonData);
		}
	});
	return gridRows.toString();
}


function initializePWSGenerationScreen() {
	var iv_crud = $("#iv_crud_" + _pageRef).val();
	var actionSrc = jQuery.contextPath + "/path/PWSGeneration/PWSGenerationMaint_initializeScreen.action?iv_crud=" + iv_crud;
	_showProgressBar(true);
	if (iv_crud == "R") {
		reloadArgGrid(null);
		$("#procedureName_" + _pageRef).val('');
		$("#serviceName_" + _pageRef).val('');
		$("#operationName_" + _pageRef).val('');
		$("#lookupid_connId_" + _pageRef).val('');
	} else {
		$("#pwsGenerationMaint_div_id_" + _pageRef).html("");
		pwsGeneration_showHideGrid("pws_generation_searchGrid_" + _pageRef)
	}

}

function PWSGeneration_onChange() {
	var iv_crud = $("#iv_crud_" + _pageRef).val();
	var type = $("#generation_type_" + _pageRef).val();
	var actionSrc = jQuery.contextPath + "/path/PWSGeneration/PWSGenerationMaint_onAdapterChange.action?iv_crud=" + iv_crud + "&pwsGenerationCO.dgtlAdapterVO.ADAPTER_TYPE=" + type + "&_pageRef=" + _pageRef;

	$.post(actionSrc, {}, function(data) {
		$("#pws_generation_main_div_" + _pageRef).html(data);
		_showProgressBar(false);
	}, "html");
}

function PWSGeneration_upload() {
	var fileName = document.getElementById("uploadBPEL_" + _pageRef).value;
	var ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
	ext = ext.toUpperCase();
	//	if(ext != "ZIP" && ext != "RAR")
	//	{
	//		_showErrorMsg("File type not allowed");
	//	}
	//	else{
	//		PWSGeneration_uploadBPEL(fileName);
	//	}

	var conUrl = "/path/PWSGeneration/bpelImport_importBPEL?_pageRef=" + _pageRef + "&pwsGenerationCO.methodType=save";
	PWSGeneration_uploadBPEL(fileName, conUrl);
}

function validateFileName(object) {
	//    _showProgressBar(true);
		var fileName = document.getElementById("uploadBPEL_" + _pageRef).value;
		var ext = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
		var conUrl = "/path/PWSGeneration/bpelImport_importBPEL?_pageRef="+_pageRef+"&pwsGenerationCO.methodType=import";
		PWSGeneration_uploadBPEL(fileName,conUrl);     
}

function PWSGeneration_uploadBPEL(fileName, conUrl) {
	var serializedForm = $("#pwsGenerationRecordUpdates_" + _pageRef).serializeForm();
	var arr = fileName.split("\\");
	var arrLength = arr.length;
	var name = arr[arrLength - 1];
	if (fileName == "" || fileName == undefined) {
		alert("Please Select the file");
		return;
	}
	$("#bpel_import_" + _pageRef).ajaxSubmit({
		url : jQuery.contextPath + conUrl + "&pwsGenerationCO.bpelFileName=" + name,
		type : 'post',
		dataType : 'json',
		data : serializedForm,
		success : function(response, status, xhr) {
				   // loadPWSExplorerGrid(name); 
			var wsdlUrl = $("#wsdl_url_" + _pageRef).val();
			var adapterType = $("#generation_type_"+_pageRef).val();
			var actionSrc = jQuery.contextPath + "/path/PWSGeneration/PWSGenerationDependencyAction_loadPWSGenerationWebserviceExplorerGrid?_pageRef="+_pageRef+"&webServiceExplorerCO.isFromBpelScreen=true&webServiceExplorerCO.screenName=pwsGeneration&webServiceExplorerCO.adapterType="+adapterType+"&webServiceExplorerCO.bpelFileName=" + fileName+"&webServiceExplorerCO.wsdlUrl=" + wsdlUrl;
			$.post(actionSrc, {}, function(data) {
				$("#pwsGenerationExplorerGrid_" + _pageRef).html(data);
				_showProgressBar(false);
			}, "html");

			_showProgressBar(false);
		}
	});
}

/**
 *
 */
function loadPWSExplorerGrid(fileName) {
	var actionSrc = jQuery.contextPath + "/path/PWSGeneration/PWSWebServiceExplorerList_loadMainGridFn?webServiceExplorerCO.isFromBpelScreen=true&webServiceExplorerCO.bpelFileName=" + fileName;
	$.post(actionSrc, {}, function(data) {
		$("#pwsGenerationExplorerGrid_" + _pageRef).html(data);
		_showProgressBar(false);
	}, "html");
}

function PWSGeneration_onWsdlUrlChange() {
	var wsdlUrl = $("#wsdl_url_" + _pageRef).val();
	var adapterType = $("#generation_type_"+_pageRef).val();
	var actionSrc = jQuery.contextPath + "/path/PWSGeneration/PWSGenerationDependencyAction_loadPWSGenerationWebserviceExplorerGrid?_pageRef="+_pageRef+"&webServiceExplorerCO.isFromBpelScreen=false&webServiceExplorerCO.isFromSoapScreen=true&webServiceExplorerCO.screenName=pwsGeneration&webServiceExplorerCO.adapterType="+adapterType+"&webServiceExplorerCO.wsdlUrl=" + wsdlUrl;
	$.post(actionSrc, {}, function(data) {
		$("#pwsGenerationExplorerGrid_" + _pageRef).html(data);
		_showProgressBar(false);
	}, "html");
}