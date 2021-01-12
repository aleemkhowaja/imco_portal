<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<%@taglib uri="/path-struts-jquery-tree-tags" prefix="psjt" %>

<div id="webServiceGuiTree_Div_${_pageRef}" style="padding-top:2%;height: 95%;margin-top:10px;margin-right:1px;">  
	
	<table border="0" width="100%" cellpadding="0">
		<tr>
		</tr>
		<tr>
		<td width="100%">
			<ps:url id="getWebServicesTreeData"
				action="WebServiceExplorerTree_loadWsdlWebServicesTree" 
				namespace="/path/common/WebserviceExplorer"
				escapeAmp="false">
				 <ps:param name="iv_crud"  value="%{iv_crud}"></ps:param>
				 <ps:param name="webServiceExplorerCO.wsdlUrl"  value="%{wsdl}"></ps:param>
				 <ps:param name="webServiceExplorerCO.adapterType"  value="%{adapterType}"></ps:param> 
				 <ps:param name="webServiceExplorerCO.bpelFileName"  value="%{bpelFileName}"></ps:param> 
			</ps:url>
			<psjt:tree id="webServiceChartTree_Explorer_%{_pageRef}" 
				openAllOnLoad="true"
				checkbox="true" 
				showThemeDots="true" 
				showThemeIcons="false" 
				jstreetheme="apple"
				href="%{getWebServicesTreeData}"
				onClickTopics = "treeClicked"
				afterNodeCheckUncheckedTopic="afterWebServiceNodeCheckUnchecked_%{_pageRef}"
				onSuccessTopics="onSuccessWebServiceTopics_%{_pageRef}">
			</psjt:tree>
			<!-- onClickTopics="branchTreeClicked"  -->
			</td>
		</tr>
	</table>

</div>

<script>
$("#webServiceChartTree_Explorer_"+_pageRef).subscribe("afterWebServiceNodeCheckUnchecked_"+_pageRef,function(event){	
	// then handle the branches changes
	afterWebServiceNodeCheckUnchecked(event);
});

$("#webServiceChartTree_Explorer_"+_pageRef).subscribe("onSuccessWebServiceTopics_"+_pageRef,function(event){	
	// prepare selected branches Object
	onSuccessWebServiceTopics(event);
});

$("#webServiceChartTree_Explorer_"+_pageRef).subscribe("treeClicked"+_pageRef,function(event){ 
	console.log("id: " + event.originalEvent.data.rslt.obj.attr('id'));
	console.log("nodeCode: " + event.originalEvent.data.rslt.obj.attr('nodeCode'));
	onTreeClicked(event);
});
</script>