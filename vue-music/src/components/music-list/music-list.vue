<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgstyle" ref="bgImage">
      <div class="play-wrapper" ref="playwrapper">
        <div class="play" v-show="songs.length>0">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-contain" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import {prefixStyle} from "common/js/dom"
  import Loading from "base/loading/loading"
  import {mapActions} from "vuex"
  const RESOVE_HEIGHT=40
  const transform=prefixStyle('transform')
  console.log(transform)
  const backdrop=prefixStyle('backdrop-filter')
    export default {
        name: "music-list",
        props:{
          bgImage:{
            type:String,
            default:''
          },
          songs:{
            type:Array,
            default:[]
          },
          title:{
            type:String,
            default:''
          }
        },
      computed:{
        bgstyle(){
          return `background-image:url(${this.bgImage})`
        }
      },
      data() {
        return {
          scrollY: 0
        }
      },
      created() {
        this.probeType = 3
        this.listenScroll = true
      },
      mounted(){
          this.imageHeight=this.$refs.bgImage.clientHeight
          this.minTranslateY=-this.imageHeight+RESOVE_HEIGHT
          this.$refs.list.$el.style.top=`${this.imageHeight}px`
      },
      methods:{
        selectItem(item,index){
          this.selectPlay({
            list:this.songs,
            index
          })
        },
        ...mapActions([
          'selectPlay'
       ]),
          scroll(pos){
            this.scrollY=pos.y
          },
          back(){
            this.$router.push({
              path:'/singer'
            })
          }
      },
      watch:{
          scrollY(newY){
            let translateY=Math.max(this.minTranslateY,newY)
            let zIndex=0
            let scale=1
            let blur=0
            this.$refs.layer.style[transform]=`translate3d(0,${translateY}px,0)`
            const percent=Math.abs(newY/this.imageHeight)
            if(newY>0){
              zIndex=10
              scale=1+percent
            }
            else{
              blur=Math.min(20*percent,20)
            }
            this.$refs.filter.style[backdrop]=`blur(${blur}px)`
            if(newY<this.minTranslateY){
              zIndex=10
              this.$refs.bgImage.style.paddingTop=0
              this.$refs.bgImage.style.height=`${RESOVE_HEIGHT}px`
              this.$refs.playwrapper.style.display="none"
            }
            else{
              this.$refs.bgImage.style.paddingTop='70%'
              this.$refs.bgImage.style.height=0
              this.$refs.playwrapper.style.display=""
            }
            this.$refs.bgImage.style.zIndex=zIndex
            this.$refs.bgImage.style[transform]=`scale(${scale})`
          }
      },
      components:{
          Scroll,
          SongList,
          Loading
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "~common/stylus/variable"
 @import "~common/stylus/mixin"
  .music-list
    position fixed
    left 0
    top 0
    bottom 0
    right 0
    z-index 100
    background $color-background
    .back
      position absolute
      left 6px
      top 0
      z-index 50
     .icon-back
       padding 10px
       color $color-theme
       display block
       font-size $font-size-large-x
    .title
       no-wrap()
       color $color-text-ll
       font-size $font-size-large
       position absolute
       top 0
       left 10%
       width 80%
       line-height 40px
       z-index 40
    .bg-image
      position relative
      width 100%
      height 0
      padding-top 70%
      transform-origin top
      background-size cover
    .filter
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      background: rgba(7, 17, 27, 0.4)
    .list
      position fixed
      top 0
      bottom 0
      width 100%
      background: $color-background
    .song-list-wrapper
     padding 20px 30px
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .play-wrapper
      position absolute
      bottom 20px
      z-index 50
      width 100%
      .play
        box-sizing border-box
        width 135px
        padding 7px 0
        margin 0 auto
        text-align center
        border-radius 100px
        font-size 0
        color $color-theme
        border 1px solid $color-theme
        .icon-play
          display inline-block
          vertical-align middle
          margin-right 6px
          font-size: $font-size-medium-x
        .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
 .loading-contain
        position absolute
        top 50%
        width 100%
        transform translateY(-50%)

</style>
