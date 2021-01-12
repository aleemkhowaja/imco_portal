package com.path.imco.actions.mxmessagedefinition;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.path.dbmaps.vo.SYS_PARAM_LOV_TRANSVO;
import com.path.dbmaps.vo.SYS_PARAM_SCREEN_DISPLAYVO;
import com.path.imco.bo.common.lookup.ImcoCommonLookupBO;
import com.path.imco.bo.dynamicfiles.DynamicFileStructureConstants;
import com.path.imco.vo.mxmessagedefinition.MxMessageDefinitionCO;
import com.path.struts2.lib.common.base.GridBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;

public class MxMessageDefinitionEditorsAction extends GridBaseAction implements ServletRequestAware, ServletResponseAware {

	protected HttpServletRequest request;
	protected HttpServletResponse response;
	private ImcoCommonLookupBO imcoCommonLookupBO;

	private MxMessageDefinitionCO mxMessageDefinitionCO;
	private String dialogFor;
	private String updates1;
    private String update1;
	
    private List<SelectCO> extractionCriteriaList = new ArrayList<SelectCO>();
	private List<SelectCO> fileStructureList = new ArrayList<SelectCO>();
	private List<SelectCO> textPortionListList = new ArrayList<SelectCO>();
	private List<SelectCO> dataTypeList = new ArrayList<SelectCO>();
	private List<SelectCO> textEditorTextTypeList = new ArrayList<SelectCO>();
	
	//text file editor required fields
	private String dynamicStructureValue = "";
	private File upload;
	private String fileType;
	
	/**
	 * Load Dynamic Files Screen
	 */
	public String loadDynamicFileEditorPage() 
	{
		try 
		{
			mxMessageDefinitionCO = new MxMessageDefinitionCO();
			fillComboBox();
		} catch (Exception ex) {
			handleException(ex, null, null);
		}
		return "DynamicFileEditor";
	}
	
	/**
	 * Load XML Editor
	 */
	public String loadXMLEditorPage() 
	{
		try 
		{
			
		} catch (Exception ex) {
			handleException(ex, null, null);
		}
		return "xmlEditor";
	}
	
	/**
	 * open Tag Dialog
	 * @return
	 * @throws Exception
	 */
	public String openDynamicTextDefinitionDialog()
	{
		SYS_PARAM_SCREEN_DISPLAYVO screenDisplayVO = new SYS_PARAM_SCREEN_DISPLAYVO();
		screenDisplayVO.setIS_VISIBLE(BigDecimal.ZERO);
		screenDisplayVO.setIS_MANDATORY(BigDecimal.ZERO);
		if(dialogFor != null && dialogFor.equals("header"))
		{
			getAdditionalScreenParams().put("lbl_TagName", screenDisplayVO);
			getAdditionalScreenParams().put("tagName", screenDisplayVO);
			getAdditionalScreenParams().put("tagName", screenDisplayVO);
		}
		return "xmlTagDialog";
	}
	
	/** Method called to fill "Extraction Criteria" drop-down */
	public void fillComboBox()
	{
		try
		{
			SessionCO sessionCO = returnSessionObject();
			SelectSC selSC = new SelectSC(DynamicFileStructureConstants.LOV_TYPE_EXTRACTION_CRITERIA);
			selSC.setLanguage(sessionCO.getLanguage());
			selSC.setOrderCriteria("ORDER");
			extractionCriteriaList = returnLOV(selSC);	
		}catch(Exception ex)
		{
		    handleException(ex, null, null);
		}
	}
	
	/** Method called to fill "Debit Credit" drop-down */
    public String initTextEditorJobList()
     {
	 	try
	 	{
	 		SessionCO sessionCO = returnSessionObject();
			SelectSC selSC = new SelectSC(DynamicFileStructureConstants.LOV_TYPE_DATA_TYPE);
			//standardList = returnLOV(selSC);
			selSC.setLanguage(sessionCO.getLanguage());
			selSC.setOrderCriteria("ORDER");
			dataTypeList = returnLOV(selSC);
	 	}
	 	catch(Exception e)
	 	{
	 	    handleException(e, null, null);
	 	}
 		return SUCCESS;
     }
    
    /**
	 * Load XML Expression Dialog
	 */
    public String openXMLExpressionDialog()
	{
		try 
		{

		} 
		catch (Exception ex) 
		{
			handleException(ex, null, null);
		}
		return "tagExpressions";
	}
	
	/**
     * Method that retrieves the data to be showed in the autocomplete (txtarea)
     * @return
     * @throws Exception
     */
    public String retAutoCompleteData() throws Exception
    {
		StringBuffer comparison = new StringBuffer("");
		StringBuffer showHide = new StringBuffer("");
		SessionCO sessionCO = returnSessionObject();
		SYS_PARAM_LOV_TRANSVO sysParamLovVO = new SYS_PARAM_LOV_TRANSVO();
		// < <= > >=
		sysParamLovVO.setLOV_TYPE_ID(new BigDecimal(7));
		sysParamLovVO.setLANG_CODE(sessionCO.getLanguage());
		ArrayList<SYS_PARAM_LOV_TRANSVO> operatorsList = (ArrayList) imcoCommonLookupBO.retLookupList(sysParamLovVO);
		for(int i = 0; i < operatorsList.size(); i++)
		{
		    comparison.append(operatorsList.get(i).getVALUE_DESC() + ";");
		    showHide.append(operatorsList.get(i).getVALUE_DESC() + ";");
		}
		sysParamLovVO.setLOV_TYPE_ID(new BigDecimal(502));
		operatorsList = (ArrayList) imcoCommonLookupBO.retLookupList(sysParamLovVO);
		for(int i = 0; i < operatorsList.size(); i++)
		{
		    comparison.append(operatorsList.get(i).getVALUE_DESC() + ";");
		    showHide.append(operatorsList.get(i).getVALUE_DESC() + ";");
		}

		update1 = showHide.toString();
		updates1 = comparison.toString();
		return SUCCESS;
    }

