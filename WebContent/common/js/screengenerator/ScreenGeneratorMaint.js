function screenGeneratorMaint_processSubmit()
{
  var screenDesc = $("#dynScreenDesc").val();
  if(screenDesc == null || screenDesc =="")
  {
	 _showErrorMsg(missing_elt_msg_key,error_msg_title);
	 return;
  }
  setHtmlDiv(false);
}
function setHtmlDiv(saveAs)
{
	if(typeof $("#editor_div").html() === "undefined" || $("#editor_div").html().trim() === "") 
		return;
	
	var allDivs = [];
	var additionalDivs = [];
	var curDiv = {}
	var isDefault = saveAs;
	$("#editor_div").find("div._newdrag").each(function (i)
	{
		curDiv = {};
		curDiv["TEMPLATE_ID"] = 1//parseInt(templateId);//$(this).attr("templateId");
		curDiv["ELT_ID"] = this.id.substring(0,this.id.indexOf("_div"));
		curDiv["TOP_POS"] = parseInt(this.style.top);
		curDiv["LEFT_POS"] = parseInt(this.style.left);
		curDiv["ELT_CATEGORY"] = parseInt($(this).attr("status"));
		var _childElem = $("#editor_div").find("[id="+curDiv["ELT_ID"]+"]")[0];
		curDiv["PROP_ID"] = $("#editor_div").find("[id="+_childElem.id+"]").attr("propId");
		if(_childElem.style.width != null && typeof _childElem.style.width !="undefined" && _childElem.style.width !="")
		{			
		   curDiv["ELT_WIDTH"] = parseInt(_childElem.style.width.substring(0,_childElem.style.width.indexOf("px")));
		}
		if(typeof _childElem.style.height != "undefined" && _childElem.style.height != "")
		{
//			curDiv["ELT_HEIGHT"] = 23;
			curDiv["ELT_HEIGHT"] = parseInt(_childElem.style.height.substring(0,_childElem.style.height.indexOf("px")));
		}
		
		curDiv["ELT_TYPE"] = parseInt($(this).attr("type"));
		curDiv["techId"] = parseInt($(this).attr("techId"));
		if(typeof $(this).attr("parentTechId")!="undefined" && $(this).attr("parentTechId")!=null && $(this).attr("parentTechId")!="")
		{
			curDiv["parentTechId"] = parseInt($(this).attr("parentTechId"));
		}
		if(typeof $(this).attr("value") != "undefined" && $(this).attr("value") != "null")
			curDiv["ELT_DESC"] = $(this).attr("value") ;
		/*TO-DO: to be changed*/
		var app_id="RET";
		var app_func_id = "LM01MT";
		
//		curDiv["APP_ID"] = parseInt(app_id);
//		curDiv["APP_FUNC_ID"] = app_func_id;
		if($(this).attr("defTemp") === "1" || saveAs) // saveAs clicked 
		{
		  curDiv["TEMPLATE_ID"] =  -1;
		  isDefault = true;
		}
//		curDiv["IS_DEFAULT"] = isDefault;
		/**
		 * Translation Management...
		 */
		if(typeof $(this).attr("tnsKey") != "undefined" && $(this).attr("tnsKey") !="null" && $(this).attr("tnsKey") !="")
			curDiv["TNS_KEY"] = $(this).attr("tnsKey");
		else
			curDiv["TNS_KEY"] = $(this).attr("value")+"_key";
		allDivs.push(curDiv);
	})
	var theParam ={}
	if(typeof allDivs !="undefined" && allDivs.length > 0)
	{	
	   theParam["screenData"] = "{"+ "\"root\":"+JSON.stringify(allDivs) +"}";
	   $("#screenData").val(theParam);
	}
	if(theSelectedElemID!=null && theSelectedElemID!="")
	{
		fillPropertiesJsonArray(theSelectedElemID);
	}
	theParam["dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_ID"]   = $("#dynScreenId").val();
	theParam["dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_DESC"] = $("#dynScreenDesc").val();
	theParam["dynScreenCreatorCO.scrTableId"] = $("#screenTableId").val();
	if (document.getElementById("screenTableGridFlagId").checked == true)
		{
		theParam["dynScreenCreatorCO.scrGridFlag"] = 1;
		}
	else
		{
		theParam["dynScreenCreatorCO.scrGridFlag"] = 0;
		}

	var createFrom = $("#createFromId").val();
	if(typeof createFrom!="undefined" && createFrom!=null && createFrom!="")
	{
		theParam["dynScreenCreatorCO.createFrom"] = createFrom;
	}
	var loadScriptData = $("#loadScriptHidData").val();
	if(loadScriptData!=null && loadScriptData!="")
	{		
	   theParam["dynScreenCreatorCO.sysDynScreenDefVO.ON_LOAD_SCRIPT"]  = loadScriptData;
	}
	var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
	if(typeof propertiesJsonArray !="undefined" && propertiesJsonArray.length > 0)
	{		
	   theParam["propertiesData"] = "{"+ "\"root\":"+JSON.stringify(propertiesJsonArray) +"}";
	}
	if(typeof theParam["screenData"] !="undefined" && typeof theParam["propertiesData"] !="undefined")
	{
			if(!elementPropertiesValidation())
			{
				   return;
			}
	}
	_showProgressBar(true);
		$.ajax({
				url : jQuery.contextPath
						+ "/path/screenGenerator/generatorMaint_checkCustomizedLinks",
				type : "post",
				dataType : "json",
				data : theParam,
				success : function(data) {
					_showProgressBar(false);
					if (typeof data["_error"] == "undefined"
							|| data["_error"] == null) {
						var theMsg = data.dynScreenCreatorCO.respMsg;
						if (theMsg != "undefined" && theMsg != null
								&& theMsg != "" && theMsg != undefined) {

							_showConfirmMsg(
									"Below screen elements are linked to customization screens, delete anyway? \n"
											+ "\n" + theMsg, confirm_msg_title,
									function(yesNo) {
										if (yesNo) {
											submitLayout(theParam);
										}
									}, "yesNo", '', '', returnMaxWidth(750));
						} else {
							submitLayout(theParam);
						}

					}
				}
			});
}
function submitLayout(theParam)
{
	$.ajax({
		 url: jQuery.contextPath+"/path/screenGenerator/generatorMaint_submitLayout",
         type:"post",
		 dataType:"json",
		 data: theParam,
		 success: function(data){
		 _showProgressBar(false);
		     if(typeof data["_error"] == "undefined" || data["_error"] == null)
		     {
                screenGenerator_initializeAfterSubmit();
                if($("#screenGeneratorListGridTbl_Id").html()!=null && $("#screenGeneratorListGridTbl_Id").html()!="")
                {
                   $("#screenGeneratorListGridTbl_Id").trigger("reloadGrid");
                }
             }
		 }
    });
}
function screenGenerator_initializeAfterSubmit()
{
	var actionSrc = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_initialize?";
	$.post(actionSrc, {}, function(param) {
		$("#screenGeneratorMainInfoDiv_id").html(param);
    	screenGeneratorList_initializeDataOnSuccess();
	}, "html");
}
function elementPropertiesValidation()
{
	var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
	var result = true;
	for(var i=0;i<propertiesJsonArray.length;i++)
	{
		var currentId = (propertiesJsonArray[i].propertiesValMap)["elemProp_id"];
		if(typeof currentId=="undefined" || currentId==null || currentId == "")
			{
				_showErrorMsg("Invalid Missind Ids",error_msg_title);
			    result = false;
			    break;
			}
	}
	return result;
}
function screenGeneratorList_onDelClicked()
{
	var _screenId = $("#dynScreenId").val();
	if(_screenId!=null && _screenId!=null && _screenId!="")
	{
		_showConfirmMsg(Confirm_Delete_Process_key, Warning_key,
		screenGeneratorList_DelAfterConfirm, {screenId : _screenId});		
	}
	else
	{
		_showErrorMsg("No Screen Selected to Delete",info_msg_title);
	}
}
function screenGeneratorList_DelAfterConfirm(confirm,args)
{
	var theParam ={};
	theParam["dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_ID"] = args.screenId;
	if(confirm)
	{
		$.ajax({
			 url: jQuery.contextPath+"/path/screenGenerator/generatorMaint_deleteScreen",
	         type:"post",
			 dataType:"json",
			 data: theParam,
			 success: function(data){
			 _showProgressBar(false);
			     if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {
                    screenGenerator_initializeAfterSubmit();	                   
	                if($("#screenGeneratorListGridTbl_Id").html()!=null && $("#screenGeneratorListGridTbl_Id").html()!="")
	                {
                       $("#screenGeneratorListGridTbl_Id").trigger("reloadGrid");
	                }
	             } 
			 }
	    });
	}
}
function screenGenerator_previewScreen()
{
	var screenId = $("#dynScreenId").val();
	dynamicScreen_openDynamicScreen(screenId,null,null,null,null,true);
}
function screenGenerator_deleteElement(e)
{
  var targetId = e.target.id;
  if(e.which == 46 && typeof theSelectedElemID !="undefined" && theSelectedElemID!=null && theSelectedElemID!="" && $("#"+theSelectedElemID).hasClass("_newdrag")
	 && (targetId == theSelectedElemID || targetId == "editor_div" || targetId == "")	  
    )
  {
	  screenGenerator_removeElemFromPropArr(theSelectedElemID);
	  $("#"+theSelectedElemID).remove();
	  theSelectedElemID = "";
	  $("#elementPropertiesWidId").html(null);
  } 
}
function screenGenerator_removeElemFromPropArr(selectedDivId)
{
   var elementId = "";	
   if(selectedDivId.indexOf("new_") != -1)
   {
	  elementId =  selectedDivId.split("_")[1];
   }
   else
   {
	  elementId =  selectedDivId.split("_")[0]; 
   }
   var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
   if(typeof propertiesJsonArray !="undefined" && propertiesJsonArray!=null)
   {	   
	   for(var i=0;i<propertiesJsonArray.length;i++)
	   {
		   var currentElemId = propertiesJsonArray[i].elementId;
		   if(currentElemId == elementId)
		   {
			  propertiesJsonArray.splice(i,1);
		   }
	   }
	   cachePathData("dynScreenPropertiesArray",propertiesJsonArray);
   }
}
function screenGeneratorProp_openOptionsScreen(elementId)
{
	var	optionsScreenDiv = $("<div id='dyn_options_screen_div' class='path-common-sceen'></div>");
	optionsScreenDiv.css("padding","0");
	optionsScreenDiv.insertAfter($('body'));
		
	var screenId = $("#dynScreenId").val();
	var optionsData = $("#"+elementId+"_optionData").val();
    
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.optionsData":optionsData};
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/generatorMaint_loadOptionsScreen?";
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		optionGrid_saveOptionsDetails();
		$(this).dialog("close");
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof options_screen_title_key === "undefined")?"Options Screen" :options_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(400),
			                  height:returnMaxHeight(350),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_options_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_options_screen_div").dialog(_dialogOptions);
	$("#dyn_options_screen_div").dialog("open");
    _showProgressBar(false);
}
function optionsGrid_addOption()
{
	var $optionsGridId = $("#optionsGridId"); 
	var rowId = $optionsGridId.jqGrid("addInlineRow",{});
	$optionsGridId.jqGrid('setSelection',rowId, false);
}
function optionsGrid_delOption()
{
	var $optionsGridId = $("#optionsGridId"); 
	var selectedRowId = $optionsGridId.jqGrid('getGridParam', 'selrow');
	$optionsGridId.jqGrid('deleteGridRow',selectedRowId);
}
function optionGrid_checkOptionsData()
{
	var $table        = $("#optionsGridId");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject      = $table.jqGrid('getRowData', selectedRowId);
	var enteredCode = myObject["code"];
	
    var rowIds        = $("#optionsGridId").jqGrid('getDataIDs');
    for(var i = 0; i < rowIds.length; i++) 
    {
    	var rowId = rowIds[i];
    	var currObject = $table.jqGrid('getRowData', rowId);
    	var currCode   = currObject["code"]; 
    	if(rowId!= selectedRowId && enteredCode === currCode)
    	{
    		_showErrorMsg("Duplicated Code",info_msg_title);
    		$table.jqGrid('setCellValue',selectedRowId,"code",null);
    		return;
    	}
    }
}
function optionGrid_saveOptionsDetails()
{
    var $table    = $("#optionsGridId");
	var gridData  = $table.jqGrid("getAllRows");
	var elementId = $("#elementId").val();
	if(typeof gridData != "undefined" && gridData != null && gridData != "")
	{		
		jsonGridData = $.parseJSON(gridData);
		$("#"+elementId+"_optionData").val(JSON.stringify(jsonGridData["root"]));
	}
	else
	{
		$("#"+elementId+"_optionData").val(null);
	}
}
function optionGrid_onDefaultValueChange(e)
{
    var $table = $("#optionsGridId");
    var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	var myObject  = $table.jqGrid('getRowData', selectedRowId);
	var isChecked = myObject["defaultValue"];
	if(isChecked == 1)
	{		
	    var rowIds = $table.jqGrid('getDataIDs');
		$.each(rowIds, function(index,rowId) {
			if(rowId != selectedRowId) {
					$table.jqGrid("setCellEltValue",rowId,"defaultValue",0);
			}
		});
	}
	
}
function screenGeneratorProp_openQueryScreen(elementId,rowId,elementType)
{

	var	optionsScreenDiv = $("<div id='dyn_query_screen_div' class='path-common-sceen'></div>");
	optionsScreenDiv.css("padding","0");
	optionsScreenDiv.insertAfter($('body'));
	
	var screenId = $("#dynScreenId").val();
	if (rowId == undefined)
	{
		var queryData = $("#"+elementId+"_queryData").val();
	}
	else
	{
		var queryData = $("#dynScrGridWidgetColPropsId").jqGrid('getCell', rowId,'QUERY_DATA');
	}
    
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.queryData":queryData};
	
	if(typeof elementType != 'undefined' && elementType != undefined && elementType != null)
	{
		curParams["criteria.elementType"] = elementType;
	}
    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/generatorMaint_loadQueryScreen?";
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		optionGrid_saveQueryDetails($(this),rowId,elementType);
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof options_screen_title_key === "undefined")?"Options Screen" :options_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(565),
			                  height:returnMaxHeight(336),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_query_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_query_screen_div").dialog(_dialogOptions);
	$("#dyn_query_screen_div").dialog("open");

}
function optionGrid_saveQueryDetails(theDialog,rowId)
{

    var querySynthax = $("#querySynthax").val();
    var columnCode   = $("#queryColumnCode").val();
    var columnDesc   = $("#queryColumnDesc").val();
    var elementId    = $("#elementId").val();
    var elementType    = $("#elementType").val();
    var queryInfo    = {};
    var params       = {};
    var result       = []
    
    if(querySynthax==null || querySynthax=="")
    {
       _showErrorMsg("query synthax",missing_elt_msg_key);
       return;
    }
    //in case of grid we dont need to check on col code and col desc
    if(elementType != '12')
    {	
	    if(columnCode==null || columnCode=="")
	    {
	       _showErrorMsg("Column Code",missing_elt_msg_key);
	       return;
	    }
	    if(columnDesc==null || columnDesc=="")
	    {
	       _showErrorMsg("column Desc",missing_elt_msg_key);
	       return;
	    }
    }
    queryInfo["columnCode"]   = columnCode;
    queryInfo["columnDesc"]   = columnDesc;
    queryInfo["querySynthax"] = querySynthax;
        
    params["dynScreenQueryCO.columnCode"]   = columnCode;
    params["dynScreenQueryCO.columnDesc"]   = columnDesc;
    params["dynScreenQueryCO.querySynthax"] = querySynthax;
    params["dynScreenQueryCO.elementType"] = elementType;
	_showProgressBar(true);
    $.ajax({
		 url: jQuery.contextPath+"/path/screenGenerator/generatorMaint_checkQueryValidation",
         type:"post",
		 dataType:"json",
		 data: params,
		 success: function(data){
		     _showProgressBar(false);
		     if(typeof data["_error"] == "undefined" || data["_error"] == null)
		     {
		    	var newColCode = data.dynScreenQueryCO.columnCode;
		    	if(newColCode != null && newColCode != 'undefined' && newColCode != undefined && newColCode != '')
	    		{
		    	 queryInfo["columnCode"] = data.dynScreenQueryCO.columnCode;
	    		}
			    result.push(queryInfo);
			    
			    if(rowId==undefined)
			    {
					$("#"+elementId+"_queryData").val(JSON.stringify(result));
			    }
			    else
			    {
			    	var queryData = JSON.stringify(result);
				    $("#dynScrGridWidgetColPropsId").jqGrid('setCellValue', rowId, 'QUERY_DATA', queryData);
			    }
			    
				theDialog.dialog("close");
             }
		 }
    });
}
function screenGenerator_onIdPropertyChange(propertyId)
{
	var currValue = $("#"+propertyId).val();	
	var elementId = propertyId.split("_")[0];
	$("[propId="+currValue+"]").each(
		function(){
			var currElementId = this.id;
			if(currElementId != elementId)
			{
				_showErrorMsg("Duplicated Id",error_msg_title);
				$("#"+propertyId).val(null);
				return;
			}
		}
	);

	var prevVal =$("#"+propertyId).attr("prevvalue");
	var screenId  = $("#dynScreenId").val();    
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":prevVal, "criteria.onLoadExp":currValue};

	if($("#"+elementId).length > 0)
	{
		$("#"+elementId).attr("propId",currValue);
	}
	else if($("#new_"+elementId).length > 0)
	{
		$("#new_"+elementId).attr("propId",currValue);
	}
	// Check if livesearch items are already loaded then update
	// the lookupDesc property
	var propertiesJsonArray = cachePathData("dynScreenPropertiesArray");
	if (typeof propertiesJsonArray == "undefined"
			|| propertiesJsonArray == null) {
		propertiesJsonArray = [];
	}
	var lookupNotUpdated = true;
	for (var i = 0; i < propertiesJsonArray.length; i++) {
		if ((propertiesJsonArray[i])["propertiesValMap"]["elemProp_lookupDesc"] == prevVal) {
			(propertiesJsonArray[i])["propertiesValMap"]["elemProp_lookupDesc"] = currValue;
			$("#" + propertyId).attr("prevvalue", currValue);
			lookupNotUpdated = false;
		}
	}
	cachePathData("dynScreenPropertiesArray", propertiesJsonArray);
	if(lookupNotUpdated)
		{
		$.ajax({
			url : jQuery.contextPath
					+ '/path/dynamicScreen/dynDependencyAction_textIdDependency',
			type : "post",
			data : curParams
		});
		}

}

