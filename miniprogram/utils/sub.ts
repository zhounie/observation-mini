import mqtt from './mqtt.min.js'

const mqttInit = (options) => {
  const client = mqtt.connect("wx://121.199.13.81:8888", {
    username: "user",
    password: "123456",
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000, 
    clientId: 'wxmini'
  });
  
  client.on("connect", function () {
    console.log("服务器连接成功");
    client.subscribe("/device/set", { qos: 1 });
  });
  
  client.on("message", function (topic, message) {
    console.log("当前topic:", topic);
    options.callback(topic, JSON.parse(message.toString()))
  });
  
  client.on("error", function (error) {
    console.log(error);
  });
  
  client.on("disconnect", function (packet) {
    console.log('连接断开');
  });
}

const handleGetDeviceList = () => {

}
export default mqttInit;