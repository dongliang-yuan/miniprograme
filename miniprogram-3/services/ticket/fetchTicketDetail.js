import { config } from '../../config/index';

/** 获取车票详情 - 模拟数据 */
function mockFetchTicketDetail(params) {
  const { delay } = require('../_utils/delay');
  const { getTicketDetailList } = require('../../model/ticket');
  return delay(300).then(() => getTicketDetailList(params));
}

/** 获取车票详情 */
export function fetchTicketDetail(params) {
  if (config.useMock) {
    return mockFetchTicketDetail(params);
  }
  return new Promise((resolve) => {
    // 真实API调用
    wx.request({
      url: 'https://your-api.com/ticket/detail',
      method: 'GET',
      data: params,
      success: (res) => {
        resolve(res.data);
      },
      fail: () => {
        resolve([]);
      },
    });
  });
}

