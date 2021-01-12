/**
 * PWSGenerationStatus.java - Nov 2, 2018  
 *
 * Copyright 2018, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Raed Saad
 *
 */
package com.path.imco.actions.pwsgeneration;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.struts2.ServletActionContext;

import com.path.dbmaps.vo.DGTL_GTW_WS_ADAPTERVO;
import com.path.imco.bo.pwsgeneration.PWSGenerationConstant;
import com.path.imco.vo.pwsgeneration.PWSGenerationSC;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.status.StatusCO;

public class PWSGenerationStatus extends LookupBaseAction {
	private PWSGenerationSC pwsGenerationSC = new PWSGenerationSC();
	private List<StatusCO> statusList = new ArrayList<StatusCO>();
	private BigDecimal adapterId;
	private String url;
	
	public Object getModel() 
	{
		return pwsGenerationSC;
	}


    /**
     * Set the status Grid URL and load the Common Status Jsp Page...
     * 
     * @return
     */
	public String search() 
	{
		try {
			ServletContext application = ServletActionContext.getServletContext();
			String theRealPath = application.getContextPath();
			url = theRealPath + "/path/PWSGeneration/PWSGenerationStatus_loadStatusGrid?pwsGenerationSC.operationId="
					+ pwsGenerationSC.getAdapterId();
		}
		catch (Exception ex) 
		{
			super.handleException(ex, null, null);
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
		try {
			SessionCO sessionCO = returnSessionObject();
			BigDecimal compCode = sessionCO.getCompanyCode();
			BigDecimal branchCode = sessionCO.getBranchCode();

			List<String> colList = PWSGenerationConstant.PWSGENERATION_STATUS_LIST;

			SelectSC lovCriteria = new SelectSC();
			lovCriteria.setLanguage(sessionCO.getLanguage());
			lovCriteria.setCompCode(compCode);
			lovCriteria.setBranchCode(branchCode);
			lovCriteria.setLovTypeId(PWSGenerationConstant.PWSGENERATION_STATUS_LOV);
			pwsGenerationSC.setSearchCols(searchCol);
			copyproperties(pwsGenerationSC);
			setSearchFilter(pwsGenerationSC);

			DGTL_GTW_WS_ADAPTERVO dgtlAdapterVO = new DGTL_GTW_WS_ADAPTERVO();
			dgtlAdapterVO.setADAPTER_ID(pwsGenerationSC.getAdapterId());
			
			List<StatusCO> resultList = returnCommonLibBO().generateStatusList(dgtlAdapterVO, colList, lovCriteria);
			setGridModel(resultList);
		} 
		catch (Exception ex) 
		{
			log.error("Error in the loadStatusGrid method");
			super.handleException(ex, null, null);
		}
		return "loadGrid";
	}


	public PWSGenerationSC getPwsGenerationSC() {
		return pwsGenerationSC;
	}


	public void setPwsGenerationSC(PWSGenerationSC pwsGenerationSC) {
		this.pwsGenerationSC = pwsGenerationSC;
	}


	public List<StatusCO> getStatusList() {
		return statusList;
	}


	public void setStatusList(List<StatusCO> statusList) {
		this.statusList = statusList;
	}


	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
	}


	public BigDecimal getAdapterId() {
		return adapterId;
	}


	public void setAdapterId(BigDecimal adapterId) {
		this.adapterId = adapterId;
	}


}
