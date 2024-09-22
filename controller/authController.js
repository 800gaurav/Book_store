import user from '../modal/useModel.js'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

//  user register

export const registerController = async(req, res)=>{
   try {
      const {username, email, password, address} = req.body

      if (!username || !password || !email || !address) {
         return res.status(500).send({
            success:false,
            message:"please provide all fields"
         })

      }
      const exisiting = await user.findOne({ email });
      if (exisiting) {
        return res.status(200).send({
          success: true,
          message: "Email Already Registerd",
        });
      }

      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = await bcrypt.hash(password , salt)
      const users = await user.create({
         username,
         email,
         password: hashedPassword,
         address,
        
       });
       res.status(201).send({
         success: true,
         message: "Successfully Registered",
         users,
       });
   } catch (error) {
      res.status(500).send({
         success:false,
         message:"error in registeration"
      })
   }
};

// logincontroller

export const logincontroller = async (req, res)=>{
  try {
   const {email, password} = req.body
   
   if (!email || !password) {
      return res.status(404).send({
         success:false,
         message: "please fill  email and password"
      });
   }
   const users = await user.findOne({email})
   if (!users) {
      return   res.status(404).send({
         seccess:true,
         message:"user not found",
      })
   }

   const isMatch = bcrypt.compareSync(password, users.password)
   if(!isMatch){
      return res.status(404).send({
      success:false,
      message:"Invalid Password"
    })
   }

   const token = JWT.sign({id:users._id}, process.env.JWT_SECRET,{expiresIn:"7d"})
   res.status(200).send({
      success:true,
      message:"login successfully",
      users,
      token
   })
   
 
  } catch (error) {
   res.status(500).send({
      success:false,
      message:"error while login",
      error
   })
  }

};

// get user

export const getuserController = async(req, res)=>{
   try {
    const users = await user.find({ })
    res.status(200).send({
      success:true,
      users
    })

   } catch (error) {
      res.status(404).send({
         success:false,
         message:"error while get user",
         error
      })
   }
};

export const getsingleUserController = async(req, res)=>{
  try {
   const {id} = req.headers;
    const users = await user.findById(id);
     res.status(200).send({
        success:true,
        message:"user find successfully",
        users
     })
  } catch (error) {
     res.status(500).send({
        success:false,
        message:"error while get single user",
        error
     })
  }
};

export const deleteuserController = async(req, res)=>{
   try {
      const{id} = req.params
      await user.findByIdAndDelete(id)
      res.status(200).send({
         success:true
      })
   } catch (error) {
      res.status(500)({
         success:false
      })
      
   }
};

export const updateuserController = async(req, res)=>{
   try {
      const {address}= req.body
      const {id} = req.headers;
      const users = await user.findByIdAndUpdate(id, {address}, {new:true}) 
      res.status(201).send({
         success:true,
         message:"update successfully",
         users
      })
   } catch (error) {
      res.status(500).send({
         success:false,
         message:"error while update user",
         error
      })
   }
} 




