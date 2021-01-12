package com.path.imco.actions.channel.lookups.template;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.json.JSONException;

import com.path.dbmaps.vo.GTW_PWS_TMPLT_MASTERVO;
import com.path.imco.bo.channel.ChannelBO;
import com.path.imco.vo.channel.ChannelSC;
import com.path.lib.vo.LookupGrid;
import com.path.lib.vo.LookupGridColumn;
import com.path.struts2.lib.common.base.LookupBaseAction;

public class QueryLookupAction extends LookupBaseAction{
	
	private ChannelSC criteria;
	private ChannelBO channelBO;
	  
	/**
     * Loads the lookup of User List
     * @return String 
     */

    public String constructQryLookup()
    {
		try
		{
		    // Design the Grid by defining the column model and column names
		    String[] name = { "TEMPLATE_ID", "TEMPLATE_DESC" };
		    String[] colType = { "number", "text" };
		    String[] titles = { getText("TEMPLATE_ID_key"), getText("Description_key") };
	
		    // Defining the Grid
		    LookupGrid grid = new LookupGrid();
		    grid.setCaption("Template Id List");
		    grid.setRowNum("10");
		    grid.setUrl("/path/channel/ChannelMaintAction_fillQryLookup.action?_pageRef=" + get_pageRef());
		    int cols = name.length;
		    List<LookupGridColumn> lsGridColumn = new ArrayList<LookupGridColumn>();
	
		    for(int i = 0; i < cols; i++)
		    {
			// Defining each column
			LookupGridColumn gridColumn = new LookupGridColumn();
			gridColumn.setName(name[i]);
			gridColumn.setIndex(name[i]);
			gridColumn.setColType(colType[i]);
			gridColumn.setTitle(titles[i]);
			gridColumn.setSearch(true);
			// adding column to the list
			lsGridColumn.add(gridColumn);
		    }
		    lookup(grid, lsGridColumn, null, criteria);
		}
		catch(Exception e)
		{
		    // log.error(e, "Error constructing the query lookup");
		    handleException(e, "Error constructing the query lookup", "constructingQryLkp.exceptionMsg._key");
		}
		return SUCCESS;
    }
    
    
    public String fillQryLookup() throws JSONException
    {
		try
		{
		    setSearchFilter(criteria);
		    copyproperties(criteria);
	
		    if(getRecords() == 0)
		    {
			setRecords(channelBO.returnTempIdListCount(criteria));
		    }
	
		    List<GTW_PWS_TMPLT_MASTERVO> tempIdList = channelBO.returnTempIdList(criteria);
		    setGridModel(tempIdList);
		}
		catch(Exception e)
		{
		    // log.error(e, "Error filling query lookup");
		    handleException(e, "Error filling query lookup", "fillQryLookup.exceptionMsg._key");
		}
		return SUCCESS;
    }

	public ChannelSC getCriteria() {
		return criteria;
	}

	public void setCriteria(ChannelSC criteria) {
		this.criteria = criteria;
	}


	public void setChannelBO(ChannelBO channelBO) {
		this.channelBO = channelBO;
	}
	
}
