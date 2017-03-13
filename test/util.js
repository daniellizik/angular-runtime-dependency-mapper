import { jsdom } from 'jsdom'

export const typeFilter = (type) => (o) => o.type === type

export const findName = (name) => (o) => o.name === name

export const propIncludesByIndex = (name) => (acc, o, i) => (o[name] || []).includes(i)

export const makeBrowser = (html, ...scripts) => {
  const document = jsdom(html)
  scripts.forEach(s => {
    let tag = document.createElement('script')
    tag.textContent = s
    document.body.appendChild(tag)
  })
  return document.defaultView
}

export const handleErr = (done) => (e) => {
  expect(e instanceof Error).toBeFalsy()
  done(e)
}
