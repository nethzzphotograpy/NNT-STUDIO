
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
document.querySelectorAll(".choose,.type-card").forEach(b=>b.onclick=()=>selectPackage(b.dataset.p));

form.onsubmit=e=>{e.preventDefault();let d=new FormData(form);let body=`📸 NEW NNT STUDIO BOOKING\n\nName: ${d.get("name")}\nPhone: ${d.get("phone")}\nPackage: ${d.get("package")}\nDate: ${d.get("date")}\nTime: ${d.get("time")}\nLocation: ${d.get("location")}\nMessage: ${d.get("message")||"None"}\n\n— NNT STUDIO website booking`;if(d.get("method")==="whatsapp")window.open("https://wa.me/94741692115?text="+encodeURIComponent(body),"_blank");else window.open("https://mail.google.com/mail/?view=cm&fs=1&to=tharulamarasinghe16%40gmail.com&su="+encodeURIComponent("New NNT STUDIO Booking — "+d.get("name"))+"&body="+encodeURIComponent(body),"_blank");showToast("Booking request prepared ✓","Your selected contact method should now be open.")};

const messages=document.getElementById("messages"),question=document.getElementById("question"),ask=document.getElementById("ask");
function answer(q){q=q.toLowerCase();if(q.includes("best")||q.includes("package"))return"Signature is the most popular: 45 edited photos for Rs. 4,500–5,500. Premium gives 55 photos; Birthdays and Events are priced according to coverage time.";if(q.includes("bring"))return"Bring outfits you love, personal items that fit your concept, and your ideas. For events, share the venue and schedule when booking.";if(q.includes("book"))return"Fill the form, choose WhatsApp or Email, then press Send. NNT STUDIO confirms the final appointment.";if(q.includes("price")||q.includes("cost"))return"Essential Rs. 3,500–4,500 (25 photos) · Signature Rs. 4,500–5,500 (45 photos) · Premium Rs. 5,500–6,500 (55 photos) · Birthdays Rs. 6,500–12,500 (photo count based on event time) · Events Rs. 10,000–15,000 (photo count based on event time). ";return"I can help with packages, pricing, birthday shoots, booking, or shoot preparation. Try asking about the best package 😊."}
function send(){let q=question.value.trim();if(!q)return;addBubble(q,"user");question.value="";setTimeout(()=>addBubble(answer(q),"bot"),250)}
function addBubble(t,c){let d=document.createElement("div");d.className="bubble "+c;d.textContent=t;messages.appendChild(d);messages.scrollTop=messages.scrollHeight}
ask.onclick=send;question.onkeydown=e=>{if(e.key==="Enter")send()};document.querySelectorAll(".quick button").forEach(b=>b.onclick=()=>{question.value=b.dataset.q;send()});

function showToast(title,text){document.getElementById("toastTitle").textContent=title;document.getElementById("toastText").textContent=text;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),5500)}
// Cinematic interaction layer
window.addEventListener('load',()=>document.body.classList.add('loaded'));
(function(){
  const dot=document.querySelector('.cursor-dot'), ring=document.querySelector('.cursor-ring');
  if(!dot||!ring||matchMedia('(max-width:999px)').matches)return;
  let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;dot.style.left=x+'px';dot.style.top=y+'px'});
  function loop(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)} loop();
  document.querySelectorAll('a,button,input,select,textarea,.card,.type-card').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('hover'));el.addEventListener('mouseleave',()=>ring.classList.remove('hover'))});
})();
(function(){
  document.querySelectorAll('.type-card,.card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      if(innerWidth<1000)return;
      const r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${py*-4}deg) rotateY(${px*5}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
})();
(function(){
  const hero=document.querySelector('.hero-inner'),rings=document.querySelector('.rings');
  if(!hero||!rings)return;
  addEventListener('scroll',()=>{if(innerWidth<800)return;const y=Math.min(scrollY,innerHeight);hero.style.transform=`translateY(${y*.07}px)`;rings.style.transform=`translateY(${y*.035}px) rotate(${y*.015}deg)`},{passive:true});
})();
