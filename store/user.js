// 用户管理
export const state = () => {
  // 采用接口返回的数据结构
  return {
    userInfo: {
      token: "",
      user: {},
    },
  }
}

// mutations是用于同步修改state的数据
export const mutations = {
  // getUserInfo是用来修改state.userInfo的值，函数名可以修改的
  // 参数state是必须要添加的，可以通过state修改数据
  setUserInfo(state, data) {
    state.userInfo = data;
  }
}

export const actions = {
  // actions 的 第一个函数参数是store对象，store这个参数是必须的，、
  // 第二个是传入的参数
  login(store, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "POST",
      data,
    }).then(res => {
      // 调用mutations下的方法修改userInfo,调用时候传入res.data
      // store.commit("user/setUserInfo", res.data);
      // 调用当前模块下的mutations是不需要加上模块名字的
      store.commit("setUserInfo", res.data)
    })
  },

  sendCaptcha(store, tel) {
    return this.$axios({
      url: "/captchas",
      method: "POST",
      data: {
        tel
      }
    }).then(res => {
      const {data} = res.datra;
      return code;
    })
  }

}
