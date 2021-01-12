<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>
<jsp:include page="/WEB-INF/pages/common/login/InfoBar.jsp" />
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/path/css/bootstrap.min.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/path/css/path-custom.css">
  <link href="${pageContext.request.contextPath}/path/css/style.min.css" rel="stylesheet">
  
</head>
<!-- ADD THE CLASS layout-top-nav TO REMOVE THE SIDEBAR. -->
	<div class="m-content pull-left" style="height:100%;">
		<div style="float:left;" class="m-container">
			<div id="servicesTreeCnt" style="float:left;width:350px;border-right:1px solid #ccc;height:600px;overflow-x: auto;">
				<div id="servicesTree" style="">
				</div>
			</div>
			<div style="float:left;margin-left:40px;width:618px;height:600px;overflow-x: auto;" id="readMore">
					<jsp:include page="landscape_args.jsp"/>		  
				
			</div>
		</div>
	
	</div>
	
<!-- ./wrapper -->

<script src="${pageContext.request.contextPath}/path/js/imco/landscape/jquery-1.10.2.min.js"></script>
<script src="${pageContext.request.contextPath}/path/js/imco/landscape/adminlte.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/path/js/imco/landscape/jstree.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/path/js/imco/landscape/LandscapeMaint.js"></script>
<script type="text/javascript">
var $jquery = $.noConflict(true);

	//$.struts2_jquery.require(
//		"LandscapeMaint.js", null, jQuery.contextPath + "/path/js/imco/landscape/");
		 $jquery('[class^=doc_]').hide();
			$jquery('[class^=doc_]').hide();
			   
		$jquery(document).ready(function(){
			$jquery('#servicesTree').on('changed.jstree', function (e, data) {
				//debugger;
			    data.instance.get_node(data.selected[0]).text;
			   // alert( data.instance.get_node(data.selected[0]).text);
			   $("#generalInfo").hide();
			   $jquery('[class^=doc_]').hide();
			   $jquery('[class^=doc_]').hide();
			   if($jquery('.doc_'+
						  data.instance.get_node(data.selected[0]).text).length > 0){
				   $jquery('.doc_'+
						  data.instance.get_node(data.selected[0]).text).show();
				   
			   }else{
				   $jquery('[class^=doc_]').hide();
				   $jquery('[class^=doc_]').hide();
				   $("#generalInfo").show();
				  }

			   return;
			  }).jstree({ 'core' : {
				'data' : data
			} });
		});
		

</script>