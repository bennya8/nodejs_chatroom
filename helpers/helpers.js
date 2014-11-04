var crypto = require('crypto');

/**
 * 返回指定格式API
 * @param data 封装数据
 * @return object
 */
exports.api = function (message,status,data) {
    return {
        status: status || 0,
        message: message || '请求成功',
        data : data || {}
    };
}

/**
 * 分页函数
 * @param total_count 总记录数
 * @param page_index 当前页码
 * @param page_size [optional] 页面记录
 * @param page_show [optional] 分页列表数目
 * @return string
 */
exports.paging = function (total_count, page_index, page_size, page_show) {
    var page_show = page_show || 10;
    var page_size = page_size || 10;
    var total_page = Math.floor(total_count / page_size);
    var front = Math.floor(page_show / 2);
    var html = "";

    pre_page = (page_index <= 0) ? "" : "<a class='icon item' href='javascript:;' index='" + (page_index - 1) + "'><i class='left arrow icon'></i></a>";
    next_page = (page_index >= (total_page - 1)) ? "" : "<a class='icon item' href='javascript:;' index='" + (page_index + 1) + "'><i class='right arrow icon'></i></a>";

    html += pre_page;
    for (var i = (page_index - front); i < (page_index + page_show - front); i++) {
        if (i < 0 || i >= total_page || total_page == 1) continue;
        html += '<a href="javascript:;" class="item';
        if (page_index == i) {
            html += ' active ';
        }
        html += '" index="' + i + '">' + (i + 1) + '</a>';
    }
    html += next_page;
    return html;
}

exports.encrypt = function (str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

exports.decrypt = function (str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

exports.md5 = function (str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};

exports.randomString = function (size) {
    size = size || 6;
    var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var max_num = code_string.length + 1;
    var new_pass = '';
    while (size > 0) {
        new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
        size--;
    }
    return new_pass;
};