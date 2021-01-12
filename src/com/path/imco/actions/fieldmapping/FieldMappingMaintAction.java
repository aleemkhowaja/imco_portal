package com.path.imco.actions.fieldmapping;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.path.imco.bo.fieldmapping.FieldMappingBO;
import com.path.imco.vo.fieldmapping.FieldMappingCO;
import com.path.imco.vo.fieldmapping.FieldMappingSC;
import com.path.lib.common.exception.BaseException;
import com.path.lib.vo.GridUpdates;
import com.path.struts2.lib.common.base.BaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectCO;
import com.path.vo.common.select.SelectSC;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * FieldMappingMaintAction.java used to
 */
public class FieldMappingMaintAction extends BaseAction
{
    private FieldMappingBO fieldMappingBO;
    private FieldMappingCO fieldmapCO = new FieldMappingCO();

    private List<SelectCO> colTypeList = new ArrayList<>();
    private List<SelectCO> inOutList = new ArrayList<>();
    private List<SelectCO> colTypeListReal = new ArrayList<>();
    private List<SelectCO> msgTypeList = new ArrayList<>();

    private ArrayList<SelectCO> customeLov = new ArrayList<>();

    public String loadFieldMappingPage()
    {
	try
	{
	    // SessionCO sessionCO = returnSessionObject();
	    //
	    // SelectCO selectCO = new SelectCO();
	    // selectCO.setCode(sessionCO.getUserName());
	    // selectCO.setDescValue("Logged In User");
	    // customeLov.add(selectCO);
	    //
	    // selectCO = new SelectCO();
	    // selectCO.setCode(sessionCO.getCompanyCode().toString());
	    // selectCO.setDescValue("Logged In Company");
	    // customeLov.add(selectCO);
	    //
	    // selectCO = new SelectCO();
	    // selectCO.setCode(sessionCO.getBranchCode().toString());
	    // selectCO.setDescValue("Logged In Branch");
	    // customeLov.add(selectCO);
	    //
	    // selectCO = new SelectCO();
	    // selectCO.setCode(com.path.lib.common.util.DateUtil.format(sessionCO.getRunningDateRET()));
	    // selectCO.setDescValue("System Date");
	    // customeLov.add(selectCO);

	    set_searchGridId("fieldMappingListGridTbl_Id");
	}
	catch(Exception ex)
	{
	    handleException(ex, null, null);
	}
	return "fieldMappingList";
    }

    public String SyncColMapLoadDetails()
    {

	if(fieldmapCO.getFieldmapGridListString() != null && !fieldmapCO.getFieldmapGridListString().isEmpty())
	{
	    GridUpdates gridUpdates = getGridUpdates(fieldmapCO.getFieldmapGridListString(), FieldMappingCO.class,
		    true);

	    List<FieldMappingCO> listOfFieldGrid = gridUpdates.getLstAllRec();
	    fieldmapCO.setFieldGridList(listOfFieldGrid);
	}

	if(fieldmapCO.getCheckactions().equals("G"))
	{
	    return "syncMappingListGlobal";
	}
	else if(fieldmapCO.getCheckactions().equals("D"))
	{
	    return "syncMappingListDefault";
	}
	else if(fieldmapCO.getCheckactions().equals("F"))
	{
	    FieldMappingSC fieldmappSC = new FieldMappingSC();
	    fieldmappSC.setBrcode(fieldmapCO.getBrcode());
	    fieldmappSC.setColNBR(fieldmapCO.getColNBR());
	    fieldmappSC.setEntityCode(fieldmapCO.getEntityCode());
	    return "syncMappingListFix";
	}

	return "success11";
    }

