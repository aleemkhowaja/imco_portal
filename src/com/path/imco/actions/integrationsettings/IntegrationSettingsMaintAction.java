package com.path.imco.actions.integrationsettings;

import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;
import com.path.lib.common.exception.BaseException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.path.bo.common.ConstantsCommon;
import com.path.dbmaps.vo.SYS_PARAM_SCREEN_DISPLAYVO;
import com.path.imco.bo.integrationsettings.IntegrationConstant;
import com.path.imco.bo.integrationsettings.IntegrationSettingsBO;
import com.path.imco.vo.integrationsettings.IntegrationSettingsCO;
import com.path.imco.vo.integrationsettings.IntegrationSettingsSC;
/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all
 *  ownership rights to this source code 
 * 
 * IntegrationSettingsMaintAction.java used to
 */
public class IntegrationSettingsMaintAction extends BaseAction
{
	private IntegrationSettingsBO integrationSettingsBO;
	private IntegrationSettingsCO integrationSettingsCO = new IntegrationSettingsCO();
	private IntegrationSettingsSC integrationSettingsSC = new IntegrationSettingsSC();
	 
	 private List<SelectCO> replicaList = new ArrayList<SelectCO>();
	 private List<SelectCO> resendList = new ArrayList<SelectCO>();
	 private List<SelectCO> periodList = new ArrayList<SelectCO>();
	 private List<SelectCO> entityList = new ArrayList<SelectCO>();
	public String loadIntegrationSettingsPage()
	{
	    //SelectSC selectSC = new SelectSC();
	   
	    //selectSC.setLovTypeId(IntegrationConstant.INTEGRATION_LOV_TYPE);
	   // SessionCO sessionCO = returnSessionObject();
	   // selectSC.setLanguage(sessionCO.getLanguage());
		try
		{
		/*    List<SelectCO> returnLOV = returnLOV(selectSC);

		    replicaList.addAll(returnLOV);*/
		    loadDropDowns();
		    set_searchGridId("integrationSettingsListGridTbl_Id");
		}
		catch(Exception ex)
		{
		    handleException(ex, null, null);
		}
		return "integrationSettingsList";
	}
	
	    public String loadMaintanenceDetails()
	    {

		try
		{
		  //  if(integrationSettingsCO.getSync_entity_parametersVO()== null)
		    //{
		    	loadDropDowns();
			integrationSettingsSC.setBr_code(integrationSettingsCO.getSync_entity_parametersblobVO().getBR_CODE());
			integrationSettingsSC.setEntitycode(integrationSettingsCO.getSync_entity_parametersblobVO().getENTITY_CODE());
			integrationSettingsCO = integrationSettingsBO.returnintegrationDetails(integrationSettingsSC);
			//setAdditionalScreenParams(integrationSettingsCO.getElementMap());

		    //}
//		    else
//		    {
//			integrationSettingsCO = integrationSettingsBO.returnintegrationDetails(integrationSettingsSC);
//			//integrationSettingsCO.setUpdateMode(ConstantsCommon.YES);
//			//applyRetrieveAudit(AuditConstant.IM_API_CHANNEL_KEY, channelCO.getImApiChannelsVO(), channelCO);
//		    }
			
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
		return "integrationSettingsMaint";
	    }
	    
	    @SuppressWarnings("unchecked")
	    private void loadDropDowns()
	    {
	 try
	 {
	     setReplicaList(returnLOV(new SelectSC(IntegrationConstant.INTEGRATION_LOV_TYPE)));
		    setResendList(returnLOV(new SelectSC(IntegrationConstant.RESEND_LOV_TYPE)));
		    setPeriodList(returnLOV(new SelectSC(IntegrationConstant.PERIOD_LOV_TYPE)));
		    setEntityList(returnLOV(new SelectSC(IntegrationConstant.ENTITY_LOV_TYPE)));
	    
	 }
	 catch(BaseException e)
	 {
	     handleException(e, null, null);
	 }

	    }
	
	public String saveNew()
	{
	    try
	    {
		integrationSettingsCO = integrationSettingsBO.saveNew(integrationSettingsCO);
	    }
	    catch(Exception e)
		{
		    handleException(e, null, null);
		}
		return SUCCESS;
	}
	public void setIntegrationSettingsBO(IntegrationSettingsBO integrationSettingsBO)
	{
		this.integrationSettingsBO = integrationSettingsBO;
	}
	public List<SelectCO> getReplicaList()
	{
	    return replicaList;
	}
	public void setReplicaList(List<SelectCO> replicaList)
	{
	    this.replicaList = replicaList;
	}
	public List<SelectCO> getResendList()
	{
	    return resendList;
	}
	public void setResendList(List<SelectCO> resendList)
	{
	    this.resendList = resendList;
	}
	public List<SelectCO> getPeriodList()
	{
	    return periodList;
	}
	public void setPeriodList(List<SelectCO> periodList)
	{
	    this.periodList = periodList;
	}
	public List<SelectCO> getEntityList()
	{
	    return entityList;
	}
	public void setEntityList(List<SelectCO> entityList)
	{
	    this.entityList = entityList;
	}

	public IntegrationSettingsCO getIntegrationSettingsCO()
	{
	    return integrationSettingsCO;
	}

	public void setIntegrationSettingsCO(IntegrationSettingsCO integrationSettingsCO)
	{
	    this.integrationSettingsCO = integrationSettingsCO;
	}

	public IntegrationSettingsSC getIntegrationSettingsSC()
	{
	    return integrationSettingsSC;
	}

	public void setIntegrationSettingsSC(IntegrationSettingsSC integrationSettingsSC)
	{
	    this.integrationSettingsSC = integrationSettingsSC;
	}

}
