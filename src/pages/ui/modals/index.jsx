import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Card, Button} from 'antd'

class Modals extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal1: false,
			showModal2: false,
			showModal3: false,
			showModal4: false,
			currentModal: ''
		}
	}

	handleOpen(type) {
		this.setState({
			[type]: true,
			currentModal: type
		})
	}

	handleCancel(type) {
		this.setState({
			[type]: false
		})
	}

	handleConfirm(option) {
		Modal[option.type]({
			title: option.title,
			content: option.content,
			onOk() {},
			onCancel() {}
		})
	}

	render() {
		return (
			<div className={'page-ui page-ui-modals'}>
				<Card className={'card-container'} title={'基础模态框'}>
					<Button type={'primary'} onClick={this.handleOpen.bind(this, 'showModal1')}>Open</Button>
					<Button type={'primary'} onClick={this.handleOpen.bind(this, 'showModal2')}>自定义页脚</Button>
					<Button type={'primary'} onClick={this.handleOpen.bind(this, 'showModal3')}>顶部20px弹窗</Button>
					<Button type={'primary'} onClick={this.handleOpen.bind(this, 'showModal4')}>水平垂直居中</Button>
				</Card>

				<Card className={'card-container'} title={'信息确认框'}>
					<Button type={'primary'} onClick={this.handleConfirm.bind(this, {type: 'confirm', title: 'Confirm', content: 'Confirm Modal'})}>Confirm</Button>
					<Button type={'primary'} onClick={this.handleConfirm.bind(this, {type: 'info',  title: 'Info', content: 'Info Modal'})}>Info</Button>
					<Button type={'primary'} onClick={this.handleConfirm.bind(this, {type: 'success',  title: 'Success', content: 'Success Modal'})}>Success</Button>
					<Button type={'primary'} onClick={this.handleConfirm.bind(this, {type: 'warning',  title: 'Warning', content: 'Warning Modal'})}>Warning</Button>
					<Button type={'primary'} onClick={this.handleConfirm.bind(this, {type: 'error',  title: 'Error', content: 'Error Modal'})}>Error</Button>
				</Card>


				<Modal title={'React'} visible={this.state.showModal1}
				       onCancel={this.handleCancel.bind(this, this.state.currentModal)}>
					<p>This is a Modal Test</p>
				</Modal>
				<Modal title={'自定义页脚'} visible={this.state.showModal2}
				       onCancel={this.handleCancel.bind(this, this.state.currentModal)} okText={'好的'} cancelText={'算了'}>
					<p>This is a Modal Test</p>
				</Modal>
				<Modal title={'顶部20px弹窗'} style={{top: '20px'}} visible={this.state.showModal3}
				       onCancel={this.handleCancel.bind(this, this.state.currentModal)}>
					<p>This is a Modal Test</p>
				</Modal>
				<Modal title={'水平垂直居中'} wrapClassName={'vertical-center-modal'} visible={this.state.showModal4}
				       onCancel={this.handleCancel.bind(this, this.state.currentModal)}>
					<p>This is a Modal Test</p>
				</Modal>
			</div>
		);
	}
}

Modals.propTypes = {};

export default Modals;
