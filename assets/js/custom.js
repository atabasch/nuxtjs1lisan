// Custom.js
$('a[href="#"]').click(function(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
});


function deleteSweet(pTitle, pId, pUrl){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success mr-2',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Emin misiniz?',
        text: `"${pTitle}" silinecek!. Bu işlemi yapmak istediğinizden emin misiz? İşlem bir daha geri alınamaz.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Evet, Eminin!',
        cancelButtonText: 'Hayır, Vazgeç!',
        //reverseButtons: true
    })
    .then((result) => {
        if(result.value){
            $.ajax({
                url:pUrl,
                method:'POST',
                data:{id:pId},
                dataType:'json',
            }).done(response => {
                swalWithBootstrapButtons.fire({
                        title:response.title,
                        text:response.message,
                        icon:response.status,
                        confirmButtonText:'Tamam'
                });
                $('tr#item-tr-'+response.id).remove();
            });
        } else{}
    });

}//deleteSweet
