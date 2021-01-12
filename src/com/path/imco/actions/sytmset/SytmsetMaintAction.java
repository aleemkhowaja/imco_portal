package com.path.imco.actions.sytmset;

import java.io.IOException;

import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.audit.AuditConstant;
import com.path.imco.bo.sytmset.SytmsetBO;
import com.path.imco.vo.sytmset.SytmsetCO;
import com.path.lib.common.exception.BaseException;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.audit.AuditRefCO;

/**
 *
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 *
 * SytmsetMaintAction.java used to
 */
public class SytmsetMaintAction extends BaseAction
{
    private SytmsetBO sytmsetBO;
    private SytmsetCO sytmsetCO = new SytmsetCO();

    public String loadSytmsetPage()
    {
	try
	{
	    set_searchGridId("sytmsetListGridTbl_Id");
	    // set_showNewInfoBtn("true");
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "sytmsetList";
    }

    public void setSytmsetBO(SytmsetBO sytmsetBO)
    {
	this.sytmsetBO = sytmsetBO;
    }

    public String loadMaintanenceDetails()
    {

	try
	{
	    if(sytmsetCO.getSyncBranchVO() == null)
	    {
		// HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> elementMap =
		// applySysParamSettings();
		// setAdditionalScreenParams(elementMap);

	    }

	    else
	    {
		sytmsetCO = sytmsetBO.returnSytmsetDetails(sytmsetCO);
		sytmsetCO.setUpdateMode(ConstantsCommon.YES);
		applyRetrieveAudit(AuditConstant.SYNC_BRANCH_KEY, sytmsetCO.getSyncBranchVO(), sytmsetCO);

	    }

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "sytmMaint";

    }

    public String saveNew()
    {

	try

	{

	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.SYNC_BRANCH_KEY);
	    if(ConstantsCommon.YES.equals(sytmsetCO.getUpdateMode()))

	    {

		refCO.setOperationType(AuditConstant.UPDATE);
		sytmsetCO.setAuditObj(returnAuditObject(sytmsetCO.getClass()));
	    }

	    else
	    {
		refCO.setOperationType(AuditConstant.CREATED);
	    }

	    sytmsetCO.setAuditRefCO(refCO);
	    sytmsetCO = sytmsetBO.saveNew(sytmsetCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;

    }

    public String pingNetwork() throws IOException
    {
	try
	{
	    sytmsetCO = sytmsetBO.pingNetwork(sytmsetCO);
	}
	catch(BaseException e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;

    }

    public String pingDatabase()
    {
	try
	{
	    sytmsetCO = sytmsetBO.pingDatabase(sytmsetCO);
	}
	catch(BaseException e)
	{
	    // TODO Auto-generated catch block
	    handleException(e, null, null);
	}
	return SUCCESS;

    }

    public String pingSendCartridge()
    {
	try
	{
	    sytmsetCO = sytmsetBO.pingSendCartridge(sytmsetCO);
	}
	catch(BaseException e)
	{
	    // TODO Auto-generated catch block
	    handleException(e, null, null);
	}
	return SUCCESS;

    }

    public String pingReciveCartridge()
    {
	try
	{
	    sytmsetCO = sytmsetBO.pingReciveCartridge(sytmsetCO);
	}
	catch(BaseException e)
	{
	    // TODO Auto-generated catch block
	    handleException(e, null, null);
	}
	return SUCCESS;

    }



    public SytmsetBO getSytmsetBO()
    {
	return sytmsetBO;
    }

    public SytmsetCO getSytmsetCO()
    {
	return sytmsetCO;
    }

    public void setSytmsetCO(SytmsetCO sytmsetCO)
    {
	this.sytmsetCO = sytmsetCO;
    }

}
