// Custom.js
$('a[href="#"]').click(function(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
});

$('.summernote').summernote({ tabsize: 2, height: 500, lang: 'tr-TR' });

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


function getSeflink(val){
    return getSlug(val, {
        lang:'tr',
        symbols: false,
        custom: {
            '&': 've'
        }
    });
}

$('input[data-seflink]').on('keyup', function(){
    let val = getSeflink($(this).val());
    let dataName = $(this).data('seflink');
    $('input[name='+dataName+']').val(val);
});
$('input.seflink').on('change', function(){
    let val = getSeflink($(this).val());
    $(this).val(val);
});




function copy2Clipboard(txt){
    const el = document.createElement('textarea');
    el.value = txt;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}



$('input[data-valtotarget]').on('change paste keyup input', function(){
    let items = $(this).data('valtotarget').split('-');
    let value = $(this).val();
    console.log(value);
    $(items[0]).attr(items[1], value);

});


function setDefaultValue(target){
    let img = $('img[data-take='+target+']');
    let input = $('input[data-take='+target+']');
    img.attr('src', img.data('default'));
    input.val(input.data('default'));
}


// AJAX İLE RESİM UPLOAD İŞLEMLERİ
function ajaxUploader(files){
    return new Promise((resolve, reject) => {
        if(files.length < 1){
            reject(false);
        }else{
            let formData = new FormData();
            formData.append('file', files[0]);
            $.ajax({
                url:'/admin/media/ajax/upload',
                type:'POST',
                data: formData,
                dataType:'json',
                processData: false,
                contentType: false,
            }).done(response => {
                if(response.error){
                    reject(response);
                }else{
                    resolve(response);
                }
            });
        }
    });//Promise
}//ajaxUploader


$('input.ajaxUploader').on('change', function(){
    let target = $(this).data('target');
    ajaxUploader($(this)[0].files)
    .then(result => {
        console.log();
        $('input[data-take='+target+']').val(result.media_file)
        $('img[data-take='+target+']').attr('src', '/uploads/'+result.media_file);
    })
    .catch(response => {
        console.log(response);
    });
});
// KULLANIM
/*
<input ... class="ajaxUploader" data-target="take_name"/>
<img   ... data-take="take_name" />
<input ... data-take="take_name" />
*/
