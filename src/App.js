/*
 * @Author: Zhangxu
 * @Date: 2019-05-16 17:48
 * @LastEditors: Zhangxu
 * @LastEditTime: 2019-05-16 17:48
 */

import React, { Component } from 'react';

class App extends Component {
  componentDidMount () {
    console.log(this.props)
  }

  render () {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;

