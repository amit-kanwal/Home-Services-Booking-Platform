import Navbar from "../../components/Navbar/Navbar";
import Footer from '../../components/Footer/Footer'
import './About.css'

function About() {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <h1>About Us</h1>
        <p>
          Servease is a modern home service booking platform built to simplify everyday living. We connect customers with trusted and verified professionals for a wide range of household services — all through a seamless digital experience. In today’s fast-paced world, finding reliable service providers can be time-consuming and uncertain. Servease eliminates that hassle by offering a centralized platform where quality, safety, and convenience come together. Whether it’s urgent repairs or routine maintenance, we ensure that help is always just a few clicks away.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify home maintenance by creating a seamless and reliable digital platform where customers can easily book trusted professionals anytime, anywhere. We aim to eliminate the stress of searching for skilled service providers by ensuring quality, transparency, and timely service delivery. Through technology and efficient service management, we strive to provide a smooth booking experience, fair pricing, and dependable customer support that builds long-term trust with our users.
        </p>
        <h2>What We Offer</h2>
          <ul className="list-items">
            <li>Easy Online Booking</li>
            <li>Compare providers online</li>
            <li>Transparent Princing</li>
            <li>Multiple Service Category</li>
          </ul>

        <h2>What to choose us?</h2>
          <ul className="list-items">
            <li>User Friendly Platform</li>
            <li>Good User Experience</li>
            <li>Quick Response Time</li>
            <li>Secure and Safe Service Experience</li>
          </ul>
        <h2>Our Vision</h2>
        <p id='last-para'>
          Our vision is to become a trusted and widely recognized home service platform that transforms the way people manage household needs. We aspire to create a system where convenience, safety, and quality service are accessible to everyone. By continuously improving our platform and expanding our service network, we aim to contribute to smarter living and create meaningful opportunities for skilled professionals in the service industry.
        </p>
      </div>
      <Footer/>
    </>
  );
}

export default About;
