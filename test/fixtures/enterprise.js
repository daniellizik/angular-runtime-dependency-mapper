angular
  .module('app.header', [])
  .component('appHeader', {
    template: `
      <div>
        <div><h3>dklj</h3></div>
      </div>
    `
  })

angular
  .module('app.table', [])
  .component('appTable', {
    controllerAs: 'vm',
    controller: function() {
      this.rows = ['dog', 'cat', 'fish', 'horse', 'dragon']
      this.activeRow = 0
      this.click = (i) => this.activeRow = i
    },
    template: `
      <table>
        <tbody>
          <tr
            ng-style="{color: $index === vm.activeRow ? 'blue' : 'black'}"
            ng-click="vm.click($index)"
            style="cursor:pointer"
            ng-repeat="row in vm.rows">
            <td>
              {{$index}}
            </td>
            <td>{{row}}</td>
          </tr>
        </tbody>
      </table>
    `
  })

angular
  .module('app.store', [])
  .factory('appStore', function() {
    return {
      cat: 'daggle cat'
    }
  })

angular
  .module('app.input', [])
  .component('appInput', {
    template: `
      <div>
        <app-header></app-header>
        <h2>a component root, {{vm.cat}}</h2>
        <input ng-change="vm.change()" ng-model="vm.model"/>
      </div>
    `,
    controllerAs: 'vm',
    controller: ['appStore', function(store) {
      this.cat = store.cat
      this.model = ''
      this.change = () => {
        store.cat = this.model
        this.cat = store.cat
      }
    }]
  })

angular
  .module('app', ['app.header', 'app.input', 'app.store', 'app.table'])
  .component('root', {
    template: `
      <div>
        <app-header></app-header>
        <app-input></app-input>
        <app-table></app-table>
      </div>
    `
  })
