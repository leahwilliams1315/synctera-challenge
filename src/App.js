import './App.css';
import { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import { AppDialog } from './AppDialog';
import { TransactionFilterDropdown } from './TransactionFilterDropdown';
import { amountFormatter, dateFormatter } from './utils';



const columns = [
  {id: 'Transaction-Date', label: 'Transaction Date', minWidth: 170, format: dateFormatter},
  {id: 'Description', label: 'Description', minWidth: 300},
  {id: 'Debit', label: 'Withdrawal', minWidth: 50, format: amountFormatter},
  {id: 'Credit', label: 'Deposit', minWidth: 50, format: amountFormatter},
];

function App() {

  const baseURL = 'https://sampleapis.com/fakebank/api/Accounts';
  const [transactions, updateTransactions] = useState([]);
  const [selectedTransaction, updateSelectedTransaction] = useState(null);
  const [selectedFilterOption, updateSelectedFilterOption] = useState(null);

  const filterOptions = [
    {
      label: 'All',
      value: () => true
    },
    {
      label: 'Top 10 Merchants',
      value: (transaction, index, list) => {
        const frequencyMap = list.reduce((acc, next) => {
          return {
            ...acc,
            [next.Description]: acc[next.Description] ? acc[next.Description] + 1 : 1
          }
        }, {});
        const sortedFrequency =
          Object.entries(frequencyMap)
            .sort((a,b) => b[1] - a[1])
            .slice(0, 10)
            .map(subArr => subArr[0]);

        return sortedFrequency.includes(transaction.Description);
      }
    },
    {
      label: 'Top 10 by amount',
      value: (transaction, index, list) => {
        const sortedByAmount =
          list
            .sort((a,b) => (b.Debit || b.Credit) - (a.Debit || a.Credit))
            .slice(0, 10)
            .map(transaction => transaction.id);

        return sortedByAmount.includes(transaction.id);
      }
    },
    {
      label: 'Top 3 Categories by amount',
      value: (transaction, index, list) => {
        const frequencyMap = list.reduce((acc, next) => {
          return {
            ...acc,
            [next.Category]: acc[next.Category] ? acc[next.Category] + (next.Debit || next.Credit) : (next.Debit || next.Credit)
          }
        }, {});
        const sortedFrequency =
          Object.entries(frequencyMap)
            .sort((a,b) => b[1] - a[1])
            .slice(0, 3)
            .map(subArr => subArr[0]);

        return sortedFrequency.includes(transaction.Category);
      }
    }
  ];


  useEffect(() => {
      fetch(baseURL)
        .then(result => result.json())
        .then((transactionResp) => updateTransactions(transactionResp.filter(r => r['Transaction-Date'])));
    }
    , []);


  return (
    <div className="app">
      <TransactionFilterDropdown
        options={filterOptions}
        selectedOption={selectedFilterOption}
        onChange={(event) => updateSelectedFilterOption(event.target.value)}/>
      <Paper className="paper">
        <TableContainer className="container">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{minWidth: column.minWidth}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                [...transactions]
                  .filter(selectedFilterOption ? selectedFilterOption.value : () => true)
                  .sort((a, b) => b['Transaction-Date'] > a['Transaction-Date'] ? 1 : -1)
                  .map((transaction) =>
                    <TableRow
                      onClick={() => {
                        updateSelectedTransaction(transaction)
                      }}
                      style={{cursor: 'pointer'}}
                      hover={true}
                      key={transaction.id}
                    >
                      {columns.map((column) =>
                        <TableCell
                          key={column.id}
                          style={{minWidth: column.minWidth}}
                        >
                          {column.format ? column.format(transaction[column.id]) : transaction[column.id]}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <AppDialog
        isOpen={Boolean(selectedTransaction)}
        {...(selectedTransaction || {})}
        amount={selectedTransaction ? (selectedTransaction.Debit || selectedTransaction.Credit) : 0}
        onClose={() => updateSelectedTransaction(null)}
      />
    </div>
  );
}

export default App;
