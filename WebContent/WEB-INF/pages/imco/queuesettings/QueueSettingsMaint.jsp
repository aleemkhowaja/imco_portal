<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:form useHiddenProps="true" id="queueSettingsMaintFormId_${_pageRef}"
	namespace="/path/queueSettings">


	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />

	<ps:hidden id="brCode_${_pageRef}" name="queueSettingsCO.brCode" />

	<ps:hidden name="queueSettingsCO.queueGridListString"
		id="updateMode_hdn_queuesGrid_Id_${_pageRef}" />



	<br>


	<ps:radio id="order_flag_${_pageRef}"
		name="queueSettingsCO.syncBranchVO.ORDER_FLAG"
		list="#{'I':'ID_key','E':'entity_code_key'}"
		onclick="queueSettingsMaint_selectRadio()"
		cssClass="radioDown_%{_pageRef}" />

	<br>



	<ps:url id="urlqueueSettingsListGrid" escapeAmp="false"
		action="QueueSettingsListAction_loadQueueSetGrid"
		namespace="/path/queueSettings">
		<ps:param name="iv_crud" value="ivcrud_${_pageRef}"></ps:param>
		<ps:param name="_pageRef" value="_pageRef"></ps:param>
		<ps:param name="queueSettingsCO.brCode"
			value="%{queueSettingsCO.brCode}"></ps:param>
	</ps:url>

	<div id="queueSettingsMaintDiv_id_${_pageRef}" style="width: 100%;">

		<psjg:grid id="queueSettingsListGridTbl_Id_${_pageRef}"
			dataType="json" href="%{urlqueueSettingsListGrid}" pager="false"
			filter="false" gridModel="gridModel" rowNum="5" rowList="5,10,15,20"
			viewrecords="true" navigator="false" navigatorAdd="false"
			navigatorDelete="false" navigatorEdit="false"
			navigatorRefresh="false" height="120" multiselect="false"
			altRows="true" addfunc="" shrinkToFit="true" editurl="1234"
			editinline="true">

			<psjg:gridColumn id="syncEntityParametersVO.ENTITY_ORDER"
				colType="number" name="syncEntityParametersVO.ENTITY_ORDER"
				index="syncEntityParametersVO.ENTITY_ORDER"
				title="%{getText('entity_order_key')}" editable="false"
				sortable="false" search="false" hidden="false" />

			<psjg:gridColumn id="syncEntityParametersVO.BR_CODE" colType="number"
				name="syncEntityParametersVO.BR_CODE" maxLenBeforeDec="3"
				index="syncEntityParametersVO.BR_CODE" title="" editable="false"
				sortable="false" search="false" hidden="true" />



			<psjg:gridColumn id="syncEntityParametersVO.ENTITY_CODE"
				colType="number" name="syncEntityParametersVO.ENTITY_CODE"
				index="syncEntityParametersVO.ENTITY_CODE"
				title="%{getText('entity_code_key')}" editable="false"
				sortable="false" search="false" hidden="false" />


			<psjg:gridColumn id="syncEntityVO.ENTITY_NAME" colType="text"
				name="syncEntityVO.ENTITY_NAME" index="syncEntityVO.ENTITY_NAME"
				title="%{getText('entity_name_key')}" editable="false"
				sortable="false" search="false" hidden="false" />

		</psjg:grid>
	</div>


	<ptt:toolBar id="queueSettingsMaintToolBar_${_pageRef}"
		hideInAlert="true">
		<ps:if test='%{#ivcrud_${_pageRef}=="R"}'>
			<psj:submit id="queueSettingsMaint_save_${_pageRef}" button="true"
				freezeOnSubmit="true">
				<ps:label key="Save_key" for="queueSettingsMaint_save_${_pageRef}" />
			</psj:submit>
		</ps:if>
	</ptt:toolBar>
</ps:form>
<script type="text/javascript">
	$(document).ready(
			function()
			{
				$.struts2_jquery.require("QueueSettingsMaint.js", null,
						jQuery.contextPath + "/path/js/imco/queuesettings/");
				$("#queueSettingsMaintFormId_" + _pageRef).processAfterValid(
						"queueSettingsMaint_processSubmit", {});
			});
</script>