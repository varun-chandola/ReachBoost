import express from 'express'
import { Thumbnail } from "../models/thumbnail.model.js"
import { User } from "../models/user.model.js"
import { upload } from '../middlewares/multer.middleware.js';
import { authenticateUser } from "../middlewares/auth.middleware.js"
import { uploadOnCloudinary } from "../uploadOnCloudinary.js"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post('/login', async (req, res) => {
    const { username, password, role, email } = req.body;
    console.log(username, password, role, email)
    if ([username, password, role, email].some(x => x.trim() === ""))
        return res.json({ msg: "All fields are mandatory" })

    const found = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!found) return res.json({ msg: "User not found" })

    const token = jwt.sign({ username, email, role }, process.env.JWT_SECRET)
    found.token = token
    // send token in user cookie
    const options = {
        expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly : true 
    };

    console.log('login token\n', token)
    res.status(200).cookie("token", token,options ).json({success:true , msg: "User logged in successfully" , token , found})
})

router.post('/register', async (req, res) => {
    const { username, password, email, role } = req.body;
    if (!(username && password && email)) return res.json({ msg: "All fileds are mandatory" })

    const found = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (found) return res.json({ msg: "user email or username already present" })

    const newuser = await User.create({ username, password, email, role })
    const token = jwt.sign({ username, email, role }, process.env.JWT_SECRET)

    newuser.token = token 
    const options = {
        httpOnly : true,
        expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    }

    console.log('register token\n', token)
    res.status(200).cookie("token", token, options).json({ msg: "user registration successfull", newuser })
})


router.post('/thumbnails', upload.fields([
    { name: 'thumbnail-1' , maxCount: 1, },
    { name: 'thumbnail-2' , maxCount: 1, },
    { name: 'thumbnail-3' , maxCount: 1, },
    { name: 'thumbnail-4' , maxCount: 1, }
]), async (req, res) => {
    try {
        const { title } = req.body
        console.log(title)
        const thumbnail_1_localFilePath = req.files?.['thumbnail-1'][0]?.path
        const thumbnail_2_localFilePath = req.files?.['thumbnail-2'][0]?.path 
        const thumbnail_3_localFilePath = req.files?.['thumbnail-3'][0]?.path 
        const thumbnail_4_localFilePath = req.files?.['thumbnail-4'][0]?.path 

        console.log("path1\n", thumbnail_1_localFilePath);
        console.log("path2\n", thumbnail_2_localFilePath);
        console.log("path3\n", thumbnail_3_localFilePath);
        console.log("path4\n", thumbnail_4_localFilePath);

        // const user = await User.findOne({ username: req.username })
        const thumbnail = await Thumbnail.create({  title });

        const url1 = await uploadOnCloudinary(res, thumbnail_1_localFilePath)
        const url2 = await uploadOnCloudinary(res, thumbnail_2_localFilePath)
        const url3 = await uploadOnCloudinary(res, thumbnail_3_localFilePath)
        const url4 = await uploadOnCloudinary(res, thumbnail_4_localFilePath)

        console.log("\nCLOUDINARY URL 1\n", url1)
        console.log("\nCLOUDINARY URL 2\n", url2)
        console.log("\nCLOUDINARY URL 3\n", url3)
        console.log("\nCLOUDINARY URL 4\n", url4)

        res.status(201).json({ message: "thumbnails created successfully", thumbnail, title , url1, url2, url3, url4 });
    } catch (error) {
        return res.status(500).json({ errormsg : "Thumbnails error" , message: error.message, error });
    }
});


router.get('/thumbnails/:id', authenticateUser, async (req, res) => {
    try {
        const thumbnails = await Thumbnail.find({ youtuber: req.params.id }).populate('votes');
        res.json(thumbnails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/logout' , authenticateUser ,  async(req , res) =>{
    const user = await User.findOne({username : req.username})
    const options = {
        httpOnly : true,
        secure:true,
    }
    res.status(200).json({msg :"Successfull logout" , user}).clearCookie("token" , options)
})
export default router;