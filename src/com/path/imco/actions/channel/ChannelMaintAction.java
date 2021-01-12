package com.path.imco.actions.channel;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletContext;
import org.apache.struts2.ServletActionContext;
import com.path.atm.bo.atminterface.AtmInterfaceConstants;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.bo.common.audit.AuditConstant;
import com.path.dbmaps.vo.GTW_CHANNEL_DETVO;
import com.path.dbmaps.vo.GTW_PWS_TMPLT_MASTERVO;
import com.path.expression.common.PBFunc.BaseException;
import com.path.imco.bo.channel.ChannelBO;
import com.path.imco.bo.channel.ChannelConstant;
import com.path.imco.vo.channel.ChannelCO;
import com.path.imco.vo.channel.ChannelSC;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.vo.GridUpdates;
import com.path.struts2.json.PathJSONUtil;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.audit.AuditRefCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.status.StatusAddFieldCO;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * ChannelMaintAction.java used to
 */
public class ChannelMaintAction extends BaseAction
{
    private ChannelBO channelBO;
    private ChannelCO channelCO = new ChannelCO();
    private ChannelSC criteria = new ChannelSC();
    private String updates;
    private String channelIdOldStatus;
    private String url;
    private List<StatusAddFieldCO> addFields;
    private List<SelectCO> communicationProtocolList;
    private List<SelectCO> communicationFormatList;
    private List<SelectCO> serverTypeList;
    
	
    public String loadChannelPage()
    {
	try
	{
	    set_searchGridId("channelListGridTbl_Id");
	    set_showNewInfoBtn("true");
	    set_showSmartInfoBtn("false");
	    fillSessionData();
	    criteria.setCommunicationProtocol("H");
	    fillDropDown();
	    if(ConstantsCommon.CRUD_MAINTAIN.equals(getIv_crud()))
	    {
		set_showNewInfoBtn("true");
	    }
	    if(ConstantsCommon.CRUD_APPROVE.equals(getIv_crud()))
	    {
		set_recReadOnly("true");
	    }
	    channelCO.setStatusDesc(getText("Active"));
	    channelCO = channelBO.applySysParamSettings(channelCO);
	    setAdditionalScreenParams(channelCO.getElementMap());
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}

	return "channelList";
    }

    /**
     * @return
     */

    public String loadMaintanenceDetails()
    {

	try
	{
		//fill comboboxes on screen
		
		
			if (channelCO.getImApiChannelsVO() == null) {
				channelCO = channelBO.applySysParamSettings(channelCO);
				setAdditionalScreenParams(channelCO.getElementMap());

			} else {
				ChannelSC channelSC = new ChannelSC();
				SessionCO sessionCO = returnSessionObject();
				channelSC.setCompCode(sessionCO.getCompanyCode());
				channelSC.setBranchCode(sessionCO.getBranchCode());
				channelSC.setChannelId(channelCO.getImApiChannelsVO().getCHANNEL_ID());
				channelSC.setLovTypeId(ChannelConstant.LOV_TYPE_STATUS);
				channelSC.setLovTypeLkOpt(ChannelConstant.LOV_LK_TYPE);
				channelSC.setCrudMode(getIv_crud());
				channelSC.setCurrAppName(sessionCO.getCurrentAppName());
				channelSC.setPreferredLanguage(sessionCO.getLanguage());
				channelSC.setMenuRef(get_pageRef());
				channelSC.setOldStatus(channelIdOldStatus);
				channelCO = channelBO.returnChannelDetails(channelSC);
				// fill comboboxes
				criteria.setCommunicationProtocol(channelCO.getImApiChannelsVO().getCOMMUNICATION_PROTOCOL());
				fillDropDown();

				channelCO.setJsonMultiselectArray(
						"{\"root\":".concat(PathJSONUtil.serialize(channelBO.loadAssignedTemplateIdListGrid(channelSC),
								null, null, false, true)).concat("}"));
				if (!(channelCO.getImApiChannelsVO().getSTATUS().equals(channelSC.getOldStatus()))) {
					throw new BOException(MessageCodes.RECORD_CHANGED);
				}
				if (ConstantsCommon.CRUD_APPROVE.equals(getIv_crud())) {
					set_recReadOnly(ConstantsCommon.TRUE);
				} else if (ConstantsCommon.ACTIVE_RECORD.equals(channelCO.getImApiChannelsVO().getSTATUS())
						|| ChannelConstant.IV_CRUD_UPDATE_AFTER_APPROVE.equals(getIv_crud())
								&& ChannelConstant.STATUS_APPROVED.equals(channelCO.getImApiChannelsVO().getSTATUS())) {
					set_recReadOnly(ConstantsCommon.FALSE);
				} else {
					set_recReadOnly(ConstantsCommon.TRUE);
				}
				channelCO.setUpdateMode(ConstantsCommon.YES);
				applyRetrieveAudit(AuditConstant.IM_API_CHANNEL_KEY, channelCO.getImApiChannelsVO(), channelCO);
			}
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	    return ERROR;
	}
	return "channelMaint";
    }

