(function() {
  var count = {{count}};
  var loadedModules = [];
  function loaded(data) {
    loadedModules.push(data);
    if(loadedModules.length === count) {
      cb(loadedModules);
    }
  }
  {{code}}
})();