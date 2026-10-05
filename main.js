document.getElementById('y').textContent=new Date().getFullYear();
const b=document.querySelector('.burger'),m=document.getElementById('menu');
b.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
m.addEventListener('click',()=>{m.classList.remove('open');b.setAttribute('aria-expanded',false)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