function screenGeneratorProp_openBtnSourceScreen(elementId,elementType,forChange)
{
	var	optionsScreenDiv = $("<div id='dyn_btn_source_screen_div' class='path-common-sceen'></div>");
	optionsScreenDiv.css("padding","0");
	optionsScreenDiv.insertAfter($('body'));
	
	var screenId  = $("#dynScreenId").val();
	var btnSource;
	var curParams = {"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.elementType":elementType};
	if(typeof forChange!="undefined" && forChange!=null && forChange!="" && forChange=="1")
	{
		btnSource  = $("#"+elementId+"_onChangeData").val();
		curParams["criteria.forChange"] = forChange;
	}
	else
	{
		btnSource  = $("#"+elementId+"_sourceData").val();
	}
	curParams["criteria.sourceData"] = btnSource;
	
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadBtnSourceScreen?";
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		screenGeneratorProp_saveBtnSourceDetails($(this),forChange);
		
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof btn_source_screen_title_key === "undefined")?"Button Source" :btn_source_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(750),
			                  height:returnMaxHeight(450),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_btn_source_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_btn_source_screen_div").dialog(_dialogOptions);
	$("#dyn_btn_source_screen_div").dialog("open");

}
function screenGeneratorProp_saveBtnSourceDetails(theDialog,forChange)
{
	var sourceType   = $("#selButtonSrcType").val();
    var elementId    = $("#elementId").val();
    var sourceInfo   = {};
    var result       = []
    var intScreenId  = null;
    var scriptData   = "";
    
    sourceInfo["sourceType"] = sourceType;
    if(sourceType == "1")
    {
    	intScreenId   = $("#lookuptxt_btnSourceScreenId").val();
    	sourceInfo["sourceScreenId"] = intScreenId;
    	
    	sourceInfo["sourceScreenWidth"] = $('#screenWidth_'+ _pageRef).val();
    	sourceInfo["sourceScreenHeight"] = $('#screenHeight_' + _pageRef).val();
    	
    	screenGeneratorProp_dynamicScrParamMapUpdate(sourceInfo, true);
    }
    else if (sourceType == "2")
    {
    	scriptData = $("#btnSource_scriptId").val();
    	sourceInfo["sourceScriptData"] = scriptData;
    	
    }
    else
    {
    	var globalActId   = $("#lookuptxt_btnSourceActivityId").val();
    	sourceInfo["sourceGlobalActivityId"] = globalActId;
    	screenGeneratorProp_dynamicScrParamMapUpdate(sourceInfo, true);
    }
	result.push(sourceInfo);
	if(typeof forChange!="undefined" && forChange!=null && forChange!="" && forChange=="1")
	{
		$("#"+elementId+"_onChangeData").val(JSON.stringify(result));
	}
	else
	{		
		$("#"+elementId+"_sourceData").val(JSON.stringify(result));
	}
	theDialog.dialog("close");
}

