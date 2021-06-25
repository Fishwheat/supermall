import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  //2.axios的拦截器
  //2.1请求拦截
  instance.interceptors.request.use(config => {
    // console.log(config);

    return config//拦截后要及时返回出去
  }, err => {
    console.log(err);
  })

  //2.2axios响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res
  }, err => {
    console.log(err);
  })

  //3.发送真正的网络请求
  return instance(config)
}

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })

//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

// export function request(config, success, failure) {
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })

//   instance(config)
//     .then(value => {
//       success(value)
//     })
//     .catch(err => {
//       failure(err)
//     })
// }