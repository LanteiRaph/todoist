import Hapi from "@hapi/hapi";
import User from "../user.module";
import bcrypt from "bcrypt";
const userPlugin = {
  name: "app/User",
  register: (server: Hapi.Server) => {
    //Login
    server.route({
      method: "POST",
      path: "/login",
      handler: async (req, res) => {
        //Extarct the user data from the request {email and password}
        const userPaylod = req.payload as { email: string; password: string };
        //Find a user matching the given email
        const user = await User.findOne({ email: userPaylod.email });
        //If no usr respond back
        if(!user) return res.response({ msg: "User Not found" });
        //Check passwords
        const validPassword = await bcrypt.compare(
          userPaylod.password,
          user?.password as string
        );
        //If passwrod dont mach responed back
        if (!validPassword) res.response({ msg: "Invalid Password" });
        //Passwords match send given user
        if (user) return res.response(user);
      },
    });
    //SignUp
    server.route({
      method: "POST",
      path: "/signUp",
      handler:  async (req, res) => {
        //Extract the usr data
        const userPayload = req.payload as {
          email: string;
          password: string;
          username: string;
        };
        // //Get a salt for hashing
        const salt = await bcrypt.genSalt(10);
        console.log(userPayload.password)
        const hashedPassword = await bcrypt.hash(userPayload.password, salt);
        //console.log(hashedPassword)
        //Create a new user
        const newUser = new User({
          username: userPayload.username,
          email: userPayload.email,
          password: hashedPassword,
        });
        // //save user and respond
        const user = await newUser.save();
        return res.response(user);
      },
    }); 
    //TODO: Logout

  },
};
export default userPlugin;
