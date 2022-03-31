import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    console.log(email);
    return (
      <header>
        <div>
          <p>TRYBE WALLET LOGIN</p>
        </div>
        <div>
          <p
            data-testid="email-field"
          >
            Email:
            {' '}
            { email }
          </p>
          <p
            data-testid="total-field"
          >
            Despesa Total:
            {' '}
            { 0 }
          </p>
          <p
            data-testid="header-currency-field"
          >
            Despesa Total:
            {' '}
            { 'BRL' }
          </p>
        </div>

      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
