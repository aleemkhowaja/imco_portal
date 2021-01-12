package com.path.imco.actions.dynamicfiles;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.path.bo.common.ConstantsCommon;
import com.path.bo.common.MessageCodes;
import com.path.dbmaps.vo.SYS_PARAM_SCREEN_DISPLAYVO;
import com.path.imco.bo.common.ImcoCommonConstants;
import com.path.imco.bo.dynamicfiles.DynamicFileStructureBO;
import com.path.imco.vo.dynamicfiles.DynamicFileStructureCO;
import com.path.imco.vo.dynamicfiles.DynamicFileStructureSC;
import com.path.lib.common.exception.BOException;
import com.path.lib.common.util.StringUtil;
import com.path.lib.vo.GridUpdates;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectCO;
/**
 * 
 * Copyright 2013, Path Solutions
 * Path Solutions retains all ownership rights to this source code 
 * 
 * DynamicFileStructureMaintAction.java used to
 */
public class DynamicFileStructureMaintAction extends BaseAction
{
	private DynamicFileStructureCO dynamicFileStructureCO;
	private DynamicFileStructureBO dynamicFileStructureBO;
	private String textEditorMessageGridData;
	private String textEditorTagGridData;
	private List<SelectCO> textEditorJobList = new ArrayList<SelectCO>();
	private DynamicFileStructureSC criteria = new  DynamicFileStructureSC();
	private String updates;
//	private WebServiceExplorerGridParamCO webServiceExplorerGridParamCO = new WebServiceExplorerGridParamCO();
	
	public String getUpdates()
	{
		return updates;
	}
	
	public DynamicFileStructureSC getCriteria()
	{
		return criteria;
	}

	public void setCriteria(DynamicFileStructureSC criteria)
	{
		this.criteria = criteria;
	}

	public void setUpdates(String updates)
	{
		this.updates = updates;
	}

	public void setDynamicFileStructureBO(DynamicFileStructureBO dynamicFileStructureBO)
	{
		this.dynamicFileStructureBO = dynamicFileStructureBO;
	}

	public DynamicFileStructureCO getDynamicFileStructureCO() 
	{
		return dynamicFileStructureCO;
	}

	public void setDynamicFileStructureCO(DynamicFileStructureCO dynamicFileStructureCO) 
	{
		this.dynamicFileStructureCO = dynamicFileStructureCO;
	}

	public String getTextEditorMessageGridData() 
	{
		return textEditorMessageGridData;
	}

	public void setTextEditorMessageGridData(String textEditorMessageGridData) 
	{
		this.textEditorMessageGridData = textEditorMessageGridData;
	}

	public String getTextEditorTagGridData()
	{
		return textEditorTagGridData;
	}

	public void setTextEditorTagGridData(String textEditorTagGridData)
	{
		this.textEditorTagGridData = textEditorTagGridData;
	}

	public List<SelectCO> getTextEditorJobList() 
	{
		return textEditorJobList;
	}

	public void setTextEditorJobList(List<SelectCO> textEditorJobList) 
	{
		this.textEditorJobList = textEditorJobList;
	}
	
	/*public WebServiceExplorerGridParamCO getWebServiceExplorerGridParamCO()
	{
	    return webServiceExplorerGridParamCO;
	}

	public void setWebServiceExplorerGridParamCO(WebServiceExplorerGridParamCO webServiceExplorerGridParamCO)
	{
	    this.webServiceExplorerGridParamCO = webServiceExplorerGridParamCO;
	}*/
	
	public String openMultiMappingDialog()
	{
		return "openMultiMappingDialog";
	}
	
