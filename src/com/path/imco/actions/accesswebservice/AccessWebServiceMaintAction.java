package com.path.imco.actions.accesswebservice;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.json.JSONException;

import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.bo.common.audit.AuditConstant;
import com.path.bo.common.webserviceexplorer.WebServiceExplorerConstant;
import com.path.dbmaps.vo.IMCO_PWS_TMPLT_DETVO;
import com.path.dbmaps.vo.SYS_PARAM_LOV_TRANSVO;
import com.path.expression.common.PBFunc.BaseException;
import com.path.imco.bo.accesswebservice.AccessWebServiceBO;
import com.path.imco.bo.accesswebservice.AccessWebServiceConstant;
import com.path.imco.vo.accesswebservice.AccessWebServiceCO;
import com.path.imco.vo.accesswebservice.AccessWebServiceSC;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.vo.GridUpdates;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.audit.AuditRefCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.webserviceexplorer.WebServiceExplorerGridParamCO;
import com.path.vo.common.webserviceexplorer.WebServiceUtil;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * AccessWebServiceMaintAction.java used to
 */
public class AccessWebServiceMaintAction extends LookupBaseAction
{
    private AccessWebServiceBO accessWebServiceBO;
    private AccessWebServiceCO accesswebserviceCO;
    private AccessWebServiceSC accessWebServiceSC =  new AccessWebServiceSC();
    private WebServiceUtil webServiceUtil;
    private String userIdLkp;
    private List<SelectCO> accesswebservicetypelist;
    private String updates,updates1;
    private String templateIdOldStatus;
    private BigDecimal templateId;
    private WebServiceExplorerGridParamCO webServiceExplorerGridParamCO;
    
    
    public String loadAccessWebServicePage()
    {
	try
	{	
	    // mandatory step
	    WebServiceUtil webServiceUtil = new WebServiceUtil();
	    // passing the grid action name define in struts
	    webServiceExplorerGridParamCO = webServiceUtil
		    .returnGridParamCO(AccessWebServiceConstant.ACCESS_WEB_SERVICE_EXPLORER_LIST_ACTION_NAME);
	    webServiceExplorerGridParamCO.setScreenNameSpace(AccessWebServiceConstant.ACCESS_WEB_SERVICE_EXPLORER_SCREEN_NAME_SPACE);
	    /*setting iv crud p from main and sub grid*/
	    String subGridActionRef = webServiceExplorerGridParamCO.getSubGridActionRef()+"?iv_crud="+this.getIv_crud();
	    String mainGridActionRef = webServiceExplorerGridParamCO.getMainGridActionRef()+"?iv_crud="+this.getIv_crud();
	    webServiceExplorerGridParamCO.setSubGridActionRef(subGridActionRef);
	    webServiceExplorerGridParamCO.setMainGridActionRef(mainGridActionRef);
	    /*setting iv crud p from main and sub grid*/
	    set_showSmartInfoBtn("false");
	    set_searchGridId("accessWebServiceListGridTbl_Id");
	    accesswebserviceCO = new AccessWebServiceCO();
	    fillSessionData();
	    if(ConstantsCommon.CRUD_MAINTAIN.equals(getIv_crud()))
	    {
		set_showNewInfoBtn("true");
	    }
	    if(ConstantsCommon.CRUD_APPROVE.equals(getIv_crud()))
	    {
		set_recReadOnly("true");
	    }
	    accesswebserviceCO.setStatusDesc(getText("Active"));
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "accessWebServiceList";
    }
    
    public String retrieveSelectedTemplateId()
    {
	try
	{
	    // mandatory step
	    WebServiceUtil webServiceUtil = new WebServiceUtil();
	    // passing the grid action name define in struts
	    webServiceExplorerGridParamCO = webServiceUtil
		    .returnGridParamCO(AccessWebServiceConstant.ACCESS_WEB_SERVICE_EXPLORER_LIST_ACTION_NAME);
	    webServiceExplorerGridParamCO.setScreenNameSpace(AccessWebServiceConstant.ACCESS_WEB_SERVICE_EXPLORER_SCREEN_NAME_SPACE);

	    /*setting iv crud p from main and sub grid*/
	    String subGridActionRef = webServiceExplorerGridParamCO.getSubGridActionRef()+"?iv_crud="+this.getIv_crud()+"&oldStatus="+templateIdOldStatus;
	    String mainGridActionRef = webServiceExplorerGridParamCO.getMainGridActionRef()+"?iv_crud="+this.getIv_crud()+"&oldStatus="+templateIdOldStatus;
	    webServiceExplorerGridParamCO.setSubGridActionRef(subGridActionRef);
	    webServiceExplorerGridParamCO.setMainGridActionRef(mainGridActionRef);
	    /*setting iv crud p from main and sub grid*/
	    
	    loadAccessWebserviceTypeList();
	    AccessWebServiceSC accessWebServiceSC = new AccessWebServiceSC();
	    SessionCO sessionCO = returnSessionObject();
	    accessWebServiceSC.setCompCode(sessionCO.getCompanyCode());
	    accessWebServiceSC.setBranchCode(sessionCO.getBranchCode());
	    accessWebServiceSC.setTempID(templateId);
	    accessWebServiceSC.setLovTypeId(AccessWebServiceConstant.LOV_TYPE_STATUS);
	    accessWebServiceSC.setLovTypeLkOpt(AccessWebServiceConstant.LOV_LK_TYPE);
	    accessWebServiceSC.setCrudMode(getIv_crud());
	    accessWebServiceSC.setCurrAppName(sessionCO.getCurrentAppName());
	    accessWebServiceSC.setPreferredLanguage(sessionCO.getLanguage());
	    accessWebServiceSC.setMenuRef(get_pageRef());
	    accessWebServiceSC.setOldStatus(templateIdOldStatus);
	    accesswebserviceCO = accessWebServiceBO.retrieveSelectedTemplateId(accessWebServiceSC);
	    if(!(accesswebserviceCO.getImcoPwsTmpltMasterVO().getSTATUS().equals(accessWebServiceSC.getOldStatus())))
	    {
		throw new BOException(MessageCodes.RECORD_CHANGED);
	    }
	    if(ConstantsCommon.CRUD_APPROVE.equals(getIv_crud()))
	    {
		set_recReadOnly(ConstantsCommon.TRUE);
	    }
	    else if(ConstantsCommon.ACTIVE_RECORD.equals(accesswebserviceCO.getImcoPwsTmpltMasterVO().getSTATUS())||
			AccessWebServiceConstant.IV_CRUD_UPDATE_AFTER_APPROVE.equals(getIv_crud())&&AccessWebServiceConstant.STATUS_APPROVED.equals(accesswebserviceCO.getImcoPwsTmpltMasterVO().getSTATUS()))
	    {
		set_recReadOnly(ConstantsCommon.FALSE);
	    }
	    else
	    {
		set_recReadOnly(ConstantsCommon.TRUE);
	    }
	    applyRetrieveAudit(AuditConstant.IMCO_PWS_TMPLT_MASTER, accesswebserviceCO.getImcoPwsTmpltMasterVO(),
		    accesswebserviceCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	    return ERROR;
	}
	return "accessWebServiceMaint";
    }
    
    /**
     * load Access Web service Type List
     * @return
     * @throws com.path.lib.common.exception.BaseException 
     */
    public String loadAccessWebserviceTypeList() throws com.path.lib.common.exception.BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    SYS_PARAM_LOV_TRANSVO sysParamLovVO = new SYS_PARAM_LOV_TRANSVO();
	    SelectSC selSC = new SelectSC(AccessWebServiceConstant.LOV_TYPE_DESC);
	    accesswebservicetypelist = returnLOV(selSC);
	}
	catch(Exception e)
	{
	    log.error(e, "");
	}
	return SUCCESS;
    }
    
