// ============================================================
//  SIGA LIVRE — app.js
//  Núcleo do app: estado, navegação, eventos
// ============================================================

// ---------- Estado global ----------
const STATE = {
  tela: "splash",
  setupStep: 0,
  setupVozStep: 0,

  perfil: {
    nome: "",
    fone: "",
    pais: "BR",
    // Idioma da interface: "pt" | "es" | "en"
    idioma: "pt",
    // true se o usuário escolheu manualmente em Configurações (desativa detecção automática)
    idiomaManual: false,
    estado: "DF",
    cidade: "Brasília",
    // Rota habitual
    bairroOrigem:  "Asa Norte",
    bairroDestino: "Asa Sul",
    horarioSaida:  "17:30",
    horarioVolta:  "07:00",
    // Rota alternativa
    origemAlt:     "",
    destinoAlt:    "",
    // Rota ativa
    rotaAtiva: "habitual",
    // true depois que o usuário informa uma rota (ex: "Ir para...")
    rotaInformada: false,
    // Preferências
    alertaCombustivel: true,
    alertaParceiros:   true,
    // Voz
    genero:    "feminino",
    sotaque:   "brasiliense",
    humor:     "extrovertido",
    profissao: "nenhum",
    // Áudio: "tudo" | "so_rota" | "so_alertas" | "silencio"
    audioMode: "tudo",
    // Tema: "dia" | "noite" | "auto"
    tema: "noite",
    // Balões climáticos
    baloesAtivos:    true,
    baloesIntervalo: 5,   // minutos
    // Tipos de rota (presets)
    tipoRotaHabitual:    "trabalho_casa",
    tipoRotaAlternativa: "academia",
    // Veículo: "carro" | "caminhao" (+ altura/largura/comprimento em m, peso em toneladas)
    veiculo: { tipo: "carro" },
    // Alertas de trânsito durante a navegação
    alertaTransito: true,
    alertaTransitoDistanciaKm: 15
  },

  statusAtual:     null,
  incidenteAtual:  null,
  historicoChat:   [],
  tabAtiva:        "dashboard",
  mapIniciado:     false,
  agenteExpandido: false
};

// ---------- Persistência ----------
function salvarPerfil() {
  localStorage.setItem("sigalivre_perfil", JSON.stringify(STATE.perfil));
}
function carregarPerfil() {
  const s = localStorage.getItem("sigalivre_perfil");
  if (s) {
    try { Object.assign(STATE.perfil, JSON.parse(s)); _migrarPerfilLegado(); return true; } catch(e) {}
  }
  return false;
}

// Migra códigos antigos de províncias espanholas (MAD→M, BCN→B, etc.)
const _MIGRA_ES = { MAD:"M", BCN:"B", VLC:"V", SEV:"SE", BIL:"BI", MAL:"MA", ZAR:"Z", ALC:"A" };
function _migrarPerfilLegado() {
  if (STATE.perfil.pais === "ES" && _MIGRA_ES[STATE.perfil.estado]) {
    STATE.perfil.estado = _MIGRA_ES[STATE.perfil.estado];
    STATE.perfil.cidade = _capitalPorUF(STATE.perfil.estado);
    salvarPerfil();
  }
}

// ---------- Navegação de telas (com GSAP) ----------
function irPara(telaNome) {
  const anterior = document.querySelector(".tela.ativa");
  const proxima  = document.getElementById("tela-" + telaNome);
  if (!proxima || anterior === proxima) return;
  if (!anterior) { proxima.classList.add("ativa"); return; }
  STATE.tela = telaNome;

  if (window.gsap) {
    gsap.to(anterior, {
      opacity: 0, y: -18, duration: 0.22, ease: "power2.in",
      onComplete: () => {
        anterior.classList.remove("ativa");
        proxima.classList.add("ativa");
        gsap.fromTo(proxima,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }
        );
        _atualizarFab(telaNome);
      }
    });
  } else {
    anterior.classList.remove("ativa");
    proxima.classList.add("ativa");
    _atualizarFab(telaNome);
  }
}
function _atualizarFab(tela) {
  const fab = document.getElementById("fab-modo-cond");
  if (fab) fab.style.display = (tela === "app") ? "flex" : "none";
}

