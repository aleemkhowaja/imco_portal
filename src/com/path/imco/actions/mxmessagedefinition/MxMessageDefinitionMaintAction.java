package com.path.imco.actions.mxmessagedefinition;

import java.util.ArrayList;
import java.util.List;

import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.audit.AuditConstant;
import com.path.dbmaps.vo.DGTL_XML_MSG_TAGSVO;
import com.path.imco.actions.common.base.PAYHBaseAction;
import com.path.imco.bo.common.ImcoCommonConstants;
import com.path.imco.bo.mxmessagedefinition.MxMessageDefinitionBO;
import com.path.imco.bo.mxmessagedefinition.PrepareXsdTags;
import com.path.imco.vo.mxmessagedefinition.MxMessageDefinitionCO;
import com.path.imco.vo.mxmessagedefinition.MxMessageDefinitionSC;
import com.path.imco.vo.mxmessagedefinition.TagsCo;
import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.common.util.StringUtil;
import com.path.lib.vo.GridUpdates;
import com.path.vo.common.SessionCO;
/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * DynamicFileStructureMaintAction.java used to
 */
public class MxMessageDefinitionMaintAction extends PAYHBaseAction
{
	private  MxMessageDefinitionCO mxMessageDefinitionCO = new MxMessageDefinitionCO();
	private  MxMessageDefinitionBO mxMessageDefinitionBO;
	private  MxMessageDefinitionSC criteria = new  MxMessageDefinitionSC();
	private List<TagsCo> tagsCos = new ArrayList<TagsCo>();
	

   /**
    * Load MX Message Definition Page
    */
    public String loadMxMessageDefinitionPage()
    {
		try
		{
		    set_searchGridId("mxMessageDefinitionGridTbl_Id");
		    set_showNewInfoBtn("true");
		    set_showSmartInfoBtn("false");
		    set_enableAudit(true);
		}
		catch(Exception ex)
		{
		    handleException(ex, null, null);
		}
	return "mxMessageDefinitionList";
    }
    
    
	/**
	 * return Sub Grid Page while clcik the + button of any parent row
	 * @return
	 */
	public String returnSubGridPage()
	{
		mxMessageDefinitionCO.setSubGridId("webServiceGuiSubGridTbl_SubGrid_Id"+mxMessageDefinitionCO.getParentRowId()+"_"+get_pageRef());
		// Set Fields Read only
	    if(ImcoCommonConstants.IV_CRUD_APPROVE.equals(getIv_crud())
		    || ImcoCommonConstants.IV_CRUD_DELETED.equals(getIv_crud())
		    || ImcoCommonConstants.STATUS_APPROVED.equals(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS())
		    || ImcoCommonConstants.STATUS_DELETED.equals(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS()))
	    {
	    	set_recReadOnly(ConstantsCommon.TRUE);
	    }
	    else
	    {
	    	set_recReadOnly(ConstantsCommon.FALSE);
	    }
		return "childRowGrid";
	}
	
	/**
	 * Method to Save and Update MX Message Definition
	 * @return 
	 */
    public String save() 
    {
		try
		{
			/**
			 * Apply Session Values
			 */
			applySessionValues();
			
			/**
			 * parse xsd and get all tags in order to save required tags
			 */
//			MxMessageDefinitionCO co = new MxMessageDefinitionCO();
//			co.getDgtl_MSG_DEFVO().setMSG_SCHEMA(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getMSG_SCHEMA());
//			co.getDgtl_MSG_DEFVO().setDGTL_MSG_DEF_ID(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getDGTL_MSG_DEF_ID());
//			PrepareXsdTags.prepareXsdTags(co);
			
			/**
			 * prepare Mandatory Tags
			 */
//			PrepareXsdTags.prepareMandatoryTags(co);
//			mxMessageDefinitionCO.setMandatorytags(co.getMandatorytags());
			
			/**
			 * prepare Mx Message Tags
			 */
			prepareTagsLis();
			
			
			//call Audit common method
			mxMessageDefinitionCO.setAuditKey(AuditConstant.MX_MSG_DEF_KEY);
		    fillAuditDetails(mxMessageDefinitionCO);
			
			/**
			 * Save record
			 */
			mxMessageDefinitionBO.save(mxMessageDefinitionCO);
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		    handleException(e, null, null);
		}
		return SUCCESS;
    }
 
