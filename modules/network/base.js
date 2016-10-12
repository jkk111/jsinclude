console.log("LOading network.base");
(function() {
  jsinclude("core", function() {
    john.network = {
      poll: function(cb) {
        fetch("/ping").then(function() {
          cb(true);
        },
        function() {
          cb(false);  
        })
      }
    }
    console.log("network.base ready")
    loaded(john.network);
  });
})();