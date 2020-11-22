//import fileUpload from 'express-fileupload';
import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose file');
    const [uploadedFile, setUploadedFile] = useState({});


    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('https://api-middle-man.herokuapp.com/upload', formData, {
            //const res = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const {fileName, arr } = res.data;
            console.log(arr[0]);
            const content = await axios.post('https://api-middle-man.herokuapp.com/emp', {
                name: arr[0][0],
                jobTitle: arr[0][1],
                salary: arr[0][2],
                email: arr[0][3]
            });

            console.log(content.data);
            setUploadedFile({ fileName, arr});
            console.log('File uploaded');
        } catch (err) {
            if (err.response.status === 500 ) {
                console.log('Server problem :(');
            }
            else {
                console.log(err.response.data.msg);
            }
        }
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile"> {filename} </label>
                </div>

                <input type="submit" value="upload" className="btn btn-primary btn-block mt-4" />
            </form>
            <h3 className="text-center mt-4"> {uploadedFile.fileName} </h3>
            <p className="text-center mt-4"> {uploadedFile.arr} </p>
        </Fragment>
    )
};

export default FileUpload;