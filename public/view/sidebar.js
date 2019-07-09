//
//   <div class="app_page">
//     <h1>从这个路由传参到别的路由</h1>
//     <div v-for="item in list"></div>
//   </div>
//
// <script>
// export default {
//   name: 'app_page',
//   data () {
//     return {
//     list:[ { id: 1, title: 'My journey with Vue' },
//            { id: 2, title: 'Blogging with Vue' },
//            { id: 3, title: 'Why Vue is so fun' }]
//     }
//   },
// }
// </script>

export default{
  // props: ['list','http_url'],
  template: '<div class="sidebar card"><li  class="sidebar-li" v-for="(item,i) in list"  ><router-link :to="{ path: `/textList/` + item.menuid}"><div class="sidebar-li1" @click="postMenuId(item.menuid,$event,i)">{{item.name}}<span v-if="item.children" class="sprite biger-icon " :class="Index[i]?expanded:collapsed"></span></div></router-link>'+
  '<div v-if="item.children" v-show="Index[i]"><div   v-for="item in item.children"><router-link :to="{ path: `/textList/` + item.menuid}"><li class="sidebar-li2">{{item.name}}</li></router-link></div></div></li></div>',
  data() {
     return {
       Index:[],
       list:[],
       expanded:'expanded',
       collapsed:'collapsed'
     }
   },
   // created :function(){
   //   this.$http.get('http://127.0.0.1:8585/hello').then(function(result){
   //     this.list = result.data;
   //     //this.$set('list', response.data)
   //     console.log(result.data);
   //   });
   // },
   created: function() {
           this.get() },
   // ready浏览器不响应
   // ready: function() {
   //          this.get() },
   methods:{

                   get:function(){
                       //发送get请求
                       this.$http.get('../db/getMenu').then(function(response){
                           this.list = JSON.parse(response.data);
                          // console.log('返回：',response);
                       },function(){
                           console.log('请求失败处理');
                       });
                   },
                   postMenuId: function (id,e,i) {
                     //由于 JavaScript 的限制，Vue 不能检测以下变动的数组:1当你利用索引直接设置一个项时;2当你修改数组的长度时
                     if(this.Index[i]){
                         //Vue methods中的this 指向的是Vue的实例，这里可以直接在this中找到items
                         Vue.set(this.Index,i,false);
			               }else{
				                   Vue.set(this.Index,i,true);
			               };
                        //  console.log('menuid:',id,e.target,e.currentTarget,i,this.Index[i]);
                   }

               },
    watch: {
              //'Index':{ deep: true},

              '$route' (to, from) {
                // 对路由变化作出响应...
               this.get();
               
             }
          }

}