function screenGeneratorProp_dynamicScrParamMapUpdate(sourceInfo, stopProcessing)
{
	var $table = null;
	if($('#dynScreenParamMapGrid_Id_' + _pageRef).length > 0)
	{
		$table = $("#dynScreenParamMapGrid_Id_" + _pageRef);
		
	}
	else if(openedFromDynamicScreen(currentPageRef))
	{
		$table = $("#ButtonCustParamMapGrid_Id_" + currentPageRef);
	}
	
	if($table != null)
	{
		var checkRequiredCells = $table.jqGrid('checkRequiredCells');
		if(checkRequiredCells)
		{	
			var jsonOpUpdates = $table.jqGrid('getChangedTrimRowData',false);
			sourceInfo["scrParamMapGridUpdate"] = jsonOpUpdates;
		}
		else if(stopProcessing)
		{
			return; 
		}
	}
}

function screenGeneratorProp_returnGridScreenParam(gridId)
{
	var $table  = $("#"+gridId);
	var screenParamMap = {}; 
	var screenParamListVal = $("#"+gridId+"_screenParamList").val();
	if(screenParamListVal != undefined && screenParamListVal != null && screenParamListVal != '' )
	{
		var screenParamArr = eval(screenParamListVal);
		if( screenParamArr != undefined && screenParamArr != null && screenParamArr.length > 0 )
		{
			for(var i=0; i<screenParamArr.length; i++)
			{
				var inputId = screenParamArr[i];
				var inputElem = $('#'+inputId);
				var htmlInputId = inputId;
				if(inputElem == undefined || inputElem == null || inputElem.length <= 0)
				{
					htmlInputId = inputId + "_" + _pageRef;
					inputElem = $('#'+ htmlInputId );
				}
				
				if(inputElem != undefined && inputElem != null && inputElem.length > 0)
				{
					var inputValue = returnHtmlEltValue(htmlInputId);
					var inputMode = 'text';
					var inputModeAttr = inputElem.attr('mode');
					if(inputModeAttr != undefined && inputModeAttr != null && inputModeAttr != '')
					{
						inputMode = inputModeAttr;
					}
					
					screenParamMap[inputId] = {'inputValue':inputValue,'inputMode':inputMode};
				}
			}
		}
			
	}
	
	return JSON.stringify(screenParamMap);
}

