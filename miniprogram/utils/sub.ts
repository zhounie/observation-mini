import mqtt from "mqtt";

const mqttInit = (options) => {
  const client = mqtt.connect("mqtt://192.168.31.14:8888", {
    username: "user",
    password: "123456",
    protocol: 'mqtt',
    clientId: 'wxmini',
    protocolId: 'MQTT',
    protocolVersion: 3
  });
  
  client.on("connect", function () {
    console.log("服务器连接成功");
    console.log(client.options.clientId);
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