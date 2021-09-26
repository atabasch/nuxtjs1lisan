'use strict' // ES6 KURALLARI

var modalStatus = false;        // MODAL AÇIK KAPALI KONTROLÜ
var selectedImage = null;       // Seçilen görsel verilerini alacak
var popup = $('#modalGallery'); // Açılan popup nesnesi.

// Popup açacak butona tıklandığında
$('[data-target="#modalGallery"]').on('click', function(){

    if(modalStatus){
        mgResetData();
    }else{
        modalStatus = true;
        $('#mediaGalleryRow').html('');
        $.ajax({
            method: 'GET',
            url:'/admin/media/items/image',
            dataType: 'json',
        }).done((response) => {
            if(!response.status){

            }else{
                response.results.forEach((item, index) => {
                    let htmlObj = getItemObject(item);
                    $('#mediaGalleryRow').prepend(htmlObj);
                });
            }
        });
    }
})
//$('.aswModal').modal();


// İTEM OBJESİNİ OLUŞTURAN FONKSİYON
function getItemObject(item, aClassName=''){
    return `<div class="col-md-2 mediaPopupItem">
        <a  class="scaleto scale-4x3 ${aClassName}"
            style="background-image: url('/uploads/${item.media_file}')"
            onclick='mgSetSelected(this)'
            data-value='${JSON.stringify(item)}'
            ondblclick="mgSelectImage()" >
        </a>
        </div>`
}


// 1 kez tıklanan görseli seçili olarak işaretlemek
function mgSetSelected(item){
    let obj = $(item);
    let data = obj.data('value');

    if(selectedImage==null){
        $('#modalGallerySelectButton').removeAttr('disabled');
    }
    selectedImage = {obj, data}
    $('#mediaGalleryRow a').removeClass('active');
    obj.addClass('active');
    mgFillDetail(data);
}

// Görseli seçmek
function mgSelectImage(){
    let url = '/uploads/'+selectedImage.data.media_file;
    // Aşağıdaki kodlar ile data-take="img_url" etiketine sahip nesnelere bilgi gönderiliyor.
    $('input[data-take=img_url]').val(selectedImage.data.media_file);
    $('img[data-take=img_url]').attr('src', url);
    popup.modal('hide');
}

// Seçilmiş resim bilgilerini sağ kolonda göster
function mgFillDetail(data){
    $('#mediaGalleryDetail #mgsdImg').attr('src', '/uploads/'+data.media_file);
    $('#mediaGalleryDetail #mgsdId').val(data.media_id);
    $('#mediaGalleryDetail #mgsdTitle').val(data.media_title);
    $('#mediaGalleryDetail #mgsdDescription').val(data.media_description);
    $('#mediaGalleryDetail #mgsdTags').val(data.media_tags);
}

// Bilgileri sıfırlar
function mgResetData(){
    modalStatus = false;
    selectedImage = null;
    $('#mediaGalleryDetail input, #mediaGalleryDetail textarea').val('');
    $('#mediaGalleryDetail #mgsdImg').attr('src', '');
    $('#modalGallerySelectButton').attr('disabled', '')
}

// Modal kapatılırken bilgileri sıfırlat
$('#modalGalleryCloseButton, #modalGalleryCloseButtonX').on('click', function(){
    mgResetData();
})


// "Bilgisayardan Yükle" butonu ile görsel seçilince yapılacak işlemleri.
$('input#mediaPopupFile').on('change', function(){
    let obj = $(this);
    let formData = new FormData();
    formData.append( 'file', obj[0].files[0] );

    $.ajax({
        url:'/admin/media/ajax/upload',
        type:'POST',
        data: formData,
        dataType:'json',
        processData: false,
        contentType: false,
    }).done(response => {
        if(response.error){

        }else{
            let htmlObject = getItemObject(response, 'active');
            $('#mediaGalleryRow').prepend(htmlObject);
            $('a', htmlObject).trigger('click');
            $('input#mediaPopupFile').val('');
        }
    });

});
