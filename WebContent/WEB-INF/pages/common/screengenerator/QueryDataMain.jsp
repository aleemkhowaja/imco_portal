<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<ps:hidden name="screenId"  value="${criteria.screenId}"></ps:hidden>
<ps:hidden name="elementId" value="${criteria.elementId}"></ps:hidden>
<ps:hidden name="queryData" value="${criteria.queryData}"></ps:hidden>
<ps:hidden name="elementType" value="${criteria.elementType}"></ps:hidden>

<ps:form useHiddenProps="true" id="queryDataFormId" namespace="/path/screenGenerator">
	<table>
	 <ps:if test="%{@com.path.bo.common.ConstantsCommon@ELEMENT_TYPE_GRID.equals(criteria.elementType)}">
	  	 <tr> 
		     <td colspan="4">
		        <ps:label id="lbl_query" for="querySynthax" key="Query_key">
		        </ps:label>
		     </td>
		 </tr>
	 </ps:if> 
	 <ps:else>
		 <tr>
		     <td width="10%">
		        <ps:label id="lbl_columnCode" for="queryColumnCode" key="columncode_key">
		        </ps:label>
		     </td>
		     <td>
		        <ps:textfield id="queryColumnCode" name="dynScreenQueryCO.columnCode" required="true">
		        </ps:textfield>
		     </td>
		     <td width="10%">
		        <ps:label id="lbl_columnDesc" for="queryColumnDesc" key="columndesc_key">
		        </ps:label>
		     </td>
		     <td>
		        <ps:textfield id="queryColumnDesc" name="dynScreenQueryCO.columnDesc" required="true">
		        </ps:textfield>
		     </td>
		 </tr>
	 </ps:else>
	  <tr>
	    <td colspan="4">
		    <ps:textarea id="querySynthax"
		                 name="dynScreenQueryCO.querySynthax"
		                 maxlength="1000" required="true"
		                 cols="85" 
		                 rows="10"></ps:textarea>
	    </td>
	  </tr>
	</table>
</ps:form>

<script>
  var queryExpTags = screenGeneratorProp_returnAllElementsIdsForGrid(false); 
  apply_auto_complete("querySynthax",queryExpTags);
</script>