// ---------- Tabs do app principal ----------
function ativarTab(tab) {
  STATE.tabAtiva = tab;
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("ativa"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("ativa"));

  const novaTab = document.getElementById("tab-" + tab);
  const btnAtivo = document.querySelector(`[data-tab="${tab}"]`);

  if (novaTab) {
    novaTab.classList.add("ativa");
    if (window.gsap) {
      gsap.fromTo(novaTab,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
      // Anima cards do dashboard ao entrar
      if (tab === "dashboard") {
        gsap.fromTo(novaTab.querySelectorAll(".card"),
          { opacity: 0, y: 24, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.07, ease: "power2.out" }
        );
      }
    }
  }
  if (btnAtivo) {
    btnAtivo.classList.add("ativa");
    if (window.gsap) {
      gsap.fromTo(btnAtivo.querySelector("i, .tab-icon-lc"),
        { scale: 0.75 }, { scale: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
  }
  if (tab === "mapa" && !STATE.mapIniciado) iniciarMapa();
  // Esconde o FAB do Modo Condução na aba de Chat: ali ele fica em cima do
  // botão azul de enviar mensagem, no mesmo canto, e os dois ficam desalinhados
  const fabCond = document.getElementById("fab-modo-cond");
  if (fabCond && fabCond.style.display !== "none") {
    fabCond.style.opacity = (tab === "chat") ? "0" : "1";
    fabCond.style.pointerEvents = (tab === "chat") ? "none" : "auto";
  }
  if (window.lucide) lucide.createIcons();
}

// ---------- Splash ----------
function iniciarSplash() {
  // A saída do splash é controlada pelo script mínimo no <head>
  // Aqui apenas iniciamos efeitos visuais extras
  try { iniciarParticulasSplash(); } catch(e){}
  try { setTimeout(() => SOUNDS.startup(), 800); } catch(e){}
}

// ---------- Onboarding ----------
let slideAtual = 0;
const slides = [
  { icon:"🚗", chave:"onboarding.slide1" },
  { icon:"🤖", chave:"onboarding.slide2" },
  { icon:"🎙️", chave:"onboarding.slide3" }
];

function iniciarOnboarding() {
  slideAtual = 0;
  renderSlide();
}
function renderSlide() {
  const s = slides[slideAtual];
  document.getElementById("slide-icon").textContent   = s.icon;
  document.getElementById("slide-titulo").textContent = t(`${s.chave}.titulo`);
  document.getElementById("slide-texto").textContent  = t(`${s.chave}.texto`);
  document.getElementById("btn-voltar-slide").style.display = slideAtual === 0 ? "none" : "flex";
  document.getElementById("btn-proximo-slide").textContent  = slideAtual === slides.length-1 ? t("onboarding.btnUltimo") : t("onboarding.btnProximo");
  animarSlideEntrada();
}
function proximoSlide() {
  if (slideAtual < slides.length - 1) { slideAtual++; renderSlide(); }
  else { irSetup(0); irPara("setup"); }
}
function voltarSlide() {
  if (slideAtual > 0) { slideAtual--; renderSlide(); }
}

// ---------- Setup wizard ----------
const setupTelas = ["setup-perfil","setup-rotas","setup-voz"];
let setupIdx = 0;

function irSetup(idx) {
  setupIdx = Math.max(0, Math.min(setupTelas.length-1, idx));
  document.querySelectorAll(".setup-passo").forEach(p => p.classList.remove("ativo"));
  const passo = document.getElementById(setupTelas[setupIdx]);
  if (passo) passo.classList.add("ativo");
  const prog = document.getElementById("setup-progress");
  if (prog) prog.style.width = `${((setupIdx+1)/setupTelas.length)*100}%`;
  // Mostra/esconde botões do footer (no passo de voz o wizard tem seu próprio botão)
  const btnProx = document.getElementById("btn-setup-proximo");
  const btnVolt = document.querySelector(".setup-footer .btn-secondary");
  const noVoz   = (idx === 2);
  if (btnProx) btnProx.style.display = noVoz ? "none" : "flex";
  if (btnVolt) btnVolt.style.display = noVoz ? "none" : "flex";
  // Ao entrar no passo de voz, sempre inicializa os cards e o sub-wizard
  if (idx === 2) {
    vozPassos = _vozPassosAtivos();
    popularCardsVoz();
    irVozPasso(0);
  }
}
function setupProximo() {
  if (setupIdx === 0) {
    const nome = document.getElementById("inp-nome").value.trim();
    if (!nome) { mostrarToast("Por favor, informe seu nome."); return; }
    STATE.perfil.nome = nome;
    STATE.perfil.fone = document.getElementById("inp-fone").value.trim();
  }
  if (setupIdx === 1) {
    // Localização
    STATE.perfil.pais   = document.getElementById("sel-pais")?.value || "BR";
    STATE.perfil.estado = document.getElementById("sel-estado")?.value || "DF";
    STATE.perfil.cidade = _valorCidadeAtual() || _capitalPorUF(STATE.perfil.estado);
    const bairroLivre   = _valorBairroAtual();
    const isBR = STATE.perfil.pais === "BR";
    // Rota habitual (sem padrão de bairro fora do Brasil — usuário informa origem/destino)
    const origHab  = document.getElementById("inp-origem-hab")?.value.trim()  || bairroLivre || (isBR ? "Asa Norte" : "");
    const destHab  = document.getElementById("inp-destino-hab")?.value.trim() || (isBR ? "Asa Sul" : "");
    STATE.perfil.bairroOrigem  = origHab;
    STATE.perfil.bairroDestino = destHab;
    STATE.perfil.horarioSaida  = document.getElementById("inp-saida")?.value || "17:30";
    STATE.perfil.horarioVolta  = document.getElementById("inp-volta")?.value || "07:00";
    // Rota alternativa
    STATE.perfil.origemAlt  = document.getElementById("inp-origem-alt")?.value.trim() || "";
    STATE.perfil.destinoAlt = document.getElementById("inp-destino-alt")?.value.trim() || "";
    // Preferências
    STATE.perfil.alertaCombustivel = document.getElementById("tog-combustivel")?.checked ?? true;
    STATE.perfil.alertaParceiros   = document.getElementById("tog-parceiros")?.checked ?? true;
    // Tipo de veículo e dimensões (caminhão)
    _lerDimensoesVeiculo("inp-veiculo");
    // Ajusta sotaque automaticamente com base no estado
    ajustarSotaqueEstado(STATE.perfil.estado);
  }
  if (setupIdx < setupTelas.length - 1) {
    irSetup(setupIdx + 1);
  } else {
    salvarPerfil();
    VOICE.init();
    irPara("app");
    atualizarDashboard();
    ativarTab("dashboard");
    mostrarToast(`Bem-vindo, ${STATE.perfil.nome.split(" ")[0]}! 🎉`);
    SOUNDS.success();
  }
}

function ajustarSotaqueEstado(uf) {
  const pais = STATE.perfil.pais || "BR";
  if (pais === "ES") {
    const s = DATA.sotaqueESPorProvincia?.[uf];
    if (s) STATE.perfil.sotaque = s;
    return;
  }
  if (pais === "PT") {
    const s = DATA.sotaquePTPorDistrito?.[uf];
    if (s) STATE.perfil.sotaque = s;
    return;
  }
  const mapa = {
    "BA":"nordestino","CE":"nordestino","PE":"nordestino","MA":"nordestino",
    "PI":"nordestino","RN":"nordestino","PB":"nordestino","AL":"nordestino","SE":"nordestino",
    "RJ":"carioca","SP":"paulistano","MG":"mineiro","RS":"gaucho","SC":"catarinense",
    "PA":"nortista","AM":"nortista","AC":"nortista","RO":"nortista","RR":"nortista","AP":"nortista","TO":"nortista",
    "DF":"brasiliense","GO":"brasiliense","MT":"brasiliense","MS":"brasiliense"
  };
  if (mapa[uf] && !STATE.perfil.sotaque) STATE.perfil.sotaque = mapa[uf];
}
function setupVoltar() {
  if (setupIdx > 0) irSetup(setupIdx - 1);
  else { iniciarOnboarding(); irPara("onboarding"); }
}

// ---------- Setup de Voz (passos dentro do setup) ----------
let vozStep = 0;
function _vozPassosAtivos() {
  return ["voz-genero","voz-sotaque","voz-humor","voz-profissao"];
}
let vozPassos = _vozPassosAtivos();

function irVozPasso(idx) {
  vozStep = Math.max(0, Math.min(vozPassos.length-1, idx));
  document.querySelectorAll(".voz-passo").forEach(p => p.classList.remove("ativo"));
  document.getElementById(vozPassos[vozStep])?.classList.add("ativo");
  document.getElementById("voz-progress-num").textContent = `${vozStep+1} de ${vozPassos.length}`;
  document.getElementById("voz-progress-bar").style.width = `${((vozStep+1)/vozPassos.length)*100}%`;
  document.getElementById("btn-voz-voltar").style.display = vozStep === 0 ? "none" : "flex";
  document.getElementById("btn-voz-proximo").textContent  = vozStep === vozPassos.length-1 ? t("voz.concluir") : t("voz.proximo");
}
function vozProximo() {
  if (vozStep === vozPassos.length - 1) {
    // Fecha sem avançar para próximo setup — setupProximo cuida disso
    setupProximo();
  } else {
    irVozPasso(vozStep + 1);
  }
}
function vozVoltar() {
  if (vozStep > 0) irVozPasso(vozStep - 1);
}

function selecionarGenero(g) {
  STATE.perfil.genero = g;
  document.querySelectorAll(".card-genero").forEach(c => c.classList.remove("selecionado"));
  document.querySelector(`[data-genero="${g}"]`)?.classList.add("selecionado");
}
function selecionarSotaque(s) {
  STATE.perfil.sotaque = s;
  document.querySelectorAll(".card-sotaque").forEach(c => c.classList.remove("selecionado"));
  document.querySelector(`[data-sotaque="${s}"]`)?.classList.add("selecionado");
  const pais = STATE.perfil.pais || "BR";
  const lista = pais === "ES" ? DATA.sotaquesES : pais === "PT" ? DATA.sotaquesPT : DATA.sotaques;
  const st = lista.find(x => x.id === s);
  if (st) mostrarToast(`Sotaque: ${st.regiao}`);
}
function selecionarHumor(h) {
  STATE.perfil.humor = h;
  document.querySelectorAll(".card-humor").forEach(c => c.classList.remove("selecionado"));
  document.querySelector(`[data-humor="${h}"]`)?.classList.add("selecionado");
}
function selecionarProfissao(p) {
  STATE.perfil.profissao = p;
  document.querySelectorAll(".card-profissao").forEach(c => c.classList.remove("selecionado"));
  document.querySelector(`[data-profissao="${p}"]`)?.classList.add("selecionado");
}

// ---------- Dashboard ----------
function atualizarDashboard() {
  // Card "Sua rota agora" só aparece depois que o usuário informa uma rota
  const cardRotaEl = document.getElementById("card-rota");
  if (cardRotaEl) cardRotaEl.style.display = STATE.perfil.rotaInformada ? "" : "none";

  const tipoRota = STATE.perfil.rotaAtiva || "habitual";
  const origem   = tipoRota === "alternativa" && STATE.perfil.origemAlt ? STATE.perfil.origemAlt
                  : tipoRota === "livre" && STATE.perfil.origemLivre    ? STATE.perfil.origemLivre
                  : STATE.perfil.bairroOrigem;
  const destino  = tipoRota === "alternativa" && STATE.perfil.destinoAlt ? STATE.perfil.destinoAlt
                  : tipoRota === "livre" && STATE.perfil.destinoLivre    ? STATE.perfil.destinoLivre
                  : STATE.perfil.bairroDestino;

  const rota = TRAFFIC.rotaParaBairro(origem);

  if (STATE.perfil.rotaInformada) {
    // Label da rota no topo do card
    const rotaTopo = document.getElementById("rota-label-topo");
    if (rotaTopo) {
      const icone = tipoRota === "alternativa" ? "🔀" : tipoRota === "livre" ? "📍" : "🏠";
      rotaTopo.textContent = `${icone} ${origem} → ${destino}`;
    }

    // Mostra imediatamente o último status conhecido (ou uma estimativa simulada
    // enquanto o real não chega, pra tela nunca ficar vazia), e busca em segundo
    // plano o status de trânsito real da TomTom pra essa rota específica
    if (!STATE.statusAtual) STATE.statusAtual = TRAFFIC.getStatus(rota, origem);
    _renderizarStatusRota(STATE.statusAtual, cardRotaEl);

    if (origem && destino) {
      _buscarStatusRotaReal(origem, destino).then(statusReal => {
        if (!statusReal) return;
        STATE.statusAtual = statusReal;
        _renderizarStatusRota(statusReal, cardRotaEl);
      });
    }
  }

  // Alertas combustível / parceiros
  renderAlertas();

  // Saudação
  const h = new Date().getHours();
  const saud = h < 12 ? t("dash.bomDia") : h < 18 ? t("dash.boaTarde") : t("dash.boaNoite");
  const saudEl = document.getElementById("saudacao");
  if (saudEl) saudEl.textContent = `${saud}, ${STATE.perfil.nome.split(" ")[0] || ""}! 👋`;

  const cidadeEl = document.getElementById("saudacao-cidade");
  if (cidadeEl && STATE.perfil.cidade) cidadeEl.textContent = `${STATE.perfil.cidade} — ${t("dash.trafegoAoVivo")}`;

  const topCidade = document.getElementById("top-cidade");
  if (topCidade) {
    const lbl = STATE.perfil.bairroOrigem
      ? `${STATE.perfil.cidade || ""} · ${STATE.perfil.bairroOrigem}`
      : STATE.perfil.cidade || "";
    topCidade.textContent = lbl;
  }

  buscarTemperatura();
  atualizarCombustivel();
  atualizarRelogio();
  renderPrevisao(rota);
  if (window.lucide) lucide.createIcons();
}

// Renderiza a parte do dashboard que depende do status de trânsito (barra, tempo,
// incidente, som/pulso, fala do agente). Chamada duas vezes: uma vez na hora com o
// último status conhecido, e de novo quando o status real da TomTom chega.
function _renderizarStatusRota(status, cardRotaEl) {
  const barraEl = document.getElementById("status-barra");
  if (barraEl) {
    barraEl.textContent       = status.label;
    barraEl.style.background  = status.cor + "22";
    barraEl.style.borderColor = status.cor;
    barraEl.style.color       = status.cor;
  }

  const tempoEl = document.getElementById("status-tempo");
  if (tempoEl) tempoEl.textContent = `${status.tempoTotal} min`;
  const rotaEl = document.getElementById("status-rota");
  if (rotaEl) rotaEl.textContent = status.rota;

  const incEl = document.getElementById("status-incidente");
  if (incEl) {
    if (status.incidente) {
      const inc = status._detalheIncidente || gerarDetalheIncidente(status, TRAFFIC.rotaParaBairro(STATE.perfil.bairroOrigem));
      STATE.incidenteAtual = inc;
      incEl.innerHTML = `
        <div class="incidente-pill" onclick="event.stopPropagation();abrirModalIncidente()">
          ${inc.icone} ${inc.label} — ${inc.local}
          <span class="incidente-pill-seta">→</span>
        </div>`;
      incEl.style.display = "block";
    } else {
      incEl.style.display = "none";
      STATE.incidenteAtual = null;
    }
  }

  if (status.nivel >= 4) setTimeout(() => SOUNDS.alertaTransito(), 600);
  if (cardRotaEl && status.nivel >= 3 && window.gsap) {
    gsap.fromTo(cardRotaEl, { scale:1 }, { scale:1.02, yoyo:true, repeat:3, duration:0.18, ease:"power1.inOut" });
  }

  const msg = AGENT.gerar(status, STATE.perfil);
  const agentMsgEl = document.getElementById("agent-msg-dash");
  if (agentMsgEl) agentMsgEl.textContent = msg;
}

// Mapeia o tipo de incidente real da TomTom (iconCategory 0-14) pra um rótulo legível
function _labelIncidenteTomTom(iconCategory) {
  const mapa = {
    1: { icone:"🚨", label: t("incidente.tipos.acidente") },
    6: { icone:"🚗", label: t("trafego.niveis.congestionado") },
    7: { icone:"🚧", label: t("incidente.tipos.obras") },
    8: { icone:"⛔", label: t("incidente.tipos.obras") },
    9: { icone:"🚧", label: t("incidente.tipos.obras") },
    11:{ icone:"🌊", label: t("incidente.tipos.alagamento") },
    14:{ icone:"🚙", label: t("incidente.tipos.avariado") }
  };
  return mapa[iconCategory] || { icone:"⚠️", label: t("incidente.tipos.acidente") };
}

// Monta o detalhe do incidente real pra exibir na pill/modal, no mesmo formato
// que a versão simulada usa (icone/label/tipo/local/km/ref/situacao)
function _detalheIncidenteReal(incidente, destino) {
  const info = _labelIncidenteTomTom(incidente.properties?.iconCategory);
  const atrasoMin = Math.round(NAV._estimarAtrasoSegundos(incidente) / 60);
  return {
    icone: info.icone,
    label: info.label,
    tipo:  info.label,
    local: destino,
    km:    "",
    ref:   "Detectado ao vivo pela TomTom",
    situacao: atrasoMin > 0 ? `Atraso estimado de ${atrasoMin} min` : t("incidente.trafegoParado")
  };
}

// Busca o status de trânsito REAL (não simulado) entre origem e destino,
// usando a mesma rota (com trânsito) e os mesmos incidentes reais do modo navegação
async function _buscarStatusRotaReal(origem, destino) {
  try {
    const oCoord = await _geocodeLocal(origem || STATE.perfil.cidade, STATE.perfil.pais);
    const dCoord = await _geocodeLocal(destino, STATE.perfil.pais);
    if (!oCoord || !dCoord) return null;

    const veiculo    = STATE.perfil.veiculo;
    const ehCaminhao = veiculo?.tipo === "caminhao";
    const rota = ehCaminhao
      ? await _calcularRotaCaminhao(oCoord, dCoord, veiculo)
      : await _calcularRotaCarro(oCoord, dCoord);
    if (!rota) return null;

    const atrasoSeg = rota.atrasoSegundos || 0;
    let nivel;
    if (atrasoSeg < 30)       nivel = 0;
    else if (atrasoSeg < 120) nivel = 1;
    else if (atrasoSeg < 300) nivel = 2;
    else if (atrasoSeg < 600) nivel = 3;
    else                      nivel = 4;

    // Só busca/mostra incidente quando a própria rota já indica atraso real —
    // evita contradição tipo "obras detectadas" + agente dizendo "rota livre"
    let pior = null;
    if (atrasoSeg >= 60) {
      const bbox      = NAV._bboxDoSegmento(rota.coords);
      const incidentes = await NAV._buscarIncidentesTomTom(bbox);
      const relevantes  = NAV._incidentesNaRota(incidentes, rota.coords);
      pior = relevantes.sort((a,b) => NAV._estimarAtrasoSegundos(b) - NAV._estimarAtrasoSegundos(a))[0];
    }

    return {
      nivel,
      label: [t("trafego.niveis.livre"),t("trafego.niveis.moderado"),t("trafego.niveis.pesado"),t("trafego.niveis.congestionado"),t("trafego.niveis.critico")][nivel],
      cor:   ["#00ff88","#ffcc00","#ff9900","#ff4444","#cc0000"][nivel],
      tempoTotal: rota.min,
      tempoExtra: Math.round(atrasoSeg / 60),
      rota: destino,
      incidente: pior ? _labelIncidenteTomTom(pior.properties?.iconCategory).label : null,
      _detalheIncidente: pior ? _detalheIncidenteReal(pior, destino) : null
    };
  } catch(e) { return null; }
}

// ---------- Tipo de rota ----------
function selecionarTipoRota(tipo) {
  if (tipo === "livre") {
    abrirModalIrPara();
    return;
  }
  STATE.perfil.rotaAtiva = tipo;
  STATE.perfil.rotaInformada = true;
  salvarPerfil();
  document.getElementById("btn-rota-hab")?.classList.toggle("ativa", tipo === "habitual");
  document.getElementById("btn-rota-alt")?.classList.toggle("ativa", tipo === "alternativa");
  document.getElementById("btn-rota-livre")?.classList.remove("ativa");
  SOUNDS.click();
  atualizarDashboard();
  if (window.gsap) {
    const card = document.getElementById("card-rota");
    if (card) gsap.fromTo(card, { opacity:0.6 }, { opacity:1, duration:0.3 });
  }
}

// ---------- Agente expandível no dashboard ----------
function toggleAgenteDash() {
  STATE.agenteExpandido = !STATE.agenteExpandido;
  const el    = document.getElementById("agente-expandido");
  const arrow = document.getElementById("rota-arrow");
  if (el) el.classList.toggle("aberto", STATE.agenteExpandido);
  if (arrow) arrow.classList.toggle("aberto", STATE.agenteExpandido);
  if (STATE.agenteExpandido) {
    SOUNDS.click();
    if (window.gsap) gsap.fromTo(el, { opacity:0, y:10 }, { opacity:1, y:0, duration:0.3 });
  }
}

// ---------- Gerar detalhes de incidente ----------
function gerarDetalheIncidente(status, rotaId) {
  const tiposInc = DATA.incidentesTipos;
  const tipoRand = tiposInc[Math.floor(Math.random() * tiposInc.length)];
  const _pais      = STATE.perfil.pais || "BR";
  const _refsFonte = _pais === "ES" ? DATA.referenciasES : _pais === "PT" ? DATA.referenciasPT : DATA.referencias;
  const _refFallbk = _pais === "BR" ? { km:5, ref:"Próximo ao trevo principal" }
                   : _pais === "PT" ? { km:5, ref:"Trecho principal" }
                   : { km:5, ref:"Tramo principal" };
  const refs       = _refsFonte?.[rotaId] || [_refFallbk];
  const refRand  = refs[Math.floor(Math.random() * refs.length)];
  const idioma   = STATE.perfil.idioma || "pt";
  const fmtKm    = n => idioma === "en" ? n.toFixed(1) : n.toFixed(1).replace(".", ",");
  const situacoes = [1.2, 2.8, 4.5].map(km => _fmt(t("incidente.fila"), { km: fmtKm(km) }));
  situacoes.push(t("incidente.trafegoParado"));
  const label = t(`incidente.tipos.${tipoRand.tipo}`);
  return {
    icone:    tipoRand.icone,
    label:    label,
    tipo:     label,
    local:    status.rota,
    km:       `km ${refRand.km}`,
    ref:      refRand.ref,
    situacao: situacoes[Math.min(status.nivel - 1, situacoes.length - 1)]
  };
}

// ---------- Modal de incidente ----------
function abrirModalIncidente() {
  const inc = STATE.incidenteAtual;
  if (!inc) return;
  document.getElementById("modal-inc-titulo").textContent  = _fmt(t("modal.incidente.tituloDinamico"), { icone: inc.icone, tipo: inc.tipo });
  document.getElementById("modal-inc-tipo").textContent    = inc.tipo;
  document.getElementById("modal-inc-local").textContent   = inc.local;
  document.getElementById("modal-inc-km").textContent      = inc.km;
  document.getElementById("modal-inc-ref").textContent     = inc.ref;
  document.getElementById("modal-inc-situacao").textContent = inc.situacao;
  document.getElementById("modal-incidente")?.classList.add("aberto");
  SOUNDS.notify();
  if (window.lucide) lucide.createIcons();
}
function fecharModalIncidente(e) {
  if (e && e.target !== document.getElementById("modal-incidente")) return;
  document.getElementById("modal-incidente")?.classList.remove("aberto");
}
function verIncidenteNoMapa() {
  fecharModalIncidente();
  ativarTab("mapa");
  SOUNDS.click();
}
function pedirRotaAlternativa() {
  fecharModalIncidente();
  const msgEl = document.getElementById("chat-input");
  if (msgEl) msgEl.value = t("modal.incidente.perguntaAlternativa");
  ativarTab("chat");
  setTimeout(enviarMensagem, 300);
}

// ---------- Google Maps (redirecionar rota) ----------
function abrirGoogleMaps(destinoOverride) {
  const p = STATE.perfil;
  const tipoRota = p.rotaAtiva || "habitual";
  const origem  = (tipoRota === "alternativa" && p.origemAlt)  ? p.origemAlt  : p.bairroOrigem;
  const destino = destinoOverride
    || ((tipoRota === "alternativa" && p.destinoAlt) ? p.destinoAlt : p.bairroDestino);
  const cidade  = p.cidade || "Brasília";
  const pais    = (p.pais === "ES") ? "Espanha" : "Brasil";
  const enc     = s => encodeURIComponent(`${s}, ${cidade}, ${pais}`);
  const url = `https://www.google.com/maps/dir/?api=1&origin=${enc(origem)}&destination=${enc(destino)}&travelmode=driving`;
  window.open(url, "_blank");
  mostrarToast("Abrindo Google Maps…");
  SOUNDS.click();
}

// ---------- Modal "Ir para..." ----------
function abrirModalIrPara() {
  // Popular datalists com bairros do estado atual
  try {
    const pais  = STATE.perfil.pais || "BR";
    const uf    = STATE.perfil.estado || "DF";
    const lista = _bairrosPorPaisUF(pais, uf);
    ["bairros-sugeridos-modal", "bairros-sugeridos-modal-orig"].forEach(dlId => {
      const dl = document.getElementById(dlId);
      if (!dl) return;
      dl.innerHTML = "";
      lista.forEach(b => { const o = document.createElement("option"); o.value = b; dl.appendChild(o); });
    });
    // Pré-preenche origem com bairro do perfil
    const origInput = document.getElementById("inp-origem-livre");
    if (origInput && !origInput.value) origInput.value = STATE.perfil.bairroOrigem || "";
  } catch(e) {}

  const modal = document.getElementById("modal-ir-para");
  if (modal) modal.classList.add("aberto");
  SOUNDS.click();
}
function fecharModalIrPara(e) {
  if (e && e.target !== document.getElementById("modal-ir-para")) return;
  document.getElementById("modal-ir-para")?.classList.remove("aberto");
  document.getElementById("btn-rota-livre")?.classList.remove("ativa");
}

// Usar rota habitual ou alternativa gravada direto do modal
function usarRotaGravada(tipo) {
  fecharModalIrPara();
  STATE.perfil.rotaAtiva = tipo;
  STATE.perfil.rotaInformada = true;
  salvarPerfil();
  document.getElementById("btn-rota-hab")?.classList.toggle("ativa", tipo === "habitual");
  document.getElementById("btn-rota-alt")?.classList.toggle("ativa", tipo === "alternativa");
  document.getElementById("btn-rota-livre")?.classList.remove("ativa");
  SOUNDS.click();
  atualizarDashboard();
}

// Usar GPS para preencher origem ou destino
function usarGPS(campo) {
  const statusEl = document.getElementById("gps-status");
  if (!navigator.geolocation) { mostrarToast("GPS não disponível neste dispositivo"); return; }
  if (statusEl) { statusEl.style.display = "block"; statusEl.textContent = "📡 Obtendo localização..."; }
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude.toFixed(5);
      const lng = pos.coords.longitude.toFixed(5);
      const inputId = campo === "origem" ? "inp-origem-livre" : "inp-destino-livre";
      const inp = document.getElementById(inputId);
      if (inp) inp.value = `${lat}, ${lng}`;
      if (statusEl) { statusEl.textContent = `✅ Localização obtida! (${lat}, ${lng})`; setTimeout(() => { statusEl.style.display = "none"; }, 3000); }
      mostrarToast(`📍 Localização usada como ${campo}`);
    },
    err => {
      if (statusEl) statusEl.style.display = "none";
      mostrarToast("Não foi possível obter a localização. Verifique as permissões.");
    },
    { timeout: 8000, maximumAge: 30000 }
  );
}
async function iniciarRotaLivre() {
  const dest = document.getElementById("inp-destino-livre")?.value.trim();
  if (!dest) { mostrarToast("Informe o destino"); return; }
  const orig = document.getElementById("inp-origem-livre")?.value.trim()
             || STATE.perfil.bairroOrigem || "";
  document.getElementById("modal-ir-para")?.classList.remove("aberto");
  document.getElementById("btn-rota-livre")?.classList.add("ativa");
  document.getElementById("btn-rota-hab")?.classList.remove("ativa");
  document.getElementById("btn-rota-alt")?.classList.remove("ativa");
  STATE.perfil.destinoLivre   = dest;
  STATE.perfil.origemLivre    = orig;
  STATE.perfil.rotaAtiva      = "livre";
  STATE.perfil.rotaInformada  = true;
  salvarPerfil();
  atualizarDashboard();
  ativarTab("mapa");
  if (STATE.mapaMarkerUsuario) {
    STATE.mapaMarkerUsuario.setPopupContent(`📍 ${orig || STATE.perfil.cidade} → ${dest}`).openPopup();
  }
  SOUNDS.click();
  const rota = await tracarRotaNaMapa(orig || STATE.perfil.cidade, dest, STATE.perfil.pais);
  if (rota) NAV.iniciar(rota, dest, STATE._ultimaRota?.destCoord);
}

// ---------- Alertas de combustível e parceiros ----------
const PARCEIROS_MOCK = [
  { nome:"Shell Asa Norte",  desc:"Gasolina aditivada R$ 5,49 — R$ 0,10/L abaixo da média", tipo:"combustivel", raio:1.4 },
  { nome:"Posto Ipiranga",   desc:"Etanol a R$ 3,29 — promoção válida hoje",                tipo:"combustivel", raio:0.8 },
  { nome:"McDonald's W3",    desc:"McOferta: Big Mac + batata + refri por R$ 29,90",        tipo:"parceiro",    raio:0.6 },
  { nome:"Extra Supermercado",desc:"Quinta da promoção — 20% em hortifruti",                tipo:"parceiro",    raio:1.1 },
  { nome:"Posto BR Lago",    desc:"Gasolina a R$ 5,39 — 2 km do Eixão",                   tipo:"combustivel", raio:1.9 }
];

const PARCEIROS_MOCK_PT = [
  { nome:"Galp Expresso",       desc:"Gasolina 95 a 1,67 €/L — 0,04 € abaixo da média",     tipo:"combustivel", raio:1.1 },
  { nome:"Repsol Serviço",      desc:"Gasóleo a 1,54 €/L — desconto Cartão Repsol",          tipo:"combustivel", raio:0.9 },
  { nome:"BP Connect",          desc:"Gasolina 98 a 1,79 €/L — pontos BPme",                 tipo:"combustivel", raio:1.5 },
  { nome:"McDonald's Drive",    desc:"McMenu: hamburguer + batatas + refrigerante por 7,99 €",tipo:"parceiro",    raio:0.7 },
  { nome:"Pingo Doce Express",  desc:"Aberto até às 21h — frescos com 15% de desconto",      tipo:"parceiro",    raio:1.0 }
];

const PARCEIROS_MOCK_ES = [
  { nome:"Repsol Estación",     desc:"Gasolina 95 a 1,64 €/L — 0,05 € bajo la media",       tipo:"combustivel", raio:1.2 },
  { nome:"Cepsa Servicio",      desc:"Gasóleo A a 1,52 €/L — ahorra más en ruta",            tipo:"combustivel", raio:0.9 },
  { nome:"BP Autoservicio",     desc:"Gasolina 98 a 1,78 €/L — descuento Club BP",           tipo:"combustivel", raio:1.6 },
  { nome:"McDonald's Drive",    desc:"Menú del Día: Burger + patatas + bebida por 6,99 €",   tipo:"parceiro",    raio:0.7 },
  { nome:"Mercadona Nearby",    desc:"Abierto hasta las 21:00 — frescos con 15% dto.",       tipo:"parceiro",    raio:1.0 }
];

function renderAlertas() {
  const cont = document.getElementById("alertas-container");
  if (!cont) return;
  const h = new Date().getHours();
  const meioPico = (h >= 6 && h <= 9) || (h >= 16 && h <= 19);
  if (!meioPico && Math.random() > 0.35) { cont.innerHTML = ""; return; }

  const _pais2 = STATE.perfil.pais || "BR";
  const _parceiros = _pais2 === "ES" ? PARCEIROS_MOCK_ES : _pais2 === "PT" ? PARCEIROS_MOCK_PT : PARCEIROS_MOCK;
  const alertas = _parceiros.filter(p => {
    if (p.tipo === "combustivel" && !STATE.perfil.alertaCombustivel) return false;
    if (p.tipo === "parceiro"    && !STATE.perfil.alertaParceiros)   return false;
    return Math.random() > 0.4;
  }).slice(0, 2);

  cont.innerHTML = alertas.map(a => `
    <div class="alerta-strip ${a.tipo === "parceiro" ? "parceiro" : ""}"
         onclick="mostrarToast('${a.nome}: ${a.desc}')">
      <div class="alerta-strip-icon">${a.tipo === "combustivel" ? "⛽" : "🏷️"}</div>
      <div class="alerta-strip-info">
        <div class="alerta-strip-titulo">${a.nome} — ${(a.raio).toFixed(1)} km</div>
        <div class="alerta-strip-desc">${a.desc}</div>
      </div>
      <span style="color:var(--muted);font-size:0.8em;">→</span>
    </div>
  `).join("");
}

function atualizarRelogio() {
  const el = document.getElementById("relogio");
  if (!el) return;
  const agora = new Date();
  const localeMap = { en:"en-GB", es:"es-ES", ptpt:"pt-PT", pt:"pt-BR" };
  const locale = localeMap[STATE.perfil.idioma] || "pt-BR";
  el.textContent = agora.toLocaleTimeString(locale, { hour:"2-digit", minute:"2-digit", second:"2-digit" });
}

// ============================================================
//  CLIMA — Open-Meteo (gratuito, sem chave)
// ============================================================
const _COORDS_UF = {
  AC:{ lat:-9.97,  lon:-67.81 }, AL:{ lat:-9.66,  lon:-35.74 }, AP:{ lat:0.03,   lon:-51.07 },
  AM:{ lat:-3.10,  lon:-60.01 }, BA:{ lat:-12.97, lon:-38.50 }, CE:{ lat:-3.72,  lon:-38.54 },
  DF:{ lat:-15.78, lon:-47.93 }, ES:{ lat:-20.32, lon:-40.34 }, GO:{ lat:-16.69, lon:-49.25 },
  MA:{ lat:-2.53,  lon:-44.30 }, MT:{ lat:-15.60, lon:-56.10 }, MS:{ lat:-20.44, lon:-54.65 },
  MG:{ lat:-19.92, lon:-43.94 }, PA:{ lat:-1.46,  lon:-48.50 }, PB:{ lat:-7.12,  lon:-34.86 },
  PR:{ lat:-25.43, lon:-49.27 }, PE:{ lat:-8.05,  lon:-34.88 }, PI:{ lat:-5.09,  lon:-42.80 },
  RJ:{ lat:-22.91, lon:-43.17 }, RN:{ lat:-5.79,  lon:-35.21 }, RS:{ lat:-30.03, lon:-51.23 },
  RO:{ lat:-8.76,  lon:-63.90 }, RR:{ lat:2.82,   lon:-60.67 }, SC:{ lat:-27.60, lon:-48.55 },
  SP:{ lat:-23.55, lon:-46.63 }, SE:{ lat:-10.91, lon:-37.07 }, TO:{ lat:-10.18, lon:-48.33 }
};

// Coordenadas das províncias espanholas (códigos DGT)
const _COORDS_ES = {
  AL:{ lat:36.8340, lon:-2.4637 },  CA:{ lat:36.5271, lon:-6.2886 },
  CO:{ lat:37.8882, lon:-4.7794 },  GR:{ lat:37.1773, lon:-3.5986 },
  H:{ lat:37.2590,  lon:-6.9520 },  J:{ lat:37.7796,  lon:-3.7849 },
  MA:{ lat:36.7213, lon:-4.4214 },  SE:{ lat:37.3891, lon:-5.9845 },
  HU:{ lat:42.1382, lon:-0.4080 },  TE:{ lat:40.3456, lon:-1.1064 },
  Z:{ lat:41.6488,  lon:-0.8891 },  O:{ lat:43.3614,  lon:-5.8500 },
  IB:{ lat:39.5696, lon:2.6502 },   GC:{ lat:28.1248, lon:-15.4300 },
  TF:{ lat:28.4636, lon:-16.2518 }, S:{ lat:43.4623,  lon:-3.8050 },
  AB:{ lat:38.9942, lon:-1.8560 },  CR:{ lat:38.9849, lon:-3.9284 },
  CU:{ lat:40.0704, lon:-2.1374 },  GU:{ lat:40.6328, lon:-3.1660 },
  TO:{ lat:39.8628, lon:-4.0237 },  AV:{ lat:40.6560, lon:-4.6838 },
  BU:{ lat:42.3440, lon:-3.6970 },  LE:{ lat:42.5987, lon:-5.5671 },
  P:{ lat:42.0097,  lon:-4.5288 },  SA:{ lat:40.9701, lon:-5.6635 },
  SG:{ lat:40.9429, lon:-4.1088 },  SO:{ lat:41.7640, lon:-2.4650 },
  VA:{ lat:41.6520, lon:-4.7245 },  ZA:{ lat:41.5034, lon:-5.7445 },
  B:{ lat:41.3851,  lon:2.1734 },   GI:{ lat:41.9794, lon:2.8214 },
  L:{ lat:41.6176,  lon:0.6200 },   T:{ lat:41.1189,  lon:1.2444 },
  BA:{ lat:38.8794, lon:-6.9706 },  CC:{ lat:39.4753, lon:-6.3724 },
  C:{ lat:43.3623,  lon:-8.4115 },  LU:{ lat:43.0097, lon:-7.5565 },
  OR:{ lat:42.3363, lon:-7.8627 },  PO:{ lat:42.4296, lon:-8.6443 },
  LO:{ lat:42.4627, lon:-2.4449 },  M:{ lat:40.4168,  lon:-3.7038 },
  MU:{ lat:37.9922, lon:-1.1307 },  NA:{ lat:42.8167, lon:-1.6436 },
  VI:{ lat:42.8469, lon:-2.6727 },  SS:{ lat:43.3183, lon:-1.9812 },
  BI:{ lat:43.2630, lon:-2.9350 },  A:{ lat:38.3452,  lon:-0.4810 },
  CS:{ lat:39.9864, lon:-0.0513 },  V:{ lat:39.4699,  lon:-0.3763 },
  CE:{ lat:35.8894, lon:-5.3198 },  ML:{ lat:35.2919, lon:-2.9383 }
};

// Coordenadas dos distritos portugueses
const _COORDS_PT = {
  "PT-01":{ lat:40.6443, lon:-8.6455 },  "PT-02":{ lat:38.0141, lon:-7.8669 },
  "PT-03":{ lat:41.5503, lon:-8.4200 },  "PT-04":{ lat:41.8061, lon:-6.7592 },
  "PT-05":{ lat:39.8228, lon:-7.4909 },  "PT-06":{ lat:40.2033, lon:-8.4103 },
  "PT-07":{ lat:38.5711, lon:-7.9086 },  "PT-08":{ lat:37.0194, lon:-7.9322 },
  "PT-09":{ lat:40.5364, lon:-7.2681 },  "PT-10":{ lat:39.7436, lon:-8.8071 },
  "PT-11":{ lat:38.7169, lon:-9.1395 },  "PT-12":{ lat:39.2962, lon:-7.4281 },
  "PT-13":{ lat:41.1579, lon:-8.6291 },  "PT-14":{ lat:39.2369, lon:-8.6855 },
  "PT-15":{ lat:38.5244, lon:-8.8882 },  "PT-16":{ lat:41.6936, lon:-8.8349 },
  "PT-17":{ lat:41.3001, lon:-7.7457 },  "PT-18":{ lat:40.6566, lon:-7.9122 },
  "PT-20":{ lat:37.7398, lon:-25.6756 }, "PT-30":{ lat:32.6669, lon:-16.9241 }
};

function _getCoordsEstado(pais, uf) {
  if (pais === "ES") return _COORDS_ES[uf] || _COORDS_ES.M;
  if (pais === "PT") return _COORDS_PT[uf] || _COORDS_PT["PT-11"];
  return _COORDS_UF[uf] || _COORDS_UF.DF;
}

// Estado do último clima recebido (para o MODO_COND narrar)
let _climaAtual = null;

async function buscarClima() {
  const pais  = STATE.perfil.pais || "BR";
  const uf    = STATE.perfil.estado || "DF";
  const coord = _getCoordsEstado(pais, uf);
  const tempEl = document.getElementById("top-temp");
  const sensEl = document.getElementById("top-sens");
  try {
    const url = [
      `https://api.open-meteo.com/v1/forecast`,
      `?latitude=${coord.lat}&longitude=${coord.lon}`,
      `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m`,
      `&hourly=precipitation_probability`,
      `&forecast_hours=6&timezone=auto`
    ].join("");
    const data = await fetch(url).then(r => r.json());
    const cur  = data.current;
    const temp = Math.round(cur.temperature_2m);
    const sens = Math.round(cur.apparent_temperature);

    if (tempEl) tempEl.textContent = `${temp}°C`;
    if (sensEl) sensEl.textContent = _fmt(t("dash.sensacao"), { temp: sens });

    // Probabilidade máx de chuva nas próximas 6h
    const probs   = data.hourly?.precipitation_probability || [];
    const maxProb = Math.max(...probs.slice(0, 6));

    _climaAtual = { temp, sens, code: cur.weather_code, wind: cur.wind_speed_10m, maxProb };
    ALERTAS_CLIMA.avaliarEDisparar(_climaAtual);
  } catch(e) {
    if (tempEl) tempEl.textContent = "";
    if (sensEl) sensEl.textContent = "";
    // Fallback: garante que o timer de balões funcione mesmo sem rede
    if (!_climaAtual) _climaAtual = { temp: 25, sens: 25, code: 0, wind: 8, maxProb: 10 };
  }
}
// alias para compatibilidade com chamadas anteriores
const buscarTemperatura = buscarClima;

// ============================================================
//  ALERTAS CLIMÁTICOS — balões com mensagens contextuais
// ============================================================
const ALERTAS_CLIMA = {
  _ultimo: 0,
  _geralIdx: 0,   // rotaciona as dicas gerais em ordem

  // Ícones por categoria/índice (independentes de idioma).
  // Os textos vêm de I18N via t("balao.<categoria>"), casados pelo mesmo índice.
  ICONES: {
    geral: ["🚗","📵","🔧","🔥","😴","⛽","🚲","🛡️","🪟","⚠️"],
    calor: ["💧","☀️","🌡️"],
    frio: ["🧥","❄️"],
    neblina: ["🌫️","🌫️"],
    chuva_leve: ["🌦️","🌧️"],
    chuva_forte: ["⛈️","🌧️"],
    tempestade: ["⚡","⛈️"],
    vento: ["💨"],
    previsao_chuva: ["🌦️","☂️"],
  },

  _rand(tipo) {
    const txts   = t(`balao.${tipo}`) || [];
    const icones = this.ICONES[tipo] || [];
    const idx = Math.floor(Math.random() * txts.length);
    return { txt: txts[idx], icone: icones[idx] };
  },
  _nextGeral() {
    const txts   = t("balao.geral");
    const icones = this.ICONES.geral;
    const idx = this._geralIdx % txts.length;
    this._geralIdx++;
    return { txt: txts[idx], icone: icones[idx] };
  },

  avaliarEDisparar(clima, forcar = false) {
    if (!STATE.perfil.baloesAtivos) return;
    const agora = Date.now();
    const intervaloMs = (STATE.perfil.baloesIntervalo || 5) * 60 * 1000;
    if (!forcar && this._ultimo && (agora - this._ultimo) < intervaloMs) return;
    this._ultimo = agora;

    const candidatos = [];

    // ── Condições climáticas específicas ──────────────────────
    if (clima.temp > 28)                                         candidatos.push({ ...this._rand("calor"),        tipo:"calor"    });
    else if (clima.temp < 10)                                    candidatos.push({ ...this._rand("frio"),         tipo:"frio"     });

    if ([45, 48].includes(clima.code))                           candidatos.push({ ...this._rand("neblina"),      tipo:"neblina"  });
    else if ([95, 96, 99].includes(clima.code))                  candidatos.push({ ...this._rand("tempestade"),   tipo:"tempestade"});
    else if ([63, 65, 80, 81, 82].includes(clima.code))          candidatos.push({ ...this._rand("chuva_forte"),  tipo:"chuva"    });
    else if ([51, 53, 55, 61].includes(clima.code))              candidatos.push({ ...this._rand("chuva_leve"),   tipo:"chuva"    });

    if (clima.wind > 50)                                         candidatos.push({ ...this._rand("vento"),        tipo:"vento"    });
    if ((clima.maxProb || 0) > 60 && ![45,48,51,53,55,61,63,65,80,81,82,95,96,99].includes(clima.code))
                                                                 candidatos.push({ ...this._rand("previsao_chuva"),tipo:"chuva"  });

    // ── Dica geral — SEMPRE dispara (garante pelo menos 1 balão)
    candidatos.push({ ...this._nextGeral(), tipo:"info" });

    // Dispara com espaçamento de 3s entre cada balão
    candidatos.forEach((alerta, i) => {
      setTimeout(() => dispararBalao(alerta.txt, alerta.icone, alerta.tipo), i * 3200);
    });
  }
};

// Adiciona expressão regional ao texto falado conforme sotaque ativo
function _decorarMsgSotaque(msg) {
  const pais  = STATE.perfil.pais || "BR";
  const sotId = STATE.perfil.sotaque;
  let expr = null;
  if (pais === "ES") {
    const sot = DATA.sotaquesES?.find(s => s.id === sotId);
    if (sot?.expressoes?.length) expr = sot.expressoes[Math.floor(Math.random() * sot.expressoes.length)];
  } else if (pais === "PT") {
    const sot = DATA.sotaquesPT?.find(s => s.id === sotId);
    if (sot?.expressoes?.length) expr = sot.expressoes[Math.floor(Math.random() * sot.expressoes.length)];
  }
  return expr ? `${msg} ${expr}.` : msg;
}

// ============================================================
//  BALÕES — aparecem, flutuam e estouram
// ============================================================
function dispararBalao(msg, icone = "💬", tipo = "info") {
  if (!STATE.perfil.baloesAtivos) return;
  const container = document.getElementById("balaoes-container");
  if (!container || STATE.tela !== "app") return;

  // ── 1. Carro treme e faz barulho de aceleração ───────────
  const carSvg = document.querySelector(".topbar-car-icon");
  if (carSvg) {
    carSvg.classList.add("tremendo");
    carSvg.addEventListener("animationend", () => carSvg.classList.remove("tremendo"), { once: true });
  }
  SOUNDS.carroAcelerando();

  // ── 2. Fumaça sai do escapamento ─────────────────────────
  if (carSvg) {
    const rect = carSvg.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const puff = document.createElement("div");
        puff.className = "exhaust-puff";
        puff.style.left = `${rect.left + 1 + Math.random() * 4}px`;
        puff.style.top  = `${rect.bottom - 5 + Math.random() * 4}px`;
        document.body.appendChild(puff);
        setTimeout(() => puff.remove(), 900);
      }, i * 130);
    }
  }

  // ── 3. Balão aparece após o carro tremer (650ms) ─────────
  setTimeout(() => {
    const el = document.createElement("div");
    el.className = `balao-clima balao-${tipo}`;
    const existentes = container.querySelectorAll(".balao-clima:not(.estourando)").length;
    el.style.left = `${6 + Math.random() * 8}px`;
    el.style.top  = `${existentes * 8}px`;
    el.innerHTML  = `<span class="balao-icone">${icone}</span><span class="balao-msg">${msg}</span>`;
    container.appendChild(el);

    // Estoura após 6s
    setTimeout(() => {
      el.classList.add("estourando");
      setTimeout(() => el.remove(), 420);
    }, 6000);

    // Áudio — respeita configuração
    const modo = STATE.perfil.audioMode || "tudo";
    if (modo === "tudo" || modo === "so_alertas") {
      setTimeout(() => VOICE.falar(_decorarMsgSotaque(msg), STATE.perfil), 600);
    }
    SOUNDS.notify();
  }, 650);
}

