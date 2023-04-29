import React, { useState } from 'react';
import { BigNumber } from 'bignumber.js';
import { useNavigate } from "react-router-dom";
const Getdetails = ({ account, contract, provider }) => {
  const navigate = useNavigate();
  const[ispatient,setaspatient]=useState()
  const[isdoctor,setasdoctor]=useState()
  const [details, setDetails] = useState([]);
  const [error, setError] = useState('');
  const [treatments, setTreatments] = useState([]);
  const handleGetDetails = async () => {
    try {
      console.log(account);

      const isPatient = await contract.isPatients(account);
      const isDoctor = await contract.isDoctors(account);
      setaspatient(isPatient)
      setasdoctor(isDoctor)
      console.log(isPatient);
      console.log(isDoctor);

      if (isPatient) {
        const patientDetails = await contract.getPatientDetails();
        const patientdiagnosis=await contract.getTreatments();
        console.log(patientdiagnosis)
        console.log(patientDetails)
        const modifiedDetails = patientDetails.map((value) =>
          BigNumber.isBigNumber(value) ? value.toNumber() : value
        );
        setDetails(modifiedDetails);
      } else if (isDoctor) {
        
        const doctorDetails = await contract.getDoctorDetails();
        console.log(doctorDetails)
        const modifiedDetails = doctorDetails.map((value) =>
          BigNumber.isBigNumber(value) ? value.toNumber() : value
        );
        setDetails(modifiedDetails);
      } else {
        const patientdiagnosis=await contract.getTreatments();
        console.log(patientdiagnosis)
        setTreatments(patientdiagnosis)
        console.log(treatments)
        setError('You are neither a patient nor a doctor');
      }
    } catch (error) {
      setError(error.message);
    }
  };
function editdetails(){
  navigate("/doctorsignup")
}
  const handleUpdateTreatmentStatus = async (diseases, status) => {
    try {
      await contract.updateTreatmentStatus(diseases, status);
      const patientTreatments = await contract.getTreatments();
      setTreatments(patientTreatments);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dark-theme">
      <button onClick={handleGetDetails}>Get Details</button>
      {error && <div>{error}</div>}
     
        {ispatient&&
        <div>
          <h3>Name:{details[0]}</h3>
          <h3>Phone number:{details[1]}</h3>
          <h3>Gender:{details[2]}</h3>
          <h3>Date of birth:{details[3]}</h3>
          <h3>Height:{details[4]}</h3>
          <h3>Weight:{details[5]}</h3>
          <h3>Blood Group:{details[6]}</h3>
          <h3>Emergency Name:{details[7]}</h3>
          <h3>Emergency Contact:{details[8]}</h3>
          <h3>Emergency Contact:{details[9]}</h3>
         </div>
        }
        {isdoctor &&
        <div>
          <h3>Name:{details[0]}</h3>
          <h3>Phone number:{details[1]}</h3>
          <h3>Gender:{details[2]}</h3>
          <h3>Date of birth:{details[3]}</h3>
          <h3>Qualificatiom:{details[4]}</h3>
          <h3>Major:{details[5]}</h3>
          <h3>Blood Group:{details[6]}</h3>
          
         </div>
        }
        <div>
        <h1>My Treatments</h1>
        {treatments.map((treatment, index) => (
          <div key={index}>
            <h2>Diseases: {treatment.diseases}</h2>
            <p>Medication: {treatment.medication}</p>
            <p>Status: {treatment.status ? "Cured" : "Not cured"}</p>
            <label>
              <input
                type="checkbox"
                checked={treatment.status}
                onChange={(e) => handleUpdateTreatmentStatus(treatment.diseases, e.target.checked)}
              />
              Mark as cured
            </label>
          </div>
        ))}
      </div>
        
        <button onClick={editdetails}>Edit details</button>
    </div>
  );
};

export default Getdetails;