function screenGeneratorProp_onBeforTopic(gridId,rowObj)
{
	var $gridElem = $('#'+gridId);
	
	if(rowObj != undefined && rowObj != null
			&& rowObj.originalEvent != undefined && rowObj.originalEvent != null 
				&& rowObj.originalEvent.xhr != undefined && rowObj.originalEvent.xhr != null 
					&& rowObj.originalEvent.xhr.data != undefined && rowObj.originalEvent.xhr.data != null && rowObj.originalEvent.xhr.data != '')
	{
		var gridScreenParam = screenGeneratorProp_returnGridScreenParam(gridId);
		var values = $gridElem.jqGrid('getGridParam').postData;
		var index;
		var newParamsObj = {};


		// replace screenParamMap if there
		values["screenParamMap"] = gridScreenParam;
		
		// encrypt parameters string
		rowObj.originalEvent.xhr.data = returnEncryptedData($.param(values));
	}

	$gridElem.data('toreloadgrid',true);
}

function screenGeneratorProp_onGridCompleteTopicReload(gridId,params)
{
		var $table  = $("#"+gridId);
		var gridUrl = jQuery.contextPath+"/path/dynamicScreen/dynScrGridListAction_loadDynScrGridWidget";
		var toreloadgrid = $table.data('toreloadgrid');
		if(toreloadgrid == false)
		{
			return;
		}
		if(params == undefined|| params == null )
		{
			params = {};
		}	
		
		if( $table != null && $table != undefined)
		{
			var gridScreenParam = screenGeneratorProp_returnGridScreenParam(gridId);
			params["screenParamMap"] = gridScreenParam;
			$table.jqGrid('setGridParam', {url : gridUrl, datatype : 'json', postData : params}).trigger("reloadGrid");
			$table.data('toreloadgrid',false);
		}
}

function screenGeneratorProp_returnAllElementsIdsForGrid(withFormId)
{
	var btnScriptExpTags = new Array();
	if(typeof expression_cust_grid_tags !="undefined" && expression_cust_grid_tags!=null && expression_cust_grid_tags.length > 0)
	{	
		for(var i=0;i<expression_cust_grid_tags.length;i++)
		{
			btnScriptExpTags.push(expression_cust_grid_tags[i]);
		}
	}
	if(withFormId)
	{		
 	   btnScriptExpTags.push("[formId]");
	}
	$("#editor_div > div >[propId]").each(function(i){
		var currPropId = $("#editor_div").find("[id="+this.id+"]").attr("propid");
		var elemType = $("#editor_div").find("[id="+this.id+"type]").attr("type");

		if(elemType!="2" && elemType!="8")
		{
			btnScriptExpTags.push("[screen."+ currPropId +"]");			
		}
	});
	return btnScriptExpTags;
}

function screenGeneratorProp_returnAllElementsIds(withFormId,withHashTag)
{
	var btnScriptExpTags = new Array();
	if(typeof expression_cust_tags !="undefined" && expression_cust_tags!=null && expression_cust_tags.length > 0)
	{	
		for(var i=0;i<expression_cust_tags.length;i++)
		{
			btnScriptExpTags.push(expression_cust_tags[i]);
		}
	}
	if(withFormId)
	{		
 	   btnScriptExpTags.push("[formId]");
	}
	$("#editor_div > div >[propId]").each(function(i){
		var currPropId = $("#editor_div").find("[id="+this.id+"]").attr("propid");
		var elemType = $("#editor_div").find("[id="+this.id+"type]").attr("type");
		/**
		 * to avoid the labels and buttons ids from the elements ids list
		 */
		if(typeof withHashTag != "undefined" && withHashTag != null && withHashTag)
		{
			currPropId = "#"+currPropId;
		}
		if(elemType!="2" && elemType!="8")
		{
			btnScriptExpTags.push(currPropId);			
		}
	});
	return btnScriptExpTags;
}
function screenGenerator_onLoadScriptScreen()
{
	var	loadScriptDiv = $("<div id='dyn_load_script_screen_div' class='path-common-sceen'></div>");
	loadScriptDiv.css("padding","0");
	loadScriptDiv.insertAfter($('body'));
	
	var screenId       = $("#dynScreenId").val();
	var loadScriptData = $("#loadScriptHidData").val();
    
	var curParams = {"criteria.screenId":screenId,"criteria.loadScriptData":loadScriptData};
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadOnLoadScriptScreen?";
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		screenGeneratorProp_saveLoadScriptData($(this));
		
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof load_script_screen_title_key === "undefined")?"On Load Script Data" :load_script_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(540),
			                  height:returnMaxHeight(300),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_load_script_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_load_script_screen_div").dialog(_dialogOptions);
	$("#dyn_load_script_screen_div").dialog("open");

}
function screenGeneratorProp_saveLoadScriptData(theDialog)
{
    var sourceInfo   = {};
    var result       = []
    var intScreenId  = null;
    var scriptData   = "";
    loadScriptData = $("#loadScriptData").val();
    sourceInfo["loadScriptData"] = loadScriptData;
	result.push(sourceInfo);
	$("#loadScriptHidData").val(JSON.stringify(result));
	theDialog.dialog("close");

}
function screenGenerator_loadDynamicScreenParamMap(dynScreenMapParam)
{
	if(dynScreenMapParam == undefined || dynScreenMapParam == null)
	{
		return;
	}
	
	if( dynScreenMapParam.divId != undefined && dynScreenMapParam.divId != null && dynScreenMapParam.divId != ''
		&& dynScreenMapParam.elementIdentifier != undefined && dynScreenMapParam.elementIdentifier != null 
		&& dynScreenMapParam.mapElementType != undefined && dynScreenMapParam.mapElementType != null && dynScreenMapParam.mapElementType != '' )
	{	
		_showProgressBar(true);

		var mappingActionSrc = jQuery.contextPath + "/path/dynamicScreen/dynScreenParamListAction_loadDynamicScreenParamMapList.action";
		var mappingActionParams = {'criteria.elementIdentifier' : dynScreenMapParam.elementIdentifier,
								   'criteria.mapElementType' : dynScreenMapParam.mapElementType,
								   'criteria.elementOpId' : dynScreenMapParam.elementOpId,
								   '_pageRef' : dynScreenMapParam.currentPageRef,
								   'criteria.currAppName' : dynScreenMapParam.appName,
								   'criteria.progRef' : dynScreenMapParam.progRef,
								   'criteria.compCode' : dynScreenMapParam.compCode,
								   'criteria.defaultScreenId' : dynScreenMapParam.defaultScreenId,
								   'criteria.globalActivityId' : dynScreenMapParam.globalActivityId,
								   'criteria.screenWidth' : dynScreenMapParam.screenWidth,
								   'criteria.screenHeight' : dynScreenMapParam.screenHeight,
								   'criteria.showScreenWidthAndHeight' : dynScreenMapParam.showScreenWidthAndHeight}; 	

		var elementType = $('#elementType').val();
		if(!(elementType == undefined && elementType == 'undefined' && elementType == null))
		{
			mappingActionParams['criteria.elementType'] = elementType;
		}
		
		$("#" + dynScreenMapParam.divId).load(mappingActionSrc,mappingActionParams, function() 
		{
			_showProgressBar(false);
		});
	}	
}

