<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>

<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:set name="Duplicate_Value_key"
	value="%{getEscText('Duplicate_Value_key')}" />
	
<ps:hidden id='accessWebServiceStatus_${_pageRef}' name='accesswebserviceCO.imcoPwsTmpltMasterVO.STATUS'  />
<ps:set name="accessWebServiceStatus_${_pageRef}"    value="accesswebserviceCO.imcoPwsTmpltMasterVO.STATUS"/>
<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
<ps:set name="missing_template_id_var" 	 value="%{getEscText('missing_template_id')}"/>

<ps:form id="accessWebServiceMaintFormId_${_pageRef}" useHiddenProps="true" namespace="/path/accessWebService">
	<table width="100%" cellpadding="0" cellspacing="0">
		<tr>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="10%"></td>
		</tr>
		<tr>
			<td>
				</br>
			</td>
		</tr>
		<tr>
			<td colspan="1">
				<ps:label key="TEMPLATE_ID_key" for="template_id_${_pageRef }" id="template_id_lbl_${_pageRef}"></ps:label>
			</td>
			<td colspan="1">
				<ps:textfield mode="number" id="template_id_${_pageRef }" 
				 dependencySrc="${pageContext.request.contextPath}/path/accessWebService/AccessWebServiceMaintAction_onChangeTemplateID"
	    		 parameter="accesswebserviceCO.imcoPwsTmpltMasterVO.TEMPLATE_ID:template_id_${_pageRef }"
	   			 dependency="template_id_${_pageRef }:accesswebserviceCO.imcoPwsTmpltMasterVO.TEMPLATE_ID"
				 name="accesswebserviceCO.imcoPwsTmpltMasterVO.TEMPLATE_ID" leadZeros="8" maxlength="8" required="true"></ps:textfield>
			  </td>
			  <td colspan ="6"></td>
			  <td colspan="1">
					<ps:textfield name="accesswebserviceCO.statusDesc"
					id="statusDesc_${_pageRef}" readonly="true"
					cssStyle="text-align:center">
					</ps:textfield>
			  </td>
			  <td colspan="1"><psj:a button="true" href="#"
					buttonIcon="ui-icon-triangle-2-s"
					onclick="accessbywebservice_onStatusClicked()">
					<ps:text name='status_key' />
					</psj:a>
			  </td>
		</tr>
		<tr>
			<td colspan="1">
				<ps:label key="Description_key" for="Description_id_${_pageRef }" id="Description_lbl_${_pageRef}"></ps:label>
			</td>
			<td colspan="3">
				<ps:textfield  id="Description_id_${_pageRef }" name="accesswebserviceCO.imcoPwsTmpltMasterVO.TEMPLATE_DESC" maxlength="40"></ps:textfield>
			</td>
		</tr>
		<tr>
			<td>
				</br>
			</td>
		</tr>
	</table>
							
	<div id="webServiceExplorerCollapse_${_pageRef}" style="padding:0.5em;height: auto;" title="<ps:text name="main_information_key"/>" >
		<table style="width: 100%; table-layout: fixed;cellpadding="0" cellspacing="0"  >
			<tr >
				<td width="40%" valign="top">
					<div id="webServiceGuiTree_${_pageRef}" style="min-height:500px;max-height:500px;overflow: scroll;padding: 3px">
						<%@include file="WebServiceExplorerTreeGrid.jsp"%>
				    </div>
				</td>
				
				  <td width="60%" valign="top">   
					<div id="webServiceGuiGrid_${_pageRef}" style="min-height:500px;max-height:500px;overflow: scroll;padding: 3px">  
					</div>
				</td>
	
			</tr>
		</table>
	</div>
	
	<ps:hidden name="updates" id="updateAwSParameter_${_pageRef}"></ps:hidden>
	<ps:hidden name="rowIdOnExpand" id="rowIdOnExpand_${_pageRef}"></ps:hidden>
	
	<ps:hidden id="nameSpaceUri_${_pageRef}" name="webServiceExplorerCO.nameSpaceUri" />
	<ps:hidden id="nameSpacePrefix_${_pageRef}" name="webServiceExplorerCO.nameSpacePrefix" />
	<ps:hidden id="soapAction_${_pageRef}" name="webServiceExplorerCO.soapAction" />
	<ps:hidden id="wsdlUrl_${_pageRef}" name="webServiceExplorerCO.wsdlUrl" />
	<ps:hidden id="webServiceExplorerGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerGridUpdates" />
	<ps:hidden id="webServiceExplorerSubGridGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerSubGridUpdates" />	
	<ps:hidden id="webServiceExplorerMappingParams_${_pageRef}" name="webServiceExplorerCO.mappingJsonString" />	
	<ps:hidden id="webServiceExplorerHashMapSubGridGridUpdates_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerHashGridListUpdates" />	
	<ps:hidden id="application_name_desc_${_pageRef}" name="webServiceExplorerCO.applicationName" />	
	<ps:hidden id="webservice_name_desc_${_pageRef}" name="webServiceExplorerCO.webServiceName" />	
	<ps:hidden id="operation_name_lkp_desc_${_pageRef}" name="webServiceExplorerCO.operationName" />	
	<ps:hidden id="serviceDataId_${_pageRef}" name="webServiceExplorerCO.webServiceExplorerConfigVO.CONFIG_ID" />	
	<ps:hidden id="DATE_UPDATED_${_pageRef}" name="accesswebserviceCO.imcoPwsTmpltMasterVO.DATE_UPDATED" />	
	<!-- Mandatory Hidden Fields for all extended webServiceExplorer grids -->
	<ps:hidden id="webServiceExplorerGrid_${_pageRef}" name="webServiceExplorerGridParamCO.mainGridActionRef" />	
	<ps:hidden id="webServiceExplorerSubGrid_${_pageRef}" name="webServiceExplorerGridParamCO.subGridActionRef" />	
	<ps:hidden id="webServiceExplorerListGrid_${_pageRef}" name="webServiceExplorerGridParamCO.listSubGridRef" />	
	<ps:hidden id="webServiceExplorerHashGrid_${_pageRef}" name="webServiceExplorerGridParamCO.hashSubGridRef" />		
	<ps:hidden id="webServiceExplorerScreenNameSpace_${_pageRef}" name="webServiceExplorerGridParamCO.screenNameSpace" />	
	
