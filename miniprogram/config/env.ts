
const { miniProgram: { envVersion } } = wx.getAccountInfoSync()

let IP = ''
if (envVersion === 'release') { // 正式版
  IP = 'http://121.199.13.81:3000' 
} else if (envVersion === 'trial') { // 	体验版
  IP = 'http://121.199.13.81:3000'
} else { // 开发版
  IP = 'http://121.199.13.81:3000'
}

export {
  IP,
  envVersion
}