function openedFromDynamicScreen(currentPageRef)
{
	return ( $('#buttonCustParamMapGrid_PROG_REF_' + currentPageRef).parent('div#btnSourceScreenParamMapDiv').length == 1 );
}

function screenGenerator_loadButtonCustomizationParamMap(dynScreenMapParam)
{
	if(dynScreenMapParam == undefined || dynScreenMapParam == null)
	{
		return;
	}
	
	if( dynScreenMapParam.divId != undefined && dynScreenMapParam.divId != null && dynScreenMapParam.divId != ''
		&& dynScreenMapParam.elementIdentifier != undefined && dynScreenMapParam.elementIdentifier != null 
		&& dynScreenMapParam.mapElementType != undefined && dynScreenMapParam.mapElementType != null && dynScreenMapParam.mapElementType != '' )
	{	
		_showProgressBar(true);
		var mappingActionSrc = jQuery.contextPath + "/path/buttoncustomization/buttonCustomizationParamListAction_loadParamMapList.action";
		var mappingActionParams = {'criteria.sysParamGlobalActArgMapVO.ELEM_FLD_IDENTIFIER' : dynScreenMapParam.elementIdentifier,
								   'criteria.sysParamGlobalActArgMapVO.APP_NAME' : dynScreenMapParam.appName,
								   'criteria.sysParamGlobalActArgMapVO.PROG_REF' : dynScreenMapParam.progRef,
								   'criteria.sysParamGlobalActArgMapVO.BTN_ID' : dynScreenMapParam.globalActivityId,
								   'criteria.sysParamGlobalActArgMapVO.SCREEN_ELEM_PROG_REF' : dynScreenMapParam.currentPageRef,
								   'criteria.sysParamGlobalActArgMapVO.ELEM_SEQUENCE_ID' : dynScreenMapParam.sequenceId,
								   '_pageRef' : dynScreenMapParam.currentPageRef,
								   'criteria.sysParamGlobalActArgMapVO.DYN_SCREEN_ID' : $('#screenId').val(),
								   'criteria.sysParamGlobalActArgMapVO.DYN_SCREEN_ELEMENT_ID' : $('#elementId').val()
								   }
		
		if(typeof dynScreenMapParam.loadedInObjDisplay != 'undefined' && dynScreenMapParam.loadedInObjDisplay != null)
		{
			mappingActionParams.loadedInObjDisplay = dynScreenMapParam.loadedInObjDisplay;
			if(mappingActionParams.loadedInObjDisplay == true)
			{
			    var gridColumnsValues = screenGenerator_returnColumnHiddenInputValue(dynScreenMapParam.currentPageRef);
			    //use encodeuricomponent to escape arabic characters in column titles
			    mappingActionParams['criteria.gridColumns'] = encodeURIComponent(gridColumnsValues);
			}
		}
		
		$.ajax({
			url : mappingActionSrc,
			type : "post",
			dataType : "html",
			data : mappingActionParams,
			success : function(data) {

				$("#" + dynScreenMapParam.divId).html(data);
				_showProgressBar(false);

			}
		});
	}	
}


function screenGenerator_returnColumnHiddenInputValue(currentPageRef)
{
	var objectId = $('#objectId').val();
	if (typeof objectId != 'undefined' && objectId != undefined && objectId != null && objectId != '') 
	{
		var $destinationTable = $("#" + objectId + '_' + currentPageRef);
		var gridParams = $destinationTable.jqGrid('getGridParam');
		var colModelArray = gridParams.colModel;
		var colNamesArray = gridParams.colNames;

		var jsonColDetails = [];
		for (var i = 0; i < colModelArray.length; i++) 
		{
			jsonColDetails.push({
				'propertyName' : colModelArray[i].name,
				'description' : colNamesArray[i]
			});
		}
		return JSON.stringify(jsonColDetails);
	}
}

function screenGenerator_onValueChange(propertyId)
{
	var currValue = $("#"+propertyId).val();
	var elementId = (propertyId.indexOf("lookuptxt") != -1)?propertyId.split("_")[1]:propertyId.split("_")[0];
	var actualElementId = elementId;
	if($("#new_"+elementId).length > 0)
	{
		actualElementId = "new_"+elementId;
	}
	var elementType = $("#"+actualElementId+"_div").attr("type");
	if(elementType == "2")
	{
		$("#"+actualElementId).html(currValue);
	}
	else if(elementType == "10")
	{
		$("#"+actualElementId+"_spanLabel").text(currValue);
	}
	else
	{
		$("#"+actualElementId).children("span.ui-button-text").html(currValue);
		$("#"+actualElementId).attr("value",currValue);
	}
}

