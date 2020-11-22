import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { forwardRef, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import { amountFormatter, dateFormatter } from '../utils';

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
    >
      <DialogTitle>
        Transaction Details
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.id ? <div className="content-container">
           <div className="content-row">
             <div className="content-label">Transaction Date:</div>
             <div>{dateFormatter(props['Transaction-Date'])}</div>
           </div>
            <div className="content-row">
              <div className="content-label">Description:</div>
              <div>{props.Description}</div>
            </div>
            <div className="content-row">
              <div className="content-label">Category:</div>
              <div>{props.Category}</div>
            </div>
            <div className="content-row">
              <div className="content-label">Amount:</div>
              <div>{amountFormatter(props.amount)}</div>
            </div>
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


