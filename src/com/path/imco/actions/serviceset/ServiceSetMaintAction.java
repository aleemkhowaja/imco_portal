package com.path.imco.actions.serviceset;

import java.util.ArrayList;
import java.util.List;

import com.path.imco.bo.serviceset.ServiceSetBO;
import com.path.imco.bo.serviceset.ServiceSetConstant;
import com.path.imco.vo.serviceset.ServiceSetCO;
import com.path.imco.vo.serviceset.ServiceSetSC;
import com.path.lib.vo.GridUpdates;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * ServiceSetMaintAction.java used to
 */
public class ServiceSetMaintAction extends BaseAction
{
    private ServiceSetBO serviceSetBO;
    private ServiceSetCO serviceSetCO = new ServiceSetCO();
    private ServiceSetSC serviceSetSC = new ServiceSetSC();

    private List<SelectCO> requiredTypeList = new ArrayList<>();

    public String loadServiceSetPage()
    {

	SelectSC selectSC = new SelectSC();

	// selectSC.setLovTypeId(ServiceSettingsConstant.SERVICE_LOV_TYPE);
	SessionCO sessionCO = returnSessionObject();
	selectSC.setLanguage(sessionCO.getLanguage());

	// try
	// {
	// set_searchGridId("serviceSetListGridTbl_Id");
	// }
	// catch(Exception ex)
	// {
	// handleException(ex, null, null);
	// }
	return "serviceSetList";
    }

    public String saveNew()
    {
	try
	{

	    if(serviceSetCO.getServiceGridListString() != null && !serviceSetCO.getServiceGridListString().isEmpty())
	    {
		GridUpdates gridUpdates = getGridUpdates(serviceSetCO.getServiceGridListString(), ServiceSetCO.class,
			true);

		List<ServiceSetCO> listOfStatusGrid = gridUpdates.getLstAllRec();
		serviceSetCO.setServiceGridList(listOfStatusGrid);
	    }
	    serviceSetCO = serviceSetBO.saveNew(serviceSetCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    // public String loadAccessServiceTypeSelect()
    // {
    // try
    // {
    // setProcessNameList(returnLOV(new
    // SelectSC(ServiceSetConstant.PROCESS_LOV_TYPE)));
    // System.out.println("hhh");
    //
    // }
    // catch(Exception e)
    // {
    // handleException(e, null, null);
    // }
    //
    // return SUCCESS;
    // }

    public String loadAccessServiceTypeSelect()
    {
	try
	{
	    SelectSC selSC = new SelectSC(ServiceSetConstant.PROCESS_LOV_TYPE);

	    setRequiredTypeList(returnLOV(selSC));
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

    public ServiceSetCO getServiceSetCO()
    {
	return serviceSetCO;
    }

    public void setServiceSetCO(ServiceSetCO serviceSetCO)
    {
	this.serviceSetCO = serviceSetCO;
    }

    public ServiceSetSC getServiceSetSC()
    {
	return serviceSetSC;
    }

    public void setServiceSetSC(ServiceSetSC serviceSetSC)
    {
	this.serviceSetSC = serviceSetSC;
    }

    public List<SelectCO> getRequiredTypeList()
    {
	return requiredTypeList;
    }

    public void setRequiredTypeList(List<SelectCO> requiredTypeList)
    {
	this.requiredTypeList = requiredTypeList;
    }

}
