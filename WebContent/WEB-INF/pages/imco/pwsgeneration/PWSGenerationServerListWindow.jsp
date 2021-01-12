<table width="100%" cellspacing="4">
		<tr>
			<table>
				<tr>
					<td>
						<ps:label key="conn_desc_key" for="lookuptxt_connId_" id="lbl_connDesc_${_pageRef}"/>
					</td>
					
					<td>
						<psj:livesearch id="connId_${_pageRef}"
							name="pwsGenerationCO.dgtlAdapterVO.CONN_ID"
							actionName="${pageContext.request.contextPath}/path/PWSGeneration/PWSGenerationLookup_constructLookupIrpConnections"
							searchElement="connId"
							parameter="pwsGenerationCO.connId:lookuptxt_connId_${_pageRef},pwsGenerationCO.connDesc:connectionDesc_${_pageRef},pwsGenerationCO.connDesc:connDesc_${_pageRef}"
							dependency="lookuptxt_connId_${_pageRef}:pwsGenerationCO.connId,connectionDesc_${_pageRef}:pwsGenerationCO.connDesc"
							resultList="pwsGenerationCO.connDesc:connectionDesc_${_pageRef}"
							dependencySrc="${pageContext.request.contextPath}/path/PWSGeneration/PWSGenerationMaint_connectionDepedency"
							mode="number" 
							maxlength="8" 
							afterDepEvent="reloadParamGrids()">
						</psj:livesearch>
					</td>
					<td>
					<!-- 
						<ps:textfield id="connectionDesc_${_pageRef}" name="pwsGenerationCO.connDesc" mode="text" readonly="true" cssStyle="height:20px"
						/>
					-->
					</td>
				</tr>
			</table>
		</tr>
		<tr>
			<table>
				<tr>
					<td>
						<ps:label key="pwsGeneration_procedure_key" for="procedureName_${_pageRef}" />
					</td>
					<td>
					<ps:textfield id="procedureName_${_pageRef}" name="pwsGenerationCO.procedureName" mode="text" readonly="" cssStyle="height:20px"
		              required="true"
		              parameter="pwsGenerationCO.procedureName:procedureName_${_pageRef},pwsGenerationCO.connId:lookuptxt_connId_${_pageRef},pwsGenerationCO.connDesc:connDes_${_pageRef}" 			              
		              dependency="procedureName_${_pageRef}:pwsGenerationCO.procedureName,procedureDesc_${_pageRef}:pwsGenerationCO.procedureDescription,connDesc_${_pageRef}:pwsGenerationCO.connDesc"
					  dependencySrc="${pageContext.request.contextPath}/path/PWSGeneration/PWSGenerationMaint_procedureNameDependency"
					  afterDepEvent="reloadParamGrid()"
					/>	
					</td>
					<td colspan="11">
					</td>
					<td>
						
					</td>
				</tr>
				
				<tr>
				
				</tr>
			</table>
		</tr>
		<tr>
			<td colspan="9">
			</td>
		</tr>
</table>
	<ps:url id="pwsGenerationParamURL" action="PWSGenerationProcParamList_loadProcedureArguments" namespace="/path/PWSGeneration" escapeAmp="false"> 
		<ps:param name="iv_crud" value="iv_crud" />
		<ps:param name="_pageRef" value="_pageRef" />
		<ps:param name="pwsGenerationCO.adapterIdSequence" value="pwsGenerationCO.adapterIdSequence" />
		<ps:param name="pwsGenerationCO.dgtlAdapterVO.ADAPTER_ID" value="pwsGenerationCO.dgtlAdapterVO.ADAPTER_ID" />
		<ps:param name="pwsGenerationCO.dgtlAdapterVO.API_NAME" value="pwsGenerationCO.dgtlAdapterVO.API_NAME" />
		<ps:param name="pwsGenerationCO.dgtlAdapterVO.CONN_ID" value="pwsGenerationCO.dgtlAdapterVO.CONN_ID" />
		<ps:param name="pwsGenerationCO.dgtlAdapterVO.DATE_UPDATED" value="pwsGenerationCO.dgtlAdapterVO.DATE_UPDATED" />
	</ps:url>
	<psjg:grid id="pwsGenerationParamTbl_Id_${_pageRef}"
		href="%{pwsGenerationParamURL}" dataType="json" pager="true"
		pagerButtons="false" filter="false" gridModel="gridModel"
		shrinkToFit="true" rowNum="-1" viewrecords="true" navigator="true"
		height="215" navigatorSearch="false" navigatorRefresh="false"
		editinline="true" editurl=" " navigatorEdit="false" rownumbers="true"
		navigatorAdd="false" navigatorDelete="false"
		onEditInlineBeforeTopics="applyArgPropreties">

	<psjg:gridColumn id="argName" colType="text"
		name="allArgumentsVO.ARGUMENT_NAME" index="argName"
		title="%{getText('sys_arg_name_key')}" sortable="false" search="true"
		align="center" editable="false" />

	<psjg:gridColumn id="dataType" colType="text"
		name="allArgumentsVO.DATA_TYPE" index="dataType"
		title="%{getText('sys_arg_name_key')}" sortable="false" search="true"
		align="center" editable="false" />

	<psjg:gridColumn id="inOut" colType="text" name="allArgumentsVO.IN_OUT"
		index="inOut" title="%{getText('sys_in_out_key')}" sortable="false"
		search="true" align="center" editable="false" />

	<psjg:gridColumn id="MAPPED_PARAM_NAME" colType="text"
		name="dgtlAdapterParamVO.MAPPED_PARAM_NAME" index="MAPPED_PARAM_NAME"
		title="%{getText('mapped_param_name_key')}" sortable="false"
		search="true" align="center" editable="true" />

	<psjg:gridColumn id="DESCRIPTION" colType="text"
		name="dgtlAdapterParamVO.DESCRIPTION" index="DESCRIPTION"
		title="%{getText('description_key')}" sortable="false" search="true"
		align="center" editable="true" hidden="true" />


	<psjg:gridColumn id="PARAM_TYPE" colType="text"
		name="dgtlAdapterParamVO.PARAM_TYPE" index="PARAM_TYPE"
		title="%{getText('param_type_key')}" sortable="false" search="true"
		align="center" editable="true" hidden="true" />


	<psjg:gridColumn id="IS_MANDATORY_YN" colType="text"
		name="dgtlAdapterParamVO.IS_MANDATORY_YN" index="IS_MANDATORY_YN"
		title="%{getText('is_mandatory_key')}" sortable="false" search="true"
		align="center" editable="true" hidden="true" />


	<psjg:gridColumn id="DEFAULT_VALUE" colType="text"
		name="dgtlAdapterParamVO.DEFAULT_VALUE" index="DEFAULT_VALUE"
		title="%{getText('default_value_key')}" sortable="false" search="true"
		align="center" editable="true" hidden="true" />


	<psjg:gridColumn id="IS_NILLABLE_YN" colType="text"
		name="dgtlAdapterParamVO.IS_NILLABLE_YN" index="IS_NILLABLE_YN"
		title="%{getText('is_nillable_key')}" sortable="false" search="true"
		align="center" editable="true" hidden="true" />
</psjg:grid>