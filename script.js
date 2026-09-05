
// Live Sri Lanka date/time display
(function(){
  const dateEl=document.getElementById("liveDate");
  const timeEl=document.getElementById("liveTime");
  function updateNNTClock(){
    const now=new Date();
    const date=new Intl.DateTimeFormat("en-LK",{timeZone:"Asia/Colombo",weekday:"short",day:"2-digit",month:"short",year:"numeric"}).format(now);
    const time=new Intl.DateTimeFormat("en-LK",{timeZone:"Asia/Colombo",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true}).format(now);
    if(dateEl) dateEl.textContent=date;
    if(timeEl) timeEl.textContent=time+" SLST";
  }
  updateNNTClock();
  setInterval(updateNNTClock,1000);
})();

const nav=document.getElementById("nav"),menu=document.querySelector(".menu"),links=document.getElementById("links"),form=document.getElementById("bookingForm"),pkg=document.getElementById("package"),toast=document.getElementById("toast"),progress=document.getElementById("progress");
window.addEventListener("scroll",()=>{nav.classList.toggle("scrolled",scrollY>25);progress.style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+"%"});
menu.onclick=()=>links.classList.toggle("open");document.querySelectorAll("#links a").forEach(a=>a.onclick=()=>links.classList.remove("open"));
document.querySelectorAll(".reveal").forEach(e=>new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("visible")}}),{threshold:.1}).observe(e));
function selectPackage(p){pkg.value=p;document.getElementById("booking").scrollIntoView({behavior:"smooth"})}
document.querySelectorAll(".choose").forEach(b=>b.onclick=()=>selectPackage(b.dataset.p));

form.onsubmit=e=>{e.preventDefault();let d=new FormData(form);let body=`📸 NEW NNT STUDIO BOOKING\n\nName: ${d.get("name")}\nPhone: ${d.get("phone")}\nPackage: ${d.get("package")}\nDate: ${d.get("date")}\nTime: ${d.get("time")}\nLocation: ${d.get("location")}\nMessage: ${d.get("message")||"None"}\n\n— NNT STUDIO website booking`;if(d.get("method")==="whatsapp")window.open("https://wa.me/94741692115?text="+encodeURIComponent(body),"_blank");else window.open("https://mail.google.com/mail/?view=cm&fs=1&to=tharulamarasinghe16%40gmail.com&su="+encodeURIComponent("New NNT STUDIO Booking — "+d.get("name"))+"&body="+encodeURIComponent(body),"_blank");showToast("Booking request prepared ✓","Your selected contact method should now be open.")};

const messages=document.getElementById("messages"),question=document.getElementById("question"),ask=document.getElementById("ask");
function answer(q){
  const raw=q.trim(), x=raw.toLowerCase();
  const packages={
    personal:["Personal","Starting from Rs. 5,000","personal portraits"],
    customized:["Customized Shoots","Starting from Rs. 6,000","a fully personalized session"],
    couples:["Couples","Starting from Rs. 8,000","couples photography"],
    events:["Events","Starting from Rs. 10,000","event coverage"],
    birthday:["Birthday Shoots","Starting from Rs. 10,000","birthday photography"]
  };
  if(/instagram|insta|ig/.test(x)) return "You can find Nethmin on My Personal Instagram: @nethminnnn_.";
  if(/who|about nnt|about you|photographer|nethmin/.test(x)) return "NNT STUDIO is a Sri Lankan photography studio led by Nethmin Amarasinghe — a new and experienced photographer focused on natural, creative and cinematic photography with a client-first approach.";
  if(/custom|customi|unique|my own idea/.test(x)) return "Customized Shoots are Starting from Rs. 6,000. They are built around your concept, location, style and requirements. You can explain exactly what you want in the booking form.";
  if(/birthday/.test(x)) return "Birthday Shoots are Starting from Rs. 10,000. The session is shaped around your celebration, location and preferred style.";
  if(/event|party|function|coverage/.test(x)) return "Events are Starting from Rs. 10,000 and are designed around the event, venue, schedule and coverage you need.";
  if(/couple|relationship|two of us|partner/.test(x)) return "The Couples package is Starting from Rs. 8,000, with natural posing guidance, professional editing, colour grading and digital delivery.";
  if(/personal|portrait|solo|profile/.test(x)) return "The Personal package is Starting from Rs. 5,000 and is designed for portraits with creative direction, professional editing, colour grading and digital delivery.";
  if(/price|cost|how much|pricing|all package|packages/.test(x)) return "Current NNT STUDIO pricing: Personal Starting from Rs. 5,000 · Customized Shoots Starting from Rs. 6,000 · Couples Starting from Rs. 8,000 · Events Starting from Rs. 10,000 · Birthday Shoots Starting from Rs. 10,000 · Children’s Shoots Starting from Rs. 10,000 · Graduation Shoots Starting from Rs. 10,000. No photo-count limits are displayed on the packages; the session can be discussed around your needs.";
  if(/best|recommend|which.*package|what.*choose|suggest/.test(x)) return "It depends on your shoot: Personal for solo portraits, Customized Shoots for a unique concept, Couples for two people, Birthday Shoots for birthday sessions, and Events for event coverage. Tell me what you're planning and I can narrow it down.";
  if(/book|booking|reserve|appointment|date|whatsapp|email/.test(x)) return "To book, fill in your name, phone, package, preferred date/time, location and message. Then choose WhatsApp or Email. The website prepares the message automatically; NNT STUDIO confirms the final appointment.";
  if(/bring|wear|outfit|prepare|preparation/.test(x)) return "Bring outfits you feel confident in, useful personal items for your concept, and any reference ideas you like. For events, include the venue, schedule and important moments in your booking message.";
  if(/where|location|travel|colombo|sri lanka/.test(x)) return "NNT STUDIO is based in Sri Lanka. Put your preferred shoot location in the booking form so the details can be discussed before confirmation.";
  if(/hidden|charge|fee|extra/.test(x)) return "NNT STUDIO's approach is simple: no hidden charges. Pricing is shown as a range, and any custom requirements can be discussed before the appointment is confirmed.";
  if(/hello|hi|hey|good morning|good evening/.test(x)) return "Hey! 👋 I’m the NNT STUDIO AI guide. I can help you choose a package, compare prices, plan a shoot, prepare for booking, or find Nethmin’s Instagram. What are you planning?";
  return "I can help with NNT STUDIO packages, prices, Personal, Customized Shoots, Couples, Birthday Shoots, Events, booking, preparation, customization, or Nethmin’s Instagram. Try asking: ‘Which package fits me?’";
}
function send(){let q=question.value.trim();if(!q)return;addBubble(q,"user");question.value="";setTimeout(()=>addBubble(answer(q),"bot"),250)}
function addBubble(t,c){let d=document.createElement("div");d.className="bubble "+c;d.textContent=t;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
ask.onclick=send;question.onkeydown=e=>{if(e.key==="Enter")send()};document.querySelectorAll(".quick button").forEach(b=>b.onclick=()=>{question.value=b.dataset.q;send()});

function showToast(title,text){document.getElementById("toastTitle").textContent=title;document.getElementById("toastText").textContent=text;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),5500)}

