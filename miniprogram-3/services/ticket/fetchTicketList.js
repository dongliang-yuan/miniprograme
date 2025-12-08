import { config } from '../../config/index';

/** 获取车票列表 - 模拟数据 */
function mockFetchTicketList() {
  const { delay } = require('../_utils/delay');
  const { getTicketList } = require('../../model/ticket');
  return delay(300).then(() => getTicketList());
}

/** 获取车票列表 */
export function fetchTicketList() {
  if (config.useMock) {
    return mockFetchTicketList();
  }
  return new Promise((resolve) => {
    // 真实API调用
    wx.request({
      url: 'https://your-api.com/tickets',
      method: 'GET',
      success: (res) => {
        resolve(res.data);
      },
      fail: () => {
        resolve([]);
      },
    });
  });
}


