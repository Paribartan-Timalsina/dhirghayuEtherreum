import Upload from "./artifacts/contracts/Upload.sol/Upload.json"
import {useState,useEffect} from "react";
import {ethers} from "ethers";
import {Routes,Route} from "react-router-dom"
import FileUpload from "./components/FileUpload";
import Display from "./components/Display"

import Modal from "./components/Modal"
import './App.css';
import Patientsignup from "./components/Patientsignup";
import Doctorsignup from "./components/Doctorsignup";
import Getdetails from "./components/Getdetails";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
function App() {
  const [account,setAccount]=useState("");
  const[contract,setContract]=useState(null);
  const [provider,setProvider]=useState(null);
  const [modalOpen,setModalOpen]=useState(false);

  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider=async()=>{
      if(provider){

        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        });
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        });

        await provider.send("eth_requestAccounts",[]);
        let signer= provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress= "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract= new ethers.Contract(contractAddress,Upload.abi,signer)
        setContract(contract);
        setProvider(provider);
      }else{
        console.error("Metamask is not connected")
      }
    };
    provider && loadProvider()
  },[]);
  return (
    <>
    <h1>Electronic Health Record System</h1>
    <br></br>
    <p>Account:{account ? account:"Not Connected"}</p>
    <br></br>
    {/* <FileUpload account={account} provider={provider} contract={contract}/>
    <Display account={account} contract={contract} /> */}
    
    <Routes>
  <Route  path="/"  element={ <><FileUpload account={account} provider={provider} contract={contract}/>
    <Display account={account} contract={contract}/></>}/>
 <Route   exact path="/signup"  element={<SignUp account={account} contract={contract} provider={provider} />}/>
  <Route exact path="/signin" element={<SignIn account={account} contract={contract} provider={provider} />}/> 
  <Route exact path="/patientsignup" element={<Patientsignup account={account} contract={contract} provider={provider} />}/>
  <Route exact path="/doctorsignup" element={<Doctorsignup account={account} contract={contract} provider={provider} />}/>
  <Route exact path="/details" element={<Getdetails account={account} contract={contract} provider={provider} />}/>
 </Routes>
    </>
  );
}

export default App;
