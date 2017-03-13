angular
  .module('app.someDep', [])
  .component('sRoot', {
    template: `
      <div s-dir></div>
    `
  })
  .component('sRootA', {
    template: `<div>blah</div>`
  })
  .component('sRootB', {
    template: `<div>fasdf</div>`
  })
  .component('sRootC', {
    template: `<div>546yhwrg</div>`
  })
  .directive('sDir', ['$compile', function($compile) {
    return {
      restrict: 'AE',
      template: `
        <div>blah</div>
      `
    }
  }]);

angular
  .module('app.blah', [])
  .component('blahComp', {
    template: `<div s-dir></div>`
  })

angular
  .module('app', ['app.someDep', 'app.blah'])
  .value('someVal', {
    val: 'burrito'
  })
  .config(() => {
    return function() {
      // config with no template should pass test
      // typically router config is going to have template or templateUrl prop
      return {
        a: 'a',
        b: 123,
        c: 'dog',
        e: [{ b: true }]
      }
    }
  })
  .component('root', {
    controllerAs: 'vm',
    controller: [function() {
      this.blah = 123123
    }],
    template: `
      <div>
        comp a
        {{vm.blah}}
        <s-dir></s-dir>
        <s-root-c></s-root-c>
        <s-root>from dependency</s-root>
      </div>
    `
  });
