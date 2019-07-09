export default{
  template: '<div class="card article-inner"><header class="article-header"><h1 class="article-title">User {{ $route.params.textname }}</h1><time class="article-time"></time></header>'+
  '<div class="article-entry"><div class="article-data" v-text="text"></div></div></div>'+
  '<div v-show="!text.length" class="article-entry"><h1 >T_< 找不到相关内容</h1></div>',
  data() {
     return {
         guide:this.$store.item,
         text:new Object()
     }
   },

   created: function() {
           this.get() },

   methods:{

            get:function(){
               //发送get请求
            //   this.$http.get('../db/textDetail/'+ this.$route.params.textid+'/'+this.$route.params.textname).then(function(response){
               this.$http.get('../db/textDetail/'+ this.$route.params.textid+'/'+this.$route.params.textname).then(function(response){
               //this.text = JSON.parse(response.data);
              //  this.text = (response.data).replace(/↵/g,"<br/>");
               this.text = response.data;
              // console.log('返回：',this.text);
            },function(){
               console.log('请求失败处理');
              });
            }

               },
    watch: {
                '$route' (to, from) {
                // 对路由变化作出响应...
                    this.get();
                }
    }

}
