<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<style>

/*removing grid scrolbards*/
.ui-jqgrid .ui-jqgrid-bdiv {
	position: relative;
	margin: 0em;
	padding: 0;
	/*overflow: auto;*/
	overflow-x: hidden;
	overflow-y: auto;
	text-align: left;
}
</style>
<div id="webservice_gui_${_pageRef}" style="margin-right:10px;margin-top:18px;">

	<!-- Important form Used For Grid related hidden fields -->
	<ps:form id="webServiceGuiGridForm_${_pageRef}" useHiddenProps="true" namespace="/path/fileStructure">

	</ps:form>

	<ps:url id="webServiceGuiUrl" action="PWSWebMappingExplorerList_loadWSDLInfoGrid" namespace="/path/fileStructure" escapeAmp="false">
		<ps:param name="iv_crud" value="iv_crud" />
		<ps:param name="_pageRef" value="_pageRef" />
		<ps:param name="webServiceExplorerCO.operationName" value="webServiceExplorerCO.operationName" />
		<ps:param name="webServiceExplorerCO.applicationName" value="webServiceExplorerCO.applicationName" />
		<ps:param name="webServiceExplorerCO.webServiceName" value="webServiceExplorerCO.webServiceName" />
		<ps:param name="webServiceExplorerCO.requestType" value="webServiceExplorerCO.requestType" />		
		<ps:param name="webServiceExplorerCO.parentRowId" value="webServiceExplorerCO.parentRowId" />
		<ps:param name="webServiceExplorerCO.requestResponseCO.fieldType" value="webServiceExplorerCO.requestResponseCO.fieldType" />	
		<ps:param name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" value="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" />
		<ps:param name="webServiceExplorerCO.wsdlUrl" value="webServiceExplorerCO.wsdlUrl" />	
		<ps:param name="webServiceExplorerCO.adapterType" value="webServiceExplorerCO.adapterType" />
	</ps:url>
	
	<ps:url id="webServiceGuiSubGridUrl" action="PWSWebMappingExplorerList_loadSubGridInfo" namespace="/path/fileStructure" escapeAmp="false">
		<ps:param name="iv_crud" value="iv_crud" />
		<ps:param name="_pageRef" value="_pageRef" />
	</ps:url>
	
		<psjg:grid id="webServiceGuiTbl_Id_${_pageRef}"
			href="%{webServiceGuiUrl}"
			editurl="%{webServiceGuiUrl}"
			editinline="true" 
			dataType="json" 
			pager="false" 
			pagerButtons="false" 
			filter="true"
			gridModel="gridModel" 
			rowNum="50" 
			viewrecords="true" 
			navigator="true" 
			altRows="true"
			navigatorRefresh="false" 
			navigatorDelete="false" 
			navigatorEdit="false"
			navigatorAdd="false" 
			ondblclick="" 
			navigatorSearch="false"
			addfunc=""
			multiselect="true"
			onEditInlineBeforeTopics="onRowSelTopic"
			onGridCompleteTopics ="webServiceExplorerOnGridCompleteFn"
			autowidth="true"
			shrinkToFit="true"
			cssStyle="overflow:hidden;" 
		>
	
		<psjg:grid id="webServiceGuiSubGridTbl_Id_${_pageRef}"
			subGridUrl="" 
			gridModel="" 
			subGridOptions="{reloadOnExpand:false}"   
		>

		</psjg:grid>
		
		<psjg:gridColumn id="ID_${_pageRef}" colType="text" key="true"
			name="ID" index="ID" title="ID" editable="false" sortable="false"
			hidden="true"
			 />
			
		<psjg:gridColumn name="fieldName"
			title="%{getText('parameter_key')}" index="PARAMETER"
			colType="text" editable="false" sortable="false" search="false"
			id="PARAMETER_${_pageRef}"
			editoptions="{readonly: 'readonly', maxlength:'15'}"
			 />	
					 		
		<psjg:gridColumn name="fieldType"
			title="%{getText('type_key')}" index="TYPE"
			colType="text" editable="false" sortable="false" search="false"
			id="TYPE_${_pageRef}" />
			
		<psjg:gridColumn name="precision"
			title="%{getText('precision_key')}" index="PRECISION"
			colType="text" editable="false" sortable="false" search="false"
			id="PRECISION_${_pageRef}"
			editoptions="{readonly: 'readonly', maxlength:'15'}"
			 />	
			 
		<psjg:gridColumn name="mandatory"
			title="%{getText('mandatory_key')}" index="MANDATORY" colType="text"
			editable="false" sortable="false" search="false"
			id="MANDATORY_${_pageRef}" 	hidden="true"/>
			
	
		<psjg:gridColumn id="VALUE_${_pageRef}"
				title="%{getText('value_key')}" index="VALUE" 
				colType="text"
				name="value"
				editable="true" 
				sortable="false" 
				search="false"
				required="false"
				/>				
						
		<psjg:gridColumn name="hasChildren"
			title="%{getText('hasChildren_key')}" index="HASCHILDREN" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="HASCHILDERN_${_pageRef}" />
		
		<psjg:gridColumn name="embeddedTypeEnumParent"
			title="%{getText('embedded_Type_Enum_Parent_key')}" index="EMBEDEDTYPEENUMPARENT" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="EMBEDEDTYPEENUMPARENT_${_pageRef}" />
			
		<psjg:gridColumn name="hasRestriction"
			title="%{getText('has_restrictions_key')}" index="HASRESTRICTION" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="HASRESTRICTION_${_pageRef}" />
								
		<psjg:gridColumn name="gridColumnID"
			title="%{getText('gridcolumnid_key')}" index="GRIDCOLUMNID" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="GRIDCOLUMNID_${_pageRef}" />	
			
		<psjg:gridColumn name="parent_row_id"
			title="%{getText('parent_row_id_key')}" index="PARENT_ROW_ID" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="PARENT_ROW_ID_${_pageRef}" />	
			
		<psjg:gridColumn name="wsdlUrl"
			title="%{getText('wsdlUrl_key')}" index="WSDLURL" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="WSDLURL_${_pageRef}" />
			
		<psjg:gridColumn name="nameSpaceUri"
			title="%{getText('nameSpaceUri_key')}" index="NAMESPACEURI" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="NAMESPACEURI_${_pageRef}" />
		
		<psjg:gridColumn name="soapAction"
			title="%{getText('soap_action_key')}" index="SOAPACTION" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="SOAPACTION_${_pageRef}" />			
			
		<psjg:gridColumn name="loadSubGrid"
			title="%{getText('load_sub_grid_key')}" index="LOADSUBGRID" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="LOADSUBGRID_${_pageRef}" />
			
		<psjg:gridColumn name="nillable"
			title="%{getText('nillable_key')}" index="NILLABLE" colType="text"
			editable="false" sortable="false" search="false"
			hidden="true"
			id="NILLABLE_${_pageRef}" />
			
	</psjg:grid>
 
</div>

<script type="text/javascript">	

// 		$.struts2_jquery.require("WebServiceExplorerList.js,WebServiceExplorerMaint.js" ,null,jQuery.contextPath+"/path/js/proc/webserviceexplorer/");	

		$("#webServiceGuiTbl_Id_"+_pageRef).subscribe("webServiceExplorerOnGridCompleteFn",function(event,data){
			webServiceExplorerOnGridCompleteFn(event,data);});
	
		$("#webServiceGuiTbl_Id_"+_pageRef).subscribe("onRowSelTopic",function(rowObj){
			onRowSelTopic(rowObj);});
		
		$("#webServiceGuiTbl_Id_"+_pageRef).subscribe("onRowSubSelTopic",function(rowObj){
			onRowSubSelTopic(rowObj);});
		
		$("#webServiceGuiTbl_Id_"+_pageRef).subscribe("onSubGridCompleteFn",function(event,data){
			onSubGridCompleteFn(event,data);});

		$(function(){
			$("#jqgh_webServiceGuiTbl_Id_"+_pageRef+"_cb").hide();
		});
		
</script>