/**
 * show context menu from main Editor
 * @returns
 */
function showOptions()
{
    var lines = $(".jqte_editor").text().split("\n");
    var selectedTextIndex = $("#selectedTextLine").val();
    var selectedText = $("#selectedText_"+_pageRef).val();
/*    if(lines[selectedTextIndex].length == selectedText.length)
    {*/
		var line = lines[0];
		var fileType = $("#FILETYPE_"+_pageRef).val();
		var menu = [];
		menu.push({name: 'New Message',
		    img: '../common/images/add_page.png',
		    title: 'New Message',
		    fun: function () 
		    {
		      	$("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).trigger( 'reloadGrid' );
		      	var isDuplicate = dynamicStructureData_validateSelectedLine();
		      	if(!isDuplicate)
		      	{
		      		dynamicStructureData_openDialog('message');
		      	}
		      	else
		      	{
		      		_showErrorMsg("This Line already Selected", info_msg_title,300, 100);
		      	}
		    }
		});
		
		$(".jqte_editor").contextMenu('refresh', menu,{
		    'displayAround' : 'cursor',
		    'mouseClick'    : 'right',
		    'triggerOn'     : 'click',
		    'closeOnClick'  : 'true',
		    'position'      : 'right'
		});
/*    }
    else
    {
    	_showErrorMsg("Select Full Line", info_msg_title,300, 100);
    }*/
}

/**
 * function to show Context menu on Dialog Editor
 * @returns
 */
function dynamicStructureData_showOptionsDialog()
{
    var extractionCriteria = $("#dialogExtractionCriteria_"+_pageRef).val();
    if(extractionCriteria == "" || extractionCriteria == undefined)
    {
    	_showErrorMsg("Please Select Extraction Type", info_msg_title,300, 100);
    }
    else
    {
		var menu = [];
		if(extractionCriteria == "PR")
		{
			menu = TextEditorByPrecision_showOptionsDialog();
		}
		else if(extractionCriteria == "DE")
		{
			menu = TextEditorByDelimiter_showOptionsDialog();
		}
	
		$('#dynamicTextEditorTagsDialog_'+_pageRef).find(".jqte_editor").contextMenu('refresh', menu, {
		    'displayAround' : 'cursor',
		    'mouseClick'    : 'right',
		    'triggerOn'     : 'click',
		    'closeOnClick'  : 'true',
		    'position'      : 'right'
		});
    }
}

/**
 * 
 * @returns
 */
function dynamicStructureData_validateSelectedLine()
{
	var isDuplicate = false;
	var selectedText = $("#selectedText_"+_pageRef).val();
	var messageSample   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE');
	for(var i=0; i<messageSample.length; i++)
	{
		if(selectedText == messageSample[i])
		{
			isDuplicate = true;
			break
		}
	}
	return;
}

/**
 * function to open Dialog from Main Editor Context Menu
 * @param forDialog
 * @returns
 */
function dynamicStructureData_openDialog(forDialog)
{
    var dialogTitle = "Message Dialog";
    var dialogParameters = {};
    dialogParameters["dialogFor"] = "TXT";
    dialogUrl= jQuery.contextPath+ "/path/fileStructure/DynamicFileEditorsAction_openDialog.action?_pageRef="+_pageRef;
    dialogOptions ={ autoOpen: false,
	height:550,
	title:dialogTitle ,
	width:705,
	modal: true,
	close : function() {
	    $(this).dialog("destroy");
	},
	buttons: [{ text : ok_var, click : 
	    function() {
	    	dynamicStructureData_processDialogData('add');
	    } 
	},
	{ text : cancel_var, click :function(){
	    $(this).dialog('close');
	    $('#dynamicStructureTextFileDialog_'+_pageRef).remove();
	    $( "<div id=dynamicStructureTextFileDialog_"+_pageRef+"></div>" ).insertAfter( "#constraintsMainDialog_"+_pageRef);
	    }
	}
	]}
	$.post(dialogUrl,dialogParameters, function( param )
	{
	    $('#dynamicStructureTextFileDialog_'+_pageRef).html(param) ;
	    $('#dynamicStructureTextFileDialog_'+_pageRef).dialog(dialogOptions)
	    $('#dynamicStructureTextFileDialog_'+_pageRef).dialog('open');
	    dynamicStructureData_ProcessTagsAfterOpenDialog ("message", '');
	},"html");
}

/**
 * function to open Dialog on db click of Message Grid
 * @param forDialog
 * @returns
 */
function dynamicStructureData_openDialogByDBClickOnMessageGrid()
{
    var dialogTitle = "Message Dialog";
    var $table = $("#dynamicFileStructurTextMessageListGridTbl_Id_" + _pageRef);
    var messageGridSelectedRowId = $table.jqGrid('getGridParam', 'selrow');
    var tagsDataByMessageGrid = $("#clickedMessageGridRowId").val();
    var dialogExtractionCriteria = $("#dialogExtractionCriteria").val();
    var messageGridSelectedRowObject = $table.jqGrid('getRowData', messageGridSelectedRowId);
    var messageIndex =  messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.INDEX_NO'];
    $("#selectedTextLine").val(messageIndex);
    
    var $table = $("#dynamicFileStructurTextMessageListGridTbl_Id_" + _pageRef);
    var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
    var myObject = $table.jqGrid('getRowData', selectedRowId);
    var tagsData = myObject["tags"].split(",");
    var dialogParameters = {};
    dialogParameters["dialogFor"] = "TXT";
    dialogUrl= jQuery.contextPath+ "/path/fileStructure/DynamicFileEditorsAction_openDialog.action?_pageRef="+_pageRef;
    dialogOptions = { 
	autoOpen: false,
	height:550,
	title:dialogTitle ,
	width:705,
	modal: true,
	close : function() 
	{
	    $(this).dialog("destroy");
	},
	buttons: [{ text : ok_var, click : 
	    function() 
	    {
	    	dynamicStructureData_processDialogData('update', messageGridSelectedRowId);
	    } 
	},
	{ text : cancel_var, click :function()
	    {
	    	$(this).dialog('close');
	    	$('#dynamicStructureTextFileDialog_'+_pageRef).remove();
	    	$( "<div id=dynamicStructureTextFileDialog_"+_pageRef+"></div>" ).insertAfter( "#constraintsMainDialog_"+_pageRef);
	    }
	}
	]}
	$.post(dialogUrl,dialogParameters, function( param )
	{
	    $('#dynamicStructureTextFileDialog_'+_pageRef).html(param) ;
	    $('#dynamicStructureTextFileDialog_'+_pageRef).dialog(dialogOptions)
	    $('#dynamicStructureTextFileDialog_'+_pageRef).dialog('open');
	    dynamicStructureData_ProcessTagsAfterOpenDialog("update-dialog", tagsData);
	},"html");
}


/**
 * function to process Text when Close Dialog
 * @param level
 * @param messageGridSelectedRowId
 * @returns
 */
function dynamicStructureData_processDialogData(level, messageGridSelectedRowId)
{
    var result = dynamicStructureData_validateTagNameColumnInDialogTagGrid();
    if(result == "duplicate")
    {
	_showErrorMsg("Duplicate Entry of Tag Name", info_msg_title,300, 100);
    } else if(result == "empty")
    {
	_showErrorMsg("Tag Names should not empty", info_msg_title,300, 100);
    }
    else
    {
	var messageType = $("#messageType_"+_pageRef).val();
	
    	var extractionCriteria = $("#dialogExtractionCriteria_"+_pageRef).val();
    	if(extractionCriteria == "")
    	{
    	    _showErrorMsg("Select Extraction Criteria to Proceed", info_msg_title,300, 100);
    	}
    	else
    	{
    	    if(extractionCriteria == "PR")
    	    {
	    		if(messageType == "Identifier")
	    		{
	    			TextEditorByPrecision_processPrecisionWithIdentifierDialogData(level, messageGridSelectedRowId);
	    		}
	    		else
	    		{
	    			TextEditorByPrecision_processPrecisionWithGeneralMessageDialogData(level, messageGridSelectedRowId);
	    		}
    	    }
    	    if(extractionCriteria == "DE")
    	    {
	    		var delimiterStatus = $("#delimiter-identifier").val();
	    		if(delimiterStatus == "DE-IDENTIFIER")
	        	{
	    			TextEditorByDelimiter_processDelimiterWithIdentifierDialogData(level, messageGridSelectedRowId);
	    		    $("#delimiter-identifier").val("");
	        	}
	    		else
	    		{
	    			TextEditorByDelimiter_processDelimiterWithGeneralMessageDialogData(level, messageGridSelectedRowId);
	    		}
    	    }
    	 }
    }
    //$("#messageType_"+_pageRef).val("");
}

/**
 * function when DB click on Message Grid
 * @param fromScreen
 * @returns
 */
function dynamicStructureData_onMessageDbClickedEvent(fromScreen)
{
    var $table = $("#dynamicFileStructurTextMessageListGridTbl_Id_" + _pageRef);
    var messageGridSelectedRowId = $table.jqGrid('getGridParam', 'selrow');
    var tagsDataByMessageGrid = $("#clickedMessageGridRowId").val();
    var dialogExtractionCriteria = $("#dialogExtractionCriteria").val();
    var messageGridSelectedRowObject = $table.jqGrid('getRowData', messageGridSelectedRowId);
    var identifierStartPos   = messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.START_POS'];
    var identifier = messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.IDENTIFIER'];
    var messageType = messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.MESSAGE_TYPE'];
    $("#identifier").val(identifier);
    $("#identifierStartPosition").val(identifierStartPos);
    $("#messageType_"+_pageRef).val(messageType);
    
    // set tag Grid data into tags column of message Grid
	dynamicStructureData_setTagsDataInMessageGrid(tagsDataByMessageGrid, messageGridSelectedRowId, dialogExtractionCriteria);
	
	// Highlight Main Editor Text According to Message And Tag Structure 
	dynamicStructureData_highlightTags(messageGridSelectedRowObject , dialogExtractionCriteria);
	

    if(dialogExtractionCriteria == "PR")
    {
    	TextEditorByPrecision_setTagsInTagGrid(messageGridSelectedRowObject, messageType);
    }
    else if(dialogExtractionCriteria == "DE")
    {
		TextEditorByDelimiter_setTagsInTagGrid(messageGridSelectedRowObject, messageType)
	}
    	
    
    if(fromScreen == undefined  || fromScreen == "MessageGrid")
    {
        dynamicStructureData_openDialogByDBClickOnMessageGrid();
    }
}


/**
 * set data in message Grid after click the another row of message Grid and set Data in tag column of Message Grid
 * @param tagsDataByMessageGrid
 * @param selectedRowId
 * @param dialogExtractionCriteria
 * @returns
 */
function dynamicStructureData_setTagsDataInMessageGrid(tagsDataByMessageGrid, selectedRowId, dialogExtractionCriteria)
{
    var clickedeSelectedRowId = $("#clickedMessageGridRowId").val();
    console.log("clickedeSelectedRowId="+clickedeSelectedRowId);
    if(tagsDataByMessageGrid == undefined || tagsDataByMessageGrid == "")
    {
    	$("#clickedMessageGridRowId").val(selectedRowId);
    } else  if(clickedeSelectedRowId != selectedRowId)
    {
		var tagsId   = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_TAGVO.TAGS_ID');
		var tagName  = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_TAGVO.TAG_NAME');
		var startPos = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_TAGVO.START_POS');
		var index    = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_TAGVO.INDEX');
		var tagColor    = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_TAGVO.COLOR');
		var tagLength   = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_TAGVO.TAG_LENGTH');
		var tagLine     = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getCol','TAG_LINE');
		var description = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_TAGVO.DESCRIPTION');
		var tagValue    = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_TAGVO.TAG_VALUE');
		var tags        = "";
		for (var i=0; i<tagValue.length; i++)
		{
		    if(dialogExtractionCriteria == "PR")
		    {
		    	tags +=tagsId[i]+":"+tagName[i]+":"+startPos[i]+":"+tagLine[i]+":"+tagLength[i]+":"+tagColor[i]+":"+tagValue[i]+":  : ,";
		    }
		    else
		    {
		    	tags +=tagsId[i]+":"+tagName[i]+":"+index[i]+":"+tagLine[i]+":"+tagLength[i]+":"+tagColor[i]+":"+tagValue[i]+":  : ,";
		    }
		}
		$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',clickedeSelectedRowId,'tags',tags);
    }
    $("#clickedMessageGridRowId").val(selectedRowId);
    var dynamicFileStructureId = $("#FILE_STRUCTURE_ID_"+_pageRef).val();
    var newRowId = "";
    if(clickedeSelectedRowId != undefined && clickedeSelectedRowId != "")
    {
    	newRowId = clickedeSelectedRowId.substring(0,3);
    }
    if(dynamicFileStructureId != undefined && dynamicFileStructureId != "" && newRowId != "" && newRowId.substring(0,3) != "new")
    {
    	 $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).find("tr").each(function(){
	   		 if($(this).attr("id") != undefined && $(this).attr("id") != "")
	   		 {
	   			 if(clickedeSelectedRowId == $(this).attr("id"))
	   			 {
	   				 $("#"+clickedeSelectedRowId).attr("changed","1");
	   			 }
	   		 }
    	 });
    }
    $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('clearGridData' );
}

