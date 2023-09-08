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

const oneDay = 24 * 60 * 60 * 1000
const now = +new Date()

// 禁用日期 最大天数
const disable_date_max_limit = 60
// 禁用日期 最大循环次数
const disable_date_max_limit = 60

let store_list_calculate_total_time = +new Date()



//  禁用日期动态生成函数
//  disable_limit:  禁用几天               格式:  365 或者区间 [['2023-9-10', '2023-10-10'], ['2023-10-22', '2023-11-10']]
//  ignore_date：   跳过某些日期不禁用      格式:  ['2023-7-27', '2023-7-28', '2023-7-29']  
//  start_time:     从什么时候开始禁用      格式： 2023-7-27 （默认今天)

function createdisableDates(disable_limit = 0, ignore_date = [], start_time = new Date()) {
  return function () {
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
        testRideSize: "M/L",
        availableSizes: [
          'Carbon 1 Size M/L',
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
        name: 'Thomas Krautter',
        phone: '+0049 160 841 3595',
        email: 'urtopia@eitap.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Rahmer Strasse 22G, 40489 Düsseldorf",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972",
        testrideSpot: "Düsseldorf",
        testRideSize: "M, Chord",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size M/L',
          'Chord'
        ],
        businessHours: [
          "16:00-19:00",
          "14:00-20:00",
          "14:00-20:00",
          "14:00-20:00",
          "14:00-20:00",
          "14:00-20:00",
          "16:00-19:00",
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
      },
      {
        name: 'fahrradladen-wulf',
        phone: '+4930 74737657',
        email: 'fahrradladen-wulf@gmx.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Kopenhagener Straße 73, 10437 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0821.jpg?v=1680922149",
        testrideSpot: "Berlin",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "10:00-12:00,12:00-19:00",
          "10:00-12:00,12:00-19:00",
          "10:00-12:00,12:00-19:00",
          "10:00-12:00,12:00-19:00",
          "10:00-12:00,12:00-19:00",
          "10:00-12:00,12:00-17:00",
        ],
      },
      {
        name: 'duundich-bikes',
        phone: '+4930 70 24 59 20',
        email: 'info@duundich-bikes.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Erich-Weinert-Str. 15010409 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0827.jpg?v=1680922453",
        testrideSpot: "Berlin",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
        ],
        businessHours: [
          "",
          "09:00-12:00,12:00-19:00",
          "10:00-12:00,12:00-18:00",
          "10:00-12:00,12:00-18:00",
          "10:00-18:00",
          "09:00-12:00,12:00-19:00",
          "11:00-12:00,12:00-14:00",
        ],
      },
      {
        name: 'Fahrradstation GmbH',
        phone: '+49 180510 8000',
        email: 'buero@fahrradstation.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Dorotheenstraße 30 10117 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Fahrradstation_GmbH.jpg?v=1691088538",
        testrideSpot: "Berlin",
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
          "10:00-18:00",
        ],
      }
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
        name: 'Anneke Gabriel',
        phone: '+49 1717424105',
        email: 'dominic@2do-digital.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Schwübb, 22529 Hamburg, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hamburg_19874cca-b8ea-4f39-824a-d987e3410a01.jpg?v=1683867163",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size L'
        ],
        businessHours: [
          "",
          "17:00-20:00",
          "17:00-20:00",
          "17:00-20:00",
          "17:00-20:00",
          "17:00-20:00",
          "17:00-20:00",
        ],
      },
      {
        name: 'Matthias Kaltenbach',
        phone: '+4915772388217',
        email: 'urtopia.hamburg@outlook.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Eimsbüttel, 20255 Hamburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hamburg_19874cca-b8ea-4f39-824a-d987e3410a01.jpg?v=1683867163",
        testrideSpot: "Hamburg",
        testRideSize: "L,Chord",
        isPartner: true,
        availableSizes: [
          'Carbon 1 Size L',
          'Chord'
        ],
        businessHours: [
          "14:00-20:00",
          "14:00-20:00",
          "",
          "14:00-20:00",
          "14:00-17:00",
          "",
          "",
        ],
        disableDate: createdisableDates(100, ['2023-9-7', '2023-9-18', '2023-9-24', '2023-9-27', '2023-9-28']),
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
        name: 'CityBikeEvents – CruiseVision GmbH',
        phone: '+49 40398046-23',
        email: 'info@city-bike-events.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Jessenstraße 4，22767 Hamburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/CruiseVision_GmbH.jpg?v=1691401803",
        testrideSpot: "Hamburg",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M/L'
        ],
        businessHours: [
          "10:00-19:00",
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
        name: 'Norddeutsche Zweiradschiede',
        phone: '+494088359912',
        email: 'zweiradschmiede.nord@gmail.com',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Bramfelder Ch 220, 22799 Hamburg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Norddeutsche_Zweiradschiede.jpg?v=1693272716",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
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
        name: 'Velo Shop',
        phone: '+49404204944',
        email: 'info@veloshop.de',
        timezone: "Hamburg, Germany (GMT+1)",
        add: "Eppendrofer Weg 250",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/VELO_SHOP.jpg?v=1693272717",
        testrideSpot: "Hamburg",
        testRideSize: "L",
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
        phone: '+49 1512 8804444',
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
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "",
          "12:00-19:00",
          "12:00-19:00",
          "12:00-19:00",
          "12:00-12:00,12:00-19:00",
          "09:00-12:00,12:00-13:00",
        ],
      },
      {
        name: 'Michael Kerber',
        phone: '',
        email: 'michael@kerber-privat.de',
        timezone: "München, Germany (GMT+1)",
        add: "Maria-Eich-Str. , D 82166 Graefelfing",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972",
        testrideSpot: "München",
        testRideSize: "L",
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
      }
    ]
  },
  {
    city: 'Münster',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testride-munster.jpg?v=1671252848',
    series: [
      'Urtopia Carbon 1',
      'Urtopia Chord'
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Wilfried Beurich',
        phone: '+0174 9610700',
        email: 'wbeurich@muenster.de',
        timezone: "Mainz, Germany (GMT+1)",
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
        timezone: "Mainz, Germany (GMT+1)",
        add: "Machangelstr 1448282 Emsdetten",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0948.jpg?v=1680923218",
        testrideSpot: "Münster",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
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
        add: "Weißestr. 2604299 Leipzig",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Sportshop_Bittner.jpg?v=1680923400",
        testrideSpot: "Leipzig",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
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
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
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
        availableSizes: [
          'Carbon 1 Size M/L',
        ],
        businessHours: [
          "",
          "14:30-12:00,12:00-19:00",
          "14:30-12:00,12:00-19:00",
          "14:30-12:00,12:00-19:00",
          "14:30-12:00,12:00-19:00",
          "14:30-12:00,12:00-19:00",
          "14:30-19:00",
          "14:30-12:00,12:00-19:00",
          "14:30-19:00",
          "10:00-13:00",
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
        add: "Steelerstraße 198 45138 Essen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Essen.jpg?v=1679406971",
        testrideSpot: "Essen",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
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
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
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
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'RADFAHRWERK',
        phone: '+491632379785',
        email: 'info@radfahrwerk.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "St. Emmerams Ring 4, 93309 Kelheim",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0479.jpg?v=1680924648",
        testrideSpot: "Regensburg",
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
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
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
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
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
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
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Mabea GmbH',
        phone: '+49 01743069724',
        email: 'support@mabea-mobility.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Neue Str. 6, 18273 Güstrow, Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/schloss_guestrow_drohne17_aNoB_ubertr_kUrh_005-1351x900.jpg?v=1689910159",
        testrideSpot: "Güstrow",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "",
          "12:00-16:00",
          "12:00-16:00",
          "12:00-16:00",
          "12:00-16:00",
          "12:00-16:00",
          "",
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
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size M',
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
    city: 'Budenheim',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230814-105334.jpg?v=1691981632',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Helmut Riedl',
        phone: '0176 41451532',
        email: 'helmut-riedl@web.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Langstrasse 44, 55257 Budenheim",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230814-105334.jpg?v=1691981632",
        testrideSpot: "Budenheim",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
        ],
        businessHours: [
          "14:00-18:00",
          "16:00-20:00",
          "16:00-20:00",
          "16:00-20:00",
          "16:00-19:00",
          "16:00-20:00",
          "14:00-18:00",
        ],
        disableDate: [
          "2023/9/8",
          "2023/9/9",
          "2023/9/10"
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
        phone: '+358 45 6745488',
        email: 'ari.huusela@icloud.com',
        timezone: "Meritullinkatu, Finland (GMT+1)",
        add: "Meritullinkatu 9 A 00170 Helsinki",
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
        testRideSize: "M",
        availableSizes: [
          'Carbon 1 Size M',
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
    country: 'Austira',
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
        timezone: "Linz, Austira (GMT+1)",
        add: "Siglweg 1, 4061 Pasching, Austria",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Volo_Bike_Galerie.jpg?v=1694169314",
        testrideSpot: "Linz",
        testRideSize: "L",
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
    ]
  },
  {
    country: 'Austira',
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
        timezone: "Wien, Austira (GMT+1)",
        add: "Katsushikastr. 1,1210 Wien",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Best_Bike.png?v=1694169315",
        testrideSpot: "Wien",
        testRideSize: "L",
        availableSizes: [
          'Carbon 1 Size L',
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
    ]
  },
]

store_list_calculate_total_time = +new Date() - store_list_calculate_total_time
