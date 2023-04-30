import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Patientbook.css';
import logo from '../Assets/logo.png';
import interactionPlugin from '@fullcalendar/interaction';
import { BigNumber } from 'bignumber.js';
import axios from "axios"
import moment from "moment"
import { Link } from 'react-router-dom';
function Patientbook({account,contract}) {
  const [availableDates, setAvailableDates] = useState();
  const [doctors,setDoctors]=useState()
  const [doctorsdates,setDoctorsdates]=useState([])
  const [details,setDetails]=useState([])
  const [state, setstate] = useState({
  query: '',
  list: []
    })
  const [patientname,setPatientname]=useState('')
  const [doctorname,setDoctorname]=useState('')

  
    useEffect(()=>{
      getDoctors();
      },[])
    
  const handleChange = (e) => {
    if (!doctors) console.log("no data");
    const results = doctors.filter(post => {
      if (e.target.value === "") return doctors
      return post.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setstate({
      query: e.target.value,
      list: results
    })
}

  const getDoctors=async ()=>{
    axios.get("http://localhost:5000/allnames",{
      method:"GET",
     headers: {
        "Content-Type":"application/json",
        Accept:"application/json"

      },
      credentials:"include"
    }).then((response=>{
      console.log(response.data)
      setDoctors(response.data)
  
      
    }))
  }
  const getDoctorsdates=async (doctorname)=>{
    try {
      const response = await axios.post('http://localhost:5000/alldates', { name: doctorname }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      console.log(response.data);
      setDoctorsdates(response.data);
    } catch (error) {
      console.error(error);
    }
    
  
  }
    const handleSaveAvailability = async (info)=> {
      doctorsdates.map((dates)=>
      console.log(dates)
      )

const availability=doctorsdates.find((dates)=>

dates==availableDates
)
if(!availability){
 window.alert("The doctor hasn't scheduled this date")
}
else{
  console.log(doctorname)
  try {
    const response = await axios.post('http://localhost:5000/bookingschema', {
      doctname: doctorname,
      patientname: "prassiddha",
      appointmentday: availableDates
    });
    window.alert("Your booking has been successful");
  } catch (error) {
    console.log(error);
  }
  
  
}
    // Get the selected date in the local time zone
   // const selectedDate = new Date(info.start.valueOf() - info.start.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
    // const res=await fetch(`http://localhost:5000/appointment`,{
    //     method:"POST",
    //     headers:{
    //         "Content-Type":"application/json",
    //         Accept:"application/json"
    //     },
    //     body: JSON.stringify({availableDates,name:doctorname})
    // })
    //   .then(response => {
    //     // Handle the response from the backend
    //     window.alert(response.data)
        
    //   })

    //   .catch(error => {
    //     // Handle any errors
    //     console.log(error)
    //   });
    // Check if the selected date already exists in the array
    // if (availableDates.includes(selectedDate)) {
    //   window.alert("The date is already selected")
    //   return;
    // }
    // Add the selected date to the array of available dates
   // setAvailableDates([...availableDates, selectedDate]);
  }
  
  
  
  

  const handleDateSelect = async (info) => {
    const selectedDate = new Date(info.start.valueOf() - info.start.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
    const formattedDate = moment(selectedDate, "YYYY-MM-DD").format("MMM DD YYYY");
    setAvailableDates(formattedDate)
    console.log(formattedDate)
    // Send the selected date to the backend
    // const response = await fetch('/api/book', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ date: selectedDate })
    // });
//     const res=await fetch(`http://localhost:5000/appointment`,{
//       method:"POST",
//       headers:{
//           "Content-Type":"application/json",
//           Accept:"application/json"
//       },
//       body: JSON.stringify({name:name })
//   })
//     .then(response => {
//       // Handle the response from the backend
//       console.log("successful")
//     })
//     .catch(error => {
//       // Handle any errors
//       console.log(error)
//     });
  }
const getDoctordetails= async (doctorname)=>{
  console.log(doctorname)
  setDoctorname(doctorname)
  getDoctorsdates(doctorname);
  setPatientname(await contract.getPatientName())
 const doctorDetails= await contract.getfulldetails(doctorname)
 const modifiedDetails = doctorDetails.map((value) =>
 BigNumber.isBigNumber(value) ? value.toNumber() : value
);
setDetails(modifiedDetails);
if(details[1]!==""){
  console.log(details)
}else{
  console.log(`${doctorname} is not registered as doctor`)
}

}
  
  return (
    <div className='wrapper'>
        <div className='logo-img'>
          <img src={logo} className="Web-Logo" alt="logo" />
    </div>
    <h1>
      Doctor Booking
    </h1>
     <form className='searchbar'>
     <input onChange={handleChange} value={state.query} type="search" placeholder='Search Doctor'/>
  </form>
<ul>
{(state.query === '' ? "" : state.list.map(post => {
return <><button key={post} onClick={()=>getDoctordetails(post)}>{post}</button></>
}))}
</ul>
{ details &&
<div className='docdetails'>
<p>Meet Dr. {details[1]}, a highly qualified and experienced {details[2]} doctor with a
 specialization in {details[6]}. With a {details[5]} degree from a reputed institution, 
 Dr. {details[1]} has been practicing medicine for several years and has gained a wealth of
  knowledge and expertise in {details[6]}. Patients appreciate Dr. {details[1]}'s caring and compassionate 
  approach to healthcare, as well as their ability to communicate complex medical information in
   a clear and concise manner. If you're in need of medical attention, you can rest assured that
    you're in good hands with Dr.{details[1]}. Contact today to schedule an appointment and
     start your journey towards better health.</p>
     </div>
}

     <FullCalendar
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

      <button onClick={handleSaveAvailability}className='btn'>Check Availability</button>
    </div>
  );
}

export default Patientbook;
