(function() {
  console.log("Starting require for structuredrequest")
  jsinclude("form.fromobj", "network.base", function() {
    console.log("loaded");
    john.network.structuredrequest = function(obj, url, cb) {
      var xhr = new XMLHttpRequest();
      var fd = john.form.fromobj(obj);
      xhr.open("POST", url, true);
      xhr.onload = function() {
        try {
          var parsed = JSON.parse(this.responseText);
          cb(parsed);
        } catch(e) {
          cb(this.responseText);
        }
      }
      xhr.onerror = function() {
        cb({ success: false });
      }
      xhr.send(fd);
    }
    loaded(john.network.structuredrequest);
  });
})();