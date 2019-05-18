import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Spin, Alert, Icon} from 'antd'

class Loadings extends Component {
	render() {
		const icon = <Icon type="loading" />
		return (
			<div className={'page-ui page-ui-loading'}>
				<Card title={"Spin用法"} className={'card-container'}>
					<Spin className={'spin'} size={"small"} />
					<Spin className={'spin'} />
					<Spin className={'spin'} size={"large"} />
				</Card>

				<Card title={"内容遮罩"}>
					<Alert
						type={'success'}
						message={'Success Text'}
						description={'Success Description Success Description Success Description'} />
					<Spin>
						<Alert
							type={'error'}
							message={'Error Text'}
							description={'Error Description Success Description Success Description'} />
					</Spin>

					<Spin tip={'加载中……'}>
					  <Alert
							type={'info'}
							message={'Info Text'}
							description={"Info Description Info Description Info Description Info Description"}
						/>
					</Spin>
					<Spin size={"large"} indicator={icon}>
						<Alert
							type={'warning'}
							message={'Warning Text'}
							description={"Warning Description Info Description Info Description Info Description"}
						/>
					</Spin>
				</Card>
			</div>
		);
	}
}

Loadings.propTypes = {};

export default Loadings;
