<!-- User Story #740995 PWS generation From DB Procedure -screen -->

<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@taglib prefix="ptt" uri="/path-toolbar-tags"%>


<div id="pws_generation_mapping_field_${_pageRef}" style="margin-right:10px;margin-top:18px;">


	<ps:url id="pws_geration_mapping_fields_Url" action="PWSGenerationAPIMappingFieldsList_loadMappingFields" namespace="/path/PWSGeneration" escapeAmp="false">
		<ps:param name="iv_crud" value="iv_crud" />
		<ps:param name="_pageRef" value="_pageRef" />
	</ps:url>
	
	<psjg:grid id="pws_geration_mapping_fields_Id_${_pageRef}"
			caption="" 
			href="%{pws_geration_mapping_fields_Url}"
			editurl="%{pws_geration_mapping_fields_Url}"
			editinline="true" 
			pager="true" 
			pagerButtons="true"
			filter="true"
			gridModel="gridModel" 			
			altRows="true"
			dataType="json" 
			rowNum="50" 
			viewrecords="true" 
			navigator="true" 
			navigatorRefresh="false" 
			navigatorDelete="false" 
			navigatorEdit="false"
			navigatorAdd="false" 
			ondblclick="" 
			navigatorSearch="false"
			addfunc=""
			multiselect="false"
			onEditInlineBeforeTopics="onRowSelTopic"
			onGridCompleteTopics ="webServiceExplorerOnGridCompleteFn"
			autowidth="true"
			shrinkToFit="true"
			cssStyle="overflow:hidden;" 
		>
		<psjg:gridColumn id="ID_${_pageRef}" colType="text" key="true"
			name="ID" index="ID" title="ID" editable="false" sortable="false"
			hidden="true"
			 />
			
		<psjg:gridColumn name="fieldName"
			title="%{getText('api_Field_key')}" index="PARAMETER"
			colType="text" editable="false" sortable="false" search="false"
			id="APIFIELDS_${_pageRef}"
			editoptions="{readonly: 'readonly', maxlength:'15'}"
			 />	
					 		
		<psjg:gridColumn name="mapFieldTo"
			title="%{getText('map_key')}" index="TYPE"
			colType="text" editable="false" sortable="false" search="false"
			id="MAPTO_${_pageRef}" />
		</psjg:grid>
	
	
</div>

<script type="text/javascript">	

		$("#webServiceGuiTbl_Id_"+_pageRef).subscribe("webServiceExplorerOnGridCompleteFn",function(event,data){
			webServiceExplorerOnGridCompleteFn(event,data);});
	
		$("#webServiceGuiTbl_Id_"+_pageRef).subscribe("onRowSelTopic",function(rowObj){
			onRowSelTopic(rowObj);});
		
		$("#webServiceGuiTbl_Id_"+_pageRef).subscribe("onRowSubSelTopic",function(rowObj){
			onRowSubSelTopic(rowObj);});
	
		$(function(){
			$("#jqgh_webServiceGuiTbl_Id_"+_pageRef+"_cb").hide();
		});
		
</script>