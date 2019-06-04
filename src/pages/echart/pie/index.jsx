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
			legend: {
				type: 'scroll',
				orient: 'vertical',
				right: 10,
				top: 20,
				bottom: 20,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [
				{
					name: '订单量',
					type: 'pie',
					data: [{
						name: '周一',
						value: 1000
					}, {
						name: '周二',
						value: 2500
					}, {
						name: '周三',
						value: 3000
					}, {
						name: '周四',
						value: 5000
					}, {
						name: '周五',
						value: 3500
					}, {
						name: '周六',
						value: 6000
					}, {
						name: '周日',
						value: 7500
					}]
				}
			]
		};
		return option
	}

	getEchartOption02() {
		let option = {
			title: {
				text: '用户骑行订单'
			},
			legend: {
				type: 'scroll',
				orient: 'vertical',
				right: 10,
				top: 20,
				bottom: 20,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [
				{
					name: '订单量',
					type: 'pie',
					radius: ['50%', '70%'],
					data: [{
						name: '周一',
						value: 1000
					}, {
						name: '周二',
						value: 2500
					}, {
						name: '周三',
						value: 3000
					}, {
						name: '周四',
						value: 5000
					}, {
						name: '周五',
						value: 3500
					}, {
						name: '周六',
						value: 6000
					}, {
						name: '周日',
						value: 7500
					}]
				}
			]
		};
		return option
	}

	getEchartOption03() {
		let option = {
			title: {
				text: '用户骑行订单'
			},
			legend: {
				type: 'scroll',
				orient: 'vertical',
				right: 10,
				top: 20,
				bottom: 20,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [
				{
					name: '订单量',
					type: 'pie',
					roseType: 'radius',
					data: [{
						name: '周一',
						value: 1000
					}, {
						name: '周二',
						value: 2500
					}, {
						name: '周三',
						value: 3000
					}, {
						name: '周四',
						value: 5000
					}, {
						name: '周五',
						value: 3500
					}, {
						name: '周六',
						value: 6000
					}, {
						name: '周日',
						value: 7500
					}].sort((a, b) => a['value'] - b['value'])
				}
			]
		};
		return option
	}

	render() {
		return (
			<div>
				<Card title={'饼图之一'}>
					<ReactEcharts option={this.getEchartOption01()} style={{height: 500}} theme={"customerTheme"}/>
				</Card>
				<Card
					title={'饼图之二'}
					style={{marginTop: 10}}
				>
					<ReactEcharts option={this.getEchartOption02()} style={{height: 500}} theme={"customerTheme"}/>
				</Card>
				<Card
					title={'饼图之三'}
					style={{marginTop: 10}}
				>
					<ReactEcharts option={this.getEchartOption03()} style={{height: 500}} theme={"customerTheme"}/>
				</Card>
			</div>
		);
	}
}

MyComponent.propTypes = {};

export default MyComponent;
