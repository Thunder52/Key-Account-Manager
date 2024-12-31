import express from 'express';
import db from '../Database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import requireSignIn from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post("/signup",async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name){
           return res.send({message:"Name is required"});
        }        
        if(!email){
           return res.send({message:"email is required"});
        }        
        if(!password){
           return res.send({message:"password is required"});
        }    
        const Existinguser =await db.query(`SELECT * FROM users WHERE email=$1`,[email]);
        
        if(Existinguser.rows.length > 0){
           return res.status(200).send({
            success:false,
            message:"Already registered please Login"
           });
        }
        const hash=await bcrypt.hash(password,10);
        await db.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`,[name,email,hash]);

        res.status(200).send({
            success:true,
            message:"User successfully regitered",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registeration",
            error
        });
    }
});
router.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
           return res.status(404).send({
              success:false,
              message:"Invalid email or password"
           });
        }
        const user=await db.query('SELECT * FROM users WHERE email=$1',[email]);
        if(user.rows.length===0){
           return res.status(404).send({
              success:false,
              message:"Email is not registered"
           });
        }
        const match = await bcrypt.compare(password,user.rows[0].password);
        if(!match){
          return res.status(200).send({
              success:false,
              message:"Invalid password"
           });
        }
        const token =jwt.sign({_id:user.rows[0].id},process.env.JWT_SECRET,{ expiresIn: "7d"});
  
        res.status(200).send({
           success:true,
           message:"Login Successfully",
           user:{
              name:user.rows[0].name,
              email:user.rows[0].email,
           },
           token
        });
        
     } catch (error) {
        console.log(error);
     }
});

router.get("/check", requireSignIn,(req,res)=>{
   res.status(200).send({ok:true});
});

export default router;