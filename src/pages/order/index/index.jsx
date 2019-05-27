import React, {Component} from 'react';
import {Card, Modal, Button, Table, Badge} from 'antd/lib/index'
import axios from '../../../axios'
import Util from '../../../util/util'
import {OrderStatus, CityOption} from '../../../config/appConfig'
import BaseForm from '../../../components/baseForm/index'

class OrderIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			loading: false,
			pagination: {},
			selectedRowKeys: [],
			selectedRow: null
		};
		this.params = {
			page: 1
		};
		this.BaseForm = null;
		this.formList = [{
			type: "SELECT",
			label: "城市",
			field: 'city_id',
			placeholder: "请选择",
			initialValue: '1',
			width: 100,
			list: CityOption, //CityOption,
		}, {
			type: "DATERANGE",
			label: "订单时间",
			width: 300
		}, {
			type: "SELECT",
			field: 'order_status',
			label: "订单状态",
			placeholder: '请选择',
			width: 200,
			list: [
				{id: '1', name: '进行中'},
				{id: '2', name: '行程结束'}
			]
		}, {
			type: 'INPUT',
			label: '订单编号',
			field: 'order_id',
			width: 200,
			placeholder: '订单编号'
		}]
	}

	componentDidMount() {
		this.requestList()
	}

	openOrderDetail() {
		let item = this.state.selectedRow;
		if (!item) {
			Modal.info({
				title: '提示',
				content: '您当前还未选择任何订单'
			});
			return
		}
		this.props.history.push(`/common/order/${item.id}`)
	}

	requestList() {
		this.setState({
			loading: true
		});
		let list = [];
		// let searchParams = this.filterForm.props.form.getFieldsValue();
		let searchParams = this.BaseForm.props.form.getFieldsValue();
		axios.request({
			method: 'get',
			url: '/order/list',
			data: {
				params: {
					page: this.params.page,
					status: searchParams.order_status,
					start_time: searchParams.start_time,
					end_time: searchParams.end_time,
					city_id: searchParams.city_id,
					keyword: searchParams.order_id
				}
			}
		}).then(res => {
			if (res && res.item_list.length > 0) {
				list = res.item_list.map((item, index) => {
					return Object.assign({}, item, {key: index})
				});
				this.setState({
					loading: false,
					list,
					pagination: Util.pagination(res, current => {
						this.params.page = current;
						this.requestList()
					})
				})
			}
		}, err => {
			this.setState({
				loading: false,
				list
			})
		})
	}

	render() {
		const columns = [{
			title: '订单编号',
			dataIndex: 'order_sn'
		}, {
			title: '车辆编号',
			dataIndex: 'bike_sn'
		}, {
			title: '用户名',
			dataIndex: 'user_name'
		}, {
			title: '手机号',
			dataIndex: 'mobile'
		}, {
			title: '里程',
			dataIndex: 'distance'
		}, {
			title: '行驶时长',
			dataIndex: 'total_time'
		}, {
			title: '状态',
			dataIndex: 'status',
			render(state) {
				switch (state) {
					case 1:
						return <Badge text={OrderStatus[state]} status={"processing"}/>;
					case 2:
						return <Badge text={OrderStatus[state]} status={"success"}/>;
					default:
						return '';
				}
			}
		}, {
			title: '开始时间',
			dataIndex: 'start_time'
		}, {
			title: '结束时间',
			dataIndex: 'end_time'
		}, {
			title: '实付金额',
			dataIndex: 'user_pay'
		}];

		const rowSelection = {
			type: 'radio',
			selectedRowKeys: this.state.selectedRowKeys
		};
		const onRow = (record, index) => {
			return {
				onClick: event => {
					this.setState({
						selectedRowKeys: [index],
						selectedRow: record
					})
				}
			}
		};

		return (
			<div>
				<Card>
					{/*<FilterForm wrappedComponentRef={(inst) => {this.filterForm = inst}} search={this.requestList.bind(this)}/>*/}
					<BaseForm formList={this.formList} wrappedComponentRef={(inst) => {this.BaseForm = inst}} transData={this.requestList.bind(this)}/>
					{/*<BasicTable/>*/}
				</Card>
				<Card style={{marginTop: 10}}>
					<Button type={"primary"} style={{marginRight: 10}} onClick={this.openOrderDetail.bind(this)}>订单详情</Button>
					<Button type={"primary"}>结束订单</Button>
				</Card>
				<Card style={{marginTop: 10}}>
					<Table
						loading={this.state.loading}
						columns={columns}
						bordered={true}
						dataSource={this.state.list}
						pagination={this.state.pagination}
						rowSelection={rowSelection}
						onRow={onRow}
					/>
				</Card>
			</div>
		);
	}
}

// TODO 废弃: 使用BaseForm将其替换
/* class FilterForm extends Component {
	handleSearch () {
		this.props.search()
	}

	handleReset () {
		this.props.form.resetFields()
	}

	render() {
		const { getFieldDecorator} = this.props.form;
		return (
			<Form layout={"inline"}>
				<FormItem label={"城市"}>
					{
						getFieldDecorator('city_id', {
							initialValue: '1'
						})(
							<Select
								style={{width: 100}}
								placeholder={'请选择'}
							>
								<Option value={""}>全部</Option>
								<Option value={"1"}>北京市</Option>
								<Option value={"2"}>天津市</Option>
								<Option value={"3"}>深圳市</Option>
							</Select>
						)
					}
				</FormItem>
				<FormItem label={"订单时间"}>
					{
						getFieldDecorator('start_time')(
							<DatePicker showTime={true} format={"YYYY-MM-DD HH:mm:ss"}/>
						)
					}
				</FormItem>
				<FormItem label={""} style={{marginLeft: 5}}>
					{
						getFieldDecorator('end_time')(
							<DatePicker showTime={true} format={"YYYY-MM-DD HH:mm:ss"}/>
						)
					}
				</FormItem>
				<FormItem label={"订单状态"}>
					{
						getFieldDecorator("order_status")(
							<Select
								style={{width: 100}}
								placeholder={'请选择'}
							>
								<Option value={""}>全部</Option>
								<Option value={"1"}>进行中</Option>
								<Option value={"2"}>行程结束</Option>
							</Select>
						)
					}
				</FormItem>
				<FormItem>
					<Button type={"primary"} style={{margin: "0 20px"}} onClick={this.handleSearch.bind(this)}>查询</Button>
					<Button onClick={this.handleReset.bind(this)}>重置</Button>
				</FormItem>
			</Form>
		)
	}
}

FilterForm = Form.create({})(FilterForm);
*/

export default OrderIndex;