    public String loadfieldmapTypeSelect()
    {
	try
	{
	    SelectSC selSC = new SelectSC(BigDecimal.valueOf(948));
	    // SelectSC msgselSC = new SelectSC(BigDecimal.valueOf(952));
	    // setMsgTypeList(returnLOV(msgselSC));
	    setColTypeList(returnLOV(selSC));

	    SessionCO sessionCO = returnSessionObject();

	    SelectCO selectCO = new SelectCO();




	    selectCO.setCode(sessionCO.getUserName());
	    selectCO.setDescValue("Logged In User");
	    customeLov.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode(sessionCO.getCompanyCode().toString());
	    selectCO.setDescValue("Logged In Company");
	    customeLov.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode(sessionCO.getBranchCode().toString());
	    selectCO.setDescValue("Logged In Branch");
	    customeLov.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode(com.path.lib.common.util.DateUtil.format(sessionCO.getRunningDateRET()));
	    selectCO.setDescValue("System Date");
	    customeLov.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("");
	    selectCO.setDescValue("");
	    customeLov.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("I");
	    selectCO.setDescValue("Integer");
	    colTypeListReal.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("D");
	    selectCO.setDescValue("Decimal");
	    colTypeListReal.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("S");
	    selectCO.setDescValue("String");
	    colTypeListReal.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("De");
	    selectCO.setDescValue("Date");
	    colTypeListReal.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("");
	    selectCO.setDescValue("");
	    colTypeListReal.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("REQ");
	    selectCO.setDescValue("Request");
	    msgTypeList.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("RES");
	    selectCO.setDescValue("Response");
	    msgTypeList.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("I");
	    selectCO.setDescValue("In");
	    inOutList.add(selectCO);

	    selectCO = new SelectCO();
	    selectCO.setCode("O");
	    selectCO.setDescValue("Out");
	    inOutList.add(selectCO);

	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }

    public String fixDataSave()
    {
	try
	{
	    if(fieldmapCO.getFixGridListString() != null && !fieldmapCO.getFixGridListString().isEmpty())
	    {
		GridUpdates gridUpdates = getGridUpdates(fieldmapCO.getFixGridListString(), FieldMappingCO.class, true);

		List<FieldMappingCO> fixcolGridList = gridUpdates.getLstAllRec();

		fieldmapCO.setFixcolGridList(fixcolGridList);
		fieldmapCO = fieldMappingBO.fixDataSave(fieldmapCO);

	    }


	}
	catch(BaseException e)
	{
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

	return "syncMappingListFix";
    }

    public String fieldGridSave()
    {
	try
	{
	    if(fieldmapCO.getFieldmapGridListString() != null && !fieldmapCO.getFieldmapGridListString().isEmpty())
	    {
		GridUpdates gridUpdates = getGridUpdates(fieldmapCO.getFieldmapGridListString(), FieldMappingCO.class,
			true);

		List<FieldMappingCO> listOfFieldGrid = gridUpdates.getLstAllRec();
		fieldmapCO.setFieldGridList(listOfFieldGrid);

		fieldmapCO = fieldMappingBO.fieldMapDataSave(fieldmapCO);
	    }
	}
	catch(BaseException e)
	{
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

	return SUCCESS;

    }


    public void setFieldMappingBO(FieldMappingBO fieldMappingBO)
    {
	this.fieldMappingBO = fieldMappingBO;
    }

    /**
     * @return the colTypeList
     */
    public List<SelectCO> getColTypeList()
    {
	return colTypeList;
    }

    /**
     * @param colTypeList the colTypeList to set
     */
    public void setColTypeList(List<SelectCO> colTypeList)
    {
	this.colTypeList = colTypeList;
    }

    /**
     * @return the fieldmapCO
     */
    public FieldMappingCO getFieldmapCO()
    {
	return fieldmapCO;
    }

    /**
     * @param fieldmapCO the fieldmapCO to set
     */
    public void setFieldmapCO(FieldMappingCO fieldmapCO)
    {
	this.fieldmapCO = fieldmapCO;
    }

    /**
     * @return the customeLov
     */
    public ArrayList<SelectCO> getCustomeLov()
    {
	return customeLov;
    }

    /**
     * @param customeLov the customeLov to set
     */
    public void setCustomeLov(ArrayList<SelectCO> customeLov)
    {
	this.customeLov = customeLov;
    }

    /**
     * @return the fieldMappingBO
     */
    public FieldMappingBO getFieldMappingBO()
    {
	return fieldMappingBO;
    }

    /**
     * @return the colTypeListReal
     */
    public List<SelectCO> getColTypeListReal()
    {
	return colTypeListReal;
    }

    /**
     * @param colTypeListReal the colTypeListReal to set
     */
    public void setColTypeListReal(List<SelectCO> colTypeListReal)
    {
	this.colTypeListReal = colTypeListReal;
    }

    /**
     * @return the msgTypeList
     */
    public List<SelectCO> getMsgTypeList()
    {
	return msgTypeList;
    }

    /**
     * @param msgTypeList the msgTypeList to set
     */
    public void setMsgTypeList(List<SelectCO> msgTypeList)
    {
	this.msgTypeList = msgTypeList;
    }

    /**
     * @return the inOutList
     */
    public List<SelectCO> getInOutList()
    {
	return inOutList;
    }

    /**
     * @param inOutList the inOutList to set
     */
    public void setInOutList(List<SelectCO> inOutList)
    {
	this.inOutList = inOutList;
    }

}
