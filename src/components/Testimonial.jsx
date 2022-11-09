import React from 'react'
import SectionHeader from './SectionHeader'
import TestimonialCard from './TestimonialCard'

const Testimonial = () => {
  return (
    <div className="px-5 md:px-[40px] py-10 xl:py-20 2xl:px-[100px]">
      <SectionHeader title="What people say about us" subtitle="testimonials" />
      <div className="grid md:grid-cols-3 gap-4">
        <TestimonialCard
          image="https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          name="Lanre"
          jobtitle="Web Developer"
          review="I was able to get a short stay apartment in a matter of days, this is very efficient. I highly recommend"
          location="Lagos"
        />
        <TestimonialCard
          image="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          name="Becky"
          jobtitle="Fashion Designer"
          review="I'd say this is a very decent platform, my friends and I were able to get a place in a matter of days"
          location="Ibadan"
        />
        <TestimonialCard
          image="https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          name="Lanre"
          jobtitle="Web Developer"
          review="I was able to get a short stay apartment in a matter of days, this is very efficient. I highly recommend"
          location="Lagos"
        />
      </div>
    </div>
  );
}

export default Testimonial