<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

	<!-- <div class="ui-state-active "></div> -->
	
	<ptt:toolBar id="pwsGenerationToolBar_${_pageRef}" hideInAlert="true">

		<ps:if test='%{(#iv_crud_${_pageRef}=="R")}' >
	 		 <psj:submit id="pwsGenerationSaveRequest_${_pageRef}" button="true"
				freezeOnSubmit="true" 
				buttonIcon="ui-icon-disk"
				onclick="pwsGeneration_processRequest('save')">
				<ps:label key="save_key" for="pwsGenerationSaveRequest_${_pageRef}" />
			 </psj:submit>
		</ps:if>
		
		<ps:if test='%{(#iv_crud_${_pageRef}=="M")}' >
			 <psj:submit id="pwsGenerationUpdateAfterApproveRequest_${_pageRef}" button="true"
				freezeOnSubmit="true" 
				buttonIcon="ui-icon-disk"
				onclick="pwsGeneration_processRequest('update')">
				<ps:label key="update_key" for="pwsGenerationUpdateAfterApproveRequest_${_pageRef}" />
			 </psj:submit>  
		</ps:if>
		
		<ps:if test='%{(#iv_crud_${_pageRef}=="P")}' >
			 <psj:submit id="pwsGenerationApproveRequest_${_pageRef}" button="true"
				freezeOnSubmit="true" 
				buttonIcon="ui-icon-disk"
				onclick="pwsGeneration_processRequest('approve')">
				<ps:label key="approve_key" for="pwsGenerationApproveRequest_${_pageRef}" />
			 </psj:submit>  
		
		</ps:if>
		
		<ps:if test='%{(#iv_crud_${_pageRef}=="D")}' >
			 <psj:submit id="pwsGenerationDeployRequest_${_pageRef}" button="true"
				freezeOnSubmit="true" 
				buttonIcon="ui-icon-disk"
				onclick="pwsGeneration_processRequest('deploy')">
				<ps:label key="deploy_key" for="pwsGenerationDeployRequest_${_pageRef}" />
			 </psj:submit>
	 	</ps:if>
	</ptt:toolBar>
		
	<psj:dialog id="save_configuration_dialog_${_pageRef}" width="400" height="400" href="%{saveConfigurationDialog}" title="" autoOpen="false">
		<div id = "configNameDiv_${_pageRef}">
			<ps:label key="config_name_key" id="lbl_config_name_${_pageRef}" for="configName_${_pageRef}" />
			<ps:textfield id="configName_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_NAME" cssStyle="width:100px"/>						
		</div>
	</psj:dialog>