</ps:form>	

<div style="padding:5px;">	
	<ptt:toolBar id="accessWebServiceMaintToolBar_${_pageRef}" hideInAlert="true">
	   		<ps:if test='%{#ivcrud_${_pageRef}=="R"}'>
				<ps:if test='%{#accessWebServiceStatus_${_pageRef}==null || #accessWebServiceStatus_${_pageRef}=="A"}'>
					<psj:submit id="accessWebService_save_${_pageRef}" button="true" freezeOnSubmit="true" onclick="accessWebServiceMaint_processSubmit()">
			    		<ps:label key="Save_key" for="accessWebService_save_${_pageRef}"/>
			    	</psj:submit>
		   		</ps:if>	
			    <ps:if test='%{#accessWebServiceStatus_${_pageRef}=="A"}'>
				    <psj:submit id="accessWebService_delete_${_pageRef}" button="true" type="button" freezeOnSubmit="true"  onclick="accessWebService_processDelete()">
				    	<ps:label key="Delete_key" for="accessWebService_delete_${_pageRef}"/>
				    </psj:submit>
				</ps:if>	
	  	    </ps:if>
	  	    <ps:if test='%{#ivcrud_${_pageRef}=="P"}'>
		    <psj:submit id="accessWebService_approve_${_pageRef}" button="true" freezeOnSubmit="true"  onclick="accessWebService_processApprove()">
		    	<ps:label key="approve_key" for="accessWebService_approve_${_pageRef}"/>
		    </psj:submit>
		</ps:if>
		<ps:if test='%{#ivcrud_${_pageRef}=="UP"}'>
		    <psj:submit id="accessWebService_UpdateAfterApprove_${_pageRef}" button="true" freezeOnSubmit="true" onclick="accessWebServiceMaint_processSubmit()">
		    	<ps:label key="update_key" for="accessWebService_UpdateAfterApprove_${_pageRef}"/>
		    </psj:submit>		
		</ps:if>
	</ptt:toolBar>
</div>										
					
