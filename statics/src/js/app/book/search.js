/**
 * 搜索页
 */
import Search from '../_jsx/book/search.jsx';

const exports = {
    init() {
        const _self = this;
        /*渲染模板*/
        _self.renderComponent();
        return true;
    },

    /*渲染模板*/
    renderComponent() {
        //var _self = this;
        ReactDOM.render(
            <Search />, document.getElementById('search')
        );
    }
};
exports.init();