function screenGeneratorProp_reloadDynScreenMapGrid(data)
{
	_showProgressBar(true);
	var screenId = $('#screenId').val();
	var elementId = $('#elementId').val();
	
	if(data == undefined || data == null)
	{
		return;	
	}
	if(elementId == undefined || elementId == null)
	{
		return;	
	}
	
	
	var btnSourceType = $('#selButtonSrcType').val();
	var dynScreenMapParam = {};
	dynScreenMapParam.divId = 'btnSourceScreenParamMapDiv';
	dynScreenMapParam.currentPageRef = _pageRef;
	dynScreenMapParam.elementIdentifier = elementId;
	dynScreenMapParam.appName = '';
	dynScreenMapParam.progRef = '';
	dynScreenMapParam.compCode = 0;
	
	//open dynamic screen
	if(btnSourceType == '1')
	{
		var operationId = data.sysDynScreenDefVO.DYN_SCREEN_ID;
		dynScreenMapParam.mapElementType = '4';
		dynScreenMapParam.defaultScreenId = operationId;
		dynScreenMapParam.elementOpId = operationId;
		dynScreenMapParam.screenWidth = data.sysDynScreenDefVO.SCREEN_WIDTH; 
		dynScreenMapParam.screenHeight = data.sysDynScreenDefVO.SCREEN_HEIGHT;
		dynScreenMapParam.showScreenWidthAndHeight = true;
		screenGenerator_loadDynamicScreenParamMap(dynScreenMapParam);
	}
	//open global activity
	else if(btnSourceType == '3')
	{
		var operationId = data.buttonCustomizationCO.customActionParamCO.operationId;
		dynScreenMapParam.mapElementType = '5';
		dynScreenMapParam.defaultScreenId = null;
		dynScreenMapParam.globalActivityId = operationId;
		
		dynScreenMapParam.sequenceId  = data["sysParamElemActivitiesVO.SEQUENCE_ID"];
		dynScreenMapParam.loadedInObjDisplay = false;
		screenGenerator_loadButtonCustomizationParamMap(dynScreenMapParam);
	}
	_showProgressBar(false);

}

function screenGeneratorProp_buttonSrcTypeAfterDep()
{
	var btnSourceType = $('#selButtonSrcType').val();
	var btnSourceScreenId = $('#lookuptxt_btnSourceScreenId').val();
	var btnSourceActivityId = $('#lookuptxt_btnSourceActivityId').val();
		
	if( (btnSourceType == '1' && btnSourceScreenId == '') 
			|| (btnSourceType == '3' && btnSourceActivityId == '')) 
			
	{
		$('#btnSourceScreenParamMapDiv').html('');
	}
}
function screenGenerator_defineScrTablesScreen()
{
	var	loadScriptDiv = $("<div id='dyn_defineScrTables_div' class='path-common-sceen'></div>");
	loadScriptDiv.css("padding","0");
	loadScriptDiv.insertAfter($('body'));
	
	var screenId       = $("#dynScreenId").val();
    
	var curParams = {"criteria.screenId":screenId};
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadDefineScrTablesScreen?";
	
	var buttonsArr = {};
	buttonsArr[saveLabel] = function() {
		screenGenerator_generateScrTablesData($(this));
		
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof defineScrTables_title_key === "undefined")?"Tables Generator" :defineScrTables_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(1250),
			                  height:returnMaxHeight(685),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_defineScrTables_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_defineScrTables_div").dialog(_dialogOptions);
	$("#dyn_defineScrTables_div").dialog("open");

}
function defineScrTables_addNewColumn()
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	var tableName  = $("#dynScrTblCreator_tableName").val();
	if(tableName!=null && tableName!="")
	{
		var rowData = {"TABLE_TECH_NAME":tableName,"COL_TYPE":1,"COL_TYPE_DESC":"String"};
		var rowId   = $dynScrTableColsGrid.jqGrid("addInlineRow",rowData);
	}
}

function defineScrTables_delRowData(rowId)
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	$dynScrTableColsGrid.jqGrid('deleteGridRow', rowId);
}

function defineScrTables_selectColumn()
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	var selRow = $dynScrTableColsGrid.jqGrid("getGridParam",'selrow');
	var selColTypeCode = $dynScrTableColsGrid.jqGrid('getCell', selRow, 'COL_TYPE');

	if(selColTypeCode == 1)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
    }
    else if(selColTypeCode == 3)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
    }
    else if(selColTypeCode == 6)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "true");
    }
    else
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
    }
}
function screenGenerator_generateScrTablesData()
{
	if (!$("#dynScrTablesFrmId").hasChanges(true))
		return;
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId");
	var tableData = JSON.parse($dynScrTableColsGrid.jqGrid("getAllRows")).root;
	var isPK = false;
	var missingCL = false;
	var missingDV = false;

	$.each( tableData, function(i, item) 
	{
	    if(item.PRIMARY_KEY == 1)
	    {
	    	isPK = true;
	    }
	    
	    if(item.COL_TYPE == 1)
	    {
	    	if(item.COL_LENGTH == "")
	    	{
	    		missingCL = true;
	    	}
	    }
	    
	    if(item.COL_TYPE == 3)
	    {
	     	if(item.DECIMAL_VALUE == "")
	    	{
	     		missingDV = true;
	    	}
	     	if(item.COL_LENGTH == "")
	    	{
	     		missingCL = true;
	    	}
	    }
	});
	
	if (isPK==false || missingCL == true || missingDV == true)
	{
		if(isPK == false)
		{
			_showErrorMsg("Please choose at least one column as primary key",error_msg_title);
		}
		if(missingCL == true)
		{
			_showErrorMsg("Missing Column Length on related column(s)",error_msg_title);
		}
		if(missingDV == true)
		{
			_showErrorMsg("Missing Decimal Value on related column(s)",error_msg_title);
		}
		return;
	}
	
	if (!$dynScrTableColsGrid.jqGrid("checkRequiredCells"))
		return;
	var updates = $dynScrTableColsGrid.jqGrid("getChangedRowData");
	$("#dynScrTableGridUpdates").val(updates);
	var postParams = $("#dynScrTablesFrmId").serialize();
	var updateVal = $("#dynScrTableGridUpdates").val();
	if(updateVal!=null && updateVal!="" && updateVal!=undefined)
	{		
		 _showProgressBar(true);
		$.post(jQuery.contextPath
				+ "/path/screenGenerator/ScreenGeneratorMaintAction_generateDynScrTable",
				postParams, function(param) {
					//if the return type of the action is Json ( we have an error );
				if (typeof param["_error"] == null || param["_error"] == undefined) {
					var screenId       = $("#dynScreenId").val();
					var curParams = {"criteria.screenId":screenId};
					var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadDefineScrTablesScreen?";
					$("#dyn_defineScrTables_div").load(
							srcURL,
							curParams,
							function()
							{
								_showProgressBar(false);
								_showErrorMsg(record_was_Updated_Successfully_key,
										info_msg_title);
							});
				}
				else
				{
					_showErrorMsg( param["_error"],error_msg_title);
					_showProgressBar(false);
					return;
				}				
			})		
	}
	else
	{
	  _showErrorMsg(changes_not_available_key,info_msg_title);
	  _showProgressBar(false);
	  return;	
	}
	
}
function dynScrTablesList_colTypeChanged()
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	var selRow = $dynScrTableColsGrid.jqGrid("getGridParam",'selrow');
	// if not new row then take langCode from Code Hidden column
	var selColTypeCode = $dynScrTableColsGrid.jqGrid('getCell', selRow, 'COL_TYPE_DESC');
    $dynScrTableColsGrid.jqGrid('setCellValue', selRow,"COL_TYPE",selColTypeCode);

    console.log("selColTypeCode: "+ selColTypeCode);
    console.log("selRow: "+ selRow);
    if(selColTypeCode == 1)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'DECIMAL_VALUE', "");
    }
    else if(selColTypeCode == 3)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'DECIMAL_VALUE', "");
    }
    else if(selColTypeCode == 6)
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "true");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'DECIMAL_VALUE', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'PRIMARY_KEY', "0");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'VISIBLE_YN', "0");
    }
    else
    {
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'COL_LENGTH', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'DECIMAL_VALUE', "true");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'PRIMARY_KEY', "false");
    	$dynScrTableColsGrid.jqGrid('setCellReadOnly',selRow, 'VISIBLE_YN', "false");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'DECIMAL_VALUE', "");
    }
}

