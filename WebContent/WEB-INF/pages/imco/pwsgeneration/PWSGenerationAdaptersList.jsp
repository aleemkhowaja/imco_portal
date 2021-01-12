<!-- User Story #740995 PWS generation From DB Apiedure -screen -->

<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<div id="pws_generation_searchGrid_${_pageRef}">
	<ps:url id="pws_geration_Api_Url_searchGrid"
		action="PWSGenerationAdaptersList_loadAdapterListData"
		namespace="/path/PWSGeneration" escapeAmp="false">
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
		cssStyle="overflow:hidden;">
		
		<psjg:gridColumn id="ID_${_pageRef}" colType="text" key="true"
			name="ID" index="ID" title="ID" editable="false" sortable="false"
			hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.ADAPTER_ID"
			title="%{getText('adapter_id_key')}" index="ADAPTER_ID"
			colType="text" editable="true" sortable="false" search="true"
			id="ADAPTER_ID_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.APP_NAME" title="%{getText('app_name')}"
			index="APP_NAME" colType="text" editable="true" sortable="false"
			search="true" id="APP_NAME_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.BUSINESS_AREA"
			title="%{getText('business_area')}" index="BUSINESS_AREA"
			colType="text" editable="true" sortable="false" search="true"
			id="BUSINESS_AREA_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.SERVICE_DOMAIN"
			title="%{getText('service_domain')}" index="SERVICE_DOMAIN"
			colType="text" editable="true" sortable="false" search="true"
			id="SERVICE_DOMAIN_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.VERSION" title="%{getText('version')}"
			index="VERSION" colType="text" editable="true" sortable="false"
			search="true" id="VERSION_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.SERVICE_ID" title="%{getText('service_id')}"
			index="SERVICE_ID" colType="text" editable="true" sortable="false"
			search="true" id="SERVICE_ID_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.OPERATION_NAME"
			title="%{getText('operation_name')}" index="OPERATION_NAME"
			colType="text" editable="true" sortable="false" search="true"
			id="OPERATION_NAME_${_pageRef}" />

		<psjg:gridColumn name="dgtlAdapterVO.SERVICE_NAME"
			title="%{getText('service_name')}" index="SERVICE_NAME"
			colType="text" editable="true" sortable="false" search="true"
			id="SERVICE_NAME_${_pageRef}" />

		<psjg:gridColumn name="dgtlAdapterVO.ADAPTER_TYPE"
			title="%{getText('adapter_type_key')}" index="ADAPTER_TYPE"
			colType="text" editable="true" sortable="false" search="true"
			id="ADAPTER_TYPE_${_pageRef}" />

		<psjg:gridColumn name="dgtlAdapterVO.STATUS" title="%{getText('status_key')}"
			index="STATUS" colType="text" editable="true" sortable="false"
			search="true" id="STATUS_${_pageRef}" />

		<psjg:gridColumn name="dgtlAdapterVO.API_NAME" title="%{getText('api_name_key')}"
			index="API_NAME" colType="text" editable="true" sortable="false"
			search="true" id="API_NAME_${_pageRef}" />

		<psjg:gridColumn name="dgtlAdapterVO.CONN_ID" title="%{getText('conn_id_key')}"
			index="CONN_ID" colType="text" editable="true" sortable="false"
			search="true" id="CONN_ID_${_pageRef}" />

		<psjg:gridColumn name="dgtlAdapterVO.DATE_UPDATED"
			title="%{getText('date_updated_key')}" index="DATE_UPDATED"
			colType="text" editable="true" sortable="false" search="true"
			id="DATE_UPDATED_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.CREATED_BY"
			title="%{getText('created_by_key')}" index="CREATED_BY"
			colType="text" editable="true" sortable="false" search="true"
			id="CREATED_BY_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.UPDATED_BY" title="%{getText('update_by_key')}"
			index="UPDATED_BY" colType="text" editable="true" sortable="false"
			search="true" id="UPDATED_BY_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.CREATED_DATE"
			title="%{getText('created_date_key')}" index="CREATED_DATE"
			colType="text" editable="true" sortable="false" search="true"
			id="CREATED_DATE_${_pageRef}" hidden="true" />

		<psjg:gridColumn name="dgtlAdapterVO.UPDATED_DATE"
			title="%{getText('updated_date_key')}" index="UPDATED_DATE"
			colType="text" editable="true" sortable="false" search="true"
			id="UPDATED_DATE_${_pageRef}" hidden="true" />

	</psjg:grid>
</div>
<ps:form id="pwsGenerationDefFormId_${_pageRef}" useHiddenProps="true"
		namespace="/path/PWSGeneration">
		<ps:hidden id="iv_crud_${_pageRef}" name="iv_crud"></ps:hidden>
		<ps:hidden id="pwsGenerationRecordUpdates_${_pageRef}" name="pwsGenerationCO.pwsGenerationRecordUpdates" />
		<ps:hidden id="pwsGenerationAdapterId_${_pageRef}" name="pwsGenerationCO.dgtlAdapterVO.ADAPTER_ID" />
		<ps:hidden id="connDesc_${_pageRef}" name="pwsGenerationCO.connDesc" />
		<ps:hidden id="statusId_${_pageRef}" name="pwsGenerationCO.dgtlAdapterVO.STATUS"></ps:hidden>

		<div id="pwsGenerationMaint_div_id_${_pageRef}" class="collapsibleContainer">
	
			<ps:if test='iv_crud == "R"'>
				<%@include file="PWSGenerationMaint.jsp"%>	
			</ps:if>
		</div>
</ps:form>
	
<script>
	$.struts2_jquery.require("PWSGenerationAdaptersList.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");	
	$(function() {
		//$("#pws_geration_Api_Id_searchGrid_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
		$("#pws_generation_searchGrid_DBLPWSPROCMT").hide();
		
		var gridId = "pws_geration_Api_Id_searchGrid_"+_pageRef;
		var fn = "pwsGeneration_showHideGrid('pws_generation_searchGrid_"+_pageRef+"')";
		$("#infoBarSearchButton_"+_pageRef).attr('onclick',fn);
	});
	
</script>