window._myURL = (function() {
    var value = ""; // private
    var oPath = window.location.pathname;
    if (oPath != "/one/one.app") {
        var idx = oPath.indexOf("/", oPath.indexOf("/") + 1);
        var idx2 = oPath.split("/", 2).join("/").length;
        var nPath = oPath.substring(0, idx + 1);
        value = nPath;
    }

    return { //public API
        getValue: function() {
            return value;
        }
    };
}());