import axios from "axios";

export const uploadToCloudinary = async (file: File, token: string, username: string) => {
    //Generate Cloudinary Signature
    const { data } = await axios.post("http://localhost:5000/api/services/generate-signature", {
        public_id: username,
        folder: "profiles"
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(data.signature);
    
    // upload to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', data.apiKey);
    formData.append('timestamp', data.timestamp.toString());
    formData.append('signature', data.signature);
    formData.append('public_id', username);
    formData.append('folder', "profiles");
    formData.append('invalidate', 'true');

    const res=await axios.post(`https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`, formData);
    console.log("url created");
    
    return res.data.secure_url;

}