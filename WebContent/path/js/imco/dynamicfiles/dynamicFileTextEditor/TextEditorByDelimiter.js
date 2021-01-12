/**
 * function for show context menues on Dialog Editor for Delimiter
 */
function TextEditorByDelimiter_showOptionsDialog()
{
	var menu = [];
    var delimiterIdentifier = $("#delimiter-identifier").val();
    
/*   menu.push({name: 'Add Header',
	img: '../common/images/add_page.png',
	title: 'Add Header',
	fun: function () {
		dynamicStructureData_addIdentifierAndTagsInGridAfterClickContextMenu("DE");
	}
    });*/
 
    if(delimiterIdentifier != "DE-IDENTIFIER")
    {
	menu.push({name: 'Add Identifier',
	    img: '../common/images/add_page.png',
	    title: 'Add Tags',
	    fun: function () {
	    	dynamicStructureData_addIdentifierAndTagsInGridAfterClickContextMenu("DE-IDENTIFIER");
	    }
	});
    }
    
    menu.push({name: 'Add Tags',
	img: '../common/images/add_page.png',
	title: 'Add Tags',
	fun: function () {
		dynamicStructureData_addIdentifierAndTagsInGridAfterClickContextMenu("DE-TAGS");
	}
    });
    menu.push({name: 'Add Tag',
	img: '../common/images/add_page.png',
	title: 'Add Tags',
	fun: function () {
		dynamicStructureData_addIdentifierAndTagsInGridAfterClickContextMenu("DE-TAG");
	}
    });
    return menu;
}


/**
 * Process General Message Delimiter Text on the time of Close Dialog 
 * @param level
 * @param messageGridSelectedRowId
 * @returns
 */
function TextEditorByDelimiter_processDelimiterWithGeneralMessageDialogData(level, messageGridSelectedRowId)
{
    var delimiter = $("#dynamicStructureFileDelimiter_"+_pageRef).val();
    if(delimiter.indexOf("{sp}") == 0)
    {
	   delimiter = delimiter.replace(/{sp}/g,' ');
    }
	
    var selectedTextIndex = $("#selectedTextLine").val();
    var messages   = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.IDENTIFIER');
    var tagData    = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','Tags');
    var textType   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TEXT_TYPE');
    var indexNo    = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','INDEX_NO');
    var tagsId = "";
    if(level == 'update')
    {
    	tagsId     = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_NAME');
    }
    var tagIds   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_ID');
    var tagNames   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_NAME');
    var tagValue   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_VALUE');
    var tagDescription = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_DESCRIPTION');
    var tagType    = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_TYPE');
    var tagColor   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','COLOR_VALUE');
    var startPos   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','STR_POS');
    var tagLength  = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_LEN');
    var setSelectedRow = $("#selectedText_"+_pageRef).val();

    var $table = $("#dynamicFileStructurTextMessageListGridTbl_Id_" + _pageRef);
    var messageGridSelectedRowId = $table.jqGrid('getGridParam', 'selrow');
    
    if(setSelectedRow == undefined || setSelectedRow == "")
    {
	var messageGridSelectedRowObject = $table.jqGrid('getRowData', messageGridSelectedRowId);
	setSelectedRow   = messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE'];
    }
    var tags = "";
    var rowCount = messages.length;
    
    var isDuplicate = false;
    for (var j=0; j<messages.length; j++)
    {
    	if(messages[j] == " " || messages[j] == "")
    	{
    	    isDuplicate = true;
    	    tags = tagData[j];
    	}
    }
    
    if(!isDuplicate)
    {
	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('addInlineRow',{'dyn_FILE_MESSAGEVO.MESSAGE_TYPE':"General Message", 'dyn_FILE_MESSAGEVO.IDENTIFIER':" ",'dyn_FILE_MESSAGEVO.INDEX_NO':selectedTextIndex, 'dyn_FILE_MESSAGEVO.DELIMITER' : delimiter, 'dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE' : setSelectedRow});
	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+(rowCount+1));
    }
    
    for(var i=0; i<tagNames.length; i++)
    {
		if(rowCount == undefined)
		{
		    rowCount=0;
		}
	
		if(tagIds[i] != "" && tagIds[i] != undefined)	
		{
		    rowCount = tagIds[i];
		}

		if(tags == undefined)
		{
		    tags = "";
		}
	   	if(level == 'update')
	   	{
	   	    tags += rowCount+":"+tagNames[i]+":"+indexNo[i]+":"+selectedTextIndex+":"+tagLength[i]+":"+tagColor[i]+":"+tagValue[i]+": "+" : "+",";
	   	    $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'tags',tags);
	   	    $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'IsUpdate',"yes"+rowCount);
	   	}
	   	else
	   	{
	   	    tags +=rowCount+":"+tagNames[i]+":"+indexNo[i]+":"+selectedTextIndex+":"+tagLength[i]+":"+tagColor[i]+":"+tagValue[i]+": "+" : "+",";
	   	    var row = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).find("tr").last();
	   	    row.find("td:nth-child(8)").text(tags);
	   	}
    }
    
    $('#dynamicStructureTextFileDialog_'+_pageRef).dialog('destroy');
    if(level == 'update')
    {
	dynamicStructureData_onMessageDbClickedEvent('Dialog');
    }
    if(messageGridSelectedRowId == undefined || messageGridSelectedRowId == "")
    {
	var row = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).find("tr").last();
        row.find("td:nth-child(11)").text(setSelectedRow);
    }
    else
    {
	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE',setSelectedRow);
    }
    $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
    $('#dynamicStructureTextFileDialog_'+_pageRef).remove();
    $( "<div id=dynamicStructureTextFileDialog_"+_pageRef+"></div>" ).insertAfter( "#constraintsMainDialog_"+_pageRef);
    $("#dialogExtractionCriteria_"+_pageRef).val("");
}


