<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<ps:form useHiddenProps="true" id="entitiesMaintFormId_${_pageRef}"
	namespace="/path/entities">
	<ps:hidden name="entitiesCO.updateMode" id="updateMode_hdn_${_pageRef}" />
	
	<ps:set name="Confirm_Save_key"
 value="%{getEscText('Confirm_Save_key')}" />
 <ps:set name="Saved_Successfully_key"
 value="%{getEscText('Saved_Successfully_key')}" />
	

	<ps:set name="ivcrud_${_pageRef}" value="iv_crud" />
	<fieldset class="ui-widget-content ui-corner-all">
		<table style="width: 100%">
			<tr>
				<td width="15%"></td>
				<td width="35%"></td>
				<td width="15%"></td>
				<td width="35%"></td>
			</tr>

			<tr>
				<!-- 				<td width="1%"></td> -->

				<td class="fldlabelview"><ps:label key="entity_code_key"
						id="entitiesMaintcode_lbl_${_pageref}"
						for="entitiesMaintcode_${_pageref}"></ps:label></td>

				<td><ps:textfield id="entitiesMaintcode_${_pageref}"
						mode="number" maxlength="4"
						dependency="entitiesMaintcode_${_pageref}:entitiesCO.syncEntityVO.ENTITY_CODE"
						leadzeros="4"
						parameter="entitiesCO.syncEntityVO.ENTITY_CODE:entitiesMaintcode_${_pageref}"
						name="entitiesCO.syncEntityVO.ENTITY_CODE"></ps:textfield></td>
			</tr>
			<tr>

				<td class="fldlabelview"><ps:label key="entity_name_key"
						id="entitiesMaintname__lbl_${_pageref}"
						for="entitiesMaintname_${_pageref}"></ps:label></td>

				<td><ps:textfield id="entitiesMaintname_${_pageref}"
				maxlength="40"
						dependency="entitiesMaintname_${_pageref}:entitiesCO.syncEntityVO.ENTITY_NAME"
						parameter="entitiesCO.syncEntityVO.ENTITY_NAME:entitiesMaintname_${_pageref}"
						name="entitiesCO.syncEntityVO.ENTITY_NAME"></ps:textfield></td>

			</tr>


			<tr>

				<td class="fldlabelview"><ps:label key="description_key"
						id="entitiesMaintdes_lbl_${_pageref}"
						for="entitiesMaintdes_${_pageref}"></ps:label></td>

				<td><ps:textfield id="entitiesMaintdes_${_pageref}"
						maxlength="40"
						dependency="entitiesMaintdes_${_pageref}:entitiesCO.syncbranchvo.DESCRIPTION"
						parameter="entitiesCO.syncEntityVO.DESCRIPTION:entitiesMaintdes_${_pageref}"
						name="entitiesCO.syncEntityVO.DESCRIPTION"></ps:textfield></td>

			</tr>
			<tr>
				<td class="fldlabelview"><ps:label key="requset_api_code_key"
						id="entitiesMaintreq_lbl_${_pageref}"
						for="entitiesMaintreq_${_pageref}"></ps:label></td>

				<td><ps:textfield id="entitiesMaintreq_${_pageref}"
						mode="number" maxlength="4"
						dependency="entitiesMaintreq_${_pageref}:entitiesco.syncEntityVO.REQUEST_API_CODE"
						parameter="entitiesCO.syncEntityVO.REQUEST_API_CODE:entitiesMaintreq_${_pageref}"
						name="entitiesCO.syncEntityVO.REQUEST_API_CODE"></ps:textfield></td>

			</tr>
			<tr>

				<td class="fldlabelview"><ps:label key="response_api_code_key"
						id="entitiesMaintres_lbl_${_pageref}"
						for="entitiesMaintres_${_pageref}"></ps:label></td>

				<td><ps:textfield id="entitiesMaintres_${_pageref}"
					mode="number" maxlength="4" 
						dependency="entitiesMaintres_${_pageref}:entitiesCO.syncEntityVO.RESPONSE_API_CODE"
						parameter="entitiesCO.syncEntityVO.RESPONSE_API_CODE:entitiesMaintres_${_pageref}"
						name="entitiesCO.syncEntityVO.RESPONSE_API_CODE"></ps:textfield></td>


			</tr>
		</table>
	</fieldset>
	<ptt:toolBar id="entitiesMaintToolBar_${_pageRef}" hideInAlert="true">

		<ps:if test='iv_crud == "R"'>
			<psj:submit id="entitiesMaint_save_${_pageRef}" button="true"
				freezeOnSubmit="true" onclick="XXXXXXXXXXXX">
				<ps:label key="Save_key" for="entitiesMaint_save_${_pageRef}" />
			</psj:submit>


			<%-- 	<ps:if test='%{XXXXXX!="false"}'> --%>
			<%-- 	    <psj:submit id="entitiesMaint_del_${_pageRef}" button="true" freezeOnSubmit="true"  onclick="XXXXXXXXXXXX"> --%>
			<%-- 	    	<ps:label key="Delete_key" for="entitiesMaint_del_${_pageRef}"/> --%>
			<%-- 	    </psj:submit>		 --%>
			<%-- 	</ps:if>	 --%>
		</ps:if>
	</ptt:toolBar>
</ps:form>
<script type="text/javascript">
	$(document).ready(
			
			
			function()
			{
				$.struts2_jquery.require("EntitiesMaint.js", null,
						jQuery.contextPath + "/path/js/imco/entities/");
				$("#entitiesMaintFormId_" + _pageRef).processAfterValid(
						"entitiesMaint_processSubmit", {});
				
			});
</script>