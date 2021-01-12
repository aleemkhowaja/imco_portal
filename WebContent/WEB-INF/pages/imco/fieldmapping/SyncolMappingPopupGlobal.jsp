<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>

<ps:hidden name="fieldmapCO.globalGridListString" id="updateMode_hdn_globalColMapGrid_Id_${_pageRef}" />
<ps:hidden name="fieldmapCO.brcode" id="brcode_${_pageRef}" />
<ps:hidden name="fieldmapCO.entityCode" id="entityCode_${_pageRef}" />
<ps:hidden name="fieldmapCO.colNBR" id="colNBR_${_pageRef}" />
<ps:hidden name="fieldmapCO.rowId" id="rowId_${_pageRef}" />
<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
<table width="100%" cellpadding="0" cellspacing="0">
	<tr>
		<td>
		<div class=" ui-state-default fldLabelView "><ps:text name="Global_Column_Mapping_key" /></div>
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

<%--    <psj:tabbedpanel id="SyncolMapTabs_${_pageRef}" sortable="true"> --%>
<%--   <psj:tab id="SyncolMapTab_${_pageRef}" target="trackTab-1" key="SyncColMapping" /> --%>
<%--   <div id="trackTab-1_${_pageRef}"> --%>
<%--    <div id="trackTab-1_content_${_pageRef}"> --%>
<%--     <jsp:include page="GlobalColMapGrid.jsp"> --%>
<%--      <jsp:param value="U" name="theGrid" /> --%>
<%--     </jsp:include> --%>
  
 
<!--   </div> -->
<!--   </div> -->

<jsp:include page="GlobalColMapGrid.jsp"></jsp:include>
<br>
<table width="100%" cellpadding="0" cellspacing="0">
	<tr>
<!-- 	<td width="10%"></td> -->
<!-- 		<td width="10%"> -->
<%-- 		<psj:submit id="Global_save_${_pageRef}" button="true" --%>
<%-- 				onclick="channelMaint_processDelete()" freezeOnSubmit="true" --%>
<%-- 				type="button"> --%>
<%-- 				<ps:text name="save_key"></ps:text> --%>
<%-- 			</psj:submit> --%>
	
		
	<td width="20%">
		</td>
		
		<td width="10%">
		<psj:submit id="Global_ok_${_pageRef}" button="true"
				onclick="globalcolMap_okprocess()" freezeOnSubmit="true"
				type="button">
				<ps:text name="	ok_key"></ps:text>
			</psj:submit>
	
	
		</td>
		
		<td width="10%">
		<psj:submit id="Global_cancel_${_pageRef}" button="true"
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