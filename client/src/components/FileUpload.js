import React, { useState } from 'react'
import axios from "axios";
const FileUpload = ({account, contract, provider}) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No Image Selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("file",file);
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `c174ae9ca33e7fa6161e`,
                        pinata_secret_api_key: `f7b003ad8c643ba0576786018df21a34891cd0e7f60d893b17552516773d35ac`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                console.log(ImgHash)
                console.log("Account",account);
                console.log("Contract",contract);
                contract.add(account, ImgHash);
                alert("SuccessFully Image Upload");
                setFileName("No Image Selected");
                setFile(null);
            } catch (e) {
                alert("Unable To Upload Image in Pinata ")
                console.log(e);
            }
        }
    }
    const retrieveFile = (e) => {
        const data = e.target.files[0];
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend=()=>{
            setFile(e.target.files[0]);
        }
        setFileName(e.target.files[0].name);
        e.preventDefault();
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="file-upload" >
                Choose Image
            </label>
            <br></br>
            <input disabled={!account} type="file" id="file-upload" name="data" onChange={retrieveFile} />
            <br></br>
            <span>Image:{fileName}</span>
            <br>
            </br>
            <button type="submit" disable={!file}>Submit</button>
        </form>
        </>
    )
}

export default FileUpload