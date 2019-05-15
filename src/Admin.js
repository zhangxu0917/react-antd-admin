import React, { Component } from 'react';
import NavLeft from './components/navLeft'
import Header from './components/header'
import Home from './pages/home/index'
import Footer from './components/footer'
import './styles/main.less'

export default class Admin extends Component {
  constructor (props) {
    super(props)
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
            <Home></Home>
          </section>
          <Footer/>
        </section>
      </div>
    );
  }
}