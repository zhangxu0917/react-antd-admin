import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button, message} from 'antd'

class Messages extends Component {
	showMessage (type) {
		message[type](`This is a message of ${type}`)
	}

	render() {
		return (
			<div className={'page-ui page-ui-message'}>
				<Card title={"全局提示框"} className={'card-container'}>
					<Button type={"primary"} onClick={this.showMessage.bind(this, 'success')}>Success</Button>
					<Button type={"primary"} onClick={this.showMessage.bind(this, 'info')}>Info</Button>
					<Button type={"primary"} onClick={this.showMessage.bind(this, 'warning')}>Warning</Button>
					<Button type={"primary"} onClick={this.showMessage.bind(this, 'error')}>Error</Button>
					<Button type={"primary"} onClick={this.showMessage.bind(this, 'loading')}>Loading</Button>
				</Card>
			</div>
		);
	}
}

Messages.propTypes = {};

export default Messages;
