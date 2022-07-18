export const state = () => ({
  colorList: []
})

export const mutations = {
  add(state, { id, color }) {
    state.colorList.push({
      id: id,
      color: color
    })
  },
  remove(state) {
    state.colorList = []
  }
}