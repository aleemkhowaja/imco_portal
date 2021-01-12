<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>
<style>
	.ui-autocomplete {
		max-height: 180px;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
<ps:form   id="argConstrFrmId_${_pageRef}" namespace="/path/designer" 	useHiddenProps="true">
	<table class="headerPortionContent ui-widget-content" width="100%" >
		
		<tr>
			<td>
				<ps:label key="	reporting.maxLength" for="maxLength_${_pageRef}"/>	
			</td>
			<td>
				<ps:textfield name="MAX_LENGTH" mode="number" id="maxLength_${_pageRef}" size="50"/>
			</td>
		</tr>
		<tr>
			<td>
				<ps:label key="reporting.maxVal" for="maxVal_${_pageRef}" />	
			</td>
			<td>
				<ps:textfield name="MAX_VAL" mode="number" 	id="maxVal_${_pageRef}" size="50"/>
			</td>
		</tr>
		<tr>
			<td>
				<ps:label key="reporting.minVal" for="minVal_${_pageRef}"/>	
			</td>
			<td>
				<ps:textfield name="MIN_VAL" mode="number" id="minVal_${_pageRef}" size="50"/>
			</td>
		</tr>
		<tr>
			<td>
				<ps:label key="reporting.format" for="formatConstr_${_pageRef}"/>	
			</td>
			<td>
				<ps:textfield name="FORMAT" id="formatConstr_${_pageRef}" size="50"/>
			</td>
		</tr>
		<tr>
			<td>
				<ps:label key="expression_key" for="comparisonId_${_pageRef}"/>	
			</td>
			<td>
				<ps:textarea id="comparisonId_${_pageRef}" name="CONDITION" maxlength="1000" cols="90" rows="15"/>
			</td>
		</tr>
		
	</table>
	<ps:hidden name="rowId" id="rowId_${_pageRef}"></ps:hidden>
</ps:form>