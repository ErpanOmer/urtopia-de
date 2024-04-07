
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
      // {
      //   name: 'Charles xie',
      //   phone: '+49 1741 767140',
      //   email: 'yicxie2017@gmail.com',
      //   timezone: "Mainz, Germany (GMT+1)",
      //   add: "Am Sonnigen Hang 21 55127 Mainz Germany",
      //   imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main_dcfbb429-041a-46e8-809c-988adaf41dfd.jpg?v=1680920985",
      //   testrideSpot: "Frankfurt am Main",
      //   testRideSize: "M/L",
      //   businessHours: [
      //     "09:00-12:00,12:00-19:00",
      //     "09:00-12:00,12:00-19:00",
      //     "09:00-12:00,12:00-19:00",
      //     "09:00-12:00,12:00-19:00",
      //     "",
      //     "09:00-12:00,12:00-19:00",
      //     "09:00-12:00,12:00-19:00",
      //   ],
      //   isPartner: true
      // },
      {
        name: 'Service Zentrum',
        phone: '+4961032076414',
        email: 'yiming.song@iedau.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Otto-Hahn-Str. 5-7 63225 Langen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main_dcfbb429-041a-46e8-809c-988adaf41dfd.jpg?v=1680920985",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "M/L, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M/L',
          'Chord',
        ],
        businessHours: [
          "",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "",
        ],
      },
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
    city: 'Berlin',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Berlin.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
      // 'Urtopia Carbon 1'
    ],
    stores: [
      /*{
        name: 'Stefan Gehrke',
        phone: '+49 30-91706139',
        email: 'urtopia@bfnd.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "buero fuer neues denken, Bötzowstr. 18, 10407 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Berlin.jpg?v=1679406972",
        testrideSpot: "Berlin",
        testRideSize: "M,L,Chord",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size M/L',
          'Carbon 1s Size L',
          'Chord'
        ],
        businessHours: [
          "",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-18:00",
          "09:00-12:00,12:00-14:00",
        ],
      },*/
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
        name: 'Fahrradretter',
        phone: '+4915120406095',
        email: 'info@fahrradretter.com',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Barmbeker Str. 153, 22299 Hamburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Fahrradretter.jpg?v=1710295897",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "",
        ],
      },
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
      {
        name: 'Supercycles',
        phone: '+498945145610',
        email: 'info@supercycles.de',
        timezone: "München, Germany (GMT+1)",
        add: "Am Mitterfeld 381829 München",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0440.jpg?v=1680923045",
        testrideSpot: "München",
        testRideSize: "L",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "12:00-19:00",
          "12:00-19:00",
          "12:00-19:00",
          "12:00-19:00",
          "09:00-13:00",
        ],
      },
      /*{
        name: 'Michael Kerber',
        phone: '+49 89 89868895',
        email: 'michael@kerber-privat.de',
        timezone: "München, Germany (GMT+1)",
        add: "Maria-Eich-Str. , D 82166 Graefelfing, Munich, Bavaria",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972",
        testrideSpot: "München",
        testRideSize: "L",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "13:00-20:00",
          "13:00-20:00",
          "13:00-20:00",
          "13:00-20:00",
          "13:00-20:00",
          "13:00-20:00",
          "13:00-20:00",
        ],
        disableDate: createdisableDates([['2023-9-9', '2023-9-16'], ['2023-10-4', '2023-10-9'], ['2023-10-12', '2023-12-22']]),
      }*/
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
      /*{
        name: 'Hartmut Geyssel',
        phone: '+49 611 1370 5755',
        email: 'urtopiakoeln@hophopik.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Agnesviertel / Neustadt Nord, 50670 Köln",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Koln.jpg?v=1679406972",
        testrideSpot: "Köln",
        testRideSize: "M",
        isPartner: true,
        businessHours: [
          "09:00-12:00,12:00-19:00",
          "18:00-20:00",
          "18:00-20:00",
          "18:00-20:00",
          "18:00-20:00",
          "18:00-20:00",
          "09:00-12:00,12:00-19:00",
        ],
      },*/
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
        phone: '0049 781 9672189',
        email: 'info@radshopdinger.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Am Wiesenrain 2 77652 Offenburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Offenburg.jpg?v=1681442327",
        testrideSpot: "Offenburg",
        testRideSize: "M, Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1 Size M',
          'Chord',
        ],
        businessHours: [
          "09:00-18:00",
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
    city: 'Troisdorf-Kriegsdorf',
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
        testrideSpot: "Troisdorf-Kriegsdorf",
        testRideSize: "Chord",
        noBook: "Please contact the store directly to arrange test ride",
        availableSizes: [
          'Carbon 1',
          'Chord',
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
          'Chord X',
        ],
        businessHours: [
          "",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "",
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
          "9:00–17:00",
          "9:00–17:00",
          "9:00–17:00",
          "9:00–17:00",
          "9:00–17:00",
          "10:00–17:00",
        ],
      },
    ]
  },
 /* {
    country: 'Netherlands',
    city: 'Amsterdam',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Amsterdam.webp?v=1702381805',
    series: [
      'Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
      },
    ]
  },*/
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
          "9:00–17:30",
          "9:00–17:30",
          "9:00–17:30",
          "9:00–17:30",
          "9:00–18:00",
          "9:00–14:00",
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
          "9:00–17:30",
          "9:00–17:30",
          "9:00–17:30",
          "9:00–17:30",
          "9:00–18:00",
          "9:00–14:00",
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
          "9:00–17:30",
          "9:00–17:30",
          "9:00–17:30",
          "9:00–17:30",
          "9:00–18:00",
          "9:30–14:00",
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
          "9:00–18:00",
          "9:00–18:00",
          "9:00–18:00",
          "9:00–18:00",
          "9:00–18:00",
          "9:00–18:00",
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
          "9:00–18:00",
          "9:00–18:00",
          "9:00–18:00",
          "9:00–18:00",
          "9:00–18:00",
          "9:00–18:00",
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
          "08:00–12:00, 14:00–18:00",
          "08:00–12:00, 14:00–18:00",
          "08:00–12:00, 14:00–18:00",
          "08:00–12:00, 14:00–18:00",
          "08:00–12:00, 14:00–18:00",
          "08:00–12:00",
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
        ],
        businessHours: [
          "",
          "10:00–13:00, 14:00–18:00",
          "10:00–13:00, 14:00–18:00",
          "10:00–13:00, 14:00–18:00",
          "10:00–13:00, 14:00–18:00",
          "10:00–13:00, 14:00–18:00",
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

      for (let i = 0; i < store.availableSizes.length; i++) {
          const sizes = store.availableSizes[i]

          const [bike, series] = sizes.split(' ')
          const n = `${bike}${series ? ' ' + series : ''}`
          bike_options.add(n)
          
          if (sizes.includes('Carbon')) {
            store.availableSizes[i] = `${n}`
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

      store_list.set(store.name.replace(/\s*/g, ""), store)
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
