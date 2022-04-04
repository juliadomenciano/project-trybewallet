import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Expenses extends React.Component {
/*   constructor() {
    super();
  }

  handleMath = (item) => {
    const { ask } = item.exchangeRates[item.currency];
    return ask.toFixed(2);
  } */

  render() {
    const { expenses } = this.props;
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
          {
            expenses.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{parseFloat(item.value).toFixed(2)}</td>
                <td>{item.exchangeRates[item.currency].name}</td>
                <td>
                  {
                    parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    (
                      parseFloat(item.value) * parseFloat(item.exchangeRates[item.currency].ask)).toFixed(2)
                  }

                </td>
                <td>Real</td>

              </tr>
            ))
          }
        </table>

      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,

});

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Expenses);
