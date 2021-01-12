package com.path.atm.actions.merchantposmgnt.posmgnt;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.struts2.ServletActionContext;

import com.path.dbmaps.vo.CTS_MERCHANT_POSVO;
import com.path.atm.bo.merchantposmgnt.posmgnt.MerchantPosMgntConstant;
import com.path.atm.vo.merchantposmgnt.posmgnt.MerchantPosMgntSC;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.status.StatusCO;

/**
 * 
 * Copyright 2015, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: fatimasalam
 * 
 *         MerchantPosMgntStatusAction.java used to
 */
public class MerchantPosMgntStatusAction extends LookupBaseAction
{
    private MerchantPosMgntSC merchantPosMgntSC = new MerchantPosMgntSC();
    private List<StatusCO> statusList = new ArrayList<StatusCO>();
    private String url;
    
    /**
     * Set the status Grid URL and load the Common Status Jsp Page...
     * 
     * @return
     */
    public String search()
    {
	try
	{
	    ServletContext application = ServletActionContext.getServletContext();
	    String theRealPath = application.getContextPath();
	    url = theRealPath + "/path/merchantposmgnt/merchantPosMgntStatusAction_loadStatusGrid.action?code="
		    + merchantPosMgntSC.getCode();
	}
	catch(Exception ex)
	{
	    ex.printStackTrace();
	}
	return "SUCCESS_STATUS";
    }
    /**
     * get data from Database, convert them to be compatible with statusCO, get
     * HTML and set the Model.
     * 
     * @return
     */
    public String loadStatusGrid()
    {
	String[] searchCol = { "userName", "status_desc", "status_date" };
	try
	{
	    SessionCO sessionCO = returnSessionObject();
	    BigDecimal compCode = sessionCO.getCompanyCode();
	    BigDecimal brancheCode = sessionCO.getBranchCode();
	    List<String> colList = MerchantPosMgntConstant.MERCHANTMGNT_POS_STATUS_LST;
	    SelectSC lovCriteria = new SelectSC();
	    lovCriteria.setLanguage(sessionCO.getLanguage());
	    lovCriteria.setCompCode(compCode);
	    lovCriteria.setLovTypeId(MerchantPosMgntConstant.POS_STATUS_LOV);
	    merchantPosMgntSC.setSearchCols(searchCol);
	    copyproperties(merchantPosMgntSC);
	    setSearchFilter(merchantPosMgntSC);
	    CTS_MERCHANT_POSVO merchantPosMgntVO = new CTS_MERCHANT_POSVO();
	    merchantPosMgntVO.setCOMP_CODE(compCode);
	    merchantPosMgntVO.setBRANCH_CODE(brancheCode);
	    merchantPosMgntVO.setCODE(merchantPosMgntSC.getCode());
	    List<StatusCO> resultList = returnCommonLibBO().generateStatusList(merchantPosMgntVO, colList, lovCriteria);
	    setGridModel(resultList);
	}
	catch(Exception ex)
	{
	    log.error("Error in the loadStatusGrid method");
	    ex.printStackTrace();
	}
	return "loadGrid";
    }

    public Object getModel()
    {
	return merchantPosMgntSC;
    }

    public MerchantPosMgntSC getMerchantPosMgntSC()
    {
	return merchantPosMgntSC;
    }

    public void setMerchantPosMgntSC(MerchantPosMgntSC merchantPosMgntSC)
    {
	this.merchantPosMgntSC = merchantPosMgntSC;
    }

    public String getUrl()
    {
	return url;
    }

    public void setUrl(String url)
    {
	this.url = url;
    }

    public List<StatusCO> getStatusList()
    {
	return statusList;
    }

    public void setStatusList(List<StatusCO> statusList)
    {
	this.statusList = statusList;
    }
}
