const Koa = require('koa')
const Pug = require('koa-pug')
const path = require('path')
const indexRouter = require('./controller/index')
const app =new Koa()
const pug = new Pug({
  viewPath: path.resolve(__dirname, './views'),
  locals: { /* variables and helpers */ },
  basedir: 'path/for/pug/extends',
  app: app // Binding `ctx.render()`, equals to pug.use(app)
})
pug.locals.someKey = 'some value'
app.use(indexRouter.routes())

app.listen(8088,()=>console.log('koa server is run on 8088'))