<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<div id="pws_generation_api_div_${_pageRef}" title="<ps:text name='pwsgeneration_data_Key'/>" >
	<table width="100%" cellspacing="4">
			<tr>
				<table>
					<tr>
						<td>
							<ps:label key="pwsGeneration_serviceName_key" for="serviceName_${_pageRef}" />
						</td>
						<td>
							<ps:textfield id="serviceName_${_pageRef}" name="pwsGenerationCO.dgtlAdapterVO.SERVICE_NAME" mode="text" readonly="" cssStyle="height:20px"
								   required="true"
								/>
						</td>
						<td colspan="11">
						</td>
						<td>
							
						</td>
					</tr>
					
					<tr>
						<td>
							<ps:label key="pwsGeneration_operationName_key" for="operationName_${_pageRef}" />
						</td>
						<td>
							<ps:textfield id="operationName_${_pageRef}" name="pwsGenerationCO.dgtlAdapterVO.OPERATION_NAME" mode="text" readonly="" cssStyle="height:20px"
								   required="true"
								/>
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
</div>

<div id="pwsGenerationApiArgParamDiv_${_pageRef}" title="<ps:text name='pwsgeneration_parameters_Key'/>" >
	<table style="width: 100%; table-layout: fixed; height: auto;" ;cellpadding="0" cellspacing="0">
		<tbody>
			<tr>
				<%@include file="PWSGenerationServerListWindow.jsp"%>
			</tr>
		</tbody>
	</table>
</div>

<script type="text/javascript">
	$.struts2_jquery.require("PWSGenerationMaint.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");
	$("#pwsGenerationApiArgParamDiv_"+_pageRef).collapsiblePanel();
	$("#pws_generation_api_div_"+_pageRef).collapsiblePanel();
</script>