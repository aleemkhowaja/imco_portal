package com.path.imco.actions.accesswebservice;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.struts2.ServletActionContext;

import com.path.dbmaps.vo.IMCO_PWS_TMPLT_MASTERVO;
import com.path.imco.bo.accesswebservice.AccessWebServiceConstant;
import com.path.imco.vo.accesswebservice.AccessWebServiceSC;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.status.StatusCO;

public class AccessWebServiceStatusList extends LookupBaseAction{

    private AccessWebServiceSC criteria = new AccessWebServiceSC();
    private List<StatusCO> statusList = new ArrayList<StatusCO>();
    private String url;

	  public String search()
	    {
			try
			{ 
			    ServletContext application = ServletActionContext.getServletContext();
			    String theRealPath = application.getContextPath();
			    url =  theRealPath + "/path/accessWebService/AccessWebServiceStatusList_loadStatusGrid?criteria.tempID="+this.getCriteria().getTempID();
			}
			catch(Exception e)
			{
				super.handleException(e, null, null);
			}
			return "SUCCESS_STATUS";
	    }
	  
	  public String loadStatusGrid()
	  {
		  String [] searchCol= { "userName", "status_desc", "status_date" };
		  try{
			    SessionCO sessionCO = returnSessionObject();
			    BigDecimal compCode = sessionCO.getCompanyCode();
			    BigDecimal brancheCode = sessionCO.getBranchCode();
			    List<String> colList = AccessWebServiceConstant.ACCESS_WEB_SEVRVICE_STATUS_LIST;
			    SelectSC lovCriteria = new SelectSC();
			    lovCriteria.setLanguage(sessionCO.getLanguage());
			    lovCriteria.setCompCode(compCode);			    
			    lovCriteria.setLovTypeId(AccessWebServiceConstant.LOV_TYPE_STATUS);			    
			    criteria.setSearchCols(searchCol);
			    copyproperties(criteria);
			    setSearchFilter(criteria);
			    IMCO_PWS_TMPLT_MASTERVO imcoPwsTmpltMasterVO = new IMCO_PWS_TMPLT_MASTERVO();
			    imcoPwsTmpltMasterVO.setTEMPLATE_ID(criteria.getTempID());
			    statusList = returnCommonLibBO().generateStatusList(imcoPwsTmpltMasterVO, colList, lovCriteria);
			    setGridModel(statusList);
		  }
		  catch(Exception e)
		  {
			  super.handleException(e, null, null);
		  }
		return "success";		  
	  }
	  
	  public Object getModel()
	  {
		  return criteria;
	  }

	public AccessWebServiceSC getCriteria() {
		return criteria;
	}

	public void setCriteria(AccessWebServiceSC criteria) {
		this.criteria = criteria;
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
}
