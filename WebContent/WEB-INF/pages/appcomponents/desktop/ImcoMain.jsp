<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp" %>

<meta name="decorator" content="main"/>	

<head>
<title><ps:text name="imco_main_page_key"/></title>
</head>


<script type="text/javascript"  src="${pageContext.request.contextPath}/common/js/tabs/TabbedPanel.js"></script>
<script type="text/javascript">
	var RTL_DIRECTION = "${isRTL}";

	$(document).ready(function() {
		intializeMainTabs("mainTabs",{url:jQuery.contextPath+"/path/loadScreen?",reloadAlert:"<ps:text name='reload_contents_key'/>",closeAlert:"<ps:text name='close'/>"});

	});
</script>
<body >

<div id="mainTabs" style=" visibility: hidden;height: 100%; overflow: auto; padding-bottom: 0px; padding-top: 0px;">
	<ul></ul>
</div>
<jsp:include page="../../imco/common/AppCommonTrans.jsp"></jsp:include>
</body>
