import React, { useContext, useState, Fragment } from 'react';
import { TodoContext } from '../contexts/TodoContext';

import { Table, TableHead, TableCell, TableRow, 
    TableBody, IconButton, TextField, 
    Checkbox, Card, Grid } 
    from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Container from '@material-ui/core/Container';

import DeleteDialog from './DeleteDialog';
import FileUploadDialog from './FileUploadDialog';

import '../App.css';

function TodoTable() {

    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [DeleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [FileUploadIsShown, setFileUploadIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);

    return (
        <Fragment>
            <Container>
                <div>
                    <Grid item xs={8}>
                        <Card className={"card"}>
                        <form onSubmit={(event) => {context.createTodo(event, {name: addTodo})}}>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell size="small">Todo List</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell size="small">
                                        <TextField value={addTodo} variant="outlined" onChange={(event) => {setAddTodo(event.target.value)}} label="Voeg een Todo toe.." fullWidth />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip TransitionComponent={Zoom} title="Todo Toevoegen">
                                            <IconButton type="submit"> <AddIcon /> </IconButton>
                                        </Tooltip>
                                    </TableCell> 
                                </TableRow >
                                {
                                    context.todos.slice().reverse().map((todo, index) => (
                                        <TableRow key={'todo ' + index} >
                                            <TableCell  className={"" + (todo.completed ? "crossed-line" : "")}> 
                                                
                                                <Checkbox color="primary" /> 
                                                
                                                {editIsShown === todo.id
                                                
                                                ? // Als de edit zichtbaar is, zet een textfield.
                                                
                                                <TextField 
                                                value={editTodo} 
                                                onChange={(event) => {setEditTodo(event.target.value)}}
                                                InputProps={{
                                                    endAdornment: 
                                                    <Fragment>
                                                        <Tooltip TransitionComponent={Zoom} title="Terug">
                                                            <IconButton onClick={() => {setEditIsShown(false)}}> <CloseIcon /> </IconButton>
                                                        </Tooltip>

                                                        <Tooltip TransitionComponent={Zoom} title="Voltooien">
                                                            <IconButton onClick={() => {context.updateTodo({id: todo.id, name: editTodo});
                                                            setEditIsShown(false)
                                                        }}> <DoneIcon /> </IconButton>
                                                        </Tooltip>
                                                    </Fragment>  

                                                }}
                                                />
                                                
                                                : // Anders, gewoon de naam van de todo.
                                                
                                                todo.name}
                                                
                                                </TableCell>
                                            <TableCell align="right">

                                            <Tooltip TransitionComponent={Zoom} title="Afbeelding">
                                                    <IconButton onClick={() => {setFileUploadIsShown(true)}}> <PhotoCameraIcon /> </IconButton>
                                                </Tooltip>

                                                <Tooltip TransitionComponent={Zoom} title="Bewerken">
                                                    <IconButton onClick={() => {setEditIsShown(todo.id); setEditTodo(todo.name)}}> <EditIcon /> </IconButton>
                                                </Tooltip>
                                                
                                                <Tooltip TransitionComponent={Zoom} title="Verwijderen">
                                                    <IconButton onClick={() => {setDeleteConfirmationIsShown(true); setTodoToBeDeleted(todo)}}> <DeleteIcon /> </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                            </Table>
                        </form>
                        </Card>
                    </Grid>
                </div>
            </Container>
                
            {DeleteConfirmationIsShown && (
                <DeleteDialog todo={todoToBeDeleted} open={DeleteConfirmationIsShown} setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}/>
            )}
                <FileUploadDialog open={FileUploadIsShown} setFileUploadIsShown={setFileUploadIsShown} />
        </Fragment>
    );
}

export default TodoTable;
