package com.path.imco.actions.newapi;

import java.util.List;

import com.path.dbmaps.vo.IM_IMAL_APIVO;
import com.path.imco.bo.newapi.NewApiBO;
import com.path.imco.vo.newapi.NewApiCO;
import com.path.imco.vo.newapi.NewApiSC;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.struts2.lib.common.base.GridBaseAction;

/**
 *
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 *
 * NewApiListAction.java used to
 */
public class NewApiListAction extends GridBaseAction
{
    private NewApiBO newApiBO;
    private NewApiSC criteria = new NewApiSC();

    public String loadNewApiGrid()
    {
	try
	{
	    String[] searchCol = { "imImalApiVO.API_CODE", "imImalApiVO.DESCRIPTION", "imImalApiVO.PROCEDURE_NAME",
		    "imImalApiVO.WB_SERVICE_NAME", "imImalApiVO.SUSPENDED", "imImalApiVO.RELATED_APP",
		    "imImalApiVO.API_TYPE", "imImalApiVO.API_VERSION" };
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(newApiBO.returnNewApiListCount(criteria));
	    }
	    setGridModel(newApiBO.returnNewApiList(criteria));
	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadNewApiGrid of NewApiListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public String loadDummy() throws BaseException
    {
	return SUCCESS;
    }

    // public String loadDummy1() throws BaseException
    // {
    // return SUCCESS;
    // }
    public String reurnUsersGrid()
    {
	try
	{
	    String[] searchCol = { "imApiUsersVO.USER_ID" };
	    criteria.setSearchCols(searchCol);
	    if(!NumberUtil.isEmptyDecimal(criteria.getApiCode()))
	    {
		copyproperties(criteria);
		if(checkNbRec(criteria))
		{
		    setRecords(newApiBO.returnUsersGridCount(criteria));
		}
		setGridModel(newApiBO.returnUsersGridList(criteria));
	    }
	}
	catch(Exception e)
	{
	    log.error(e, "Error in reurnUsersGrid of NewApiListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public String reurnMachinesGrid()
    {
	try
	{
	    String[] searchCol = { "imApiMachineVO.MACHINE_NAME" };
	    criteria.setSearchCols(searchCol);
	    if(!NumberUtil.isEmptyDecimal(criteria.getApiCode()))
	    {
		copyproperties(criteria);
		if(checkNbRec(criteria))
		{
		    setRecords(newApiBO.returnMachGridCount(criteria));
		}
		setGridModel(newApiBO.returnMachineGridList(criteria));
	    }
	}
	catch(Exception e)
	{
	    log.error(e, "Error in reurnMachinesGrid of NewApiListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public String reurnArgumentsGrid()
    {
	try
	{
	    String[] searchCol = { "imApiArgumentVO.ARG_ID", "imApiArgumentVO.ARG_NAME", "imApiArgumentVO.DESCRIPTION",
		    "imApiArgumentVO.ARG_TYPE", "imApiArgumentVO.STATUS", "imApiArgumentVO.DEFAULT_VALUE",
		    "imApiArgumentVO.REQ_ARG" };
	    criteria.setSearchCols(searchCol);
	    if(!NumberUtil.isEmptyDecimal(criteria.getApiCode()))
	    {
		copyproperties(criteria);
		if(checkNbRec(criteria))
		{
		    setRecords(newApiBO.returnArgumentsGridCount(criteria));
		}
		setGridModel(newApiBO.returnArgumentsGridList(criteria));
	    }
	}
	catch(Exception e)
	{
	    log.error(e, "Error in reurnArgumentsGrid of NewApiListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    public String loadArgGridParams()
    {
	try {
		
		NewApiCO newapiCO = new NewApiCO();
		newapiCO.setImImalApiVO(new IM_IMAL_APIVO());
		newapiCO.getImImalApiVO().setPROCEDURE_NAME(criteria.getProcedureName());
		List<NewApiCO> ListParamNewApiCO = newApiBO.returnNewApiParams(newapiCO);
		copyproperties(criteria);
		setGridModel(ListParamNewApiCO);				
		}
	catch(BaseException e)
		{
	    handleException(e, null, null);
		}

	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }

    public NewApiSC getCriteria()
    {
	return criteria;
    }

    public void setCriteria(NewApiSC criteria)
    {
	this.criteria = criteria;
    }

    public void setNewApiBO(NewApiBO newApiBO)
    {
	this.newApiBO = newApiBO;
    }
}
