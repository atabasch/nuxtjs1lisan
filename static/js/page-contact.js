const contactApp = new Vue({
    el: '#contactApp',
    data: {
        title: null,
        name: null,
        email: '',
        phone: '',
        type: 'question',
        content: '',
        showSuccess: false,
        showError: false
    },
    methods: {
        resetForm: function(){
            this.title = null;
            this.name = null;
            this.email = '';
            this.phone = '';
            this.type = 'question';
            this.content = '';
        },

        hideAlerts: function(){
            setTimeout(function(){
                contactApp.showSuccess = false;
                contactApp.showError = false;
            }, 3000);
        },

        send: function(event){
            if(!this.title || !this.name ){

            }else{
                let datas = {
                    title: this.title,
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    type: this.type,
                    content: this.content
                }

                $.ajax({
                    url :'/iletisim',
                    type: 'POST',
                    data: datas,
                    dataType: 'json'
                }).done(response => {
                    if(response.status){
                        this.resetForm()
                        contactApp.showSuccess = true;
                    }else{
                        contactApp.showError = true;
                    }
                    this.hideAlerts();
                })
            }//else
        },//send




    }//methods
});