/* ===== NNT INTERACTION LAYER ===== */
(function(){
  const intro=document.getElementById('cinematicIntro');
  const skip=document.getElementById('introSkip');
  document.body.classList.add('intro-lock');
  const closeIntro=()=>{ if(!intro)return; intro.classList.add('done'); document.body.classList.remove('intro-lock'); try{sessionStorage.setItem('nntIntroSeen','1')}catch(e){} };
  let seen=false; try{seen=sessionStorage.getItem('nntIntroSeen')}catch(e){}
  if(seen){intro?.classList.add('done');document.body.classList.remove('intro-lock')}
  else setTimeout(closeIntro,3000);
  skip?.addEventListener('click',closeIntro);

  const glow=document.getElementById('cursorGlow'), dot=document.getElementById('cursorDot');
  let gx=0,gy=0,dx=0,dy=0;
  window.addEventListener('pointermove',e=>{
    gx+=(e.clientX-gx)*.12; gy+=(e.clientY-gy)*.12; dx+=(e.clientX-dx)*.35; dy+=(e.clientY-dy)*.35;
    if(glow){glow.style.left=gx+'px';glow.style.top=gy+'px';glow.style.opacity='1'}
    if(dot){dot.style.left=dx+'px';dot.style.top=dy+'px';dot.style.opacity='1'}
    const hero=document.querySelector('.hero'); if(hero){hero.style.setProperty('--mx',(e.clientX/window.innerWidth*100)+'%');hero.style.setProperty('--my',(e.clientY/window.innerHeight*100)+'%')}
  });

  // Magnetic buttons on desktop.
  if(matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.btn,.choose,.floating-wa').forEach(el=>{
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);el.style.transform=`translate(${x*.06}px,${y*.06}px)`});
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }

  // Gentle tilt for the main experience cards.
  if(matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.card').forEach(card=>{
      card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`translateY(-8px) perspective(900px) rotateX(${y*-2}deg) rotateY(${x*2}deg)`});
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }

  // Reveal stagger inside grids.
  document.querySelectorAll('.cards,.why-grid,.journey-line').forEach(grid=>{
    [...grid.children].forEach((el,i)=>el.style.transitionDelay=(i*70)+'ms');
  });

  // Active nav link based on visible section.
  const navLinks=[...document.querySelectorAll('#links a')];
  const sections=[...document.querySelectorAll('main section[id]')];
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id))}
  }),{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(s=>io.observe(s));

  // Small parallax movement for hero rings.
  window.addEventListener('scroll',()=>{
    const rings=document.querySelector('.rings');
    if(rings) rings.style.transform=`translateY(${Math.min(scrollY*.035,25)}px) rotate(${Math.min(scrollY*.015,5)}deg)`;
  },{passive:true});
})();
