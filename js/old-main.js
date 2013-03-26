$(document).ready(function() {
    var lastExample = null;
    function destroyLastExample() {
        if (lastExample) {
            lastExample.data('photosGrid').destroy();
        }
    }

    $('#example-1-tab').click(function (e) {
        e.preventDefault();

        destroyLastExample();

        lastExample = $('.photos-grid-example-1').photosGrid({
            url: 'example-data/images.json',
            data_width: 'width',
            data_height: 'height',
            data_url: 'url',
            mode: 'decrease',
            margin: 3,
            handleWindowResize: true
        });

        $(this).tab('show');
    }).click();

    $('#example-2-tab').click(function (e) {
        e.preventDefault();

        destroyLastExample();

        lastExample = $('.photos-grid-example-2').photosGrid({
            url: 'example-data/images.json',
            data_width: 'width',
            data_height: 'height',
            data_url: 'url',
            mode: 'increase',
            margin: 10,
            handleWindowResize: true
        });

        $(this).tab('show');
    });





    /*var element = $(".photos-grid").photosGrid({
        url: "example-data/images.json",
        data_width: "width",
        data_height: "height",
        data_url: "url",
        //data_href: "url",
        fitWidthLastRow: false,
        mode: "increase",
        margin: 10,
        maxWidth: 600,
        handleWindowResize: true,
        photoClickCallback: function(photo) {
            console.log("From callback", photo);
        }
    });

    element.bind("photo-click", function(photo) {
        console.log("From event", photo);
    });*/
});