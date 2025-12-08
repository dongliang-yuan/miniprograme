import { config } from '../../config/index';

const defaultUser = {
  avatarUrl: '',
  nickName: '',
  phoneNumber: '',
};

const emptyCounts = [
  { num: 0, name: '优惠券', type: 'coupon' },
  { num: 0, name: '积分', type: 'point' },
];

const emptyOrderTags = [
  { orderNum: 0, tabType: 5 },
  { orderNum: 0, tabType: 10 },
  { orderNum: 0, tabType: 40 },
  { orderNum: 0, tabType: 0 },
];

const customerServiceInfo = {
  servicePhone: '4006336868',
  serviceTimeDuration: '每日 9:00-18:00',
};

function buildUserCenter(userInfo = defaultUser) {
  return {
    userInfo,
    countsData: emptyCounts,
    orderTagInfos: emptyOrderTags,
    customerServiceInfo,
  };
}

/** 获取个人中心信息（仅返回存量数据，不再自动填充模拟） */
export function fetchUserCenter() {
  // 若已有登录信息直接返回
  const cachedUser = wx.getStorageSync('userInfo');
  if (cachedUser) {
    return Promise.resolve(buildUserCenter(cachedUser));
  }

  // 无缓存且无真实接口，直接返回空数据，不再自动登录或填充默认
  return Promise.resolve(buildUserCenter(defaultUser));
}
