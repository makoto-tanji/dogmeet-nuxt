export const state = () => ({
  breedList: []
})

export const mutations = {
  add(state, {id, breedName, size}) {
    state.breedList.push({
      id: id,
      breedName: breedName,
      size: size
    })
  },
  remove(state) {
    state.breedList = [];
  }
}