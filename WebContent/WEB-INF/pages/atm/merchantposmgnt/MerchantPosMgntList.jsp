<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
 <!-- @author: fatima salam 2015 -->
 <html>
<body>
	<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
	<ps:hidden id="iv_crud_${_pageRef}" name="iv_crud" />
    <div id="merchantPosMgntDiv_id">
	    <ps:url id="urlMerchantPosMgntGrid" action="merchantPosMgntList_loadMerchantPosMgntGrid" namespace="/path/merchantposmgnt" escapeAmp="false">
			<ps:param name="iv_crud" value="iv_crud"></ps:param>
			<ps:param name="_pageRef" value="_pageRef"></ps:param>
		</ps:url>
			
		<psjg:grid
			id="merchantPosMgntGridTbl_Id_${_pageRef}"
			caption=" "
			href="%{urlMerchantPosMgntGrid}"
			dataType="json"
			hiddengrid='%{iv_crud == "R"}'
			pager="true"
			filter="true"
			gridModel="gridModel"
			viewrecords="true"
			rowNum="5"
			navigator="true"
			height="115"
			rowList="5,10,15,20"
			altRows="true"
			navigatorRefresh="false"
			navigatorDelete="false"
			navigatorEdit="false"
			navigatorAdd="false"
			navigatorSearch="true"
			shrinkToFit="true"
			sortable="true"
			ondblclick="merchantPosMgnt_onDbClickedEvent()"
			addfunc   ="merchantPosMgnt_onAddClicked" >
			
			<psjg:gridColumn name="ctsMerchantPosVO.BRANCH_CODE"	title="%{getText('branch_code_key')}" 	  		index="BRANCH_CODE"			colType="number" editable="false" sortable="true" search="true"	id="BRANCH_CODE_${_pageRef}" />
			<psjg:gridColumn name="ctsMerchantPosVO.CODE"			title="%{getText('Code_key')}"	  				index="CODE"				colType="number" editable="false" sortable="true" search="true"	id="CODE_${_pageRef}" />
			<psjg:gridColumn name="ctsMerchantPosVO.POS_DESC"		title="%{getText('Pos_desc_key')}"	  			index="POS_DESC"			colType="text" 	 editable="false" sortable="true" search="true"	id="POS_DESC_${_pageRef}" />
			<psjg:gridColumn name="ctsMerchantPosVO.MERCHANT_CODE"	title="%{getText('merchant_code_Key')}"		  	index="MERCHANT_CODE"		colType="text"   editable="false" sortable="true" search="true"	id="MERCHANT_CODE_${_pageRef}" />
			<psjg:gridColumn name="cifNo"							title="%{getText('CIF_no_Key')}"				index="cifNo"				colType="number" editable="false" sortable="true" search="true"	id="cifNo_${_pageRef}" />
			<psjg:gridColumn name="merchantCodeDesc"				title="%{getText('CIF_Name_key')}"				index="merchantCodeDesc"	colType="text"   editable="false" sortable="true" search="true"	id="merchantCodeDesc_${_pageRef}" />
			<psjg:gridColumn name="statusDesc"						title="%{getText('vaultLookup.status')}"	    index="statusDesc"			colType="text"   editable="false" sortable="true" search="true"	id="STATUS_${_pageRef}" />
			<psjg:gridColumn name="ctsMerchantPosVO.STATUS"	hidden="true" title="" index="statusCode" colType="text" editable="false" sortable="true" search="true" id="statusCode_${_pageRef}" />
		</psjg:grid>
	</div>

	<div id="merchantPosMgntListMaintDiv_id_${_pageRef}" class="collapsibleContainer">
		<ps:if test='iv_crud == "R"'>
			<%@include file="MerchantPosMgntMaint.jsp"%>
		</ps:if>
	</div>
	<ps:hidden type="hidden" id="record_was_canceled_successfully_key" value="%{getText('record_was_canceled_successfully_key')}"/>
</body>
<script type="text/javascript">
    $.struts2_jquery.require("MerchantPosMgntList.js", null, jQuery.contextPath+ "/path/js/atm/merchantposmgnt/posmgnt/");
	$(document).ready(merchantPosMgnt_onLoad);
	var Cannot_Proceed_Key = '<ps:text name="Cannot_Proceed_Key" />';
	var record_was_canceled_successfully_key = document.getElementById("record_was_canceled_successfully_key").value;
</script>
</html> 


