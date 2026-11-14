import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ArrowUpRight, ArrowLeft, ArrowRight, 
  CalendarDays, MapPin, VolumeX, X, 
  Plus, Minus, Heart, Share2, Maximize2, 
  Sparkles, Copy, Navigation, Clock, Compass, ChevronDown, Check, Eye
} from 'lucide-react';
import './styles.css';

// Primary Wedding Date: Celebrations begin Jan 23, 2027 · 8:00 AM IST
const weddingStartDate = new Date('2027-01-23T08:00:00+05:30');
const hastmilapDate = new Date('2027-01-24T13:15:00+05:30');

const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Purohit+Holiday+Resort+Lonavala';
const googleShareUrl = 'https://share.google/y9PWpJ1nX1KIiH4eW';
const venueAddress = 'Purohit Holiday Resort Private Limited, Chhatrapati Shivaji Maharaj Road, Near S.T. Bus Stand, Gawliwada, Rao Colony, Lonavala, Maharashtra 410401';

const photos = [
  { 
    id: 1, 
    caption: 'In your embrace, every step feels like coming home.', 
    tag: 'Joyful Forever', 
    alt: 'Shriya and Anuj joyful amidst lush hillside meadows' 
  },
  { 
    id: 4, 
    caption: 'The smile that lights up every single tomorrow.', 
    tag: 'Endless Sunshine', 
    alt: 'Shriya and Anuj sharing an affectionate moment together' 
  },
  { 
    id: 3, 
    caption: 'Held tight in love that words can scarcely hold.', 
    tag: 'Pure Warmth', 
    alt: 'Shriya embracing Anuj outdoors with happiness' 
  },
  { 
    id: 2, 
    caption: 'Two hands, one destined path into infinity.', 
    tag: 'Sacred Touch', 
    alt: 'Shriya and Anuj reaching towards each other on a scenic road' 
  },
  { 
    id: 5, 
    caption: 'Held close and promised for a lifetime.', 
    tag: 'Eternal Promise', 
    alt: 'Shriya and Anuj with hands interlocked showing the engagement ring' 
  },
];

const events = [
  // DAY 1
  { 
    day: 1,
    dayLabel: 'Day 1 — Saturday, 23rd January 2027',
    dateShort: '23 Jan 2027',
    time: '8:00 AM', 
    title: 'Jaan Swagat & Breakfast', 
    sanskrit: 'जान आगमन, भव्य स्वागत एवं अल्पाहार',
    detail: 'Welcoming the groom’s family and cherished guests with traditional Aarti, fragrant flower showers, celebratory dhol beats, and a lavish royal breakfast spread to kick off the wedding festivities.', 
    tag: 'Grand Welcome',
    icon: '✺' 
  },
  { 
    day: 1,
    dayLabel: 'Day 1 — Saturday, 23rd January 2027',
    dateShort: '23 Jan 2027',
    time: '10:00 AM', 
    title: 'Mayra of Sharmila Solanki & Lunch', 
    sanskrit: 'शर्मिला सोलंकी का पावन मायरा (मामेरा) एवं प्रीतिभोज',
    detail: 'The deeply cherished traditional Mayra (Mamera) ceremony honoring the bride’s mother, Smt. Sharmila Solanki, welcoming maternal uncles and family with joyous folk songs, sacred gifts, and heartfelt blessings, followed by an exquisite royal lunch feast.', 
    tag: 'Sacred Tradition',
    icon: '✧',
    myraDetails: {
      quote: '“नाना - नानी का आशीर्वाद, मामा - मामी\nमायरे की रस्म में छुपे हैं अनगिनत जज़्बात।”',
      eldersBadge: 'बुज़ुर्गों का आशीर्वाद · NANA - NANI',
      eldersSubtitle: 'Ancestral Blessings & Eternal Guiding Light',
      elderName: 'Late Smt. Ratnibai Premchandji Gulabchandji Shrishrimal',
      elderOrigin: '(Naya Jogapura) · Karjat',
      mamasBadge: 'मायरा मुख्य अतिथि · MAMAS & MAMIS',
      mamasSubtitle: 'Maternal Family & Main Honored Guests (Mosalu)',
      couples: [
        { wife: 'Madiya', husband: 'Kishorji' },
        { wife: 'Shobha', husband: 'Ranjeetji' },
        { wife: 'Sangeeta', husband: 'Dineshji' },
        { wife: 'Reena', husband: 'Manojji' },
        { wife: 'Ritu', husband: 'Pratikji' },
        { wife: 'Ruchika', husband: 'Shrayji' },
        { wife: 'Risha', husband: 'Krisha', isNextGen: true }
      ]
    } 
  },
  { 
    day: 1,
    dayLabel: 'Day 1 — Saturday, 23rd January 2027',
    dateShort: '23 Jan 2027',
    time: '2:00 PM', 
    title: 'Carnival & High Tea', 
    sanskrit: 'आनंदोत्सव कार्निवल एवं हाई टी',
    detail: 'An upbeat, lively afternoon carnival featuring playful games, lively music, photo booths, refreshing cocktails & mocktails, live street food counters, artisanal chai, and delectable sweet treats.', 
    tag: 'Carnival & Fun',
    icon: '❋' 
  },
  { 
    day: 1,
    dayLabel: 'Day 1 — Saturday, 23rd January 2027',
    dateShort: '23 Jan 2027',
    time: '6:30 PM', 
    title: 'Sangeet Sandhya', 
    sanskrit: 'भव्य संगीत संध्या, नृत्य एवं आनंदोत्सव',
    detail: 'An electrifying gala evening under the Lonavala stars! Spectacular choreographed performances by family and friends, the couple’s romantic dance, high-energy live DJ beats, and a celebratory royal banquet dinner.', 
    tag: 'Musical Night',
    icon: '✶' 
  },

  // DAY 2
  { 
    day: 2,
    dayLabel: 'Day 2 — Sunday, 24th January 2027',
    dateShort: '24 Jan 2027',
    time: '10:30 AM', 
    title: 'Anuj ki Baarat', 
    sanskrit: 'अनुज की शाही बारात एवं वर निकासी',
    detail: 'The groom’s grand royal procession! Join Anuj with vibrant safas, dancing to energetic dhol beats and brass brass band music as we joyfully make our way to the wedding venue mandap.', 
    tag: 'Royal Baraat',
    icon: '❖' 
  },
  { 
    day: 2,
    dayLabel: 'Day 2 — Sunday, 24th January 2027',
    dateShort: '24 Jan 2027',
    time: '1:15 PM', 
    title: 'Hastmilap & Lunch (The Auspicious Wedding)', 
    sanskrit: 'शुभ हस्तमिलाप, सप्तपदी फेरे एवं प्रीतिभोज',
    detail: 'The eternal union of Shriya & Anuj! The sacred Vedic rituals, Hastamelap, Kanyadaan, circumambulation of the holy Agni (Mangalpheras), and eternal Saptapadi vows, followed by a celebratory wedding feast (Preeti Bhoj).', 
    tag: 'Auspicious Muhurat',
    icon: '♡' 
  },
];

