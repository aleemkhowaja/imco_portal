package com.path.imco.actions.channel;

import java.util.List;

import com.path.imco.bo.channel.ChannelBO;
import com.path.imco.bo.channel.ChannelConstant;
import com.path.imco.vo.channel.ChannelCO;
import com.path.imco.vo.channel.ChannelSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code
 * 
 * ChannelListAction.java used to
 */
public class ChannelListAction extends GridBaseAction
{
    private ChannelBO channelBO;
    private ChannelSC criteria = new ChannelSC();

    public String loadChannelGrid()
    {
		try
		{
		    SessionCO sessionCO = returnSessionObject();
		    String[] searchCol = { "imApiChannelsVO.CHANNEL_ID", "imApiChannelsVO.DESCRIPTION", "imApiChannelsVO.USER_ID","STATUS_DESC" };
		    criteria.setSearchCols(searchCol);
		    copyproperties(criteria);
		    criteria.setCompCode(sessionCO.getCompanyCode());
		    criteria.setLovTypeId(ChannelConstant.LOV_TYPE_STATUS);
		    criteria.setLovTypeLkOpt(ChannelConstant.LOV_LK_TYPE);
		    criteria.setCurrAppName(sessionCO.getCurrentAppName());
		    criteria.setPreferredLanguage(sessionCO.getLanguage());
		    criteria.setMenuRef(get_pageRef());
		    criteria.setCrudMode(getIv_crud());
		    if(checkNbRec(criteria))
		    {
			setRecords(channelBO.returnChannelListCount(criteria));
		    }
		    setGridModel(channelBO.returnChannelList(criteria));
		}
		catch(Exception e)
		{
		    log.error(e, "Error in loadChannelGrid of ChannelListAction");
		    handleException(e, null, null);
		}
		return SUCCESS;
    }
    
    
    public String loadMachineIdGrid()
    {
	try
	{
	    String[] searchCol = { "imApiChannelsDetVO.HOST_NAME","imApiChannelsDetVO.HASH_KEY" };
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    if(criteria.getChannelId() != null)
	    {
		int channelMAchineIdCnt = channelBO.returnMachineIdListCount(criteria);
		setRecords(channelMAchineIdCnt);
		List<ChannelCO> channelMAchineIdList = channelBO.returnMachineIdList(criteria);
		setGridModel(channelMAchineIdList);
	    }
	}
	catch(Exception e)
	{
	    log.error(e, "Error in load Channel Machine ID");
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }
    public ChannelSC getCriteria()
    {
	return criteria;
    }
    public void setCriteria(ChannelSC criteria)
    {
	this.criteria = criteria;
    }
    public void setChannelBO(ChannelBO channelBO)
    {
	this.channelBO = channelBO;
    }
}
