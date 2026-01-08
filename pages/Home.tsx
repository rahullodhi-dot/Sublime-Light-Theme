import React from 'react';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ProductGallery } from '../components/ProductGallery';
import { GiftingSection } from '../components/GiftingSection';
import { StorySection } from '../components/StorySection';
import { ProcessSection } from '../components/ProcessSection';
import { Testimonials } from '../components/Testimonials';
import { SectionDivider } from '../components/SectionDivider';
import {ShowcaseSection} from '../components/BestSeller';
import CubePage from '@/components/CubePage';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      
      {/* Chapter 1: Identity */}
      <AboutSection />
      
     
      
      {/* Chapter 2: The Products */}
      <ProductGallery />


      {/* 3d */}
      
      {/* <SectionDivider variant="botanical" /> */}
      
      {/* Chapter 3: The Why (Story) */}
      <ShowcaseSection/>
      <StorySection />
      
      {/* Chapter 4: Celebration (Moved here) */}
      {/* Seamless flow from Story into Gifting, dark-to-dark transition handled in section or divider */}
      <GiftingSection />
      
      {/* <SectionDivider variant="gradient" /> */}
      
      {/* Chapter 5: The How */}
      <ProcessSection />
      
      {/* <SectionDivider variant="ornate" /> */}
      
      {/* Chapter 6: Social Proof */}
      <Testimonials />
      {/* <CubePage/>? */}
    </>
  );
};