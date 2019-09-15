import React, { Component } from 'react';
import {
  Person,
} from 'blockstack';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import Conditional from "./Conditional"
const { Header } = Layout

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderFiles: 0,
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      }, username: "",
      status: [],
      status1: "",
      status2: "",
      status3: "",
      status4: "",
      statuses: [],
      statusIndex: 0,
      isLoading: false

    };
    this.handleClick1 = this.handleClick1.bind(this)
    this.handleClick2 = this.handleClick2.bind(this)
  }
  handleNewStatusSubmit(event) {
    const status = "Drug Name: " + this.state.status1 + " Dosage: " + this.state.status2 + " Experienced Side Effects: " + this.state.status3
    this.saveNewStatus(status)
    this.setState({
      status1: "",
      status2: "",
      status3: ""
    })
  }
  fetchPatientInfo() {
    fetch("https://gaia.blockstack.org/hub/" + this.state.acceptingKey + "/statuses2.json")
      .then(results => results.json())
      .then(results => this.setState({ result: results }))
      .then(results => console.log(this.state.result))

  }

  componentDidMount() {
    this.fetchData()
  }
  handleNewStatusChange(event, status) {
    this.setState({ [status]: event.target.value })
  }
  handleClick1() {
    this.setState({
      renderFiles: 1
    })
  }
  handleClick2() {
    this.setState({
      renderFiles: 2
    })
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    var link = person._profile.apps['http://127.0.0.1:3000']
    const key = link.slice(-35, -1)
    return (
      !userSession.isSignInPending() ?

        <div className="container">

          <Header theme={"light"} style={{ height: "50px", backgroundColor: "transparent" }} >

            <Menu theme="light" defaultSelectedKeys={['1']} mode="horizontal">
              <Menu.Item key="1" id="hvr-underline-from-center" onClick={this.handleClick1}>
                <Icon type="profile" />
                Home
              </Menu.Item>
              <Menu.Item key="2" id="hvr-underline-from-center" onClick={this.handleClick2}>
                <Icon type="desktop" />
                My Prescription
              </Menu.Item>
              <Menu.Item key="3" id="hvr-underline-from-center" onClick={handleSignOut.bind(this)}>
                <a onClick={handleSignOut.bind(this)}>Logout</a>
              </Menu.Item>
            </Menu>
          </Header>
          <br /><br /><h1>
            <span id="heading-name" className="idposition">{this.state.username}</span></h1>
          <span className="key">{"Unique Sharing Key:   " + key}</span><br /><br /><br /><br /><br /><br /><br />
          <Conditional renderFiles={this.state} handleNewStatusSubmit={(e) => this.handleNewStatusSubmit(e)} handleNewStatusChange={(e, s) => this.handleNewStatusChange(e, s)} {...this.state} />
          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <div className="col-md-12">

                <div className="avatar-section">

                </div>
              </div>
            </div>
          </div>
        </div > : null
    );
  }






  saveNewStatus(statusText) {
    const { userSession } = this.props
    let statuses = this.state.statuses

    let status = {
      id: this.state.statusIndex++,
      text: statusText.trim(),
      created_at: Date.now()
    }

    statuses.unshift(status)
    const options = { encrypt: false }
    userSession.putFile('statuses2.json', JSON.stringify(statuses), options)
      .then(() => {
        this.setState({
          statuses: statuses
        })
      })
  }

  fetchData() {
    const { userSession } = this.props
    this.setState({ isLoading: true })
    const options = { decrypt: true }
    userSession.getFile('statuses.json', options)
      .then((file) => {
        var statuses = JSON.parse(file || '[]')
        console.log(statuses
        )

        debugger
        this.setState({
          isLoading: false,
          person: new Person(userSession.loadUserData().profile),
          username: userSession.loadUserData().username,
          statusIndex: statuses.length,
          statuses: statuses,
        })
      })
      .finally(() => {
        // this.setState({ isLoading: false })
      })
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }
}
