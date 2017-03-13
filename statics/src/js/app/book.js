import '../../less/book.less';
import layer from '../_base/layer';

$('.search-btn').on('click', function(){
    const _value = $('.s-value').val();
    if(_value.length === 0){
        layer.tips('请输入您要搜索的内容');
        return false;
    }
    location.href = '/book/search?q=' + _value;
});