   /**
    * Load Dyanamic File Structure Page
    */
    public String loadDynamicFileStructurePage()
    {
	try
	{
	    // mandatory step
//	    WebServiceUtil webServiceUtil = new WebServiceUtil();
//	    // passing the grid action name defined in struts
//	    // ex:webServiceExlorerList_*
//	    webServiceExplorerGridParamCO = webServiceUtil
//		    .returnGridParamCO(DynamicFileStructureConstants.WEB_SERVICE_EXPLORER_LIST_ACTION_NAME);
//
//	    String subGridActionRef = webServiceExplorerGridParamCO.getSubGridActionRef() + "?iv_crud="
//		    + this.getIv_crud();
//
//	    String mainGridActionRef = webServiceExplorerGridParamCO.getMainGridActionRef() + "?iv_crud="
//		    + this.getIv_crud();
//
//	    webServiceExplorerGridParamCO.setSubGridActionRef(subGridActionRef);
//	    webServiceExplorerGridParamCO.setMainGridActionRef(mainGridActionRef);
//	    webServiceExplorerGridParamCO.setScreenNameSpace(DynamicFileStructureConstants.WEB_SERVICE_EXPLORER_SCREEN_NAME_SPACE+"/");
	    dynamicFileStructureCO = new DynamicFileStructureCO();
	    set_searchGridId("dynamicFileStructureListGridTbl_Id");
	    set_showNewInfoBtn("true");
	    set_showSmartInfoBtn("false");
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "dynamicFileStructureList";
    }
	
	/**
	 * Method to Save and Update DynamicFilesTextEditor
	 * @return 
	 */
    public String saveDynamicFileStructure() 
    {
		try
		{
			applySessionValues();
			
			if(dynamicFileStructureCO.getDyn_FILE_STRUCTUREVO() != null && dynamicFileStructureCO.getDyn_FILE_STRUCTUREVO().getFILE_TYPE().equalsIgnoreCase("txt"))
			{
				HashMap<String,Object> GridsDataMap= new HashMap<String, Object>();
				List messageListAdd = null;
				List messageListModify = null;
				List messageListDelete = null;
				
				//get data from group coa grid
				if(StringUtil.isNotEmpty(textEditorMessageGridData))
				{
					GridUpdates messageGridUpdates = getGridUpdates(textEditorMessageGridData, DynamicFileStructureCO.class);
					 
					messageListAdd    =    messageGridUpdates.getLstAdd();
					messageListModify =    messageGridUpdates.getLstModify();
					messageListDelete =    messageGridUpdates.getLstDelete();
				}
				GridsDataMap.put("messageAdd", messageListAdd);
				GridsDataMap.put("messageModify", messageListModify);
				GridsDataMap.put("messageDelete", messageListDelete);
				dynamicFileStructureCO = dynamicFileStructureBO.saveDynamicTextFileStructure(dynamicFileStructureCO, GridsDataMap);
			}
			else if(dynamicFileStructureCO.getDyn_FILE_STRUCTUREVO() != null && dynamicFileStructureCO.getDyn_FILE_STRUCTUREVO().getFILE_TYPE().equalsIgnoreCase("xml"))
			{
				List lstAll = new ArrayList();
				List lstDelete = new ArrayList();
				
			    //get data from message and tag grids
				if(StringUtil.isNotEmpty(dynamicFileStructureCO.getXmlMessagesGridData()))
				{
					dynamicFileStructureCO.setXmlMessagesGridData(dynamicFileStructureCO.getXmlMessagesGridData().replace("}]},", "}]}"));
					dynamicFileStructureCO.getDyn_FILE_STRUCTUREVO().setFILE_SAMPLE(dynamicFileStructureCO.getDyn_FILE_STRUCTUREVO().getFILE_SAMPLE().replace(">,", ">"));

					GridUpdates gridAllData = getGridUpdates(dynamicFileStructureCO.getXmlMessagesGridData(), DynamicFileStructureCO.class, true);
					lstAll = gridAllData.getLstAllRec();
				}
				if(StringUtil.isNotEmpty(dynamicFileStructureCO.getXmlMsgGridChangedData()))
				{
					GridUpdates gridUpdates = getGridUpdates(dynamicFileStructureCO.getXmlMsgGridChangedData(), DynamicFileStructureCO.class, true);
					lstDelete = gridUpdates.getLstAllRec();
				}
				dynamicFileStructureCO = dynamicFileStructureBO.saveDynamicXmlFileStructure(dynamicFileStructureCO, lstAll, lstDelete);
				dynamicFileStructureCO = new DynamicFileStructureCO();
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		    handleException(e, null, null);
		}
		return SUCCESS;
    }
 
    /**
     * Method to delete Dynamic File Structure
     * @return String
     */
    public String deleteDynamicFileStructure()
    {
    	try
    	{
    		applySessionValues();
    		dynamicFileStructureBO.deleteDynamicFileStructure(dynamicFileStructureCO);
    	}
    	catch(Exception e)
    	{
    	    handleException(e, null, null);
    	}
    	return SUCCESS;
    }
        
    /**
   	 * Method to load File Definition Details
   	 * @return 
   	 */
    public String loadDynamicFileStructure()
    {
		try
		{
		    SessionCO sessionCO = returnSessionObject();
		    criteria.setDynamicStructureFileId(dynamicFileStructureCO.getDyn_FILE_STRUCTUREVO().getFILE_STRUCTURE_ID());
		    criteria.setCurrAppName(sessionCO.getCurrentAppName());
		   // criteria.setPageRef(get_pageRef());
		    criteria.setLovTypeId(ImcoCommonConstants.LOV_TYPE_CONS_COMMON_STATUS);
		    criteria.setCrudMode(getIv_crud());
		    criteria.setStatus(ImcoCommonConstants.STATUS_ACTIVE);
		    dynamicFileStructureCO = dynamicFileStructureBO.returnDynamicFileStructureDetails(criteria);
		    if(dynamicFileStructureCO == null)
		    {
		    	 throw new BOException(returnCommonLibBO().returnTranslErrorMessage(MessageCodes.RECORD_CHANGED,sessionCO.getLanguage()));
			}
		   		    
		 // Making Fields Read only
		    HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO> hm = new HashMap<String, SYS_PARAM_SCREEN_DISPLAYVO>();
		    SYS_PARAM_SCREEN_DISPLAYVO buisnessElement = new SYS_PARAM_SCREEN_DISPLAYVO();
		    buisnessElement.setIS_READONLY(BigDecimal.ONE);
		    
		    hm.put("file_reference_", buisnessElement);
		    setAdditionalScreenParams(hm);
		   
		    dynamicFileStructureCO.setMode(ConstantsCommon.UPDATE_MODE);
		}
		catch(Exception ex)
		{
			ex.printStackTrace();
		    handleException(ex, null, null);
		    return "success";
		}
		return "dynamicStructureFileMaint";
    }
        
    /**
   	 * Method to empty File Definition Form
   	 * @return 
   	 */
    public String dynamicFileStructureEmptyForm()
    {
		try
		{
			dynamicFileStructureCO = new DynamicFileStructureCO();
		}
		catch(Exception e)
		{
		    handleException(e, null, null);
		}
		return "dynamicStructureFileMaint";
    }
    
    /**
	* Method to Check Reference Duplication
	* @return
	*/
	public String checkRefUnique()
	{
		try 
		{
			criteria.setStatus(ImcoCommonConstants.STATUS_ACTIVE);
			criteria.setFileReference(criteria.getFileReference().toUpperCase().trim());
			int count = dynamicFileStructureBO.checkFileRefUnique(criteria);
			if(count > 0)
			{
			    updates = "1";
			}
		} catch (Exception e) 
		{
			handleException(e, null, null);
		}
		return SUCCESS;
	}
    
    /**
   	 * Method to Apply Session values
   	 * @return 
   	 */
    private void applySessionValues()
    {
		SessionCO sessionCO = returnSessionObject();
		dynamicFileStructureCO.setCompCode(sessionCO.getCompanyCode());
		dynamicFileStructureCO.setUserId(sessionCO.getUserName());
		dynamicFileStructureCO.setRunningDate(sessionCO.getRunningDateRET());
    }
}
