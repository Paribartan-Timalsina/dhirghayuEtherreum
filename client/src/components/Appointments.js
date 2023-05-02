import React, { useEffect, useState } from 'react';
import axios from "axios"
import { BigNumber } from 'bignumber.js';
import { useNavigate } from "react-router-dom";
const Getdetails = ({ account, contract, provider }) => {
  const navigate = useNavigate();
  const[appointmentdates,setAppointmentdates]=useState([])
  const[ispatient,setaspatient]=useState()
  const[isdoctor,setasdoctor]=useState()
  const [details, setDetails] = useState([]);
  const [error, setError] = useState('');
  const [treatments, setTreatments] = useState([]);
  useEffect(()=>{
  //  handleGetDetails();
  },[])
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
        (await contract.getPatientName())
        setTreatments(patientdiagnosis)
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
        
        setError('You are neither a patient nor a doctor');
      }
    } catch (error) {
      setError(error.message);
    }
  };
function editdetails(){
  if(isdoctor){
  navigate("/doctorsignup")
  }
  else if(ispatient){
    navigate("/patientsignup")
  }
  else{
    window.alert("You are neither a patient nor a doctor")
  }
}
const cancelAppointment = async (appointmentDay) => {
    console.log(appointmentDay)
    try {
      const response = await axios.post('http://localhost:5000/deleteappointment', {
    
          appointmentDay
        ,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
  
      //console.log(response.data);
     // setAppointmentdates(response.data);
    } catch (error) {
      console.error(error);
    }
  };
    
const getAppointments=async()=>{
  try {
    console.log(details[0])
    const response = await axios.post('http://localhost:5000/getappointment', { patientname: details[0] }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log(response.data);
    setAppointmentdates(response.data);
  } catch (error) {
    console.error(error);
  }
  
}
  return (
    <div className="dark-theme">
      <button onClick={handleGetDetails}>Get Details</button>
      {error && <div>{error}</div>}
     
        {ispatient &&
        <>
        
        
         <div>
          <h2>My appointments</h2>
          <button onClick={getAppointments}>See Appointments</button>
         </div>
         <div>
         {appointmentdates.map(dates=>
            <>
            <h4>Doctorname:{dates.doctname}</h4>
            <h4>Appointment Day:{dates.appointmentday}</h4>
            <button onClick={()=>cancelAppointment(dates.appointmentday)}>Cancel this appointment</button>
            </>
         )}
         
         </div>
         </>
        }
       
        
       
    </div>
  );
};

export default Getdetails;
