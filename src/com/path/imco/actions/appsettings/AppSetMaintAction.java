package com.path.imco.actions.appsettings;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.path.imco.bo.appsettings.AppSetBO;
import com.path.imco.vo.appsettings.AppSetCO;
import com.path.lib.common.exception.BaseException;
import com.path.lib.vo.GridUpdates;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;
/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code
 * 
 * AppSetMaintAction.java used to
 */
public class AppSetMaintAction extends BaseAction
{
    private AppSetBO appSetBO;
    private AppSetCO appsetCO;

    private List<SelectCO> statustypeList = new ArrayList<>();

    public String loadAppSetPage()
    {

	try
	{
	    set_searchGridId("appSetListGridTbl_Id");
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "appSetList";
    }

    public String loadappsetTypeSelect()
    {

	try
	{
	    SelectSC selSC = new SelectSC(BigDecimal.valueOf(956));
	    setStatustypeList(returnLOV(selSC));
	}
	catch(BaseException e)
	{
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

	return SUCCESS;
    }

    public String saveGroupData()
    {

	try
	{
	    if(appsetCO.getAppsetGroupGridListString() != null && !appsetCO.getAppsetGroupGridListString().isEmpty())
	    {
		GridUpdates gridUpdates = getGridUpdates(appsetCO.getAppsetGroupGridListString(), AppSetCO.class, true);

		List<AppSetCO> appsetGridList = gridUpdates.getLstAllRec();

		appsetCO.setAppGroupGridList(appsetGridList);
		appsetCO = appSetBO.saveGroupData(appsetCO);

	    }

	}
	catch(BaseException e)
	{
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

	return SUCCESS;

    }

    public void setAppSetBO(AppSetBO appSetBO)
    {
	this.appSetBO = appSetBO;
    }

    /**
     * @return the appsetCO
     */
    public AppSetCO getAppsetCO()
    {
	return appsetCO;
    }

    /**
     * @param appsetCO the appsetCO to set
     */
    public void setAppsetCO(AppSetCO appsetCO)
    {
	this.appsetCO = appsetCO;
    }

    /**
     * @return the statustypeList
     */
    public List<SelectCO> getStatustypeList()
    {
	return statustypeList;
    }

    /**
     * @param statustypeList the statustypeList to set
     */
    public void setStatustypeList(List<SelectCO> statustypeList)
    {
	this.statustypeList = statustypeList;
    }
}
