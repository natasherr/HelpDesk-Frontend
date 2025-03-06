import  React, {useState} from 'react';
import axios, { Axios } from 'axios';
import { Image} from 'cloudinary-react';


const Cloudinary = () => {

    const [imageSelected, setImageSelected] = useState("");

    const uploadImage = () => {
        console.log(files[0])
        const formData = new FormData();
        formData.append('file', imageSelected); // append the file to the form data
        formData.append('upload_preset', 'HelpDesk'); // replace with your upload preset

        Axios.post("https://api.cloudinary.com/v1_1/daiyupel1/image/upload", formData).then ((response) => {
            console.log(response.data);
            }).catch((error) => {
                console.log(error);
                });
    }


  return (
    <div>
      <input
        type='file'
        onChange={(event) => setImageSelected(event.target.files[0])}
      />
    
      <button onClick={uploadImage}>Upload Image</button>

      <Image style={{width: 200}} cloudName ="daiyupel1" publicId="https://res.cloudinary.com/daiyupel1/image/upload/v1740947144/mjwvlhmddcbuihaw83iz.jpg"/>

    </div> 
  )
};

export default Cloudinary
