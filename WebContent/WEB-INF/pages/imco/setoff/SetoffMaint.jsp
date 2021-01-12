<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt"  uri="/path-toolbar-tags" %>

<ps:form useHiddenProps="true" id="setoffMaintFormId_${_pageRef}"  namespace="/path/setoff">
<ps:hidden name="setoffCO.setoffGridListString" id="updateMode_hdn_setoffGrid_Id_${_pageRef}" />

<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
<br>
<fieldset class="ui-widget-content ui-corner-all">

		<table table style="width: 100%">
			<tr>
				<td width="50%">
					<center>
						<psj:submit id="setoffMaint_setoff_${_pageRef}"
							button="true" onclick="setoffMaint_setoff()"
							freezeOnSubmit="true" type="button">
							<ps:text name="setoff_key"></ps:text>
						</psj:submit>
					</center>
				</td>

				<td width="50%">
					<center>
						<psj:submit id="setoffMaint_refresh_${_pageRef}"
							button="true" onclick="setoffMaint_refresh()"
							freezeOnSubmit="true" type="button">
							<ps:text name="refresh_key"></ps:text>
						</psj:submit>
					</center>

				
				



			</tr>




		</table>
		
	</fieldset>

<%--   <ptt:toolBar id="setoffMaintToolBar_${_pageRef}" hideInAlert="true"> --%>
<%--    <ps:if test='%{#ivcrud_${_pageRef}=="R"}'> --%>
<%--     <psj:submit id="setoffMaint_save_${_pageRef}" button="true" freezeOnSubmit="true" onclick="XXXXXXXXXXXX"> --%>
<%--     	<ps:label key="Save_key" for="setoffMaint_save_${_pageRef}"/> --%>
<%--     </psj:submit> --%>
<%-- 	<ps:if test='%{XXXXXX!="false"}'> --%>
<%-- 	    <psj:submit id="setoffMaint_del_${_pageRef}" button="true" freezeOnSubmit="true"  onclick="XXXXXXXXXXXX"> --%>
<%-- 	    	<ps:label key="Delete_key" for="setoffMaint_del_${_pageRef}"/> --%>
<%-- 	    </psj:submit>		 --%>
<%-- 	</ps:if>	 --%>
<%--    </ps:if> --%>
<%-- </ptt:toolBar> --%>
</ps:form>
 <%@include file="SetoffGrid.jsp" %>
<script type="text/javascript">
$(document).ready(function() {					
							$.struts2_jquery.require("SetoffMaint.js" ,null,jQuery.contextPath+"/path/js/imco/setoff/");
							$("#setoffMaintFormId_"+_pageRef).processAfterValid("setoffMaint_processSubmit",{});
						});
</script>