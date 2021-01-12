/**
 * PWSGenerationMaint.java - Oct 17, 2018  
 *
 * Copyright 2018, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Raed Saad
 * 
 *User Story #740995 PWS generation From DB Procedure -screen
 */
package com.path.imco.actions.pwsgeneration;

import java.io.File;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.path.dbmaps.vo.DGTL_GTW_ADAPTER_PARAM_MAPVO;
import com.path.dbmaps.vo.DGTL_GTW_WS_ADAPTERVO;
import com.path.imco.bo.pwsgeneration.PWSGenerationBO;
import com.path.imco.bo.pwsgeneration.PWSGenerationConstant;
import com.path.imco.vo.pwsgeneration.PWSGenerationCO;
import com.path.lib.common.util.StringUtil;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.webserviceexplorer.RequestResponseCO;
import com.path.vo.common.webserviceexplorer.WebServiceExplorerCO;
import com.path.vo.common.webserviceexplorer.WebServiceExplorerGridParamCO;
import com.path.vo.common.webserviceexplorer.WebServiceUtil;

import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class PWSGenerationMaint extends BaseAction {
	private PWSGenerationBO pwsGenerationBO;
	private PWSGenerationCO pwsGenerationCO;
	private WebServiceExplorerCO webServiceExplorerCO;
	private List<SelectCO> mappingToArguments;
	private List<SelectCO> generationTypeList;
	private List<SelectCO> environmentTypeList;
	private File bpelFile;
	private String bpelZipName;
	private String fileName;
	private WebServiceExplorerGridParamCO webServiceExplorerGridParamCO;
	
	/**
	 * function called on screen start up
	 * @return
	 */
	public String initializeScreen()
	{
		try{
			WebServiceUtil webServiceUtil = new WebServiceUtil();
			// passing the grid action name define in struts
			webServiceExplorerGridParamCO = webServiceUtil.returnGridParamCO(PWSGenerationConstant.PWS_WEB_SERVICE_EXPLORER_LIST_ACTION_NAME);
			webServiceExplorerGridParamCO.setScreenNameSpace(PWSGenerationConstant.PWS_WEB_SERVICE_EXPLORER_SCREEN_NAME_SPACE);
			/* setting iv crud p from main and sub grid */
			String subGridActionRef = webServiceExplorerGridParamCO.getSubGridActionRef() + "?iv_crud=" + this.getIv_crud();
			String mainGridActionRef = webServiceExplorerGridParamCO.getMainGridActionRef() + "?iv_crud=" + this.getIv_crud();
			webServiceExplorerGridParamCO.setSubGridActionRef(subGridActionRef);
			webServiceExplorerGridParamCO.setMainGridActionRef(mainGridActionRef);
			if("R".equalsIgnoreCase(this.getIv_crud()))
			{
			    set_showNewInfoBtn("false");			    
			    set_showSmartInfoBtn("false");
			    set_recReadOnly("false");
			}
			else if("M".equalsIgnoreCase(this.getIv_crud()))
			{
			    set_showNewInfoBtn("false");			    
			    set_showSmartInfoBtn("false");
			    set_recReadOnly("false");
			}
			else
			{
			    set_showNewInfoBtn("false");
			    set_showSmartInfoBtn("false");
			    set_recReadOnly("true");
			}
			set_searchGridId("pws_generation_searchGrid_");
			this.generateSelect();
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "loadAdaptersList";
	}
	
	/**
	 * 
	 */
	public void generateSelect()
	{
		SelectCO selectCO;
		List<SelectCO> generationTypeList = new ArrayList<SelectCO>();
		selectCO = new SelectCO();
		selectCO.setCode("Api");
		selectCO.setDescValue("Api");
		selectCO.setDefaultValue("Api");
		generationTypeList.add(selectCO);
		selectCO = new SelectCO();
		selectCO.setCode("BPEL");
		selectCO.setDescValue("BPEL");
		selectCO.setDefaultValue("BPEL");
		generationTypeList.add(selectCO);
		selectCO = new SelectCO();
		selectCO.setCode("Wsdl");
		selectCO.setDescValue("Wsdl");
		selectCO.setDefaultValue("Wsdl");
		generationTypeList.add(selectCO);
//		selectCO = new SelectCO();
//		selectCO.setCode("Windows Api");
//		selectCO.setDescValue("Windows Api");
//		selectCO.setDefaultValue("Windows Api");
//		generationTypeList.add(selectCO);
		this.setGenerationTypeList(generationTypeList);
		
		List<SelectCO> environmentTypeList = new ArrayList<SelectCO>();

		selectCO = new SelectCO();
		selectCO.setCode("QA Environment");
		selectCO.setDescValue("QA Environment");
		selectCO.setDefaultValue("QA Environment");
		environmentTypeList.add(selectCO);
		
		selectCO = new SelectCO();
		selectCO.setCode("UAT1");
		selectCO.setDescValue("UAT1");
		selectCO.setDefaultValue("UAT1");
		environmentTypeList.add(selectCO);
		
		selectCO = new SelectCO();
		selectCO.setCode("UAT2");
		selectCO.setDescValue("UAT2");
		selectCO.setDefaultValue("UAT2");
		environmentTypeList.add(selectCO);
		this.setEnvironmentTypeList(environmentTypeList);
	}
	
	/**
	 * function to load maint record from search grid
	 * @return
	 */
	public String loadPWSRecord()
	{
		try{
			this.initializeScreen();
			PWSGenerationCO pwsGenerationCO = pwsGenerationBO.loadPWSRecord(this.getPwsGenerationCO());
			this.generateSelect();
			this.setPwsGenerationCO(pwsGenerationCO);
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
//		if(pwsGenerationCO.getDgtlAdapterVO().getADAPTER_TYPE().equals("BPEL"))
//		{
//			return "loadPWSFileDemo";
//		}
		return "loadMaintAction";
	}
	
	/**
	 * 
	 * @return
	 */
	public String onAdapterChange()
	{
		try{
			String type = pwsGenerationCO.getDgtlAdapterVO().getADAPTER_TYPE();
			if(type.equalsIgnoreCase("BPEL"))
			{
				this.generateSelect();
				return "loadPWSFileDemo";
			}
			else if(type.equalsIgnoreCase("Api"))
			{
				this.generateSelect();
				return "loadPWSGenerationAPI";
			}
			else if(type.equalsIgnoreCase("Wsdl"))
			{
				return "loadPWSWSDLGeneration";
			}
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * dependency by procedure name
	 * @return
	 */
	public String procedureNameDependency()
	{
		try{
			if(null != pwsGenerationCO.getProcedureName() && pwsGenerationCO.getProcedureName().length()>0)
			{
				pwsGenerationBO.validateProcedure(pwsGenerationCO);
			}
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * depency for connection lookup
	 * @return
	 */
	public String connectionDepedency()
	{
		try{
			System.out.print("test");
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * function to save a record
	 * @return
	 */
	public String save()
	{
		try{
			SessionCO sessionCO = returnSessionObject();
			if(null != webServiceExplorerCO && webServiceExplorerCO.getAdapterType().equalsIgnoreCase("wsdl"))
			{
				this.processWsdlData(webServiceExplorerCO);
			}
			else if(null != pwsGenerationCO)
			{
				pwsGenerationCO = this.returnRecordData(pwsGenerationCO);
				pwsGenerationCO.getDgtlAdapterVO().setCREATED_BY(sessionCO.getUserName());
				pwsGenerationBO.saveAdapterData(pwsGenerationCO);
			}			
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * 
	 * @return
	 */
	public String processWsdlData(WebServiceExplorerCO webServiceExplorerCO)
	{
		try {
			WebServiceUtil webServiceUtil = new WebServiceUtil();
			PWSGenerationCO pwsGenerationCO = new PWSGenerationCO();
			
			SessionCO sessionCO = super.returnSessionObject();
			DGTL_GTW_WS_ADAPTERVO dgtlAdapterVO = new DGTL_GTW_WS_ADAPTERVO();
			Map<String,String> appName = webServiceUtil.getApplicationNameAndKey("PathWebServicesList");
			webServiceExplorerCO = webServiceUtil.returnGridDataToSave(webServiceExplorerCO);
			List<RequestResponseCO> lstReq = webServiceExplorerCO.getLstRequestResposneCO();
			List<DGTL_GTW_ADAPTER_PARAM_MAPVO> combinedReqResp = new ArrayList<DGTL_GTW_ADAPTER_PARAM_MAPVO>();
			List<DGTL_GTW_ADAPTER_PARAM_MAPVO> reqDgtlAdapterParamVO = this.fillPWSMapping(lstReq, "IN");
			
			String webServiceExplorerGridUpdates = webServiceExplorerCO.getWebServiceExplorerGridUpdates();			
			String webServiceExplorerResponseGridUpdates = webServiceExplorerCO.getWebServiceExplorerResponseGridUpdates();
			webServiceExplorerCO.setWebServiceExplorerGridUpdates(webServiceExplorerResponseGridUpdates);
			webServiceExplorerCO = webServiceUtil.returnGridDataToSave(webServiceExplorerCO);
			List<RequestResponseCO> lstResp = webServiceExplorerCO.getLstRequestResposneCO();
			List<DGTL_GTW_ADAPTER_PARAM_MAPVO> respDgtlAdapterParamVO = this.fillPWSMapping(lstResp, "OUT");

			dgtlAdapterVO.setADAPTER_TYPE(webServiceExplorerCO.getAdapterType());
			dgtlAdapterVO.setOPERATION_NAME(webServiceExplorerCO.getOperationName());
			dgtlAdapterVO.setSERVICE_NAME(webServiceExplorerCO.getWebServiceName());
			dgtlAdapterVO.setAPI_NAME(webServiceExplorerCO.getWsdlUrl());
			
			combinedReqResp = reqDgtlAdapterParamVO;
			combinedReqResp.addAll(respDgtlAdapterParamVO);
			pwsGenerationCO.setDgtlAdapterVO(dgtlAdapterVO);
			pwsGenerationCO.setLstDgtlAdapterParamVO(combinedReqResp);
			pwsGenerationCO.getDgtlAdapterVO().setCREATED_BY(sessionCO.getUserName());

//			pwsGenerationBO.saveAdapterData(pwsGenerationCO);
			pwsGenerationBO.generateWsdlAdapter(pwsGenerationCO);

		}
		catch(Exception e)
		{
			super.handleException(e, null,null);
		}
		return "success";
	}
	
	public List<DGTL_GTW_ADAPTER_PARAM_MAPVO> fillPWSMapping(List<RequestResponseCO> lstReq,String mode)
	{
		SessionCO sessionCO = super.returnSessionObject();
		DGTL_GTW_ADAPTER_PARAM_MAPVO dgtlAdapterParamVO = null;
		List<DGTL_GTW_ADAPTER_PARAM_MAPVO> lstDgtlAdapterParamVO = new ArrayList<DGTL_GTW_ADAPTER_PARAM_MAPVO>();
		for(RequestResponseCO reqRespCO : lstReq)
		{
			if(isNonPrimativeDataType(reqRespCO.getFieldType()))
			{
				dgtlAdapterParamVO = new DGTL_GTW_ADAPTER_PARAM_MAPVO();
				
				dgtlAdapterParamVO.setPARAMETER_NAME(reqRespCO.getFieldName());
				dgtlAdapterParamVO.setPARAM_TYPE(reqRespCO.getFieldType());
				dgtlAdapterParamVO.setIS_MANDATORY_YN(reqRespCO.getMandatory());
			
				dgtlAdapterParamVO.setIN_OUT("IN");
				dgtlAdapterParamVO.setDEFAULT_VALUE(reqRespCO.getValue());
				dgtlAdapterParamVO.setMAPPED_PARAM_NAME(reqRespCO.getMappingField());
//				dgtlAdapterParamVO.setIS_NILLABLE_YN(reqRespCO.getNillable());
				
				if("undefined".equalsIgnoreCase(reqRespCO.getValue()))
				{
					reqRespCO.setValue("");
				}
				if(null != reqRespCO.getValue() && reqRespCO.getValue().length() == 0 && !"undefined".equalsIgnoreCase(reqRespCO.getValue()))
				{
					reqRespCO.setValue(reqRespCO.getFieldName());
				}
				if(null != reqRespCO.getValue() && reqRespCO.getValue().length()>0 && !"undefined".equalsIgnoreCase(reqRespCO.getValue()))
				{
				//	commonPwsMappingDetailsVO.setMAPPING_ARG_VALUE(reqRespCO.getValue());
				}
				else if((null != reqRespCO.getMappingField() || "null".equals(reqRespCO.getMappingField()))&&reqRespCO.getValue().length()>0)
				{
				//	commonPwsMappingDetailsVO.setDESTINATION_KEY(reqRespCO.getMappingField());
				}
				else{
				//	commonPwsMappingDetailsVO.setDESTINATION_KEY(null);
				//	commonPwsMappingDetailsVO.setMAPPING_ARG_VALUE(null);
				}
				lstDgtlAdapterParamVO.add(dgtlAdapterParamVO);
			}
			else{
				
				if(null != reqRespCO.getValue() && reqRespCO.getValue().length() == 0)
				{
					reqRespCO.setValue(reqRespCO.getFieldName());
				}
				if(null != reqRespCO.getValue() && reqRespCO.getValue().length()>0)
				{
					//commonPwsMappingDetailsVO.setMAPPING_ARG_VALUE(reqRespCO.getValue());
				}
				else if((null != reqRespCO.getMappingField() || "null".equals(reqRespCO.getMappingField()))&&reqRespCO.getValue().length()>0)
				{
				//	commonPwsMappingDetailsVO.setDESTINATION_KEY(reqRespCO.getMappingField());
				}
				else{
					//commonPwsMappingDetailsVO.setDESTINATION_KEY(null);
					//commonPwsMappingDetailsVO.setMAPPING_ARG_VALUE(null);
				}
				lstDgtlAdapterParamVO.add(dgtlAdapterParamVO);
				String parentField = reqRespCO.getFieldName();
				List<RequestResponseCO> lstReqRespCO = reqRespCO.getReqResCO().getLstInReqRes();
				for(RequestResponseCO reqRespCO1 : lstReqRespCO)
				{
					dgtlAdapterParamVO = new DGTL_GTW_ADAPTER_PARAM_MAPVO();
				
					dgtlAdapterParamVO.setPARAMETER_NAME(reqRespCO.getFieldName());
	//				dgtlAdapterParamVO.setDESCRIPTION
					dgtlAdapterParamVO.setPARAM_TYPE(reqRespCO.getFieldType());
					dgtlAdapterParamVO.setIS_MANDATORY_YN(reqRespCO.getMandatory());
				
					dgtlAdapterParamVO.setIN_OUT("IN");
					dgtlAdapterParamVO.setDEFAULT_VALUE(reqRespCO.getValue());
					dgtlAdapterParamVO.setMAPPED_PARAM_NAME(reqRespCO.getMappingField());
	//				dgtlAdapterParamVO.setIS_NILLABLE_YN(reqRespCO.getNillable());
	 
					if(null != reqRespCO1.getValue() && reqRespCO1.getValue().length() == 0)
					{
						reqRespCO1.setValue(reqRespCO1.getFieldName());
					}
					if(null != reqRespCO1.getValue() && reqRespCO1.getValue().length()>0)
					{
						//commonPwsMappingDetailsVO.setMAPPING_ARG_VALUE(reqRespCO1.getValue());
					}
					else if((null != reqRespCO1.getMappingField() || "null".equals(reqRespCO1.getMappingField()))&&reqRespCO.getValue().length()>0)
					{
					//	commonPwsMappingDetailsVO.setDESTINATION_KEY(reqRespCO1.getMappingField());
					}
					else{
					//	commonPwsMappingDetailsVO.setDESTINATION_KEY(null);
				//		commonPwsMappingDetailsVO.setMAPPING_ARG_VALUE(null);
					}
					lstDgtlAdapterParamVO.add(dgtlAdapterParamVO);
				}
			}
		}
		return lstDgtlAdapterParamVO;		
	}
	
	/**
	 * function to delete a record
	 * @return
	 */
	public String delete()
	{
		try{
			
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * function to update record
	 * @return
	 */
	public String update()
	{
		try{
			if(null != pwsGenerationCO)
			{
				pwsGenerationCO = this.returnRecordData(pwsGenerationCO);
				pwsGenerationBO.updateAfterApproveRecord(pwsGenerationCO);
			}	
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * function to approve record
	 * @return
	 */
	public String approve()
	{
		try{
			if(null != pwsGenerationCO)
			{
				pwsGenerationCO = this.returnRecordData(pwsGenerationCO);
				pwsGenerationBO.approveRecord(pwsGenerationCO);
			}		
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * function to deploy 
	 * @return
	 */
	public String deploy()
	{
		try{
			if(null != pwsGenerationCO)
			{
				pwsGenerationCO = this.returnRecordData(pwsGenerationCO);
				//pwsGenerationCO.getPwsOperationVO().setSTATUS(PWSGenerationConstant.PWS_GENERATION_APPROVED_STATUS);
				pwsGenerationBO.deploy(pwsGenerationCO);
			}	
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * @description import bpel zip file to server repository
	 * @return
	 */
	public String importBPEL()
	{
		try{
			if(bpelFile != null && bpelFile.isFile() && bpelFile.length() > 0)
			{
				pwsGenerationCO.setBpelFile(bpelFile);
				pwsGenerationCO.getDgtlAdapterVO().setADAPTER_TYPE("BPEL");
				pwsGenerationCO.getDgtlAdapterVO().setAPI_NAME(pwsGenerationCO.getBpelFileName());
				pwsGenerationBO.uploadBPEL(pwsGenerationCO);
			}
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";		
	}
	
	/**
	 * function to parse json string and fill it
	 * @param pwsGenerationCO
	 * @return
	 * @throws CloneNotSupportedException 
	 */
	public PWSGenerationCO returnRecordData(PWSGenerationCO pwsGenerationCO) throws CloneNotSupportedException
	{
		PWSGenerationCO pwsGenerationCO1 = (PWSGenerationCO) pwsGenerationCO.clone();
		JSONObject jsonObj = null;
		List<JSONObject> jsonArgObj = null;	
		DGTL_GTW_WS_ADAPTERVO dgtlAdapterVO = new DGTL_GTW_WS_ADAPTERVO();
		DGTL_GTW_ADAPTER_PARAM_MAPVO dgtlAdapterParamVO = new DGTL_GTW_ADAPTER_PARAM_MAPVO();
		List<DGTL_GTW_ADAPTER_PARAM_MAPVO> lstDgtlAdapterParamVO = null;		
		String opId = null;
		try{
			if (StringUtil.isNotEmpty(StringUtil.nullEmptyToValue(pwsGenerationCO.getPwsGenerationRecordUpdates(), ""))) 
			{
				jsonObj = (JSONObject) JSONSerializer.toJSON(pwsGenerationCO.getPwsGenerationRecordUpdates());
				jsonObj.keySet();
				opId = jsonObj.get("pwsGenerationCO.dgtlAdapterVO.ADAPTER_ID")+"";
				if(null != opId && opId.length()>0)
				{
					dgtlAdapterVO.setADAPTER_ID(new BigDecimal(opId));					
				}				
				dgtlAdapterVO.setAPP_NAME(jsonObj.get("pwsGenerationCO.dgtlAdapterVO.APP_NAME")+"");
				dgtlAdapterVO.setBUSINESS_AREA(jsonObj.get("pwsGenerationCO.dgtlAdapterVO.BUSINESS_AREA")+"");
				dgtlAdapterVO.setBUSINESS_DOMAIN(jsonObj.get("pwsGenerationCO.dgtlAdapterVO.BUSINESS_DOMAIN")+"");
				dgtlAdapterVO.setSERVICE_DOMAIN(jsonObj.get("pwsGenerationCO.dgtlAdapterVO.SERVICE_DOMAIN")+"");
				dgtlAdapterVO.setVERSION(jsonObj.get("pwsGenerationCO.dgtlAdapterVO.VERSION")+"");
				dgtlAdapterVO.setOPERATION_NAME(jsonObj.get("pwsGenerationCO.dgtlAdapterVO.OPERATION_NAME")+"");
				dgtlAdapterVO.setSERVICE_NAME(jsonObj.get("pwsGenerationCO.dgtlAdapterVO.SERVICE_NAME")+"");
				dgtlAdapterVO.setAPI_NAME(jsonObj.get("pwsGenerationCO.dgtlAdapterVO.API_NAME")+"");
				dgtlAdapterVO.setADAPTER_TYPE(jsonObj.get("pwsGenerationCO.dgtlAdapterVO.ADAPTER_TYPE")+"");
				jsonArgObj = (List<JSONObject>) jsonObj.get("pwsGenerationCO.lstDgtlAdapterVO");				
				lstDgtlAdapterParamVO = new ArrayList<DGTL_GTW_ADAPTER_PARAM_MAPVO>();
				for(JSONObject json : jsonArgObj)
				{
					dgtlAdapterParamVO = new DGTL_GTW_ADAPTER_PARAM_MAPVO();
					dgtlAdapterParamVO.setPARAMETER_NAME(json.get("dgtlAdapterParamVO.PARAMETER_NAME")+"");
					dgtlAdapterParamVO.setDESCRIPTION("");
					dgtlAdapterParamVO.setPARAM_TYPE( json.get("dgtlAdapterParamVO.PARAM_TYPE")+"");
					if(null != json.get("dgtlAdapterParamVO.IS_MANDATORY_YN"))
					{
						dgtlAdapterParamVO.setIS_MANDATORY_YN("0");
					}
					else{
						dgtlAdapterParamVO.setIS_MANDATORY_YN("0");
					}
					dgtlAdapterParamVO.setIN_OUT(json.get("dgtlAdapterParamVO.IN_OUT")+"");
					dgtlAdapterParamVO.setDEFAULT_VALUE(json.get("dgtlAdapterParamVO.DEFAULT_VALUE")+"");
					dgtlAdapterParamVO.setMAPPED_PARAM_NAME(json.get("dgtlAdapterParamVO.MAPPED_PARAM_NAME")+"");
					dgtlAdapterParamVO.setIS_NILLABLE_YN(json.get("dgtlAdapterParamVO.IS_NILLABLE_YN")+"");
					lstDgtlAdapterParamVO.add(dgtlAdapterParamVO);
				}
			}
			pwsGenerationCO1.setDgtlAdapterVO(dgtlAdapterVO);
			pwsGenerationCO1.setDgtlAdapterParamVO(dgtlAdapterParamVO);
			pwsGenerationCO1.setLstDgtlAdapterParamVO(lstDgtlAdapterParamVO);
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return pwsGenerationCO1;
	}
	
	/**
	 * function to load mapp to arguments
	 * @return
	 */
	public String loadMappToArgs()
	{
		try{
			List<SelectCO>mappingToArg = new ArrayList<SelectCO>();
			SelectCO selCO = new SelectCO();
			selCO.setCode("API");
			selCO.setDescValue("API");
			mappingToArg.add(selCO);
			
			selCO = new SelectCO();
			selCO.setCode("BPEL");
			selCO.setDescValue("BPEL");
			mappingToArg.add(selCO);
			
			selCO = new SelectCO();
			selCO.setCode("WindowsApi");
			selCO.setDescValue("WindowsApi");
			mappingToArg.add(selCO);
			this.setMappingToArguments(mappingToArg);
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	private Boolean isNonPrimativeDataType(String fieldType)
	{
		return ("int".equals(fieldType) || "string".equals(fieldType) || "decimal".equals(fieldType) || "bigdecimal".equals(fieldType) || "dateTime".equals(fieldType) || "long".equals(fieldType) || "date".equals(fieldType) || "float".equals(fieldType) || "double".equals(fieldType) || "boolean".equals(fieldType));
	}

	public PWSGenerationBO getPwsGenerationBO() {
		return pwsGenerationBO;
	}

	public void setPwsGenerationBO(PWSGenerationBO pwsGenerationBO) {
		this.pwsGenerationBO = pwsGenerationBO;
	}

	public PWSGenerationCO getPwsGenerationCO() {
		return pwsGenerationCO;
	}

	public void setPwsGenerationCO(PWSGenerationCO pwsGenerationCO) {
		this.pwsGenerationCO = pwsGenerationCO;
	}

	public List<SelectCO> getMappingToArguments() {
		return mappingToArguments;
	}

	public void setMappingToArguments(List<SelectCO> mappingToArguments) {
		this.mappingToArguments = mappingToArguments;
	}

	public List<SelectCO> getGenerationTypeList() {
		return generationTypeList;
	}

	public void setGenerationTypeList(List<SelectCO> generationTypeList) {
		this.generationTypeList = generationTypeList;
	}

	public List<SelectCO> getEnvironmentTypeList() {
		return environmentTypeList;
	}

	public void setEnvironmentTypeList(List<SelectCO> environmentTypeList) {
		this.environmentTypeList = environmentTypeList;
	}

	public String getBpelZipName() {
		return bpelZipName;
	}

	public void setBpelZipName(String bpelZipName) {
		this.bpelZipName = bpelZipName;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public File getBpelFile() {
		return bpelFile;
	}

	public void setBpelFile(File bpelFile) {
		this.bpelFile = bpelFile;
	}

	public WebServiceExplorerGridParamCO getWebServiceExplorerGridParamCO() {
		return webServiceExplorerGridParamCO;
	}

	public void setWebServiceExplorerGridParamCO(WebServiceExplorerGridParamCO webServiceExplorerGridParamCO) {
		this.webServiceExplorerGridParamCO = webServiceExplorerGridParamCO;
	}

	public WebServiceExplorerCO getWebServiceExplorerCO() {
		return webServiceExplorerCO;
	}

	public void setWebServiceExplorerCO(WebServiceExplorerCO webServiceExplorerCO) {
		this.webServiceExplorerCO = webServiceExplorerCO;
	}
}
