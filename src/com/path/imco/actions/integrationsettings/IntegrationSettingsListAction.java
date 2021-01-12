package com.path.imco.actions.integrationsettings;

import java.util.HashMap;

import com.path.imco.bo.integrationsettings.IntegrationSettingsBO;
import com.path.imco.vo.integrationsettings.IntegrationSettingsSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code
 * 
 * IntegrationSettingsListAction.java used to
 */
public class IntegrationSettingsListAction extends GridBaseAction
{
    private IntegrationSettingsBO integrationSettingsBO;
    private IntegrationSettingsSC criteria = new IntegrationSettingsSC();

    public String loadIntegrationSettingsGrid()
    {
	try
	{
	    String[] searchCol = {"sync_entity_parametersVO.BR_CODE", "sync_entity_parametersVO.ENTITY_CODE", "sync_entity_parametersVO.TO_BR", "sync_entity_parametersVO.REPL_TYPE", "sync_entity_parametersVO.PERIOD", "sync_entity_parametersVO.PERIOD_TYPE", "sync_entity_parametersVO.WHO_WINS", "sync_entity_parametersVO.ENABLE_TRIGGER", "sync_entity_parametersVO.SYS_REPLICATION", "sync_entity_parametersVO.ERR_SUSPENDED", "sync_entity_parametersVO.ERR_PERIOD", "sync_entity_parametersVO.ERR_PERIOD_TYPE", "sync_entity_parametersVO.ERR_STOP_AFTER", "sync_entity_parametersVO.CRITERIA", "sync_entity_parametersVO.PERIOD_DAY", "sync_entityVO.ENTITY_NAME","sync_entity_parametersVO.ENTITY_NAME", "sync_branchVO.DESCRIPTION", "sync_entity_parametersVO.REPL_INSERT", "sync_entity_parametersVO.REPL_UPDATE", "sync_entity_parametersVO.REPL_DELETE", "relativeBr", "sync_entity_parametersVO.TMP_COLUMNS", "sync_entity_parametersVO.SP_SPECIFICATIONS", "sync_entity_parametersVO.SP_NAME", "sync_entity_parametersVO.ENTITY_TYPE", "sync_entity_parametersVO.QUERY_SPECIFICATIONS", "sync_entity_parametersVO.QUERY_SPECIFICATIONS1", "sync_entity_parametersVO.QUERY_SPECIFICATIONS2", "sync_entity_parametersVO.QUERY_SPECIFICATIONS3", "sync_entity_parametersVO.INT_LEVEL", "sync_entity_parametersVO.EXT_SP_NAME", "sync_entity_parametersVO.REQUEST_API_CODE", "sync_entity_parametersVO.RESPONSE_API_CODE"};
	    HashMap<String,String> hmDate = new HashMap<String,String>();
	    hmDate.put("sync_entity_parametersblobVO.REPL_DATETIME", "sync_entity_parametersblobVO.REPL_DATETIME");
	    SessionCO sessionCO = returnSessionObject();
	    criteria.setSearchCols(searchCol);
	    criteria.setDateSearchCols(hmDate);
	    copyproperties(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(integrationSettingsBO.returnIntegrationSettingsListCount(criteria));
	    }
	    setGridModel(integrationSettingsBO.returnIntegrationSettingsList(criteria));
	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadIntegrationSettingsGrid of IntegrationSettingsListAction");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }
    public IntegrationSettingsSC getCriteria()
    {
	return criteria;
    }
    public void setCriteria(IntegrationSettingsSC criteria)
    {
	this.criteria = criteria;
    }
    public void setIntegrationSettingsBO(IntegrationSettingsBO integrationSettingsBO)
    {
	this.integrationSettingsBO = integrationSettingsBO;
    }
}
