require.config({
    baseUrl: "js/plugin/",
    paths: {
    }
});

define([
    'photos-grid'
], function(PhotosGrid) {
    jQuery.fn.photosGrid = function(options) {
        var photosGrid = new PhotosGrid(this, options);
        this.data('photosGrid', photosGrid);
        return this;
    };

    return jQuery;
});