package com.path.atm.actions.atminterface;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.struts2.ServletActionContext;

import com.path.atm.bo.atminterface.AtmInterfaceConstants;
import com.path.atm.vo.atminterface.AtmInterfaceSC;
import com.path.dbmaps.vo.DGTL_ATM_INTERFACESVO;
import com.path.imco.bo.common.ImcoCommonConstants;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.status.StatusAddFieldCO;
import com.path.vo.common.status.StatusCO;

public class ATMInterfaceStatusAction extends GridBaseAction
{
	private AtmInterfaceSC criteria = new AtmInterfaceSC();
	private String url;
	private List<StatusAddFieldCO> addFields;

	public Object getModel()
	{
		return criteria;
	}
	public AtmInterfaceSC getCriteria()
	{
		return criteria;
	}
	public void setCriteria(AtmInterfaceSC criteria)
	{
		this.criteria = criteria;
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
	
	/**
	* Method to Search status for a Record
	* @return
	*/
	public String search()
	{
		try
		{
		    ServletContext application = ServletActionContext.getServletContext();
		    String theRealPath = application.getContextPath();
		    
		    url = theRealPath + "/path/atmInterface/ATMInterfaceStatusAction_loadStatusGrid.action?interfaceId="+criteria.getInterfaceId();
		    addFields = new ArrayList<StatusAddFieldCO>();
		}
		catch(Exception ex)
		{
		    handleException(ex, null, null);
		    return ERROR_ACTION;
		}
		return "SUCCESS_STATUS";
	}

	/**
	* Method to load the Status Grid
	* @return
	*/
	public String loadStatusGrid()
	{
		String[] searchCol = { "userName", "status_desc", "status_date" };
		DGTL_ATM_INTERFACESVO iso_INTERFACESVO = new DGTL_ATM_INTERFACESVO();
		try
		{
			SessionCO sessionCO = returnSessionObject();
			criteria.setSearchCols(searchCol);
			
			copyproperties(criteria);

			List<String> colList  = AtmInterfaceConstants.atmInterfaceStatusLst;
			SelectSC lovCriteria = new SelectSC();
			lovCriteria.setLanguage(sessionCO.getLanguage());
			lovCriteria.setLovTypeId(ImcoCommonConstants.IMCO_COMMON_STATUS_LOV);
			lovCriteria.setCompCode(sessionCO.getCompanyCode());
			
			iso_INTERFACESVO.setCOMP_CODE(sessionCO.getCompanyCode());
			iso_INTERFACESVO.setCODE(criteria.getInterfaceId());
			List<StatusCO> resultList = returnCommonLibBO().generateStatusList(iso_INTERFACESVO ,colList, lovCriteria);
			setGridModel(resultList);
		}
		catch(Exception ex)
		{
			handleException(ex, null, null);
		}
		return SUCCESS;
	}
}