// ============================================================
//  CONTROLE DOS BALÕES CLIMÁTICOS
// ============================================================
let _balaoTimer = null;

function _iniciarTimerBalaoes() {
  if (_balaoTimer) clearInterval(_balaoTimer);
  _balaoTimer = null;
  if (!STATE.perfil.baloesAtivos) return;
  const mins = STATE.perfil.baloesIntervalo || 5;
  _balaoTimer = setInterval(() => {
    const clima = _climaAtual || { temp: 25, sens: 25, code: 0, wind: 8, maxProb: 10 };
    ALERTAS_CLIMA.avaliarEDisparar(clima, true);
  }, mins * 60 * 1000);
}

function setBaloesAtivo(val) {
  STATE.perfil.baloesAtivos = !!val;
  salvarPerfil();
  _iniciarTimerBalaoes();
  const tog = document.getElementById("tog-balaoes");
  if (tog) tog.checked = !!val;
  const row = document.getElementById("balaoes-intervalo-row");
  if (row) row.style.opacity = val ? "1" : "0.45";
  mostrarToast(val ? "Balões de clima ativados" : "Balões de clima desativados");
  SOUNDS.click();
}

function setBaloesIntervalo(mins) {
  STATE.perfil.baloesIntervalo = mins;
  salvarPerfil();
  _iniciarTimerBalaoes();
  mostrarToast(`Balões a cada ${mins} minuto${mins !== 1 ? "s" : ""}`);
  SOUNDS.click();
}

