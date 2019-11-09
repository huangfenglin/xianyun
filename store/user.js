// 用户管理
export const state = () => ({
  // 采用接口返回的数据结构
  userInfo: {
      token: "",
      user: {},
  },
}) 

// mutations是用于同步修改state的数据
export const mutations = {
  // getUserInfo是用来修改state.userInfo的值，函数名可以修改的
  // 参数state是必须要添加的，可以通过state修改数据
  setUserInfo(state, data){
      state.userInfo = data;
  }
}
