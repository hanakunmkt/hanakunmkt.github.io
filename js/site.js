(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav=document.getElementById('nav');
  var links=[].slice.call(document.querySelectorAll('.nav a.lk'));
  var targets=links.map(function(a){return document.querySelector(a.getAttribute('href'));});
  function onScroll(){
    nav.classList.toggle('scrolled',scrollY>10);
    var cur=-1;
    targets.forEach(function(t,i){ if(t&&t.offsetParent!==null&&t.getBoundingClientRect().top<innerHeight*.35) cur=i; });
    links.forEach(function(a,i){ a.classList.toggle('on',i===cur); });
  }
  addEventListener('scroll',onScroll,{passive:true}); onScroll();
  if(!('IntersectionObserver' in window)||reduce) return;
  document.documentElement.classList.add('js');
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{rootMargin:'0px 0px -6% 0px',threshold:.06});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
})();

(function(){
  var folds=[].slice.call(document.querySelectorAll('.fold'));
  function set(f,on){ f.classList.toggle('open',on); var h=f.querySelector('.fold-h'); if(h) h.setAttribute('aria-expanded',on?'true':'false'); }
  folds.forEach(function(f){
    var h=f.querySelector('.fold-h');
    h.addEventListener('click',function(){ set(f,!f.classList.contains('open')); });
    h.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); set(f,!f.classList.contains('open')); } });
  });
  function openHash(id){ var t=id&&document.getElementById(id); var f=t&&t.closest('.fold'); if(f) set(f,true); }
  document.addEventListener('click',function(e){ var a=e.target.closest&&e.target.closest('a[href^="#"]'); if(a) openHash(a.getAttribute('href').slice(1)); });
  openHash(location.hash.slice(1));
})();

(function(){
  var nav=document.getElementById('nav'),btn=document.getElementById('menuBtn'),m=document.getElementById('mmenu');
  function set(on){ m.hidden=!on; nav.classList.toggle('menu-open',on); btn.setAttribute('aria-expanded',on?'true':'false'); btn.setAttribute('aria-label',on?'關閉選單':'開啟選單'); }
  btn.addEventListener('click',function(){ set(m.hidden); });
  m.addEventListener('click',function(e){ if(e.target.closest('a')) set(false); });
  document.addEventListener('click',function(e){ if(!m.hidden&&!nav.contains(e.target)) set(false); });
  addEventListener('resize',function(){ if(innerWidth>760) set(false); });
})();
(function(){var t=document.getElementById("totop");t.addEventListener("click",function(e){e.preventDefault();scrollTo({top:0,behavior:"smooth"});});})();
