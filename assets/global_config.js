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
        42615025238232: 'Free shipping within 5 days',
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
      
        // chord
        43705718997208: 'Pre-order items shipped from September 1 - 15, 2023',
        43705719029976: 'Pre-order items shipped from September 1 - 15, 2023',
        // chord x
        43705719062744: 'Pre-order items shipped from September 1 - 15, 2023',
        43705719095512: 'Pre-order items shipped from September 1 - 15, 2023',

      
    }
}