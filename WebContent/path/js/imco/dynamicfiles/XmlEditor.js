
function xmlEditor_openDialog(htmlID ,param) 
{
	Xonomy.clickoff();
	$('#selectedMessage_'+_pageRef).val($("#"+htmlID).text());
	jQuery("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
    var dialogParameters = {};
    dialogUrl= jQuery.contextPath+ "/path/fileStructure/DynamicFileEditorsAction_openDynamicTextDefinitionDialog.action?_pageRef="+_pageRef;
    dialogOptions ={ 
    	autoOpen: false,
		height:587,
		title:"Message" ,
		width:705,
		modal: true,
		close : function() {
			$(this).dialog("destroy");
			$('#xmlFileDialog_'+_pageRef).remove();
			$("<div id=xmlFileDialog_"+_pageRef+"></div>").insertAfter("#constraintsMainDialog_"+_pageRef);
		},
		buttons: [{ text : "OK", click : 
		    function(){
				copyDataFromDialog();
				$(this).dialog('close');
				fillMainEditor();
		    } 
		},
		{ text : "Cancel", click :
			function(){
				$(this).dialog('close');
			}
		}
	]}
	$.post(dialogUrl,dialogParameters, function( param )
	{
	    $('#xmlFileDialog_'+_pageRef).html(param) ;
	    $('#xmlFileDialog_'+_pageRef).dialog(dialogOptions)
	    $('#xmlFileDialog_'+_pageRef).dialog('open');
	    //format xml 
	    var str = $("#selectedMessage_"+_pageRef).val();
	    str = str.replaceAll('/>...', ">");
	    str = str.replaceAll('/>', ">");
	    str = str.replaceAll('···</', "<");
	    str = str.replaceAll('><', "></");
	    $("#selectedMessage_"+_pageRef).val(str);
	    var xml = str;
	    fillDialogEditor(xml);
	},"html");
}

function copyDataFromDialog()
{
	jQuery("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('clearGridData');
	var rowids = $("#xmlDialogGrid_Id_"+_pageRef).jqGrid('getDataIDs');
	var tagData = {};
	var msgData = {};
	var selectedTags = "";
	var rowData = null;
	if(rowids.length > 0)
	{
		for(var i = 0 ; i< rowids.length; i++)
		{
			rowData = $("#xmlDialogGrid_Id_"+_pageRef).jqGrid('getRowData', rowids[i]);

			if(rowData['PARENT_PATH'] == "")
			{
				msgData = {};
				msgData['TAG_NAME'] = rowData['TAG_NAME'];
				msgData['dyn_FILE_MESSAGEVO.DESCRIPTION'] = rowData['DESCRIPTION'];
				msgData['MESSAGE_SAMPLE'] = $("#selectedMessage_"+_pageRef).val();
			}
			else
			{
				tagData = {};
				tagData['TAG_NAME']			= rowData['TAG_NAME'];
				tagData['DESCRIPTION']		= rowData['DESCRIPTION'];
				tagData['PARENT_PATH'] 		= rowData['PARENT_PATH'];
				tagData['IS_MULTIPLE_YN'] 	= rowData['IS_MULTIPLE_YN'];
				tagData['TAG_COLOR'] 		= rowData['TAG_COLOR'];
				tagData['TEXT_EDITOR_JOB']  = ""/*rowData['TEXT_EDITOR_JOB']*/;
				tagData['DATA_TYPE'] 		= rowData['DATA_TYPE'];
				tagData['IS_ATTR_YN'] 		= rowData['IS_ATTR_YN'];
				tagData['ExpressionDetails']= rowData['ExpressionDetails'];
				tagData['dyn_FILE_TAGVO.TAGS_ID']= rowData['TAGS_ID'];
				tagData['STATUS']= rowData['STATUS'];
				
				selectedTags+=""+rowData['TAG_NAME']+",.,"+rowData['PARENT_PATH']+",.,"+rowData['IS_MULTIPLE_YN']+",.,"
				+rowData['TAG_COLOR']+",.,"+""/*rowData['TEXT_EDITOR_JOB']*/+",.,"+rowData['DATA_TYPE']+",.,"
				+rowData['ExpressionDetails']+",.,"+rowData['DESCRIPTION']+",.,"+rowData['TAGS_ID']+",.,"
				+rowData['IS_ATTR_YN']+",.,"+rowData['STATUS']+",.,"+".&.";
				//Add Tag in Tag List
				var rowId = "new_"+(new Date()).getTime();
				jQuery("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('addRowData', rowId, tagData, 'last');
				//if Row is Deleted hide it
				if(rowData['STATUS'] == 'D')
				{
					$("#"+rowId).hide();
				}
			}
		}
		//Add Message in Message Grid
		msgData['TAG_LIST'] = selectedTags;
		var checkDuplication = duplicationTag(msgData['TAG_NAME'], msgData['PARENT_PATH'], "#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef);
		if(checkDuplication == null)
		{
			var rowId = "new_"+(new Date()).getTime();
			jQuery("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('addRowData', rowId, msgData, 'last');
			jQuery("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('setSelection', rowId, true);
		}
		else
		{
			jQuery("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', checkDuplication, "TAG_LIST", selectedTags);
			jQuery("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('setSelection', checkDuplication, true);
		}
	}//end if
}

function saveUpdatedTagsIntoMessage()
{
	var selectedRowId = $("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
	if(selectedRowId != null && selectedRowId != ''){
		var rowids = $("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('getDataIDs');
		var tagData = {};
		var selectedTags = "";
		var rowData = null;
		for(var i = 0 ; i< rowids.length; i++)
		{
			rowData = $("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('getRowData', rowids[i]);

			selectedTags+=""+rowData['TAG_NAME']+",.,"+rowData['PARENT_PATH']+",.,"+rowData['IS_MULTIPLE_YN']
				+",.,"+rowData['TAG_COLOR']+",.,"+/*rowData['TEXT_EDITOR_JOB']*/""+",.,"
				+rowData['DATA_TYPE']+",.,"+rowData['ExpressionDetails']+",.,"
				+rowData['DESCRIPTION']+",.,"+rowData['dyn_FILE_TAGVO.TAGS_ID']+",.,"
				+rowData['IS_ATTR_YN']+",.,"+rowData['STATUS']+",.,"+".&.";
		}
		//Update Data at Message Level
		$("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue', selectedRowId, "TAG_LIST", selectedTags);
	}
}

function xmlEditor_uploadFile(){
	$.struts2_jquery.require("xonomy.js", null, jQuery.contextPath + "/path/js/imco/dynamicfiles/xonomy/");
	$("#xonomyXml_"+_pageRef).val("");
	var fileName = document.getElementById("upload_" + _pageRef).value;
	//_showProgressBar(true);
	var files = document.getElementById("upload_" + _pageRef).files;
    var file = files[0];
    var start = 0;
    var stop = file.size - 1;    
    var ivCrud = returnHtmlEltValue("iv_crud_" + _pageRef);
    
    var reader = new FileReader();
        
    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        document.getElementById('xonomyXml_'+_pageRef).value = evt.target.result;
        
        fillMainEditor(); //Fill data in xml
      }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsText(blob); 
}

function fillMainEditor()
{
	var xml = $("#xonomyXml_"+_pageRef).val();
	var docSpec = ({
		unknownElement:{hasText: false, menu:[
			{caption:"Add Child @Tag ",action:Xonomy.newElementChild,actionParameter: ""},
		    {caption: "Delete this @Tag ",action:Xonomy.deleteElement},
		    {caption:"Add @Attribute ",action:Xonomy.newAttribute,actionParameter:""},
		    {caption:"Add @Message ",action:xmlEditor_openDialog,actionParameter:""}
		]},
    	unknownAttribute: {
    		asker: Xonomy.askString,
			menu: [
				{caption: "Delete this @Attribute",action: Xonomy.deleteAttribute}
			]
		}
	});
	var editor = document.getElementById("editor_"+_pageRef);
	Xonomy.render(xml, editor, docSpec);
	Xonomy.setMode("laic");
	//highlighting selected Colors
	var selectedRowId = $("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('getGridParam', 'selrow');
	if(selectedRowId != null && selectedRowId != undefined){
		var selectedRowObject = $("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('getRowData', selectedRowId);
		var msgId = $("[data-name='"+(selectedRowObject['TAG_NAME'])+"']").attr('id');
		var parentList = "";
		if(selectedRowObject != ""){
			var tagRows = selectedRowObject['TAG_LIST'];
			tagRows = tagRows.split('.&.');
			for(var i=0; i<tagRows.length-1; i++){
				var cols = tagRows[i].split(",.,");
				var tagId = $("[data-name='"+cols[0]+"']").attr('id');
				
				var parentList = xmlEditor_getDivPath(cols[0], cols[1]);
				eval(parentList).find('.opening:first').attr("style","background:"+cols[3]+"");
				if(cols[10] =='D'){
					eval(parentList).find('.opening:first').attr("style","background:#eeeeee;");
				}
			}//end loop
		}//end if
	}//end if
}

function duplicationTag(tag, parent, gridId)
{
	var rowids = $(gridId).jqGrid('getDataIDs');
	data = {};
	var rowId = null;
	for(var i = 0 ; i< rowids.length; i++)
	{
		rowData = $(gridId).jqGrid('getRowData', rowids[i]);
		if(rowData['TAG_NAME'] == tag && rowData['PARENT_PATH'] == parent){
			rowId = rowids[i];
		}
	}
	return rowId;
}

function addMessage(confirm, args){
	if (confirm){
		var data = {};
		var element = $("#"+args.htmlID).find('.name').first().text();
		data['TAG_NAME'] = element;
		jQuery("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('addRowData', "new_"+(new Date()).getTime(), data, 'last');
		$("#"+args.htmlID).find('.opening:first').attr("style","background:#d0e5f5");
	}
}

function addToGridDialog(htmlID ,param) 
{
	var isValueTag = $("#"+htmlID).find('.children').children('div').attr('data-name');
	
	//this check is added to select Value tags only but not the parent tags
	if(isValueTag != null && isValueTag !='' && isValueTag != undefined)
	{
		_showErrorMsg("This is not Value Tag, Add Value Tag only", info_msg_title, 300,100);
    	return; 
	}
	else
	{
		var element = $("#"+htmlID).find('.name').first().text();
		var parents = listAllParentTags(htmlID);
		var data = {};
		data['TAG_NAME'] = element;
		data['PARENT_PATH'] = parents;
		data['MULTIPLE'] = 'N';
		data['TAG_COLOR'] = '#d0e5f5';
		data['IS_ATTR_YN'] = '0';
		data['STATUS'] = 'A';
		
		var checkDuplication = duplicationTag(data['TAG_NAME'], data['PARENT_PATH'], "#xmlDialogGrid_Id_"+_pageRef);
		if(checkDuplication != null){
			_showConfirmMsg("Tag already available, do you want to make it List", info_msg_title,
					makeTagAsList, {
						rowId : checkDuplication,
						gridId : "#xmlDialogGrid_Id_"+_pageRef
					}, '', '', 300, 100); 
		}
		else{
			var rowId = "new_"+(new Date()).getTime();
			jQuery("#xmlDialogGrid_Id_"+_pageRef).jqGrid('addRowData', rowId, data, 'last');		
			$("#"+htmlID).find('.opening:first').attr("style","background:#d0e5f5");
			jQuery("#xmlDialogGrid_Id_"+_pageRef).jqGrid('setSelection', rowId, true);
		}
	}
	Xonomy.clickoff();
}

function addAttrToGridDialog(htmlID ,param) 
{
	var isValueTag = $("#"+htmlID).find('.children').children('div').attr('data-name');
	
	//this check is added to select Value tags only but not the parent tags
	if(isValueTag != null && isValueTag !='' && isValueTag != undefined)
	{
		_showErrorMsg("This is not Value Tag, Add Value Tag only", info_msg_title, 300,100);
    	return; 
	}
	else
	{
		var element = $("#"+htmlID).find('.name').first().text();
		var parentId = $('#'+htmlID).parents('div').attr('id');
		var parents;
		var containerTag = $("#"+parentId).find('.name').first().text();
		var parents = listAllParentTags(parentId);
		if(parents != null && parents != undefined && parents != ''){
			parents = containerTag+" > "+parents;
		}
		else{
			parents=containerTag
		}
		var data = {};
		data['TAG_NAME'] = element;
		data['PARENT_PATH'] = parents;
		data['IS_MULTIPLE_YN'] = 'N';
		data['HTML_ID'] = htmlID;
		data['TAG_COLOR'] = '#d0e5f5';
		data['IS_ATTR_YN'] = '1';
		data['STATUS'] = 'A';
		
		var checkDuplication = duplicationTag(data['TAG_NAME'], data['PARENT_PATH'], "#xmlDialogGrid_Id_"+_pageRef);
		if(checkDuplication != null){
			_showConfirmMsg("Tag already available, do you want to make it List", info_msg_title,
					makeTagAsList, {
						rowId : checkDuplication,
						gridId : "#xmlDialogGrid_Id_"+_pageRef
					}, '', '', 300, 100); 
		}
		else{
			var rowId = "new_"+(new Date()).getTime();
			jQuery("#xmlDialogGrid_Id_"+_pageRef).jqGrid('addRowData', rowId, data, 'last');		
			$("#"+htmlID).find('.opening:first').attr("style","background:#d0e5f5");
			jQuery("#xmlDialogGrid_Id_"+_pageRef).jqGrid('setSelection', rowId, true);
		}
	}
	Xonomy.clickoff();
}

function delete_tagMainGrid(){
	var table = $("#dynamicFileStructurXMLTagListGridTbl_Id_" + _pageRef);
	var selectedRowId = table.jqGrid('getGridParam', 'selrow');
	var myObject = table.jqGrid('getRowData', selectedRowId);
	if(myObject['dyn_FILE_TAGVO.TAGS_ID'] !=null && myObject['dyn_FILE_TAGVO.TAGS_ID'] != '')
	{
		table.jqGrid('setCellValue', selectedRowId,"STATUS", 'D');
	}
	//Delete row
	table.jqGrid('deleteGridRow', selectedRowId);	
	saveUpdatedTagsIntoMessage();
	var parentList = xmlEditor_getDivPath(myObject['TAG_NAME'], myObject['PARENT_PATH']);
	$("#editor_"+_pageRef).find(eval(parentList)).find('.opening:first').attr("style","background:#eeeeee;");
}

function dynamicXMLFile_deleteRowDialog()
{
	var table = $("#xmlDialogGrid_Id_" + _pageRef);
	var selectedRowId = table.jqGrid('getGridParam', 'selrow');
	var myObject = table.jqGrid('getRowData', selectedRowId);
	var parentList = xmlEditor_getDivPath(myObject['TAG_NAME'], myObject['PARENT_PATH']);

	$("#xmlDialogEditor_"+_pageRef).find(eval(parentList)).find('.opening:first').attr("style","background:#eeeeee;");
	//hide row
	if(myObject['TAGS_ID'] != null && myObject['myObject'] != '')
	{
		table.jqGrid('setCellValue', selectedRowId,"STATUS", 'D');
		$("#"+selectedRowId).hide();
	}
	else
	{
		table.jqGrid('deleteGridRow', selectedRowId);
	}	
}

function xmlEditor_getDivPath(tagName, parents)
{
	var closeBrace = '';
	var divPath = '';
	var parentList = parents.split(" > ");
	for(var j=parentList.length-1; j>=0; j--){
		if(j==0){
			divPath+='$("[data-name=\''+parentList[j]+'\']").find($("[data-name=\''+tagName+'\']")';
		}
		else{
			divPath+='$("[data-name=\''+parentList[j]+'\']").find('
		}
		closeBrace += ')';
	}
	return divPath+closeBrace;
}

function listAllParentTags(htmlID)
{
	var parents;
	var allParent = $("#"+htmlID).parents('.children').parents('div');
	for(var i=0; i<allParent.length; i++){
		attr = $(allParent[i]).attr('data-name');
		if (typeof attr !== typeof undefined && attr !== false && attr != '') {
		    if(i>0)
		    {
		    	parents = parents+' > '+attr;
		    }
		    else
		    {
		    	parents = attr;
		    }
		}
	}
	return parents;
}

function makeTagAsList(confirm, args){
	if (confirm){
		$(args.gridId).jqGrid('setCellValue', args.rowId, "IS_MULTIPLE_YN", "1");
		$(args.rowId+" input:checkbox").attr('checked', true);
	}
}

function fillDialogEditor(xml){
	var docSpec = ({
		unknownElement:{hasText: false, menu:[
			{caption:"Add to @Grid ",action:addToGridDialog,actionParameter: ""}
		]},
    	unknownAttribute: {
    		asker: Xonomy.askString,
			menu: [
				{caption:"Add as @Attribute ",action:addAttrToGridDialog,actionParameter: ""}
			]
		}
	});
	var editor = document.getElementById("xmlDialogEditor_"+_pageRef);	
	Xonomy.render(xml, editor, docSpec);
	Xonomy.setMode("laic");
}

function duplicationTag(tag, parent, gridId){
	var rowids = $(gridId).jqGrid('getDataIDs');
	data = {};
	var rowId = null;
	for(var i = 0 ; i< rowids.length; i++)
	{
		rowData = $(gridId).jqGrid('getRowData', rowids[i]);
		if(rowData['TAG_NAME'] == tag && rowData['PARENT_PATH'] == parent){
			rowId = rowids[i];
		}
	}
	return rowId;
}

function addMessage(confirm, args){
	if (confirm){
		var data = {};
		var element = $("#"+args.htmlID).find('.name').first().text();
		data['TAG_NAME'] = element;
		jQuery("#dynamicFileStructurXMLMessageListGridTbl_Id_"+_pageRef).jqGrid('addRowData', "new_"+(new Date()).getTime(), data, 'last');
		$("#"+args.htmlID).find('.opening:first').attr("style","background:#d0e5f5");
	}
}

function dialogExpression_openDialog(cellvalue, options, rowObject)
{
	return '<a href="#" onclick="openXMLExpressionDialog(\''+options.rowId+'\')">'+Formula_Key+'</a>';
}

function openXMLExpressionDialog(rowId)
{			
	var params = {};
	params["_pageRef"]		=_pageRef;
	var rowData 	= $("#xmlDialogGrid_Id_"+_pageRef).jqGrid('getRowData', rowId);
	var cellData    = $("#xmlDialogGrid_Id_"+_pageRef).jqGrid("getCell", rowId, 'ExpressionDetails'); 
	var dialogUrl	= jQuery.contextPath+ "/path/fileStructure/DynamicFileEditorsAction_openXMLExpressionDialog"
	var dialogOptions={ autoOpen: false,
			height:450,
			title:expression_details_key,
			width:575 ,
			modal: true,
			close: function( event, ui ) {closeArgConstrDialog},
			buttons: [{ text : ok_label_trans,click : saveArgConstr},
			{ text : cancel_label_trans, click : closeArgConstrDialog}]
	}
	$.post(dialogUrl ,params , function( param )
	{
		$('#constraintsMainDialog_'+_pageRef).html(param) ;
		$('#constraintsMainDialog_'+_pageRef).dialog(dialogOptions)
		$('#constraintsMainDialog_'+_pageRef).dialog('open');
		$("#rowId_"+_pageRef).val(rowId);
		//populate data in form dialog
		if(cellData != null && cellData != "")
		{
			$("#maxLength_"+_pageRef).val(cellData.split(":::")[0]);
			$("#maxVal_"+_pageRef).val(cellData.split(":::")[1]);
			$("#minVal_"+_pageRef).val(cellData.split(":::")[2]);
			$("#formatConstr_"+_pageRef).val(cellData.split(":::")[3]);
			$("#comparisonId_"+_pageRef).val(cellData.split(":::")[4]);
		}
		compShowHideData();
	},"html");  
}

function saveArgConstr()
{
	var params = "";
	params+= $("#maxLength_"+_pageRef).val()+":::";
	params+= $("#maxVal_"+_pageRef).val()+":::";
	params+=$("#minVal_"+_pageRef).val()+":::";
	params+=$("#formatConstr_"+_pageRef).val()+":::";
	params+=$("#comparisonId_"+_pageRef).val()+":::";
	params["rowId"]				= $("#rowId_"+_pageRef).val();
	$("#xmlDialogGrid_Id_"+_pageRef).jqGrid('setCellValue',$("#rowId_"+_pageRef).val(),'ExpressionDetails', params);
	$('#constraintsMainDialog_'+_pageRef).dialog('close');	
}	

function dialogExpression_openMain(cellvalue, options, rowObject)
{
	return '<a href="#" onclick="openMainXMLExpression(\''+options.rowId+'\')">'+Formula_Key+'</a>';
}

function openMainXMLExpression(rowId)
{			
	var params = {};
	params["_pageRef"]		=_pageRef;
	var rowData 	= $("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('getRowData', rowId);
	var cellData    = $("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid("getCell", rowId, 'ExpressionDetails'); 
	var dialogUrl	= jQuery.contextPath+ "/path/fileStructure/DynamicFileEditorsAction_openXMLExpressionDialog"
	var dialogOptions={ autoOpen: false,
			height:450,
			title:expression_details_key,
			width:575 ,
			modal: true,
			close: function( event, ui ) {closeArgConstrDialog},
			buttons: [{ text : ok_label_trans,click : saveMainExpression},
			{ text : cancel_label_trans, click : closeArgConstrDialog}]
	}
	$.post(dialogUrl ,params , function( param )
	{
		$('#constraintsMainDialog_'+_pageRef).html(param) ;
		$('#constraintsMainDialog_'+_pageRef).dialog(dialogOptions)
		$('#constraintsMainDialog_'+_pageRef).dialog('open');
		$("#rowId_"+_pageRef).val(rowId);
		//populate data in form dialog
		if(cellData != null && cellData != "")
		{
			$("#maxLength_"+_pageRef).val(cellData.split(":::")[0]);
			$("#maxVal_"+_pageRef).val(cellData.split(":::")[1]);
			$("#minVal_"+_pageRef).val(cellData.split(":::")[2]);
			$("#formatConstr_"+_pageRef).val(cellData.split(":::")[3]);
			$("#comparisonId_"+_pageRef).val(cellData.split(":::")[4]);
		}
		compShowHideData();
	},"html");  
}

function compShowHideData()
{
	params={};
	params["_pageRef"]		=_pageRef;
	var url =jQuery.contextPath+"/path/fileStructure/DynamicFileEditorsAction_retAutoCompleteData";
	$.ajax({
		url: url,
		type:"post",
		dataType:"json",
		data: params,
		success: function(param){
			var expression_comparison=(param["updates1"]).split(";");
			var expression_showHide = (param["update1"]).split(";");
			autoCompleteConstraints("comparisonId_"+_pageRef,expression_comparison);
			autoCompleteConstraints("showExprId_"+_pageRef,expression_showHide);
			autoCompleteConstraints("hideExprId_"+_pageRef,expression_showHide);
		}
	});		 
}

function closeArgConstrDialog()
{
	 $('#constraintsMainDialog_'+_pageRef).dialog('close');	
}

function saveMainExpression()
{
	var params = "";
	params+= $("#maxLength_"+_pageRef).val()+":::";
	params+= $("#maxVal_"+_pageRef).val()+":::";
	params+=$("#minVal_"+_pageRef).val()+":::";
	params+=$("#formatConstr_"+_pageRef).val()+":::";
	params+=$("#comparisonId_"+_pageRef).val()+":::";
	params["rowId"]				= $("#rowId_"+_pageRef).val();
	$("#dynamicFileStructurXMLTagListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',$("#rowId_"+_pageRef).val(),'ExpressionDetails', params);
	$('#constraintsMainDialog_'+_pageRef).dialog('close');	
	saveUpdatedTagsIntoMessage();
}		

String.prototype.replaceAll = function(target, replacement) {
	return this.split(target).join(replacement);
};

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