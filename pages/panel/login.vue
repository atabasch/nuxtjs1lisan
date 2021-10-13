<template>
  <div class="col-sm-6 col-md-5 col-lg-4 col-xl-3">
    <form @submit.prevent="doLogin">
      <div class="card bg-dark text-light">
        <div class="card-header"><strong>Giriş Yap</strong></div>
        <div class="card-body">

          <div class="alert alert-danger" v-if="loginError"><strong>Giriş denemesi başrısız oldu.</strong></div>

          <div class="form-group mb-2">
            <label><i class="fas fa-user"></i> Kullanıcı Adı veya E-posta</label>
            <input v-model="user.name" type="text" class="form-control form-control-sm" placeholder="Kullanıcı Adı / E-posta" required autofocus>
          </div>
          <div class="form-group mb-2">
            <label><i class="fas fa-key"></i> Şifre</label>
            <input v-model="user.pass" type="password" class="form-control form-control-sm" required placeholder="Şifre" >
          </div>
          <hr>
          <div class="form-group mb-0">
            <label for="remember_me"><input v-model="user.rememberMe" id="remember_me" type="checkbox"> Beni Hatırla</label>
          </div>
        </div>
        <div class="card-footer clearfix"><button type="submit" class="btn btn-primary btn-sm float-right">Giriş yap</button></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  layout: "login",
  data(){return {
    loginError: false,
    user: {
      name: null,
      pass: null,
      rememberMe: false
    }
  }}, //data


  methods: {

    doLogin: function(){

      if(this.user.name.length>2 && this.user.pass.length>5){
        this.$store.dispatch("panel/login", {user:this.user});
      }

    }, //doLogin

  }, //methods
}
</script>

<style scoped>

</style>
