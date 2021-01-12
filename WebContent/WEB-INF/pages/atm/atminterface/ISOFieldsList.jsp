<%@include file="/WEB-INF/pages/common/Encoding.jsp"%>
<%@include file="/WEB-INF/pages/common/TLDImport.jsp"%>
<%@ taglib prefix="ptt" uri="/path-toolbar-tags"%>

<script type="text/javascript">
$.subscribe('afterLoad', function(event, data) 
{
	$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"iso_FIELDVO.LENGTH",true);
	$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"iso_FIELDVO.FIELD_TYPE",true);
	$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"FIELD_LENL",true);
	$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"PARTIAL_MASK",true);
	$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",1,"TOTAL_MASK",true);
	//Remove Link from Expression Details Column
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:nth-child(1)').text('');
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:nth-child(10)').text('');
	//Remove Sub-grid option from Bitmap row
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:first').removeClass('sgcollapsed');
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:first').removeClass('ui-sgcollapsed');
	$("#isoFieldsGridTbl_Id_"+_pageRef).find('#1 td:first').text('');
	
	//removing green color
	 $('td').removeClass("path-subgrd-hdr");
	
	ATMMnt_CopyFields();
});

$.subscribe('afterSubGridLoad', function(event, data)
{
	applyCustomCodeOnGrid(event, data);
});

