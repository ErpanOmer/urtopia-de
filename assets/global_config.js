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
    subscribe_email_show_delay_time: 30,

    // 发货时间映射表  key: vairant_id  -> value: 发货时间文案
    ebike_delivery_time: {
        // outlet carbon 1
        43820311281880: 'Ships within <span>7 business days</span> from local warehouse.',
        43820311314648: 'Ships within <span>7 business days</span> from local warehouse.'

        // carbon 1
        // chord
        // chord x
    }
}