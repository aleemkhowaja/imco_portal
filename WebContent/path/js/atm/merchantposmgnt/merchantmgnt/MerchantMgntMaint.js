/**
 * This funnction will be called upon clicking on status button 
 * @param {Object} param
 */
function merchantMgnt_onStatusClicked()
{	
	var merchantCode =$("#code_"+_pageRef).val();
	if(merchantCode == "")
		return;
    var loadSrc  = jQuery.contextPath +"/path/merchantposmgnt/MerchantMgntStatus_search.action?code="+merchantCode+"&_pageRef="+_pageRef;
	showStatus("merchantMgntDefFormId_"+_pageRef,_pageRef, loadSrc,	{} );
}
/**
 * Set Data From reference in ACCOUNT
 */
function merchantMgnt_setAccountData()
{
	var selectedRowId = $("#gridtab_acc_sl_"+_pageRef).jqGrid('getGridParam','selrow');
	var myObject = $("#gridtab_acc_sl_"+_pageRef).jqGrid('getRowData',selectedRowId);
	$("#acc_br_"+_pageRef).val(myObject["amfVO.BRANCH_CODE"]);  
	$("#acc_cy_"+_pageRef).val(myObject["amfVO.CURRENCY_CODE"]); 	
	$("#acc_gl_"+_pageRef).val(myObject["amfVO.GL_CODE"]); 	
	$("#acc_cif_"+_pageRef).val(myObject["amfVO.CIF_SUB_NO"]); 	
	$("#lookuptxt_acc_sl_"+_pageRef).val(myObject["amfVO.SL_NO"]); 
	$("#lookuptxt_acc_addRef_"+_pageRef).val(myObject["amfVO.ADDITIONAL_REFERENCE"]);	
}
/**
 * Set Data From reference in ACCOUNT
 */
function merchantMgnt_setAccountDataRef()
{
	var selectedRowId = $("#gridtab_acc_addRef_"+_pageRef).jqGrid('getGridParam','selrow');
	var myObject = $("#gridtab_acc_addRef_"+_pageRef).jqGrid('getRowData',selectedRowId);
	$("#acc_br_"+_pageRef).val(myObject["amfVO.BRANCH_CODE"]); 	
	$("#acc_cy_"+_pageRef).val(myObject["amfVO.CURRENCY_CODE"]); 	
	$("#acc_gl_"+_pageRef).val(myObject["amfVO.GL_CODE"]); 	
	$("#acc_cif_"+_pageRef).val(myObject["amfVO.CIF_SUB_NO"]);
	$("#lookuptxt_acc_sl_"+_pageRef).val(myObject["amfVO.SL_NO"]); 
	$("#lookuptxt_acc_addRef_"+_pageRef).val(myObject["amfVO.ADDITIONAL_REFERENCE"]);	
}

/**
 * This funnction will open FOM Screen
 * @param {Object} param
 * By Shahnawaz
 */
function merchantMgnt_openDetailsFOMWindow(params)
{
	var openFavScreenDiv = $("<div id='openFavScreenDiv_id' style='width:"+ returnMaxWidth(1023)+";height:"+returnMaxHeight(501)+";border:0px;overflow:hidden;'/>");
	var openFavScreenIFramDiv = $(openFavScreenDiv);
	$('body').append(openFavScreenIFramDiv);
	var linkLoadSrc = 'path/fom/FrontOfficeMgntMaint_showFOMCifDetails.action';
		
	var iFrameUrl = jQuery.contextPath+'/path-default/loadIframeScreenAction';
	var iFrameParam = {};
	iFrameParam["destinationProgRef"] = 'F00I1MT';
	iFrameParam["appName"]            = 'RET';
	iFrameParam["destinationUrl"]     = linkLoadSrc;
	iFrameParam["additionalParams"]   = JSON.stringify(params);
	
	var compCode = $.formatNumberNumeric(params["compCode"], {format : "#0",leadZeros : 4});
	var branchCode = $.formatNumberNumeric(params["branchId"], {format : "#0",leadZeros : 4});
	cifCode = $.formatNumberNumeric(params["cifNo"], {format : "#0",leadZeros : 8});
	var title =company_key+": "+compCode+" "+branch_key+": "+branchCode+" "+cif_key+": "+cifCode ;
	
	var iFramDialogOpt = {
		modal : true,
		title : title,
		autoOpen : false,
		position : 'center',
		height : returnMaxHeight(501),
		width : returnMaxWidth(1023),
		close : function() {
			$("#openFavScreenDiv_id").dialog("destroy");
			$("#openFavScreenDiv_id").remove();
		},
		open : function() {
		}
	};
	
	openFavScreenIFramDiv.dialog(iFramDialogOpt);
	openFavScreenIFramDiv.load(iFrameUrl,iFrameParam,
	function() 
	{
		$("#openFavScreenDiv_id").dialog("open");
		_showProgressBar(false);
	});
}

