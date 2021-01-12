package com.path.imco.actions.serviceset;

import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;
import com.path.lib.common.exception.BaseException;

import java.util.ArrayList;
import java.util.List;

import com.path.imco.bo.serviceset.ServiceSetBO;
import com.path.imco.bo.serviceset.ServiceSetConstant;
import com.path.imco.vo.serviceset.ServiceSetSC;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * ServiceSetListAction.java used to
 */
public class ServiceSetListAction extends GridBaseAction
{
    private ServiceSetBO serviceSetBO;
    private ServiceSetSC criteria = new ServiceSetSC();
    private List<SelectCO> processNameList = new ArrayList<SelectCO>();

    public String loadServiceSetGrid()
    {
	try
	{
	    setProcessNameList(returnLOV(new SelectSC(ServiceSetConstant.PROCESS_LOV_TYPE)));
	    
	    setGridModel(serviceSetBO.returnServiceSettingsList(criteria));
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public void setServiceSetBO(ServiceSetBO serviceSetBO)
    {
	this.serviceSetBO = serviceSetBO;
    }

    public List<SelectCO> getProcessNameList()
    {
	return processNameList;
    }

    public void setProcessNameList(List<SelectCO> processNameList)
    {
	this.processNameList = processNameList;
    }
}
