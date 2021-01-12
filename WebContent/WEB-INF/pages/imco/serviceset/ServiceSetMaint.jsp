<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />

<ps:form useHiddenProps="true" id="serviceSetMaintFormId_${_pageRef}"
	namespace="/path/serviceSet">
	<ps:hidden name="serviceSetCO.serviceGridListString"
		id="updateMode_hdn_statusGrid_Id_${_pageRef}" />


	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
	<ps:url id="urlserviceSetListGrid" escapeAmp="false"
		action="ServiceSetListAction_loadServiceSetGrid"
		namespace="/path/serviceSet">
		<ps:param name="iv_crud" value="ivcrud_${_pageRef}"></ps:param>
		<ps:param name="_pageRef" value="_pageRef"></ps:param>
	</ps:url>

	<psjg:grid id="serviceSetListGridTbl_Id_${_pageRef}" dataType="json"
		href="%{urlserviceSetListGrid}" pager="false" filter="false"
		gridModel="gridModel" rowNum="5" rowList="5,10,15,20"
		onEditInlineBeforeTopics="serviceSet_setReadonly" viewrecords="true"
		navigator="false" navigatorAdd="false" navigatorDelete="false"
		navigatorEdit="false" navigatorRefresh="false" height="120"
		multiselect="false" altRows="true" addfunc="" shrinkToFit="true"
		editurl="1234" editinline="true">

		<psjg:gridColumn id="syncConnVO_PROCESS" name="syncConnVO.PROCESS"
			index="syncConnVO.PROCESS" title="" editable="false" sortable="false"
			edittype="select" colType="select" search="true" formatter="select"
			editoptions="{value:function() {  return loadCombo('${pageContext.request.contextPath}/path/serviceSet/ServiceSetMaintAction_loadAccessServiceTypeSelect','requiredTypeList', 'code', 'descValue');}}" />

		<psjg:gridColumn id="syncConnVO.TIMER" colType="number" minValue="0"
			name="syncConnVO.TIMER"  nbFormat="#,00.00"  editoptions="{maxlength: '9'}"
			index="syncConnVO.TIMER" title="" editable="true" sortable="false" maxValue="999999.99" 
			search="false" hidden="false" />

		<psjg:gridColumn id="syncConnVO.BR_CODE" colType="number"
			name="syncConnVO.BR_CODE"  maxLenBeforeDec="3"
			index="syncConnVO.BR_CODE" title="" editable="false" sortable="false"
			search="false" hidden="true" />

		<psjg:gridColumn id="subDescription" colType="text"
			name="subDescription" title="" index="subDescription"
			editable="false" sortable="false" search="false" required="true" />

		<psjg:gridColumn id="syncConnVO.RECONNECT" colType="number"
			name="syncConnVO.RECONNECT"   editable="true" editoptions="{maxlength: '6'}"
			index="syncConnVO.RECONNECT" title="" sortable="false" search="false" maxValue="999999"
		 />
	</psjg:grid>


	<ptt:toolBar id="serviceSetMaintToolBar_${_pageRef}" hideInAlert="true">
		<ps:if test='%{#ivcrud_${_pageRef}=="R"}'>
			<psj:submit id="serviceSetMaint_save_${_pageRef}" button="true"
				freezeOnSubmit="true">
				<ps:label key="Save_key" for="serviceSetMaint_save_${_pageRef}" />
			</psj:submit>

		</ps:if>
	</ptt:toolBar>
</ps:form>
<script type="text/javascript">
	$.struts2_jquery.require("ServiceSetList.js,ServiceSetMaint.js", null,
			jQuery.contextPath + "/path/js/imco/serviceset/");
	$(document).ready(
			function()
			{
				$("#serviceSetMaintFormId_" + _pageRef).processAfterValid(
						"serviceSetMaint_processSubmit", []);

				$("#serviceSetListGridTbl_Id_" + _pageRef).unsubscribe(
						"serviceSet_setReadonly");
				$("#serviceSetListGridTbl_Id_" + _pageRef).subscribe(
						"serviceSet_setReadonly", function()
						{
							serviceSet_setReadonly();
						});

				// 				$.subscribe('serviceSet_setReadonly', function(event, data) {
				// 					serviceSet_setReadonly();
				// 				  });
			});
</script>