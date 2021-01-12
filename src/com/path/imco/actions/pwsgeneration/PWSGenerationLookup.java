/**
 * PWSGenerationLookup.java - Oct 31, 2018  
 *
 * Copyright 2018, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Raed Saad
 *
 */
package com.path.imco.actions.pwsgeneration;

import com.path.imco.bo.pwsgeneration.PWSGenerationBO;
import com.path.imco.vo.pwsgeneration.PWSGenerationSC;
import com.path.lib.vo.LookupGrid;
import com.path.struts2.lib.common.base.LookupBaseAction;

public class PWSGenerationLookup extends LookupBaseAction{
	private PWSGenerationSC pwsGenerationSC = new PWSGenerationSC();
    private PWSGenerationBO pwsGenerationBO;
    
	public Object getModel() 
	{
		return returnBaseModel(pwsGenerationSC);
	}

	public String constructLookupIrpConnections() {
		try {
			String[] name = { "connId", "connDesc", "dbms","url" };
			String[] colType = { "number", "text", "text", "text" };
			String[] titles = { getText("Connection ID"), getText("Desc"), getText("DBMS"), getText("URL") };
			LookupGrid grid = new LookupGrid();
			grid.setCaption(getText("connection"));
			grid.setRowNum("5");
			grid.setShrinkToFit("true");
			grid.setUrl("/path/PWSGeneration/PWSGenerationLookup_fillLookupIrpConnections");
			lookup(grid, pwsGenerationSC, name, colType, titles);
		} 
		catch (Exception e)
		{
			handleException(e, null, null);
		}
		return SUCCESS;
	}
	
	public String fillLookupIrpConnections() 
	{
		try {
			setSearchFilter(pwsGenerationSC);
			copyproperties(pwsGenerationSC);
			if (getRecords() == 0) 
			{
				setRecords(pwsGenerationBO.returnIRPConnectionCount(pwsGenerationSC));
			}
			setGridModel(pwsGenerationBO.loadIRPConnectionList(pwsGenerationSC));
		}
		catch (Exception e)
		{
			handleException(e, null, null);
		}
		return SUCCESS;
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
}
