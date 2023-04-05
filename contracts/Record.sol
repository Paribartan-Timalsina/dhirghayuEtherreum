// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Record {
    
    struct Patients{

        string name;
        uint phone;
        string gender;
        string dob;
        uint height;
        uint weight;
        string houseaddr;
        string bloodgroup;
        string allergies;
        string medication;
        string emergencyName;
        string emergencyContact;
        //address addr;
        //uint date;
    }

    struct Doctors{
        string ic;
        string name;
        uint phone;
        string gender;
        string dob;
        string qualification;
        string major;
        //address addr;
        //uint date;
    }

    struct Appointments{
        address doctoraddr;
        address patientaddr;
        string date;
        string time;
        string prescription;
        string description;
        string diagnosis;
        string status;
        uint creationDate;
    }
    
    address public owner;
    address[] public patientList;
    address[] public doctorList;
    address[] public appointmentList;

    mapping(address => Patients) patients;
    mapping(address => Doctors) doctors;
    mapping(address => Appointments) appointments;
    mapping(address => bytes32) hashedDetails;
    mapping(address=>mapping(address=>bool)) isApproved;
    mapping(address => bool) isPatient;
    mapping(address => bool) isDoctor;
    mapping(address => uint) AppointmentPerPatient;

    uint256 public patientCount = 0;
    uint256 public doctorCount = 0;
    uint256 public appointmentCount = 0;
    uint256 public permissionGrantedCount = 0;
    
    constructor()  {
        owner = msg.sender;
    }
    function getPatientDetails() public view returns (Patients memory ) {
   // bytes32 detailsHash = hashedDetails[userAddress];
    //( Patients memory p) = abi.decode(abi.encode(detailsHash), (Patients ));
   
    return patients[msg.sender];
} 
    //Retrieve patient details from user sign up page and store the details into the blockchain
    // function setPatientDetails( string memory _name, uint _phone, string  memory _gender, string memory _dob, uint _height, uint _weight, string memory _houseaddr, string memory _bloodgroup, string memory _allergies, string memory _medication, string memory _emergencyName, string memory _emergencyContact) public {
    //     require(!isPatient[msg.sender]);
    //     //  p = patients[msg.sender];
       
    //     // p.ic = _ic;
    //     Patients memory p=Patients(_name,_phone,_gender,_dob,_height,_weight,_houseaddr,_bloodgroup,_allergies,_medication,_emergencyName,_emergencyContact);
    // patients[msg.sender]=p;
    //     // p.name = _name;
    //     // p.phone = _phone;
    //     // p.gender = _gender;
    //     // p.dob = _dob;
    //     // p.height = _height; 
    //     // p.weight = _weight;
    //     // p.houseaddr = _houseaddr;
    //     // p.bloodgroup = _bloodgroup;
    //     // p.allergies = _allergies;
    //     // p.medication = _medication;
    //     // p.emergencyName = _emergencyName;
    //     // p.emergencyContact = _emergencyContact;
    //     // p.addr = msg.sender;
    //     // p.date = block.timestamp;
    //     bytes32 detailsHash = keccak256(abi.encode(p));
    // hashedDetails[msg.sender] = detailsHash;
    //     patientList.push(msg.sender);
    //     isPatient[msg.sender] = true;
    //     isApproved[msg.sender][msg.sender] = true;
    //     patientCount++;
    // }
    //Now we get the details
    function setPatientDetails(Patients memory _p) public {
        require(!isPatient[msg.sender]);
        //  p = patients[msg.sender];
       
        // p.ic = _ic;
       // Patients memory p=Patients(_p.name,_p.phone,_p.gender,_p.dob,_p.height,_p.weight,_p.houseaddr,_p.bloodgroup,_p.allergies,_p.medication,_p.emergencyName,_p.emergencyContact);
    Patients memory p;
    
        p.name = _p.name;
        p.phone = _p.phone;
        p.gender = _p.gender;
        p.dob = _p.dob;
        p.height = _p.height; 
        p.weight = _p.weight;
        p.houseaddr = _p.houseaddr;
        p.bloodgroup = _p.bloodgroup;
        p.allergies = _p.allergies;
        p.medication = _p.medication;
        p.emergencyName = _p.emergencyName;
        p.emergencyContact = _p.emergencyContact;
        // p.addr = msg.sender;
        // p.date = block.timestamp;
        patients[msg.sender]=_p;
        bytes32 detailsHash = keccak256(abi.encode(p));
    hashedDetails[msg.sender] = detailsHash;
        patientList.push(msg.sender);
        isPatient[msg.sender] = true;
        isApproved[msg.sender][msg.sender] = true;
        patientCount++;
    }
    //Allows patient to edit their existing record
    // function editDetails(string _ic, string _name, string _phone, string _gender, string _dob, string _height, string _weight, string _houseaddr, string _bloodgroup, string _allergies, string _medication, string _emergencyName, string _emergencyContact) public {
    //     require(isPatient[msg.sender]);
    //     var p = patients[msg.sender];
        
    //     p.ic = _ic;
    //     p.name = _name;
    //     p.phone = _phone;
    //     p.gender = _gender;
    //     p.dob = _dob;
    //     p.height = _height; 
    //     p.weight = _weight;
    //     p.houseaddr = _houseaddr;
    //     p.bloodgroup = _bloodgroup;
    //     p.allergies = _allergies;
    //     p.medication = _medication;
    //     p.emergencyName = _emergencyName;
    //     p.emergencyContact = _emergencyContact;
    //     p.addr = msg.sender;    
    // }
