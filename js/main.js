$(document).ready(function() {
    var element = $(".photos-grid").photosGrid({
        url: "example-data/images.json",
        data_width: "width",
        data_height: "height",
        data_url: "url",
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
    });
});