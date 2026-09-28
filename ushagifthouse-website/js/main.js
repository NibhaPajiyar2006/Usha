(function(){
  // ---- CONFIG: change the WhatsApp number & message here ----
  var WA_NUMBER='919876543210';
  var WA_TEXT='Hello Usha Gift House, I would like to order a gift box.';
  var waUrl=function(t){return 'https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(t||WA_TEXT)};
  document.querySelectorAll('[data-wa]').forEach(function(a){a.href=waUrl();a.target='_blank';a.rel='noopener'});
  document.querySelectorAll('[data-wa-item]').forEach(function(a){a.href=waUrl('Hello Usha Gift House, I am interested in: '+a.dataset.waItem);a.target='_blank';a.rel='noopener'});

  // header
  var hdr=document.getElementById('hdr');
  var onScroll=function(){hdr.classList.toggle('solid',window.scrollY>40)};
  onScroll();addEventListener('scroll',onScroll,{passive:true});

  // mobile menu
  var burger=document.getElementById('burger'),mm=document.getElementById('mmenu');
  var setMenu=function(o){burger.setAttribute('aria-expanded',o);mm.classList.toggle('open',o);mm.setAttribute('aria-hidden',!o);document.body.style.overflow=o?'hidden':''};
  burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
  mm.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});

  // active nav
  var links=[].slice.call(document.querySelectorAll('.nav a'));
  var secs=links.map(function(l){return document.querySelector(l.getAttribute('href'))});
  var spy=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){s&&spy.observe(s)});

  // reveal
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

  // collection cards: hover on desktop, tap on touch
  var cards=[].slice.call(document.querySelectorAll('#cards .card'));
  var act=function(c){cards.forEach(function(x){x.classList.toggle('on',x===c)})};
  cards.forEach(function(c){
    c.addEventListener('mouseenter',function(){if(matchMedia('(hover:hover) and (min-width:901px)').matches)act(c)});
    c.addEventListener('focus',function(){act(c)});
    c.addEventListener('click',function(){act(c)});
  });

  // hero parallax
  var hi=document.getElementById('heroImg');
  if(hi&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    addEventListener('scroll',function(){var y=Math.min(scrollY,700);hi.style.transform='translateY('+(y*.06)+'px) scale('+(1+y*.0001)+')'},{passive:true});
  }

  // gallery rail
  var rail=document.getElementById('rail');
  var step=function(){var c=rail.querySelector('.gcard');return c?c.offsetWidth+26:340};
  document.getElementById('gNext').addEventListener('click',function(){rail.scrollBy({left:step()*2,behavior:'smooth'})});
  document.getElementById('gPrev').addEventListener('click',function(){rail.scrollBy({left:-step()*2,behavior:'smooth'})});
  rail.addEventListener('keydown',function(e){if(e.key==='ArrowRight')rail.scrollBy({left:step(),behavior:'smooth'});if(e.key==='ArrowLeft')rail.scrollBy({left:-step(),behavior:'smooth'})});
  var down=false,sx=0,sl=0,moved=false;
  rail.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=rail.scrollLeft});
  addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;rail.classList.add('drag')}rail.scrollLeft=sl-dx});
  addEventListener('pointerup',function(){if(!down)return;down=false;rail.classList.remove('drag')});
  rail.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);

  // process line trigger
  var so=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in')}})},{threshold:.4});
  document.querySelectorAll('.step').forEach(function(s){so.observe(s)});

  // FAQ accordion
  var items=[].slice.call(document.querySelectorAll('#acc .qi'));
  items.forEach(function(it){
    var b=it.querySelector('button');
    b.addEventListener('click',function(){
      var open=it.classList.contains('open');
      items.forEach(function(x){x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});
      if(!open){it.classList.add('open');b.setAttribute('aria-expanded','true')}
    });
  });

  // newsletter
  document.getElementById('nl').addEventListener('submit',function(e){
    e.preventDefault();
    var v=document.getElementById('nlEmail'),m=document.getElementById('nlMsg');
    if(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.value)){m.textContent='Thank you! You are subscribed for festive offers.';v.value=''}
    else{m.textContent='Please enter a valid email address.'}
  });
})();