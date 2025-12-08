import { fetchTicketDetail } from '../../../services/ticket/fetchTicketDetail';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    departure: '雪乡',
    destination: '长白山北坡(二道白河)',
    selectedDate: '',
    selectedDateText: '',
    selectedTime: '9:00',
    minDate: '',
    maxDate: '',
    showDatePickerPopup: false,
    showSpecPickerPopup: false,
    ticketList: [],
    // 产品信息
    productImages: ['bus'], // 使用'bus'作为占位符，显示emoji图标
    currentImageIndex: 0,
    price: '130.00',
    originalPrice: '0.00',
    stockStatus: '即将售完',
    salesCount: 5524,
    specCount: 60,
    // 标签
    activeTab: 'intro',
    productIntro: '产品介绍内容...',
    ridingInfo: '乘车信息内容...',
    // 规格选项
    specOptions: [],
    selectedSpecIndex: 0,
    // 收藏状态
    isFavorite: false,
    // 顶部标签显示状态（调试期默认展示）
    showHeaderTabs: true,
    activeHeaderTab: 'product',
    scrollIntoView: '',
    scrollTop: 0,
    detailSectionTop: 0,
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
    // 计算详情区域位置
    this.calculateDetailSectionPosition();
  },

  onReady() {
    // 再次计算，确保节点渲染后位置准确
    this.calculateDetailSectionPosition();
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

    const formatDateText = (date) => {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日`;
    };

    const todayStr = formatDate(today);
    this.setData({
      selectedDate: todayStr,
      selectedDateText: formatDateText(today),
      minDate: todayStr,
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
        // 生成规格选项
        const specOptions = ticketList.map((item, index) => ({
          time: item.departureTime || '9:00',
          date: this.data.selectedDateText,
          index: index,
        }));
        
        this.setData({ 
          ticketList,
          specOptions: specOptions.length > 0 ? specOptions : [
            { time: '9:00', date: this.data.selectedDateText, index: 0 },
            { time: '12:00', date: this.data.selectedDateText, index: 1 },
            { time: '15:00', date: this.data.selectedDateText, index: 2 },
          ],
        });
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
    const date = new Date(selectedDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const selectedDateText = `${month}月${day}日`;
    
    this.setData({ 
      selectedDate,
      selectedDateText,
    });
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

  // 显示菜单
  showMenu() {
    // 可以显示侧边栏菜单
    Toast({
      context: this,
      selector: '#t-toast',
      message: '菜单功能',
    });
  },

  // 更多操作
  onMore() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '更多操作',
    });
  },

  // 分享
  onShare() {
    wx.showShareMenu({
      withShareTicket: true,
    });
  },

  // 显示规格选择器
  showSpecPicker() {
    this.setData({ showSpecPickerPopup: true });
  },

  // 关闭规格选择器
  closeSpecPicker() {
    this.setData({ showSpecPickerPopup: false });
  },

  // 规格选择器关闭事件
  onSpecPickerClose(e) {
    if (!e.detail.visible) {
      this.setData({ showSpecPickerPopup: false });
    }
  },

  // 选择规格
  selectSpec(e) {
    const { index } = e.currentTarget.dataset;
    const spec = this.data.specOptions[index];
    if (spec) {
      this.setData({
        selectedSpecIndex: index,
        selectedTime: spec.time,
      });
    }
  },

  // 切换标签
  switchTab(e) {
    const { tab } = e.currentTarget.dataset;
    this.setData({ activeTab: tab });
  },

  // 返回首页
  goHome() {
    wx.switchTab({
      url: '/pages/home/home',
      fail: () => {
        wx.navigateTo({
          url: '/pages/home/home',
        });
      },
    });
  },

  // 切换收藏
  toggleFavorite() {
    this.setData({
      isFavorite: !this.data.isFavorite,
    });
    Toast({
      context: this,
      selector: '#t-toast',
      message: this.data.isFavorite ? '已收藏' : '已取消收藏',
    });
  },

  // 去购物车
  goCart() {
    // 跳转到购物车页面
    Toast({
      context: this,
      selector: '#t-toast',
      message: '购物车功能',
    });
  },

  // 立即购买
  onBuyNow() {
    const { selectedTime, selectedDate, departure, destination, price } = this.data;
    // 跳转到购买确认页面
    wx.navigateTo({
      url: `/pages/order/order-confirm/index?ticketId=&route=${departure}→${destination}&date=${selectedDate}&time=${selectedTime}&price=${price}`,
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '购买功能开发中',
        });
      },
    });
  },

  // Swiper切换事件
  onSwiperChange(e) {
    this.setData({
      currentImageIndex: e.detail.current,
    });
  },

  // 滚动事件
  onScroll(e) {
    const scrollTop = e.detail.scrollTop;
    
    // 始终展示顶部标签（调试期保持可见）
    const showTabs = true;
    
    // 判断当前在哪个区域
    // 详情区域大约在内容标签之后，估算位置
    let activeTab = 'product';
    if (showTabs) {
      // 当滚动到一定位置时，切换到详情标签
      // 这里可以根据实际内容高度调整阈值
      // 产品图片500rpx + 价格区域 + 路线区域 + 选择区域 + 内容标签 + 标签内容区域
      const threshold = 1000; // 大约滚动1000rpx后进入详情区域
      if (scrollTop >= threshold) {
        activeTab = 'detail';
      }
    }
    
    this.setData({
      scrollTop,
      showHeaderTabs: showTabs,
      activeHeaderTab: activeTab,
    });
  },

  // 计算详情区域位置
  calculateDetailSectionPosition(callback) {
    console.log('[ticket-detail] calculateDetailSectionPosition start');
    // 使用setTimeout确保DOM已渲染
    setTimeout(() => {
      const query = wx.createSelectorQuery().in(this);
      query.select('#detail-section').boundingClientRect((rect) => {
        console.log('[ticket-detail] detail-section rect', rect);
        if (rect) {
          const query2 = wx.createSelectorQuery().in(this);
          query2.select('.scroll-content').boundingClientRect((scrollRect) => {
            console.log('[ticket-detail] scroll-content rect', scrollRect);
            if (scrollRect && rect.top > 0) {
              // 计算详情区域相对于滚动容器的位置
              const detailTop = rect.top - scrollRect.top + this.data.scrollTop;
              this.setData(
                {
                  detailSectionTop: detailTop,
                },
                () => {
                  if (typeof callback === 'function') {
                    callback(detailTop);
                  }
                }
              );
            }
          }).exec();
        } else if (typeof callback === 'function') {
          callback(0);
        }
      }).exec();
    }, 800);
  },

  // 滚动到商品区域
  scrollToProduct() {
    console.log('[ticket-detail] scrollToProduct');
    this.setData({
      activeHeaderTab: 'product',
      scrollIntoView: 'product-section',
    });
    // 重置 scrollIntoView，避免下次无法触发
    setTimeout(() => {
      this.setData({ scrollIntoView: '' });
    }, 800);
  },

  // 滚动到详情区域
  scrollToDetail() {
    console.log('[ticket-detail] scrollToDetail');
    // 先重新计算位置，确保节点高度变化后可用
    this.calculateDetailSectionPosition((detailTop) => {
      console.log('[ticket-detail] detailSectionTop computed', detailTop);
      this.setData({
        activeHeaderTab: 'detail',
        scrollIntoView: 'detail-section',
      });
      setTimeout(() => {
        this.setData({ scrollIntoView: '' });
      }, 800);
    });
  },
});

