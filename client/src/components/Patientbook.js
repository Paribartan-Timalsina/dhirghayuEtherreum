import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from "axios"
import { Link } from 'react-router-dom';
function Patientbook({account,contract}) {
  useEffect(()=>{
    getDoctors();
    getDoctorsdates();
  },[])
  const [availableDates, setAvailableDates] = useState();
  const [doctors,setDoctors]=useState()
  const [doctorsdates,setDoctorsdates]=useState()
  const [state, setstate] = useState({
  query: '',
  list: []
    })
  const [name,setName]=useState('Paribartan Timalsina')
  const [email,setEmail]=useState('timalsinapari015@gmail.com')
  
  const handleChange = (e) => {
    if (!doctors) console.log("no data");
    const results = doctors.filter(post => {
      if (e.target.value === "") return doctors
      return post.name.toLowerCase().includes(e.target.value.toLowerCase())
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
  const getDoctorsdates=async ()=>{
    axios.get("http://localhost:5000/alldates",{
      method:"GET",
     headers: {
        "Content-Type":"application/json",
        Accept:"application/json"

      },
      credentials:"include"
    }).then((response=>{
      console.log(response.data)
      setDoctorsdates(response.data)
  
      
    }))
  }
    const handleSaveAvailability = async (info)=> {
    // Get the selected date in the local time zone
   // const selectedDate = new Date(info.start.valueOf() - info.start.getTimezoneOffset() * 60000).toISOString().substring(0, 10);
    const res=await fetch(`http://localhost:5000/appointment`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body: JSON.stringify({availableDates})
    })
      .then(response => {
        // Handle the response from the backend
        window.alert(response.data)
      })
      .catch(error => {
        // Handle any errors
        console.log(error)
      });
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
    setAvailableDates(selectedDate)
    console.log(selectedDate)
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
const details=await contract.getfulldetails(doctorname)
if(details[0]!==""){
  console.log(details)
}else{
  console.log(`${doctorname} is not registered as doctor`)
}

}
  
  return (
    <div>
     <form>
     <input onChange={handleChange} value={state.query} type="search"/>
  </form>
<ul>
{(state.query === '' ? "" : state.list.map(post => {
return <><button key={post.name} onClick={()=>getDoctordetails(post.name)}>{post.name}</button></>
}))}
</ul>


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

      <button onClick={handleSaveAvailability}>Check Availability</button>
    </div>
  );
}

export default Patientbook;
