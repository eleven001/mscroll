# mScroll -- pull down refresh and pull up load more. only use in Mobile devices

[![NPM](https://nodei.co/npm/mscroll.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mscroll/)<br/>
1. pull down update
1. pull up load more

#use document
## install
```
  npm install mscroll --save
```
## useage
```
1. npm run build

1. browserify mscroll.js --deubg > bundle.js

1. in browser use bundle.js
```
##dependency
```
zepto-modules
```
## API
###
.pull
```js
  var Pull = mScroll.pull;
  var refresh = new Pull ('.js-content', {
        msgElement: '.js-msgwrap',
        msgs: ['下拉刷新.....', '释放刷新'],
        distance: 10,
        start: function () {
          //console.info('start');
        },
        move: function () {
          //console.info('move');
        },
        end: function () {
          //console.info('end');
        },
        onRefresh: function () {
          let ul = document.querySelector('.js-ul');                    
          let random = 1; 
          // after refresh do something you want
          setTimeout(() => {           
            this.backTop();
            ul.innerHTML = '';
            for (let i = 0; i< 25; i++) {
              random = (Math.random() * (20 - 1) + 1).toFixed(0);
              ul.innerHTML +=`<li>
                              我是刷新后内容${random}
                             </li>`;
            }
          }, 1000);
        }
      });
```
.more
```js

```
