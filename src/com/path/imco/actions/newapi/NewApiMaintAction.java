package com.path.imco.actions.newapi;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.audit.AuditConstant;
import com.path.imco.bo.newapi.NewApiBO;
import com.path.imco.vo.newapi.NewApiCO;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.vo.GridUpdates;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.audit.AuditRefCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;

/**
 *
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 *
 * NewApiMaintAction.java used to
 */
public class NewApiMaintAction extends BaseAction
{
    private NewApiBO newApiBO;
    private NewApiCO newapiCO = new NewApiCO();

    private List<SelectCO> requiredTypeList = new ArrayList<>();
    private List<SelectCO> argumentTypeList = new ArrayList<>();
    private List<SelectCO> statusTypeList = new ArrayList<>();

    public String loadNewApiPage()
    {
	try
	{
	    set_searchGridId("newApiListGridTbl_Id");
	    set_showNewInfoBtn("true");
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "newApiList";
    }

    public String loadMaintanenceDetails()
    {

	try
	{
	    if(newapiCO.getImImalApiVO() == null)
	    {
		// HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> elementMap =
		// applySysParamSettings();
		// setAdditionalScreenParams(elementMap);

	    }
	    else
	    {
		newapiCO = newApiBO.returnApiDetails(newapiCO);
		newapiCO.setUpdateMode(ConstantsCommon.YES);
		// applyRetrieveAudit(AuditConstant.IM_API_NEWAPI_KEY,
		// newapiCO.getImImalApiVO(), newapiCO);

	    }

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "apiMaint";

    }

    public String onChangeApiID() throws BaseException
    {

	try
	{

	    newapiCO = newApiBO.onChangeApiID(newapiCO);
	    NumberUtil.resetEmptyValues(newapiCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public String saveNew()
    {

	try

	{

	    if(newapiCO.getArgumentsGrid() != null && !newapiCO.getArgumentsGrid().isEmpty())
	    {
		GridUpdates gridUpdates = getGridUpdates(newapiCO.getArgumentsGrid(), NewApiCO.class, true);

		List<NewApiCO> listOfArguments = gridUpdates.getLstAllRec();
		newapiCO.setArgumentsList(listOfArguments);

	    }

	    AuditRefCO refCO = initAuditRefCO();
	    // refCO.setKeyRef(AuditConstant.IM_API_NEWAPI_KEY);
	    if(ConstantsCommon.YES.equals(newapiCO.getUpdateMode()))

	    {

		refCO.setOperationType(AuditConstant.UPDATE);
		newapiCO.setAuditObj(returnAuditObject(newapiCO.getClass()));
	    }

	    else
	    {
		refCO.setOperationType(AuditConstant.CREATED);
	    }

	    newapiCO.setAuditRefCO(refCO);
	    newapiCO = newApiBO.saveNew(newapiCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;

    }

    public String deleteApiData()
    {
	try
	{
	    // AuditRefCO refCO = initAuditRefCO();
	    // refCO.setOperationType(AuditConstant.DELETE);
	    // refCO.setKeyRef("channelKey");

	    newapiCO = newApiBO.deleteApi(newapiCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }

    public String loadRequiredSelect()
    {
	try
	{
	    SelectSC selSC = new SelectSC(BigDecimal.valueOf(33));
	    selSC.setLovCodesInlude("'Y','N'");
	    requiredTypeList = returnLOV(selSC);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }

    public String loadstatusTypeSelect()
    {
	try
	{
	    SelectSC selSC = new SelectSC(BigDecimal.valueOf(633));
	    selSC.setLovCodesInlude("'I','O'");
	    statusTypeList = returnLOV(selSC);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }

    public String loadArgumentTypeSelect()
    {
	try
	{
	    SelectSC selSC = new SelectSC(BigDecimal.valueOf(632));
	    argumentTypeList = returnLOV(selSC);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }


    public void setNewApiBO(NewApiBO newApiBO)
    {
	this.newApiBO = newApiBO;
    }

    public NewApiCO getNewapiCO()
    {
	return newapiCO;
    }

    public void setNewapiCO(NewApiCO newapiCO)
    {
	this.newapiCO = newapiCO;
    }


    public List<SelectCO> getRequiredTypeList()
    {
	return requiredTypeList;
    }

    public void setRequiredTypeList(List<SelectCO> requiredTypeList)
    {
	this.requiredTypeList = requiredTypeList;
    }

    public List<SelectCO> getArgumentTypeList()
    {
	return argumentTypeList;
    }

    public void setArgumentTypeList(List<SelectCO> argumentTypeList)
    {
	this.argumentTypeList = argumentTypeList;
    }

    public List<SelectCO> getStatusTypeList()
    {
	return statusTypeList;
    }

    public void setStatusTypeList(List<SelectCO> statusTypeList)
    {
	this.statusTypeList = statusTypeList;
    }

}
