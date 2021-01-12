package com.path.imco.actions.setoff;

import java.util.ArrayList;
import java.util.List;

import com.path.imco.bo.setoff.SetoffBO;
import com.path.imco.vo.setoff.SetoffCO;
import com.path.lib.common.exception.BaseException;
import com.path.lib.vo.GridUpdates;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
/**
 *
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code
 *
 * SetoffMaintAction.java used to
 */
public class SetoffMaintAction extends BaseAction
{
    private SetoffBO setoffBO;
    private SetoffCO setoffCO = new SetoffCO();
    private List<SetoffCO> actionList = new ArrayList<>();

    public String loadSetoffPage()
    {
	try
	{
	    set_searchGridId("setoffListGridTbl_Id");
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "setoffList";
    }

    public String setoff()
    {
	try
	{

	    if(setoffCO.getSetoffGridListString() != null && !setoffCO.getSetoffGridListString().isEmpty())
	    {
		GridUpdates gridUpdates = getGridUpdates(setoffCO.getSetoffGridListString(), SetoffCO.class,
			true);

		List<SetoffCO> listOfSettoffGrid = gridUpdates.getLstAllRec();
		setoffCO.setSetoffGridList(listOfSettoffGrid);
	    }
	    SessionCO sessionCO = returnSessionObject();
	    // setoffCO.setUserId(sessionCO.getUserName());
	    setoffCO.setRunningDate(sessionCO.getRunningDateRET());
	    setoffBO.setoff(setoffCO);
	}
	catch(BaseException e)
	{
	    // TODO Auto-generated catch block

	    handleException(e, null, null);
	}

	return SUCCESS;
    }

    public String refresh()

    {
	try
	{
	    setoffCO = setoffBO.refresh(setoffCO);
	}
	catch(BaseException e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;

    }

    public void setSetoffBO(SetoffBO setoffBO)
    {
	this.setoffBO = setoffBO;
    }

    public SetoffCO getSetoffCO()
    {
	return setoffCO;
    }

    public void setSetoffCO(SetoffCO setoffCO)
    {
	this.setoffCO = setoffCO;
    }

    public List<SetoffCO> getActionList()
    {
	return actionList;
    }

    public void setActionList(List<SetoffCO> actionList)
    {
	this.actionList = actionList;
    }
}
