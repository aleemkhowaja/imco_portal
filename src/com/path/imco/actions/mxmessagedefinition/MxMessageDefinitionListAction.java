package com.path.imco.actions.mxmessagedefinition;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.path.imco.bo.common.ImcoCommonConstants;
import com.path.imco.bo.mxmessagedefinition.MxMessageDefinitionBO;
import com.path.imco.vo.mxmessagedefinition.MxMessageDefinitionCO;
import com.path.imco.vo.mxmessagedefinition.MxMessageDefinitionSC;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;
/**
 * 
 * Copyright 2020, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * MxMessageDefinitionListAction.java used to
 */
public class MxMessageDefinitionListAction extends GridBaseAction
{
	private MxMessageDefinitionBO mxMessageDefinitionBO;
	private MxMessageDefinitionSC  criteria = new MxMessageDefinitionSC();
	private BigDecimal mxMessageDefinitionId;
	
	/**
	 * Load File Structure Grid
	 */
	public String loadMxMessageDefinitionGrid()
	{
		try
		{
			SessionCO sessionCO = returnSessionObject();
			String[] searchCol = { "DGTL_MSG_DEF_ID", "BRIEF_NAME", "statusDesc","CREATED_DATE"};
			criteria.setSearchCols(searchCol);
			    
			HashMap<String, String> dateSearchCol = new HashMap<String, String>();
			 
			dateSearchCol.put("CREATED_DATE", "CREATED_DATE");
			criteria.setDateSearchCols(dateSearchCol);
			    
			copyproperties(criteria);
			
			List<MxMessageDefinitionCO> mxMessageDefinitionCOs = new ArrayList<MxMessageDefinitionCO>();
			
			criteria.setStatus(ImcoCommonConstants.STATUS_ACTIVE);
			criteria.setCurrAppName(sessionCO.getCurrentAppName());
			criteria.setPreferredLanguage(sessionCO.getLanguage());
			criteria.setLovTypeId(ImcoCommonConstants.IMCO_COMMON_STATUS_LOV);
			criteria.setCrudMode(getIv_crud());
		    criteria.setPageRef(get_pageRef());
		    
			if(checkNbRec(criteria))
			{
				setRecords(mxMessageDefinitionBO.returnMxMessageDefinitionListCount(criteria));
			}
			mxMessageDefinitionCOs = mxMessageDefinitionBO.returnMxMessageDefinitionList(criteria);
			setGridModel(mxMessageDefinitionCOs);
		}
		catch(Exception e)
		{
			handleException(e, null, null);
			e.printStackTrace();
		}
		return SUCCESS;
	}
	
//	/**
//	 * Load TXT Message Grid
//	 */
//	public String loadDynamicTextFileStructureMessageGrid()
//	{
//		try
//		{
//			SessionCO sessionCO = returnSessionObject();
//			copyproperties(criteria);
//			List<DynamicFileStructureCO> dynamicFileEditorCOs = new ArrayList<DynamicFileStructureCO>();
//			if(dynamicFileStructureId != null && criteria.getFileType().equalsIgnoreCase("txt"))
//			{
//				criteria.setDynamicStructureFileId(dynamicFileStructureId);
//				if(checkNbRec(criteria))
//				{
//					setRecords(dynamicFileStructureBO.returnDynamicFileStructureMessageListCount(criteria));
//				}
//				dynamicFileEditorCOs = dynamicFileStructureBO.returnDynamicTextFileStructureMessageList(criteria);
//			}
//			setGridModel(dynamicFileEditorCOs);
//		}
//		catch(Exception e)
//		{
//			handleException(e, null, null);
//		}
//		return SUCCESS;
//	}	

		
	/**
	 * Load XML Messages Grid
	 */
//	public String loadDynamicXmlFileStructureMessageGrid()
//	{
//		try
//		{
//			if(criteria.getDynamicStructureFileId() != null && !ConstantsCommon.EMPTY_BIGDECIMAL_VALUE.equals(criteria.getDynamicStructureFileId())
//					&& "xml".equalsIgnoreCase(criteria.getFileType()))
//			{
//				copyproperties(criteria);
//				criteria.setStatus(ImcoCommonConstants.STATUS_ACTIVE);
//				setGridModel(dynamicFileStructureBO.returnDynamicXmlFileStructureMessageList(criteria));
//			}
//		}
//		catch(Exception e)
//		{
//			handleException(e, null, null);
//		}
//		return SUCCESS;
//	}
	
	public Object getModel()
	{
		return criteria;
	}
	
	public MxMessageDefinitionSC getCriteria()
	{
		return criteria;
	}
	
	public void setCriteria(MxMessageDefinitionSC criteria)
	{
		this.criteria = criteria;
	}
	
	public void setMxMessageDefinitionBO(MxMessageDefinitionBO mxMessageDefinitionBO)
	{
		this.mxMessageDefinitionBO = mxMessageDefinitionBO;
	}

	public BigDecimal getMxMessageDefinitionId() 
	{
		return mxMessageDefinitionId;
	}

	public void setMxMessageDefinitionId(BigDecimal mxMessageDefinitionId) 
	{
		this.mxMessageDefinitionId = mxMessageDefinitionId;
	}
}
