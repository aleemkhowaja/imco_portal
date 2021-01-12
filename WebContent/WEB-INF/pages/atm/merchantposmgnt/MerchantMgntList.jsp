<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
 <!-- @author: jihanemazloum 2013 -->
 <html>
<body>
		<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
		<ps:hidden id="iv_crud_${_pageRef}" name="iv_crud" />
       <div id="merchantMgntDiv_id">
	    <ps:url id="urlMerchantMgntGrid"
				action="merchantMgntList_loadMerchantMgntGrid" namespace="/path/merchantposmgnt"
				escapeAmp="false">
				<ps:param name="iv_crud" value="iv_crud"></ps:param>
				<ps:param name="_pageRef" value="_pageRef"></ps:param>
			</ps:url>
			
			<psjg:grid
				id="merchantMgntGridTbl_Id_${_pageRef}"
				caption=" "
				href="%{urlMerchantMgntGrid}"
				dataType="json"
				hiddengrid='%{iv_crud == "R"}'
				pager="true"
				filter="true"
				gridModel="gridModel"
				viewrecords="true"
				rowNum="5"
				navigator="true"
				rowList="5,10,15,20"
				altRows="true"
				navigatorRefresh="false"
				navigatorDelete="false"
				navigatorEdit="false"
				navigatorAdd="false"
				navigatorSearch="true"
				shrinkToFit="false"
				sortorder="desc"
				ondblclick="merchantMgnt_onDbClickedEvent()"
				addfunc   ="merchantMgnt_onAddClicked" >
				
				<psjg:gridColumn name="ctsMerchantVO.BRANCH_CODE"			title="%{getText('branch_code_key')}" 	  		index="BRANCH_CODE"			colType="number" editable="false" sortable="true" search="true"	id="BRANCH_CODE_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.CODE"					title="%{getText('Code_key')}"	  				index="CODE"				colType="number" editable="false" sortable="true" search="true"	id="CODE_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.CONTRACT_NUM"			title="%{getText('ContractNum_key')}"		  	index="CONTRACT_NUM"		colType="text"   editable="false" sortable="true" search="true"	id="CONTRACT_NUM_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.ECO_SECTOR_CODE"		title="%{getText('cust_sectorcode')}"			index="ECO_SECTOR_CODE"		colType="number" editable="false" sortable="true" search="true"	id="ECO_SECTOR_CODE_${_pageRef}" />
				<psjg:gridColumn name="statusDesc"							title="%{getText('vaultLookup.status')}"		index="statusDesc"				colType="text"   editable="false" sortable="true" search="true"	id="STATUS_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.MAX_AMOUNT"			title="%{getText('Amount_key')}"	    		index="MAX_AMOUNT"			colType="number" editable="false" sortable="true" search="true"	id="MAX_AMOUNT_${_pageRef}" />
				<psjg:gridColumn name="contactTypeDesc"					    title="%{getText('Contact_Type_key')}"		    index="contactTypeDesc"		colType="text"   editable="false" sortable="true" search="true"	id="CONTACT_TYPE_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.ACC_BR"				title="%{getText('Account_Branch_key')}"		index="ACC_BR"				colType="number" editable="false" sortable="true" search="true"	id="ACC_BR_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.ACC_CY"				title="%{getText('Account_Currency_key')}"		index="ACC_CY"				colType="number" editable="false" sortable="true" search="true"	id="ACC_CY_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.ACC_GL"				title="%{getText('Account_GL_key')}"	  		index="ACC_GL"				colType="number" editable="false" sortable="true" search="true"	id="ACC_GL_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.ACC_CIF"				title="%{getText('account_cif_key')}"		  	index="ACC_CIF"				colType="number" editable="false" sortable="true" search="true"	id="ACC_CIF_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.ACC_SL"				title="%{getText('Account_SL_key')}"		  	index="ACC_SL"				colType="number" editable="false" sortable="true" search="true"	id="ACC_SL_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.ACC_ADDITIONAL_REF"	title="%{getText('additional_reference_key')}"	index="ACC_ADDITIONAL_REF"	colType="text"   editable="false" sortable="true" search="true"	id="ACC_ADDITIONAL_REF_${_pageRef}" />
				<psjg:gridColumn name="ctsMerchantVO.SENT_FLAG"				title="%{getText('Sent_Flag_key')}"		   		index="SENT_FLAG"			colType="text"   editable="false" sortable="true" search="true"	id="SENT_FLAG_${_pageRef}" />
		
			</psjg:grid>
		</div>

		<div id="merchantDetailsDiv_id_${_pageRef}" class="collapsibleContainer">
			<ps:if test='iv_crud == "R"'>
				<%@include file="MerchantMgntMaint.jsp"%>
			</ps:if>
		</div>
		<ps:hidden type="hidden" id="record_was_canceled_successfully_key" value="%{getText('record_was_canceled_successfully_key')}"/>
</body>
<script type="text/javascript">
    $.struts2_jquery.require("MerchantMgntList.js", null, jQuery.contextPath+ "/path/js/atm/merchantposmgnt/merchantmgnt/");
	$(document).ready(merchantMgnt_ListLoad);
	var record_was_canceled_successfully_key = document.getElementById("record_was_canceled_successfully_key").value;
</script>
</html> 


