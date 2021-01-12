<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<div id="pws_generation_bepl_div_${_pageRef}" title="<ps:text name='pwsgeneration_select_bpel_Key'/>" >

<ps:form id="bpel_import_${_pageRef}" useHiddenProps="true" cssClass="ui-widget-content">	
	
	<!-- Mandatory Hidden Fields for all extended grids -->
	<%@ include file = "/WEB-INF/pages/commonpwsmapping/webserviceexplorer/WebServiceExplorerCommonHiddenFields.jsp" %>
	
	<%@include file="PWSGenerationCommon.jsp"%>
	

<table width="100%" cellspacing="4">
	<tr>
		<td style="width:50%;">
			<ps:label key="File_Location_key" />
			
			<ps:file id="uploadBPEL_${_pageRef}"
					name="bpelFile" onchange="validateFileName(this);">
				</ps:file>
		</td>
		<td style="width:50%;">
		<!-- 
			<psj:submit button="true" onclick="PWSGeneration_upload()" type="button" buttonIcon="ui-icon-folder-open">
				<ps:label key="Open_Import_bpel_key" />
			</psj:submit>
		-->
		</td>
	</tr>
</table>
<br/>
</ps:form>
<ps:if test='%{(#iv_crud_${_pageRef}=="D")}' >
<table>
	<tr>
		<td>
			<ps:label key="pws_environment_type" id="lbl_pws_environment_type"
							for="environment_type_${_pageRef}" />
					</td>
					<td>
						<ps:select id="environment_type_${_pageRef}"
							name="pwsGenerationCO.dgtlAdapterVO.API_NAME"
							list="environmentTypeList" listKey="code" listValue="descValue"
							onchange="PWSGeneration_onChange1()"							
							cssStyle="width:100%;">
						</ps:select>
					</td>
					<td colspan="11">
					</td>
					<td>
						
					</td>
				</tr>
				
				</table>
</ps:if>
				
</div>

<div id="pwsGenerationExplorerGrid_${_pageRef}">

	</div>
	<!-- 
<div id="pwsGenerationBpelArgParamDiv_${_pageRef}" title="<ps:text name='pwsgeneration_parameters_Key'/>" >
<table>
<tr>
	
</tr>
</table>
</div>
-->
<script type="text/javascript">
	$.struts2_jquery.require("PWSGenerationMaint.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");
	$.struts2_jquery.require("WebServiceExplorerMaint.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");
	$("#pws_generation_bepl_div_"+_pageRef).collapsiblePanel();
	$("#pwsGenerationBpelArgParamDiv_"+_pageRef).collapsiblePanel();
</script>