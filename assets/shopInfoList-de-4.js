const shopInfoList = {
  Troisdorf: {
    "+49 2241 881090": {
      name: "satking",
      testRideSize: "M/L",
      testrideSpot: "Troisdorf",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testrideshopimg-SatKing.jpg?v=1665386296",
      add: "Junkersring 18 53844 Troisdorf Germany",
      timezone: "Troisdorf, Germany(GMT+2)",
      email: "info@satking.de",
      phone: "+49 2241 881090",
      businessHours: [
        "",
        "10:00–17:00",
        "10:00–17:00",
        "10:00–17:00",
        "10:00–17:00",
        "10:00–17:00",
        "",
      ],
    },
  },
  Hamburg: {
    "+49 4161 8654612": {
      name: "bike-station-buxtehude",
      testRideSize: "M",
      testrideSpot: "Hamburg",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testrideshopimg-Bike_station.jpg?v=1665386295",
      add: "Hauptstr. 11 21614 Buxtehude Germany",
      timezone: "Buxtehude, Germany(GMT+2)",
      email: "bike-station-buxtehude@web.de",
      phone: "+49 4161 8654612",
      businessHours: [
        "",
        "09:00–18:00",
        "09:00–18:00",
        "09:00–18:00",
        "09:00–18:00",
        "09:00–18:00",
        "10:00–13:00",
      ],
    },
  },
  Munich: {
    "49 1512 8804444": {
      name: "Len Lucas",
      testRideSize: "M",
      testrideSpot: "Munich",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20230119-111546.jpg?v=1674098187",
      add: "Schulstraße 16 82166 Graefelfing, Munich, Bavaria",
      timezone: "Hamburg, Germany (GMT+2)",
      email: " len.lucas@gmx.de",
      phone: "49 1512 8804444",
      businessHours: [
        "10:00–11:00,11:00–12:00,12:00–13:00,13:00–14:00,14:00–15:00,15:00–16:00,16:00–17:00,17:00–18:00,18:00–19:00,19:00–20:00",
        "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
        "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
        "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
        "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
        "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
        "10:00–11:00,11:00–12:00,12:00–13:00,13:00–14:00,14:00–15:00,15:00–16:00,16:00–17:00,17:00–18:00,18:00–19:00,19:00–20:00",
      ],
    },
  },
  Münster: {
    "0174 9610700": {
      name: "Wilfried Beurich",
      testRideSize: "M/L",
      testrideSpot: "Münster",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testride-munster.jpg?v=1671252848",
      add: "Feldstiege 98c in Münster",
      timezone: "Münster (GMT+1)",
      email: "wbeurich@muenster.de",
      phone: "0174 9610700",
      businessHours: [
        "",
        "",
        "",
        "16:00–20:00",
        "16:00–20:00",
        "14:00–18:00",
        "10:00–13:00",
      ],
    },
  },
  Berlin: {
    "+49 30-91706139": {
      name: "Stefan Gehrke",
      testRideSize: "M",
      testrideSpot: "Berlin",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972",
      add: "buero fuer neues denken, Bötzowstr. 18, 10407 Berlin",
      timezone: "Berlin, Germany (GMT+1)",
      email: "urtopia@bfnd.de",
      phone: "+49 30-91706139",
      businessHours: [
        "",
        "09:00–18:00",
        "09:00–18:00",
        "09:00–18:00",
        "09:00–18:00",
        "09:00–18:00",
        "09:00–18:00",
      ],
    },
  },
  Nuremberg: {
    "+49 1765 7894362": {
      name: "Test Ride Spot",
      testRideSize: "M",
      testrideSpot: "Nuremberg",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testrideshopimg-Nuremberg.jpg?v=1667370733",
      add: "Neulandstr. 18 90469 Nürnberg",
      timezone: "Nuremberg, Germany (GMT+1)",
      email: "yoogoodoo@hotmail.com ",
      phone: "+49 1765 7894362",
      businessHours: ["09:00–19:00", "", "", "", "", "", ""],
    },
  },
  Frankfurt: {
    "+49 1741 767140": {
      name: "Test Ride Spot",
      testRideSize: "M/L",
      testrideSpot: "Frankfurt",
      imgUrl:
        "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main.jpg?v=1679406972",
      add: "Am Sonnigen Hang 21 55127 Mainz Germany",
      timezone: "Mainz, Germany (GMT+1)",
      email: "yicxie2017@gmail.com",
      phone: "+49 1741 767140",
      businessHours: [
        "09:00–19:00",
        "09:00–19:00",
        "09:00–19:00",
        "09:00–19:00",
        "",
        "09:00–19:00",
        "09:00–19:00",
      ],
    }
  },
};



