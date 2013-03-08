(function($) {

    var Utils = {
        parseSize: function(size) {
            size = parseFloat(size);
            if (isNaN(size)) {
                size = null;
            }
            return size;
        }
    };

    var PhotosGrid = function (container, options) {
        this.container = container;
        this.parseOptions(options);

        this.fetchData($.proxy(this.dataFetched, this));
    };
    $.extend(PhotosGrid.prototype, {
        defaults: {
            url: null,
            data: null,
            dataFetcher: null,
            data_photoUrl: "url",
            data_height: "height",
            data_width: "width",
            maxWidth: null,
            margin: 3
        },
        parseOptions: function(options) {
            options = options || {};
            this.options = $.extend({}, this.defaults, options);
            this.margin = Utils.parseSize(this.options.margin);
            this.setMaxWidth(this.options.maxWidth);
        },
        setMaxWidth: function(maxWidth) {
            maxWidth = Utils.parseSize(maxWidth);
            if (maxWidth) {
                this.container.css("max-width", maxWidth);
            } else {
                this.container.css("max-width", "");
            }
        },
        fetchData: function(callback) {
            if (this.options.data) {
                callback(this.options.data);
            } else if (this.options.url) {
                $.getJSON(this.options.url, callback);
            } else if (this.options.dataFetcher &&
                typeof this.options.dataFetcher === "function") {
                this.options.dataFetcher(callback);
            }
        },
        dataFetched: function(items) {
            this.items = items;
            this.renderGrid();
        },
        generateGridModel: function() {
            var itemsCopy = this.items.slice(0);
            var rows = [],
                lastItemsLength = -1;
            // We have to validate that the array's length has changed each iteration
            // to prevent endless loop.
            while (itemsCopy.length > 0 && itemsCopy.length != lastItemsLength) {
                lastItemsLength = itemsCopy.length;
                var row = this.generateGridRowModel(itemsCopy);
                rows.push(row);
            }

            return rows;
        },
        calculateCutOff: function(len, delta, items) {
            var cutoff = [],
                cutsum = 0,
                i;

            // Distribute the delta based on the proportion of thumbnail size to
            // length of all thumbnails.
            for (i in items) {
                var item = items[i],
                    fractOfLen = item.width / len;
                cutoff[i] = Math.floor(fractOfLen * delta);
                cutsum += cutoff[i];
            }

            // Still more pixel to distribute because of decimal fractions that were omitted.
            var stillToCutOff = delta - cutsum;
            while(stillToCutOff > 0) {
                for (i = 0; i < cutoff.length && stillToCutOff > 0; i++) {
                    // distribute pixels evenly until done
                    cutoff[i]++;
                    stillToCutOff--;
                }
            }
            return cutoff;
        },
        generateGridRowModel: function(items) {
            var row = [],
                len = 0;

            while (items.length > 0 && len < this.totalWidth) {
                item = items.shift();
                row.push(item);
                len += (item.width + this.margin * 2);
            }

            var delta = len - this.totalWidth;

            if (row.length > 0 && delta > 0) {

                var cutoff = this.calculateCutOff(len, delta, row);

                for (var i = 0; i < row.length; i++) {
                    var pixelsToRemove = cutoff[i];
                    item = row[i];

                    // move the left border inwards by half the pixels
                    item.left_margin = Math.floor(pixelsToRemove / 2);

                    // shrink the width of the image by pixelsToRemove
                    item.wrapper_width = item.width - pixelsToRemove;
                }
            } else {
                // all images fit in the row, set x and viewWidth
                for(var j in row) {
                    item = row[j];
                    item.left_margin = 0;
                    item.wrapper_width = item.width;
                }
            }

            return row;
        },
        createPhoto: function(photo) {
            if (!photo) { return; }
            var photoStructure =
                "<div class='photo-container'>" +
                    "<div class='photo-wrapper'>" +
                        "<a class='photo-anchor' href='javascript:void(0);'><img /></a>" +
                    "</div>" +
                "</div>";

            var photoElem = $(photoStructure).css({
                margin: this.margin + "px"
            });
            photoElem.find(".photo-wrapper").css({
                width: (photo.wrapper_width || 120) + "px",
                height: (photo[this.options.data_height] || 120) + "px"
            });
            photoElem.find("img")
                .attr("src", photo.url)
                .css({
                    width: (photo[this.options.data_width] || 120) + "px",
                    height: (photo[this.options.data_height] || 120) + "px",
                    "margin-left": (photo.left_margin ? -photo.left_margin : 0) +"px"
                });

            return photoElem;
        },
        renderGrid: function() {
            this.container.empty();
            this.totalWidth = this.container.width();

            var gridModel = this.generateGridModel();

            var clearfix = $("<div class='clearfix'></div>")
                .appendTo(this.container);

            for(var rowIndex in gridModel) {
                for(var photoIndex in gridModel[rowIndex]) {
                    var photo = gridModel[rowIndex][photoIndex];
                    this.createPhoto(photo).insertBefore(clearfix);
                }
            }
        }
    });

    $.fn.photosGrid = function(options) {
        var photosGrid = new PhotosGrid(this, options);
        this.data("photosGrid", photosGrid);
        return this;
    };

})(jQuery);





