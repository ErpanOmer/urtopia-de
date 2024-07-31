
const oneDay = 24 * 60 * 60 * 1000
const now = +new Date()

// 禁用日期 最大天数
const disable_date_max_limit = 60

const getData = (date = new Date()) => {
  if (typeof date !== 'object') {
    if (typeof date === 'string') {
      date = date.replace(/-/g, '/')
    }

    date = new Date(date)
  }

  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)

  return date
}

const getDateString = function (date) {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

// 查询日期偏移量
const findOffset = ([nowWeek, vailableWeek]) => {
  if (nowWeek === vailableWeek) {
    return 0
  }

  return vailableWeek > nowWeek ? vailableWeek - nowWeek : 7 - (nowWeek - vailableWeek)
}

function getBikeAndSeries (availableSizes = []) {
  return availableSizes.map(size => {
      const [bike, series] = size.split(' ')

      return `${bike}${series ? ' ' + series : ''}`
  })
}

// 查找可预约到星期几
const findAvailableWeek = (d, businessHours) => {
  if (businessHours[d]) {
    return d
  }

  for (let i = d; i < d + 7; i++) {

    if (businessHours[i % 7]) {
      return i % 7
    }
  }

  return -1
}

// 查询禁用日期
const findDisable = (str, index = 0, disableDate = []) => {
  for (let i = index; i < disableDate.length; i++) {
    if (disableDate[i] === str) {
      return i
    }
  }
}

const dateToString = (time = new Date()) => {
  time = time.toString().split(' ')
  return `${time[2]}. ${time[1]}`
}

// 可用日期计算
const findAvalibaleDate = store => {
  let index = 0
  let date = now

  for (let i = 0; index < disable_date_max_limit; index++) {
    const d = getData(date)
    const str = getDateString(d)

    // 保存上次 循环的index
    index = findDisable(str, index, store.disableDate)

    if (!isNaN(index)) {
      date = Number(d) + oneDay
      continue
    }

    const currentWeek = d.getDay()
    const AvailableWeek = findAvailableWeek(currentWeek, store.businessHours)

    if (AvailableWeek === -1) {
      date = now
      break
    }

    if (currentWeek === AvailableWeek) {
      date = str
      break
    }

    date = Number(d) + (oneDay * findOffset([currentWeek, AvailableWeek]))
  }

  return dateToString(getData(date))
}

//  禁用日期动态生成函数
//  disable_limit:  禁用几天               格式:  365 或者区间 [['2023-9-10', '2023-10-10'], ['2023-10-22', '2023-11-10']]
//  ignore_date：   跳过某些日期不禁用      格式:  ['2023-7-27', '2023-7-28', '2023-7-29']  
//  start_time:     从什么时候开始禁用      格式： 2023-7-27 （默认今天)

function createdisableDates(disable_limit = 0, ignore_date = [], start_time = new Date()) {
  let temp = []

  if (Array.isArray(disable_limit)) {
    for (const iterator of disable_limit) {
      if (typeof iterator === 'string') {
        temp.push(getDateString(getData(iterator)))
        continue
      }

      let start = getData(iterator[0])
      let end = getData(iterator[1])

      for (let index = 0; index < disable_date_max_limit; index++) {
        if (Number(start) === Number(end)) {
          break
        }

        temp.push(getDateString(start))

        start = getData(oneDay + Number(start))
      }


      temp.push(getDateString(end))
    }
  } else {
    let start = getData(start_time)

    for (let index = 0; index < disable_limit; index++) {
      temp.push(getDateString(start))
      start = getData(oneDay + Number(start))
    }
  }

  temp = temp.slice(0, Math.min(disable_date_max_limit, temp.length))

  for (const iterator of ignore_date) {
    const date = getDateString(getData(iterator))

    const index = temp.findIndex(t => t === date)

    if (index > -1) {
      temp.splice(index, 1)
    }
  }

  return temp
}


const testRides = [
  {
    city: 'Frankfurt am Main',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fahrrad Laden Wagner',
        phone: '+496995294844',
        email: 'info@fahrradwagner.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Woogstraße 21, 60431 Frankfurt am Main",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main_dcfbb429-041a-46e8-809c-988adaf41dfd.jpg?v=1680920985",
        testrideSpot: "Frankfurt am Main",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-12:00",
          "09:00-18:00",
          "09:00-18:00",
          "",
        ],
      },
      {
        name: 'IEDAU- Urtopia Service Zentrum',
        phone: '+49 61032076414',
        email: 'probefahrt@iedau.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Otto-Hahn-Str. 5-7 63225 Langen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_ecdffc6e-e91f-43db-9e17-e0c98b59a1a5.png?v=1721375518",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "M/L, Chord",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Carbon 1 Size M/L',
          'Chord',
          'Chord X',
          'Fusion'
        ],
        businessHours: [
          "",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "",
        ],
      },
    ]
  },
  {
    city: 'otterndorf',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_e5e95421-6975-48c2-b950-ba1bd858744e.png?v=1718328335',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
    ],
    stores: [
      {
        name: 'NordWestRad',
        phone: '04751 9910788',
        email: 'service-nwr@nordwestrad.de',
        timezone: "Düsseldorf, Germany (GMT+1)",
        add: "Frank Hoppe,Am Bahnhof 1,21762 Otterndorf",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_e5e95421-6975-48c2-b950-ba1bd858744e.png?v=1718328335",
        testrideSpot: "Grevesmuhlen",
        testRideSize: "L, Chord",
        availableSizes: [
          'Carbon 1 Pro Size M'
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
      }
    ]
  },
  {
    city: 'Grevesmuhlen',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_e5e95421-6975-48c2-b950-ba1bd858744e.png?v=1718328335',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
    ],
    stores: [
      {
        name: 'Fahrrad Thurow',
        phone: '+493881713678',
        email: 'info@fahrrad-thurow.de',
        timezone: "Düsseldorf, Germany (GMT+1)",
        add: "August-Bebel-Straße 33, 23936 Grevesmühlen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_e5e95421-6975-48c2-b950-ba1bd858744e.png?v=1718328335",
        testrideSpot: "Grevesmuhlen",
        testRideSize: "L, Chord",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "09:00-17:00",
          "",
        ],
      }
    ]
  },
  {
    city: 'Wiesbaden',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_e5e95421-6975-48c2-b950-ba1bd858744e.png?v=1718328335',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
    ],
    stores: [
      {
        name: 'Johanns Velowelt - Bike Rent',
        phone: '61342401010',
        email: 'jokraffert@web.de',
        timezone: "Düsseldorf, Germany (GMT+1)",
        add: "Hauptstraße 85, 55246 Wiesbaden",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_e5e95421-6975-48c2-b950-ba1bd858744e.png?v=1718328335",
        testrideSpot: "Wiesbaden",
        testRideSize: "L, Chord",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
          'Chord X'
        ],
        businessHours: [
          "",
          "15:00-18:00",
          "15:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-14:00",
          "",
        ],
      }
    ]
  },
  {
    city: 'Kreuzau',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
    ],
    stores: [
      {
        name: 'Fahrrad Schuster',
        phone: '02422503399',
        email: 'fahrrad.schuster@t-online.de',
        timezone: "Düsseldorf, Germany (GMT+1)",
        add: "An Burg Kreuzau 1, 52372 Kreuzau",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240605-094824_bb75f969-6a0e-4760-9201-cf1d02556ecb.png?v=1718075604",
        testrideSpot: "Kreuzau",
        testRideSize: "L, Chord",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "08:00-17:00",
          "08:00-17:00",
          "",
          "08:00-17:00",
          "08:00-17:00",
          "09:00-13:00",
        ],
      }
    ]
  },
  {
    city: 'Düsseldorf',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
    ],
    stores: [
      {
        name: 'Zweirad Hofmann',
        phone: '+49 163 2799708',
        email: 'hofmkay@gmail.com',
        timezone: "Düsseldorf, Germany (GMT+1)",
        add: "Ackerstraße 143, 40233 Düsseldorf",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20231016-210310.jpg?v=1697461405",
        testrideSpot: "Düsseldorf",
        testRideSize: "L, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-14:00",
        ],
      }
    ]
  },
  {
    city: 'Leingarten',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
    ],
    stores: [
      {
        name: 'Leintal Bike GmbH',
        phone: '+49 7131 901145',
        email: 'info@leintal-bike.de',
        timezone: "Düsseldorf, Germany (GMT+1)",
        add: "Benzstr. 25, 74211 Leingarten",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_1_ffa5338b-e099-41c7-9be9-be6c62496c7d.png?v=1717487530",
        testrideSpot: "Leingarten",
        testRideSize: "L, Chord",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "09:00-19:00",
          "09:00-19:00",
          "09:00-19:00",
          "09:00-19:00",
          "09:00-19:00",
          "09:00-17:00",
        ],
      }
    ]
  },
  {
    city: 'Rosenheim',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
    ],
    stores: [
      {
        name: 'Mr.bike',
        phone: '+49 173 1588506',
        email: 'info@mr-bike.com',
        timezone: "Düsseldorf, Germany (GMT+1)",
        add: "Rechenauuerstrasse 20B, 83022. Rosenheim",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_1_ffa5338b-e099-41c7-9be9-be6c62496c7d.png?v=1717487530",
        testrideSpot: "Rosenheim",
        testRideSize: "L, Chord",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord X'
        ],
        businessHours: [
          "",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-14:00",
        ],
      }
    ]
  },
  {
    city: 'Trier',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
    ],
    stores: [
      {
        name: 'Bikespot Trier',
        phone: '15225155609',
        email: 'Info@bikespot-trier.de',
        timezone: "Düsseldorf, Germany (GMT+1)",
        add: "Karl-Marx-Straße 12, 54290 Trier",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_1_ffa5338b-e099-41c7-9be9-be6c62496c7d.png?v=1717487530",
        testrideSpot: "Trier",
        testRideSize: "L, Chord",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "10:00-18:30",
          "10:00-18:30",
          "",
          "10:00-18:30",
          "10:00-18:30",
          "10:00-15:00",
        ],
      }
    ]
  },
  {
    city: 'Berlin',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Berlin.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fahrrad & Service Jörg Kohnert',
        phone: '+493074781493',
        email: 'info@fahrradservice-Frohnau.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Welfenallee 1, 13465 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_229443ca-c6d0-4ea1-8228-0c7e95433db8.png?v=1717487328",
        testrideSpot: "Berlin",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-14:00",
        ],
      },
      {
        name: 'Fahrradstation',
        phone: '+49 180 - 510 8000',
        email: 'buero@fahrradstation.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Dorotheenstraße 30, 10117 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_229443ca-c6d0-4ea1-8228-0c7e95433db8.png?v=1717487328",
        testrideSpot: "Berlin",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-18:00",
          "10:00-19:00",
          "10:00-16:00",
        ],
      },
      {
        name: 'Fahrradladen&Service',
        phone: '+4917626607366',
        email: 'Alban.13359@hotmail.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Wollankstr.74, 13359 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Berlin.jpg?v=1679406972",
        testrideSpot: "Berlin",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-16:00",
        ],
      },
      {
        name: 'Fharrad Laden Luft und Liebe',
        phone: '+4917620344751',
        email: 'albun.13359@hotmail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Danziger Str. 145, 10407 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_3.png?v=1716805920",
        testrideSpot: "Berlin",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-16:00",
        ],
      },
    ]
  },
  {
    city: 'Bedburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Berlin.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: `Son's Bike shop`,
        phone: '022728064483',
        email: 'justinburggraf@gmail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Lindenstraße 10, 50181 Bedburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_6_d1ad05cd-abde-43a4-b8bb-c3ffebfedc4d.png?v=1717490189",
        testrideSpot: "Bedburg",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord X'
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-14:00",
        ],
      },
    ]
  },
  {
    city: 'Hamburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hamburg_19874cca-b8ea-4f39-824a-d987e3410a01.jpg?v=1683867163',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Moritz Falk',
        phone: '+49 151 14461642',
        email: 'moritz.urtopia@gmail.com',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Winterhude, 22299 Hamburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hamburg_19874cca-b8ea-4f39-824a-d987e3410a01.jpg?v=1683867163",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "9:00-21:00",
          "16:00-21:00",
          "16:00-21:00",
          "16:00-21:00",
          "16:00-21:00",
          "16:00-21:00",
          "9:00-21:00",
        ],
      },
      {
        name: 'Zweiradhaus Ehrig',
        phone: '+49 406034501',
        email: 'info@ehrig24.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Claus-Ferck-Straße 39 22359 Hamburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zweiradhaus_Ehrig1.jpg?v=1691088195",
        testrideSpot: "Hamburg",
        testRideSize: "M",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M'
        ],
        businessHours: [
          "",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-16:00",
        ],
      },
      {
        name: 'Volkan Kartal',
        phone: '+49 176 56710791',
        email: 'Volkan.urtopia@gmail.com',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Am Knill 1H, 22147 Hamburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hamburg_19874cca-b8ea-4f39-824a-d987e3410a01.jpg?v=1683867163",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        isPartner: true,
        availableSizes: [
          'Carbon 1s Size L',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "",
        ],
        disableDate: createdisableDates([['2023-9-16', '2023-10-8']]),
      },
      {
        name: 'Norddeutsche Zweiradschmiede',
        phone: '+494088359912',
        email: 'zweiradschmiede.nord@gmail.com',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Bramfelder Ch 220, 22799 Hamburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Norddeutsche_Zweiradschiede.jpg?v=1693272716",
        testrideSpot: "Hamburg",
        testRideSize: "L, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
        ],
        businessHours: [
          "",
          "10:00-13:00, 17:00-18:00",
          "10:00-13:00, 17:00-18:00",
          "10:00-13:00, 17:00-18:00",
          "10:00-13:00, 17:00-18:00",
          "10:00-13:00, 17:00-18:00",
          "",
        ],
      },
      {
        name: 'Velo-Shop',
        phone: '+49404204944',
        email: 'info@veloshop.de',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Eppendorfer Weg 250, 20251 Hamburg, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/VELO_SHOP.jpg?v=1693272717",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "14:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-14:00",
        ],
      },
      {
        name: 'Fahrrad Rothe',
        phone: '+4940865020',
        email: 'service@fahrrad-rothe.de',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Dormienstraße 4, 22587 Hamburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Fahrrad_Rothe.jpg?v=1693272716",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "10:00-13:00, 14:00-18:00",
          "10:00-13:00, 14:00-18:00",
          "10:00-13:00, 14:00-18:00",
          "10:00-13:00, 14:00-18:00",
          "10:00-14:00",
        ],
      },
      {
        name: 'Michael Kaersten',
        phone: '+49 1781817761',
        email: 'urtopia@kaersten.net',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Grandweg 82 22529 Hamburg, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output.jpg?v=1696859457",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "10:00-20:00",
          "10:00-20:00",
          "10:00-20:00",
          "10:00-20:00",
          "",
          "",
        ],
      },
      {
        name: 'TRANKVILE electric vehicles',
        phone: '+49 1579 2356034',
        email: 'kw@trankvile.com',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Nedderfeld 110 K22529 Hamburg Eppendorf",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output.jpg?v=1696859457",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-18:00",
          "12:00-16:00",
        ],
      },
    ]
  },
  {
    city: 'Winsen',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fahrrad Outlet Winsen',
        phone: '+49 4171 6923355',
        email: 'Fahrradoutlet2022@gmail.com',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Hamburger Str. 14, 21423 Winsen (Luhe)",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_4.png?v=1714095897",
        testrideSpot: "Winsen",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size M',
          'Chord'
        ],
        businessHours: [
          "",
          "10:00-18:00",
           "10:00-18:00",
          "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
          "10:00-14:00",
        ],
      }
    ]
  },
  {
    city: 'Soest',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'BikeShop soest',
        phone: '+49292165087',
        email: 'info@bikeshop-soest.de',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Römerweg 2A, 59494 Soest",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_6.png?v=1714096927",
        testrideSpot: "Soest",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
          'Fusion'
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-13:00",
        ],
      }
    ]
  },
  {
    city: 'München',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Len',
        phone: '0170 5231069',
        email: 'len.lucas@gmx.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "82166 Graefelfing, Munich, Bavaria",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972",
        testrideSpot: "München",
        testRideSize: "M",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "10:00-12:00,12:00-20:00",
          "8:00-9:30,13:00-14:30,18:00-20:00",
          "8:00-9:30,13:00-14:30,18:00-20:00",
          "8:00-9:30,13:00-14:30,18:00-20:00",
          "8:00-9:30,13:00-14:30,18:00-20:00",
          "8:00-9:30,13:00-14:30,18:00-20:00",
          "10:00-12:00,12:00-20:00",
        ],
      },
    ]
  },
  {
    city: 'Münster',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testride-munster.jpg?v=1671252848',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord',
      'Urtopia Chord X',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Wilfried Beurich',
        phone: '+0174 9610700',
        email: 'wbeurich@muenster.de',
        timezone: "Münster, Germany (GMT+1)",
        add: "Feldstiege 98c in Münster 48161, North Rhine-Westphalia",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testride-munster.jpg?v=1671252848",
        testrideSpot: "Münster",
        testRideSize: "L, Chord",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size M/L',
          'Chord'
        ],
        businessHours: [
          "",
          "",
          "",
          "16:00-20:00",
          "16:00-20:00",
          "14:00-18:00",
          "10:00-12:00,12:00-13:00",
        ],
      },
      {
        name: 'Der Holländer',
        phone: '+4925729607678',
        email: 'wolle02@me.com',
        timezone: "Münster, Germany (GMT+1)",
        add: "Machangelstr 1448282 Emsdetten",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20231219-103111.jpg?v=1702953152",
        testrideSpot: "Münster",
        testRideSize: "L, M, Chord, Chord X",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Carbon 1s Size M/L',
          'Chord',
          'Chord X',
        ],
        businessHours: [
          "",
          "9:00-12:00, 12:00-13:00, 14:30-18:00",
          "9:00-12:00, 12:00-13:00, 14:30-18:00",
          "9:00-12:00, 12:00-13:00, 14:30-18:00",
          "9:00-12:00, 12:00-13:00, 14:30-18:00",
          "10:00-12:00, 12:00-13:00, 14:30-17:00",
          "10:00-12:00, 12:00-13:00",
        ],
      },
      {
        name: 'Zweirad-Fachgeschäft The Cross',
        phone: '02518715430',
        email: 'Moni_lombaptist@abv.org',
        timezone: "Münster, Germany (GMT+1)",
        add: "Toppheideweg 15, 48161 Münster",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_1.png?v=1715654059",
        testrideSpot: "Münster",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord X',
        ],
        businessHours: [
          "",
          "",
          "9:00-18:30",
          "9:00-18:30",
          "9:00-18:30",
          "9:00-18:30",
          "9:00-18:30",
        ],
      },
      {
        name: 'ProVelo',
        phone: '017679080008',
        email: 'provelo-ebike@web.de',
        timezone: "Münster, Germany (GMT+1)",
        add: "Von-Holte-Straße 145, 48167 Münster",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_b691e4e0-7054-43ae-9db4-0c33785f58a3.jpg?v=1716177902",
        testrideSpot: "Münster",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
      {
        name: 'Zweirad Civak',
        phone: '+49 025128559940',
        email: ' zweirad.civak8@gmail.com',
        timezone: "Münster, Germany (GMT+1)",
        add: "Kanalstraße 25, 48147 Münster, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_5.png?v=1716806581",
        testrideSpot: "Münster",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "09:30-18:30",
          "09:30-18:30",
          "09:30-18:30",
          "09:30-18:30",
          "09:30-18:30",
          "09:30-18:30",
        ],
      },
      {
        name: 'Radwerk Gallien',
        phone: '+49 0251-76487-03',
        email: 'info@radwerk-gallien.de',
        timezone: "Münster, Germany (GMT+1)",
        add: "Hansaring 33, 48155 Münster, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_6.png?v=1716862289",
        testrideSpot: "Münster",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "11:00-14:00",
        ],
      }
    ]
  },
  {
    city: 'Köln',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Koln.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Henky Roucourt',
        phone: '+0049 0172 3678747',
        email: 'henky.roucourt@koeln.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Nippes, 50737 Köln (in der Nähe der Straßenbahn und Bus Haltestelle: Wilhelm Sollmann Straße)",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Koln.jpg?v=1679406972",
        testrideSpot: "Köln",
        testRideSize: "L,Chord",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size L',
          'Chord'
        ],
        stories: {
          urlText: 'Read Henky’s Story',
          blogUrl: '/blogs/blog/henky-s-story'
        },
        businessHours: [
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "",
          "",
          "",
        ],
      },
      {
        name: 'Rad Welle',
        phone: '+402216110780',
        email: 'info@rad-welle.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Buchheimer Str. 32-34, 51063 Köln",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Koln.jpg?v=1679406972",
        testrideSpot: "Köln",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
        ],
      }
    ]
  },
  {
    city: 'Leipzig',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Leipzig.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Sportshop Bittner',
        phone: '+491738110685',
        email: 'greenturtle-germany@web.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Weißestr. 26 04299 Leipzig",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Sportshop_Bittner.jpg?v=1680923400",
        testrideSpot: "Leipzig",
        testRideSize: "M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
          'Chord',
        ],
        businessHours: [
          "",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "11:00-12:00,12:00-19:00",
          "10:00-12:00,12:00-18:00",
          "",
        ],
      },
      {
        name: 'eBike-Haus.de GmbH',
        phone: '+4934197854310',
        email: 'Leipzig@eBike-Haus.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Johannispl. 21, 04103 Leipzig",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_3.png?v=1713578299",
        testrideSpot: "Leipzig",
        testRideSize: "M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord X',
        ],
        businessHours: [
          "",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Stuttgart',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Stuttgart.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'e-bike schahl OHG Stuttgart',
        phone: '+49711 2865012',
        email: 'info@e-bike-stuttgart.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Schubartstraße 16-1870190 Stuttgart",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0393.jpg?v=1680923489",
        testrideSpot: "Stuttgart",
        testRideSize: "M, Chord X",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
          'Chord X',
        ],
        businessHours: [
          "",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-13:00",
        ],
      },
      {
        name: 'alf bikes & coffee',
        phone: '+49711 47988965',
        email: 'simon@alleliebenfahrrad.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Villastraße 14, 70190 Stuttgart",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0432.jpg?v=1680923539",
        testrideSpot: "Stuttgart",
        testRideSize: "M",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "14:30-19:00",
          "14:30-12:00,12:00-19:00",
          "14:30-12:00,12:00-19:00",
          "14:30-12:00,12:00-19:00",
          "14:30-12:00,12:00-19:00",
          "14:30-19:00",
        ],
      },
    ]
  },
  /*{
    city: 'Hannover',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hannover.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fahrradcafé Linden',
        phone: '+49511 22859331',
        email: 'linden@fahrradcafe.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Fröbelstraße 1 30451 Hannover",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0883.jpg?v=1680923639",
        testrideSpot: "Hannover",
        testRideSize: "L",
        businessHours: [
          "",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "",
        ],
      },*/
  {
    city: 'Essen',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Essen.jpg?v=1679406971',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fahrradladen Heimatliebe Mertes',
        phone: '+4920137648405',
        email: 'team.mertes@fahrrad-essen.eu',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Heidhauser Str. 72, 45239 Essen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0017.jpg?v=1680924343",
        testrideSpot: "Essen",
        testRideSize: "M",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "",
          "10:30-12:00,12:00-19:00",
          "10:30-12:00,12:00-19:00",
          "10:30-12:00,12:00-19:00",
          "10:30-12:00,12:00-19:00",
          "10:30-12:00,12:00-14:30",
        ],
      },
      {
        name: 'Fahrrad Paradies Mertes',
        phone: '+49 20147412306',
        email: 'team@fahrradparadies-essen.de',
        timezone: "Essen, Germany (GMT+1)",
        add: "Frankenstraße 122, Essen 45134",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Essen.jpg?v=1679406971",
        testrideSpot: "Essen",
        testRideSize: "L, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
        ],
        businessHours: [
          "",
          "",
          "11:00-13:00,15:00-19:00",
          "11:00-13:00,15:00-19:00",
          "11:00-13:00,15:00-19:00",
          "11:00-13:00,15:00-19:00",
          "11:00-14:00",
        ],
      },
      {
        name: 'Fahrradladen Mertes',
        phone: '+49 20174850597',
        email: 'joe.mertes@bikefitting-consulting-mertes.de',
        timezone: "Essen, Germany (GMT+1)",
        add: "Rellinghauser Str. 157 45128 Essen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Screenshot_2023-12-05_at_01.22.56.png?v=1701710600",
        testrideSpot: "Essen",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "10:30-13:30,15:00-19:00",
          "10:30-13:30,15:00-19:00",
          "10:30-13:30,15:00-19:00",
          "10:30-13:30,15:00-19:00",
          "10:30-14:30",
        ],
      },
    ]
  },
  {
    city: 'Dresden',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dresden.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'bike Store',
        phone: '+493512728755',
        email: 'bikestore@resewski.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Otto-Mohr-Straße 4, 01237 Dresden",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0781.jpg?v=1680924453",
        testrideSpot: "Dresden",
        testRideSize: "M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
          'Chord',
        ],
        businessHours: [
          "",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "14:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-18:00",
          "10:00-12:00,12:00-13:00",
        ],
      },
    ]
  },
  {
    city: 'Nürnberg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Nurnberg.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'P.O.S. Partner of Sports Nürnberg',
        phone: '+49911 538530',
        email: 'bikestore@resewski.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Rennweg 7, 90489 Nürnberg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0364.jpg?v=1680924533",
        testrideSpot: "Nürnberg",
        testRideSize: "M",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-15:00",
          "10:00-12:00,12:00-15:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-15:00",
        ],
      },
    ]
  },
  {
    city: 'Regensburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Regensburg.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'RADFAHRWERK',
        phone: '+491632379785',
        email: 'info@radfahrwerk.de',
        timezone: "Regensburg, Germany (GMT+1)",
        add: "St. Emmerams Ring 4, 93309 Kelheim",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0479.jpg?v=1680924648",
        testrideSpot: "Regensburg",
        testRideSize: "M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
          'Chord',
        ],
        businessHours: [
          "09:00-12:00",
          "08:00-12:00,12:00-21:00",
          "08:00-12:00,12:00-21:00",
          "08:00-12:00,12:00-21:00",
          "08:00-12:00,12:00-21:00",
          "08:00-12:00,12:00-21:00",
          "09:00-12:00",
        ],
      },
      /*
      {
        name: 'Thomas Schödl',
        phone: '+49 15122654233',
        email: 'thomas.schoedl@hotmail.de',
        timezone: "Regensburg, Germany (GMT+1)",
        add: "Holzgartenstr 93059 Regensburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Regensburg.jpg?v=1679406972",
        testrideSpot: "Regensburg",
        testRideSize: "M",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "10:00-20:00",
          "17:00-20:00",
          "17:00-20:00",
          "17:00-20:00",
          "17:00-20:00",
          "17:00-20:00",
          "10:00-20:00",
        ],
      },
      */
    ]
  },
  /*{
    city: 'Selbitz',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230328-164146.jpg?v=1679992972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Ralf Döhler',
        phone: '+0049 171 7061545',
        email: 'tests@iqhaus.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Am Eisenbühl 6, 95152 Selbitz, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230328-164146.jpg?v=1679992972",
        testrideSpot: "Selbitz",
        testRideSize: "L",
        isPartner: true,
        businessHours: [
          "09:00-12:00, 12:00-18:00",
          "09:00-12:00, 12:00-18:00",
          "09:00-12:00, 12:00-18:00",
          "09:00-12:00, 12:00-18:00",
          "09:00-12:00, 12:00-18:00",
          "09:00-12:00, 12:00-18:00",
          "09:00-12:00, 12:00-18:00",
        ],
      },
    ]
  },*/
  {
    city: 'Offenburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Offenburg.jpg?v=1681442327',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Rad-Shop Dinger',
        phone: '+49 7819672189',
        email: 'info@radshopdinger.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Am Wiesenrain 2 77652 Offenburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Offenburg.jpg?v=1681442327",
        testrideSpot: "Offenburg",
        testRideSize: "M, Chord",
        availableSizes: [
          'Carbon 1 Pro Size M',
          'Carbon 1 Size M',
          'Chord',
        ],
        businessHours: [
          "10:00-12:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
        ],
      },
    ]
  },
  {
    city: 'Löbau',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230413-203921.jpg?v=1681442327',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Autohaus Löbau',
        phone: '0049 3585 47950',
        email: 'verkauf@autohaus-loebau.fsoc.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "An d. Hohle 15, 02708 Löbau, Deutschland",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230413-203921.jpg?v=1681442327",
        testrideSpot: "Löbau",
        testRideSize: "M, Chord, Chord X",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
          'Carbon 1s Size M',
          'Chord',
          'Chord X',
        ],
        businessHours: [
          "",
          "07:00-18:00",
          "07:00-18:00",
          "07:00-18:00",
          "07:00-18:00",
          "07:00-18:00",
          "09:00-12:00",
        ],
      },
    ]
  },
  {
    city: 'Zittau',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zittau.jpg?v=1681442327',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Autohaus Zittau',
        phone: '0049 358 3554840',
        email: 'autohaus.loebau.zittau@t-online.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Äußere Weberstraße 36, 02763 Zittau, Deutschland",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zittau.jpg?v=1681442327",
        testrideSpot: "Zittau",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "07:00-18:00",
          "07:00-18:00",
          "07:00-18:00",
          "07:00-18:00",
          "07:00-18:00",
          "09:00-12:00",
        ],
      },
    ]
  },
  {
    city: 'Riegelsberg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Riegelsberg__view_from_the_panorama_point.jpg?v=1683900380',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Timo Altmeyer',
        phone: '+49 156 78572530',
        email: 'timo@techreviewer.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "66292 Riegelsberg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Riegelsberg__view_from_the_panorama_point.jpg?v=1683900380",
        testrideSpot: "Riegelsberg",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "",
          "09:00-17:00",
          "09:00-17:00",
          "",
          "",
        ],
        isPartner: true
      },
    ]
  },
  {
    city: 'Güstrow',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/schloss_guestrow_drohne17_aNoB_ubertr_kUrh_005-1351x900.jpg?v=1689910159',
    series: [
      'Urtopia Carbon 1 Size L',
      'Urtopia Carbon 1s Size M'
    ],
    stores: [
      {
        name: 'Mabea GmbH',
        phone: '+49 01743069724',
        email: 'support@mabea-mobility.de',
        timezone: "Güstrow, Germany (GMT+1)",
        add: "Hageböcker Straße 106, 18273 Güstrow, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/schloss_guestrow_drohne17_aNoB_ubertr_kUrh_005-1351x900.jpg?v=1689910159",
        testrideSpot: "Güstrow",
        testRideSize: "L, M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Carbon 1s Size M',
          'Chord',
        ],
        businessHours: [
          "",
          "10:00-18:30",
          "10:00-18:30",
          "10:00-18:30",
          "10:00-18:30",
          "10:00-18:30",
          "12:00-14:00",
        ],
      },
    ]
  },
  {
    city: 'Freiburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/schloss_guestrow_drohne17_aNoB_ubertr_kUrh_005-1351x900.jpg?v=1689910159',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Lauf&Rad Guth',
        phone: '+49 7615577840',
        email: 'info@laufundrad-guth.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Zähringer Str. 8, 79108 Freiburg im Breisgau",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Screenshot_2023-08-04_at_02.35.22.png?v=1691087750",
        testrideSpot: "Freiburg",
        testRideSize: "L, M, Chord, Chord X",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M/L',
          'Carbon 1s Size M',
          'Chord',
          'Chord X',
        ],
        businessHours: [
          "",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "10:00-13:00",
        ],
      },
    ]
  },
  {
    country: 'Netherlands',
    city: 'Utrecht',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Utrecht_canal.jpg?v=1690441967',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Wybren van der Wal',
        phone: '+31 623976683',
        email: 'wybrenvanderwal@gmail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "3572EE Utrecht The Netherlands",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Utrecht_canal.jpg?v=1690441967",
        testrideSpot: "Utrecht",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "12:00-16:00",
          "12:00-16:00",
          "12:00-16:00",
          "12:00-16:00",
          "12:00-16:00",
          "12:00-16:00",
          "12:00-16:00",
        ],
        disableDate: createdisableDates(100, ['2023-9-16', '2023-9-17', '2023-9-23', '2023-9-24']),
        isPartner: true
      },
    ]
  },
  {
    country: 'Netherlands',
    city: 'Assen',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Utrecht_canal.jpg?v=1690441967',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Klaucke Tweewielerhuis',
        phone: '31592866142',
        email: 'jarno@klaucketweewielerhuis.nl',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Venestraat 93, 9402 GK Assen, Netherlands",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_2_d9ef5376-10aa-4e74-b680-16ae2d71a4f4.png?v=1717487967",
        testrideSpot: "Assen",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "",
          "10:00-18:00",
          "10:00-17:00",
        ],
      },
    ]
  },
  {
    country: 'Netherlands',
    city: 'Hoogeveen',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Utrecht_canal.jpg?v=1690441967',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Luppes & Co Tweewielers V.O.F',
        phone: '528260880',
        email: 'mluppes@xs4all.nl',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Griendtsveenweg 22b, 7901 EA Hoogeveen ",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_2_d9ef5376-10aa-4e74-b680-16ae2d71a4f4.png?v=1717487967",
        testrideSpot: "Hoogeveen",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "13:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-17:00",
        ],
      },
      {
        name: 'Fietspoint Wolbers',
        phone: '+31 (0)522 254 369',
        email: 'meppel@fietspointwolbers.nl',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Kanalstraße 25, 48147 Münster, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_2_d9ef5376-10aa-4e74-b680-16ae2d71a4f4.png?v=1717487967",
        testrideSpot: "Hoogeveen",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "13:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-17:00",
        ],
      },
    ]
  },
  {
    country: 'Netherlands',
    city: 'Almere',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Utrecht_canal.jpg?v=1690441967',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: `Tweewieler Shop Almere`,
        phone: '31365259319',
        email: 'info@tweewielershopalmere.nl',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Markerkant 12 06-08, 1314 AK Almere, Netherlands",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_4_d83cdb80-0a91-46df-ba8f-cb01f80ed1ac.png?v=1717488717",
        testrideSpot: "Almere",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
           "10:00-18:00",
         "10:00-18:00",
         "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
         "09:00-17:00",
        ],
      },
    ]
  },
  {
    country: 'Netherlands',
    city: 'Zwolle',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Utrecht_canal.jpg?v=1690441967',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: `Tweewielercentrum Zwolle`,
        phone: '038-7501608',
        email: 'info@tweewielercentrumzwolle.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Vechtstraat 26, 8021AX Zwolle",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_3_f7dd9f57-0513-48b7-bf66-6ed1c1aa8e47.png?v=1717488407",
        testrideSpot: "Antwerp",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      },
    ]
  },
  {
    country: 'Belgium',
    city: 'Antwerp',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Utrecht_canal.jpg?v=1690441967',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: `Tomorrow's Bike`,
        phone: '+32 484 44 25 83',
        email: 'ibrahim@tomorrowsbike.be',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Ringlaan 1, 2170 Antwerpen, Belgium",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_4.png?v=1716806270",
        testrideSpot: "Antwerp",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
    ]
  },
  {
    country: 'Belgium',
    city: 'Lede',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Utrecht_canal.jpg?v=1690441967',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: `D & S Bikes by dimast bvba`,
        phone: '+3293664057',
        email: 'info@dnsbikes.be',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Molenhoek 8 - 9340 Lede， Belgium",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_4.png?v=1716806270",
        testrideSpot: "Antwerp",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Wernigerode',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Schloss_Wernigerode_nach_Sonnenuntergang.jpg?v=1691564874',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Hendrik Uhlemann',
        phone: '+49 1520 2015919',
        email: 'hendrikuhlemann@googlemail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Johannisstraße 13, 38855 Wernigerode",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230908-140440.jpg?v=1694153100",
        testrideSpot: "Wernigerode",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
        ],
        isPartner: true
      },
    ]
  },
  {
    city: 'Oldenburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Geldern.jpg?v=1691835197',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Best of Bikes',
        phone: '044140575770',
        email: 'info@best-of-bikes.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Posthalterweg 3, 26129 Oldenburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_bbf87bc0-cde2-4e1d-a4f7-9c891492618f.png?v=1717488903",
        testrideSpot: "Oldenburg",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
         "10:00-18:00",
          "10:00-18:00",
          "",
          "10:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Vechta',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Geldern.jpg?v=1691835197',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Zweirad-Center Pott',
        phone: '044412444',
        email: 'zweirad-center-pott@t-online.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Falkenrotter Str. 14, 49377 Vechta",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_0c0f0345-fbda-4426-8c7d-7741b47cd4e5.png?v=1717489086",
        testrideSpot: "Vechta",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "09:00-18:00",
           "09:00-18:00",
          "09:00-18:00",
           "09:00-18:00",
           "09:00-18:00",
           "09:00-13:00",
        ],
      },
    ]
  },
  {
    city: 'Georgsmarienhütte',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Geldern.jpg?v=1691835197',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'JZCycles',
        phone: '015753771205',
        email: 'service@jibheadz.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Hindenburgstraße 28, 49124 Georgsmarienhütte",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_1_0bacc422-1ceb-4be3-bad3-9e280a955b3f.png?v=1717489533",
        testrideSpot: "Georgsmarienhütte",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord X'
        ],
        businessHours: [
          "",
          "09:00-18:00",
            "09:00-18:00",
           "09:00-18:00",
            "09:00-18:00",
            "09:00-18:00",
            "09:00-16:00",
        ],
      },
    ]
  },
  {
    city: 'Cloppenburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Geldern.jpg?v=1691835197',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Bertis Bike Center GmbH',
        phone: '04471932539',
        email: 'info@bertis-bikes.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Werner-Eckart-Ring 2, 49661 Cloppenburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_2_b1c09dd8-2b0f-4a0b-8765-617ff6e07149.png?v=1717489674",
        testrideSpot: "Georgsmarienhütte",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "09:00-18:00",
            "09:00-18:00",
           "09:00-18:00",
            "09:00-18:00",
            "09:00-18:00",
            "09:00-16:00",
        ],
      },
    ]
  },
  {
    city: 'Ritterhude',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Geldern.jpg?v=1691835197',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Zweirad Kliem',
        phone: '042921247',
        email: 'info@zweirad-kliem.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Beekstraße 2, 27721 Ritterhude",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_3_956ea294-86b9-46da-9c1e-28aa1c3b4b02.png?v=1717489838",
        testrideSpot: "Ritterhude",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "13:00-18:00",
            "09:00-18:00",
           "09:00-18:00",
            "09:00-18:00",
            "09:00-18:00",
            "09:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Bremerhaven',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Geldern.jpg?v=1691835197',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fahrrad-Meeradl',
        phone: '017623640041',
        email: 'meerdl.official@gmail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Bürgermeister-Smidt-Straße 75, 27568 Bremerhaven",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_4_5198b09f-1884-4c6d-bebb-233857ff04bb.png?v=1717489955",
        testrideSpot: "Bremerhaven",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "13:00-18:00",
            "09:00-18:00",
           "09:00-18:00",
            "09:00-18:00",
            "09:00-18:00",
            "09:00-17:00",
        ],
      },
    ]
  },
  {
    city: 'Geldern',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Geldern.jpg?v=1691835197',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Uwe Zapf',
        phone: '+49 1723 596116',
        email: 'uzapf@icloud.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Pinnertstr, 47608 Geldern",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Geldern.jpg?v=1691835197",
        testrideSpot: "Geldern",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
        ],
        isPartner: true
      },
    ]
  },
  {
    country: 'Finland',
    city: 'Meritullinkatu',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/A93E0E1F-608D-44BE-9840-426BD29C34E6-lg.webp?v=1692340290',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Ari Huusela',
        phone: '',
        email: 'aribikes93@gmail.com',
        timezone: "Meritullinkatu, Finland (GMT+1)",
        add: "Helsinki",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/A93E0E1F-608D-44BE-9840-426BD29C34E6-lg.webp?v=1692340290",
        testrideSpot: "Meritullinkatu",
        testRideSize: "M",
        noBook: true,
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "",
          "11:00-19:00",
          "",
          "",
          "",
          "",
        ],
        isPartner: true
      },
    ]
  },
  {
    city: 'Heringsdorf',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/heringsdorf.webp?v=1692933986',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Maximilian Will',
        phone: '+49 1721532159',
        email: 'maxe-will@t-online.de',
        timezone: "Heringsdorf, Germany (GMT+1)",
        add: "17419 Ahlbeck",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/heringsdorf.webp?v=1692933986",
        testrideSpot: "Heringsdorf",
        testRideSize: "M",
        noBook: true,
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "11:00-19:00",
          "",
          "",
          "",
          "",
        ],
        isPartner: true
      },
    ]
  },
  {
    city: 'Troisdorf',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Bonn-center-2016-01.jpg?v=1693473942',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
      'Chord',
    ],
    stores: [
      {
        name: 'Satking GmbH',
        phone: '02241 881 090',
        email: 'info@satking.de',
        timezone: "Troisdorf-Kriegsdorf, Germany (GMT+1)",
        add: "Junkersring 18, 53844 Troisdorf-Kriegsdorf",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Satking_GmbH.jpg?v=1693473391",
        testrideSpot: "Troisdorf",
        testRideSize: "Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1',
          'Chord',
          'Fusion'
        ],
        businessHours: [
          "",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "",
        ],
      },
      {
        name: 'MB E-BIKE FOR YOU GmbH',
        phone: '022413276947',
        email: 'info@ebike-foryou.de',
        timezone: "Troisdorf-Kriegsdorf, Germany (GMT+1)",
        add: "Hauptstr. 130, Troisdorf, 53842, Deutschland",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_82e2b36e-f277-4567-bcbd-1c821654ef17.png?v=1716176581",
        testrideSpot: "Troisdorf",
        testRideSize: "Chord",
        availableSizes: [
          'Carbon 1 Size L',
          'Fusion',
        ],
        businessHours: [
          "",
          "",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
           "10:00-18:00",
          "10:00-15:00",
        ],
      },
    ]
  },
  {
    city: 'Kiel',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Kiel.jpg?v=1697540052',
    series: [
      'Chord',
    ],
    stores: [
      {
        name: 'TRANKVILE electric vehicles Kiel',
        phone: '+43155685104',
        email: '',
        timezone: "Kiel, Germany (GMT+1)",
        add: "Rathausstraße 8, 24103 Kiel",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/TRANKVILE_electric_vehicles_Kiel.jpg?v=1697540052",
        testrideSpot: "Kiel",
        testRideSize: "M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Chord',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-14:00",
        ],
      },
    ]
  },
  {
    city: 'Magdeburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Magdeburg.jpg?v=1697540051',
    series: [
      'Chord',
    ],
    stores: [
      {
        name: 'Mattbike Rad-Center Matussek',
        phone: '+493914048855',
        email: 'h.pide@gmx.de',
        timezone: "Magdeburg, Germany (GMT+1)",
        add: "Alt Fermersleben 53, 39122 Magdeburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mattbike_Rad-Center_Matussek.jpg?v=1697540051",
        testrideSpot: "Magdeburg",
        testRideSize: "Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Chord',
        ],
        businessHours: [
          "",
          "",
          "10:00-15:00",
          "10:00-15:00",
          "10:00-15:00",
          "10:00-15:00",
          "",
        ],
      },
    ]
  },
  {
    country: 'Austria',
    city: 'Linz',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Linz.jpg?v=1694169315',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Volo Bike Galerie',
        phone: '+436644624765',
        email: 'office@volobike.at',
        timezone: "Linz, Austria (GMT+1)",
        add: "Siglweg 1, 4061 Pasching, Austria",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Volo_Bike_Galerie.jpg?v=1694169314",
        testrideSpot: "Linz",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "8:00-12:00, 13:00-18:00",
          "8:00-12:00, 13:00-18:00",
          "8:00-12:00, 13:00-18:00",
          "8:00-12:00, 13:00-18:00",
          "8:00-12:00, 13:00-18:00",
          "9:00-13:00",
        ],
      },
      {
        name: 'Bike Distounter',
        phone: '+436601453660',
        email: 'office@bike-discounter.at',
        timezone: "Linz, Austria (GMT+1)",
        add: "Goethestresse 52, 4020 Linz",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/bikedistounter.jpg?v=1697076748",
        testrideSpot: "Linz",
        testRideSize: "M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
          'Chord',
        ],
        businessHours: [
          "",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-16:00",
        ],
      },
    ]
  },
  {
    country: 'Austria',
    city: 'Wien',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Wien.jpg?v=1694169314',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Best Bike',
        phone: '+4312708618',
        email: 'info@best-bike.at',
        timezone: "Wien, Austria (GMT+1)",
        add: "Katsushikastr. 1,1210 Wien",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Best_Bike.png?v=1694169315",
        testrideSpot: "Wien",
        testRideSize: "L,Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
        ],
        businessHours: [
          "",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-13:00, 14:00-19:00",
          "9:00-17:00",
        ],
      },
      {
        name: 'Arizona Bike',
        phone: '+436801161575',
        email: 'office@arizonabike.at',
        timezone: "Wien, Austria (GMT+1)",
        add: "Nussdorferstr. 3 , 1090 Wien",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Arizona_Bike.png?v=1694425015",
        testrideSpot: "Wien",
        testRideSize: "M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
          'Chord',
        ],
        businessHours: [
          "",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
        ],
      },
      {
        name: 'Enzovelo',
        phone: '+4313100545',
        email: 'office@enzovelo.at',
        timezone: "Wien, Austria (GMT+1)",
        add: "Spittelauer Lände 11, 1090 Wien",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Screenshot_2023-12-05_at_01.31.26.png?v=1701711107",
        testrideSpot: "Wien",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-13:00",
        ],
      },
    ]
  },
  {
    city: 'Edewecht',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Edewecht_-_Hauptstrasse___Kokermuhle_04_ies.jpg?v=1694247951',
    series: [
      'Urtopia Carbon 1s',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Thomas von Thülen ',
        phone: '04486/3689063',
        email: 'urtopiatestfahrt@gmail.com',
        timezone: "Edewecht, Germany (GMT+1)",
        add: "Weißmoorweg, 26188 Edewecht ",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Edewecht_-_Hauptstrasse___Kokermuhle_04_ies.jpg?v=1694247951",
        testrideSpot: "Edewecht",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1s Size L',
        ],
        businessHours: [
          "",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-19:00",
          "9:00-13:00, 14:00-19:00",
          "9:00-17:00",
        ],
        isPartner: true
      },
    ]
  },
  {
    city: 'Markt Indersdorf',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/1200px-Markt_Indersdorf_-_Kloster_-_Panorama.jpg?v=1695126568',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Arsalan Minhas',
        phone: '+49 1728815092',
        email: 'arsalan.minhas@gmail.com',
        timezone: "Markt Indersdorf, Germany (GMT+1)",
        add: "Raiffeisenstr, 85229 Markt Indersdorf",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230925-112304.jpg?v=1695626886",
        testrideSpot: "Arsalan Minhas",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "8:00-19:00",
          "8:00-19:00",
          "8:00-19:00",
          "8:00-19:00",
          "8:00-19:00",
          "8:00-19:00",
          "8:00-19:00",
        ],
        isPartner: true
      },
    ]
  },
  {
    country: 'France',
    city: 'Paris',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/22hours-paris-tjzf-superJumbo.jpg?v=1695383046',
    series: [
      'Chord',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Alice Abraham',
        phone: '+33 622228796',
        email: 'alice-abraham@hotmail.fr',
        timezone: "Paris, France (GMT+1)",
        add: "Saint-Fargeau 75020 Paris",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/22hours-paris-tjzf-superJumbo.jpg?v=1695383046",
        testrideSpot: "Paris",
        testRideSize: "Chord",
        availableSizes: [
          'Chord',
        ],
        businessHours: [
          "10:00-15:00",
          "10:00-15:00",
          "10:00-15:00",
          "10:00-12:00, 19:00-20:00",
          "10:00-15:00",
          "10:00-15:00",
          "10:00-15:00",
        ],
        isPartner: true,
      },
      {
        name: 'Les Hauts Vélos',
        phone: '+33 9 73 88 90 96',
        email: 'contact@lhv.store',
        timezone: "Paris, France (GMT+1)",
        add: "14 Rue Sainte-Cécile,75009 Paris,France",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/les_hauts_velos.jpg?v=1709087683",
        testrideSpot: "Paris",
        testRideSize: "L, Chord, Chord X, Fusion",
        noBook: `Please contact the store directly to arrange test ride,or click <a class="my-link" target="_blank" href="https://calendly.com/contact-yne/essai-urtopia">here to Book Online.</a>`,
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
          'Chord X',
          'Fusion',
        ],
        businessHours: [
          "",
          "",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
          "11:00-19:00",
        ],
      },
    ]
  },
  {
    country: 'Poland',
    city: 'Dobra',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/widoki-z-wiezy-fantastyczne.jpg?v=1696928346',
    series: [
      'Chord',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'AX Technology Sp. z o.o. Sp. K.',
        phone: '+48 918173114',
        email: 'l.grab@axtechnology.eu',
        timezone: "Dobra, Poland (GMT+1)",
        add: "Szczecińska 1W, 72-003 Dobra, Poland",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2_ebedd351-b768-481a-b902-81fb28d5928d.jpg?v=1696927710",
        testrideSpot: "Dobra",
        testRideSize: "Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M/L',
          'Chord',
        ],
        businessHours: [
          "",
          "8:00-16:00",
          "8:00-16:00",
          "8:00-16:00",
          "8:00-16:00",
          "8:00-16:00",
          "",
        ],
      },
    ]
  },
  {
    city: 'Neunkirchen-Seelscheid',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Screenshot_2023-10-16_at_20.52.48.png?v=1697460966',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Gunawan TURINA',
        phone: '+49 179 4224508',
        email: 'gunawanturina@web.de',
        timezone: "Neunkirchen-Seelscheid, Germany (GMT+1)",
        add: "Neunkirchen-Seelscheid",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Screenshot_2023-10-16_at_20.52.48.png?v=1697460966",
        testrideSpot: "Neunkirchen-Seelscheid",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        isPartner: true,
        businessHours: [
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
        ],
      },
    ]
  },
  {
    country: 'Austria',
    city: 'Kragenfurt',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Kragenfurt_Austria.jpg?v=1697540051',
    series: [
      'Chord',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Bikesport Ortner',
        phone: '+43463349866',
        email: 'ortner@net4you.at',
        timezone: "Kragenfurt, Austria (GMT+1)",
        add: "Miegerer Str. 27, 9065 Gradnitz, Austria",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Bikesport_Ortner.jpg?v=1697540052",
        testrideSpot: "Dobra",
        testRideSize: "L,Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1s Size L',
          'Chord',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "10:00-16:00",
          "",
        ],
      },
    ]
  },
  {
    country: 'Austria',
    city: 'Graz',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Graz_Austria.jpg?v=1697540051',
    series: [
      'Chord',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Handy-star',
        phone: '+43 660 3960588',
        email: 'Ezer.kaan@ortweinschule.at',
        timezone: "Graz, Austria (GMT+1)",
        add: "Dietrichsteinpl. 1, 8010 Graz, Austria",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Handy-star.png?v=1697540052",
        testrideSpot: "Graz",
        testRideSize: "M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1s Size M',
          'Chord',
        ],
        businessHours: [
          "",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-17:00",
        ],
      },
    ]
  },
  {
    country: 'Austria',
    city: 'Salzburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Salzburg_Austria.jpg?v=1697540052',
    series: [
      'Chord',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Vogl Bike',
        phone: '+43662453559',
        email: 'vogl-bike@gmx.at',
        timezone: "Salzburg, Austria (GMT+1)",
        add: "Elisabethstraße 63, 5020 Salzburg, Austria",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Vogl_Bike.jpg?v=1697540052",
        testrideSpot: "Salzburg",
        testRideSize: "M,Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1s Size M',
          'Chord',
        ],
        businessHours: [
          "",
          "9:00-12:00, 15:00-18:00",
          "9:00-12:00, 15:00-18:00",
          "9:00-12:00, 15:00-18:00",
          "9:00-12:00, 15:00-18:00",
          "9:00-12:00, 15:00-18:00",
          "",
        ],
      },
    ]
  },
  {
    city: 'Maisach',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Miasach_Hans_Seidl_CR_3.jpg?v=1697819734',
    series: [
      'Carbon 1s',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Stefan Baumgartner',
        phone: '+4917624306530 ',
        email: 'urtopia@baumys.de',
        timezone: "Maisach, Germany (GMT+1)",
        add: "Maisacher, 82216 Maisach, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20231106-113537.jpg?v=1699267284",
        testrideSpot: "Maisach",
        testRideSize: "Carbon 1s Size:M",
        isPartner: true,
        availableSizes: [
          'Carbon 1s Size M',
        ],
        businessHours: [
          "10:00-19:00",
          "8:00-18:00",
          "8:00-18:00",
          "8:00-18:00",
          "8:00-18:00",
          "8:00-18:00",
          "10:00-19:00",
        ],
      },
    ]
  },
  {
    city: 'Hanover',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Think-Germany-Hannover-CityHall-491546298-bbsferrari-copy.jpg?v=1702086748',
    series: [
      'Chord X',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Rad Wechsel',
        phone: '+4951189739150',
        email: 'info@radwechsel-shop.de',
        timezone: "Hanover, Germany (GMT+1)",
        add: "Engelbosteler Damm, 30167 Hannover",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Rad_Wechsel.png?v=1702086750",
        testrideSpot: "Hanover",
        testRideSize: "Chord X",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "",
        ],
      },
    ]
  },{
    country: 'Netherlands',
    city: 'Grioingen',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/de-drie-koornbloemen-views.jpg?v=1702086995',
    series: [
      'Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: `Mayor's Bike`,
        phone: '+31507858121',
        email: 'info@mayorsbike.nl',
        timezone: "Schiedam, Netherlands (GMT+1)",
        add: "Nieuwe Ebbingestraat 19, 9712 NC Groningen,Netherlands",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_5_b31a4e32-c7dc-4965-9989-036dde38fc17.png?v=1717490135",
        testrideSpot: "Grioingen",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "13:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
           "9:00-17:00",
        ],
      },
    ]
  },
  {
    country: 'Netherlands',
    city: 'Schiedam',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/de-drie-koornbloemen-views.jpg?v=1702086995',
    series: [
      'Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Bikes to go',
        phone: '+31 6 16454498',
        email: 'info@bikestogo010.nl',
        timezone: "Schiedam, Netherlands (GMT+1)",
        add: "Parkweg 363, 3119 CK Schiedam, Netherlands",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Bikes_to_go.jpg?v=1702086748",
        testrideSpot: "Schiedam",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "9:00-17:00",
          "10:00-17:00",
        ],
      },
    ]
  },
 {
    country: 'Netherlands',
    city: 'Amsterdam',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Amsterdam.webp?v=1702381805',
    series: [
      'Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Secret Village Bikeshop',
        phone: '+31 6 47133419',
        email: 'Zaher-saberi@hotmail.com',
        timezone: "Schiedam, Netherlands (GMT+1)",
        add: "Reguliersdwarsstraat 50, 1017 BV Amsterdam",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Bikes_to_go.jpg?v=1702086748",
        testrideSpot: "Amsterdam",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "13:00-19:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
        ],
      },
    ]
  },
  {
    country: 'Denmark',
    city: 'Rodovre',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Fri_bikeshop_Rodovre.jpg?v=1706844827',
    series: [
      'Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fri bikeshop Rodovre',
        phone: '+45 43422313',
        email: 'roskildevej@fribikeshp.dk',
        timezone: "Rodovre, Denmark (GMT+1)",
        add: "Roskildevej 254, 258, 2610 Rødovre, Denmark",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Fri_bikeshop_Rodovre.jpg?v=1706844827",
        testrideSpot: "Rodovre",
        testRideSize: "M",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "9:00-17:30",
          "9:00-17:30",
          "9:00-17:30",
          "9:00-17:30",
          "9:00-18:00",
          "9:00-14:00",
        ],
      },
    ]
  },
  {
    country: 'Denmark',
    city: 'Vanlose',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Fri_bikeshop_Vanlose.jpg?v=1706844828',
    series: [
      'Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fri bikeshop Vanlose',
        phone: '+45 71992313',
        email: 'info2720@fribikeshp.dk',
        timezone: "Vanlose, Denmark (GMT+1)",
        add: "Godthåbsvej 248, 254, 2720 Vanløse, Denmark",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Fri_bikeshop_Vanlose.jpg?v=1706844828",
        testrideSpot: "Vanlose",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "9:00-17:30",
          "9:00-17:30",
          "9:00-17:30",
          "9:00-17:30",
          "9:00-18:00",
          "9:00-14:00",
        ],
      },
    ]
  },
  {
    country: 'Denmark',
    city: 'Farum',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Fri_bikeshop_Farum.jpg?v=1706844827',
    series: [
      'Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fri bikeshop Farum',
        phone: '+45 71922313',
        email: 'info3520@fribikeshop.dk',
        timezone: "Farum, Denmark (GMT+1)",
        add: "Farum Hovedgade 34, 3520 Farum, Denmark",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Fri_bikeshop_Farum.jpg?v=1706844827",
        testrideSpot: "Farum",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "9:00-17:30",
          "9:00-17:30",
          "9:00-17:30",
          "9:00-17:30",
          "9:00-18:00",
          "9:30-14:00",
        ],
      },
    ]
  },
  {
    country: 'Netherlands',
    city: 'Rotterdam',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Superfietsen_Rotterdam.png?v=1706844830',
    series: [
      'Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Superfietsen Rotterdam',
        phone: '+31 10 - 310 62 65',
        email: '',
        timezone: "Rotterdam, Netherlands (GMT+1)",
        add: "Stadionweg 29 B, 3077 AN Rotterdam, Netherlands",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Superfietsen_Rotterdam.png?v=1706844830",
        testrideSpot: "Rotterdam",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "12:00-17:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
        ],
      },
    ]
  },
  {
    country: 'Netherlands',
    city: 'Den Haag',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Superfietsen_Den_Haag.png?v=1706844830',
    series: [
      'Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Superfietsen Den Haag',
        phone: '+31 70 - 308 08 40',
        email: '',
        timezone: "Den Haag, Netherlands (GMT+1)",
        add: "Leyweg 595 C, 2545 GH Den Haag,Netherlands",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Superfietsen_Den_Haag.png?v=1706844830",
        testrideSpot: "Den Haag",
        testRideSize: "M",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "11:30-17:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
          "9:00-18:00",
        ],
      },
      {
        name: 'Bike Scheveningen',
        phone: '+31 648645959',
        email: 'info@bikescheveningen.nl',
        timezone: "Den Haag, Netherlands (GMT+1)",
        add: "Prins Willemstraat 26A, 2584 HV Den Haag,Netherlands",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Superfietsen_Den_Haag.png?v=1706844830",
        testrideSpot: "Den Haag",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "12:00-17:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "",
        ],
      },
    ]
  },
  {
    country: 'Slovenia',
    city: 'Maribor',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zweiradcenter_Heuermann.jpg?v=1710295897',
    series: [
      'Urtopia Carbon 1',
    ],
    stores: [
      {
        name: 'E-SPORTS',
        phone: '+386 031 320 024',
        email: 'info@esportshop.si',
        timezone: "Maribor, Germany (GMT+1)",
        add: "Trinkova ulica 17, 2000 Maribor, Slovenia",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zweiradcenter_Heuermann.jpg?v=1710295897",
        testrideSpot: "Maribor",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
          'Chord X',
          'Fusion'
        ],
        businessHours: [
          "",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
        ],
      },
    ]
  },
  {
    country: 'Denmark',
    city: 'Aalborg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zweiradcenter_Heuermann.jpg?v=1710295897',
    series: [
      'Urtopia Carbon 1',
    ],
    stores: [
      {
        name: 'Polar Cykler',
        phone: '+4598146622',
        email: 'keld@polarcykler.dk',
        timezone: "Weesp, Germany (GMT+1)",
        add: "Mylius Erichsens Vej 25, 9210 Aalborg, Dänemark",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zweiradcenter_Heuermann.jpg?v=1710295897",
        testrideSpot: "Aalborg",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "08:00-17:00",
          "08:00-17:00",
          "08:00-17:00",
          "08:00-17:00",
          "08:00-17:00",
          "10:00-13:00",
        ],
      },
    ]
  },
  {
    country: 'Netherlands',
    city: 'Weesp',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zweiradcenter_Heuermann.jpg?v=1710295897',
    series: [
      'Urtopia Carbon 1',
    ],
    stores: [
      {
        name: 'Welectric BV.',
        phone: '+31(088) 0187 640',
        email: 'weesp@welectric.nl',
        timezone: "Weesp, Germany (GMT+1)",
        add: "ijverheidslaan 1, 1382 LE Weesp, Netherlands",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zweiradcenter_Heuermann.jpg?v=1710295897",
        testrideSpot: "Weesp",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M/L',
          'Chord'
        ],
        businessHours: [
          "",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Twistringen',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zweiradcenter_Heuermann.jpg?v=1710295897',
    series: [
      'Urtopia Carbon 1',
    ],
    stores: [
      {
        name: 'Zweiradcenter Heuermann',
        phone: '+494243 777',
        email: 'info@zweiradcenter-heuermann.de',
        timezone: "Twistringen, Germany (GMT+1)",
        add: "Langenstraße 5/7a, 27239 Twistringen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Zweiradcenter_Heuermann.jpg?v=1710295897",
        testrideSpot: "Twistringen",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "08:00-12:00, 14:00-18:00",
          "08:00-12:00, 14:00-18:00",
          "08:00-12:00, 14:00-18:00",
          "08:00-12:00, 14:00-18:00",
          "08:00-12:00, 14:00-18:00",
          "08:00-12:00",
        ],
      },
    ]
  },
  {
    city: 'Lübeck',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Cult.Bike_Lubeck_GmbH.jpg?v=1710295897',
    series: [
      'Urtopia Carbon 1',
      'Fusion',
    ],
    stores: [
      {
        name: 'Cult.Bike Lübeck GmbH',
        phone: '+491743121383',
        email: 'ben@cult.bike',
        timezone: "Lübeck, Germany (GMT+1)",
        add: "Breite Str. 9, 23552 Lübeck",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Cult.Bike_Lubeck_GmbH.jpg?v=1710295897",
        testrideSpot: "Lübeck",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Fusion',
        ],
        businessHours: [
          "",
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
        ],
      },
      {
        name: 'Bone-Cycle',
        phone: '045158542487',
        email: 'r.bohnhof@gmx.de',
        timezone: "Lübeck, Germany (GMT+1)",
        add: "Im Brandenbaumer Feld 11, 23564 Lübeck",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_61d21fef-9d56-4a8d-9cf5-11d1c76da270.png?v=1718077223",
        testrideSpot: "Lübeck",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-12:00",
        ],
      },
      {
        name: 'tobisRad Scharbeutz Fahrradverleih Mietrad Rent a Bike',
        phone: '04503702861',
        email: 'info@tobisrad.de',
        timezone: "Lübeck, Germany (GMT+1)",
        add: "Badeweg 13, 23683 Scharbeutz",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_1_f5304d15-c8de-4caf-8a7f-afde74d58d17.png?v=1718077720",
        testrideSpot: "Lübeck",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "09:00-19:00",
          "09:00-19:00",
          "09:00-19:00",
          "09:00-19:00",
          "09:00-19:00",
          "09:00-19:00",
        ],
      },
    ]
  },
  {
    city: 'Karlsruhe',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Vera_Bike.png?v=1710295897',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'Vera Bike',
        phone: '+4972147008386',
        email: 'verabike.fahrrad.service@gmail.com',
        timezone: "Karlsruhe, Germany (GMT+1)",
        add: "Leopoldstraße 5B, 76133 Karlsruhe",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Vera_Bike.png?v=1710295897",
        testrideSpot: "Karlsruhe",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Carbon 1s Size M',
          'Fusion'
        ],
        businessHours: [
          "",
          "10:00-13:00, 14:00-18:00",
          "10:00-13:00, 14:00-18:00",
          "10:00-13:00, 14:00-18:00",
          "10:00-13:00, 14:00-18:00",
          "10:00-13:00, 14:00-18:00",
          "10:00-14:00",
        ],
      },
    ]
  },
  {
    city: 'Petersberg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Vera_Bike.png?v=1710295897',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'Fahrradwelt Seng',
        phone: '+49 661 96211520',
        email: 'info@fahrradwelt-seng.de',
        timezone: "Karlsruhe, Germany (GMT+1)",
        add: "Dr.-Raabe-Straße 2, 36100 Petersberg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Vera_Bike.png?v=1710295897",
        testrideSpot: "Karlsruhe",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
          'Fusion'
        ],
        businessHours: [
          "",
         "",
          "10:00-18:00",
          "10:00-18:00",
         "10:00-18:00",
          "10:00-18:00",
          "09:00-14:00",
        ],
      },
    ]
  },
  {
    city: 'Heidelberg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Vera_Bike.png?v=1710295897',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'Bikeservice Ziegler',
        phone: '+49 6221 402921',
        email: 'zieglerkrouzek@web.de',
        timezone: "Karlsruhe, Germany (GMT+1)",
        add: "Schröderstr. 31, 69120 Heidelberg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Vera_Bike.png?v=1710295897",
        testrideSpot: "Karlsruhe",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "14:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-18:00",
          "09:00-13:00",
        ],
      },
    ]
  },
  {
    city: 'Deinze',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Vera_Bike.png?v=1710295897',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'Bikeservice Ziegler',
        phone: '+49 6221 402921',
        email: 'gilles@cesano.eu',
        timezone: "Karlsruhe, Germany (GMT+1)",
        add: "Leernsesteenweg 117, 9800 Deinze, Belgium",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Vera_Bike.png?v=1710295897",
        testrideSpot: "Deinze",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "",
        ],
      },
    ]
  },
  {
    city: 'Lystrup',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2_01bdbcb5-21af-4885-bbc4-b758b5990691.png?v=1718084778',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'MOSQUITO Cykelcenter Lystrup',
        phone: '04586228266',
        email: 'mosquitolystrup@gmail.com',
        timezone: "Karlsruhe, Germany (GMT+1)",
        add: "Lystrupvej 238, 8520 Lystrup",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2_01bdbcb5-21af-4885-bbc4-b758b5990691.png?v=1718084778",
        testrideSpot: "Deinze",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "10:00-17:00",
          "09:00-12:00",
        ],
      },
    ]
  },
  {
    city: 'Vejle',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2_b7680061-7fc2-4266-bae4-3a3f8625c9cd.png?v=1718084927',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'Vinding Cykelcenter',
        phone: '04575820306',
        email: 'info@vindingcykelcenter.dk',
        timezone: "Karlsruhe, Germany (GMT+1)",
        add: "Vindinggård Center 17, 7100 Vejle",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2_b7680061-7fc2-4266-bae4-3a3f8625c9cd.png?v=1718084927",
        testrideSpot: "Vejle",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "09:00-17:00",
           "09:00-17:00",
           "09:00-17:00",
           "09:00-17:00",
           "09:00-18:00",
          "10:00-13:00",
        ],
      },
    ]
  },
  {
    city: 'Straßfurt',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_0195b73d-a545-4779-9a0a-df436b012662.png?v=1713577278',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'Yellow Car Store',
        phone: '+49 178 8887172',
        email: 'marcus-korte@gmx.de',
        timezone: "Straßfurt, Germany (GMT+1)",
        add: "Am Steinbruch 8, 39418 Staßfurt",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_0195b73d-a545-4779-9a0a-df436b012662.png?v=1713577278",
        testrideSpot: "Straßfurt",
        testRideSize: "L",
        // noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "07:30-18:30",
          "07:30-18:30",
          "07:30-18:30",
          "07:30-18:30",
          "07:30-18:30",
          "",
        ],
      },
    ]
  },
  {
    city: 'Oberursel',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_1.png?v=1713577697',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'City Zweirad Oberursel',
        phone: '06171 57281',
        email: 'team@cityzweirad.de',
        timezone: "Oberursel, Germany (GMT+1)",
        add: "Korfstr. 2 · 61440 Oberursel",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_1.png?v=1713577697",
        testrideSpot: "Oberursel",
        testRideSize: "L",
        // noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
          'Fusion'
        ],
        businessHours: [
          "",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
          "10:00-18:00",
        ],
      },
    ]
  },
  {
    city: 'Mönchengladbach',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_2.png?v=1713578059',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'Fahrradhaus Özdin',
        phone: '+492166 1471576',
        email: 'info@fahrradhaus-ozdin.de',
        timezone: "Mönchengladbach, Germany (GMT+1)",
        add: "Stapper Weg 65 41199 Mönchengladbach",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_2.png?v=1713578059",
        testrideSpot: "Mönchengladbach",
        testRideSize: "L",
        // noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "09:30-18:00",
          "09:30-18:00",
          "09:30-18:00",
          "09:30-18:00",
          "09:30-18:00",
          "09:30-14:00",
        ],
      },
    ]
  },
  {
    city: 'Wolfhagen',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_2.png?v=1713578059',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'Autohaus Güde GmbH & Co. KG',
        phone: '+49569298650',
        email: 'info@autohausguede.fsoc.de',
        timezone: "Wolfhagen, Germany (GMT+1)",
        add: "Kurfürstenstraße 59, 34466 Wolfhagen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/31ebc4370166f179d3bfdc3e4fceb5b0.jpg?v=1713578620",
        testrideSpot: "Wolfhagen",
        testRideSize: "L",
        // noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord X'
        ],
        businessHours: [
          "",
          "08:00-18:00",
          "08:00-18:00",
          "08:00-18:00",
          "08:00-18:00",
          "08:00-18:00",
          "09:00-12:00",
        ],
      },
    ]
  },
  {
    city: 'Krefeld',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_2.png?v=1713578059',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'Fahrradladen am Kloster in Krefeld',
        phone: '021516506538',
        email: 'info@rad-krefeld.de',
        timezone: "Wolfhagen, Germany (GMT+1)",
        add: "Hülser Str.534, 47803 Krefeld",
        imgUrl: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/output_2.png?v=1716805793",
        testrideSpot: "Krefeld",
        testRideSize: "L",
        // noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
          'Chord',
          'Fusion'
        ],
        businessHours: [
          "",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-19:00",
          "10:00-14:00",
        ],
      },
    ]
  },
  {
    city: 'Eckernfördee',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/output_2.png?v=1713578059',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Carbon 1s',
    ],
    stores: [
      {
        name: 'TRANKVILE electric vehicles Eckernförde',
        phone: ' +49 1579 2356034',
        email: 'kw@trankvile.com',
        timezone: "Wolfhagen, Germany (GMT+1)",
        add: "Noorstr. 22 24340 Eckernförde",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/31ebc4370166f179d3bfdc3e4fceb5b0.jpg?v=1713578620",
        testrideSpot: "Eckernfördee",
        testRideSize: "L",
        // noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Chord X',
        ],
        businessHours: [
          "",
          "11:00-16:00",
          "11:00-16:00",
          "11:00-16:00",
          "11:00-16:00",
          "11:00-16:00",
          "10:00-14:00",
        ],
      },
    ]
  },
]




const store_list = new Map()
const bike_options = new Set()
let city_options = new Set()


for (const city of testRides) {
  for (const store of city.stores) {
    // 把所属国家也加上
      store.country = city.country || 'Deutschland'
      store.city = city.city
      store.avalibaleDate = findAvalibaleDate(store)

      for (const sizes of store.availableSizes) {
        const [bike, series, ttt] = sizes.split(' ')

        if (ttt === "Pro") {
          bike_options.add(`${bike}${series ? ' ' + series : ''} ${ttt}`) 
        } else {
          bike_options.add(`${bike}${series ? ' ' + series : ''}`)
        }
      }

      city_options.add(`${store.city}---${store.country}`)

      const tags = store.tags || [{ color: 'gray', text: store.isPartner ? 'Ambassadors' : 'Partner Store' }]

      store.html = `
          <div class="name" name="${store.name}">${store.name}<i class="mobileHide"><svg class="icon" style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5533"><path d="M748.3 533.3c0.1-0.2 0.3-0.4 0.4-0.6 0.2-0.3 0.5-0.7 0.7-1 0.1-0.1 0.2-0.3 0.2-0.4 0.3-0.4 0.5-0.8 0.8-1.2l0.1-0.1c2.6-4.6 4.1-9.6 4.6-14.7v-0.2c0-0.5 0.1-0.9 0.1-1.4v-0.6-1-1-0.6c0-0.5-0.1-0.9-0.1-1.4v-0.2c-0.4-5.1-2-10.1-4.6-14.7l-0.1-0.1c-0.2-0.4-0.5-0.8-0.8-1.3-0.1-0.1-0.2-0.3-0.2-0.4-0.2-0.3-0.4-0.7-0.7-1-0.1-0.2-0.3-0.4-0.4-0.6-0.2-0.3-0.4-0.5-0.6-0.8-0.2-0.2-0.4-0.5-0.6-0.7-0.1-0.1-0.2-0.2-0.3-0.4-0.1-0.1-0.2-0.2-0.2-0.3-0.2-0.3-0.5-0.5-0.7-0.8-0.2-0.2-0.4-0.4-0.5-0.6l-0.7-0.7-0.6-0.6c-0.2-0.2-0.5-0.4-0.7-0.7l-0.6-0.6-0.3-0.3-414.6-347.6c-15.2-12.7-38-10.7-50.7 4.4-12.7 15.2-10.7 38 4.4 50.7L663.2 512 281.6 832.2c-15.2 12.7-17.2 35.6-4.4 50.7 12.7 15.2 35.6 17.2 50.7 4.4l414.4-347.7 0.3-0.3 0.6-0.6c0.2-0.2 0.5-0.4 0.7-0.7l0.6-0.6 0.7-0.7c0.2-0.2 0.4-0.4 0.5-0.6 0.2-0.3 0.5-0.5 0.7-0.8 0.1-0.1 0.2-0.2 0.2-0.3 0.1-0.1 0.2-0.2 0.3-0.4 0.2-0.2 0.4-0.5 0.6-0.7 0.4-0.1 0.6-0.4 0.8-0.6z" fill="#333333" p-id="5534"></path></svg></i></div>
          <div class="tags">${tags.map(t => `<span class="u14DemiBold_v2 tag-${t.color}">${t.text}</span>`).join('')}</div>
          <div class="u14Light_v2">${store.add}</div>
          <div class="ulli">
             <span class="u14DemiBold_v2">Available Test bikes:</span>
             <ul class="u14Light_v2">
                ${store.availableSizes ? store.availableSizes.map(i => `<li>${i}</li>`).join('') : `<li>Carbon One Size ${store.testRideSize}</li>`}
             </ul>
          </div>
          ${!store.noBook ? `<div class="u17Light_v2 time"><img src="https://cdn.shopify.com/s/files/1/0633/2068/6808/files/calendar_2x_af8d9192-1ff9-43f0-aba6-3547b1129854.jpg?v=1680938382"/> Earliest available time: &nbsp;<div>${store.avalibaleDate}</div></div>` : '' }
          <div class="flex-1 pcHide"></div>
          <div class="buttons pcHide">
            ${!store.noBook ? `<div class="my-button my-button-black" onclick="booknow('${store.name}')">Book Now</div>` : ''}
            <div class="my-button my-button-white" onclick="showContactInfo('${store.name}')">Contact info</div>
        </div>
      `

      store_list.set(store.name.replace(/\s*/g, "").replace(/\'/g, ""), store)
  
  }
}


city_options = Array.from(city_options).sort((a, b) => a.localeCompare(b))
const country_group = {}

for (const option of city_options) {
    const [city, country] = option.split('---')

    if (country_group[country]) {
      country_group[country].push(city) 
      continue
    }

    country_group[country] = [city]
}


postMessage({
  store_list,
  country_group,
  bike_options
})