    /**
	 * Load Messages Grid
	 */
    public String loadMessageGrid()
    {
    	try 
    	{
    		
		} 
    	catch (Exception e) 
    	{
			handleException(e, null, null);
		}
    	return SUCCESS;
    }
    
	/**
	 * Upload text File
	 * @return
	 */
	public String uploadTxtFile()
    {
		dynamicStructureValue = "";
        try {
        	dynamicStructureValue = new String(FileUtils.readFileToByteArray(upload),"utf8");
            // FileReader reads text files in the default encoding.
            /*FileReader fileReader = new FileReader(upload);
            // Always wrap FileReader in BufferedReader.
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            String line = null;
            while((line = bufferedReader.readLine()) != null) {
            	dynamicStructureValue+=line+"\n";
            }
            // Always close files.
            bufferedReader.close();    */     
        }
        catch(Exception ex) {
        	ex.printStackTrace();
        	handleException(ex, null, null);
        }
		return SUCCESS;
    }
	
	/**
	 * open Tag Dialog
	 * @return
	 * @throws Exception
	 */
	public String openDialog()
	{
		mxMessageDefinitionCO = new MxMessageDefinitionCO();
		SYS_PARAM_SCREEN_DISPLAYVO screenDisplayVO = new SYS_PARAM_SCREEN_DISPLAYVO();
		screenDisplayVO.setIS_VISIBLE(BigDecimal.ZERO);
		screenDisplayVO.setIS_MANDATORY(BigDecimal.ZERO);
		fillComboBox();
		if(dialogFor != null && dialogFor.equals("TXT") || dialogFor.equals("CSV"))
		{
			fillComboBox();
			return "textTagDialog";
		}
		return "tagDialog";
	}
	
	
	public ImcoCommonLookupBO getImcoCommonLookupBO()
	{
		return imcoCommonLookupBO;
	}

	public void setImcoCommonLookupBO(ImcoCommonLookupBO imcoCommonLookupBO)
	{
		this.imcoCommonLookupBO = imcoCommonLookupBO;
	}

	public String getDialogFor() 
    {
		return dialogFor;
	}

	public void setDialogFor(String dialogFor) 
	{
		this.dialogFor = dialogFor;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) 
	{
		this.request = request;
	}

	@Override
	public void setServletResponse(HttpServletResponse response) 
	{
		this.response = response;
	}
	
	public List<SelectCO> getExtractionCriteriaList() 
	{
		return extractionCriteriaList;
	}

	public void setExtractionCriteriaList(List<SelectCO> extractionCriteriaList) 
	{
		this.extractionCriteriaList = extractionCriteriaList;
	}

	public List<SelectCO> getFileStructureList() 
	{
		return fileStructureList;
	}

	public void setFileStructureList(List<SelectCO> fileStructureList) 
	{
		this.fileStructureList = fileStructureList;
	}

	public List<SelectCO> getTextPortionListList() 
	{
		return textPortionListList;
	}

	public void setTextPortionListList(List<SelectCO> textPortionListList) 
	{
		this.textPortionListList = textPortionListList;
	}

	public MxMessageDefinitionCO getMxMessageDefinitionCO() {
		return mxMessageDefinitionCO;
	}

	public void setMxMessageDefinitionCO(MxMessageDefinitionCO mxMessageDefinitionCO) {
		this.mxMessageDefinitionCO = mxMessageDefinitionCO;
	}

	public String getUpdates1() 
	{
		return updates1;
	}

	public void setUpdates1(String updates1) 
	{
		this.updates1 = updates1;
	}

	public String getUpdate1() 
	{
		return update1;
	}

	public void setUpdate1(String update1) 
	{
		this.update1 = update1;
	}

	public List<SelectCO> getDataTypeList() 
	{
		return dataTypeList;
	}

	public void setDataTypeList(List<SelectCO> dataTypeList) 
	{
		this.dataTypeList = dataTypeList;
	}

	public List<SelectCO> getTextEditorTextTypeList() 
	{
		return textEditorTextTypeList;
	}

	public void setTextEditorTextTypeList(List<SelectCO> textEditorTextTypeList) 
	{
		this.textEditorTextTypeList = textEditorTextTypeList;
	}

	public String getDynamicStructureValue() 
	{
		return dynamicStructureValue;
	}

	public void setDynamicStructureValue(String dynamicStructureValue) 
	{
		this.dynamicStructureValue = dynamicStructureValue;
	}

	public File getUpload() 
	{
		return upload;
	}

	public void setUpload(File upload) 
	{
		this.upload = upload;
	}

	public String getFileType() 
	{
		return fileType;
	}

	public void setFileType(String fileType) 
	{
		this.fileType = fileType;
	}
	
}
