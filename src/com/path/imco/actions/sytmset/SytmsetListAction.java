package com.path.imco.actions.sytmset;

import com.path.imco.bo.sytmset.SytmsetBO;
import com.path.imco.vo.sytmset.SytmsetSC;
import com.path.lib.common.exception.BaseException;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;

/**
 *
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 *
 * SytmsetListAction.java used to
 */
public class SytmsetListAction extends GridBaseAction
{
    private SytmsetBO sytmsetBO;
    private SytmsetSC criteria = new SytmsetSC();

    public String loadSytmsetGrid()
    {
	try
	{
	    String[] searchCol = { "syncBranchVO.BR_CODE", "syncBranchVO.DESCRIPTION", "syncBranchVO.BR_TYPE",
		    "syncBranchVO.EMAIL1", "syncBranchVO.EMAIL2", "syncBranchVO.EMAIL3", "syncBranchVO.EMAIL4",
		    "syncBranchVO.EMAIL5", "syncBranchVO.MESSAGE1", "syncBranchVO.SUBJECT", "syncBranchVO.IP_ADDRESS",
		    "syncBranchVO.SERVICE_NAME" };
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setSearchCols(searchCol);
	    // criteria.setDateSearchCols(hmDate);
	    copyproperties(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(sytmsetBO.returnSytmsetListCount(criteria));
	    }
	    setGridModel(sytmsetBO.returnSytmsetList(criteria));
	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadSytmsetGrid of SytmsetListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public String loadDummy() throws BaseException
    {
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }

    public SytmsetSC getCriteria()
    {
	return criteria;
    }

    public void setCriteria(SytmsetSC criteria)
    {
	this.criteria = criteria;
    }

    public void setSytmsetBO(SytmsetBO sytmsetBO)
    {
	this.sytmsetBO = sytmsetBO;
    }
}
