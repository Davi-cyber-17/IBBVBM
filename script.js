/* =========================================================
   IBBVBM — Igreja Batista Bíblica Vila Brasílio Machado
   Interações: menu, scroll, formulário, cards e calendário
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Dados dos ministérios ---------- */
  const ministries = [
    {
      group: 'Administração da Igreja',
      positions: [
        { title: 'Diáconos', names: ['Carlos Eduardo Souza', 'José Ricardo Alves', 'Antônio Marcos Ferreira', 'Eduardo Henrique Lima', 'Roberto Carlos Nunes'] },
        { title: 'Tesoureiros', names: ['Paulo Henrique Martins', 'Marcelo Augusto Rocha', 'Fábio Rodrigues Dias', 'Sérgio Luiz Barbosa', 'André Luiz Correia'] },
        { title: 'Secretária', names: ['Fernanda Costa Ribeiro', 'Juliana Aparecida Melo', 'Camila Regina Duarte', 'Patrícia Gomes Teixeira', 'Renata Cristina Pires'] },
        { title: 'Auditores', names: ['Ricardo Almeida Prado', 'Marcos Vinícius Cardoso', 'Cláudio Roberto Farias', 'Leonardo José Peixoto', 'Wagner Luís Monteiro'] },
      ]
    },
    {
      group: 'EBD',
      positions: [
        { title: 'Superintendente da EBD', names: ['João Batista Freitas', 'Vinícius Rodrigo Castro', 'Douglas Silva Andrade', 'Renato César Borges', 'Alexandre Souza Lopes'] },
        { title: 'Professores', names: ['Beatriz Fernandes Lima', 'Mariana Oliveira Santos', 'Tatiane Cristina Moura', 'Rodrigo Almeida Vaz', 'Simone Aparecida Rezende', 'Bruno Henrique Cunha'] },
        { title: 'Bibliotecária', names: ['Ana Paula Souza Lima', 'Débora Cristina Nascimento', 'Larissa Gomes Azevedo', 'Vanessa Regina Franco', 'Cristiane Moreira Batista'] },
      ]
    },
    {
      group: 'Mocidade',
      positions: [
        { title: 'Conselheiro dos Jovens', names: ['Pr. Marcos Vieira Alves', 'Daniel Souza Cavalcante', 'Thiago Ferreira Rangel', 'Gabriel Augusto Siqueira', 'Felipe Rodrigues Nogueira'] },
        { title: 'Líder dos Jovens', names: ['Beatriz Lima Coutinho', 'Larissa Andrade Sales', 'Rafael Santos Bezerra', 'Amanda Cristina Vidal', 'Lucas Gabriel Tavares'] },
      ]
    },
    {
      group: 'Evangelismo e Recepção',
      positions: [
        { title: 'Ministério de Evangelismo', names: ['Sandra Regina Almeida', 'José Carlos Pimenta', 'Márcia Helena Duarte', 'Edson Luiz Barreto', 'Vera Lúcia Nascimento'] },
        { title: 'Introdutores', names: ['Michele Cristina Faria', 'Diego Henrique Sales', 'Priscila Souza Matos', 'Gustavo Adolfo Reis', 'Isabela Cristina Moraes'] },
      ]
    },
    {
      group: 'Música e Louvor',
      positions: [
        { title: 'Corista', names: ['Rafael Santos Medeiros', 'Letícia Fernandes Rocha', 'Vitor Hugo Carvalho', 'Camila Duarte Vasconcelos', 'Bruna Costa Xavier', 'Pedro Henrique Salgado'] },
        { title: 'Regente', names: ['Marcelo Vinícius Gouveia', 'Tatiana Ribeiro Assis', 'Fabrício André Lacerda', 'Ellen Cristina Portela', 'Nelson Roberto Guedes'] },
        { title: 'Instrumentistas', names: ['Lucas Gabriel Fontes', 'Henrique Souza Pontes', 'Rodrigo Silva Amaral', 'Carla Beatriz Nogueira', 'Diego Martins Serafim', 'Yasmin Aparecida Rios'] },
      ]
    },
    {
      group: 'Ministério das Mulheres',
      positions: [
        { title: 'Secretário da União Masculina', names: ['Cláudio Roberto Vidal', 'Emerson Luís Cavalcanti', 'Reginaldo José Assunção', 'Márcio Antônio Bittencourt', 'Wallace Souza Andrade'] },
        { title: 'Tesoureiro da União Masculina', names: ['Robson Carlos Fialho', 'Anderson Luiz Paiva', 'Marcos Paulo Siqueira', 'Fabiano Ricardo Dutra', 'Everton Gomes Salgado'] },
        { title: 'Responsável pela União Feminina', names: ['Maria Aparecida Ramos', 'Solange Cristina Prado', 'Rosana Maria Figueiredo', 'Eliane Souza Bittar', 'Cristina Rodrigues Alencar'] },
      ]
    },
    {
      group: 'Comunicação e Mídias',
      positions: [
        { title: 'Mídias Sociais', names: ['Isadora Cristina Melo', 'Matheus Souza Brandão', 'Nathalia Ferreira Quintão', 'Caio César Oliveira', 'Bianca Almeida Serpa'] },
        { title: 'Equipe do Som', names: ['Gustavo Henrique Paz', 'Vinícius Costa Sampaio', 'Leandro José Marinho', 'Rafael Augusto Cintra', 'Otávio Souza Delgado'] },
      ]
    },
    {
      group: 'Infraestrutura e Serviços',
      positions: [
        { title: 'Manutenção', names: ['Antônio Carlos Ferraz', 'José Roberto Coimbra', 'Valdir Aparecido Sales', 'Adriano Luís Bastos', 'Nilton César Pacheco'] },
        { title: 'Decoração', names: ['Aline Cristina Boscardin', 'Kelly Regina Fagundes', 'Juliane Souza Cerqueira', 'Tamires Aparecida Leal', 'Débora Fontenele Rangel'] },
        { title: 'Equipes da Cozinha', names: ['Marta Aparecida Guimarães', 'Rosemeire Souza Cintra', 'Ivone Cristina Salviano', 'Terezinha Maria Bicalho', 'Aparecida Donizete Serra'] },
      ]
    },
  ];

  const ministriesGrid = document.getElementById('ministriesGrid');
  if (ministriesGrid) {
    ministriesGrid.innerHTML = ministries.map((m, i) => `
      <article class="ministry-group reveal" data-index="${i}">
        <button type="button" class="ministry-group__header" aria-expanded="false" aria-controls="ministryBody${i}">
          <span class="ministry-group__title">${m.group}</span>
          <span class="ministry-group__count">${m.positions.length} cargo${m.positions.length > 1 ? 's' : ''}</span>
          <span class="ministry-group__icon" aria-hidden="true">+</span>
        </button>
        <div class="ministry-group__body" id="ministryBody${i}">
          <div class="ministry-group__inner">
            <div class="ministry-group__positions">
              ${m.positions.map(p => `
                <div class="ministry-position">
                  <h4>${p.title}</h4>
                  <ul class="ministry-position__names">
                    ${p.names.map(n => `<li>${n}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </article>
    `).join('');

    ministriesGrid.querySelectorAll('.ministry-group__header').forEach(header => {
      header.addEventListener('click', () => {
        const group = header.closest('.ministry-group');
        const isOpen = group.classList.toggle('is-open');
        header.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }

  /* ---------- Calendário ---------- */
  const calendarWidget = document.getElementById('calendarWidget');

  if (calendarWidget) {
    const weeklyEvents = {
      0: ['Escola Bíblica Dominical — 9h00', 'Culto de Adoração — 18h30'],
      3: ['Reunião de Oração — 20h00'],
    };

    const specialEvents = [
      { date: '2026-08-16', title: 'Culto de Ceia' },
      { date: '2026-08-29', title: 'Ação Social no bairro' },
      { date: '2026-09-06', title: 'Aniversário da Igreja' },
      { date: '2026-09-19', title: 'Congresso de Casais' },
      { date: '2026-09-27', title: 'Batismo' },
    ];

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const toISODate = (date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    };

    const getEventsForDate = (date) => {
      const events = [...(weeklyEvents[date.getDay()] || [])];
      const iso = toISODate(date);
      specialEvents.filter(e => e.date === iso).forEach(e => events.push(e.title));
      return events;
    };

    const today = new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();
    let selectedISO = null;

    calendarWidget.innerHTML = `
      <div class="calendar__header">
        <button type="button" class="calendar__nav" id="calPrev" aria-label="Mês anterior">‹</button>
        <span class="calendar__label" id="calLabel"></span>
        <button type="button" class="calendar__nav" id="calNext" aria-label="Próximo mês">›</button>
      </div>
      <div class="calendar__weekdays">
        <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
      </div>
      <div class="calendar__days" id="calDays"></div>
      <p class="calendar__hint" id="calHint">Toque em um dia com marcação para ver os eventos.</p>
      <p class="calendar__events-title" id="calEventsTitle"></p>
      <ul class="calendar__events" id="calEventsList"></ul>
    `;

    const calLabel = document.getElementById('calLabel');
    const calDays = document.getElementById('calDays');
    const calHint = document.getElementById('calHint');
    const calEventsTitle = document.getElementById('calEventsTitle');
    const calEventsList = document.getElementById('calEventsList');

    const renderEventsList = () => {
      const monthEvents = specialEvents
        .filter(e => {
          const d = new Date(`${e.date}T00:00:00`);
          return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
        })
        .sort((a, b) => a.date.localeCompare(b.date));

      calEventsTitle.textContent = `Eventos especiais em ${monthNames[viewMonth]}`;

      if (!monthEvents.length) {
        calEventsList.innerHTML = `<li class="calendar__events-empty">Nenhum evento especial agendado para este mês.</li>`;
        return;
      }

      calEventsList.innerHTML = monthEvents.map(e => {
        const d = new Date(`${e.date}T00:00:00`);
        const label = `${String(d.getDate()).padStart(2, '0')} ${monthNames[d.getMonth()].slice(0, 3)}`;
        return `
          <li>
            <span class="calendar__event-date">${label}</span>
            <span class="calendar__event-title">${e.title}</span>
          </li>
        `;
      }).join('');
    };

    const renderCalendar = () => {
      calLabel.textContent = `${monthNames[viewMonth]} de ${viewYear}`;

      const firstDay = new Date(viewYear, viewMonth, 1);
      const startOffset = firstDay.getDay();
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

      let cells = '';
      for (let i = 0; i < startOffset; i++) {
        cells += `<span class="calendar__day calendar__day--empty"></span>`;
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(viewYear, viewMonth, d);
        const iso = toISODate(date);
        const events = getEventsForDate(date);
        const isToday = iso === toISODate(today);
        const isSelected = iso === selectedISO;

        const classes = ['calendar__day'];
        if (events.length) classes.push('calendar__day--has-event');
        if (isToday) classes.push('calendar__day--today');
        if (isSelected) classes.push('calendar__day--selected');

        cells += `
          <button type="button" class="${classes.join(' ')}" data-date="${iso}" ${events.length ? '' : 'disabled'}>
            ${d}
            ${events.length ? '<span class="calendar__day-dot" aria-hidden="true"></span>' : ''}
          </button>
        `;
      }

      calDays.innerHTML = cells;

      calDays.querySelectorAll('.calendar__day--has-event').forEach(btn => {
        btn.addEventListener('click', () => {
          const iso = btn.getAttribute('data-date');
          selectedISO = selectedISO === iso ? null : iso;
          const date = new Date(`${iso}T00:00:00`);
          const events = getEventsForDate(date);

          if (selectedISO) {
            const label = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
            calHint.innerHTML = `<strong>${label}:</strong> ${events.join(' · ')}`;
          } else {
            calHint.textContent = 'Toque em um dia com marcação para ver os eventos.';
          }

          renderCalendar();
          renderEventsList();
        });
      });
    };

    document.getElementById('calPrev').addEventListener('click', () => {
      viewMonth -= 1;
      if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
      renderCalendar();
      renderEventsList();
    });

    document.getElementById('calNext').addEventListener('click', () => {
      viewMonth += 1;
      if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
      renderCalendar();
      renderEventsList();
    });

    renderCalendar();
    renderEventsList();
  }

  /* ---------- Form de Pedidos de Oração ---------- */
  const prayerForm = document.getElementById('prayerForm');
  const prayerFeedback = document.getElementById('prayerFeedback');

  if (prayerForm) {
    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      prayerFeedback.textContent = 'Enviando seu pedido...';
      prayerFeedback.className = 'form__feedback';

      setTimeout(() => {
        prayerForm.reset();
        prayerFeedback.textContent = 'Seu pedido de oração foi recebido com carinho. Estaremos orando!';
        prayerFeedback.classList.add('is-success');
      }, 1000);
    });
  }
  /* ---------- Lista de 20 Missionários ---------- */
  const missionaries = [
    { name: 'Pr. Paulo & Silvia Ramos', field: 'Sertão da Bahia, Brasil', focus: 'Abertura de igrejas e poços artesianos', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
    { name: 'Marcos & Amanda Oliveira', field: 'Maputo, Moçambique', focus: 'Acolhimento infantil e reforço escolar', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { name: 'Miss. Elena Rostova', field: 'Leste Europeu', focus: 'Apoio a refugiados e ensino bíblico', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
    { name: 'Pr. Lucas & Débora Mendes', field: 'Chaco, Paraguai', focus: 'Evangelismo em comunidades indígenas', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { name: 'Família Takahashi', field: 'Tóquio, Japão', focus: 'Discipulado urbano e capelania universitária', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' },
    { name: 'Daniel & Sarah Jenkins', field: 'Norte da Índia', focus: 'Treinamento de líderes nativos', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80' },
    { name: 'Pr. Roberto & Marta Silva', field: 'Manaus (Ribeirinhos), Brasil', focus: 'Barco missionário e assistência médica', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' },
    { name: 'Miss. Beatriz Alencar', field: 'Lisboa, Portugal', focus: 'Plantação de igrejas e evangelismo universitário', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
    { name: 'Carlos & Juliana Duarte', field: 'Sudeste Asiático', focus: 'Tradução das Escrituras para línguas minoritárias', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80' },
    { name: 'Pr. André & Camila Costa', field: 'Luanda, Angola', focus: 'Seminário teológico e formação de pastores', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' },
    { name: 'Gabriel & Raquel Souza', field: 'Arequipa, Peru', focus: 'Ministério com crianças e adolescentes em risco', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80' },
    { name: 'Miss. Noemi Santos', field: 'Oriente Médio', focus: 'Projetos comunitários e ensino de idiomas', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' },
    { name: 'Pr. Felipe & Renata Lima', field: 'Caminho de Santiago, Espanha', focus: 'Acolhimento a peregrinos e evangelismo', img: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=200&q=80' },
    { name: 'Thiago & Vanessa Martins', field: 'Timor-Leste', focus: 'Capacitação profissional e alfabetização de adultos', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80' },
    { name: 'Família Van Der Meer', field: 'Amesterdão, Holanda', focus: 'Evangelismo em centros urbanos secularizados', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80' },
    { name: 'Pr. Samuel & Rute Barbosa', field: 'Sertão do Ceará, Brasil', focus: 'Centro comunitário e apoio à agricultura familiar', img: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80' },
    { name: 'Miss. Cláudia Farias', field: 'Madagáscar', focus: 'Saúde preventiva e nutrição infantil', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' },
    { name: 'Henrique & Letícia Prado', field: 'Chiang Mai, Tailândia', focus: 'Apoio a orfanatos e combate ao tráfico humano', img: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=200&q=80' },
    { name: 'Pr. Marcelo & Patrícia Xavier', field: 'Montevidéu, Uruguai', focus: 'Revitalização de igrejas locais', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
    { name: 'Eduardo & Rebeca Nunes', field: 'Guiné-Bissau', focus: 'Perfuração de poços e evangelismo rural', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  ];

  const missionariesGrid = document.getElementById('missionariesGrid');
  if (missionariesGrid) {
    missionariesGrid.innerHTML = missionaries.map(m => `
      <article class="missionary-card reveal">
        <img src="${m.img}" alt="Foto de ${m.name}" class="missionary-card__img" loading="lazy">
        <h4 class="missionary-card__name">${m.name}</h4>
        <span class="missionary-card__field">${m.field}</span>
        <p class="missionary-card__focus">${m.focus}</p>
      </article>
    `).join('');
  }

  /* ---------- Oferta / Pix ---------- */
  const pixQrCode = document.getElementById('pixQrCode');

  if (pixQrCode) {
    const pixData = {
      key: 'contato@ibbvbm.org.br',
      keyType: 'E-mail',
      merchantName: 'IBBVBM',
      merchantCity: 'SAO PAULO',
      favorecidoLabel: 'Igreja Batista Bíblica Vila Brasílio Machado',
    };

    const emvField = (id, value) => `${id}${String(value.length).padStart(2, '0')}${value}`;

    const crc16 = (str) => {
      let crc = 0xFFFF;
      for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let b = 0; b < 8; b++) {
          crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
          crc &= 0xFFFF;
        }
      }
      return crc.toString(16).toUpperCase().padStart(4, '0');
    };

    const buildPixPayload = ({ key, merchantName, merchantCity }) => {
      const merchantAccountInfo =
        emvField('00', 'BR.GOV.BCB.PIX') +
        emvField('01', key);

      let payload =
        emvField('00', '01') +
        emvField('26', merchantAccountInfo) +
        emvField('52', '0000') +
        emvField('53', '986') +
        emvField('58', 'BR') +
        emvField('59', merchantName.substring(0, 25)) +
        emvField('60', merchantCity.substring(0, 15)) +
        emvField('62', emvField('05', '***'));

      payload += '6304';
      return payload + crc16(payload);
    };

    const payload = buildPixPayload(pixData);

    pixQrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=440x440&data=${encodeURIComponent(payload)}`;
    document.getElementById('pixKeyText').textContent = pixData.key;
    document.getElementById('pixKeyType').textContent = pixData.keyType;
    document.getElementById('pixFavorecido').textContent = pixData.favorecidoLabel;

    const copyBtn = document.getElementById('copyPixBtn');
    const feedback = document.getElementById('pixCopyFeedback');

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pixData.key);
      } catch (err) {
        const temp = document.createElement('textarea');
        temp.value = pixData.key;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }

      copyBtn.textContent = 'Copiado!';
      copyBtn.classList.add('is-copied');
      feedback.textContent = 'Chave Pix copiada para a área de transferência.';

      setTimeout(() => {
        copyBtn.textContent = 'Copiar';
        copyBtn.classList.remove('is-copied');
        feedback.textContent = '';
      }, 2500);
    });
  }

  /* ---------- Cabeçalho com sombra ao rolar ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);

    const backToTop = document.getElementById('backToTop');
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  const closeMenu = () => {
    menuToggle.classList.remove('is-open');
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  /* ---------- Destaque do link ativo no menu ---------- */
  const sections = document.querySelectorAll('main section[id], main .hero[id]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => navObserver.observe(section));

  /* ---------- Botão voltar ao topo ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Animação de revelação ao rolar ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

});