    /**
     * make a loop on the list names to generate them
     */

    public String onChangeTemplateID() throws BaseException
    {

	try
	{
	    accesswebserviceCO = accessWebServiceBO.onChangeTemplateID(accesswebserviceCO);
	    NumberUtil.resetEmptyValues(accesswebserviceCO);
	}
	catch(Exception e)
	{
	    accesswebserviceCO.getImcoPwsTmpltMasterVO().setTEMPLATE_ID(null);
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    public String loadWsList() throws JSONException
    {
	try
	{
	    // copy the details related to search criteria to the SC
	    copyproperties(accessWebServiceSC);

	    String nodeId = getNodeid();
	    ArrayList<AccessWebServiceCO> gridTreeList = new ArrayList<AccessWebServiceCO>();
	    Map<String, String> endPointAddress = new HashMap<String, String>();
	    AccessWebServiceCO treeNodeCO;
	    webServiceUtil = new WebServiceUtil();
	    List<String> applications = webServiceUtil
		    .getApplicationNames(WebServiceExplorerConstant.PROPERTY_FILE_NAME);

	    Map<String, String> applicationsHashMap = webServiceUtil
		    .getApplicationNameAndServerPATHMap(WebServiceExplorerConstant.PROPERTY_FILE_NAME);

	    Map<String, List<String>> applicationEndpointsAndOperations = null;
	    Map<String, HashMap<String, List<String>>> nestedHash;
	    List<String> operationsList = null;
	    int m = 0;
	    int n = 0;
	    int j = 0;
	    for(String key : applicationsHashMap.keySet())
	    {
		if(nodeId == null || nodeId.isEmpty())
		{
		    //create application name nodes
		    treeNodeCO = new AccessWebServiceCO();
		    treeNodeCO.setParent("ROOT"+ m);
		    treeNodeCO.setNodeId(key+"-"+"ROOT"+ m+"-levelm"+"-"+String.valueOf(Integer.valueOf(m+1)+"-"+get_pageRef()));
		    treeNodeCO.setLevel("1");
		    treeNodeCO.setImcoPwsTmpltDetVO(new IMCO_PWS_TMPLT_DETVO());
		    treeNodeCO.getImcoPwsTmpltDetVO().setTYPE("A");
		    treeNodeCO.setIsLeaf("false");
		    treeNodeCO.setFeName(key);
		    gridTreeList.add(treeNodeCO);
		    m++;
		}
		else if(nodeId.contains("ROOT"))
		{
		    if(!(nodeId.lastIndexOf(key) >= 0))
		    {
			continue;
		    }
		    nestedHash = webServiceUtil.getWebServiceEndPointsWithInfo(applicationsHashMap.get(key));
		    if(null == nestedHash)
		    {
		     continue;
		    }
		    applicationEndpointsAndOperations = new HashMap<String, List<String>>();

		    for(String k : nestedHash.keySet())
		    {
			applicationEndpointsAndOperations.put(k, nestedHash.get(k).get("operations"));
		    }

		    // applicationEndpointsAndOperations =
		    // webServiceUtil.getWebServiceEndPointsHashMap(applicationsHashMap.get(key));
		    for(String endPoint : applicationEndpointsAndOperations.keySet())
		    {
			endPointAddress.put(endPoint, nestedHash.get(endPoint).get("Address").get(0));
			// create endpoints nodes
			treeNodeCO = new AccessWebServiceCO();
			treeNodeCO.setParent(nodeId);
			treeNodeCO.setNodeId(endPoint+"-"+nodeId+"-leveln"+"-"+String.valueOf(Integer.valueOf(n+1)+"-"+get_pageRef()));
			treeNodeCO.setLevel("2");
			treeNodeCO.setImcoPwsTmpltDetVO(new IMCO_PWS_TMPLT_DETVO());
			treeNodeCO.getImcoPwsTmpltDetVO().setTYPE("A");
			treeNodeCO.setIsLeaf("false");
			treeNodeCO.setFeName(endPoint);
			if(nodeId.contains("ROOT")&&!(nodeId.contains("levelm")&&nodeId.contains("leveln")))
			{
			    gridTreeList.add(treeNodeCO);
			}
			operationsList = applicationEndpointsAndOperations.get(endPoint);
		    }
		    if((nodeId.contains("levelm")&&nodeId.contains("leveln")))
		    {
			operationsList = applicationEndpointsAndOperations.get(nodeId.split("-")[0]);
			for(String operation : operationsList)
			{
			    // create operations node
			    treeNodeCO = new AccessWebServiceCO();
			    treeNodeCO.setParent(nodeId);
			    treeNodeCO.setNodeId(operation+"-"+nodeId+"-levelj"+"-"+String.valueOf(Integer.valueOf(j+1)+"-"+get_pageRef()));
			    treeNodeCO.setLevel("3");
			    treeNodeCO.setImcoPwsTmpltDetVO(new IMCO_PWS_TMPLT_DETVO());
			    treeNodeCO.getImcoPwsTmpltDetVO().setTYPE("");
			    treeNodeCO.setIsLeaf("true");
			    treeNodeCO.setFeName(operation);
			    gridTreeList.add(treeNodeCO);
			    j++;
			}
		    }
		}
		
	    }
	    setGridModel(gridTreeList);

	}
	catch(Exception e)
	{
	    log.error(e, "Error in loadOptList");
	    handleException(e, null, null);
	}
	return SUCCESS;

    }
    
    /**
     * Method called on fcs temp Entry dependency
     */
    public String dependencyByUserId()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    
	    if(userIdLkp != null)
	    {
		accessWebServiceSC.setChannelUserId(userIdLkp);
		accesswebserviceCO = accessWebServiceBO.returnSelectedUserIdDetails(accessWebServiceSC);
	    }
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    public String saveNew()
    {
	try
	{
	    // apply session value
	    fillSessionData();

	    // AuditRefCO refCO;
	    if(null == accesswebserviceCO.getImcoPwsTmpltMasterVO().getSTATUS() || accesswebserviceCO.getImcoPwsTmpltMasterVO().getSTATUS().isEmpty())
	    {
		AuditRefCO refCO = fillSessionVariables(AuditConstant.CREATED);
		accesswebserviceCO.setAuditRefCO(refCO);
	    }
	    else
	    {
		AuditRefCO refCO = fillSessionVariables(AuditConstant.UPDATE);
		refCO.setTrxNbr(getAuditTrxNbr());
		accesswebserviceCO.setAuditRefCO(refCO);
		accesswebserviceCO.setAuditObj(returnAuditObject(accesswebserviceCO.getClass()));
	    }
//	    if(updates.lastIndexOf("-1") != -1)
//	    {
//		throw new BOException(MessageCodes.PLEASE_FILL_REQUIRED_FIELDS_VAL);
//	    }
	    
	    List<AccessWebServiceCO> lstAllRecCO = new ArrayList<AccessWebServiceCO>();
	    if(updates != null && !updates.equals(""))
	    {
		GridUpdates gu = getGridUpdates(updates, AccessWebServiceCO.class, false);
		lstAllRecCO = gu.getLstModify();
	    }
	    // save
	    accessWebServiceBO.saveNew(accesswebserviceCO,lstAllRecCO);
	    // empty form
	    accesswebserviceCO = new AccessWebServiceCO();
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    public String awsApprove()
    {
	try
	{
	    // apply session value
	    fillSessionData();
	    AuditRefCO refCO = fillSessionVariables(AuditConstant.UPDATE);
	    refCO.setTrxNbr(getAuditTrxNbr());
	    accesswebserviceCO.setAuditRefCO(refCO);
	    accessWebServiceBO.awsApprove(accesswebserviceCO);

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    public String awsDelete()
    {
	try
	{
	    // apply session value
	    fillSessionData();
	    AuditRefCO refCO = fillSessionVariables(AuditConstant.UPDATE);
	    refCO.setTrxNbr(getAuditTrxNbr());
	    accesswebserviceCO.setAuditRefCO(refCO);
	    accessWebServiceBO.awsDelete(accesswebserviceCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    public String clearStpForm()
    {
	try
	{
	    loadAccessWebserviceTypeList();
	    accesswebserviceCO = new AccessWebServiceCO();
	    if(ConstantsCommon.CRUD_APPROVE.equals(getIv_crud()))
	    {
		set_recReadOnly("true");
	    }
	    else
	    {
		set_recReadOnly("false");
	    }
	    accesswebserviceCO.setStatusDesc(getText("Active"));
//	    applyRetrieveAudit(AuditConstant.IMCO_PWS_TMPLT_MASTER, accesswebserviceCO.getImcoPwsTmpltMasterVO(), accesswebserviceCO);
	}
	catch(Exception e)
	{
	    log.error(e, "");
	}
	return "accessWebServiceMaint";
    }
    
    public String selectRowsFromDB()
    {
	try
	{
	    //get saved App name/webservice name/ operation from db
	    accessWebServiceSC.setAccessCOList(accessWebServiceBO.returnServicesFromDb(accessWebServiceSC));
	}
	catch(Exception e)
	{
	    log.error(e, "");
	}
	return SUCCESS;
    }
    
    public void deleteRecordFromDB()
    {
	try
	{
	    accessWebServiceBO.deleteRecordFromDB(accessWebServiceSC);
	}
	catch(Exception e)
	{
	    log.error(e, "");
	}
    }
    
    /**
     * function that fill the needed data from the session .
     * 
     * @throws BaseException
     */
    public void fillSessionData() throws BaseException
    {
	SessionCO sessionCO = returnSessionObject();
	accesswebserviceCO.setCompCode(sessionCO.getCompanyCode());
	accesswebserviceCO.setBranchCode(sessionCO.getBranchCode());
	accesswebserviceCO.setAppName(sessionCO.getCurrentAppName());
	accesswebserviceCO.setProgRef(get_pageRef());
	accesswebserviceCO.setUserID(sessionCO.getUserName());
	try
	{
	    accesswebserviceCO.setRunningDate(returnCommonLibBO().addSystemTimeToDate(sessionCO.getRunningDateRET()));
	}
	catch(com.path.lib.common.exception.BaseException e)
	{
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}
	accesswebserviceCO.setIvCrud(getIv_crud());
	accesswebserviceCO.setLanguage(sessionCO.getLanguage());
	accesswebserviceCO.setUserID(sessionCO.getUserName());
    }
    
    private AuditRefCO fillSessionVariables(String status)
    {

	AuditRefCO refCO = initAuditRefCO();
	try
	{
	    refCO.setOperationType(status);
	    refCO.setKeyRef(AuditConstant.IMCO_PWS_TMPLT_MASTER);
	    refCO.setRunningDate(accesswebserviceCO.getRunningDate());
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return refCO;
    }
    
    public AccessWebServiceBO getAccessWebServiceBO()
    {
	return accessWebServiceBO;
    }

    public void setAccessWebServiceBO(AccessWebServiceBO accessWebServiceBO)
    {
	this.accessWebServiceBO = accessWebServiceBO;
    }

    public AccessWebServiceCO getAccesswebserviceCO()
    {
	return accesswebserviceCO;
    }

    public void setAccesswebserviceCO(AccessWebServiceCO accesswebserviceCO)
    {
	this.accesswebserviceCO = accesswebserviceCO;
    }
    
    public AccessWebServiceSC getAccessWebServiceSC()
    {
        return accessWebServiceSC;
    }

    public void setAccessWebServiceSC(AccessWebServiceSC accessWebServiceSC)
    {
        this.accessWebServiceSC = accessWebServiceSC;
    }

    @Override
    public Object getModel()
    {
	return accessWebServiceSC;
    }

    public WebServiceUtil getWebServiceUtil()
    {
        return webServiceUtil;
    }

    public void setWebServiceUtil(WebServiceUtil webServiceUtil)
    {
        this.webServiceUtil = webServiceUtil;
    }

    public String getUserIdLkp()
    {
        return userIdLkp;
    }

    public void setUserIdLkp(String userIdLkp)
    {
        this.userIdLkp = userIdLkp;
    }

    public List<SelectCO> getAccesswebservicetypelist()
    {
        return accesswebservicetypelist;
    }

    public void setAccesswebservicetypelist(List<SelectCO> accesswebservicetypelist)
    {
        this.accesswebservicetypelist = accesswebservicetypelist;
    }

    public String getUpdates()
    {
        return updates;
    }

    public void setUpdates(String updates)
    {
        this.updates = updates;
    }

    public String getUpdates1()
    {
        return updates1;
    }

    public void setUpdates1(String updates1)
    {
        this.updates1 = updates1;
    }

    public String getTemplateIdOldStatus()
    {
        return templateIdOldStatus;
    }

    public void setTemplateIdOldStatus(String templateIdOldStatus)
    {
        this.templateIdOldStatus = templateIdOldStatus;
    }

    public BigDecimal getTemplateId()
    {
        return templateId;
    }

    public void setTemplateId(BigDecimal templateId)
    {
        this.templateId = templateId;
    }

	public WebServiceExplorerGridParamCO getWebServiceExplorerGridParamCO() {
		return webServiceExplorerGridParamCO;
	}

	public void setWebServiceExplorerGridParamCO(WebServiceExplorerGridParamCO webServiceExplorerGridParamCO) {
		this.webServiceExplorerGridParamCO = webServiceExplorerGridParamCO;
	}

    
}
