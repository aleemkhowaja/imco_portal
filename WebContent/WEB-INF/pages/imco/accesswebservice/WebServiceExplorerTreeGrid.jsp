<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<%@taglib uri="/path-struts-jquery-tree-tags" prefix="psjt"%>

<script type="text/javascript">
	$(document).ready(
			function() {
				$.struts2_jquery.require("AccessWebServiceMaint.js",null, jQuery.contextPath+ "/path/js/imco/accesswebservice/");
				$("#treeGridOpt_" + _pageRef).subscribe('checkSelectedRow',
						function(event, data) {
						checkSelectedRow();
						});
			});
</script>

	<ps:url id="urlGridTag" action="AccessWebServiceMaintAction_loadWsList"
		namespace="/path/accessWebService" escapeAmp="false">
		<ps:param name="templateId" value="accesswebserviceCO.imcoPwsTmpltMasterVO.TEMPLATE_ID" />
		<ps:param name="_pageRef" value="_pageRef"></ps:param>
	</ps:url>
	
	<ps:hidden id="previousRowId_${_pageRef}" name="accesswebserviceCO.previousRowId" />
		
	<psjg:grid id               ="treeGridOpt_${_pageRef}"
		  	    href             ="%{urlGridTag}"
		        dataType         ="json"
		    	pager            ="false"
		    	sortable         ="false"
				filter           ="false"
		    	treeGrid      	 ="true"
				treeGridModel 	 ="adjacency"
				loadonce		 ="false"
				gridModel        ="gridModel"
				pagerButtons  	 ="false" 
				expandColumn  	 ="feName"
		        autowidth        ="true" 
		        viewrecords   	 ="true"
		        editurl			 ="true"
		        editinline		 ="true"
		        onSelectRowTopics="checkSelectedRow"
		        onCompleteTopics="selectRowsFromDB"
		        onEditInlineBeforeTopics="expandRowBeforeTopic"
		        >
		<psjg:gridColumn id="isLeaf_${_pageRef }" colType="text" name="isLeaf"
			index="isLeaf" title="" editable="false" sortable="false"
			search="false" hidden="true" />
		<psjg:gridColumn id="EXCLUDE_ACCESS_YN"
				name="imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN" index="imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN"
				title="%{getText('apply_masking_key')}" 
				colType="checkbox" 
				edittype="checkbox"
				formatter="checkbox"
				editable="true"
				sortable="false" 
				search="true" 
				width="20" 
				editoptions="{value:'1:0',dataEvents: [{ type: 'change', fn: function(e) {onCheckBoxClick(e,this)} } ]}"
				align="center"
				searchoptions="{sopt:['eq']}"
				formatoptions="{disabled:true}"
			/>		
		<psjg:gridColumn name="feName" index="feName" id="feNameCF_${_pageRef }"
			title="Web Services" colType="text" editable="false" sortable="false" width="80"/>
		<psjg:gridColumn name="imcoPwsTmpltDetVO.WS_NAME"
			id="imcoPwsTmpltDetVO.WS_NAME"
			title="%{getText('web_service_name_key')}" index="WS_NAME" colType="text"
			editable="false" sortable="false" search="true" hidden="true" />
		<psjg:gridColumn id      	="imcoPwsTmpltDetVO.TYPE" 
						 name		="imcoPwsTmpltDetVO.TYPE"
						 title		="%{getText('Type_Key')}"
						 index		="imcoPwsTmpltDetVO.TYPE" 
						 colType	="select" 
					     edittype	="select"
					     formatter	="select"
						 sortable	="true"
						 editable	="true" 
						 search		="false" 
						 width		="25" 
						 tabindex   = "3"
						 align		="center"
						 editoptions="{ value:function() {  return loadCombo('${pageContext.request.contextPath}/path/accessWebService/AccessWebServiceMaintAction_loadAccessWebserviceTypeList.action?','accesswebservicetypelist', 'code', 'descValue');}
						 				,dataEvents: [{ type: 'change', fn: function(e) { aws_ChangeType(e) } }]}" />
		<psjg:gridColumn id="customJson_${_pageRef }" colType="text" name="CUSTOM_DETAILS"
			index="CUSTOM_DETAILS" title="Custom Json" editable="false" sortable="false"
			search="false" hidden="true"/>
		<psjg:gridColumn id="keyFlag_${_pageRef }" colType="number" name="keyFlag"
			index="keyFlag" title="" editable="false" sortable="false"
			search="false" hidden="true" />
		<psjg:gridColumn id="parent_${_pageRef }" colType="text" name="parent"
			index="parent" title="parent" editable="false" sortable="false"
			search="false" hidden="true" />
		<psjg:gridColumn id="parentKey_${_pageRef }" colType="text" name="parentKey"
			index="parentKey" title="" editable="false" sortable="false"
			search="false" hidden="true" />
		<psjg:gridColumn name="nodeId" index="theKey" id="theKey_${_pageRef }" title="id"
			colType="text" editable="false" sortable="false" hidden="true"
			key="true" />
		<psjg:gridColumn id="level_${_pageRef }" colType="text" name="level" index="level"
			title="level" editable="false" sortable="false" search="false"
			hidden="true" />
	</psjg:grid>

<script type="text/javascript">
$("#treeGridOpt_" + _pageRef).subscribe(
		"selectRowsFromDB", function() {
			selectRowsFromDB();
		});
$("#treeGridOpt_" + _pageRef).subscribe(
		"expandRowBeforeTopic", function() {
			expandRowBeforeTopic();
		});
</script>