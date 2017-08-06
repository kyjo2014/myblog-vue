import axios from 'axios'

const $http = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Authorization: 'Barear ' + window.localStorage.getItem('jwt')
  }
})

export default $http