<script type="text/javascript">
	var missing_template_id = "${missing_template_id_var}";
	var mainGridActionRef = $("#webServiceExplorerGrid_"+_pageRef).val();
	var subGridActionRef = $("#webServiceExplorerSubGrid_"+_pageRef).val();
	var screenNameSpace = $("#webServiceExplorerScreenNameSpace_"+_pageRef).val();
	$(function(){
		var listSubGridRef = $("#webServiceExplorerListGrid_"+_pageRef).val();
		var hashSubGridRef = $("#webServiceExplorerHashGrid_"+_pageRef).val();
	});
	var Duplicate_Value_key = "${Duplicate_Value_key}";
	$(document).ready(function() {
						$.struts2_jquery.require("AccessWebServiceMaint.js",null, jQuery.contextPath + "/path/js/imco/accesswebservice/");
// 						$("#accessWebServiceMaintFormId_" + _pageRef).processAfterValid("accessWebServiceMaint_processSubmit",{});
						$.struts2_jquery.require("WebServiceExplorerHashGridList.js", null,jQuery.contextPath + "/path/js/imco/webserviceexplorer/");
						$.struts2_jquery.require("WebServiceExplorerSubGridList.js", null,jQuery.contextPath + "/path/js/imco/webserviceexplorer/");
						$.struts2_jquery.require("WebServiceExplorerListSubGrid.js", null,jQuery.contextPath + "/path/js/imco/webserviceexplorer/");
						$.struts2_jquery.require("WebServiceExplorerList.js", null, jQuery.contextPath + "/path/js/imco/webserviceexplorer/");
						$.struts2_jquery.require("WebServiceExplorerMaint.js", null, jQuery.contextPath + "/path/js/imco/webserviceexplorer/");
						$.struts2_jquery.require("WebServiceExplorerSubGridList.js", null, jQuery.contextPath + "/path/js/imco/webserviceexplorer/");
					

						var orgExpandNode = $.fn.jqGrid.expandNode;
						var orgCollapseNode = $.fn.jqGrid.collapseNode;
						var orgExpandRow = $.fn.jqGrid.expandRow;
						$.jgrid.extend({
						expandNode: function (rc) {
						    var rowId = rc._id_ ;
						    var type = $("#treeGridOpt_"+_pageRef).jqGrid("getCell", rowId, "imcoPwsTmpltDetVO.TYPE");
						    var exclude = $("#treeGridOpt_"+_pageRef).jqGrid("getCell", rowId, "imcoPwsTmpltDetVO.EXCLUDE_ACCESS_YN");
						    if(type == "A")
						    {
						    	return false;
						    }
						    return orgExpandNode.call(this, rc);
						},
						expandRow: function (record){
							var rowId = record._id_ ;
						    var type = $("#treeGridOpt_"+_pageRef).jqGrid("getCell", rowId, "imcoPwsTmpltDetVO.TYPE");
							if(type == "A")
						    {
						    	return false;
						    }
							$("#rowIdOnExpand_" + _pageRef).val(rowId);
							return orgExpandRow.call(this,record);
						},
						collapseNode: function (rc) {
							var rowId = rc._id_ ;
						    var type = $("#treeGridOpt_"+_pageRef).jqGrid("getCell", rowId, "imcoPwsTmpltDetVO.TYPE");
							if(type == "S")
						    {
						    	return orgCollapseNode.call(this, rc);
						    }
							
							return this.each(function(){
								if(!this.grid || !this.p.treeGrid) {return;}
								var expanded = this.p.treeReader.expanded_field;
								if(rc[expanded]) {
									rc[expanded] = false;
									var id = $.jgrid.getAccessor(rc,this.p.localReader.id);
									var rc1 = $("#"+id,this.grid.bDiv)[0];
									$("div.treeclick",rc1).removeClass(this.p.treeIcons.minus+" tree-minus").addClass(this.p.treeIcons.plus+" tree-plus");
								}
							});
// 						    return orgCollapseNode.call(this, rc);
						}
						});

	
	
	});
	$("#webServiceExplorerCollapse_" + _pageRef).collapsiblePanel();
	document.getElementById('mainTabs').style.overflowX = "hidden";
	document.getElementById('webServiceGuiTree_'+_pageRef).style.overflowX = "hidden";
	document.getElementById('webServiceGuiGrid_'+_pageRef).style.overflowX = "hidden";
</script>
					