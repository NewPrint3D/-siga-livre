// ============================================================
//  SIGA LIVRE — agent.js
//  Sistema de personalidade do agente IA
// ============================================================

// Interpola "{chave}" em templates traduzidos
function _fmt(str, vars) {
  return (str || "").replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ""));
}

const AGENT = {

  // Gera mensagem completa com base no perfil e status de trânsito
  gerar(status, perfil) {
    const { nivel, tempoExtra, tempoTotal, rota, incidente } = status;
    const idioma    = perfil.idioma    || "pt";
    const dict      = (I18N[idioma] || I18N.pt).agent;
    const sotaque   = DATA.sotaques.find(s => s.id === perfil.sotaque) || DATA.sotaques[0];
    const humor     = perfil.humor     || "extrovertido";
    const profissao = perfil.profissao || "nenhum";
    const nome      = perfil.nome ? perfil.nome.split(" ")[0] : dict.nomePadrao;

    // Constrói mensagem base
    const base = this._baseMsg(dict, nivel, tempoTotal, tempoExtra, rota, incidente, nome);

    // Aplica profissão (muda o framing)
    const comProfissao = this._aplicarProfissao(dict, base, profissao, nivel);

    // Aplica humor (muda o tom)
    const comHumor = this._aplicarHumor(dict, comProfissao, humor, nivel);

    // Aplica sotaque (expressões regionais — só faz sentido em português)
    const final = idioma === "pt" ? this._aplicarSotaque(comHumor, sotaque, nivel) : comHumor;

    return final;
  },

  _baseMsg(dict, nivel, tempoTotal, tempoExtra, rota, incidente, nome) {
    const n = Math.min(nivel, 4);
    let incidenteFrase = "";
    if (incidente && dict.incidenteFrase[n]) {
      incidenteFrase = _fmt(dict.incidenteFrase[n], { incidente, incidenteLower: incidente.toLowerCase() });
    }
    return _fmt(dict.base[n], {
      nome, rota, tempoTotal, tempoExtra, incidenteFrase,
      tempoEspera1: Math.round(tempoExtra * 0.7),
      tempoEspera2: Math.round(tempoExtra * 0.8)
    });
  },

  _aplicarProfissao(dict, msg, prof, nivel) {
    const intro = dict.profissao.intro[prof] || "";
    const introF = _fmt(intro, { hora: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2,"0")}` });

    const sufixoDict = nivel >= 3 ? dict.profissao.sufixoAlto : dict.profissao.sufixoBaixo;
    const tempoSufixo = prof === "medico" ? Math.round((nivel*10)+10) : Math.round((nivel*8)+10);
    const sufixo = _fmt(sufixoDict[prof] || "", { tempo: tempoSufixo, pct: Math.round(nivel*15) });

    return introF + msg + sufixo;
  },

  _aplicarHumor(dict, msg, humor, nivel) {
    const h = dict.humor;
    const tempo = Math.round((nivel*8)+10);

    switch (humor) {
      case "extrovertido": {
        const aberturas = nivel >= 3 ? h.extrovertidoAberturasAlto : h.extrovertidoAberturasBaixo;
        const sufixo    = nivel >= 3 ? h.extrovertidoSufixoAlto    : h.extrovertidoSufixoBaixo;
        return aberturas[Math.floor(Math.random()*aberturas.length)] + msg + sufixo;
      }
      case "alegre":
        return (nivel >= 3 ? h.alegrePrefixoAlto : h.alegrePrefixoBaixo) + msg;
      case "formal":
        return msg.replace(/!/g,".").replace(/😱|🎉|💨|🚨/g,"");
      case "direto":
        if (nivel === 0) return h.diretoNivel0;
        if (nivel === 1) return h.diretoNivel1;
        if (nivel >= 3)  return _fmt(h.diretoNivelAlto, { tempo });
        return h.diretoDefault;
      case "zen": {
        const zen = h.zenFrases;
        return zen[Math.floor(Math.random()*zen.length)] + msg;
      }
      case "humor": {
        const piadas = nivel >= 3 ? h.humorFrasesAlto : h.humorFrasesBaixo;
        return piadas[Math.floor(Math.random()*piadas.length)] + msg;
      }
      case "girias":
      case "normal":
      default:
        return msg;
    }
  },

  _aplicarSotaque(msg, sotaque, nivel) {
    let t = msg;

    switch (sotaque.id) {

      case "nordestino":
        t = t
          .replace(/\bnão\b/gi,     "num")
          .replace(/\bvocê\b/gi,    "ocê")
          .replace(/\bvocês\b/gi,   "ocês")
          .replace(/\bestou\b/gi,   "tô")
          .replace(/\bmuito\b/gi,   "mui")
          .replace(/\bagora\b/gi,   "agora, visse")
          .replace(/\batenção\b/gi, "atenção, meu rei")
          .replace(/\bnão é\b/gi,   "num é não")
          .replace(/\bpouco\b/gi,   "pouquim")
          .replace(/\bminutos\b/gi, "minutim")
          .replace(/\bminuto\b/gi,  "minutim")
          .replace(/\btranquilo\b/gi,"arretado")
          .replace(/\bótimo\b/gi,   "arretado demais");
        t = nivel >= 3
          ? `Oxe, vixe! ${t} Tá osso, visse meu rei!`
          : `${t} Tá bom demais, visse!`;
        break;

      case "carioca":
        t = t
          .replace(/\bnão\b/gi,     "não, véi")
          .replace(/\bvocê\b/gi,    "cê")
          .replace(/\bmuito\b/gi,   "muito mesmo")
          .replace(/\batenção\b/gi, "olha só, cara")
          .replace(/\bminutos\b/gi, "minutinhos")
          .replace(/\bagora\b/gi,   "agora, tá ligado")
          .replace(/\btranquilo\b/gi,"de boa")
          .replace(/\bcuidado\b/gi, "peraí meu filho");
        t = nivel >= 3
          ? `Cara, que trânsito do inferno! ${t} Vai no piseiro não, tá ligado?`
          : `${t} Tá de boa, meu!`;
        break;

      case "paulistano":
        t = t
          .replace(/\bnão\b/gi,     "não, mano")
          .replace(/\bvocê\b/gi,    "cê")
          .replace(/\bmuito\b/gi,   "muito")
          .replace(/\batenção\b/gi, "ó, mano")
          .replace(/\bagora\b/gi,   "agora, entendeu")
          .replace(/\btranquilo\b/gi,"de boa")
          .replace(/\bminutos\b/gi, "minutinhos")
          .replace(/\bcuidado\b/gi, "segura aí, po");
        t = nivel >= 3
          ? `Mano, tá travado demais da conta! ${t} Segura a onda, né!`
          : `${t} Tá de boa, mano!`;
        break;

      case "mineiro":
        t = t
          .replace(/\bnão\b/gi,     "num")
          .replace(/\bvocê\b/gi,    "ocê")
          .replace(/\bvocês\b/gi,   "ocês")
          .replace(/\bmuito\b/gi,   "demais")
          .replace(/\batenção\b/gi, "uai, atenção")
          .replace(/\bagora\b/gi,   "agora não, sô")
          .replace(/\btranquilo\b/gi,"bão sô")
          .replace(/\bminutos\b/gi, "minutim")
          .replace(/\bminuto\b/gi,  "minutim")
          .replace(/\bcuidado\b/gi, "cuidado uai")
          .replace(/\bótimo\b/gi,   "trem bão sô");
        t = nivel >= 3
          ? `Uai sô, que trem! ${t} Fica sossegado um fio, uai!`
          : `${t} Tá bão sô!`;
        break;

      case "gaucho":
        t = t
          .replace(/\bnão\b/gi,     "não, bah")
          .replace(/\bvocê\b/gi,    "tu")
          .replace(/\bmuito\b/gi,   "tri")
          .replace(/\batenção\b/gi, "bah, atenção")
          .replace(/\bagora\b/gi,   "agora, tchê")
          .replace(/\btranquilo\b/gi,"tri tranquilo")
          .replace(/\bminutos\b/gi, "minutinhos, bah")
          .replace(/\bcuidado\b/gi, "barbaridade, cuidado")
          .replace(/\bótimo\b/gi,   "tri bão, tchê");
        t = nivel >= 3
          ? `Bah tchê, barbaridade! ${t} Guarda o chimarrão e aguenta, guri!`
          : `${t} Tri bão, tchê!`;
        break;

      case "nortista":
        t = t
          .replace(/\bnão\b/gi,     "não, bicho")
          .replace(/\bvocê\b/gi,    "tu")
          .replace(/\bmuito\b/gi,   "demais")
          .replace(/\batenção\b/gi, "égua, atenção")
          .replace(/\bagora\b/gi,   "agora, bicho")
          .replace(/\btranquilo\b/gi,"maneiro")
          .replace(/\bminutos\b/gi, "minutinhos, danado")
          .replace(/\bcuidado\b/gi, "égua, cuidado");
        t = nivel >= 3
          ? `Égua bicho, que trânsito danado! ${t} Espera um bocado aí, viu!`
          : `${t} Tá maneiro, bicho!`;
        break;

      case "catarinense":
        t = t
          .replace(/\bnão\b/gi,     "não, bah")
          .replace(/\bvocê\b/gi,    "tu")
          .replace(/\bmuito\b/gi,   "tri")
          .replace(/\batenção\b/gi, "bah, atenção")
          .replace(/\btranquilo\b/gi,"tri tranquilo")
          .replace(/\bminutos\b/gi, "minutinhos, tchê")
          .replace(/\bcuidado\b/gi, "cuidado, bah");
        t = nivel >= 3
          ? `Bah, que trânsito feio! ${t} Espera um tique aí, tchê!`
          : `${t} Tá tri bão, tchê!`;
        break;

      default: // brasiliense — sem transformação
        break;
    }
    return t;
  },

  // Respostas de chat livre (quando usuário digita algo)
  responderChat(pergunta, perfil, statusAtual) {
    const p      = pergunta.toLowerCase();
    const idioma = perfil?.idioma || "pt";
    const dict   = (I18N[idioma] || I18N.pt).agent;
    const nivel  = statusAtual?.nivel ?? 2;
    const nome   = perfil?.nome?.split(" ")[0] || dict.nomePadrao;
    const tempo  = Math.round((nivel*8)+10);
    const kw     = dict.chat.keywords;

    const any = (lista) => lista.some(k => p.includes(k));

    if (any(kw.trafego)) {
      return this.gerar(statusAtual, perfil);
    }
    if (any(kw.alternativa)) {
      return _fmt(dict.chat.alternativaResp, { tempo });
    }
    if (any(kw.acidente)) {
      return nivel >= 3
        ? _fmt(dict.chat.acidenteAlto,  { nome })
        : _fmt(dict.chat.acidenteBaixo, { nome });
    }
    if (any(kw.tempo)) {
      return this.gerar(statusAtual, perfil);
    }
    if (any(kw.obrigado)) {
      const respostas = dict.chat.obrigadoResp;
      return _fmt(respostas[Math.floor(Math.random()*respostas.length)], { nome });
    }
    if (any(kw.saudacao)) {
      return this.gerar(statusAtual, perfil);
    }
    // Resposta genérica
    return _fmt(dict.chat.genericoResp, { nome, msg: this.gerar(statusAtual, perfil) });
  }
};
