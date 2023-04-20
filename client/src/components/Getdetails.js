import React, { useState } from 'react';
import { BigNumber } from 'bignumber.js';

const Getdetails = ({ account, contract, provider }) => {
  const [details, setDetails] = useState([]);
  const [error, setError] = useState('');

  const handleGetDetails = async () => {
    try {
      console.log(account);

      const isPatient = await contract.isPatients(account);
      const isDoctor = await contract.isDoctors(account);

      console.log(isPatient);
      console.log(isDoctor);

      if (isPatient) {
        const patientDetails = await contract.getPatientDetails();
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

  return (
    <div className="dark-theme">
      <button onClick={handleGetDetails}>Get Details</button>
      {error && <div>{error}</div>}
      {details &&
        Array.isArray(details) &&
        details.map((detail, index) => (
          <div key={index}>
            {typeof detail === 'string'
              ? detail.replace(/^"(.*)"$/, '$1')
              : JSON.stringify(detail)}
          </div>
        ))}
    </div>
  );
};

export default Getdetails;
