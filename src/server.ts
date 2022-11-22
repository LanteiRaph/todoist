import Hapi, { server } from '@hapi/hapi'
import mongoose from 'mongoose'
import TodoPlugin from './routes/Todos'
import userPlugin from './routes/User'

const url = "mongodb+srv://lantei:lantei95@cluster0.aybaugd.mongodb.net/todoist?retryWrites=true&w=majority"
mongoose.connect(url, () => {
    console.log('Connected to Database')
})
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })
    server.route({
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            return res.response({ talkback: 'Hello world' })
        }
    })
    await server.register([userPlugin, TodoPlugin])
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