<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>


<ps:url id="urlsetoffListGrid" escapeAmp="false" action="SetoffListAction_loadSetoffGrid" namespace="/path/setoff">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>

<psjg:grid id="setoffListGridTbl_Id_${_pageRef}" dataType="json"
	href="%{urlsetoffListGrid}" pager="false" filter="false"
	gridModel="gridModel" rowNum="5" rowList="5,10,15,20"
	viewrecords="true" navigator="false" navigatorAdd="false"
	navigatorDelete="false" navigatorEdit="false" navigatorRefresh="false"
	height="120" multiselect="true" altRows="true"
	addfunc="setoffGridOnAddClicked"
	delfunc="setoffGridOnDeleteClicked" shrinkToFit="true"
	editurl="1234" editinline="false" sortable ="false">
	
	
	
	<psjg:gridColumn id="syncActionsVO_TERMINAL" colType="text"
		name="syncActionsVO.TERMINAL" index="syncActionsVO.TERMINAL"
		editable="true" autoSearch="true" sortable="true" title="%{getText('terminal_key')}" />
		
		
		<psjg:gridColumn id="syncActionsVO_USER_ID" colType="text"
		name="syncActionsVO.USER_ID" index="syncActionsVO.USER_ID"
		editable="true" autoSearch="true" sortable="true" title="%{getText('user_id_key')}" />
		
		
		<psjg:gridColumn id="syncActionsVO.SYNC_ID" colType="number"
		name="syncActionsVO.SYNC_ID" index="syncActionsVO.SYNC_ID"
		editable="true" autoSearch="true" sortable="true" title="%{getText('sync_id_key')}" />
		
	
		<psjg:gridColumn id="setoffchck" colType="text"   name="setoffchck" index="setoffchck" title="%{getText('setoffchecked_key')}" mode="text" editable="false" sortable="true" search="true"  hidden="true"/>
	<psjg:gridColumn id="sActions" colType="text"
		name="sActions" index="sActions"
		editable="true" autoSearch="true" sortable="true" title="%{getText('s_action_key')}" />
	
	
	<psjg:gridColumn id="rActions" colType="text"
		name="rActions" index="rActions"
		editable="true" autoSearch="true" sortable="true" title="%{getText('r_action_key')}" />
	
	
		
		
		
		
		
		<psjg:gridColumn id="selected" colType="text"
		name="selected" index="selected"
		editable="true" autoSearch="true" sortable="true" title="%{getText('selected_key')}" hidden="true" />
		

</psjg:grid>