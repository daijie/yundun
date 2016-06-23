# yundun
金山云盾 http://code.ijinshan.com/api/devmore4.html

### Key & Secret
金山的 key 和 secret 长期不变，所以已经内置。但你也可以
```javascript
yundun.setConf(YOUR_KEY, YOUR_SECRET);
//设置自己的 key 和 secret
```



### 1.查询是否为钓鱼网址

```javascript
yundun.queryPhish('http://cg379.com', (err, result)=>{
    assert.equal(result.success, 1);
    assert.equal(result.phish, 1);
});
```
根据金山的文档： http://code.ijinshan.com/api/devmore4.html#md24

```
phish:
-1 表示未知;
0 表示非钓鱼;
1 表示钓鱼;
2 表示网站高风险,有钓鱼嫌疑 
```


### 2.查询是否为木马文件

```javascript
yundun.queryDownload('http://dldir1.qq.com/weixin/Windows/WeChatSetup.exe', (err, result)=>{
    assert.equal(result.success, 1);
    assert.equal(result.down_type, 2);
});
```
根据金山的文档： http://code.ijinshan.com/api/devmore4.html#md25

```
down_type:
1 表示未知
2 表示安全
3 表示危险
6 表示非 PE 文件 
```

### 3. 两者同时查询
```javascript
yundun.queryAll('https://www.google.com', (err, result)=>{
    assert.equal(!!result.download, true);
    assert.equal(!!result.phish, true);
    assert.equal(result.download.down_type, 1);
    assert.equal(result.phish.phish, 0);
});
```
result 同时具有 down_type 和 phish
