<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
<ps:hidden id="ivcrud_${_pageRef}" name="iv_crud" ></ps:hidden>
<ps:url id="urlsytmsetListGrid" escapeAmp="false" action="SytmsetListAction_loadSytmsetGrid" namespace="/path/sytmset">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>
<psjg:grid
	id               ="sytmsetListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlsytmsetListGrid}"
    dataType         ="json"
    hiddengrid       ="false"
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
    ondblclick       ="sytmsetList_onDbClickedEvent()"
    addfunc          ="sytmsetList_onAddClicked()"
    shrinkToFit      ="false" height="125">
     
    <psjg:gridColumn id="syncBranchVO.BR_CODE" colType="number" name="syncBranchVO.BR_CODE" index="syncBranchVO.BR_CODE" title="%{getText('br_code_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.DESCRIPTION" colType="text" name="syncBranchVO.DESCRIPTION" index="syncBranchVO.DESCRIPTION" title="%{getText('description_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.BR_TYPE" colType="text" name="syncBranchVO.BR_TYPE" index="syncBranchVO.BR_TYPE" title="%{getText('br_type_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.EMAIL1" colType="text" name="syncBranchVO.EMAIL1" index="syncBranchVO.EMAIL1" title="%{getText('email1_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.EMAIL2" colType="text" name="syncBranchVO.EMAIL2" index="syncBranchVO.EMAIL2" title="%{getText('email2_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.EMAIL3" colType="text" name="syncBranchVO.EMAIL3" index="syncBranchVO.EMAIL3" title="%{getText('email3_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.EMAIL4" colType="text" name="syncBranchVO.EMAIL4" index="syncBranchVO.EMAIL4" title="%{getText('email4_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.EMAIL5" colType="text" name="syncBranchVO.EMAIL5" index="syncBranchVO.EMAIL5" title="%{getText('email5_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.MESSAGE1" colType="text" name="syncBranchVO.MESSAGE1" index="syncBranchVO.MESSAGE1" title="%{getText('message1_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.SUBJECT" colType="text" name="syncBranchVO.SUBJECT" index="syncBranchVO.SUBJECT" title="%{getText('subject_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.IP_ADDRESS" colType="text" name="syncBranchVO.IP_ADDRESS" index="syncBranchVO.IP_ADDRESS" title="%{getText('ip_address_key')}" editable="false" sortable="true" search="true" />
    <psjg:gridColumn id="syncBranchVO.SERVICE_NAME" colType="text" name="syncBranchVO.SERVICE_NAME" index="syncBranchVO.SERVICE_NAME" title="%{getText('service_name_key')}" editable="false" sortable="true" search="true" />
     	
</psjg:grid>
<div id="sytmsetListMaintDiv_id_${_pageRef}" style="width:100%;display: none;" class="lllll" >
<%--    <ps:if test='iv_crud == "R"'>    --%>
      <%@include file="SytmsetMaint.jsp"%>
<%--    </ps:if>      --%>
</div>
<script  type="text/javascript">
    $.struts2_jquery.require("SytmsetList.js" ,null,jQuery.contextPath+"/path/js/imco/sytmset/");
    $("#gview_sytmsetListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
</script>