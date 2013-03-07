$(document).ready(function() {
    var element = $(".photos-grid").photosGrid({
        url: "example-data/images.json",
        totalWidth: 600
    });

    $(window).resize(function() {
        element.data("photosGrid").renderGrid();
    });
});