package com.path.atm.actions.merchantposmgnt.posmgnt;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.json.JSONException;

import com.path.actions.base.RetailBaseAction;
import com.path.bo.common.alerts.AlertsBO;
import com.path.bo.common.alerts.AlertsConstants;
import com.path.bo.common.audit.AuditConstant;
import com.path.atm.bo.merchantposmgnt.posmgnt.MerchantPosMgntBO;
import com.path.atm.bo.merchantposmgnt.posmgnt.MerchantPosMgntConstant;
import com.path.atm.vo.merchantposmgnt.posmgnt.MerchantPosMgntCO;
import com.path.atm.vo.merchantposmgnt.posmgnt.MerchantPosMgntSC;
import com.path.dbmaps.vo.CTSTELLERVO;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.vo.common.AlertsParamCO;
import com.path.vo.common.SessionCO;
import com.path.vo.common.address.AddressCommonCO;
import com.path.vo.common.audit.AuditRefCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.core.ctsteller.CTSTELLERSC;

/**
 * 
 * Copyright 2015, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: fatimasalam
 * 
 *         MerchantPosMgntMaintAction.java used to
 */
public class MerchantPosMgntMaintAction extends RetailBaseAction
{
    private MerchantPosMgntBO merchantPosMgntBO;
    private MerchantPosMgntCO merchantPosMgntCO = new MerchantPosMgntCO();
    private AddressCommonCO addressCO;
    private AlertsBO alertsBO;
    private String _addressPageRef;
    private List<SelectCO> posTypeList = new ArrayList<SelectCO>();
    private List<SelectCO> contactTypeList = new ArrayList<SelectCO>();
    private BigDecimal code;
    private String posStatusCode;
    private String progRefSaveBtn;
    private String callingScreen;

    /**
     *  First function to be executed when loading merchantposmgnt maintenance page
     * 
     * @author: fatimasalam
     */
    public String initialise()
    {
	try
	{ set_showSmartInfoBtn("false");
	    set_addressPageRef(get_pageRef());
	    loadPosType();
	    set_searchGridId("merchantPosMgntGridTbl_Id");
	    if(MerchantPosMgntConstant.IV_CRUD_R.equals(getIv_crud()))
	    {
		set_showNewInfoBtn("true");
	    }
	    merchantPosMgntCO.setLoginCompCode(returnSessionObject().getCompanyCode());
	    merchantPosMgntCO = merchantPosMgntBO.returnMerchantPosMgntBusinessDisplay(merchantPosMgntCO);
	    setAdditionalScreenParams(merchantPosMgntCO.getElementHashmap());
	    
	    setProgRefSaveBtn("POS00C");
	    //for address common screen(needed on dependency of country)
	    setCallingScreen(MerchantPosMgntConstant.POS_SCREEN_NAME);
	    if(addressCO == null)
	    {
		addressCO = new AddressCommonCO();
	    }
	    addressCO.setScreenName(MerchantPosMgntConstant.POS_SCREEN_NAME);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "loadMerchantPosMgntPage";
    }

    /**
     *  this function will load the maint page
     * 
     * @return loadMerchantPosMgntMaintPage
     * 
     * @author fatimasalam
     */
    public String loadMerchantPosMgntMaint()
    {
	try
	{
	    loadPosType();
	    set_addressPageRef(get_pageRef());
	    merchantPosMgntCO.setLoginCompCode(returnSessionObject().getCompanyCode());
	    merchantPosMgntCO = merchantPosMgntBO.returnMerchantPosMgntBusinessDisplay(merchantPosMgntCO);
	    setAdditionalScreenParams(merchantPosMgntCO.getElementHashmap());
	    set_searchGridId("merchantPosMgntGridTbl_Id");
	    
	    setProgRefSaveBtn("POS00C");
	    //for address common screen(needed on dependency of country)
	    setCallingScreen(MerchantPosMgntConstant.POS_SCREEN_NAME);
	    if(addressCO == null)
	    {
		addressCO = new AddressCommonCO();
	    }
	    addressCO.setScreenName(MerchantPosMgntConstant.POS_SCREEN_NAME);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "loadMerchantPosMgntMaintPage";
    }

    /**
     * this function will load the pos type
     * 
     * 
     * @throws BaseException
     * @author fatimasalam
     */
    private void loadPosType() throws BaseException
    {
	SelectSC selectSC = new SelectSC(MerchantPosMgntConstant.POS_TYPE_LOV_TYPE);
	posTypeList = returnLOV(selectSC);
    }

    /**
     *  dependency By Terminal Id
     *  
     * @return SUCCESS
     * 
     * @author fatimasalam
     */
    public String dependencyByTerminalId()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    merchantPosMgntCO.setLoginCompCode(sessionCO.getCompanyCode());
	    merchantPosMgntCO.setLoginBraCode(sessionCO.getBranchCode());
	    merchantPosMgntCO = merchantPosMgntBO.dependencyByTerminalId(merchantPosMgntCO);
	}
	catch(Exception e)
	{
	    merchantPosMgntCO.getCtsMerchantPosVO().setTERMINAL_ID(null);
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    /**
     *  dependency By Merchant Code
     *  
     * @return SUCCESS
     * 
     * @author fatimasalam
     */
    public String dependencyByMerchantCode()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    merchantPosMgntCO.setLoginCompCode(sessionCO.getCompanyCode());
	    merchantPosMgntCO.setLoginBraCode(sessionCO.getBranchCode());
	    merchantPosMgntCO.setLoginPreferrredLanguage(sessionCO.getPreferredLanguage());
	    merchantPosMgntCO = merchantPosMgntBO.dependencyByMerchantCode(merchantPosMgntCO);
	}
	catch(Exception e)
	{
	    merchantPosMgntCO.getCtsMerchantPosVO().setMERCHANT_CODE(null);
	    handleException(e, null, null);
	}
	NumberUtil.resetEmptyValues(merchantPosMgntCO);
	return SUCCESS;
    }
    
