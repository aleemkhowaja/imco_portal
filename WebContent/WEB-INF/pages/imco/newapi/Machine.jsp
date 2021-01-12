<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<ps:url id="urEbillList" namespace="/path/newApi" escapeAmp="false"
	action="NewApiListAction_reurnMachinesGrid">
	<ps:param name="criteria.apiCode"
		value="${newapiCO.imImalApiVO.API_CODE}"></ps:param>

</ps:url>



<psjg:grid id="machineGrid_Id_${_pageRef}" dataType="json"
	href="%{urEbillList}" pager="true" filter="false" gridModel="gridModel"
	rowNum="5" rowList="5,10,15,20" viewrecords="true" navigator="true"
	navigatorAdd="true" navigatorDelete="true" navigatorEdit="false"
	navigatorRefresh="false" height="120" altRows="true" pagerButtons="false" navigatorSearch="false"
	addfunc="machineOnAddClicked" delfunc="machineOnDeleteClicked"
	shrinkToFit="true" editurl="1234" editinline="true">

	<psjg:gridColumn id="imApiMachineVO_MACHINE_NAME" colType="text"
		name="imApiMachineVO.MACHINE_NAME" index="imApiMachineVO.MACHINE_NAME" editable="true"
		autoSearch="true" title="Machine Name"  />
</psjg:grid>


