import { readFileSync } from 'fs'

export default {
  '1.5.8': readFileSync(`${__dirname}/1.5.8.js`, 'utf8'),
  '1.6.1': readFileSync(`${__dirname}/1.6.1.js`, 'utf8')
}
