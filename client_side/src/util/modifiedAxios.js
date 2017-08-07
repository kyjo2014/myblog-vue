import axios from 'axios'

const $http = axios.create({
  baseURL: 'http://localhost:3000/',
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
    }
    return res
  }, (err) => {
    console.log(err)
  })

export default $http
