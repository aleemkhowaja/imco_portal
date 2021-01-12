/**
 * PWSGenerationAdaptersList.java - Nov 15, 2018  
 *
 * Copyright 2018, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Raed Saad
 *
 */
package com.path.imco.actions.pwsgeneration;

import java.util.List;

import com.path.imco.bo.pwsgeneration.PWSGenerationBO;
import com.path.imco.vo.pwsgeneration.PWSGenerationCO;
import com.path.imco.vo.pwsgeneration.PWSGenerationSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;

public class PWSGenerationAdaptersList extends GridBaseAction {
	PWSGenerationSC pwsGenerationSC = new PWSGenerationSC();
	private PWSGenerationBO pwsGenerationBO;
	
	@Override
	public Object getModel() 
	{
		return pwsGenerationSC;
	}
	
	public String loadAdapterListData() 
	{
		try{
			String[] searchCols = {"ADAPTER_ID","APP_NAME","BUSINESS_AREA","BUSINESS_DOMAIN","SERVICE_DOMAIN","VERSION","SERVICE_ID","OPERATION_NAME","SERVICE_NAME","ADAPTER_TYPE","STATUS","API_NAME","CONN_ID","DATE_UPDATED","CREATED_BY","UPDATED_BY","CREATED_DATE","UPDATED_DATE"};
			SessionCO sessionCO = returnSessionObject();
			pwsGenerationSC.setIvCrud(this.getIv_crud());
			pwsGenerationSC.setSearchCols(searchCols);
			copyproperties(pwsGenerationSC);			
			if (checkNbRec(pwsGenerationSC)) 
			{
				setRecords(pwsGenerationBO.returnPWSGenerationAdapterListCount(pwsGenerationSC));
			}		
			List<PWSGenerationCO> lstPWSOperationCO = pwsGenerationBO.returnPWSGenerationAdaptersList(pwsGenerationSC);
			setGridModel(lstPWSOperationCO);
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}

	public void setPwsGenerationBO(PWSGenerationBO pwsGenerationBO) {
		this.pwsGenerationBO = pwsGenerationBO;
	}
}
