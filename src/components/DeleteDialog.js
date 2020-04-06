import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { TodoContext } from '../contexts/TodoContext';

function DeleteDialog(props) {
    const hide = () => {
        props.setDeleteConfirmationIsShown(false);
    }

    const [open, setOpen] = React.useState(false);

    const context = useContext(TodoContext);
    return (
        <div>

            <Dialog onClose={hide} fullWidth maxWidth="sm" open={props.open}>
                <DialogTitle>Weet je zeker dat je deze todo wilt verwijderen?</DialogTitle>
                <DialogContent>
                    {props.todo.name}
                </DialogContent>
                <DialogActions>
                    <Button onClick={hide}>Terug</Button>
                    <Button onClick={() => {context.deleteTodo({id: props.todo.id, name: props.todo.name}); hide()}}>Verwijderen</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDeleteConfirmationIsShown: PropTypes.func.isRequired, 
    todo: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    })
}

export default DeleteDialog;

