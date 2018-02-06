<template>
  <transition name="slide">
     <music-list :songs="songs" :title="titles" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "api/singer"
  import {ERR_OK} from "api/config"
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  export default {
        name: "singer-detail",
        data(){
          return {
            songs:[],
            title:''
          }
       },
        computed:{
          ...mapGetters([
            'singer'
          ]),
          titles(){
            return this.singer.name ? this.singer.name:this.title
          },
          bgImage(){
            return this.singer.avater ? this.singer.avater:
              `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.$route.params.id}.jpg?max_age=2592000`
          }
      },
      created(){
          this._getDetail()
      },
      methods:{
         _getDetail(){
           let singerId=this.singer.id ?this.singer.id:this.$route.params.id
           getSingerDetail(singerId).then((res)=>{
            if(res.code===ERR_OK){
              this.songs=this._normalizeSongs(res.data.list)
              this.title=this.songs[0].singer
            }
           })
         },
        _normalizeSongs(list){
          let ret=[]
          list.forEach((item)=>{
            let {musicData}=item
            if(musicData.songid&&musicData.albummid){
              ret.push(createSong(musicData))
            }
          })
          return ret
        }
     },
    components:{
      MusicList
    }
    }
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
    .slide-enter-active,.slide-leave-active
      transition all 0.3s
    .slider-enter,.slider-leave-to
      transform translate3d(100%,0,0)
</style>
