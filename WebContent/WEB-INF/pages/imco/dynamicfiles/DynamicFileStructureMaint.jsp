<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>


<ps:form id="uploadDynamicFile_${_pageRef}" target="_blank" applyChangeTrack="true" useHiddenProps="true" >

	<ps:hidden id="checkEditor_${_pageRef}" />
	<ps:hidden name="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_SAMPLE" id="xonomyXml_${_pageRef}" />
	<ps:hidden name="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_STRUCTURE_ID" id="FILE_STRUCTURE_ID_${_pageRef}" />
	<ps:hidden name="xonomyDocSpec" id="xonomyDocSpecid${_pageRef}" />
	<ps:hidden id='saveRecord_${_pageRef}' value="0"  ></ps:hidden>
	<ps:hidden id="selectedMessage_${_pageRef}" />
	<ps:hidden id="fileType_${_pageRef}" name="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_TYPE"/>
	<ps:hidden id="xmlMessagesGridData_${_pageRef}" name="dynamicFileStructureCO.xmlMessagesGridData"/>
	<ps:hidden id="xmlMsgGridChangedData_${_pageRef}" name="dynamicFileStructureCO.xmlMsgGridChangedData"/>
	<ps:hidden id="dynamicStructureFileSeprator_${_pageRef}" />
	<ps:hidden id="dynamicStructureFileJob_${_pageRef}" name="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.JOB_ID"/>
	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
	<ps:set name="DYNAMIC_FILE_STRUCTURE_ID_${_pageRef}" value="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_STRUCTURE_ID" />
	<ps:set name="FILETYPE_${_pageRef}" value="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.FILE_TYPE"/> 
	
	<div id="file_structure_form_${_pageRef}" class="connectedSortable ui-helper-reset" style="margin-bottom: 5px; margin-top: 3px;">
		<div id="file_structureInner_form_${_pageRef}" class="collapsibleContainer" title="<ps:text name='file_details_key' />">
			<table>
			    <tr>
					<td>
						<ps:label id="lbl_file_reference_${_pageRef}" key="fcsr_reference_key" for="file_reference_${_pageRef}"></ps:label>
					</td>
					<td>
						<ps:textfield id="file_reference_${_pageRef}" required="true" name="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.REFERENCE"
							maxlength="6" mode="text" cssStyle="text-transform:uppercase;" tabindex="1" 
							onchange="dynamicFileStructureMaint_changeCase(this);dynamicFileStructure_checkRefUnique();"
							size="25" >
						</ps:textfield>
					</td>
				</tr>
				<tr>
					<td nowrap="nowrap">
						<ps:label id="lbl_file_desc_${_pageRef}" key="fcsr_brief_name_key" for="file_desc_${_pageRef}"></ps:label>
					</td>
					<td colspan="2" nowrap="nowrap">
						<ps:textfield id="file_desc_${_pageRef}" name="dynamicFileStructureCO.dyn_FILE_STRUCTUREVO.DESCRIPTION" maxlength="100" mode="text" tabindex="3" size="70">
						</ps:textfield>
					</td>
				</tr>
				<tr id="row_fileUploading_${_pageRef}" >
					<td nowrap="nowrap">
				    	<ps:label key="upload_file_key" for="upload_${_pageRef}"></ps:label>
				    </td>
				    <td nowrap="nowrap" colspan="2">
				     	<ps:file name="upload" id="upload_${_pageRef}" size="57" tabindex="14" onchange="DynamicFileStructureList_uploadFile();" />
				    </td>
				</tr>
				<tr>
					<td nowrap="nowrap">
						<ps:label id="lbl_job_desc_${_pageRef}" key="start_of_file_jobs" for="start_job_desc_${_pageRef}"></ps:label>
					</td>
					<td colspan="2" nowrap="nowrap">
						<psj:a id="start_job_button_${_pageRef}" button="true" onclick="openCommonMultiMapping(100000)">
							<img border="0" src="${pageContext.request.contextPath}/common/images/options-icon.png">
						</psj:a>
					</td>
				</tr>
				<tr>
					<td nowrap="nowrap">
						<ps:label id="lbl_job_desc_${_pageRef}" key="end_of_file_jobs" for="end_job_desc_${_pageRef}"></ps:label>
					</td>
					<td colspan="2" nowrap="nowrap">
						<psj:a id="end_job_button_${_pageRef}" button="true" href="#" onclick="openCommonMultiMapping(200000)">
							<img border="0" src="${pageContext.request.contextPath}/common/images/options-icon.png">
						</psj:a>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div id = "constraintsMainDialog_${_pageRef}"></div>
	<div id = "xmlExpressionDialog_${_pageRef}"></div>
	<div id="dynamicStructureTextFileDialog_${_pageRef}"></div>
	<div id="xmlEditor_${_pageRef}">
		<%@include file="XmlEditor.jsp"%>
	</div>
	<div id="textEditor_${_pageRef}">
		<%@include file="TextEditor.jsp"%>
	</div>

	<ptt:toolBar id="dynamicFileTextEditorToolBar_${_pageRef}" hideInAlert="true">
		<psj:submit id="textEditor_save_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-disk">
			<ps:label key="Save_key" for="textEditor_save_${_pageRef}"/>
	    </psj:submit>
	    <psj:submit id="textEditor_del_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-trash" onclick="dynamicFileStructureMaint_onDeleteClicked()">
	   		<ps:label key="Delete_key" for="textEditor_del_${_pageRef}"/>
	    </psj:submit>		
	</ptt:toolBar>
	
</ps:form>

<script type="text/javascript">
$(document).ready(function() 
{                                
    $("#uploadDynamicFile_"+_pageRef).processAfterValid("dynamicFileStructureMaint_processSubmit",{});
    $("div#file_structure_form_"+_pageRef+" .collapsibleContainer").collapsiblePanel();

    $("#gview_dynamicFileStructureListGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
    
    $.struts2_jquery.require("XmlEditor.js,DynamicFileStructureMaint.js,DynamicFileStructureList.js,FileEditors.js", null, jQuery.contextPath + "/path/js/imco/dynamicfiles/");
	$.struts2_jquery.require("xonomy.js", null, jQuery.contextPath + "/path/js/imco/dynamicfiles/xonomy/");
	$.struts2_jquery.require("CommonPwsMappingMaint.js", null, jQuery.contextPath+ "/path/js/imco/pwsmapping/");
	$.struts2_jquery.require("WebServiceExplorerMaint.js,WebServiceExplorerList.js" ,null,jQuery.contextPath+"/path/js/imco/webserviceexplorer/");	
	$.struts2_jquery.require("WebServiceExplorerListSubGrid.js" ,null,jQuery.contextPath+"/path/js/imco/webserviceexplorer/");	
	$.struts2_jquery.require("WebServiceExplorerSubGridList.js" ,null,jQuery.contextPath+"/path/js/imco/webserviceexplorer/");
	$.struts2_jquery.require("WebServiceExplorerHashGridList.js" ,null,jQuery.contextPath+"/path/js/imco/webserviceexplorer/");	
	$.struts2_jquery.require("WebServiceExplorerTree.js" ,null,jQuery.contextPath+"/path/js/imco/webserviceexplorer/");	
	$("#xmlEditor_"+_pageRef).hide();
	$("#textEditor_"+_pageRef).hide(); 
});

</script>

<style>
	#xmlFileDialog_${_pageRef} > .ui-dialog-buttonset{
		text-align: center !important;
	}
</style>
