<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<ps:url id="urUsersListUrl" 
		        namespace="/path/newApi" escapeAmp="false"
			    action="NewApiListAction_reurnUsersGrid">
			<ps:param name="criteria.apiCode" value="${newapiCO.imImalApiVO.API_CODE}"></ps:param>    
			  
		</ps:url>

			
			
			<psjg:grid id="newApiUserGrid_Id_${_pageRef}"
				dataType="json"
				href="%{urUsersListUrl}" 
				pager="true"
				pagerButtons="false"
				filter="false" 
				gridModel="gridModel" 
				rowNum="5" 
				rowList="5,10,15,20"
				viewrecords="true" 
				navigator="true" 
				navigatorAdd="true"
		        navigatorDelete="true"
		        navigatorEdit="false"
				navigatorRefresh="false" 
				height="120" 
				altRows="true"
				addfunc="newApiUserOnAddClicked"  
		        delfunc="newApiUserOnDeleteClicked"
		        shrinkToFit="true"
		        editurl="1234" 
		        editinline="true"
		        navigatorSearch="false">

	<psjg:gridColumn id="imApiUsersVO_USER_ID" colType="liveSearch" 
		name="imApiUsersVO.USER_ID" index="USER_ID" autoSearch="true"
		title="%{getText('User_Id_key')}" editable="true" sortable="false"
		search="false"
		dataAction="${pageContext.request.contextPath}/pathdesktop/UsrLookupAction_constructLookup"
		resultList="imApiUsersVO.USER_ID:USER_ID_lookuptxt"
		searchElement="USER_ID" params="user_id:USER_ID"
		dependencySrc="${pageContext.request.contextPath}/pathdesktop/UserDependencyAction_userPortletDependency"
		dependency="usrVO.USER_ID:USER_ID" />
		
</psjg:grid>

		        
			