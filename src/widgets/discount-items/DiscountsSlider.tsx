'use client'

import Image from 'next/image';
import Link from 'next/link';
import styles from './discounts-slider.module.scss';
import { sliderData } from './sliderData';
import { useState } from 'react';

interface Slide {
  imgPath: string,
  pageLink: string,
  name: string,
  currentPrice: number,
  prevPrice: number,
  alt: string
};

export default function DiscountsSlider() {
  const [sliderCounter, setCounter] = useState(0);
  
  const slide: Slide = sliderData[sliderCounter];

  return (
    <section>
      <h1 className={styles.discountsHead}>Discounts</h1>      
      <div className={styles.slider}>

        <button className={styles.sliderBtnLeft} 
            onClick={() => setCounter(prev => prev === 0 ? sliderData.length - 1 : prev - 1)}
        />

        <Link href={slide.pageLink} className={styles.slide}>

            <Image 
                src={slide.imgPath}
                className={styles.img}  
                alt={slide.alt} 
                width={700} height={350} 
                priority
            />

            <div className={styles.content}>
              <p className={styles.name}>{slide.name}</p>

              <div className={styles.priceWrapper}>
                <span className={styles.currentPrice}>{slide.currentPrice}$</span>
                <span className={styles.prevPrice}>{slide.prevPrice}$</span>
              </div>
            </div>


          
        </Link>         
          
        <button className={styles.sliderBtnRight} 
            onClick={() => setCounter(prev => prev === sliderData.length - 1 ? 0 : prev + 1)}
        />
      </div>
          
    </section>
  );
};