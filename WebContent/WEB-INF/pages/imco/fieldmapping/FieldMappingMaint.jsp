<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:form useHiddenProps="true" id="fieldMappingMaintFormId_${_pageRef}"
	namespace="/path/fieldMapping">
	<ps:hidden name="fieldmapCO.fieldmapGridListString"
		id="updateMode_hdn_fieldmapGrid_Id_${_pageRef}" />
	<ps:hidden name="fieldmapCO.checkactions"
		id="check_hdn_action_Id_${_pageRef}" />
	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />


	<psj:tabbedpanel id="FieldMappingTabs_${_pageRef}" sortable="true">
		<psj:tab id="fieldmappingTab_${_pageRef}" target="trackTab-1"
			key="fieldmapping" />
		<div id="trackTab-1_${_pageRef}">
			<div id="trackTab-1_content_${_pageRef}">
				<jsp:include page="FieldMappingGrid.jsp">
					<jsp:param value="U" name="theGrid" />
				</jsp:include>
			</div>
		</div>

	</psj:tabbedpanel>
		<table width="100%" cellpadding="0" cellspacing="0">
		<tr>
			<td>
			
			<ptt:toolBar id="fieldMaintToolBar_${_pageRef}" hideInAlert="true">
 <psj:submit id="field_save_${_pageRef}" button="true"
				onclick="fieldMap_save()" freezeOnSubmit="true"
				type="button">
				<ps:text name="save_key"></ps:text>
			</psj:submit>
</ptt:toolBar>
			
			
			
			
			
			
			
			
			
	</td>
			<td></td>
		</tr>
		<tr>
			<td></td>
			<td></td>
		</tr>
	</table>


</ps:form>


<script type="text/javascript">
	$(document).ready(
			function()
			{
				$.struts2_jquery.require("FieldMappingMaint.js", null,
						jQuery.contextPath + "/path/js/imco/fieldmapping/");
				$("#fieldMappingMaintFormId_" + _pageRef).processAfterValid(
						"fieldMappingMaint_processSubmit", {});
			});
</script>