'use client'; 

import { useState } from 'react';
import Image from 'next/image';



interface Slide {
  path: string;
  alt: string
};

export default function HomePage() {

const [sliderCounter, setCounter] = useState(0);

const sliderData: Slide[] = [
  {path: '/img/discount_galaxy_s21.jpg', alt: 'galaxy s21'},
  {path: '/img/discount_iphone_16.jpg', alt: 'iphone 16'},
  {path: '/img/discount_jbl.jpg', alt: 'jbl headphones'}
];

const slide: Slide = sliderData[sliderCounter];



  return (
    <div className="slider-container">
      <h1 className="discounts-head">Discounts</h1>

      <div className="discount-slider">

          <button className="slider-btn-left" 
            onClick={() => setCounter(prev => prev === 0 ? 2 : prev - 1)}
          />
                        
          <Image 
            src={slide.path}
            className="discount-img"  
            alt={slide.alt} 
            width={700} height={350} 
            priority
          />
          
          <button className="slider-btn-right" 
            onClick={() => setCounter(prev => prev === 2 ? 0 : prev + 1)}
          />
      </div>
    </div>
  );
};

