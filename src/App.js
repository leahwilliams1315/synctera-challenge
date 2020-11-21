import './App.css';
import { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import AppDialog from './AppDialog';

// {
//   'Transaction-Date': '2015-12-31',
//   Description: 'All Purpose Spray',
//   Category: 'Other Services',
//   Debit: 100.84,
//   Credit: null,
//   id: 1
// }

const dateFormatter = (dateString) =>
  new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
    .format(new Date(dateString));

const amountFormatter = (amount) => amount ? `$${amount.toFixed(2)}` : '';




const columns = [
  {id: 'Transaction-Date', label: 'Transaction Date', minWidth: 170, format: dateFormatter},
  {id: 'Description', label: 'Description', minWidth: 170},
  {id: 'Debit', label: 'Withdrawal', minWidth: 170, format: amountFormatter},
  {id: 'Credit', label: 'Deposit', minWidth: 170, format: amountFormatter},
  ];

function App() {

  const baseURL = 'https://sampleapis.com/fakebank/api/Accounts';
  const [transactions, updateTransactions] = useState([]);
  const [selectedTransaction, updateSelectedTransaction] = useState(null);




  useEffect(() => {
      fetch(baseURL)
        .then(result => result.json())
        .then((transactionResp) => updateTransactions(transactionResp.filter(r => r['Transaction-Date'])));
    }
    , []);


  return (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: 30}} className="App">
      <Paper style={{width: '70vw'}}>
        <Table stickyHeader>
        <TableHead>
          <TableRow >
            {columns.map((column) => (
              <TableCell
                key={column.id}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
          <TableBody>
            {
              [...transactions]
                .sort((a,b) => b['Transaction-Date'] > a['Transaction-Date'] ? 1 : -1)
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
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.format ? column.format(transaction[column.id]) : transaction[column.id]}
                    </TableCell>
                  )}
                </TableRow>
              )}
          </TableBody>
        </Table>
      </Paper>
      <AppDialog isOpen={Boolean(selectedTransaction)}
                 {...(selectedTransaction || {})}
                 amount={selectedTransaction ? (selectedTransaction.Debit || selectedTransaction.Credit) : 0}
                 onClose={() => updateSelectedTransaction(null)}
      />
    </div>
  );
}

export default App;
