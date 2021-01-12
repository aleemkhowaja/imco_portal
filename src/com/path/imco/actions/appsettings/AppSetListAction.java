package com.path.imco.actions.appsettings;

import com.path.imco.bo.appsettings.AppSetBO;
import com.path.imco.vo.appsettings.AppSetSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code
 * 
 * AppSetListAction.java used to
 */
public class AppSetListAction extends GridBaseAction
{
    private AppSetBO appSetBO;
    private AppSetSC criteria = new AppSetSC();

    public String loadAppSetGrid()
    {
	try
	{
	    String[] searchCol = {"APP_NAME", "WINDOW_REFERENCE", "WINDOW_NAME", "WINDOW_LABEL", "DWO_NAME", "DWO_LABEL", "COLUMN_NAME", "COLUMN_LABEL", "STATUS", "INT_LEVEL", "TIME_OUT", "COLUMN_NBR", "COLUMN_RELATION_NBR"};
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setSearchCols(searchCol);
	    // criteria.setDateSearchCols(hmDate);
	    copyproperties(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(appSetBO.returnAppSetListCount(criteria));
	    }
	    setGridModel(appSetBO.returnAppSetList(criteria));
	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadAppSetGrid of AppSetListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public String loadgroupsetGrid()
    {
	try
	{

	    setGridModel(appSetBO.returnGroupGridMapList(criteria));
	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadFieldMappingGrid of FieldMappingListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }
    public AppSetSC getCriteria()
    {
	return criteria;
    }
    public void setCriteria(AppSetSC criteria)
    {
	this.criteria = criteria;
    }
    public void setAppSetBO(AppSetBO appSetBO)
    {
	this.appSetBO = appSetBO;
    }
}
