import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Routes, Route } from "react-router-dom"
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Appointments from  "./components/Appointments";
import Treatments from "./components/Treatments";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import Modal from "./components/Modal"
import './App.css';
import Patientsignup from "./components/Patientsignup";
import Doctorsignup from "./components/Doctorsignup";
import Getdetails from "./components/Getdetails";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Doctorbook from "./components/Doctorbook";
import DoctorAppointments from "./components/DoctorAppointments";
import Patientbook from "./components/Patientbook";
import Medications from "./components/Medications.jsx";
import Icon from "./components/PatientIcon";
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        let signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer)
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not connected")
      }
    };
    provider && loadProvider()
  }, []);
  return (
    <>
    <Navbar/>
      <h1>Electronic Health Record System</h1>
      <br></br>
      <p>Account:{account ? account : "Not Connected"}</p>
      <br></br>
      {/* <FileUpload account={account} provider={provider} contract={contract}/>
    <Display account={account} contract={contract} /> */}

      <Routes>
        <Route exact path="/" element={<HomePage account={account} contract={contract} provider={provider} />} />
        <Route path="/fileupload" element={<><FileUpload account={account} provider={provider} contract={contract} />
          <Display account={account} contract={contract} /></>} />
        <Route exact path="/signup" element={<SignUp account={account} contract={contract} provider={provider} />} />
        <Route exact path="/signin" element={<SignIn account={account} contract={contract} provider={provider} />} />
        <Route exact path="/patientsignup" element={<Patientsignup account={account} contract={contract} provider={provider} />} />
        <Route exact path="/doctorsignup" element={<Doctorsignup account={account} contract={contract} provider={provider} />} />
        <Route exact path="/details" element={<Getdetails account={account} contract={contract} provider={provider} />} />
        <Route exact path="/booking" element={<Doctorbook account={account} contract={contract} />} />
        <Route exact path="/patientbooking" element={<Patientbook account={account} contract={contract} />} />
        <Route exact path="/medications" element={<Medications account={account} contract={contract} />} />
        <Route exact path="/appointments" element={<Appointments account={account} contract={contract} />} />
        <Route exact path="/patientappointments" element={<DoctorAppointments account={account} contract={contract} />} />
        <Route exact path="/icons" element={<Icon account={account} contract={contract} />} />
        <Route exact path="/treatments" element={<Treatments account={account} contract={contract} />} />
      </Routes>
    </>
  );
}
export default App;