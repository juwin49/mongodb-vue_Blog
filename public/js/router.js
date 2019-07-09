import store from './store.js';
import sidebar from '../view/sidebar.js';
import getTextList from '../view/getTextList.js';
import textDetail from '../view/textDetail.js';


//vue-router中文文档https://router.vuejs.org/zh/guide/
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' };
//const sidebar = sidebar;
//const getTaxtList = getTaxtList;

const Bar = { template: '<div><li v-for="post in posts">{{post.title}}</li><button v-on:click="count++">You clicked me {{ count }} times.</button></div>',
  data: function () {
    return {
      posts:[ { "id": 1, "title": 'My journey with Vue' },
             { "id": 2, "title": 'Blogging with Vue' },
             { "id": 3, "title": 'Why Vue is so fun' }],
      count: 0
    }
   } };

//const textDetail = {template:'<div>{{ $route.params.textid }}</div>',watch: {'$route' (to, from) {  /*对路由变化作出响应...*/}}};
const jsComponent = {template:'<div>{{ $route.params.jsComponentId }}</div>',watch: {'$route' (to, from) {  /*对路由变化作出响应...*/}}};
// // 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
// const routes = [
//   { path: '/', component: Foo },
//   { path: '/bar', component: Bar }
// ]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
//  routes // (缩写) 相当于 routes: routes
   routes:[
    // { path: '/' ,component: Foo},
     { path: '/',redirect: '/textList/000000'},
     { path: '/textList/:menuid', components: {default:getTextList,sidebar:sidebar}  },
     { path: '/textList/', components: {default:getTextList,sidebar:sidebar}  },
     { path: '/textDetail/:textid/:textname', components: {default:textDetail,sidebar:sidebar} },
     //懒加载
     //1、resolve => require([URL], resolve),支持性好
     //2、 () => import(URL), webpack2官网推荐使用,属于es7范畴,需要配合babel的syntax-dynamic-
     //{ path: '/textDetail/:textid/:textname', components: {default:() => import('../view/textDetail.js'),sidebar:sidebar} },

     { path: '/jsComponent/:jsComponentId', component:jsComponent },
     { path: '/bar', component: Bar },
    // { path: '/:menuid', component:textDetail},
     // {path:'/bar',component:{
     //    'vue-test': gmallComponent('js/list2.html', {
     //        props: ['items']
     //    })
     // }},
     { path: '/hello' , component: {template: '<div><p>{{url}}</p><div>222</div></div>',props: ['url'] },name:'hello' }
   ]

})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
// const app = new Vue({
//   router
// }).$mount('#app')
const app = new Vue({
  el:'#app',
  router,
  store,
 // data : {list:[],http_url},
 data() {
   return{
     search:"",
     leftnav800:false,
     menublack:'menublack',
     leftnav800show:'leftnav800-show',
     leftnav800hide:'leftnav800-hide'
     // list:[],
     // http:8888888888888,
     // name: 'w3cplus', age: 7
   }
 },
  methods:{leftnav:function(){ this.leftnav800=!this.leftnav800;} },
//  components: { 'child': { template: '<div ><ul> <li> <label>姓名</label> <span>{{ myName }}</span> </li> <li> <label>年龄</label> <span>{{ myAge }}</span> </li> </ul> </div> ', props: ['myName', 'myAge'] } },
  created :function(){
        // this.$http.get('../db/getDate').then(function(result){
        //   this.list = result.data;
        //   this.$set('list', response.data)
        //  console.log(result.data);
        // });
      },
  watch: {
                '$route' (to, from) {
                  // 对路由变化作出响应...
                 this.leftnav800=false
               }
         }


})
