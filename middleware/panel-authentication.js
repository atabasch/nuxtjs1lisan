export default function(context){
  let isLogin = context.store.getters["panel/getAdmin"];
  if(!isLogin){
    return context.redirect('/panel/login')
  }
}
