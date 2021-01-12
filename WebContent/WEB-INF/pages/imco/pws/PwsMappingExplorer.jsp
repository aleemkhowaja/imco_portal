<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<%@taglib uri="/path-struts-jquery-tree-tags" prefix="psjt" %>

<div id="webServiceGuiTree_Div_${_pageRef}">  
	<table border="0" width="100%" cellpadding="0">
		<tr>
			<td valign="top">
				<div style="width:250px;height:320px; overflow-x:hidden;overflow-y:scroll;">
					<ps:url id="getWebServicesTreeData"
						action="WebServiceExplorerTree_loadWebServicesTree" namespace="/path/WebserviceExplorer"
						escapeAmp="false">
						 <ps:param name="iv_crud"  value="%{iv_crud}"></ps:param> 
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
						onSuccessTopics="onSuccessWebServiceTopics_%{_pageRef}"
						>
					</psjt:tree>
				</div>
			</td>
			<td valign="top">
				<div id="mappingServiceGuiGrid_${_pageRef}" style="height:320px;width:641px;overflow-y:auto;overflow-x: hidden;">  
					<%--@include file="WebServiceExplorerList.jsp"--%>
				</div>
			</td>
		</tr>
	</table>

</div>

<script>
$("#webServiceChartTree_Explorer_"+_pageRef).subscribe("afterWebServiceNodeCheckUnchecked_"+_pageRef,function(event){	
	// then handle the branches changes
	afterPwsMappingServiceNodeCheckUnchecked(event);
});

$("#webServiceChartTree_Explorer_"+_pageRef).subscribe("onSuccessWebServiceTopics_"+_pageRef,function(event){	
	// prepare selected branches Object
	onSuccessWebServiceTopics(event);
});

$("#webServiceChartTree_Explorer_"+_pageRef).subscribe("treeClicked"+_pageRef,function(event){ 
	console.log("id: " + event.originalEvent.data.rslt.obj.attr('id'));
	console.log("nodeCode: " + event.originalEvent.data.rslt.obj.attr('nodeCode'));
	afterWebServiceNodeCheckUnchecked(event);
});

</script>