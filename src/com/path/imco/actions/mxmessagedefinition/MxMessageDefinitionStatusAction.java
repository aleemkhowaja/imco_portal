package com.path.imco.actions.mxmessagedefinition;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletContext;
import org.apache.struts2.ServletActionContext;
import com.path.atm.bo.atminterface.AtmInterfaceConstants;
import com.path.dbmaps.vo.DGTL_MSG_DEFVO;
import com.path.imco.bo.common.ImcoCommonConstants;
import com.path.imco.vo.mxmessagedefinition.MxMessageDefinitionSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.status.StatusAddFieldCO;
import com.path.vo.common.status.StatusCO;

/**
 * 
 * Copyright 2020, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Alim Khowaja
 *
 * ATMInterfaceStatusAction.java used to
 */
public class MxMessageDefinitionStatusAction extends GridBaseAction 
{
	private MxMessageDefinitionSC criteria = new MxMessageDefinitionSC();
	private String url;
	private List<StatusAddFieldCO> addFields;

	/**
	 * Method to Search status for a Record
	 * 
	 * @return
	 */
	public String search() 
	{
		try 
		{
			ServletContext application = ServletActionContext.getServletContext();
			String theRealPath = application.getContextPath();

			url = theRealPath
					+ "/path/mxmessagedefinition/MxMessageDefinitionStatusAction_loadStatusGrid.action?mxMsgDefinitionId="
					+ criteria.getMxMsgDefinitionId();
			addFields = new ArrayList<StatusAddFieldCO>();
		} catch (Exception ex) 
		{
			handleException(ex, null, null);
			return ERROR_ACTION;
		}
		return "SUCCESS_STATUS";
	}

	/**
	 * Method to load the Status Grid
	 * 
	 * @return
	 */
	public String loadStatusGrid() {
		String[] searchCol = { "userName", "status_desc", "status_date" };
		DGTL_MSG_DEFVO dgtl_MSG_DEFVO = new DGTL_MSG_DEFVO();
		try 
		{
			SessionCO sessionCO = returnSessionObject();
			criteria.setSearchCols(searchCol);

			copyproperties(criteria);

			List<String> colList = AtmInterfaceConstants.atmInterfaceStatusLst;
			SelectSC lovCriteria = new SelectSC();
			lovCriteria.setLanguage(sessionCO.getLanguage());
			lovCriteria.setLovTypeId(ImcoCommonConstants.IMCO_COMMON_STATUS_LOV);
			lovCriteria.setCompCode(sessionCO.getCompanyCode());

			dgtl_MSG_DEFVO.setDGTL_MSG_DEF_ID(criteria.getMxMsgDefinitionId());
			List<StatusCO> resultList = returnCommonLibBO().generateStatusList(dgtl_MSG_DEFVO, colList, lovCriteria);
			setGridModel(resultList);
		} catch (Exception ex) 
		{
			handleException(ex, null, null);
		}
		return SUCCESS;
	}

	public Object getModel() {
		return criteria;
	}

	public MxMessageDefinitionSC getCriteria() {
		return criteria;
	}

	public void setCriteria(MxMessageDefinitionSC criteria) {
		this.criteria = criteria;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<StatusAddFieldCO> getAddFields() {
		return addFields;
	}

	public void setAddFields(List<StatusAddFieldCO> addFields) {
		this.addFields = addFields;
	}
}