$.subscribe('disableFormatDecimal', function(event,data)
{
	var rowId 		= (event["originalEvent"])["id"];
	var myObject 	= $("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid('getRowData',rowId);
	if(myObject['iso_FIELDVO.FIELD_TYPE'] == 'N')
	{
	}
	else if(myObject['iso_FIELDVO.FIELD_TYPE'] == 'V')
	{
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",rowId,"IS_DECIMAL_YN",true);
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellValue",rowId,"IS_DECIMAL_YN",false);
	}
	else
	{
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellReadOnly",rowId,"IS_DECIMAL_YN",true);
		$("#isoFieldsGridTbl_Id_"+_pageRef).jqGrid("setCellValue",rowId,"IS_DECIMAL_YN",false);
	}
});

function ATMInterfaceMaint_openDialog(cellvalue, options, rowObject)
{
	return '<a href="#" onclick="openATM_InterfaceExpressionDialog(\''+options.rowId+'\')">'+expression_details_key+'</a>';
}

function ATMInterfaceMaint_field_distribution(cellvalue, options, rowObject)
{
	return '<a href="#" onclick="openATM_InterfaceExpressionDialog(\''+options.rowId+'\')">'+field_distribution_key+'</a>';
}
</script>

<ps:url id="urlISOFieldsGrid" escapeAmp="false" action="ATMInterfaceListAction_loadFieldsGrid" namespace="/path/atmInterface">
   <ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   <ps:param name="_pageRef" value="_pageRef"></ps:param>
   <ps:param name="criteria.loadFields" value="1"></ps:param>
   <ps:param name="criteria.interfaceId" value="atmInterfaceCO.iso_INTERFACESVO.CODE"></ps:param>
</ps:url>

<ps:url id="urlSubFieldsGrid" escapeAmp="false" action="ATMInterfaceListAction_loadInnerFieldsGrid" namespace="/path/atmInterface">
	<ps:param name="iv_crud"  value="ivcrud_${_pageRef}"></ps:param>
   	<ps:param name="_pageRef" value="_pageRef"></ps:param>
</ps:url>

<psjg:grid id		="isoFieldsGridTbl_Id_${_pageRef}" 
      	altRows       	="true"
 	  	editinline 		="true"
 	  	editurl			="%{urlISOFieldsGrid}"
 	  	href			="%{urlISOFieldsGrid}"
      	dataType   		="json"
   	  	pager      		="false"
   	  	sortable   		="true"
	  	filter         	="false"
   	  	gridModel   	="gridModel"
   	  	rowNum    		="10"
   	  	rowList        	="5,10,15,20"
      	viewrecords 	="true"
      	navigator    	="true"
      	navigatorAdd    ="false"
      	navigatorRefresh="true"
      	navigatorEdit	="false"
      	navigatorDelete	="false"
      	navigatorSearch	="false"
      	subGridOptions	="{reloadOnExpand:false}"
      	navigatorSearchOptions ="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt']}"
      	shrinkToFit		="true"
      	pagerButtons	="true"
      	onGridCompleteTopics="afterLoad"
      	onEditInlineBeforeTopics="disableFormatDecimal"
      	height			="350"
      	autowidth		="false"
      	width			="1087" >
	
	<%-- start Sub Grid --%>
    <psjg:grid
		id               ="subFieldsGridTbl_Id_${_pageRef}"
	    subGridUrl       ="%{urlSubFieldsGrid}"
	    dataType         ="json"
		pager            ="false"
		sortable         ="true"
		filter           ="false"
		gridModel        ="gridModel"
		rowNum           ="5"
		rowList          ="5,10,15,20"
	    viewrecords      ="false"
	    navigator        ="true"
	    editinline		 ="true"
	    editurl			 ="%{urlSubFieldsGrid}"
	    navigatorDelete  ="true"
	    navigatorEdit    ="false"
	    navigatorRefresh ="false"
	    navigatorAdd     ="true"
	    addfunc			 ="addHashMapSubGridRows(this)"
	    delfunc			 ="delSubGridRows(this)"
	    navigatorSearch  ="false"
	    serializeGridData="sendExtraParams"
	    onGridCompleteTopics="afterSubGridLoad"
	    disableEditableFocus="true"
	    navigatorSearchOptions="{closeOnEscape: true,closeAfterSearch: true, multipleSearch: true,sopt:['eq','ne','lt','gt','le','ge']}"
	    altRows          ="true"
	    shrinkToFit      ="true" 
	    autowidth		 ="false"
	    width			="1000">
	        
	    <psjg:gridColumn id="sub_FLDSVO.SUB_FLD_NAME" name="sub_FLDSVO.SUB_FLD_NAME" index="sub_FLDSVO.SUB_FLD_NAME" colType="text" required="true"
			title="%{getText('fieldName')}" sortable="false" search="true" editable="true" width="20" tabindex="1"/>
			
		<psjg:gridColumn name="sub_FLDSVO.SUB_FLD_TYPE" index="sub_FLDSVO.SUB_FLD_TYPE" id="sub_FLDSVO.SUB_FLD_TYPE" title="%{getText('Field_Type_key')}" colType="select" 
    			edittype="select" editable="true" sortable="true" search="true" formatter="select" width="20" tabindex="2"
    	editoptions="{ value:function() {  return loadCombo('${pageContext.request.contextPath}/path/atmInterface/ATMInterfaceMaintAction_populateTypeComboBoxes.action','dataTypeList', 'code', 'descValue');}}" />
   	
   		<psjg:gridColumn id="sub_FLDSVO.SUB_FLD_LENGTH" name="sub_FLDSVO.SUB_FLD_LENGTH" index="sub_FLDSVO.SUB_FLD_LENGTH" colType="number"
   			editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CheckLengthLimit(e, this)} }], maxlength: '2'}"
			title="%{getText('Field_Length_key')}" sortable="false" search="true" editable="true" width="10" tabindex="3"/>
			
		<psjg:gridColumn id="sub_FLDSVO.SUB_FLD_CODE" colType="number" index="sub_FLDSVO.SUB_FLD_CODE" name="sub_FLDSVO.SUB_FLD_CODE" 
			title="%{getText('field_code_key')}" hidden="false" width="20"/>
			
		<psjg:gridColumn id="sub_FLDSVO.FIELD_NO" colType="number" index="sub_FLDSVO.FIELD_NO" name="sub_FLDSVO.FIELD_NO" hidden="false"
			title="%{getText('field_no_key')}" width="20" />
			
		<psjg:gridColumn id="STATUS" colType="text" index="STATUS" name="STATUS" hidden="false" width="5" title="%{getText('Status_Key')}" />
	</psjg:grid>
    <%--  End Sub Grid --%>
    
    <%--  Columns of Main Grid --%>
	<psjg:gridColumn id="iso_FIELDVO.ID" colType="number" index="iso_FIELDVO.ID" name="iso_FIELDVO.ID" key="true"
		title="%{getText('field_code_key')}" editable="false" sortable="true" search="true" width="5" />
						
	<psjg:gridColumn id="iso_FIELDVO.NAME" name="iso_FIELDVO.NAME" index="iso_FIELDVO.NAME" colType="text" required="true"
		editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '100'}"
		title="%{getText('fieldName')}" sortable="false" search="true" editable="true" width="20" />
		
	<psjg:gridColumn name="iso_FIELDVO.FIELD_TYPE" index="TYPE" id="TYPE" title="%{getText('Field_Type_key')}" colType="select" 
    			edittype="select" editable="true" sortable="true" search="true" formatter="select" width="10"
    editoptions="{ value:function() {  return loadCombo('${pageContext.request.contextPath}/path/atmInterface/ATMInterfaceMaintAction_populateTypeComboBoxes.action','dataTypeList', 'code', 'descValue');}, dataEvents: [{ type: 'change', fn: function(e) {enableDisableCheck();} }]}" />
   		
	<psjg:gridColumn name="IS_DECIMAL_YN" index="IS_DECIMAL_YN" colType="text" width="4" title="%{getText('decimals6_key')}" align="center"
		editable="false" editoptions="{value:'1:0',align:'middle', dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }]}" 
    	formatoptions="{disabled:${_recReadOnly=='true'}}" formatter="checkbox" edittype="checkbox" sortable="false"/>
		
	<psjg:gridColumn id="iso_FIELDVO.LENGTH" name="iso_FIELDVO.LENGTH" index="iso_FIELDVO.LENGTH" colType="number"
		editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '4'}"
		title="%{getText('fixed_length_key')}" sortable="false" search="true" editable="true" width="5" />
		
	<psjg:gridColumn id="FIELD_LENL" colType="number" index="FIELD_LENL" name="FIELD_LENL" 
		editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '2'}"
		title="%{getText('dynamic_length_key')}" editable="true" sortable="true" search="true" width="5" />
		
    <psjg:gridColumn id="PARTIAL_MASK" name="PARTIAL_MASK" index="PARTIAL_MASK" colType="text"
    	editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '50'}"
		title="%{getText('partial_mask_key')}" sortable="false" search="true" editable="true" width="10" />
		
	<psjg:gridColumn name="TOTAL_MASK" index="TOTAL_MASK" colType="text" width="5" title="%{getText('total_mask_key')}" align="center" 
		editable="false" editoptions="{value:'1:0',align:'middle', dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }]}" 
    	formatoptions="{disabled:${_recReadOnly=='true'}}" formatter="checkbox" edittype="checkbox" sortable="false"/>
    
    <psjg:gridColumn id="EXPRESSION_DETAILS" name="EXPRESSION_DETAILS" index="EXPRESSION_DETAILS" width="8" colType="text"
    	formatter="ATMInterfaceMaint_openDialog" title="%{getText('expression_key')}" sortable="false" search="false" 
    	editable="false" tabindex = "6" align="center" />
			 
	<psjg:gridColumn id="EXPRESSION" colType="text" index="EXPRESSION" width="5" name="EXPRESSION" title="%{getText('expression_key')}" hidden="true"
		editoptions="{dataEvents: [{type: 'change', fn: function(e) { ATMMnt_CopyFields()} }], maxlength: '100'}" />
    
    <psjg:gridColumn id="iso_FIELDVO.FIELD_TYPE" colType="text" index="iso_FIELDVO.FIELD_TYPE" name="iso_FIELDVO.FIELD_TYPE" 
		title="%{getText('Field_Type_key')}" editable="false" sortable="true" search="true" hidden="true" />
    
</psjg:grid>
