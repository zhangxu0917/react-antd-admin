import React, {Component} from 'react';
import {Row, Col} from 'antd'
import Util from '../../util/util'
import Axios from '../../axios/index'
import './index.less'


class MyComponent extends Component {
	componentWillMount() {
		this.setState({
			username: 'aaaa'
		})
		setInterval(() => {
			let sysTime = Util.formatDate(new Date().getTime())
			this.setState({
				sysTime
			})
		}, 1000)
		this.getWeatherAPIDate()
	}


	getWeatherAPIDate () {
		let city = '北京';
		Axios.jsonp({
			url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
		}).then((res) => {
			console.log(res)
			let data = res.results[0]['weather_data'][0]
			this.setState({
				dayPictureUrl: data.dayPictureUrl,
				weather: data.weather
			})
		})
	}

	render() {
		return (
			<div className="header">
				<Row className="header-top">
					<Col span={24}>
						<span>欢迎，{this.state.username}</span>
						<a href="#">退出</a>
					</Col>
				</Row>
				<Row className="breadcrumb">
					<Col span={4} className="breadcrumb-title">
						首页
					</Col>
					<Col span={20} className="weather">
						<span className="date">{this.state.sysTime}</span>
						<img className="weather-img" src={this.state.dayPictureUrl} alt=""/>
						<span className="weather-detail">{this.state.weather}</span>
					</Col>
				</Row>
			</div>
		);
	}
}

MyComponent.propTypes = {};

export default MyComponent;
