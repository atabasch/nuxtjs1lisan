import Swal from "sweetalert2";
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
  },
  admin: false
});

export const getters = {
  getContentHeader(state){ return state.contentHeader || state.defaultContentHeader; },
  getAdmin(state){ return state.admin; }
}

export const mutations = {
  setContentHeader(state, data) { state.contentHeader = {...state.defaultContentHeader, ...data}; },
  setAdmin(state, data){ state.admin = data; }
}


export const actions = {

  login(context, data){
    this.$axios.post("/panel/login", {user:data.user})
      .catch(error=>{  })
      .then(result=>{
        if(result.status==200 && result.data.user_id){
          context.commit("setAdmin", result.data);
          this.$router.push("/panel")
        }else{
          Swal.fire({
            toast: true,
            title: '"Kullanıcı girişi başarısız oldu."',
            icon: 'error',
            timer: 3000,
            position: 'top-end',
            showConfirmButton: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            },
            timerProgressBar: true,
          })
        }
      });
  }, //login

  logout(context, data){
    this.$axios.post("/panel/logout")
      .catch(error=>{  })
      .then(result=>{
        if(result.status==200){
          context.commit("setAdmin", result.data.user);
          this.$router.push("/panel/login")
        }
      })
  }, //logout

}
