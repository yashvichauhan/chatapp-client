import React,{useState} from 'react'
import config from '../../../db/axiosConfig'
import axios from 'axios'
const token=localStorage.getItem('token');
const AUTH_TOKEN = "Bearer "+token;
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

function EditProfile(props){
    const [avatarfile,setAvatarFile]=useState('')
    const onFormSubmit=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        //temporary data
        const email="neha.saliyan@mail.com"
        const name="Neha"
        formData.append('profileImage',avatarfile);
        formData.append('email',email);
        formData.append('name',name);
        const configFile = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(config.baseurl+"user/profile",formData,configFile)
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err)
        });
    }
    return (
        <form onSubmit={onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" name="profileImage"  onChange={(e) => setAvatarFile(e.target.files[0])} />
            <button type="submit">Upload Avatar</button>
        </form>
    )
}
export default EditProfile;