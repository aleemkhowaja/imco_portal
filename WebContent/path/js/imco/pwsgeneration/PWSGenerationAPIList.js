/**
 * @Auther:Raed Saad
 * @Date:OCT 2018
 * @Team: Backend & Integration.
 * @copyright: PathSolution 2018
 * @User Story: User Story #740995 PWS generation From DB Procedure
 * @Description: PWSGenerationApiList Grid JS function
 **/


/**
 * on hash grid complete
 */
function onPWSGenerationApiListComplete(event,data)
{
	var grid = $("#"+event.currentTarget.id);
	var AddId = "add_pws_geration_Api_Id_DBLPWSPROCMT";
	$("#"+AddId).unbind();
	$("#"+AddId).bind('click',function()
			{
				 addPWSGenerationApiListRow(grid)	
			});
	/*var delId = "";
	$("#"+delId).unbind();
	$("#"+delId).bind('click',function())
	{	
		deletePWSGenerationApiListRows(del)
	});*/
}

/**
 * on row select function
 */
function onPWSGenerationApiListRowSelTopic()
{
	
}
/**
 * add grid row
 */
function addPWSGenerationApiListRow(grid)
{
	var rowId = grid.jqGrid('addInlineRow', {});
}

/**
 * delete specific grid row
 */
function deletePWSGenerationApiListRows(rowId)
{
	var selectedRow = grid.jqGrid('getGridParam','selrow');
	grid.jqGrid('deleteGridRow',selectedRow);
}

/**
 * function on operation name change
 */
function onOperationNameChange()
{
	//alert("onchange");
}