/**
 * function to add Identifier And Tags On Click of Context Menu
 * @param menu
 * @returns
 */
function dynamicStructureData_addIdentifierAndTagsInGridAfterClickContextMenu(menu)
{
   var dialogSelectedText = $("#dialogSelectedText").val();
   var dialogSelectedTextPos = $("#dialogSelectedTextStartPos").val();
   var delimiter =  $("#dynamicStructureFileDialogDelimiter_"+_pageRef).val();
   
   
   if(delimiter.indexOf("{sp}") == 0)
   {
       delimiter = delimiter.replace(/{sp}/g,' ');
   }
   var selectedTextIndex = $("#selectedTextLine").val();
   
   var colorPicker =   "<input value='#d0e5f5'  title='Highlight Color' id='te-color-picker'  type='color' onchange='dynamicStructureData_changeDialogEditorHighlightColor(this);'  >";
   
   if(menu == "identifier")
   {
       $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TEXT_TYPE': 'Identifier','TAG_NAME':dialogSelectedText,'TAG_TYPE':"Id", 'STR_POS':dialogSelectedTextPos, 'TAG_LEN':dialogSelectedText.length});
       $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+(selectedTextIndex+dialogSelectedTextPos));
       var row = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find("tr").last();
       row.find("td:nth-child(7)").html(colorPicker);
       $("#tagsDetailDialogGridInner_"+_pageRef+" .ui-jqgrid tr.jqgrow td").css({"font-weight":"bold","color":"blue"});
       $("#messageType_"+_pageRef).val("Identifier");
   }
   else if(menu == "tag")
   {

	   $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TEXT_TYPE': 'Tag','TAG_VALUE':dialogSelectedText,'TAG_TYPE':"Tag", 'STR_POS':dialogSelectedTextPos, 'TAG_LEN':dialogSelectedText.length});
       $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+(selectedTextIndex+dialogSelectedTextPos+dialogSelectedText.length));
       var row = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find("tr").last();
       row.find("td:nth-child(7)").html(colorPicker);
   } 
   else if(menu == "DE" || menu == "DE-TAGS")
   {
       if(delimiter != "")
       {	
		   var countChar = dialogSelectedText.indexOf(":");
		   if(countChar == -1)
		   {
		       _showErrorMsg("Please Select Proper Format Text", info_msg_title,300, 100);	
		   }
		   else
		   {
		       var selectedTextData = dialogSelectedText.split(delimiter);
		       for(var i=0; i<selectedTextData.length; i++)
		       {
			   if(menu == "DE")
			   {
			       $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TAG_NAME':selectedTextData[i],'TAG_TYPE':"Header", 'INDEX_NO':i, 'TAG_LEN':selectedTextData[i].length});
			   }
			   else
			   {
			       $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TAG_VALUE':selectedTextData[i],'TAG_TYPE':"Header", 'INDEX_NO':i, 'TAG_LEN':selectedTextData[i].length});
			   }
			   $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+i);
			   var row = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find("tr").last();
			   row.find("td:nth-child(7)").html(colorPicker);
		       }
		   }
       }
       else
       {
    	   _showErrorMsg("Please Specify the Delimiter", info_msg_title,300, 100);	
       }
   }
   else if(menu == "DE-IDENTIFIER" || menu == "DE-TAG")
   {
       if(menu == "DE-IDENTIFIER")
       {
		   $("#delimiter-identifier").val(menu);
		   $("#messageType_"+_pageRef).val("Identifier");
       }
       
       if(delimiter != "")
       {
		   var lines = $("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").text();
		   var delimiter = $("#dynamicStructureFileDialogDelimiter_"+_pageRef).val();
		   if(delimiter.indexOf("{sp}") == 0)
		   {
		       delimiter = delimiter.replace(/{sp}/g,' ');
		   }
		   var data = lines.split(delimiter);
		   var fullText = "";
		   var tagIndex = $("#dialogTagIndex").val();
		   for(var i=0; i<data.length; i++)
		   {
		       if(i == tagIndex)
		       {
			   if(menu == "DE-IDENTIFIER")
			   {
			       $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TEXT_TYPE': 'Identifier','TAG_NAME':data[i],'TAG_TYPE':"Id", 'INDEX_NO':i, 'TAG_LEN':data[i].length});
			   }
			   else
			   {
			       $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TEXT_TYPE': 'Tag','TAG_VALUE':data[i],'TAG_TYPE':"Header", 'INDEX_NO':i, 'TAG_LEN':data[i].length});
			   }
			   $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+i);
			   var row = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find("tr").last();
			   row.find("td:nth-child(7)").html(colorPicker);
			   break;
		       }
		   }
       }
       else
       {
    	   _showErrorMsg("Please Specify the Delimiter", info_msg_title,300, 100);	
       }
   }
        
}