function _sincBalaoesCfg() {
  const tog = document.getElementById("tog-balaoes");
  if (tog) tog.checked = STATE.perfil.baloesAtivos !== false;
  const sel = document.getElementById("sel-balaoes-intervalo");
  if (sel) sel.value = String(STATE.perfil.baloesIntervalo || 5);
  const row = document.getElementById("balaoes-intervalo-row");
  if (row) row.style.opacity = STATE.perfil.baloesAtivos !== false ? "1" : "0.45";
}

// ============================================================
//  CONTROLE DE ÁUDIO
// ============================================================
function setAudioMode(modo) {
  STATE.perfil.audioMode = modo;
  salvarPerfil();
  // Atualiza visual dos botões
  ["tudo","so_rota","so_alertas","silencio"].forEach(m => {
    document.getElementById(`abtn-${m}`)?.classList.toggle("ativo", m === modo);
  });
  const labels = {
    tudo:"Ouvindo rota e alertas climáticos",
    so_rota:"Ouvindo apenas orientações de rota",
    so_alertas:"Ouvindo apenas alertas de clima",
    silencio:"Áudio silenciado"
  };
  mostrarToast(labels[modo] || "Áudio atualizado");
  SOUNDS.click();
}

function _sincAudioModeBtns() {
  const modo = STATE.perfil.audioMode || "tudo";
  ["tudo","so_rota","so_alertas","silencio"].forEach(m => {
    document.getElementById(`abtn-${m}`)?.classList.toggle("ativo", m === modo);
  });
}

// ============================================================
//  TEMA — Dia / Noite / Automático
// ============================================================
function setTema(modo) {
  STATE.perfil.tema = modo;
  salvarPerfil();
  _aplicarTema(modo);
  _sincTemaBtns();
  const labels = { dia:"Tema claro (Dia)", noite:"Tema escuro (Noite)", auto:"Tema automático por horário" };
  mostrarToast(labels[modo] || "Tema atualizado");
  SOUNDS.click();
}

function _aplicarTema(modo) {
  let isDia;
  if (modo === "dia")   isDia = true;
  else if (modo === "noite") isDia = false;
  else {
    // auto: dia entre 6h e 18h
    const h = new Date().getHours();
    isDia = h >= 6 && h < 18;
  }
  document.body.classList.toggle("tema-dia", isDia);
  // Atualiza ícone do botão na topbar
  const btn = document.getElementById("btn-tema-topbar");
  if (btn) btn.textContent = isDia ? "🌙" : "☀️";
  _atualizarEstiloMapaTomTom(isDia);
}

function _sincTemaBtns() {
  const modo = STATE.perfil.tema || "noite";
  ["dia","noite","auto"].forEach(m => {
    document.getElementById(`tbtn-${m}`)?.classList.toggle("ativo", m === modo);
  });
}

// Alterna entre dia e noite com o botão da topbar
function toggleTemaRapido() {
  const atual = STATE.perfil.tema || "noite";
  // Se auto ou noite → vai para dia; se dia → vai para noite
  setTema(atual === "dia" ? "noite" : "dia");
}

function renderPrevisao(rota) {
  const prev = TRAFFIC.previsao(rota);
  const el   = document.getElementById("previsao-grid");
  if (!el) return;
  const cores = ["#00ff88","#ffcc00","#ff9900","#ff4444","#cc0000"];
  el.innerHTML = prev.map(p => `
    <div class="prev-item">
      <span class="prev-hora">${p.hora}</span>
      <span class="prev-dot" style="background:${cores[p.nivel]}"></span>
      <span class="prev-label" style="color:${cores[p.nivel]}">${p.label}</span>
    </div>
  `).join("");
}

// ---------- Chat ----------
function enviarMensagem() {
  const inp = document.getElementById("chat-input");
  const texto = inp.value.trim();
  if (!texto) return;
  inp.value = "";
  SOUNDS.click();
  adicionarBolha("usuario", texto);

  // Simula digitação do agente
  const typing = document.createElement("div");
  typing.className = "bolha-agente typing";
  typing.id = "typing-indicator";
  typing.innerHTML = `<span></span><span></span><span></span>`;
  document.getElementById("chat-msgs").appendChild(typing);
  rolarChat();

  setTimeout(() => {
    typing.remove();
    const resposta = AGENT.responderChat(texto, STATE.perfil, STATE.statusAtual);
    SOUNDS.notify();
    adicionarBolha("agente", resposta);
    if (window.gsap) {
      const bolhas = document.querySelectorAll("#chat-msgs .bolha-agente");
      const ultima = bolhas[bolhas.length - 1];
      if (ultima) gsap.fromTo(ultima, { opacity:0, x:-18 }, { opacity:1, x:0, duration:0.3, ease:"power2.out" });
    }
    VOICE.falar(resposta, STATE.perfil,
      () => { SOUNDS.agenteFalando(); document.getElementById("btn-mic-chat")?.classList.add("falando"); },
      () => document.getElementById("btn-mic-chat")?.classList.remove("falando")
    );
  }, 900 + Math.random() * 600);
}

function adicionarBolha(quem, texto) {
  const el = document.createElement("div");
  el.className = `bolha bolha-${quem}`;

  if (quem === "agente") {
    const nome = DATA.profissoes.find(p=>p.id===STATE.perfil.profissao)?.nome || "Agente";
    el.innerHTML = `<div class="bolha-header">🤖 ${t("app.nome")}</div><p>${texto}</p>`;
  } else {
    el.innerHTML = `<p>${texto}</p>`;
  }

  document.getElementById("chat-msgs").appendChild(el);
  STATE.historicoChat.push({ quem, texto });
  rolarChat();
}

function rolarChat() {
  const c = document.getElementById("chat-msgs");
  if (c) c.scrollTop = c.scrollHeight;
}

function ouvirAgente() {
  if (VOICE.falando) { VOICE.parar(); return; }
  if (!STATE.statusAtual) atualizarDashboard();
  const msg = AGENT.gerar(STATE.statusAtual, STATE.perfil);
  VOICE.falar(msg, STATE.perfil,
    () => document.getElementById("btn-ouvir")?.classList.add("falando"),
    () => document.getElementById("btn-ouvir")?.classList.remove("falando")
  );
}

// ---------- Mapa (Leaflet + tiles/trânsito real da TomTom) ----------
function iniciarMapa() {
  if (STATE.mapIniciado) return;
  STATE.mapIniciado = true;

  const uf    = STATE.perfil.estado || "DF";
  const pais  = STATE.perfil.pais || "BR";
  const coord = _getCoordsEstado(pais, uf);

  STATE.mapaLeaflet = L.map("mapa-container").setView([coord.lat, coord.lon], 12);

  const estiloMapa = document.body.classList.contains("tema-dia") ? "main" : "night";
  STATE._tileBase = L.tileLayer(
    `https://api.tomtom.com/map/1/tile/basic/${estiloMapa}/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`,
    { attribution: "© TomTom", maxZoom: 22 }
  ).addTo(STATE.mapaLeaflet);

  // Trânsito real (fluxo colorido por congestionamento + incidentes) via TomTom
  STATE._tileTrafego = L.tileLayer(
    `https://api.tomtom.com/traffic/map/4/tile/flow/relative0/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`,
    { attribution: "© TomTom Traffic", maxZoom: 22 }
  ).addTo(STATE.mapaLeaflet);
  STATE._tileIncidentes = L.tileLayer(
    `https://api.tomtom.com/traffic/map/4/tile/incidents/s3/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`,
    { attribution: "© TomTom Traffic", maxZoom: 22 }
  ).addTo(STATE.mapaLeaflet);

  // Marcador da posição do usuário (simulado no bairro selecionado)
  const marcadorUsuario = L.marker([coord.lat + 0.02, coord.lon]).addTo(STATE.mapaLeaflet);
  marcadorUsuario.bindPopup(`📍 Sua localização: ${STATE.perfil.bairroOrigem || STATE.perfil.cidade}`).openPopup();
  STATE.mapaMarkerUsuario = marcadorUsuario;

  // Legenda (trânsito ao vivo)
  const legenda = L.control({ position:"bottomright" });
  legenda.onAdd = () => {
    const div = L.DomUtil.create("div","mapa-legenda");
    div.innerHTML = `
      <div style="background:#111827;padding:10px;border-radius:8px;font-size:12px;color:#fff;">
        <b>Trânsito ao vivo</b><br>
        <span style="color:#4caf50">● Livre</span><br>
        <span style="color:#ffb300">● Moderado</span><br>
        <span style="color:#e53935">● Congestionado</span>
      </div>`;
    return div;
  };
  legenda.addTo(STATE.mapaLeaflet);
}

// Troca o estilo do tile de mapa (dia/noite) sem recriar o mapa inteiro
function _atualizarEstiloMapaTomTom(isDia) {
  if (!STATE.mapaLeaflet || !STATE._tileBase) return;
  const estiloMapa = isDia ? "main" : "night";
  STATE.mapaLeaflet.removeLayer(STATE._tileBase);
  STATE._tileBase = L.tileLayer(
    `https://api.tomtom.com/map/1/tile/basic/${estiloMapa}/{z}/{x}/{y}.png?key=${TOMTOM_API_KEY}`,
    { attribution: "© TomTom", maxZoom: 22 }
  ).addTo(STATE.mapaLeaflet);
  STATE._tileBase.bringToBack();
}

