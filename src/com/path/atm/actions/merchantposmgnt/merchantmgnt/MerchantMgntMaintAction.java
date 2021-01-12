package com.path.atm.actions.merchantposmgnt.merchantmgnt;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.struts2.json.JSONException;

import com.path.actions.base.RetailBaseAction;
import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.audit.AuditConstant;
import com.path.bo.common.memo.MemoConstants;
import com.path.atm.bo.merchantposmgnt.merchantmgnt.MerchantMgntBO;
import com.path.atm.bo.merchantposmgnt.merchantmgnt.MerchantMgntConstant;
import com.path.atm.vo.merchantposmgnt.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantposmgnt.merchantmgnt.MerchantMgntSC;
import com.path.dbmaps.vo.CTSCONTROLVO;
import com.path.dbmaps.vo.SYS_PARAM_SCREEN_DISPLAYVO;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.common.util.StringUtil;
import com.path.vo.common.SessionCO;
import com.path.vo.common.audit.AuditRefCO;
import com.path.vo.common.memo.MemoSC;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.smart.SmartCO;
import com.path.vo.core.cif.CifSC;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: jihanemazloum
 * 
 * 
 */
public class MerchantMgntMaintAction extends RetailBaseAction
{
    private MerchantMgntCO merchantMgntCO  = new MerchantMgntCO();
    private List<SelectCO> contactTypeList = new ArrayList<SelectCO>();
    private List<SelectCO> typeList = new ArrayList<SelectCO>();

    private MerchantMgntBO merchantMgntBO;
    private BigDecimal cifCode;
    private BigDecimal merchantCode;
    private HashMap menuOptionsHm = new HashMap();
    private String _toolBarMode      = "false";
    private ArrayList<SmartCO> smartCOList;
    private MerchantMgntSC merchantMgntSC = new MerchantMgntSC();

    
    public Object getModel()
    {
    	return merchantMgntCO;
    }
    
    /**
     * First function to be executed when loading merchantmgnt maintenance page
     * 
     * @return
     */
    public String initialiseMerchantMgntPage()
    {

	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillDefaultValues(sessionCO);
	    if(getIv_crud().equalsIgnoreCase("R"))
	    {
		set_showNewInfoBtn("true");
		set_showSmartInfoBtn("false");
		set_recReadOnly("false");

	    }
	    else
	    {
		set_showNewInfoBtn("false");
		set_showSmartInfoBtn("false");
		set_recReadOnly("true");
	    }
	    if(!NumberUtil.isEmptyDecimal(sessionCO.getScannedCIFNo()))
	    {
		merchantMgntCO.getCtsMerchantVO().setACC_CIF(sessionCO.getScannedCIFNo());
	    }
	    set_searchGridId("merchantMgntGridTbl_Id");
	    fillMenuOptions();
	    dependencyOnMerchantType();
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "loadMerchantMgntPage";
    }
    
    
    public void fillDefaultValues(SessionCO sessionCO) throws BaseException
    {
	fillSessionData(sessionCO);
	
	SelectSC selectContactSC = new SelectSC(MerchantMgntConstant.MERCHANTMGNT_CONTACT_SYS_PARAM_LOV_TYPE);
	contactTypeList = returnLOV(selectContactSC);
	SelectSC selectTypeSC = new SelectSC(MerchantMgntConstant.MERCHANTMGNT_MERCHANT_TYPE_SYS_PARAM_LOV_TYPE);
	typeList = returnLOV(selectTypeSC);
	merchantMgntCO.getCtsMerchantVO().setDATE_CREATED(merchantMgntCO.getRunningDate());
    }
  
    
    /**
     * @author jihanemazloum
     * This function is called when double clicking on a record and upon clicking on new. It displays the
     * selected record under MerchantMgntMaint.jsp page 
     * @return merchantMgnttMaint
     * @throws JSONException
     */
    public String loadMerchantMgntDetails()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();   
	    fillDefaultValues(sessionCO);
	    
