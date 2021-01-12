<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<div id="pws_generation_bepl_div_${_pageRef}" title="<ps:text name='pwsgeneration_select_bpel_Key'/>" >

<ps:form id="bpel_import_${_pageRef}" useHiddenProps="true" cssClass="ui-widget-content">	
	
		<table width="100%" cellspacing="4">
			<tr>
				<table>
				
					
					<tr>
						<td>
							<ps:label key="pwsGeneration_wsdl_url_key" for="wsdl_url_${_pageRef}" />
						</td>
						<td>
							<ps:textfield  id="wsdl_url_${_pageRef}" name="webServiceExplorerCO.wsdlUrl" 
								onchange = "PWSGeneration_onWsdlUrlChange()" 
								parameter="webServiceExplorerCO.wsdlUrl:wsdl_url_${_pageRef},webServiceExplorerCO.adapterType:generation_type_${_pageRef}"
								dependency="wsdl_url_${_pageRef}:webServiceExplorerCO.wsdlUrl"
								mode="text" 
								readonly="" 
								cssStyle="height:20px">
							</ps:textfield>
						</td>
						<td colspan="11">
						</td>
						<td>
							
						</td>
					</tr>
				</table>
			</tr>
			<tr>
				<td colspan="9">
					<!-- <div class="ui-state-active"></div> -->
				</td>
			</tr>
	</table>
</br>

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
	
	$("#pws_generation_bepl_div_"+_pageRef).collapsiblePanel();
	$("#pwsGenerationBpelArgParamDiv_"+_pageRef).collapsiblePanel();
</script>