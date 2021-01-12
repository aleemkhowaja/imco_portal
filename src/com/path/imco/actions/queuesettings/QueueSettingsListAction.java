package com.path.imco.actions.queuesettings;

import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.select.SelectSC;
import com.path.lib.common.exception.BaseException;

import java.math.BigDecimal;

import com.path.imco.bo.queuesettings.QueueSettingsBO;
import com.path.imco.bo.serviceset.ServiceSetConstant;
import com.path.imco.vo.queuesettings.QueueSettingsCO;
import com.path.imco.vo.queuesettings.QueueSettingsSC;
import com.path.imco.vo.serviceset.ServiceSetSC;
/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * QueueSettingsListAction.java used to
 */
public class QueueSettingsListAction extends GridBaseAction
{
	private QueueSettingsBO queueSettingsBO;
	private QueueSettingsSC criteria = new QueueSettingsSC();
	private QueueSettingsCO queueSettingsCO = new QueueSettingsCO();
	
	 public String loadQueueSetGrid()
	    {
		try
		{
		    criteria.setBrCode(queueSettingsCO.getBrCode());  
		    setGridModel(queueSettingsBO.returnQueueSettingsList(criteria));
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
		return SUCCESS;
	    }
	
	public void setQueueSettingsBO(QueueSettingsBO queueSettingsBO)
	{
		this.queueSettingsBO = queueSettingsBO;
	}


	public QueueSettingsSC getCriteria()
	{
	    return criteria;
	}


	public void setCriteria(QueueSettingsSC criteria)
	{
	    this.criteria = criteria;
	}

	public QueueSettingsCO getQueueSettingsCO()
	{
	    return queueSettingsCO;
	}

	public void setQueueSettingsCO(QueueSettingsCO queueSettingsCO)
	{
	    this.queueSettingsCO = queueSettingsCO;
	}
}