    /**
     * approve ChannelId
     * @return
     */
    public String approveChannelId()
    {
	try
	{
	    // apply session value
	    fillSessionData();
	    AuditRefCO refCO = fillSessionVariables(AuditConstant.UPDATE);
	    refCO.setTrxNbr(getAuditTrxNbr());
	    channelCO.setAuditRefCO(refCO);
	    channelBO.approveChannelId(channelCO);

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    /**
     * suspend ChannelId
     * @return
     */
    public String suspendChannelId()
    {
	try
	{
	    // apply session value
	    fillSessionData();
	    AuditRefCO refCO = fillSessionVariables(AuditConstant.UPDATE);
	    refCO.setTrxNbr(getAuditTrxNbr());
	    channelCO.setAuditRefCO(refCO);
	    channelBO.suspendChannelId(channelCO);

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    /**
     * reactivate ChannelId
     * @return
     */
    public String reactivateChannelId()
    {
	try
	{
	    // apply session value
	    fillSessionData();
	    AuditRefCO refCO = fillSessionVariables(AuditConstant.UPDATE);
	    refCO.setTrxNbr(getAuditTrxNbr());
	    channelCO.setAuditRefCO(refCO);
	    channelBO.reactivateChannelId(channelCO);

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    /**
     * clear the Form
     */
    public String clearStpForm()
    {
	    try
	    {
	    	//fill comboboxes on screen
	    	criteria.setCommunicationProtocol("H");
			fillDropDown();
			channelCO = new ChannelCO();
			if(ConstantsCommon.CRUD_APPROVE.equals(getIv_crud())||ChannelConstant.IV_CRUD_UPDATE_AFTER_APPROVE.equals(getIv_crud()))
			{
			    set_recReadOnly("true");
			}
			else
			{
			    set_recReadOnly("false");
			}
			channelCO.setStatusDesc(getText("active_key"));
			fillSessionData();
			applyRetrieveAudit(AuditConstant.IM_API_CHANNEL_KEY, channelCO.getImApiChannelsVO(),
				channelCO);
		    }
		    catch(Exception e)
		    {
			log.error(e, "");
		    }
	    	return "channelMaint";
	}
    
    public String onChangeChannelID() throws BaseException
    {

	try
	{

	    channelCO = channelBO.onChangeChannelID(channelCO);
	    NumberUtil.resetEmptyValues(channelCO);
	}
	catch(Exception e)
	{
	    channelCO.getImApiChannelsVO().setCHANNEL_ID(null);
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    public String onChangeUserID() throws BaseException
    {
	try
	{

	    channelCO = channelBO.onChangeUserID(channelCO);
	    NumberUtil.resetEmptyValues(channelCO);
	}
	catch(Exception e)
	{
	    channelCO.getImApiChannelsVO().setUSER_ID(null);
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public String saveNew()
    {

	try
	{
	    ArrayList<GTW_PWS_TMPLT_MASTERVO> lstMultiselect = new ArrayList<GTW_PWS_TMPLT_MASTERVO>();
	    fillSessionData();
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.IM_API_CHANNEL_KEY);
	    if(!channelCO.getJsonMultiselectArray().isEmpty())
	    {
		GridUpdates guMultiselect = getGridUpdates(channelCO.getJsonMultiselectArray(),GTW_PWS_TMPLT_MASTERVO.class, true);
		lstMultiselect = guMultiselect.getLstAllRec();
	    }
	    if(ConstantsCommon.YES.equals(channelCO.getUpdateMode()))
	    {
		refCO.setOperationType(AuditConstant.UPDATE);
		channelCO.setAuditObj(returnAuditObject(channelCO.getClass()));
	    }
	    else
	    {
		refCO.setOperationType(AuditConstant.CREATED);
	    }
	    channelCO.setAuditRefCO(refCO);
	    channelCO = channelBO.saveNew(channelCO,lstMultiselect);
	    
	    //save machine id in GTW_PWS_CHANNEL_DET
	    ArrayList lstMod = new ArrayList();
	    if(updates != null && !updates.equals(""))
	    {
		GridUpdates gu = getGridUpdates(updates, ChannelCO.class, true);
		lstMod = gu.getLstAllRec();
	    }
	    // save
	    channelBO.saveChannelMachineIds(channelCO,lstMod);
	    // empty form
	    channelCO = new ChannelCO();
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;

    }

    public String deleteChannel()
    {
	try
	{
	    // apply session value
	    fillSessionData();
	    AuditRefCO refCO = fillSessionVariables(AuditConstant.UPDATE);
	    refCO.setTrxNbr(getAuditTrxNbr());
	    channelCO.setAuditRefCO(refCO);
	    channelBO.deleteChannel(channelCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }
    
    public String chanelCheckUsrPwd()
    {
		try
		{
			fillSessionData();
		    Integer allowAccess = channelBO.chanelCheckUsrPwd(channelCO);
		    channelCO.setAllowUserAccess(allowAccess);
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
	
		return SUCCESS;
    }
    
    public String generateKey()
    {
	try
	{
	    String chanelKey;
	    fillSessionData();
	    //update existing row in machine Name grid
	    if(channelCO.getListMachineId() != null && channelCO.getListMachineId().size() > 0)
	    {
		for(int i = 0; i < channelCO.getListMachineId().size(); i++)
		{
		    channelCO.setImApiChannelsDetVO(new GTW_CHANNEL_DETVO());
		    channelCO.getImApiChannelsDetVO().setHOST_NAME(channelCO.getListMachineId().get(i));
		    chanelKey = channelBO.generateKey(channelCO);
		    channelCO.getListMachineId().set(i, chanelKey);
		    channelCO.getImApiChannelsDetVO().setHASH_KEY(chanelKey);
		}
	    }
	    //insert new line in machine Name grid
	    else if(channelCO.getImApiChannelsDetVO() != null)
	    {
		chanelKey = channelBO.generateKey(channelCO);
		channelCO.getImApiChannelsDetVO().setHASH_KEY(chanelKey);
	    }
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }
    
    
    
    /**
     * function that fill the needed data from the session .
     * 
     * @throws BaseException
     */
    public void fillSessionData() throws BaseException
    {
		SessionCO sessionCO = returnSessionObject();
		channelCO.setCompCode(sessionCO.getCompanyCode());
		channelCO.setBranchCode(sessionCO.getBranchCode());
		channelCO.setAppName(sessionCO.getCurrentAppName());
		channelCO.setProgRef(get_pageRef());
		channelCO.setUserID(sessionCO.getUserName());
		channelCO.setLanguage(sessionCO.getLanguage());
		channelCO.setUserID(sessionCO.getUserName());
		try
		{
		    channelCO.setRunningDate(returnCommonLibBO().addSystemTimeToDate(sessionCO.getRunningDateRET()));
		}
		catch(com.path.lib.common.exception.BaseException e)
		{
		    // TODO Auto-generated catch block
		    e.printStackTrace();
		}
    }

    private AuditRefCO fillSessionVariables(String status)
    {
		AuditRefCO refCO = initAuditRefCO();
		try
		{
		    refCO.setOperationType(status);
		    refCO.setKeyRef(AuditConstant.IM_API_CHANNEL_KEY);
		    refCO.setRunningDate(channelCO.getRunningDate());
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
		return refCO;
    }
    
    

   
    
    public String search()
    {
		try
		{
		    ServletContext application = ServletActionContext.getServletContext();
		    String theRealPath = application.getContextPath();
		    // TODO add you criteria parameters to the URL
		    url = theRealPath + "/path/channel/ChannelMaintAction_loadStatusGrid.action?ChannelId="
			    + criteria.getChannelId();
		    addFields = new ArrayList<StatusAddFieldCO>();
		    StatusAddFieldCO newFld = new StatusAddFieldCO(ConstantsCommon.COLUMN_DATE_TYPE, "server_date");
		    addFields.add(newFld);
		}
		catch(Exception ex)
		{
		    handleException(ex, null, null);
		    return ERROR_ACTION;
		}
		return "SUCCESS_STATUS";
    }

   
    /**
     * fill all drop down
     */
    private void fillDropDown()
    {
    	SessionCO sessionCO = returnSessionObject();
    	
    	communicationProtocolList = new ArrayList<SelectCO>();
    	communicationFormatList = new ArrayList<SelectCO>();
    	// retrieve communication protocol
	    SelectCO selectCO = new SelectCO();
	    selectCO.setCode("H");
	    selectCO.setDescValue("Http");
	    communicationProtocolList.add(selectCO);
	    selectCO = new SelectCO();
	    selectCO.setCode("T");
	    selectCO.setDescValue("Tcp");
	    communicationProtocolList.add(selectCO);
	    
	 // retrieve communication format
	    SelectCO selectCO1 = new SelectCO();
	    selectCO1.setCode("ISO8583");
	    selectCO1.setDescValue("ISO 8583");
	    communicationFormatList.add(selectCO1);
	    selectCO1 = new SelectCO();
	    selectCO1.setCode("JSON");
	    selectCO1.setDescValue("JSON");
	    communicationFormatList.add(selectCO1);
	    selectCO1 = new SelectCO();
	    selectCO1.setCode("TXT");
	    selectCO1.setDescValue("TXT");
	    communicationFormatList.add(selectCO1);
	    selectCO1 = new SelectCO();
	    selectCO1.setCode("XML");
	    selectCO1.setDescValue("XML");
	    communicationFormatList.add(selectCO1);
	    
		try {
			fillServerTypeCombo();
		} catch (Exception ex) {
			ex.printStackTrace();
			handleException(ex, null, null);
		}
    }
    
    /**
     * fill server Type combo by dependancy
     * @return
     */
    public String fillServerTypeCombo()
    {
    	SessionCO sessionCO = returnSessionObject();
    	
    	SelectSC selSC = new SelectSC(AtmInterfaceConstants.INTERFACE_TYPE);
		selSC.setLanguage(sessionCO.getLanguage());
		selSC.setOrderCriteria("ORDER");
		if(criteria.getCommunicationProtocol().equals(ChannelConstant.TCP))
		{
			selSC.setLovCodesExclude("'"+ChannelConstant.HTTP_SERVER+"','"+ChannelConstant.HTTP_CLIENT+"'");
		}
		else if(criteria.getCommunicationProtocol().equals(ChannelConstant.HTTP))
		{
			selSC.setLovCodesExclude("'"+ChannelConstant.TCP_SERVER+"','"+ChannelConstant.TCP_CLIENT+"'");
		}
		
		try {
			serverTypeList = returnLOV(selSC);
		} catch (Exception ex) 
		{
			handleException(ex, null, null);
		}
		
		return SUCCESS;
    }
	
    public void setChannelBO(ChannelBO channelBO)
    {
	this.channelBO = channelBO;
    }

    /**
     * @return the channelCO
     */
    public ChannelCO getChannelCO()
    {
	return channelCO;
    }

    /**
     * @param channelCO the channelCO to set
     */
    public void setChannelCO(ChannelCO channelCO)
    {
	this.channelCO = channelCO;
    }
    
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

    public String getUpdates()
    {
        return updates;
    }

    public void setUpdates(String updates)
    {
        this.updates = updates;
    }

    public String getChannelIdOldStatus()
    {
        return channelIdOldStatus;
    }

    public void setChannelIdOldStatus(String channelIdOldStatus)
    {
        this.channelIdOldStatus = channelIdOldStatus;
    }

    public String getUrl()
    {
        return url;
    }

    public void setUrl(String url)
    {
        this.url = url;
    }

    public List<StatusAddFieldCO> getAddFields()
    {
        return addFields;
    }

    public void setAddFields(List<StatusAddFieldCO> addFields)
    {
        this.addFields = addFields;
    }

	public List<SelectCO> getCommunicationProtocolList() {
		return communicationProtocolList;
	}

	public void setCommunicationProtocolList(List<SelectCO> communicationProtocolList) {
		this.communicationProtocolList = communicationProtocolList;
	}

	public List<SelectCO> getCommunicationFormatList() {
		return communicationFormatList;
	}

	public void setCommunicationFormatList(List<SelectCO> communicationFormatList) {
		this.communicationFormatList = communicationFormatList;
	}

	public List<SelectCO> getServerTypeList() {
		return serverTypeList;
	}

	public void setServerTypeList(List<SelectCO> serverTypeList) {
		this.serverTypeList = serverTypeList;
	}

}
