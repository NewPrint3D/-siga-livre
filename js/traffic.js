// ============================================================
//  SIGA LIVRE — traffic.js
//  Simulação realista do trânsito de Brasília por horário
// ============================================================

const TRAFFIC = {

  // Nível de 0 (livre) a 4 (caos total)
  getNivelHora(hora, minuto) {
    const t = hora + minuto / 60;
    if (t >= 6.0  && t < 7.0)  return 1; // começando
    if (t >= 7.0  && t < 9.5)  return 3; // pico manhã
    if (t >= 9.5  && t < 11.5) return 1;
    if (t >= 11.5 && t < 13.5) return 2; // almoço
    if (t >= 13.5 && t < 16.5) return 1;
    if (t >= 16.5 && t < 19.5) return 4; // pico tarde (crítico)
    if (t >= 19.5 && t < 21.0) return 2;
    return 0; // madrugada / noite
  },

  getStatus(rota, perfilBairroOrigem) {
    const agora = new Date();
    const h = agora.getHours();
    const m = agora.getMinutes();
    let nivel = this.getNivelHora(h, m);

    nivel = Math.max(0, Math.min(4, nivel + (Math.random() > 0.7 ? 1 : 0) - (Math.random() > 0.8 ? 1 : 0)));

    const rotasSatelite = ["br060","br040","df047","estrut","ic19","a1lis","a4por","a8lis"];
    if (rotasSatelite.includes(rota) && nivel >= 3) nivel = Math.min(4, nivel + 1);

    const tempoExtra = [0, 8, 18, 32, 55][nivel];
    const tempoBase  = this.tempoBase(rota);
    const pais       = STATE.perfil.pais || "BR";
    const prov       = STATE.perfil.estado;

    const rotasLista = pais === "ES"
      ? (DATA.rotasES?.[prov] || [])
      : pais === "PT"
        ? (DATA.rotasPT?.[prov] || [])
        : DATA.rotas;

    return {
      nivel,
      label:      [t("trafego.niveis.livre"),t("trafego.niveis.moderado"),t("trafego.niveis.pesado"),t("trafego.niveis.congestionado"),t("trafego.niveis.critico")][nivel],
      cor:        ["#00ff88","#ffcc00","#ff9900","#ff4444","#cc0000"][nivel],
      tempoTotal: tempoBase + tempoExtra,
      tempoExtra,
      rota:       rotasLista.find(r => r.id === rota)?.nome || rota,
      incidente:  nivel >= 3 && Math.random() > 0.6 ? this.incidenteAleatorio() : null
    };
  },

  tempoBase(rota) {
    const bases = {
      // Brasil
      eixao:12, w3:15, br060:22, br040:28, epia:18, estrut:25, df047:20, epnb:16, entorno:35, br020:28, df001:18,
      // Espanha — principais
      m30:15, a6:20, m40:22, rondag:14, b30:25, lavdal:12,
      v30:16, v21:18, centrovlc:10, se30:20, a4sev:25,
      a8bil:16, n634:12, a7mal:18, ma20:15, a2zar:20, z30:15,
      n340alc:14, a31alc:22,
      // Espanha — outras províncias
      rm20:18, a66as:22, gc1:20, tf5:18, a15na:16, n1ss:14, ag55:18, vci:16,
      n340al:20, a4ca:22, a4co:18, a44gr:20, a49h:22, a44j:24,
      n330hu:20, n234te:25, ma13:16, a67s:18, a31ab:22, a4cr:20, n400cu:25,
      a2gu:18, a42to:20, a50av:22, a1bu:20, a6le:22, a67p:22, a62sa:22,
      a1sg:20, n122so:25, a62va:18, a52za:22, ap7gi:20, n2l:22, n340t:18,
      a5ba:25, a66cc:22, a6lu:22, a52or:20, a12lo:16, a1vi:18, a7cs:20,
      n352ce:10, n352ml:10,
      // Portugal
      cintlis:15, a5lis:20, ic19:25, a8lis:18, a2lis:22, a1lis:30,
      vcirc:12, a4por:20, a3por:25, a28por:18, a20por:10,
      a22alg:22, a3bra:20, a2set:18,
    };
    return bases[rota] || 18;
  },

  incidenteAleatorio() {
    const incidentes = t("incidente.aleatorios");
    return incidentes[Math.floor(Math.random() * incidentes.length)];
  },

  rotaParaBairro(bairroOrigem) {
    const pais = STATE.perfil.pais || "BR";
    const prov = STATE.perfil.estado;
    const lc   = (bairroOrigem || "").toLowerCase();

    if (pais === "ES") {
      const rotasProv = DATA.rotasES?.[prov] || [];
      for (const r of rotasProv) {
        if (r.regioes.some(rg => rg.toLowerCase() === lc)) return r.id;
      }
      return rotasProv[0]?.id || "m30";
    }
    if (pais === "PT") {
      const rotasProv = DATA.rotasPT?.[prov] || [];
      for (const r of rotasProv) {
        if (r.regioes.some(rg => rg.toLowerCase() === lc)) return r.id;
      }
      return rotasProv[0]?.id || "cintlis";
    }
    for (const rota of DATA.rotas) {
      if (rota.regioes.includes(bairroOrigem)) return rota.id;
    }
    return "eixao";
  },

  // Previsão para os próximos 60 minutos (a cada 15 min)
  previsao(rota) {
    const agora = new Date();
    return [0, 15, 30, 45, 60].map(delta => {
      const d = new Date(agora.getTime() + delta * 60000);
      const nivel = this.getNivelHora(d.getHours(), d.getMinutes());
      const labels = [t("trafego.niveisSimples.livre"),t("trafego.niveisSimples.moderado"),t("trafego.niveisSimples.pesado"),t("trafego.niveisSimples.congestionado"),t("trafego.niveisSimples.critico")];
      const hh = String(d.getHours()).padStart(2,"0");
      const mm = String(d.getMinutes()).padStart(2,"0");
      return { hora:`${hh}:${mm}`, nivel, label: labels[nivel] };
    });
  }
};
