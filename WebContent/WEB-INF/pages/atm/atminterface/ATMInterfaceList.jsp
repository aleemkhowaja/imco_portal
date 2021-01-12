<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />

<ps:set name="ivcrud_${_pageRef}"    value="iv_crud"/>
<ps:hidden id="iv_crud_${_pageRef}"  name="iv_crud"/>

<ps:url id="urlInterfaceListGrid" escapeAmp="false" action="ATMInterfaceListAction_loadInterfaceGrid" namespace="/path/atmInterface">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>

<psjg:grid
	id               ="interfaceListGridTbl_Id_${_pageRef}"
	caption          =" "
    href             ="%{urlInterfaceListGrid}"
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
    navigatorAdd     ='%{iv_crud== "R"}'
    navigatorSearch  ="true"
    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
    altRows          ="true"
    ondblclick       ="interfaceList_onDbClickedEvent()"
    addfunc			="ATMLst_addInterface()"
    autowidth		 ="true"
    height			 ="125"
    shrinkToFit      ="true">
    
    <psjg:gridColumn id="iso_INTERFACESVO.CODE" colType="number" name="iso_INTERFACESVO.CODE" index="iso_INTERFACESVO.CODE" align="left" width="3"
    		title="%{getText('Code_key')}" editable="false" sortable="true" search="true" />
    		
    <psjg:gridColumn id="iso_INTERFACESVO.DESCRIPTION" colType="text" name="iso_INTERFACESVO.DESCRIPTION" index="iso_INTERFACESVO.DESCRIPTION" align="left" width="10"
    		title="%{getText('Description_key')}" editable="false" sortable="true" search="true" />
    			
    <psjg:gridColumn id="tcpTypeDesc" colType="text" name="tcpTypeDesc" index="tcpTypeDesc" align="left" width="5"
    		title="%{getText('RA_TYPE')}" editable="false" sortable="true" search="true" />
    		
    <psjg:gridColumn id="statusDesc" colType="text" name="statusDesc" index="statusDesc" align="left" width="5"
    		title="%{getText('Status_Key')}" editable="false" sortable="true" search="true" />
    
    </psjg:grid>

<div id="atmInterfaceMaintDiv_id_${_pageRef}"  class="connectedSortable ui-helper-reset" style="width:100%;">
	<ps:if test='iv_crud == "R"'>
		<%@include file="ATMInterfaceMaint.jsp"%>
	</ps:if>
</div>

<ps:hidden type="hidden" id="expression_details_key" value="%{getText('expression_details_key')}"/>
<ps:hidden type="hidden" id="Formula_Key" value="%{getText('Formula_Key')}"/>
<ps:hidden type="hidden" id="msg_not_found_key" value="%{getText('msg_not_found_key')}"/>
<ps:hidden type="hidden" id="sub_field_length_error_key" value="%{getText('sub_field_length_error_key')}"/>
<ps:hidden type="hidden" id="test_message_key" value="%{getText('test_message_key')}"/>
<ps:hidden type="hidden" id="message_sample_key" value="%{getText('message_sample_key')}"/>
<ps:hidden type="hidden" id="field_distribution_key" value="%{getText('field_distribution_key')}"/>
<ps:hidden type="hidden" id="mti_not_found_key" value="%{getText('mti_not_found_key')}"/>
<ps:hidden type="hidden" id="servive_map_key" value="%{getText('servive_map_key')}"/>
<script type="text/javascript">
	$(document).ready(
		function() 
		{
			$.struts2_jquery.require("ATMInterfaceList.js,ATMInterfaceMaint.js,MessageSettings.js", null, jQuery.contextPath + "/path/js/atm/atminterface/");
			$.struts2_jquery.require("baseConverter.js", null, jQuery.contextPath + "/path/js/atm/atminterface/");
			$.struts2_jquery.require("CommonPwsMappingMaint.js", null, jQuery.contextPath+ "/path/js/imco/pwsmapping/");
		}
	);
	$("#gview_interfaceListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
	var expression_details_key 	= document.getElementById("expression_details_key").value;
	var Formula_Key 			= document.getElementById("Formula_Key").value;
	var msg_not_found_key 		= document.getElementById("msg_not_found_key").value;
	var sub_field_length_error_key 	= document.getElementById("sub_field_length_error_key").value;
	var test_message_key 	= document.getElementById("test_message_key").value;
	var message_sample_key 	= document.getElementById("message_sample_key").value;
	var field_distribution_key 	= document.getElementById("field_distribution_key").value;
	var mti_not_found_key 	= document.getElementById("mti_not_found_key").value;
	var servive_map_key 	= document.getElementById("servive_map_key").value;
</script>
