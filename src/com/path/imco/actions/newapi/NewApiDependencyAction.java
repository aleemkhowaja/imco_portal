package com.path.imco.actions.newapi;

import java.util.List;

import com.path.bo.common.MessageCodes;
import com.path.imco.bo.newapi.NewApiBO;
import com.path.imco.vo.newapi.NewApiCO;
import com.path.imco.vo.newapi.NewApiSC;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.lib.common.base.BaseAction;

public class NewApiDependencyAction extends BaseAction {
	
	private NewApiBO newApiBO;
	private NewApiSC criteria = new NewApiSC();
	private NewApiCO newapiCO = new NewApiCO();

	public String checkProcNameDep() {
		try {

			if (!"".equalsIgnoreCase(StringUtil.nullToEmpty(
					newapiCO.getImImalApiVO().getPROCEDURE_NAME()).trim())) {

				List<NewApiCO> ListParamNewApiCO = newApiBO.returnNewApiParams(newapiCO);

				if (ListParamNewApiCO.isEmpty()) {
					newapiCO.getImImalApiVO().setPROCEDURE_NAME(null);
					newapiCO.getImImalApiVO().setDESCRIPTION(null);
					throw new BOException(MessageCodes.MISSING_PROCEDURE_NAME);
				}
			}
		} catch (Exception e) {
			handleException(e, null, null);
		}

		return SUCCESS;
	}

	public void setNewApiBO(NewApiBO newApiBO) {
		this.newApiBO = newApiBO;
	}

	public NewApiSC getCriteria() {
		return criteria;
	}

	public void setCriteria(NewApiSC criteria) {
		this.criteria = criteria;
	}

	public NewApiCO getNewapiCO() {
		return newapiCO;
	}

	public void setNewapiCO(NewApiCO newapiCO) {
		this.newapiCO = newapiCO;
	}
	
}
