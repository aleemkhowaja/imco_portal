<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
	<!-- 740998 - PWS generation From BPEL(applying common files instead of local) -->

<tr role="row" class="ui-subgrid">
	<!-- <td colspan="1">&nbsp;</td> -->

	<td class="ui-widget-content subgrid-cell"><span class="ui-icon ui-icon-carat-1-sw"></span>
	</td>
	<td colspan="5" class="ui-widget-content subgrid-data">

	<ps:url id="webServiceGuiSubGridUrl" action="PWSWebServiceExplorerList_loadSubGridInfo" namespace="/path/WebserviceExplorer" escapeAmp="false">
		<ps:param name="iv_crud" value="iv_crud" />
		<ps:param name="_pageRef" value="_pageRef" />
		<ps:param name="webServiceExplorerCO.operationName" value="webServiceExplorerCO.operationName" />
		<ps:param name="webServiceExplorerCO.applicationName" value="webServiceExplorerCO.applicationName" />
		<ps:param name="webServiceExplorerCO.webServiceName" value="webServiceExplorerCO.webServiceName" />
		<ps:param name="webServiceExplorerCO.requestType" value="webServiceExplorerCO.requestType" />
		<ps:param name="webServiceExplorerCO.parentRowId" value="webServiceExplorerCO.parentRowId" />
		<ps:param name="webServiceExplorerCO.requestResponseCO.fieldType" value="webServiceExplorerCO.requestResponseCO.fieldType" />	
		<ps:param name="webServiceExplorerCO.requestResponseCO.gridColumnID" value="webServiceExplorerCO.requestResponseCO.gridColumnID" />
		<ps:param name="webServiceExplorerCO.gridColumnIDField" value="webServiceExplorerCO.gridColumnIDField" />
		<ps:param name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" value="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" />	
		<ps:param name="webServiceExplorerCO.inputwsdlUrl" value="webServiceExplorerCO.inputwsdlUrl" />
		<ps:param name="webServiceExplorerCO.isFromSoapScreen" value="webServiceExplorerCO.isFromSoapScreen" />
	</ps:url>
	
		<psjg:grid id="${subGridId}"
			caption=""
			href="%{webServiceGuiSubGridUrl}"
			editurl="%{webServiceGuiSubGridUrl}"
			editinline="true" 
			dataType="json" 
			pager="false" 
			pagerButtons="false" 
			filter="false"
			gridModel="gridModel" 
			rowNum="50" 
			viewrecords="true" 
			navigator="true" 
			height="-1"
			altRows="true"
			navigatorRefresh="false" 
			navigatorDelete="false" 
			navigatorEdit="false"
			navigatorAdd="false" 
			ondblclick="" 
			navigatorSearch="false"
			shrinkToFit="true" 
			addfunc=""
			multiselect="true"
			serializeGridData="serializeSubGridData"
			onEditInlineBeforeTopics="onSubGridRowSelTopic"
			onGridCompleteTopics ="webServiceExplorerOnSubGridComplete"   
		>
			
	
		<psjg:grid id="webServiceGuiSubGridTbl_SubGrid_Id_${_pageRef}"
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
 
  		<psjg:gridColumn  name="restriction" title="%{getText('restriction_key')}" index="RESTRICTION" 
			colType="select" search="false"  formatter="select" editable="true" sortable="false" id="RESTRICTION_${_pageRef}"  edittype="select" 
			loadOnce="true"
			editoptions="{value:function(){
			var rowId = $('#webServiceGuiTbl_Id_'+_pageRef).jqGrid('getGridParam', 'selrow');
			var gridId = null;
			var grid = null;
			rowId = returnLastHierarchicalSelectRow(rowId);
			if(null != rowId)
			{
				 gridId = getGridIdFromRow(rowId);			
				 grid = $('#'+gridId);
			}
			return enumerationFieldsLoadCombo('${pageContext.request.contextPath}/path/WebserviceExplorer/WebServiceExplorerMaint_fillRestrictions','restrictions','code', 'descValue',rowId,grid);}
			,dataEvents: [{ type: 'change', fn: function(e) { onEnumerationFieldChange(e) } }
			]
			}
			" 
		/>
 		
		<psjg:gridColumn id="VALUE_${_pageRef}"
				title="%{getText('value_key')}" index="VALUE" 
				colType="text"
				name="value"
				editable="true" 
				sortable="false" 
				search="false"
				required="false"
				hidden="true"
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

 </td>
 
</tr>

<script type="text/javascript">	
		//$.struts2_jquery.require("WebServiceExplorerSubGridList.js" ,null,jQuery.contextPath+"/path/js/proc/webserviceexplorer/");

		$("#${subGridId}").subscribe("webServiceExplorerOnSubGridComplete",function(event,data){
			webServiceExplorerOnSubGridComplete(event,data);});
	
		
		$("#${subGridId}").subscribe("onSubGridRowSelTopic",function(rowObj){
			onSubGridRowSelTopic(rowObj);});
		
</script>