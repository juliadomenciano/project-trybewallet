/* import PropTypes from 'prop-types'; */
import React from 'react';
import { connect } from 'react-redux';

class Expenses extends React.Component {
  render() {
    /*     const { expenses } = this.props; */
    return (
      <section>

        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          {/*  <tr>
            <td>Emil</td>

          </tr>
          <tr>
            <td>16</td>

          </tr> */}
        </table>

      </section>

    );
  }
}

/* const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,

}); */

/* Expenses.propTypes = {
  login: PropTypes.func.isRequired,
}; */

/* export default connect(mapStateToProps)(Expenses); */
export default Expenses;