/**
 * function to process Identifier Delimiter Text on the time of Close Dialog 
 * @param level
 * @param messageGridSelectedRowId
 * @returns
 */
function TextEditorByDelimiter_processDelimiterWithIdentifierDialogData(level, messageGridSelectedRowId)
{
    var delimiter = $("#dynamicStructureFileDelimiter_"+_pageRef).val();
    if(delimiter.indexOf("{sp}") == 0)
    {
    	delimiter = delimiter.replace(/{sp}/g,' ');
    }
    var selectedTextIndex = $("#selectedTextLine").val();
    var messages   = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.IDENTIFIER');
    var tagData    = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','Tags');
    var textType   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TEXT_TYPE');
    var indexNo    = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','INDEX_NO');
    var tagsId = "";
    if(level == 'update')
    {
    	tagsId     = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_NAME');
    }
    var tagIds   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_ID');
    var tagNames   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_NAME');
    var tagValue   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_VALUE');
    var tagDescription = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_DESCRIPTION');
    var tagType    = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_TYPE');
    var tagColor   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','COLOR_VALUE');
    var startPos   = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','STR_POS');
    var tagLength  = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','TAG_LEN');
    var setSelectedRow = $("#selectedText_"+_pageRef).val();
    var $table = $("#dynamicFileStructurTextMessageListGridTbl_Id_" + _pageRef);
    var messageGridSelectedRowId = $table.jqGrid('getGridParam', 'selrow');

    if(setSelectedRow == undefined || setSelectedRow == "")
    {
    	var messageGridSelectedRowObject = $table.jqGrid('getRowData', messageGridSelectedRowId);
    	setSelectedRow   = messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE'];
    }
    
    var tags = "";
    var rowCount = messages.length;
    for(var i=0; i<tagNames.length; i++)
    {
		if(rowCount == undefined)
		{
		    rowCount=0;
		}
		
		if(tagIds[i] != "" && tagIds[i] != undefined)	
		{
		    rowCount = tagIds[i];
		}
	
	    if(textType[i] == "Identifier")
		{
	    	var isDuplicate = false;
	    	for (var j=0; j<messages.length; j++)
	    	{
	    		if(messages[j] == tagNames[i])
	    		{
	    			isDuplicate = true;
	    			tags = tagData[j];
	    		}
	    	}
	    	if(!isDuplicate)
	    	{
	    		$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('addInlineRow',{'dyn_FILE_MESSAGEVO.MESSAGE_TYPE':textType[i] , 'dyn_FILE_MESSAGEVO.IDENTIFIER':tagNames[i],'dyn_FILE_MESSAGEVO.INDEX_NO':indexNo[i],'dyn_FILE_MESSAGEVO.DELIMITER' : delimiter , 'dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE' : setSelectedRow ,'dyn_FILE_MESSAGEVO.IDENTIFIER_COLOR' : tagColor[i]});
	    		$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+(rowCount+1));
	    	}
	    	else
	    	{
	    		$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'dyn_FILE_MESSAGEVO.IDENTIFIER_COLOR',tagColor[i]);
	    	}
		}
	   	else
	   	{
	   		if(tags == undefined)
	   		{
	   			tags = "";
	   		}
	   	    if(level == 'update')
	   	    {
	   	    	tags += rowCount+":"+tagNames[i]+":"+indexNo[i]+":"+selectedTextIndex+":"+tagLength[i]+":"+tagColor[i]+":"+tagValue[i]+": "+" : "+",";
	   	    	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'tags',tags);
	   	    	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'IsUpdate',"yes"+rowCount);
	   	    }
	   	    else
	   	    {
	   	    	tags +=rowCount+":"+tagNames[i]+":"+indexNo[i]+":"+selectedTextIndex+":"+tagLength[i]+":"+tagColor[i]+":"+tagValue[i]+": "+" : "+",";
	   	    	var row = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).find("tr").last();
	   	    	row.find("td:nth-child(8)").text(tags);
	   	    }
	   	}
    }
    if(level == 'update')
    {
    	dynamicStructureData_onMessageDbClickedEvent('Dialog');
    }
    if(messageGridSelectedRowId == undefined || messageGridSelectedRowId == "")
    {
    	var row = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).find("tr").last();
        row.find("td:nth-child(11)").text(setSelectedRow);
    }
    else
    {
    	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE',setSelectedRow);
    }
    $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('resetSelection');
    $('#dynamicStructureTextFileDialog_'+_pageRef).dialog('destroy');
    $('#dynamicStructureTextFileDialog_'+_pageRef).remove();
    $( "<div id=dynamicStructureTextFileDialog_"+_pageRef+"></div>" ).insertAfter( "#constraintsMainDialog_"+_pageRef);
    $("#dialogExtractionCriteria_"+_pageRef).val("");
}


