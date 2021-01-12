/**
 * function for show context menues on Dialog Editor for precision
 */
function TextEditorByPrecision_showOptionsDialog()
{
	var menu = [];
	var dialogSelectedText = $("#dialogSelectedText").val();
	
    if(dialogSelectedText != "")
    {
		var messageType = $("#messageType_"+_pageRef).val();
		if(messageType != "Identifier")
		{
		    menu.push({
			name: 'Add Identifier',
			img: '../common/images/add_page.png',
			title: 'Add Identifier',
			fun: function () {
				dynamicStructureData_addIdentifierAndTagsInGridAfterClickContextMenu("identifier");
			}
		    });
		}
	
		menu.push({name: 'Add Tag',
		    img: '../common/images/add_page.png',
		    title: 'New Message',
		    fun: function () {
		    	dynamicStructureData_addIdentifierAndTagsInGridAfterClickContextMenu("tag");
		    }
		});
    }
    else
    {
    	_showErrorMsg("Please Select Text", info_msg_title,300, 100);
    }
    return menu;
}


/**
 * Process General Message Precision Text on the time of Close Dialog 
 * @param level
 * @param messageGridSelectedRowId
 * @returns
 */
function TextEditorByPrecision_processPrecisionWithGeneralMessageDialogData(level, messageGridSelectedRowId)
{
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
//	/selectedText_
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
    	tags = "";
    	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('addInlineRow',{'dyn_FILE_MESSAGEVO.MESSAGE_TYPE':"General Message" , 'dyn_FILE_MESSAGEVO.IDENTIFIER':" ",'dyn_FILE_MESSAGEVO.INDEX_NO':selectedTextIndex});
    }
    for (var i=0; i<tagNames.length; i++)
    {
	if(rowCount != undefined){
	    ++rowCount;
	}
	else
	{
	    rowCount = 1;
	}
	if(tagIds[i] != "" && tagIds[i] != undefined)	
	{
 	   	rowCount = tagIds[i];
    }
	if(tags == undefined)
	{
		tags = "";
	}
	tags +=rowCount+":"+tagNames[i]+":"+startPos[i]+":"+selectedTextIndex+":"+tagLength[i]+":"+tagColor[i]+":"+tagValue[i]+": "+" : "+",";
	if(level == 'update')
	{
		$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'tags',tags);
		$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'IsUpdate',"yes"+rowCount);
	}
	else
	{
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
 * Process Identifier Precision Text on the time of Close Dialog 
 * @param level
 * @param messageGridSelectedRowId
 * @returns
 */
function TextEditorByPrecision_processPrecisionWithIdentifierDialogData(level, messageGridSelectedRowId)
{
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
//	/selectedText_
    var $table = $("#dynamicFileStructurTextMessageListGridTbl_Id_" + _pageRef);
    var messageGridSelectedRowId = $table.jqGrid('getGridParam', 'selrow');
    if(setSelectedRow == undefined || setSelectedRow == "")
    {
	var messageGridSelectedRowObject = $table.jqGrid('getRowData', messageGridSelectedRowId);
	setSelectedRow   = messageGridSelectedRowObject['dyn_FILE_MESSAGEVO.MESSAGE_SAMPLE'];
    }
    
    var tags = "";
    var rowCount = messages.length;

    for (var i=0; i<tagNames.length; i++)
    {
	if(tagType[i] == "Id")
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
        	if(tags == undefined || tags == "")
        	{
        	    
        	}
               	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('addInlineRow',{'dyn_FILE_MESSAGEVO.MESSAGE_TYPE':textType[i] , 'dyn_FILE_MESSAGEVO.IDENTIFIER':tagNames[i],'dyn_FILE_MESSAGEVO.INDEX_NO':selectedTextIndex,'dyn_FILE_MESSAGEVO.START_POS':startPos[i],'dyn_FILE_MESSAGEVO.IDENTIFIER_COLOR' : tagColor[i]});
               	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+(++rowCount));
            }
            else
            {
      		$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'dyn_FILE_MESSAGEVO.IDENTIFIER_COLOR',tagColor[i]);
            }
        }
        else 
        {
            if(rowCount != undefined){
            	++rowCount;
            }
            else
            {
            	rowCount = 1;
            }
            
            if(tagIds[i] != "" && tagIds[i] != undefined)	
            {
    	    	rowCount = tagIds[i];
            }
            if(tags == undefined)
            {
    	    	tags = "";
            }
            tags +=rowCount+":"+tagNames[i]+":"+startPos[i]+":"+selectedTextIndex+":"+tagLength[i]+":"+tagColor[i]+":"+tagValue[i]+": "+" : "+",";
            if(level == 'update')
            {
        	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'tags',tags);
        	$("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('setCellValue',messageGridSelectedRowId,'IsUpdate',"yes"+rowCount);
            }
            else
            {
        	var row = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).find("tr").last();
        	row.find("td:nth-child(8)").text(tags);
            }
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
 * function to set tags in Tag Grid After DB Click on Message Grid.
 * @param messageGridSelectedRowObject
 * @param messageType
 * @returns
 */
