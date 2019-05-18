import React, { Component } from 'react';
import NavLeft from './components/navLeft'
import Header from './components/header'
import Footer from './components/footer'
import './styles/main.less'

export default class Admin extends Component {
  constructor (props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="admin container">
        <section className="nav-left">
          <NavLeft/>
        </section>
        <section className="main">
          <Header/>
          <section className="content">
            {this.props.children}
          </section>
          <Footer/>
        </section>
      </div>
    );
  }
}