//  function getdoctorDetails(address userAddress) public view returns (string memory ,  uint , string  memory , string memory ,  string  memory , string memory ) {
//     bytes32 detailsHash = hashedDetails[userAddress];
//     (string memory _name,  uint _phone, string  memory _gender, string memory _dob,string memory _qualification,string memory _major ) = abi.decode(abi.encodePacked(detailsHash), (string  ,  uint , string   , string  ,  string   , string ));
//     return (_name,_phone,_gender,_dob,_qualification,_major);
// }
 function getDoctorDetails() public view returns (Doctors memory ) {
   // bytes32 detailsHash = hashedDetails[userAddress];
    //( Patients memory p) = abi.decode(abi.encode(detailsHash), (Patients ));
   
    return doctors[msg.sender];
} 
//     //Retrieve patient details from doctor registration page and store the details into the blockchain
    function setdoctorDetails( Doctors memory _d) public {
        require(!isDoctor[msg.sender]);
        // var d = doctors[msg.sender];
        Doctors memory d;
        d.ic = _d.ic;
        d.name = _d.name;
        d.phone = _d.phone;
        d.gender = _d.gender;
        d.dob = _d.dob;
        d.qualification = _d.qualification;
        d.major = _d.major;
        doctors[msg.sender]=d;
        // d.addr = msg.sender;
        // d.date = block.timestamp;
      //   bytes32 detailsHash = keccak256(abi.encodePacked(_name, _phone, _gender,_dob,_qualification,_major));
    //hashedDetails[msg.sender] = detailsHash;
        doctorList.push(msg.sender);
        isDoctor[msg.sender] = true;
        doctorCount++;
    }

    //Allows doctors to edit their existing profile
    // function editDoctor(string _ic, string _name, string _phone, string _gender, string _dob, string _qualification, string _major) public {
    //     require(isDoctor[msg.sender]);
    //     var d = doctors[msg.sender];
        
    //     d.ic = _ic;
    //     d.name = _name;
    //     d.phone = _phone;
    //     d.gender = _gender;
    //     d.dob = _dob;
    //     d.qualification = _qualification;
    //     d.major = _major;
    //     d.addr = msg.sender;
    // }

    //Retrieve appointment details from appointment page and store the details into the blockchain
    // function setAppointment(address _addr, string _date, string _time, string _diagnosis, string _prescription, string _description, string _status) public {
    //     require(isDoctor[msg.sender]);
    //     var a = appointments[_addr];
        
    //     a.doctoraddr = msg.sender;
    //     a.patientaddr = _addr;
    //     a.date = _date;
    //     a.time = _time;
    //     a.diagnosis = _diagnosis;
    //     a.prescription = _prescription; 
    //     a.description = _description;
    //     a.status = _status;
    //     a.creationDate = block.timestamp;

    //     appointmentList.push(_addr);
    //     appointmentCount++;
    //     AppointmentPerPatient[_addr]++;
    // }
    
    //Retrieve appointment details from appointment page and store the details into the blockchain
    // function updateAppointment(address _addr, string _date, string _time, string _diagnosis, string _prescription, string _description, string _status) public {
    //     require(isDoctor[msg.sender]);
    //     var a = appointments[_addr];
        
    //     a.doctoraddr = msg.sender;
    //     a.patientaddr = _addr;
    //     a.date = _date;
    //     a.time = _time;
    //     a.diagnosis = _diagnosis;
    //     a.prescription = _prescription; 
    //     a.description = _description;
    //     a.status = _status;
    // }
    
    //Owner of the record must give permission to doctor only they are allowed to view records
    function givePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = true;
        permissionGrantedCount++;
        return true;
    }

    //Owner of the record can take away the permission granted to doctors to view records
    function RevokePermission(address _address) public returns(bool success) {
        isApproved[msg.sender][_address] = false;
        return true;
    }

    //Retrieve a list of all patients address
    function getPatients() public view returns(address[] memory) {
        return patientList;
    }

    //Retrieve a list of all doctors address
    function getDoctors() public view returns(address[] memory) {
        return doctorList;
    }

    //Retrieve a list of all appointments address
    function getAppointments() public view returns(address[] memory) {
        return appointmentList;
    }
    
    //Search patient details by entering a patient address (Only record owner or doctor with permission will be allowed to access)
    // function searchPatientDemographic(address _address) public view returns(string, string, string, string, string, string, string) {
    //     require(isApproved[_address][msg.sender]);
        
    //     var p = patients[_address];
        
    //     return (p.ic, p.name, p.phone, p.gender, p.dob, p.height, p.weight);
    // }

    //Search patient details by entering a patient address (Only record owner or doctor with permission will be allowed to access)
    // function searchPatientMedical(address _address) public view returns(string, string, string, string, string, string) {
    //     require(isApproved[_address][msg.sender]);
        
    //     var p = patients[_address];
        
    //     return (p.houseaddr, p.bloodgroup, p.allergies, p.medication, p.emergencyName, p.emergencyContact);
    // }

    //Search doctor details by entering a doctor address (Only doctor will be allowed to access)
    // function searchDoctor(address _address) public view returns(string, string, string, string, string, string, string) {
    //     require(isDoctor[_address]);
        
    //     var d = doctors[_address];
        
    //     return (d.ic, d.name, d.phone, d.gender, d.dob, d.qualification, d.major);
    // }
    
    //Search appointment details by entering a patient address
    // function searchAppointment(address _address) public view returns(address, string, string, string, string, string, string, string) {
    //     var a = appointments[_address];
    //     var d = doctors[a.doctoraddr];

    //     return (a.doctoraddr, d.name, a.date, a.time, a.diagnosis, a.prescription, a.description, a.status);
    // }

    //Search patient record creation date by entering a patient address
    // function searchRecordDate(address _address) public view returns(uint) {
    //     var p = patients[_address];
        
    //     return (p.date);
    // }

    //Search doctor profile creation date by entering a patient address
    // function searchDoctorDate(address _address) public view returns(uint) {
    //     var d = doctors[_address];
        
    //     return (d.date);
    // }

    //Search appointment creation date by entering a patient address
    // function searchAppointmentDate(address _address) public view returns(uint) {
    //     var a = appointments[_address];
        
    //     return (a.creationDate);
    // }

    //Retrieve patient count
    function getPatientCount() public view returns(uint256) {
        return patientCount;
    }

    //Retrieve doctor count
    function getDoctorCount() public view returns(uint256) {
        return doctorCount;
    }

    //Retrieve appointment count
    function getAppointmentCount() public view returns(uint256) {
        return appointmentCount;
    }

    //Retrieve permission granted count
    function getPermissionGrantedCount() public view returns(uint256) {
        return permissionGrantedCount;
    }

    //Retrieve permission granted count
    function getAppointmentPerPatient(address _address) public view returns(uint256) {
        return AppointmentPerPatient[_address];
    }
}