// ============================================================
//  NAV — Modo Navegação 3D (câmera em perspectiva seguindo o
//  veículo em tempo real via GPS, estilo Google Maps/Waze)
// ============================================================
const NAV = {
  map: null,
  marcador: null,
  watchId: null,
  simTimer: null,
  monitorTimer: null,
  rotaCoords: null,
  destCoord: null,
  ultimaPos: null,
  destino: "",
  instrucoes: null,
  velocidadeMediaKmh: 35,
  rotaAlternativaProposta: null,
  alertaAberto: false,
  _incidentesJaAvisados: null,

  iniciar(rota, destino, destCoord) {
    const rotaCoordsLatLon = rota?.coords || rota; // aceita tanto a rota completa quanto só as coordenadas
    if (!rotaCoordsLatLon || !rotaCoordsLatLon.length) { mostrarToast("Rota indisponível pra navegação"); return; }
    this.rotaCoords = rotaCoordsLatLon;
    this.destino = destino || "";
    this.destCoord = destCoord || null;
    this.instrucoes = rota?.instrucoes || null;
    // Velocidade média real da rota (já considera trânsito atual), usada pra estimar ETA enquanto dirige
    const kmNum = parseFloat(rota?.km);
    this.velocidadeMediaKmh = (rota?.min > 0 && kmNum > 0) ? (kmNum / (rota.min / 60)) : 35;
    this.rotaAlternativaProposta = null;
    this.alertaAberto = false;
    this._incidentesJaAvisados = new Set();

    if (rota?.atrasoSegundos > 60) {
      mostrarToast(`🚦 Rota já considera ${Math.round(rota.atrasoSegundos/60)} min de trânsito atual`);
    }

    const tela = document.getElementById("tela-navegacao");
    if (tela) tela.style.display = "block";

    const inicio  = rotaCoordsLatLon[0];
    const proximo = rotaCoordsLatLon[Math.min(5, rotaCoordsLatLon.length - 1)];
    const bearingInicial = this._bearing(inicio, proximo);
    const estiloMapa = document.body.classList.contains("tema-dia") ? "main" : "night";

    this.map = new maplibregl.Map({
      container: "nav-mapa-container",
      style: `https://api.tomtom.com/style/1/style/20.3.4-6?key=${TOMTOM_API_KEY}&map=basic_${estiloMapa}`,
      center: [inicio[1], inicio[0]],
      zoom: 17,
      pitch: 60,
      bearing: bearingInicial,
      attributionControl: false
    });

    this.map.on("load", () => {
      this.map.addSource("nav-rota", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates: rotaCoordsLatLon.map(c => [c[1], c[0]]) }
        }
      });
      this.map.addLayer({
        id: "nav-rota-linha",
        type: "line",
        source: "nav-rota",
        paint: { "line-color": "#00c2ff", "line-width": 6, "line-opacity": 0.85 },
        layout: { "line-cap": "round", "line-join": "round" }
      });

      const el = document.createElement("div");
      el.textContent = (STATE.perfil.veiculo?.tipo === "caminhao") ? "🚛" : "🚗";
      el.style.fontSize = "32px";
      this.marcador = new maplibregl.Marker({ element: el, rotationAlignment: "map", pitchAlignment: "map" })
        .setLngLat([inicio[1], inicio[0]])
        .setRotation(bearingInicial)
        .addTo(this.map);
    });

    this._ligarGPS();
    this._atualizarPainel(this._distanciaRestante(inicio, rotaCoordsLatLon));
    this._atualizarInstrucao(0);
    this._iniciarMonitorTransito();
  },

  _ligarGPS() {
    if (!navigator.geolocation) { this._simular(); return; }
    this.watchId = navigator.geolocation.watchPosition(
      pos => this._atualizarPosicao(pos.coords.latitude, pos.coords.longitude, pos.coords.heading),
      () => {
        if (this.watchId != null) { navigator.geolocation.clearWatch(this.watchId); this.watchId = null; }
        mostrarToast("📡 GPS indisponível — mostrando trajeto simulado");
        this._simular();
      },
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
    );
  },

  _atualizarPosicao(lat, lon, headingDispositivo) {
    const pos = [lat, lon];
    const bearing = (headingDispositivo != null && !isNaN(headingDispositivo))
      ? headingDispositivo
      : (this.ultimaPos ? this._bearing(this.ultimaPos, pos) : (this.map?.getBearing() || 0));
    this.ultimaPos = pos;

    if (this.marcador) { this.marcador.setLngLat([lon, lat]); this.marcador.setRotation(bearing); }
    if (this.map) this.map.easeTo({ center: [lon, lat], bearing, pitch: 60, duration: 900 });

    this._atualizarPainel(this._distanciaRestante(pos, this.rotaCoords));
    this._atualizarInstrucao(this._distanciaPercorrida(pos, this.rotaCoords));
  },

  _atualizarPainel(distanciaM) {
    const km = (distanciaM / 1000).toFixed(1);
    const elDistValor = document.getElementById("nav-distancia-valor");
    if (elDistValor) elDistValor.textContent = `${km} km`;
    // Velocidade média real da rota (calculada a partir da duração já ajustada por trânsito)
    const minutos = Math.max(1, Math.round((distanciaM / 1000) / this.velocidadeMediaKmh * 60));
    const chegada = new Date(Date.now() + minutos * 60000);
    const elEta = document.getElementById("nav-eta-tempo");
    if (elEta) elEta.textContent = chegada.toTimeString().slice(0, 5);
    if (distanciaM < 30) {
      mostrarToast("🏁 Você chegou ao destino!");
      SOUNDS.success();
      this.encerrar();
    }
  },

  // Mostra a próxima manobra real da rota (ex: "Vire à direita na Rua X em 200m"),
  // vinda da própria API de rota — nada de texto genérico
  _atualizarInstrucao(percorridoM) {
    const elTexto = document.getElementById("nav-instrucao-texto");
    const elDist  = document.getElementById("nav-instrucao-distancia");
    if (!this.instrucoes || !this.instrucoes.length) {
      if (elTexto) elTexto.textContent = this.destino ? `Seguindo para ${this.destino}` : "Siga em frente";
      if (elDist)  elDist.textContent = "—";
      return;
    }
    const proxima = this.instrucoes.find(i => i.distanciaM > percorridoM + 3);
    if (!proxima) {
      if (elTexto) elTexto.textContent = this.destino ? `Chegando em ${this.destino}` : "Você está perto do destino";
      if (elDist)  elDist.textContent = "—";
      return;
    }
    const faltamM = Math.max(0, Math.round(proxima.distanciaM - percorridoM));
    if (elTexto) elTexto.textContent = proxima.texto;
    if (elDist)  elDist.textContent = faltamM < 1000 ? `${faltamM} m` : `${(faltamM/1000).toFixed(1)} km`;
  },

  recentralizar() {
    if (!this.map || !this.ultimaPos) return;
    this.map.easeTo({ center: [this.ultimaPos[1], this.ultimaPos[0]], pitch: 60, duration: 500 });
  },

  encerrar() {
    if (this.watchId != null) { navigator.geolocation.clearWatch(this.watchId); this.watchId = null; }
    if (this.simTimer) { clearInterval(this.simTimer); this.simTimer = null; }
    if (this.monitorTimer) { clearInterval(this.monitorTimer); this.monitorTimer = null; }
    if (this.map) { this.map.remove(); this.map = null; }
    this.marcador = null;
    this.ultimaPos = null;
    this.alertaAberto = false;
    this.rotaAlternativaProposta = null;
    const alertaDiv = document.getElementById("nav-alerta-transito");
    if (alertaDiv) alertaDiv.style.display = "none";
    const tela = document.getElementById("tela-navegacao");
    if (tela) tela.style.display = "none";
  },

  // ── Monitoramento de trânsito real e sugestão de rota alternativa ──────
  _iniciarMonitorTransito() {
    if (this.monitorTimer) { clearInterval(this.monitorTimer); this.monitorTimer = null; }
    if (!STATE.perfil.alertaTransito) return;
    this.monitorTimer = setInterval(() => this._avaliarTransitoAdiante(), 60000);
    // primeira checagem logo no início, sem esperar o intervalo inteiro
    setTimeout(() => this._avaliarTransitoAdiante(), 8000);
  },

  async _avaliarTransitoAdiante() {
    if (this.alertaAberto || !this.ultimaPos || !this.destCoord) return;
    const distKm = STATE.perfil.alertaTransitoDistanciaKm || 15;
    const segmento = this._segmentoAdiante(this.ultimaPos, this.rotaCoords, distKm);
    if (!segmento.length) return;
    const bbox = this._bboxDoSegmento(segmento);
    const incidentes = await this._buscarIncidentesTomTom(bbox);
    const relevantes = this._incidentesNaRota(incidentes, segmento);
    if (!relevantes.length) return;

    const atrasoTotalSeg = relevantes.reduce((soma, inc) => soma + this._estimarAtrasoSegundos(inc), 0);
    if (atrasoTotalSeg < 180) return; // menos de 3 min de atraso não vale incomodar o motorista

    const chaveIncidentes = relevantes.map(i => JSON.stringify(i.geometry.coordinates[0] || i.geometry.coordinates)).sort().join("|");
    if (this._incidentesJaAvisados.has(chaveIncidentes)) return;

    // Calcula rota alternativa da posição atual até o destino final,
    // respeitando as dimensões do caminhão quando for o caso
    const veiculo = STATE.perfil.veiculo;
    const ehCaminhao = veiculo?.tipo === "caminhao";
    const oCoordAtual = { lat: this.ultimaPos[0], lon: this.ultimaPos[1] };
    const rotaAlt = ehCaminhao
      ? await _calcularRotaCaminhao(oCoordAtual, this.destCoord, veiculo)
      : await _calcularRotaCarro(oCoordAtual, this.destCoord);
    if (!rotaAlt) return;

    // Tempo restante estimado pela rota atual, considerando o atraso detectado
    const restanteAtualM  = this._distanciaRestante(this.ultimaPos, this.rotaCoords);
    const velocidadeMediaKmh = 35;
    const tempoAtualMin  = (restanteAtualM / 1000) / velocidadeMediaKmh * 60 + (atrasoTotalSeg / 60);
    const economiaMin    = Math.round(tempoAtualMin - rotaAlt.min);

    this._incidentesJaAvisados.add(chaveIncidentes);
    if (economiaMin >= 3) {
      this.rotaAlternativaProposta = rotaAlt;
      this._mostrarAlertaTransito(atrasoTotalSeg, economiaMin, true);
    } else {
      this._mostrarAlertaTransito(atrasoTotalSeg, economiaMin, false);
    }
  },

  _mostrarAlertaTransito(atrasoSegundos, economiaMin, valeAPena) {
    this.alertaAberto = true;
    const atrasoMin = Math.round(atrasoSegundos / 60);
    const div    = document.getElementById("nav-alerta-transito");
    const texto  = document.getElementById("nav-alerta-texto");
    const btnMudar = div?.querySelector("button:last-child");
    let msg;
    if (valeAPena) {
      msg = `Atraso estimado de ${atrasoMin} min na sua rota. Uma rota alternativa economizaria cerca de ${economiaMin} min. Vale a pena mudar.`;
      if (btnMudar) btnMudar.style.display = "";
    } else {
      msg = `Atraso estimado de ${atrasoMin} min na sua rota, mas a rota alternativa não compensa. Recomendo manter o trajeto atual.`;
      if (btnMudar) btnMudar.style.display = "none";
    }
    if (texto) texto.textContent = msg;
    if (div) div.style.display = "block";
    const modoAudio = STATE.perfil.audioMode || "tudo";
    if (modoAudio !== "silencio") VOICE.falar(msg, STATE.perfil);
    SOUNDS.click();
  },

  aceitarRotaAlternativa() {
    const div = document.getElementById("nav-alerta-transito");
    if (div) div.style.display = "none";
    this.alertaAberto = false;
    if (!this.rotaAlternativaProposta) return;
    this.rotaCoords = this.rotaAlternativaProposta.coords;
    this.rotaAlternativaProposta = null;
    if (this.map?.getSource("nav-rota")) {
      this.map.getSource("nav-rota").setData({
        type: "Feature",
        geometry: { type: "LineString", coordinates: this.rotaCoords.map(c => [c[1], c[0]]) }
      });
    }
    mostrarToast("🔀 Rota alternativa aplicada");
  },

  recusarRotaAlternativa() {
    const div = document.getElementById("nav-alerta-transito");
    if (div) div.style.display = "none";
    this.alertaAberto = false;
    this.rotaAlternativaProposta = null;
  },

  // Pega os pontos da rota a partir da posição atual até `distanciaKm` à frente
  _segmentoAdiante(posAtual, coords, distanciaKm) {
    if (!coords || !coords.length) return [];
    let melhorIdx = 0, melhorDist = Infinity;
    coords.forEach((c, idx) => {
      const d = this._distanciaMetros(posAtual, c);
      if (d < melhorDist) { melhorDist = d; melhorIdx = idx; }
    });
    const limite = distanciaKm * 1000;
    const segmento = [coords[melhorIdx]];
    let acumulado = 0;
    for (let i = melhorIdx; i < coords.length - 1 && acumulado < limite; i++) {
      acumulado += this._distanciaMetros(coords[i], coords[i+1]);
      segmento.push(coords[i+1]);
    }
    return segmento;
  },

  _bboxDoSegmento(segmento) {
    const lats = segmento.map(c => c[0]), lons = segmento.map(c => c[1]);
    const pad = 0.01; // ~1km de folga
    return {
      minLon: Math.min(...lons) - pad, minLat: Math.min(...lats) - pad,
      maxLon: Math.max(...lons) + pad, maxLat: Math.max(...lats) + pad
    };
  },

  async _buscarIncidentesTomTom(bbox) {
    try {
      const fields  = "{incidents{type,geometry{type,coordinates},properties{iconCategory,magnitudeOfDelay,delay}}}";
      const bboxStr = `${bbox.minLon},${bbox.minLat},${bbox.maxLon},${bbox.maxLat}`;
      const url = `https://api.tomtom.com/traffic/services/5/incidentDetails?bbox=${bboxStr}&fields=${encodeURIComponent(fields)}&key=${TOMTOM_API_KEY}`;
      const r = await fetch(url).then(r => r.json());
      return r.incidents || [];
    } catch(e) { return []; }
  },

  // Filtra incidentes que realmente cruzam a rota (não só a área ao redor)
  _incidentesNaRota(incidentes, segmento) {
    return incidentes.filter(inc => {
      const coords = inc.geometry?.coordinates;
      if (!coords) return false;
      const listaPontos = inc.geometry.type === "Point" ? [coords] : coords;
      return listaPontos.some(([lon, lat]) =>
        segmento.some(c => this._distanciaMetros(c, [lat, lon]) < 200)
      );
    });
  },

  _estimarAtrasoSegundos(incidente) {
    const d = incidente.properties?.delay;
    if (typeof d === "number" && d > 0) return d;
    const magnitude = incidente.properties?.magnitudeOfDelay;
    // Sem delay explícito: estima pela magnitude (0=Unknown,1=Minor,2=Moderate,3=Major,4=Undefined)
    return [0, 60, 180, 360, 480][magnitude] || 0;
  },

  // Uso interno/testes — anima a posição ao longo da rota quando não há GPS real
  // (dispositivo sem geolocalização, ou navegador em ambiente de teste)
  _simular() {
    let i = 0;
    this.simTimer = setInterval(() => {
      if (i >= this.rotaCoords.length) { clearInterval(this.simTimer); return; }
      const [lat, lon] = this.rotaCoords[i];
      this._atualizarPosicao(lat, lon, null);
      i += 3;
    }, 1000);
  },

  _bearing(a, b) {
    const toRad = d => d * Math.PI / 180, toDeg = r => r * 180 / Math.PI;
    const lat1 = toRad(a[0]), lat2 = toRad(b[0]), dLon = toRad(b[1] - a[1]);
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  },

  _distanciaMetros(a, b) {
    const R = 6371000, toRad = d => d * Math.PI / 180;
    const dLat = toRad(b[0] - a[0]), dLon = toRad(b[1] - a[1]);
    const s = Math.sin(dLat/2)**2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon/2)**2;
    return 2 * R * Math.asin(Math.sqrt(s));
  },

  // Soma a distância do ponto da rota mais próximo da posição atual até o fim
  _distanciaRestante(posAtual, coords) {
    if (!coords || !coords.length) return 0;
    let melhorIdx = 0, melhorDist = Infinity;
    coords.forEach((c, idx) => {
      const d = this._distanciaMetros(posAtual, c);
      if (d < melhorDist) { melhorDist = d; melhorIdx = idx; }
    });
    let total = 0;
    for (let i = melhorIdx; i < coords.length - 1; i++) total += this._distanciaMetros(coords[i], coords[i+1]);
    return total;
  },

  // Distância já percorrida desde o início da rota até a posição atual —
  // usada pra saber qual a próxima instrução de manobra a mostrar
  _distanciaPercorrida(posAtual, coords) {
    if (!coords || !coords.length) return 0;
    let melhorIdx = 0, melhorDist = Infinity;
    coords.forEach((c, idx) => {
      const d = this._distanciaMetros(posAtual, c);
      if (d < melhorDist) { melhorDist = d; melhorIdx = idx; }
    });
    let total = 0;
    for (let i = 0; i < melhorIdx; i++) total += this._distanciaMetros(coords[i], coords[i+1]);
    return total;
  }
};

// ---------- Configurações ----------
function abrirConfiguracoes() {
  document.getElementById("cfg-nome").value = STATE.perfil.nome;
  const cfgPais = document.getElementById("cfg-pais");
  if (cfgPais) {
    // Sempre repopula para garantir que BR/ES/PT estejam presentes
    cfgPais.innerHTML = DATA.paises.map(p =>
      `<option value="${p.code}" ${p.code === (STATE.perfil.pais || "BR") ? "selected" : ""}>${p.nome}</option>`
    ).join("");
    _popularEstadoSelect("cfg-estado", cfgPais.value, STATE.perfil.estado);
    cfgPais.onchange = () => {
      _popularEstadoSelect("cfg-estado", cfgPais.value, null);
      _popularCfgBairros();
    };
  }
  const cfgEstado = document.getElementById("cfg-estado");
  if (cfgEstado) cfgEstado.onchange = () => _popularCfgBairros();
  const cfgCidade = document.getElementById("cfg-cidade");
  if (cfgCidade) cfgCidade.value = STATE.perfil.cidade || "";
  const cfgOrig = document.getElementById("cfg-origem");
  const cfgDest = document.getElementById("cfg-destino");
  if (cfgOrig) cfgOrig.value = STATE.perfil.bairroOrigem || "";
  if (cfgDest) cfgDest.value = STATE.perfil.bairroDestino || "";
  _popularCfgBairros();
  const tH = document.getElementById("cfg-tipo-habitual");
  if (tH) tH.value = STATE.perfil.tipoRotaHabitual || "trabalho_casa";
  const tA = document.getElementById("cfg-tipo-alternativa");
  if (tA) tA.value = STATE.perfil.tipoRotaAlternativa || "academia";
  const oA = document.getElementById("cfg-origem-alt");
  if (oA) oA.value = STATE.perfil.origemAlt || "";
  const dA = document.getElementById("cfg-destino-alt");
  if (dA) dA.value = STATE.perfil.destinoAlt || "";
  const cfgAlertaTransito = document.getElementById("cfg-alerta-transito");
  if (cfgAlertaTransito) cfgAlertaTransito.checked = STATE.perfil.alertaTransito ?? true;
  const cfgAlertaDist = document.getElementById("cfg-alerta-distancia");
  if (cfgAlertaDist) cfgAlertaDist.value = String(STATE.perfil.alertaTransitoDistanciaKm || 15);
  popularCardsVeiculo("cfg-cards-veiculo");
  _sincIdiomaBtns();
  if (typeof atualizarStatusEL  === "function") atualizarStatusEL();
  if (typeof atualizarLabelsCfg === "function") atualizarLabelsCfg();
  ativarTab("config");
}

function salvarConfiguracoes() {
  STATE.perfil.nome                = document.getElementById("cfg-nome").value.trim() || STATE.perfil.nome;
  const cfgPais   = document.getElementById("cfg-pais")?.value;
  const cfgEstado = document.getElementById("cfg-estado")?.value;
  const cfgCidade = document.getElementById("cfg-cidade")?.value.trim();
  const regiaoMudou = cfgPais && (cfgPais !== STATE.perfil.pais || cfgEstado !== STATE.perfil.estado);
  if (cfgPais)   STATE.perfil.pais   = cfgPais;
  if (cfgEstado) STATE.perfil.estado = cfgEstado;
  STATE.perfil.cidade = cfgCidade || (cfgEstado ? _capitalPorUF(cfgEstado) : STATE.perfil.cidade);
  STATE.perfil.bairroOrigem        = document.getElementById("cfg-origem").value;
  STATE.perfil.bairroDestino       = document.getElementById("cfg-destino").value;
  STATE.perfil.tipoRotaHabitual    = document.getElementById("cfg-tipo-habitual")?.value   || STATE.perfil.tipoRotaHabitual;
  STATE.perfil.tipoRotaAlternativa = document.getElementById("cfg-tipo-alternativa")?.value || STATE.perfil.tipoRotaAlternativa;
  const origemAlt  = document.getElementById("cfg-origem-alt")?.value;
  const destinoAlt = document.getElementById("cfg-destino-alt")?.value;
  if (origemAlt  !== undefined) STATE.perfil.origemAlt  = origemAlt;
  if (destinoAlt !== undefined) STATE.perfil.destinoAlt = destinoAlt;
  STATE.perfil.alertaTransito = document.getElementById("cfg-alerta-transito")?.checked ?? true;
  STATE.perfil.alertaTransitoDistanciaKm = parseInt(document.getElementById("cfg-alerta-distancia")?.value, 10) || 15;
  _lerDimensoesVeiculo("cfg-veiculo");
  salvarPerfil();
  if (regiaoMudou) _aplicarRegiaoAtual();
  mostrarToast("Configurações salvas! ✅");
  ativarTab("dashboard");
  atualizarDashboard();
}

// ── Seletor de Região (clique na cidade da topbar) ──────────────
function abrirSeletorRegiao() {
  const modal = document.getElementById("modal-regiao");
  if (!modal) return;
  const pais = STATE.perfil.pais || "BR";
  const selPais = document.getElementById("reg-pais");
  if (selPais) selPais.value = pais;
  _popularEstadoSelect("reg-estado", pais, STATE.perfil.estado || "DF");
  // Popula cidades e bairros do estado selecionado
  _popularCidadesRegiao(document.getElementById("reg-estado")?.value);
  _popularBairrosRegiao(document.getElementById("reg-estado")?.value);
  const cepGrupo = document.getElementById("reg-cep-grupo");
  if (cepGrupo) cepGrupo.style.display = (pais === "ES") ? "none" : "";
  modal.classList.add("aberto");
  SOUNDS.click();
}

function fecharSeletorRegiao() {
  document.getElementById("modal-regiao")?.classList.remove("aberto");
}

function _popularCidadesRegiao(uf) {
  const pais = document.getElementById("reg-pais")?.value || STATE.perfil.pais || "BR";
  if (pais === "ES") { _ativarBuscaES("reg-cidade-sel", "reg-cidade-outra", STATE.perfil.cidade); return; }
  const sel  = document.getElementById("reg-cidade-sel");
  _desativarBuscaES("reg-cidade-sel");
  const valorAtual = STATE.perfil.estado === uf ? STATE.perfil.cidade : null;
  _popularSelectComOutra(sel, _cidadesPorPaisUF(pais, uf), valorAtual, "✍️ Outra cidade...");
  _sincSelectOutra("reg-cidade-sel", "reg-cidade-outra", STATE.perfil.cidade);
}

