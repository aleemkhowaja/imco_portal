<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:hidden id='mappingId_${_pageRef}' name='pwsDef.mappingVO.MAPPING_ID'  />

<ps:url id="mappingUrl" action="CommonPwsMappingAction_loadMultiMapGrid" namespace="/path/imco/pws" escapeAmp="false">
</ps:url>
					<div id="multiMappingGridDiv_${_pageRef}" class="collapsibleContainer" title="Services" style="width: 100%;padding: 5px">
						<psjg:grid id		="multiMappingGridTbl_Id_${_pageRef}"
							href			="%{mappingUrl}"  
					      	altRows       	="true"
					 	  	editinline 		="true"
					 	  	editurl			="abc"
					      	dataType   		="json"
					   	  	pager      		="true"
					   	  	sortable   		="true"
						  	filter         	="false"
					   	  	gridModel   	="gridModel"
					      	viewrecords 	="false"
					      	navigator    	="true"
					      	navigatorRefresh="false"
							navigatorEdit="false"
							navigatorSearch="false"
					      	navigatorAdd    ="true"
					      	navigatorDelete	="true"
					      	shrinkToFit		="true"
					      	pagerButtons	="false"
					      	autowidth="false"
					      	width			="400"
					      	height			="80"
					      	addfunc="addFunc"
					      	onEditInlineBeforeTopics="onEditBeforeMulti"
						>				
						
							<psjg:gridColumn id="SERVICE" width="150" colType="text" index="SERVICE" name="SERVICE" title="%{getText('service_desc')}"     
								editable="true" /> 
								
						      
							<psjg:gridColumn id="SERVICE_TYPE" width="100" name="SERVICE_TYPE" title="%{getText('service_type')}" index="SERVICE_TYPE" 
								colType="select" edittype="select" formatter="select" editable="true"  
								align="center" required="true" 
								editoptions="{ value:function() { return loadCombo('${pageContext.request.contextPath}/path/imco/pws/CommonPwsMappingAction_loadServicType','serviceActionType', 'code', 'descValue');}, dataEvents: [{type: 'change', fn: function(e) { enableDisableValidType()} }] }"/>
							      
							<psjg:gridColumn id="TEXT_EDITOR_JOB" width="50" colType="TEXT_EDITOR_JOB" editable="false" name="TEXT_EDITOR_JOB" index="TEXT_EDITOR_JOB"
								formatter="returnSettingIconButton" title="%{getText('job_key')}"  />
								
								
								<psjg:gridColumn id="VALIDATION_TYPE" width="100" name="VALIDATION_TYPE" title="%{getText('validation_type')}" index="VALIDATION_TYPE" 
								colType="select" edittype="select" formatter="select" editable="true"  
								align="center" required="false" 
								editoptions="{ value:function() { return loadCombo('${pageContext.request.contextPath}/path/imco/pws/CommonPwsMappingAction_loadValidationType?','validationType', 'code', 'descValue');} }"/>
							 
						</psjg:grid>
					</div>
				</div>
				
				
<script type="text/javascript">
$.subscribe("onEditBeforeMulti",function(rowObj){onEditBeforeMulti(rowObj)})
</script>				