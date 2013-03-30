define([], function() {
    var Utils = {
        extend: function (base, methods) {
            var sub = function() {
                base.apply(this, arguments);
            };
            sub.prototype = Object.create(base.prototype);
            $.extend(sub.prototype, methods);
            return sub;
        },
        parseSize: function (size) {
            size = parseFloat(size);
            if (isNaN(size)) {
                size = null;
            }
            return size;
        }
    };

    return Utils;
});