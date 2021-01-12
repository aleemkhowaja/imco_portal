package com.path.atm.actions.merchantposmgnt.merchantmgnt;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.path.atm.bo.merchantposmgnt.merchantmgnt.MerchantMgntBO;
import com.path.atm.bo.merchantposmgnt.merchantmgnt.MerchantMgntConstant;
import com.path.atm.vo.merchantposmgnt.merchantmgnt.MerchantMgntCO;
import com.path.atm.vo.merchantposmgnt.merchantmgnt.MerchantMgntSC;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;


/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: jihanemazloum
 * extends GridBaseAction: which holds all the parameters needed for the JSON to parse the result and render the grid.
 * GridBaseAction extends BaseAction which holds the method copyProperties in which the search statement is being constructed.
 */
public class MerchantMgntListAction extends GridBaseAction {

	private List<MerchantMgntCO> merchantMgntCOList = new ArrayList<MerchantMgntCO>();
	private MerchantMgntSC merchantMgntSC = new MerchantMgntSC();
	private MerchantMgntBO merchantMgntBO;
		
	 public void setMerchantMgntBO(MerchantMgntBO merchantMgntBO) {
		this.merchantMgntBO = merchantMgntBO;
	}

	/***
     * Returns the model of main grid
     */
    @Override
    public Object getModel()
    {
    	return merchantMgntSC;
    }
	
	/**
     * 
     * @return merchant management grid
     * @throws BaseException
     */
    public String loadMerchantMgntGrid() throws BaseException
    {
	String[] searchCol = { "BRANCH_CODE", "CODE", "CONTRACT_NUM", "ECO_SECTOR_CODE", "statusDesc",
		"MAX_AMOUNT", "contactTypeDesc", "ACC_BR", "ACC_CY", "ACC_GL", "ACC_CIF", "ACC_SL", "ACC_ADDITIONAL_REF",
		"SENT_FLAG", "DATE_CREATED" };
	HashMap<String, String> dateSearchCol = new HashMap<String, String>();

	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    merchantMgntSC.setSearchCols(searchCol);
	    merchantMgntSC.setCompCode(sessionCO.getCompanyCode());
	    merchantMgntSC.setBranchCode(sessionCO.getBranchCode());
	    merchantMgntSC.setAppName(sessionCO.getCurrentAppName());
	   // merchantMgntSC.setProgRef(get_pageRef());
	    //SAVE AS FUNCTIONALITY
	    merchantMgntSC.setProgRef(returnCommonLibBO().returnOrginProgRef(sessionCO.getCurrentAppName(), get_pageRef()));
	    merchantMgntSC.setIvCrud(getIv_crud());
	    merchantMgntSC.setLang(sessionCO.getLanguage());
	    merchantMgntSC.setLovType(MerchantMgntConstant.MERCHANTMGNT_STATUS_SYS_PARAM_LOV_TYPE);
	    merchantMgntSC.setLovTypeContact(MerchantMgntConstant.MERCHANTMGNT_CONTACT_SYS_PARAM_LOV_TYPE);

	    /*
	     * for date column in the toolbar search, we must add it to the
	     * hashmap of date columns in our SC,otherwise the searching on this
	     * date column will not work as needed
	     */
	    dateSearchCol.put("DATE_CREATED", "DATE_CREATED");
	    merchantMgntSC.setDateSearchCols(dateSearchCol);

	    // copy the details related to search criteria to the SC
	    copyproperties(merchantMgntSC);

	    if(!NumberUtil.isEmptyDecimal(sessionCO.getScannedCIFNo()))
	    {
		merchantMgntSC.setScannedCIF(sessionCO.getScannedCIFNo());
	    }

	    /*
	     * set number of rows to be displayed in the page of grid, and the
	     * total number of records for first time load only and on reset of
	     * search results
	     */
	    if(checkNbRec(merchantMgntSC))
	    {
		setRecords(merchantMgntBO.returnMerchantMgntListCount(merchantMgntSC));
	    }

	    /*
	     * return the collection of records
	     */
	    merchantMgntCOList = merchantMgntBO.returnMerchantMgntList(merchantMgntSC);

	    /*
	     * set the collection into gridModel attribute defined at JSP grid
	     * tag gridModel: the result list that contains the actual data
	     */
	    setGridModel(merchantMgntCOList);

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }

	public List<MerchantMgntCO> getMerchantMgntCOList()
	{
	    return merchantMgntCOList;
	}

	public void setMerchantMgntCOList(List<MerchantMgntCO> merchantMgntCOList)
	{
	    this.merchantMgntCOList = merchantMgntCOList;
	}

	public MerchantMgntSC getMerchantMgntSC()
	{
	    return merchantMgntSC;
	}

	public void setMerchantMgntSC(MerchantMgntSC merchantMgntSC)
	{
	    this.merchantMgntSC = merchantMgntSC;
	}

}
	
	

