$(document).ready(function() {

    function alertPhoto(photo, elem) {
        alert('Click on ' + photo.url);
    }

    function selectPhoto(photo, elem) {
        var borderLayer = elem.find('.border-layer');
        if (borderLayer.length > 0) {
            borderLayer.remove();
        } else {
            var anchor = elem.find('.photo-anchor');
            $('<div class="border-layer"></div>').appendTo(anchor);
        }
    }

    function matchOptions() {
        var mode = $('#mode-select').val();
        switch(mode) {
            case 'increase':
                $('#fitWidthLastRow-select').removeAttr('disabled');
                break;
            case 'decrease':
                $('#fitWidthLastRow-select').attr('disabled', 'disabled');
                break;
        }
    }

    function fetchOptions() {
        return {
            url: 'example-data/images.json',
            data_width: 'width',
            data_height: 'height',
            data_url: 'url',
            mode: $('#mode-select').val(),
            maxWidth: $('#maxWidth-slider-value').text(),
            margin: $('#margin-slider-value').text(),
            handleWindowResize: $('#handleWindowResize-select').val() === 'true',
            photoClickCallback: $('#photoClickCallback-select').val() === 'alert' ?
                alertPhoto : selectPhoto,
            fitWidthLastRow: $('#fitWidthLastRow-select').val() === 'true'
        };
    }

    $('#margin-slider').slider({
        range: false,
        min: 0,
        max: 30,
        value: 3,
        step: 1,
        slide: function(event, ui) {
            $('#margin-slider-value').text(ui.value);
        },
        change: function(event, ui) {
            $('#margin-slider').trigger('change');
        }
    });
    $('#margin-slider-value').text($('#margin-slider').slider('value'));

    $('#maxWidth-slider').slider({
        range: false,
        min: 100,
        max: $('.photos-grid').width(),
        value: $('.photos-grid').width(),
        step: 1,
        slide: function(event, ui) {
            $('#maxWidth-slider-value').text(ui.value);
        },
        change: function(event, ui) {
            $('#maxWidth-slider').trigger('change');
        }
    });
    $('#maxWidth-slider-value').text($('#maxWidth-slider').slider('value'));

    var resizeTimeoutId = null;
    $(window).resize(function() {
        if (resizeTimeoutId !== null) {
            clearTimeout(resizeTimeoutId);
        }
        resizeTimeoutId = setTimeout(function() {
            var maxWidth = $('.photos-grid-wrapper').width();
            $('#maxWidth-slider').slider('option', 'max', maxWidth);
            var currentValue = $('#maxWidth-slider').slider('value');
            $('#maxWidth-slider-value').text(currentValue);
            resizeTimeoutId = null;
        }, 200);
    });

    function renderGrid() {
        matchOptions();
        var elem = $('.photos-grid'),
            controller = elem.data('photosGrid'),
            options = fetchOptions();
        if (controller) {
             controller.setOptions(options);
        } else {
            elem.photosGrid(options);
        }
    }

    $([ '#mode-select',
        '#maxWidth-slider',
        '#margin-slider',
        '#handleWindowResize-select',
        '#photoClickCallback-select',
        '#fitWidthLastRow-select'
        ].join(', ')).change(renderGrid);

    renderGrid();

    $('.nav a').click(function() {
        $(this).parents('.nav').find('.active').removeClass('active');
        $(this).parent('li').addClass('active');
    });
});