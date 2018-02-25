<template>
  <div class="rank" ref="rank">
    <input type="button" value="Start Record" @click="startRecord"/>
    <input type="button" value="Stop Record" @click="stopRecord"/>
    <input type="button" value="播放音乐" @click="playmusic"/>
    <input type="button" value="提示框" @click="tips"/>
    <input type="button" value="提示框22" @click="avplay"/>
    <ul class="dlist">
      <li class="ditem" @click="getDeviceInfo">获取设备信息</li>
      <li class="ditem" @click="getSysInfo">获取系统信息</li>
    </ul>
    <div ref="outSet"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    computed(){
      document.addEventListener( "plusready", this.onPlusReady, false )
    },
    methods:{
      tips(){
        // 导入UIAlertView类
        var UIAlertView = plus.ios.importClass("UIAlertView");
        // 创建UIAlertView类的实例对象
        var view = new UIAlertView();
        // 设置提示对话上的内容
        view.initWithTitlemessagedelegatecancelButtonTitleotherButtonTitles("自定义标题" // 提示框标题
          , "使用NJS的原生弹出框，可自定义弹出框的标题、按钮" // 提示框上显示的内容
          , null // 操作提示框后的通知代理对象，暂不设置
          , "确定(或者其他字符)" // 提示框上取消按钮的文字
          , null ); // 提示框上其它按钮的文字，设置为null表示不显示
        // 调用show方法显示提示对话框，在JS中使用()语法调用对象的方法
        view.show();
      },
      avplay(){
        // 导入UIAlertView类
        var AVAudioSession = plus.ios.importClass("AVAudioSession");
        var session=AVAudioSession.sharedInstance();
        session.setActiveerror('YES',null);
        session.setCategoryerror('AVAudioSessionCategoryPlayback',null);
        var UIApplication=plus.ios.importClass("UIApplication");
        UIApplication.sharedApplication().beginReceivingRemoteControlEvents();
        var NSBundle=plus.ios.importClass("NSBundle");
        var NSURL=plus.ios.importClass("NSURL");
        let path = NSBundle.mainBundle().pathForResourceofType("_doc/audio/Recorder_008","wav");
        let soundUrl = NSURL(path);
        console.log(soundUrl)
        var AVAudioPlayer=plus.ios.importClass("AVAudioPlayer");

        var audioPlayer =new AVAudioPlayer('audio/aa.mp3')

        //为音频播放做好准备
    //   console.log(JSON.stringify(audioPlayer));
        audioPlayer.prepareToPlay();

        //设置音频播放对象播放音量的大小

       audioPlayer.volume = 1.0

        //播放次数

        audioPlayer.numberOfLoops = -1 //-1:无限循环播放


        alert('即将播放音乐')
        audioPlayer.play()
        //   let s = plus.audio.createPlayer( "_doc/audio/Recorder_008.wav" )

      },
      backgroundPlayerID(backTaskId){
        var AVAudioSession = plus.ios.importClass("AVAudioSession");
        var session=AVAudioSession.sharedInstance();
        session.setCategoryerror('AVAudioSessionCategoryPlayback',null);
        session.setActiveerror('YES',null);
        var UIApplication=plus.ios.importClass("UIApplication");
        UIApplication.sharedApplication().beginReceivingRemoteControlEvents();
      },
        startRecord() {
       let  r = plus.audio.getRecorder()
        this.r=r
        if ( this.r == null ) {
          alert('录音对象未获取');
          return;
        }
        r.record({filename:'_doc/audio/'}, function(p){
          alert('录音完成：'+p);
          plus.io.resolveLocalFileSystemURL(p, function(entry){
           alert(entry)
          }, function(e){
            alert('读取录音文件错误：'+e.message);
          });
        }, function(e){
          alert('录音失败：'+e.message);
        } );
      },
      stopRecord() {
       this.r.stop();
      },
      playmusic(){//播放音乐
        alert('即将播放音乐')
     //   let s = plus.audio.createPlayer( "_doc/audio/Recorder_008.wav" )
        let s = plus.audio.createPlayer( "_doc/audio/Recorder_008.wav" )
        alert(s)
        var num = s.getDuration();//获取音频总长度number
        setTimeout(function(){//延时获取，否则可能没有返回长度
          var num = s.getDuration()
          alert(num)
        },100)
        s.play( function () {
          alert( "Audio play success!" )

        }, function ( e ) {
          alert( "Audio play error: " + e.message );
        } );
      },
      onPlusReady() {
        console.log(1111)
        alert(111)
        plus.io.requestFileSystem( plus.io.PRIVATE_DOC, function( fs ) {
          alert( "Request file system success!" );
        }, function ( e ) {
          alert( "Request file system failed: " + e.message );
        } );
        this.r = plus.audio.getRecorder()
        console.log(this.r)
      },
      getDeviceInfo() {
        var str = "",i;
        str += "设备型号：" + plus.device.model + "\n";
        str += "设备厂商：" + plus.device.vendor + "\n";
        str += "IMEI：" + plus.device.imei + "\n";
        str += "UUID: " + plus.device.uuid + "\n";
        str += "IMSI：";
        for ( i=0; i<plus.device.imsi.length; i++ ) {
          str += plus.device.imsi[i];
        }
        str += "\n";
        str += "屏幕分辨率：" + plus.screen.resolutionWidth*plus.screen.scale + " x " + plus.screen.resolutionHeight*plus.screen.scale + "\n";
        str += "DPI：" + plus.screen.dpiX + " x " + plus.screen.dpiY;
       this.$refs.outSet.innerText=str
      },
      getSysInfo() {
        var str = "";
        str += "名称：" + plus.os.name + "\n";
        str += "版本：" + plus.os.version + "\n";
        str += "语言：" + plus.os.language + "\n";
        str += "厂商：" + plus.os.vendor + "\n";
        str += "网络类型：";
        var types = {};
        types[plus.networkinfo.CONNECTION_UNKNOW] = "未知";
        types[plus.networkinfo.CONNECTION_NONE] = "未连接网络";
        types[plus.networkinfo.CONNECTION_ETHERNET] = "有线网络";
        types[plus.networkinfo.CONNECTION_WIFI] = "WiFi网络";
        types[plus.networkinfo.CONNECTION_CELL2G] = "2G蜂窝网络";
        types[plus.networkinfo.CONNECTION_CELL3G] = "3G蜂窝网络";
        types[plus.networkinfo.CONNECTION_CELL4G] = "4G蜂窝网络";
        str += types[plus.networkinfo.getCurrentType()];
        this.$refs.outSet.innerText=str
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
