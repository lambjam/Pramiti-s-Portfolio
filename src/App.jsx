import { useState } from 'react';
import pramitiPhoto from './assets/pramiti-photo.png';

const paperContent = {
  achievements: {
    title: 'The plot so far',
    intro:
      'Add your accomplishments, school activities, awards, work experience, and milestones here.',
    closing: 'We\'ll turn this into a full scrapbook page with your real content next.',
  },
  projects: {
    title: 'The idea lab',
    intro:
      'Add your current projects, what inspired each one, your process, and what you are learning.',
    closing: 'This is where your side quests, prototypes, and creative experiments come to life.',
  },
  hobbies: {
    title: 'Things I love',
    intro:
      'Add your hobbies, favorite things, interests, sustainability inspiration, and creative discoveries.',
    closing: 'Let this page feel like your favorite corner of the internet — personal, warm, and alive.',
  },
};

const papers = [
  {
    page: 'achievements',
    icon: '🏆 ✷',
    heading: 'The plot so far',
    description: 'Accomplishments, experiences, milestones, and things I\'m proud of.',
    label: 'CLICK TO OPEN ↗',
  },
  {
    page: 'projects',
    icon: '✂️ 💡',
    heading: 'The idea lab',
    description: 'Projects I\'m building, ideas I\'m testing, and the messy middle.',
    label: 'CLICK TO OPEN ↗',
  },
  {
    page: 'hobbies',
    icon: '♡ ✿',
    heading: 'Things I love',
    description: 'Hobbies, interests, inspiration, and little things that feel like me.',
    label: 'CLICK TO OPEN ↗',
  },
];

