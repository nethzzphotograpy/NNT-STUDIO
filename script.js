const nav=document.getElementById("nav"),menu=document.querySelector(".menu"),navLinks=document.getElementById("navLinks"),form=document.getElementById("bookingForm"),select=document.getElementById("packageSelect"),toast=document.getElementById("toast");

window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",window.scrollY>25));
menu.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

document.querySelectorAll(".choose").forEach(button=>button.addEventListener("click",()=>{
  select.value=button.dataset.package;
  document.getElementById("booking").scrollIntoView({behavior:"smooth"});
}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
}),{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

form.addEventListener("submit",e=>{
  e.preventDefault();
  const d=new FormData(form);
  const name=d.get("name"),phone=d.get("phone"),pkg=d.get("package"),date=d.get("date"),time=d.get("time"),location=d.get("location"),message=d.get("message")||"None",method=d.get("method");
  const body=`📸 NEW NNT STUDIO BOOKING

Name: ${name}
Phone: ${phone}
Package: ${pkg}
Date: ${date}
Time: ${time}
Location: ${location}
Message: ${message}

— NNT STUDIO website booking`;

  if(method==="whatsapp"){
    window.open(`https://wa.me/94741692115?text=${encodeURIComponent(body)}`,"_blank");
  }else{
    const subject=`New NNT STUDIO Booking — ${name}`;
    window.location.href=`mailto:tharulamarasinghe16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),5000);
});
