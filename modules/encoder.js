(function() {
  jsinclude("core", "network.structuredrequest", function() {
    john.encoder = (function() {
      var ns = function(file, formats, cb) {
        var requestObject = {

        }
        john.network.structuredrequest(requestObject, "/encoder/", cb);
      }
      return ns;
    })();
    loaded(john.encoder);
  }); 
})()