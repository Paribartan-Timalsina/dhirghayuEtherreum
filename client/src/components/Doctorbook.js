import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import './Doctorbook.css';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BigNumber } from 'ethers';
import DoctorIcon from "./DoctorIcon"
function Doctorbook({account,contract}) {
 
  const [details, setDetails] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [name,setName]=useState('')
  const [major,setMajor]=useState('')
  useEffect(() => {
    getName()
    console.log(details[0])
     console.log(availableDates);
   }, [availableDates]);
  const getName=async ()=>{
    console.log(account)
    const isPatient = await contract.isPatients(account);
    const isDoctor = await contract.isDoctors(account);

    console.log(isPatient);
    console.log(isDoctor);

    if (isPatient) {
      const patientDetails = await contract.getPatientDetails();
      setName(patientDetails.name)

      const modifiedDetails = patientDetails.map((value) =>
        BigNumber.isBigNumber(value) ? value.toNumber() : value
      );
      setDetails(modifiedDetails);
    } else if (isDoctor) {
      const doctorDetails = await contract.getDoctorDetails();
      setName(doctorDetails[1]);
      setMajor(doctorDetails[6]);
      const modifiedDetails = doctorDetails.map((value) =>
        BigNumber.isBigNumber(value) ? value.toNumber() : value
      );
      setDetails(modifiedDetails);
    } else {
      console.log('You are neither a patient nor a doctor');
    }
  }

  function handleDateSelect(info) {
    // Get the selected date in the local time zone
    const selectedDate = new Date(info.start.valueOf() - info.start.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
    // Check if the selected date already exists in the array
    if (availableDates.includes(selectedDate)) {
      window.alert("The date is already selected")
      return;
    }
    // Add the selected date to the array of available dates
    setAvailableDates([...availableDates, selectedDate]);
  }
  
  
  
  

  const handleSaveAvailability = async () => {
    // // Send the selected date to the backend
    // const response = await fetch('/api/book', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ date: selectedDate })
    // });
    const res=await fetch(`http://localhost:5000/doctors`,{
      method:"POST",
      headers:{
          "Content-Type":"application/json",
          Accept:"application/json"
      },
      body: JSON.stringify({name:name,major:major, date: availableDates })
  })
    .then(response => {
      // Handle the response from the backend
      console.log("successful")
    })
    .catch(error => {
      // Handle any errors
      console.log(error)
    });
  }

  

  return (
    
    <div className="wrapper">
    <DoctorIcon/>
     <FullCalendar className='fc'
  plugins={[ dayGridPlugin, interactionPlugin ]}
  selectable={true}
  select={handleDateSelect}
  views={{
    month: {
      type: 'dayGridMonth',
      duration: { months: 3 },
      validRange: {
        start: new Date().toISOString().substr(0, 7),
        end: new Date().getFullYear() + 1 + '-01'
      }
    }
  }}
  defaultView="month"
/>

      <button onClick={handleSaveAvailability} className='btn'>Save Availability</button>
    </div>
  );
}

export default Doctorbook;