/**
 * get line no of selected text 
 * @param selectedTextPosition
 * @returns
 */
function dynamicStructureData_getSelectedLineNo(selectedTextPosition)
{
    var lines = $(".jqte_editor").text().split("\n");
    var countPosition = 0;
    var selectedPosition = 0; 
    $.each(lines, function(n, elem) {
	countPosition+=lines[n].length;
	if(selectedTextPosition<countPosition)
	{
	    selectedPosition = n;
	    return false;
	}
    });
    $("#selectedTextLine").val(selectedPosition);
}

/**
 * Upload Text File
 * @param proceed
 * @returns
 */
function dynamicStructureData_uploadTxtFile(proceed)
{
    dynamicStructureData_clearFields();
    var fileName = document.getElementById("upload_" + _pageRef).value;
    if(fileName == "" || fileName == undefined)
    {
    	alert("Please Select the file");
    	return;
    }
    var ext = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
    if(ext == 'CSV' || ext == 'csv')
    {
    	$("#dynamicStructureFileSeprator_"+_pageRef).val(",");
    }
    $("#fileType_"+_pageRef).val(ext);
    var requestParams = {};
    $("#uploadDynamicFile_"+_pageRef).ajaxSubmit({
	url  :    jQuery.contextPath+ "/path/fileStructure/DynamicFileEditorsAction_uploadTxtFile?_pageRef="+_pageRef,
	type :   'post',
	data :    requestParams,
	dataType: 'application/json; charset=utf-8',
	beforeSubmit:_showProgressBar(true),				
	success: function(response, status, xhr) 
	{
	    _showProgressBar(false);
	    var responseText = JSON.parse(response);
	    $(".jqte_editor").html(responseText.dynamicStructureValue);
	    $("#fileData_"+_pageRef).val(responseText.dynamicStructureValue);
	    $("#dynamicFileStructurTextTagListGridTbl_Id_" + _pageRef).trigger("reloadGrid");
	    $("#delimiter-identifier").val("");
	}
    }); 
}


