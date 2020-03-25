import React, { useContext, useState, Fragment } from 'react';
import { TodoContext } from '../contexts/TodoContext';


import { IconButton, TextField, InputAdornment, Checkbox, Card, CardContent, CardActions, Typograpgy } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import DeleteDialog from './DeleteDialog';

import '../App.css';

function TodoList() {

    const classes = useStyles();
    const theme = useTheme();
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [DeleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    return (
        <Fragment>
        
        <Card>
            <CardContent>

                <form onSubmit={(event) => {context.createTodo(event, {name: addTodo})}}>
                    <TextField value={addTodo} variant="outlined" onChange={(event) => {setAddTodo(event.target.value)}} label="Voeg een Todo toe.." fullWidth />
                    <Tooltip TransitionComponent={Zoom} title="Todo Toevoegen">
                        <IconButton type="submit"> <AddIcon /> </IconButton>
                    </Tooltip>
                </form>

        </CardContent>
        </Card>


            {DeleteConfirmationIsShown && (
            <DeleteDialog todo={todoToBeDeleted} open={DeleteConfirmationIsShown} setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}/>
        )}
        </Fragment>
    )

}

export default TodoList
