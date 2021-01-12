package com.path.imco.actions.integrationsettings;

import com.path.imco.bo.integrationsettings.IntegrationEventMgmtBO;

import com.path.struts2.lib.common.base.BaseAction;

//import com.path.imco.vo.syncbranch.SyncBranchSC;
//import com.path.imco.vo.syncbranch.SyncBranchCO;
import com.path.vo.common.SessionCO;
import com.path.imco.vo.integrationsettings.IntegrationSettingsCO;
import com.path.imco.vo.integrationsettings.IntegrationSettingsSC;

/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * IntegrationEventMgmtAction.java used to
 */
public class IntegrationEventMgmtAction extends BaseAction
{
	/**
     * 
     */
    private static final long serialVersionUID = 1L;
	private IntegrationEventMgmtBO integrationEventMgmtBO;
	private IntegrationSettingsSC integrationSettingsSC = new IntegrationSettingsSC();
	private IntegrationSettingsCO integrationSettingsCO = new IntegrationSettingsCO();

	public String onChangeCode()
	{
		try
		{
			SessionCO sessionCO = returnSessionObject();
			//integrationSettingsSC.setCompCode(sessionCO.getCompanyCode());

			integrationSettingsCO = integrationEventMgmtBO.onChangeCode(integrationSettingsCO);
		}
		catch(Exception e)
		{
		    integrationSettingsCO = new IntegrationSettingsCO();
		    handleException(e, null, null);
		}
		return SUCCESS;
	}

	public Object getModel()
	{
		return integrationSettingsSC;
	}

	public IntegrationSettingsSC getIntegrationSettingsSC()
	{
	    return integrationSettingsSC;
	}

	public void setIntegrationSettingsSC(IntegrationSettingsSC integrationSettingsSC)
	{
	    this.integrationSettingsSC = integrationSettingsSC;
	}

	public IntegrationSettingsCO getIntegrationSettingsCO()
	{
	    return integrationSettingsCO;
	}

	public void setIntegrationSettingsCO(IntegrationSettingsCO integrationSettingsCO)
	{
	    this.integrationSettingsCO = integrationSettingsCO;
	}

	public void setIntegrationEventMgmtBO(IntegrationEventMgmtBO integrationEventMgmtBO)
	{
	    this.integrationEventMgmtBO = integrationEventMgmtBO;
	}
	
}
