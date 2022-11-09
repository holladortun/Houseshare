import React from 'react'
import SectionHeader from './SectionHeader';

const Whyus = () => {
  return (
    <div>
      <div className="px-5 md:px-[40px] bg-lightbg py-10 lg:flex lg:gap-10 lg:py-20  2xl:px-[100px] lg:items-center">
        <div className="lg:w-[50%]">
          <img
            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="rounded-lg w-full  object-cover  hidden lg:block"
          />
        </div>
        <div className="lg:w-[50%]">
          <SectionHeader title="What we offer" subtitle="Why choose us" />
          <img
            src="https://images.pexels.com/photos/3797991/pexels-photo-3797991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="rounded-lg w-full h-[250px] object-cover mb-8 lg:hidden"
          />
          <p className="mb-10">
            We know it can be such a hassle to look for a short-time space to
            stay on those really important trips. We bring to you Houseshare,
            your best choice to get short-time aparments with ease. Own an
            apartment you would like to share with someone for a short time?
            Houseshare is your answer.
          </p>
          <a href="#" className="btnmd mt-8">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default Whyus