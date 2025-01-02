import mqttInit from '../../utils/sub'
import { isLogin } from '../../utils/util'
import { request } from '../../utils/request'
Page({
  data: {
    temp: 0,
    humi: 0,
    lux: 0,
    mq2: 0,
    uuid: undefined,
    isAlarm: false,
    mqttInstance: null,
    id: undefined,
    deviceDetail: {},
    alarmList: []
  },
  onLoad(options) {
    const mqttInstance = mqttInit({
      callback: this.message
    })
    this.setData({
      uuid: options.uuid,
      id: options.id,
      mqttInstance
    })
  },
  onShow() {
    isLogin()
    this.handleGetDeviceDetail()
    this.handleGetAlarmList()
  },
  message(topic, data) {
    if (topic === '/device/set' && data.uuid == this.data.uuid) {
      this.setData({
        temp: data.temp,
        humi: data.humi,
        lux: data.lux,
        mq2: data.mq2
      })
    }
  },
  handleGetDeviceDetail() {
    request(`/deviceDetail/${this.data.id}`, 'GET', {}).then(res => {
      if (res.code === 200) {
        res.data.falseAlarmRate = Math.round(res.data.falseAlarmRate * 100)
        this.setData({
          deviceDetail: res.data
        })
      }
    })
  },
  handleGetAlarmList() {
    request('/alarmRecord', 'GET', {
      status: 0,
      uuid: this.data.uuid
    }).then(res => {
      if (res.code === 200) {
        this.setData({
          isAlarm: !!res.data.length,
          alarmList: res.data
        })
      }
    })
  },
  onHide() {
    console.log(1111);
    this.data.mqttInstance.end()
  },
  onUnload() {
    console.log(222);
    this.data.mqttInstance.end()
  },
  onGo() {
    wx.navigateTo({
      url: `/pages/handlingAlarm/handlingAlarm?id=${this.data.alarmList[0].id}`
    })
  }
})