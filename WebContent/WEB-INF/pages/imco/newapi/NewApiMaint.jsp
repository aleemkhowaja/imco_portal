
<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:form useHiddenProps="true" id="newApiMaintFormId_${_pageRef}"
	namespace="/path/newApi">
	<ps:hidden name="newapiCO.updateMode" id="updateMode_hdn_${_pageRef}" />
	<ps:hidden name="newapiCO.argumentsGrid" id="updateMode_hdn_argumentsGrid_${_pageRef}" />

	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
	<table width="100%" cellpadding="0" cellspacing="0">
		<table style="width: 100%">
			<br>
			<tr>
				<!-- 				<td width="1%"></td> -->
				<td width="10%"><ps:label key="api_code_key"
						id="newApiMaintapi_lbl_${_pageRef}"
						for="newApiMaintapi_${_pageRef}"></ps:label></td>

				<td width="20%"><ps:textfield id="newApiMaintapi_${_pageRef}"
						mode="number"
						dependency="newApiMaintapi_${_pageRef}:newapiCO.imImalApiVO.API_CODE"
						dependencySrc="${pageContext.request.contextPath}/path/newApi/NewApiMaintAction_onChangeApiID"
						parameter="newapiCO.imImalApiVO.API_CODE:newApiMaintapi_${_pageRef}"
						name="newapiCO.imImalApiVO.API_CODE" maxlength="6" readonly="true"></ps:textfield></td>

				<td width="2%"><ps:checkbox id="newApiMaintchkBox_${_pageRef}"
						name="newapiCO.imImalApiVO.SUSPENDED" cssClass="ui-widget-content checkboxheight" valOpt="1:0" ></ps:checkbox></td>

				<td><ps:label key="suspended_key"
						id="newApiMaintsuspended_lbl_${_pageRef}"
						for="newApiMaintsuspended_${_pageRef}"
						mode="number" maxlength="6" ></ps:label></td>
			</tr>

			<tr>
				<!-- 			<td width="5%"></td> -->
				<td width="10%"><ps:label key="description_key"
						id="newApiMaintdescri_lbl_${_pageRef}"
						for="newApiMaintdescri_${_pageRef}"></ps:label></td>
				<td width="15%"><ps:textfield
						id="newApiMaintdescri_${_pageRef}"
						name="newapiCO.imImalApiVO.DESCRIPTION" 
						maxlength="100" required="true"></ps:textfield></td>

			</tr>
			<tr>
				<!-- 			<td width="5%"></td> -->
				<td width="10%"><ps:label key="procedure_name_key"
						id="newApiMaintprocedure_lbl_${_pageRef}"
						for="newApiMaintprocedure_${_pageRef}"></ps:label></td>
				<td width="15%"><ps:textfield
						id="newApiMaintprocedure_${_pageRef}"
						name="newapiCO.imImalApiVO.PROCEDURE_NAME" maxlength="40"
						dependencySrc="${pageContext.request.contextPath}/path/newApi/NewApiDependencyAction_checkProcNameDep"
						dependency="newApiMaintprocedure_${_pageRef}:newapiCO.imImalApiVO.PROCEDURE_NAME,newApiMaintdescri_${_pageRef}:newapiCO.imImalApiVO.DESCRIPTION"
						parameter="newapiCO.imImalApiVO.PROCEDURE_NAME:newApiMaintprocedure_${_pageRef},newapiCO.imImalApiVO.DESCRIPTION:newApiMaintdescri_${_pageRef}"
						afterDepEvent="reloadParamGrid()" required="true"></ps:textfield></td>

			</tr>

			<tr>
				<!-- 			<td width="5%"></td> -->
				<td width="10%"><ps:label key="web_service_name_key"
						id="newApiMaintweb_lbl_${_pageRef}"
						for="newApiMaintweb_${_pageRef}"></ps:label></td>
				<td width="15%"><ps:textfield id="newApiMaintweb_${_pageRef}"
						name="newapiCO.imImalApiVO.WB_SERVICE_NAME" maxlength="40"></ps:textfield></td>

			</tr>
			
			
			<tr>
<!-- 							<td width="5%"></td> -->
<%-- 				<td width="10%"><ps:label key="api version_key" --%>
<%-- 						id="newApiMaintapi_lbl_${_pageRef}" --%>
<%-- 						for="newApiMaintapi_${_pageRef}"></ps:label></td> --%>
<%-- 				<td width="15%"><ps:textfield id="newApiMaintapi_${_pageRef}" --%>
<%-- 						name="newapiCO.imImalApiVO.API_VERSION"></ps:textfield></td> --%>

			</tr>
			
			
			<tr>
<!-- 							<td width="5%"></td> -->
<%-- 				<td width="10%"><ps:label key="related apli_key" --%>
<%-- 						id="newApiMaintrelated_lbl_${_pageRef}" --%>
<%-- 						for="newApiMaintrelated_${_pageRef}"></ps:label></td> --%>
<%-- 				<td width="15%"><ps:textfield id="newApiMaintrelated_${_pageRef}" --%>
<%-- 						name="newapiCO.imImalApiVO.RELATED_APP" colType="select"></ps:textfield></td> --%>

			</tr>
			

		</table>




		<tr>
		<tr>
			<td></td>
			<td></td>
		</tr>
	</table>




	<psj:tabbedpanel id="newApiMainTabs" sortable="true">
		<psj:tab id="arguments" target="trackTab-3" key="arguments_key" />
		<div id="trackTab-3">
			<div id="trackTab-3_content">
				<jsp:include page='Arguments.jsp'>
					<jsp:param value="D" name="theGrid" />
				</jsp:include>
			</div>
		</div>
	</psj:tabbedpanel>


	<ptt:toolBar id="newApiMaintToolBar_${_pageRef}" hideInAlert="true">
		<ps:if test='%{#ivcrud_${_pageRef}=="R"}'>
			<psj:submit id="newApiMaint_save_${_pageRef}" button="true" buttonIcon="ui-button-icon-primary ui-icon ui-icon-disk"
				freezeOnSubmit="true">
				<ps:label key="Save_key" for="newApiMaint_save_${_pageRef}" />
			</psj:submit>
			<ps:if test='%{XXXXXX!="false"}'>
				<psj:submit id="newApiMaint_del_${_pageRef}" button="true" buttonIcon="ui-button-icon-primary ui-icon ui-icon-trash" type="button"
					freezeOnSubmit="true" onclick="newapiMaint_processDelete()">
					<ps:label key="Delete_key" for="newApiMaint_del_${_pageRef}" />
				</psj:submit>
			</ps:if>
		</ps:if>
	</ptt:toolBar>




</ps:form>
<script type="text/javascript">
	$(document).ready(
			function()
			{
				$.struts2_jquery.require("NewApiMaint.js",null,
						jQuery.contextPath + "/path/js/imco/newapi/");
				$("#newApiMaintFormId_" + _pageRef).processAfterValid(
						"newApiMaint_processSubmit", {});
			});
</script>