function dynScrTablesList_colLengthChanged()
{
	var $dynScrTableColsGrid = $("#dynScrTableColsGridId"); 
	var selRow = $dynScrTableColsGrid.jqGrid("getGridParam",'selrow');
	var selColTypeCode = $dynScrTableColsGrid.jqGrid('getCell', selRow, 'COL_TYPE_DESC');
	if(selColTypeCode == 1)
    {
    	var cellVal = $dynScrTableColsGrid.jqGrid('getCell',selRow, 'COL_LENGTH');
    	if(cellVal.length > 4)
		{
			$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		}
    	
    }
    else if(selColTypeCode == 3)
    {
    	var cellVal = $dynScrTableColsGrid.jqGrid('getCell',selRow, 'COL_LENGTH');
      	if(cellVal.length > 2)
		{
			$dynScrTableColsGrid.jqGrid('setCellValue', selRow, 'COL_LENGTH', "");
		}
    }
}
function dynScrTblGeneList_onDbClickedEvent(createFrom)
{
	var $table = $("#dynScrTblGeneListGridTbl_Id");
	var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
	if(typeof selectedRowId == "undefined" || selectedRowId == null || selectedRowId == "")
	{
		return;
	}
	var myObject = $table.jqGrid('getRowData', selectedRowId);
	/**
	 * get the selected rowId
	 */
	var tableId = myObject["TABLE_ID"];
	if (checkIfGeneTblFormChanged()) {
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(theVal) {
			if (theVal) {
				dynScrTblGeneList_loadDataInTheForm(tableId);
			}
		});
	} 
	else {
		dynScrTblGeneList_loadDataInTheForm(tableId);
	}

}
function checkIfGeneTblFormChanged()
{
	var formChanged = false;
	$("#dynScrTablesFrmId").each(function(i) {
		formChanged = $(this).hasChanges();
		if (formChanged) {
			return true;
		}
	});
	return formChanged;
}
//Function to Load the selected screen in the screen generator form
function dynScrTblGeneList_loadDataInTheForm(tableId)
{
//	dynScrTblGeneList_initializeDataOnSuccess();
	
	var params = {"criteria.tableId":tableId};
	var actionSrc  = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadGeneratedTblData?";
	$.post(actionSrc
		   ,params
	       ,function(param)
 	        {
	         $("#dynScrTblGeneMainInfoDiv_id").html(param);
	         if(tableId!=null || tableId != undefined || tableId  != "")
        	 {
	        	 $("#dynScrTblCreator_del_div").css("display","block");
        	 }
	        }
	       ,"html");
}
function dynScrTablesList_colNameChanged()
{
	var selectedRowId = $("#dynScrTableColsGridId").jqGrid('getGridParam', 'selrow');
//	$("#dynScrTableColsGridId").jqGrid('setCellReadOnly', selectedRowId, 'COL_DESC',true);  //applicable
//	$("#dynScrTableColsGridId").jqGrid("editCell", selectedRowId, "TABLE_TECH_NAME",true); //not applicabel
//	$("#dynScrTableColsGridId").jqGrid('setLabel', "COL_DESC", 'NewLabel');
//	$("#dynScrTableColsGridId").jqGrid("setCellValue",2, "TABLE_TECH_NAME","MARWAN");
//	$("#dynScrTableColsGridId").jqGrid('setCellReadOnly', 2, 'TABLE_TECH_NAME',false); //not applicable which is good we dont it to be applicable in case the column is not editable.
//	$("#dynScrTableColsGridId").jqGrid('hideCol',["COL_DESC","PRIMARY_KEY"]); //applicable
//	$("#dynScrTableColsGridId").jqGrid('showCol',["COL_DESC","PRIMARY_KEY"]); // applicable
//	$("#dynScrTableColsGridId").jqGrid('setCell',2,"COL_DESC","","not-editable-cell"); //we cannot make a cell not editable at the same selected row because the related inputs will be constructed on select
//  alert(22222);
//  $("#dynScrTableColsGridId").jqGrid('setCell',2,"COL_DESC","","");
}
function dynScrTablesList_onTechNameKeyPress()
{
var a = $('#'+$('#dynScrTableColsGridId').jqGrid('getGridParam', 'selrow')+'_COL_TECH_NAME');
	a.val(a.val().replace(/[^a-z0-9_]/gi,'').toUpperCase()); 
}
function screenGeneratorList_onDelDynTableClicked()
{
	_screenId = $("#dynScreenId").val();
	_tableId = $("#dynScrTblCreator_tableId").val();
	_tableName = $("#dynScrTblCreator_tableName").val();
		_showConfirmMsg(Confirm_Delete_Process_key, Warning_key, screenGeneratorList_DelDynTableAfterConfirm, {
		screenId : _screenId,
		tableId : _tableId,
		tableName : _tableName
	});
}

