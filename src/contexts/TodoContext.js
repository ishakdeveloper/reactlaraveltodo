import React, { Component, createContext } from 'react';
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],

        };
        this.readTodo();
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

 
    handleOpen() {
        this.setState({
            open: true,
        });
    }

    // Create 
    createTodo(event, todo) {
        event.preventDefault()
        axios.post('http://127.0.0.1:8000/api/todos', todo)
            .then(response => {
                    console.log(response);
                    let data = [...this.state.todos];
                    data.push(response.data.todo);
                    this.setState({
                        todos: data,
                   })
            }).catch(error => {
                event.preventDefault();
                console.error(error);
            })
    }
    // Read
    readTodo() {
        axios.get('http://127.0.0.1:8000/api/todos')
        .then(response => {
            this.setState({
                todos: response.data,
            })
        }).catch(error => {
            console.error(error);
        })
    }
    // Update
    updateTodo(data) {

        axios.patch('http://127.0.0.1:8000/api/todos/' + data.id, data)
            .then(response => {
                console.log(response);
                let todos = [...this.state.todos];
                let todo = todos.find(todo => {
                    return todo.id === data.id;
                })
        
                todo.name = data.name;
        
                this.setState({
                    todos: todos,
                })
            }).catch(error => {
                console.error(error);
                console.log("Er is een error.");
            })
    }
    // Delete
    deleteTodo(data) {

        axios.delete('http://127.0.0.1:8000/api/todos/' + data.id)
            .then(response => {
                // message
                    let todos = [...this.state.todos];
                    let todo = todos.find(todo => {
                    return todo.id === data.id;
                 })

                    todos.splice(todos.indexOf(todo), 1);

                    this.setState({
                    todos: todos
                })
            }).catch(error => {
                console.error(error);
            })
    }

    render() {
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
                setMessage: (message) => this.setState({message: message}),
            }} >
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;
