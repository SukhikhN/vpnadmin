// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
// with HTML escaping based on Sammy.js modifications
(function(){
    var cache = {};

    this.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var ___$$$___=[],print=function(){___$$$___.push.apply(___$$$___,arguments);};" +

                    // Introduce the data as local variables using with(){}
                "with(obj){___$$$___.push(\"" +

                    // Convert the template into pure JavaScript
                str
                    .replace(/[\r\t\n]/g, " ")
                    .replace(/\"/g, '\\"')
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "\",escapeHTML($1),\"")
                    .replace(/\t!(.*?)%>/g, "\",$1,\"")
                    .split("\t").join("\");")
                    .split("%>").join("___$$$___.push(\"")
                    .split("\r").join("")
                + "\");}return ___$$$___.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };
})();