    /**
     *  dependency By Installation Date
     *  
     * @return SUCCESS
     * 
     * @author fatimasalam
     */
    public String dependencyByInstallationDate()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    merchantPosMgntCO.setRunningDate(sessionCO.getRunningDateRET());
	    merchantPosMgntCO = merchantPosMgntBO.dependencyByInstallationDate(merchantPosMgntCO);
	}
	catch(Exception e)
	{
	    merchantPosMgntCO.getCtsMerchantPosVO().setINSTALLATION_DATE(null);
	    handleException(e, null, null);
	}
	return SUCCESS;
    }
    
    /**
     * this function will fill the session data 
     * @param  sessionCO
     * 
     * @throws BaseException
     * @author fatimasalam
     */
    public void fillSessionData(SessionCO sessionCO) throws BaseException
    {
		merchantPosMgntCO.setLoginCompCode(sessionCO.getCompanyCode());
	    merchantPosMgntCO.setLoginBraCode(sessionCO.getBranchCode());
	    //merchantPosMgntCO.setLoginTellerCode(sessionCO.getCtsTellerVO().getCODE());
	    merchantPosMgntCO.setLoginUserId(sessionCO.getUserName());
		merchantPosMgntCO.setOpt(get_pageRef());
		merchantPosMgntCO.setRunningDate(sessionCO.getRunningDateRET());
		merchantPosMgntCO.setAppName(sessionCO.getCurrentAppName());
		merchantPosMgntCO.setLanguage(sessionCO.getLanguage());
		merchantPosMgntCO.setLoginPreferrredLanguage(sessionCO.getPreferredLanguage());
		//merchantPosMgntCO.setUserIsBranchManager(sessionCO.getCtsTellerVO().getUSER_IS_BRANCH_MANAGER());
    }

    /**
     *  this function will reject the alert
     *  
     * @return AlertsConstants.ALERT_JSON_SUCCESS
     * @throws BaseException
     * @author fatimasalam
     */
    public String alertReject() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    AlertsParamCO receivedAlertParamCO = get_alert();
	    applyMerchantPosAlertsData(receivedAlertParamCO, sessionCO);

	    /*
	     * //In PB:
	     * w_maintain_merchant_response\\ue_check_alert.f_check_alert_status
	     */
	    if(receivedAlertParamCO != null && !Boolean.valueOf(receivedAlertParamCO.getIsLocalApprove()))
	    {
		alertsBO.checkIfSameStatus(receivedAlertParamCO);
	    }
	    receivedAlertParamCO.setTodoAlert(AlertsConstants.MERCHANTPOSMGNT_ACK_REJECT);
	    merchantPosMgntCO = merchantPosMgntBO.alertReject(merchantPosMgntCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);

	}
	// Set _alert to null to avoid opening the sendAlert popup
	set_alert(null);

	return AlertsConstants.ALERT_JSON_SUCCESS;
    }

    /**
     *  this function will approve the merchant pos record
     *  
     * @return success
     * @throws BaseException
     * @author fatimasalam
     */
    public String approve() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.MERCHANT_POS_MANAGEMENT_KEY_REF);
	    refCO.setOperationType(AuditConstant.UPDATE);
	    merchantPosMgntCO.setAuditRefCO(refCO);
	    merchantPosMgntCO.setLanguage(sessionCO.getLanguage());
	    merchantPosMgntCO.setAuditObj(returnAuditObject(merchantPosMgntCO.getClass()));
	    merchantPosMgntCO = merchantPosMgntBO.approveMerchantPosMgnt(merchantPosMgntCO);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}

	return "success";
    }

    /**
     *  this function will delete the merchant pos record
     *  
     * @return success
     *
     * @author fatimasalam
     */
    public String delete()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.MERCHANT_POS_MANAGEMENT_KEY_REF);
	    merchantPosMgntCO.setAuditRefCO(refCO);
	    refCO.setOperationType(AuditConstant.DELETE);
	    merchantPosMgntCO.setLanguage(sessionCO.getLanguage());
	    merchantPosMgntCO.setAuditObj(returnAuditObject(merchantPosMgntCO.getClass()));
	    merchantPosMgntBO.deleteMerchantPosMgnt(merchantPosMgntCO);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "success";
    }

    /**
     *  this function will cancel the merchant pos record
     *  
     * @return success
     * @throws BaseException
     * @author fatimasalam
     */
    public String toCancel() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setOperationType(AuditConstant.UPDATE);
	    refCO.setKeyRef(AuditConstant.MERCHANT_POS_MANAGEMENT_KEY_REF);
	    merchantPosMgntCO.setAuditRefCO(refCO);
	    merchantPosMgntCO.setLanguage(sessionCO.getLanguage());
	    merchantPosMgntCO.setAuditObj(returnAuditObject(merchantPosMgntCO.getClass()));
	    merchantPosMgntCO = merchantPosMgntBO.toCancelMerchantPosMgnt(merchantPosMgntCO);
	    
	    merchantPosMgntCO.getCtsMerchantPosVO().setCOMP_CODE(merchantPosMgntCO.getLoginCompCode());
	    merchantPosMgntCO.getCtsMerchantPosVO().setBRANCH_CODE(merchantPosMgntCO.getLoginBraCode());
	    
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	
	return "success";
    }

    /**
     *  this function will approve the cancel of the merchant pos record
     *  
     * @return success
     * @throws BaseException
     * @author fatimasalam
     */
    public String cancel() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.MERCHANT_POS_MANAGEMENT_KEY_REF);
	    merchantPosMgntCO.setAuditRefCO(refCO);
	    refCO.setOperationType(AuditConstant.UPDATE);
	    merchantPosMgntCO.setLanguage(sessionCO.getLanguage());
	    merchantPosMgntCO.setAuditObj(returnAuditObject(merchantPosMgntCO.getClass()));
	    merchantPosMgntCO = merchantPosMgntBO.cancelMerchantPosMgnt(merchantPosMgntCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";
    }

    /**
     *  this function will save the merchant pos record
     *  
     * @return success
     * @throws BaseException
     * @author fatimasalam
     */
    public String saveNew() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    merchantPosMgntCO.setLanguage(sessionCO.getLanguage());
	    fillSessionData(sessionCO);
	    merchantPosMgntCO.setAddressCO(addressCO);
	  
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.MERCHANT_POS_MANAGEMENT_KEY_REF);
	    merchantPosMgntCO.setAuditRefCO(refCO);
	    if(NumberUtil.isEmptyDecimal(merchantPosMgntCO.getCtsMerchantPosVO().getCODE()))
	    {
		refCO.setOperationType(AuditConstant.CREATED);
	    }
	    else
	    {
		refCO.setOperationType(AuditConstant.UPDATE);
		merchantPosMgntCO.setAuditObj(returnAuditObject(merchantPosMgntCO.getClass()));
	    }
	    merchantPosMgntCO = merchantPosMgntBO.saveMerchantPosMgnt(merchantPosMgntCO);

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";

    }

    /**
     * This function is called when double clicking on a record and upon clicking on new. It displays the
     * selected record under MerchantPosMgntMaint.jsp page 
     *  
     * @return loadMerchantPosMgntMaintPage
     * @throws JSONException
     * @author fatimasalam
     */
    public String loadMerchantPosMgntDetails()
    {
	try
	{
	    set_addressPageRef(get_pageRef());
	    loadPosType();
	    SessionCO sessionCO = returnSessionObject();
	    if(!NumberUtil.isEmptyDecimal(getCode()))
	    {

	    MerchantPosMgntSC merchantPosMgntSC = new MerchantPosMgntSC();
		if(Boolean.valueOf(merchantPosMgntCO.getIsFromAlert()))
		{
		    merchantPosMgntSC.setCompCode(merchantPosMgntCO.getAlertsParamCO().getCompCode());
		    merchantPosMgntSC.setBranchCode(merchantPosMgntCO.getAlertsParamCO().getBranchCode());
		    merchantPosMgntSC.setIsFromAlert(merchantPosMgntCO.getIsFromAlert());
		}
		else
		{
		    merchantPosMgntSC.setCompCode(sessionCO.getCompanyCode());
		    merchantPosMgntSC.setBranchCode(sessionCO.getBranchCode());
		}
		merchantPosMgntSC.setPreferredLanguage(sessionCO.getPreferredLanguage());
		merchantPosMgntSC.setLanguage(sessionCO.getLanguage());
		merchantPosMgntSC.setCode(getCode());
		merchantPosMgntSC.setLovTypeId(MerchantPosMgntConstant.POS_STATUS_LOV);
		merchantPosMgntSC.setPosStatusCode(getPosStatusCode());
		
		merchantPosMgntCO = merchantPosMgntBO.returnMerchantPosMgntDetails(merchantPosMgntSC);
		addressCO = merchantPosMgntCO.getAddressCO();
		// for address common screen(needed on dependency of country)
		setCallingScreen(MerchantPosMgntConstant.POS_SCREEN_NAME);
		if(addressCO == null)
		{
		    addressCO = new AddressCommonCO();
		}
		addressCO.setScreenName(MerchantPosMgntConstant.POS_SCREEN_NAME);
		
		if((!MerchantPosMgntConstant.IV_CRUD_R.equals(getIv_crud()) && !MerchantPosMgntConstant.IV_CRUD_UP
			.equals(getIv_crud()))
			|| (MerchantPosMgntConstant.IV_CRUD_R.equals(getIv_crud()) && !MerchantPosMgntConstant.STATUS_ACTIVE
				.equals(merchantPosMgntCO.getCtsMerchantPosVO().getSTATUS())))
		{
		    set_recReadOnly("true");
		}
		setAdditionalScreenParams(merchantPosMgntCO.getElementHashmap());
		applyRetrieveAudit(AuditConstant.MERCHANT_POS_MANAGEMENT_KEY_REF, merchantPosMgntCO.getCtsMerchantPosVO(), merchantPosMgntCO);
		
		setProgRefSaveBtn("POS00U");
	    }
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	    return "success";
	}
	return "loadMerchantPosMgntMaintPage";
    }

    /**
     * This function will be called from AlertsOpenItem when clicking on approve
     * button
     *  
     * @return AlertsConstants.ALERT_JSON_SUCCESS
     * @throws BaseException
     * @author fatimasalam
     */
    public String alertApprove() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    AlertsParamCO receivedAlertParamCO = get_alert();
	    applyMerchantPosAlertsData(receivedAlertParamCO, sessionCO);

	    merchantPosMgntBO.checkMerchantPosStatus(merchantPosMgntCO);

	    String[] optDetailsArray = returnCommonLibBO().returnOptDetailsList(
		    sessionCO.getCurrentAppName(),
		    returnCommonLibBO().returnOrginProgRef(sessionCO.getCurrentAppName(),
			    receivedAlertParamCO.getProgRef().trim()));
	    if(optDetailsArray != null && optDetailsArray.length > 0)
	    {
		String ivCrud = optDetailsArray[2];
		if(AlertsConstants.MERCHANTPOSMGNT_ALERT_IV_CRUD_P.equals(ivCrud))
		{
		    receivedAlertParamCO.setTodoAlert(AlertsConstants.MERCHANTPOSMGNT_ACK_APPROVE);
		    approve();
		}
		else if(AlertsConstants.MERCHANTPOSMGNT_ALERT_IV_CRUD_N.equals(ivCrud))
		{
		    receivedAlertParamCO.setTodoAlert(AlertsConstants.MERCHANTPOSMGNT_ACK_CANCEL);
		    cancel();
		}
	    }
	  
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	set_alert(null);

	return AlertsConstants.ALERT_JSON_SUCCESS;
    }
    

    /**
     * This function will fill the alerts data in MERCHANT POS MANAGEMENT screen
     * @param receivedAlertParamCO
     * @param sessionCO
     * @throws BaseException
     * @author fatimasalam
     */
    private void applyMerchantPosAlertsData(AlertsParamCO receivedAlertParamCO, SessionCO sessionCO)
	    throws BaseException
    {
	receivedAlertParamCO.setOldTodoAlert(receivedAlertParamCO.getTodoAlert());
	merchantPosMgntCO.setIsFromAlert(Boolean.TRUE.toString());
	if(Boolean.valueOf(receivedAlertParamCO.getIsLocalApprove()))
	{
	    // If this action is called from local approve. the local
	    // approve user name is set in lostFoundManagementCO
	    merchantPosMgntCO.setLoginCompCode(sessionCO.getCompanyCode());
	    merchantPosMgntCO.setLoginBraCode(sessionCO.getBranchCode());
	    merchantPosMgntCO.setLoginUserId(sessionCO.getLocalApproveUserName());
	    receivedAlertParamCO.setAppName(sessionCO.getCurrentAppName());
	    receivedAlertParamCO.setUserId(sessionCO.getLocalApproveUserName());

	    CTSTELLERSC ctsTellerSC = new CTSTELLERSC();
	    ctsTellerSC.setCompCode(sessionCO.getCompanyCode());
	    ctsTellerSC.setBranchCode(sessionCO.getBranchCode());
	    ctsTellerSC.setUserId(sessionCO.getLocalApproveUserName());
	    CTSTELLERVO ctsTellerVO = alertsBO.ctsTellerDetails(ctsTellerSC);
	    if(ctsTellerVO != null)
	    {
		merchantPosMgntCO.setLoginTellerCode(ctsTellerVO.getCODE());
	    }
	}
	else
	{
	    merchantPosMgntCO.setLoginCompCode(merchantPosMgntCO.getAlertsParamCO().getCompCode());
	    merchantPosMgntCO.setLoginBraCode(merchantPosMgntCO.getAlertsParamCO().getBranchCode());
	    merchantPosMgntCO.setLoginTellerCode(sessionCO.getCtsTellerVO().getCODE());
	    merchantPosMgntCO.setLoginUserId(sessionCO.getUserName());
	    receivedAlertParamCO.setUserId(sessionCO.getUserName());
	}
	merchantPosMgntCO.setAlertsParamCO(receivedAlertParamCO);
    }

    /**
     * This function will load the merchantpos alert details
     * @return AlertsConstants.ALERT_JSON_SUCCESS
     * @throws BaseException
     * @author fatimasalam
     */
    public String loadAlertMerchantPosDetails() throws BaseException
    {
	merchantPosMgntCO.setLoginCompCode(merchantPosMgntCO.getAlertsParamCO().getCompCode());
	merchantPosMgntCO.setLoginBraCode(merchantPosMgntCO.getAlertsParamCO().getBranchCode());
	merchantPosMgntCO.setLoginPreferrredLanguage(returnSessionObject().getPreferredLanguage());
	merchantPosMgntCO = merchantPosMgntBO.loadAlertMerchantPosDetails(merchantPosMgntCO);
	merchantPosMgntCO.getAlertsParamCO().setAlertDescription(
		translateMatchingMessage(merchantPosMgntCO.getAlertsParamCO().getAlertDescription()));

	return AlertsConstants.ALERT_JSON_SUCCESS;
    }

    public List<SelectCO> getContactTypeList()
    {
	return contactTypeList;
    }

    public void setContactTypeList(List<SelectCO> contactTypeList)
    {
	this.contactTypeList = contactTypeList;
    }

    public List<SelectCO> getPosTypeList()
    {
	return posTypeList;
    }

    public void setPosTypeList(List<SelectCO> posTypeList)
    {
	this.posTypeList = posTypeList;
    }

    public MerchantPosMgntCO getMerchantPosMgntCO()
    {
	return merchantPosMgntCO;
    }

    public void setMerchantPosMgntCO(MerchantPosMgntCO merchantPosMgntCO)
    {
	this.merchantPosMgntCO = merchantPosMgntCO;
    }

    public void setMerchantPosMgntBO(MerchantPosMgntBO merchantPosMgntBO)
    {
	this.merchantPosMgntBO = merchantPosMgntBO;
    }

    public BigDecimal getCode()
    {
	return code;
    }

    public void setCode(BigDecimal code)
    {
	this.code = code;
    }

    public AddressCommonCO getAddressCO()
    {
	return addressCO;
    }

    public void setAddressCO(AddressCommonCO addressCO)
    {
	this.addressCO = addressCO;
    }

    public String get_addressPageRef()
    {
	return _addressPageRef;
    }

    public void set_addressPageRef(String addressPageRef)
    {
	_addressPageRef = addressPageRef;
    }

    public void setAlertsBO(AlertsBO alertsBO)
    {
	this.alertsBO = alertsBO;
    }

    public String getProgRefSaveBtn()
    {
        return progRefSaveBtn;
    }

    public void setProgRefSaveBtn(String progRefSaveBtn)
    {
        this.progRefSaveBtn = progRefSaveBtn;
    }

    public String getPosStatusCode()
    {
        return posStatusCode;
    }

    public void setPosStatusCode(String posStatusCode)
    {
        this.posStatusCode = posStatusCode;
    }

    public String getCallingScreen()
    {
        return callingScreen;
    }

    public void setCallingScreen(String callingScreen)
    {
        this.callingScreen = callingScreen;
    }
}
