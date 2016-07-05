const app = require("koa")();
const docs = require("koa-docs");
app.use(docs.get('/docs', {
   title: 'Pet Store API', //文档标题
   version: '1.0.0', // api版本
   theme: 'Darkly', // 主题
   routeHandlers: 'disabled',  // Hide the route implementation code from docs
   groups: [
    {
          groupName: '/wx/product/queryList', 
          description: "项目查询",
          extendedDescription: "+ 参数列表"+,
          routes: [/*  ... route specs ...  */]
    },
    { groupName: 'Store', routes: [/*  ... route specs ...  */] }
   ]
}));

app.listen(3000, (err) => {
   if (err) throw err;
   console.log(`Docs are available at http://localhost:3000/docs`);
});