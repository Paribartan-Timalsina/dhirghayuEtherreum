import React, { useState } from 'react'
import './display.css';
const Display = ({contract,account}) => {
  const [data,setData]=useState("");

  const getdata = async()=>{
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    //console.log("OtherAddress",Otheraddress)
    
    if(Otheraddress){
      dataArray=await contract.display(Otheraddress);
      console.log(dataArray)
    }else{
      console.log(contract);
      dataArray= await contract.display(account);
      console.log("DataArray",dataArray);

    }
    const isEmpty = Object.keys(dataArray).length===0;

    if(!isEmpty){
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    }
  };
  return (
    <div class='motherbox'>
    <div>{data}</div>
    <input type="text" className='address' placeholder='Enter Address'/>
    
    <button className='getdatabtn' onClick={getdata}>Get Data</button>
    </div>
  )
}

export default Display