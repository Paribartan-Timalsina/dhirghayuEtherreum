import React, { useState } from "react";


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
    <div>
      <h1>Doctor Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          IC Number:
          <input type="text" value={ic} onChange={(e) => setIC(e.target.value)} />
        </label>
        <br />
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <br />
        <label>
          Qualification:
          <input
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </label>
        <br />
        <label>
          Major:
          <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Doctorsignup;
