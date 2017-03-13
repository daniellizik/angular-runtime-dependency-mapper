angular
  .module('app', [])
  .value('someVal', {
    val: 'burrito'
  })
  .value('blah', function() {
    return { a: true }
  })
  .run(function($blah) {
    $blah({ template: '<dir></dir>' })
  })
  .run(function() {
    // do nothing
  })
  .config(() => {
    return function() {
      return {
        template: `<blah></blah>`,
        e: [{ b: true }]
      }
    }
  })
  .component('root', {
    template: `
      <div>
        comp a
        <comp-b></comp-b>
      </div>
    `
  })
  .component('compB', {
    controllerAs: 'vm',
    controller: 'CtrlA',
    template: `
      <div>
        <h3>comp b</h3>
        <p>{{vm.blah}}</p>
        <comp-c></comp-c>
        <root></root>
        <div no-deps></div>
      </div>
    `
  })
  .component('compC', {
    template: `
      <div>
        comp c
        <div no-deps></div>
        <dir-a></dir-a>
      </div>
    `
  })
  .directive('noDeps', () => ({
    restrict: 'AE',
    template: `<h1>dir a</h1>`
  }))
  .service('blah', () => ({
    a: true
  }))
  .directive('someDeps', ['$compile', 'blah', ($compile, blah) => {
    return {
      template: 'blahblah'
    }
  }])
  .controller('CtrlA', [function() {
    this.blah = 'ldkjfdljf'
  }]);
