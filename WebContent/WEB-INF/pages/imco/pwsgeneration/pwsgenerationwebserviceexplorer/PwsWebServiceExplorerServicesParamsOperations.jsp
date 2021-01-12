<%-- USER STORY #799705	Control record - PWS mapping screen --%>

<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<%@ include file = "/WEB-INF/pages/commonpwsmapping/webserviceexplorer/WebServiceExplorerCommonHiddenFields.jsp" %>

<div id="webServiceExplorerCollapse_${_pageRef}" style="padding:0.5em;height: 76%;position:relative;">
		<table style="width: 100%; table-layout: fixed; height: 95%;" ;cellpadding="0" cellspacing="0">
			<tr>
				<td width="25%" valign="top">
					<div id="webServiceGuiTree_${_pageRef}"  style="height: 98%;overflow: scroll;" width="100%";>
						<%@include file="/WEB-INF/pages/imco/pwsgeneration/pwsgenerationwebserviceexplorer/PwsWebServiceExplorerTree.jsp"%>	
					 </div>
				</td>				
				
				<td width="75%" valign="top" class= "">   
				<div id="custTab1TabsContent_${_pageRef}">
								<div id="webServiceGuiGrid_${_pageRef}" style="height: 98%;overflow:scroll">  
	
								</div>
							</div>
								
							<!-- 	
							<div id="custTab2TabsContent_${_pageRef}">
								<div id="webServiceGuiResponseGrid_${_pageRef}" style="height: 98%;overflow:scroll">  
	
								</div>
							</div>
							-->

				</td>
	
			</tr>
		</table>
		<table style="width: 100%;" cellpadding="0" cellspacing="0" border="0">
			<tr>
				<td>
					
				</td>
			</tr>
		</table>
		
	
</div>

<script type="text/javascript">
function generateHiddenField()
{
	var formId = "webServiceGuiGridForm_"+_pageRef;
	var listOfHiddenFields = document.createElement('div');
	var fId = "isReponseLoaded_"+_pageRef;
	var fName = "isReponseLoaded";
	var fValue = "1";
	var hField = returnHiddenField(fId,fName,fValue);
	listOfHiddenFields.appendChild(hField);		
	createHiddenFields(formId,listOfHiddenFields);
}

function loadResponseGrid()
{
		var appName = $("#application_name_desc_" + _pageRef).val();
		var serviceName = $("#webservice_name_desc_" + _pageRef).val();
		var operationName = $("#operation_name_lkp_desc_" + _pageRef).val();

		if (undefined == appName) {
			return;
		}
		if (undefined == operationName) 
		{
			return;
		} 
		else {
			operationName = operationName.replace(serviceName + "_", "");
		}
		if (undefined == serviceName) {
			return;
		}
		else {
			serviceName = serviceName.replace(appName + "_", "");
		}
		var x = $("#isReponseLoaded_" + _pageRef).val();
		if (undefined != x) {
			var serializedForm = $("#webServiceGuiDefFormId_" + _pageRef).serializeForm();
			_showProgressBar(true);
			if (operationName != undefined && serviceName != undefined && appName != undefined) {
				var loadSrc = null;
				if (screenNameSpace == "" || screenNameSpace == undefined) {
					loadSrc = jQuery.contextPath + "/path/common/WebserviceExplorer/" + mainGridActionRef + "?webServiceExplorerCO.requestType=request";
					$.ajax({
						url : loadSrc,
						type : "post",
						dataType : "html",
						data : serializedForm,
						success : function(data) {
							$("#webServiceGuiGrid_" + _pageRef).html(data);
							var xhttp = new XMLHttpRequest();
							xhttp.onreadystatechange = function() {
								if (this.readyState == 4 && this.status == 200) {
									this.responseText;
								}
							};
							_showProgressBar(false);
						}
					}).done(function(result) 
					{
						//$mainTab.tabs('disable', $tabId2);
						generateHiddenField();
					}
					);
				} 
				else {
					var x = screenNameSpace.length;
					var n = screenNameSpace.charAt(screenNameSpace.length - 1);
					if (n == "/") {
						screenNameSpace = screenNameSpace;
					} 
					else {
						screenNameSpace = screenNameSpace + "/";
					}
					loadSrc = jQuery.contextPath + screenNameSpace + mainGridActionRef + "?webServiceExplorerCO.requestType=response";
					if (screenName != "" || screenName != undefined) {
						loadSrc = loadSrc + "&webServiceExplorerCO.screenName=" + screenName;
					}
					$.ajax({
						url : loadSrc,
						type : "post",
						dataType : "html",
						data : serializedForm,
						success : function(data) {
							$("#webServiceGuiResponseGrid_" + _pageRef).html(data);
							_showProgressBar(false);
						}
					}).done(function(result)
					 {
						generateHiddenField();
					});
				}
			}
		}
}

function processMappingField(rowObj)
		{
			if("1" == rowObj.originalEvent.grid.jqGrid('getRowData',rowObj.originalEvent.id)['hasChildren'])
			{
				$("#"+getGridIdFromRow(rowObj.originalEvent.id)).jqGrid('setCellReadOnly', rowObj.originalEvent.id, 'value',"true");
			}
			else
			{
				var options = $("#"+rowObj.originalEvent.id+"_mappingField").children();
				if(options.length == 0)
				{
					var fieldName = rowObj.originalEvent.grid.jqGrid('getRowData',rowObj.originalEvent.id)['fieldName'];
					$("#"+rowObj.originalEvent.id+"_mappingField").append($('<option>', {value:fieldName, text:fieldName,selected:'true'}));
				}			
			}
		}

$.struts2_jquery.require("WebServiceExplorerTree.js" ,null,jQuery.contextPath+"/path/js/imco/common/webserviceexplorer/");	
$.struts2_jquery.require("WebServiceExplorerMaint.js" ,null,jQuery.contextPath+"/path/js/imco/common/webserviceexplorer/");	

</script>