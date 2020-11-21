import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { forwardRef, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import { amountFormatter, dateFormatter } from './utils';


const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export const AppDialog = (props) => {

  const [open, setOpen] = useState(props.isOpen);

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Transaction Details
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props.id ? <div>
            <p>Transaction Date: {dateFormatter(props['Transaction-Date'])}</p>
            <p>Description: {props.Description}</p>
            <p>Category: {props.Category}</p>
            <p>Amount: {amountFormatter(props.amount)}</p>
          </div> : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
};


