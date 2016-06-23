const assert = require("assert");
const yundun = require("./index.js");

describe('金山云盾', ()=> {
    
    describe('URLSafeBase64encode', () => {
    		it('和普通base64编码的差别在于：将普通base64编码结果中的加号(+)替换成减号(-)，将斜杠(/)替换成下划线(_)', () => {
        	assert.equal(yundun.URLSafeBase64encode('http://tj-ctfs.ftn.qq.com/ftn_handler/938e51e9b0f5fb5bd119ef15a90e5c410865e6411b5313204b1db2ff42f9938f49d8af9b6fb3c220f9add4ecc5ba6542cd2deb247c59bfda7249bcd14d6bd974/?fname=xc9k.apk&k=5965656493fecd9e3651db7d4739074e055d57065008010349515c05051401535c5d485c555f024c55060750025b02005656535261313519075c0e4a00495e6159&fr=00&&txf_fid=6d519c9f046576641b6ab2d58b48d0ba5c33040f&xffz=473102'), "aHR0cDovL3RqLWN0ZnMuZnRuLnFxLmNvbS9mdG5faGFuZGxlci85MzhlNTFlOWIwZjVmYjViZDExOWVmMTVhOTBlNWM0MTA4NjVlNjQxMWI1MzEzMjA0YjFkYjJmZjQyZjk5MzhmNDlkOGFmOWI2ZmIzYzIyMGY5YWRkNGVjYzViYTY1NDJjZDJkZWIyNDdjNTliZmRhNzI0OWJjZDE0ZDZiZDk3NC8_Zm5hbWU9eGM5ay5hcGsmaz01OTY1NjU2NDkzZmVjZDllMzY1MWRiN2Q0NzM5MDc0ZTA1NWQ1NzA2NTAwODAxMDM0OTUxNWMwNTA1MTQwMTUzNWM1ZDQ4NWM1NTVmMDI0YzU1MDYwNzUwMDI1YjAyMDA1NjU2NTM1MjYxMzEzNTE5MDc1YzBlNGEwMDQ5NWU2MTU5JmZyPTAwJiZ0eGZfZmlkPTZkNTE5YzlmMDQ2NTc2NjQxYjZhYjJkNThiNDhkMGJhNWMzMzA0MGYmeGZmej00NzMxMDI=");
    	})
    });
    
    describe('MD5', () => {
		it('123456 equal e10adc3949ba59abbe56e057f20f883e', () => {
        	assert.equal(yundun.md5('123456'), "e10adc3949ba59abbe56e057f20f883e");
    	});
    });
    
    describe('Sign', () => {
		it('e7d6cb66e83e3eb59acbb3492e6c5cc5', () => {
            let params = {
                appkey: 'YXNkZmFzZGZqYXM',
                q: 'aHR0cDovL3NoZW56aGVuLWd6Yy5pbmZv',
                timestamp: '1295430113.546'
            }
        	assert.equal(yundun.sign('phish', params), "e7d6cb66e83e3eb59acbb3492e6c5cc5");
    	});
    });
    
    describe('查询钓鱼网址', () => {
		it('http://cg379.com', (done) => {
            yundun.queryPhish('http://cg379.com', (err, result)=>{
                assert.equal(result.success, 1);
                assert.equal(result.phish, 1);
                done();
            });
        });
		it('https://www.google.com', (done) => {
            yundun.queryPhish('https://www.google.com', (err, result)=>{
                assert.equal(result.success, 1);
                assert.equal(result.phish, 0);
                done();
            });
        });
    });
    
    describe('查询木马文件', () => {
		it('可信文件', (done) => {
            yundun.queryDownload('http://dldir1.qq.com/weixin/Windows/WeChatSetup.exe', (err, result)=>{
                assert.equal(result.success, 1);
                assert.equal(result.down_type, 2);
                done();
            });
        });
        //I don't know where to find a trojan
    });
    
    describe('Query All', () => {
		it('Query All', (done) => {
            yundun.queryAll('https://www.google.com', (err, result)=>{
                assert.equal(!!result.download, true);
                assert.equal(!!result.phish, true);
                assert.equal(result.download.down_type, 1);
                assert.equal(result.phish.phish, 0);
                done();
            });
        });
    });
});