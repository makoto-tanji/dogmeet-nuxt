export default ({ $axios, store }) => {

  // 公園データを取得してVuexで保存
  async function getArea() {
    try {
      const resData = await $axios.get(
        `${$axios.defaults.baseURL}api/area`
      );
      const areaList = resData.data.areaData;

      if (store.state.areas.areaList.length > 0) {
        store.commit('areas/remove')
      }
      for (let i = 0; i < areaList.length; i++){
        store.commit('areas/add', {
          id: areaList[i].id,
          areaName: areaList[i].area_name
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 犬種データを取得してVuexで保存
  async function getBreed() {
    try {
      const resData = await $axios.get(
        `${$axios.defaults.baseURL}api/breed`
      );
      const breedList = resData.data.breedData;
      if (store.state.breeds.breedList.length > 0) {
        store.commit('breeds/remove')
      }
      for (let i = 0; i < breedList.length; i++){
        store.commit('breeds/add', {
          id: breedList[i].id,
          breedName: breedList[i].breed_name,
          size: breedList[i].size
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  getArea();
  getBreed();
}