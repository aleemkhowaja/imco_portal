<!-- User Story #740995 PWS generation From DB Apiedure -screen -->

<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<div id="pws_generation_searchGrid_${_pageRef}">
	<ps:url id="pws_geration_Api_Url_searchGrid" action="PWSGenerationMainList_loadRecordData" namespace="/path/PWSGeneration" escapeAmp="false">
		<ps:param name="iv_crud" value="iv_crud" />
		<ps:param name="_pageRef" value="_pageRef" />
	</ps:url>
	<psjg:grid id="pws_geration_Api_Id_searchGrid_${_pageRef}"
			href="%{pws_geration_Api_Url_searchGrid}"
			editurl="%{pws_geration_Api_Url_searchGrid}"
			editinline="false" 
			dataType="json" 
			pager="true" 
			pagerButtons="true"
			filter="true"
			gridModel="gridModel" 
			rowNum="50" 
			viewrecords="true" 
			altRows="false"
			ondblclick="pwsGeneration_onDbClickedEvent(this)"
		    navigatorSearch="false"
			multiselect="false"
			autowidth="true"
			shrinkToFit="true"
			cssStyle="overflow:hidden;"
		>
		<psjg:gridColumn id="ID_${_pageRef}" colType="text" key="true"
			name="ID" index="ID" title="ID" editable="false" sortable="false"
			hidden="true"
			 />
		
		<psjg:gridColumn name="OPERATION_ID"
			title="%{getText('operationId_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false" 
			id="OPERATION_ID_${_pageRef}"
			 />	
			 
		<psjg:gridColumn name="APP_NAME"
			title="%{getText('appName_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false"
			id="APP_NAME_${_pageRef}"
			 />	
	
		<psjg:gridColumn name="BUSINESS_AREA"
			title="%{getText('businessArea_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false" hidden="true"
			id="BUSINESS_AREA_${_pageRef}"
			 />	
			 
			 	<psjg:gridColumn name="BUSINESS_DOMAIN"
			title="%{getText('businessDomain_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false" hidden="true"
			id="BUSINESS_DOMAIN_${_pageRef}"
			 />	
			 
			 	<psjg:gridColumn name="SERVICE_DOMAIN"
			title="%{getText('serviceDomain_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false" hidden="true"
			id="SERVICE_DOMAIN_${_pageRef}"
			 />	
			 
			 	<psjg:gridColumn name="VERSION"
			title="%{getText('version_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false" hidden="true"
			id="VERSION_${_pageRef}"
			 />	
			 
			 	<psjg:gridColumn name="SERVICE_ID"
			title="%{getText('serviceId_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false" hidden="true"
			id="SERVICE_ID_${_pageRef}"
			 />	
			 
			 	<psjg:gridColumn name="OPERATION_NAME"
			title="%{getText('operationName_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false" 
			id="OPERATION_NAME_${_pageRef}"
			 />	
			 
			 	<psjg:gridColumn name="SERVICE_NAME"
			title="%{getText('serviceName_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false"
			id="SERVICE_NAME_${_pageRef}"
			 />	
			 
			 	<psjg:gridColumn name="MAPPED_TO"
			title="%{getText('mappedTo_key')}" index="PARAMETER"
			colType="text" editable="true" sortable="false" search="false"
			id="MAPPED_TO_${_pageRef}"
			 />	
	</psjg:grid>
</div>
<div id="pwsGenerationMaint_div_id_${_pageRef}" class="collapsibleContainer">
<ps:form id="pwsGenerationDefFormId_${_pageRef}" useHiddenProps="true" namespace="/path/PWSGeneration">
		<ps:hidden id="iv_crud_${_pageRef}"  name="iv_crud"></ps:hidden>
		<ps:hidden id="pwsGenerationRecordUpdates_${_pageRef}" name="pwsGenerationCO.pwsGenerationRecordUpdates" />
		<ps:hidden id="pwsGenerationOperationId_${_pageRef}" name="pwsGenerationCO.pwsOperationVO.OPERATION_ID" />
		<ps:hidden id="connDesc_${_pageRef}" name="pwsGenerationCO.connDesc" />
		<ps:hidden id="statusId_${_pageRef}"  name="pwsGenerationCO.pwsOperationVO.STATUS"></ps:hidden>
	<ps:if test='iv_crud == "R"'>  
		<%@include file="PWSGenerationMaint.jsp"%>
	</ps:if>
</ps:form>
</div>
<script>
	$.struts2_jquery.require("PWSGenerationMainList.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");	
	$(function() {
		//$("#pws_geration_Api_Id_searchGrid_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
		$("#pws_generation_searchGrid_DBLPWSPROCMT").hide();
		
		var gridId = "pws_geration_Api_Id_searchGrid_"+_pageRef;
		var fn = "pwsGeneration_showHideGrid('pws_generation_searchGrid_"+_pageRef+"')";
		$("#infoBarSearchButton_"+_pageRef).attr('onclick',fn);
	});
	
</script>