function TextEditorByPrecision_setTagsInTagGrid(messageGridSelectedRowObject, messageType)
{
	var tagsData = messageGridSelectedRowObject["tags"].split(",");
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
			$("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).jqGrid('addInlineRow',{'dyn_FILE_TAGVO.TAGS_ID':tagsData[i][0],'dyn_FILE_TAGVO.TAG_NAME':tagsData[i][1],'dyn_FILE_TAGVO.START_POS':tagsData[i][2],'dyn_FILE_TAGVO.TAG_LENGTH':tagsData[i][4],'TAG_LINE':tagsData[i][3],'dyn_FILE_TAGVO.COLOR':tagsData[i][5],'dyn_FILE_TAGVO.TAG_VALUE':tagsData[i][6],'TAG_MESSAGE_TYPE':messageType});
			$("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).find(">tbody>tr.jqgrow").filter(":last").attr('id', 'newid_'+i);
				
			var row = $("#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef).find("tr").last();
			var tagsDetailColorPicker =   "<input title='Highlight Color' id='tags-details-color-picker' value='"+tagsData[i][5]+"'  type='color' onchange='dynamicStructureData_changeTagsColorAndMainEditorHighlightColor(this);'  >";
			row.find("td:nth-child(10)").html(tagsDetailColorPicker);
	    }
	}
}

/**
 * function to Highlight Precision Identifier of main Editor
 * @param rowObject
 * @param dialogExtractionCriteria
 * @returns
 */
function TextEditorByPrecision_highlightPrecisionIdentifier(rowObject, dialogExtractionCriteria)
{
    var startPos   	= 	rowObject['dyn_FILE_MESSAGEVO.START_POS'];
    var identifier 	= 	rowObject['dyn_FILE_MESSAGEVO.IDENTIFIER'];
    var identifierColor = 	rowObject['dyn_FILE_MESSAGEVO.IDENTIFIER_COLOR'];
    var messageType 	= 	rowObject['dyn_FILE_MESSAGEVO.MESSAGE_TYPE'];
    var lines 		= 	$(".jqte_editor").text().split("\n");
    var tagsData   	= 	rowObject["tags"];
    tagsData 	=       tagsData.split(",");
    var messageIdentifiers = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.IDENTIFIER');
    var messageTypes = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.MESSAGE_TYPE');
    var startPositions = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.START_POS');
    var indexNos = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.INDEX_NO');
    var identifiers = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.IDENTIFIER');
    
    var actualFileSize = $("#fileSize").val();
    if(actualFileSize == "" || actualFileSize == undefined)
    {
	$("#fileSize").val(lines.length);
    }
    var fullText = "";
    for(var i=0; i<lines.length-1; i++)
    {
		if((lines[i] != "" || lines != undefined) && i < $("#fileSize").val()-1)
		{
		    var line = $.trim(lines[i]);
		    if(messageType == "Identifier")
		    {
				if($.trim(lines[i]).substring(startPos,identifier.length) == identifier)
				{
				    var tagTdentifier = "";
				    if(identifierColor != "" && identifierColor != undefined)
				    {
						if(identifierColor == "" || identifierColor == undefined)
						{
						    identifierColor = '#d0e5f5';
						}
						tagIdentifier = "<mark style='background-color:"+identifierColor+"'>"+identifier+"</mark>";
						var tags = $.trim(lines[i]).substring(parseInt(startPos)+parseInt(identifier.length), $.trim(lines[i]).length);
						fullText+=(tagIdentifier+tags)
				    }
				    else
				    {
				    	fullText+=$.trim(lines[i]);
				    }
				}
				else
				{
				    fullText += $.trim(lines[i]);
				}
		    }
		    else if(messageType == "General Message")
		    {
			   lineSelected = true;
			   for(var j=0; j<messageIdentifiers.length; j++)
			   {
			       if(messageTypes[j] == "Identifier")
			       {
					   var proccessIdentifier = line.substring(startPositions[j],messageIdentifiers[j].length);
					   if(messageIdentifiers[j] == proccessIdentifier)
					   {
					       lineSelected = false;
					       break;
					   }
			       }
			    }
			   if(lineSelected)
			   {
			       var tagStartPos = 0;
			       var tagLength = 0;
			       var tag = "";
			       var k=0
			       for(; k<line.length; k++)
			       {
					   lineSelected = false;
					   for(var j=0; j<tagsData.length; j++)
					   {
					       var tagsSplitData = tagsData[j].split(":");
					       tagStartPos = tagsSplitData[2];
					       tagLength = tagsSplitData[4];
					       if (k == tagStartPos) 
					       {
							   lineSelected = true;
							   tagColor = tagsSplitData[5];
							   tag = line.substring(tagStartPos,parseInt(tagStartPos)+ parseInt(tagLength));
							   break;
					       }
					    }
					    if(lineSelected)
					    {
							if(tagColor == "" || tagColor == undefined)
							{
							    //tagColor = '#d0e5f5';
								fullText += tag;
							}
							else
							{
								fullText+="<mark style='background-color:"+tagColor+"'>"+tag+"</mark>";
							}
							k = parseInt(tagStartPos)+parseInt(tagLength-1);
					    }
					    else
					    {
						    fullText+=line[k]; 
					    }
			       }
			   }
			   else
			   {
			       fullText+=line;
			   }
		    }
		    fullText+="\n";
		}
    }
    $(".jqte_editor").html(fullText);
}

/**
 * 
 * @param tableId
 * @returns
 */
function  TextEditorByPrecision_highlightMainAndDialogTagsAfterClickTagGrid(tableId, fromScreen)
{
    var selectedRowId 	=     $(tableId).jqGrid('getGridParam','selrow');
    var $table 		=     $(tableId);
    var tagObject 	=     $table.jqGrid('getRowData', selectedRowId);
    var messageType = $("#messageType_"+_pageRef).val();
    var dialogExtractionCriteria = $("#dialogExtractionCriteria").val();
    var fullText = "";
    if(dialogExtractionCriteria == "PR")
    {
		var lines = "";
		
		if(tableId == "#dynamicFileStructurTextTagListGridTbl_Id_"+_pageRef)
		{
		    var  identifier = $("#identifier").val();
		    var  identifierStartPos = $("#identifierStartPosition").val();
		    var  tagStartPos = tagObject['dyn_FILE_TAGVO.START_POS'];
		    var  tagLength = tagObject['dyn_FILE_TAGVO.TAG_LENGTH'];
		    var  tagColor = tagObject['dyn_FILE_TAGVO.COLOR'];
		    var  messageType = tagObject['TAG_MESSAGE_TYPE'];
		    
		    var messageTypes = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.MESSAGE_TYPE');
		    var startPositions = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.START_POS');
		    var indexNos = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.INDEX_NO');
		    var identifiers = $("#dynamicFileStructurTextMessageListGridTbl_Id_"+_pageRef).jqGrid('getCol','dyn_FILE_MESSAGEVO.IDENTIFIER');
		    
		    if(tagColor == "" || tagColor == undefined)
		    {
		    	tagColor = '#d0e5f5';
		    }
		    if(fromScreen != "" && fromScreen != undefined && fromScreen == "afterDelete")
		    {
		    	tagColor = "";
		    }
		    var actualFileSize = $("#fileSize").val();
		    lines = $(".jqte_editor").text().split("\n");
		    for(var i=0; i<lines.length-1; i++)
		    {
				if(lines[i] != "" || lines != undefined)
				{
				    if(messageType == "Identifier")
				    {
					if(lines[i].substring(identifierStartPos,identifier.length) == identifier)
					{
					    var beforeTag= lines[i].substring(0, tagStartPos);
					    var tag = lines[i].substring(tagStartPos,  parseInt(tagStartPos)+ parseInt(tagLength));
					    var afterTag = lines[i].substring(parseInt(tagStartPos)+parseInt(tagLength), lines[i].length);
					    fullText+= beforeTag+"<mark style='background-color:"+tagColor+"'>"+tag+"</mark>"+afterTag;
					}
					else
					{
					    fullText+=lines[i];
					}
				    }
				    else
				    {
					for(var j=0; j<messageTypes.length; j++)
					{
					    var isIdentifier = false;
					    if(messageTypes[j] == "Identifier")
					    {
						if(lines[i].substring(startPositions[j],identifiers[j].length) == identifiers[j])
						{
						    isIdentifier = true;
						    break;
						}
					    }
					}
					if(isIdentifier)
					{
					    fullText+=lines[i];
					}
					else
					{
					    var beforeTag= lines[i].substring(0, tagStartPos);
					    var tag = lines[i].substring(tagStartPos,  parseInt(tagStartPos)+ parseInt(tagLength));
					    var afterTag = lines[i].substring(parseInt(tagStartPos)+parseInt(tagLength), lines[i].length);
					    fullText+= beforeTag+"<mark style='background-color:"+tagColor+"'>"+tag+"</mark>"+afterTag;
					}
				    }
				    fullText+="\n";	
				}
		    }
		    $(".jqte_editor").html(fullText);
		}	
		else if(tableId == "#dynamicTagsDetailDialogGrid_Id_"+_pageRef)
		{
		    var startPos =  tagObject["STR_POS"];
		    var tagLength = tagObject["TAG_LEN"];
		    var tagColor =  tagObject["COLOR_VALUE"];
		    if(tagColor == "" || tagColor == undefined)
		    {
		    	tagColor = '#d0e5f5';
		    }
		    if(fromScreen != "" && fromScreen != undefined && fromScreen == "afterDelete")
		    {
		    	tagColor = "";
		    }
		    lines = $("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").text();
		    
		    for(var i =0; i<lines.length; i++)
		    {
			if(i == startPos && tagColor != "" && tagColor != undefined)
			{
			    var msgTag = "<mark style='background-color:"+tagColor+"'>"+lines.substring(parseInt(startPos),(parseInt(startPos)+parseInt(tagLength)))+"</mark>";
			    fullText+=msgTag;
			    i = (parseInt(startPos)+parseInt(tagLength))-1;
			}
			else
			{
			    fullText+=lines[i];
			}
		    }
		    $("#dynamicTextEditorTagsDialog_"+_pageRef).find(".jqte_editor").html(fullText);
		}
    }
}