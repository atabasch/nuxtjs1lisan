export const state = ()=>({
    items: []
}); // state

export const getters = {

  getItems(state){
    return state.items;
  }, //getItems

} //getters

export const mutations = {

  setItems(state, datas){
    state.items = datas;
  }, // setItems

} // mutations

export const actions = {

  async fillItems(context, data){
    return this.$axios.post(data.url)
      .then(response =>{
        context.commit("setItems", response.data.items);
      });
  }, //fillItems

}
