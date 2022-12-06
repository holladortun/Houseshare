import React from 'react'
import About from '../components/About'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Popular from '../components/Popular'
import Testimonial from '../components/Testimonial'
import Trending from '../components/Trending'
import Whyus from '../components/Whyus'
import UploadApartments from '../components/UploadApartments'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Popular />
      <About />
      <Trending />
      <UploadApartments />
      <Whyus />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default Home