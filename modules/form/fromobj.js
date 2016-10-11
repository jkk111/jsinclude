(function(){
  jsinclude("form.base", function() {
    john.form.fromobj = function(obj) {
      var fd = new FormData();
      for(var key in obj) {
        if(typeof obj[key] == "object") {
          if(Array.isArray(obj[key])) {
            var insertkey = key + "[]";
            for(var item of obj[key]) {
              fd.append(insertkey, item);
            }
          } else {
            fd.append(key, obj[key]);
          }
        } else {
          fd.append(key, obj[key]);
        }
      }
      return fd;
    }
    loaded(john.form.fromobj);
  });
})(); 