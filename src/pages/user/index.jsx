import React, {Component} from 'react';
import {Card, Button} from 'antd'
import axios from '../../axios/index'
import Util from '../../util/util'
import PropTypes from 'prop-types';

class User extends Component {
	constructor (props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
				<Card>
					user
				</Card>
			</div>
		);
	}
}

User.propTypes = {};

export default User;
