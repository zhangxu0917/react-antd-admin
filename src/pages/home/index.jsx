import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.less'

class Home extends Component {
	render() {
		return (
			<div className="home-wrap">
				 欢迎访问React AntD后台管理系统
			</div>
		);
	}
}

Home.propTypes = {};

export default Home;
