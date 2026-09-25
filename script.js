
const birthdayLetter = `Today isn't just another birthday.
It's a reminder of how lucky I feel to have you in my life.

Your smile, your little expressions, the way you make ordinary moments feel special —
there are so many things about you that I quietly love.

I hope this year gives you confidence to chase every dream,
peace in every difficult moment, and happiness in all the little things.

Keep smiling, keep being the beautiful person you are,
and never forget that you are deeply special to me.

Happy Birthday, Vaishnavi.
Today is your day — and I hope this little surprise makes it a little more beautiful. ❤️`;

function typeLetter(){
  const box = document.getElementById('typedLetter');
  if(!box || box.dataset.done === '1') return;
  box.dataset.done = '1';
  box.textContent = '';
  let i = 0;
  const speed = 18;
  function tick(){
    if(i < birthdayLetter.length){
      box.textContent += birthdayLetter[i++];
      setTimeout(tick, speed);
    }
  }
  tick();
}

let step = 0;
let popped = 0;
const screens = [...document.querySelectorAll('.screen')];
const progress = document.getElementById('progressBar');

function showStep(n){
  step = Math.max(0, Math.min(n, screens.length-1));
  screens.forEach((s,i)=>s.classList.toggle('active', i===step));
  progress.style.width = ((step+1)/screens.length*100)+'%';
  if(step===5) setTimeout(typeLetter, 450);
  if(step===7) makeConfetti();
}
function startMusic(){
  const song = document.getElementById('birthdaySong');
  if (!song) return;
  song.volume = 0.72;
  song.play().then(()=>{
    document.getElementById('musicToggle').classList.add('playing');
  }).catch(()=>{});
}
function toggleMusic(){
  const song = document.getElementById('birthdaySong');
  const btn = document.getElementById('musicToggle');
  if (!song) return;
  if (song.paused){
    song.play().then(()=>btn.classList.add('playing')).catch(()=>{});
  } else {
    song.pause();
    btn.classList.remove('playing');
  }
}
function beginStory(){
  startMusic();
  const scene = document.querySelector('.opening-scene');
  if(scene) scene.classList.add('departing');
  setTimeout(()=>showStep(1), 650);
}
function nextStep(){
  startMusic();
  showStep(step+1);
}
function tease(){
  document.getElementById('teaseText').textContent = "I think you should press the pink button 😄";
}
function popBalloon(el){
  if(el.classList.contains('pop')) return;
  el.classList.add('pop');
  popped++;
  document.getElementById('balloonCount').textContent=popped;
  if(popped===4) document.getElementById('balloonNext').classList.remove('hidden');
}
function blowCandle(){
  const flame=document.getElementById('flame');
  if(flame.classList.contains('out')) return;
  flame.classList.add('out');
  document.getElementById('wishMessage').textContent="Wish made! May it come true. ✨";
  document.getElementById('cakeNext').classList.remove('hidden');
}
function openEnvelope(){
  const env=document.querySelector('.envelope');
  env.classList.add('open');
  document.getElementById('envelopeHint').textContent="Your letter is ready 💗";
  document.getElementById('letterNext').classList.remove('hidden');
}
function openGift(){
  const gift=document.querySelector('.gift');
  gift.classList.add('open');
  document.getElementById('giftHint').textContent="Surprise! ❤️";
  setTimeout(nextStep,900);
}
function makeConfetti(){
  const box=document.getElementById('confetti');
  box.innerHTML='';
  for(let i=0;i<85;i++){
    const p=document.createElement('span');
    p.className='confetti-piece';
    p.style.left=Math.random()*100+'%';
    p.style.animationDelay=(Math.random()*1.5)+'s';
    p.style.transform=`rotate(${Math.random()*360}deg)`;
    p.style.background=['#e85d8f','#f3b3ca','#f5c86b','#8bb9a5','#a98bd4'][Math.floor(Math.random()*5)];
    p.style.borderRadius=Math.random()>.5?'50%':'2px';
    box.appendChild(p);
  }
}
function restart(){
  popped=0;
  document.getElementById('balloonCount').textContent='0';
  document.querySelectorAll('.balloon').forEach(b=>b.classList.remove('pop'));
  document.getElementById('balloonNext').classList.add('hidden');
  document.getElementById('flame').classList.remove('out');
  document.getElementById('wishMessage').textContent='';
  document.getElementById('cakeNext').classList.add('hidden');
  document.querySelector('.envelope').classList.remove('open');
  document.getElementById('letterNext').classList.add('hidden');
  document.querySelector('.gift').classList.remove('open');
  showStep(0);
}
showStep(0);
function openPhotoViewer(src) {
  const viewer = document.getElementById("photoViewer");
  const photo = document.getElementById("fullPhoto");

  photo.src = src;
  viewer.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closePhotoViewer(event) {
  if (event) event.stopPropagation();

  const viewer = document.getElementById("photoViewer");
  viewer.classList.remove("show");
  document.body.style.overflow = "";
}
