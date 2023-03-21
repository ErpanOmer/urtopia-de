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
        "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20221214-125750.jpg?v=1670993888",
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
        "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testrideshopimg-Frankfurt.jpg?v=1667370876",
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
    cityBackground: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testrideshopimg-Frankfurt.jpg',
    stores: [
      {
        name: 'TP',
        phone: '+0049 1741 767140',
        email: 'yicxie2017@gmail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Am Sonnigen Hang 21 55127 Mainz Germany",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testrideshopimg-Frankfurt.jpg?v=1667370876",
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
        add: "IED Fulfillment-Service GmbH c/o Urtopia Service Otto-Hahn-Str. 5-7 63225 Langen",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testrideshopimg-Frankfurt.jpg?v=1667370876",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "",
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
        name: 'mein-fahrradhaendler',
        phone: '+00496101 9951561',
        email: 'yicxie2017@gmail.com',
        timezone: "Mainz, Germany (GMT+1)",
        add: "Alt Erlenbach 35, 60437 Frankfurt/Main",
        imgUrl: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/testrideshopimg-Frankfurt.jpg?v=1667370876",
        testrideSpot: "Frankfurt am Main",
        testRideSize: "L",
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
    ]
  },
  
]
