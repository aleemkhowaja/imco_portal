<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<div style="padding:2px;">
<ps:url id="urlUserGrid" action=""
	namespace="/path/accessWebService" >
</ps:url>
<psjg:grid id="accessWebserviceUserGridTbl_Id_${_pageRef}"
	caption=" " href="%{urlUserGrid}" 
	dataType="json"
	hiddengrid='' 
	pager="true" 
	sortable="false" 
	filter="true"
	gridModel="gridModel" 
	rowNum="5" rowList="5,10,15,20"
	viewrecords="true" 
	navigator="true" 
	navigatorDelete="true"
	navigatorEdit="false" 
	navigatorRefresh="false" 
	navigatorAdd="true"
	navigatorSearch="false" 
	editurl="%{urlUserGrid}"
	navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
	altRows="true" 
	pagerButtons="false" 
	addfunc="accessWebserviceUser_onAddClicked"
	delfunc="accessWebserviceUser_onDelClicked" 
	editinline="true"
	autowidth="true" 
	height="180">

	<psjg:gridColumn id="imcoPwsTmpltUsrVO.USER_ID"
		name="imcoPwsTmpltUsrVO.USER_ID" sortable="false"
		title="%{getText('user_id_key')}"
		index="imcoPwsTmpltUsrVO.USER_ID" colType="liveSearch"
		editoptions="{maxlength : 50, dataEvents: [{ type: 'change', fn: function(e) {changeUserIdFunc();} }]}"
		editable="true" width="8"
		paramList=""
		dataAction="${pageContext.request.contextPath}/path/accessWebService/AccessWebServiceMaintAction_constructQryLookup.action"
		resultList="USER_ID:imcoPwsTmpltUsrVO.USER_ID_lookuptxt"
		searchElement="imcoPwsTmpltUsrVO.USER_ID"
		params="userIdLkp:imcoPwsTmpltUsrVO.USER_ID_lookuptxt"
		dependencySrc="${pageContext.request.contextPath}/path/accessWebService/AccessWebServiceMaintAction_dependencyByUserId.action"
		dependency="userIdLkp:imcoPwsTmpltUsrVO.USER_ID_lookuptxt
					,accesswebserviceCO.imcoPwsChannelVO.CHANNEL_ID:imcoPwsChannelVO.CHANNEL_ID
					,accesswebserviceCO.imcoPwsChannelVO.DESCRIPTION:imcoPwsChannelVO.DESCRIPTION"
		afterDepEvent="" required="true" tabindex="2"/>	
	<psjg:gridColumn id="channelId_${_pageRef}"
		searchoptions="{sopt:['eq','ne','lt','gt','le','ge']}"
		colType="number" name="imcoPwsChannelVO.CHANNEL_ID"
		index="imcoPwsChannelVO.CHANNEL_ID" title="%{getText('channel_id_key')}"
		editable="false" sortable="false" search="true" width="4"/>	
	<psjg:gridColumn name="imcoPwsChannelVO.DESCRIPTION" id="channelDesc_${_pageRef}"
		searchoptions="{sopt:['eq','ne','bw','bn','ew','en','cn','nc']}"
		index="imcoPwsChannelVO.DESCRIPTION" colType="text" title="%{getText('Description_key')}"
		sortable="false" width="40" tabindex="3" />
</psjg:grid>
</div>