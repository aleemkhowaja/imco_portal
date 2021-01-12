<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath}/path/js/imco/mxmessagedefinition/xonomy/xonomy.css" />
<script type="text/javascript">
	$(document).ready(
		function() 
		{
			$("div#file_structure_"+_pageRef+" .collapsibleContainer").collapsiblePanel();
		}
	);
</script>

<div id="file_structure_${_pageRef}"
	class="connectedSortable ui-helper-reset">
		<table width="100%">
			<tr>
				<td width="50%" style="vertical-align: top;">
					<div id="tagGridDiv_${_pageRef}"
						class="connectedSortable ui-helper-reset">
						<div id="tagGridDivInner_${_pageRef}" class="collapsibleContainer"
							title="<ps:text name="tag_list_key" />">
							<%@include file="tagsGrid.jsp"%>
						</div>
					</div>
				</td>
			</tr>
		</table>
</div>