/**
 * function  to set tags in Tag Grid After DB Click on Message Grid.
 * @param messageGridSelectedRowObject
 * @param messageType
 * @returns
 */
function TextEditorByDelimiter_setTagsInTagGrid(messageGridSelectedRowObject, messageType)
{
	var tagsData = messageGridSelectedRowObject["tags"].split(",");
    for(var i=0; i<tagsData.length; i++)
    {
	if(tagsData[i] != "")
	{
	    tagsData[i]    = tagsData[i].split(":");
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
	    $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('addInlineRow',{'dyn_FILE_TAGVO.TAGS_ID':tagsData[i][0],'dyn_FILE_TAGVO.TAG_NAME':tagsData[i][1],'dyn_FILE_TAGVO.INDEX':tagsData[i][2],'dyn_FILE_TAGVO.TAG_LENGTH':tagsData[i][4],'TAG_LINE':tagsData[i][3],'dyn_FILE_TAGVO.COLOR':tagsData[i][5],'dyn_FILE_TAGVO.TAG_VALUE':tagsData[i][6]});
	    $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+i);
	    var row = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).find("tr").last();
	    var tagsDetailColorPicker =   "<input title='Highlight Color' id='tags-details-color-picker' value='"+tagsData[i][5]+"'  type='color' >";
	    row.find("td:nth-child(10)").html(tagsDetailColorPicker);
	}
    }
}

/**
 * function to Highlight Delimiter tags of main Editor
 * @param rowObject
 * @param dialogExtractionCriteria
 * @returns
 */