/**
 * 
 * @param id
 * @returns
 */
function dynamicStructureData_changeDialogEditorHighlightColor(id, highlightFor, rowId, fromScreen)
{
   var rowid = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getGridParam','selrow');
   var dialogExtractionCriteria = $("#dialogExtractionCriteria").val();
   var color = $(id).val();
   $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('setCellValue',rowid,'COLOR_VALUE',color);
   if(highlightFor == "delete-tag")
   {
       rowid = rowId;
   }
   
   if(rowid != undefined && rowid != null)
   {
       if(dialogExtractionCriteria == "PR")
       {
    	   TextEditorByPrecision_highlightMainAndDialogTagsAfterClickTagGrid("#dynamicTagsDetailDialogGrid_Id_"+_pageRef, fromScreen);
       }
       else	
       {
    	   TextEditorByDelimiter_HighlightTagsDialogEditorAfterSelectColorFromColorPicker();
       }
   }
   else
   {
       _showErrorMsg("Select Row First", info_msg_title,300, 100);
   }
}

/**
 * 
 * @returns
 */
function dynamicStructureData_highlightTags(rowObject, dialogExtractionCriteria)
{

    if(dialogExtractionCriteria == "PR")
    {
    	TextEditorByPrecision_highlightPrecisionIdentifier(rowObject, dialogExtractionCriteria);
    }
    else  if(dialogExtractionCriteria == "DE")
    {
    	TextEditorByDelimiter_highlightDelimitermMainEditorTags(rowObject, dialogExtractionCriteria);
    }
}

