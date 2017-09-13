require('../../css/index.css');
require('../components/slideBox/slider.js');
var index_tpl = require('../tpl/index/index.tpl');

function indexRender(){
    this.init()
}
indexRender.prototype = {
    init: function(){
        //$(".container").html(index_tpl.render({data:"Hi"}));
    }
};
new indexRender();



