import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CalmaSpotlight = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".calma-content > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="calma" ref={sectionRef} className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,90,50,0.15),transparent_70%)]" />
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="calma-content">
          <div className="inline-block border border-white/10 rounded-full px-4 py-1 mb-6">
            <span className="text-sm tracking-widest uppercase font-medium bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
              Introducing Calma
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
            The World's First AI-Powered Reputation Intelligence.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Built exclusively for hospitality. It doesn't just collect feedback—it understands sentiment, predicts perception, and turns every guest interaction into strategic intelligence.
          </p>
          <ul className="space-y-4 mb-10">
            {['24/7 Monitoring', '7min avg reply time', '60-day rating guarantee'].map((feature, i) => (
              <li key={i} className="flex items-center space-x-3 text-sm font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button className="border border-white/20 px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition-colors">
            Discover Calma
          </button>
        </div>
        
        <div className="calma-content relative">
          <div className="aspect-square rounded-3xl bg-gradient-to-tr from-[#1a1810] to-[#2d2a1c] border border-white/5 shadow-2xl overflow-hidden p-8 flex flex-col justify-between">
            <div className="flex justify-between items-center opacity-50">
              <span className="font-mono text-xs">CALMA_SYSTEM_v1.0</span>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            
            <div className="space-y-4">
              <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/5 transform -rotate-2">
                <div className="text-xs text-muted-foreground mb-1">New Review • 3 mins ago</div>
                <div className="text-sm">"The ambiance was okay, but service was slow."</div>
                <div className="mt-3 text-xs text-primary/80 font-mono">→ GENERATING EMPATHETIC RESPONSE...</div>
              </div>
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10 transform rotate-1 translate-x-4">
                <div className="text-xs text-primary mb-1">Calma Auto-Reply</div>
                <div className="text-sm text-gray-300">"We appreciate your honest feedback. We're looking into our service speed to ensure your next visit is flawless..."</div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 flex justify-between items-end">
              <div>
                <div className="text-3xl font-bold text-white">4.8★</div>
                <div className="text-xs text-muted-foreground">Avg Rating</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">12k+</div>
                <div className="text-xs text-muted-foreground">Replies / mo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalmaSpotlight;
