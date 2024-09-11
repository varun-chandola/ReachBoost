import { v2 } from "cloudinary"
import fs from "fs"

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async (res, localFilepath) => {
    try {
        if (!localFilepath) return null

        const uploadedFile = await v2.uploader.upload(localFilepath , {resource_type : "image"})
        console.log("cloudinary file respnose\n" , uploadedFile.secure_url)
        fs.unlinkSync(localFilepath)
        return uploadedFile.secure_url
    } catch (error) {
        fs.unlinkSync(localFilepath)
        return res.status(500).json({ msg: "Error uploading to cloudinary" })
    }
}