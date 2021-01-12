package com.path.imco.actions.fieldmapping;

import com.path.imco.bo.fieldmapping.FieldMappingBO;
import com.path.imco.vo.fieldmapping.FieldMappingCO;
import com.path.imco.vo.fieldmapping.FieldMappingSC;
import com.path.struts2.lib.common.base.GridBaseAction;

/**
 * 
 * Copyright 2013, Path Solutions Path Solutions retains all ownership rights to
 * this source code
 * 
 * FieldMappingListAction.java used to
 */
public class FieldMappingListAction extends GridBaseAction
{
    private FieldMappingBO fieldMappingBO;
    private FieldMappingSC criteria = new FieldMappingSC();
    private FieldMappingCO fieldmapCO = new FieldMappingCO();
    // private FieldMappingCO fieldmapp = new FieldMappingCO();

    public String loadFieldMappingGrid()
    {
	try
	{
	    String[] searchCol = { "syncolmappingVO.BR_CODE", "syncolmappingVO.ENTITY_CODE", "syncolmappingVO.COL_NBR",
		    "syncolmappingVO.FROM_COL", "syncolmappingVO.FROM_LABEL", "syncolmappingVO.TO_COL",
		    "syncolmappingVO.TO_LABEL", "syncolmappingVO.IN_OUT", "syncolmappingVO.COL_TYPE",
		    "syncolmappingVO.ACTION", "syncolmappingVO.COL_DEFAULT", "forcenull",
		    "syncolmappingVO.API_CODE", "syncolmappingVO.VALUE_SUCCESS", "syncolmappingVO.VALUE_ERROR",
	    "syncolmappingVO.MSG_TYPE" };
	    criteria.setSearchCols(searchCol);
	    copyproperties(criteria);
	    if(checkNbRec(criteria))
	    {
		setRecords(fieldMappingBO.returnFieldMappingListCount(criteria));
	    }
	    setGridModel(fieldMappingBO.returnFieldMappingList(criteria));
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}
	return SUCCESS;
    }

    public String loadglobalcolmapGrid()
    {
	try
	{
	    // String[] searchCol = { "syncolmappingVO.BR_CODE",
	    // "syncolmappingVO.ENTITY_CODE", "syncolmappingVO.COL_NBR",
	    // "syncolmappingVO.COL_DEFAULT" };
	    // SessionCO sessionCO = returnSessionObject();
	    // criteria.setSearchCols(searchCol);
	    // // criteria.setDateSearchCols(hmDate);
	    // copyproperties(criteria);
	    /*
	     * if(checkNbRec(criteria)) {
	     * setRecords(fieldMappingBO.returnFieldMappingListCount(criteria));
	     * }
	     */
	    setGridModel(fieldMappingBO.returnGlobalColMapList(criteria));
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }

    public String loadFixcolmapGrid()
    {
	try
	{
	    // String[] searchCol = { "syncolmappingVO.BR_CODE",
	    // "syncolmappingVO.ENTITY_CODE", "syncolmappingVO.COL_NBR",
	    // "syncolmappingVO.COL_DEFAULT" };
	    // SessionCO sessionCO = returnSessionObject();
	    // criteria.setSearchCols(searchCol);
	    // // criteria.setDateSearchCols(hmDate);
	    // copyproperties(criteria);
	    /*
	     * if(checkNbRec(criteria)) {
	     * setRecords(fieldMappingBO.returnFieldMappingListCount(criteria));
	     * }
	     */


	    setGridModel(fieldMappingBO.returnFixColMapList(criteria));
	}
	catch(Exception e)
	{
	    handleException(e, null, null);
	}

	return SUCCESS;
    }

    @Override
    public Object getModel()
    {
	return criteria;
    }
    public FieldMappingSC getCriteria()
    {
	return criteria;
    }
    public void setCriteria(FieldMappingSC criteria)
    {
	this.criteria = criteria;
    }
    public void setFieldMappingBO(FieldMappingBO fieldMappingBO)
    {
	this.fieldMappingBO = fieldMappingBO;
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
}
