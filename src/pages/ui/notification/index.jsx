import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, notification, Button} from "antd";

class Notification extends Component {
	openNotification (type, placement) {
		if (placement) {
			notification.config({
				placement
			})
		}
		notification[type]({
			message: 'Notification Title',
			description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
		})
	}

	render() {
		return (
			<div className={'page-ui page-ui-notification'}>
				<Card title={'通知提醒'} className={'card-container'}>
					<Button type={'primary'} onClick={this.openNotification.bind(this, 'success')}>Success</Button>
					<Button type={'primary'} onClick={this.openNotification.bind(this, 'info')}>Info</Button>
					<Button type={'primary'} onClick={this.openNotification.bind(this, 'warning')}>Warning</Button>
					<Button type={'primary'} onClick={this.openNotification.bind(this, 'error')}>Error</Button>
				</Card>

				<Card title={'通知提醒'} className={'card-container'}>
					<Button type={'primary'} onClick={this.openNotification.bind(this, 'success',
						'topLeft')}>TopLeft</Button>
					<Button type={'primary'} onClick={this.openNotification.bind(this, 'info', 'topRight')}>TopRight</Button>
					<Button type={'primary'} onClick={this.openNotification.bind(this, 'warning', 'bottomLeft')}>BottomLeft</Button>
					<Button type={'primary'} onClick={this.openNotification.bind(this, 'error', 'bottomRight')}>BottomRight</Button>
				</Card>
			</div>
		);
	}
}

Notification.propTypes = {};

export default Notification;
