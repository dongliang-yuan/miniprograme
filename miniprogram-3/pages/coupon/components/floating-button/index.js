Component({
  data: { icon: 'cart' },

  properties: {
    count: {
      type: Number,
    },
  },

  methods: {
    goToCart() {
      // 购物车功能已移除，车票小程序不需要
      wx.showToast({
        title: '车票小程序无需购物车',
        icon: 'none',
      });
    },
  },
});
