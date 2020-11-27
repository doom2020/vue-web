import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    name: 'zhu'
  },
  mutations: {
    add(state,paylod){
      state.count += paylod
    },
    update(state, paylod){
      state.name += paylod
    }
  },
  actions: {
  },
  modules: {
  }
})