    /**
     * Prepare Tag List from json to List
     */
    private void prepareTagsLis()
    {
    	
    	
    	/**
    	 * Convert newly selected tags json to list
    	 */
    	String tagsArray[] = mxMessageDefinitionCO.getGridData();
    	List<TagsCo> tagsCos = new ArrayList<TagsCo>();
    	
    	if(tagsArray != null)
    	{
        	for(int i=0; i<tagsArray.length; i++)
        	{
        		GridUpdates guMultiselect = getGridUpdates(tagsArray[i],TagsCo.class, true);
        		tagsCos.addAll(guMultiselect.getLstAllRec());
        	}
    	}
    	
    	
    	/**
    	 * If Selected tags where the parents are non mandatory
    	 */
//    	if(StringUtil.isNotEmpty(mxMessageDefinitionCO.getNonMandatoryParentSelectedRequiredChildsJSON()))
//    	{
//    		GridUpdates guMultiselect = getGridUpdates(mxMessageDefinitionCO.getNonMandatoryParentSelectedRequiredChildsJSON(),TagsCo.class, true);
//    		tagsCos.addAll(guMultiselect.getLstAllRec());
//    	}
    	
    	if(null != tagsCos && tagsCos.size() > 0)
    		mxMessageDefinitionCO.setAllTagsCos(tagsCos);
    	
    }
    
    /**
     * Method to return Mx Message Definition record by id
     * @return
     */
    public String edit()
    {
		try
		{
		    // fill session data
			//applySessionValues();
			SessionCO sessionCO = returnSessionObject();
			
			/**
			 * return Mx Message Definition record by if
			 */
			criteria.setStatus(ConstantsCommon.STATUS_ACTIVE);
			criteria.setLovTypeId(ImcoCommonConstants.IMCO_COMMON_STATUS_LOV);
			criteria.setPreferredLanguage(sessionCO.getLanguage());
			
			/**
			 * return Mx Message Definition record by id
			 */
			mxMessageDefinitionCO = mxMessageDefinitionBO.returnMxMessageDefinitionDetails(criteria);
			
			 //apply Audit for retrieve reecord
			mxMessageDefinitionCO.setUpdateMode(ConstantsCommon.YES);
		    applyRetrieveAudit(AuditConstant.MX_MSG_DEF_KEY, mxMessageDefinitionCO.getDgtl_MSG_DEFVO(), mxMessageDefinitionCO);
			
			/**
			 * set color based on status
			 */
			mxMessageDefinitionCO.setStatusColorCode(getStatusColorCode(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS(),
					ImcoCommonConstants.STATUS_COLOR_CODE_B));
			
		    // Set Fields Read only
		    if(ImcoCommonConstants.IV_CRUD_APPROVE.equals(getIv_crud())
			    || ImcoCommonConstants.IV_CRUD_DELETED.equals(getIv_crud())
			    || (ImcoCommonConstants.STATUS_APPROVED.equals(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS())
			    		&& !ImcoCommonConstants.IV_CRUD_UPDATE_AFTER_APPROVE.equals(getIv_crud())
			    		)
			    || ImcoCommonConstants.STATUS_DELETED.equals(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getSTATUS()))
		    {
		    	set_recReadOnly(ConstantsCommon.TRUE);
		    }
		    else
		    {
		    	set_recReadOnly(ConstantsCommon.FALSE);
		    }
			
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		    return ERROR;
		}
		return "mxMessageDefinitionMaint";
    }

