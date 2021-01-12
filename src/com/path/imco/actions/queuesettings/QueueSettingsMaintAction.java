package com.path.imco.actions.queuesettings;

import java.math.BigDecimal;
import java.util.List;

import com.path.imco.bo.queuesettings.QueueSettingsBO;
import com.path.imco.vo.queuesettings.QueueSettingsCO;
import com.path.lib.vo.GridUpdates;
import com.path.struts2.lib.common.base.BaseAction;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * QueueSettingsMaintAction.java used to
 */
public class QueueSettingsMaintAction extends BaseAction
{
    private QueueSettingsBO queueSettingsBO;
    private QueueSettingsCO queueSettingsCO = new QueueSettingsCO();
    private BigDecimal brCode;

    public String loadQueueSettingsPage()
    {
	try
	{
	    queueSettingsCO.setBrCode(getBrCode());
	    set_searchGridId("queueSettingsListGridTbl_Id");
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "queueSettingsList";
    }

    public String saveNew()
    {
	try
	{
	    if(queueSettingsCO.getQueueGridListString() != null && !queueSettingsCO.getQueueGridListString().isEmpty())
	    {
		GridUpdates gridUpdates = getGridUpdates(queueSettingsCO.getQueueGridListString(),
			QueueSettingsCO.class, true);

		List<QueueSettingsCO> listOfStatusGrid = gridUpdates.getLstAllRec();
		queueSettingsCO.setQueueGridList(listOfStatusGrid);
	    }
	    queueSettingsCO = queueSettingsBO.saveNew(queueSettingsCO);
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

    public QueueSettingsCO getQueueSettingsCO()
    {
	return queueSettingsCO;
    }

    public void setQueueSettingsCO(QueueSettingsCO queueSettingsCO)
    {
	this.queueSettingsCO = queueSettingsCO;
    }

    public BigDecimal getBrCode()
    {
	return brCode;
    }

    public void setBrCode(BigDecimal brCode)
    {
	this.brCode = brCode;
    }
}
