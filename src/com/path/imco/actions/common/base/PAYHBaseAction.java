package com.path.imco.actions.common.base;

import java.util.ArrayList;
import java.util.List;

import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.audit.AuditConstant;
import com.path.expression.common.PBFunc.BaseException;
import com.path.imco.bo.common.ImcoCommonConstants;
import com.path.imco.vo.common.PAYHBaseCO;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.audit.AuditRefCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;

/**
 * 
 * Copyright 2020, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Alim Khowaja
 *
 * ATMBaseAction.java used to
 */
public class PAYHBaseAction extends BaseAction {
	private PAYHBaseCO payhBaseCO = new PAYHBaseCO();
	private String _recStatus;

	/**
	 * Returns the RGB color for status code
	 *
	 * @param status
	 */
	protected String getStatusColorCode(String status, String space) {
		String colorCode = "";

		if ("A".equals(status)) // Active
		{
			colorCode = ImcoCommonConstants.STATUS_COLOR_CODE_B.equals(space) ? "RGB(000,128,000)" : "RGB(255,255,255)";// GREEN
		} else if ("P".equals(status)) // Approved
		{
			colorCode = ImcoCommonConstants.STATUS_COLOR_CODE_B.equals(space) ? "RGB(000,000,255)" : "RGB(255,255,255)"; // BLUE
		} else if ("CR".equals(status)) // Create new record in maintance screen
		{
			colorCode = ImcoCommonConstants.STATUS_COLOR_CODE_B.equals(space) ? "RGB(31,73,125)" : "RGB(255,255,255)"; // BLUE
		} else // Deleted,Reversed
		{
			colorCode = ImcoCommonConstants.STATUS_COLOR_CODE_B.equals(space) ? "RGB(255,000,000)" : "RGB(255,255,255)";
		}
		return colorCode;

	}

	/**
	 * 
	 * @param atmBaseCO required params set value for runningDate in atmBaseCO set
	 *                  value for particular screen auditKey in atmBaseCO
	 * @return
	 */
	public AuditRefCO fillAuditDetails(PAYHBaseCO payhBaseCO) {
		AuditRefCO refCO = initAuditRefCO();
		try {

			// set Key of particular screen
			refCO.setKeyRef(payhBaseCO.getAuditKey());
			refCO.setRunningDate(payhBaseCO.getRunningDate());

			if (StringUtil.isEmptyString(payhBaseCO.getUpdateMode())
					|| payhBaseCO.getUpdateMode().equals(ConstantsCommon.NO)) {
				refCO.setOperationType(AuditConstant.CREATED);

			}
			// set params for Add Audit
			else {
				refCO.setOperationType(AuditConstant.UPDATE);
				payhBaseCO.setAuditObj(returnAuditObject(payhBaseCO.getClass()));
			}

			payhBaseCO.setAuditRefCO(refCO);
		} catch (Exception e) {
			handleException(e, null, null);
		}
		return refCO;
	}

	/**
	 * common method to fill dropdown
	 * 
	 * @param selSC set lovid from your action and set into argument of selSC
	 * @return
	 */
	public List<SelectCO> fillDropDown(SelectSC selSC) {
		List<SelectCO> dropDownList = new ArrayList<SelectCO>();
		try {
			SessionCO sessionCO = returnSessionObject();
			selSC.setLanguage(sessionCO.getLanguage());
			selSC.setOrderCriteria("ORDER");
			dropDownList.add(new SelectCO("", " "));
			dropDownList.addAll(returnLOV(selSC));
		} catch (Exception ex) {
			handleException(ex, null, null);
		}
		return dropDownList;
	}

	/**
	 * fill common session Data
	 * 
	 * @param atmBaseCO
	 * @throws BaseException
	 */
	public void fillSessionData(PAYHBaseCO payhBaseCO) throws BaseException {
		SessionCO sessionCO = returnSessionObject();
		payhBaseCO.setCompCode(sessionCO.getCompanyCode());
		payhBaseCO.setBranchCode(sessionCO.getBranchCode());
		payhBaseCO.setAppName(sessionCO.getCurrentAppName());
		payhBaseCO.setProgRef(get_pageRef());
		payhBaseCO.setUserID(sessionCO.getUserName());
		payhBaseCO.setLanguage(sessionCO.getLanguage());
		try {
			payhBaseCO.setRunningDate(returnCommonLibBO().addSystemTimeToDate(sessionCO.getRunningDateRET()));
		} catch (com.path.lib.common.exception.BaseException e) {
			handleException(e, null, null);
		}
	}

	/**
	 * load Dialog Page
	 */
	public String returnDialogPage() {
		return payhBaseCO.getPageResult();
	}

	public PAYHBaseCO getAtmBaseCO() {
		return payhBaseCO;
	}

	public void setAtmBaseCO(PAYHBaseCO payhBaseCO) {
		this.payhBaseCO = payhBaseCO;
	}

	public String get_recStatus() {
		return _recStatus;
	}

	public void set_recStatus(String _recStatus) {
		this._recStatus = _recStatus;
	}
}