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
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const {fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath});
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
        </Fragment>
    )
};

export default FileUpload;