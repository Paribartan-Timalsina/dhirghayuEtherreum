import React, { useState } from "react";
import logo from '../Assets/logo.png';
import './Doctorsignup.css';


function Doctorsignup({account,contract,provider}) {
  const [ic, setIC] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");
  const [major, setMajor] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const doctor = {
      ic,
      name,
      phone,
      gender,
      dob,
      qualification,
      major,
    };
try{
    await contract.setdoctorDetails(doctor);

    console.log("Doctor details submitted!");
}catch(error){
  console.log(error)
}
  }

  return (
    <div className='wrapper'>
     <div className='logo-img'>
          <img src={logo} className="Web-Logo" alt="logo" />
    </div>
      <h1>Doctor Details</h1>
      <form onSubmit={handleSubmit}>
        <label className="InputBox">
          <span>IC Number</span>
          <input type="text" value={ic} onChange={(e) => setIC(e.target.value)} />
        </label>
        <br />
        <label className="InputBox">
          <span>Name</span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label className="InputBox">
          <span>Phone</span>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <label className="InputBox">
          <span>Gender</span>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <br />
        <label className="InputBox">
          <span>Date of Birth</span>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <br />
        <label className="InputBox">
          <span>Qualification</span>
          <input
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
         </label>
        <br />
        <label className="InputBox">
          <span>Major</span>
          <input 
          type="text" 
          value={major} 
          onChange={(e) => setMajor(e.target.value)} />
        </label> 

        <input type="submit" value="Regsiter" className="btn btn-secondary btn-block login" />
      </form>
    </div>
  );
}

export default Doctorsignup;
