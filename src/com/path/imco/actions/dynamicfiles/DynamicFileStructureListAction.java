package com.path.imco.actions.dynamicfiles;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import com.path.bo.common.ConstantsCommon;
import com.path.imco.bo.common.ImcoCommonConstants;
import com.path.imco.bo.dynamicfiles.DynamicFileStructureBO;
import com.path.imco.vo.dynamicfiles.DynamicFileStructureCO;
import com.path.imco.vo.dynamicfiles.DynamicFileStructureSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;
/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * DynamicFileStructureListAction.java used to
 */
public class DynamicFileStructureListAction extends GridBaseAction
{
	private DynamicFileStructureBO dynamicFileStructureBO;
	private DynamicFileStructureSC criteria = new DynamicFileStructureSC();
	private BigDecimal dynamicFileStructureId;
	
	public Object getModel()
	{
		return criteria;
	}
	
	public DynamicFileStructureSC getCriteria()
	{
		return criteria;
	}
	
	public void setCriteria(DynamicFileStructureSC criteria)
	{
		this.criteria = criteria;
	}
	
	public void setDynamicFileStructureBO(DynamicFileStructureBO dynamicFileStructureBO)
	{
		this.dynamicFileStructureBO = dynamicFileStructureBO;
	}

	public BigDecimal getDynamicFileStructureId() 
	{
		return dynamicFileStructureId;
	}

	public void setDynamicFileStructureId(BigDecimal dynamicFileStructureId) 
	{
		this.dynamicFileStructureId = dynamicFileStructureId;
	}

	/**
	 * Load File Structure Grid
	 */
	public String loadDynamicFileStructureGrid()
	{
		try
		{
			copyproperties(criteria);
			List<DynamicFileStructureCO> dynamicFileEditorCOs = new ArrayList<DynamicFileStructureCO>();
			criteria.setStatus(ImcoCommonConstants.STATUS_ACTIVE);
			if(checkNbRec(criteria))
			{
				setRecords(dynamicFileStructureBO.returnDynamicFileStructureListCount(criteria));
			}
			dynamicFileEditorCOs = dynamicFileStructureBO.returnDynamicFileStructureList(criteria);
			setGridModel(dynamicFileEditorCOs);
		}
		catch(Exception e)
		{
			handleException(e, null, null);
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
	/**
	 * Load TXT Message Grid
	 */
	public String loadDynamicTextFileStructureMessageGrid()
	{
		try
		{
			SessionCO sessionCO = returnSessionObject();
			copyproperties(criteria);
			List<DynamicFileStructureCO> dynamicFileEditorCOs = new ArrayList<DynamicFileStructureCO>();
			if(dynamicFileStructureId != null && criteria.getFileType().equalsIgnoreCase("txt"))
			{
				criteria.setDynamicStructureFileId(dynamicFileStructureId);
				if(checkNbRec(criteria))
				{
					setRecords(dynamicFileStructureBO.returnDynamicFileStructureMessageListCount(criteria));
				}
				dynamicFileEditorCOs = dynamicFileStructureBO.returnDynamicTextFileStructureMessageList(criteria);
			}
			setGridModel(dynamicFileEditorCOs);
		}
		catch(Exception e)
		{
			handleException(e, null, null);
		}
		return SUCCESS;
	}	

		
	/**
	 * Load XML Messages Grid
	 */
	public String loadDynamicXmlFileStructureMessageGrid()
	{
		try
		{
			if(criteria.getDynamicStructureFileId() != null && !ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(criteria.getDynamicStructureFileId())
					&& "xml".equalsIgnoreCase(criteria.getFileType()))
			{
				copyproperties(criteria);
				criteria.setStatus(ImcoCommonConstants.STATUS_ACTIVE);
				setGridModel(dynamicFileStructureBO.returnDynamicXmlFileStructureMessageList(criteria));
			}
		}
		catch(Exception e)
		{
			handleException(e, null, null);
		}
		return SUCCESS;
	}
}
