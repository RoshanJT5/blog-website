import Link from 'next/link';

export const metadata = {
  title: 'About Us — Wander & Wayfare',
  description: 'Wander & Wayfare started as a shared notes doc between three friends. It\'s now a small, independent publication read in over 40 countries.'
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <span className="hero-tag">Our Story</span>
        <h1>Written by people who'd rather be traveling</h1>
        <p>
          Wander & Wayfare started as a shared notes doc between three friends. It's now a small, 
          independent publication read in over 40 countries.
        </p>
      </section>

      <div className="wrap">
        <div className="about-grid">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=900&auto=format&fit=crop" 
            alt="Team on a coastal trip" 
          />
          <div>
            <h2>Honest writing, no sponsored fluff</h2>
            <p>
              We started Wander & Wayfare in 2021 because we were tired of listicles that read like ads. 
              Every piece we publish is written by someone who actually went there, paid their own way, 
              and came back with something worth saying.
            </p>
            <p>
              Today we're a small team of writers, photographers and editors spread across four continents, 
              publishing new stories every week — no affiliate-stuffed itineraries, no fake five-star reviews.
            </p>
            <p>
              Just the kind of travel writing we always wanted to read ourselves.
            </p>
          </div>
        </div>

        <div className="stats-row fade-up">
          <div className="stat">
            <b>420+</b>
            <span>Stories published</span>
          </div>
          <div className="stat">
            <b>63</b>
            <span>Countries covered</span>
          </div>
          <div className="stat">
            <b>180K</b>
            <span>Monthly readers</span>
          </div>
          <div className="stat">
            <b>5</b>
            <span>Years running</span>
          </div>
        </div>

        <div className="section-head fade-up">
          <div>
            <h2>The people behind the stories</h2>
            <p>A small team, scattered across the world</p>
          </div>
        </div>

        <div className="team-grid">
          <div className="team-card fade-up">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop" 
              alt="Jane Doe portrait" 
            />
            <h4>Jane Doe</h4>
            <span>Founder & Editor</span>
          </div>
          <div className="team-card fade-up">
            <img 
              src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=500&auto=format&fit=crop" 
              alt="Maya Khan portrait" 
            />
            <h4>Maya Khan</h4>
            <span>Destinations Writer</span>
          </div>
          <div className="team-card fade-up">
            <img 
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=500&auto=format&fit=crop" 
              alt="Liam Park portrait" 
            />
            <h4>Liam Park</h4>
            <span>Culinary Editor</span>
          </div>
          <div className="team-card fade-up">
            <img 
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=500&auto=format&fit=crop" 
              alt="Sara Nunez portrait" 
            />
            <h4>Sara Nunez</h4>
            <span>Photography Lead</span>
          </div>
        </div>

        <div className="cta-banner fade-up">
          <h3>Want to write for us?</h3>
          <p>We're always looking for new voices with real stories to tell.</p>
          <Link href="/contact" className="btn-magnetic" style={{ display: 'inline-flex', margin: '0 auto' }}>
            Get in touch →
          </Link>
        </div>
      </div>
    </>
  );
}
