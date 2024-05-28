import express from "express";
import { User } from "../module/user.js";

const router = express.Router();


// add user

router.post("/", async(request,response)=>{
    try{
        if(!request.body.name || !request.body.age || !request.body.address|| !request.body.gender){
           return response.status(400).json({message:"all field is required: name,age,gender,address"});
        }

        const user = await User.create(request.body);
        response.status(200).json(user)
        
    }catch(error){
        console.log(error.message);
        response.status(500).json({message:error.message})
    }
})

// get users
router.get("/", async(request,response)=>{
    try{
        const users = await User.find();
        response.status(200).json({
            data:users,
            count:users.length
        })
    }catch(error){
        console.log(error.message)
        response.status(500).json({message:error.message})

    }
})

//get user
router.get("/:id", async(request,response)=>{
    try{
        const {id} = request.params;
        const users = await User.findById(id);
        if(!users){
            console.log(users)
            return response.status(400).json({message: "User Not Found"});

        }
    return   response.status(200).json({
            data:users,
            count:users.length
        })
    }catch(error){
        console.log(error.message)
        response.status(500).json({message:error.message})

    }
})

// update user
router.put("/:id", async(request,response)=>{
    try{
        const {id} = request.params;
        if(!request.body.name || !request.body.age || !request.body.address|| !request.body.gender){
            return response.status(400).json({message:"all field is required: name,age,gender,address"});
         }
        const users = await User.findByIdAndUpdate(id,request.body)
        if(!users){
            console.log(users)
            return response.status(400).json({message: "User Not Found"});

        }
        
        return response.status(200).json({message:"user Updated Successfully"});
   
    }catch(error){
        console.log(error.message)
        response.status(500).json({message:error.message})

    }
})



// delete user
router.delete("/:id", async(request,response)=>{
    try{
        const {id} = request.params;
        const users = await User.findByIdAndDelete(id);
        if(!users){
            console.log(users)
            return response.status(400).json({message: "User Not Found"});

        }
    return   response.status(200).json({message:"user delete Successfully"});
    }catch(error){
        console.log(error.message)
        response.status(500).json({message:error.message})

    }
})


export default router