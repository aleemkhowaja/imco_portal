package com.path.imco.actions.entities;

import com.path.bo.common.audit.AuditConstant;
import com.path.imco.bo.entities.EntitiesBO;
import com.path.imco.vo.entities.EntitiesCO;
import com.path.imco.vo.entities.EntitiesSC;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.audit.AuditRefCO;
/**
 *
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source cod
 *
 * EntitiesMaintAction.java used to
 */
public class EntitiesMaintAction extends BaseAction
{
    private EntitiesBO entitiesBO;
    private EntitiesCO entitiesCO = new EntitiesCO();
    private EntitiesSC entitiesSC = new EntitiesSC();
    public String loadEntitiesPage()
    {
	try
	{
	    set_searchGridId("entitiesListGridTbl_Id");
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "entitiesList";
    }

    public String loadMaintanenceDetails()
    {

	try
	{
	    if(entitiesCO.getSyncEntityVO() == null)


	    {
		// // HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> elementMap =
		// // applySysParamSettings();
		// // setAdditionalScreenParams(elementMap);
		//
	    }

	    else
	    {

		entitiesSC.setEntityCode(entitiesCO.getSyncEntityVO().getENTITY_CODE());

		entitiesCO = entitiesBO.returnEntitiesDetails(entitiesSC);
		applyRetrieveAudit(AuditConstant.SYNC_ENTITY_KEY, entitiesCO.getSyncEntityVO(), entitiesCO);

	    }
	}

	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return "entityMaint";

    }

    public String saveNew()
    {

	try
	{
	    // entitiesCO.setAuditRefCO(refCO);

	    AuditRefCO refCO = initAuditRefCO();
	    refCO.setKeyRef(AuditConstant.SYNC_ENTITY_KEY);
	    refCO.setOperationType(AuditConstant.UPDATE);
	    entitiesCO.setAuditObj(returnAuditObject(entitiesCO.getClass()));
	    entitiesCO.setAuditRefCO(refCO);
	    entitiesCO = entitiesBO.saveNew(entitiesCO);
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;

    }

    public void setEntitiesBO(EntitiesBO entitiesBO)
    {
	this.entitiesBO = entitiesBO;
    }

    public EntitiesCO getEntitiesCO()
    {
	return entitiesCO;
    }

    public void setEntitiesCO(EntitiesCO entitiesCO)
    {
	this.entitiesCO = entitiesCO;
    }

    public EntitiesSC getEntitiesSC()
    {
	return entitiesSC;
    }

    public void setEntitiesSC(EntitiesSC entitiesSC)
    {
	this.entitiesSC = entitiesSC;
    }
}
