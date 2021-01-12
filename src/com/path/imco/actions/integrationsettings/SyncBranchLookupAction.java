package com.path.imco.actions.integrationsettings;

import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;
import com.path.imco.bo.integrationsettings.IntegrationEventMgmtBO;
import com.path.imco.bo.integrationsettings.IntegrationSettingsBO;
import com.path.imco.vo.integrationsettings.IntegrationSettingsSC;
import com.path.lib.vo.LookupGrid;
import java.util.List;
import java.util.ArrayList;

/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * SyncBranchLookupAction.java used to
 */
public class SyncBranchLookupAction extends LookupBaseAction
{
	private IntegrationSettingsBO integrationSettingsBO;
	private IntegrationSettingsSC integrationSettingsSC = new IntegrationSettingsSC();

	public String constructSyncBranchLookup()
	{
		try
		{
			String[] name = {"BR_CODE", "DESCRIPTION"};
			String[] colType = {"number", "text"};
			String[] titles = {getText("BR_CODE_key"), getText("DESCRIPTION_key")};
			if(returnSessionObject().getHideArabicColumns())
			{
				name = new String[] {"BR_CODE", "DESCRIPTION"};
				colType = new String[] {"number", "text"};
				titles = new String[] {getText("BR_CODE_key"), getText("DESCRIPTION_key")};
			}
			 // Defining the Grid
			LookupGrid grid = new LookupGrid();
			//grid.setCaption(getText("SyncBranch_key"));
			grid.setCaption("SyncBranch_key");
			grid.setRowNum("5");
			grid.setUrl("/path/integrationSettings/SyncBranchLookupAction_fillSyncBranchLookup");

			lookup(grid, integrationSettingsSC, name, colType, titles);			
		}
		catch(Exception e)
		{
			log.error(e, "Error in constructSyncBranchLookup of SyncBranchLookupAction");
			handleException(e, null, null);
		}
		return SUCCESS;
	}

	public String fillSyncBranchLookup()
	{	
		try 
		{
			copyproperties(integrationSettingsSC);
			SessionCO sessionCO = returnSessionObject();
			integrationSettingsSC.setCompCode(sessionCO.getCompanyCode());
			integrationSettingsSC.setBranchCode(sessionCO.getBranchCode());

			if(checkNbRec(integrationSettingsSC))
			{
			
				setRecords(integrationSettingsBO.returnSyncBranchLookupCount(integrationSettingsSC));
			}
			setGridModel(integrationSettingsBO.returnSyncBranchLookup(integrationSettingsSC));
		} 
		catch (Exception e) 
		{
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

	public void setIntegrationSettingsBO(IntegrationSettingsBO integrationSettingsBO)
	{
	    this.integrationSettingsBO = integrationSettingsBO;
	}

	
	
}
