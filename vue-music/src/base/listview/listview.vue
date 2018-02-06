<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll"
  >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li  @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
            <img class="avater" v-lazy="item.avater" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div @touchstart="shortcuttouch" @touchmove.stop.prevent="shortcutmove" class="list-shortcut">
      <ul>
        <li class="item" v-for="(item,index) in shortcutList"
            :data-index="index"
            :class="{current:currentIndex==index}"

        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <h2 class="fixed-title">{{fixedTitle}}</h2>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from "../../common/js/dom"
  import Loading from 'base/loading/loading'
  const ANCHOR_HEIGHT=18
  const TITLE_HEIGHT=30
  export default {
        name: "listview",
        created(){
          this.touch={},
          this.listenScroll=true,
          this.listHeight = [],
          this.probeType=3
        },
        data(){
          return{
            scrollY:-1,
            currentIndex:0,
            diff:-1
          }
        },
        props:{
          data:{
            type:Array,
            default:[]
          }
        },
      computed:{
          shortcutList(){
            return this.data.map((group)=>{
                return group.title.substr(0,1)
            })
          },
        fixedTitle(){
            return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
        }
      },
      methods:{
        selectItem(item){
          this.$emit('select',item)
        },
        shortcuttouch(e){
          let sindex=getData(e.target,'index')
          let firstTouch=e.touches[0]
          this.touch.y1=firstTouch.pageY
          this.touch.sindex=sindex
          this._scrollTo(sindex)
        },
        shortcutmove(e){
          let firstTouch=e.touches[0]
          this.touch.y2=firstTouch.pageY
          let delta=(this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT| 0
          let sindex=parseInt(this.touch.sindex+delta)
          this._scrollTo(sindex)
        },
        scroll(pos){
          this.scrollY=pos.y
        },
        _scrollTo(index){
          if(!index&&index!==0){
            return
          }
          if(index<0){
            index=0
          }
          else if(index>this.listHeight.length-2){
            index=this.listHeight.length-2
          }
          this.scrollY=-this.listHeight[index]
          this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
        },
        _caculateHeight(){
          this.listHeight=[]
          const list =this.$refs.listGroup
          let height=0
          this.listHeight.push(height)
          for(let i=0;i<list.length;i++){
            let item=list[i]
            height+=item.clientHeight
            this.listHeight.push(height)
          }
        }
      },
    watch:{
          data(){
            setTimeout(()=>{
              this._caculateHeight()
            },20)
          },
      scrollY(newY){
            const listHeight=this.listHeight
            if(newY>0){
              this.currentIndex=0
            }
            for(let i=0;i<listHeight.length;i++){
              let height1=listHeight[i]
              let height2=listHeight[i+1]
              if(-newY>=height1&&-newY<height2){
                this.currentIndex=i
                this.diff=height2+newY
                return
              }
            }
            this.currentIndex=listHeight.lenght-2
      },
      diff(newval){

         let fixedTop=(newval>0&&newval<TITLE_HEIGHT)?newval-TITLE_HEIGHT:0

        if(this.fixedTop===fixedTop){
           return
        }
        this.fixedTop=fixedTop
        this.$refs.fixed.style.transform=`translate3d(0,${fixedTop}px,0)`
      }
    },
      components:{
          Scroll,
          Loading
      }

    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .listview
    position relative
    width 100%
    height 100%
    overflow hidden
    background $color-background
  .list-group
    padding-bottom 30px
    .list-group-title
      line-height 30px
      height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
      text-align left
    .list-group-item
      display flex
      align-items center
      padding 20px 0 0 30px
      .avater
        width 50px
        height 50px
        border-radius 50%
      .name
        margin-left 20px
        color $color-text-l
        font-size $font-size-medium
  .list-shortcut
      position absolute
      right 0
      top 50%
      transform translateY(-50%)
      width 20px
      padding 20px 0
      border-radius 10px
      text-align center
      background $color-background-d
      font-family "Helvetica Neue", Helvetica, Arial, sans-serif
      .item
        padding 3px
        line-height 1
        color:$color-text-l
        font-size:$font-size-small
        &.current
          color:$color-theme
   .list-fixed
      position absolute
      top 0
      left 0
      width 100%
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
      text-align left
    .loading-container
       position absolute
       top 50%
       transform translateY(-50%)
       width 100%
</style>
