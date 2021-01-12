<!-- User Story #740995 PWS generation From DB Procedure -screen -->

<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<!-- Mandatory Hidden Fields for all extended webServiceExplorer grids -->
<ps:hidden id="webServiceExplorerGrid_${_pageRef}" name="webServiceExplorerGridParamCO.mainGridActionRef" />
<ps:hidden id="webServiceExplorerSubGrid_${_pageRef}" name="webServiceExplorerGridParamCO.subGridActionRef" />
<ps:hidden id="webServiceExplorerListGrid_${_pageRef}" name="webServiceExplorerGridParamCO.listSubGridRef" />
<ps:hidden id="webServiceExplorerHashGrid_${_pageRef}" name="webServiceExplorerGridParamCO.hashSubGridRef" />
<ps:hidden id="webServiceExplorerScreenNameSpace_${_pageRef}" name="webServiceExplorerGridParamCO.screenNameSpace" />
<ps:set name="iv_crud_${_pageRef}" value="iv_crud" />
<ps:hidden id="ivcrud_${_pageRef}" name="iv_crud" />


<table width="100%" cellspacing="4">
		<tr>
			<table>
				<tr>
					<td style="width: 1%"></td>
					<td style="width: 10%"></td>
					<td style="width: 25%"></td>
					<td style="width: 10%"></td>
					<td style="width: 25%"></td>
					<td class="fldLabelView"  style="width:20%; text-align:right" >
						<ps:label key="status_key" for="status_${_pageRef}" id="lbl_statusId_${_pageRef}"/>	
					</td>
					<td style="width:10%;">
						<ps:textfield id="status_${_pageRef}" name="pwsGenerationCO.statusDesc" readonly="true" cssStyle="width:100px"/>
					</td>
					<td style="width:20%;text-align:right" >
						 <psj:a button="true" buttonIcon="ui-icon-triangle-2-s" onclick="pwsGeneration_onStatusClicked()"><ps:text name='status_key'/></psj:a>
					</td>
					<td  style="width: 10%"></td>
					<td  style="width: 25%"></td>
					<td  style="width: 10%"></td>
				</tr>
			</table>
		</tr>
		<tr>
			<table
				<tr>
					<td>
						<ps:label key="pws_generation_type" id="lbl_pws_generation_type"
							for="generation_type_${_pageRef}" />
					</td>
					<td>
						<ps:select id="generation_type_${_pageRef}"
							name="pwsGenerationCO.dgtlAdapterVO.ADAPTER_TYPE"
							list="generationTypeList" listKey="code" listValue="descValue"
							onchange="PWSGeneration_onChange()"							
							cssStyle="width:100%;">
						</ps:select>
					</td>
					<td colspan="11">
					</td>
					<td>
						
					</td>
				</tr>
			</table>
			</tr>
</table>
	<ps:if test='%{pwsGenerationCO.dgtlAdapterVO.ADAPTER_TYPE == "BPEL" }' >
			<%@include file="PWSFileDemo.jsp"%>
	</ps:if>
	<ps:else>
		<div id="pws_generation_main_div_${_pageRef}">
			<%@include file="PWSGenerationAPI.jsp"%>
		</div>
	</ps:else>
	<div id="pwsGeneration_toolbar_${_pageRef}" style="padding: 0.2em; width: 100%; position: relative;" class="ui-pwsGeneration-toolBar">
		    <%@include file="PWSGenerationToolBar.jsp"%>
	</div>

<script type="text/javascript">
	$(function(){	
		$.struts2_jquery.require("PWSGenerationMaint.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");	
		$.struts2_jquery.require("PWSGenerationAPIList.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");	
		$.struts2_jquery.require("PWSGenerationAPIMappingFieldsList.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");	
		$.struts2_jquery.require("PWSGenerationBPELList.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");
		$.struts2_jquery.require("PWSGenerationServerListWindow.js" ,null,jQuery.contextPath+"/path/js/imco/pwsgeneration/");	
		$.struts2_jquery.require("CommonPwsMappingMaint.js", null, jQuery.contextPath
				+ "/path/js/commonpwsmapping/pwsmapping/");

	});	
</script>