function _popularBairrosRegiao(uf) {
  const pais = document.getElementById("reg-pais")?.value || STATE.perfil.pais || "BR";
  if (pais === "ES") { _ativarBuscaES("reg-bairro-sel", "reg-bairro-outra", STATE.perfil.bairroOrigem); return; }
  const sel  = document.getElementById("reg-bairro-sel");
  _desativarBuscaES("reg-bairro-sel");
  const valorAtual = STATE.perfil.estado === uf ? STATE.perfil.bairroOrigem : null;
  _popularSelectComOutra(sel, _bairrosPorPaisUF(pais, uf), valorAtual, "✍️ Outro bairro...");
  _sincSelectOutra("reg-bairro-sel", "reg-bairro-outra", STATE.perfil.bairroOrigem);
}

// Liga a busca ao vivo (TomTom) nos campos de pueblo/bairro do modal "Minha Região", usada
// quando o país selecionado ali é Espanha
function _ligarBuscaRegiaoTopbar() {
  const inpCidade = document.getElementById("reg-cidade-outra");
  if (inpCidade) {
    inpCidade.addEventListener("input", () => {
      const pais = document.getElementById("reg-pais")?.value || "BR";
      if (pais === "ES") _buscaPuebloTopbar(inpCidade.value);
    });
    inpCidade.addEventListener("change", () => {
      const pais = document.getElementById("reg-pais")?.value || "BR";
      if (pais === "ES") _popularBairrosRegiao(document.getElementById("reg-estado")?.value);
    });
  }
  const inpBairro = document.getElementById("reg-bairro-outra");
  if (inpBairro) {
    inpBairro.addEventListener("input", () => {
      const pais = document.getElementById("reg-pais")?.value || "BR";
      if (pais === "ES") _buscaBairroTopbar(inpBairro.value);
    });
  }
}

function confirmarRegiaoTopbar() {
  const pais   = document.getElementById("reg-pais")?.value || "BR";
  const uf     = document.getElementById("reg-estado").value;
  const cidade = pais === "ES"
    ? document.getElementById("reg-cidade-outra")?.value.trim()
    : _valorSelectComOutra("reg-cidade-sel", "reg-cidade-outra");
  if (!uf) return;
  STATE.perfil.pais   = pais;
  STATE.perfil.estado = uf;
  STATE.perfil.cidade = cidade || _capitalPorUF(uf);
  const bairro = pais === "ES"
    ? document.getElementById("reg-bairro-outra")?.value.trim()
    : _valorSelectComOutra("reg-bairro-sel", "reg-bairro-outra");
  const cep    = (pais === "BR") ? (document.getElementById("reg-cep-txt")?.value.replace(/\D/g,"") || "") : "";
  if (bairro) STATE.perfil.bairroOrigem = bairro;
  if (cep)    STATE.perfil.cep = cep;
  salvarPerfil();
  fecharSeletorRegiao();
  _aplicarRegiaoAtual();
  mostrarToast(`Região: ${STATE.perfil.cidade} ✅`);
  SOUNDS.success();
}

function _capitalPorUF(uf) {
  const m = {
    // Brasil
    AC:"Rio Branco",AL:"Maceió",AP:"Macapá",AM:"Manaus",BA:"Salvador",
    CE:"Fortaleza",DF:"Brasília",ES:"Vitória",GO:"Goiânia",MA:"São Luís",
    MT:"Cuiabá",MS:"Campo Grande",MG:"Belo Horizonte",PA:"Belém",PB:"João Pessoa",
    PR:"Curitiba",PE:"Recife",PI:"Teresina",RJ:"Rio de Janeiro",RN:"Natal",
    RS:"Porto Alegre",RO:"Porto Velho",RR:"Boa Vista",SC:"Florianópolis",
    SP:"São Paulo",SE:"Aracaju",TO:"Palmas",
    // Espanha — 52 províncias (código DGT)
    AL:"Almería",CA:"Cádiz",CO:"Córdoba",GR:"Granada",H:"Huelva",J:"Jaén",MA:"Málaga",SE:"Sevilla",
    HU:"Huesca",TE:"Teruel",Z:"Zaragoza",O:"Oviedo",IB:"Palma",GC:"Las Palmas de G.C.",TF:"Santa Cruz de Tenerife",
    S:"Santander",AB:"Albacete",CR:"Ciudad Real",CU:"Cuenca",GU:"Guadalajara",TO:"Toledo",
    AV:"Ávila",BU:"Burgos",LE:"León",P:"Palencia",SA:"Salamanca",SG:"Segovia",SO:"Soria",VA:"Valladolid",ZA:"Zamora",
    B:"Barcelona",GI:"Girona",L:"Lleida",T:"Tarragona",BA:"Badajoz",CC:"Cáceres",
    C:"A Coruña",LU:"Lugo",OR:"Ourense",PO:"Pontevedra",LO:"Logroño",M:"Madrid",
    MU:"Murcia",NA:"Pamplona",VI:"Vitoria-Gasteiz",SS:"Donostia-San Sebastián",BI:"Bilbao",
    A:"Alicante",CS:"Castellón de la Plana",V:"Valencia",CE:"Ceuta",ML:"Melilla",
    // Portugal — 20 distritos
    "PT-01":"Aveiro","PT-02":"Beja","PT-03":"Braga","PT-04":"Bragança",
    "PT-05":"Castelo Branco","PT-06":"Coimbra","PT-07":"Évora","PT-08":"Faro",
    "PT-09":"Guarda","PT-10":"Leiria","PT-11":"Lisboa","PT-12":"Portalegre",
    "PT-13":"Porto","PT-14":"Santarém","PT-15":"Setúbal","PT-16":"Viana do Castelo",
    "PT-17":"Vila Real","PT-18":"Viseu","PT-20":"Ponta Delgada","PT-30":"Funchal"
  };
  return m[uf] || "Capital";
}

// ── País / Região: helpers genéricos ────────────────────────────
function _listaRegioesPorPais(pais) {
  if (pais === "ES") return DATA.regioesES;
  if (pais === "PT") return DATA.regioesPT;
  return DATA.estados;
}

// Preenche um <select> de "estado/região" com base no país escolhido
function _popularEstadoSelect(selectId, pais, valorAtual) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const lista = _listaRegioesPorPais(pais);
  sel.innerHTML = lista.map(e => {
    const label = pais === "BR" ? `${e.uf} — ${e.nome}` : e.nome;
    return `<option value="${e.uf}" ${e.uf === valorAtual ? "selected" : ""}>${label}</option>`;
  }).join("");
  if (!lista.some(e => e.uf === valorAtual)) sel.value = lista[0].uf;
}

// Reage à troca de país no seletor de região da topbar
function _onMudarPaisRegiao(pais) {
  _popularEstadoSelect("reg-estado", pais, null);
  _popularCidadesRegiao(document.getElementById("reg-estado")?.value);
  _popularBairrosRegiao(document.getElementById("reg-estado")?.value);
  const cepGrupo = document.getElementById("reg-cep-grupo");
  if (cepGrupo) cepGrupo.style.display = (pais === "BR") ? "" : "none";
}

// Aplica a região atual (STATE.perfil.pais/estado/cidade) ao clima, mapa e topbar
function _aplicarRegiaoAtual() {
  const pais  = STATE.perfil.pais || "BR";
  const uf    = STATE.perfil.estado || "DF";
  popularBairrosDatalist(uf);
  const topCidade = document.getElementById("top-cidade");
  if (topCidade) {
    const mostrarBairro = pais === "BR" && STATE.perfil.bairroOrigem;
    const label = mostrarBairro
      ? `${STATE.perfil.cidade} · ${STATE.perfil.bairroOrigem}`
      : STATE.perfil.cidade;
    topCidade.textContent = label;
  }
  buscarClima();
  if (STATE.mapaLeaflet) {
    const coord = _getCoordsEstado(pais, uf);
    STATE.mapaLeaflet.setView([coord.lat, coord.lon], 12);
    if (STATE.mapaMarkerUsuario) {
      STATE.mapaMarkerUsuario.setLatLng([coord.lat + 0.02, coord.lon]);
      STATE.mapaMarkerUsuario.setPopupContent(`📍 ${STATE.perfil.bairroOrigem || STATE.perfil.cidade}`);
    }
  }
}

// Stubs para funções chamadas em HTML legado (config tab)
function atualizarLabelsCfg() { /* populado em abrirConfiguracoes() */ }
function atualizarStatusEL()  { _sincStatusEL?.(); }

// ---------- Utilitários ----------
function mostrarToast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("visivel");
  setTimeout(() => t.classList.remove("visivel"), 3000);
}

// ── Utilidades de autocomplete e roteamento ─────────────────
function _debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

const _autocompleteCidade = _debounce(async function(query) {
  if (!query || query.length < 2) return;
  const pais = STATE.perfil.pais || "BR";
  const lang = pais === "ES" ? "es" : "pt";
  const cc   = pais === "BR" ? "BR" : pais === "ES" ? "ES" : "PT";
  try {
    const r = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=${lang}&format=json`
    ).then(r => r.json());
    const dl = document.getElementById("cidades-sugeridas");
    if (!dl) return;
    dl.innerHTML = "";
    (r.results || [])
      .filter(item => (item.country_code || "").toUpperCase() === cc)
      .forEach(item => {
        const o = document.createElement("option");
        o.value = item.name + (item.admin2 ? `, ${item.admin2}` : "");
        dl.appendChild(o);
      });
  } catch(e) {}
}, 350);

const _autocompleteNominatim = _debounce(async function(query, datalistId) {
  if (!query || query.length < 3) return;
  const pais    = STATE.perfil.pais || "BR";
  const country = pais === "BR" ? "br" : pais === "ES" ? "es" : "pt";
  const lang    = pais === "ES" ? "es" : pais === "PT" ? "pt" : "pt-BR";
  const cidade  = STATE.perfil.cidade || "";
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + (cidade ? ", " + cidade : ""))}&countrycodes=${country}&limit=8&format=json&addressdetails=1`,
      { headers: { "Accept-Language": lang } }
    ).then(r => r.json());
    const dl = document.getElementById(datalistId);
    if (!dl) return;
    const seen = new Set();
    r.forEach(item => {
      const name = item.address?.suburb || item.address?.neighbourhood || item.address?.quarter
                || item.address?.city_district || item.display_name.split(",")[0];
      if (name && !seen.has(name)) {
        seen.add(name);
        const o = document.createElement("option"); o.value = name; dl.appendChild(o);
      }
    });
  } catch(e) {}
}, 400);

async function _geocodeLocal(query, pais) {
  const lang    = pais === "ES" ? "es" : "pt";
  const country = pais === "BR" ? "br" : pais === "ES" ? "es" : "pt";
  const cc      = country.toUpperCase();
  try {
    // count=10 + filtro por país: o nome sozinho (ex: "La Coma") existe em vários países,
    // e sem esse filtro a API pode devolver um resultado de outro continente
    const r = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=${lang}&format=json`
    ).then(r => r.json());
    const match = (r.results || []).find(item => (item.country_code || "").toUpperCase() === cc);
    if (match) return { lat: match.latitude, lon: match.longitude };
  } catch(e) {}
  const _buscarNominatim = async (q) => {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&countrycodes=${country}&limit=1&format=json`,
      { headers: { "Accept-Language": lang } }
    ).then(r => r.json());
    return r?.[0] ? { lat: parseFloat(r[0].lat), lon: parseFloat(r[0].lon) } : null;
  };
  // 1ª tentativa: inclui a cidade cadastrada no perfil pra desambiguar nomes repetidos
  // (ex: "La Coma" existe em vários lugares dentro do mesmo país)
  try {
    const cidade = STATE.perfil.cidade || "";
    if (cidade && !query.toLowerCase().includes(cidade.toLowerCase())) {
      const comCidade = await _buscarNominatim(`${query}, ${cidade}`);
      if (comCidade) return comCidade;
    }
  } catch(e) {}
  // 2ª tentativa: sem a cidade (o lugar buscado pode ficar fora dela, ex: um hospital na cidade vizinha)
  try {
    const semCidade = await _buscarNominatim(query);
    if (semCidade) return semCidade;
  } catch(e) {}
  return null;
}

// Roteamento padrão (carro) — OSRM público, sem custo
// Mapeia o idioma do app para o código que a API da TomTom aceita
function _idiomaParaTomTom(idioma) {
  return { pt:"pt-BR", es:"es-ES", en:"en-US", ptpt:"pt-PT" }[idioma] || "pt-BR";
}

// Base comum de roteamento — TomTom Routing API, sempre com trânsito real
// (trafficDelayInSeconds) e instruções de manobra reais (guidance.instructions)
async function _calcularRotaTomTom(oCoord, dCoord, paramsVeiculo) {
  const params = new URLSearchParams({
    key: TOMTOM_API_KEY,
    traffic: "true",
    instructionsType: "text",
    language: _idiomaParaTomTom(STATE.perfil.idioma),
    ...paramsVeiculo
  });
  const url = `https://api.tomtom.com/routing/1/calculateRoute/${oCoord.lat},${oCoord.lon}:${dCoord.lat},${dCoord.lon}/json?${params.toString()}`;
  const data = await fetch(url).then(r => r.json());
  const rota = data.routes?.[0];
  if (!rota) return null;
  return {
    coords: rota.legs.flatMap(l => l.points).map(p => [p.latitude, p.longitude]),
    km:  (rota.summary.lengthInMeters / 1000).toFixed(1),
    min: Math.round(rota.summary.travelTimeInSeconds / 60),
    atrasoSegundos: rota.summary.trafficDelayInSeconds || 0,
    instrucoes: (rota.guidance?.instructions || []).map(i => ({
      distanciaM: i.routeOffsetInMeters,
      texto: i.message
    }))
  };
}

async function _calcularRotaCarro(oCoord, dCoord) {
  return _calcularRotaTomTom(oCoord, dCoord, {});
}

// Roteamento para caminhão — TomTom Routing API (respeita altura/largura/comprimento/peso)
async function _calcularRotaCaminhao(oCoord, dCoord, veiculo) {
  const paramsVeiculo = { travelMode: "truck", vehicleCommercial: "true" };
  if (veiculo.altura)      paramsVeiculo.vehicleHeight = veiculo.altura;
  if (veiculo.largura)     paramsVeiculo.vehicleWidth  = veiculo.largura;
  if (veiculo.comprimento) paramsVeiculo.vehicleLength = veiculo.comprimento;
  if (veiculo.peso)        paramsVeiculo.vehicleWeight = Math.round(veiculo.peso * 1000); // toneladas -> kg
  return _calcularRotaTomTom(oCoord, dCoord, paramsVeiculo);
}

async function tracarRotaNaMapa(orig, dest, pais) {
  if (!STATE.mapaLeaflet || !orig || !dest) return;
  mostrarToast("🗺️ Calculando rota...");
  try {
    const [oCoord, dCoord] = await Promise.all([
      _geocodeLocal(orig, pais || STATE.perfil.pais),
      _geocodeLocal(dest, pais || STATE.perfil.pais)
    ]);
    if (!oCoord || !dCoord) { mostrarToast("Endereço não encontrado"); return; }
    const veiculo   = STATE.perfil.veiculo;
    const ehCaminhao = veiculo?.tipo === "caminhao";
    const rota = ehCaminhao
      ? await _calcularRotaCaminhao(oCoord, dCoord, veiculo)
      : await _calcularRotaCarro(oCoord, dCoord);
    if (!rota) { mostrarToast("Rota não disponível"); return; }
    if (STATE._rotaPolyline) { STATE._rotaPolyline.remove(); STATE._rotaPolyline = null; }
    if (STATE._marcadorOrig) { STATE._marcadorOrig.remove(); }
    if (STATE._marcadorDest) { STATE._marcadorDest.remove(); }
    STATE._rotaPolyline = L.polyline(rota.coords, { color:"#00ff88", weight:5, opacity:0.85 }).addTo(STATE.mapaLeaflet);
    STATE.mapaLeaflet.fitBounds(STATE._rotaPolyline.getBounds(), { padding:[30,30] });
    STATE._marcadorOrig = L.marker([oCoord.lat, oCoord.lon]).addTo(STATE.mapaLeaflet).bindPopup(`📍 ${orig}`).openPopup();
    STATE._marcadorDest = L.marker([dCoord.lat, dCoord.lon]).addTo(STATE.mapaLeaflet).bindPopup(`🏁 ${dest}`);
    const rotulo = ehCaminhao ? "🚛 Rota p/ caminhão" : "✅ Rota";
    const avisoTransito = rota.atrasoSegundos > 60 ? ` (+${Math.round(rota.atrasoSegundos/60)} min de trânsito)` : "";
    mostrarToast(`${rotulo}: ${rota.km} km · ~${rota.min} min${avisoTransito}`);
    STATE._ultimaRota = { coords: rota.coords, destino: dest, destCoord: dCoord, atrasoSegundos: rota.atrasoSegundos, instrucoes: rota.instrucoes };
    return rota;
  } catch(e) { mostrarToast("Erro ao traçar rota"); }
}

