export const state = ()=>({
  contentHeader: null,
  defaultContentHeader: {
    title: "1 Lisan Yönetici Paneli",
    icon: 'fa fa-tachometer-alt',
    iconClass: 'bg-primary text-light',
    buttons: [
      {
        label: "Siteyi Önizle",
        href: '/',
        class: 'btn btn-info',
        icon: 'fas fa-eye',
        target: '_blank'
      }
    ]
  }
});

export const getters = {
  getContentHeader(state){ return state.contentHeader || state.defaultContentHeader; }
}

export const mutations = {
  setContentHeader(state, data) { state.contentHeader = {...state.defaultContentHeader, ...data}; }
}


export const actions = {

}
