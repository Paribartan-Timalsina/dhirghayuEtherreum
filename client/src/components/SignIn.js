import React from 'react'
import { useState,useEffect } from 'react'
import AuthValidation from "../utils/AuthValidation"
const SignIn = ({account,contract,provider}) => {
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [code,setCode]=useState("")
  const [sinedup,setSignedup]=useState(false)
 const onSignIn = async () => {
    //this.setState({ signedUp: false });
try{
//     if (name !== '' && password !== '' && code !== '') {
//        setName(name.trim());
//        setPassword(password.trim());
//        setCode(code.trim());
// let usernameToSend=name;        

//         //===
//         // if (password.length < 8) {
//         //     this.setState({
//         //         alertMessage: "at least 8 characters for password",
//         //         status: 'failed',
//         //         password: '',
//         //         digicode: '',
//         //     });
//             return;
//         }
         if (code.length !== 6) {
            // this.setState({
            //     alertMessage: "6 digit required for digicode",
            //     status: 'failed',
            //     digicode: ''
            // });
            return
        } else {
            let useraddress = await contract.getUserAddress()
              // .call({ from:account });

            if (useraddress == '0x0000000000000000000000000000000000000000') {
                // this.setState({
                //     alertMessage: 'this account already exists',
                //     status: 'failed',
                //     username: '',
                //     password: '',
                //     digicode: '',
               // });
window.alert("this account doesn't exists")
                return;
            } 
              else {
                let validated = await
                    AuthValidation(
                        name,
                        account,
                        password,
                        code,
                        provider,
                        contract
                    );

                if (!validated) {
                    // this.setState({
                    //     alertMessage: 'Incorrect log in',
                    //     status: 'failed',
                    //     username: '',
                    //     password: '',
                    //     digicode: '',
                    // });
                    window.alert("unable to login")
                    return
                } else {
                    // this.setState({
                    //     username: '',
                    //     password: '',
                    //     digicode: '',
                    //     status: 'success',
                    //     alertMessage: "Sign in successful",
                    //     loggedIn: true
                    // });

                    // this.props.userSignedIn(
                    //     this.state.loggedIn,
                    //     usernameToSend
                    // );
                    window.alert("Login successful")
                    
                    return;
                }
            }
        }
      }catch(e){
        window.alert(e)
      }
    }
    const signIn=(e)=>{
e.preventDefault()
onSignIn()
    }
  return (
    <>
      <form  onSubmit={signIn} >
        <input type="text" placeholder='Your Name' value={name} onChange={(e)=>{setName(e.target.value)}} ></input>
        <input type="password" placeholder='Your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} ></input>
        <input type='number' placeholder='Your Code ' value={code} onChange={(e)=>{setCode(e.target.value)}} ></input>
        <input type="submit" value="Login" className="btn btn-secondary btn-block login" />
      </form>
    </>
  )
}

export default SignIn
