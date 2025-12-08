import { fetchTicketList } from '../../services/ticket/fetchTicketList';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    serviceList: [
      { name: '哈尔滨', label: '专线', type: 'line' },
      { name: '延吉', label: '专线', type: 'line' },
      { name: '亚布力', label: '专线', type: 'line' },
      { name: '长白山', label: '专线', type: 'line' },
      { name: '雪谷', label: '专线', type: 'line' },
      { name: '景点游玩', label: '', type: 'scenic' },
    ],
    ticketList: [],
    pageLoading: false,
  },

  onShow() {
    this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.loadTicketList();
  },

  loadTicketList() {
    wx.stopPullDownRefresh();
    this.setData({ pageLoading: true });

    fetchTicketList()
      .then((ticketList) => {
        this.setData({
          ticketList,
          pageLoading: false,
        });
      })
      .catch(() => {
        this.setData({ pageLoading: false });
        Toast({
          context: this,
          selector: '#t-toast',
          message: '加载失败，请重试',
        });
      });
  },

  onServiceClick(e) {
    const { index } = e.currentTarget.dataset;
    const service = this.data.serviceList[index];
    Toast({
      context: this,
      selector: '#t-toast',
      message: `点击了${service.name}`,
    });
  },

  onTicketClick(e) {
    const { ticketId, route, price } = e.detail;
    // 跳转到车票详情页
    wx.navigateTo({
      url: `/pages/ticket/detail/index?route=${route}`,
    });
  },

  navToSearchPage() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '车票搜索功能开发中',
    });
  },

  callService() {
    wx.makePhoneCall({
      phoneNumber: '4006336868',
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '拨打客服电话失败',
        });
      },
    });
  },
});
