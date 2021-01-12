package com.path.atm.actions.merchantposmgnt.posmgnt;

import java.util.ArrayList;
import java.util.List;

import com.path.atm.bo.merchantposmgnt.posmgnt.MerchantPosMgntBO;
import com.path.atm.bo.merchantposmgnt.posmgnt.MerchantPosMgntConstant;
import com.path.atm.vo.merchantposmgnt.posmgnt.MerchantPosMgntCO;
import com.path.atm.vo.merchantposmgnt.posmgnt.MerchantPosMgntSC;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;
/**
 * 
 * Copyright 2015, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: fatimasalam
 * 
 * extends GridBaseAction: which holds all the parameters needed for the JSON to parse the result and render the grid.
 * GridBaseAction extends BaseAction which holds the method copyProperties in which the search statement is being constructed.
 */
public class MerchantPosMgntListAction extends GridBaseAction
{
    private MerchantPosMgntSC merchantPosMgntSC = new MerchantPosMgntSC();
    private List<MerchantPosMgntCO> merchantPosMgntCOList = new ArrayList<MerchantPosMgntCO>();
    private MerchantPosMgntBO merchantPosMgntBO;
    /**
     * 
     * Returns the model of main grid
     */
    public Object getModel()
    {
	return merchantPosMgntSC;
    }
    
    /**
     * this function will return the merchant pos management grid
     * 
     * @return SUCCESS
     * @throws BaseException
     * @author fatimasalam
     */
    public String loadMerchantPosMgntGrid() throws BaseException

    {
	String[] searchCol = { "CODE", "BRANCH_CODE", "MERCHANT_CODE", "statusDesc", "POS_DESC", "merchantCodeDesc" };
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    merchantPosMgntSC.setSearchCols(searchCol);
	    merchantPosMgntSC.setCompCode(sessionCO.getCompanyCode());
	    merchantPosMgntSC.setBranchCode(sessionCO.getBranchCode());
	    merchantPosMgntSC.setLanguage(sessionCO.getLanguage());
	    merchantPosMgntSC.setPreferredLanguage(sessionCO.getPreferredLanguage());
	    merchantPosMgntSC.setLovTypeId(MerchantPosMgntConstant.POS_STATUS_LOV);
	    merchantPosMgntSC.setCurrAppName(sessionCO.getCurrentAppName());
	    merchantPosMgntSC.setCrudMode(getIv_crud());
	    /*
	     * add orginal progref to the criteria in case there is an original
	     * progRef. this case will be exists in SAVE AS Management
	     */
	    String originalProgRef = StringUtil.nullEmptyToValue(returnCommonLibBO().returnOrginProgRef(
		    sessionCO.getCurrentAppName(), get_pageRef()), get_pageRef());
	    merchantPosMgntSC.setProgRef(originalProgRef);
	    copyproperties(merchantPosMgntSC);
	    if(checkNbRec(merchantPosMgntSC))
	    {
	    	setRecords(merchantPosMgntBO.returnMerchantPosMgntListCount(merchantPosMgntSC));
	    }
	    merchantPosMgntCOList = merchantPosMgntBO.returnMerchantPosMgntList(merchantPosMgntSC);
	    setGridModel(merchantPosMgntCOList);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public MerchantPosMgntSC getMerchantPosMgntSC()
    {
	return merchantPosMgntSC;
    }

    public void setMerchantPosMgntSC(MerchantPosMgntSC merchantMgntPosSC)
    {
	this.merchantPosMgntSC = merchantMgntPosSC;
    }

    public List<MerchantPosMgntCO> getMerchantPosMgntCOList()
    {
	return merchantPosMgntCOList;
    }

    public void setMerchantPosMgntCOList(List<MerchantPosMgntCO> merchantMgntPosCOList)
    {
	this.merchantPosMgntCOList = merchantMgntPosCOList;
    }

    public void setMerchantPosMgntBO(MerchantPosMgntBO merchantMgntPosBO)
    {
	this.merchantPosMgntBO = merchantMgntPosBO;
    }

}
