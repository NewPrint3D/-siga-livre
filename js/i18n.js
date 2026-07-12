// ============================================================
//  SIGA LIVRE — i18n.js
//  Tradução da "apresentação" do app (splash, onboarding, setup,
//  navegação e configurações) + detecção automática de idioma
//  por geolocalização de IP.
// ============================================================

const I18N = {

  // ──────────────────────────────────────────── Português ──
  pt: {
    app: {
      nome: "Siga Livre",
      nomeMaiusculo: "SIGA LIVRE"
    },
    splash: {
      sub: "Seu assistente de trânsito com IA",
      tap: "toque para continuar"
    },
    onboarding: {
      slide1: { titulo:"Seu parceiro no trânsito", texto:"O Siga Livre monitora o trânsito 24h e te avisa antes de você sair — nunca mais caia num engarrafamento de surpresa." },
      slide2: { titulo:"IA que fala com você", texto:"Um agente de inteligência artificial extrovertido que sugere rotas, horários alternativos e até onde parar enquanto o trânsito melhora." },
      slide3: { titulo:"Voz com a sua personalidade", texto:"Escolha a voz, o sotaque da sua região, o estado de ânimo e até um perfil profissional. Seu agente, do seu jeito." },
      btnProximo: "Próximo →",
      btnUltimo: "Vamos lá! 🚀"
    },
    setup: {
      titulo: "⚙️ Configuração inicial",
      perfil: {
        titulo: "Como posso te chamar?",
        nome: "Seu nome",
        nomePh: "Ex: Wesley",
        whatsapp: "WhatsApp (opcional — para alertas)",
        whatsappPh: "(61) 9 0000-0000"
      },
      rotas: {
        titulo: "🗺️ Suas rotas",
        sub: "Configure sua cidade e seus trajetos habituais",
        ondeMora: "📍 Onde você mora",
        pais: "País",
        estado: "Estado",
        cidade: "Cidade",
        cidadePh: "Ex: Brasília",
        bairro: "Bairro / Região",
        bairroPh: "Ex: Asa Norte",
        rotaHabitual: "🏠→🏢 Rota Habitual (dia a dia)",
        deOnde: "De onde você sai",
        deOndePh: "Bairro ou endereço de saída",
        paraOnde: "Para onde vai",
        paraOndePh: "Bairro ou endereço de destino",
        saidaCasa: "🌅 Saída de casa",
        saidaTrabalho: "⏰ Saída do trabalho",
        rotaAlt: "🔀 Rota Alternativa (fim de semana / lazer)",
        rotaAltSub: "Opcional — para quando for a outro lugar",
        altDeOnde: "De onde sai",
        altParaOnde: "Para onde vai",
        opcionalPh: "Opcional",
        alertas: "⛽ Alertas e Promoções durante o trajeto",
        combustivel: "Preços de combustível",
        combustivelSub: "Postos num raio de 2km durante a rota",
        parceiros: "Promoções de parceiros",
        parceirosSub: "Ofertas de comércios no seu caminho",
        veiculo: {
          titulo: "🚗 Tipo de veículo",
          carro:    { nome:"Carro",    desc:"Rota padrão" },
          caminhao: { nome:"Caminhão", desc:"Evita pontes baixas e vias restritas" },
          altura: "Altura (m)", alturaPh: "Ex: 4.0",
          largura: "Largura (m)", larguraPh: "Ex: 2.5",
          comprimento: "Comprimento (m)", comprimentoPh: "Ex: 16.5",
          peso: "Peso total (t)", pesoPh: "Ex: 40"
        }
      },
      voz: {
        genero:   { titulo:"Voz do seu agente",      sub:"Masculina ou feminina?",                 previa:"🔊 Ouvir prévia" },
        sotaque:  { titulo:"Sotaque regional",        sub:"Qual região do Brasil você prefere?" },
        humor:    { titulo:"Estado de ânimo",         sub:"Como você quer que o agente fale?" },
        profissao:{ titulo:"Perfil profissional",     sub:"O agente adapta o vocabulário à sua área", previa:"🔊 Ouvir prévia com esse perfil" }
      },
      footer: { voltar:"← Voltar", proximo:"Próximo →" }
    },
    voz: {
      voltar:"← Voltar", proximo:"Próximo →", concluir:"Concluir ✓",
      comandos: {
        naoSuportado: "Seu navegador não suporta reconhecimento de voz",
        ativado: "Modo condução ativado. Pode falar seus comandos.",
        desativado: "Modo condução desativado.",
        temperaturaInfo: " Temperatura atual: {temp} graus, sensação de {sens} graus.",
        buscandoAlternativa: "Buscando rota alternativa.",
        abrindoMaps: "Abrindo Google Maps.",
        telaPrincipal: "Tela principal aberta.",
        mapaAberto: "Mapa aberto.",
        assistenteAberto: "Assistente aberto. Pode falar.",
        configAbertas: "Configurações abertas.",
        statusRota: "Sua rota está {label}. Tempo estimado: {tempo} minutos pela {rota}.",
        calculandoStatus: "Calculando status da rota.",
        erroVoz: "Voz: {erro}",
        regex: {
          alternativa: "alternativa|desviar|contornar|outra rota|mudar rota",
          maps: "google|maps|navegar|abrir mapa|redirecionar",
          dashboard: "dashboard|início|home|inicio|tela inicial",
          mapa: "\\bmapa\\b|ver mapa",
          chat: "chat|assistente|conversar|perguntar|falar com",
          config: "config|configurações|configurar|ajustes",
          status: "status|situação|como está|trânsito|como tá|tempo|demora",
          desligar: "desligar|parar modo|sair do modo|cancelar modo|encerrar"
        }
      }
    },
    nav: { inicio:"Início", mapa:"Mapa", chat:"Chat", config:"Config" },
    cards: {
      genero: {
        feminino:  { nome:"Feminino",  desc:"Voz suave e carismática" },
        masculino: { nome:"Masculino", desc:"Voz grave e direta" }
      },
      humor: {
        extrovertido: { nome:"Extrovertido 🎉", desc:"Energia máxima e animação" },
        alegre:       { nome:"Alegre 😄",       desc:"Positivo e leve" },
        girias:       { nome:"Com Gírias 🤙",   desc:"Fala igual ao povo local" },
        normal:       { nome:"Normal 😌",        desc:"Direto e equilibrado" },
        formal:       { nome:"Formal 👔",        desc:"Tom profissional" },
        direto:       { nome:"Direto 😤",        desc:"Curto e objetivo" },
        zen:          { nome:"Zen 🧘",           desc:"Calmo e filosófico" },
        humor:        { nome:"Humorístico 😂",   desc:"Piadas e memes sobre o trânsito" }
      },
      profissao: {
        nenhum:     { nome:"Sem perfil 🎯",          desc:"Linguagem universal" },
        medico:     { nome:"Médico / Saúde 👨‍⚕️",     desc:"Diagnóstico de rota" },
        advogado:   { nome:"Advogado / Jurídico ⚖️", desc:"Argumentação formal" },
        professor:  { nome:"Professor 🎓",            desc:"Tom educativo e incentivo" },
        militar:    { nome:"Militar 🪖",              desc:"Missão e estratégia" },
        chef:       { nome:"Chef de Cozinha 👨‍🍳",     desc:"Metáforas culinárias" },
        personal:   { nome:"Personal Trainer 🏋️",    desc:"Motivação e metas" },
        locutor:    { nome:"Locutor de Rádio 🎙️",    desc:"Notícia ao vivo" },
        ceo:        { nome:"Executivo / CEO 👨‍💼",     desc:"ROI e métricas" },
        uber:       { nome:"Motorista de App 🚗",     desc:"Foco em corridas" },
        engenheiro: { nome:"Engenheiro 🏗️",           desc:"Dados técnicos precisos" },
        comerciante:{ nome:"Comerciante 🛍️",         desc:"Foco em negócios" }
      }
    },
    cfg: {
      idioma: {
        titulo:"🌐 Idioma", sub:"Escolha o idioma do app, ou deixe automático conforme sua localização.",
        auto:"Automático", autoDesc:"Detecta pela localização",
        pt:"Português BR", ptpt:"Português PT", es:"Español", en:"English"
      },
      perfil: { titulo:"Perfil", nome:"Seu nome", pais:"🌍 País", estado:"Estado / Região", cidade:"Cidade", cidadePh:"Ex: Brasília" },
      elvoz: {
        titulo: "🎙️ Voz do Agente",
        naoConfigurado: "Não configurado",
        ativo: "✅ Ativo",
        descPasso1: "Cole sua chave de API de voz abaixo. Você a encontra nas configurações da sua conta no serviço de voz.",
        descPasso1Strong: "Conta → Configurações → API Keys",
        chaveLabel: "Chave de API (sk_...)",
        chavePh: "sk_xxxxxxxxxxxxxxxxxxxxxxxx",
        conectar: "Conectar →",
        verificando: "⏳ Verificando chave...",
        contaConectada: "✅ Conta conectada! ",
        escolherVozes: "Escolha as vozes",
        carregarVozes: "🔄 Carregar vozes PT-BR",
        buscandoVozes: "⏳ Buscando vozes disponíveis...",
        vozFeminina: "👩 Voz feminina",
        vozMasculina: "👨 Voz masculina",
        bellaPadrao: "Bella (padrão)",
        arnoldPadrao: "Arnold (padrão)",
        ouvir: "▶ Ouvir",
        gerarTitulo: "🧬 Gerar voz com sotaque regional (avançado)",
        gerarDesc: "A IA cria uma voz nova com o sotaque da região que você escolheu. Usa ~500 caracteres do seu plano de voz.",
        optVozFeminina: "Voz feminina",
        optVozMasculina: "Voz masculina",
        gerarBtn: "🎙️ Gerar voz com sotaque real",
        gerando: "⏳ Gerando... pode levar 15-30 segundos",
        salvarVoz: "✅ Salvar configuração de voz",
        testarVoz: "🔊 Testar voz agora",
        trocarVoz: "✏️ Trocar voz / reconfigurar",
        vozConfigurada: "configurada",
        descAtivo: "Voz do agente ativa! Voz fem.: {voz}. Sotaques regionais ficam ainda mais naturais.",
        coleChavePrimeiro: "⚠️ Cole a chave primeiro",
        contaInfo: "({nome} — {chars}k chars/mês)",
        usuarioPadrao: "usuário",
        chaveValida: "✅ Chave válida! Agora escolha as vozes.",
        chaveInvalida: "❌ Chave inválida. Verifique e tente novamente.",
        vozesEncontradas: "{n} vozes encontradas",
        erroBuscarVozes: "Erro ao buscar vozes — usando padrões",
        configureVozPrimeiro: "Configure a voz do agente primeiro",
        textoPreview: "Oi! Sou o agente do Siga Livre. Estou pronto para ajudar com o trânsito!",
        reproduzindoPreview: "🔊 Reproduzindo preview...",
        vozOk: "✅ Voz ok!",
        vozConfiguradaSucesso: "✅ Voz configurada com sucesso! Testando...",
        configureChavePrimeiro: "Configure a chave primeiro",
        vozGeradaSalva: "✅ Voz \"{sotaque} {genero}\" gerada e salva! ID: {id}...",
        vozCriadaSotaque: "🎙️ Voz {sotaque} criada com sotaque real!",
        erroPrefixo: "Erro: "
      },
      rotaHabitual: {
        titulo: "🏠 Rota Habitual",
        tipoLabel: "📌 Tipo de rota habitual",
        pontoPartida: "🏠 Ponto de partida (bairro / região)",
        destinoPrincipal: "📍 Destino principal",
        opts: {
          trabalho_casa: "🏢 Trabalho / Casa",
          faculdade: "🎓 Faculdade / Universidade",
          colegio: "📚 Colégio / Escola",
          hospital: "🏥 Hospital / UPA / Clínica",
          shopping: "🛍️ Shopping Center",
          supermercado: "🛒 Supermercado / Mercado",
          comercio: "💼 Comércio / Negócio",
          igreja: "⛪ Igreja / Templo / Culto",
          parentes: "👨‍👩‍👧 Parentes / Amigos",
          reparticao: "🏛️ Repartição Pública / Banco",
          outros_hab: "📍 Outros"
        }
      },
      rotaAlternativa: {
        titulo: "🔀 Rota Alternativa",
        sub: "Onde você vai além do trajeto habitual.",
        tipoLabel: "📌 Tipo de rota alternativa",
        deOnde: "🏠 De onde sai (opcional)",
        deOndePh: "Ex: Asa Norte, trabalho, casa...",
        paraOnde: "📍 Para onde vai (opcional)",
        paraOndePh: "Ex: Smart Fit Taguatinga, Clínica Saúde...",
        opts: {
          academia: "💪 Academia / Musculação",
          pilates: "🧘 Pilates / Yoga / Meditação",
          consulta: "🩺 Consulta Médica / Dentista",
          treino: "⚽ Treino Esportivo / Clube",
          restaurante: "🍽️ Restaurante / Lanchonete",
          bar: "🎉 Saídas Sociais / Baladas",
          lazer: "🌳 Praia / Parque / Lazer",
          salao: "✂️ Salão de Beleza / Barbearia",
          servicos: "🏦 Banco / Cartório / Serviços",
          evento: "🎭 Evento / Show / Teatro",
          compras: "🛍️ Compras / Outlet / Feira",
          viagem: "✈️ Aeroporto / Rodoviária",
          outros_alt: "📍 Outros"
        }
      },
      personalidade: {
        titulo: "Personalidade do agente",
        genero: "Gênero:",
        sotaque: "Sotaque:",
        humor: "Humor:",
        perfil: "Perfil:",
        alterar: "✏️ Alterar personalidade do agente"
      },
      aparencia: {
        titulo: "🎨 Aparência",
        desc: "Escolha o tema visual do app.",
        dia: "Dia", diaDesc: "Fundo claro",
        noite: "Noite", noiteDesc: "Fundo escuro",
        auto: "Automático", autoDesc: "Por horário"
      },
      audio: {
        titulo: "🔊 Controle de Áudio",
        desc: "Escolha o que você quer ouvir durante a condução.",
        tudo: "Ouvir tudo", tudoDesc: "Rota + alertas climáticos",
        soRota: "Só rota", soRotaDesc: "Silencia balões de clima",
        soAlertas: "Só alertas", soAlertasDesc: "Silencia orientações de rota",
        silencio: "Silêncio", silencioDesc: "Apenas visual, sem áudio"
      },
      clima: {
        titulo: "🌡️ Balões de Clima",
        toggleLabel: "Balões de informação climática",
        toggleSub: "Alertas saem do escapamento do carro",
        intervaloLabel: "Intervalo de exibição",
        int3: "A cada 3 minutos",
        int5: "A cada 5 minutos",
        int10: "A cada 10 minutos",
        int20: "A cada 20 minutos",
        int30: "A cada 30 minutos"
      },
      botoes: {
        salvar: "💾 Salvar alterações",
        resetar: "🗑️ Recomeçar do zero",
        confirmResetar: "Apagar todos os dados e recomeçar do zero?"
      }
    },
    agent: {
      nomePadrao: "motorista",
      base: [
        "Boa notícia, {nome}! Sua rota pela {rota} está totalmente livre agora. Você chega em casa em cerca de {tempoTotal} minutos sem problemas. Pode sair quando quiser!",
        "{nome}, o trânsito na {rota} está moderado. Você deve levar uns {tempoTotal} minutos — nada demais. Se sair agora chega tranquilo.",
        "Atenção, {nome}! O trânsito na {rota} está pesado. {incidenteFrase}Se sair agora vai demorar uns {tempoTotal} minutos — {tempoExtra} a mais que o normal. Vale considerar esperar uns 20 minutinhos.",
        "Cuidado, {nome}! A {rota} está congestionada agora. {incidenteFrase}Se sair agora vai levar {tempoTotal} minutos — {tempoExtra} a mais! Recomendo fortemente esperar mais {tempoEspera1} minutos ou usar uma rota alternativa.",
        "ALERTA, {nome}! O trânsito na {rota} está CRÍTICO. {incidenteFrase}Você vai ficar {tempoTotal} minutos no trânsito — {tempoExtra} a mais que o normal! Recomendo esperar no mínimo {tempoEspera2} minutos ou usar uma via alternativa urgente."
      ],
      incidenteFrase: {
        2: "Tem {incidenteLower} na via. ",
        3: "Causado por: {incidente}. ",
        4: "{incidente} está travando tudo. "
      },
      profissao: {
        intro: {
          medico:     "Diagnóstico de rota: ",
          advogado:   "Conforme dados de trânsito vigentes: ",
          professor:  "Aula de hoje — trânsito: ",
          militar:    "Relatório de missão: ",
          chef:       "Receita do dia: ",
          personal:   "RELATÓRIO DE PERFORMANCE: ",
          locutor:    "📻 Aqui é o Siga Livre ao vivo! ",
          ceo:        "Análise estratégica: ",
          uber:       "Status da operação: ",
          engenheiro: "Dados coletados às {hora}: ",
          comerciante:"Oportunidade de negócio: ",
          nenhum:     ""
        },
        sufixoAlto: {
          medico:     " Prescrição: repouso de {tempo} minutos antes de prosseguir.",
          advogado:   " Interpelo que V.Sa. aguarde {tempo} minutos para proceder.",
          professor:  " Tarefa: aguarde {tempo} minutos. Nota 10 para a paciência!",
          militar:    " Aguarde ordens. Reengajamento em {tempo} minutos.",
          chef:       " O prato ainda não está no ponto — precisa de mais {tempo} minutinhos no forno.",
          personal:   " AGUENTA! Mais {tempo} minutos e você VAI ARRASAR!",
          locutor:    " Fique ligado que informamos assim que abrir!",
          ceo:        " ROI comprometido. Aguardar {tempo} min reduz o impacto em {pct}%.",
          uber:       " Evite aceitar corridas nessa região nos próximos {tempo} min.",
          engenheiro: " Estimativa de melhora: {tempo} min. Precisão do modelo: 87%.",
          comerciante:" Oportunidade: {tempo} min para prospectar pelo WhatsApp.",
          nenhum:     ""
        },
        sufixoBaixo: {
          medico:     " Prognóstico favorável.",
          advogado:   " Não há impedimento legal para prosseguir.",
          professor:  " Parabéns pelo aproveitamento!",
          militar:    " Rota liberada. Prossiga com segurança, soldado.",
          chef:       " Prato servido na hora certa!",
          personal:   " BORA QUE VOCÊ CONSEGUE! 💪",
          locutor:    " Trânsito ok! Mais notícias em breve!",
          ceo:        " KPIs de deslocamento dentro do esperado.",
          uber:       " Região com boa demanda. Aproveite!",
          engenheiro: " Sistema operando dentro dos parâmetros.",
          comerciante:" Boa hora para visitar clientes!",
          nenhum:     ""
        }
      },
      humor: {
        extrovertidoAberturasAlto:  ["⚠️ ALERTA MÁXIMO! ","🚨 ATENÇÃO TOTAL! ","OPS OPS OPS! "],
        extrovertidoAberturasBaixo: ["🎉 ","🔥 ÓTIMAS NOTÍCIAS! ","🚀 "],
        extrovertidoSufixoAlto:  " 😱",
        extrovertidoSufixoBaixo: " 🎉💨",
        alegrePrefixoAlto:  "Calma, vai passar! 😊 ",
        alegrePrefixoBaixo: "Que dia lindo! 😊 ",
        diretoNivel0:    "Rota livre. Pode sair.",
        diretoNivel1:    "Trânsito moderado. Siga normalmente.",
        diretoNivelAlto: "Trânsito crítico. Espere {tempo} min ou desvie.",
        diretoDefault:   "Trânsito pesado. Considere esperar.",
        zenFrases: [
          "O trânsito é como a maré — vem e vai. ",
          "Tudo passa, inclusive o engarrafamento. ",
          "A pressa é inimiga da paz e também do trânsito. "
        ],
        humorFrasesAlto: [
          "Boa notícia: você tem tempo livre agora! Má notícia: é dentro do carro. 😂 ",
          "A via virou estacionamento VIP hoje. Entrada: grátis. Saída: mistério. 😅 "
        ],
        humorFrasesBaixo: [
          "Trânsito comportado hoje — até parece que os motoristas dormiram bem! 😄 "
        ]
      },
      chat: {
        keywords: {
          trafego:     ["tráfego","trânsito","rota"],
          alternativa: ["alternativ","desvio","outro caminho"],
          acidente:    ["acident","incidente"],
          tempo:       ["quanto tempo","demora"],
          obrigado:    ["obrigad","valeu","brigad"],
          saudacao:    ["oi","olá","bom dia","boa tarde"]
        },
        alternativaResp: "Para evitar o congestionamento atual, a melhor opção é seguir por uma rota alternativa ou aguardar uns {tempo} minutos para o trânsito melhorar naturalmente.",
        acidenteAlto:  "Sim, {nome}! Registrei um incidente na via principal. A Polícia Militar está no local. Recomendo rota alternativa ou aguardar resolução em cerca de 20 minutos.",
        acidenteBaixo: "Sem acidentes registrados na sua rota agora, {nome}. Trânsito fluindo normalmente.",
        obrigadoResp: [
          "Por nada, {nome}! Estou aqui 24 horas pra te ajudar. Boa viagem! 🚗",
          "Fico feliz em ajudar, {nome}! Qualquer coisa é só falar! 😊",
          "Disponha, {nome}! Chegue bem em casa! 🏠"
        ],
        genericoResp: "Entendido, {nome}! {msg}"
      }
    },
    topbar: { dianoite:"Dia/Noite" },
    dash: {
      ola: "Olá! 👋",
      monitorando: "Monitorando o trânsito em tempo real",
      bomDia: "Bom dia",
      boaTarde: "Boa tarde",
      boaNoite: "Boa noite",
      trafegoAoVivo: "trânsito ao vivo",
      rotaHabitual: "🏠 Habitual",
      rotaAlternativa: "🔀 Alternativa",
      rotaIrPara: "📍 Ir para...",
      suaRotaAgora: "📍 Sua rota agora",
      sensacao: "Sensação {temp}°C",
      calculando: "Calculando...",
      tempoEstimado: "Tempo estimado",
      viaPrincipal: "Via principal",
      agenteNome: "Agente Siga Livre",
      agenteOnline: "● Online",
      analisando: "Analisando o trânsito para você...",
      ouvirAgente: "Ouvir o agente",
      previsaoTitulo: "📅 Previsão — próximos 60 min",
      faleComAgente: "Fale com o agente",
      faleComAgenteSub: "Tire dúvidas, peça alternativas, converse",
      abrirChat: "Abrir chat →"
    },
    chat: {
      inputPh: "Pergunte sobre o trânsito...",
      boasVindas: "Olá{nome}! 👋 Estou online e monitorando o trânsito em tempo real. Me pergunte qualquer coisa!"
    },
    modal: {
      incidente: {
        titulo: "Incidente na rota",
        tituloDinamico: "{icone} {tipo} na rota",
        tipo: "Tipo",
        local: "Local",
        km: "KM aprox.",
        referencia: "Referência",
        situacao: "Situação",
        verMapa: "Ver no mapa",
        perguntaAlternativa: "Tem rota alternativa para evitar esse incidente?",
        pedirAlternativa: "🔀 Pedir rota alternativa",
        redirecionando: "🗺️ Redirecionando no Google Maps",
        fechar: "Fechar"
      },
      irPara: {
        titulo: "📍 Para onde você quer ir?",
        ouEscolha: "― ou escolha outra rota ―",
        origem: "Origem",
        opcional: "(opcional)",
        origemPh: "De onde você vai sair?",
        usarLocalizacao: "Usar minha localização",
        destino: "Destino",
        destinoPh: "Bairro, rua ou ponto de referência",
        usarLocalizacaoDestino: "Usar minha localização como destino",
        gpsStatus: "Obtendo localização...",
        iniciarNavegacao: "🗺️ Iniciar navegação",
        cancelar: "Cancelar"
      },
      regiao: {
        titulo: "🗺️ Minha Região",
        subtitulo: "Escolha seu estado e cidade para personalizar rotas, clima e informações locais.",
        pais: "País",
        brasil: "🇧🇷 Brasil",
        espanha: "🇪🇸 Espanha",
        estado: "Estado / Região",
        cidade: "Cidade",
        cidadePh: "Nome da sua cidade",
        bairro: "Bairro / Região",
        opcional: "(opcional)",
        bairroPh: "Ex: Asa Norte, Centro, Vila Madalena…",
        cep: "CEP",
        cepObs: "(opcional — para maior precisão)",
        cepPh: "00000-000",
        cancelar: "Cancelar",
        confirmar: "✅ Confirmar"
      }
    },
    trafego: {
      niveis: { livre:"🟢 Livre", moderado:"🟡 Moderado", pesado:"🟠 Pesado", congestionado:"🔴 Congestionado", critico:"🚨 Crítico" },
      niveisSimples: { livre:"Livre", moderado:"Moderado", pesado:"Pesado", congestionado:"Congestionado", critico:"Crítico" }
    },
    incidente: {
      tipos: {
        acidente: "Acidente", avariado: "Carro avariado", obras: "Obras na via",
        alagamento: "Alagamento", manifestacao: "Manifestação", policia: "Blitz policial"
      },
      fila: "Fila de {km} km",
      trafegoParado: "Tráfego parado",
      aleatorios: [
        "Acidente com dois veículos","Viatura da polícia bloqueando faixa",
        "Obras de manutenção","Carro quebrado no acostamento",
        "Semáforo com defeito","Manifestação interditando via",
        "Atropelamento no cruzamento","Alagamento parcial da pista"
      ]
    },
    balao: {
      geral: [
        "Mantenha distância segura do veículo à frente. Espaço extra salva vidas!",
        "Celular ao volante é multa gravíssima e risco de vida. Foco 100% na direção!",
        "Calibre os pneus a cada 15 dias. Pneu calibrado reduz o consumo em até 10%!",
        "Tempo seco: atenção ao risco de incêndio na vegetação próxima às vias.",
        "Mais de 2h dirigindo? Faça uma pausa! Fadiga causa 30% dos acidentes graves.",
        "Economize combustível: tire o pé antes do semáforo, evite frenagens bruscas.",
        "Atenção a ciclistas e pedestres, especialmente perto de escolas e bairros residenciais.",
        "Use sempre o cinto, mesmo em percursos curtos. É lei e salva vidas!",
        "Ajuste seus espelhos antes de sair. Ponto cego é causa frequente de acidentes.",
        "Evite ultrapassagens em lombadas, curvas ou faixas duplas contínuas."
      ],
      calor: [
        "Calor acima de 28°C! Beba bastante água e mantenha-se hidratado na viagem.",
        "Temperatura elevada. Vamos cuidar da saúde! Evite exposição ao sol desnecessária.",
        "Dia quente na região. Use protetor solar e mantenha o ar-condicionado na temperatura certa."
      ],
      frio: [
        "Temperatura baixa! Vista-se adequadamente antes de sair.",
        "Frio intenso. Atenção com pistas que podem estar escorregadias."
      ],
      neblina: [
        "Neblina na região! Pouca visibilidade. Ligue o farol baixo e reduza a velocidade.",
        "Visibilidade comprometida por neblina. Mantenha distância segura do veículo à frente."
      ],
      chuva_leve: [
        "Garoa detectada. Pista pode estar molhada. Reduza a velocidade.",
        "Chuva fraca na região. Atenção ao aquaplanagem em pistas molhadas."
      ],
      chuva_forte: [
        "Chuva forte na região! Ligue o farol, reduza a velocidade e aumente a distância.",
        "Chuva intensa. Se a visibilidade comprometer, procure local seguro para parar."
      ],
      tempestade: [
        "Alerta de tempestade com raios! Evite áreas abertas e redobre a atenção.",
        "Tempestade elétrica na região! Não se abrigue embaixo de árvores."
      ],
      vento: [
        "Vento forte! Segure o volante com firmeza, especialmente em viadutos e pontes."
      ],
      previsao_chuva: [
        "Previsão de chuva no seu trajeto nas próximas horas. Saia preparado!",
        "Alta probabilidade de chuva no percurso. Leve guarda-chuva."
      ]
    }
  },

  // ────────────────────────────────────────────── Español ──
  es: {
    app: {
      nome: "Siga Libre",
      nomeMaiusculo: "SIGA LIBRE"
    },
    splash: {
      sub: "Tu asistente de tráfico con IA",
      tap: "toca para continuar"
    },
    onboarding: {
      slide1: { titulo:"Tu compañero en el tráfico", texto:"Siga Libre monitorea el tráfico 24h y te avisa antes de salir — nunca más te sorprenderá un atasco." },
      slide2: { titulo:"IA que habla contigo", texto:"Un agente de inteligencia artificial extrovertido que sugiere rutas, horarios alternativos e incluso dónde parar mientras el tráfico mejora." },
      slide3: { titulo:"Voz con tu personalidad", texto:"Elige la voz, el acento de tu región, el estado de ánimo y hasta un perfil profesional. Tu agente, a tu manera." },
      btnProximo: "Siguiente →",
      btnUltimo: "¡Vamos! 🚀"
    },
    setup: {
      titulo: "⚙️ Configuración inicial",
      perfil: {
        titulo: "¿Cómo puedo llamarte?",
        nome: "Tu nombre",
        nomePh: "Ej: Wesley",
        whatsapp: "WhatsApp (opcional — para alertas)",
        whatsappPh: "+34 600 00 00 00"
      },
      rotas: {
        titulo: "🗺️ Tus rutas",
        sub: "Configura tu ciudad y tus trayectos habituales",
        ondeMora: "📍 Dónde vives",
        pais: "País",
        estado: "Región",
        cidade: "Ciudad",
        cidadePh: "Ej: Madrid",
        bairro: "Barrio / Zona",
        bairroPh: "Ej: Centro",
        rotaHabitual: "🏠→🏢 Ruta Habitual (día a día)",
        deOnde: "Desde dónde sales",
        deOndePh: "Barrio o dirección de salida",
        paraOnde: "A dónde vas",
        paraOndePh: "Barrio o dirección de destino",
        saidaCasa: "🌅 Salida de casa",
        saidaTrabalho: "⏰ Salida del trabajo",
        rotaAlt: "🔀 Ruta Alternativa (fin de semana / ocio)",
        rotaAltSub: "Opcional — para cuando vayas a otro lugar",
        altDeOnde: "Desde dónde sales",
        altParaOnde: "A dónde vas",
        opcionalPh: "Opcional",
        alertas: "⛽ Alertas y Promociones durante el trayecto",
        combustivel: "Precios de combustible",
        combustivelSub: "Gasolineras en un radio de 2km durante la ruta",
        parceiros: "Promociones de socios",
        parceirosSub: "Ofertas de comercios en tu camino",
        veiculo: {
          titulo: "🚗 Tipo de vehículo",
          carro:    { nome:"Coche",   desc:"Ruta estándar" },
          caminhao: { nome:"Camión",  desc:"Evita puentes bajos y vías restringidas" },
          altura: "Altura (m)", alturaPh: "Ej: 4.0",
          largura: "Anchura (m)", larguraPh: "Ej: 2.5",
          comprimento: "Longitud (m)", comprimentoPh: "Ej: 16.5",
          peso: "Peso total (t)", pesoPh: "Ej: 40"
        }
      },
      voz: {
        genero:   { titulo:"Voz de tu agente",       sub:"¿Masculina o femenina?",                  previa:"🔊 Escuchar muestra" },
        sotaque:  { titulo:"Acento regional",         sub:"¿Qué acento regional prefieres?" },
        humor:    { titulo:"Estado de ánimo",         sub:"¿Cómo quieres que hable el agente?" },
        profissao:{ titulo:"Perfil profesional",      sub:"El agente adapta el vocabulario a tu área", previa:"🔊 Escuchar muestra con este perfil" }
      },
      footer: { voltar:"← Atrás", proximo:"Siguiente →" }
    },
    voz: {
      voltar:"← Atrás", proximo:"Siguiente →", concluir:"Finalizar ✓",
      comandos: {
        naoSuportado: "Tu navegador no soporta reconocimiento de voz",
        ativado: "Modo conducción activado. Puedes decir tus comandos.",
        desativado: "Modo conducción desactivado.",
        temperaturaInfo: " Temperatura actual: {temp} grados, sensación de {sens} grados.",
        buscandoAlternativa: "Buscando ruta alternativa.",
        abrindoMaps: "Abriendo Google Maps.",
        telaPrincipal: "Pantalla principal abierta.",
        mapaAberto: "Mapa abierto.",
        assistenteAberto: "Asistente abierto. Puedes hablar.",
        configAbertas: "Configuración abierta.",
        statusRota: "Tu ruta está {label}. Tiempo estimado: {tempo} minutos por {rota}.",
        calculandoStatus: "Calculando estado de la ruta.",
        erroVoz: "Voz: {erro}",
        regex: {
          alternativa: "alternativa|desviar|rodear|otra ruta|cambiar ruta",
          maps: "google|maps|navegar|abrir mapa|redirigir",
          dashboard: "panel|inicio|principal|pantalla principal",
          mapa: "\\bmapa\\b|ver mapa",
          chat: "chat|asistente|conversar|preguntar|hablar con",
          config: "config|configuración|configuraciones|ajustes",
          status: "estado|situación|cómo está|tráfico|tiempo|demora",
          desligar: "apagar|detener modo|salir del modo|cancelar modo|terminar"
        }
      }
    },
    nav: { inicio:"Inicio", mapa:"Mapa", chat:"Chat", config:"Config" },
    cards: {
      genero: {
        feminino:  { nome:"Femenino", desc:"Voz suave y carismática" },
        masculino: { nome:"Masculino", desc:"Voz grave y directa" }
      },
      humor: {
        extrovertido: { nome:"Extrovertido 🎉", desc:"Máxima energía y animación" },
        alegre:       { nome:"Alegre 😄",       desc:"Positivo y ligero" },
        girias:       { nome:"Con Jerga 🤙",    desc:"Habla como la gente local" },
        normal:       { nome:"Normal 😌",        desc:"Directo y equilibrado" },
        formal:       { nome:"Formal 👔",        desc:"Tono profesional" },
        direto:       { nome:"Directo 😤",       desc:"Corto y directo" },
        zen:          { nome:"Zen 🧘",           desc:"Tranquilo y filosófico" },
        humor:        { nome:"Humorístico 😂",   desc:"Chistes y memes sobre el tráfico" }
      },
      profissao: {
        nenhum:     { nome:"Sin perfil 🎯",           desc:"Lenguaje universal" },
        medico:     { nome:"Médico / Salud 👨‍⚕️",      desc:"Diagnóstico de ruta" },
        advogado:   { nome:"Abogado / Jurídico ⚖️",   desc:"Argumentación formal" },
        professor:  { nome:"Profesor 🎓",             desc:"Tono educativo y motivador" },
        militar:    { nome:"Militar 🪖",              desc:"Misión y estrategia" },
        chef:       { nome:"Chef de Cocina 👨‍🍳",      desc:"Metáforas culinarias" },
        personal:   { nome:"Entrenador Personal 🏋️", desc:"Motivación y metas" },
        locutor:    { nome:"Locutor de Radio 🎙️",    desc:"Noticia en vivo" },
        ceo:        { nome:"Ejecutivo / CEO 👨‍💼",     desc:"ROI y métricas" },
        uber:       { nome:"Conductor de App 🚗",     desc:"Enfoque en viajes" },
        engenheiro: { nome:"Ingeniero 🏗️",            desc:"Datos técnicos precisos" },
        comerciante:{ nome:"Comerciante 🛍️",          desc:"Enfoque en negocios" }
      }
    },
    cfg: {
      idioma: {
        titulo:"🌐 Idioma", sub:"Elige el idioma de la app, o déjalo automático según tu ubicación.",
        auto:"Automático", autoDesc:"Detecta por ubicación",
        pt:"Português BR", ptpt:"Português PT", es:"Español", en:"English"
      },
      perfil: { titulo:"Perfil", nome:"Tu nombre", pais:"🌍 País", estado:"Estado / Región", cidade:"Ciudad", cidadePh:"Ej: Madrid" },
      elvoz: {
        titulo: "🎙️ Voz del Agente",
        naoConfigurado: "No configurado",
        ativo: "✅ Activo",
        descPasso1: "Pega tu clave de API de voz abajo. La encuentras en la configuración de tu cuenta del servicio de voz.",
        descPasso1Strong: "Cuenta → Configuración → API Keys",
        chaveLabel: "Clave de API (sk_...)",
        chavePh: "sk_xxxxxxxxxxxxxxxxxxxxxxxx",
        conectar: "Conectar →",
        verificando: "⏳ Verificando clave...",
        contaConectada: "✅ ¡Cuenta conectada! ",
        escolherVozes: "Elige las voces",
        carregarVozes: "🔄 Cargar voces disponibles",
        buscandoVozes: "⏳ Buscando voces disponibles...",
        vozFeminina: "👩 Voz femenina",
        vozMasculina: "👨 Voz masculina",
        bellaPadrao: "Bella (por defecto)",
        arnoldPadrao: "Arnold (por defecto)",
        ouvir: "▶ Escuchar",
        gerarTitulo: "🧬 Generar voz con acento regional (avanzado)",
        gerarDesc: "La IA crea una voz nueva con el acento de la región que elijas. Usa ~500 caracteres de tu plan de voz.",
        optVozFeminina: "Voz femenina",
        optVozMasculina: "Voz masculina",
        gerarBtn: "🎙️ Generar voz con acento real",
        gerando: "⏳ Generando... puede tardar 15-30 segundos",
        salvarVoz: "✅ Guardar configuración de voz",
        testarVoz: "🔊 Probar voz ahora",
        trocarVoz: "✏️ Cambiar voz / reconfigurar",
        vozConfigurada: "configurada",
        descAtivo: "¡Voz del agente activa! Voz fem.: {voz}. Los acentos regionales suenan aún más naturales.",
        coleChavePrimeiro: "⚠️ Pega la clave primero",
        contaInfo: "({nome} — {chars}k caracteres/mes)",
        usuarioPadrao: "usuario",
        chaveValida: "✅ ¡Clave válida! Ahora elige las voces.",
        chaveInvalida: "❌ Clave inválida. Verifica e intenta de nuevo.",
        vozesEncontradas: "{n} voces encontradas",
        erroBuscarVozes: "Error al buscar voces — usando valores predeterminados",
        configureVozPrimeiro: "Configura la voz del agente primero",
        textoPreview: "¡Hola! Soy el agente de Siga Libre. ¡Estoy listo para ayudarte con el tráfico!",
        reproduzindoPreview: "🔊 Reproduciendo vista previa...",
        vozOk: "✅ ¡Voz ok!",
        vozConfiguradaSucesso: "✅ ¡Voz configurada con éxito! Probando...",
        configureChavePrimeiro: "Configura la clave primero",
        vozGeradaSalva: "✅ ¡Voz \"{sotaque} {genero}\" generada y guardada! ID: {id}...",
        vozCriadaSotaque: "🎙️ ¡Voz {sotaque} creada con acento real!",
        erroPrefixo: "Error: "
      },
      rotaHabitual: {
        titulo: "🏠 Ruta Habitual",
        tipoLabel: "📌 Tipo de ruta habitual",
        pontoPartida: "🏠 Punto de partida (barrio / zona)",
        destinoPrincipal: "📍 Destino principal",
        opts: {
          trabalho_casa: "🏢 Trabajo / Casa",
          faculdade: "🎓 Universidad / Facultad",
          colegio: "📚 Colegio / Escuela",
          hospital: "🏥 Hospital / Urgencias / Clínica",
          shopping: "🛍️ Centro Comercial",
          supermercado: "🛒 Supermercado / Mercado",
          comercio: "💼 Comercio / Negocio",
          igreja: "⛪ Iglesia / Templo / Culto",
          parentes: "👨‍👩‍👧 Familia / Amigos",
          reparticao: "🏛️ Oficina Pública / Banco",
          outros_hab: "📍 Otros"
        }
      },
      rotaAlternativa: {
        titulo: "🔀 Ruta Alternativa",
        sub: "A dónde vas además del trayecto habitual.",
        tipoLabel: "📌 Tipo de ruta alternativa",
        deOnde: "🏠 Desde dónde sales (opcional)",
        deOndePh: "Ej: Centro, trabajo, casa...",
        paraOnde: "📍 A dónde vas (opcional)",
        paraOndePh: "Ej: Gimnasio, Clínica Salud...",
        opts: {
          academia: "💪 Gimnasio / Musculación",
          pilates: "🧘 Pilates / Yoga / Meditación",
          consulta: "🩺 Consulta Médica / Dentista",
          treino: "⚽ Entrenamiento Deportivo / Club",
          restaurante: "🍽️ Restaurante / Cafetería",
          bar: "🎉 Salidas Sociales / Fiestas",
          lazer: "🌳 Playa / Parque / Ocio",
          salao: "✂️ Salón de Belleza / Peluquería",
          servicos: "🏦 Banco / Notaría / Trámites",
          evento: "🎭 Evento / Espectáculo / Teatro",
          compras: "🛍️ Compras / Outlet / Mercadillo",
          viagem: "✈️ Aeropuerto / Estación de Autobuses",
          outros_alt: "📍 Otros"
        }
      },
      personalidade: {
        titulo: "Personalidad del agente",
        genero: "Género:",
        sotaque: "Acento:",
        humor: "Humor:",
        perfil: "Perfil:",
        alterar: "✏️ Cambiar personalidad del agente"
      },
      aparencia: {
        titulo: "🎨 Apariencia",
        desc: "Elige el tema visual de la app.",
        dia: "Día", diaDesc: "Fondo claro",
        noite: "Noche", noiteDesc: "Fondo oscuro",
        auto: "Automático", autoDesc: "Según la hora"
      },
      audio: {
        titulo: "🔊 Control de Audio",
        desc: "Elige qué quieres escuchar durante la conducción.",
        tudo: "Escuchar todo", tudoDesc: "Ruta + alertas climáticas",
        soRota: "Solo ruta", soRotaDesc: "Silencia los globos de clima",
        soAlertas: "Solo alertas", soAlertasDesc: "Silencia las indicaciones de ruta",
        silencio: "Silencio", silencioDesc: "Solo visual, sin audio"
      },
      clima: {
        titulo: "🌡️ Globos de Clima",
        toggleLabel: "Globos de información climática",
        toggleSub: "Las alertas salen del tubo de escape del coche",
        intervaloLabel: "Intervalo de visualización",
        int3: "Cada 3 minutos",
        int5: "Cada 5 minutos",
        int10: "Cada 10 minutos",
        int20: "Cada 20 minutos",
        int30: "Cada 30 minutos"
      },
      botoes: {
        salvar: "💾 Guardar cambios",
        resetar: "🗑️ Empezar de cero",
        confirmResetar: "¿Borrar todos los datos y empezar de cero?"
      }
    },
    agent: {
      nomePadrao: "conductor",
      base: [
        "¡Buenas noticias, {nome}! Tu ruta por {rota} está totalmente libre ahora. Llegarás a casa en unos {tempoTotal} minutos sin problemas. ¡Puedes salir cuando quieras!",
        "{nome}, el tráfico en {rota} está moderado. Deberías tardar unos {tempoTotal} minutos — nada grave. Si sales ahora llegas tranquilo.",
        "¡Atención, {nome}! El tráfico en {rota} está pesado. {incidenteFrase}Si sales ahora tardarás unos {tempoTotal} minutos — {tempoExtra} más de lo normal. Vale la pena esperar unos 20 minutitos.",
        "¡Cuidado, {nome}! {rota} está congestionada ahora. {incidenteFrase}Si sales ahora tardarás {tempoTotal} minutos — ¡{tempoExtra} más! Te recomiendo encarecidamente esperar {tempoEspera1} minutos más o usar una ruta alternativa.",
        "¡ALERTA, {nome}! El tráfico en {rota} está CRÍTICO. {incidenteFrase}Vas a pasar {tempoTotal} minutos en el tráfico — ¡{tempoExtra} más de lo normal! Te recomiendo esperar al menos {tempoEspera2} minutos o tomar una vía alternativa urgentemente."
      ],
      incidenteFrase: {
        2: "Hay {incidenteLower} en la vía. ",
        3: "Causado por: {incidente}. ",
        4: "{incidente} está bloqueando todo. "
      },
      profissao: {
        intro: {
          medico:     "Diagnóstico de ruta: ",
          advogado:   "Según los datos de tráfico vigentes: ",
          professor:  "Clase de hoy — tráfico: ",
          militar:    "Informe de misión: ",
          chef:       "Receta del día: ",
          personal:   "INFORME DE RENDIMIENTO: ",
          locutor:    "📻 ¡Aquí Siga Libre en directo! ",
          ceo:        "Análisis estratégico: ",
          uber:       "Estado de la operación: ",
          engenheiro: "Datos recopilados a las {hora}: ",
          comerciante:"Oportunidad de negocio: ",
          nenhum:     ""
        },
        sufixoAlto: {
          medico:     " Prescripción: descansa {tempo} minutos antes de continuar.",
          advogado:   " Solicito que aguarde {tempo} minutos antes de proceder.",
          professor:  " Tarea: espera {tempo} minutos. ¡Diez en paciencia!",
          militar:    " Espere órdenes. Reanudación en {tempo} minutos.",
          chef:       " El plato aún no está listo — necesita {tempo} minutos más en el horno.",
          personal:   " ¡AGUANTA! ¡{tempo} minutos más y lo vas a LOGRAR!",
          locutor:    " ¡Mantente atento, te avisamos en cuanto se despeje!",
          ceo:        " ROI comprometido. Esperar {tempo} min reduce el impacto en un {pct}%.",
          uber:       " Evita aceptar viajes en esta zona durante los próximos {tempo} min.",
          engenheiro: " Estimación de mejora: {tempo} min. Precisión del modelo: 87%.",
          comerciante:" Oportunidad: {tempo} min para contactar clientes por WhatsApp.",
          nenhum:     ""
        },
        sufixoBaixo: {
          medico:     " Pronóstico favorable.",
          advogado:   " No hay impedimento legal para continuar.",
          professor:  " ¡Felicidades por tu aprovechamiento!",
          militar:    " Ruta despejada. Continúe con seguridad, soldado.",
          chef:       " ¡Plato servido en el momento justo!",
          personal:   " ¡VAMOS QUE TÚ PUEDES! 💪",
          locutor:    " ¡Tráfico bien! ¡Más noticias pronto!",
          ceo:        " KPIs de desplazamiento dentro de lo esperado.",
          uber:       " Buena demanda en la zona. ¡Aprovecha!",
          engenheiro: " Sistema operando dentro de los parámetros.",
          comerciante:" ¡Buen momento para visitar clientes!",
          nenhum:     ""
        }
      },
      humor: {
        extrovertidoAberturasAlto:  ["⚠️ ¡ALERTA MÁXIMA! ","🚨 ¡ATENCIÓN TOTAL! ","¡UY UY UY! "],
        extrovertidoAberturasBaixo: ["🎉 ","🔥 ¡BUENAS NOTICIAS! ","🚀 "],
        extrovertidoSufixoAlto:  " 😱",
        extrovertidoSufixoBaixo: " 🎉💨",
        alegrePrefixoAlto:  "¡Tranquilo, esto pasará! 😊 ",
        alegrePrefixoBaixo: "¡Qué día tan bonito! 😊 ",
        diretoNivel0:    "Ruta libre. Puedes salir.",
        diretoNivel1:    "Tráfico moderado. Sigue con normalidad.",
        diretoNivelAlto: "Tráfico crítico. Espera {tempo} min o desvíate.",
        diretoDefault:   "Tráfico pesado. Considera esperar.",
        zenFrases: [
          "El tráfico es como la marea — viene y va. ",
          "Todo pasa, incluso el atasco. ",
          "La prisa es enemiga de la paz y también del tráfico. "
        ],
        humorFrasesAlto: [
          "Buena noticia: ¡tienes tiempo libre ahora! Mala noticia: es dentro del coche. 😂 ",
          "La vía se convirtió hoy en aparcamiento VIP. Entrada: gratis. Salida: un misterio. 😅 "
        ],
        humorFrasesBaixo: [
          "Tráfico tranquilo hoy — ¡hasta parece que los conductores durmieron bien! 😄 "
        ]
      },
      chat: {
        keywords: {
          trafego:     ["tráfico","tránsito","ruta"],
          alternativa: ["alternativ","desvío","otro camino"],
          acidente:    ["accident","incidente"],
          tempo:       ["cuánto tiempo","cuanto tiempo","demora","tarda"],
          obrigado:    ["graci"],
          saudacao:    ["hola","buenos días","buenas tardes"]
        },
        alternativaResp: "Para evitar el atasco actual, lo mejor es tomar una ruta alternativa o esperar unos {tempo} minutos para que el tráfico mejore por su cuenta.",
        acidenteAlto:  "¡Sí, {nome}! Registré un incidente en la vía principal. Los servicios de emergencia están en el lugar. Te recomiendo una ruta alternativa o esperar unos 20 minutos para que se resuelva.",
        acidenteBaixo: "No hay accidentes registrados en tu ruta ahora, {nome}. El tráfico fluye con normalidad.",
        obrigadoResp: [
          "¡De nada, {nome}! Estoy aquí las 24 horas para ayudarte. ¡Buen viaje! 🚗",
          "¡Me alegra ayudarte, {nome}! ¡Lo que necesites, aquí estoy! 😊",
          "¡A tu disposición, {nome}! ¡Llega bien a casa! 🏠"
        ],
        genericoResp: "¡Entendido, {nome}! {msg}"
      }
    },
    topbar: { dianoite:"Día/Noche" },
    dash: {
      ola: "¡Hola! 👋",
      monitorando: "Monitoreando el tráfico en tiempo real",
      bomDia: "Buenos días",
      boaTarde: "Buenas tardes",
      boaNoite: "Buenas noches",
      trafegoAoVivo: "tráfico en vivo",
      rotaHabitual: "🏠 Habitual",
      rotaAlternativa: "🔀 Alternativa",
      rotaIrPara: "📍 Ir a...",
      suaRotaAgora: "📍 Tu ruta ahora",
      sensacao: "Sensación {temp}°C",
      calculando: "Calculando...",
      tempoEstimado: "Tiempo estimado",
      viaPrincipal: "Vía principal",
      agenteNome: "Agente Siga Libre",
      agenteOnline: "● En línea",
      analisando: "Analizando el tráfico para ti...",
      ouvirAgente: "Escuchar al agente",
      previsaoTitulo: "📅 Previsión — próximos 60 min",
      faleComAgente: "Habla con el agente",
      faleComAgenteSub: "Resuelve dudas, pide alternativas, conversa",
      abrirChat: "Abrir chat →"
    },
    chat: {
      inputPh: "Pregunta sobre el tráfico...",
      boasVindas: "¡Hola{nome}! 👋 Estoy en línea y monitoreando el tráfico en tiempo real. ¡Pregúntame lo que quieras!"
    },
    modal: {
      incidente: {
        titulo: "Incidente en la ruta",
        tituloDinamico: "{icone} {tipo} en la vía",
        tipo: "Tipo",
        local: "Lugar",
        km: "KM aprox.",
        referencia: "Referencia",
        situacao: "Situación",
        verMapa: "Ver en el mapa",
        perguntaAlternativa: "¿Hay una ruta alternativa para evitar este incidente?",
        pedirAlternativa: "🔀 Pedir ruta alternativa",
        redirecionando: "🗺️ Redirigiendo a Google Maps",
        fechar: "Cerrar"
      },
      irPara: {
        titulo: "📍 ¿A dónde quieres ir?",
        ouEscolha: "― o elige otra ruta ―",
        origem: "Origen",
        opcional: "(opcional)",
        origemPh: "¿Desde dónde vas a salir?",
        usarLocalizacao: "Usar mi ubicación",
        destino: "Destino",
        destinoPh: "Barrio, calle o punto de referencia",
        usarLocalizacaoDestino: "Usar mi ubicación como destino",
        gpsStatus: "Obteniendo ubicación...",
        iniciarNavegacao: "🗺️ Iniciar navegación",
        cancelar: "Cancelar"
      },
      regiao: {
        titulo: "🗺️ Mi Región",
        subtitulo: "Elige tu estado/región y ciudad para personalizar rutas, clima e información local.",
        pais: "País",
        brasil: "🇧🇷 Brasil",
        espanha: "🇪🇸 España",
        estado: "Estado / Región",
        cidade: "Ciudad",
        cidadePh: "Nombre de tu ciudad",
        bairro: "Barrio / Zona",
        opcional: "(opcional)",
        bairroPh: "Ej: Centro, Salamanca, Vila Madalena…",
        cep: "Código postal",
        cepObs: "(opcional — para mayor precisión)",
        cepPh: "00000-000",
        cancelar: "Cancelar",
        confirmar: "✅ Confirmar"
      }
    },
    trafego: {
      niveis: { livre:"🟢 Libre", moderado:"🟡 Moderado", pesado:"🟠 Denso", congestionado:"🔴 Congestionado", critico:"🚨 Crítico" },
      niveisSimples: { livre:"Libre", moderado:"Moderado", pesado:"Denso", congestionado:"Congestionado", critico:"Crítico" }
    },
    incidente: {
      tipos: {
        acidente: "Accidente", avariado: "Vehículo averiado", obras: "Obras en la vía",
        alagamento: "Inundación", manifestacao: "Manifestación", policia: "Control policial"
      },
      fila: "Fila de {km} km",
      trafegoParado: "Tráfico detenido",
      aleatorios: [
        "Accidente con dos vehículos","Patrulla policial bloqueando un carril",
        "Obras de mantenimiento","Coche averiado en el arcén",
        "Semáforo averiado","Manifestación bloqueando la vía",
        "Atropello en el cruce","Inundación parcial de la calzada"
      ]
    },
    balao: {
      geral: [
        "Mantén una distancia segura del vehículo de adelante. ¡El espacio extra salva vidas!",
        "Usar el móvil al volante es una infracción grave y un riesgo de vida. ¡Concéntrate 100% en la conducción!",
        "Revisa la presión de los neumáticos cada 15 días. ¡Unos neumáticos bien calibrados reducen el consumo hasta un 10%!",
        "Tiempo seco: atención al riesgo de incendio en la vegetación cercana a las vías.",
        "¿Más de 2h conduciendo? ¡Haz una pausa! La fatiga causa el 30% de los accidentes graves.",
        "Ahorra combustible: suelta el acelerador antes del semáforo, evita frenazos bruscos.",
        "Atención a ciclistas y peatones, especialmente cerca de colegios y zonas residenciales.",
        "Usa siempre el cinturón, incluso en trayectos cortos. ¡Es ley y salva vidas!",
        "Ajusta los espejos antes de salir. El punto ciego es una causa frecuente de accidentes.",
        "Evita adelantar en badenes, curvas o carriles continuos dobles."
      ],
      calor: [
        "¡Calor superior a 28°C! Bebe mucha agua y mantente hidratado durante el viaje.",
        "Temperatura elevada. ¡Cuidemos la salud! Evita la exposición innecesaria al sol.",
        "Día caluroso en la zona. Usa protector solar y mantén el aire acondicionado a la temperatura adecuada."
      ],
      frio: [
        "¡Temperatura baja! Vístete adecuadamente antes de salir.",
        "Frío intenso. Atención: las vías pueden estar resbaladizas."
      ],
      neblina: [
        "¡Niebla en la zona! Poca visibilidad. Enciende las luces bajas y reduce la velocidad.",
        "Visibilidad reducida por niebla. Mantén una distancia segura del vehículo de adelante."
      ],
      chuva_leve: [
        "Llovizna detectada. La vía puede estar mojada. Reduce la velocidad.",
        "Lluvia ligera en la zona. Cuidado con el aquaplaning en pistas mojadas."
      ],
      chuva_forte: [
        "¡Lluvia intensa en la zona! Enciende las luces, reduce la velocidad y aumenta la distancia.",
        "Lluvia intensa. Si la visibilidad se reduce, busca un lugar seguro para detenerte."
      ],
      tempestade: [
        "¡Alerta de tormenta eléctrica! Evita zonas abiertas y redobla la atención.",
        "¡Tormenta eléctrica en la zona! No te refugies bajo los árboles."
      ],
      vento: [
        "¡Viento fuerte! Sujeta el volante con firmeza, especialmente en viaductos y puentes."
      ],
      previsao_chuva: [
        "Previsión de lluvia en tu trayecto en las próximas horas. ¡Sal preparado!",
        "Alta probabilidad de lluvia en el recorrido. Lleva paraguas."
      ]
    }
  },

  // ─────────────────────────────────────────────── English ──
  en: {
    app: {
      nome: "Freeway",
      nomeMaiusculo: "FREEWAY"
    },
    splash: {
      sub: "Your AI traffic assistant",
      tap: "tap to continue"
    },
    onboarding: {
      slide1: { titulo:"Your traffic companion", texto:"Freeway monitors traffic 24/7 and warns you before you leave — never get caught in a surprise jam again." },
      slide2: { titulo:"AI that talks to you", texto:"An outgoing AI agent that suggests routes, alternative times, and even where to stop while traffic improves." },
      slide3: { titulo:"Voice with your personality", texto:"Choose the voice, your regional accent, the mood, and even a professional profile. Your agent, your way." },
      btnProximo: "Next →",
      btnUltimo: "Let's go! 🚀"
    },
    setup: {
      titulo: "⚙️ Initial setup",
      perfil: {
        titulo: "What should I call you?",
        nome: "Your name",
        nomePh: "E.g.: Wesley",
        whatsapp: "WhatsApp (optional — for alerts)",
        whatsappPh: "+1 555 0100"
      },
      rotas: {
        titulo: "🗺️ Your routes",
        sub: "Set up your city and your regular routes",
        ondeMora: "📍 Where you live",
        pais: "Country",
        estado: "State",
        cidade: "City",
        cidadePh: "E.g.: Madrid",
        bairro: "Neighborhood / Area",
        bairroPh: "E.g.: Downtown",
        rotaHabitual: "🏠→🏢 Daily Route (everyday)",
        deOnde: "Where you're coming from",
        deOndePh: "Starting neighborhood or address",
        paraOnde: "Where you're going",
        paraOndePh: "Destination neighborhood or address",
        saidaCasa: "🌅 Leave home",
        saidaTrabalho: "⏰ Leave work",
        rotaAlt: "🔀 Alternative Route (weekend / leisure)",
        rotaAltSub: "Optional — for when you go elsewhere",
        altDeOnde: "From",
        altParaOnde: "To",
        opcionalPh: "Optional",
        alertas: "⛽ Alerts & Promotions along the way",
        combustivel: "Fuel prices",
        combustivelSub: "Gas stations within 2km along the route",
        parceiros: "Partner promotions",
        parceirosSub: "Deals from businesses on your way",
        veiculo: {
          titulo: "🚗 Vehicle type",
          carro:    { nome:"Car",   desc:"Standard route" },
          caminhao: { nome:"Truck", desc:"Avoids low bridges and restricted roads" },
          altura: "Height (m)", alturaPh: "E.g.: 4.0",
          largura: "Width (m)", larguraPh: "E.g.: 2.5",
          comprimento: "Length (m)", comprimentoPh: "E.g.: 16.5",
          peso: "Total weight (t)", pesoPh: "E.g.: 40"
        }
      },
      voz: {
        genero:   { titulo:"Your agent's voice",  sub:"Male or female?",                       previa:"🔊 Listen to preview" },
        sotaque:  { titulo:"Regional accent",      sub:"Which regional accent do you prefer?" },
        humor:    { titulo:"Mood",                 sub:"How do you want your agent to talk?" },
        profissao:{ titulo:"Professional profile", sub:"The agent adapts its vocabulary to your field", previa:"🔊 Listen to preview with this profile" }
      },
      footer: { voltar:"← Back", proximo:"Next →" }
    },
    voz: {
      voltar:"← Back", proximo:"Next →", concluir:"Finish ✓",
      comandos: {
        naoSuportado: "Your browser does not support voice recognition",
        ativado: "Driving mode activated. You can say your commands.",
        desativado: "Driving mode deactivated.",
        temperaturaInfo: " Current temperature: {temp} degrees, feels like {sens} degrees.",
        buscandoAlternativa: "Searching for an alternative route.",
        abrindoMaps: "Opening Google Maps.",
        telaPrincipal: "Main screen opened.",
        mapaAberto: "Map opened.",
        assistenteAberto: "Assistant opened. You can talk.",
        configAbertas: "Settings opened.",
        statusRota: "Your route is {label}. Estimated time: {tempo} minutes via {rota}.",
        calculandoStatus: "Calculating route status.",
        erroVoz: "Voice: {erro}",
        regex: {
          alternativa: "alternative|detour|reroute|other route|change route",
          maps: "google|maps|navigate|open map|redirect",
          dashboard: "dashboard|home|main screen",
          mapa: "\\bmap\\b|view map",
          chat: "chat|assistant|talk|ask|speak with",
          config: "settings|configuration|configure|preferences",
          status: "status|situation|how is|traffic|time|delay",
          desligar: "turn off|stop mode|exit mode|cancel mode|end"
        }
      }
    },
    nav: { inicio:"Home", mapa:"Map", chat:"Chat", config:"Settings" },
    cards: {
      genero: {
        feminino:  { nome:"Female", desc:"Soft and charismatic voice" },
        masculino: { nome:"Male",   desc:"Deep and direct voice" }
      },
      humor: {
        extrovertido: { nome:"Outgoing 🎉", desc:"Maximum energy and excitement" },
        alegre:       { nome:"Cheerful 😄", desc:"Positive and light" },
        girias:       { nome:"Slangy 🤙",   desc:"Talks like a local" },
        normal:       { nome:"Normal 😌",    desc:"Direct and balanced" },
        formal:       { nome:"Formal 👔",    desc:"Professional tone" },
        direto:       { nome:"Direct 😤",    desc:"Short and to the point" },
        zen:          { nome:"Zen 🧘",       desc:"Calm and philosophical" },
        humor:        { nome:"Humorous 😂",  desc:"Jokes and memes about traffic" }
      },
      profissao: {
        nenhum:     { nome:"No profile 🎯",        desc:"Universal language" },
        medico:     { nome:"Doctor / Health 👨‍⚕️",  desc:"Route diagnosis" },
        advogado:   { nome:"Lawyer / Legal ⚖️",    desc:"Formal argumentation" },
        professor:  { nome:"Teacher 🎓",           desc:"Educational and encouraging tone" },
        militar:    { nome:"Military 🪖",          desc:"Mission and strategy" },
        chef:       { nome:"Chef 👨‍🍳",             desc:"Culinary metaphors" },
        personal:   { nome:"Personal Trainer 🏋️", desc:"Motivation and goals" },
        locutor:    { nome:"Radio Announcer 🎙️",  desc:"Live news style" },
        ceo:        { nome:"Executive / CEO 👨‍💼",  desc:"ROI and metrics" },
        uber:       { nome:"Rideshare Driver 🚗",  desc:"Focus on trips" },
        engenheiro: { nome:"Engineer 🏗️",          desc:"Precise technical data" },
        comerciante:{ nome:"Merchant 🛍️",          desc:"Business-focused" }
      }
    },
    cfg: {
      idioma: {
        titulo:"🌐 Language", sub:"Choose the app language, or leave it automatic based on your location.",
        auto:"Automatic", autoDesc:"Detects by location",
        pt:"Português", es:"Español", en:"English"
      },
      perfil: { titulo:"Profile", nome:"Your name", pais:"🌍 Country", estado:"State / Region", cidade:"City", cidadePh:"E.g.: Madrid" },
      elvoz: {
        titulo: "🎙️ Agent Voice",
        naoConfigurado: "Not configured",
        ativo: "✅ Active",
        descPasso1: "Paste your voice API key below. You'll find it in your account settings on the voice service.",
        descPasso1Strong: "Account → Settings → API Keys",
        chaveLabel: "API Key (sk_...)",
        chavePh: "sk_xxxxxxxxxxxxxxxxxxxxxxxx",
        conectar: "Connect →",
        verificando: "⏳ Verifying key...",
        contaConectada: "✅ Account connected! ",
        escolherVozes: "Choose voices",
        carregarVozes: "🔄 Load available voices",
        buscandoVozes: "⏳ Searching available voices...",
        vozFeminina: "👩 Female voice",
        vozMasculina: "👨 Male voice",
        bellaPadrao: "Bella (default)",
        arnoldPadrao: "Arnold (default)",
        ouvir: "▶ Listen",
        gerarTitulo: "🧬 Generate voice with regional accent (advanced)",
        gerarDesc: "The AI creates a new voice with the regional accent you chose. Uses ~500 characters of your voice plan.",
        optVozFeminina: "Female voice",
        optVozMasculina: "Male voice",
        gerarBtn: "🎙️ Generate voice with real accent",
        gerando: "⏳ Generating... can take 15-30 seconds",
        salvarVoz: "✅ Save voice settings",
        testarVoz: "🔊 Test voice now",
        trocarVoz: "✏️ Change voice / reconfigure",
        vozConfigurada: "configured",
        descAtivo: "Agent voice active! Female voice: {voz}. Regional accents sound even more natural.",
        coleChavePrimeiro: "⚠️ Paste the key first",
        contaInfo: "({nome} — {chars}k chars/month)",
        usuarioPadrao: "user",
        chaveValida: "✅ Valid key! Now choose the voices.",
        chaveInvalida: "❌ Invalid key. Check it and try again.",
        vozesEncontradas: "{n} voices found",
        erroBuscarVozes: "Error fetching voices — using defaults",
        configureVozPrimeiro: "Set up the agent voice first",
        textoPreview: "Hi! I'm the Freeway agent. I'm ready to help with traffic!",
        reproduzindoPreview: "🔊 Playing preview...",
        vozOk: "✅ Voice ok!",
        vozConfiguradaSucesso: "✅ Voice set up successfully! Testing...",
        configureChavePrimeiro: "Set up the key first",
        vozGeradaSalva: "✅ Voice \"{sotaque} {genero}\" generated and saved! ID: {id}...",
        vozCriadaSotaque: "🎙️ {sotaque} voice created with a real accent!",
        erroPrefixo: "Error: "
      },
      rotaHabitual: {
        titulo: "🏠 Usual Route",
        tipoLabel: "📌 Usual route type",
        pontoPartida: "🏠 Starting point (neighborhood / area)",
        destinoPrincipal: "📍 Main destination",
        opts: {
          trabalho_casa: "🏢 Work / Home",
          faculdade: "🎓 College / University",
          colegio: "📚 School",
          hospital: "🏥 Hospital / Urgent Care / Clinic",
          shopping: "🛍️ Shopping Mall",
          supermercado: "🛒 Supermarket / Grocery Store",
          comercio: "💼 Business / Commerce",
          igreja: "⛪ Church / Temple / Worship",
          parentes: "👨‍👩‍👧 Family / Friends",
          reparticao: "🏛️ Government Office / Bank",
          outros_hab: "📍 Other"
        }
      },
      rotaAlternativa: {
        titulo: "🔀 Alternative Route",
        sub: "Where you go besides your usual route.",
        tipoLabel: "📌 Alternative route type",
        deOnde: "🏠 Starting from (optional)",
        deOndePh: "E.g.: Downtown, work, home...",
        paraOnde: "📍 Going to (optional)",
        paraOndePh: "E.g.: Gym, Health Clinic...",
        opts: {
          academia: "💪 Gym / Weight Training",
          pilates: "🧘 Pilates / Yoga / Meditation",
          consulta: "🩺 Doctor's Appointment / Dentist",
          treino: "⚽ Sports Training / Club",
          restaurante: "🍽️ Restaurant / Diner",
          bar: "🎉 Social Outings / Parties",
          lazer: "🌳 Beach / Park / Leisure",
          salao: "✂️ Beauty Salon / Barbershop",
          servicos: "🏦 Bank / Notary / Errands",
          evento: "🎭 Event / Show / Theater",
          compras: "🛍️ Shopping / Outlet / Market",
          viagem: "✈️ Airport / Bus Station",
          outros_alt: "📍 Other"
        }
      },
      personalidade: {
        titulo: "Agent personality",
        genero: "Gender:",
        sotaque: "Accent:",
        humor: "Mood:",
        perfil: "Profile:",
        alterar: "✏️ Change agent personality"
      },
      aparencia: {
        titulo: "🎨 Appearance",
        desc: "Choose the app's visual theme.",
        dia: "Day", diaDesc: "Light background",
        noite: "Night", noiteDesc: "Dark background",
        auto: "Automatic", autoDesc: "By time of day"
      },
      audio: {
        titulo: "🔊 Audio Control",
        desc: "Choose what you want to hear while driving.",
        tudo: "Hear everything", tudoDesc: "Route + weather alerts",
        soRota: "Route only", soRotaDesc: "Mutes weather bubbles",
        soAlertas: "Alerts only", soAlertasDesc: "Mutes route guidance",
        silencio: "Silent", silencioDesc: "Visual only, no audio"
      },
      clima: {
        titulo: "🌡️ Weather Bubbles",
        toggleLabel: "Weather information bubbles",
        toggleSub: "Alerts come out of the car's exhaust",
        intervaloLabel: "Display interval",
        int3: "Every 3 minutes",
        int5: "Every 5 minutes",
        int10: "Every 10 minutes",
        int20: "Every 20 minutes",
        int30: "Every 30 minutes"
      },
      botoes: {
        salvar: "💾 Save changes",
        resetar: "🗑️ Start over",
        confirmResetar: "Delete all data and start over?"
      }
    },
    agent: {
      nomePadrao: "driver",
      base: [
        "Good news, {nome}! Your route via {rota} is completely clear right now. You'll get home in about {tempoTotal} minutes with no issues. You can leave whenever you want!",
        "{nome}, traffic on {rota} is moderate. It should take about {tempoTotal} minutes — nothing major. If you leave now you'll get there smoothly.",
        "Heads up, {nome}! Traffic on {rota} is heavy. {incidenteFrase}If you leave now it'll take about {tempoTotal} minutes — {tempoExtra} more than usual. Worth considering waiting about 20 minutes.",
        "Careful, {nome}! {rota} is congested right now. {incidenteFrase}If you leave now it'll take {tempoTotal} minutes — {tempoExtra} more! I strongly recommend waiting {tempoEspera1} more minutes or taking an alternative route.",
        "ALERT, {nome}! Traffic on {rota} is CRITICAL. {incidenteFrase}You'll spend {tempoTotal} minutes stuck in traffic — {tempoExtra} more than usual! I recommend waiting at least {tempoEspera2} minutes or urgently taking an alternative route."
      ],
      incidenteFrase: {
        2: "There's {incidenteLower} on the road. ",
        3: "Caused by: {incidente}. ",
        4: "{incidente} is blocking everything. "
      },
      profissao: {
        intro: {
          medico:     "Route diagnosis: ",
          advogado:   "Per current traffic data: ",
          professor:  "Today's lesson — traffic: ",
          militar:    "Mission report: ",
          chef:       "Today's recipe: ",
          personal:   "PERFORMANCE REPORT: ",
          locutor:    "📻 This is Freeway, live! ",
          ceo:        "Strategic analysis: ",
          uber:       "Operation status: ",
          engenheiro: "Data collected at {hora}: ",
          comerciante:"Business opportunity: ",
          nenhum:     ""
        },
        sufixoAlto: {
          medico:     " Prescription: rest for {tempo} minutes before proceeding.",
          advogado:   " I respectfully request that you wait {tempo} minutes before proceeding.",
          professor:  " Homework: wait {tempo} minutes. Top marks for patience!",
          militar:    " Await orders. Re-engagement in {tempo} minutes.",
          chef:       " The dish isn't ready yet — it needs {tempo} more minutes in the oven.",
          personal:   " HANG IN THERE! {tempo} more minutes and you'll CRUSH IT!",
          locutor:    " Stay tuned, we'll update you as soon as it clears!",
          ceo:        " ROI at risk. Waiting {tempo} min reduces the impact by {pct}%.",
          uber:       " Avoid accepting rides in this area for the next {tempo} min.",
          engenheiro: " Estimated improvement: {tempo} min. Model accuracy: 87%.",
          comerciante:" Opportunity: {tempo} min to reach out to clients via WhatsApp.",
          nenhum:     ""
        },
        sufixoBaixo: {
          medico:     " Favorable prognosis.",
          advogado:   " No legal impediment to proceeding.",
          professor:  " Congratulations on your performance!",
          militar:    " Route clear. Proceed safely, soldier.",
          chef:       " Dish served right on time!",
          personal:   " LET'S GO, YOU'VE GOT THIS! 💪",
          locutor:    " Traffic's good! More updates soon!",
          ceo:        " Commute KPIs within expected range.",
          uber:       " Good demand in this area. Make the most of it!",
          engenheiro: " System operating within parameters.",
          comerciante:" Good time to visit clients!",
          nenhum:     ""
        }
      },
      humor: {
        extrovertidoAberturasAlto:  ["⚠️ MAXIMUM ALERT! ","🚨 FULL ATTENTION! ","UH OH, UH OH! "],
        extrovertidoAberturasBaixo: ["🎉 ","🔥 GREAT NEWS! ","🚀 "],
        extrovertidoSufixoAlto:  " 😱",
        extrovertidoSufixoBaixo: " 🎉💨",
        alegrePrefixoAlto:  "Don't worry, it'll pass! 😊 ",
        alegrePrefixoBaixo: "What a beautiful day! 😊 ",
        diretoNivel0:    "Route clear. Go ahead.",
        diretoNivel1:    "Moderate traffic. Proceed normally.",
        diretoNivelAlto: "Critical traffic. Wait {tempo} min or take a detour.",
        diretoDefault:   "Heavy traffic. Consider waiting.",
        zenFrases: [
          "Traffic is like the tide — it comes and goes. ",
          "Everything passes, even gridlock. ",
          "Haste is the enemy of peace, and of traffic too. "
        ],
        humorFrasesAlto: [
          "Good news: you have free time now! Bad news: it's inside your car. 😂 ",
          "The road turned into a VIP parking lot today. Entry: free. Exit: a mystery. 😅 "
        ],
        humorFrasesBaixo: [
          "Traffic's well-behaved today — almost like everyone slept well! 😄 "
        ]
      },
      chat: {
        keywords: {
          trafego:     ["traffic","route"],
          alternativa: ["alternativ","detour","another way","other route"],
          acidente:    ["accident","incident"],
          tempo:       ["how long","how much time"],
          obrigado:    ["thank","thanks","thx"],
          saudacao:    ["hi","hello","good morning","good afternoon"]
        },
        alternativaResp: "To avoid the current congestion, your best bet is to take an alternative route or wait about {tempo} minutes for traffic to ease up naturally.",
        acidenteAlto:  "Yes, {nome}! I've logged an incident on the main road. Emergency services are on site. I recommend an alternative route or waiting about 20 minutes for it to clear.",
        acidenteBaixo: "No accidents reported on your route right now, {nome}. Traffic is flowing normally.",
        obrigadoResp: [
          "You're welcome, {nome}! I'm here 24/7 to help. Safe travels! 🚗",
          "Happy to help, {nome}! Just ask anytime! 😊",
          "Anytime, {nome}! Get home safe! 🏠"
        ],
        genericoResp: "Got it, {nome}! {msg}"
      }
    },
    topbar: { dianoite:"Day/Night" },
    dash: {
      ola: "Hi! 👋",
      monitorando: "Monitoring traffic in real time",
      bomDia: "Good morning",
      boaTarde: "Good afternoon",
      boaNoite: "Good evening",
      trafegoAoVivo: "live traffic",
      rotaHabitual: "🏠 Usual",
      rotaAlternativa: "🔀 Alternative",
      rotaIrPara: "📍 Go to...",
      suaRotaAgora: "📍 Your route now",
      sensacao: "Feels like {temp}°C",
      calculando: "Calculating...",
      tempoEstimado: "Estimated time",
      viaPrincipal: "Main route",
      agenteNome: "Freeway Agent",
      agenteOnline: "● Online",
      analisando: "Analyzing traffic for you...",
      ouvirAgente: "Listen to the agent",
      previsaoTitulo: "📅 Forecast — next 60 min",
      faleComAgente: "Talk to the agent",
      faleComAgenteSub: "Ask questions, request alternatives, chat",
      abrirChat: "Open chat →"
    },
    chat: {
      inputPh: "Ask about traffic...",
      boasVindas: "Hi{nome}! 👋 I'm online and monitoring traffic in real time. Ask me anything!"
    },
    modal: {
      incidente: {
        titulo: "Incident on route",
        tituloDinamico: "{icone} {tipo} on route",
        tipo: "Type",
        local: "Location",
        km: "Approx. KM",
        referencia: "Reference",
        situacao: "Status",
        verMapa: "View on map",
        perguntaAlternativa: "Is there an alternative route to avoid this incident?",
        pedirAlternativa: "🔀 Request alternative route",
        redirecionando: "🗺️ Redirecting to Google Maps",
        fechar: "Close"
      },
      irPara: {
        titulo: "📍 Where do you want to go?",
        ouEscolha: "― or choose another route ―",
        origem: "Origin",
        opcional: "(optional)",
        origemPh: "Where are you leaving from?",
        usarLocalizacao: "Use my location",
        destino: "Destination",
        destinoPh: "Neighborhood, street or landmark",
        usarLocalizacaoDestino: "Use my location as destination",
        gpsStatus: "Getting location...",
        iniciarNavegacao: "🗺️ Start navigation",
        cancelar: "Cancel"
      },
      regiao: {
        titulo: "🗺️ My Region",
        subtitulo: "Choose your state and city to personalize routes, weather and local information.",
        pais: "Country",
        brasil: "🇧🇷 Brazil",
        espanha: "🇪🇸 Spain",
        estado: "State / Region",
        cidade: "City",
        cidadePh: "Your city name",
        bairro: "Neighborhood / Area",
        opcional: "(optional)",
        bairroPh: "E.g.: Downtown, Centro, Vila Madalena…",
        cep: "Postal code",
        cepObs: "(optional — for better accuracy)",
        cepPh: "00000-000",
        cancelar: "Cancel",
        confirmar: "✅ Confirm"
      }
    },
    trafego: {
      niveis: { livre:"🟢 Clear", moderado:"🟡 Moderate", pesado:"🟠 Heavy", congestionado:"🔴 Congested", critico:"🚨 Critical" },
      niveisSimples: { livre:"Clear", moderado:"Moderate", pesado:"Heavy", congestionado:"Congested", critico:"Critical" }
    },
    incidente: {
      tipos: {
        acidente: "Accident", avariado: "Broken-down car", obras: "Road works",
        alagamento: "Flooding", manifestacao: "Protest", policia: "Police checkpoint"
      },
      fila: "{km} km queue",
      trafegoParado: "Traffic stopped",
      aleatorios: [
        "Accident involving two vehicles","Police car blocking a lane",
        "Maintenance work","Broken-down car on the shoulder",
        "Faulty traffic light","Protest blocking the road",
        "Pedestrian hit at the intersection","Partial flooding on the road"
      ]
    },
    balao: {
      geral: [
        "Keep a safe distance from the vehicle ahead. Extra space saves lives!",
        "Using your phone while driving is a serious offense and a life risk. Focus 100% on the road!",
        "Check your tire pressure every 15 days. Properly calibrated tires cut fuel use by up to 10%!",
        "Dry weather: watch out for vegetation fire risk near the roads.",
        "Driving for more than 2h? Take a break! Fatigue causes 30% of serious accidents.",
        "Save fuel: ease off the gas before traffic lights, avoid hard braking.",
        "Watch out for cyclists and pedestrians, especially near schools and residential areas.",
        "Always wear your seatbelt, even on short trips. It's the law and it saves lives!",
        "Adjust your mirrors before driving off. Blind spots are a frequent cause of accidents.",
        "Avoid overtaking on speed bumps, curves, or continuous double lanes."
      ],
      calor: [
        "Heat above 28°C (82°F)! Drink plenty of water and stay hydrated during your trip.",
        "High temperature. Let's take care of your health! Avoid unnecessary sun exposure.",
        "Hot day in the area. Use sunscreen and keep the AC at the right temperature."
      ],
      frio: [
        "Low temperature! Dress appropriately before heading out.",
        "Intense cold. Watch out for roads that may be slippery."
      ],
      neblina: [
        "Fog in the area! Low visibility. Turn on low-beam headlights and slow down.",
        "Visibility reduced by fog. Keep a safe distance from the vehicle ahead."
      ],
      chuva_leve: [
        "Drizzle detected. The road may be wet. Slow down.",
        "Light rain in the area. Watch out for hydroplaning on wet roads."
      ],
      chuva_forte: [
        "Heavy rain in the area! Turn on your headlights, slow down, and increase distance.",
        "Intense rain. If visibility drops, find a safe place to stop."
      ],
      tempestade: [
        "Thunderstorm alert! Avoid open areas and stay extra alert.",
        "Electrical storm in the area! Don't take shelter under trees."
      ],
      vento: [
        "Strong wind! Hold the wheel firmly, especially on overpasses and bridges."
      ],
      previsao_chuva: [
        "Rain forecast on your route in the coming hours. Be prepared when you head out!",
        "High chance of rain along the route. Bring an umbrella."
      ]
    }
  }
  ,

  // ──────────────────────────────────────────── Português de Portugal ──
  ptpt: {
    app: {
      nome: "Siga Livre",
      nomeMaiusculo: "SIGA LIVRE"
    },
    splash: {
      sub: "O seu assistente de trânsito com IA",
      tap: "toque para continuar"
    },
    onboarding: {
      slide1: { titulo:"O seu companheiro no trânsito", texto:"O Siga Livre monitoriza o trânsito 24h e avisa-o antes de sair — nunca mais fique preso num engarrafamento de surpresa." },
      slide2: { titulo:"IA que fala consigo", texto:"Um agente de inteligência artificial que sugere rotas, horários alternativos e onde parar enquanto o trânsito melhora." },
      slide3: { titulo:"Voz com a sua personalidade", texto:"Escolha a voz, o perfil e o humor do seu agente. O seu assistente, à sua maneira." },
      btnProximo: "Seguinte →",
      btnUltimo: "Vamos lá! 🚀"
    },
    setup: {
      titulo: "⚙️ Configuração inicial",
      perfil: {
        titulo: "Como posso tratá-lo?",
        nome: "O seu nome",
        nomePh: "Ex: João",
        whatsapp: "Telemóvel (opcional — para alertas)",
        whatsappPh: "9XX XXX XXX"
      },
      rotas: {
        titulo: "🗺️ As suas rotas",
        sub: "Configure a sua cidade e os seus percursos habituais",
        ondeMora: "📍 Onde reside",
        pais: "País",
        estado: "Distrito",
        cidade: "Cidade",
        cidadePh: "Ex: Lisboa",
        bairro: "Bairro / Freguesia",
        bairroPh: "Ex: Alfama",
        rotaHabitual: "🏠→🏢 Percurso Habitual (dia a dia)",
        deOnde: "De onde sai",
        deOndePh: "Bairro ou morada de partida",
        paraOnde: "Para onde vai",
        paraOndePh: "Bairro ou morada de destino",
        saidaCasa: "🌅 Saída de casa",
        saidaTrabalho: "⏰ Saída do trabalho",
        rotaAlt: "🔀 Percurso Alternativo (fim de semana / lazer)",
        rotaAltSub: "Opcional — para quando for a outro sítio",
        altDeOnde: "De onde sai",
        altParaOnde: "Para onde vai",
        opcionalPh: "Opcional",
        alertas: "⛽ Alertas e Promoções durante o percurso",
        combustivel: "Preços de combustível",
        combustivelSub: "Postos num raio de 2km durante a rota",
        veiculo: {
          titulo: "🚗 Tipo de veículo",
          carro:    { nome:"Carro",    desc:"Percurso padrão" },
          caminhao: { nome:"Camião",   desc:"Evita pontes baixas e vias restritas" },
          altura: "Altura (m)", alturaPh: "Ex: 4.0",
          largura: "Largura (m)", larguraPh: "Ex: 2.5",
          comprimento: "Comprimento (m)", comprimentoPh: "Ex: 16.5",
          peso: "Peso total (t)", pesoPh: "Ex: 40"
        }
      }
    },
    topbar: { dianoite:"Dia/Noite" },
    dash: {
      sensacao: "Sensação {temp}°C",
      semRota: "Configure o seu percurso habitual para começar"
    },
    trafego: {
      niveis: {
        livre: "Livre",
        moderado: "Moderado",
        pesado: "Pesado",
        congestionado: "Congestionado",
        critico: "Crítico"
      },
      niveisSimples: {
        livre: "Livre",
        moderado: "Mod.",
        pesado: "Pesado",
        congestionado: "Cong.",
        critico: "Crítico"
      }
    },
    balao: {
      geral: [
        "Mantenha distância segura do veículo à frente. Espaço extra salva vidas!",
        "Desligue o telemóvel. Conduza com atenção total à estrada.",
        "Verifique os pneus e o óleo regularmente — prevenir é sempre melhor.",
        "Cansaço ao volante é perigoso. Faça uma pausa se precisar!",
        "Sonolência mata. Se estiver com sono, pare num área de serviço.",
        "Verifique o nível de combustível — a próxima saída pode estar longe.",
        "Considere usar a bicicleta para percursos curtos. Poupa combustível e faz bem!",
        "Verifique os cintos de segurança de todos os passageiros.",
        "Limpe o para-brisas — boa visibilidade é essencial.",
        "Prudência na estrada salva vidas. Obrigado por conduzir com cuidado!"
      ],
      calor: [
        "Calor superior a 28°C! Beba bastante água e mantenha-se hidratado.",
        "Dia quente! Verifique o nível da água do radiador antes de sair.",
        "Sol intenso! Use óculos de sol e mantenha o habitáculo arejado."
      ],
      frio: [
        "Temperaturas baixas! Verifique se há gelo na estrada.",
        "Frio intenso! Aqueça bem o motor antes de partir."
      ],
      neblina: [
        "Nevoeiro! Reduza a velocidade e ligue os faróis de nevoeiro.",
        "Visibilidade reduzida por nevoeiro. Mantenha distância de segurança."
      ],
      chuva_leve: [
        "Chuva fraca. Reduza a velocidade e ligue os limpa-para-brisas.",
        "Piso molhado — cuidado com a travagem!"
      ],
      chuva_forte: [
        "Chuva intensa! Reduza bastante a velocidade e aumente a distância.",
        "Aguaceiro forte — risco de aquaplaning. Cuidado!"
      ],
      tempestade: [
        "Tempestade elétrica! Se possível, adie a viagem.",
        "Trovoada na área! Não se abrigue debaixo de árvores."
      ],
      vento: [
        "Vento forte! Tenha atenção em pontes e viadutos."
      ],
      previsao_chuva: [
        "Previsão de chuva no percurso. Leve o guarda-chuva!",
        "Alta probabilidade de chuva. Saia mais cedo para evitar atrasos."
      ]
    },
    cfg: {
      idioma: {
        titulo: "🌐 Idioma",
        sub: "Escolha o idioma da aplicação.",
        auto: "Automático",
        autoDesc: "Deteta pela localização",
        pt: "Português BR",
        ptpt: "Português PT",
        es: "Español",
        en: "English"
      }
    },
    incidente: {
      aleatorios: [
        "Colisão na via","Veículo avariado","Obras em curso","Inundação na estrada",
        "Manifestação a bloquear a via","Fiscalização policial","Pneu rebentado na berma",
        "Carga perdida na faixa","Visibilidade reduzida — nevoeiro","Acidente com vítimas"
      ],
      fila: "{km} km de fila"
    }
  }
};

