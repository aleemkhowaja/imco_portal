<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>

<ps:hidden name="fieldmapCO.defaultGridListString" id="updateMode_hdn_defaultColMapGrid_Id_${_pageRef}" />
<ps:hidden name="fieldmapCO.brcode" id="brcode_${_pageRef}" />
<ps:hidden name="fieldmapCO.entityCode" id="entityCode_${_pageRef}" />
<ps:hidden name="fieldmapCO.colNBR" id="colNBR_${_pageRef}" />
<ps:hidden name="fieldmapCO.rowId" id="rowId_${_pageRef}" />
<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
<table width="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td>
		
	<div class=" ui-state-default fldLabelView "><ps:text name="Default_Column_Mapping_key" /></div>
	<br>
		</td>
		<td>

		</td>
	</tr>
	<tr>
		<td>

		</td>
		<td>
		</td>
	</tr>
</table>
<jsp:include  page="DefaultColMapGrid.jsp"></jsp:include>
<br>
<table width="100%" cellpadding="0" cellspacing="0">
	<tr>
	<td width="10%"></td>
		<td width="10%">
<%-- 		<psj:submit id="Default_save_${_pageRef}" button="true" --%>
<%-- 				onclick="channelMaint_processDelete()" freezeOnSubmit="true" --%>
<%-- 				type="button"> --%>
<%-- 				<ps:text name="save_key"></ps:text> --%>
<%-- 			</psj:submit> --%>
	
		
	
		</td>
		
		<td width="10%">
		<psj:submit id="Default_ok_${_pageRef}" button="true"
				onclick="defaultcolMap_okprocess()" freezeOnSubmit="true"
				type="button">
				<ps:text name="	ok_key"></ps:text>
			</psj:submit>
	
	
		</td>
		
		<td width="10%">
		<psj:submit id="Default_cancel_${_pageRef}" button="true"
				onclick="fixColMap_close()" freezeOnSubmit="true"
				type="button">
				<ps:text name="cancel_key"></ps:text>
			</psj:submit>
	
	
		</td>
		<td width="60%"></td>
		
	</tr>
	
</table>
 
 


<script type="text/javascript">
$(document).ready(function() {					
							$.struts2_jquery.require("FieldMappingMaint.js" ,null,jQuery.contextPath+"/path/js/imco/fieldmapping/");
							$("#fieldMappingMaintFormId_"+_pageRef).processAfterValid("fieldMappingMaint_processSubmit",{});
						});
</script>