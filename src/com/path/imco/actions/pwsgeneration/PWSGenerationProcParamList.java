/**
 * PWSGenerationProcParamList.java - Oct 24, 2018  
 *
 * Copyright 2018, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Raed Saad
 *
 */
package com.path.imco.actions.pwsgeneration;

import java.math.BigDecimal;
import java.util.List;

import com.path.imco.bo.pwsgeneration.PWSGenerationBO;
import com.path.imco.vo.pwsgeneration.PWSGenerationCO;
import com.path.imco.vo.pwsgeneration.PWSGenerationSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;

public class PWSGenerationProcParamList extends GridBaseAction{
	private String gridId;
	private PWSGenerationCO pwsGenerationCO;
	private PWSGenerationSC pwsGenerationSC;
	private PWSGenerationBO pwsGenerationBO;
	private List<PWSGenerationCO> pwsGenerationListCO;
	
	@Override
	public Object getModel() {
		return pwsGenerationSC;
	}
	
	/**
	 * load procedure arguments
	 * @return
	 */
	public String loadProcedureArguments()
	{
		String[] searchCol = {"ARGUMENT_NAME","ARGTYPEDESC"};
		try{
			if(null != this.getPwsGenerationCO() && null != this.getPwsGenerationCO().getAdapterIdSequence())
			{
				BigDecimal operationId = this.getPwsGenerationCO().getAdapterIdSequence();
				List<PWSGenerationCO> pwsGenLst = null;
				pwsGenLst = pwsGenerationBO.returnSavedProcedureArguments(this.getPwsGenerationCO());
				setGridModel(pwsGenLst);
			}
			else if(null != pwsGenerationSC && pwsGenerationSC.getProcedureName() != null)
			{
				if (checkNbRec(pwsGenerationSC))
				{
					setRecords(pwsGenerationBO.returnProcedureArgumentsCount(pwsGenerationSC));
				}
				pwsGenerationListCO = pwsGenerationBO.loadProcedureArguments(pwsGenerationSC);
				setGridModel(pwsGenerationListCO);
			}
		}
		catch(Exception e)
		{
			handleException(e, null, null);
		}
		return "success";
	}
	/**
	 * 
	 * @return
	 */
	public String loadProcedureArgumentsSavedData()
	{
		try{
			BigDecimal operationId = this.getPwsGenerationCO().getAdapterIdSequence();
			List<PWSGenerationCO> pwsGenLst = null;
			if(null != operationId)
			{
				pwsGenLst = pwsGenerationBO.returnSavedProcedureArguments(this.getPwsGenerationCO());
				setGridModel(pwsGenLst);
			}
		}
		catch(Exception e)
		{
			handleException(e, null, null);
		}
		return "success";
	}

	public String getGridId() {
		return gridId;
	}

	public void setGridId(String gridId) {
		this.gridId = gridId;
	}

	public PWSGenerationCO getPwsGenerationCO() {
		return pwsGenerationCO;
	}

	public void setPwsGenerationCO(PWSGenerationCO pwsGenerationCO) {
		this.pwsGenerationCO = pwsGenerationCO;
	}

	public PWSGenerationSC getPwsGenerationSC() {
		return pwsGenerationSC;
	}

	public void setPwsGenerationSC(PWSGenerationSC pwsGenerationSC) {
		this.pwsGenerationSC = pwsGenerationSC;
	}
	public void setPwsGenerationBO(PWSGenerationBO pwsGenerationBO) {
		this.pwsGenerationBO = pwsGenerationBO;
	}

	public List<PWSGenerationCO> getPwsGenerationListCO() {
		return pwsGenerationListCO;
	}

	public void setPwsGenerationListCO(List<PWSGenerationCO> pwsGenerationListCO) {
		this.pwsGenerationListCO = pwsGenerationListCO;
	}
}