// ---------- Tradução genérica ----------
function t(key, idioma) {
  idioma = idioma || (typeof STATE !== "undefined" ? STATE.perfil.idioma : null) || "pt";
  const get = (dict) => key.split(".").reduce((cur, p) => (cur && cur[p] !== undefined) ? cur[p] : undefined, dict);
  return get(I18N[idioma]) ?? get(I18N.pt) ?? key;
}

// ---------- Aplica o idioma atual a toda a tela de apresentação ----------
function aplicarIdioma() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
  });
  // Re-renderiza conteúdo dinâmico (slides, cards de voz, botões do wizard)
  try { if (typeof renderSlide === "function" && STATE.tela === "onboarding") renderSlide(); } catch(e) {}
  try { if (typeof popularCardsVoz === "function") popularCardsVoz(); } catch(e) {}
  try {
    if (typeof popularCardsVeiculo === "function") {
      popularCardsVeiculo("cards-veiculo");
      popularCardsVeiculo("cfg-cards-veiculo");
    }
  } catch(e) {}
  try { if (typeof irVozPasso === "function") irVozPasso(vozStep); } catch(e) {}
  const langMap = { es:"es", en:"en", ptpt:"pt-PT", pt:"pt-BR" };
  document.documentElement.lang = langMap[STATE.perfil.idioma] || "pt-BR";
  document.title = t("app.nome");
}

