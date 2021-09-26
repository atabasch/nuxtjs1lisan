/*
class="searchApp"

<input type="text" class="form-control form-control-sm" v-model="wanted" placeholder="Listede ara">

v-show="'content'.indexOf(wanted)>=0"
*/
const vueSearchApp = new Vue({
    el: '.searchApp',
    data: { wanted: '', wantedLower: '' },
    watch: { wanted: (value) => { vueSearchApp.wantedLower = value.toLowerCase(); } }
});
