export default ({$axios,redirect}) => {
  // axios每次请求结果返回是错误（状态码是400、 401、403），就会触发onError拦截器
  $axios.onError(res => {
    const {statusCode,message} = res.response.data;
    if(statusCode === 400) {
      Message.error(message);
    }
    if([403, 401].indexOf(statusCode) > -1 ) {
      Message.error("请先登录");
      // 跳转到登录页
      redirect("/user/login");
    }
  })
}