// Popula datalists de bairros na aba Configurações
function _popularCfgBairros() {
  const pais = document.getElementById("cfg-pais")?.value || STATE.perfil.pais || "BR";
  const uf   = document.getElementById("cfg-estado")?.value || STATE.perfil.estado;
  const lista = _bairrosPorPaisUF(pais, uf);
  ["cfg-bairros-orig","cfg-bairros-dest"].forEach(dlId => {
    const dl = document.getElementById(dlId);
    if (!dl) return;
    dl.innerHTML = lista.map(b => `<option value="${b}"></option>`).join("");
  });
}

// Preços de combustível por país (mock com variação suave)
function atualizarCombustivel() {
  const pais   = STATE.perfil.pais || "BR";
  const el     = document.getElementById("comb-grid");
  const titulo = document.getElementById("comb-titulo");
  const fonte  = document.getElementById("comb-fonte");
  if (!el) return;
  const j = (base, dec) => (base + (Math.random() * 0.04 - 0.02)).toFixed(dec);
  let itens, moeda, fonteTexto, tituloTexto;
  if (pais === "ES") {
    moeda = "€"; tituloTexto = "⛽ Precios de Combustible";
    fonteTexto = "Fonte: Ministerio para la Transición Ecológica";
    itens = [
      { nome:"Gasolina 95", preco:j(1.640,3) },
      { nome:"Gasolina 98", preco:j(1.780,3) },
      { nome:"Gasóleo A",   preco:j(1.520,3) },
      { nome:"GLP",         preco:j(0.890,3) }
    ];
  } else if (pais === "PT") {
    moeda = "€"; tituloTexto = "⛽ Preços de Combustível";
    fonteTexto = "Fonte: DGEG — Direção-Geral de Energia e Geologia";
    itens = [
      { nome:"Gasolina 95", preco:j(1.670,3) },
      { nome:"Gasolina 98", preco:j(1.810,3) },
      { nome:"Gasóleo",     preco:j(1.540,3) },
      { nome:"GPL",         preco:j(0.790,3) }
    ];
  } else {
    moeda = "R$"; tituloTexto = "⛽ Preços de Combustível";
    fonteTexto = "Fonte: ANP — Agência Nacional do Petróleo";
    itens = [
      { nome:"Gasolina",     preco:j(5.490,2) },
      { nome:"Gasolina Ad.", preco:j(5.690,2) },
      { nome:"Etanol",       preco:j(3.290,2) },
      { nome:"Diesel",       preco:j(6.090,2) }
    ];
  }
  if (titulo) titulo.textContent = tituloTexto;
  el.innerHTML = itens.map(i => `
    <div style="background:var(--surface,#111827);border-radius:8px;padding:8px 10px;text-align:center;">
      <div style="font-size:0.72em;color:var(--muted,#888);margin-bottom:2px;">${i.nome}</div>
      <div style="font-size:1.05em;font-weight:700;color:#00ff88;">${moeda} ${i.preco}</div>
    </div>`).join("");
  if (fonte) fonte.textContent = fonteTexto;
}

function popularSelects() {
  // Select de país
  const selPais = document.getElementById("sel-pais");
  if (selPais) {
    selPais.innerHTML = DATA.paises.map(p =>
      `<option value="${p.code}" ${p.code === (STATE.perfil.pais || "BR") ? "selected" : ""}>${p.nome}</option>`
    ).join("");
    selPais.addEventListener("change", () => {
      STATE.perfil.pais = selPais.value;
      _popularEstadoSelect("sel-estado", selPais.value, null);
      const novoEstado = document.getElementById("sel-estado")?.value;
      popularCidadesEstado(novoEstado);
      popularBairrosDatalist(novoEstado);
      popularBairroSelect(novoEstado);
    });
  }

  // Select de estados
  const selEstado = document.getElementById("sel-estado");
  if (selEstado) {
    _popularEstadoSelect("sel-estado", STATE.perfil.pais || "BR", STATE.perfil.estado);
    selEstado.addEventListener("change", () => {
      popularCidadesEstado(selEstado.value);
      popularBairrosDatalist(selEstado.value);
      popularBairroSelect(selEstado.value);
    });
  }

  // Select de cidades (com opção "Outra cidade..." p/ digitar manualmente) + bairros
  popularCidadesEstado(STATE.perfil.estado);
  popularBairrosDatalist();
  popularBairroSelect(STATE.perfil.estado);

  const selCidade = document.getElementById("sel-cidade");
  if (selCidade) {
    selCidade.addEventListener("change", () => {
      _sincSelectOutra("sel-cidade", "inp-cidade-outra", STATE.perfil.cidade);
      STATE.perfil.cidade = _valorSelectComOutra("sel-cidade", "inp-cidade-outra");
      // Usa o valor atual do <select> de estado/região, não STATE.perfil.estado
      // (que só é gravado ao avançar o passo do setup, ficando desatualizado aqui)
      popularBairrosDatalist(document.getElementById("sel-estado")?.value);
    });
  }
  const inpCidadeOutra = document.getElementById("inp-cidade-outra");
  if (inpCidadeOutra) {
    inpCidadeOutra.addEventListener("input", () => {
      if ((STATE.perfil.pais || "BR") === "ES") _buscaPuebloSetup(inpCidadeOutra.value);
      else _autocompleteCidade(inpCidadeOutra.value);
    });
    inpCidadeOutra.addEventListener("change", () => {
      STATE.perfil.cidade = inpCidadeOutra.value.trim();
      if ((STATE.perfil.pais || "BR") === "ES") popularBairroSelect(document.getElementById("sel-estado")?.value);
      else popularBairrosDatalist(document.getElementById("sel-estado")?.value);
    });
  }
  const selBairro = document.getElementById("sel-bairro");
  if (selBairro) {
    selBairro.addEventListener("change", () => {
      _sincSelectOutra("sel-bairro", "inp-bairro-outra", STATE.perfil.bairroOrigem);
      STATE.perfil.bairroOrigem = _valorSelectComOutra("sel-bairro", "inp-bairro-outra");
    });
  }
  const inpBairroOutra = document.getElementById("inp-bairro-outra");
  if (inpBairroOutra) {
    inpBairroOutra.addEventListener("input", () => {
      if ((STATE.perfil.pais || "BR") === "ES") _buscaBairroSetup(inpBairroOutra.value);
      else _autocompleteNominatim(inpBairroOutra.value, "bairros-sugeridos");
    });
    inpBairroOutra.addEventListener("change", () => {
      STATE.perfil.bairroOrigem = inpBairroOutra.value.trim();
    });
  }
  const inpOrigHab = document.getElementById("inp-origem-hab");
  if (inpOrigHab && STATE.perfil.bairroOrigem) inpOrigHab.value = STATE.perfil.bairroOrigem;
  const inpDestHab = document.getElementById("inp-destino-hab");
  if (inpDestHab && STATE.perfil.bairroDestino) inpDestHab.value = STATE.perfil.bairroDestino;
}

// Retorna a lista de cidades de uma região (uf/província/distrito) para o país informado
function _cidadesPorPaisUF(pais, uf) {
  if (pais === "ES") return DATA.cidadesES?.[uf] || [];
  if (pais === "PT") return DATA.cidadesPT?.[uf] || [];
  // Brasil: mapa estático + fallback genérico
  const cidadesDF = ["Brasília","Taguatinga","Ceilândia","Samambaia","Gama","Planaltina","Sobradinho"];
  const cidadesGO = [...DATA.entornoDf,"Goiânia","Aparecida de Goiânia","Anápolis","Trindade"];
  const mapBR = {
    DF:cidadesDF, GO:cidadesGO,
    SP:["São Paulo","Campinas","Santos","São Bernardo do Campo","Guarulhos","Sorocaba","Ribeirão Preto"],
    RJ:["Rio de Janeiro","Niterói","Nova Iguaçu","Duque de Caxias","Petrópolis","Campos dos Goytacazes"],
    MG:["Belo Horizonte","Uberlândia","Contagem","Juiz de Fora","Montes Claros","Governador Valadares"],
    RS:["Porto Alegre","Caxias do Sul","Pelotas","Canoas","Santa Maria","Gravataí"],
    BA:["Salvador","Feira de Santana","Vitória da Conquista","Camaçari","Lauro de Freitas"],
    CE:["Fortaleza","Caucaia","Juazeiro do Norte","Maracanaú","Sobral"],
    PE:["Recife","Olinda","Caruaru","Petrolina","Paulista","Jaboatão dos Guararapes"],
    SC:["Florianópolis","Joinville","Blumenau","Chapecó","Itajaí"],
    PR:["Curitiba","Londrina","Maringá","Ponta Grossa","Cascavel","São José dos Pinhais"],
    AM:["Manaus","Parintins","Itacoatiara"],
    PA:["Belém","Ananindeua","Santarém","Marabá"],
    MA:["São Luís","Imperatriz","Timon","Caxias"],
    AL:["Maceió","Arapiraca","Palmeira dos Índios"],
    SE:["Aracaju","Nossa Senhora do Socorro","Lagarto"]
  };
  return mapBR[uf] || [];
}

// ── Espanha: pueblo e bairro via busca em tempo real na API do TomTom ──────
// (a Espanha tem +8.000 municípios — impossível manter uma lista fixa completa)
async function _buscarPueblosES(query, provinciaNome) {
  if (!query || query.length < 2 || !provinciaNome) return [];
  try {
    const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${TOMTOM_API_KEY}&idxSet=Geo&entityTypeSet=Municipality&countrySet=ES&typeahead=true&limit=10`;
    const r = await fetch(url).then(r => r.json());
    const vistos = new Set();
    return (r.results || [])
      .filter(x => x.address?.countrySecondarySubdivision === provinciaNome)
      .filter(x => { const n = x.address.municipality; if (vistos.has(n)) return false; vistos.add(n); return true; })
      .map(x => x.address.municipality);
  } catch(e) { return []; }
}

// Busca e guarda em cache o ponto (lat/lon) de um pueblo, usado pra restringir a busca de bairros a ele
async function _coordDoPuebloES(pueblo, provinciaNome) {
  if (!pueblo) return null;
  if (STATE._coordPuebloCache?.pueblo === pueblo) return STATE._coordPuebloCache.coord;
  try {
    const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(pueblo)}.json?key=${TOMTOM_API_KEY}&idxSet=Geo&entityTypeSet=Municipality&countrySet=ES&limit=5`;
    const r = await fetch(url).then(r => r.json());
    const match = (r.results || []).find(x => x.address?.municipality === pueblo && x.address?.countrySecondarySubdivision === provinciaNome)
                || (r.results || []).find(x => x.address?.municipality === pueblo)
                || r.results?.[0];
    const coord = match ? { lat: match.position.lat, lon: match.position.lon } : null;
    STATE._coordPuebloCache = { pueblo, coord };
    return coord;
  } catch(e) { return null; }
}

async function _buscarBairrosES(query, pueblo, provinciaNome) {
  if (!query || query.length < 2 || !pueblo) return [];
  const coord = await _coordDoPuebloES(pueblo, provinciaNome);
  if (!coord) return [];
  try {
    const url = `https://api.tomtom.com/search/2/search/${encodeURIComponent(query)}.json?key=${TOMTOM_API_KEY}&idxSet=Geo&entityTypeSet=MunicipalitySubdivision&countrySet=ES&typeahead=true&lat=${coord.lat}&lon=${coord.lon}&radius=20000&limit=10`;
    const r = await fetch(url).then(r => r.json());
    const vistos = new Set();
    return (r.results || [])
      .filter(x => x.address?.municipality === pueblo)
      .filter(x => { const n = x.address.municipalitySubdivision; if (vistos.has(n)) return false; vistos.add(n); return true; })
      .map(x => x.address.municipalitySubdivision);
  } catch(e) { return []; }
}

// Fábricas de busca ao vivo (debounced) pra pueblo/bairro da Espanha, parametrizadas
// pelos ids dos elementos (usadas tanto no setup quanto no modal "Minha Região" da topbar)
function _criarBuscaPuebloES(estadoSelectId, datalistId) {
  return _debounce(async (query) => {
    const uf = document.getElementById(estadoSelectId)?.value;
    const provincia = DATA.regioesES.find(r => r.uf === uf)?.nome;
    const dl = document.getElementById(datalistId);
    if (!dl || !provincia) return;
    const resultados = await _buscarPueblosES(query, provincia);
    dl.innerHTML = resultados.map(nome => `<option value="${nome}"></option>`).join("");
  }, 350);
}
function _criarBuscaBairroES(estadoSelectId, cidadeInputId, datalistId) {
  return _debounce(async (query) => {
    const uf = document.getElementById(estadoSelectId)?.value;
    const provincia = DATA.regioesES.find(r => r.uf === uf)?.nome;
    const pueblo = document.getElementById(cidadeInputId)?.value.trim();
    const dl = document.getElementById(datalistId);
    if (!dl || !provincia || !pueblo) return;
    const resultados = await _buscarBairrosES(query, pueblo, provincia);
    dl.innerHTML = resultados.map(nome => `<option value="${nome}"></option>`).join("");
  }, 350);
}
const _buscaPuebloSetup  = _criarBuscaPuebloES("sel-estado", "cidades-sugeridas");
const _buscaBairroSetup  = _criarBuscaBairroES("sel-estado", "inp-cidade-outra", "bairros-sugeridos");
const _buscaPuebloTopbar = _criarBuscaPuebloES("reg-estado", "reg-cidades-sugeridas");
const _buscaBairroTopbar = _criarBuscaBairroES("reg-estado", "reg-cidade-outra", "reg-bairros-sugeridos");

// Preenche um <select> com uma lista de opções e uma opção final de fallback
// (ex: "Outra cidade...") para quando o valor desejado não está na lista curada
// ou a região escolhida ainda não tem catálogo cadastrado.
function _popularSelectComOutra(sel, lista, valorAtual, labelOutra) {
  if (!sel) return;
  const opts = lista.map(v => `<option value="${v}">${v}</option>`).join("");
  sel.innerHTML = opts + `<option value="__outra__">${labelOutra}</option>`;
  if (valorAtual && lista.includes(valorAtual)) sel.value = valorAtual;
  else if (valorAtual) sel.value = "__outra__";
  else sel.value = lista[0] || "__outra__";
}

// Mostra/esconde o campo de digitação manual conforme a opção "Outra..." do select
function _sincSelectOutra(selectId, inputId, valorAtual) {
  const sel = document.getElementById(selectId);
  const inp = document.getElementById(inputId);
  if (!sel || !inp) return;
  const outra = sel.value === "__outra__";
  inp.style.display = outra ? "" : "none";
  if (outra && !inp.value && valorAtual) inp.value = valorAtual;
}

// Lê o valor final de um par select + input "Outra..."
function _valorSelectComOutra(selectId, inputId) {
  const sel = document.getElementById(selectId);
  if (!sel) return "";
  if (sel.value === "__outra__") return document.getElementById(inputId)?.value.trim() || "";
  return sel.value;
}

// Lê cidade/bairro considerando que, na Espanha, o <select> fica escondido
// e quem vale é o campo de busca ao vivo (ver _ativarBuscaES)
function _valorCidadeAtual() {
  if ((STATE.perfil.pais || "BR") === "ES") return document.getElementById("inp-cidade-outra")?.value.trim() || "";
  return _valorSelectComOutra("sel-cidade", "inp-cidade-outra");
}
function _valorBairroAtual() {
  if ((STATE.perfil.pais || "BR") === "ES") return document.getElementById("inp-bairro-outra")?.value.trim() || "";
  return _valorSelectComOutra("sel-bairro", "inp-bairro-outra");
}

// Alterna entre o <select> de lista fixa e o campo de busca ao vivo (usado pra Espanha,
// que tem municípios/bairros demais pra caber numa lista fixa)
function _ativarBuscaES(selectId, inputId, valorAtual) {
  const sel = document.getElementById(selectId);
  const inp = document.getElementById(inputId);
  if (sel) sel.style.display = "none";
  if (inp) {
    inp.style.display = "";
    if (valorAtual && !inp.value) inp.value = valorAtual;
  }
}
function _desativarBuscaES(selectId) {
  const sel = document.getElementById(selectId);
  if (sel) sel.style.display = "";
}

function popularCidadesEstado(uf) {
  const pais = STATE.perfil.pais || "BR";
  if (pais === "ES") { _ativarBuscaES("sel-cidade", "inp-cidade-outra", STATE.perfil.cidade); return; }
  const sel  = document.getElementById("sel-cidade");
  _desativarBuscaES("sel-cidade");
  const valorAtual = STATE.perfil.estado === uf ? STATE.perfil.cidade : null;
  _popularSelectComOutra(sel, _cidadesPorPaisUF(pais, uf), valorAtual, "✍️ Outra cidade...");
  _sincSelectOutra("sel-cidade", "inp-cidade-outra", STATE.perfil.cidade);
}

function _bairrosPorPaisUF(pais, uf) {
  if (pais === "ES") return DATA.bairrosES?.[uf] || [];
  if (pais === "PT") return DATA.bairrosPT?.[uf] || [];
  return (uf === "DF") ? [...DATA.bairros, ...DATA.entornoDf] : DATA.bairros;
}

function popularBairrosDatalist(uf) {
  const pais  = STATE.perfil.pais || "BR";
  // Na Espanha o datalist é preenchido pela busca ao vivo na TomTom (ver _buscaBairroSetup);
  // não sobrescrever aqui com a lista estática (que só cobre a cidade capital da província)
  if (pais === "ES") return;
  const todos = _bairrosPorPaisUF(pais, uf || STATE.perfil.estado);
  ["bairros-sugeridos"].forEach(id => {
    const dl = document.getElementById(id);
    if (!dl) return;
    dl.innerHTML = "";
    todos.forEach(b => { const o = document.createElement("option"); o.value = b; dl.appendChild(o); });
  });
}

