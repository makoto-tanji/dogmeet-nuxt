export const state = () => ({
  areaList: []
})

export const mutations = {
  add(state, {id, areaName}) {
    state.areaList.push({
      id: id,
      areaName: areaName,
    })
  },
  remove(state) {
    state.areaList = [];
  }
}