/** upon clicking on button "CIF Details" Opening Screen from CSM Project
By Shahnawaz
*/
//upon clicking on button "CIF Details"
function merchantMgnt_onCIFDetailsClicked()
{
	var cifCode = $("#acc_cif_"+_pageRef).val();	
	if(cifCode != null && cifCode != "")
	{
		_showProgressBar(true);
		var ivCrud = $("#iv_crud_"+_pageRef).val();
		parseNumbers();
		var actionSrc = jQuery.contextPath+"/path/merchantposmgnt/MerchantMgntMaint_onCIFDetailsClicked?iv_crud="+ivCrud+"&cifCode="+cifCode;
		var theForm = $("#merchantMgntDefFormId_"+_pageRef).serialize();
		$.ajax({
			 url: actionSrc,
	         type:"post",
			 dataType:"json",
			 data: theForm,
			 success: function(data)
			 {
			 	if (data["_error"] == null)
			 	{
			 		var params = {"_pageRef":_pageRef,
			 			"iv_crud":'D',
			 			"cifNo":cifCode,
			 			"cifType":data.merchantMgntCO.cifVO.CIF_TYPE,
			 			"branchId": data.merchantMgntCO.cifVO.BRANCH_CODE,
						"compCode" : data.merchantMgntCO.loginCompCode
					};
			 		merchantMgnt_openDetailsFOMWindow(params);
				}
			 	_showProgressBar(false);
			 }
		});	
	}
}

//used for save/delete/approve
function merchantMgnt_setMethodName(methodName)
{
	$("#methodName_"+_pageRef).val(methodName);
}

//used for save/delete/approve
function merchantMgnt_BtnFunc()
{
	if($("#methodName_"+_pageRef).val() != "delete")
	{
		applyMerchantMgntFunct($("#methodName_"+_pageRef).val());
	}
	else
	{
		deleteMerchantMgntFunct();
	}
}

//used for delete
function deleteMerchantMgntFunct()
{
	 var status= $("#statusId_"+_pageRef).val();
	_showConfirmMsg(Confirm_Delete_Process_key, Warning_key,function(yesNo)
	{
		if (yesNo) 
		{
			 applyMerchantMgntFunct("delete");
		}
	});
}

//used for save/approve
function applyMerchantMgntFunct(methodName, messageConfirmed)
{
	var iv_crud = $("#iv_crud_" + _pageRef).val();
	var changes = "";
    if (methodName == 'saveNew')
	{
		 changes = $("#merchantMgntDefFormId_" + _pageRef).hasChanges(true);
	}
	if((changes == 'true' || changes == true)  || ( methodName != 'saveNew') )
 	{
		var actionSrc = jQuery.contextPath+ "/path/merchantposmgnt/MerchantMgntMaint_"+methodName+"?iv_crud="+
			iv_crud+"&merchantMgntCO.messageConfirmed="+messageConfirmed;
   
	    parseNumbers();
	    var theForm = $("#merchantMgntDefFormId_"+_pageRef).serializeForm();  //take all the data to the java
	    _showProgressBar(true);
	    $.ajax( {
			url : actionSrc,
			type : "post",
			dataType : "json",
			data : theForm,
			success : function(data) 
	          {
				_showProgressBar(false);
				if(data["_error"] == null)
				{
					if(typeof data["_confirm"] != "undefined" && data["_confirm"] != null)
					{	
						_showConfirmMsg(data["_confirm"], "",
						"merchantmgnt_continueProcessAfterConfirm", {"methodName":methodName});
						_showProgressBar(false);
						return;
					}
					//Code to show alert for the action performed
					if(methodName == 'saveNew')
					{
						 _showErrorMsg(record_saved_Successfully_key, info_msg_title, 300,100);
						 if(iv_crud == 'UP')
						 {
							showHideSrchGrid('merchantMgntGridTbl_Id_'+_pageRef);
							$("#merchantDetailsDiv_id_" + _pageRef).html("");
						 }
						 else
						 {
							 merchantmgnt_initializeAfterConfirm(true); 
						 }
					}
					else if(methodName == 'delete')
					{
						 _showErrorMsg(record_was_Deleted_Successfully_key, info_msg_title, 300,100);
						 merchantmgnt_initializeAfterConfirm(true);
					}
					else if(methodName == 'approve')
					{
						_showErrorMsg(record_was_Approved_Successfully_key, info_msg_title, 300,100);
						showHideSrchGrid('merchantMgntGridTbl_Id_'+_pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}
					else if(methodName == 'toCancel')
					{
						showHideSrchGrid('merchantMgntGridTbl_Id_'+_pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}
					else if(methodName == 'cancel')
					{
						_showErrorMsg(record_was_canceled_successfully_key, info_msg_title, 300,100);
						showHideSrchGrid('merchantMgntGridTbl_Id_'+_pageRef);
						$("#merchantDetailsDiv_id_" + _pageRef).html("");
					}
					
					$("#merchantMgntGridTbl_Id_" + _pageRef).trigger("reloadGrid");
				}
             }         
		});
 	}
}

function merchantmgnt_continueProcessAfterConfirm(yesNo, args)
{
//<fatima>	
	if (yesNo) 
	{
		var methodName = args.methodName;
		applyMerchantMgntFunct(methodName, true)
		
		return false;
	}
	else
	{	
		_showProgressBar(false);
	}
}

function merchantmgnt_initializeAfterConfirm(yesNo)
{
	if(yesNo == true)
	{ 
		var iv_crud = $("#iv_crud_" + _pageRef).val();
		var actionSrc = jQuery.contextPath
				+ "/path/merchantposmgnt/MerchantMgntMaint_loadMerchantMgntDetails?_pageRef="+_pageRef+"&iv_crud="+iv_crud;
		$.ajax( {
			url : actionSrc,
			type : "post",
			success : function(data) {
				$("#merchantDetailsDiv_id_" + _pageRef).html(data);
			}
		});
	}
}
