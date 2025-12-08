/** 生成车票列表数据 */
export function getTicketList() {
  return [
    {
      id: '1',
      route: '雪乡→长白山北坡(二道白河)',
      price: '130.00',
    },
    {
      id: '2',
      route: '长白山北坡(二道白河)→雪乡',
      price: '130.00',
    },
    {
      id: '3',
      route: '哈尔滨→雪乡',
      price: '120.00',
    },
    {
      id: '4',
      route: '雪乡→哈尔滨',
      price: '120.00',
    },
    {
      id: '5',
      route: '延吉→长白山',
      price: '80.00',
    },
    {
      id: '6',
      route: '长白山→延吉',
      price: '80.00',
    },
    {
      id: '7',
      route: '（拼车）长白山→延吉',
      price: '80.00',
    },
    {
      id: '8',
      route: '（拼车）长白山→延吉',
      price: '80.00',
    },
    {
      id: '9',
      route: '（拼车）长白山→延吉',
      price: '80.00',
    },
    {
      id: '10',
      route: '（拼车）长白山→延吉',
      price: '80.00',
    },
  ];
}

/** 生成车票详情列表数据 */
export function getTicketDetailList(params) {
  const { departure, destination } = params || {};
  
  // 根据出发地和目的地返回对应的车次
  if (departure === '雪乡' && destination === '长白山北坡(二道白河)') {
    return [
      {
        id: '1',
        departure: '雪乡',
        destination: '长白山北坡(二道白河)',
        departureTime: '06:00',
        arrivalTime: '10:00',
        price: '130.00',
      },
      {
        id: '2',
        departure: '雪乡',
        destination: '长白山北坡(二道白河)',
        departureTime: '08:00',
        arrivalTime: '12:00',
        price: '130.00',
      },
      {
        id: '3',
        departure: '雪乡',
        destination: '长白山北坡(二道白河)',
        departureTime: '14:00',
        arrivalTime: '18:00',
        price: '130.00',
      },
    ];
  }
  
  // 默认返回一个车次
  return [
    {
      id: '1',
      departure: departure || '雪乡',
      destination: destination || '长白山北坡(二道白河)',
      departureTime: '06:00',
      arrivalTime: '10:00',
      price: '130.00',
    },
  ];
}


