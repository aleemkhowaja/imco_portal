package com.path.imco.actions.setoff;

import com.path.imco.bo.setoff.SetoffBO;
import com.path.imco.vo.setoff.SetoffSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;
/**
 *
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code
 *
 * SetoffListAction.java used to
 */
public class SetoffListAction extends GridBaseAction
{
    private SetoffBO setoffBO;
    private SetoffSC criteria = new SetoffSC();

    public String loadSetoffGrid()
    {
	try
	{
	    String[] searchCol = { "TERMINAL", "USER_ID", "SYNC_ID" };
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(setoffBO.returnSetOffListCount(criteria));
	    }

	    setGridModel(setoffBO.returnSetOffList(criteria));
	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadSetoffGrid of SetoffListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public void setSetoffBO(SetoffBO setoffBO)
    {
	this.setoffBO = setoffBO;
    }
}
