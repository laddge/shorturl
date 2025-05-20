import { Hono } from 'hono'
import { load } from 'js-toml'
import urlMap from './url.toml'

const app = new Hono()

Object.entries(load(urlMap)).map(([route, config]) => {
  app.get(`/${route}`, (c) => {
    c.header('Location', config.url)
    return c.html(`<html><body><a href="${config.url}">moved here</a></body></html>`, 301)
  })
})

export default app
