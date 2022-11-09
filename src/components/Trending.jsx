import React from 'react'
import CityCard from './CityCard'
import SectionHeader from './SectionHeader';

const Trending = () => {
  return (
    <div className="px-5 md:px-[40px] py-10 lg:py-20  2xl:px-[100px]">
      <SectionHeader title="Most Popular Cities" subtitle="trending cities" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-9">
        <CityCard
          imagelink="https://guardian.ng/wp-content/uploads/2017/09/Lagos-City.jpg"
          city="Lagos"
        />
        <CityCard
          imagelink="https://cdn.vanguardngr.com/wp-content/uploads/2019/11/FCTA-1-e1577017557757.jpg"
          city="Abuja"
        />
        <CityCard
          imagelink="https://content.r9cdn.net/rimg/dimg/79/88/0abba836-city-24644-172728ab650.jpg?crop=true&width=1366&height=768&xhint=4341&yhint=1691"
          city="Ibadan"
        />
        <CityCard
          imagelink="https://media-cdn.tripadvisor.com/media/photo-s/07/9e/26/a9/general-view.jpg"
          city="Portharcourt"
        />
        <CityCard
          imagelink="https://i.pinimg.com/736x/be/b4/31/beb431987a998154082f9400fc4bdb03.jpg"
          city="Benin"
        />
        <CityCard
          imagelink="https://nairabrains.com/wp-content/uploads/2017/03/Jos-Plateau-State-580x319.jpg"
          city="Jos"
        />
      </div>
      <a href="#" className="btnmd mt-8">
        Get Started
      </a>
    </div>
  );
}

export default Trending