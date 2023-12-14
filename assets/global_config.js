const global_config = {
  // 默认活动产品id
  event_bike_product_id: '7633738727640',
  // 默认活动送配件 variant_id
  event_accessories_variant_ids: ['43788921241816', '43745261748440'],

  // 是否是手机
  is_mobile: document.documentElement.clientWidth < 768,
  // 是否是 pc
  is_pc: !!!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
  // leasing 有关配置
  leasing: {
    // 需要禁用的jobrad 配件
    jobrad_disabled_accessories: ['7633738694872', '7633738629336', '7974077038808', "7633738629336", "8034307703000"],
    ebike_delivery_time: {
      'carbon1': 'Free shipping within <span>5 working days</span>',
      'carbon1s': 'Free shipping within <span>5 working days</span>',
      'chord': 'Free shipping within <span>10 working days</span>',
      'chordx': 'Free shipping within <span>10 working days</span>',
    },
    available_urtopia_ebike_default: 'carbon1'
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
    default_variant: 43869302816984,
    ignore_variants_available_false: [],
    size_map: {
      M: 'Fit for 165-180 cm',
      L: 'Fit for 175-195 cm'
    },
    // 产品系列图
    product_images: {
      "Carbon Belt": {
        Sirius: [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18687.png?v=1688112408",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18686.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18685.png?v=1688112407"
        ],
        Lyra: [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18525.png?v=1688112407'
        ],
        "Midnight in Paris": [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18526.png?v=1688112407"
        ],
        Vanilla: [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18699.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18698.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18697.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18695.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18696.png?v=1688112407"
        ],
        commonSwiper: [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18693.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18692.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18691.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18690.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18689.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18688.png?v=1688112407",
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/ssss_6e9b22f2-3d7e-4f41-82b7-dd7b575dea98.png?v=1688112407"
        ]
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
        text: `“The AI-powered co-pilot adds a new level<br>of intelligence and interactivity”`,
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
      // outlet carbon 1
      43820311281880: 'Ships within <span>7 business days</span> from local warehouse.',
      43820311314648: 'Ships within <span>7 business days</span> from local warehouse.',

      // carbon 1/1s
      // 1-m-sb
      42615025172696: 'Free shipping within 10 working days',
      // 1-l-sb
      42615025369304: 'Free shipping within 5 working days',
      // 1-m-lb
      42615025238232: 'Free shipping within 10 working days',
      // 1-l-lb
      42615025434840: 'Free shipping within 5 working days',
      // 1-m-pb
      42615025303768: 'Free shipping within 5 working days',
      // 1-l-pb
      42615025500376: 'Free shipping within 5 working days',
      // 1-m-pw
      43608364417240: 'Free shipping within 5 working days',
      // 1-l-pw
      43608364450008: 'Free shipping within 5 working days',
      // 1s-m-sb
      43869302816984: 'Free shipping within 5 working days',
      // 1s-l-sb
      43869302849752: 'Free shipping within 5 working days',
      // 1s-m-lb
      43869302882520: 'Free shipping within 5 working days',
      // 1s-l-lb
      43869302915288: 'Free shipping within 5 working days',
      // 1s-m-pb
      43869302948056: 'Free shipping within 5 working days',
      // 1s-l-pb
      43869302980824: 'Free shipping within 5 working days',
    },
  },
  // chrod order page 配置项
  chord_order_page_config: {
    // chord 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
    default_variant: 43705719062744,
    ignore_variants_available_false: [],
    size_map: {
      'High-Step': 'Fit for 170-195 cm',
      'Step-Through': 'Fit for 160-185 cm'
    },
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
      43950919090392:'Free shipping within 10 working days',
      //black
      43950919123160:'Free shipping within 10 working days',

        
      // chord
      43705718997208: 'Free shipping within 5 working days',
      43705719029976: 'Free shipping within 5 working days',
      // chord x
      43705719062744: 'Free shipping within 5 working days',
      43988553859288: 'Free shipping within 5 working days',
      //43988553859288: 'Ships between November 15-30, 2023',
    }
  }
}