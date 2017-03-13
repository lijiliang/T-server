/**
 * @description - 搜索页
 * @author
 */
import queryString from '../../../_base/getQueryString';
import infiniteScroll from '../../../_base/infiniteScroll';
import layer from '../../../_base/layer';
let _page = 0;
let _q = null;
let loadId = {};
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            totalNum: 0,
        };
    }
    getDate(page){
        loadId = layer.open({
            type: 2
        });
        const _self = this;
        // _q = encodeURIComponent(_q);
        // http://local.s.youmeixun.com/book/sapi?page=12&q=%E5%A4%A9%E6%93%8E
        $.ajax({
            url: 'http://s.youmeixun.com/book/sapi',
            type: 'get',
            data: {
                q: encodeURIComponent(_q),
                page: page
            },
            dataType: 'json',
            success: function(data){
                if(page === 0){
                    _self.setState({
                        list: data.results,
                        totalNum: Math.ceil(data.totalNum/10)
                    });
                }else{
                    _self.setState({
                        list: _self.state.list.concat(data.results),
                        totalNum: Math.ceil(data.totalNum/10)
                    });
                }
                /*总页数*/
                const pageTotal = Math.ceil(data.totalNum/10);

                // 开启滚动加载
                infiniteScroll.start();
                if(page>=parseInt(pageTotal, 10)){
                    infiniteScroll.remove();
                }
                setTimeout(function() {
                    layer.close(loadId);
                }, 200);
            }
        });
    }
    /*
     * @description 初始化
     */
    componentDidMount(){
        const _self = this;
        _q = queryString('q');
        loadId = layer.open({
            type: 2
        });
        _self.getDate(_page);

        infiniteScroll.remove();

       // 滚动加载
        infiniteScroll.init({
            bufferPx: 100, // 距离低端px就触发onNear事件
            time: 200, // 设置延迟触发onNear
            onNear: function(){
                _page ++;
                _self.getDate(_page);
            },
            end: null, // 是否加载完了
            onEnd: null, // 加载完了怎么办
            onScroll: null
        });
    }
    render(){
        return(
            <div className="m-search">
                {
                    this.state.list.map((item, index) => {
                        let match = [];
                        match = item.url.match(/(\d+)/g);
                        const _href = '/book/dir/' + match[1] + '/' + match[2];
                        return(
                            <a href={_href} className="info-item clearfix" key={index}>
                                <div className="info-thumb">
                                    <img src={item.image}/>
                                </div>
                                <div className="info-text">
                                    <stong>{item.name}</stong>
                                    <ul>
                                        <li>作者：{item.author_name}</li>
                                        <li>分类：{item.genre}</li>
                                        <li>状态：{item.updateStatus}</li>
                                        <li>最新：{item.newestChapter_headline}</li>
                                    </ul>
                                </div>
                            </a>
                        );
                    })
                }
            </div>
        );
    }
}

module.exports = Search;
