import { readFileSync } from 'fs'

export default {
  flat: readFileSync(`${__dirname}/flat.js`, 'utf8'),
  multipleFlat: readFileSync(`${__dirname}/multipleFlat.js`, 'utf8'),
  enterprise: readFileSync(`${__dirname}/enterprise.js`, 'utf8'),
  indexHtml: readFileSync(`${__dirname}/index.html`, 'utf8')
}
