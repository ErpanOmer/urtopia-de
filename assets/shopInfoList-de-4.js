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
        name: 'Test Ride Spot',
        phone: '+49 1741 767140',
        email: 'yicxie2017@gmail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Am Sonnigen Hang 21 55127 Mainz Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main_dcfbb429-041a-46e8-809c-988adaf41dfd.jpg?v=1680920985",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "M/L",
        businessHours: [
          "09:00-12:00,12:00–19:00",
          "09:00-12:00,12:00–19:00",
          "09:00-12:00,12:00–19:00",
          "09:00-12:00,12:00–19:00",
          "",
          "09:00-12:00,12:00–19:00",
          "09:00-12:00,12:00–19:00",
        ],
      },
      {
        name: 'Service Zentrum',
        phone: '+4961032076414',
        email: 'yiming.song@iedau.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Otto-Hahn-Str. 5-7 63225 Langen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Frankfurt_am_Main_dcfbb429-041a-46e8-809c-988adaf41dfd.jpg?v=1680920985",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "M/L",
        businessHours: [
          "",
          "09:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–18:00",
          "",
        ],
      },
      {
        name: 'mein-fahrradhaendler',
        phone: '+496101 9951561',
        email: '',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Alt Erlenbach 35, 60437 Frankfurt/Main",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Screenshot_2023-04-06_at_00.04.43.jpg?v=1680921842",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "L",
        businessHours: [
          "",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–15:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–15:00",
        ],
      }
    ]
  },
  {
    city: 'Düsseldorf',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Dusseldorf.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
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
        testRideSize: "M",
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
        name: 'DownTownBikes am Hbf.',
        phone: '+49211 26194969',
        email: 'david@downtownbikes.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Immermannstraße 3440210 Düsseldorf",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2022-02-22.jpg?v=1680921947",
        testrideSpot: "Düsseldorf",
        testRideSize: "L",
        businessHours: [
          "",
          "13:00–17:00",
          "13:00–17:00",
          "13:00–17:00",
          "13:00–17:00",
          "13:00–17:00",
          "",
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
        testRideSize: "M, Chord",
        availableSizes: [
          'Carbon One Size M',
          'Chord'
        ],
        businessHours: [
          "",
          "09:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–18:00",
        ],
        disableDate: [
          '2023-4-1',
          '2023-4-2',
          '2023-4-3',
          '2023-4-4',
          '2023-4-5',
          '2023-4-6',
          '2023-4-7',
          '2023-4-8',
          '2023-4-9',
          '2023-4-10',
          '2023-4-11',
          '2023-4-12',
          '2023-4-13',
          '2023-4-14',
          '2023-4-15',
        ]
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
        businessHours: [
          "",
          "10:00-12:00,12:00–19:00",
          "10:00-12:00,12:00–19:00",
          "10:00-12:00,12:00–19:00",
          "10:00-12:00,12:00–19:00",
          "10:00-12:00,12:00–19:00",
          "10:00-12:00,12:00–17:00",
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
        businessHours: [
          "",
          "09:00-12:00,12:00–19:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00–18:00",
          "09:00-12:00,12:00–19:00",
          "11:00-12:00,12:00–14:00",
        ],
      }
    ]
  },
  {
    city: 'Hamburg',
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Hamburg.jpg?v=1679406972',
    series: [
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Pirate',
        phone: '+4941018194571',
        email: 'ron@pirate.biz',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Dockenhudener Chaussee 11925469 Halstenbek",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0908.jpg?v=1680922574",
        testrideSpot: "Hamburg",
        testRideSize: "L",
        businessHours: [
          "",
          "09:00-12:00,12:00–17:00",
          "14:30–17:00",
          "09:00-12:00,12:00–17:00",
          "15:00–17:00",
          "09:00-12:00,12:00–17:00",
          "10:00-12:00,12:00–12:00",
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
        name: 'Len Lucas',
        phone: '+49 1512 8804444',
        email: 'len.lucas@gmx.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Killerstrasse 15 82166 Graefelfing, Munich, Bavaria",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Munchen.jpg?v=1679406972",
        testrideSpot: "München",
        testRideSize: "M",
        businessHours: [
          "10:00-12:00,12:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–20:00",
          "8:00–9:30,13:00–14:30,18:00–20:00",
          "10:00-12:00,12:00–20:00",
        ],
      },
      {
        name: 'Radsport Holzbauer',
        phone: '+4989481334',
        email: 'radsport.holzbauer@web.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Regerplatz 481541 München",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0437.jpg?v=1680922957",
        testrideSpot: "München",
        testRideSize: "L",
        businessHours: [
          "",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "09:00-12:00,12:00–12:00",
        ],
      },
      {
        name: 'Supercycles',
        phone: '+498945145610',
        email: 'info@supercycles.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Am Mitterfeld 381829 München",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0440.jpg?v=1680923045",
        testrideSpot: "München",
        testRideSize: "L",
        businessHours: [
          "",
          "",
          "12:00–19:00",
          "12:00–19:00",
          "12:00–19:00",
          "12:00-12:00,12:00–19:00",
          "09:00-12:00,12:00–13:00",
        ],
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
        businessHours: [
          "",
          "",
          "",
          "16:00–20:00",
          "16:00–20:00",
          "14:00–18:00",
          "10:00-12:00,12:00–13:00",
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
        businessHours: [
          "",
          "9:00 - 12:00, 12:00 - 13:00, 14:30 - 18:00",
          "9:00 - 12:00, 12:00 - 13:00, 14:30 - 18:00",
          "9:00 - 12:00, 12:00 - 13:00, 14:30 - 18:00",
          "9:00 - 12:00, 12:00 - 13:00, 14:30 - 18:00",
          "10:00 - 12:00, 12:00 - 13:00, 14:30 - 17:00",
          "10:00–12:00, 12:00 - 13:00",
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
        add: "Lachemer Weg 21 b, 50737 Köln ",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Koln.jpg?v=1679406972",
        testrideSpot: "Köln",
        testRideSize: "M",
        businessHours: [
          "09:00–18:00",
          "09:00–18:00",
          "09:00–18:00",
          "09:00–18:00",
          "",
          "",
          "",
        ],
      },
      {
        name: 'Hartmut Geyssel',
        phone: '+49 611 1370 5755',
        email: 'urtopiakoeln@hophopik.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Neusser Straße 35, 50670 Köln",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Koln.jpg?v=1679406972",
        testrideSpot: "Köln",
        testRideSize: "M",
        businessHours: [
          "09:00-12:00,12:00–19:00",
          "18:00–20:00",
          "18:00–20:00",
          "18:00–20:00",
          "18:00–20:00",
          "18:00–20:00",
          "09:00-12:00,12:00–19:00",
        ],
        disableDate: [
          '2023-4-7',
          '2023-4-8',
          '2023-4-9',
          '2023-4-10',
          '2023-4-11',
          '2023-4-12',
          '2023-4-13',
          '2023-4-14',
          '2023-4-15',
          '2023-4-16',
          '2023-4-17',
          '2023-4-18',
          '2023-4-19',
          '2023-4-20',
          '2023-4-21',
          '2023-4-22',
          '2023-4-23',
          '2023-4-24',
        ]
      },
      {
        name: 'Schneider Lastenrad Köln Verkauf & Fahrradwerkstatt',
        phone: '+4922131040711',
        email: 'verkauf@lastenrad-koeln.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Rothgerberbach 2, 50676 Köln",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0935.jpg?v=1680923331",
        testrideSpot: "Köln",
        testRideSize: "M/L",
        businessHours: [
          "",
          "",
          "08:00-12:00,12:00–18:00",
          "08:00-12:00,12:00–18:00",
          "08:00-12:00,12:00–18:00",
          "08:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–14:00",
        ],
      },
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
        businessHours: [
          "",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "11:00-12:00,12:00–19:00",
          "10:00-12:00,12:00–18:00",
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
        businessHours: [
          "",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–13:00",
        ],
      },
      {
        name: 'alf bikes & coffee',
        phone: '+49 178 149 47 22',
        email: 'simon@alleliebenfahrrad.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Villastraße 14, 70190 Stuttgart",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0432.jpg?v=1680923539",
        testrideSpot: "Stuttgart",
        testRideSize: "M",
        availableSizes: [
          'Carbon One Size M/L',
          'Chord'
        ],
        businessHours: [
          "",
          "14:30-12:00,12:00–19:00",
          "14:30-12:00,12:00–19:00",
          "14:30-12:00,12:00–19:00",
          "14:30-12:00,12:00–19:00",
          "14:30-12:00,12:00–19:00",
          "14:30–19:00",
          "14:30-12:00,12:00–19:00",
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
      'Urtopia Carbon 1',
      // 'Urtopia Carbon 1'
    ],
    stores: [
      {
        name: 'Fahrradcafé Linden',
        phone: '+49511 22859331',
        email: 'linden@fahrradcafe.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Fröbelstraße 30451 Hannover",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0883.jpg?v=1680923639",
        testrideSpot: "Hannover",
        testRideSize: "L",
        businessHours: [
          "",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "",
        ],
      },
      {
        name: 'Fahrradcafé GmbH',
        phone: '+49511 45014270',
        email: 'post@fahrradcafe.de',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Asternstraße 30167 Hannover",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/IMG_0883.jpg?v=1680923639",
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
        businessHours: [
          "",
          "",
          "10:30-12:00,12:00–19:00",
          "10:30-12:00,12:00–19:00",
          "10:30-12:00,12:00–19:00",
          "10:30-12:00,12:00–19:00",
          "10:30-12:00,12:00–14:30",
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
        businessHours: [
          "",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "14:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–18:00",
          "10:00–18:00",
          "10:00-12:00,12:00–13:00",
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
        businessHours: [
          "",
          "",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–15:00",
          "10:00-12:00,12:00–15:00",
          "10:00-12:00,12:00–18:00",
          "10:00-12:00,12:00–15:00",
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
        businessHours: [
          "09:00–12:00",
          "08:00-12:00,12:00–21:00",
          "08:00-12:00,12:00–21:00",
          "08:00-12:00,12:00–21:00",
          "08:00-12:00,12:00–21:00",
          "08:00-12:00,12:00–21:00",
          "09:00-12:00",
        ],
      },
    ]
  },
  {
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
        businessHours: [
          "09:00–12:00, 12:00 - 18:00",
          "09:00–12:00, 12:00 - 18:00",
          "09:00–12:00, 12:00 - 18:00",
          "09:00–12:00, 12:00 - 18:00",
          "09:00–12:00, 12:00 - 18:00",
          "09:00–12:00, 12:00 - 18:00",
          "09:00–12:00, 12:00 - 18:00",
        ],
      },
    ]
  }
]
