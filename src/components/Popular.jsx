import React from 'react'
import PropertyCard from './PropertyCard'
import SectionHeader from './SectionHeader';

const Popular = () => {
  return (
    <div className="px-[20px] md:px-[40px]  2xl:px-[100px] py-10">
      <SectionHeader subtitle="featured" title="featured apartments" />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>

      <a href="#"></a>
    </div>
  );
}

export default Popular