	    if(NumberUtil.isEmptyDecimal(getMerchantCode()))
	    {
		dependencyOnMerchantType();
	    }
	    else
	    {
		
		/*
		 * JM:TO BE UN-COMMENTED LATER 
		 */
		//In PB: w_maintain_merchant_pos\\ue_check_alert.f_check_alert_trx_status
	       String todoAlertOldStatus = merchantMgntCO.getAlertsParamCO().getTodoAlertOldStatus();
	       Boolean isFromAlert = Boolean.valueOf(merchantMgntCO.getIsFromAlert());
	       Boolean isAlertLocalApprove = Boolean.valueOf(merchantMgntCO.getAlertsParamCO().getIsLocalApprove());
			    
		
		MerchantMgntSC merchantMgntSC = new MerchantMgntSC();
		if(Boolean.valueOf(merchantMgntCO.getIsFromAlert()))
		{
		    merchantMgntSC.setCompCode(merchantMgntCO.getAlertsParamCO().getCompCode());
		    merchantMgntSC.setBranchCode(merchantMgntCO.getAlertsParamCO().getBranchCode());
		}
		else
		{
		    merchantMgntSC.setCompCode(sessionCO.getCompanyCode());
		    merchantMgntSC.setBranchCode(sessionCO.getBranchCode());
		}
		merchantMgntSC.setLang(sessionCO.getLanguage());
		merchantMgntSC.setPreferredLanguage(sessionCO.getPreferredLanguage());
		merchantMgntSC.setCode(getMerchantCode());
		merchantMgntSC.setLovType(MerchantMgntConstant.MERCHANTMGNT_STATUS_SYS_PARAM_LOV_TYPE);
		merchantMgntSC.setLovTypeContact(MerchantMgntConstant.MERCHANTMGNT_CONTACT_SYS_PARAM_LOV_TYPE);
		merchantMgntSC.setShowInPos(MerchantMgntConstant.SHOW_IN_POS);
		
		// fill them on other method
		merchantMgntCO = merchantMgntBO.returnMerchantMgntDetails(merchantMgntSC);
		
		//applyRetrieveAudit(AuditConstant.MERCHANTMGNT_KEY_REF, merchantMgntCO.getCtsMerchantVO(), merchantMgntCO);
		
		/* Apply memo on retrieve */
		applyMemoOnPosMerchantRetrieve(sessionCO);
		if(isFromAlert)
		{
 	    
		    HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> hm = returnCommonLibBO().applyDynScreenDisplay("statusRemark","merchantMgntCO.ctsMerchantVO.STATUS_REMARK", ConstantsCommon.ACTION_TYPE_READONLY, "0", merchantMgntCO.getHm(), null);
		    hm.get("merchantMgntCO.ctsMerchantVO.STATUS_REMARK").setOverWriteReadOnly(Boolean.TRUE);
		    merchantMgntCO.getHm().putAll(hm);
		}
		getAdditionalScreenParams().putAll(merchantMgntCO.getHm());
		//merchantMgntCO.setUserIsBranchManager(sessionCO.getCtsTellerVO().getUSER_IS_BRANCH_MANAGER());	
		//In PB: w_maintain_merchant_response\\ue_check_alert.f_check_alert_trx_status		
		//checkRefreshAlert(isFromAlert,isAlertLocalApprove,todoAlertOldStatus);
		if((getIv_crud().equalsIgnoreCase("R"))
			&& (merchantMgntCO.getCtsMerchantVO().getSTATUS()
				.equalsIgnoreCase(MerchantMgntConstant.STATUS_ACTIVE))
			||( ((getIv_crud().equalsIgnoreCase("UP"))) && (merchantMgntCO.getCtsMerchantVO().getSTATUS()
				.equalsIgnoreCase(MerchantMgntConstant.STATUS_APPROVED))))
		{
		    set_recReadOnly("false");
		}
		else
		{
		    set_recReadOnly("true");
		}

		// For Auditing
		 applyRetrieveAudit(AuditConstant.MERCHANTMGNT_KEY_REF, merchantMgntCO.getCtsMerchantVO(), merchantMgntCO);
	    }

