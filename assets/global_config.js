const global_config = {
  // 活动产品id
  event_bike_product_id: '7633738727640',
  // 活动送配件 variant_id
  event_accessories_variant_ids: ['43817744793816', '43745263255768', '43745261748440'],

  // 是否是手机
  is_mobile: document.documentElement.clientWidth < 768,

  // 是否隐藏 message 弹窗
  message_box_is_hide: true,
  // 右下角message弹窗 延迟弹出时间，单位:s
  message_box_show_delay_time: 10,


  // 是否隐藏 邮件弹窗
  subscribe_email_is_hide: false,
  // 邮件弹窗 延迟弹出时间，单位:s
  subscribe_email_show_delay_time: 10,

  // 发货时间映射表  key: vairant_id  -> value: 发货时间文案
  ebike_delivery_time: {
    // outlet carbon 1
    43820311281880: 'Ships within <span>7 business days</span> from local warehouse.',
    43820311314648: 'Ships within <span>7 business days</span> from local warehouse.',

    // carbon 1/1s
    // 1-m-sb
    43705718997208: 'Free shipping within 5 days',
    // 1-l-sb
    42615025369304: 'Free shipping within 5 days',
    // 1-m-lb
    42615025238232: 'Ships between August 1 - 15 from local warehouse.',
    // 1-l-lb
    42615025434840: 'Free shipping within 5 days',
    // 1-m-pb
    42615025303768: 'Ships between August 1 - 15 from local warehouse.',
    // 1-l-pb
    42615025500376: 'Free shipping within 5 days',
    // 1-m-pw
    43608364417240: ' ',
    // 1-l-pw
    43608364450008: ' ',
    // 1s-m-sb
    43869302816984: 'Pre-order items ships from July 31, 2023',
    // 1s-l-sb
    43869302849752: 'Pre-order items ships from July 31, 2023',
    // 1s-m-lb
    43869302882520: 'Pre-order items ships from July 31, 2023',
    // 1s-l-lb
    43869302915288: 'Pre-order items ships from July 31, 2023',
    // 1s-m-pb
    43869302948056: 'Pre-order items ships from July 31, 2023',
    // 1s-l-pb
    43869302980824: 'Pre-order items ships from July 31, 2023',
  },
  carbon_order_page_config: {
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
    ebike_delivery_time: {
      // outlet carbon 1
      43820311281880: 'Ships within <span>7 business days</span> from local warehouse.',
      43820311314648: 'Ships within <span>7 business days</span> from local warehouse.',

      // carbon 1/1s
      // 1-m-sb
      43705718997208: 'Free shipping within 5 days',
      // 1-l-sb
      42615025369304: 'Free shipping within 5 days',
      // 1-m-lb
      42615025238232: 'Ships between August 1 - 15 from local warehouse.',
      // 1-l-lb
      42615025434840: 'Free shipping within 5 days',
      // 1-m-pb
      42615025303768: 'Ships between August 1 - 15 from local warehouse.',
      // 1-l-pb
      42615025500376: 'Free shipping within 5 days',
      // 1-m-pw
      43608364417240: ' ',
      // 1-l-pw
      43608364450008: ' ',
      // 1s-m-sb
      43869302816984: 'Pre-order items ships from July 31, 2023',
      // 1s-l-sb
      43869302849752: 'Pre-order items ships from July 31, 2023',
      // 1s-m-lb
      43869302882520: 'Pre-order items ships from July 31, 2023',
      // 1s-l-lb
      43869302915288: 'Pre-order items ships from July 31, 2023',
      // 1s-m-pb
      43869302948056: 'Pre-order items ships from July 31, 2023',
      // 1s-l-pb
      43869302980824: 'Pre-order items ships from July 31, 2023',
    },
  },
  // chrod order page 配置项
  chord_order_page_config: {
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