import React, {Component} from 'react';
import './index.less'

class MyComponent extends Component {
	render() {
		return (
			<div className="footer">
				版权所有：Zhangxu（推荐使用谷歌浏览器，可以获得更佳操作页面体验） 技术支持：Zhangxu
			</div>
		);
	}
}

MyComponent.propTypes = {};

export default MyComponent;
