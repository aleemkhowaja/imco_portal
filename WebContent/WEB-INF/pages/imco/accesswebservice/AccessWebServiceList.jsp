<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<div id="accessWebServiceList_${_pageRef}">
<ps:set name="ivcrud_${_pageRef}"    value="iv_crud"/>
<ps:hidden id="iv_crud_${_pageRef}"  name="iv_crud"/>

<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<ps:url id="urlaccessWebServiceListGrid" escapeAmp="false" action="AccessWebServiceListAction_loadAccessWebServiceGrid" namespace="/path/accessWebService">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<psjg:grid
	id               ="accessWebServiceListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlaccessWebServiceListGrid}"
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
    navigatorRefresh ="false"
    navigatorAdd     ="false"
    navigatorSearch  ="false"
    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
    altRows          ="true"
    ondblclick       ="accessWebServiceList_onDbClickedEvent()"
    addfunc          ="accessWebServiceList_onAddClicked"
    shrinkToFit      ="true" 
    height="125">

	<psjg:gridColumn name="imcoPwsTmpltMasterVO.TEMPLATE_ID"
		id="TEMPLATE_ID"
		searchoptions="{sopt:['eq','ne','lt','gt','le','ge']}"
		index="imcoPwsTmpltMasterVO.TEMPLATE_ID" colType="number" title="%{getText('Code_key')}"
		sortable="true" search="true" key="true" />
	<psjg:gridColumn name="imcoPwsTmpltMasterVO.TEMPLATE_DESC"
		id="TEMPLATE_DESC"
		searchoptions="{sopt:['eq','ne','bw','bn','ew','en','cn','nc']}"
		index="imcoPwsTmpltMasterVO.TEMPLATE_DESC" colType="text" title="%{getText('Descritption')}"
		sortable="true" />
	<psjg:gridColumn name="statusDesc" id="STATUS_DESC"
		searchoptions="{sopt:['eq','ne','bw','bn','ew','en','cn','nc']}"
		index="STATUS_DESC" colType="text" title="%{getText('Status_key')}"
		sortable="true" />
	<psjg:gridColumn id="STATUS"
		searchoptions="{sopt:['eq','ne','bw','bn','ew','en','cn','nc']}"
		colType="text" name="imcoPwsTmpltMasterVO.STATUS" index="STATUS"
		title="%{getText('STATUS_key')}" hidden="true" />

</psjg:grid>

<div id="accessWebServiceListMaintDiv_id_${_pageRef}" style="width:100%;">
   <ps:if test='iv_crud == "R"'>   
      <%@include file="AccessWebServiceMaint.jsp"%>
   </ps:if>     
</div>
</div>

<script  type="text/javascript">
    $.struts2_jquery.require("AccessWebServiceList.js,AccessWebServiceMaint.js" ,null,jQuery.contextPath+"/path/js/imco/accesswebservice/");
    $("#gview_accessWebServiceListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>