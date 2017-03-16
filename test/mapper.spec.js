import mapper from '~/src/mapper'
import { propIncludesByIndex, typeFilter, findName, makeBrowser, handleErr } from './util'
import ng from '~/vendor/index'
import fixtures from '~/test/fixtures/index'

describe('angular dependency mapper', () => {

  for (const version in ng) {

    describe('single module tree, no dependencies', () => {
      it(`@${version}: should list dependencies of a single angular module`, (done) => {
        const window = makeBrowser(fixtures.indexHtml, ng[version], fixtures.flat)
        return mapper(window.angular, ['app'], /app/)
          .then(result => {
            expect(result.length).toBe(6)
            expect(result.filter(typeFilter('config')).length).toBe(1)
            expect(result.filter(typeFilter('component')).length).toBe(3)
            expect(result.filter(typeFilter('directive')).length).toBe(2)
            expect(result.find(findName('compB')).dependencies.length).toBe(3)
            // check we didnt accidently set circular reference
            // a module should not list itself as a dependency
            expect(result.find(findName('compB')).dependencies.indexOf(2) > -1).toBeFalsy()
            expect(result.find(findName('root')).dependencies.length).toBe(1)
            expect(result.find(findName('noDeps')).dependencies.length).toBe(0)
            expect(result.find(findName('compC')).dependents.length).toBe(1)
          })
          .then(done)
          .catch(handleErr(done))
      })
    })

    describe('multiple module trees, basic dependencies', () => {
      it(`@${version}: should flatten nested dependency trees into list`, (done) => {
        const window = makeBrowser(fixtures.indexHtml, ng[version], fixtures.multipleFlat)
        return mapper(window.angular, ['app'], /app\.[\w]+/)
          .then(result => {
            expect(result.length).toBe(8)
            expect(result.find(findName('blahComp')).dependencies.length).toBe(1)
            expect(result.find(findName('root')).dependencies.length).toBe(3)
            expect(result.find(findName('root')).dependents.length).toBe(0)
            expect(result.find(findName('sDir')).dependents.length).toBe(3)
            expect(result.find(findName('sRootC')).dependents.length).toBe(1)
            expect(result.find(findName('sRootC')).dependencies.length).toBe(0)
            // double check for erroneously set circular references
            expect(result.reduce(propIncludesByIndex('dependencies'), false)).toBeFalsy()
            expect(result.reduce(propIncludesByIndex('dependents'), false)).toBeFalsy()
          })
          .then(done)
          .catch(handleErr(done))
      })
    })

    describe('many flat modules, enterprise style', () => {
      it(`@${version}: should flatten many already flat modules`, (done) => {
        const window = makeBrowser(fixtures.indexHtml, ng[version], fixtures.enterprise)
        return mapper(window.angular, ['app'], /app\.[\w]+/)
          .then(result => {
            expect(result.find(findName('root')).dependencies.length).toBe(3)
            expect(result.find(findName('appInput')).dependencies.length).toBe(1)
            expect(result.find(findName('appHeader')).dependents.length).toBe(2)
          })
          .then(done)
          .catch(handleErr(done))
      })
    })

    describe('works without dependency filter', () => {
      it(`@${version}: should work without dependency filter`, (done) => {
        const window = makeBrowser(fixtures.indexHtml, ng[version], fixtures.enterprise)
        return mapper(window.angular, ['app'])
          .then(result => {
            expect(result.find(findName('root')).dependencies.length).toBe(3)
            expect(result.find(findName('appInput')).dependencies.length).toBe(1)
            expect(result.find(findName('appHeader')).dependents.length).toBe(2)
          })
          .then(done)
          .catch(handleErr(done))
      })
    })


  }

})
