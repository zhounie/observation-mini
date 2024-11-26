import mqttInit from '../../utils/sub'
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

  message(topic, data) {
    console.log(topic, data);
    this.setData({
      temp: data.temp,
      humi: data.humi,
      lux: data.lux
    })
  }
})