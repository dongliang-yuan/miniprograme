import { config } from '../../config/index';

/** 获取个人中心信息（无真实接口时返回空数据） */
export function fetchPerson() {
  return Promise.resolve({
    avatarUrl: '',
    nickName: '',
    phoneNumber: '',
    address: null,
  });
}
