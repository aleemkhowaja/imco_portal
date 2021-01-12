package com.path.imco.actions.entities;

import com.path.imco.bo.entities.EntitiesBO;
import com.path.imco.vo.entities.EntitiesSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;/**
 *
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code
 *
 * EntitiesListAction.java used to
 */
public class EntitiesListAction extends GridBaseAction
{
    private EntitiesBO entitiesBO;
    private EntitiesSC criteria = new EntitiesSC();

    public String loadEntitiesGrid()
    {
	try
	{
	    String[] searchCol = { "syncEntityVO.ENTITY_CODE", "syncEntityVO.ENTITY_NAME", "syncEntityVO.DESCRIPTION",
		    "syncEntityVO.BR_FIELD_NAME", "syncEntityVO.REQUEST_API_CODE", "syncEntityVO.RESPONSE_API_CODE" };
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setSearchCols(searchCol);
	    // criteria.setDateSearchCols(hmDate);
	    copyproperties(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(entitiesBO.returnEntitiesListCount(criteria));
	    }
	    setGridModel(entitiesBO.returnEntitiesList(criteria));
	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadEntitiesGrid of EntitiesListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }
    public EntitiesSC getCriteria()
    {
	return criteria;
    }
    public void setCriteria(EntitiesSC criteria)
    {
	this.criteria = criteria;
    }
    public void setEntitiesBO(EntitiesBO entitiesBO)
    {
	this.entitiesBO = entitiesBO;
    }
}
