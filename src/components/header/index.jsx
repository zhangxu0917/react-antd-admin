import React, {Component} from 'react';
import {Row, Col, Button} from 'antd'
import Util from '../../util/util'
import Axios from '../../axios/index'
import PropTypes from 'prop-types';
import './index.less'


class Header extends Component {
	componentWillMount() {

		let interval = setInterval(() => {
			let sysTime = Util.formatDate(new Date().getTime())
			this.setState({
				sysTime
			})
		}, 1000);
		this.setState({
			username: 'aaaa',
			interval
		});
		this.getWeatherAPIDate()
	}

	componentWillUnmount() {
		clearTimeout(this.state.interval)
		this.setState({
			interval: null
		})
	}


	getWeatherAPIDate () {
		let city = '北京';
		Axios.jsonp({
			url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
		}).then((res) => {
			let data = res.results[0]['weather_data'][0]
			this.setState({
				dayPictureUrl: data.dayPictureUrl,
				weather: data.weather
			})
		})
	}

	render() {
		const menuType = this.props.menuType;
		return (
			<div className="header">
				<Row className="header-top">
					{
						menuType ? (
							<section>
								<Col span={6} style={{textAlign: 'left'}}>
									<img src={"/assets/logo-ant.svg"} alt="" width={40} style={{marginRight: 10}}/>
									<span style={{fontSize: '18px', fontWeight: 'bolder'}}>React AntD 通用管理系统</span>
								</Col>
								<Col span={18}>
									<span>欢迎，{this.state.username}</span>
									<Button type={"link"}>退出</Button>
								</Col>
							</section>
						) : (
							<Col span={24}>
								<span>欢迎，{this.state.username}</span>
								<a href="#">退出</a>
							</Col>
						)
					}

				</Row>
				{
					menuType
						? ''
						: (<Row className="breadcrumb">
							<Col span={4} className="breadcrumb-title">
								首页
							</Col>
							<Col span={20} className="weather">
								<span className="date">{this.state.sysTime}</span>
								<img className="weather-img" src={this.state.dayPictureUrl} alt=""/>
								<span className="weather-detail">{this.state.weather}</span>
							</Col>
						</Row>)
				}
			</div>
		);
	}
}

Header.propTypes = {
	menuType: PropTypes.string
};

export default Header;
