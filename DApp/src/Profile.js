import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';
import {Layout, Menu, Icon} from 'antd';
import 'antd/dist/antd.css';
const {Header} = Layout

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
  	  },
  	};
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    return (
      !userSession.isSignInPending() ?
      <div className="panel-welcome" id="section-2">

          <Header theme={"dark"} style={{height: "50px"}}>

              <Menu theme="dark" defaultSelectedKeys={['1']} mode="horizontal">
                  <Menu.Item key="1" style={{color: "#f2dcca"}} id="hvr-underline-from-center">
                      <Icon type="profile" />
                      About Me
                  </Menu.Item>
                  <Menu.Item key="2" style={{color: "#f2dcca"}} id="hvr-underline-from-center">
                      <Icon type="desktop" />
                      Resume
                  </Menu.Item>
                  <Menu.Item key="3" style={{color: "#f2dcca"}} id="hvr-underline-from-center" >
                      <Icon type="file" />
                      Skills
                  </Menu.Item>
                  <Menu.Item key="4" style={{color: "#f2dcca"}} id="hvr-underline-from-center">
                      <Icon type="file" />
                      <span>Projects</span>
                  </Menu.Item>
              </Menu>

          </Header>

        <div className="avatar-section">
          <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" alt=""/>
        </div>
        <h1>Hello, <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>!</h1>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={ handleSignOut.bind(this) }
          >
            Logout
          </button>
        </p>
      </div> : null
    );
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }
}
