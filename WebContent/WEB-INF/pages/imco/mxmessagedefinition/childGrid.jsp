<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<tr role="row" class="ui-subgrid">
	<!-- <td colspan="1">&nbsp;</td> -->
     
    <var>
	<td class="ui-widget-content subgrid-cell"><span class="ui-icon ui-icon-carat-1-sw"></span>
	</td>
	<td class="ui-widget-content subgrid-data" style="width:98%" colspan="8">
	
	<psjg:grid id="${mxMessageDefinitionCO.subGridId}"
			editinline="true" 
			editurl="abc" 
			dataType="json" 
			pager="false" 
			pagerButtons="false" 
			filter="false"
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
			shrinkToFit="true" 
			addfunc=""
			multiselect="true"
			autowidth="false"
			onSelectRowTopics="tagsGridSelect_Row_${mxMessageDefinitionCO.subGridId}"
			onGridCompleteTopics="gridComplete"
			>
		
			<psjg:grid id="webServiceGuiSubGridTbl_SubGrid_Id_${_pageRef}"
				subGridUrl="" gridModel="" subGridOptions="{reloadOnExpand:false}">
			</psjg:grid>
	
			<psjg:gridColumn id="complexTypeName" colType="text"
				index="complexTypeName" name="complexTypeName"
				title="%{getText('complexTypeName_key')}" editable="false" sortable="true"
				search="false" hidden="true" />
				
			<psjg:gridColumn id="parentTagName" colType="text"
				index="parentTagName" name="parentTagName"
				title="%{getText('parent_key')}" editable="false" sortable="true"
				search="false" hidden="true" />
				
			<psjg:gridColumn id="type" colType="text"
				index="type" name="type"
				title="%{getText('type_key')}" editable="false" sortable="true"
				search="false" hidden="true" />	
	
			<psjg:gridColumn id="tagName" colType="text" index="tagName"
				name="tagName" title="%{getText('tag_name')}" editable="false"
				sortable="false" search="false" key="true"/>
				
			<psjg:gridColumn id="minOccur" colType="text" index="minOccur"
				name="minOccur" title="%{getText('min_accur_key')}" editable="false"
				sortable="false" search="false"/>
				
			<psjg:gridColumn id="maxOccur" colType="text" index="maxOccur"
				name="maxOccur" title="%{getText('max_accur_key')}" editable="false"
				sortable="false" search="false"/>
	
			<psjg:gridColumn id="simpleTypeCO.minLength" colType="text"
				index="simpleTypeCO.minLength" name="simpleTypeCO.minLength"
				title="%{getText('mini_length_key')}" editable="false"
				sortable="false" search="false"/>
	
			<psjg:gridColumn id="simpleTypeCO.maxLength" colType="text"
				index="simpleTypeCO.maxLength" name="simpleTypeCO.maxLength"
				title="%{getText('maxi_length_key')}" editable="false"
				sortable="false" search="false"/>
	
			<psjg:gridColumn id="simpleTypeCO.restrictionType" colType="text"
				index="simpleTypeCO.restrictionType"
				name="simpleTypeCO.restrictionType" title="%{getText('type_key')}"
				editable="false" sortable="false" search="true"/>
	
	
			<psjg:gridColumn id="description" colType="text" index="description"
				name="description" title="%{getText('description_key')}"
				editoptions="{dataEvents: [{type: 'change', fn: function(e) { MxMessageDefinitionMaint_AddDescInJsonOfActiveGrid(e, this, 'false')} }] }"
				editable="true" sortable="false" search="true"/>
	
			<psjg:gridColumn id="childTags" colType="text" index="childTags"
				name="childTags" title="%{getText('childTags')}" hidden="true" />
				
			<psjg:gridColumn id="isLeafYN" colType="text" index="isLeafYN"
				name="isLeafYN" title="%{getText('is_leafYN_key')}" editable="false"
				sortable="false" search="false" hidden="true" />
				
			<psjg:gridColumn id="isMandatoryYN" colType="text" index="isMandatoryYN"
				name="isMandatoryYN" title="%{getText('isMandatory_key')}" editable="false"
				sortable="false" search="false" hidden="true" />
			
			<psjg:gridColumn id="parentGridId" colType="text" index="parentGridId"
				name="parentGridId" title="%{getText('parentGridId_key')}" editable="false"
				sortable="false" search="false" hidden="true" />
					
			<psjg:gridColumn id="parentRowId" colType="text" index="parentRowId"
				name="parentRowId" title="%{getText('parentRowId_key')}" editable="false"
				sortable="false" search="false" hidden="true" />
				
			<psjg:gridColumn id="tagHierarchy" colType="text" index="tagHierarchy"
				name="tagHierarchy" title="%{getText('tagHierarchy_key')}" editable="false"
				sortable="false" search="false" hidden="true" />
				
		    <psjg:gridColumn id="tagId" colType="text" index="tagId"
				name="tagId" title="%{getText('tagId_key')}" editable="false"
				sortable="false" search="false" hidden="true" />
				
	</psjg:grid>
</td>
</tr>

<script type="text/javascript">

	
	$("#${mxMessageDefinitionCO.subGridId}").subscribe("tagsGridSelect_Row_${mxMessageDefinitionCO.subGridId}",function(rowObj)
	{
		var rowId = rowObj.originalEvent.id
		var gridId = getGridIdFromRow(rowId);
		var rowObject = $("#"+gridId).jqGrid('getRowData', rowId);
		
		//if records is approved in maintainance screen or in approve screen the selection should be false
		var status = $("#STATUS_"+_pageRef).val();
		if(status == 'P' || _pageRef == 'MXMD00P')
		{
			$("#"+gridId).jqGrid('setSelection', rowId, false);
			return;
		} 
		
		var parentGridId = rowObject["parentGridId"];
		var parentGridRowId = rowObject["parentRowId"];
		var isLeafYN = rowObject["isLeafYN"];
		
		//add the selected row data in hidden fields
		$("#"+gridId).find("#"+rowId).attr("changed","1");
		
		/**
		* If the selected row is leaf the add in json
		**/
		
		if(isLeafYN != "" && typeof isLeafYN != "undefined" && isLeafYN == "Y")
		{
			MxMessageDefinitionMaint_AddSelectedRowsInDynamicHiddenField(gridId);
			
			if( !$("#"+parentGridId).find("#"+parentGridRowId).hasClass("ui-state-highlight"))
			{
				$("#"+parentGridId).jqGrid('setSelection', parentGridRowId, true);
			}
			
		}
		else
		{
			/**
			 * highlight parent rows if we selected its child rows
			 */
			if( !$("#"+parentGridId).find("#"+parentGridRowId).hasClass("ui-state-highlight"))
			{
				$("#"+parentGridId).jqGrid('setSelection', parentGridRowId, true);
			}
		}

		
		//after selecting the row add change track form true so it will be submit
		var theform = document.getElementById("mxMessageDefForm_"+_pageRef);
	    $.data(theform, 'changeTrack', true);
	});

	</script>
