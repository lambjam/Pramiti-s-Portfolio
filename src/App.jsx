import { useEffect, useState } from 'react';
import pramitiPhoto from './assets/pramiti-photo.png';
import journalCharacterSticker from './assets/journal-character-sticker.png';
import strawberrySticker from './assets/strawberry-sticker.png';
import linkUpLogo from './assets/link-up-logo.png';
import reFitSticker from './assets/re-fit-sticker.png';

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
  const [ideaLabOpen, setIdeaLabOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activePage, setActivePage] = useState(null);

  const setOpen = (isOpen) => {
    setFolderOpen(isOpen);
    if (!isOpen) setIdeaLabOpen(false);
  };

  const toggleFolder = () => {
    setFolderOpen((open) => {
      if (open) setIdeaLabOpen(false);
      return !open;
    });
  };

  const openAbout = () => {
    setActivePage(null);
    setAboutOpen(true);
  };

  const openSection = (page) => {
    if (page === 'projects') {
      setIdeaLabOpen(true);
      return;
    }

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

  useEffect(() => {
    if (!ideaLabOpen) return undefined;

    const notebooks = document.querySelectorAll('.idea-notebook');

    if (!('IntersectionObserver' in window)) {
      notebooks.forEach((notebook) => notebook.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    notebooks.forEach((notebook) => observer.observe(notebook));
    return () => observer.disconnect();
  }, [ideaLabOpen]);

  return (
    <main
      className={`site ${folderOpen ? 'open' : ''}${ideaLabOpen ? ' idea-lab-active' : ''}`}
      aria-label="Interactive scrapbook portfolio"
    >
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

      {ideaLabOpen && (
        <div className="idea-lab-view" aria-label="Idea lab notebook pages">
          <button
            className="idea-lab-back"
            type="button"
            onClick={() => setIdeaLabOpen(false)}
          >
            ← Back to sections
          </button>
          <article className="idea-notebook idea-notebook-linkup">
            <span className="idea-notebook-label">PROJECT 1</span>
            <h2>Link-Up</h2>
            <span className="idea-linkup-status">(complete!)</span>
            <img className="idea-linkup-logo" src={linkUpLogo} alt="Link-Up logo" />
            <span className="idea-linkup-action">click here!</span>
          </article>
          <article className="idea-notebook idea-notebook-linkup">
            <span className="idea-notebook-label">PROJECT 2</span>
            <h2>Re-fit</h2>
            <span className="idea-linkup-status">(in progress!)</span>
            <img className="idea-linkup-logo idea-refit-logo" src={reFitSticker} alt="Meet Re-fit sticker" />
            <span className="idea-linkup-action">click here!</span>
          </article>
        </div>
      )}

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
          <button type="button" className="close" aria-label="Close panel" onClick={closePanel}>
            <svg className="close-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 7l10 10M17 7 7 17" />
            </svg>
          </button>
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
              <h2 id="aboutTitle">
                <span className="about-title-text">A little about me...</span>
                <span className="notebook-sparkle" aria-hidden="true">✨</span>
              </h2>
              <div className="notebook-body">
                <div className="about-polaroid" aria-label="Photo placeholder">
                  <span className="polaroid-tape" aria-hidden="true" />
                  <span className="polaroid-sticker polaroid-heart" aria-hidden="true">💗</span>
                  <img className="about-photo-placeholder" src={pramitiPhoto} alt="Pramiti smiling in a pink outfit" />
                  <span className="polaroid-caption">that&apos;s me!</span>
                  <span className="polaroid-sticker polaroid-flower" aria-hidden="true">🌼</span>
                  <svg className="journal-mascot-sticker" viewBox="0 0 120 110" aria-hidden="true">
                    <defs>
                      <linearGradient id="cloud-fill" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#dff8f2" />
                        <stop offset="1" stopColor="#a8dfdb" />
                      </linearGradient>
                    </defs>
                    <path className="sticker-cutline" d="M28 83C14 83 6 74 6 61c0-12 9-22 22-23 3-16 16-27 32-27 15 0 27 10 31 25 14-2 25 8 25 22 0 14-10 25-25 25H28Z" />
                    <path className="mascot-cloud" d="M28 83C14 83 6 74 6 61c0-12 9-22 22-23 3-16 16-27 32-27 15 0 27 10 31 25 14-2 25 8 25 22 0 14-10 25-25 25H28Z" />
                    <circle className="mascot-eye" cx="45" cy="57" r="3" />
                    <circle className="mascot-eye" cx="76" cy="57" r="3" />
                    <path className="mascot-smile" d="M51 67c5 7 14 7 19 0" />
                    <path className="sticker-star-cutline" d="m101 11 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-8Z" />
                    <path className="mascot-star" d="m101 11 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-8Z" />
                  </svg>
                </div>
                <div className="bio-note">
                  <img
                    className="bio-character-sticker"
                    src={journalCharacterSticker}
                    alt="White-outlined character sticker"
                  />
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
              <img className="bio-strawberry-sticker" src={strawberrySticker} alt="" aria-hidden="true" />
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
