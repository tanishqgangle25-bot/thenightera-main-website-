import React, { useEffect } from 'react';
import Hero from '../components/calma/Hero.jsx'
import ImageMoments from '../components/calma/ImageMoments.jsx'
import TrustStrip from '../components/calma/TrustStrip.jsx'
import FeatureRail from '../components/calma/FeatureRail.jsx'
import Problem from '../components/calma/Problem.jsx'
import Guarantees from '../components/calma/Guarantees.jsx'
import StickyNotes from '../components/calma/StickyNotes.jsx'
import LatestRail from '../components/calma/LatestRail.jsx'
import Testimonials from '../components/calma/Testimonials.jsx'
import FounderNote from '../components/calma/FounderNote.jsx'
import FinalCTA from '../components/calma/FinalCTA.jsx'
import SEOHead from '../components/SEOHead'

export default function Calma() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calmaSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calma',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: 'https://heycalma.in',
    description: 'Calma is an AI-powered review management tool for restaurants in India. It automatically replies to Google, Zomato, and Swiggy reviews 24/7.',
    creator: {
      '@type': 'Organization',
      name: 'thenightera',
      url: 'https://thenightera.com',
    },
  }

  return (
    <div className="calma-web-wrapper">
      <SEOHead
        title="Calma — AI Review Management for Restaurants in India"
        description="Calma by thenightera automatically replies to Google, Zomato & Swiggy reviews 24/7. Save 20+ hours weekly. The best AI review tool for restaurants in India. Built in Indore."
        path="/calma"
        keywords="AI review management, restaurant review reply, Google review automation, Zomato review bot, Swiggy review management, calma AI, restaurant marketing indore"
        schema={calmaSchema}
      />
      <Hero />

      <ImageMoments />
      <TrustStrip />
      <FeatureRail />
      <Problem />
      <Guarantees />
      <StickyNotes />
      <LatestRail />
      <Testimonials />
      <FounderNote />
      <FinalCTA />
    </div>
  )
}
