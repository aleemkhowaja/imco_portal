
/**
 * function to reload grid after dependency
 */
function reloadParamGrid()
{
	var procArgGridId = $("#pwsGenerationParamTbl_Id_" + _pageRef);
	var postDataObj = procArgGridId.jqGrid("getGridParam","postData")
	var procedureName = $("#procedureName_" + _pageRef).val();
	var connectionName = $("#connDesc_"+_pageRef).val();
	var connectionId = $("#lookuptxt_connId_"+_pageRef).val();
	postDataObj["pwsGenerationSC.procedureName"] = procedureName;
	postDataObj["pwsGenerationSC.connId"] = connectionId;
	postDataObj["pwsGenerationSC.connName"] = connectionName;
	procArgGridId.jqGrid("setGridParam",{url:jQuery.contextPath+"/path/PWSGeneration/PWSGenerationProcParamList_loadProcedureArguments",postData:postDataObj}).trigger("reloadGrid");	
}