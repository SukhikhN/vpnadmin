function escapeHTML(s) {
    return String(s).replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#PHP-Like_rounding_Method
function round(number, precision) {
    precision = precision || 0;
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
}

/**
 * Convert bytes to terabytes
 * 
 * @param bytes
 * @param precision
 * @returns {*}
 */
function bToTb(bytes, precision) {
    return round(bytes/Math.pow(10, 12), precision);
}

/**
 * Convert terabytes to bytes
 * 
 * @param tbytes
 * @returns {*}
 */
function tbToB(tbytes) {
    return tbytes*Math.pow(10, 12);
}

//https://jsfiddle.net/gabrieleromanato/bynaK/
(function ($) {
    $.fn.serializeFormJSON = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);
