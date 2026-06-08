import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, ArrowUpRight, Check, AlertCircle } from 'lucide-react';

// ── Reveal (inline copy so this file is self-contained) ────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string; dir?: 'up' | 'left' | 'right' | 'none' }> = ({
  children, delay = 0, className = '', dir = 'up'
}) => {
  const [vis, setVis] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
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

// ── Booking Form ───────────────────────────────────────────────────────────────
const BookingForm = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', date: '', time: '', message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const services = [
    'Dental Cleaning', 'Dental Implants', 'Orthodontics / Braces',
    'Root Canal', 'Teeth Whitening', 'Smile Design', 'Other'
  ];
  const times = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
  ];

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Replace this URL with your FormSubmit / Netlify / webhook endpoint
    try {
      await fetch('https://formsubmit.co/ajax/[YOUR_EMAIL]', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `New Appointment: ${form.name}` })
      });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    border: '1.5px solid #D9EEFA',
    borderRadius: '12px',
    fontFamily: 'Barlow, sans-serif',
    fontSize: '0.9rem',
    color: '#111',
    background: '#FAFCFE',
    outline: 'none',
    transition: 'border-color 0.2s',
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Barlow, sans-serif',
    fontWeight: 700,
    fontSize: '0.72rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: '6px',
  };

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '28px',
      padding: '40px',
      boxShadow: '0 24px 64px rgba(0,100,180,0.10)',
      border: '1px solid #E8F4FB',
    }}>
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 400, color: '#AAA', fontSize: '1rem', margin: 0 }}>
          Reserve Your Slot
        </p>
        <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, color: '#111', fontSize: '2rem', textTransform: 'uppercase', lineHeight: 1, margin: '4px 0 0 0' }}>
          BOOK APPOINTMENT
        </p>
        <div style={{ width: '40px', height: '4px', background: '#FF5A1F', borderRadius: '99px', marginTop: '10px' }} />
      </div>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#D3EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Check size={32} style={{ color: '#1A7FC1' }} />
          </div>
          <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '1.8rem', color: '#111', textTransform: 'uppercase' }}>
            APPOINTMENT BOOKED!
          </p>
          <p style={{ fontFamily: 'Barlow', color: '#777', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '300px', margin: '10px auto 24px' }}>
            We'll confirm your appointment via WhatsApp or call within 30 minutes.
          </p>
          <button onClick={() => setStatus('idle')} style={{ background: '#FF5A1F', color: 'white', border: 'none', borderRadius: '99px', padding: '12px 28px', fontFamily: 'Barlow', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Book Another
          </button>
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input required style={inputStyle} placeholder="e.g. Riya Sharma" value={form.name}
                onChange={e => set('name', e.target.value)}
                onFocus={e => (e.target.style.borderColor = '#0099FF')}
                onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input required style={inputStyle} placeholder="+91 98765 43210" value={form.phone}
                onChange={e => set('phone', e.target.value)}
                onFocus={e => (e.target.style.borderColor = '#0099FF')}
                onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
            </div>
          </div>

          {/* Row 2 */}
          <div>
            <label style={labelStyle}>Email Address</label>
            <input type="email" style={inputStyle} placeholder="you@email.com" value={form.email}
              onChange={e => set('email', e.target.value)}
              onFocus={e => (e.target.style.borderColor = '#0099FF')}
              onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
          </div>

          {/* Row 3 */}
          <div>
            <label style={labelStyle}>Treatment Required *</label>
            <select required value={form.service} onChange={e => set('service', e.target.value)}
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.service ? '#111' : '#999' }}>
              <option value="">Select a treatment…</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Row 4 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Preferred Date *</label>
              <input required type="date" style={inputStyle} value={form.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => set('date', e.target.value)}
                onFocus={e => (e.target.style.borderColor = '#0099FF')}
                onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
            </div>
            <div>
              <label style={labelStyle}>Preferred Time *</label>
              <select required value={form.time} onChange={e => set('time', e.target.value)}
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer', color: form.time ? '#111' : '#999' }}>
                <option value="">Select time…</option>
                {times.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Row 5 */}
          <div>
            <label style={labelStyle}>Additional Notes</label>
            <textarea rows={3} style={{ ...inputStyle, resize: 'none' }} placeholder="Any specific concerns or dental history…" value={form.message}
              onChange={e => set('message', e.target.value)}
              onFocus={e => (e.target.style.borderColor = '#0099FF')}
              onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
          </div>

          {status === 'error' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF0ED', border: '1px solid #FFB8A8', borderRadius: '10px', padding: '12px 16px' }}>
              <AlertCircle size={16} style={{ color: '#FF5A1F', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Barlow', fontSize: '0.85rem', color: '#CC3311' }}>Something went wrong. Please try again or call us directly.</span>
            </div>
          )}

          <button type="submit" disabled={status === 'submitting'} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: status === 'submitting' ? '#ccc' : '#FF5A1F',
            color: 'white', border: 'none', borderRadius: '99px',
            padding: '16px 32px', fontFamily: 'Barlow, sans-serif',
            fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s', boxShadow: status === 'submitting' ? 'none' : '0 10px 28px rgba(255,87,34,0.35)',
            width: '100%',
          }}>
            {status === 'submitting' ? 'BOOKING...' : <>CONFIRM APPOINTMENT <ArrowUpRight size={16} strokeWidth={3} /></>}
          </button>

          <p style={{ textAlign: 'center', fontFamily: 'Barlow', fontSize: '0.75rem', color: '#AAA' }}>
            Or book instantly via{' '}
            <a href="https://wa.me/[WHATSAPP_NUMBER]?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment" target="_blank" rel="noreferrer" style={{ color: '#25D366', fontWeight: 700 }}>WhatsApp</a>
          </p>
        </form>
      )}
    </div>
  );
};

