import { fetchTicketDetail } from '../../../services/ticket/fetchTicketDetail';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    departure: '雪乡',
    destination: '长白山北坡(二道白河)',
    selectedDate: '',
    minDate: '',
    maxDate: '',
    showDatePickerPopup: false,
    ticketList: [],
  },

  onLoad(options) {
    // 从路由参数获取出发地和目的地
    if (options.route) {
      const routeParts = options.route.split('→');
      if (routeParts.length === 2) {
        this.setData({
          departure: routeParts[0].trim(),
          destination: routeParts[1].trim(),
        });
      }
    }

    // 初始化日期
    this.initDate();
    // 加载车票列表
    this.loadTicketList();
  },

  initDate() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2); // 最多选择2个月后的日期

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    this.setData({
      selectedDate: formatDate(today),
      minDate: formatDate(today),
      maxDate: formatDate(maxDate),
    });
  },

  loadTicketList() {
    const { departure, destination, selectedDate } = this.data;
    fetchTicketDetail({
      departure,
      destination,
      date: selectedDate,
    })
      .then((ticketList) => {
        this.setData({ ticketList });
      })
      .catch(() => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '加载车票信息失败',
        });
      });
  },

  goBack() {
    wx.navigateBack();
  },

  swapRoute() {
    const { departure, destination } = this.data;
    this.setData({
      departure: destination,
      destination: departure,
    });
    this.loadTicketList();
  },

  showDatePicker() {
    this.setData({ showDatePickerPopup: true });
  },

  closeDatePicker() {
    this.setData({ showDatePickerPopup: false });
  },

  onDatePickerClose(e) {
    if (!e.detail.visible) {
      this.setData({ showDatePickerPopup: false });
    }
  },

  onDateChange(e) {
    const selectedDate = e.detail.value;
    this.setData({ selectedDate });
    this.closeDatePicker();
    this.loadTicketList();
  },

  onBuyTicket(e) {
    const { index } = e.currentTarget.dataset;
    const ticket = this.data.ticketList[index];
    
    // 跳转到购买确认页面
    wx.navigateTo({
      url: `/pages/order/order-confirm/index?ticketId=${ticket.id}&route=${this.data.departure}→${this.data.destination}&date=${this.data.selectedDate}&price=${ticket.price}`,
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '购买功能开发中',
        });
      },
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