const imageUrl = id => `/images/portrait-${id}.webp`;

function Ganesh({ className = '' }) {
  return (
    <svg className={`ganesh-art ${className}`} viewBox="0 0 180 155" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M71 49Q63 19 90 10Q117 19 109 49M68 44Q90 31 112 44M73 32Q90 22 107 32M90 10V3M86 5H94M64 54Q32 34 28 66Q25 93 57 102Q36 76 64 65M116 54Q148 34 152 66Q155 93 123 102Q144 76 116 65M67 49Q56 68 69 92Q77 104 87 102M113 49Q125 68 111 92Q103 103 96 101M88 78Q96 97 89 115Q82 136 104 136Q121 134 112 119Q107 112 103 121M76 66L82 69M99 69L105 66M89 52V65M84 56H95M61 110Q38 113 32 136M119 110Q141 113 148 136M30 143H150M43 133Q61 143 77 133M121 133Q134 139 145 134"/>
        <circle cx="90" cy="21" r="2.2" fill="currentColor"/>
      </g>
    </svg>
  );
}

function WeddingDivider({ symbol = '❦', text = '' }) {
  return (
    <div className="wedding-divider" aria-hidden="true">
      <span className="divider-line left" />
      <span className="divider-crest">
        <span className="divider-dot" />
        {text ? <span className="divider-text">{text}</span> : <span className="divider-sym">{symbol}</span>}
        <span className="divider-dot" />
      </span>
      <span className="divider-line right" />
    </div>
  );
}

function CornerOrnaments() {
  return (
    <div className="corner-ornaments" aria-hidden="true">
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
    </div>
  );
}

// Indian Classical Acoustic Synthesizer (Santoor, Bansuri & Tanpura Drone)
function useWeddingAudio() {
  const [playing, setPlaying] = useState(false);
  const audio = useRef(null);

  const stop = useCallback(() => {
    if (audio.current) {
      clearInterval(audio.current.timer);
      if (audio.current.chimeListener) {
        window.removeEventListener('patrika-chime', audio.current.chimeListener);
      }
      const { ctx, master } = audio.current;
      if (master && ctx && ctx.state === 'running') {
        try {
          master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
          master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
          setTimeout(() => {
            try { ctx.close(); } catch {}
          }, 350);
        } catch {
          try { ctx.close(); } catch {}
        }
      } else if (ctx) {
        try { ctx.close(); } catch {}
      }
      audio.current = null;
    }
    setPlaying(false);
  }, []);

  const playChimeSound = useCallback((freq = 587.33, vol = 0.28) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audio.current?.ctx || new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(vol, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.2);
      osc2.stop(now + 1.2);
    } catch {}
  }, []);

  const start = useCallback(async () => {
    if (audio.current) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      await ctx.resume();

      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -16;
      compressor.knee.value = 12;
      compressor.ratio.value = 4;
      compressor.attack.value = 0.01;
      compressor.release.value = 0.25;
      compressor.connect(ctx.destination);

      const masterFilter = ctx.createBiquadFilter();
      masterFilter.type = 'lowpass';
      masterFilter.frequency.value = 4200;
      masterFilter.connect(compressor);

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.38, ctx.currentTime + 1.2);
      master.connect(masterFilter);

      const delay = ctx.createDelay();
      delay.delayTime.value = 0.36;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.32;
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 1400;

      delay.connect(delayFilter);
      delayFilter.connect(feedback);
      feedback.connect(delay);
      delayFilter.connect(master);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.0001, ctx.currentTime);
      droneGain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 2.0);

      const droneFilter = ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.value = 480;
      droneGain.connect(droneFilter);
      droneFilter.connect(master);

      const droneNotes = [130.81, 131.2, 196.00, 261.63, 329.63];
      droneNotes.forEach(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        osc.connect(droneGain);
        osc.start(ctx.currentTime);
      });

      const pluck = (frequency, at, volume = 0.38, duration = 3.6) => {
        const noteGain = ctx.createGain();
        noteGain.gain.setValueAtTime(0.0001, at);
        noteGain.gain.exponentialRampToValueAtTime(volume, at + 0.018);
        noteGain.gain.exponentialRampToValueAtTime(volume * 0.45, at + 0.3);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, at + duration);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3200, at);
        filter.frequency.exponentialRampToValueAtTime(750, at + duration);

        noteGain.connect(filter);
        filter.connect(master);
        filter.connect(delay);

        [
          { mult: 1, type: 'sine', detune: 0, gainRatio: 1 },
          { mult: 1, type: 'triangle', detune: 2, gainRatio: 0.35 },
          { mult: 2, type: 'sine', detune: -1.5, gainRatio: 0.2 },
          { mult: 3, type: 'sine', detune: 3, gainRatio: 0.1 }
        ].forEach(p => {
          const osc = ctx.createOscillator();
          const pGain = ctx.createGain();
          osc.type = p.type;
          osc.frequency.value = frequency * p.mult;
          osc.detune.value = p.detune;
          pGain.gain.value = p.gainRatio;
          osc.connect(pGain);
          pGain.connect(noteGain);
          osc.start(at);
          osc.stop(at + duration);
        });
      };

      const phrases = [
        [
          { f: 261.63, d: 0.0 },
          { f: 293.66, d: 0.75 },
          { f: 329.63, d: 1.5 },
          { f: 392.00, d: 2.25 },
          { f: 440.00, d: 3.0 },
          { f: 523.25, d: 3.8 },
          { f: 440.00, d: 4.8 },
          { f: 392.00, d: 5.6 },
          { f: 329.63, d: 6.4 },
          { f: 293.66, d: 7.2 },
          { f: 261.63, d: 8.0 }
        ],
        [
          { f: 392.00, d: 0.0 },
          { f: 440.00, d: 0.75 },
          { f: 523.25, d: 1.5 },
          { f: 587.33, d: 2.3 },
          { f: 659.25, d: 3.2 },
          { f: 587.33, d: 4.2 },
          { f: 523.25, d: 5.0 },
          { f: 440.00, d: 5.8 },
          { f: 392.00, d: 6.6 },
          { f: 329.63, d: 7.4 },
          { f: 261.63, d: 8.2 }
        ]
      ];

      let phraseIdx = 0;
      const playPhrase = () => {
        const notes = phrases[phraseIdx % phrases.length];
        phraseIdx++;
        const now = ctx.currentTime;
        notes.forEach(n => pluck(n.f, now + n.d, 0.42, 3.8));
      };

      playPhrase();
      const timer = setInterval(playPhrase, 9600);
      const chimeListener = () => pluck(659.25, ctx.currentTime, 0.28, 1.8);
      window.addEventListener('patrika-chime', chimeListener);

      audio.current = { ctx, timer, master, chimeListener };
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && audio.current) {
        stop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      stop();
    };
  }, [stop]);

  const toggle = useCallback(() => {
    if (playing) stop();
    else start();
  }, [playing, start, stop]);

  return { playing, start, stop, toggle, playChimeSound };
}