function TextEditorByDelimiter_highlightDelimitermMainEditorTags(rowObject, dialogExtractionCriteria)
{
	var tagsData   	= 	rowObject["tags"];
    var startPos   	= 	rowObject['dyn_FILE_MESSAGEVO.START_POS'];
    var identifier 	= 	rowObject['dyn_FILE_MESSAGEVO.IDENTIFIER'];
    var identifierColor = 	rowObject['dyn_FILE_MESSAGEVO.IDENTIFIER_COLOR'];
    var indexNo 	= 	rowObject['dyn_FILE_MESSAGEVO.INDEX_NO'];
    var messageType 	= 	rowObject['dyn_FILE_MESSAGEVO.MESSAGE_TYPE'];
    var messageDelimiter =      rowObject['dyn_FILE_MESSAGEVO.DELIMITER'];
    var tagColor 	= 	"";
    var lines 		= 	$(".jqte_editor").text().split("\n");
    var delimiter 	= 	$("#dynamicStructureFileDelimiter_"+ _pageRef).val();
    
    var messageIdentifiers = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.IDENTIFIER');
    var messageTypes = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.MESSAGE_TYPE');
    var startPositions = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.START_POS');
    var indexNos = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.INDEX_NO');
    var identifiers = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.IDENTIFIER');
    
    if(identifierColor == "" || identifierColor == undefined)
    {
    	identifierColor = '#d0e5f5';
    }
   // var messageType = $("#messageType_"+_pageRef).val();
    if(delimiter.indexOf("{sp}") == 0)
    {
    	delimiter = delimiter.replace(/{sp}/g,' ');
    }
    var actualFileSize = $("#fileSize").val();
    if(actualFileSize == "" || actualFileSize == undefined)
    {
    	$("#fileSize").val(lines.length);
    }
    tagsData =tagsData.split(",");
    var fullText = "";
    var lineSelected = false;
    var linePositions = {};
    for(var i=0; i<lines.length; i++)
    {
    	if((lines[i] != "" || lines[i] != undefined) && i<$("#fileSize").val())
    	{
		    var lineSplitedData = lines[i].split(delimiter);
		    if(messageType == "Identifier")
		    {
		    	for(var j=0; j<lineSplitedData.length; j++)
		    	{
				    lineSelected = false;
				    if(lineSplitedData[indexNo] == identifier)
				    {
						if(j == indexNo)
						{
						    fullText+="<mark style='background-color:"+identifierColor+"'>"+lineSplitedData[j]+"</mark>";
						    lineSelected = true;
						}
						else
						{
						    for(var k=0; k<tagsData.length; k++)
						    {
							var tagsSplitData = tagsData[k].split(":");
							if(j == tagsSplitData[2])
							{
							    if(tagsSplitData[5] == "" || tagsSplitData[5] == undefined)
							    {
								tagsSplitData[5] = '#d0e5f5';
							    }
							    fullText+="<mark style='background-color:"+tagsSplitData[5]+"'>"+lineSplitedData[j]+"</mark>";
							    lineSelected = true;
							    break;
							}
						    }
						}
						if(!lineSelected)
						{
						    
						    fullText+="<mark style='background-color:#d0e5f5'>"+lineSplitedData[j]+"</mark>";
						}
						if(j < lineSplitedData.length-1)
						{
						    fullText+=delimiter;
						}
				    }
				    else
				    {
				    	fullText+=lines[i];
				    	break;
				    }
		    	}
		    }
		    else
		    {
		    	lineSelected = true;
				for(var j=0; j<messageIdentifiers.length; j++)
				{
				    if(messageTypes[j] == "Identifier")
				    {
						var proccessIdentifier = lineSplitedData[indexNos[j]];
						if(messageIdentifiers[j] == proccessIdentifier)
						{
						    lineSelected = false;
						    break;
						}
				    }
				}
				if(lineSelected)
				{
				    for(var j=0; j<lineSplitedData.length; j++)
				    {
						lineSelected = false;
						for(var k=0; k<tagsData.length; k++)
						{
						    var tagsSplitData = tagsData[k].split(":");
						    if(j == tagsSplitData[2])
						    {
							if(tagsSplitData[5] == "" || tagsSplitData[5] == undefined)
							{
							    tagsSplitData[5] = '#d0e5f5';
							}
							fullText+="<mark style='background-color:"+tagsSplitData[5]+"'>"+lineSplitedData[j]+"</mark>";
							lineSelected = true;
							break;
						    }
						}
						if(!lineSelected)
						{
						    fullText+="<mark style='background-color:#d0e5f5'>"+lineSplitedData[j]+"</mark>";
						}
						if(j < lineSplitedData.length-1)
						{
						    fullText+=delimiter;
						}
				    }
				}
				else
				{
				    fullText+=lines[i];
				}
		    }
		    fullText+="\n";
    	}
    }
    $(".jqte_editor").html(fullText);
}

