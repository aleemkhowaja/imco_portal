	<table width="100%" cellspacing="4">
			<tr>
				<table>
					<tr>
						<td>
							<ps:label key="pwsGeneration_businessDomain_key" for="businessDomain_${_pageRef}" />
						</td>
						<td>
							<ps:textfield id="businessDomain_${_pageRef}" name="pwsGenerationCO.businessDomain" mode="text" readonly="" cssStyle="height:20px"
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
					
					<tr>
						<td>
							<ps:label key="pwsGeneration_wsdl_url_key" for="wsdl_url_${_pageRef}" />
						</td>
						<td>
							<ps:textfield  id="wsdl_url_${_pageRef}" name="webServiceExplorerCO.inputwsdlUrl" 
								onchange = "PWSGeneration_onWsdlUrlChange()" 
								dependencySrc="${pageContext.request.contextPath}/path/PWSGeneration/PWSGenerationDependencyAction_loadPWSGenerationWebserviceExplorerGrid"
								parameter="webServiceExplorerCO.inputwsdlUrl:wsdl_url_${_pageRef}"
								dependency="wsdl_url_${_pageRef}:webServiceExplorerCO.inputwsdlUrl"
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
					
					<tr>
						<td>
							<ps:label key="pwsGeneration_wsdl_url_key" for="wsdl_url_${_pageRef}" />
						</td>
						<td>
							<ps:textfield  id="wsdl_url_${_pageRef}" name="webServiceExplorerCO.inputwsdlUrl" 
								onchange = "PWSGeneration_onWsdlUrlChange()" 
								dependencySrc="${pageContext.request.contextPath}/path/PWSGeneration/PWSGenerationDependencyAction_loadPWSGenerationWebserviceExplorerGrid"
								parameter="webServiceExplorerCO.inputwsdlUrl:wsdl_url_${_pageRef}"
								dependency="wsdl_url_${_pageRef}:webServiceExplorerCO.inputwsdlUrl"
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
					
					<tr>
						<td>
							<ps:label key="pwsGeneration_wsdl_url_key" for="wsdl_url_${_pageRef}" />
						</td>
						<td>
							<ps:textfield  id="wsdl_url_${_pageRef}" name="webServiceExplorerCO.inputwsdlUrl" 
								onchange = "PWSGeneration_onWsdlUrlChange()" 
								dependencySrc="${pageContext.request.contextPath}/path/PWSGeneration/PWSGenerationDependencyAction_loadPWSGenerationWebserviceExplorerGrid"
								parameter="webServiceExplorerCO.inputwsdlUrl:wsdl_url_${_pageRef}"
								dependency="wsdl_url_${_pageRef}:webServiceExplorerCO.inputwsdlUrl"
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
