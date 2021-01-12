<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<script type="text/javascript">

$.struts2_jquery.require("XmlEditor.js,DynamicFileStructureMaint.js,DynamicFileStructureList.js,FileEditors.js", null, jQuery.contextPath + "/path/js/imco/dynamicfiles/");
$.struts2_jquery.require("xonomy.js", null, jQuery.contextPath + "/path/js/imco/dynamicfiles/xonomy/");
$.struts2_jquery.require("CommonPwsMappingMaint.js", null, jQuery.contextPath+ "/path/js/imco/pwsmapping/");
</script>
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/path/js/imco/dynamicfiles/xonomy/xonomy/xonomy.css" />
<script type="text/javascript">
	$(document).ready(
		function() 
		{
			$.struts2_jquery.require("XmlEditor.js,DynamicFileStructureMaint.js,DynamicFileStructureList.js,FileEditors.js", null, jQuery.contextPath + "/path/js/imco/dynamicfiles/");
			$.struts2_jquery.require("xonomy.js", null, jQuery.contextPath + "/path/js/imco/dynamicfiles/xonomy/");
			$("#xmlEditor_"+_pageRef).hide();
			$("#textEditor_"+_pageRef).hide(); 
		}
	);
</script>

<style>
	#dynamicFileStructureListGridTbl_Id_${_pageRef} .ui-th-column, .ui-jqgrid .ui-jqgrid-htable th.ui-th-column
	{
		text-align: left;
	}
</style>
<ps:form id="webServiceGuiDefFormId_${_pageRef}" useHiddenProps="true" namespace="/path/WebserviceExplorer">
	<ps:hidden id="nameSpaceUri_${_pageRef}" name="webServiceExplorerCO.nameSpaceUri" />
	<ps:hidden id="nameSpacePrefix_${_pageRef}" name="webServiceExplorerCO.nameSpacePrefix" />
	<ps:hidden id="soapAction_${_pageRef}" name="webServiceExplorerCO.soapAction" />
	<ps:hidden id="wsdlUrl_${_pageRef}" name="webServiceExplorerCO.wsdlUrl" />
	<ps:hidden id="webServiceExplorerGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerGridUpdates" />
	<ps:hidden id="webServiceExplorerSubGridGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerSubGridUpdates" />	
	<ps:hidden id="webServiceExplorerMappingParams_${_pageRef}" name="webServiceExplorerCO.mappingJsonString" />	
	<ps:hidden id="webServiceExplorerHashMapSubGridGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerHashGridListUpdates" />	
	<ps:hidden id="application_name_desc_${_pageRef}" name="webServiceExplorerCO.applicationName" />	
	<ps:hidden id="webservice_name_desc_${_pageRef}" name="webServiceExplorerCO.webServiceName" />	
	<ps:hidden id="operation_name_lkp_desc_${_pageRef}" name="webServiceExplorerCO.operationName" />	
	<ps:hidden id="serviceDataId_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" />	
	<ps:hidden id="DATE_UPDATED_${_pageRef}" name="accesswebserviceCO.imcoPwsTmpltMasterVO.DATE_UPDATED" />	
	<ps:hidden id="webServiceExplorerGrid_${_pageRef}" name="webServiceExplorerGridParamCO.mainGridActionRef" />	
	<ps:hidden id="webServiceExplorerSubGrid_${_pageRef}" name="webServiceExplorerGridParamCO.subGridActionRef" />	
	<ps:hidden id="webServiceExplorerListGrid_${_pageRef}" name="webServiceExplorerGridParamCO.listSubGridRef" />	
	<ps:hidden id="webServiceExplorerHashGrid_${_pageRef}" name="webServiceExplorerGridParamCO.hashSubGridRef" />		
	<ps:hidden id="webServiceExplorerScreenNameSpace_${_pageRef}" name="webServiceExplorerGridParamCO.screenNameSpace" />
</ps:form>
		
	<ps:url id="urlDynamicFileStructureListGrid" escapeAmp="false" action="DynamicFileStructureListAction_loadDynamicFileStructureGrid" namespace="/path/fileStructure/">
	   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
	   <ps:param name="_pageRef" value="_pageRef"></ps:param>
	</ps:url>
	
	<psjg:grid
		id               ="dynamicFileStructureListGridTbl_Id_${_pageRef}"
		caption          =" "
	    href             ="%{urlDynamicFileStructureListGrid}"
	    dataType         ="json"
	    hiddengrid       ='%{iv_crud== "R"}'
		pager            ="true"
		sortable         ="true"
		filter           ="true"
		gridModel        ="gridModel"
		rowNum           ="5"
		rowList          ="5,10,15,20"
	    viewrecords      ="true"
	    navigator        ="true"
	    navigatorDelete  ="false"
	    navigatorEdit    ="false"
	    navigatorRefresh ="true"
	    navigatorAdd     ="false"
	    navigatorSearch  ="true"
	    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
	    altRows          ="true"
	    ondblclick       ="DynamicFileStructureList_onDbClickedEvent()"
	    addfunc          ="DynamicFileStructureList_onAddClicked"
	    autowidth		 ="true"
	    height			 ="125"
	    shrinkToFit      ="true" >
	    
	    <psjg:gridColumn id="DYNAMIC_FILE_STRUCTURE_ID" colType="number" name="dyn_FILE_STRUCTUREVO.FILE_STRUCTURE_ID" index="FILE_STRUCTURE_ID" title="FILE_STRUCTURE_ID" key="true" hidden="true" />
	    <psjg:gridColumn id="REFERENCE" colType="text" name="dyn_FILE_STRUCTUREVO.REFERENCE" index="dyn_FILE_STRUCTUREVO.REFERENCE" title="%{getText('file_reference_key')}" editable="false" sortable="true" search="true" width="20" />
	    <psjg:gridColumn id="DESCRIPTION" colType="text" name="dyn_FILE_STRUCTUREVO.DESCRIPTION" index="dyn_FILE_STRUCTUREVO.DESCRIPTION" title="%{getText('File_Description_key')}" editable="false" sortable="true" search="true" width="30" />
	    <psjg:gridColumn id="FILE_TYPE" colType="text" name="dyn_FILE_STRUCTUREVO.FILE_TYPE" index="dyn_FILE_STRUCTUREVO.FILE_TYPE" title="%{getText('FILE_TYPE_key')}" editable="false" sortable="true" search="true" width="20" />
	</psjg:grid>
	
	
	
	<div id="dynamicFileStructureMaintDiv_id_${_pageRef}"  class="connectedSortable ui-helper-reset" style="width:100%;">
	      <%@include file="DynamicFileStructureMaint.jsp"%>
	</div>
