import mqttInit from '../../utils/sub'
import { isLogin } from '../../utils/util'
Page({
  data: {
    temp: 0,
    humi: 0,
    lux: 0
  },
  onLoad() {
    mqttInit({
      callback: this.message
    })
  },
  onShow() {
    isLogin()
  },
  message(topic, data) {
    console.log(topic, data);
    this.setData({
      temp: data.temp,
      humi: data.humi,
      lux: data.lux
    })
  }
})