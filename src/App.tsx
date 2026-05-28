import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Star, MapPin, Clock, ArrowUpRight, ChevronDown, ChevronUp, Check } from 'lucide-react';
import toothImg from './assets/tooth.png';

// ── Scroll Reveal ──────────────────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string; dir?: 'up' | 'left' | 'right' | 'none' }> = ({
  children, delay = 0, className = '', dir = 'up'
}) => {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const init = dir === 'left' ? 'translate-x-10' : dir === 'right' ? '-translate-x-10' : dir === 'none' ? '' : 'translate-y-8';
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${init}`} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

// ── Navbar ─────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#about' },
    { label: 'OUR TREATMENTS', href: '#our-treatments' },
    { label: 'OUR CLINICS', href: '#our-clinics' },
    { label: 'CONTACT US', href: '#contact-us' },
  ];
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-3'}`} style={{ animation: 'fadeInDown 0.6s ease forwards' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
        <a href="#" className="flex items-center gap-0.5 flex-shrink-0">
          <span style={{ color: '#0099FF', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'Barlow Condensed, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>DENTA</span>
          <span style={{ color: '#222', fontWeight: 900, fontSize: '1.2rem', fontFamily: 'Barlow Condensed, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', marginLeft: '5px' }}>CARE</span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l, i) => (
            <a key={l.label} href={l.href}
              className="text-xs font-semibold tracking-wider transition-colors hover:text-blue-600"
              style={{ color: i === 0 ? '#FF5A1F' : '#444', fontFamily: 'Barlow, sans-serif' }}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="tel:[PHONE]" className="hidden md:flex items-center gap-2 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all duration-300 flex-shrink-0"
          style={{ background: '#FF5A1F', fontFamily: 'Barlow, sans-serif', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
          BOOK APPOINTMENT <ArrowUpRight size={14} />
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700 p-2">{open ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-5 flex flex-col gap-4">
          {links.map(l => <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-bold text-gray-800 text-base tracking-wider">{l.label}</a>)}
          <a href="tel:[PHONE]" className="text-white font-bold py-3 px-6 rounded-full text-center text-sm mt-2" style={{ background: '#FF5A1F' }}>BOOK APPOINTMENT</a>
        </div>
      )}
    </header>
  );
};

// ── Hero ───────────────────────────────────────────────────────────────────────
const Hero = () => (
  <div style={{
    background: '#C5E4F3',
    width: '100%',
    paddingTop: '80px',   /* navbar is ~60px fixed, add 20px breathing room */
    paddingBottom: '0',
    position: 'relative',
    overflow: 'visible',
  }}>

    {/* HERO CARD — 92% width, centered, rounded corners visible against blue bg */}
    <div style={{
      background: 'linear-gradient(120deg, #C5E8F9 0%, #D8F2FF 25%, #ECF8FF 50%, #FFFFFF 72%)',
      minHeight: '520px',
      width: '92%',
      maxWidth: '1350px',
      margin: '0 auto',
      borderRadius: '40px',
      position: 'relative',
      overflow: 'visible',  /* must be visible so tooth breaks out bottom */
      boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
      paddingTop: '40px',
      paddingBottom: '0',
    }}>

      {/* HEADLINE WATERMARK
          overflow:hidden on parent clips right-edge bleed
          font-size tuned so it fits inside the card width  */}
      <div style={{
        position: 'absolute',
        top: '5%',
        left: 0,
        right: 0,
        zIndex: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        textAlign: 'center',
        overflow: 'visible',
      }}>
        <span style={{
          display: 'block',
          fontSize: 'clamp(3rem, 7.2vw, 7.8rem)',
          fontWeight: 900,
          fontFamily: '"Barlow", "Arial Black", sans-serif',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          background: 'linear-gradient(90deg, #C6E7F9 0%, #4DD6FF 40%, #0AB8FD 70%, #00AAFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 1,
          whiteSpace: 'nowrap',
        }}>
          EVERY SMILE MATTERS
        </span>
      </div>

      {/* THREE-COLUMN GRID — locked widths, center is spacer for tooth */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '340px 1fr 220px',
        alignItems: 'flex-start',
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '170px 40px 0 40px',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 20 }}>
          <div style={{
            width: '100%',
            padding: '32px 28px',
            background: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.07)',
          }}>
            <p style={{
              margin: 0, padding: 0,
              lineHeight: 1.65, color: '#333333',
              fontFamily: 'Barlow, sans-serif',
              fontSize: '0.95rem', fontWeight: 500,
            }}>
              Our skilled dentists use advanced technology to offer complete care in a comfortable and friendly environment.
            </p>
          </div>

          <div style={{ paddingLeft: '8px' }}>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 500, fontSize: '0.82rem', color: '#999', margin: 0, lineHeight: 1.2 }}>
              We're Open
            </p>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 800, fontSize: '1rem', color: '#111', margin: '3px 0 0 0', lineHeight: 1.2 }}>
              10:00 AM – 07:00 PM
            </p>
          </div>

          <a href="tel:[PHONE]" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#FF5A1F', color: '#FFFFFF',
            fontFamily: 'Barlow, sans-serif', fontWeight: 800,
            fontSize: '0.8rem', letterSpacing: '0.07em',
            textTransform: 'uppercase' as const,
            padding: '15px 30px', borderRadius: '99px',
            textDecoration: 'none', width: 'max-content',
            boxShadow: '0 10px 28px rgba(255,87,34,0.35)',
          }}>
            BOOK APPOINTMENT <ArrowUpRight size={16} strokeWidth={3} />
          </a>
        </div>

        {/* CENTER — empty, tooth is absolute over it */}
        <div />

        {/* RIGHT STATS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', zIndex: 20 }}>
          {[
            { val: '150+', label: 'Expert Dentists' },
            { val: '20+',  label: 'Dental Clinics across UK' },
            { val: '03+',  label: 'Countries presence' },
          ].map((s, i) => (
            <div key={i}>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 900, fontSize: '2.8rem', color: '#FF5A1F', lineHeight: 1, margin: 0 }}>
                {s.val}
              </p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '0.88rem', color: '#444', marginTop: '6px', lineHeight: 1.3 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* TOOTH — top anchored so crown overlaps headline, 1100px width, roots bleed out bottom */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '960px',
        zIndex: 99,
        pointerEvents: 'none',
        marginBottom: '-200px',
      }}>
        <img
          src={toothImg}
          alt="3D Tooth"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            animation: 'floatUpDown 4s ease-in-out infinite',
            filter: 'drop-shadow(0 20px 30px rgba(0,100,220,0.28))',
          }}
        />
      </div>

    </div>

    {/* MARQUEE — z:5, tooth (z:99) overlaps */}
    <div style={{
      position: 'relative',
      zIndex: 5,
      width: '100%',
      background: '#D9F1FF',
      padding: '22px 0',
      marginTop: '0',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', animation: 'marquee 22s linear infinite', whiteSpace: 'nowrap' }}>
        {[...Array(3)].fill(['Braces','Denta Care','Dentist','Dentures','Implants','Whitening','Root Canal','Aligners','Veneers','Orthodontics']).flat().map((item: string, i: number) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '0 28px' }}>
            <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#111' }}>{item}</span>
            <span style={{ color: '#111', fontSize: '1.1rem', marginLeft: '28px', fontWeight: 300 }}>+</span>
          </span>
        ))}
      </div>
    </div>

  </div>
);

