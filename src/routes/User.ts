import Hapi from '@hapi/hapi'
import User from '../user.module'


const userPlugin = {
    name: 'app/User',
    register: (server: Hapi.Server) => {
        //TODO: Login
        server.route({
            method: 'POST',
            path: '/login',
            handler: async (req, res) => {
                const userPaylod = req.payload as { email: string, password: string }
                const user = await User.findOne({ email: userPaylod.email });
                if (user)
                    return res.response(user);
                return res.response({ msg: 'User Not found' })
            }
        })
        //TODO: SignUp
        server.route({
            method: 'POST',
            path: '/signUp',
            handler: async (req, res) => {
                const userPayload = req.payload as { email: string, password: string, username: string }
                const newUser = new User({
                    username: userPayload.username,
                    email: userPayload.email,
                    password: userPayload.password,
                });
                //save user and respond
                const user = await newUser.save();
                return res.response(user)
            }
        })
        //TODO: Logout
    }
}
export default userPlugin