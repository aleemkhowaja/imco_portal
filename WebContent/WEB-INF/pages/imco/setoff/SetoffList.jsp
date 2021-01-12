<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<ps:url id="urlsetoffListGrid" escapeAmp="false" action="SetoffListAction_loadSetoffGrid" namespace="/path/setoff">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<psjg:grid
	id               ="setoffListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlsetoffListGrid}"
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
    navigatorSearch  ="true"
    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
    altRows          ="true"
    ondblclick       ="setoffList_onDbClickedEvent()"
    addfunc          ="setoffList_onAddClicked"
    shrinkToFit      ="false" height="125">
	
</psjg:grid>
<div id="setoffListMaintDiv_id_${_pageRef}" style="width:100%;">
   <ps:if test='iv_crud == "R"'>   
      <%@include file="SetoffMaint.jsp"%>
     
   </ps:if>     
</div>
<script  type="text/javascript">
    $.struts2_jquery.require("SetoffList.js,SetoffMaint.js" ,null,jQuery.contextPath+"/path/js/setoff/");
    $("#gview_setoffListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>