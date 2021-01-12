<%@include file="/WEB-INF/pages/common/Encoding.jsp" %>
<%@taglib uri="/path-struts-tags" prefix="ps"%>

<%/*Place all global script variables and its assigned trans messages */%>
<!-- translation keys for External Api -->
<ps:hidden type="hidden" id="msg_api_code_greater_then_200000_key_id" value="%{getText('msg_api_code_greater_then_200000_key')}"/>

<!-- translation keys for  -->
<ps:hidden type="hidden" id="do_you_want_to_refresh_key" value="%{getText('do_you_want_to_refresh_key')}"/>
<ps:hidden type="hidden" id="refreshed_successfully_key" value="%{getText('refreshed_successfully_key')}"/>
<ps:hidden type="hidden" id="setoff_successfully_key" value="%{getText('setoff_successfully_key')}"/>
<ps:hidden type="hidden" id="msg_not_found_key" value="%{getText('msg_not_found_key')}"/>
<ps:hidden type="hidden" id="record_was_canceled_successfully_key" value="%{getText('record_was_canceled_successfully_key')}"/>
<ps:hidden type="hidden" id="expression_details_key" value="%{getText('expression_details_key')}"/>
<ps:hidden type="hidden" id="Formula_Key" value="%{getText('Formula_Key')}"/>

<script type="text/javascript">
/* External Api */
var msg_api_code_greater_then_200000_key 	= document.getElementById("msg_api_code_greater_then_200000_key_id").value;
/* Set Off Screen */
var do_you_want_to_refresh_key 	= document.getElementById("do_you_want_to_refresh_key").value;
var refreshed_successfully_key 	= document.getElementById("refreshed_successfully_key").value;
var setoff_successfully_key 	= document.getElementById("setoff_successfully_key").value;
var msg_not_found_key 			= document.getElementById("msg_not_found_key").value;
var record_was_canceled_successfully_key 			= document.getElementById("record_was_canceled_successfully_key").value;
var expression_details_key 			= document.getElementById("expression_details_key").value;
var Formula_Key 			= document.getElementById("Formula_Key").value;
</script>