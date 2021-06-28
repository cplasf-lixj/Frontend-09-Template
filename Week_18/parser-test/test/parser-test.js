var assert = require('assert');

import {parseHTML} from "../src/parser.js"
describe("parse html: ", function() {
  it('<a></a>', function() {
    let tree = parseHTML('<a></a>')
    assert.equal(tree.childern[0].tagName, 'a');
    assert.equal(tree.childern[0].childern.length, 0);
  });
  it('<a href="https://www.baidu.com"></a>', function() {
    parseHTML('<a href="https://www.baidu.com"></a>')
  });
  const styleStr = 
    `<head>
      <style>
        #myid {width: 100px;background-color: #ff5000;} 
        .title {color: white;}
        span {
          width: 100px;
          height: 30px;
        }
      </style>
    </head>
    <body>
      <div id="myid" class="title"></div>
      <span></span>
    </body>` 
  it(styleStr, function() {
    parseHTML(styleStr)
  });
  it('<a href id=1 color="white" enable></a>', function() {
    parseHTML('<a href id=1 color="white" enable></a>')
  });
  it('<br/><br id="5" /><a id=111/><br id=\'5\'/>', function() {
    parseHTML('<br/><br id="5" /><a id=111/><br id=\'5\'/>')
  });
  it('<br/', function() {
    parseHTML('<br/')
  });
  it('<a id=111></a><a id=\'111\' name="aaa"></a>', function() {
    parseHTML('<a id=111></a><a id=\'111\' name="aaa"></a>')
  });
  it('<>', function() {
    parseHTML('<>')
  });
  it('<a name="aaa"dddd">', function() {
    parseHTML('<a name="aaa"dddd">')
  });
  it('<a11 name= "111"  age="19">', function() {
    parseHTML('<a11 name= "111"  age="19">')
  });
})