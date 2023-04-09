
import React, { useState } from "react";

const Patientsignup = ({account,contract,provider}) => {
    const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [houseaddr, setHouseaddr] = useState("");
  const [bloodgroup, setBloodgroup] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medication, setMedication] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

        const patientDetails = {
          name,
          phone,
          gender,
          dob,
          height,
          weight,
          houseaddr,
          bloodgroup,
          allergies,
          medication,
          emergencyName,
          emergencyContact,
        };

        await contract.setPatientDetails(patientDetails);
      
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        <br />
        <label>
          Date of Birth:
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <br />
        <label>
          Height:
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </label>
        <br />
        <label>
          Weight:
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <br />
        <label>
          House Address:
          <input type="text" value={houseaddr} onChange={(e) => setHouseaddr(e.target.value)} />
        </label>
        <br />
        <label>
          Blood Group:
          <input type="text" value={bloodgroup} onChange={(e) => setBloodgroup(e.target.value)} />
        </label>
        <br />
        <label>
          Allergies:
          <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
        </label>
        <br />
        <label>
          Medication:
          <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} />
        </label>
        <br />
        <label>
          Emergency Contact Name:
          <input
            type="text"
            value={emergencyName}
            onChange={(e) => setEmergencyName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Emergency Contact:
          <input
            type="number"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
 

  )
}

export default Patientsignup
