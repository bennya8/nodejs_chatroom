var ejs = require('ejs');

ejs.filters.htmlEntities = function (str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

ejs.filters.htmlEntitiesEscape = function (str) {
    return String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}

ejs.filters.lineBreak = function(str){
    return String(str).replace(/\r\n/g,'</br>');
}

ejs.filters.syntaxHighlight = function(str){
    return String(str).replace(/<pre\s+lang\s*=\s*"(\w+)"\s*>/g,'<pre class="brush: $1;toolbar:false;">').replace(/<!--/g,'<').replace(/-->/g,'>').replace(/<\/br>/g,'\r\n');
}