/**
 * get selected text
 * @returns
 */
function getSelectedText() 
{
    t = (document.all) ? document.selection.createRange().text : document.getSelection();
    return t;
}

/**
 * Process Tags After Open Dialog
 * @param menu
 * @param extractionCriteria
 * @returns
 */
function dynamicStructureData_ProcessTagsAfterOpenDialog (menu, tagsData)
{
    var dialogSelectedTextPos = $("#dialogSelectedTextStartPos").val();
    var selectedText = $("#selectedText_"+_pageRef).val();
    var selectedTextStartPos = $("#selectedTextStartPos").val();
    var delimiter = $("#dynamicStructureFileDelimiter_"+_pageRef).val();
    
    if(delimiter.indexOf("{sp}") == 0)
    {
	   delimiter = delimiter.replace(/{sp}/g,' ');
    }
    var selectedTextIndex = $("#selectedTextLine").val();
    var dialogExtractionCriteria = $("#dialogExtractionCriteria").val();
    if(menu == "message")
    {
    	$("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('clearGridData' );
    	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('resetSelection' );
    }
    
    if(menu == "message" || menu == "update-dialog")
    {
    	$("#dialogExtractionCriteria_"+_pageRef).val(dialogExtractionCriteria);
    	dynamicStructureData_changeExtractionCriteria();
    	
    	// highlight dialog Editor tags
    	var $table = $("#dynamicFileStructurTextMessageListGridTbl_Id_" + _pageRef);
    	var messageGridSelectedRowId = $table.jqGrid('getGridParam', 'selrow');
    	var tagsDataByMessageGrid = $("#clickedMessageGridRowId").val();
    	var dialogExtractionCriteria = $("#dialogExtractionCriteria").val();
    	var messageGridSelectedRowObject = $table.jqGrid('getRowData', messageGridSelectedRowId);
	 
    	if(menu == "update-dialog")
    	{
    		selectedText = messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE'];
    		$("#selectedText_"+_pageRef).val(selectedText);
    	}
	
    	$('#dynamicTextEditorTagsDialog_'+_pageRef).find('.jqte_editor').html(selectedText);
    	var startPos   = 	messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.START_POS'];
    	var identifier = 	messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.IDENTIFIER'];
    	var identifierColor = 	messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.IDENTIFIER_COLOR'];
    	var indexNo = 		messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.INDEX_NO'];
    	var messageType = 	messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.MESSAGE_TYPE'];
	
		if(identifierColor == "" || identifierColor == undefined)
		{
		    identifierColor = '#d0e5f5';
		}
	
		var delimiterStatus = $("#delimiter-identifier").val();
		if(delimiterStatus == "" || delimiterStatus == undefined)
		{
		    if(identifier.indexOf("Line") == -1)
		    {
		    	$("#delimiter-identifier").val("DE-IDENTIFIER");
		    	delimiterStatus = "DE-IDENTIFIER";
		    }
		}
	
		//add Identifier Row inside Dialog
		if(dialogExtractionCriteria == "PR")
		{
		    if(messageType == "Identifier")
		    {
				var colorPicker =   "<input title='Highlight Color' id='te-color-picker' value='"+identifierColor+"'  type='color' onchange='dynamicStructureData_changeDialogEditorHighlightColor(this);'  >";
				$("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TEXT_TYPE': 'Identifier','TAG_NAME':identifier,'TAG_TYPE':"Id", 'STR_POS':startPos, 'TAG_LEN':identifier.length, 'COLOR_VALUE':identifierColor});
				$("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+(startPos+identifier.length));
				var row = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find("tr").last();
				row.find("td:nth-child(7)").html(colorPicker);
		    }
		}
		else if(dialogExtractionCriteria == "DE" && delimiterStatus == "DE-IDENTIFIER")
		{
		    var colorPicker =   "<input title='Highlight Color' id='te-color-picker' value='"+identifierColor+"'  type='color' onchange='dynamicStructureData_changeDialogEditorHighlightColor(this);'  >";
		    $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TEXT_TYPE': 'Identifier','TAG_NAME':identifier,'TAG_TYPE':"Id", 'INDEX_NO':indexNo, 'TAG_LEN':identifier.length, 'COLOR_VALUE':identifierColor});
		    $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+indexNo+identifier+identifier.length);
		    var row = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find("tr").last();
		    row.find("td:nth-child(7)").html(colorPicker);
		}
		
		for(var i=0; i<tagsData.length; i++)
		{
		    if(tagsData[i] != "")
		    {
				tagsData[i] = tagsData[i].split(":");
				tagsData[i][0] = tagsData[i][0] == "null" ? "" : tagsData[i][0];
				tagsData[i][1] = tagsData[i][1] == "null" ? "" : tagsData[i][1];
				tagsData[i][2] = tagsData[i][2] == "null" ? "" : tagsData[i][2];
				tagsData[i][3] = tagsData[i][3] == "null" ? "" : tagsData[i][3];
				tagsData[i][4] = tagsData[i][4] == "null" ? "" : tagsData[i][4];
				tagsData[i][5] = tagsData[i][5] == "null" ? "" : tagsData[i][5];
				tagsData[i][6] = tagsData[i][6] == "null" ? "" : tagsData[i][6];
				if(tagsData[i][5] == "" || tagsData[i][5] == undefined)
				{
				    tagsData[i][5] = '#d0e5f5'; 
				}
				colorPicker =   "<input title='Highlight Color' id='te-color-picker' value='"+tagsData[i][5]+"'  type='color' onchange='dynamicStructureData_changeDialogEditorHighlightColor(this);'  >";
				if(dialogExtractionCriteria == "PR")
				{
				    $('#dynamicTextEditorTagsDialog_'+_pageRef).find("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TAG_ID' : tagsData[i][0], 'TEXT_TYPE':'Tag','TAG_NAME':tagsData[i][1],'TAG_VALUE':tagsData[i][6],'TAG_TYPE':"Tag", 'STR_POS':tagsData[i][2], 'TAG_LEN':tagsData[i][4], 'COLOR_VALUE' : tagsData[i][5]});
				}
				else if(dialogExtractionCriteria == "DE")
				{
				    $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('addInlineRow',{'TAG_ID' : tagsData[i][0], 'TEXT_TYPE': 'Tag', 'TAG_NAME':tagsData[i][1], 'TAG_VALUE':tagsData[i][6],'TAG_TYPE':"Header", 'INDEX_NO':tagsData[i][2], 'TAG_LEN':tagsData[i][4], 'COLOR_VALUE' : tagsData[i][5]});
				}
				
				$("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+(tagsData[i][2]+tagsData[i][4]));
				row = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).find("tr").last();
				row.find("td:nth-child(7)").html(colorPicker);
		    }
		}
    }
    TextEditorByDelimiter_highlightDelimiterTagsOfDialogEditor(messageGridSelectedRowObject , dialogExtractionCriteria);
}

/**
 * 
 * @param page
 * @returns
 */
function dynamicStructureData_changeExtractionCriteria()
{
	var extractionCriteria = $("#dialogExtractionCriteria_"+_pageRef).val();
	$("#dialogExtractionCriteria").val(extractionCriteria);
	if(extractionCriteria == "DE")
	{
	    $("#fileSepratorDialogRow").show();
	}
	else
	{
	    $("#fileSepratorDialogRow").hide();
	}
}

/**
 * function to get selected text parameter (start position, end position).
 * @param element
 * @returns
 */
function getSelectionCharOffsetsWithin(element) 
{
    var start = 0, end = 0;
    var sel, range, priorRange;
    if (typeof window.getSelection != "undefined") {
        range = window.getSelection().getRangeAt(0);
        priorRange = range.cloneRange();
        priorRange.selectNodeContents(element);
        priorRange.setEnd(range.startContainer, range.startOffset);
        start = priorRange.toString().length;
        end = start + range.toString().length;
    } else if (typeof document.selection != "undefined" &&
            (sel = document.selection).type != "Control") {
        range = sel.createRange();
        priorRange = document.body.createTextRange();
        priorRange.moveToElementText(element);
        priorRange.setEndPoint("EndToStart", range);
        start = priorRange.text.length;
        end = start + range.text.length;
    }
    return {
        start: start,
        end: end
    };
}

/**
 * 
 * @param id
 * @returns
 */
function dynamicStructureData_deleteRow(id)
{
    var $table = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef);	
    var tagDialogGridSelectedRowId = $table.jqGrid('getGridParam', 'selrow');	
    var tagDialogGridSelectedRowObject = $table.jqGrid('getRowData', tagDialogGridSelectedRowId);
	
    if(id == "dynamicTagsDetailDialogGrid_Id_")	
    {
		var messageType = tagDialogGridSelectedRowObject["TEXT_TYPE"];
		if(messageType == "Identifier")
		{
		    $("#messageType_"+_pageRef).val("");
		    $("#delimiter-identifier").val("");
		}
    }
    $("#"+id+_pageRef).jqGrid('deleteGridRow');
    dynamicStructureData_changeDialogEditorHighlightColor("#te-color-picker", "delete-tag", tagDialogGridSelectedRowId, "afterDelete");
}

/**
 * function to clear all fields and Grids
 * @returns
 */
function dynamicStructureData_clearFields()
{
    $("#fileSize").val("");
    $("#fileType_"+_pageRef).val("");
    $("#dynamicStructureFileSeprator_"+_pageRef).val("");
    $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('clearGridData' );
    $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('clearGridData');
    $("#FILE_STRUCTURE_ID_"+_pageRef).val("");
}

/**
 * check tag name column has duplicate value of not
 * @returns
 */
function dynamicStructureData_validateTagNameColumnInDialogTagGrid()
{
    var grid = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef);
    var tagNames = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_NAME');
    var rowIds = grid.jqGrid('getDataIDs');
    var isDuplicate = false;
    var status = "";
    for (var i=0; i<rowIds.length; i++)
    {
    	var cur = tagNames[i];
    	if(cur != undefined && cur != "")
    	{
    	    //SECOND LOOP TO CHECK IF SIMILAR OCCURRENCE OF FILE ORDER
    	    for (var j=i+1; j<tagNames.length; j++)
    	    {
    		var next = tagNames[j];
    		if( cur == next)
    		{
    		    //grid.jqGrid('setRowData',"", false, {color:'red'});
    		    //IF FOUND SIMILAR OCCURRENCE, SHOW MESSAGE AND EMPTY THE CURRENT COLUMN
    		    rowid = "newid_"+i;
    		    $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('setCellValue',rowid,'STANDARD_DESC',"");
    		    status = "duplicate";
    		}
    	    }
    	}
    	else
    	{
    	    status = "empty";
    	    break;
    	}
    }
    return status;
}

/**
 * function to call event after select row from tag Grid Main/Dialog 
 * @param event
 * @param data
 * @returns
 */
$.subscribe('rowselect', function(event, data) {
	var grid = event.originalEvent.grid;
	var sel_id = grid.jqGrid('getGridParam', 'selrow');  
	var selectedRowObject = grid.jqGrid('getRowData', sel_id);
	TextEditorByPrecision_highlightMainAndDialogTagsAfterClickTagGrid(grid.selector);
});



/**
 * function to call event after select row from message Grid Main 
 * @param event
 * @param data
 * @returns
 */
$.subscribe('onMessageRowselect', function(event, data) {
	dynamicStructureData_onMessageDbClickedEvent("singleRowSelectMessage");
	//$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('resetSelection' );
});

