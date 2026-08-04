/* ================= custom cursor ================= */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx=0,my=0, rx=0, ry=0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });
  function ringLoop(){
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(ringLoop);
  }
  ringLoop();
  document.querySelectorAll('a, button, input, textarea, .bento-card, .skill-pill').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });

  /* ================= scroll progress ================= */
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });

  /* ================= typing effect ================= */
  const roleText = 'Full Stack Developer with AI & Data skills';
  const typedEl = document.getElementById('typedRole');
  let charIdx = 0;
  function typeLoop(){
    charIdx++;
    typedEl.textContent = roleText.slice(0, charIdx);
    if(charIdx < roleText.length){
      setTimeout(typeLoop, 55);
    }
  }
  typeLoop();

  /* ================= particle network canvas ================= */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const PARTICLE_COUNT = 70;
  const MAX_DIST = 140;

  function resizeCanvas(){
    const heroEl = document.getElementById('hero');
    w = canvas.width = heroEl.clientWidth;
    h = canvas.height = heroEl.clientHeight;
  }
  function initParticles(){
    particles = Array.from({length: PARTICLE_COUNT}, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-0.5)*0.35,
      vy: (Math.random()-0.5)*0.35,
    }));
  }
  let mouseX = -9999, mouseY = -9999;
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });

  function drawParticles(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;
      const dx = mouseX - p.x, dy = mouseY - p.y;
      const distToMouse = Math.sqrt(dx*dx + dy*dy);
      if(distToMouse < 100){
        p.x -= dx * 0.003;
        p.y -= dy * 0.003;
      }
    }
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < MAX_DIST){
          ctx.strokeStyle = `rgba(168,85,247,${0.16 * (1 - dist/MAX_DIST)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for(const p of particles){
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.8, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(34,211,238,0.75)';
      ctx.fill();
    }
    requestAnimationFrame(drawParticles);
  }
  resizeCanvas(); initParticles(); drawParticles();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  /* ================= skills marquee content ================= */
  const skills = ['Python','JavaScript','TypeScript','SQL','Next.js 14','React.js','Node.js','Firebase',
    'Claude API','Gemini API','Scikit-learn','NLP','Power BI','Tableau','DAX','Excel','Pandas','NumPy',
    'AWS Elastic Beanstalk','Vercel','Git','GitHub'];
  const track = document.getElementById('marqueeTrack');
  function pill(name){
    const el = document.createElement('div');
    el.className = 'skill-pill';
    el.innerHTML = `<span class="dot"></span>${name}`;
    return el;
  }
  [...skills, ...skills].forEach(s => track.appendChild(pill(s)));

  /* ================= scroll reveal ================= */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));