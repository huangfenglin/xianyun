export default (nuxt) => {
  // axios每次请求结果返回是错误（状态码是400、 401、403），就会触发onError拦截器
  nuxt.$axios.onError()
}