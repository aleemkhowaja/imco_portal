package com.path.imco.actions.pwsgeneration.pwsgenerationwebserviceexplorer;
/**
 * @Auther:Raed Saad
 * @Date:MARCH 2018
 * @Team: PEMTS JAVA Team.
 * @copyright: PathSolution 2018
 * @User Story: USER STORY #740998 - PWS generation From BPEL(applying common files instead of local)
 * @Description: extends WebServiceExplorerGridBaseList and overrides grid loading behavior
 **/

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import javax.xml.parsers.ParserConfigurationException;

import org.apache.tools.ant.Project;
import org.apache.tools.ant.taskdefs.Expand;
import org.xml.sax.SAXException;

import com.path.lib.common.exception.BaseException;
import com.path.lib.common.util.FileUtil;
import com.path.lib.common.util.NumberUtil;
import com.path.lib.common.util.StringUtil;
import com.path.vo.common.webserviceexplorer.RequestResponseCO;
import com.path.vo.common.webserviceexplorer.WebServiceExplorerCO;
import com.path.actions.common.webserviceexplorer.WebServiceExplorerGridBaseList;
import com.path.bo.common.webserviceexplorer.WebServiceExplorerBO;
import com.path.codegen.common.lib.exception.GeneratorException;
import com.path.codegen.webservicegen.datareader.DataReader;
import com.path.codegen.webservicegen.generators.FileGenerator;
import com.path.codegen.webservicegen.parser.BPELParser;
import com.path.codegen.webservicegen.parser.GenWSDLParser;
import com.path.codegen.webservicegen.parser.ZipFileParser;
import com.path.codegen.webservicegen.pojo.BPELZipHolder;
import com.path.codegen.webservicegen.pojo.DataHolder;
import com.path.imco.bo.pwsgeneration.PWSGenerationConstant;

public class PWSWebServiceExplorerList extends WebServiceExplorerGridBaseList{
	private Boolean isEditable;
    public static Map<String,String> BROWSE_WSDL;
	private static Map<String,Object> commonHeadersMap;

