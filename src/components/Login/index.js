import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    showErrorMsg: false,
    username: '',
    password: '',
    errorMsg: '',
    showPassword: false,
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2, path: '/'})
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    this.setState({
      showErrorMsg: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response)
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  getErrorMsgField = () => {
    const {errorMsg} = this.state
    return <p className="error-msg">{errorMsg}</p>
  }

  getUserNameField = () => {
    const {username} = this.state
    return (
      <div className="username-cont">
        <label htmlFor="username" className="input-label">
          Username*
        </label>
        <input
          type="text"
          value={username}
          id="username"
          placeholder="Username"
          className="user-input"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  getPasswordField = () => {
    const {password, showPassword} = this.state
    const pass = password
    return (
      <div className="username-cont">
        <label htmlFor="password" className="input-label">
          Password*
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          value={pass}
          id="password"
          placeholder="Password"
          className="user-input"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  getLoginBtnFiled = () => (
    <button type="submit" className="login-btn">
      Login
    </button>
  )

  onChangeShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  render() {
    const {showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-cont">
        <img
          src="https://res.cloudinary.com/harira/image/upload/v1649759588/BookHub/LoginBackgroundImage_w36yxn.jpg"
          alt="login website logo"
          className="background-image"
        />
        <div className="form-cont">
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="logo-cont">
              <img
                src="https://res.cloudinary.com/harira/image/upload/v1649770777/BookHub/Group_7731_xjdbqj.jpg"
                alt="website login"
              />
            </div>
            {this.getUserNameField()}
            {this.getPasswordField()}
            {showErrorMsg && this.getErrorMsgField()}
            <div className="check-box-cont">
              <input
                type="checkbox"
                id="showPassword"
                onChange={this.onChangeShowPassword}
              />
              <label htmlFor="showPassword" className="input-label">
                Show Password
              </label>
            </div>
            {this.getLoginBtnFiled()}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