// ── About ──────────────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      {/* Top row */}
      <div className="flex flex-col lg:flex-row gap-16 items-start mb-12">
        <div className="w-full lg:w-5/12">
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 400, color: '#AAA', fontSize: '1.5rem' }}>About</p>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 700, color: '#111', fontSize: '2rem', lineHeight: 1.2 }}>Denta Care</p>
        </div>
        <div className="w-full lg:w-7/12">
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 700, color: '#FF5A1F', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '10px' }}>Our Vision</p>
          <p style={{ fontFamily: 'Barlow, sans-serif', color: '#444', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '420px' }}>
            At Denta Care, our vision is to blend advanced technology with compassionate care to create a welcoming space. We aim to inspire confident, healthy smiles through innovation and personalized treatment.
          </p>
          <div className="flex gap-2 mt-4">
            <span style={{ width: 28, height: 8, borderRadius: 99, background: '#FF5A1F', display: 'inline-block' }}/>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#DDD', display: 'inline-block' }}/>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#DDD', display: 'inline-block' }}/>
          </div>
        </div>
      </div>

      {/* Masonry photo grid — exact reference layout */}
      {/* Grid: 3 cols, 2 rows
          [img1: col1-2 row1] [img2: col3 row1-2]
          [img3: col1 row2 ] [img4: col2 row2  ]
      */}
      <div className="grid gap-3" style={{ gridTemplateColumns: '1.2fr 1fr 1fr', gridTemplateRows: '190px 195px' }}>

        {/* IMG 1 — top left wide, spans 2 cols */}
        <Reveal dir="left" className="relative rounded-2xl overflow-hidden shadow-md" style={{ gridColumn: '1 / 3', gridRow: '1' }}>
          <img src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800" alt="Dental Clinic" className="w-full h-full object-cover"/>
          <span className="absolute bottom-3 left-4 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: '#D3EFFF', color: '#333', fontFamily: 'Barlow, sans-serif' }}>Dental Care</span>
        </Reveal>

        {/* IMG 2 — right tall, spans 2 rows */}
        <Reveal delay={0.1} className="relative rounded-2xl overflow-hidden shadow-md" style={{ gridColumn: '3', gridRow: '1 / 3' }}>
          <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500" alt="Patient smiling" className="w-full h-full object-cover"/>
          {/* Vertical tag right edge */}
          <div className="absolute right-0 top-1/3 flex items-center justify-center" style={{ width: 24, height: 80, background: '#FBE9E7', borderRadius: '99px 0 0 99px' }}>
            <span style={{ fontFamily: 'Barlow', fontSize: '0.6rem', fontWeight: 600, color: '#444', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.05em' }}>Dentures</span>
          </div>
          {/* Teeth Alignment tag bottom */}
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap" style={{ background: '#D3EFFF', color: '#333', fontFamily: 'Barlow' }}>Teeth Alignment</span>
        </Reveal>

        {/* IMG 3 — bottom left portrait */}
        <Reveal delay={0.15} className="relative rounded-2xl overflow-hidden shadow-md" style={{ gridColumn: '1', gridRow: '2' }}>
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" alt="Patient" className="w-full h-full object-cover"/>
          {/* Vertical tag left edge */}
          <div className="absolute left-0 top-1/3 flex items-center justify-center" style={{ width: 24, height: 86, background: '#FBE9E7', borderRadius: '0 99px 99px 0' }}>
            <span style={{ fontFamily: 'Barlow', fontSize: '0.55rem', fontWeight: 600, color: '#444', writingMode: 'vertical-rl', letterSpacing: '0.04em' }}>Dental Treatments</span>
          </div>
        </Reveal>

        {/* IMG 4 — bottom right landscape */}
        <Reveal delay={0.2} className="relative rounded-2xl overflow-hidden shadow-md" style={{ gridColumn: '2', gridRow: '2' }}>
          <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500" alt="Clinic room" className="w-full h-full object-cover"/>
        </Reveal>

      </div>
    </div>
  </section>
);

// ── Treatments ─────────────────────────────────────────────────────────────────
const Treatments = () => {
  const list = [
    { name: 'Dental Cleaning', desc: 'Professional scaling and polishing for a healthy, bright foundation.', icon: '🦷' },
    { name: 'Dental Implants', desc: 'Permanent, natural-looking tooth replacements mapped digitally.', icon: '⚙️' },
    { name: 'Orthodontics', desc: 'Clear aligners and braces for a perfect, elegant smile.', icon: '😁' },
    { name: 'Root Canal', desc: 'Pain-free root canal therapy with advanced microscopic tech.', icon: '🔬' },
    { name: 'Teeth Whitening', desc: 'Professional laser whitening for instantly dazzling results.', icon: '✨' },
    { name: 'Smile Design', desc: 'Custom ceramic veneers tailored to your facial aesthetics.', icon: '🎨' },
  ];
  return (
    <section id="our-treatments" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-6">
          <div>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 400, color: '#AAA', fontSize: '1.5rem' }}>Available</p>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 700, color: '#111', fontSize: '2rem', lineHeight: 1.2 }}>Treatments</p>
          </div>
          <p style={{ fontFamily: 'Barlow, sans-serif', color: '#444', fontSize: '0.88rem', lineHeight: 1.8, maxWidth: '380px' }}>
            At Denta Care, we offer a wide range of treatments, from routine cleanings and fillings to advanced procedures like implants and cosmetic dentistry. Our goal is to provide personalized care for all your dental needs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((t, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="bg-gray-50 rounded-2xl p-7 border border-blue-50 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="text-3xl mb-4">{t.icon}</div>
                <h4 style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#111', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.name}</h4>
                <p style={{ fontFamily: 'Barlow, sans-serif', color: '#777', fontSize: '0.85rem', lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Stats ──────────────────────────────────────────────────────────────────────
const StatsBar = () => (
  <section className="py-14" style={{ background: 'linear-gradient(135deg, #1A7FC1, #0D5C8C)' }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { val: '15+', label: 'Years Experience' },
          { val: '10k+', label: 'Smiles Restored' },
          { val: '4.9★', label: 'Google Rating' },
          { val: '0%', label: 'EMI Available' },
        ].map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '2.8rem', color: 'white', lineHeight: 1 }}>{s.val}</p>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '0.75rem', color: '#93C5E8', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

// ── Doctor ─────────────────────────────────────────────────────────────────────
const Doctor = () => (
  <section className="py-20 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col lg:flex-row items-center gap-16">
      <Reveal dir="left" className="w-full lg:w-5/12">
        <div className="relative max-w-sm mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '3/4' }}>
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" alt="Dr. [DOCTOR NAME]" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl p-4 shadow-xl border border-blue-50">
            <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_,i)=><Star key={i} size={12} fill="#FF5A1F" color="#FF5A1F"/>)}</div>
            <p style={{ fontFamily:'Barlow',fontWeight:700,fontSize:'0.85rem',color:'#111' }}>4.9 Rating</p>
            <p style={{ fontFamily:'Barlow',fontSize:'0.75rem',color:'#888',marginTop:'2px' }}>500+ Reviews</p>
          </div>
        </div>
      </Reveal>
      <Reveal className="w-full lg:w-7/12" delay={0.15}>
        <p style={{ fontFamily:'Barlow',fontWeight:700,color:'#FF5A1F',fontSize:'0.8rem',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:'12px' }}>Meet The Expert</p>
        <h2 style={{ fontFamily:'Barlow Condensed',fontWeight:900,fontSize:'3rem',color:'#111',textTransform:'uppercase',lineHeight:1,marginBottom:'10px' }}>DR. [DOCTOR NAME]</h2>
        <p style={{ fontFamily:'Barlow',fontWeight:600,color:'#0099FF',fontSize:'0.78rem',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'20px' }}>Chief Dental Surgeon · 15+ Years Experience</p>
        <div className="flex gap-3 flex-wrap mb-6">
          {['BDS','MDS','IDA Member'].map(b=>(
            <span key={b} className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background:'#D3EFFF',color:'#0055AA',fontFamily:'Barlow' }}>{b}</span>
          ))}
        </div>
        <p style={{ fontFamily:'Barlow',color:'#666',fontSize:'0.9rem',lineHeight:1.8,maxWidth:'480px',marginBottom:'24px' }}>
          Renowned for a gentle touch and meticulous precision, Dr. [DOCTOR NAME] transforms both smiles and the clinical experience. Advanced global training combined with deep patient empathy ensures every procedure is comfortable, precise, and beautifully executed.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-xs">
          {['Pain-Free Treatment','Advanced Technology','Gentle Approach','Affordable EMI'].map(f=>(
            <div key={f} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:'#FF5A1F' }}>
                <Check size={10} color="white" strokeWidth={3}/>
              </div>
              <span style={{ fontFamily:'Barlow',fontSize:'0.82rem',fontWeight:600,color:'#555' }}>{f}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

// ── Reviews ────────────────────────────────────────────────────────────────────
const Reviews = () => {
  const reviews = [
    { name: 'Aditi Sharma', treatment: 'Smile Design', quote: 'The most painless, premium dental experience I\'ve ever had. Zero anxiety the entire time.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
    { name: 'Rahul Mehta', treatment: 'Implants', quote: 'I dreaded implants for years. Zero pain here. World-class technology and a genuinely caring team.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Neha Patel', treatment: 'Root Canal', quote: 'I was terrified. The team made it an astonishingly peaceful experience. Highly recommend.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200' },
  ];
  return (
    <section className="py-20" style={{ background:'#F5FBFF' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-12">
          <p style={{ fontFamily:'Barlow',fontWeight:400,color:'#AAA',fontSize:'1.2rem' }}>Patient Stories</p>
          <p style={{ fontFamily:'Barlow',fontWeight:700,color:'#111',fontSize:'2rem' }}>What They Say</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r,i)=>(
            <Reveal key={i} delay={i*0.1}>
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-blue-50 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex gap-1 mb-5">{[...Array(5)].map((_,j)=><Star key={j} size={13} fill="#FF5A1F" color="#FF5A1F"/>)}</div>
                <p style={{ fontFamily:'Barlow',color:'#666',fontSize:'0.88rem',lineHeight:1.75,flexGrow:1,marginBottom:'20px' }}>"{r.quote}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-blue-50">
                  <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover border-2" style={{ borderColor:'#D3EFFF' }}/>
                  <div>
                    <p style={{ fontFamily:'Barlow',fontWeight:700,fontSize:'0.85rem',color:'#111',textTransform:'uppercase',letterSpacing:'0.05em' }}>{r.name}</p>
                    <p style={{ fontFamily:'Barlow',fontWeight:600,fontSize:'0.72rem',color:'#FF5A1F',textTransform:'uppercase',letterSpacing:'0.08em',marginTop:'2px' }}>{r.treatment}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FAQ ────────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const faqs = [
    { q: 'Is treatment really pain-free?', a: 'Yes. We use ultra-fine needles, premium anesthetic gels, and computerized delivery systems for a completely painless experience.' },
    { q: 'What happens during a first consultation?', a: 'A thorough, unhurried examination using low-radiation 3D imaging. We walk you through your oral health transparently, answering every question.' },
    { q: 'Do you offer EMI options?', a: 'Absolutely. We offer 0% interest EMI options handled by our treatment team to make premium care accessible.' },
    { q: 'How are instruments sterilized?', a: 'Hospital-grade sterilization protocols. Every instrument undergoes Class-B autoclaving between each patient.' },
  ];
  const [openIdx, setOpenIdx] = useState<number|null>(0);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-12">
          <p style={{ fontFamily:'Barlow',fontWeight:400,color:'#AAA',fontSize:'1.2rem' }}>Got Questions?</p>
          <p style={{ fontFamily:'Barlow',fontWeight:700,color:'#111',fontSize:'2rem' }}>Frequently Asked</p>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f,i)=>(
            <Reveal key={i} delay={i*0.07}>
              <div className="rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor:'#E8F4FB' }}>
                <button onClick={()=>setOpenIdx(openIdx===i?null:i)} className="w-full px-7 py-5 flex justify-between items-center text-left">
                  <span style={{ fontFamily:'Barlow',fontWeight:700,fontSize:'0.95rem',color: openIdx===i ? '#FF5A1F':'#111', transition:'color 0.3s' }}>{f.q}</span>
                  <span style={{ color:'#FF5A1F', flexShrink:0, marginLeft:'16px' }}>{openIdx===i?<ChevronUp size={20}/>:<ChevronDown size={20}/>}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ${openIdx===i?'max-h-40 opacity-100':'max-h-0 opacity-0'}`}>
                  <p className="px-7 pb-5" style={{ fontFamily:'Barlow',color:'#777',fontSize:'0.875rem',lineHeight:1.75 }}>{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── CTA ────────────────────────────────────────────────────────────────────────
const CTABanner = () => (
  <section className="py-24 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0D5C8C,#1A7FC1,#2196D3)' }}>
    <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10" style={{ background:'radial-gradient(circle,#fff,transparent 70%)',transform:'translate(30%,-30%)' }}/>
    <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
      <Reveal>
        <h2 style={{ fontFamily:'Barlow Condensed',fontWeight:900,fontSize:'clamp(2.5rem,6vw,4.5rem)',color:'white',textTransform:'uppercase',lineHeight:1.05,marginBottom:'16px' }}>
          READY FOR A <span style={{ color:'#FF5A1F' }}>PERFECT SMILE?</span>
        </h2>
        <p style={{ fontFamily:'Barlow',color:'rgba(255,255,255,0.7)',fontSize:'1rem',marginBottom:'36px',maxWidth:'480px',marginInline:'auto' }}>Book your appointment today. Gentle, modern, and completely pain-free care.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:[PHONE]" className="inline-flex items-center justify-center gap-2 text-white font-bold text-sm px-10 py-4 rounded-full transition-all hover:-translate-y-0.5 shadow-xl"
            style={{ background:'#FF5A1F',fontFamily:'Barlow',letterSpacing:'0.06em',boxShadow:'0 8px 24px rgba(255,87,34,0.4)' }}>
            BOOK APPOINTMENT <ArrowUpRight size={16}/>
          </a>
          <a href="tel:[PHONE]" className="inline-flex items-center justify-center gap-2 font-bold text-sm px-10 py-4 rounded-full border transition-all hover:bg-white/10"
            style={{ color:'white',fontFamily:'Barlow',letterSpacing:'0.06em',borderColor:'rgba(255,255,255,0.3)' }}>
            <Phone size={15}/> CALL: [PHONE]
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

// ── Footer ─────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer id="contact-us" className="pt-16 pb-8" style={{ background:'#0A1628' }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-1 mb-5">
            <span style={{ color:'#0099FF',fontWeight:900,fontSize:'1.2rem',fontFamily:'Barlow Condensed,sans-serif',textTransform:'uppercase' }}>DENTA</span>
            <span style={{ color:'#FF5A1F',fontWeight:900,fontSize:'1.2rem',fontFamily:'Barlow Condensed,sans-serif',textTransform:'uppercase',marginLeft:'4px' }}>CARE</span>
          </div>
          <p style={{ fontFamily:'Barlow',color:'rgba(255,255,255,0.45)',fontSize:'0.85rem',lineHeight:1.75,marginBottom:'16px' }}>Advanced dental care in a comfortable environment right here in [CITY].</p>
          <a href="tel:[PHONE]" style={{ fontFamily:'Barlow',color:'white',fontWeight:700,letterSpacing:'0.05em' }}>[PHONE]</a>
        </div>
        <div>
          <h5 style={{ fontFamily:'Barlow',color:'white',fontWeight:700,fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'0.15em',marginBottom:'20px' }}>Quick Links</h5>
          <ul className="space-y-3">
            {['Home','About','Treatments','Our Clinics','Contact'].map(l=>(
              <li key={l}><a href="#" style={{ fontFamily:'Barlow',color:'rgba(255,255,255,0.45)',fontSize:'0.85rem',fontWeight:500 }} className="hover:text-orange-400 transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 style={{ fontFamily:'Barlow',color:'white',fontWeight:700,fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'0.15em',marginBottom:'20px' }}>Visit Us</h5>
          <div className="flex items-start gap-3 mb-4" style={{ color:'rgba(255,255,255,0.45)',fontSize:'0.85rem',fontFamily:'Barlow' }}>
            <MapPin size={15} style={{ color:'#FF5A1F',marginTop:'2px',flexShrink:0 }}/>[ADDRESS LINE 1],<br/>[ADDRESS LINE 2],<br/>[CITY]
          </div>
          <div className="flex items-center gap-3" style={{ color:'rgba(255,255,255,0.45)',fontSize:'0.85rem',fontFamily:'Barlow' }}>
            <Clock size={15} style={{ color:'#FF5A1F',flexShrink:0 }}/>Mon–Sat: 10AM–7PM
          </div>
        </div>
        <div>
          <h5 style={{ fontFamily:'Barlow',color:'white',fontWeight:700,fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'0.15em',marginBottom:'20px' }}>Services</h5>
          <ul className="space-y-3">
            {['Dental Implants','Teeth Whitening','Orthodontics','Root Canal','Smile Design'].map(s=>(
              <li key={s}><a href="#" style={{ fontFamily:'Barlow',color:'rgba(255,255,255,0.45)',fontSize:'0.85rem',fontWeight:500 }} className="hover:text-orange-400 transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor:'rgba(255,255,255,0.08)',fontFamily:'Barlow',color:'rgba(255,255,255,0.25)',fontSize:'0.75rem',letterSpacing:'0.1em',textTransform:'uppercase' }}>
        <p>© {new Date().getFullYear()} [CLINIC NAME]. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

// ── Mobile CTA ─────────────────────────────────────────────────────────────────
const MobileCTA = () => (
  <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
    <a href="tel:[PHONE]" className="flex items-center justify-center gap-3 w-full text-white font-bold text-sm py-4 rounded-full shadow-2xl"
      style={{ background:'#FF5A1F',fontFamily:'Barlow',letterSpacing:'0.06em',boxShadow:'0 8px 24px rgba(255,87,34,0.5)' }}>
      <Phone size={15}/> BOOK APPOINTMENT
    </a>
  </div>
);

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen" style={{ background:'#A8D4EE' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Treatments />
        <StatsBar />
        <Doctor />
        <Reviews />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
