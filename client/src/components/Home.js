import React from 'react';
import './home.css';
import backgroundImg from '../Assets/backgroundimage.jpg';

function Home() {
  return (
    <div className="container">
      <header>
        
        <nav>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Welcome to our EHR system</h2>
            <p>Please select your role to login or sign up</p>
            <div className="buttons">
              <button>Doctor Login</button>
              <button>Patient Login</button>
              <button>Doctor Sign Up</button>
              <button>Patient Sign Up</button>
            </div>
          </div>
        </section>
        <section className="features">
          <h3>Key Features</h3>
          <ul>
            <li>Electronic Health Records (EHRs)</li>
            <li>Secure Messaging</li>
            <li>Appointment Scheduling</li>
            <li>Prescription Management</li>
            <li>Billing and Claims</li>
          </ul>
        </section>
        <section className="about">
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget eros quam. Cras non tortor non magna consectetur gravida eu vel felis.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Electronic Health Record System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
