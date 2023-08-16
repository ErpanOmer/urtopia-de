const global_config = {
  // 默认活动产品id
  event_bike_product_id: '7633738727640',
  // 活动送配件 variant_id
  event_accessories_variant_ids: ['43745263255768', '43745261748440'],

  // 是否是手机
  is_mobile: document.documentElement.clientWidth < 768,
  // 是否是 pc
  is_pc: !!!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),

  // 是否隐藏 message 弹窗
  message_box_is_hide: true,
  // 右下角message弹窗 延迟弹出时间，单位:s
  message_box_show_delay_time: 10,

  // leasing 有关配置
  leasing: {
    // 需要禁用的jobrad 配件
    jobrad_disabled_accessories: ['7633738694872', '7633738629336'],
  },
  // test ride 弹窗
    test_ride_dialog_config: {
        // 是否隐藏
        is_hide: false,
        // 延迟弹出时间，单位:s
        show_delay_time: 15,
        // pc 背景图
        background_imgae: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230609-untitled-9762.jpg?v=1691048775'
    },


  // 邮件弹窗有关配置
  subscribe_email_dialog_config: {
    // 是否隐藏 邮件弹窗
    is_hide: false,
    // 邮件弹窗 延迟弹出时间，单位:s
    show_delay_time: 10,
    // 邮件 pc 背景图
    background_imgae_pc: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20220619-untitled-0871_2x_e63191d7-5f9d-4404-b894-f4b28129f24b.jpg?v=1690854939',
    // 邮件 mobile 背景图
    background_imgae_mb: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20220619-untitled-0871_2x_91cbff9f-2300-461f-8787-99af11d73d76.jpg?v=1690854946'
  },

  // carbon 车配置
  carbon_order_page_config: {
    // carbon车 活动相关
    events: {
      carbon1_send_accessories_variant_ids: ['43745263255768', '43745261748440', '43922338054360'],
      carbon1s_send_accessories_variant_ids: ['43866498891992', '43871557779672', '43922338414808'],
    },
    // carbon 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
    default_variant: 42615025172696,
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
        vanilla: [
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
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18700.png?v=1688113259'
        ],
        "Midnight in Paris": [
          "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18701.png?v=1688113259"
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
        text: `“Best Electric Bike for 2022”`,
        img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/CNET-Logo_2x_585b6404-bc14-4a34-af64-299587c59efd.png?v=1687187217"
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
      43705718997208: 'Free shipping within 5 working days',
      // 1-l-sb
      42615025369304: 'Free shipping within 5 working days',
      // 1-m-lb
      42615025238232: 'Free shipping within 5 working days',
      // 1-l-lb
      42615025434840: 'Free shipping within 5 working days',
      // 1-m-pb
      42615025303768: 'Free shipping within 5 working days',
      // 1-l-pb
      42615025500376: 'Free shipping within 5 working days',
      // 1-m-pw
      43608364417240: ' ',
      // 1-l-pw
      43608364450008: ' ',
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
    default_variant: 43705718997208,
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
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772.png?v=1689237082'
        ],
        commonSwiper: [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145020_4c046e1d-5af9-48af-a786-4b35087a5a87.png?v=1689236898',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_-1.png?v=1689236897',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF-1.png?v=1689236898'
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
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772.png?v=1689237082'
        ],
        commonSwiper: [
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145020_4c046e1d-5af9-48af-a786-4b35087a5a87.png?v=1689236898',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_-1.png?v=1689236897',
          'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF-1.png?v=1689236898'
        ]
      }
    },
    // 默认的发货时间 文案
    ebike_default_delivery_time: 'Free shipping <span>within 5 days</span>',
    // 每一种variant 的发货时间文案
    ebike_delivery_time: {

      // chord
      43705718997208: 'Pre-order items shipped from September 1 - 15, 2023',
      43705719029976: 'Pre-order items shipped from September 1 - 15, 2023',
      // chord x
      43705719062744: 'Pre-order items shipped from September 1 - 15, 2023',
      43705719095512: 'Pre-order items shipped from September 1 - 15, 2023',
    }
  }
}