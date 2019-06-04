import React, {Component} from 'react';
import {Card, message} from 'antd';
import BaseForm from '../../components/baseForm/index'
import {CityOption, OrderStatus} from '../../config/appConfig'
import axios from '../../axios/index'

class MyComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			totalNum: 0,
		};
		this.map = null;
		this.formList = [{
			type: "SELECT",
			field: 'city_id',
			label: '城市',
			list: CityOption,
			width: 150,
			placeholder: '请选择城市'
		}, {
			type: 'DATERANGE',
		}, {
			type: "SELECT",
			field: 'order_status',
			label: '订单状态',
			placeholder: '请选择',
			width: 150,
			list: Object.keys(OrderStatus).map(item => {
				return {
					id: item.name,
					name: OrderStatus[item]
				}
			})
		}]
	}

	componentWillMount() {
		this.requestDate()
	}

	requestDate() {
		axios.request({
			method: 'get',
			url: '/map/detail'
		}).then(res => {
			console.log(res);
			if (res.code === '0') {
				this.renderMap(res)
			}
		}, err => {
			message.error(err.msg || '获取数据失败')
		})
	}

	renderMap(res) {
		let list = res.result.route_list;
		this.map = new window.BMap.Map('map-container');
		let gps1 = list[0].split(',');
		let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
		let gps2 = list[list.length - 1].split(',');
		let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
		this.map.centerAndZoom(endPoint, 11);

		let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
			imageSize: new window.BMap.Size(36, 42),
			anchor: new window.BMap.Size(18, 42)
		});
		let bikeMarkStart = new window.BMap.Marker(startPoint, {
			icon: startPointIcon
		});
		this.map.addOverlay(bikeMarkStart);

		let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
			imageSize: new window.BMap.Size(36, 42),
			anchor: new window.BMap.Size(18, 21)
		});
		let bikeMarkEnd = new window.BMap.Marker(endPoint, {
			icon: endPointIcon
		});
		this.map.addOverlay(bikeMarkEnd);

		// FIXME: 绘制车辆行驶路线
		let routeList = [];
		list.forEach(item => {
			let p = item.split(',');
			routeList.push(new window.BMap.Point(p[0], p[1]))
		});

		let polyLine = new window.BMap.Polyline(routeList, {
			strokeColor: '#ef4136',
			strokeWeight: 2,
			strokeOpacity: 1
		});
		this.map.addOverlay(polyLine);

		// FIXME: 绘制服务区
		let servicePointList = [];
		let serviceList = res.result.service_list;
		serviceList.forEach(item => {
			servicePointList.push(new window.BMap.Point(item.lon, item.lat))
		});
		let polyServiceLine = new window.BMap.Polyline(servicePointList, {
			strokeColor: '#ef4136',
			strokeWeight: 2,
			strokeOpacity: 1
		});
		this.map.addOverlay(polyServiceLine);

		// FIXME: 添加地图中的自行车图标
		let bikeList = res.result.bike_list;
		let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
			imageSize: new window.BMap.Size(36, 42),
			anchor: new window.BMap.Size(18, 21)
		});
		bikeList.forEach(item => {
			let p = item.split(',');
			let point = new window.BMap.Point(p[0], p[1]);
			let bikeMarker = new window.BMap.Marker(point, {
				icon: bikeIcon
			});
			this.map.addOverlay(bikeMarker)
		})
	}

	render() {
		return (
			<div>
				<Card>
					<BaseForm formList={this.formList}/>
				</Card>
				<Card style={{marginTop: 10}}>
					<h4>共 {this.state.totalNum} 辆车</h4>
					<div id={'map-container'} style={{width: '100%', height: 500}}/>
				</Card>
			</div>
		);
	}
}

MyComponent.propTypes = {};

export default MyComponent;
