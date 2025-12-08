import Toast from 'tdesign-miniprogram/toast/index';

const emptyUser = { avatarUrl: '', nickName: '', phoneNumber: '' };

Page({
  data: {
    authed: false,
    userInfo: emptyUser,
    countsData: {
      coupon: 0,
      point: 0,
    },
  },

  onShow() {
    // 进入“我的”页，重置并清理本地缓存，避免旧数据残留
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('authToken');
    this.resetState();
    if (this.getTabBar && this.getTabBar()) {
      this.getTabBar().init();
    }
  },

  resetState() {
    // 默认不读取缓存，进入页面即为未登录状态
    this.setData({
      authed: false,
      userInfo: emptyUser,
      countsData: {
        coupon: 0,
        point: 0,
      },
    });
  },

  onAuthorize() {
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: (res) => {
        wx.login({
          success: (loginRes) => {
            const code = loginRes.code;
            if (code) {
              wx.setStorageSync('authToken', code);
            }
          },
        });
        const u = res.userInfo || {};
        const info = {
          avatarUrl: u.avatarUrl || '',
          nickName: u.nickName || '用户',
          phoneNumber: u.phoneNumber || '',
        };
        wx.setStorageSync('userInfo', info);
        this.setData({
          authed: true,
          userInfo: info,
        });
        Toast({
          context: this,
          selector: '#t-toast',
          message: '登录成功',
        });
      },
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '授权失败',
        });
      },
    });
  },

  onLogout() {
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('authToken');
    this.setData({
      authed: false,
      userInfo: emptyUser,
    });
    Toast({
      context: this,
      selector: '#t-toast',
      message: '已退出登录',
    });
  },

  gotoAddress() {
    wx.navigateTo({ url: '/pages/user/address/list/index' });
  },

  gotoOrderList() {
    wx.navigateTo({ url: '/pages/order/order-list/index' });
  },

  gotoCoupon() {
    wx.navigateTo({ url: '/pages/coupon/coupon-list/index' });
  },

  callService() {
    wx.makePhoneCall({
      phoneNumber: '4006336868',
      fail: () => {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '拨打失败',
        });
      },
    });
  },

  // 精简后保留必要方法（如需扩展在此添加）
});