	    fillMenuOptions();
	    
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "loadMerchantMgntMaintPage";
    }
    
   
    /**
     * show memo when retrieving a record
     * @author SarahElHusseini
     * @param sessionCO
     * @throws BaseException
     */
    private void applyMemoOnPosMerchantRetrieve(SessionCO sessionCO) throws BaseException
    {
	CTSCONTROLVO ctsControlVO = returnCommonLibBO().returnCTSCONTROLVO(sessionCO.getCompanyCode(), sessionCO.getBranchCode());
	if(ctsControlVO != null && MemoConstants.SHOW_MEMO_ALL_OPT_RETRIEVE_TRUE.equals(ctsControlVO.getSHOW_MEMO_ALL_OPT_RETRIEVE()))
	{
	    List<MemoSC> memoList = fillMemoParameters(sessionCO, merchantMgntCO);
	    applyMemoOnRetrieve(memoList,false);
	}
    }

    /**
     * fill list of memo that will appear on retrieve
     * @param merchantMgntCO
     * @return
     */
    private List<MemoSC> fillMemoParameters(SessionCO sessionCO, MerchantMgntCO merchantMgntCO)
    {
	MemoSC memoSC = new MemoSC();
	List<MemoSC> memoList = new ArrayList<MemoSC>();
	memoSC.setCompCode(sessionCO.getCompanyCode());
	memoSC.setAppType(MemoConstants.CSM_APP_TYPE);
	memoSC.setForAccOrCif(MemoConstants.ACCOUNTS);
	memoSC.setOptRef(MemoConstants.MEMO_MERCHANT_OPT);

	memoSC.setCifNo(merchantMgntCO.getCtsMerchantVO().getACC_CIF());
	memoSC.setAccBR(merchantMgntCO.getCtsMerchantVO().getACC_BR());
	memoSC.setAccCY(merchantMgntCO.getCtsMerchantVO().getACC_CY());
	memoSC.setAccGL(merchantMgntCO.getCtsMerchantVO().getACC_GL());
	memoSC.setAccCIF(merchantMgntCO.getCtsMerchantVO().getACC_CIF());
	memoSC.setAccSL(merchantMgntCO.getCtsMerchantVO().getACC_SL());

	memoList.add(memoSC);
	return memoList;
    }


    /**
     * This function is to grant access privileges to the save, delete buttons
     * 
     * 
     * @author jihanemazloum
     */
    public void fillMenuOptions() throws BaseException   
    {
	menuOptionsHm.put("D", MerchantMgntConstant.PARENT_OPT + "D");
	if(MerchantMgntConstant.CRUD_MAINTENANCE.equals(getIv_crud()))
	{
	    if(NumberUtil.isEmptyDecimal(merchantMgntCO.getCtsMerchantVO().getCODE()))
	    {
		menuOptionsHm.put(getIv_crud(),MerchantMgntConstant.PARENT_OPT+MerchantMgntConstant.REFERENCE_CREATE);
	    }
	    else
	    {
		menuOptionsHm.put(getIv_crud(),MerchantMgntConstant.PARENT_OPT+MerchantMgntConstant.REFERENCE_UPDATE);
	    }
	}
	else
	{
	    if(MerchantMgntConstant.CRUD_TO_CANCEL.equals(getIv_crud()))
	    {
		menuOptionsHm.put(getIv_crud(), MerchantMgntConstant.PARENT_OPT + "N");
	    }
	    else
	    {
		if(MerchantMgntConstant.CRUD_CANCEL.equals(getIv_crud()))
		{
		    menuOptionsHm.put(getIv_crud(), MerchantMgntConstant.PARENT_OPT + "K");
		}
		else
		{
		    menuOptionsHm.put(getIv_crud(), MerchantMgntConstant.PARENT_OPT + getIv_crud());
		}
	    }
	}
	
    }
     
    
    public String saveNew() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);
	    
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.MERCHANTMGNT_KEY_REF);
	    merchantMgntCO.setAuditRefCO(refCO);
	    if(NumberUtil.isEmptyDecimal(merchantMgntCO.getCtsMerchantVO().getCODE()))
	    {
		refCO.setOperationType(AuditConstant.CREATED);		
	    }
	    else
	    {
		refCO.setOperationType(AuditConstant.UPDATE);
		merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));
	    }

	    merchantMgntCO = merchantMgntBO.saveMerchantMgnt(merchantMgntCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";
    }
    
    
    public String approve() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO); 
	    
	 // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.MERCHANTMGNT_KEY_REF);
	    refCO.setOperationType(AuditConstant.UPDATE);
	    merchantMgntCO.setAuditRefCO(refCO);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));

	    merchantMgntCO = merchantMgntBO.approveMerchantMgnt(merchantMgntCO);
	    
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	
	return "success";
    }
    
    public String delete()
    {
	
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	    // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.MERCHANTMGNT_KEY_REF);
	    merchantMgntCO.setAuditRefCO(refCO);
	    refCO.setOperationType(AuditConstant.DELETE);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));
	    
	    merchantMgntBO.deleteMerchantMgnt(merchantMgntCO);
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	
	return "success";
    }
    
    
    public String toCancel() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);

	 // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setOperationType(AuditConstant.UPDATE);
	    refCO.setKeyRef(AuditConstant.MERCHANTMGNT_KEY_REF);
	    merchantMgntCO.setAuditRefCO(refCO);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));
	    
	    merchantMgntCO = merchantMgntBO.toCancelMerchantMgnt(merchantMgntCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";
    }
    
    public String cancel() throws BaseException
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    fillSessionData(sessionCO);
    
	    // construct Audit Reference
	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.MERCHANTMGNT_KEY_REF);
	    merchantMgntCO.setAuditRefCO(refCO);
	    refCO.setOperationType(AuditConstant.UPDATE);
	    merchantMgntCO.setAuditObj(returnAuditObject(merchantMgntCO.getClass()));
	    
	    merchantMgntCO = merchantMgntBO.cancelMerchantMgnt(merchantMgntCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";
    }
    
    public void fillSessionData(SessionCO sessionCO) throws BaseException
    {
	
	if(!Boolean.valueOf(merchantMgntCO.getIsFromAlert()))
	{
	    merchantMgntCO.getCtsMerchantVO().setCOMP_CODE(sessionCO.getCompanyCode());
	    merchantMgntCO.getCtsMerchantVO().setBRANCH_CODE(sessionCO.getBranchCode());
	    merchantMgntCO.setLoginCompCode(sessionCO.getCompanyCode());
	    merchantMgntCO.setLoginBraCode(sessionCO.getBranchCode());
	    merchantMgntCO.setOriginBraCode(sessionCO.getBranchCode());
	    //merchantMgntCO.setLoginTellerCode(sessionCO.getCtsTellerVO().getCODE());
	    merchantMgntCO.setLoginUserId(sessionCO.getUserName());
	}
	merchantMgntCO.getCtsMerchantVO().setCIF_NO(merchantMgntCO.getCtsMerchantVO().getACC_CIF());
	merchantMgntCO.getCtsMerchantVO().setSENT_FLAG(MerchantMgntConstant.MERCHANTMGNT_SENT_FLAG);
	merchantMgntCO.setOpt(get_pageRef());
	merchantMgntCO.setRunningDate(sessionCO.getRunningDateRET());
	merchantMgntCO.setAppName(sessionCO.getCurrentAppName());
	merchantMgntCO.setLanguage(sessionCO.getLanguage());
	merchantMgntCO.setLoginPreferrredLanguage(sessionCO.getPreferredLanguage());
	//merchantMgntCO.setUserIsBranchManager(sessionCO.getCtsTellerVO().getUSER_IS_BRANCH_MANAGER());
	if(getIv_crud() != null){
	merchantMgntCO.setCrud(getIv_crud());
	}
    }
    

    /**
     * checkDetailsAccess called while clicking on CIF Details button on MerchantMgnt Maintenance screen 
     */
    public String onCIFDetailsClicked()
    {	
	SessionCO sessionCO = returnSessionObject();
	try
	{
	    merchantMgntCO.setLoginCompCode(sessionCO.getCompanyCode());
	    merchantMgntCO.setLoginBraCode(sessionCO.getBranchCode());
	    merchantMgntCO.setLoginUserId(sessionCO.getUserName());
	    
	    CifSC cifSC = new CifSC();
	    cifSC.setCifCode(getCifCode());
	    cifSC.setCompCode(sessionCO.getCompanyCode());
	    cifSC.setBranchCode(sessionCO.getBranchCode());
	   
	    //Bug # 339474 -- [John Massaad]- adding condition checking on CIF_NO if it is = 0 don't check for CIF number
	    if(!NumberUtil.isEmptyDecimal(getCifCode()) && BigDecimal.ZERO.compareTo(getCifCode())!=0)
	    {
		merchantMgntCO = merchantMgntBO.onCIFDetailsClicked(merchantMgntCO,cifSC);
	    }
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "success";	
    }
    

    /**
     * dependencyByAccCIF
     * validatation on ACC_CIF
     * all ACC_CIF validation for default component, in addition to validation on memo and blacklist
     * @return
     */
    public String dependencyByAccCIF()
    {
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    merchantMgntCO.getCtsMerchantVO().setCOMP_CODE(sessionCO.getCompanyCode());
	    merchantMgntCO.setLoginCompCode(sessionCO.getCompanyCode());
	    merchantMgntCO.setLoginBraCode(sessionCO.getBranchCode());
	    merchantMgntCO.setBaseCurrencyCode(sessionCO.getBaseCurrencyCode());
	    merchantMgntCO.setLoginPreferrredLanguage(sessionCO.getPreferredLanguage());
	    merchantMgntCO.setLanguage(sessionCO.getLanguage());
	    merchantMgntCO.setRunningDate(sessionCO.getRunningDateRET());
	    merchantMgntCO.setUserName(sessionCO.getUserName());
	    
	    if(!NumberUtil.isEmptyDecimal(merchantMgntCO.getCtsMerchantVO().getACC_BR()) 
		    && !NumberUtil.isEmptyDecimal(merchantMgntCO.getCtsMerchantVO().getACC_CY()) 
		    	&& !NumberUtil.isEmptyDecimal(merchantMgntCO.getCtsMerchantVO().getACC_GL()) 
			    && !NumberUtil.isEmptyDecimal(merchantMgntCO.getCtsMerchantVO().getACC_CIF()))
    	    {
		
		merchantMgntCO = merchantMgntBO.dependencyByAccCIF(merchantMgntCO);
		
	        if(merchantMgntCO.getCtsMerchantVO().getACC_CIF()==null) 
	        {
	            merchantMgntCO = new MerchantMgntCO();
	        }
	        else
	        {
	            /**
	             * going to the common function in RetailBaseAction and check if
	             * there is any Memo.
	             */
	            MemoSC memoSC = new MemoSC();
	            memoSC.setCompCode(sessionCO.getCompanyCode());
	            memoSC.setForAccOrCif(MemoConstants.CIF);
	            memoSC.setCifNo(merchantMgntCO.getCtsMerchantVO().getACC_CIF());	
	            //NABIL FEGHALI - IIAB110182 - IIAB100424 - Conditional Automation
	            memoSC.setOptRef(MemoConstants.MEMO_MERCHANT_OPT);
	            checkForMemo(memoSC);
	        }
	    }
	    
	    merchantMgntCO = returnListDependencyMsg(merchantMgntCO);

	    if(!merchantMgntCO.getHm().isEmpty())
	    {
		setAdditionalScreenParams(merchantMgntCO.getHm());
	    }
	}
	catch(Exception e)
	{
	    merchantMgntCO.getCtsMerchantVO().setACC_CIF(null);
	    handleException(e, null, null);
	}
	NumberUtil.resetEmptyValues(merchantMgntCO);
	return SUCCESS;
    }
    
    /**
     * dependencyByAccSL
     * @return String
     * @throws BaseException
     */
    public String dependencyByAccSL()
    {
	try
	{
	    NumberUtil.resetEmptyValues(merchantMgntCO);
	    SessionCO sessionCO = returnSessionObject();
	    merchantMgntCO.getCtsMerchantVO().setCOMP_CODE(sessionCO.getCompanyCode());
	    merchantMgntCO.getCtsMerchantVO().setBRANCH_CODE(sessionCO.getBranchCode());
	    merchantMgntCO.setLoginCompCode(sessionCO.getCompanyCode());
	    merchantMgntCO.setLoginBraCode(sessionCO.getBranchCode());
	    merchantMgntCO.setLanguage(sessionCO.getLanguage());
	    merchantMgntCO.setUserName(sessionCO.getUserName());
	    merchantMgntCO.setLoginPreferrredLanguage(sessionCO.getPreferredLanguage());
	    merchantMgntCO.setRunningDate(sessionCO.getRunningDateRET());
	    
	    merchantMgntCO = merchantMgntBO.dependencyByAccSL(merchantMgntCO);
	    
	    if(null != merchantMgntCO.getAmfVO() 
		    && !NumberUtil.isEmptyDecimal(merchantMgntCO.getAmfVO().getSL_NO()))
	    {
		 /**
	           * going to the common function in RetailBaseAction and check if
	           * there is any Memo.
	         */
		
		MemoSC memoSC = new MemoSC();
		memoSC.setCompCode(sessionCO.getCompanyCode());
		memoSC.setForAccOrCif(MemoConstants.ACCOUNTS);
		memoSC.setLovType(MemoConstants.LOV_TYPE);
		memoSC.setAccBR(merchantMgntCO.getAmfVO().getBRANCH_CODE());
		memoSC.setAccCY(merchantMgntCO.getAmfVO().getCURRENCY_CODE());
		memoSC.setAccCIF(merchantMgntCO.getAmfVO().getCIF_SUB_NO());
		memoSC.setAccGL(merchantMgntCO.getAmfVO().getGL_CODE());
		memoSC.setAccSL(merchantMgntCO.getAmfVO().getSL_NO());
		memoSC.setLangCode(sessionCO.getLanguage());
		//NABIL FEGHALI - IIAB110182 - IIAB100424 - Conditional Automation
	        memoSC.setOptRef(MemoConstants.MEMO_MERCHANT_OPT);
		checkForMemo(memoSC);
	    }

	    if(!merchantMgntCO.getHm().isEmpty())
	    {
		setAdditionalScreenParams(merchantMgntCO.getHm());
	    }
	    
	    merchantMgntCO = returnListDependencyMsg(merchantMgntCO);
	}
	catch(Exception ex)
	{
	    merchantMgntCO.getCtsMerchantVO().setACC_SL(null);
	    handleException(ex, null, null);
	}
	return SUCCESS;
    }
    
    /**
     * dependencyByAccSL
     * @return String
     * @throws BaseException
     */
    public String dependencyByAddRef()
    {
	try
	{
	    NumberUtil.resetEmptyValues(merchantMgntCO);
	    SessionCO sessionCO = returnSessionObject();
	    merchantMgntCO.getCtsMerchantVO().setCOMP_CODE(sessionCO.getCompanyCode());
	    merchantMgntCO.getCtsMerchantVO().setBRANCH_CODE(sessionCO.getBranchCode());
	    merchantMgntCO.setLoginBraCode(sessionCO.getBranchCode());
	    merchantMgntCO.setLoginCompCode(sessionCO.getCompanyCode());
	    merchantMgntCO.setLanguage(sessionCO.getLanguage());
	    merchantMgntCO.setLoginPreferrredLanguage(sessionCO.getPreferredLanguage());
	    merchantMgntCO.setUserName(sessionCO.getUserName());
	    merchantMgntCO.setRunningDate(sessionCO.getRunningDateRET());
	    
	    if("".equals(StringUtil.nullToEmpty(merchantMgntCO.getCtsMerchantVO().getACC_ADDITIONAL_REF())))
	    {
		merchantMgntCO.getCtsMerchantVO().setACC_SL(null);
		
	    }
	    else
	    {
		merchantMgntCO = merchantMgntBO.dependencyByAddRef(merchantMgntCO);

		if(null != merchantMgntCO.getAmfVO())
		{
		    MemoSC memoSC = new MemoSC();
		    memoSC.setCompCode(sessionCO.getCompanyCode());
		    memoSC.setForAccOrCif(MemoConstants.ACCOUNTS);
		    memoSC.setLovType(MemoConstants.LOV_TYPE);
		    memoSC.setAccBR(merchantMgntCO.getAmfVO().getBRANCH_CODE());
		    memoSC.setAccCY(merchantMgntCO.getAmfVO().getCURRENCY_CODE());
		    memoSC.setAccCIF(merchantMgntCO.getAmfVO().getCIF_SUB_NO());
		    memoSC.setAccGL(merchantMgntCO.getAmfVO().getGL_CODE());
		    memoSC.setAccSL(merchantMgntCO.getAmfVO().getSL_NO());
		    memoSC.setLangCode(sessionCO.getLanguage());
		    //NABIL FEGHALI - IIAB110182 - IIAB100424 - Conditional Automation
	            memoSC.setOptRef(MemoConstants.MEMO_MERCHANT_OPT);
		    checkForMemo(memoSC);
		}
	    }
	    merchantMgntCO = returnListDependencyMsg(merchantMgntCO);
	}
	catch(Exception ex)
	{
	    merchantMgntCO.getCtsMerchantVO().setACC_ADDITIONAL_REF(null);
	    handleException(ex, null, null);
	}
	return SUCCESS;
    }
    
    private MerchantMgntCO returnListDependencyMsg(MerchantMgntCO merchantMgntCO)
    {
	if(merchantMgntCO.getWarningMessages() != null && !"".equals(merchantMgntCO.getWarningMessages()))
	{
	    addDependencyMsg(merchantMgntCO.getWarningMessages(), null);
	}

	if(merchantMgntCO.getListWarningMsg() != null && merchantMgntCO.getListWarningMsg().size() != 0)
	{
	    StringBuffer sb = new StringBuffer(StringUtil.nullToEmpty(get_warning()));
	    int totalWarningMsg = merchantMgntCO.getListWarningMsg().size();
	    for(int i = 0; i < totalWarningMsg; i++)
	    {
		sb.append(merchantMgntCO.getListWarningMsg().get(i)).append("\n");
	    }
	    set_warning(sb.toString());
	}

	if(null != merchantMgntCO.getConfirmMsg())
	{
	    set_confirm(merchantMgntCO.getConfirmMsg());
	}

	return merchantMgntCO;
    }
    /**
     * BURJ130313
     * @author FatimaSalam
     */
    public String dependencyOnMerchantType()
    {
	try
	{ 
	    merchantMgntCO = merchantMgntBO.dependencyOnMerchantType(merchantMgntCO);
	    
	    getAdditionalScreenParams().putAll(merchantMgntCO.getHm());
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "success";
    }
    
    public void setMerchantMgntBO(MerchantMgntBO merchantMgntBO)
    {
	this.merchantMgntBO = merchantMgntBO;
    }

    public MerchantMgntCO getMerchantMgntCO()
    {
	return merchantMgntCO;
    }

    public void setMerchantMgntCO(MerchantMgntCO merchantMgntCO)
    {
	this.merchantMgntCO = merchantMgntCO;
    }

    public List<SelectCO> getContactTypeList()
    {
	return contactTypeList;
    }

    public void setContactTypeList(List<SelectCO> contactTypeList)
    {
	this.contactTypeList = contactTypeList;
    }

    public MerchantMgntSC getMerchantMgntSC()
    {
	return merchantMgntSC;
    }

    public void setMerchantMgntSC(MerchantMgntSC merchantMgntSC)
    {
	this.merchantMgntSC = merchantMgntSC;
    }

    public BigDecimal getCifCode()
    {
        return cifCode;
    }

    public void setCifCode(BigDecimal cifCode)
    {
        this.cifCode = cifCode;
    }

    public BigDecimal getMerchantCode()
    {
        return merchantCode;
    }

    public void setMerchantCode(BigDecimal merchantCode)
    {
        this.merchantCode = merchantCode;
    }

    public HashMap getMenuOptionsHm()
    {
        return menuOptionsHm;
    }

    public void setMenuOptionsHm(HashMap menuOptionsHm)
    {
        this.menuOptionsHm = menuOptionsHm;
    }

    public String get_toolBarMode()
    {
        return _toolBarMode;
    }

    public void set_toolBarMode(String toolBarMode)
    {
        _toolBarMode = toolBarMode;
    }

    public ArrayList<SmartCO> getSmartCOList()
    {
        return smartCOList;
    }

    public void setSmartCOList(ArrayList<SmartCO> smartCOList)
    {
        this.smartCOList = smartCOList;
    }

    public List<SelectCO> getTypeList()
    {
        return typeList;
    }

    public void setTypeList(List<SelectCO> typeList)
    {
        this.typeList = typeList;
    }
}
