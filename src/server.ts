import Hapi, { server } from '@hapi/hapi'

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })

    server.route({
        method: 'GET', 
        path: '/',
        handler: (req, res) => {
            return res.response({talkback: 'Hello world'})
        }
    })
    //TODO: View all Todos. 
    //TODO: Add A Todo. 
    server.route({
        method: 'POST', 
        path: '/addTodo', 
        handler: (req, res) => {
            //We get the todo from the req
            const todo = req.payload
            //Create a new to/ Save to the database
            //Return the todo that was added.
            return todo
        }
    })
    //TODO: Delete a Todo
    //TODO: Update a todo
    //TODO: Login
    //TODO: SignUp
    //TODO: Logout
    await server.start();
    console.log('Server running on %s', server.info.uri);
}


process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();

//Data Types. 
//Primistiva and complex.
//Number 1 string '' "", boolean true or false, float 1.4 double 1.5....., 
//Arrays [], objects {}