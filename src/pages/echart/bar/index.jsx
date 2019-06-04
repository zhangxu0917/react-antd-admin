import React, {Component} from 'react';
import {Card} from 'antd'
// 按需加载
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import EchartsThemeJSON from '../macarons.json'

// import PropTypes from 'prop-types';

class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}


	componentWillMount() {
		echarts.registerTheme('customerTheme', EchartsThemeJSON)
	}

	getEchartOption01() {
		let option = {
			title: {
				text: '用户骑行订单'
			},
			tooltip: {
				trigger: 'axis'
			},
			xAxis: {
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				name: '订单量',
				type: 'bar',
				data: [1000, 2500, 3000, 5000, 3500, 6000, 7500]
			}]
		};
		return option
	}

	getEchartOption02() {
		let option = {
			title: {
				text: '用户骑行订单'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['摩拜订单量', 'OFO订单量', '小蓝订单量']
			},
			xAxis: {
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				name: '摩拜订单量',
				type: 'bar',
				data: [2500, 3500, 5000, 4000, 6500, 7000, 8500]
			}, {
				name: 'OFO订单量',
				type: 'bar',
				data: [1500, 2000, 3500, 4000, 2500, 6000, 6500]
			}, {
				name: '小蓝订单量',
				type: 'bar',
				data: [1000, 2500, 3000, 5000, 3500, 6000, 7500]
			}]
		};
		return option
	}

	render() {
		return (
			<div>
				<Card title={'柱形图表之一'}>
					<ReactEcharts option={this.getEchartOption01()} style={{height: 500}} theme={"customerTheme"}/>
				</Card>
				<Card
					title={'柱形图表之二'}
					style={{marginTop: 10}}
				>
					<ReactEcharts option={this.getEchartOption02()} style={{height: 500}} theme={"customerTheme"}/>
				</Card>
			</div>
		);
	}
}

MyComponent.propTypes = {};

export default MyComponent;
