(function(){
  const MENU = window.MENU || [], WA = window.WHATSAPP;
  const qty = {};
  const $ = s => document.querySelector(s);
  const money = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const find = id => { for (const c of MENU) for (const i of c.items) if (i.id===id) return i; };
  const fmtDate = iso => { const [y,m,d]=iso.split('-'); return `${d}/${m}/${y}`; };

  // data mínima = hoje (horário local)
  const today = new Date(); today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
  $('#f-data').min = today.toISOString().slice(0,10);

  // cardápio
  $('#menu-list').innerHTML = MENU.map(c => `
    <div class="menu-cat"><h3>${c.cat}</h3>
    ${c.items.map(i => `
      <div class="menu-item">
        <div class="mi-text"><b>${i.name}</b><p>${i.desc||''}</p>
          <span class="mi-price">${i.price!=null ? money(i.price)+(i.unit?' / '+i.unit:'') : 'Sob consulta'}</span></div>
        <div class="stepper" data-id="${i.id}">
          <button type="button" data-d="-1" aria-label="Diminuir ${i.name}">−</button>
          <output id="q-${i.id}">0</output>
          <button type="button" data-d="1" aria-label="Aumentar ${i.name}">+</button>
        </div>
      </div>`).join('')}
    </div>`).join('');

  $('#menu-list').addEventListener('click', e => {
    const b = e.target.closest('button[data-d]'); if (!b) return;
    const id = b.parentElement.dataset.id;
    qty[id] = Math.max(0,(qty[id]||0)+Number(b.dataset.d));
    $('#q-'+id).textContent = qty[id];
    render();
  });

  function lines(){ return Object.keys(qty).filter(id=>qty[id]>0).map(id=>({i:find(id),q:qty[id]})); }

  function render(){
    const ls = lines(), n = ls.reduce((a,l)=>a+l.q,0);
    $('#cart-items').innerHTML = ls.length
      ? ls.map(l=>`<li><span>${l.q}× ${l.i.name}${l.i.unit?' ('+l.i.unit+')':''}</span><span>${l.i.price!=null?money(l.i.price*l.q):'a combinar'}</span></li>`).join('')
      : '<li class="empty">Nenhum item escolhido ainda. Use o + no cardápio, ou descreva seu pedido nas observações.</li>';
    const priced = ls.filter(l=>l.i.price!=null), open = ls.some(l=>l.i.price==null);
    const total = priced.reduce((a,l)=>a+l.i.price*l.q,0);
    $('#cart-total').hidden = !priced.length;
    $('#cart-total').innerHTML = `<span>Total estimado${open?' (itens “a combinar” à parte)':''}</span><b>${money(total)}</b>`;
    const fab = $('#fab'); fab.hidden = n===0; fab.textContent = `Ver minha encomenda (${n})`;
  }

  $('#order-form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, ls = lines(), obs = f.obs.value.trim();
    const err = $('#form-error');
    if (!ls.length && !obs) { err.textContent = 'Escolha pelo menos um item ou descreva o que deseja nas observações.'; return; }
    err.textContent = '';
    const priced = ls.filter(l=>l.i.price!=null), total = priced.reduce((a,l)=>a+l.i.price*l.q,0);
    const msg = [
      '*Nova encomenda — pelo site* 🎂','',
      `👤 *Nome:* ${f.nome.value.trim()}`,
      f.fone.value.trim() ? `📱 *Contato:* ${f.fone.value.trim()}` : null,
      `📅 *Data desejada:* ${fmtDate(f.data.value)}`,
      `⏰ *Horário:* ${f.hora.value}`,
      `🚚 *Forma:* ${f.forma.value}`,'',
      ls.length ? '🛒 *Itens:*' : null,
      ...ls.map(l=>`• ${l.q}× ${l.i.name}${l.i.unit?' ('+l.i.unit+')':''}${l.i.price!=null?' — '+money(l.i.price*l.q):' — a combinar'}`),
      ls.length && priced.length ? `\n💰 *Total estimado:* ${money(total)}` : null,
      obs ? `\n💬 *Observações:* ${obs}` : null,'',
      '_Valores e disponibilidade sujeitos a confirmação._'
    ].filter(x=>x!==null).join('\n');
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
  });

  $('#fab').addEventListener('click',()=>$('#cart').scrollIntoView({behavior:'smooth'}));
  render();
})();
