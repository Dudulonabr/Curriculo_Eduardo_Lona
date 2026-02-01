(function () {
  'use strict';

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.section');
  sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(24px)';
    section.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    observer.observe(section);
  });

  const style = document.createElement('style');
  style.textContent = `
    .section.is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  const navSticky = document.getElementById('nav-sticky');
  const backToTop = document.getElementById('back-to-top');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  function updateScrollUI() {
    const y = window.scrollY;
    const showNav = y > 400;
    const showBack = y > 800;

    if (navSticky) {
      navSticky.classList.toggle('is-visible', showNav);
    }
    if (backToTop) {
      backToTop.classList.toggle('is-visible', showBack);
    }
  }

  function openNavMenu() {
    if (!navSticky || !navToggle || !navMenu) return;
    navSticky.classList.add('is-menu-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Fechar menu');
    document.body.style.overflow = 'hidden';
  }

  function closeNavMenu() {
    if (!navSticky || !navToggle || !navMenu) return;
    navSticky.classList.remove('is-menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.style.overflow = '';
  }

  function toggleNavMenu() {
    if (navSticky && navSticky.classList.contains('is-menu-open')) {
      closeNavMenu();
    } else {
      openNavMenu();
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleNavMenu);
  }

  if (navMenu) {
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeNavMenu();
      });
    });
  }

  document.addEventListener('click', function (e) {
    if (!navSticky || !navSticky.classList.contains('is-menu-open')) return;
    if (navToggle && navToggle.contains(e.target)) return;
    if (navMenu && navMenu.contains(e.target)) return;
    closeNavMenu();
  });

  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && navSticky && navSticky.classList.contains('is-menu-open')) {
      closeNavMenu();
    }
  });
  updateScrollUI();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const competencias = {
    foco: {
      titulo: 'Foco e disciplina',
      texto: 'Consigo manter a atenção em metas de longo prazo e cumprir prazos com consistência, seja nos estudos ou nas entregas do trabalho freelancer. Essa competência é um ponto forte porque me permite evoluir de forma contínua e confiável, mesmo quando o conteúdo é desafiador, e transmite seriedade para equipes e recrutadores.'
    },
    analitico: {
      titulo: 'Raciocínio analítico',
      texto: 'Tenho facilidade em quebrar problemas complexos em partes menores e encontrar soluções lógicas, o que aplico tanto em programação quanto em suporte e diagnóstico de TI. É um diferencial porque acelera a resolução de bugs, a compreensão de sistemas e a tomada de decisões baseada em dados e evidências.'
    },
    comunicacao: {
      titulo: 'Comunicação clara',
      texto: 'Busco explicar ideias técnicas de forma acessível e documentar o que faço, algo que desenvolvi no suporte ao usuário e na organização de informações. Considero um ponto forte porque facilita o trabalho em equipe, a troca de conhecimento e a inclusão de pessoas não técnicas nas conversas sobre tecnologia.'
    },
    organizacao: {
      titulo: 'Organização e planejamento',
      texto: 'Uso planejamento e priorização para cumprir prazos e manter a qualidade das entregas, tanto nos estudos (duas graduações em andamento) quanto no trabalho freelancer. Essa competência me ajuda a ser previsível e eficiente e a conciliar múltiplas frentes sem perder o foco no que é mais importante.'
    },
    autodidatismo: {
      titulo: 'Autodidatismo',
      texto: 'Gosto de buscar aprendizado por conta própria, seja em cursos online, documentação ou projetos práticos. É um ponto forte porque mostra proatividade e capacidade de evoluir rápido em novas tecnologias, algo muito valorizado em empresas de desenvolvimento que precisam de pessoas que aprendem continuamente.'
    },
    empatia: {
      titulo: 'Empatia e escuta ativa',
      texto: 'Valorizo entender a necessidade do outro antes de agir, o que desenvolvi no atendimento ao usuário e na tradução de termos técnicos para linguagem clara. Considero fundamental para trabalhar em equipe, criar soluções que realmente atendam às pessoas e construir um ambiente de trabalho saudável e colaborativo.'
    }
  };

  const modal = document.getElementById('modal-competencia');
  const modalTitle = modal ? modal.querySelector('.modal-title') : null;
  const modalBody = modal ? modal.querySelector('.modal-body') : null;
  const modalClose = modal ? modal.querySelector('.modal-close') : null;

  function openModal(id) {
    const data = competencias[id];
    if (!modal || !data || !modalTitle || !modalBody) return;
    modalTitle.textContent = data.titulo;
    modalBody.textContent = data.texto;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.tag[data-competence]').forEach((tag) => {
    tag.addEventListener('click', function () {
      const id = this.getAttribute('data-competence');
      if (id && competencias[id]) openModal(id);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });
})();
