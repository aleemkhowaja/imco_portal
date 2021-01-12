/**
 * PWSGenerationDependencyAction.java - May 10, 2019  
 *
 * Copyright 2019, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * @author: Raed Saad
 *
 */
package com.path.imco.actions.pwsgeneration;


import java.io.File;

import com.path.bo.common.webserviceexplorer.WebServiceExplorerBO;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.webserviceexplorer.WebServiceExplorerCO;

public class PWSGenerationDependencyAction extends BaseAction{
	private WebServiceExplorerBO webServiceExplorerBO;
	private WebServiceExplorerCO webServiceExplorerCO;
	private String wsdl;
	private String adapterType;
	private String bpelFileName;
	
	/**
	 * @description function to return pws generation webservice explorer grid
	 * @return
	 */
	public String loadPWSGenerationWebserviceExplorerGrid()
	{
		this.setWsdl(webServiceExplorerCO.getWsdlUrl());
		this.setAdapterType(webServiceExplorerCO.getAdapterType());
		String bpelFileName = webServiceExplorerCO.getBpelFileName();
		String [] arr = null;
		if(null != bpelFileName)
		{
			arr = bpelFileName.split("\\"+File.separator);
			bpelFileName = arr[arr.length-1];
			this.setBpelFileName(arr[arr.length-1]);
		}
		return "loadPWSGenerationTreeAndGrid";
	}

	public WebServiceExplorerCO getWebServiceExplorerCO() {
		return webServiceExplorerCO;
	}

	public void setWebServiceExplorerCO(WebServiceExplorerCO webServiceExplorerCO) {
		this.webServiceExplorerCO = webServiceExplorerCO;
	}


	public WebServiceExplorerBO getWebServiceExplorerBO() {
		return webServiceExplorerBO;
	}


	public void setWebServiceExplorerBO(WebServiceExplorerBO webServiceExplorerBO) {
		this.webServiceExplorerBO = webServiceExplorerBO;
	}

	public String getWsdl() {
		return wsdl;
	}

	public void setWsdl(String wsdl) {
		this.wsdl = wsdl;
	}

	public String getAdapterType() {
		return adapterType;
	}

	public void setAdapterType(String adapterType) {
		this.adapterType = adapterType;
	}

	public String getBpelFileName() {
		return bpelFileName;
	}

	public void setBpelFileName(String bpelFileName) {
		this.bpelFileName = bpelFileName;
	}
	

}
