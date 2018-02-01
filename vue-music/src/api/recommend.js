import jsonp from 'common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'
export function getRecommend() {
    const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data=Object.assign({},commonParams,{
        platform:'h5',
        uin:0,
        needNewcode:1
    });
    return jsonp(url,data,options)
}

export function getDiscList() {
    const url='/api/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    const data=Object.assign({},commonParams,{
        picmid:1,
        rnd:Math.random(),
        g_tk:714135589,
        jsonpCallback:'getPlaylist',
        loginUin:858586480,
        hostUin:0,
        format:'json',
        inCharset:'utf8',
        outCharset:'utf-8',
        notice:0,
        platform:'yqq',
        needNewCode:0,
        categoryId:10000000,
        sortId:5,
        sin:0,
        ein:29
    });
    return axios.get(url,{
        params:data
    }).then((res)=>{
        return Promise.resolve(res.data)
    })
}