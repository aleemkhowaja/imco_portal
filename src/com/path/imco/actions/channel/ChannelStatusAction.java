package com.path.imco.actions.channel;

import java.util.List;

import com.path.dbmaps.vo.GTW_CHANNELVO;
import com.path.imco.bo.channel.ChannelConstant;
import com.path.imco.vo.channel.ChannelSC;
import com.path.struts2.lib.common.base.LookupBaseAction;
import com.path.vo.common.SessionCO;
import com.path.vo.common.select.SelectSC;
import com.path.vo.common.status.StatusCO;

public class ChannelStatusAction extends LookupBaseAction
{
	
	private ChannelSC criteria;
	
	public String loadStatusGrid() {
		String[] searchCol = { "userName", "status_desc", "status_date", "server_date" };

		List<StatusCO> resultList;
		List<String> colList;
		GTW_CHANNELVO channelVO = new GTW_CHANNELVO();
		try {
			SessionCO sessionCO = returnSessionObject();
			criteria.setSearchCols(searchCol);
			copyproperties(criteria);

			// report_queryVO.setCOMP_CODE(sessionCO.getCompanyCode());
			colList = ChannelConstant.channelStatusLst;
			SelectSC lovCriteria = new SelectSC();
			lovCriteria.setLanguage(sessionCO.getLanguage());
			lovCriteria.setLovTypeId(ChannelConstant.LOV_TYPE_STATUS);
			lovCriteria.setCompCode(sessionCO.getCompanyCode());

			channelVO.setCHANNEL_ID(criteria.getChannelId());

			resultList = returnCommonLibBO().generateStatusList(channelVO, colList, lovCriteria);
			setGridModel(resultList);
		} catch (Exception ex) {
			handleException(ex, null, null);
		}
		return SUCCESS;
	}
}
