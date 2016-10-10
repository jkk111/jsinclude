(function() {
  var jsinclude = function() {    
    var loaded = document.readyState != "loading";
    if(loaded || !jsinclude.config.onload) {
      var files = [];
      var loaded = [];
      var cb;
      var reflectToWindow = jsinclude.config.reflectToWindow;



      for(var i = 0; i < arguments.length; i++) {
        if(typeof arguments[i] == "string") {
          files.push(arguments[i]);
        } else if(typeof arguments[i] == "function") {
          cb = arguments[i];
        } else if(typeof arguments[i] == "boolean") {
          reflectToWindow = arguments[i];
        }
      }
      var path = "/modules?modules=" + encodeURIComponent(files.join(","));
      fetch(path).then(function(res) {
        if(res.status != 200) {
          throw new Error("Unexpected response code");
        }
        res.text().then(function(text) {
          jsinclude.parse(text, function(parsed) {
            cb(parsed);
          });
        });
      }, function() {
        throw new Error("Transmit Failure: " + files[index]);
      });
      cb = cb || function(loaded) {
        var e = new CustomEvent("DependanciesLoaded", { detail: { loaded: loaded } });
        document.dispatchEvent(e);
      }
    } else {
      var args = arguments;
      document.addEventListener("DOMContentLoaded", function() {
        jsinclude.apply(jsinclude, args);
      });
    }
  }

  jsinclude._cache = {

  }

  jsinclude.drop = function(module) {
    delete jsinclude._cache[module];
  }

  jsinclude.trim = function(path) {
    var p = path.substring(path.lastIndexOf("/") + 1);
    var dot = p.indexOf(".")
    if(dot != -1) p = p.substring(0, dot)
    return p;
  }

  jsinclude.parse = function(text, cb) {
    var callback = "spank the monkey";
    var template = `(function() { 
                      var module = { exports: {} };
                      $code$ 
                    })()`;
    eval(template.replace("$code$", text))
  }

  jsinclude.config = {
    onload: true
  }

  window.jsinclude = jsinclude;
})()