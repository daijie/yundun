//the default key/secret refer to http://code.ijinshan.com/reg/
var key='k-33356', 
    secret='a176201e188a0969cd7b7fa2ef3c8d14';
    
const request = require('request'),
    async = require('async'),
    crypto = require('crypto'),
    gateway = 'http://open.pc120.com',
    qs = require('qs');

exports.setConf = (key='k-33356', secret='a176201e188a0969cd7b7fa2ef3c8d14') => {
    this.key = key;
    this.secret = secret;
}

exports.md5 = (str) => {
  return crypto.createHash('md5').update(str).digest('hex');
};

exports.getTimeStamp = () => {
    return (new Date().getTime()/1000);
}

exports.URLSafeBase64encode = (str) => {
    str = new Buffer(str).toString('base64');
    return str.replace(/\+/g, '-').replace(/\//g, '_');
}

exports.sign = (uri, params) => {
    let str = uri + '?';
    str += qs.stringify(params, {
        encode: false
    });
    str += secret;
    return this.md5(str);
}

exports.query = (type='phish', url, callback) => {
    /* the sequence is very important */
    let params = {
        appkey: key,
        q: this.URLSafeBase64encode(url),
        timestamp: this.getTimeStamp()
    };
    params.sign = this.sign(`/${type}/`, params);
    let api = `${gateway}/${type}/?` + qs.stringify(params, { encode: false});
    request.get(api, (e, r, text) => {
        if(text) {
            text = JSON.parse(text);
        } else {
            text = {};
        }
        callback(e, text);
    });
}

//$phish:-1 表示未知;0 表示非钓鱼;1 表示钓鱼;2 表示网站高风险,有钓鱼嫌疑 
exports.queryPhish = (url, callback) => {
    this.query('phish', url, callback);
}

exports.queryDownload = (url, callback) => {
    this.query('download', url, callback);
}

exports.queryAll = (url, callback) => {
    async.parallel({
        phish: (callback) => {
            this.queryPhish(url, callback);
        },
        download: (callback) => {
            this.queryDownload(url, callback);
        }
    }, callback);
}
