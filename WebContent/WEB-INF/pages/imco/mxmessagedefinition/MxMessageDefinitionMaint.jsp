<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>


<ps:form id="mxMessageDefForm_${_pageRef}" target="_blank" applyChangeTrack="true" useHiddenProps="true" >

	<ps:hidden id="checkEditor_${_pageRef}" />
	<ps:hidden name="mxMessageDefinitionCO.dgtl_MSG_DEFVO.MSG_SCHEMA" id="msgSchema_${_pageRef}" />
	<ps:hidden name="mxMessageDefinitionCO.dgtl_MSG_DEFVO.DGTL_MSG_DEF_ID" id="DGTL_MSG_DEF_ID_${_pageRef}" />
	<ps:hidden name="mxMessageDefinitionCO.selectedTagsJson" id="selectedTagsData_${_pageRef}" />
	<ps:hidden name="mxMessageDefinitionCO.dgtl_MSG_DEFVO.DATE_UPDATED" id="DATE_UPDATED_${_pageRef}" />
	<ps:hidden name="mxMessageDefinitionCO.dgtl_MSG_DEFVO.STATUS" id="STATUS_${_pageRef}" />
	<ps:hidden name="mxMessageDefinitionCO.oldCode" id='oldCode_${_pageRef}'></ps:hidden>
	
	<ps:hidden name="isLeafClickable" id="isLeafClickable_${_pageRef}" />
	
	<ps:hidden name="mxMessageDefinitionCO.mode" id='crudMode_${_pageRef}'></ps:hidden>
	<ps:hidden id='saveRecord_${_pageRef}' value="0"  ></ps:hidden>
	<ps:hidden id="isFormChanged_${_pageRef}" name="isFormChanged" />
	<ps:hidden name="mxMessageDefinitionCO.updateMode" id="updateMode_hdn_${_pageRef}" />
	
	
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
	
	
	
	<!-- Use to add dynamically hidden fields where all grid data availble -->
	<div id="gridData_${_pageRef}">
		<ps:hidden id="countGridData_${_pageRef}" name="gridCount" />
		
	</div>
	
	<div id="file_structure_form_${_pageRef}" class="connectedSortable ui-helper-reset" style="margin-bottom: 5px; margin-top: 3px;">
		<div id="file_structureInner_form_${_pageRef}" class="collapsibleContainer" title="<ps:text name='file_details_key' />">
		    <table width="100%" cellpadding="2" cellspacing="1">
				<tr>
					<td style="width: 1%"></td>
					<td style="width: 10%"></td>
					<td style="width: 25%"></td>
					<td style="width: 10%"></td>
					<td style="width: 25%"></td>
					<td class="fldLabelView"  style="width:20%; text-align:right" >
						<ps:label key="status_key" for="status_${_pageRef}" id="lbl_statusDesc_${_pageRef}"/>	
					</td>
					<td style="width:10%;">
						<ps:textfield name="mxMessageDefinitionCO.statusDesc"
							id="statusDesc_${_pageRef}" readonly="true"
							cssStyle="background:${mxMessageDefinitionCO.statusColorCode}!important;color:white!important;text-align:center!important">
						</ps:textfield>
					</td>
					<td style="width:20%;text-align:right" >
						 <psj:a button="true" buttonIcon="ui-icon-triangle-2-s" tabindex="15" onclick="MxMessageDefList_onStatusClicked()"><ps:text name='status_key'/></psj:a>
					</td>
					<td  style="width: 10%"></td>
					<td  style="width: 25%"></td>
					<td  style="width: 10%"></td>
				</tr>
			</table>
			
			<table>
			    <tr>
					<td>
						<ps:label id="lbl_briefName_${_pageRef}" key="brief_name_key" for="briefName_${_pageRef}"></ps:label>
					</td>
					<td colspan="2" nowrap="nowrap">
						<ps:textfield id="briefName_${_pageRef}" required="true"
							name="mxMessageDefinitionCO.dgtl_MSG_DEFVO.BRIEF_NAME" maxlength="100"
							mode="text" cssStyle="text-transform:uppercase;" tabindex="1" size="70"
							>
						</ps:textfield>
					</td>
				</tr>
				<tr>
					<td nowrap="nowrap">
						<ps:label id="lbl_file_desc_${_pageRef}" key="long_name_key" for="long_name_${_pageRef}"></ps:label>
					</td>
					<td colspan="2" nowrap="nowrap">
						<ps:textfield id="long_name_${_pageRef}" name="mxMessageDefinitionCO.dgtl_MSG_DEFVO.LONG_NAME" maxlength="100" mode="text" tabindex="2" size="70">
						</ps:textfield>
					</td>
				</tr>
				<tr id="row_fileUploading_${_pageRef}" >
					<td nowrap="nowrap">
				    	<ps:label key="upload_file_key" for="upload_${_pageRef}"></ps:label>
				    </td>
				    <td nowrap="nowrap" colspan="2">
				     	<ps:file name="mxMessageDefinitionCO.xsdFile" id="upload_${_pageRef}" size="57" tabindex="3" onchange="MxMessageDefinitionMaint_uploadFile();" />
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

	<ptt:toolBar id="dynamicFileTextEditorToolBar_${_pageRef}" hideInAlert="true">
	
		<ps:if test='%{@com.path.imco.bo.common.ImcoCommonConstants@IV_CRUD_MAINTENANCE.equals(iv_crud)}'>
			<ps:if test='%{@com.path.imco.bo.common.ImcoCommonConstants@STATUS_ACTIVE.equals(mxMessageDefinitionCO.dgtl_MSG_DEFVO.STATUS) 
												|| mxMessageDefinitionCO.dgtl_MSG_DEFVO.STATUS == null}'>
												
				<psj:submit id="save_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-disk">
					<ps:label key="Save_key" for="textEditor_save_${_pageRef}"/>
			    </psj:submit>
			</ps:if>
	   
	   
	   			<ps:if test='%{@com.path.imco.bo.common.ImcoCommonConstants@STATUS_ACTIVE.equals(mxMessageDefinitionCO.dgtl_MSG_DEFVO.STATUS)
							&& mxMessageDefinitionCO.dgtl_MSG_DEFVO.DGTL_MSG_DEF_ID != null}'>
				<psj:submit id="delete_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-trash" 
		    				onclick="MxMessageDefinitionMaint_processDelete()">
			   		<ps:label key="Delete_key" for="isoMessage_del_${_pageRef}"/>
			    </psj:submit>							
			</ps:if>
		</ps:if>
		
		<ps:if test='%{@com.path.imco.bo.common.ImcoCommonConstants@IV_CRUD_APPROVE.equals(iv_crud)}'>
			<psj:submit id="approve_${_pageRef}" button="true" freezeOnSubmit="true" 
				onclick="MxMessageDefinitionMaint_processApprove()" buttonIcon="ui-icon-disk">
		    	<ps:label key="approve_key" for="atmInterfaceMaint_approve_${_pageRef}"/>
		    </psj:submit>
		</ps:if>
		
		<ps:if test='%{@com.path.imco.bo.common.ImcoCommonConstants@IV_CRUD_UPDATE_AFTER_APPROVE.equals(iv_crud)}'>
			 <psj:submit id="update_${_pageRef}" button="true" freezeOnSubmit="true" buttonIcon="ui-icon-disk">
		    	<ps:label key="Update_key" for="atmIntMaintUpdate_${_pageRef}"/>
		     </psj:submit>
		</ps:if>
	</ptt:toolBar>
	
</ps:form>

<script type="text/javascript">
$(document).ready(function() 
{                                
    $("#mxMessageDefForm_"+_pageRef).processAfterValid("MxMessageDefMaint_processSubmit",{});
    $("div#file_structure_form_"+_pageRef+" .collapsibleContainer").collapsiblePanel();

    $("#gview_mxMessageDefinitionGridTbl_Id_"+_pageRef+" div.ui-jqgrid-titlebar").hide();
  
   // $("#xmlEditor_"+_pageRef).hide();
	//$("#textEditor_"+_pageRef).hide(); 
});

</script>

<style>
	#xmlFileDialog_${_pageRef} > .ui-dialog-buttonset{
		text-align: center !important;
	}
</style>
