import { fetchCouponDetail } from '../../../services/coupon/index';
// import { fetchGoodsList } from '../../../services/good/fetchGoods'; // 商品服务已移除
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    goods: [],
    detail: {},
    couponTypeDesc: '',
    showStoreInfoList: false,
    cartNum: 2,
  },

  id: '',

  onLoad(query) {
    const id = parseInt(query.id);
    this.id = id;

    this.getCouponDetail(id);
    this.getGoodsList(id);
  },

  getCouponDetail(id) {
    fetchCouponDetail(id).then(({ detail }) => {
      this.setData({ detail });
      if (detail.type === 2) {
        if (detail.base > 0) {
          this.setData({
            couponTypeDesc: `满${detail.base / 100}元${detail.value}折`,
          });
        } else {
          this.setData({ couponTypeDesc: `${detail.value}折` });
        }
      } else if (detail.type === 1) {
        if (detail.base > 0) {
          this.setData({
            couponTypeDesc: `满${detail.base / 100}元减${detail.value / 100}元`,
          });
        } else {
          this.setData({ couponTypeDesc: `减${detail.value / 100}元` });
        }
      }
    });
  },

  getGoodsList(id) {
    // 商品列表功能已移除，车票小程序不需要
    // fetchGoodsList(id).then((goods) => {
    //   this.setData({ goods });
    // });
    this.setData({ goods: [] });
  },

  openStoreList() {
    this.setData({
      showStoreInfoList: true,
    });
  },

  closeStoreList() {
    this.setData({
      showStoreInfoList: false,
    });
  },

  goodClickHandle(e) {
    // 商品详情页面已移除，车票小程序不需要
    wx.showToast({
      title: '该功能已移除',
      icon: 'none',
    });
  },

  cartClickHandle() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '点击加入购物车',
    });
  },
});
