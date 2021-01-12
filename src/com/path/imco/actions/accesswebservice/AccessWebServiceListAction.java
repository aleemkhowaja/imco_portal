package com.path.imco.actions.accesswebservice;

import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;
import com.path.imco.bo.accesswebservice.AccessWebServiceBO;
import com.path.imco.bo.accesswebservice.AccessWebServiceConstant;
import com.path.imco.vo.accesswebservice.AccessWebServiceSC;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * AccessWebServiceListAction.java used to
 */
public class AccessWebServiceListAction extends GridBaseAction
{
    private AccessWebServiceBO accessWebServiceBO;
    private AccessWebServiceSC criteria = new AccessWebServiceSC();

    public String loadAccessWebServiceGrid()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    String[] searchCol = { "imcoPwsTmpltMasterVO.TEMPLATE_ID", "imcoPwsTmpltMasterVO.TEMPLATE_DESC","STATUS_DESC"};
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    criteria.setCompCode(sessionCO.getCompanyCode());
	    criteria.setLovTypeId(AccessWebServiceConstant.LOV_TYPE_STATUS);
	    criteria.setLovTypeLkOpt(AccessWebServiceConstant.LOV_LK_TYPE);
	    criteria.setCurrAppName(sessionCO.getCurrentAppName());
	    criteria.setPreferredLanguage(sessionCO.getLanguage());
	    criteria.setMenuRef(get_pageRef());
	    criteria.setCrudMode(getIv_crud());
	    if(checkNbRec(criteria))
	    {
		setRecords(accessWebServiceBO.returnAccessWebServiceListCount(criteria));
	    }
	    setGridModel(accessWebServiceBO.returnAccessWebServiceList(criteria));
	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadTemplategrid of AccessWebServiceAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }
    
    public AccessWebServiceSC getCriteria()
    {
        return criteria;
    }

    public void setCriteria(AccessWebServiceSC criteria)
    {
        this.criteria = criteria;
    }
    
    public void setAccessWebServiceBO(AccessWebServiceBO accessWebServiceBO)
    {
	this.accessWebServiceBO = accessWebServiceBO;
    }
}