const testRides = [
  {
    city: 'Frankfurt am Main',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'TP',
        phone: '+0049 1741 767140',
        email: 'yicxie2017@gmail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Am Sonnigen Hang 21 55127 Mainz Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main.jpg?v=1679406972",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "M/L",
        businessHours: [
          "09:00–19:00",
          "09:00–19:00",
          "09:00–19:00",
          "09:00–19:00",
          "",
          "09:00–19:00",
          "09:00–19:00",
        ],
      },
      {
        name: 'Service Zentrum',
        phone: '+004961032076414',
        email: 'yiming.song@iedau.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Otto-Hahn-Str. 5-7 63225 Langen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main.jpg?v=1679406972",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "",
        businessHours: [
          "",
          "09:00–18:00",
          "09:00–18:00",
          "09:00–18:00",
          "09:00–18:00",
          "09:00–18:00",
          "",
        ],
      },
      {
        name: 'mein-fahrradhaendler',
        phone: '+00496101 9951561',
        email: 'yicxie2017@gmail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Alt Erlenbach 35, 60437 Frankfurt/Main",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main.jpg?v=1679406972",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "L",
        businessHours: [
          "",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–15:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–15:00",
        ],
      }
    ]
  },
  {
    city: 'Düsseldorf',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'DownTownBikes',
        phone: '+0049211 26194969',
        email: 'david@downtownbikes.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Immermannstraße 3440210 Düsseldorf",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972",
        testrideSpot: "Düsseldorf",
        testRideSize: "L",
        businessHours: [
          "",
          "12:00–17:00",
          "12:00–17:00",
          "12:00–17:00",
          "12:00–17:00",
          "12:00–17:00",
          "",
        ],
      }
    ]
  },
  {
    city: 'Berlin',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Berlin.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'TP: Stefan Gehrke',
        phone: '+0049 30-91706139',
        email: 'urtopia@bfnd.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "buero fuer neues denken, Bötzowstr. 18, 10407 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Berlin.jpg?v=1679406972",
        testrideSpot: "Berlin",
        testRideSize: "M",
        businessHours: [
          "",
          "09:00–18:00",
          "09:00–18:00",
          "09:00–18:00",
          "09:00–18:00",
          "09:00–18:00",
          "09:00–18:00",
        ],
      },
      {
        name: 'fahrradladen-wulf',
        phone: '+004930 74737657',
        email: 'fahrradladen-wulf@gmx.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Kopenhagener Straße 73, 10437 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Berlin.jpg?v=1679406972",
        testrideSpot: "Berlin",
        testRideSize: "L",
        businessHours: [
          "",
          "10:00–19:00",
          "10:00–19:00",
          "10:00–19:00",
          "10:00–19:00",
          "10:00–19:00",
          "10:00–17:00",
        ],
      },
      {
        name: 'duundich-bikes',
        phone: '+004930 70 24 59 20',
        email: 'info@duundich-bikes.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Erich-Weinert-Str. 15010409 Berlin",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Berlin.jpg?v=1679406972",
        testrideSpot: "Berlin",
        testRideSize: "M",
        businessHours: [
          "",
          "09:00–19:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "9:00–19:00",
          "11:00–14:00",
        ],
      }
    ]
  },
  {
    city: 'Hamburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hamburg.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Pirate',
        phone: '+004941018194571',
        email: 'ron@pirate.biz',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Dockenhudener Chaussee 11925469 Halstenbek",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hamburg.jpg?v=1679406972",
        testrideSpot: "Düsseldorf",
        testRideSize: "L",
        businessHours: [
          "",
          "09:00–17:00",
          "14:30–17:00",
          "09:00–17:00",
          "14:30–17:00",
          "9:00–17:00",
          "10:00–12:00",
        ],
      }
    ]
  },
  {
    city: 'München',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'TP: Len Lucas',
        phone: '+0049 1512 8804444',
        email: 'len.lucas@gmx.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972",
        testrideSpot: "München",
        testRideSize: "M",
        businessHours: [
          "10:00–11:00,11:00–12:00,12:00–13:00,13:00–14:00,14:00–15:00,15:00–16:00,16:00–17:00,17:00–18:00,18:00–19:00,19:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–19:00,19:00–20:00",
          "10:00–11:00,11:00–12:00,12:00–13:00,13:00–14:00,14:00–15:00,15:00–16:00,16:00–17:00,17:00–18:00,18:00–19:00,19:00–20:00",
        ],
      },
      {
        name: 'Radsport Holzbauer',
        phone: '+004989481334',
        email: 'radsport.holzbauer@web.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Regerplatz 481541 München",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972",
        testrideSpot: "München",
        testRideSize: "L",
        businessHours: [
          "",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "09:00–12:00",
        ],
      },
      {
        name: 'Supercycles',
        phone: '+00498945145610',
        email: 'info@supercycles.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Am Mitterfeld 381829 München",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972",
        testrideSpot: "München",
        testRideSize: "L",
        businessHours: [
          "",
          "",
          "12:00–19:00",
          "12:00–19:00",
          "12:00–19:00",
          "12:00–19:00",
          "09:00–13:00",
        ],
      }
    ]
  },
  {
    city: 'Münster',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testride-munster.jpg?v=1671252848',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'TP: Wilfried Beurich',
        phone: '+0174 9610700',
        email: 'wbeurich@muenster.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Wilfried Beurich",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testride-munster.jpg?v=1671252848",
        testrideSpot: "Münster",
        testRideSize: "L",
        businessHours: [
          "",
          "",
          "",
          "16:00–20:00",
          "16:00–20:00",
          "14:00–18:00",
          "10:00–13:00",
        ],
      }
    ]
  },
  {
    city: 'Köln',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Koln.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'TP: Hartmut Geyssel',
        phone: '+0049 611 1370 5755',
        email: 'urtopiakoeln@hophopik.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Neusser Straße 35, 50670 Köln",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Koln.jpg?v=1679406972",
        testrideSpot: "Köln",
        testRideSize: "M",
        businessHours: [
          "09:00–19:00",
          "18:00–20:00",
          "18:00–20:00",
          "18:00–20:00",
          "18:00–20:00",
          "18:00–20:00",
          "09:00–19:00",
        ],
      },
      {
        name: 'Schneider Lastenrad Köln Verkauf & Fahrradwerkstatt',
        phone: '+004922131040711',
        email: 'verkauf@lastenrad-koeln.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Rothgerberbach 2, 50676 Köln",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Koln.jpg?v=1679406972",
        testrideSpot: "Köln",
        testRideSize: "M/L",
        businessHours: [
          "",
          "",
          "08:00–18:00",
          "08:00–18:00",
          "08:00–18:00",
          "08:00–18:00",
          "10:00–14:00",
        ],
      },
    ]
  },
  {
    city: 'Leipzig',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Leipzig.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Sportshop Bittner',
        phone: '+00491738110685',
        email: 'greenturtle-germany@web.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Weißestr. 2604299 Leipzig",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Leipzig.jpg?v=1679406972",
        testrideSpot: "Leipzig",
        testRideSize: "M",
        businessHours: [
          "",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "11:00–19:00",
          "10:00–18:00",
          "",
        ],
      },
    ]
  },
  {
    city: 'Stuttgart',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Stuttgart.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'e-bike schahl OHG Stuttgart',
        phone: '+0049711 2865012',
        email: 'info@e-bike-stuttgart.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Schubartstraße 16-1870190 Stuttgart",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Stuttgart.jpg?v=1679406972",
        testrideSpot: "Stuttgart",
        testRideSize: "M",
        businessHours: [
          "",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–13:00",
        ],
      },
      {
        name: 'alf bikes & coffee',
        phone: '+0049 178 149 47 22',
        email: 'simon@alleliebenfahrrad.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Villastraße 14, 70190 Stuttgart",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Stuttgart.jpg?v=1679406972",
        testrideSpot: "Stuttgart",
        testRideSize: "M",
        businessHours: [
          "",
          "14:30–19:00",
          "14:30–19:00",
          "14:30–19:00",
          "14:30–19:00",
          "14:30–19:00",
          "10:00–13:00",
        ],
      },
    ]
  },
  {
    city: 'Hannover',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hannover.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fahrradcafé GmbH',
        phone: '+0049511 22859331',
        email: 'linden@fahrradcafe.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Fröbelstraße 130451 Hannover",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hannover.jpg?v=1679406972",
        testrideSpot: "Hannover",
        testRideSize: "L",
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
        name: 'Fahrradcafé GmbH',
        phone: '+004951145014270',
        email: 'post@fahrradcafe.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Asternstraße 230167 Hannover",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hannover.jpg?v=1679406972",
        testrideSpot: "Hannover",
        testRideSize: "L",
        businessHours: [
          "",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–14:30",
        ],
      },
    ]
  },
  {
    city: 'Essen',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Essen.jpg?v=1679406971',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fahrradladen Heimatliebe Mertes',
        phone: '+004920137648405',
        email: 'team.mertes@fahrrad-essen.eu',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Heidhauser Str. 72, 45239 Essen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Essen.jpg?v=1679406971",
        testrideSpot: "Essen",
        testRideSize: "M",
        businessHours: [
          "",
          "",
          "10:30–19:00",
          "10:30–19:00",
          "10:30–19:00",
          "10:30–19:00",
          "10:30–14:30",
        ],
      },
    ]
  },
  {
    city: 'Dresden',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dresden.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'bike Store',
        phone: '+00493512728755',
        email: 'bikestore@resewski.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Otto-Mohr-Straße 4, 01237 Dresden",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dresden.jpg?v=1679406972",
        testrideSpot: "Dresden",
        testRideSize: "M",
        businessHours: [
          "",
          "10:00–18:00",
          "10:00–18:00",
          "14:00–18:00",
          "10:00–18:00",
          "10:00–18:00",
          "10:00–13:00",
        ],
      },
    ]
  },
  {
    city: 'Nürnberg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Nurnberg.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'P.O.S. Partner of Sports Nürnberg',
        phone: '+0049911 538530',
        email: 'bikestore@resewski.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Rennweg 7, 90489 Nürnberg",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Nurnberg.jpg?v=1679406972",
        testrideSpot: "Nürnberg",
        testRideSize: "M",
        businessHours: [
          "",
          "",
          "10:00–18:00",
          "10:00–15:00",
          "10:00–15:00",
          "10:00–18:00",
          "10:00–15:00",
        ],
      },
    ]
  },
  {
    city: 'Regensburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Regensburg.jpg?v=1679406972',
    series: [
      'Urtopia Chord',
      'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'RADFAHRWERK',
        phone: '+00491632379785',
        email: 'info@radfahrwerk.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "St. Emmerams Ring 493309 Kelheim",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Regensburg.jpg?v=1679406972",
        testrideSpot: "Regensburg",
        testRideSize: "M",
        businessHours: [
          "09:00–12:00",
          "08:00–21:00",
          "08:00–21:00",
          "08:00–21:00",
          "08:00–21:00",
          "08:00–21:00",
          "09:00–12:00",
        ],
      },
    ]
  }
]
