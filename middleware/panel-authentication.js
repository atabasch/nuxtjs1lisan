export default function(context){
  let isLogin = context.store.getters["panel/getAdmin"];
  if(!isLogin && !process.env.ALLOW_GUEST_FOR_DEV){
    return context.redirect('/panel/login')
  }
}
