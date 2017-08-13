import axios from 'axios'

let baseURL = ''

if (process.env.NODE_ENV !== 'production') {
  baseURL= 'http://localhost:3000/'
} else {
  baseURL= 'http://kyjocode.cn:19000/' 
}

const $http = axios.create({
  baseURL,
  headers: {
    Authorization: 'Bearer ' + window
      .localStorage
      .getItem('jwt')
  }
})

$http
  .interceptors
  .response
  .use((res) => {
    if (res.code == '403' || res.code == '401') {
      alert('请登录')
    } else if (res.data.code != '200') {
      alert(res.data.message)
    }
    return res
  }, (err) => {
    console.log(err)
  })

export default $http
