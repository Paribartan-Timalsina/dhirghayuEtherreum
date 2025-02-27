# Dirghayu - Blockchain-based Healthcare Platform

## Description

Dirghayu is a blockchain-powered web platform designed to enhance healthcare services by allowing doctors and patients to seamlessly book appointments, securely share medical records, and store health data in a decentralized manner. The platform leverages blockchain technology to ensure data integrity, security, and privacy while providing a user-friendly experience.

## Features

- **Decentralized medical record storage** for enhanced security.
- **Doctor-patient appointment booking** with real-time availability.
- **Secure sharing of medical details** using blockchain encryption.
- **Smart contract-powered transactions** for trust and transparency.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js
- **Blockchain**: Solidity, Hardhat, Ether.js
- **Wallet Integration**: MetaMask
- **Others**: JavaScript, Web3.js

## Installation & Execution

### 1. Clone the Repository

Clone the project repository and navigate to the project folder:

```sh
git clone https://github.com/Paribartan-Timalsina/dhirghayuEtherreum.git
cd dirghayu
```

### 2. Install Dependencies

Install the required dependencies:

```sh
npm install
```

### 3. Run the Development Blockchain

Start a local Hardhat blockchain network:

```sh
npx hardhat node
```

### 4. Deploy Smart Contracts

Deploy the smart contracts to the local network:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

### 5. Start the Web Application

Run the frontend application:

```sh
npm start
```

