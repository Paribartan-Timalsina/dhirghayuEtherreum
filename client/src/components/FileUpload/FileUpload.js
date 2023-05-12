import React, { useState } from 'react'
import logo from '../Assets/logo.png';
import './FileUpload.css';

import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Modal from "../Modal/Modal"
import Hamburger from '../Hamburger/Hamburger';
const FileUpload = ({account, contract, provider}) => {
    const navigate=useNavigate()
    const [file, setFile] = useState(null);
    const[ispatient,setaspatient]=useState()
    const[isdoctor,setasdoctor]=useState()
    const [error, setError] = useState('');
    const [fileName, setFileName] = useState("No Image Selected");
    const [modalOpen,setModalOpen]=useState(false);
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
    const gotoDetails = async () => {
        try {
          console.log(account);
    
          const isPatient = await contract.isPatients(account);
          const isDoctor = await contract.isDoctors(account);
          setaspatient(isPatient)
          setasdoctor(isDoctor)
          console.log(isPatient);
          console.log(isDoctor);
    
          if (isPatient) {
            navigate("/patientsignup")
          } else if (isDoctor) {
            navigate("/doctorsignup")
          } else {
            window.alert("You are neither a doctor nor a patient")
            setError('You are neither a patient nor a doctor');
          }
        } catch (error) {
          setError(error.message);
        }
      };
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
      {!modalOpen && (
        <div className='first'>
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>

        </div>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
        
        <div className='box1'>
          <div className='logo-img'>
            <img src={logo} className="Web-Logo" alt="logo" />
          </div>
        <h1>Report Upload</h1>
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
            <button type="submit" className="btn2" disable={!file}>Submit</button>
            <button className="btn2" onClick={gotoDetails}>Fill my details</button>
        </form>


        </div>
        </>
    )
}


export default FileUpload