    /**
     * Method to Approve, Reject, Suspend OR Reactivate the ATM Interface
     * 
     * @return
     */
    public String handleStatusProcess()
    {
		try
		{
			/**
			 * Apply Session Values
			 */
		    applySessionValues();
		    
		    /**
		     * Handle Status like approve, delete
		     */
		    mxMessageDefinitionBO.handleStatusProcess(mxMessageDefinitionCO);
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
	return SUCCESS;
    }
    
    
    /**
     * Method to delete MX Message Definition
     * @return String
     */
    public String delete()
    {
    	try
    	{
    		applySessionValues();
    		//mxMessageDefinitionBO.deleteDynamicFileStructure(dynamicFileStructureCO);
    	}
    	catch(Exception e)
    	{
    	    handleException(e, null, null);
    	}
    	return SUCCESS;
    }
        
        
    /**
   	 * Method to empty File Definition Form
   	 * @return 
   	 */
    public String clearForm()
    {
		try
		{
			mxMessageDefinitionCO = new MxMessageDefinitionCO();
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
		return "mxMessageDefinitionMaint";
    }
    
    /**
	* Method to Check Reference Duplication
	* @return
	*/
//	public String checkRefUnique()
//	{
//		try 
//		{
//			criteria.setStatus(ImcoCommonConstants.STATUS_ACTIVE);
//			criteria.setFileReference(criteria.getFileReference().toUpperCase().trim());
//			int count = mxMessageDefinitionBO.checkFileRefUnique(criteria);
//			if(count > 0)
//			{
//			    updates = "1";
//			}
//		} catch (Exception e) 
//		{
//			handleException(e, null, null);
//		}
//		return SUCCESS;
//	}
    
    /**
   	 * Method to Apply Session values
   	 * @return 
   	 */
    private void applySessionValues()
    {
		SessionCO sessionCO = returnSessionObject();
		mxMessageDefinitionCO.setCompCode(sessionCO.getCompanyCode());
		mxMessageDefinitionCO.setUserId(sessionCO.getUserName());
		mxMessageDefinitionCO.setRunningDate(sessionCO.getRunningDateRET());
    }
    
	/**
	 * Upload Xsd File
	 * @return
	 */
	public String uploadXsdFile()
    {
        try {
        	
        	/**
             * Prepare tags from Xsd to Grid
             */
            PrepareXsdTags.prepareXsdTags(mxMessageDefinitionCO);
            
           //  mxMessageDefinitionCO.setAllTagsCo(mxMessageDefinitionCO.getTagsCos());
            /**
             * prepare Tags parent Child
             */
            PrepareXsdTags.prepareTreeTags(mxMessageDefinitionCO);
        }
        catch(Exception ex) 
        {
        	handleException(ex, null, null);
        }
		return SUCCESS;
    }
	
	/**
	 * This Method is used to load tags grid After dbclicking the record from grid 
	 * @return
	 */
	public String loadTagsGridBySchemaAndId()
	{
		try {
			/**
	         * Prepare tags from Xsd to Grid
	         */
	        PrepareXsdTags.prepareXsdTags(mxMessageDefinitionCO);
	        
	        /**
	         * prepare Tags parent Child
	         */
	        PrepareXsdTags.prepareTreeTags(mxMessageDefinitionCO);
	        
	        /**
	         * Return tags saved in database
	         */
	        criteria.setMxMsgDefinitionId(mxMessageDefinitionCO.getDgtl_MSG_DEFVO().getDGTL_MSG_DEF_ID());
	        List<TagsCo> tagsCos = mxMessageDefinitionBO.returnMxMessageDefinitionTagsList(criteria);
	        mxMessageDefinitionCO.setAllTagsCos(tagsCos);
	        
	        
		}
        catch(Exception ex) {
        	ex.printStackTrace();
        	handleException(ex, null, null);
        }
		return SUCCESS;
	}
	
	
    /**
     * Validate Mx Message Definition
     * @return
     * @throws BaseException
     */
    public String validateMxMsgDefinitionCode()
    {
		try
		{
			mxMessageDefinitionCO = mxMessageDefinitionBO.validateMxMsgDefinitionCode(mxMessageDefinitionCO);
		    NumberUtil.resetEmptyValues(mxMessageDefinitionCO);
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
		return SUCCESS;
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

	public MxMessageDefinitionCO getMxMessageDefinitionCO() 
	{
		return mxMessageDefinitionCO;
	}

	public void setMxMessageDefinitionCO(MxMessageDefinitionCO mxMessageDefinitionCO) 
	{
		this.mxMessageDefinitionCO = mxMessageDefinitionCO;
	}
	
	public List<TagsCo> getTagsCos() {
		return tagsCos;
	}


	public void setTagsCos(List<TagsCo> tagsCos) {
		this.tagsCos = tagsCos;
	}

	
}