// ---------- Detecção automática de país/idioma por IP ----------
function _idiomaPorPaisDetectado(countryCode) {
  const cc = (countryCode || "").toUpperCase();
  if (cc === "ES") return "es";
  if (cc === "PT") return "ptpt";
  if (cc === "BR") return "pt";
  return "en";
}

function _paisPorPaisDetectado(countryCode) {
  const cc = (countryCode || "").toUpperCase();
  if (cc === "ES") return "ES";
  if (cc === "PT") return "PT";
  return "BR";
}

function _estadoPadraoPorPais(pais) {
  if (pais === "ES") return "M";
  if (pais === "PT") return "PT-11";
  return "DF";
}

async function detectarPaisPorIP() {
  try {
    const ctrl = new AbortController();
    const timeoutId = setTimeout(() => ctrl.abort(), 4000);
    const resp = await fetch("https://ipapi.co/json/", { signal: ctrl.signal });
    clearTimeout(timeoutId);
    if (!resp.ok) return null;
    const data = await resp.json();
    return data?.country_code || data?.country || null;
  } catch (e) {
    return null;
  }
}

// ---------- Inicialização do idioma ao abrir o app ----------
// primeiraVez: true quando não há perfil salvo (1ª vez ou após reset) —
// nesse caso também define país/região/cidade padrão conforme o país detectado
async function inicializarIdioma(forcarDeteccao, primeiraVez) {
  if (!STATE.perfil.idiomaManual || forcarDeteccao) {
    const cc = await detectarPaisPorIP();
    if (cc) {
      STATE.perfil.idioma = _idiomaPorPaisDetectado(cc);
      if (primeiraVez) {
        STATE.perfil.pais   = _paisPorPaisDetectado(cc);
        STATE.perfil.estado = _estadoPadraoPorPais(STATE.perfil.pais);
        STATE.perfil.cidade = _capitalPorUF(STATE.perfil.estado);
        // Fora do Brasil não há bairro padrão — usuário informa origem/destino livremente
        if (STATE.perfil.pais !== "BR") {
          STATE.perfil.bairroOrigem  = "";
          STATE.perfil.bairroDestino = "";
        }
      }
      salvarPerfil();
    }
  }
  aplicarIdioma();
  try { _sincIdiomaBtns(); } catch(e) {}
}

// ---------- Seletor manual de idioma (Configurações) ----------
function setIdioma(idioma) {
  if (idioma === "auto") {
    STATE.perfil.idiomaManual = false;
    salvarPerfil();
    inicializarIdioma(true);
    mostrarToast("🌐 Idioma automático ativado");
  } else {
    STATE.perfil.idioma = idioma;
    STATE.perfil.idiomaManual = true;
    salvarPerfil();
    aplicarIdioma();
    _sincIdiomaBtns();
    mostrarToast("🌐 " + t(`cfg.idioma.${idioma}`));
  }
  SOUNDS.click();
}

function _sincIdiomaBtns() {
  const modo = STATE.perfil.idiomaManual ? STATE.perfil.idioma : "auto";
  ["auto","pt","ptpt","es","en"].forEach(m => {
    document.getElementById(`ibtn-${m}`)?.classList.toggle("ativo", m === modo);
  });
}
