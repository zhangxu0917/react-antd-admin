import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Button, Radio} from 'antd'

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;

class Buttons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			btnSize: 'default',
			btnLoading: false
		}
	}

	handleCloseLoading () {
		this.setState({
			btnLoading: true
		})
	}

	handleChangeSize (e) {
		this.setState({
			btnSize: e.target.value
		})
	}

	render() {
		return (
			<div className={'page-ui page-ui-button'}>
				<Card className={'card-container'} title={'基础按钮'}>
					<Button type={'primary'}>Imooc</Button>
					<Button>Imooc</Button>
					<Button type={'dashed'}>Imooc</Button>
					<Button type={'danger'}>Imooc</Button>
					<Button disabled={true}>Imooc</Button>
				</Card>

				<Card className={'card-container'} title={'图形按钮'}>
					<Button icon={'plus'}>创建</Button>
					<Button icon={'edit'}>编辑</Button>
					<Button icon={'delete'}>删除</Button>
					<Button icon={'search'} shape={'circle'} />
					<Button icon={'search'} type={'primary'}>搜索</Button>
					<Button icon={'download'} type={'primary'}>下载</Button>
				</Card>

				<Card className={'card-container'} title={'Loading按钮'}>
					<Button loading={true} type={'primary'}>确定</Button>
					<Button shape={'circle'} loading={true} type={"primary"} />
					<Button loading={true}>点击加载</Button>
					<Button type={'primary'} shape={'circle'} onClick={this.handleCloseLoading.bind(this)} loading={this.state.btnLoading} />
					<Button type={'primary'} onClick={this.handleCloseLoading.bind(this)} loading={this.state.btnLoading}>关闭</Button>
				</Card>

				<Card className={'card-container'} title={'按钮组'}>
					<ButtonGroup className={'button-group'}>
						<Button icon={'left'} type={"primary"}>返回</Button>
						<Button icon={'right'} type={"primary"}>前进</Button>
					</ButtonGroup>
				</Card>

				<Card className={'card-container'} title={'按钮尺寸'}>
					<RadioGroup onChange={this.handleChangeSize.bind(this)} value={this.state.btnSize}>
						<Radio value={'small'}>小</Radio>
						<Radio value={'default'}>中</Radio>
						<Radio value={'large'}>大</Radio>
					</RadioGroup>
					<Button type={"primary"} size={this.state.btnSize}>Imooc</Button>
					<Button size={this.state.btnSize}>Imooc</Button>
					<Button type={"dashed"} size={this.state.btnSize}>Imooc</Button>
					<Button type={"danger"} size={this.state.btnSize}>Imooc</Button>

				</Card>
			</div>
		);
	}
}

Buttons.propTypes = {};

export default Buttons;
