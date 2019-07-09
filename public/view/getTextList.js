
export default{

  template: '<div v-if="list.length !=0" class="article-list" @scroll="handleScroll()"><li v-for="item in list" v-on:click="postTextId(item)"  class="card ">'+
  '<router-link :to="{path:`/textDetail/`+ item.textid +`/`+item.name}">'+
  '<header class="article-header"><h1 class="article-title">{{item.name}}</h1><time class="article-time"><span class="sprite date-img"></span><p>{{ item.time | formatDate }}</p></time></header>'+
  '<div class="article-entry" v-show="item.guide||item.introduction"><h2 v-show="item.guide">{{item.guide}}</h2><p v-show="item.introduction">{{item.introduction}}</p></div></router-link>'+
  '<div class="article-info" v-show="item.tag||item.level"><div v-show="item.tag"><span class="sprite tag"></span><li v-for="tag in item.tag">{{tag}}</li></div><div><span class="sprite star" v-for="count in item.level"></span></div></div></li></div>'+
  '<div v-else="list.length==0" class="article-entry"><h1 >T_< 找不到相关内容</h1></div>'+'<!-- <div>bbb {{ $route.params.menuid }}</div> -->',
  data() {
     return {
         list:[],
         params:{page:0,size:5}
     }
   },

   created: function() {
           this.get() },
   // ready浏览器不响应
   // ready: function() {
   //          this.get() },



   methods:{

                   get:function(page){
                    // if(this.$route.params.menuid != "search"){
                       //发送get请求

                       if(page){this.params.page=page};
                       this.$http.get('../db/getTaxtList/'+ this.$route.params.menuid,{params:this.params}).then(function(response){
                             this.list = JSON.parse(response.data);
                          // this.$set('list', response.data)
                           //console.log('返回：',this.list);
                       },function(){
                          this.list=[];
                           console.log('请求失败处理');
                       });

                   },



                   postTextId: function (item) {
                         this.$store.item =item;
                        //  console.log('item:',item);
                   },
                   scroll:function() {
                          let isLoading = false
                        // window.onscroll = () => {
                          // 距离底部0px时加载一次
                           let scrollTop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                           let bottomOfWindow = document.documentElement.offsetHeight - scrollTop - window.innerHeight == 0
                           if (bottomOfWindow && isLoading == false) {
                             this.params.page=this.params.page+1;
                             this.$http.get('../db/getTaxtList/'+ this.$route.params.menuid,{params:this.params}).then(function(response){
                                   //this.list=this.list.concat(data); //数组元素多时内存占用大
                                  this.list.push.apply( this.list,JSON.parse(response.data));//数组拼接
                                 isLoading = true
                                // console.log('lazyload');
                             },function(){
                                 console.log('请求失败处理');
                             });


                           }
                      //  }
                  }

               },

  mounted:function(){

          window.onscroll = () => {this.scroll();}

        //  this.scroll()
  },
  filters:{
                  formatDate:function (time) {
                      let value=new Date(time*1000);
                       let y=value.getFullYear();
                       let m=value.getMonth()+1;
                       let d=value.getDate();
                     return y+'-'+m+'-'+d ;
                    }

         },

   watch: {
               '$route' (to, from) {
                 // 对路由变化作出响应...
                 this.params.page=0;
                 this.get();
                 document.documentElement.scrollTop=0;
               }
   }

}
