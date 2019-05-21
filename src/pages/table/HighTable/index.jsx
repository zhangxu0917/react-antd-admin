import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd'

class HighTable extends Component {
	render() {
		return (
			<div className={"page-table"}>
				<Card title={'头部固定'}>

				</Card>
				<Card title={"左侧固定"} style={{marginTop: 10}}>

				</Card>
				<Card title={"排序"} style={{marginTop: 10}}>

				</Card>
				<Card title={"操作按钮"} style={{marginTop: 10}}>

				</Card>
			</div>
		);
	}
}

HighTable.propTypes = {};

export default HighTable;