/**
 * function to Highlight Delimiter tags of Dialog Editor
 * @returns
 */
function TextEditorByDelimiter_highlightDelimiterTagsOfDialogEditor(rowObject , dialogExtractionCriteria)
{
	var tagsData   = rowObject["tags"];
    var startPos   = rowObject['dyn_FILE_MESSAGEVO.START_POS'];
    var identifier = rowObject['dyn_FILE_MESSAGEVO.IDENTIFIER'];
    var indexNo = rowObject['dyn_FILE_MESSAGEVO.INDEX_NO'];
    var identifierColor = rowObject['dyn_FILE_MESSAGEVO.IDENTIFIER_COLOR'];
    if(identifierColor == "" || identifierColor == undefined)
    {
    	identifierColor = '#d0e5f5';
    }
    
    var delimiter = $("#dynamicStructureFileDelimiter_"+_pageRef).val();
    if(delimiter.indexOf("{sp}") == 0)
    {
	   delimiter = delimiter.replace(/{sp}/g,' ');
    }
    var tagColor = "";
    var lines =  $('#dynamicTextEditorTagsDialog_'+_pageRef).find('.jqte_editor').text();
    var fullText = "";
    var tagsData = tagsData.split(",");
    var lineSelected = "";
	if(dialogExtractionCriteria == "DE")
	{
	    $("#fileSepratorDialogRow").show();
	    if(delimiter.indexOf("{sp}") == 0)
	    {
		delimiter = delimiter.replace(/{sp}/g,' ');
	    }
	    $("#dynamicStructureFileDialogDelimiter_"+_pageRef).val(delimiter);
	    var linesSplitedData = lines.split(delimiter);
	    var delimiterStatus = $("#delimiter-identifier").val();
	    if(delimiterStatus == "" || delimiterStatus == undefined)
	    {
			if(identifier.indexOf("Line") == -1)
			{
			    $("#delimiter-identifier").val("DE-IDENTIFIER");
			    delimiterStatus = "DE-IDENTIFIER";
			}
	    }
	    for(var j=0; j<linesSplitedData.length; j++)
	    {
	    	lineSelected = false;
			if(j == indexNo && delimiterStatus == "DE-IDENTIFIER")
			{
			    fullText+="<mark style='background-color:"+identifierColor+"'>"+linesSplitedData[j]+"</mark>";
			    lineSelected = true;
			}
			else
			{
			    for(var k=0; k<tagsData.length; k++)
			    {
					if(tagsData[k] != "")
					{
					    var tagsSplitData = tagsData[k].split(":");
					    if(j == tagsSplitData[2])
					    {
							if(tagsSplitData[5] == "" || tagsSplitData[5] == undefined)
							{
							    tagsSplitData[5] = '#d0e5f5';
							}
							fullText+="<mark style='background-color:"+tagsSplitData[5]+"'>"+linesSplitedData[j]+"</mark>";
							lineSelected = true;
							break;
					    }
					}
			    }
			}
			if(!lineSelected)
			{
			    fullText+="<mark style='background-color:#d0e5f5'>"+linesSplitedData[j]+"</mark>";
			}
			if(j < linesSplitedData.length-1){
			    fullText+=delimiter;
			}
		}
	    $('#dynamicTextEditorTagsDialog_'+_pageRef).find(".jqte_editor").html(fullText);
	}

}

/**
 * Highlight Tags when db click from tag Grid for Delimiter
 * @returns
 */
