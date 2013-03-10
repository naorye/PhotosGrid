$(document).ready(function() {
    var element = $(".photos-grid").photosGrid({
        url: "example-data/images.json",
        fitWidthLastRow: false,
        mode: "increase",
        margin: 10,
        maxWidth: 600,
        handleWindowResize: true
    });
});