import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import loginInfo from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonValidation: true,
    };
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    const { password, email } = this.state;
    const num = 6;
    const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i.test(email);
    if (password.length >= num && validEmail) {
      this.setState({
        buttonValidation: false,
      });
    } else {
      this.setState({
        buttonValidation: true,
      });
    }
  }

  render() {
    const { email, buttonValidation } = this.state;
    const { login } = this.props;
    return (
      <section>
        <div>
          <p>TRYBE WALLET LOGIN</p>
        </div>
        <form>
          <label htmlFor="email">
            <input
              type="email"
              data-testid="email-input"
              name="email"
              placeholder="Email"
              onChange={ (e) => this.setState({ email: e.target.value },
                this.handleButton) }
            />
          </label>

          <label htmlFor="password">
            <input
              type="password"
              data-testid="password-input"
              name="password"
              placeholder="Password"
              onChange={ (e) => this.setState({ password: e.target.value },
                this.handleButton) }
            />
          </label>
        </form>
        <div className="link">
          <Link
            to="/carteira"
          >
            <button
              type="button"
              disabled={ buttonValidation }
              onClick={ () => login({ email }) }
            >
              Entrar
            </button>

          </Link>
        </div>

      </section>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (e) => dispatch(loginInfo(e)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