function TextEditorByDelimiter_HighlightTagsOfMainEditorOnDbClickFromTagGrid()
{
	 var dialogExtractionCriteria = $("#dialogExtractionCriteria").val();
	 if(dialogExtractionCriteria == "DE")
	 {
		 var delimiter = $("#dynamicStructureFileDelimiter_"+ _pageRef).val();
		 if(delimiter.indexOf("{sp}") == 0)
		 {
			 delimiter = delimiter.replace(/{sp}/g,' ');
		 }
		 var $table = $("#dynamicFileStructurTextTagListGridTbl_Id_" + _pageRef);
		 var selectedRowId = $table.jqGrid('getGridParam', 'selrow');
		 var myObject = $table.jqGrid('getRowData', selectedRowId);
	       
		 var lines = $(".jqte_editor").text().split("\n");
		 var fullText = "";
		 var actualFileSize = $("#fileSize").val();
		 if(actualFileSize == "" || actualFileSize == undefined)
		 {
			 $("#fileSize").val(lines.length);
		 }
		 for(var i=0; i<lines.length; i++)
		 {
			 if((lines[i] != "" || lines[i] != undefined) && i<$("#fileSize").val()-1)
			 {
		    	   	var lineSplitedData = lines[i].split(delimiter);
		    	   	for(var j=0; j<lineSplitedData.length; j++)
		    	   	{
		    	   		if(j == myObject['dyn_FILE_TAGVO.INDEX'])
		    	   		{
		    	   			fullText+="<mark style='background-color:"+myObject['dyn_FILE_TAGVO.COLOR']+"'>"+lineSplitedData[j]+"</mark>";
		    	   		}
		    	   		else
		    	   		{
		    	   			fullText+=lineSplitedData[j];
		    	   		}
		    	   		if(j < lineSplitedData.length-1){
		    	   			fullText+=delimiter;
		    	   		}
		    	   	}
		    	   	fullText+="\n";
			 }
			 else{
				 break;
			 }
		 }
		 $(".jqte_editor").html(fullText)
	 }  
}

/**
 * Highlight tags after Clicking color from colorpicker
 * @param id
 * @returns
 */
function TextEditorByDelimiter_HighlightTagsDialogEditorAfterSelectColorFromColorPicker()
{
    var tagColors = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','COLOR_VALUE');
    var lines = $("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").text();
    var indexNo = $("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('getCol','INDEX_NO');
    var fullText = "";
    var check = false;
	var delimiter = $("#dynamicStructureFileDialogDelimiter_"+_pageRef).val();

	if(delimiter.indexOf("{sp}") == 0)	
	{	
		delimiter = delimiter.replace(/{sp}/g,' ');
	}
	var lineSplitedData = lines.split(delimiter);
	for(var i=0; i<lineSplitedData.length; i++)
	{
		check = false;
		for(var j=0; j<indexNo.length; j++)
		{
			if(i == indexNo[j])
			{
				if(tagColors[j] == "" || tagColors[j] == undefined)
				{
					tagColors[j] = '#d0e5f5';
				}
				fullText+="<mark style='background-color:"+tagColors[j]+"'>"+lineSplitedData[i]+"</mark>";
				check = true;
				break;
			}
		}
		if(!check)
		{
			fullText+="<mark style='background-color:#d0e5f5'>"+lineSplitedData[i]+"</mark>";
		}
		if(i < lineSplitedData.length-1)
		{
			fullText+=delimiter;
		}
	}
	$("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").html(fullText);
	$("#dynamicTagsDetailDialogGrid_Id_"+_pageRef).jqGrid('resetSelection');
}

/**
 * function to highlight all tags after putting delimiter in Dilaog
 * @returns
 */
function TextEditorByDelimiter_processTagsAfterPuttingDelimiter()
{
    var lines = $("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").text();
    var delimiter = $("#dynamicStructureFileDialogDelimiter_"+_pageRef).val();
    if(delimiter != "" || delimiter != undefined)
    {
		var data = lines.split(delimiter);
		var fullText = "";
		for(var i=0; i<data.length; i++)
		{
		    fullText+="<mark style='background-color : #d0e5f5'>"+data[i]+"</mark>";
		    if(i < data.length-1)
		    {
		    	fullText+=delimiter;
		    }
		}
		
		$("#dynamicStructureFileSeprator_"+_pageRef).val(delimiter);
		delimiter = delimiter.replace(/ /g,"{sp}");
		$("#dynamicStructureFileDelimiter_"+_pageRef).val(delimiter);
		$("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").text("");
		$("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").html("");
		$("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").html(fullText);
    }
    else
    {
    	_showErrorMsg("Please Define Delimiter", info_msg_title,300, 100);
    }
}