const heartPath = 'M300 530C248 484 20 325 20 165C20 25 200-10 300 110C400-10 580 25 580 165C580 325 352 484 300 530Z';

function ScratchDate({ onCalendar }) {
  const canvas = useRef(null);
  const dragging = useRef(false);
  const previous = useRef(null);
  const samples = useRef([]);
  const moves = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const c = canvas.current;
    if (!c || revealed) return;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    c.width = 600;
    c.height = 560;

    ctx.save();
    ctx.clip(new Path2D(heartPath));

    const g = ctx.createLinearGradient(0, 0, 600, 560);
    g.addColorStop(0, '#cca058');
    g.addColorStop(0.2, '#fcedc7');
    g.addColorStop(0.4, '#b8834d');
    g.addColorStop(0.65, '#f5e4bb');
    g.addColorStop(0.85, '#966f33');
    g.addColorStop(1, '#dfbf7b');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 600, 560);

    let seed = 42;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 28000; i++) {
      const x = rnd() * 600;
      const y = rnd() * 560;
      ctx.fillStyle = rnd() > 0.4 ? 'rgba(255, 250, 235, 0.55)' : 'rgba(122, 53, 34, 0.28)';
      ctx.fillRect(x, y, rnd() * 2 + 1, rnd() * 2 + 1);
    }
    ctx.restore();

    const data = ctx.getImageData(0, 0, 600, 560).data;
    for (let i = 3; i < data.length; i += 64) {
      if (data[i] > 0) samples.current.push(i);
    }
  }, [revealed]);

  const reveal = useCallback(() => {
    if (revealed) return;
    setRevealed(true);
    dragging.current = false;
    window.dispatchEvent(new Event('patrika-chime'));
    if (navigator?.vibrate) navigator.vibrate([30, 60, 30]);
  }, [revealed]);

  const scratch = useCallback(e => {
    if (!dragging.current || revealed) return;
    const c = canvas.current;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) * 600 / r.width;
    const y = (e.clientY - r.top) * 560 / r.height;
    const ctx = c.getContext('2d');

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 88;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    const last = previous.current || { x, y };
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 44, 0, Math.PI * 2);
    ctx.fill();

    previous.current = { x, y };

    if (++moves.current % 6 === 0) {
      const data = ctx.getImageData(0, 0, 600, 560).data;
      let erased = 0;
      for (const i of samples.current) {
        if (data[i] < 64) erased++;
      }
      if (erased / samples.current.length > 0.35) {
        reveal();
      }
    }
  }, [revealed, reveal]);

  return (
    <section className={`scratch-section wedding-card ${revealed ? 'revealed' : ''}`} id="date">
      <CornerOrnaments />
      <div className="section-crest">
        <Sparkles size={18} className="crest-icon" />
      </div>
      <span className="card-kicker">A SACRED CELEBRATION</span>
      <h2 className="section-title">{revealed ? 'The Auspicious Dates' : 'Scratch to Reveal'}</h2>
      <p className="section-lead">
        {revealed ? 'Mark your calendar with love. We eagerly await your arrival in Lonavala.' : 'Gently rub the heart to unveil our royal wedding days.'}
      </p>

      <div className="scratch-area">
        <div className="heart-window">
          <div className="secret-date" aria-hidden={!revealed}>
            <span className="secret-kicker">We’re Getting Married!</span>
            <b className="secret-day">23 & 24 JAN 2027</b>
            <div className="secret-time-badge">
              <Clock size={11} />
              <span>Hastmilap: Sun, 24 Jan · 1:15 PM</span>
            </div>
            <p className="secret-venue">Purohit Holiday Resort · Lonavala</p>
          </div>

          <canvas
            ref={canvas}
            className={revealed ? 'erased' : ''}
            tabIndex={revealed ? -1 : 0}
            role="button"
            aria-label="Scratch the gold heart to reveal the wedding date, or press Enter"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                reveal();
              }
            }}
            onPointerDown={e => {
              if (revealed) return;
              dragging.current = true;
              previous.current = null;
              e.currentTarget.setPointerCapture(e.pointerId);
              scratch(e);
            }}
            onPointerMove={scratch}
            onPointerUp={e => {
              dragging.current = false;
              previous.current = null;
              if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                e.currentTarget.releasePointerCapture(e.pointerId);
              }
            }}
            onPointerCancel={() => {
              dragging.current = false;
              previous.current = null;
            }}
          />
          <span className="heart-gold-border" />
        </div>

        {revealed && (
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 48 }, (_, i) => (
              <i
                key={i}
                style={{
                  '--x': `${(i * 37) % 100}%`,
                  '--r': `${i * 47}deg`,
                  '--delay': `${(i % 10) * 0.06}s`,
                  '--color': ['#cca058', '#b84a32', '#fcedcf', '#d18653', '#e4b673'][i % 5]
                }}
              />
            ))}
          </div>
        )}
      </div>

      {!revealed ? (
        <div className="scratch-controls">
          <span className="scratch-prompt">
            <span className="sparkle-dot">✧</span> RUB GENTLY WITH FINGER <span className="sparkle-dot">✧</span>
          </span>
          <button className="reveal-fallback" onClick={reveal}>
            Or tap here to reveal directly <ArrowUpRight size={13} />
          </button>
        </div>
      ) : (
        <div className="revealed-actions">
          <button className="wedding-wine-btn" onClick={onCalendar}>
            <CalendarDays size={16} /> SAVE 23 & 24 JAN TO CALENDAR
          </button>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [phase, setPhase] = useState('sealed');
  const [slide, setSlide] = useState(0);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeDayFilter, setActiveDayFilter] = useState('all'); // 'all', 1, 2
  const [expanded, setExpanded] = useState(0);
  const [mapActive, setMapActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [blessingsCount, setBlessingsCount] = useState(2450);
  const [fallingPetals, setFallingPetals] = useState([]);
  const [heartBurst, setHeartBurst] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [myraModalOpen, setMyraModalOpen] = useState(false);

  const audioSystem = useWeddingAudio();
  const timers = useRef([]);
  const lightbox = useRef(null);
  const cardDialog = useRef(null);
  const touch = useRef(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3200);
  }, []);

  // Prevent scroll during sealed curtain intro
  useEffect(() => {
    const original = document.body.style.overflow;
    if (phase !== 'entered') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = original;
    }
    return () => { document.body.style.overflow = original; };
  }, [phase]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Countdown timer tick to Jan 23, 2027 8:00 AM
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, weddingStartDate - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const enter = (sound = true) => {
    if (phase !== 'sealed') return;
    if (sound) audioSystem.start();
    else if (audioSystem.playing) audioSystem.stop();

    if (navigator?.vibrate) navigator.vibrate([40, 70, 40]);

    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (reduce) {
      setPhase('entered');
      return;
    }
    setPhase('opening');
    timers.current = [
      setTimeout(() => setPhase('curtains'), 1150),
      setTimeout(() => setPhase('entered'), 3600)
    ];
  };

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setPhase('entered');
  };

  const replay = () => {
    timers.current.forEach(clearTimeout);
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (audioSystem.playing) audioSystem.stop();
    setPhase('sealed');
  };

  const calendar = () => {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Nagotra Solanki Family//Wedding Invitation//EN',
      'BEGIN:VEVENT',
      'UID:shriya-anuj-20270123@nagotra-solanki.wedding',
      'DTSTAMP:20261103T000000Z',
      'DTSTART:20270123T023000Z',
      'DTEND:20270124T123000Z',
      'SUMMARY:Shriya & Anuj Royal Wedding Celebration',
      'LOCATION:Purohit Holiday Resort\\, Chhatrapati Shivaji Maharaj Road\\, Near ST Bus Stand\\, Lonavala\\, Maharashtra 410401',
      'DESCRIPTION:Nagotra Solanki family welcomes you to celebrate the wedding of Shriya & Anuj. Day 1 (Jan 23): Jaan Swagat (8 AM), Mayra of Sharmila Solanki (10 AM), Carnival & High Tea (2 PM), Sangeet (6:30 PM). Day 2 (Jan 24): Anuj ki Baarat (10:30 AM), Hastmilap & Lunch (1:15 PM IST).',
      'END:VEVENT',
      'END:VCALENDAR'
    ];
    const content = lines.map(l => l.match(/.{1,73}/g).join('\r\n ')).join('\r\n') + '\r\n';
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Shriya-Anuj-Wedding.ics';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Wedding celebration saved to calendar file!');
  };

  const share = async () => {
    try {
      const data = {
        title: 'Shriya & Anuj — Royal Wedding Celebration',
        text: 'With immense joy and the blessings of our elders, Nagotra Solanki family welcomes you to celebrate the wedding of Shriya & Anuj on 23rd & 24th January 2027 at Purohit Holiday Resort, Lonavala.',
        url: window.location.href
      };
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(`${data.text}\n\n${data.url}`);
        showToast('Invitation link copied to clipboard!');
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        showToast('Link copied to clipboard!');
      }
    }
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venueAddress);
      showToast('Venue address copied to clipboard!');
      if (navigator?.vibrate) navigator.vibrate(25);
    } catch {
      showToast('Purohit Holiday Resort, Lonavala 410401');
    }
  };

  const showerBlessings = useCallback(() => {
    setBlessingsCount(prev => prev + 1);
    audioSystem.playChimeSound(698.46, 0.18);
    if (navigator?.vibrate) navigator.vibrate([18, 30]);

    const newPetals = Array.from({ length: 24 }, (_, idx) => ({
      id: Date.now() + idx + Math.random(),
      left: Math.random() * 94 + 3,
      delay: Math.random() * 0.4,
      duration: 2.2 + Math.random() * 1.6,
      size: 10 + Math.random() * 14,
      rotation: Math.random() * 360,
      color: ['#b84a32', '#d47b4a', '#e59a58', '#cca058', '#f3d19c'][Math.floor(Math.random() * 5)]
    }));

    setFallingPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => {
      setFallingPetals(prev => prev.filter(p => !newPetals.includes(p)));
    }, 4500);

    showToast('🌸 Heartfelt blessings showered upon Shriya & Anuj!');
  }, [audioSystem, showToast]);

  const handleDoubleTapPhoto = () => {
    setHeartBurst(true);
    showerBlessings();
    setTimeout(() => setHeartBurst(false), 1200);
  };

  const moveSlide = (direction) => {
    setSlide(s => (s + direction + photos.length) % photos.length);
    audioSystem.playChimeSound(523.25, 0.1);
  };

  const filteredEvents = activeDayFilter === 'all' 
    ? events 
    : events.filter(e => e.day === activeDayFilter);

  return (
    <>
      <a className="skip-link" href="#welcome" onClick={skip}>
        Skip opening animation
      </a>

      <div className="desktop-ambience" aria-hidden="true" />

      {/* Dynamic Blessing Petal Shower */}
      <div className="dynamic-blessing-shower" aria-hidden="true">
        {fallingPetals.map(p => (
          <span
            key={p.id}
            className="shower-petal"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.3}px`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              transform: `rotate(${p.rotation}deg)`
            }}
          />
        ))}
      </div>

      <div className={`invitation-shell phase-${phase}`}>
        {/* Sticky Topbar */}
        <header className="invitation-topbar">
          <a
            href="#welcome"
            className="topbar-monogram"
            onClick={phase === 'sealed' ? e => e.preventDefault() : undefined}
          >
            <span>S</span>
            <span className="mono-amp">❦</span>
            <span>A</span>
          </a>

          <div className="topbar-actions">
            <button
              className={`sound-toggle ${audioSystem.playing ? 'playing' : ''}`}
              onClick={audioSystem.toggle}
              aria-label={audioSystem.playing ? 'Turn music off' : 'Turn music on'}
              aria-pressed={audioSystem.playing}
            >
              {audioSystem.playing ? (
                <div className="equalizer-waves">
                  <span />
                  <span />
                  <span />
                </div>
              ) : (
                <VolumeX size={17} />
              )}
            </button>
          </div>
        </header>

        {/* Opening Velvet Doors Scene */}
        {phase !== 'entered' && (
          <div className={`opening-scene ${phase}`} aria-label="Open Shriya and Anuj’s wedding invitation">
            <div className="intro-curtains" aria-hidden="true">
              <div className="curtain-panel curtain-left" />
              <div className="curtain-panel curtain-right" />
              <div className="curtain-valance" />
            </div>

            {(phase === 'sealed' || phase === 'opening') && (
              <div className={`floral-gates ${phase === 'opening' ? 'opening' : ''}`}>
                <div className="floral-door left" />
                <div className="floral-door right" />

                {phase === 'sealed' && (
                  <div className="gate-welcome">
                    <div className="gate-header">
                      <span className="gate-om">॥ श्री गणेशाय नमः ॥</span>
                      <span className="gate-family">NAGOTRA SOLANKI FAMILY WELCOMES YOU</span>
                    </div>

                    <button
                      className="invitation-seal"
                      onClick={() => enter(true)}
                      aria-label="Open Shriya and Anuj’s wedding invitation with music"
                    >
                      <span className="seal-outer-rim" />
                      <span className="seal-flower">❦</span>
                      <small className="seal-kicker">You are cordially invited</small>
                      <b className="seal-names">S <i>&</i> A</b>
                      <span className="seal-date-pill">SHUBH VIVAH</span>
                      <span className="seal-tap">
                        <Sparkles size={11} /> TAP TO UNVEIL <Sparkles size={11} />
                      </span>
                    </button>

                    <div className="gate-caption">
                      <span className="gate-tagline">TWO HEARTS · TWO FAMILIES · ONE CELEBRATION</span>
                      <button className="quiet-open-btn" onClick={() => enter(false)}>
                        Open quietly without music <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {phase !== 'sealed' && (
              <button className="skip-opening" onClick={skip}>
                Enter Invitation <ArrowRight size={13} />
              </button>
            )}
          </div>
        )}

        {/* Main Content Area */}
        <main inert={phase !== 'entered'}>
          {/* Section 1: Grand Hero Palace */}
          <section className="garden-hero" id="welcome">
            <img
              className="garden-art"
              src="/art/terracotta-palace-invitation.webp"
              alt="An ivory fountain palace garden with warm terracotta roses and gold-trimmed silk drapes"
              fetchPriority="high"
              width="1024"
              height="1792"
            />
            <div className="hero-gradient-overlay" />

            <div className="hero-copy">
              <div className="shlok-banner">
                <Ganesh className="hero-ganesh" />
                <span className="shlok-title">॥ श्री गणेशाय नमः ॥</span>
                <p className="shlok-sanskrit">
                  वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br />
                  निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
                </p>
              </div>

              <div className="invitation-herald">
                <span className="herald-sub">TOGETHER WITH THEIR FAMILIES</span>
                <h1>
                  <span className="name-bride">Shriya</span>
                  <i className="ampersand">&</i>
                  <span className="name-groom">Anuj</span>
                </h1>
                <p className="herald-tag">Joyfully invite you to celebrate their wedding</p>
              </div>

              <div className="family-introduction">
                <span className="family-crown">NAGOTRA SOLANKI FAMILY WELCOMES YOU</span>
                <p>
                  to share our happiness and bless the new beginning together with the
                </p>
                <span className="family-crown secondary">KOTHARI FAMILY</span>
              </div>

              <div className="hero-date-badge">
                <MapPin size={13} />
                <span>Purohit Holiday Resort · Lonavala</span>
              </div>
            </div>

            <div className="hero-bottom">
              <span className="scroll-tag">A CELEBRATION OF FOREVER</span>
              <a href="#invitation" aria-label="Explore the wedding invitation" className="hero-scroll-btn">
                <ChevronDown size={19} />
              </a>
            </div>

            <div className="petal-field" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <i
                  key={i}
                  style={{
                    '--left': `${(i * 29 + 7) % 96}%`,
                    '--delay': `${i * 0.75}s`
                  }}
                />
              ))}
            </div>
          </section>

          {/* Section 2: Heartfelt Welcome Note */}
          <section className="welcome-note wedding-card" id="invitation">
            <CornerOrnaments />
            <WeddingDivider symbol="❦" />
            <span className="card-kicker">WITH DIVINE BLESSINGS</span>
            <h2 className="section-title">A Garden of Forever</h2>
            
            <p className="note-text lead">
              With the graceful blessings of our revered elders, grandparents, and the Almighty, Nagotra Solanki family welcomes you to celebrate the wedding of Shriya & Anuj in scenic Lonavala.
            </p>
            
            <p className="note-text">
              Two hearts, two souls, and two families unite as one. Your gracious presence, warm smiles, and loving blessings are the greatest gifts we could cherish as we take our sacred vows and begin our journey of a lifetime.
            </p>

            <div className="script-signature">
              <span>With eternal love & respect,</span>
              <b>Shriya & Anuj</b>
              <Heart size={14} className="heart-pulse" />
            </div>
            <WeddingDivider symbol="✿" />
          </section>

          {/* Section 3: Family Heritage & Lineage (Sacred Patrika) */}
          <section className="patrika-section wedding-card" id="patrika">
            <CornerOrnaments />
            <div className="section-crest">
              <Sparkles size={18} className="crest-icon" />
            </div>
            <span className="card-kicker">SACRED HERITAGE & ELDERS’ BLESSINGS</span>
            <h2 className="section-title">The Blessed Families</h2>
            <p className="section-lead">Rooted in tradition, values, and boundless ancestral blessings.</p>

            <div className="patrika-grid">
              {/* Bride's Family Side */}
              <div className="patrika-side-card bride-side">
                <div className="patrika-side-header">
                  <span className="side-badge">वधू पक्ष · NAGOTRA SOLANKI FAMILY</span>
                  <h3 className="side-member-name">Shriya Solanki</h3>
                </div>

                <div className="lineage-item">
                  <span className="lineage-rel">Granddaughter of</span>
                  <b className="lineage-name">Late Smt. & Shri Nenubai Sukhrajji Solanki</b>
                </div>

                <div className="lineage-divider-mini" />

                <div className="lineage-item">
                  <span className="lineage-rel">Daughter of</span>
                  <b className="lineage-name">Smt. Sharmila & Shri Kishor Solanki</b>
                </div>

                <div className="lineage-divider-mini" />

                <div className="lineage-item maternal-lineage-item">
                  <span className="lineage-rel">Maternal Heritage (Nanihal)</span>
                  <b className="lineage-name">Late Smt. Ratnibai Premchandji Gulabchandji Shrishrimal</b>
                  <span className="lineage-sub-loc">(Naya Jogapura) · Karjat</span>
                </div>

                <div className="lineage-place">
                  <MapPin size={12} />
                  <span>Novi (USA) / Pune</span>
                </div>
              </div>

              {/* Auspicious Union Ornament */}
              <div className="patrika-connector" aria-hidden="true">
                <span className="connector-line" />
                <span className="connector-badge">❦</span>
                <span className="connector-line" />
              </div>

              {/* Groom's Family Side */}
              <div className="patrika-side-card groom-side">
                <div className="patrika-side-header">
                  <span className="side-badge">वर पक्ष · GROOM’S FAMILY</span>
                  <h3 className="side-member-name">Anuj Kothari</h3>
                </div>

                <div className="lineage-item">
                  <span className="lineage-rel">Grandson of</span>
                  <b className="lineage-name">Late Smt. & Shri Shobha Jethmal Kothari</b>
                </div>

                <div className="lineage-divider-mini" />

                <div className="lineage-item">
                  <span className="lineage-rel">Son of</span>
                  <b className="lineage-name">Smt. Bindu & Shri Rakesh Kothari</b>
                </div>

                <div className="lineage-place">
                  <MapPin size={12} />
                  <span>Badgaon, Chennai</span>
                </div>
              </div>
            </div>

            <div className="patrika-card-preview-action">
              <button 
                className="view-original-card-btn"
                onClick={() => setCardModalOpen(true)}
              >
                <Eye size={15} /> View Official “We Said Yes” Announcement Card
              </button>
              <button 
                className="view-original-card-btn myra-callout-btn"
                onClick={() => setMyraModalOpen(true)}
              >
                <Sparkles size={15} /> View Mayra (Mamera) Patrika & Guest Honors
              </button>
            </div>
          </section>

          {/* Section 4: Interactive Scratch Date */}
          <ScratchDate onCalendar={calendar} />

          {/* Section 5: Auspicious Countdown */}
          <section className="countdown-section wedding-card">
            <CornerOrnaments />
            <span className="card-kicker">THE COUNTDOWN TO FOREVER</span>
            <h2 className="section-title">Every Heartbeat Closer</h2>
            <p className="countdown-lead">Until the celebrations commence in Lonavala</p>

            <div className="countdown-grid" aria-label="Time remaining until our wedding ceremony">
              <div className="countdown-card">
                <b>{String(time.days).padStart(2, '0')}</b>
                <span>DAYS</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-card">
                <b>{String(time.hours).padStart(2, '0')}</b>
                <span>HOURS</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-card">
                <b>{String(time.minutes).padStart(2, '0')}</b>
                <span>MINUTES</span>
              </div>
              <div className="countdown-separator">:</div>
              <div className="countdown-card seconds">
                <b>{String(time.seconds).padStart(2, '0')}</b>
                <span>SECONDS</span>
              </div>
            </div>

            <div className="countdown-footer">
              <Clock size={13} />
              <span>Saturday 23rd & Sunday 24th January 2027 · Lonavala</span>
            </div>
          </section>

          {/* Section 6: Cherished Moments & Gallery */}
          <section className="moments-section wedding-card" id="moments">
            <CornerOrnaments />
            <div className="section-crest">
              <Sparkles size={18} className="crest-icon" />
            </div>
            <span className="card-kicker">OUR CHERISHED MOMENTS</span>
            <h2 className="section-title">Glimpses of Us</h2>
            <p className="section-lead">A few gentle frames. A lifetime of happiness.</p>

            <div
              className="photo-carousel"
              onTouchStart={e => {
                touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
              }}
              onTouchEnd={e => {
                if (!touch.current) return;
                const dx = e.changedTouches[0].clientX - touch.current.x;
                const dy = e.changedTouches[0].clientY - touch.current.y;
                if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
                  moveSlide(dx < 0 ? 1 : -1);
                }
                touch.current = null;
              }}
            >
              <div className="carousel-photo-frame" onDoubleClick={handleDoubleTapPhoto}>
                <div className="photo-tag-pill">
                  <span>{photos[slide].tag}</span>
                </div>

                <img
                  key={slide}
                  src={imageUrl(photos[slide].id)}
                  alt={photos[slide].alt}
                  loading="lazy"
                  className="carousel-img"
                />

                <div className="photo-frame-overlay">
                  <button
                    className="expand-photo-btn"
                    aria-label={`Enlarge photo ${slide + 1}`}
                    onClick={() => lightbox.current?.showModal()}
                  >
                    <Maximize2 size={16} />
                  </button>
                  <button
                    className="heart-reaction-btn"
                    aria-label="Send love to couple"
                    onClick={handleDoubleTapPhoto}
                  >
                    <Heart size={16} />
                  </button>
                </div>

                {heartBurst && (
                  <div className="heart-burst-anim" aria-hidden="true">
                    <Heart size={54} fill="#b84a32" color="#b84a32" />
                  </div>
                )}
              </div>

              <button
                className="photo-arrow previous"
                aria-label="Previous photo"
                onClick={() => moveSlide(-1)}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                className="photo-arrow next"
                aria-label="Next photo"
                onClick={() => moveSlide(1)}
              >
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="photo-dots">
              {photos.map((p, i) => (
                <button
                  key={p.id}
                  aria-label={`Show photograph ${i + 1}`}
                  aria-pressed={i === slide}
                  onClick={() => {
                    setSlide(i);
                    audioSystem.playChimeSound(523.25, 0.08);
                  }}
                  className={i === slide ? 'active' : ''}
                >
                  <span />
                </button>
              ))}
            </div>

            <p className="photo-caption">{photos[slide].caption}</p>
            <span className="photo-hint">Double tap photo to send love ❤️</span>
          </section>

          {/* Section 7: 2-Day Program Itinerary */}
          <section className="programme-section wedding-card" id="celebrations">
            <CornerOrnaments />
            <div className="section-crest">
              <CalendarDays size={20} className="crest-icon" />
            </div>
            <span className="card-kicker">TWO DAYS OF FESTIVITIES</span>
            <h2 className="section-title">Ceremonies & Celebrations</h2>
            <p className="section-lead">A sacred journey illuminated by ancient traditions, music, dance, and joyous feasts.</p>

            {/* Day Selector Chips */}
            <div className="schedule-tabs" role="tablist" aria-label="Select celebration day">
              <button
                className={`schedule-tab-btn ${activeDayFilter === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setActiveDayFilter('all');
                  audioSystem.playChimeSound(587.33, 0.08);
                }}
                role="tab"
                aria-selected={activeDayFilter === 'all'}
              >
                All Events (6)
              </button>
              <button
                className={`schedule-tab-btn ${activeDayFilter === 1 ? 'active' : ''}`}
                onClick={() => {
                  setActiveDayFilter(1);
                  audioSystem.playChimeSound(659.25, 0.08);
                }}
                role="tab"
                aria-selected={activeDayFilter === 1}
              >
                Day 1 · 23 Jan (Sat)
              </button>
              <button
                className={`schedule-tab-btn ${activeDayFilter === 2 ? 'active' : ''}`}
                onClick={() => {
                  setActiveDayFilter(2);
                  audioSystem.playChimeSound(783.99, 0.08);
                }}
                role="tab"
                aria-selected={activeDayFilter === 2}
              >
                Day 2 · 24 Jan (Sun)
              </button>
            </div>

            <div className="wedding-timeline">
              {filteredEvents.map((event, i) => {
                const globalIndex = events.indexOf(event);
                const isExpanded = expanded === globalIndex;
                const isNewDay = i === 0 || event.day !== filteredEvents[i - 1].day;

                return (
                  <React.Fragment key={event.title}>
                    {activeDayFilter === 'all' && isNewDay && (
                      <div className="day-separator-ribbon">
                        <span className="ribbon-line" />
                        <span className="ribbon-text">{event.dayLabel}</span>
                        <span className="ribbon-line" />
                      </div>
                    )}

                    <article
                      className={`timeline-card ${isExpanded ? 'expanded' : ''}`}
                    >
                      <button
                        className="timeline-header-btn"
                        onClick={() => {
                          setExpanded(isExpanded ? -1 : globalIndex);
                          audioSystem.playChimeSound(587.33, 0.08);
                        }}
                        aria-expanded={isExpanded}
                        aria-controls={`event-detail-${globalIndex}`}
                      >
                        <div className="timeline-marker">
                          <span className="marker-icon">{event.icon}</span>
                          <span className="marker-ring" />
                        </div>

                        <div className="timeline-title-group">
                          <div className="timeline-meta-row">
                            <span className="event-time-badge">{event.time}</span>
                            <span className="event-day-mini">{event.dateShort}</span>
                            <span className="event-tag-pill">{event.tag}</span>
                          </div>
                          <h3 className="event-name">{event.title}</h3>
                          <span className="event-sanskrit">{event.sanskrit}</span>
                        </div>

                        <div className="timeline-toggle-icon">
                          {isExpanded ? <Minus size={15} /> : <Plus size={15} />}
                        </div>
                      </button>

                      <div
                        id={`event-detail-${globalIndex}`}
                        className={`timeline-body ${isExpanded ? 'open' : ''}`}
                        hidden={!isExpanded}
                      >
                        <p className="event-detail-text">{event.detail}</p>

                        {event.myraDetails && (
                          <div className="myra-compact-card">
                            {/* Hindi Verse */}
                            <div className="myra-compact-verse-wrap">
                              <span className="myra-compact-flourish">❦</span>
                              <p className="myra-compact-verse">
                                “नाना - नानी का आशीर्वाद, मामा - मामी<br />
                                मायरे की रस्म में छुपे हैं अनगिनत जज़्बात।”
                              </p>
                            </div>

                            {/* Section 1: Elders (Nana - Nani) */}
                            <div className="myra-compact-section elders-section">
                              <div className="myra-compact-header">
                                <Sparkles size={11} className="myra-compact-icon" />
                                <span className="myra-compact-badge">{event.myraDetails.eldersBadge}</span>
                              </div>
                              <div className="myra-compact-elder-row">
                                <b className="myra-elder-name">{event.myraDetails.elderName}</b>
                                <span className="myra-elder-place">
                                  <MapPin size={10} /> {event.myraDetails.elderOrigin}
                                </span>
                              </div>
                            </div>

                            {/* Section 2: Main Guests (Mamas & Mamis) */}
                            <div className="myra-compact-section mamas-section">
                              <div className="myra-compact-header">
                                <Heart size={11} className="myra-compact-icon" />
                                <span className="myra-compact-badge">{event.myraDetails.mamasBadge}</span>
                              </div>
                              
                              <div className="myra-couples-grid">
                                {event.myraDetails.couples.map((couple, cIdx) => (
                                  <div 
                                    key={cIdx} 
                                    className={`myra-couple-pair ${couple.isNextGen ? 'next-gen' : ''}`}
                                  >
                                    <span className="couple-name">{couple.wife}</span>
                                    <span className="couple-amp">&</span>
                                    <span className="couple-name">{couple.husband}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <button
                              type="button"
                              className="myra-compact-patrika-btn"
                              onClick={() => setMyraModalOpen(true)}
                            >
                              <Eye size={10} /> View Patrika
                            </button>
                          </div>
                        )}
                      </div>
                    </article>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="programme-footer-badge">
              <Compass size={13} />
              <span>All auspicious rituals will be conducted in Indian Standard Time (IST)</span>
            </div>
          </section>

          {/* Section 8: The Grand Venue & Location Hub */}
          <section className="venue-section wedding-card" id="venue">
            <CornerOrnaments />
            <div className="section-crest">
              <MapPin size={22} className="crest-icon" />
            </div>
            <span className="card-kicker">THE WEDDING DESTINATION</span>
            <h2 className="section-title">Purohit Holiday Resort</h2>
            <p className="venue-subtitle">Lonavala · Maharashtra</p>

            <div className="venue-showcase-box">
              <div className={`map-container ${mapActive ? 'interactive' : 'stylized'}`}>
                {mapActive ? (
                  <iframe
                    title="Interactive Google Map of Purohit Holiday Resort in Lonavala"
                    src="https://maps.google.com/maps?q=Purohit%20Holiday%20Resort%20Lonavala&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="stylized-venue-preview" onClick={() => setMapActive(true)}>
                    <div className="venue-crest-badge">
                      <MapPin size={26} />
                      <span className="pulse-ring" />
                    </div>
                    <b>Purohit Holiday Resort</b>
                    <small>Near S.T. Bus Stand, Lonavala</small>
                    <span className="tap-explore-pill">
                      <Compass size={13} /> Tap to Open Live Map
                    </span>
                  </div>
                )}

                {mapActive && (
                  <button
                    className="close-interactive-map"
                    onClick={() => setMapActive(false)}
                    aria-label="Close live map view"
                  >
                    <span>Close Map</span>
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="venue-action-grid">
                <a
                  className="wedding-wine-btn"
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Navigation size={15} /> DIRECTIONS (GOOGLE MAPS)
                </a>

                <a
                  className="wedding-gold-btn"
                  href={googleShareUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Share2 size={15} /> OPEN GOOGLE SHARE LINK
                </a>

                <button className="wedding-gold-btn" onClick={copyAddress}>
                  <Copy size={15} /> COPY EXACT ADDRESS
                </button>
              </div>

              <div className="venue-address-block">
                <span className="address-label">VENUE ADDRESS</span>
                <p className="venue-full-address">
                  Purohit Holiday Resort Private Limited,<br />
                  Chhatrapati Shivaji Maharaj Road, Near S.T. Bus Stand,<br />
                  Gawliwada, Rao Colony, Lonavala, Maharashtra 410401
                </p>
                <div className="resort-perks">
                  <span>✦ Surrounded by picturesque Sahyadri hills</span>
                  <span>✦ 500m from Lonavala Railway Station & Bus Stand</span>
                  <span>✦ Convenient drive from Pune & Mumbai via Expressway</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Shower Blessings (Phool Vrushti) */}
          <section className="blessings-card wedding-card">
            <CornerOrnaments />
            <div className="section-crest">
              <span className="blessings-crest-flower">🌸</span>
            </div>
            <span className="card-kicker">PHOOL VRUSHTI · SHOWER BLESSINGS</span>
            <h2 className="section-title">Shower Your Blessings</h2>
            <p className="section-lead">
              Tap below to shower auspicious rose and marigold petals upon Shriya & Anuj!
            </p>

            <div className="blessing-interactive-core">
              <button
                className="shower-flower-btn"
                onClick={showerBlessings}
                aria-label="Shower flower blessings on Shriya and Anuj"
              >
                <span className="shower-ring-pulse" />
                <span className="flower-emoji">🌸</span>
                <span className="shower-btn-text">SHOWER PETALS</span>
              </button>

              <div className="blessing-tally">
                <Heart size={16} fill="#b84a32" color="#b84a32" />
                <b>{blessingsCount.toLocaleString()}</b>
                <span>Blessings showered by loved ones</span>
              </div>
            </div>
          </section>

          {/* Section 10: Grand Final Note & Blessings */}
          <section className="final-note wedding-card">
            <CornerOrnaments />
            <div className="shlok-banner closing">
              <Ganesh className="hero-ganesh small" />
              <span className="shlok-title">॥ ॐ नमः शिवाय ॥</span>
              <p className="shlok-sanskrit closing-verse">
                माङ्गल्यं भगवान् विष्णुः मङ्गलाय तनो हरिः।<br />
                सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके॥
              </p>
            </div>

            <WeddingDivider symbol="❦" />
            <span className="card-kicker">WITH PROFOUND GRATITUDE & REVERENCE</span>
            <h2 className="closing-family-title">The Nagotra Solanki Family</h2>
            <span className="family-and">&</span>
            <h2 className="closing-family-title secondary">The Kothari Family</h2>

            <p className="closing-tagline">
              Nagotra Solanki family welcomes you to celebrate with us. Your gracious presence and cherished blessings will make our celebration complete. We eagerly await your arrival in Lonavala!
            </p>

            <div className="closing-couple-names">
              <span>Shriya</span>
              <i>&</i>
              <span>Anuj</span>
            </div>

            <div className="closing-actions">
              <button className="replay-invitation-btn" onClick={replay}>
                <span>Experience the Invitation Again</span>
                <span className="replay-icon">↺</span>
              </button>
            </div>

            <div className="closing-flowers" aria-hidden="true" />
          </section>
        </main>

        {/* Floating Mobile Luxury Bottom Dock */}
        {phase === 'entered' && (
          <nav className="mobile-luxury-dock" aria-label="Quick invitation actions">
            <button className="dock-btn bless-btn" onClick={showerBlessings} aria-label="Shower flower blessings">
              <span className="dock-icon">🌸</span>
              <span className="dock-label">Bless Couple</span>
            </button>

            <a className="dock-btn" href="#venue" aria-label="Jump to venue and directions">
              <MapPin size={17} />
              <span className="dock-label">Venue</span>
            </a>

            <button className="dock-btn" onClick={calendar} aria-label="Add wedding to calendar">
              <CalendarDays size={17} />
              <span className="dock-label">Save Date</span>
            </button>

            <button className="dock-btn" onClick={share} aria-label="Share invitation with family">
              <Share2 size={17} />
              <span className="dock-label">Share</span>
            </button>
          </nav>
        )}

        {/* Global Toast Message */}
        <div className={`wedding-toast ${toastMessage ? 'visible' : ''}`} role="status">
          <Sparkles size={14} className="toast-sparkle" />
          <span>{toastMessage}</span>
        </div>
      </div>

      {/* High-Resolution Photo Modal Lightbox */}
      <dialog
        ref={lightbox}
        className="lightbox"
        aria-label="Enlarged couple photographs"
        onClick={e => {
          if (e.target === lightbox.current) lightbox.current.close();
        }}
        onKeyDown={e => {
          if (e.key === 'ArrowLeft') moveSlide(-1);
          if (e.key === 'ArrowRight') moveSlide(1);
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close enlarged photo viewer"
          onClick={() => lightbox.current?.close()}
        >
          <X size={22} />
        </button>

        <button
          className="lightbox-prev"
          aria-label="Previous photograph"
          onClick={() => moveSlide(-1)}
        >
          <ArrowLeft size={22} />
        </button>

        <figure className="lightbox-figure">
          <img src={imageUrl(photos[slide].id)} alt={photos[slide].alt} />
          <figcaption>
            <div className="lightbox-caption-text">
              <b className="lightbox-tag">{photos[slide].tag}</b>
              <p>{photos[slide].caption}</p>
            </div>
            <span className="lightbox-counter">{slide + 1} / {photos.length}</span>
          </figcaption>
        </figure>

        <button
          className="lightbox-next"
          aria-label="Next photograph"
          onClick={() => moveSlide(1)}
        >
          <ArrowRight size={22} />
        </button>
      </dialog>

      {/* Official Card Modal */}
      {cardModalOpen && (
        <div 
          className="card-lightbox-backdrop"
          onClick={() => setCardModalOpen(false)}
        >
          <div 
            className="card-modal-content"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="card-modal-close"
              onClick={() => setCardModalOpen(false)}
              aria-label="Close card viewer"
            >
              <X size={20} />
            </button>
            <div className="card-modal-img-wrap">
              <img 
                src="/images/official-card.webp" 
                alt="Official engagement card for Shriya & Anuj with family lineage" 
              />
            </div>
            <p className="card-modal-caption">
              Official Engagement Announcement · Shriya & Anuj
            </p>
          </div>
        </div>
      )}

      {/* Royal Myra (Mamera) Patrika Modal */}
      {myraModalOpen && (
        <div 
          className="myra-modal-overlay"
          onClick={() => setMyraModalOpen(false)}
        >
          <div 
            className="myra-modal-sheet"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-label="Myra Function Patrika"
          >
            <button 
              className="myra-modal-close"
              onClick={() => setMyraModalOpen(false)}
              aria-label="Close Myra Patrika"
            >
              <X size={18} />
            </button>

            <div className="myra-modal-crest">
              <span className="myra-modal-om">॥ श्री गणेशाय नमः ॥</span>
              <h3 className="myra-modal-title">Myra Function</h3>
              <span className="myra-modal-sanskrit">शर्मिला सोलंकी का पावन मायरा (मामेरा)</span>
            </div>

            <div className="myra-modal-quote-box">
              <span className="myra-quote-ornament">❦</span>
              <p className="myra-quote-hindi">
                “नाना - नानी का आशीर्वाद, मामा - मामी<br />
                मायरे की रस्म में छुपे हैं अनगिनत जज़्बात।”
              </p>
            </div>

            {/* Upper Section: The Oldies (Nana-Nani / Ancestors) */}
            <div className="myra-modal-block elders-block">
              <div className="myra-modal-sec-badge">
                <Sparkles size={13} />
                <span>बुज़ुर्गों का आशीर्वाद · NANA - NANI</span>
              </div>
              <p className="myra-modal-sec-desc">Ancestral Blessings & Eternal Guiding Light</p>
              <div className="myra-modal-elder-card">
                <b className="myra-modal-elder-name">Late Smt. Ratnibai Premchandji Gulabchandji Shrishrimal</b>
                <span className="myra-modal-elder-place">
                  <MapPin size={12} /> (Naya Jogapura) · Karjat
                </span>
              </div>
            </div>

            {/* Lower Section: Mamas & Mamis (Main Guests) */}
            <div className="myra-modal-block mamas-block">
              <div className="myra-modal-sec-badge">
                <Heart size={13} />
                <span>मायरा मुख्य अतिथि · MAMAS & MAMIS</span>
              </div>
              <p className="myra-modal-sec-desc">Maternal Family & Main Honored Guests (Mosalu)</p>

              <div className="myra-modal-couples-grid">
                {[
                  { wife: 'Madiya', husband: 'Kishorji' },
                  { wife: 'Shobha', husband: 'Ranjeetji' },
                  { wife: 'Sangeeta', husband: 'Dineshji' },
                  { wife: 'Reena', husband: 'Manojji' },
                  { wife: 'Ritu', husband: 'Pratikji' },
                  { wife: 'Ruchika', husband: 'Shrayji' },
                  { wife: 'Risha', husband: 'Krisha', isNextGen: true }
                ].map((couple, idx) => (
                  <div key={idx} className={`myra-modal-couple-pill ${couple.isNextGen ? 'next-gen' : ''}`}>
                    <span className="modal-couple-name">{couple.wife}</span>
                    <span className="modal-couple-amp">&</span>
                    <span className="modal-couple-name">{couple.husband}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="myra-modal-footer">
              <span className="myra-modal-time">Saturday, 23rd January 2027 · 10:00 AM IST</span>
              <span className="myra-modal-loc">Purohit Holiday Resort, Lonavala</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
