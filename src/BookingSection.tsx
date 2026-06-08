import React, { useState } from 'react';
import { Phone, MapPin, Clock, ArrowUpRight, Check, AlertCircle } from 'lucide-react';

// ── Reveal ─────────────────────────────────────────────────────────────────────
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

// ── Booking Section ────────────────────────────────────────────────────────────
const BookingSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', time: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const services = ['Dental Cleaning', 'Dental Implants', 'Orthodontics / Braces', 'Root Canal', 'Teeth Whitening', 'Smile Design', 'Other'];
  const times = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'];
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await fetch('https://formsubmit.co/ajax/[YOUR_EMAIL]', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `New Appointment: ${form.name}` })
      });
      setStatus('success');
      setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', message: '' });
    } catch { setStatus('error'); }
  };

  const inp: React.CSSProperties = {
    width: '100%', padding: '14px 18px',
    border: '1.5px solid #D9EEFA', borderRadius: '14px',
    fontFamily: 'Barlow, sans-serif', fontSize: '0.92rem',
    color: '#111', background: '#FAFCFE', outline: 'none',
    transition: 'border-color 0.2s', boxSizing: 'border-box',
  };
  const lbl: React.CSSProperties = {
    fontFamily: 'Barlow, sans-serif', fontWeight: 700,
    fontSize: '0.68rem', color: '#999',
    textTransform: 'uppercase', letterSpacing: '0.12em',
    display: 'block', marginBottom: '7px',
  };

  return (
    <section id="our-clinics" style={{ background: '#ffffff', padding: '100px 0 80px' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Header ── */}
        <Reveal className="mb-20">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0' }}>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 400, color: '#AAA', fontSize: '1.3rem', margin: 0 }}>
              Visit or Connect
            </p>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, color: '#111', fontSize: '2.3rem', textTransform: 'uppercase', lineHeight: 1, margin: '4px 0 0 0' }}>
              OUR CLINICS & CONTACT
            </p>
            <div style={{ display: 'flex', gap: '6px', marginTop: '14px' }}>
              <span style={{ width: 28, height: 8, borderRadius: 99, background: '#FF5A1F', display: 'inline-block' }} />
              <span style={{ width: 8, height: 8, borderRadius: 99, background: '#DDD', display: 'inline-block' }} />
              <span style={{ width: 8, height: 8, borderRadius: 99, background: '#DDD', display: 'inline-block' }} />
            </div>
          </div>
        </Reveal>

        {/* ── Info Strip: 3 cards full width ── */}
        <Reveal className="mb-20">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="info-strip">
            {[
              { icon: <Phone size={22} />, label: 'Call Us', value: '[PHONE NUMBER]', sub: 'Mon–Sat, 10AM–7PM', href: 'tel:[PHONE]', color: '#1A7FC1', bg: '#D3EFFF' },
              { icon: <MapPin size={22} />, label: 'Visit Us', value: '[CLINIC ADDRESS]', sub: '[CITY], [STATE] – [PIN]', href: 'https://maps.google.com/?q=[YOUR_CLINIC_NAME]+[CITY]', color: '#FF5A1F', bg: '#FFE8DF' },
              { icon: <Clock size={22} />, label: 'Working Hours', value: 'Mon – Sat', sub: '10:00 AM – 7:00 PM', href: null, color: '#0D5C8C', bg: '#D3EFFF' },
            ].map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '20px',
                background: '#F5FBFF', borderRadius: '20px', padding: '28px 30px',
                border: '1px solid #E8F4FB',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 14px 36px rgba(0,80,160,0.10)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.boxShadow = ''; }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '15px', background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Barlow', fontWeight: 700, fontSize: '0.68rem', color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>{c.label}</p>
                  <p style={{ fontFamily: 'Barlow', fontWeight: 800, fontSize: '1rem', color: '#111', margin: '4px 0 2px 0' }}>{c.value}</p>
                  <p style={{ fontFamily: 'Barlow', fontSize: '0.8rem', color: '#999', margin: 0 }}>{c.sub}</p>
                </div>
                {c.href && (
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    style={{ width: '38px', height: '38px', borderRadius: '11px', background: c.bg, color: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, textDecoration: 'none' }}>
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Booking Form — Full Width, Open Layout ── */}
        <Reveal>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#F5FBFF', borderRadius: '28px', border: '1px solid #E8F4FB' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#D3EFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Check size={36} style={{ color: '#1A7FC1' }} />
              </div>
              <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, fontSize: '2.2rem', color: '#111', textTransform: 'uppercase', margin: 0 }}>APPOINTMENT BOOKED!</p>
              <p style={{ fontFamily: 'Barlow', color: '#777', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '340px', margin: '14px auto 32px' }}>
                We'll confirm your slot via call within 30 minutes.
              </p>
              <button onClick={() => setStatus('idle')} style={{ background: '#FF5A1F', color: 'white', border: 'none', borderRadius: '99px', padding: '14px 32px', fontFamily: 'Barlow', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>

              {/* Form heading inline */}
              <div style={{ marginBottom: '40px' }}>
                <p style={{ fontFamily: 'Barlow', fontWeight: 400, color: '#AAA', fontSize: '0.95rem', margin: 0 }}>Fill in the details below</p>
                <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 900, color: '#111', fontSize: '1.9rem', textTransform: 'uppercase', lineHeight: 1, margin: '4px 0 0 0' }}>BOOK YOUR APPOINTMENT</p>
              </div>

              {/* Row 1 — 4 cols */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }} className="form-row-4">
                <div>
                  <label style={lbl}>Full Name *</label>
                  <input required style={inp} placeholder="Riya Sharma" value={form.name}
                    onChange={e => set('name', e.target.value)}
                    onFocus={e => (e.target.style.borderColor = '#0099FF')}
                    onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
                </div>
                <div>
                  <label style={lbl}>Phone Number *</label>
                  <input required style={inp} placeholder="+91 98765 43210" value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    onFocus={e => (e.target.style.borderColor = '#0099FF')}
                    onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
                </div>
                <div>
                  <label style={lbl}>Email Address</label>
                  <input type="email" style={inp} placeholder="you@email.com" value={form.email}
                    onChange={e => set('email', e.target.value)}
                    onFocus={e => (e.target.style.borderColor = '#0099FF')}
                    onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
                </div>
                <div>
                  <label style={lbl}>Treatment *</label>
                  <select required value={form.service} onChange={e => set('service', e.target.value)}
                    style={{ ...inp, appearance: 'none', cursor: 'pointer', color: form.service ? '#111' : '#999' }}>
                    <option value="">Select…</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 2 — 4 cols */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr auto', gap: '16px', alignItems: 'flex-end', marginBottom: '16px' }} className="form-row-action">
                <div>
                  <label style={lbl}>Preferred Date *</label>
                  <input required type="date" style={inp} value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => set('date', e.target.value)}
                    onFocus={e => (e.target.style.borderColor = '#0099FF')}
                    onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
                </div>
                <div>
                  <label style={lbl}>Preferred Time *</label>
                  <select required value={form.time} onChange={e => set('time', e.target.value)}
                    style={{ ...inp, appearance: 'none', cursor: 'pointer', color: form.time ? '#111' : '#999' }}>
                    <option value="">Select time…</option>
                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Additional Notes</label>
                  <input style={inp} placeholder="Any concerns or dental history…" value={form.message}
                    onChange={e => set('message', e.target.value)}
                    onFocus={e => (e.target.style.borderColor = '#0099FF')}
                    onBlur={e => (e.target.style.borderColor = '#D9EEFA')} />
                </div>
                <div>
                  <button type="submit" disabled={status === 'submitting'} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: status === 'submitting' ? '#ccc' : '#FF5A1F',
                    color: 'white', border: 'none', borderRadius: '14px',
                    padding: '14px 28px', fontFamily: 'Barlow, sans-serif',
                    fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.07em',
                    textTransform: 'uppercase', cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s', boxShadow: status === 'submitting' ? 'none' : '0 8px 24px rgba(255,87,34,0.30)',
                  }}>
                    {status === 'submitting' ? 'BOOKING...' : <>CONFIRM <ArrowUpRight size={15} strokeWidth={3} /></>}
                  </button>
                </div>
              </div>

              {status === 'error' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF0ED', border: '1px solid #FFB8A8', borderRadius: '12px', padding: '13px 18px', marginTop: '8px' }}>
                  <AlertCircle size={16} style={{ color: '#FF5A1F', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Barlow', fontSize: '0.85rem', color: '#CC3311' }}>Something went wrong. Please call us directly.</span>
                </div>
              )}

            </form>
          )}
        </Reveal>

        {/* ── Map — Full Width ── */}
        <Reveal delay={0.1} className="mt-20">
          <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,80,160,0.10)', border: '1px solid #D9EEFA', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, background: '#fff', borderRadius: '12px', padding: '10px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5A1F' }} />
              <span style={{ fontFamily: 'Barlow', fontWeight: 700, fontSize: '0.82rem', color: '#111' }}>Denta Care Clinic</span>
            </div>
            {/* REPLACE src with your Google Maps embed URL: Maps → Share → Embed a map → copy src="..." */}
            <iframe
              title="Denta Care Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.6823459!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="380"
              style={{ border: 'none', display: 'block', filter: 'hue-rotate(200deg) saturate(0.75) brightness(1.05)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
            <a href="https://maps.google.com/?q=[YOUR_CLINIC_NAME]+[CITY]" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#0D5C8C', color: 'white', fontFamily: 'Barlow', fontWeight: 800, fontSize: '0.76rem', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '15px 24px', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#1A7FC1'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#0D5C8C'}
            >
              <MapPin size={13} /> GET DIRECTIONS <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </div>
        </Reveal>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .info-strip { grid-template-columns: 1fr !important; }
          .form-row-4 { grid-template-columns: 1fr 1fr !important; }
          .form-row-action { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 540px) {
          .form-row-4 { grid-template-columns: 1fr !important; }
          .form-row-action { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default BookingSection;