function screenGeneratorList_DelDynTableAfterConfirm(confirm,args)
{
	var theParam ={};
	theParam["dynScreenCreatorCO.sysDynScreenDefVO.DYN_SCREEN_ID"] = args.screenId;
	theParam["dynScreenCreatorCO.scrTableId"] = args.tableId;
	theParam["dynScreenCreatorCO.scrTableTechName"] = args.tableName;
	_showProgressBar(true);

	if(confirm)
	{
		$.ajax({
			 url: jQuery.contextPath+"/path/screenGenerator/generatorMaint_deleteDynScrTable",
	         type:"post",
			 dataType:"json",
			 data: theParam,
			 success: function(data){
			     if(typeof data["_error"] == "undefined" || data["_error"] == null)
			     {
		    		var screenId = $("#dynScreenId").val();	    	    
		    		var curParams = {"criteria.screenId":screenId};
		    		var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadDefineScrTablesScreen?";
					$("#dyn_defineScrTables_div").load(srcURL, curParams, function()
					{
						_showProgressBar(false);
					});
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

function defineScrTables_addNewDynTable()
{
	tableId = null;

	if (checkIfGeneTblFormChanged()) {
		_showConfirmMsg(changes_made_confirm_msg, confirm_msg_title, function(theVal) {
			if (theVal) {
				dynScrTblGeneList_loadDataInTheForm(tableId);
			}
		});
	} 
	else {
		dynScrTblGeneList_loadDataInTheForm(tableId);
	}
}

function screenGenerator_onEditableCheckBoxClick(editableElement,tableNameElement,queryElement)
{
	var elemId = editableElement.split("_")[0];
	if($("#"+editableElement).is(":checked"))
	{
		liveSearch_makeReadOnly(false,tableNameElement);
		$("#"+queryElement).addClass("ui-state-disabled");
		$("#"+queryElement).attr('disabled', true);
		$("#"+elemId+"_queryData").val("");
		$("#"+elemId+"_dblClick").attr('disabled', true);
		$("#"+elemId+"_dblClick").addClass("ui-state-disabled");
		$("#"+elemId+"_sourceData").val("");
		$("#"+elemId+"_colProps").attr('disabled', false);
		$("#"+elemId+"_colProps").removeClass("ui-state-disabled");
	}
	else
	{
		liveSearch_makeReadOnly(true,tableNameElement);
		$("#lookuptxt_"+tableNameElement).val(""); 
		$("#"+queryElement).removeClass("ui-state-disabled");
		$("#"+queryElement).attr('disabled', false);
		$("#"+elemId+"_queryData").val("");
		$("#"+elemId+"_dblClick").attr('disabled', false);
		$("#"+elemId+"_dblClick").removeClass("ui-state-disabled");
		$("#"+elemId+"_sourceData").val("");
		$("#"+elemId+"_colProps").attr('disabled', true);
		$("#"+elemId+"_colProps").addClass("ui-state-disabled");
		$("#"+elemId+"_colProperties").val("");
	}
}

function screenGeneratorProp_openColProperties(elementId,elementType)
{
	var	optionsScreenDiv = $("<div id='dyn_btn_col_prop_screen_div' class='path-common-sceen'></div>");
	optionsScreenDiv.css("padding","0");
	optionsScreenDiv.insertAfter($('body'));
	
	var screenId  = $("#dynScreenId").val();
	var colProps = $("#"+elementId+"_colProperties").val();
	var tablename = $("#lookuptxt_"+elementId+"_tableName").val();

	var curParams = {"criteria.tableName":tablename,"criteria.screenId":screenId,"criteria.elementId":elementId,"criteria.colProperties":colProps,"criteria.elementType":elementType};
	    
	_showProgressBar(true);
	var srcURL = jQuery.contextPath+"/path/screenGenerator/ScreenGeneratorMaintAction_loadColPropertiesScreen?";
	
	var buttonsArr = {};
	buttonsArr[ok_label_trans] = function() {
		screenGeneratorProp_saveColPropDetails($(this));
		
	};

	var _dialogOptions = {modal:true, 
			                  title: (typeof btn_source_screen_title_key === "undefined")?"Columns Properties" :col_properties_screen_title_key ,
			                  autoOpen:false,
			                  show:'slide',
			                  position:'center', 
			                  width:returnMaxWidth(900),
			                  height:returnMaxHeight(450),
			                  buttons : buttonsArr,
			                  close: function (){
								     var theDialog = $(this);
								     theDialog.dialog("destroy");
								     theDialog.remove();
								    }
		    		         };
	$("#dyn_btn_col_prop_screen_div").load(srcURL, curParams, function() {_showProgressBar(false);});
	$("#dyn_btn_col_prop_screen_div").dialog(_dialogOptions);
	$("#dyn_btn_col_prop_screen_div").dialog("open");

}
function screenGeneratorProp_saveColPropDetails(theDialog)
{
    var elementId    = $("#elementId").val();
    var result = $("#dynScrGridWidgetColPropsId").jqGrid('getAllRows');
	$("#"+elementId+"_colProperties").val(result);
	theDialog.dialog("close");
}

function screenGeneratorProp_openLiveSearchQueryFormatter(cellvalue, options, rowObject)
{
	if(rowObject["COL_IS_LIVESEARCH"] == undefined || rowObject["COL_IS_LIVESEARCH"] < 1)
	{
		return  '<button disabled type="button" onclick="screenGeneratorProp_openQueryScreen(\''+$("#elementId").val()+'\','+options.rowId+')"'+
		'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-state-disabled" id ="'+$("#elementId").val()+"_"+options.rowId+'_queryBtn"'+
		'role="button" aria-disabled="false"><span class="ui-button-text"><label class="path_btn_lbl_theme">'+queryColKey+'</label>'+
		'</span></button>';
	}
	else
	{
		return  '<button type="button" onclick="screenGeneratorProp_openQueryScreen(\''+$("#elementId").val()+'\','+options.rowId+')"'+
		'class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" id ="'+$("#elementId").val()+"_"+options.rowId+'_queryBtn"'+
		'role="button" aria-disabled="false"><span class="ui-button-text"><label class="path_btn_lbl_theme">'+queryColKey+'</label>'+
		'</span></button>';
	}
	

}

function screenGeneratorProp_onChangeIsLiveSearch(e)
{
	var rowId = $("#dynScrGridWidgetColPropsId").jqGrid('getGridParam','selrow');
	var elemId = $("#elementId").val();
	if ($("#" + rowId + "_COL_IS_LIVESEARCH").is(':checked') == false)
	{
		$("#" + elemId + "_" + rowId + "_queryBtn").attr('disabled', true);
		$("#" + elemId + "_" + rowId + "_queryBtn").addClass("ui-state-disabled");
		liveSearch_makeReadOnly(true,rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId");
		$("#"+rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId").val("");
		$("#dynScrGridWidgetColPropsId").jqGrid('setCellReadOnly',rowId, "LOOKUP_DESC",true);
	}
	else
	{
		$("#"+elemId+"_"+rowId+"_queryBtn").attr('disabled', false);
		$("#"+elemId+"_"+rowId+"_queryBtn").removeClass("ui-state-disabled");	
		$("#dynScrGridWidgetColPropsId").jqGrid('setCellReadOnly',rowId, "LOOKUP_DESC",false);
		liveSearch_makeReadOnly(false,rowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId");
	}

}

function screenGeneratorProp_serializeGridWidgetColPropsData(data)
{
	var elemId = $("#elementId").val();
	data["criteria.colProperties"] = $("#"+elemId+"_colProperties").val();
 	return data;
}

function screenGeneratorProp_ondynScrGridWidgetColPropsEditInline()
{
	var gridId = $("#dynScrGridWidgetColPropsId");
	var selectedRowId = gridId.jqGrid('getGridParam', 'selrow');
	var myObject = gridId.jqGrid('getRowData', selectedRowId);
	$("#"+selectedRowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId").attr('readonly', true);

	var isLiveSearch = myObject["COL_IS_LIVESEARCH"];
	if (isLiveSearch == undefined || isLiveSearch < 1)
	{
		liveSearch_makeReadOnly(true,selectedRowId+"_LOOKUP_DESC_lookuptxt_dynScrGridWidgetColPropsId");
	}
}

function returnLookupScreenParamMap(lookupid)
{
	var screenParamMap = {};
    var options_livesearch = eval('options_' + lookupid + '_liveSearch');
	if(options_livesearch != undefined && options_livesearch != null && 
			options_livesearch.paramList != undefined && options_livesearch.paramList != null && options_livesearch.paramList != '' )
	{
		var screenParamArr = options_livesearch.paramList.split(',');
		if( screenParamArr != undefined && screenParamArr != null && screenParamArr.length > 0 )
		{
			for(var i=0; i<screenParamArr.length; i++)
			{
				var inputArr = screenParamArr[i].split(':');
				var inputAttrName = inputArr[0];
				var inputHtmlId = inputArr[1];
				if(inputAttrName.indexOf("criteria.elemHm.screen_") === 0 )
				{	
					var inputElem = $('#'+ inputHtmlId );
					if(inputElem == undefined || inputElem == null || inputElem.length <= 0)
					{
						inputElem = $('#'+ inputHtmlId + "_" + _pageRef );
					}
					
					if(inputElem != undefined && inputElem != null && inputElem.length > 0)
					{
						var inputMode = 'text';
						var inputModeAttr = inputElem.attr('mode');
						if(inputModeAttr != undefined && inputModeAttr != null && inputModeAttr != '')
						{
							inputMode = inputModeAttr;
						}
						
						if(inputHtmlId.indexOf(_pageRef) > 0)
						{
							inputHtmlId = inputHtmlId.substring(0, inputHtmlId.length - ('_'+_pageRef).length);
						}
						screenParamMap[inputHtmlId] = {'inputMode':inputMode};
					}
				}
			}
		}
			
	}
	
	return JSON.stringify(screenParamMap);

}