// ── Contact Info Panel ─────────────────────────────────────────────────────────
const ContactPanel = () => {
  const contacts = [
    {
      icon: <Phone size={20} />,
      label: 'Call Us',
      value: '[PHONE NUMBER]',
      sub: 'Mon–Sat, 10AM–7PM',
      href: 'tel:[PHONE]',
      color: '#1A7FC1',
      bg: '#D3EFFF',
    },
    {
      icon: <MessageCircle size={20} />,
      label: 'WhatsApp',
      value: '[WHATSAPP NUMBER]',
      sub: 'Quick replies in minutes',
      href: 'https://wa.me/[WHATSAPP_NUMBER]?text=Hi%2C%20I%20want%20to%20book%20an%20appointment%20at%20Denta%20Care',
      color: '#25D366',
      bg: '#D7F7E3',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Visit Us',
      value: '[CLINIC ADDRESS]',
      sub: '[CITY], [STATE] - [PIN]',
      href: 'https://maps.google.com/?q=[YOUR_CLINIC_NAME]+[CITY]',
      color: '#FF5A1F',
      bg: '#FFE8DF',
    },
    {
      icon: <Clock size={20} />,
      label: 'Working Hours',
      value: 'Mon – Sat',
      sub: '10:00 AM – 7:00 PM',
      href: null,
      color: '#0D5C8C',
      bg: '#D3EFFF',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {contacts.map((c, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            background: '#FFFFFF', borderRadius: '18px', padding: '20px 24px',
            boxShadow: '0 6px 20px rgba(0,80,160,0.07)',
            border: '1px solid #E8F4FB',
            textDecoration: 'none',
            transition: 'transform 0.25s, box-shadow 0.25s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,80,160,0.12)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px rgba(0,80,160,0.07)'; }}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: c.bg, color: c.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {c.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.7rem', color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                {c.label}
              </p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#111', margin: '2px 0 0 0' }}>
                {c.value}
              </p>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '0.78rem', color: '#888', margin: '2px 0 0 0' }}>
                {c.sub}
              </p>
            </div>
            {c.href && (
              <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: c.bg, color: c.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, textDecoration: 'none',
                }}
                onClick={e => e.stopPropagation()}
              >
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
};

// ── Google Map Embed ───────────────────────────────────────────────────────────
const MapEmbed = () => (
  <Reveal delay={0.15}>
    <div style={{
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 16px 48px rgba(0,80,160,0.12)',
      border: '1px solid #D9EEFA',
      position: 'relative',
    }}>
      {/* Map overlay label */}
      <div style={{
        position: 'absolute', top: '16px', left: '16px', zIndex: 10,
        background: '#FFFFFF', borderRadius: '12px', padding: '10px 16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5A1F' }} />
        <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: '0.82rem', color: '#111' }}>
          Denta Care Clinic
        </span>
      </div>
      {/*
        REPLACE the src below with your real Google Maps embed URL:
        Google Maps → Share → Embed a map → Copy iframe src
        It looks like: https://www.google.com/maps/embed?pb=!1m18!...
      */}
      <iframe
        title="Denta Care Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6823459!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
        width="100%"
        height="300"
        style={{ border: 'none', display: 'block', filter: 'hue-rotate(200deg) saturate(0.8) brightness(1.05)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* Get directions button */}
      <a
        href="https://maps.google.com/?q=[YOUR_CLINIC_NAME]+[CITY]"
        target="_blank"
        rel="noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          background: '#0D5C8C', color: 'white',
          fontFamily: 'Barlow, sans-serif', fontWeight: 800,
          fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase',
          padding: '14px 24px', textDecoration: 'none',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#1A7FC1'}
        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#0D5C8C'}
      >
        <MapPin size={14} /> GET DIRECTIONS <ArrowUpRight size={14} strokeWidth={2.5} />
      </a>
    </div>
  </Reveal>
);

// ── Full Booking Section ───────────────────────────────────────────────────────
const BookingSection = () => (
  <section id="our-clinics" style={{ background: '#F5FBFF', padding: '80px 0' }}>
    <div className="max-w-7xl mx-auto px-5 sm:px-8">

      {/* Section header */}
      <Reveal className="mb-14">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 400, color: '#AAA', fontSize: '1.3rem', margin: 0 }}>
            Visit or Connect
          </p>
          <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, color: '#111', fontSize: '2.2rem', textTransform: 'uppercase', lineHeight: 1, margin: 0 }}>
            OUR CLINICS & CONTACT
          </p>
          <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
            <span style={{ width: 28, height: 8, borderRadius: 99, background: '#FF5A1F', display: 'inline-block' }} />
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#DDD', display: 'inline-block' }} />
            <span style={{ width: 8, height: 8, borderRadius: 99, background: '#DDD', display: 'inline-block' }} />
          </div>
        </div>
      </Reveal>

      {/* Main grid: Form | Info + Map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'start' }}
        className="booking-grid">

        {/* Left: booking form */}
        <Reveal dir="left">
          <BookingForm />
        </Reveal>

        {/* Right: contact cards + map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ContactPanel />
          <MapEmbed />
        </div>
      </div>

      {/* Quick action buttons — mobile-first strip */}
      <Reveal delay={0.2} className="mt-12">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="tel:[PHONE]"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#1A7FC1', color: 'white',
              fontFamily: 'Barlow, sans-serif', fontWeight: 800,
              fontSize: '0.8rem', letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: '14px 28px', borderRadius: '99px', textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(26,127,193,0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}
          >
            <Phone size={15} /> CALL NOW
          </a>
          <a href="https://wa.me/[WHATSAPP_NUMBER]?text=Hi%2C%20I%20want%20to%20book%20an%20appointment%20at%20Denta%20Care"
            target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#25D366', color: 'white',
              fontFamily: 'Barlow, sans-serif', fontWeight: 800,
              fontSize: '0.8rem', letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: '14px 28px', borderRadius: '99px', textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; }}
          >
            <MessageCircle size={15} /> WHATSAPP US
          </a>
        </div>
      </Reveal>
    </div>

    <style>{`
      @media (max-width: 768px) {
        .booking-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  </section>
);

export default BookingSection;
export { BookingForm, ContactPanel, MapEmbed };
