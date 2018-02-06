export default class Song{
  constructor({id,mid,singer,name,album,duration,image,url}){
    this.id=id
    this.mid=mid
    this.singer=singer
    this.name=name
    this.album=album
    this.duration=duration
    this.image=image
    this.url=url
  }
}
export function createSong(musicData) {
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    singer:filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=1EFE29A3871121D948E84A8C2E59B7EB0146AF22043D43E8186F0F71236B7EF082BBE4FFB209962FB44941D9EE767BDE6BAC623DEEC92F40&guid=5104376375&uin=0&fromtag=66`


  })
}
function filterSinger(singer) {
  let ret=[]
  if(!singer){
    return ''
  }
  singer.forEach((s)=>{
    ret.push(s.name)
  })
  return ret.join('/')
}

