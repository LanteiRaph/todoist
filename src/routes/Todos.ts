import Hapi from '@hapi/hapi';
import Todo from '../todo.module'
//
//Todos routes handler.
const TodoPlugin = {
    name: 'app/Todo',
    register: (server: Hapi.Server) => {
        //register our routes
        //TODO: View all Todos.
        server.route({
            method: 'GET',
            path: '/todos',
            handler: async () => {
                const todos = await Todo.find()
                return todos
            }
        })
        //Add A Todo.
        server.route({
            method: 'POST',
            path: '/addTodo',
            handler: (req, res) => {
                //We get the todo from the req
                const todo = req.payload
                //Create a new to/ Save to the database
                const newtodo = new Todo(todo)
                newtodo.save();
                //Return the todo that was added.
                return newtodo
            }
        })
        //TODO: Delete a Todo
        server.route({
            method: 'DELETE',
            path: '/deleteTodo/{todoID}',
            handler: async (req, res) => {
                const { todoID } = req.params
                const deletedTodo = Todo.findById(todoID)
                await deletedTodo.deleteOne();
                res.response({ msg: 'Todo has been deleted' })
            }
        })
        //Update a todo
        server.route({
            method: 'PUT',
            path: '/updateTodo/{todoID}',
            handler: async (req, res) => {
                //Get the todos id.
                const { todoID } = req.params
                //Update the given id with the values
                const todo = Todo.findById(todoID)
                return await todo.updateOne({ $set: req.payload })
            }
        })
    }
}

export default TodoPlugin