    /**
     * @Description load main Grid
     * @note incase we want to load the web service response webServiceExplorerCO.setRequestType(WebServiceExplorerConstant.RESPONSE_TYPE);
	  *@Default behaviour loads request
     */
    @Override
	public String loadWSDLInfoGrid() throws BaseException {
		String[] searchCol = {"PARAMETER","TYPE","MANDATORY"};
		BigDecimal serviceID = null;
		try{
			if(null != webServiceExplorerCO && ((null != webServiceExplorerCO.getIsFromBpelScreen() && webServiceExplorerCO.getIsFromBpelScreen().equalsIgnoreCase("true"))||(webServiceExplorerCO.getAdapterType().equalsIgnoreCase("BPEL"))))
			{
				String bpelFile = webServiceExplorerCO.getBpelFileName();
				String arr[] = bpelFile.split("\\"+File.separator);
				bpelFile = arr[arr.length-1];
				webServiceExplorerCO.setBpelFileName(bpelFile);
				String bpelFileLoc = FileUtil.getFileURLByName("repository")+File.separator+"bpel"+File.separator;
				String tempWsdlRep = FileUtil.getFileURLByName("repository")+File.separator+"bpel"+File.separator+bpelFile.replace(".zip", "");
				String wsdlName = webServiceExplorerCO.getBpelFileName().replace(".zip", ".wsdl");
				String wsdlUrl = tempWsdlRep+File.separator+wsdlName;
				webServiceExplorerCO.setWsdlUrl(wsdlUrl);
				webServiceExplorerCO.setBpelFullPath(bpelFileLoc + bpelFile);
				this.unzip(bpelFileLoc+File.separator+bpelFile, tempWsdlRep);
				webServiceExplorerCO = this.processBPELZip(webServiceExplorerCO.getBpelFullPath());
				webServiceExplorerCO.setOperationName("process");
				webServiceExplorerCO.setWebServiceName("ChequeBookWsBO");	
				webServiceExplorerCO = webServiceExplorerBO.loadBPELFuncRespArg(webServiceExplorerCO);
				setGridModel(webServiceExplorerCO.getLstRequestResposneCO());
			}
			else{
				String wsdlUrl = webServiceExplorerCO.getWsdlUrl();
				webServiceExplorerCO = webServiceExplorerBO.loadFuncRespArg(webServiceExplorerCO);
				setGridModel(webServiceExplorerCO.getLstRequestResposneCO());
			}
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
    /**
     * @Description load sub Grid
     * @note incase we want to load the web service response webServiceExplorerCO.setRequestType(WebServiceExplorerConstant.RESPONSE_TYPE);
	  *@Default behaviour loads request
     */
	@Override
	public String loadSubGridInfo() throws BaseException {
		String[] searchCol = {"PARAMETER","TYPE","MANDATORY"};
		String[] gridIdSplitted;
		BigDecimal serviceID = null;
		try{
			if(null != webServiceExplorerCO && (null!= super.getId() || null != webServiceExplorerCO.getParentRowId()) && null != webServiceExplorerCO.getRequestResponseCO().getGridColumnID() && StringUtil.isNotEmpty(webServiceExplorerCO.getRequestResponseCO().getGridColumnID()))
			{
				//webServiceExplorerCO.setRequestType(WebServiceExplorerConstant.RESPONSE_TYPE);
				
				if(null != webServiceExplorerCO.getWebServiceExplorerConfigVO())
				{
					serviceID = webServiceExplorerCO.getWebServiceExplorerConfigVO().getCONFIG_ID();
				}
				webServiceExplorerCO = PWSWebServiceExplorerList.extractDataFromGridRowID(webServiceExplorerCO);
				if(StringUtil.isNotEmpty(webServiceExplorerCO.getHasChildren()))
				{
					List<RequestResponseCO> lstReqResCO = super.returnWsdlParseData(webServiceExplorerCO);
					webServiceExplorerCO.setLstRequestResposneCO(lstReqResCO);
				}					
				if(null != serviceID && !"undefined".equals(serviceID) && !NumberUtil.isEmptyDecimal(serviceID))
				{
					webServiceExplorerCO.getLstRequestResposneCO();
					webServiceExplorerCO = webServiceExplorerBO.loadWebServiceExplorerSavedData(webServiceExplorerCO);
				}
				setGridModel(webServiceExplorerCO.getLstRequestResposneCO());
			}
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * Overriding loadHashMapSubGridInfo and adding additional behavior to load data from database incase of stored data
	 */
	@Override
	public String loadHashMapSubGridInfo() throws BaseException
	{	webServiceExplorerCO.getParentRowId();
		try{
			if(null != webServiceExplorerCO && null != webServiceExplorerCO.getWebServiceExplorerConfigVO() && null != webServiceExplorerCO.getWebServiceExplorerConfigVO().getCONFIG_ID() && !NumberUtil.isEmptyDecimal(webServiceExplorerCO.getWebServiceExplorerConfigVO().getCONFIG_ID()))
			{
				webServiceExplorerCO = webServiceExplorerBO.loadWebServiceExplorerHashMapSavedData(webServiceExplorerCO);
			}
			else{
				List<RequestResponseCO> reqResLst = new ArrayList<RequestResponseCO>();
				RequestResponseCO resReqCO = new RequestResponseCO();		
				resReqCO.setFieldName("");
				resReqCO.setFieldType("map");				
				reqResLst.add(resReqCO);
				WebServiceExplorerCO  webServiceExplorerCO = new WebServiceExplorerCO();
				webServiceExplorerCO.setLstRequestResposneCO(reqResLst);
				setGridModel(webServiceExplorerCO.getLstRequestResposneCO());
				return "success";
			}
			setGridModel(webServiceExplorerCO.getLstRequestResposneCO());
			}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";		
	}
	
	/**
	 * Overriding loadListSubGridInfo and adding additional behavior to load data from database incase of stored data
	 */
	@Override
	public String loadListSubGridInfo()
	{
		try{
			if(null != webServiceExplorerCO.getWebServiceExplorerConfigVO() && null != webServiceExplorerCO.getWebServiceExplorerConfigVO().getCONFIG_ID() && !NumberUtil.isEmptyDecimal(webServiceExplorerCO.getWebServiceExplorerConfigVO().getCONFIG_ID()))
			{				
				webServiceExplorerCO = webServiceExplorerBO.loadWebServiceExplorerListSavedData(webServiceExplorerCO);
			}
			else{
			// We can give the List grid rows an ID from here 
				webServiceExplorerCO.setLstRequestResposneCO(Arrays.asList(webServiceExplorerCO.getRequestResponseCO()));
			}
			setGridModel(webServiceExplorerCO.getLstRequestResposneCO());
		}
		catch(Exception e)
		{
			super.handleException(e, null, null);
		}
		return "success";
	}
	
	/**
	 * @description Overriding return Main Grid 
	 */
	public String loadMainGridFn()
	{
		//webServiceExplorerCO.setIsFromBpelScreen("true");
		webServiceExplorerCO.setBpelFileName(webServiceExplorerCO.getBpelFileName());
		return super.loadMainGridFn(PWSGenerationConstant.PWS_WEB_SERVICE_EXPLORER_GRID_RESULT_MAP);
	}
	
	/**
	 * @author RaedSaad
	 * @description Overriding return Sub Grid
	 * @return Grid
	 */
	public String loadSubGridFn()
	{
		return super.loadSubGridFn(PWSGenerationConstant.PWS_WEB_SERVICE_EXPLORER__SUB_GRID_RESULT_MAP);
	}
	
	/**
	 * @param zipFilepath
	 * @param destinationDir
	 */
	
	public static void unzip(String zipFilepath, String destinationDir) 
	{
		//@TODO to be used from generator latest api
	    final class Expander extends Expand {
	        public Expander() {
	            Project antp = new Project();
	            this.setProject(antp);
	        }
	    }
	    File source = new File(zipFilepath);
	    String folder = source.getName().substring(0,source.getName().indexOf('.'));

	    Expander expander = new Expander();
	    expander.setSrc(source);
	    expander.setDest(new File(destinationDir));	    
	    expander.setOverwrite(true);
	    expander.execute();
	}
	
	/**
	 * @throws Exception
	 * @throws ParserConfigurationException
	 * @throws SAXException
	 * @throws IOException
	 * @throws URISyntaxException
	 * @throws KeyManagementException
	 * @throws NoSuchAlgorithmException
	 * @throws GeneratorException
	 */
	public WebServiceExplorerCO processBPELZip(String wsdlUrl) throws Exception, ParserConfigurationException, SAXException,
			IOException, URISyntaxException, KeyManagementException, NoSuchAlgorithmException, GeneratorException {
		ZipFileParser zipFileParse = ZipFileParser.newInstance();
		zipFileParse.parse(wsdlUrl);
		BPELZipHolder bpelZipHolder = ZipFileParser.bpelZipHolder;
		BPELParser bpelParser = BPELParser.newInstance();
		bpelParser.setBpelZipHolder(zipFileParse.bpelZipHolder);
		webServiceExplorerCO.setZipData(bpelZipHolder.getZipData());
		webServiceExplorerCO.setZipDataAsString(bpelZipHolder.getZipDataAsString());

		ZipFile zip = zipFileParse.bpelZipHolder.getZipFile();
		ZipEntry entry = zip.getEntry(zipFileParse.bpelZipHolder.getZipDataEntry()
				.get(zipFileParse.bpelZipHolder.getBpelFileName() + ".bpel"));
		bpelParser.parse(zip.getInputStream(entry));
		entry = zip.getEntry(zipFileParse.bpelZipHolder.getZipDataEntry().get(bpelParser.getBpelWsdlLocation()));
		String x = zip.getName().replace("\\", "xox");
		String arrStr[] = x.split("xox");
		String bpelName = arrStr[arrStr.length - 1];
		String location = zip.getName().replace(bpelName, "");
		x = x.replace("xox", "\\").replace(bpelName, bpelParser.getWsdlLocation());
		String n = "<import location=\"";
		String n1 = n + location + bpelName.replace(".zip", "") + File.separator;
		InputStream inputSream = zip.getInputStream(entry);
		String str = ZipFileParser.getStringFromInputStream(inputSream);
		String loc = zip.getName().replace(bpelName, bpelName.replace(".zip", "").replace(".rar", ""));
		str = str.replace(n, n1);
		this.getWebServiceExplorerCO().setWsdl(str);
		GenWSDLParser.newInstance().fillData(org.apache.commons.io.IOUtils.toInputStream(str, "UTF-8"));
		webServiceExplorerCO.setMainWsdl(str);
		webServiceExplorerCO.setMainWsdlName(bpelZipHolder.getBpelWsdl());
		return webServiceExplorerCO;
	}
	
	public WebServiceExplorerCO getWebServiceGuiCO() {
		return webServiceExplorerCO;
	}

	public Boolean getIsEditable() {
		return isEditable;
	}

	public void setIsEditable(Boolean isEditable) {
		this.isEditable = isEditable;
	}

	public WebServiceExplorerCO getWebServiceExplorerCO() {
		return webServiceExplorerCO;
	}

	public void setWebServiceExplorerCO(WebServiceExplorerCO webServiceExplorerCO) {
		this.webServiceExplorerCO = webServiceExplorerCO;
	}

	public void setWebServiceExplorerBO(WebServiceExplorerBO webServiceExplorerBO) {
		this.webServiceExplorerBO = webServiceExplorerBO;
	}

	public static Map<String, Object> getCommonHeadersMap() {
		return commonHeadersMap;
	}

	public static void setCommonHeadersMap(Map<String, Object> commonHeadersMap) {
		PWSWebServiceExplorerList.commonHeadersMap = commonHeadersMap;
	}

//	public DataHolder getDataHolder() {
//		return dataHolder;
//	}
//
//	public void setDataHolder(DataHolder dataHolder) {
//		this.dataHolder = dataHolder;
//	}
//
//	public Map<String, Object> getWsdls() {
//		return wsdls;
//	}
//
//	public void setWsdls(Map<String, Object> wsdls) {
//		this.wsdls = wsdls;
//	}
//
//	public String getMainBpelWsdl() {
//		return mainBpelWsdl;
//	}
//
//	public void setMainBpelWsdl(String mainBpelWsdl) {
//		this.mainBpelWsdl = mainBpelWsdl;
//	}	
}
