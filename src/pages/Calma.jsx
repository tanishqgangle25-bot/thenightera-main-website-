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
    description: 'Calma helps restaurant teams understand guest feedback, spot recurring themes, and choose practical service improvements.',
    creator: {
      '@type': 'Organization',
      name: 'thenightera',
      url: 'https://www.thenightera.tech',
    },
  }

  return (
    <div className="calma-web-wrapper">
      <SEOHead
        title="Calma | Restaurant Feedback Intelligence"
        description="Calma helps restaurant teams spot guest feedback patterns, understand recurring issues, and decide what to improve next."
        path="/calma"
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
