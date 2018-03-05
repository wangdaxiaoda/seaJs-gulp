define('a',function(require, exports, module){
    function a(){
        console.log('i`m a');
    }

    module.exports = {
        a: a
    }
})
define('index',['a'],function(require, exports, module){
    var a = require('a');
    a();
    console.log('i`m index');
});


seajs.use('index');
