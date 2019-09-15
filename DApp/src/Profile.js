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
      },
      username: "",
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
    return (
      !userSession.isSignInPending() ?

        <div className="container">
          <Conditional renderFiles={this.state} />
          <Header theme={"dark"} style={{ height: "50px" }}>

            <Menu theme="dark" defaultSelectedKeys={['1']} mode="horizontal">
              <Menu.Item key="1" style={{ color: "#f2dcca" }} id="hvr-underline-from-center" onClick={this.handleClick1}>
                <Icon type="profile" />
                My Files
              </Menu.Item>
              <Menu.Item key="2" style={{ color: "#f2dcca" }} id="hvr-underline-from-center" onClick={this.handleClick2}>
                <Icon type="desktop" />
                Send Files
              </Menu.Item>
              <Menu.Item key="3" style={{ color: "#f2dcca" }} id="hvr-underline-from-center" >
                <Icon type="file" />
                Skills
              </Menu.Item>
            </Menu>
          </Header>

          <div className="row">
            <div className="col-md-offset-3 col-md-6">
              <div className="col-md-12">

                <div className="avatar-section">

                  <h1> <span id="heading-name">{person.name() ? person.name() : 'Nameless Person'}</span>!</h1>
                  <span>{this.username}</span>
                  <span>
                    <a onClick={handleSignOut.bind(this)}>(Logout)</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="new-status">
              <div className="col-md-12">

                Name of Medicine:
                                  <input type="text" value={this.state.status1} onChange={e => this.handleNewStatusChange(e, 'status1')} />
                Dosage:
                                  <input type="text" value={this.state.status2} onChange={e => this.handleNewStatusChange(e, 'status2')} />
                Experienced Side Effects:
                                  <input type="text" value={this.state.status3} onChange={e => this.handleNewStatusChange(e, 'status3')} />

                <div className="col-md-12 statuses">
                  {this.state.isLoading && <span>Loading...</span>}
                  {this.state.statuses.map((status) => (
                    <div className="status" key={status.id}>
                      {status.text}
                    </div>
                  )
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={e => this.handleNewStatusSubmit(e)}
                >
                  Submit
                                  </button>
              </div>
            </div>
            0
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
    userSession.putFile('statuses.json', JSON.stringify(statuses), options)
      .then(() => {
        this.setState({
          statuses: statuses
        })
      })
  }

  fetchData() {
    const { userSession } = this.props
    this.setState({ isLoading: true })
    const options = { decrypt: false }
    userSession.getFile('statuses.json', options)
      .then((file) => {
        var statuses = JSON.parse(file || '[]')
        this.setState({
          person: new Person(userSession.loadUserData().profile),
          username: userSession.loadUserData().username,
          statusIndex: statuses.length,
          statuses: statuses,
        })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }
}
