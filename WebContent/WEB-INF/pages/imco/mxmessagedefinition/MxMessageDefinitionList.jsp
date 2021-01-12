<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<script type="text/javascript">

$.struts2_jquery.require("XmlEditor.js,MxMessageDefinitionMaint.js,MxMessageDefinitionList.js,FileEditors.js", null, jQuery.contextPath + "/path/js/imco/mxmessagedefinition/");
$.struts2_jquery.require("xonomy.js", null, jQuery.contextPath + "/path/js/imco/mxmessagedefinition/xonomy/");
$.struts2_jquery.require("CommonPwsMappingMaint.js", null, jQuery.contextPath+ "/path/js/imco/pwsmapping/");
</script>
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/path/js/imco/dynamicfiles/xonomy/xonomy/xonomy.css" />
<script type="text/javascript">
	$(document).ready(
		function() 
		{
			$.struts2_jquery.require("XmlEditor.js,MxMessageDefinitionMaint.js,MxMessageDefinitionList.js,FileEditors.js", null, jQuery.contextPath + "/path/js/imco/mxmessagedefinition/");
			$.struts2_jquery.require("xonomy.js", null, jQuery.contextPath + "/path/js/imco/mxmessagedefinition/xonomy/");
			//$("#xmlEditor_"+_pageRef).hide();
			//$("#textEditor_"+_pageRef).hide(); 
		}
	);
</script>

<style>
#mxMessageDefinitionGridTbl_Id_ ${_pageRef
	
}

.ui-th-column, .ui-jqgrid .ui-jqgrid-htable th.ui-th-column {
	text-align: left;
}
</style>

<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
<ps:hidden id="iv_crud_${_pageRef}" name="iv_crud" />

<ps:url id="urlMxMessageDefinitionListGrid" escapeAmp="false"
	action="MxMessageDefinitionListAction_loadMxMessageDefinitionGrid"
	namespace="/path/mxmessagedefinition">
	<ps:param name="iv_crud" value="ivcrud_${_pageRef}"></ps:param>
	<ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>

<psjg:grid
		id               ="mxMessageDefinitionGridTbl_Id_${_pageRef}"
		caption          =" "
	    href             ="%{urlMxMessageDefinitionListGrid}"
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
	    ondblclick       ="MxMessageDefList_onDbClickedEvent()"
	     addfunc		 ="MxMessageDefList_NewClickedConform"
	    autowidth		 ="true"
	    height			 ="125"
	    shrinkToFit      ="true" >

	<psjg:gridColumn 
		id="DGTL_MSG_DEF_ID" 
		colType="number"
		name="dgtl_MSG_DEFVO.DGTL_MSG_DEF_ID" 
		index="DGTL_MSG_DEF_ID"
		title="DGTL_MSG_DEF_ID" 
		key="true" 
		hidden="false"
		width="20" />
		
	<psjg:gridColumn 
		id="BRIEF_NAME" 
		colType="text" 
		name="dgtl_MSG_DEFVO.BRIEF_NAME"
		index="BRIEF_NAME" 
		title="%{getText('brief_desc_key')}" 
		editable="false"
		sortable="true" 
		search="true" 
		width="40" />
		
	
	<psjg:gridColumn 
		id="CREATED_DATE" 
		colType="date"
		sorttype="date"
		searchType="date" 
		formatter="date"
		name="dgtl_MSG_DEFVO.CREATED_DATE" 
		index="CREATED_DATE"
		title="%{getText('uploaded_date_key')}" 
		editable="false"
		sortable="true" 
		search="true" 
		width="30" />
		
	<psjg:gridColumn 
		id="statusDesc" 
		colType="text"
		name="statusDesc" 
		index="statusDesc"
		title="%{getText('status_key')}" 
		editable="false"
		sortable="true" 
		search="true" 
		width="30" />
		
</psjg:grid>
	
	
	
	<div id="mxMessageDefMaintDiv_id_${_pageRef}"  class="connectedSortable ui-helper-reset" style="width:100%;">
		<ps:if test='iv_crud == "R"'>
			<%@include file="MxMessageDefinitionMaint.jsp"%>
		</ps:if>
	</div>