// Preenche o <select> de "onde você mora" (bairro) do setup, com fallback manual
function popularBairroSelect(uf) {
  const pais = STATE.perfil.pais || "BR";
  if (pais === "ES") { _ativarBuscaES("sel-bairro", "inp-bairro-outra", STATE.perfil.bairroOrigem); return; }
  const sel  = document.getElementById("sel-bairro");
  _desativarBuscaES("sel-bairro");
  const valorAtual = STATE.perfil.estado === uf ? STATE.perfil.bairroOrigem : null;
  _popularSelectComOutra(sel, _bairrosPorPaisUF(pais, uf), valorAtual, "✍️ Outro bairro...");
  _sincSelectOutra("sel-bairro", "inp-bairro-outra", STATE.perfil.bairroOrigem);
}

// ── Tipo de veículo (carro/caminhão) — usado no setup e em Configurações ──
function popularCardsVeiculo(containerId) {
  const div = document.getElementById(containerId);
  if (!div) return;
  const tipos = [
    { id:"carro",    emoji:"🚗", nome:t("setup.rotas.veiculo.carro.nome"),    desc:t("setup.rotas.veiculo.carro.desc") },
    { id:"caminhao", emoji:"🚛", nome:t("setup.rotas.veiculo.caminhao.nome"), desc:t("setup.rotas.veiculo.caminhao.desc") }
  ];
  div.innerHTML = tipos.map(v => `
    <div class="card-opcao card-veiculo ${(STATE.perfil.veiculo?.tipo || "carro") === v.id ? "selecionado" : ""}"
         data-veiculo="${v.id}" onclick="selecionarVeiculo('${v.id}','${containerId}')">
      <div class="card-opcao-icon">${v.emoji}</div>
      <div class="card-opcao-nome">${v.nome}</div>
      <div class="card-opcao-desc">${v.desc}</div>
    </div>`).join("");
  _sincDimensoesVeiculo(containerId);
}

function selecionarVeiculo(tipo, containerId) {
  STATE.perfil.veiculo = STATE.perfil.veiculo || {};
  STATE.perfil.veiculo.tipo = tipo;
  const div = document.getElementById(containerId);
  div?.querySelectorAll(".card-veiculo").forEach(c => c.classList.remove("selecionado"));
  div?.querySelector(`[data-veiculo="${tipo}"]`)?.classList.add("selecionado");
  _sincDimensoesVeiculo(containerId);
}

// Mostra/esconde os campos de altura/largura/comprimento/peso conforme o tipo escolhido
function _sincDimensoesVeiculo(containerId) {
  const prefixo = containerId === "cfg-cards-veiculo" ? "cfg-veiculo" : "inp-veiculo";
  const grupoId = containerId === "cfg-cards-veiculo" ? "cfg-grupo-dimensoes-veiculo" : "grupo-dimensoes-veiculo";
  const grupo = document.getElementById(grupoId);
  const ehCaminhao = STATE.perfil.veiculo?.tipo === "caminhao";
  if (grupo) grupo.style.display = ehCaminhao ? "" : "none";
  const v = STATE.perfil.veiculo || {};
  ["altura","largura","comprimento","peso"].forEach(campo => {
    const el = document.getElementById(`${prefixo}-${campo}`);
    if (el && v[campo]) el.value = v[campo];
  });
}

// Lê os campos de dimensão do DOM (prefixo "inp-veiculo" ou "cfg-veiculo") e salva em STATE.perfil.veiculo
function _lerDimensoesVeiculo(prefixo) {
  const tipo = STATE.perfil.veiculo?.tipo || "carro";
  const veiculo = { tipo };
  ["altura","largura","comprimento","peso"].forEach(campo => {
    const el = document.getElementById(`${prefixo}-${campo}`);
    const valor = parseFloat(el?.value);
    if (!isNaN(valor) && valor > 0) veiculo[campo] = valor;
  });
  STATE.perfil.veiculo = veiculo;
}

function popularCardsVoz() {
  // Gênero
  const genDiv = document.getElementById("cards-genero");
  if (genDiv) genDiv.innerHTML = [
    { id:"feminino", emoji:"👩" },
    { id:"masculino",emoji:"👨" }
  ].map(g => `
    <div class="card-opcao card-genero ${STATE.perfil.genero===g.id?"selecionado":""}"
         data-genero="${g.id}" onclick="selecionarGenero('${g.id}')">
      <div class="card-opcao-icon">${g.emoji}</div>
      <div class="card-opcao-nome">${t(`cards.genero.${g.id}.nome`)}</div>
      <div class="card-opcao-desc">${t(`cards.genero.${g.id}.desc`)}</div>
    </div>`).join("");

  // Sotaque — lista varia por país
  const _paisVoz = STATE.perfil.pais || "BR";
  const _listaSot = _paisVoz === "ES" ? DATA.sotaquesES : _paisVoz === "PT" ? DATA.sotaquesPT : DATA.sotaques;
  const sotDiv = document.getElementById("cards-sotaque");
  if (sotDiv) sotDiv.innerHTML = _listaSot.map(s => `
    <div class="card-opcao card-sotaque ${STATE.perfil.sotaque===s.id?"selecionado":""}"
         data-sotaque="${s.id}" onclick="selecionarSotaque('${s.id}')">
      <div class="card-opcao-icon">${s.nome.split(" ").slice(-1)[0]||"🗣️"}</div>
      <div class="card-opcao-nome">${s.nome.split(" ").slice(0,-1).join(" ")}</div>
      <div class="card-opcao-desc">${s.regiao}</div>
    </div>`).join("");

  // Humor
  const humDiv = document.getElementById("cards-humor");
  if (humDiv) humDiv.innerHTML = DATA.humores.map(h => {
    const nome = t(`cards.humor.${h.id}.nome`);
    return `
    <div class="card-opcao card-humor ${STATE.perfil.humor===h.id?"selecionado":""}"
         data-humor="${h.id}" onclick="selecionarHumor('${h.id}')">
      <div class="card-opcao-icon">${nome.split(" ").slice(-1)[0]}</div>
      <div class="card-opcao-nome">${nome.split(" ").slice(0,-1).join(" ")}</div>
      <div class="card-opcao-desc">${t(`cards.humor.${h.id}.desc`)}</div>
    </div>`;
  }).join("");

  // Profissão
  const profDiv = document.getElementById("cards-profissao");
  if (profDiv) profDiv.innerHTML = DATA.profissoes.map(p => `
    <div class="card-opcao card-profissao ${STATE.perfil.profissao===p.id?"selecionado":""}"
         data-profissao="${p.id}" onclick="selecionarProfissao('${p.id}')">
      <div class="card-opcao-nome" style="font-size:0.85em">${t(`cards.profissao.${p.id}.nome`)}</div>
      <div class="card-opcao-desc">${t(`cards.profissao.${p.id}.desc`)}</div>
    </div>`).join("");
}

// ---------- Prévia de voz no setup ----------
function ouvirPrevia() {
  const status = { nivel:2, tempoTotal:28, tempoExtra:15, rota:"W3 Sul", incidente:null };
  const msg = AGENT.gerar(status, STATE.perfil);
  mostrarToast("🔊 Ouvindo prévia...");
  VOICE.falar(msg, STATE.perfil);
}

// ---------- Chat com Enter ----------
function chatKeydown(e) {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviarMensagem(); }
}

// ---------- Partículas do Splash ----------
function iniciarParticulasSplash() {
  const canvas = document.getElementById("splash-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particulas = Array.from({ length: 60 }, () => criarParticula(canvas));

  function criarParticula(c, forcar = false) {
    return {
      x:     Math.random() * c.width,
      y:     forcar ? c.height + 10 : Math.random() * c.height,
      r:     Math.random() * 2 + 0.5,
      speed: Math.random() * 0.8 + 0.3,
      alpha: Math.random() * 0.6 + 0.2,
      cor:   Math.random() > 0.6 ? "#00d4ff" : Math.random() > 0.5 ? "#00ff88" : "#ffcc00"
    };
  }

  let ativo = true;
  function animar() {
    if (!ativo) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.cor;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      p.y -= p.speed;
      p.alpha -= 0.001;

      // Efeito de trail horizontal (luzes da cidade)
      if (Math.random() > 0.97) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + (Math.random() * 30 - 15), p.y);
        ctx.strokeStyle = p.cor;
        ctx.globalAlpha = p.alpha * 0.4;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (p.y < -10 || p.alpha <= 0) particulas[i] = criarParticula(canvas, true);
    });

    requestAnimationFrame(animar);
  }
  animar();

  // Para quando sair do splash
  return () => { ativo = false; };
}

// ---------- Animação do Onboarding ----------
const COR_SLIDES = ["rgba(0,212,255,0.18)", "rgba(0,255,136,0.15)", "rgba(255,107,53,0.15)"];

function animarSlideEntrada() {
  const titulo = document.getElementById("slide-titulo");
  const texto  = document.getElementById("slide-texto");
  const icon   = document.getElementById("slide-icon");
  [titulo, texto, icon].forEach(el => {
    if (!el) return;
    el.style.animation = "none";
    el.offsetHeight; // reflow
    el.style.animation = "";
  });
  // Atualiza cor do glow conforme slide
  const glow = document.getElementById("obd-glow");
  if (glow) glow.style.background = `radial-gradient(circle, ${COR_SLIDES[slideAtual]} 0%, transparent 70%)`;
  // Dots
  document.querySelectorAll(".obd-dot").forEach((d, i) => {
    d.classList.toggle("ativa", i === slideAtual);
  });
}

// ---------- Inicialização ----------
window.addEventListener("DOMContentLoaded", async () => {
  // Inicializa ícones Lucide
  if (window.lucide) lucide.createIcons();

  // Detecta idioma (por IP) e aplica nas telas de apresentação
  const jaTemPerfil = carregarPerfil();
  if (jaTemPerfil) {
    // Perfil existente: não precisa esperar a detecção para popular os selects
    inicializarIdioma();
  } else {
    // 1ª vez (ou após reset): aguarda detecção para já carregar país/região/cidade corretos
    await inicializarIdioma(false, true);
  }

  VOICE.init();
  popularSelects();
  _ligarBuscaRegiaoTopbar();
  popularCardsVoz();
  popularCardsVeiculo("cards-veiculo");
  irVozPasso(0);
  irSetup(0);

  // Atualiza relógio imediatamente e a cada segundo
  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);
  // Atualiza trânsito a cada 2 min
  setInterval(() => { if (STATE.tela === "app") atualizarDashboard(); }, 120000);
  // Atualiza temperatura a cada 15 min
  setInterval(buscarTemperatura, 15 * 60 * 1000);
  // Inicia timer dos balões climáticos
  _iniciarTimerBalaoes();
  // Reavalia tema automático a cada hora
  setInterval(() => { if ((STATE.perfil.tema || "noite") === "auto") _aplicarTema("auto"); }, 60 * 60 * 1000);

  // Mensagem de boas-vindas no chat
  STATE.historicoChat = [];
  setTimeout(() => {
    if (STATE.perfil.nome) {
      atualizarDashboard();
      adicionarBolha("agente", _fmt(t("chat.boasVindas"), { nome: STATE.perfil.nome ? ", "+STATE.perfil.nome.split(" ")[0] : "" }));
    }
  }, 500);

  iniciarSplash();
});

// ============================================================
//  MODO CONDUÇÃO — controle por voz (SpeechRecognition)
// ============================================================
const MODO_COND = {
  ativo: false,
  rec: null,
  _pausadoParaFala: false,
  _ligadoAVoz: false,

  toggle() { this.ativo ? this.parar() : this.iniciar(); },

  iniciar() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { mostrarToast(t("voz.comandos.naoSuportado")); return; }

    this.ativo = true;
    document.getElementById("fab-modo-cond")?.classList.add("ativo");
    document.getElementById("modo-cond-bar")?.classList.add("ativa");

    // Se inscreve uma única vez pra saber quando o app fala (não importa quem
    // disparou), pra pausar o microfone e não ouvir a própria voz — se não fizer
    // isso, o reconhecimento de voz entende o próprio áudio do app como comando
    // e entra num loop sem fim
    if (!this._ligadoAVoz) {
      this._ligadoAVoz = true;
      VOICE.aoMudarFala((falando) => {
        if (!this.ativo) return;
        if (falando) {
          this._pausadoParaFala = true;
          try { this.rec?.stop(); } catch(e) {}
        } else {
          this._pausadoParaFala = false;
          // pequena folga antes de religar o microfone, pra deixar o eco da
          // fala terminar de verdade no ambiente
          setTimeout(() => {
            if (this.ativo && !VOICE.falando) { try { this.rec?.start(); } catch(e) {} }
          }, 400);
        }
      });
    }

    this.rec = new SR();
    this.rec.lang = VOICE.LOCALE[STATE.perfil.idioma] || "pt-BR";
    this.rec.continuous = true;
    this.rec.interimResults = false;
    this.rec.maxAlternatives = 1;

    this.rec.onresult = (e) => {
      if (this._pausadoParaFala) return; // ignora qualquer coisa captada enquanto o app fala
      const r = e.results[e.results.length - 1];
      if (r.isFinal) {
        const txt = r[0].transcript.trim().toLowerCase();
        const label = document.getElementById("cond-cmd-label");
        if (label) label.textContent = `"${txt}"`;
        this._processar(txt);
      }
    };
    this.rec.onerror = (e) => {
      if (e.error !== "no-speech" && e.error !== "aborted") {
        mostrarToast(_fmt(t("voz.comandos.erroVoz"), { erro: e.error }));
      }
    };
    // Reinicia automaticamente ao terminar — mas nunca enquanto o app está
    // falando (isso quem controla é o aoMudarFala acima)
    this.rec.onend = () => {
      if (this.ativo && !this._pausadoParaFala) setTimeout(() => { try { this.rec?.start(); } catch(ex){} }, 300);
    };

    try { this.rec.start(); } catch(e) {}
    SOUNDS.success();
    // Monta narração de boas-vindas com clima atual se disponível
    let bemVindo = t("voz.comandos.ativado");
    if (_climaAtual) {
      bemVindo += _fmt(t("voz.comandos.temperaturaInfo"), { temp: _climaAtual.temp, sens: _climaAtual.sens });
    }
    const modoAudio = STATE.perfil.audioMode || "tudo";
    if (modoAudio !== "silencio") VOICE.falar(bemVindo, STATE.perfil);
  },

  parar() {
    this.ativo = false;
    this._pausadoParaFala = false;
    try { this.rec?.stop(); } catch(e) {}
    this.rec = null;
    document.getElementById("fab-modo-cond")?.classList.remove("ativo");
    document.getElementById("modo-cond-bar")?.classList.remove("ativa");
    const label = document.getElementById("cond-cmd-label");
    if (label) label.textContent = "";
    VOICE.falar(t("voz.comandos.desativado"), STATE.perfil);
  },

  _processar(texto) {
    const idioma = STATE.perfil.idioma || "pt";
    const cmd = (I18N[idioma] || I18N.pt).voz.comandos.regex;
    // Rota alternativa / desvio
    if (new RegExp(cmd.alternativa).test(texto)) {
      pedirRotaAlternativa();
      VOICE.falar(t("voz.comandos.buscandoAlternativa"), STATE.perfil);
      return;
    }
    // Google Maps
    if (new RegExp(cmd.maps).test(texto)) {
      abrirGoogleMaps();
      VOICE.falar(t("voz.comandos.abrindoMaps"), STATE.perfil);
      return;
    }
    // Tabs
    if (new RegExp(cmd.dashboard).test(texto)) {
      ativarTab("dashboard");
      VOICE.falar(t("voz.comandos.telaPrincipal"), STATE.perfil);
      return;
    }
    if (new RegExp(cmd.mapa).test(texto)) {
      ativarTab("mapa");
      VOICE.falar(t("voz.comandos.mapaAberto"), STATE.perfil);
      return;
    }
    if (new RegExp(cmd.chat).test(texto)) {
      ativarTab("chat");
      VOICE.falar(t("voz.comandos.assistenteAberto"), STATE.perfil);
      return;
    }
    if (new RegExp(cmd.config).test(texto)) {
      ativarTab("config");
      VOICE.falar(t("voz.comandos.configAbertas"), STATE.perfil);
      return;
    }
    // Status da rota
    if (new RegExp(cmd.status).test(texto)) {
      const st = STATE.statusAtual;
      if (st) {
        VOICE.falar(
          _fmt(t("voz.comandos.statusRota"), { label: st.label, tempo: st.tempoTotal, rota: st.rota }),
          STATE.perfil
        );
      } else {
        VOICE.falar(t("voz.comandos.calculandoStatus"), STATE.perfil);
        atualizarDashboard();
      }
      return;
    }
    // Desligar modo
    if (new RegExp(cmd.desligar).test(texto)) {
      this.parar();
      return;
    }
    // Qualquer outra frase → envia pro chat como pergunta
    const inp = document.getElementById("chat-input");
    if (inp && texto.length > 3) {
      inp.value = texto;
      if (STATE.tabAtiva !== "chat") ativarTab("chat");
      setTimeout(enviarMensagem, 300);
    }
  }
};
