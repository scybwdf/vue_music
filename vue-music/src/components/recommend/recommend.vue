<template>
 <div class="recommend" ref="recommend">
   <div class="recommend-content">
     <div v-if="recommends.length" class="slider-wrapper">
      <slider>
         <div  v-for="item in recommends">
            <a :href="item.linkUrl">
             <img :src="item.picUrl" alt="">
            </a>
         </div>
      </slider>
     </div>
   </div>

     <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li>1111</li>
         <li>1111</li>
        </ul>
     </div>
 </div>
</template>

<script type="text/ecmascript-6">
 import Slider from 'base/slider/slider'
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'

 export default {
     data(){
       return {
           recommends:[]
       }
     },
      created(){
         this._getRecommend()
      },
     methods:{
          _getRecommend(){
              getRecommend().then((res)=>{
               if(res.code==ERR_OK){
                   this.recommends=res.data.slider
               }
          })
     }
      },
     components:{
          Slider
     }
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
 .recommend{
  position:fixed;
  top:88px;
  bottom:0;
  width:100%;
 }
 .recommend-content{
  height:100%;
  overflow:hidden;
 }
 .slider-wrapper{
  position:relative;
  width:100%;
  overflow:hidden;
 }
</style>