function App() {
  const [folderOpen, setFolderOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activePage, setActivePage] = useState(null);

  const setOpen = (isOpen) => {
    setFolderOpen(isOpen);
  };

  const toggleFolder = () => {
    setFolderOpen((open) => !open);
  };

  const openAbout = () => {
    setActivePage(null);
    setAboutOpen(true);
  };

  const openSection = (page) => {
    setActivePage(page);
    setAboutOpen(true);
    setFolderOpen(true);
  };

  const closePanel = () => {
    setAboutOpen(false);
    setActivePage(null);
  };

  const reset = () => {
    setOpen(false);
    closePanel();
  };

  const panelTitle = activePage ? paperContent[activePage].title : 'A little about me...';
  const panelParagraphs = activePage
    ? [
        paperContent[activePage].intro,
        paperContent[activePage].closing,
      ]
    : [
        'Hi! I\'m [Your Name] — a creative, ambitious person who loves turning ideas into something real. I\'m interested in entrepreneurship, sustainability, and all the little things that inspire me to make things.',
        'This is my corner of the internet: part portfolio, part scrapbook, and always a work in progress. Replace this with your own story when you\'re ready.',
      ];

  return (
    <main className={`site ${folderOpen ? 'open' : ''}`} aria-label="Interactive scrapbook portfolio">
      <div className="sky" />
      <div className="grass" />

      <header className="topbar">
        <span>PORTFOLIO</span>
        <span>MADE BY PRAMITI THOPPE ✳</span>
      </header>

      <div className="folder-wrap">
        <div className="folder-back" aria-hidden="true" />
        <div className="folder-inserts" aria-hidden="true">
          <span className="folder-insert folder-insert-back" />
          <span className="folder-insert folder-insert-front" />
        </div>
        <div className="papers" aria-label="Scrapbook sections">
          {papers.map(({ page, icon, heading, description, label }) => (
            <button
              key={page}
              className="paper"
              data-page={page}
              type="button"
              aria-label={`Open ${heading} page`}
              onClick={() => openSection(page)}
            >
              <span className="mini">{icon}</span>
              <h3>{heading}</h3>
              <p>{description}</p>
              <p style={{ marginTop: '10px', fontSize: '11px' }}>{label}</p>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="folder"
          id="folder"
          aria-expanded={folderOpen}
          aria-label="Open folder to reveal portfolio sections"
          onClick={toggleFolder}
        >
          <div className="folder-content">
            <div className="folder-kicker">a little collection of</div>
            <div className="folder-title">
              Pramiti&apos;s
              <br />
              Portfolio
            </div>
            <div className="folder-sub">accomplishments, projects &amp; pieces of me ♡</div>
            <span className="hint">{folderOpen ? 'YOUR PAGES ARE HERE ✳' : 'CLICK TO OPEN THE FOLDER ✳'}</span>
          </div>
        </button>

        <button type="button" className="polaroid" aria-label="Open About Me page" onClick={openAbout}>
          <span className="home-photo-window">
            <img className="photo-placeholder" src={pramitiPhoto} alt="Pramiti smiling in a pink outfit" />
          </span>
          <span className="photo-caption">that&apos;s me!</span>
        </button>
        <div className="polaroid-callout" aria-hidden="true">
          <svg viewBox="0 0 160 80" focusable="false">
            <defs>
              <path id="callout-text-curve" d="M27 15C66 -1 111 13 148 43" />
            </defs>
            <text>
              <textPath href="#callout-text-curve" startOffset="50%" textAnchor="middle">click here</textPath>
            </text>
            <path className="arrow-path" d="M155 68C115 31 70 16 22 32m0 0 15-13m-15 13 18 9" />
          </svg>
        </div>

        <span className="sticker bow" aria-hidden="true">💕</span>
        <span className="sticker heart">💗</span>
        <span className="sticker flower">🌼</span>
      </div>

      <div className="note">ideas in the making ✎</div>

      <footer className="contact-card" aria-label="Contact information">
        <strong>CONTACT ME</strong>
        <ul>
          <li><a href="mailto:pramitit.22@gmail.com">✉️ pramitit.22@gmail.com</a></li>
          <li><a href="tel:+14698617747">☎️ 469-861-7747</a></li>
        </ul>
      </footer>

      <div className="actions">
        <button type="button" className="action" onClick={toggleFolder}>
          {folderOpen ? '✂ Close folder' : '✂ Open folder'}
        </button>
        <button type="button" className="action" onClick={openAbout}>
          ♡ About me
        </button>
        <button type="button" className="action" onClick={reset}>
          ↺ Start over
        </button>
      </div>

      <section className={`about-panel ${aboutOpen ? 'show' : ''}`} role="dialog" aria-modal="true" aria-labelledby="aboutTitle" onClick={(event) => { if (event.target === event.currentTarget) closePanel(); }}>
        <div className={`about-card${activePage ? '' : ' notebook-card'}`}>
          <button type="button" className="close" aria-label="Close panel" onClick={closePanel}>×</button>
          {activePage ? (
            <>
              <h2 id="aboutTitle">{panelTitle}</h2>
              {panelParagraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <span>♡ one page at a time</span>
            </>
          ) : (
            <>
              <h2 id="aboutTitle">A little about me...</h2>
              <div className="notebook-body">
                <div className="about-polaroid" aria-label="Photo placeholder">
                  <img className="about-photo-placeholder" src={pramitiPhoto} alt="Pramiti smiling in a pink outfit" />
                  <span>that&apos;s me!</span>
                </div>
                <div className="bio-note">
                  <div className="about-bio">
                    <h3>hi, i&apos;m pramiti! ♡</h3>
                    <p>I&apos;m a creative thinker, an aspiring entrepreneur, and someone who&apos;s always looking for new ways to turn ideas into something meaningful. Whether I&apos;m developing a new project, exploring a business idea, or creating something just because I&apos;m curious, I love the process of taking a thought and bringing it to life.</p>
                    <p>I&apos;m especially passionate about sustainability, creativity, and finding ways to make a positive impact through the things I create.</p>
                    <p>Outside of my projects and plans, I&apos;m also someone who loves the little things: discovering new interests, collecting inspiration, and finding creativity in unexpected places. I&apos;m ambitious and organized, but I also believe that some of the best ideas come from experimenting and making mistakes</p>
                    <p>This little corner of the internet is a collection of the things that make me <em>me</em> : my accomplishments, projects, and things I like to do.</p>
                    <p>I&apos;m still becoming the person I want to be, and this is where I will document my journey. ✿</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
