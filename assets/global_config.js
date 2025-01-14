const global_config = {
  sale_end_times: [
    {
      sale_name: 'Autumn Adventure Sale',
      sale_end_time: '2024-10-14'
    },
    {
      sale_name: 'October Price Slash',
      sale_end_time: '2024-10-18'
    },
    {
      sale_name: 'Harvest Deals',
      sale_end_time: '2024-10-21'
    },
    {
      sale_name: 'Pumpkin Price Drop',
      sale_end_time: '2024-10-25'
    },
    {
      sale_name: 'Mystery Markdown',
      sale_end_time: '2024-10-28'
    },
  ],
  // 默认活动送配件 variant_id
  event_accessories_variant_ids: ['43988113621208', '43745261748440'],

  // 是否是手机
  is_mobile: document.documentElement.clientWidth < 768,
  // 是否是 pc
  is_pc: !!!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
  // leasing 有关配置
  leasing: {
    // 需要禁用的jobrad 配件
    jobrad_disabled_accessories: ['7633738694872', '7974077038808', "8034307703000"],
    // lease a bike 
    leaseabike_disabled_accessories: ['7633738694872', '7974077038808'],
    ebike_delivery_time: {
      'carbon1': 'Free shipping within <span>5 working days</span>',
      'carbon1s': 'Free shipping within <span>5 working days</span>',
      'chord': 'Free shipping within <span>10 working days</span>',
      'chordx': 'Free shipping within <span>10 working days</span>',
    },
    available_urtopia_ebike_default: 'carbon1pro'
  },
  dialog: {
    language: {
      is_hide: false,
      submit_expires_time: 30,
      close_expires_time: 3,
      show_delay_time: 5    // 延迟弹出时间，单位:s
    },
    email: {
      is_hide: false,
      subscribe_email_close_expires_time: 1,              // 邮件进入弹窗 关闭过期时间
      subscribe_email_message_close_expires_time_mb: 3,   // 邮件小弹窗 关闭过期时间 -> 移动端
      subscribe_email_message_close_expires_time_pc: 1,   // 邮件小弹窗 关闭过期时间 -> pc端
      submit_expires_time: 30,                            // 邮件类弹窗 提交过期时间
      close_expires_time: 3,                              // 邮件类弹窗 关闭过去时间
      show_delay_time: 15                                 // 邮件类延迟弹出时间，单位:s
    },
    test_ride: {
      is_hide: false,
      submit_expires_time: 7,
      close_expires_time: 3,
      show_delay_time: 15
    }
  },

  // carbon 车配置
  carbon_order_page_config: {
    // carbon车 活动相关
    events: {
      carbon1_send_accessories_variant_ids: ['43988113621208', '43745261748440'],
      carbon1s_send_accessories_variant_ids: ['43866498891992', '43988117356760'],
    },
    // carbon 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
    default_variant: 44222041817304,
    ignore_variants_available_false: [],
    size_map: {
      M: 'Fit for 165-185 cm',
      L: 'Fit for 175-195 cm',
      'One Size': 'Fit for 168-195 cm'
    },
    awards: [
      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231214-163215.png?v=1702542766',
      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231214-163208.png?v=1702542765'
    ],
    // 产品系列图
    product_images: {
      "Carbon Belt": {
        Sirius: [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Group_24469_2x_71a4b3d2-95b3-4a0f-bfb3-926b4f81d890.jpg?v=1722569930",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/img_v2_5e5f0b5d-14c0-4ff6-83e9-38a90a8a2aeg_2x_d82d3564-3d6a-4367-9ad6-92435429dad6.jpg?v=1722569937&width=700",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/img_v2_e35c9305-6b5b-4545-98c7-cb826aa79c4g_2x_b2972ace-e698-4dfe-92e6-3ef7d04dfbf5.jpg?v=1722569944&width=700",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20220619-untitled-9699-_2x_12244b6e-2ed9-4984-b7a3-d23834b49e5a.jpg?v=1722569949&width=700",
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSC0263_Kopie_2x_993f3baa-57ad-4bb1-bd80-50f5e2eba179.jpg?v=1722569956&width=700',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Group_24463_2x_0caf50e5-45d3-43b7-b04f-9b63a38de059.jpg?v=1722569962',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Group_24464_2x_c044be88-7fdd-4ba9-b03a-b940a29c6f2f.jpg?v=1722569967',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Group_24462_2x_9e9fd5e1-7165-4798-bfd3-aaa0ff48d767.jpg?v=1722569972',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/ssss_2x_f611d378-f8f5-48fa-b95c-50ddcb20dcb4.jpg?v=1722569921'
        ],
        Lyra: [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18525.png?v=1688112407',
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18693.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18692.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18691.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18690.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18689.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18688.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/ssss_6e9b22f2-3d7e-4f41-82b7-dd7b575dea98.png?v=1688112407"
        ],
        "Midnight in Paris": [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18526.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18693.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18692.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18691.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18690.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18689.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18688.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/ssss_6e9b22f2-3d7e-4f41-82b7-dd7b575dea98.png?v=1688112407"
        ],
        Vanilla: [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18699.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18698.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18697.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18695.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18696.png?v=1688112407"
        ],
        commonSwiper: []
      },
      "Shimano Gear": {
        Sirius: [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18145.png?v=1688113259",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18704.png?v=1688113258",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18705.png?v=1688113259"
        ],
        Lyra: [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/lyra_side.png?v=1693322636',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/lyra_front.png?v=1693322636'
        ],
        "Midnight in Paris": [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/might_night_in_pairs_side.png?v=1693322636",
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/midnight_in_pairs_front.png?v=1693322636'
        ],
        commonSwiper: [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/14031687412304_.pic_hd_eb7f49ff-842e-4ab5-8736-f1b98393fc17.png?v=1688113259",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/14051687412317_.pic_hd_20e0b017-4162-47fa-884b-2301802ce812.png?v=1688113259",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/45_9d0ec03f-9490-4093-96ea-907e4d4ffdeb.png?v=1688113259",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18702.png?v=1688113259",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18703.png?v=1688113259",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/ssss_1c3776c9-2428-4a84-8576-35639d72ec78.png?v=1688113259",
        ]
      }
    },
    // 产品图下面的media模块, 根据产品图 循环轮播 
    product_media_images: [
      {
          text: 'Carbon Fiber Expert',
          img: "https://newurtopia.com/cdn/shop/files/logo_0707__1.png?v=1684310857"
      },
      {
        text: `“The AI-powered co-pilot adds a new level of intelligence and interactivity”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230913-173450.png?v=1694597715"
      },
      {
        text: `“Urtopia is an over the top e-bike”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18604_2x_dbde7d31-6b13-4fa7-80be-7f7c1ea23c13.png?v=1687188893"
      },
      {
        text: `“Eye-catching styled carbon frame”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18605_2x_1fb17080-bba1-42a3-a5e0-b5a5fe63c252.png?v=1687188923"
      },
      {
        text: `“The carbon pedelec from Urtopia is also stylish, light and electric.”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18537_2x_ab067425-468d-4359-8136-daf2681d1af6.png?v=1687188959"
      },
      {
        text: `“Lightweight, networked and highly secure”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18603_2x_a65ec9f7-1b63-459d-8b53-fb3624b5d492.png?v=1687188993"
      },
      {
        text: `“Lightweight carbon fiber road e-bike with affordably-price”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18602_2x_d83cb682-76f4-43f5-809c-0212ebf68b24.png?v=1687188826"
      }
    ],
    // 默认的发货时间 文案
    ebike_default_delivery_time: 'Free shipping <span>5 working days</span>',
    ebike_delivery_time: {
    },
    sizes_and_specs: {
      sizes: {
        image: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231221-151050_2x_d883c889-6e52-477d-8672-a7dda6dbbbdd.png?v=1703577530',
        parameters: [
          [
            '<span style="color: #fff;">xxxx</span>',
            'Recomm. rider height',
            'A. Standover height',
            'B. Adjustable seat range',
            'C. Handlebar grips height',
            'D. Seat tube length',
            'E. Wheelbase',
            'F. Overall length',
            'G. Wheel diameter',
            'H. Top tube length (effective)',
            'I. Head tube length',
            'J. Headset height'
          ],
          [
            '<span class="u17DemiBold_v2">Medium</span>',
            '165-185 cm',
            '800 mm',
            '60 mm',
            '1010 mm',
            '460 mm',
            '1080 mm',
            '1810 mm',
            '690 mm',
            '580 mm',
            '170 mm',
            '100 mm'
          ],
          [
            '<span class="u17DemiBold_v2">Large</span>',
            '175-195 cm',
            '840 mm',
            '60 mm',
            '1020 mm',
            '500 mm',
            '1120 mm',
            '1850 mm',
            '690 mm',
            '610 mm',
            '180 mm',
            '100 mm'
          ],
        ]
      },
      specs: [
        {
          title: 'Smart',
          parameters: [
            ["Smartbar features", "Voice control, fingerprint unlock, LED dot-matrix display"],
            ["Connectivity", "Connect Service with 4G, Bluetooth & WiFi"],
            ["IoT sensors", "Accelerometer, gyroscope, torque"],
            ["Connect Service", "1 year included*"],
            ["App", "iOS & Android"],
          ]
        },
        {
          title: 'Power',
          parameters: [
            ["Motor", "Carbon 1: 36V 250W(rated), 35 N.m"],
            ["Speed modes", "Pedal, Eco, Comfort, Sport, Turbo"],
            ["Top speed (assisted)", "25 km/h"],
            ["Range", "Up to 110 km"],
            ["Removable battery", "9.8 Ah 352.8 Wh Samsung Li-ion, 2.5-hr quick charge"]
          ]
        },
        {
          title: 'General',
          parameters: [
            ["Weight", "15 kg"],
            ["Load-bearing capacity", "Max. 110 kg."],
            ["Sizes", `M: 28"(Fit for 165-185 cm) <br>L: 28"(Fit for 175-195 cm) <br>`],
            ["Body material", "Carbon fiber (frame, fork, handlebar, seatpost)"],
            ["Brakes", "Front and rear dual-piston hydraulic disc brakes"],
            ["Gearing", "Carbon 1: Gates Carbon Drive™ CDN™ belt(up to 30,000km)"],
            ["Integrated lights", "StVZO headlight; Advanced Rear Early-indication System (ARES)"],
            ["Wheels", "700C (ISO 622 mm BSD), inner rim 19 mm"],
            ["Tires", "Kenda Kwest 700x35C (35 mm / 1.4”) (30~45 mm compatible)"]
          ]
        },
      ]
    }
  },
  // chrod order page 配置项
  chord_order_page_config: {
    // chord 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
    default_variant: 43705719029976,
    ignore_variants_available_false: [],
    size_map: {
      'High-Step': 'Fit for 170-195 cm',
      'Step-Through': 'Fit for 160-185 cm'
    },
    awards: [
      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231214-163200.png?v=1702542765'
    ],
    // 产品图
    product_images: {
      "High-Step": {
        White: [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18755.png?v=1689236358",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18760.png?v=1689236358",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18762.png?v=1689236358",

          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18765.png?v=1689236562',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18769.png?v=1689236563',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18766.png?v=1689236562'
        ],
        Black: [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18754.png?v=1689236445',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18758.png?v=1689236445',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18759.png?v=1689236445',

          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18770_ae2056ef-cd08-42d1-a7b4-e8f125eae35a.png?v=1689237082',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18771.png?v=1689237081',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772_58e3cebc-b65d-42e2-bee0-f40c0662e725.png?v=1695388441'
        ],
        commonSwiper: [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6129.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6611.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF2506.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-5302.jpg?v=1695387132'
        ]
      },
      "Step-Through": {
        White: [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18757.png?v=1689237250",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18763.png?v=1689237250",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18764.png?v=1689237251",

          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18765.png?v=1689236562',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18769.png?v=1689236563',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18766.png?v=1689236562'
        ],
        Black: [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18756.png?v=1689237251',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18767.png?v=1689237251',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18768.png?v=1689237250',

          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18770_ae2056ef-cd08-42d1-a7b4-e8f125eae35a.png?v=1689237082',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18771.png?v=1689237081',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772_58e3cebc-b65d-42e2-bee0-f40c0662e725.png?v=1695388441'
        ],
        Gray: [
          'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_side.png?v=1696833425',
          'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_front.png?v=1696833426',
          'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_back.png?v=1696833425',

          'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_bar.png?v=1696833426',
          'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_gear.png?v=1696833426',
          'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_downtube.png?v=1696833426'
        ],
        commonSwiper: [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6129.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6611.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF2506.jpg?v=1695387132',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-5302.jpg?v=1695387132'
        ]
      }
    },
    product_media_images: [
      {
        text: `“The smoothest and cleanest look”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18675_2x_75c49337-c9e2-4f36-8d62-bf676477342b.png?v=1699861700"
      },
      {
        text: `“Battery integrated under the top tube like never before.”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18931_2x_4bfe7a5e-d7f8-4241-b453-6f1269875cd7.png?v=1699861708"
      },
      {
        text: `“A lifestyle piece incorporates cutting-edge technology”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18927_2x_221c18ab-9822-4bfd-8434-e4da565bc9ac.png?v=1699861715"
      },
      {
        text: `“The unusual smart e-bike is worth a look.”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18928_2x_4fa3a41f-c723-4589-be3c-1b499e871a3f.png?v=1699861725"
      },
      {
        text: `“This is a model destined to conquer the public.”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18929_2x_ab7441d3-d6ca-49f1-839a-1e01e2712a97.png?v=1699861731"
      },
      {
        text: `“one of the most beautiful and futuristic ebikes of 2023”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18930_2x_9c4e218a-1697-41e3-a5da-5e771d4b7a79.png?v=1699861737"
      }
    ],
    // 默认的发货时间 文案
    ebike_default_delivery_time: 'Free shipping <span>within 5 days</span>',
    // 每一种variant 的发货时间文案
    ebike_delivery_time: {

      //outlet chord
      //chord
      //white
      43950919024856: 'Free shipping within 10 working days',
      //black
      43950919057624: 'Free shipping within 10 working days',
      //chord X
      //white
      43950919090392: 'Free shipping within 10 working days',
      //black
      43950919123160: 'Free shipping within 10 working days',


      // chord
      43705718997208: 'Free shipping within 5 working days',
      43705719029976: 'Free shipping within 5 working days',
      // chord x
      43705719062744: 'Free shipping within 5 working days',
      43988553859288: 'Free shipping within 5 working days',
      //43988553859288: 'Ships between November 15-30, 2023',
    }
  },
  // 1pro 配置
  carbon1pro_order_page_config: {
    // variant 为 available:false 的情况下 也要强制显示 
    ignore_variants_available_false: [],
    // default_variant: 44288621314296,
    size_map: {
      M: 'Fit for 165-185 cm',
      L: 'Fit for 175-195 cm',
      'One Size': 'Fit for 168-195 cm'
    },
    // 默认的发货时间 文案
    ebike_default_delivery_time: 'Shipping within 3 working days',
    // 每一种variant 的发货时间文案
    ebike_delivery_time: {},
    product_images: {
      'Matte Black': [
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/3-1.jpg?v=1722064932',
         'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Group_24397.jpg?v=1722064933&width=800',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231108-untitled-3641.jpg?v=1722064933&width=800',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231108-untitled-2778_2x_dc09eb12-516a-4242-8ad9-4976d30865af.jpg?v=1721977722',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231108-untitled-3635_2x_ca863040-f526-4b2b-b54f-7202384fe41d.jpg?v=1721977727&width=800',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_-_c_2x_59857988-2ad6-42c3-ba78-b239cc591367.jpg?v=1721977733',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_-_c__1_1_2x_1b9d5dea-a84a-442b-80ec-3fa18757aabd.jpg?v=1721977738',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_1_1.jpg?v=1722064932',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_c_2x_4d3389e3-6c89-4584-a35d-a7586f6f0dec.jpg?v=1721977750',
      ],
      'Creme': [
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18878.jpg?v=1722064932',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Group_24398.jpg?v=1722064933&width=800',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240308-untitled-6217.jpg?v=1722064934&width=800',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-20.jpg?v=1722064933&width=800',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-11.jpg?v=1722064933&width=800',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18874.jpg?v=1722064932&width=800',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18870.jpg?v=1722064932&width=800',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18862.jpg?v=1722064932',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18858.jpg?v=1722064933',
        'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Group_24398.jpg?v=1722064933&width=800'
      ],
      commonSwiper: [
      ]
    },
    // 产品图下面的media模块, 根据产品图 循环轮播 
    product_media_images: [
      {
          text: 'Carbon Fiber Expert',
          img: "https://newurtopia.com/cdn/shop/files/logo_0707__1.png?v=1684310857"
      },
      {
          text: `“Visually stunning and lightweight bikes”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19051_2x_3c234be0-e1cb-4ab0-b83c-02282fd42cb4.png?v=1705485418"
      },
      {
          text: `“The best electric bikes of 2024”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19052_2x_83b17023-7ff5-413b-9a87-571e8e6928ee.png?v=1705485424"
      },
      {
          text: `“Pack with copious use of technology”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19053_2x_2b4e11dc-d27b-47ad-9478-92c696e1fac7.png?v=1705485431"
      },
      // {
      //     text: `“Pack with copious use of technology”`,
      //     img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19054_2x_7feff357-8d1b-48a0-b9af-662442dc41f6.png?v=1705485437"
      // },
      {
          text: `“The epitome of raw power”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19055_2x_612a45c4-04fe-4477-a252-302e8d11c40e.png?v=1705485444"
      },
      {
          text: `“Carbon 1 Pro as ‘a bike with spirit”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19056_2x_b61e963a-f2b3-49f3-8bc2-4aee5f8f2a4c.png?v=1705485451"
      },
      {
          text: `“Standout feature lies in its integration with advanced technology. ”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19057_2x_0eabb26b-a2fe-48e8-b00e-209ef2b986e0.png?v=1705485460"
      },
      {
          text: `“Interesting innovation or tech for tech’s sake”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19058_2x_b0454fa5-9c44-462e-8f04-5646db60456a.png?v=1705485466"
      },
      {
          text: `“Completely crazy: This e-bike talks to the rider”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19059_2x_14b271ba-3eae-41ea-8882-e6896e9f9948.png?v=1705485473"
      },
      {
          text: `“The iPhone among e-bikes”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19060_2x_e094650e-c53d-4e29-b805-7e89d127643d.png?v=1705485481"
      },
      {
          text: `“Thanks to its full carbon frame, the Urtopia e-bikes is light”`,
          img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19061_2x_a24c29c4-0fff-421f-9977-25989e38b7e9.png?v=1705485487"
      }
  ],
    sizes_and_specs: {
      sizes: {
        image: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231221-151050_2x_d883c889-6e52-477d-8672-a7dda6dbbbdd.png?v=1703577530',
        parameters: [
          [
            '<span style="color: #fff;">xxxx</span>',
            'Recomm. rider height',
            'A. Standover height',
            'B. Adjustable seat range',
            'C. Handlebar grips height',
            'D. Seat tube length',
            'E. Wheelbase',
            'F. Overall length',
            'G. Wheel diameter',
            'H. Top tube length (effective)',
            'I. Head tube length',
            'J. Headset height'
          ],
          [
            '<span class="u17DemiBold_v2">Medium</span>',
            '165-185 cm',
            '804 mm',
            '60 mm',
            '1011-1041 mm',
            '463 mm',
            '1093 mm',
            '1795 mm',
            '702 mm',
            '618 mm',
            '170 mm',
            '90-120 mm'
          ],
          [
            '<span class="u17DemiBold_v2">Large</span>',
            '175-195 cm',
            '833 mm',
            '60 mm',
            '1023-1053 mm',
            '498 mm',
            '1122 mm',
            '1824 mm',
            '702 mm',
            '653 mm',
            '180 mm',
            '90-120 mm'
          ]
        ]
      },
      specs: [
        {
          title: 'Smart',
          parameters: [
            ["Smartbar features", "Voice control, fingerprint start, LED dot - matrix display, haptic interaction, bluetooth music, built-in navigation, OTA upgrade"],
            ["Connectivity", "eSIM with 4G, Bluetooth, GPS"],
            ["IoT sensors", "Accelerometer, gyroscope, torque sensor"],
            ["App", "iOS & Android"],
            ["Connect Service", "1 year included*"]
          ]
        },
        {
          title: 'Power',
          parameters: [
            ["Motor", "Customized rear hub, 36 V 250 W (rated), 45 N⋅m"],
            ["Speed modes", "Pedal, Eco, Comfort, Sport, Turbo"],
            ["Top speed (assisted)", "25 km/h"],
            ["Range", "Up to 130 km"],
            ["Removable battery", "36V 9.8Ah, Samsung Li-ion, 2.5-hr quick charge, certified to UL-2271"]
          ]
        },
        {
          title: 'General',
          parameters: [
            ["Weight", "17kg excl. accessories"],
            ["Load-bearing capacity", "Max. 110 kg."],
            ["Sizes", "Medium, Large (see Size Guide)"],
            ["Body material", "Carbon fiber (frame, fork)"],
            ["Brakes", "Front & rear dual-piston hydraulic disc"],
            ["Transmission", "Shimano CUES U6000 1 x 10 Speed"],
            ["Lights", "Front: Integrated StVZO headlight<br>Rear: StVZO Rear Light (Not ARES Lights)"],
            ["Wheels", "700C (ISO 622 mm BSD), inner rim 19 mm"],
            ["Tires", "700 x 40C"],
            ["Included Accessories", "Kickstand, Fenders<br>StVZO Rear Light (Not ARES Lights)"]
          ]
        },
      ]
    }
  },
  fusion_order_page_config: {
    // chord 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
    default_variant: 44758960210136,
    ignore_variants_available_false: [],
    size_map: {
      'One Size': 'Fit for 160cm-190cm'
    },
    product_media_images: [
      {
          text: 'Carbon Fiber Expert',
          img: "https://newurtopia.com/cdn/shop/files/logo_0707__1.png?v=1684310857"
      },
      {
          text: 'Lightest mid-drive eSUV',
          img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19446_2x_6b79974f-ad63-4300-8509-26515572c1dc.png?v=1726220917"
      },
      {
          text: 'Effortlessly conquers steep hills',
          img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19447_2x_60b10b4a-5ff7-4357-adc0-f31752890bd9.png?v=1726220922"
      },
      {
          text: 'First eBike with ChatGPT',
          img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19448_2x_668271f6-6ac8-4d8f-a29e-710638543268.png?v=1726220928"
      },
      {
          text: 'Excels off-road',
          img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19450_2x_ffca6459-4596-4e24-bc71-225c7efdefc7.png?v=1726220933"
      },
      {
          text: 'AI-Enhanced electric performance',
          img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19451_2x_aa6ca012-04b8-4b6c-a71f-9d6e748e58e7.png?v=1726220895"
      },
    ],
    product_images: {
      'Elegant Grey': [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20240914-100118.jpg?v=1726279298&width=1000',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19398_2x_2f9d7f41-0453-47fd-9945-85218577ba05.jpg?v=1726126593&width=1000',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19404_2x_c158f72e-fb31-4da4-8202-c80ea6eb9348.jpg?v=1726126604&width=1000',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF8066.jpg?v=1726126744',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/24613_2x_0da3a3e7-be41-432a-8b92-042ab9a805ca.jpg?v=1726127519',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_e7ed9f67-2e5e-4f9e-ab95-70c64e56ed61.jpg?v=1726127514',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_c511bbc0-00fb-47ea-85b5-ba0bbdd3d857.jpg?v=1726127507',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_1b49e807-7f18-433b-a754-d352a0154ac9.jpg?v=1726127500',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_2880e256-371a-4202-84f1-6c84d4bfbc23.jpg?v=1726127494',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20240924-164942.jpg?v=1727167799'
        ],
        'Blazing Black': [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20240914-100102.jpg?v=1726279297si&width=1000',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19398_2x_2f9d7f41-0453-47fd-9945-85218577ba05.jpg?v=172612659&width=1000',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19404_2x_c158f72e-fb31-4da4-8202-c80ea6eb9348.jpg?v=1726126604&width=1000',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF8066.jpg?v=1726126744',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/24397_2x_7575ba25-8f88-4d54-93b3-7c06f7ed6181.jpg?v=1726126832',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_c01dea8f-6eb4-43c5-a3ec-40339d924263.jpg?v=1726127019',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_367b9cdb-4e38-421e-9ebc-13f72d169e63.jpg?v=1726127025',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_b23227fc-e6e8-4550-8d50-a8c1c24a0fa2.jpg?v=1726127013',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_195b795e-d831-46a1-a56f-69bb13feffbb.jpg?v=1726127033',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20240924-164942.jpg?v=1727167799'
        ],
        'Vital Orange': [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18879.png?v=1713323995&width=1000',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19398_2x_2f9d7f41-0453-47fd-9945-85218577ba05.jpg?v=1726126593&width=1000',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/19404_2x_c158f72e-fb31-4da4-8202-c80ea6eb9348.jpg?v=1726126604&width=1000',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF8066.jpg?v=1726126744',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/24612_2x_75b439ef-1cdb-4974-823a-f984fb38d381.jpg?v=1726127267',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_d8f0e61f-9369-4efa-866b-db1fb1c8b9e6.jpg?v=1726127272',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_9d13e439-9a0d-4373-aa2a-da6347dcd412.jpg?v=1726127277',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_11082a95-04f4-4320-9d71-e1f2d030ae25.jpg?v=1726127255',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/2x_f7d5899a-829c-416f-b04d-7962897b9baf.jpg?v=1726127261',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20240924-164942.jpg?v=1727167799'
        ],
        commonSwiper: []
    },
    // 默认的发货时间 文案
    ebike_default_delivery_time: 'Delivery from 15.09.2024',
    // 每一种variant 的发货时间文案
    ebike_delivery_time: {},
    sizes_and_specs: {
      sizes: {
        image: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20240108-181634.png?v=1704709013',
        parameters: [
          [
            '<span style="color: #fff;">xxxx</span>',
            'Recomm. rider height',
            'A. Adjustable seat range',
            'B. Handlebar grips height',
            'C. Seat tube length',
            'D. Wheelbase',
            'E. Overall length',
            'F. Wheel diameter',
            'G. Top tube length (effective)',
            'H. Head tube length',
            'I. Headset height'
          ],
          [
            '<span style="color: #fff;">One Size</span>',
            '160-190 cm',
            '140 mm',
            '1085-1115 mm',
            '485 mm',
            '1205 mm',
            '1935 mm',
            '730 mm',
            '633 mm',
            '144 mm',
            '90-120 mm'
          ],
          // [
          //   '<span class="u17DemiBold_v2">Large</span>',
          //   '175-195 cm',
          //   '833 mm',
          //   '60 mm',
          //   '1023-1053 mm',
          //   '498 mm',
          //   '1122 mm',
          //   '1824 mm',
          //   '702 mm',
          //   '653 mm',
          //   '180 mm',
          //   '90-120 mm'
          // ]
        ]
      },
      specs: [
        {
          title: 'Smart',
          parameters: [
            ["Smartbar features", "Voice control, fingerprint start, LED dot - matrix display, haptic interaction, bluetooth music, built-in navigation, OTA upgrade"],
            ["Connectivity", "eSIM with 4G, Bluetooth, GPS"],
            ["IoT sensors", "Accelerometer, gyroscope, torque sensor"],
            ["App", "iOS & Android"],
            ["Connect Service", "1 year included*"]
          ]
        },
        {
          title: 'Power',
          parameters: [
            ["Motor", "Mid-Drive Motor (Bafang), 36V 250W, 80Nm"],
            ["Speed modes", "Pedal, Eco, Comfort, Sport"],
            ["Top speed (assisted)", "25 km/h"],
            ["Range", "Up to 140 km <br>Extended to 240 km(Dual baterry)"],
            ["Removable battery", "529.2 Wh, 21700 Samsung Li-ion"]
          ]
        },
        {
          title: 'General',
          parameters: [
            ["Weight", "From 23 kg"],
            ["Payload capacity", "Max. 150 kg"],
            ["Sizes", "One size, suitable for 160-190 cm"],
            ["Body material", "Carbon fiber (frame)"],
            ["Fork", "SR Suntour suspension fork with 100 mm travel"],
            ["Seat Post", "Aluminum seat post"],
            ["Transmission", "Shimano CUES U6000 1X10 Speed"],
            ["Drivetrain", "KMC e10 Turbo"],
            ["Brakes", "TEKTRO dual-piston hydraulic disc brakes (HD-M280)"],
            ["Lights", "Front: Integrated StVZO headlight<br>Rear: StVZO Rear Light (Not ARES Lights)"],
            ["Wheels", "28 Inch"],
            ["Tires", "Schwalbe Big Apple 55-622(28X2.15)"],
            ["Included Accessories", "Kickstand, Fenders<br>StVZO Rear Light (Not ARES Lights)"]
          ]
        },
      ]
    }
  }
}