// ============================================================
//  SIGA LIVRE — data.js
// ============================================================

const DATA = {

  // ── Estados brasileiros ──────────────────────────────────
  estados: [
    { uf:"AC", nome:"Acre" },{ uf:"AL", nome:"Alagoas" },{ uf:"AP", nome:"Amapá" },
    { uf:"AM", nome:"Amazonas" },{ uf:"BA", nome:"Bahia" },{ uf:"CE", nome:"Ceará" },
    { uf:"DF", nome:"Distrito Federal" },{ uf:"ES", nome:"Espírito Santo" },
    { uf:"GO", nome:"Goiás" },{ uf:"MA", nome:"Maranhão" },{ uf:"MT", nome:"Mato Grosso" },
    { uf:"MS", nome:"Mato Grosso do Sul" },{ uf:"MG", nome:"Minas Gerais" },
    { uf:"PA", nome:"Pará" },{ uf:"PB", nome:"Paraíba" },{ uf:"PR", nome:"Paraná" },
    { uf:"PE", nome:"Pernambuco" },{ uf:"PI", nome:"Piauí" },
    { uf:"RJ", nome:"Rio de Janeiro" },{ uf:"RN", nome:"Rio Grande do Norte" },
    { uf:"RS", nome:"Rio Grande do Sul" },{ uf:"RO", nome:"Rondônia" },
    { uf:"RR", nome:"Roraima" },{ uf:"SC", nome:"Santa Catarina" },
    { uf:"SP", nome:"São Paulo" },{ uf:"SE", nome:"Sergipe" },{ uf:"TO", nome:"Tocantins" }
  ],

  // ── Países suportados ────────────────────────────────────
  paises: [
    { code:"BR", nome:"🇧🇷 Brasil" },
    { code:"ES", nome:"🇪🇸 Espanha" },
    { code:"PT", nome:"🇵🇹 Portugal" }
  ],

  // ── Províncias da Espanha (52 — código DGT) ──────────────
  regioesES: [
    { uf:"AL", nome:"Almería",     comunidad:"Andalucía" },
    { uf:"CA", nome:"Cádiz",       comunidad:"Andalucía" },
    { uf:"CO", nome:"Córdoba",     comunidad:"Andalucía" },
    { uf:"GR", nome:"Granada",     comunidad:"Andalucía" },
    { uf:"H",  nome:"Huelva",      comunidad:"Andalucía" },
    { uf:"J",  nome:"Jaén",        comunidad:"Andalucía" },
    { uf:"MA", nome:"Málaga",      comunidad:"Andalucía" },
    { uf:"SE", nome:"Sevilla",     comunidad:"Andalucía" },
    { uf:"HU", nome:"Huesca",      comunidad:"Aragón" },
    { uf:"TE", nome:"Teruel",      comunidad:"Aragón" },
    { uf:"Z",  nome:"Zaragoza",    comunidad:"Aragón" },
    { uf:"O",  nome:"Asturias",    comunidad:"Asturias" },
    { uf:"IB", nome:"Balears",     comunidad:"Illes Balears" },
    { uf:"GC", nome:"Gran Canaria",comunidad:"Canarias" },
    { uf:"TF", nome:"Tenerife",    comunidad:"Canarias" },
    { uf:"S",  nome:"Cantabria",   comunidad:"Cantabria" },
    { uf:"AB", nome:"Albacete",    comunidad:"Castilla-La Mancha" },
    { uf:"CR", nome:"Ciudad Real", comunidad:"Castilla-La Mancha" },
    { uf:"CU", nome:"Cuenca",      comunidad:"Castilla-La Mancha" },
    { uf:"GU", nome:"Guadalajara", comunidad:"Castilla-La Mancha" },
    { uf:"TO", nome:"Toledo",      comunidad:"Castilla-La Mancha" },
    { uf:"AV", nome:"Ávila",       comunidad:"Castilla y León" },
    { uf:"BU", nome:"Burgos",      comunidad:"Castilla y León" },
    { uf:"LE", nome:"León",        comunidad:"Castilla y León" },
    { uf:"P",  nome:"Palencia",    comunidad:"Castilla y León" },
    { uf:"SA", nome:"Salamanca",   comunidad:"Castilla y León" },
    { uf:"SG", nome:"Segovia",     comunidad:"Castilla y León" },
    { uf:"SO", nome:"Soria",       comunidad:"Castilla y León" },
    { uf:"VA", nome:"Valladolid",  comunidad:"Castilla y León" },
    { uf:"ZA", nome:"Zamora",      comunidad:"Castilla y León" },
    { uf:"B",  nome:"Barcelona",   comunidad:"Cataluña" },
    { uf:"GI", nome:"Girona",      comunidad:"Cataluña" },
    { uf:"L",  nome:"Lleida",      comunidad:"Cataluña" },
    { uf:"T",  nome:"Tarragona",   comunidad:"Cataluña" },
    { uf:"BA", nome:"Badajoz",     comunidad:"Extremadura" },
    { uf:"CC", nome:"Cáceres",     comunidad:"Extremadura" },
    { uf:"C",  nome:"A Coruña",    comunidad:"Galicia" },
    { uf:"LU", nome:"Lugo",        comunidad:"Galicia" },
    { uf:"OR", nome:"Ourense",     comunidad:"Galicia" },
    { uf:"PO", nome:"Pontevedra",  comunidad:"Galicia" },
    { uf:"LO", nome:"La Rioja",    comunidad:"La Rioja" },
    { uf:"M",  nome:"Madrid",      comunidad:"Comunidad de Madrid" },
    { uf:"MU", nome:"Murcia",      comunidad:"Región de Murcia" },
    { uf:"NA", nome:"Navarra",     comunidad:"Com. Foral Navarra" },
    { uf:"VI", nome:"Álava",       comunidad:"País Vasco" },
    { uf:"SS", nome:"Gipuzkoa",    comunidad:"País Vasco" },
    { uf:"BI", nome:"Bizkaia",     comunidad:"País Vasco" },
    { uf:"A",  nome:"Alicante",    comunidad:"Com. Valenciana" },
    { uf:"CS", nome:"Castellón",   comunidad:"Com. Valenciana" },
    { uf:"V",  nome:"Valencia",    comunidad:"Com. Valenciana" },
    { uf:"CE", nome:"Ceuta",       comunidad:"Ciudad Autónoma" },
    { uf:"ML", nome:"Melilla",     comunidad:"Ciudad Autónoma" }
  ],

  // ── Distritos de Portugal (20) ────────────────────────────
  regioesPT: [
    { uf:"PT-01", nome:"Aveiro" },
    { uf:"PT-02", nome:"Beja" },
    { uf:"PT-03", nome:"Braga" },
    { uf:"PT-04", nome:"Bragança" },
    { uf:"PT-05", nome:"Castelo Branco" },
    { uf:"PT-06", nome:"Coimbra" },
    { uf:"PT-07", nome:"Évora" },
    { uf:"PT-08", nome:"Faro" },
    { uf:"PT-09", nome:"Guarda" },
    { uf:"PT-10", nome:"Leiria" },
    { uf:"PT-11", nome:"Lisboa" },
    { uf:"PT-12", nome:"Portalegre" },
    { uf:"PT-13", nome:"Porto" },
    { uf:"PT-14", nome:"Santarém" },
    { uf:"PT-15", nome:"Setúbal" },
    { uf:"PT-16", nome:"Viana do Castelo" },
    { uf:"PT-17", nome:"Vila Real" },
    { uf:"PT-18", nome:"Viseu" },
    { uf:"PT-20", nome:"Açores" },
    { uf:"PT-30", nome:"Madeira" }
  ],

  // ── Cidades por província espanhola ──────────────────────
  cidadesES: {
    AL:["Almería","Roquetas de Mar","El Ejido","Vícar","Huércal-Overa","Adra","Berja","Níjar"],
    CA:["Jerez de la Frontera","Algeciras","Cádiz","San Fernando","El Puerto de Santa María","Sanlúcar de Barrameda","La Línea de la Concepción","Chiclana de la Frontera","Rota","Puerto Real","Tarifa"],
    CO:["Córdoba","Lucena","Montilla","Puente Genil","Baena","Priego de Córdoba","Cabra","Palma del Río","Pozoblanco"],
    GR:["Granada","Motril","Almuñécar","Baza","Loja","Guadix","Santa Fe","Maracena","Albolote","Armilla","Ogíjares"],
    H:["Huelva","Lepe","Almonte","Isla Cristina","Moguer","Ayamonte","Nerva","La Palma del Condado","Palos de la Frontera","Aracena"],
    J:["Jaén","Linares","Andújar","Úbeda","Baeza","Alcalá la Real","La Carolina","Mengíbar","Martos","Torredonjimeno"],
    MA:["Málaga","Marbella","Vélez-Málaga","Fuengirola","Torremolinos","Benalmádena","Estepona","Nerja","Antequera","Ronda","Mijas","Alhaurín de la Torre","Coin","Rincón de la Victoria","Torrox"],
    SE:["Sevilla","Dos Hermanas","Alcalá de Guadaíra","Utrera","Écija","Mairena del Aljarafe","Camas","San Juan de Aznalfarache","La Rinconada","Bormujos","Tomares","Gelves","Lebrija"],
    HU:["Huesca","Jaca","Barbastro","Monzón","Sabiñánigo","Fraga","Binéfar"],
    TE:["Teruel","Alcañiz","Andorra","Utrillas","Calamocha","Mora de Rubielos"],
    Z:["Zaragoza","Calatayud","Ejea de los Caballeros","Tarazona","Caspe","Utebo","Cuarte de Huerva","Zuera","Alagón","Villanueva de Gállego"],
    O:["Oviedo","Gijón","Avilés","Mieres","Langreo","Siero","Castrillón","Llanes","Cangas del Narcea","Corvera"],
    IB:["Palma","Calvià","Manacor","Llucmajor","Inca","Marratxí","Eivissa","Mahón","Felanitx","Ciutadella"],
    GC:["Las Palmas de Gran Canaria","Telde","Santa Lucía de Tirajana","San Bartolomé de Tirajana","Arucas","Ingenio","Mogán","Agüimes"],
    TF:["Santa Cruz de Tenerife","La Laguna","Arona","Adeje","La Orotava","Puerto de la Cruz","Granadilla de Abona","Los Llanos de Aridane","Icod de los Vinos"],
    S:["Santander","Torrelavega","Castro-Urdiales","Camargo","El Astillero","Laredo","Santoña","Reinosa"],
    AB:["Albacete","Hellín","Almansa","Villarrobledo","La Roda","Caudete","Casas Ibáñez"],
    CR:["Ciudad Real","Puertollano","Tomelloso","Alcázar de San Juan","Valdepeñas","Manzanares","Daimiel","Miguelturra"],
    CU:["Cuenca","Tarancón","Motilla del Palancar","Sisante"],
    GU:["Guadalajara","Azuqueca de Henares","Cabanillas del Campo","Alovera","El Casar"],
    TO:["Toledo","Talavera de la Reina","Illescas","Madridejos","Quintanar de la Orden","Consuegra","Ocaña","Seseña","Mora"],
    AV:["Ávila","Arenas de San Pedro","El Barco de Ávila","Piedrahíta","Arévalo"],
    BU:["Burgos","Miranda de Ebro","Aranda de Duero","Briviesca","Medina de Pomar"],
    LE:["León","Ponferrada","San Andrés del Rabanedo","Villablino","Astorga","La Bañeza","Bembibre"],
    P:["Palencia","Aguilar de Campoo","Guardo","Venta de Baños"],
    SA:["Salamanca","Béjar","Ciudad Rodrigo","Guijuelo","Santa Marta de Tormes"],
    SG:["Segovia","El Espinar","Cuéllar","San Ildefonso-La Granja"],
    SO:["Soria","Ágreda","El Burgo de Osma","Almazán"],
    VA:["Valladolid","Laguna de Duero","Medina del Campo","Tordesillas","Arroyo de la Encomienda"],
    ZA:["Zamora","Benavente","Toro","Puebla de Sanabria"],
    B:["Barcelona","L'Hospitalet de Llobregat","Badalona","Terrassa","Sabadell","Mataró","Santa Coloma de Gramenet","Cornellà de Llobregat","El Prat de Llobregat","Manresa","Granollers","Vilanova i la Geltrú","Castelldefels","Gavà","Rubí","Mollet del Vallès","Vic","Cerdanyola del Vallès","Barberà del Vallès","Esplugues de Llobregat"],
    GI:["Girona","Lloret de Mar","Blanes","Figueres","Salt","Olot","Palafrugell","Roses","Palamós","Platja d'Aro","Torroella de Montgrí"],
    L:["Lleida","Balaguer","Mollerussa","Cervera","Tàrrega","La Seu d'Urgell","Tremp"],
    T:["Tarragona","Reus","Tortosa","El Vendrell","Cambrils","Valls","Salou","Vila-seca","Amposta","Deltebre"],
    BA:["Badajoz","Mérida","Almendralejo","Zafra","Don Benito","Villanueva de la Serena","Montijo","Olivenza","Jerez de los Caballeros"],
    CC:["Cáceres","Plasencia","Navalmoral de la Mata","Miajadas","Moraleja"],
    C:["A Coruña","Santiago de Compostela","Ferrol","Narón","Oleiros","Culleredo","Arteixo","Cambre","Carballo","Ames","Boiro"],
    LU:["Lugo","Monforte de Lemos","Viveiro","Sarria","Vilalba","Chantada"],
    OR:["Ourense","O Carballiño","Allariz","Verín","Ribadavia","Xinzo de Limia"],
    PO:["Vigo","Pontevedra","Vilagarcía de Arousa","Marín","Redondela","O Porriño","Cangas","Moaña","A Estrada","Ponteareas"],
    LO:["Logroño","Calahorra","Arnedo","Haro","Nájera","Alfaro","Lardero"],
    M:["Madrid","Móstoles","Alcalá de Henares","Fuenlabrada","Leganés","Getafe","Alcorcón","Torrejón de Ardoz","Parla","Las Rozas","Pozuelo de Alarcón","Alcobendas","San Sebastián de los Reyes","Rivas-Vaciamadrid","Collado Villalba","Aranjuez","Valdemoro","Coslada","Pinto","Arganda del Rey","Boadilla del Monte","Majadahonda","Villaviciosa de Odón","Navalcarnero","Tres Cantos","Colmenar Viejo"],
    MU:["Murcia","Cartagena","Lorca","Molina de Segura","Alcantarilla","Yecla","Jumilla","Totana","San Pedro del Pinatar","Mazarrón","Torre-Pacheco","San Javier","Los Alcázares"],
    NA:["Pamplona","Tudela","Barañáin","Burlada","Huarte","Estella-Lizarra","Tafalla","Sarriguren"],
    VI:["Vitoria-Gasteiz","Llodio","Amurrio","Salvatierra-Agurain","Laudio"],
    SS:["Donostia-San Sebastián","Irún","Errenteria","Eibar","Arrasate-Mondragón","Zarautz","Hondarribia","Pasaia","Lasarte-Oria","Bergara"],
    BI:["Bilbao","Barakaldo","Getxo","Basauri","Leioa","Santurtzi","Sestao","Durango","Erandio","Galdakao","Sopelana","Mungia","Bermeo"],
    A:["Alicante","Elche","Torrevieja","Orihuela","Benidorm","Villena","San Vicente del Raspeig","Petrer","Alcoy","Novelda","Elda","Crevillent","Santa Pola","Guardamar del Segura","Dénia","Calp","Xàbia"],
    CS:["Castellón de la Plana","Vila-real","Benicarló","Vinaròs","Burriana","Onda","Benicassim","La Vall d'Uixó","Nules","Almassora"],
    V:["Valencia","Torrent","Gandia","Paterna","Sagunto","Alzira","Burjassot","Aldaia","Xirivella","Quart de Poblet","Mislata","Manises","Catarroja","Silla","Sueca","Ontinyent","Llíria","Requena","Tavernes de la Valldigna"],
    CE:["Ceuta"],
    ML:["Melilla"]
  },

  // ── Cidades por distrito português ───────────────────────
  cidadesPT: {
    "PT-01":["Aveiro","Oliveira de Azeméis","Espinho","Águeda","Ovar","Estarreja","Anadia","Vagos","Albergaria-a-Velha","Ílhavo","Santa Maria da Feira"],
    "PT-02":["Beja","Aljustrel","Castro Verde","Ferreira do Alentejo","Moura","Serpa","Ourique","Odemira"],
    "PT-03":["Braga","Guimarães","Barcelos","Vila Nova de Famalicão","Esposende","Fafe","Amares","Celorico de Basto","Cabeceiras de Basto","Póvoa de Lanhoso","Vieira do Minho"],
    "PT-04":["Bragança","Mirandela","Macedo de Cavaleiros","Miranda do Douro","Vinhais","Alfândega da Fé"],
    "PT-05":["Castelo Branco","Covilhã","Fundão","Idanha-a-Nova","Penamacor","Proença-a-Nova","Sertã"],
    "PT-06":["Coimbra","Figueira da Foz","Cantanhede","Lousã","Oliveira do Hospital","Mira","Penacova","Arganil","Montemor-o-Velho","Miranda do Corvo"],
    "PT-07":["Évora","Estremoz","Reguengos de Monsaraz","Montemor-o-Novo","Mora","Arraiolos","Vila Viçosa"],
    "PT-08":["Faro","Albufeira","Portimão","Lagos","Loulé","Olhão","Tavira","Silves","Lagoa","Vila Real de Santo António","Quarteira","Vilamoura","Armação de Pêra"],
    "PT-09":["Guarda","Seia","Gouveia","Trancoso","Mêda","Celorico da Beira","Pinhel"],
    "PT-10":["Leiria","Marinha Grande","Pombal","Batalha","Alcobaça","Nazaré","Peniche","Caldas da Rainha","Óbidos","Fátima","Ourém"],
    "PT-11":["Lisboa","Sintra","Cascais","Loures","Amadora","Odivelas","Oeiras","Vila Franca de Xira","Mafra","Azambuja"],
    "PT-12":["Portalegre","Elvas","Campo Maior","Ponte de Sôr","Alter do Chão","Nisa"],
    "PT-13":["Porto","Vila Nova de Gaia","Matosinhos","Gondomar","Maia","Valongo","Póvoa de Varzim","Vila do Conde","Paredes","Penafiel","Amarante","Marco de Canaveses","Lousada","Paços de Ferreira"],
    "PT-14":["Santarém","Tomar","Torres Novas","Rio Maior","Abrantes","Ourém","Entroncamento","Benavente","Almeirim","Coruche"],
    "PT-15":["Setúbal","Almada","Barreiro","Montijo","Sesimbra","Alcácer do Sal","Santiago do Cacém","Seixal","Palmela"],
    "PT-16":["Viana do Castelo","Ponte de Lima","Arcos de Valdevez","Caminha","Melgaço","Valença","Paredes de Coura"],
    "PT-17":["Vila Real","Chaves","Peso da Régua","Montalegre","Mesão Frio","Murça","Sabrosa"],
    "PT-18":["Viseu","Lamego","Tondela","Santa Comba Dão","Nelas","Mangualde","Sátão"],
    "PT-20":["Ponta Delgada","Angra do Heroísmo","Horta","Praia da Vitória","Lagoa","Ribeira Grande","Vila do Porto"],
    "PT-30":["Funchal","Câmara de Lobos","Santa Cruz","Machico","Santana","Porto Santo","Calheta"]
  },

  // ── Bairros/distritos por cidade Espanha (principais) ────
  bairrosES: {
    M:["Sol","Malasaña","Chamberí","Salamanca","Retiro","Lavapiés","Chamartín","Vallecas","Moncloa","Carabanchel","Arganzuela","Hortaleza","Moratalaz","Tetuán","Fuencarral-El Pardo","San Blas","Vicálvaro"],
    B:["Eixample","Gràcia","Born","Gòtic","Sants","Sarrià-Sant Gervasi","Poblenou","Raval","Les Corts","Horta-Guinardó","Sant Andreu","Sant Martí","Nou Barris","Poble Sec","Barceloneta"],
    V:["Ciutat Vella","Ruzafa","El Carmen","Benimaclet","Algirós","Campanar","Patraix","El Cabanyal","Extramurs","Jesús","Botànic","Malvarrosa","Benicalap","Quatre Carreres","Marítim"],
    SE:["Triana","Nervión","Macarena","Santa Cruz","Los Remedios","Alameda","Sevilla Este","Bellavista","San Pablo","Cerro-Amate","Norte","Este","Sur"],
    BI:["Casco Viejo","Indautxu","Deusto","Abando","Begoña","Santutxu","Otxarkoaga","Rekalde","Zorrotza","Basurto","Altamira","Ibaiondo"],
    MA:["Centro","Soho","El Palo","Pedregalejo","Teatinos","Carretera de Cádiz","Cruz de Humilladero","Ciudad Jardín","Churriana","Bailén-Miraflores","Campanillas","Puerto de la Torre"],
    Z:["Centro","Casco Histórico","Delicias","Actur","Romareda","Universidad","Las Fuentes","San José","Torrero","La Almozara","Oliver","Miralbueno"],
    A:["Centro","Playa de San Juan","Babel","Benalúa","Carolinas","Albufereta","San Gabriel","Garbinet","Tómbola","Vistahermosa","Virgen del Remedio","La Florida"],
    MU:["Centro","La Flota","San Andrés","Espinardo","El Carmen","Era Alta","Churra","La Ñora","Puente Tocinos"],
    GC:["Triana","Vegueta","Guanarteme","Las Palmas Centro","El Batán","La Isleta","Puerto","Ciudad Alta"],
    TF:["Centro","La Laguna centro","El Médano","Las Americas","Los Cristianos","Los Realejos","Adeje centro"],
    NA:["Casco Antiguo","Segundo Ensanche","Primer Ensanche","Rotxapea","Chantrea","Azpilagaña","San Jorge"],
    SS:["Centro-Alde Zaharra","Gros","Aiete","Egia","Intxaurrondo","Amara Zaharra","Amara Berri"],
    O:["Centro","El Natahoyo","La Calzada","Colloto","Lugones","Buenavista","Otero","Naranco"],
    C:["Centro","Agra del Orzán","Matogrande","Monte Alto","Castrillón","Os Castros","A Malata"],
    PO:["Bouzas","Coia","Teis","Matamá","Castrelos","Lavadores","Berbés","Centro Pontevedra"]
  },

  // ── Bairros/freguesias por distrito português ─────────────
  bairrosPT: {
    "PT-11":["Alfama","Mouraria","Belém","Chiado","Bairro Alto","Intendente","Anjos","Arroios","Alvalade","Areeiro","Benfica","Telheiras","Lumiar","Olivais","Marvila","Beato","Penha de França","Graça","Castelo","Alcântara","Campo de Ourique","Campolide","Amoreiras","Saldanha","Avenidas Novas","Parque das Nações","Moscavide","Oeiras","Cascais","Sintra","Amadora","Odivelas","Sacavém"],
    "PT-13":["Ribeira","Cedofeita","Bonfim","Campanhã","Paranhos","Ramalde","Lordelo do Ouro","Massarelos","Miragaia","Santo Ildefonso","Vitória","Foz do Douro","Antas","Matosinhos","Vila Nova de Gaia","Gondomar","Maia","Valongo","Póvoa de Varzim","Vila do Conde"],
    "PT-08":["Centro Faro","Gambelas","Montenegro","Albufeira","Armação de Pêra","Portimão","Lagos","Silves","Quarteira","Vilamoura","Meia Praia","Tavira"],
    "PT-03":["Centro Braga","São Vítor","Maximinos","Palmeira","Real","Nogueiró","Esporões","Guimarães centro"],
    "PT-15":["Almada Centro","Costa da Caparica","Pragal","Cacilhas","Charneca","Seixal centro","Barreiro centro","Setúbal centro"],
    "PT-06":["Baixa de Coimbra","Universidade","Solum","Bairro Norton de Matos","Figueira da Foz centro"],
    "PT-30":["Funchal centro","Zona Velha","Santa Maria Maior","Santo António","Câmara de Lobos centro"],
    "PT-20":["Ponta Delgada centro","Lagoa Açores","Ribeira Grande","Angra centro"]
  },

  // ── Rotas da Espanha (chaves = código DGT) ───────────────
  rotasES: {
    M:[
      { id:"m30",    nome:"M-30",               regioes:["Sol","Retiro","Salamanca","Chamartín","Vallecas","Moncloa","Carabanchel","Lavapiés","Arganzuela","Moratalaz"] },
      { id:"a6",     nome:"A-6 Noroeste",       regioes:["Chamberí","Moncloa","Tetuán","Fuencarral-El Pardo"] },
      { id:"m40",    nome:"M-40 / M-45",        regioes:["Malasaña","Carabanchel","Vallecas","Hortaleza","San Blas","Vicálvaro"] }
    ],
    B:[
      { id:"rondag", nome:"Ronda de Dalt",       regioes:["Eixample","Gràcia","Sarrià-Sant Gervasi","Horta-Guinardó","Nou Barris","Sant Andreu"] },
      { id:"b30",    nome:"B-30 / AP-7",         regioes:["Poblenou","Sant Martí"] },
      { id:"lavdal", nome:"Av. Diagonal",        regioes:["Born","Gòtic","Sants","Les Corts","Raval","Barceloneta","Poble Sec"] }
    ],
    V:[
      { id:"v30",       nome:"V-30",             regioes:["Jesús","Extramurs","El Cabanyal","Patraix","Quatre Carreres","Marítim"] },
      { id:"v21",       nome:"V-21",             regioes:["Campanar","Benimaclet","Algirós","Benicalap","Malvarrosa"] },
      { id:"centrovlc", nome:"Centro Valencia",  regioes:["Ciutat Vella","Ruzafa","El Carmen","Botànic"] }
    ],
    SE:[
      { id:"se30",  nome:"SE-30 Ronda",          regioes:["Triana","Macarena","Nervión","Bellavista","Cerro-Amate","Norte","Sur"] },
      { id:"a4sev", nome:"A-4 Sur",              regioes:["Los Remedios","Alameda","Santa Cruz","Sevilla Este","San Pablo","Este"] }
    ],
    BI:[
      { id:"a8bil", nome:"A-8 Autovía del Cantábrico", regioes:["Casco Viejo","Indautxu","Begoña","Santutxu","Otxarkoaga","Altamira"] },
      { id:"n634",  nome:"N-634 / Gran Vía",     regioes:["Abando","Deusto","Rekalde","Zorrotza","Basurto","Ibaiondo"] }
    ],
    MA:[
      { id:"a7mal", nome:"A-7 Mediterráneo",     regioes:["Centro","Soho","El Palo","Pedregalejo","Bailén-Miraflores","Campanillas"] },
      { id:"ma20",  nome:"MA-20 Ronda Oeste",    regioes:["Teatinos","Carretera de Cádiz","Cruz de Humilladero","Ciudad Jardín","Churriana","Puerto de la Torre"] }
    ],
    Z:[
      { id:"a2zar", nome:"A-2 Aragón",           regioes:["Centro","Casco Histórico","Delicias","Las Fuentes","San José","La Almozara","Oliver"] },
      { id:"z30",   nome:"Z-30 Ronda",           regioes:["Actur","Romareda","Universidad","Torrero","Miralbueno"] }
    ],
    A:[
      { id:"n340alc", nome:"N-340 Costa Blanca", regioes:["Centro","Benalúa","Carolinas","San Gabriel","Albufereta","Virgen del Remedio"] },
      { id:"a31alc",  nome:"A-31 / CV-80",       regioes:["Playa de San Juan","Babel","Garbinet","Tómbola","Vistahermosa","La Florida"] }
    ],
    MU: [{ id:"rm20",  nome:"Ronda de Murcia RM-20", regioes:["Centro","La Flota","San Andrés","Espinardo","El Carmen","Era Alta","Churra"] }],
    O:  [{ id:"a66as", nome:"A-66 / AS-1 Asturias",  regioes:["Centro","El Natahoyo","La Calzada","Lugones","Buenavista"] }],
    GC: [{ id:"gc1",   nome:"GC-1 Autopista Sur",    regioes:["Triana","Vegueta","Guanarteme","Las Palmas Centro","El Batán","La Isleta"] }],
    TF: [{ id:"tf5",   nome:"TF-5 Autopista Norte",  regioes:["Centro","La Laguna centro","El Médano","Las Americas","Los Cristianos"] }],
    NA: [{ id:"a15na", nome:"A-15 Pamplona",          regioes:["Casco Antiguo","Segundo Ensanche","Primer Ensanche","Rotxapea","Chantrea"] }],
    SS: [{ id:"n1ss",  nome:"N-1 / A-8 Donostia",    regioes:["Centro-Alde Zaharra","Gros","Aiete","Egia","Intxaurrondo","Amara Zaharra"] }],
    C:  [{ id:"ag55",  nome:"AG-55 A Coruña",         regioes:["Centro","Agra del Orzán","Matogrande","Monte Alto","Castrillón"] }],
    PO: [{ id:"vci",   nome:"VCI Vigo",               regioes:["Bouzas","Coia","Teis","Matamá","Castrelos","Lavadores","Berbés"] }],
    AL: [{ id:"n340al",nome:"N-340 Almería",          regioes:["Almería","Roquetas de Mar","El Ejido"] }],
    CA: [{ id:"a4ca",  nome:"A-4 / A-48 Cádiz",      regioes:["Jerez de la Frontera","Cádiz","San Fernando","Chiclana de la Frontera"] }],
    CO: [{ id:"a4co",  nome:"A-4 Córdoba",            regioes:["Córdoba","Lucena","Puente Genil","Palma del Río"] }],
    GR: [{ id:"a44gr", nome:"A-44 Granada",           regioes:["Granada","Motril","Guadix","Santa Fe","Maracena"] }],
    H:  [{ id:"a49h",  nome:"A-49 Huelva",            regioes:["Huelva","Lepe","Almonte","Moguer","Ayamonte"] }],
    J:  [{ id:"a44j",  nome:"A-44 / N-323 Jaén",      regioes:["Jaén","Linares","Andújar","Úbeda","Baeza"] }],
    HU: [{ id:"n330hu",nome:"N-330 Huesca",           regioes:["Huesca","Jaca","Barbastro","Monzón"] }],
    TE: [{ id:"n234te",nome:"N-234 Teruel",           regioes:["Teruel","Alcañiz","Andorra"] }],
    IB: [{ id:"ma13",  nome:"Ma-13 Palma",            regioes:["Palma","Calvià","Manacor","Inca","Llucmajor"] }],
    S:  [{ id:"a67s",  nome:"A-67 Cantabria",         regioes:["Santander","Torrelavega","Castro-Urdiales","Camargo"] }],
    AB: [{ id:"a31ab", nome:"A-31 Albacete",          regioes:["Albacete","Hellín","Almansa","Villarrobledo"] }],
    CR: [{ id:"a4cr",  nome:"A-4 Ciudad Real",        regioes:["Ciudad Real","Puertollano","Tomelloso","Valdepeñas"] }],
    CU: [{ id:"n400cu",nome:"N-400 Cuenca",           regioes:["Cuenca","Tarancón"] }],
    GU: [{ id:"a2gu",  nome:"A-2 Guadalajara",        regioes:["Guadalajara","Azuqueca de Henares","Cabanillas del Campo"] }],
    TO: [{ id:"a42to", nome:"A-42 Toledo",            regioes:["Toledo","Talavera de la Reina","Illescas","Ocaña"] }],
    AV: [{ id:"a50av", nome:"A-50 Ávila",             regioes:["Ávila","Arenas de San Pedro"] }],
    BU: [{ id:"a1bu",  nome:"A-1 Burgos",             regioes:["Burgos","Miranda de Ebro","Aranda de Duero"] }],
    LE: [{ id:"a6le",  nome:"A-6 / A-66 León",        regioes:["León","Ponferrada","San Andrés del Rabanedo","Astorga"] }],
    P:  [{ id:"a67p",  nome:"A-67 Palencia",          regioes:["Palencia","Aguilar de Campoo","Guardo"] }],
    SA: [{ id:"a62sa", nome:"A-62 Salamanca",         regioes:["Salamanca","Béjar","Ciudad Rodrigo"] }],
    SG: [{ id:"a1sg",  nome:"A-1 Segovia",            regioes:["Segovia","El Espinar","Cuéllar"] }],
    SO: [{ id:"n122so",nome:"N-122 Soria",            regioes:["Soria","Ágreda","El Burgo de Osma"] }],
    VA: [{ id:"a62va", nome:"A-62 Valladolid",        regioes:["Valladolid","Laguna de Duero","Medina del Campo"] }],
    ZA: [{ id:"a52za", nome:"A-52 Zamora",            regioes:["Zamora","Benavente","Toro"] }],
    GI: [{ id:"ap7gi", nome:"AP-7 / N-II Girona",     regioes:["Girona","Lloret de Mar","Figueres","Blanes","Salt"] }],
    L:  [{ id:"n2l",   nome:"N-2 Lleida",             regioes:["Lleida","Balaguer","Mollerussa","Cervera"] }],
    T:  [{ id:"n340t", nome:"N-340 Tarragona",        regioes:["Tarragona","Reus","Cambrils","Salou","El Vendrell"] }],
    BA: [{ id:"a5ba",  nome:"A-5 / N-432 Badajoz",   regioes:["Badajoz","Mérida","Almendralejo","Zafra","Don Benito"] }],
    CC: [{ id:"a66cc", nome:"A-66 Cáceres",           regioes:["Cáceres","Plasencia","Navalmoral de la Mata"] }],
    LU: [{ id:"a6lu",  nome:"A-6 Lugo",               regioes:["Lugo","Monforte de Lemos","Viveiro","Sarria"] }],
    OR: [{ id:"a52or", nome:"A-52 Ourense",           regioes:["Ourense","O Carballiño","Verín","Allariz"] }],
    LO: [{ id:"a12lo", nome:"A-12 La Rioja",          regioes:["Logroño","Calahorra","Haro","Arnedo"] }],
    VI: [{ id:"a1vi",  nome:"A-1 / N-1 Álava",        regioes:["Vitoria-Gasteiz","Llodio","Amurrio"] }],
    CS: [{ id:"a7cs",  nome:"A-7 Castellón",          regioes:["Castellón de la Plana","Vila-real","Benicarló","Burriana","Benicassim"] }],
    CE: [{ id:"n352ce",nome:"N-352 Ceuta",            regioes:["Ceuta"] }],
    ML: [{ id:"n352ml",nome:"N-352 Melilla",          regioes:["Melilla"] }]
  },

  // ── Rotas de Portugal ─────────────────────────────────────
  rotasPT: {
    "PT-11":[
      { id:"cintlis", nome:"2.ª Circular / CRIL",     regioes:["Benfica","Telheiras","Campo Grande","Saldanha","Anjos","Arroios","Avenidas Novas","Campolide"] },
      { id:"a5lis",   nome:"A5 Lisboa–Cascais",       regioes:["Alcântara","Belém","Oeiras","Cascais","Estoril","Restelo"] },
      { id:"ic19",    nome:"IC19 Sintra",              regioes:["Sintra","Queluz","Amadora","Alfragide","Odivelas"] },
      { id:"a8lis",   nome:"A8 Loures/Odivelas",      regioes:["Odivelas","Loures","Sacavém","Moscavide","Alverca"] },
      { id:"a2lis",   nome:"A2 / Ponte 25 de Abril",  regioes:["Almada","Barreiro","Seixal","Setúbal","Cacilhas","Pragal"] },
      { id:"a1lis",   nome:"A1 Lisboa–Porto",          regioes:["Marvila","Beato","Vila Franca de Xira","Parque das Nações"] }
    ],
    "PT-13":[
      { id:"vcirc",   nome:"VCI (Via de Cintura Interna)",regioes:["Bonfim","Paranhos","Lordelo do Ouro","Cedofeita","Massarelos","Miragaia","Ramalde"] },
      { id:"a4por",   nome:"A4 Porto–Amarante",       regioes:["Campanhã","Gondomar","Valongo","Penafiel","Antas"] },
      { id:"a3por",   nome:"A3 Porto–Braga",          regioes:["Matosinhos","Maia","Vila do Conde","Póvoa de Varzim"] },
      { id:"a28por",  nome:"A28 Porto–Viana",         regioes:["Matosinhos","Póvoa de Varzim","Vila do Conde"] },
      { id:"a20por",  nome:"A20 Frente Ribeirinha",   regioes:["Ribeira","Afurada","Antas","Foz do Douro"] }
    ],
    "PT-08":[
      { id:"a22alg",  nome:"A22 Via do Infante",      regioes:["Faro","Albufeira","Portimão","Lagos","Tavira","Olhão","Loulé","Quarteira","Vilamoura"] }
    ],
    "PT-03":[
      { id:"a3bra",   nome:"A3 Braga–Valença",        regioes:["Braga","Barcelos","Vila Nova de Famalicão","Guimarães"] }
    ],
    "PT-15":[
      { id:"a2set",   nome:"A2 Setúbal / Almada",     regioes:["Almada","Setúbal","Barreiro","Seixal","Palmela","Costa da Caparica"] }
    ]
  },

  // ── Referências de localização (Espanha) — para incidentes ─
  referenciasES: {
    m30:      [{ km:3, ref:"Túnel M-30 / Río Manzanares" }, { km:8, ref:"Nudo Norte A-1/A-6" }, { km:15, ref:"Enlace A-3 — Vallecas" }],
    a6:       [{ km:5, ref:"Puerta de Hierro" }, { km:12, ref:"Las Rozas — km 18" }],
    m40:      [{ km:7, ref:"Enlace N-VI — Pozuelo" }, { km:18, ref:"A-4 sur — Vallecas" }],
    rondag:   [{ km:4, ref:"Tunel de Vallvidriera" }, { km:9, ref:"Nus de la Trinitat" }],
    b30:      [{ km:6, ref:"Bifurcación AP-7 / C-33" }, { km:14, ref:"Mollet del Vallès" }],
    lavdal:   [{ km:3, ref:"Plaza Francesc Macià" }, { km:7, ref:"Glòries — Diagonal/Gran Via" }],
    v30:      [{ km:4, ref:"Enlace Pista de Silla" }, { km:9, ref:"Paiporta — km 7" }],
    v21:      [{ km:3, ref:"Enlace Av. Cardenal Benlloch" }, { km:8, ref:"Aeropuerto Valencia" }],
    centrovlc:[{ km:2, ref:"Plaza del Ayuntamiento" }, { km:5, ref:"Av. Blasco Ibáñez" }],
    se30:     [{ km:5, ref:"Puente del V Centenario" }, { km:12, ref:"Enlace A-4 — San Fernando" }],
    a4sev:    [{ km:8, ref:"Los Palacios — km 14" }, { km:20, ref:"Enlace Utrera" }],
    a8bil:    [{ km:3, ref:"Aeropuerto de Loiu" }, { km:9, ref:"Basauri — Enlace A-68" }],
    n634:     [{ km:4, ref:"Puente de Deusto" }, { km:8, ref:"San Mamés — Gran Vía" }],
    a7mal:    [{ km:6, ref:"Aeropuerto de Málaga" }, { km:15, ref:"Torremolinos — km 225" }],
    ma20:     [{ km:4, ref:"Enlace Universidad — MA-20" }, { km:9, ref:"Estadio La Rosaleda" }],
    a2zar:    [{ km:7, ref:"Enlace Huesca — A-23" }, { km:18, ref:"Caspe — km 40" }],
    z30:      [{ km:3, ref:"Enlace Actur — Vía Hispanidad" }, { km:8, ref:"Enlace Romareda" }],
    n340alc:  [{ km:5, ref:"Playa de San Juan — Norte" }, { km:12, ref:"Enlace A-7 — El Campello" }],
    a31alc:   [{ km:6, ref:"Enlace N-330 — El Campello" }, { km:15, ref:"Monforte del Cid" }]
  },

  // ── Referências de localização (Portugal) — para incidentes
  referenciasPT: {
    cintlis: [{ km:3, ref:"Viaduto de Monsanto" }, { km:7, ref:"Pontinha — nó da A8" }, { km:12, ref:"Nó do Alvito — A2" }],
    a5lis:   [{ km:5, ref:"Oeiras — km 12" }, { km:10, ref:"Cascais — Estoril" }],
    ic19:    [{ km:4, ref:"Queluz — IP7" }, { km:9, ref:"Sintra — Portela" }],
    a8lis:   [{ km:6, ref:"Loures — nó da CREL" }, { km:15, ref:"Alverca — km 20" }],
    a2lis:   [{ km:3, ref:"Ponte 25 de Abril" }, { km:8, ref:"Almada — Pragal" }, { km:18, ref:"Setúbal — km 28" }],
    a1lis:   [{ km:8, ref:"Sacavém — km 15" }, { km:22, ref:"Vila Franca de Xira" }],
    vcirc:   [{ km:3, ref:"Nó da Constituição" }, { km:7, ref:"Nó do Freixo" }],
    a4por:   [{ km:5, ref:"Campanhã — IP1" }, { km:12, ref:"Gondomar — km 9" }],
    a3por:   [{ km:6, ref:"Maia — nó da A41" }, { km:14, ref:"Braga — Maximinos" }],
    a28por:  [{ km:4, ref:"Matosinhos — nó A28/A4" }, { km:10, ref:"Póvoa de Varzim" }],
    a20por:  [{ km:2, ref:"Ribeira — Afurada" }, { km:5, ref:"Nó de Arrábida" }],
    a22alg:  [{ km:8, ref:"Nó de Loulé" }, { km:20, ref:"Albufeira — km 28" }],
    a3bra:   [{ km:6, ref:"Braga — Maximinos" }, { km:15, ref:"Barcelos" }],
    a2set:   [{ km:4, ref:"Almada — Pragal" }, { km:10, ref:"Setúbal — Bonfim" }]
  },

  // ── Cidades do Entorno do DF (Goiás) ─────────────────────
  entornoDf: [
    "Águas Lindas de Goiás","Luziânia","Valparaíso de Goiás","Cidade Ocidental",
    "Novo Gama","Formosa","Planaltina-GO","Cristalina","Alexânia",
    "Santo Antônio do Descoberto","Padre Bernardo","Corumbá de Goiás",
    "Pirenópolis","Cocalzinho de Goiás","Abadiânia","Silvânia",
    "Anápolis","Goiânia","Aparecida de Goiânia","Trindade","Senador Canedo"
  ],

  // ── Bairros de Brasília / DF ─────────────────────────────
  bairros: [
    "Asa Norte","Asa Sul","Lago Norte","Lago Sul","Noroeste","Sudoeste",
    "Cruzeiro","Octogonal","Guará I","Guará II","Águas Claras","Vicente Pires",
    "Taguatinga Norte","Taguatinga Sul","Taguatinga Centro","Ceilândia Norte",
    "Ceilândia Sul","Ceilândia Centro","Samambaia Norte","Samambaia Sul",
    "Riacho Fundo I","Riacho Fundo II","Recanto das Emas","Gama","Santa Maria",
    "São Sebastião","Planaltina","Sobradinho","Brazlândia","Park Way",
    "Núcleo Bandeirante","Candangolândia","Jardim Botânico","Itapoã",
    "Fercal","Estrutural","SCIA","SIA","Setor de Clubes","Sobradinho II",
    "Arapoanga","Grande Colorado","Planaltina Sul","Mestre D'Armas",
    "Paranoá","Itapoã","Varjão","Riacho Fundo","Setor Leste"
  ],

  // ── Rotas (Brasília/DF) ──────────────────────────────────
  rotas: [
    { id:"eixao",  nome:"Eixão (L2 Norte/Sul)",         regioes:["Asa Norte","Asa Sul","Lago Norte","Lago Sul"] },
    { id:"w3",     nome:"W3 Norte/Sul",                  regioes:["Asa Norte","Asa Sul","Cruzeiro","Sudoeste"] },
    { id:"br060",  nome:"BR-060 (Taguatinga/Ceilândia)", regioes:["Taguatinga Norte","Taguatinga Sul","Ceilândia Norte","Ceilândia Sul","Samambaia Norte"] },
    { id:"br040",  nome:"BR-040 (Gama/Santa Maria)",     regioes:["Gama","Santa Maria","Recanto das Emas","Riacho Fundo I"] },
    { id:"epia",   nome:"EPIA (Estrada Parque IG)",      regioes:["Núcleo Bandeirante","Candangolândia","Guará I","Guará II"] },
    { id:"estrut", nome:"Via Estrutural",                 regioes:["Estrutural","SCIA","SIA","Taguatinga Norte"] },
    { id:"df047",  nome:"DF-047 (Samambaia)",             regioes:["Samambaia Norte","Samambaia Sul","Riacho Fundo II"] },
    { id:"epnb",   nome:"EPNB",                          regioes:["Núcleo Bandeirante","Guará I","SIA","Park Way"] },
    { id:"entorno",nome:"Acesso Entorno (GO)",            regioes:["Águas Lindas de Goiás","Luziânia","Valparaíso de Goiás","Cidade Ocidental","Novo Gama"] },
    { id:"br020",  nome:"BR-020 (Formosa/Planaltina)",   regioes:["Planaltina","Sobradinho","Formosa","Planaltina-GO"] },
    { id:"df001",  nome:"DF-001 (anel viário)",           regioes:["São Sebastião","Paranoá","Jardim Botânico","Itapoã"] }
  ],

  // ── Incidentes possíveis ──────────────────────────────────
  incidentesTipos: [
    { tipo:"acidente",     icone:"💥", label:"Acidente" },
    { tipo:"avariado",     icone:"🚧", label:"Carro avariado" },
    { tipo:"obras",        icone:"⚠️", label:"Obras na via" },
    { tipo:"alagamento",   icone:"🌊", label:"Alagamento" },
    { tipo:"manifestacao", icone:"📢", label:"Manifestação" },
    { tipo:"policia",      icone:"🚔", label:"Blitz policial" }
  ],

  // ── Pontos de referência (Brasília) ──────────────────────
  referencias: {
    eixao:  [
      { km:2,  ref:"Próximo ao SHN / Hotel Nacional" },
      { km:5,  ref:"Saída para o Setor Bancário Sul" },
      { km:8,  ref:"Viaduto do Bragueto" },
      { km:12, ref:"Entrada para o Lago Norte" }
    ],
    w3:     [
      { km:3,  ref:"Próximo ao Hospital de Base" },
      { km:6,  ref:"Shopping Conjunto Nacional" },
      { km:9,  ref:"W3 com SGAS 611" }
    ],
    br060:  [
      { km:5,  ref:"Saída para Taguatinga Shopping" },
      { km:15, ref:"Praça do Relógio — Taguatinga" },
      { km:25, ref:"Pistão Sul — Ceilândia" }
    ],
    br040:  [
      { km:8,  ref:"Saída para o Gama Leste" },
      { km:18, ref:"Entrada Santa Maria" },
      { km:28, ref:"Recanto das Emas — trevo principal" }
    ],
    entorno:[
      { km:12, ref:"Divisa DF / Goiás — Águas Lindas" },
      { km:22, ref:"Centro de Luziânia" },
      { km:18, ref:"Valparaíso — Av. Bela Vista" }
    ]
  },

  sotaques: [
    { id:"brasiliense", nome:"Centro-Oeste 🏛️", regiao:"Brasília / Goiás", expressoes:["rapaz","cara","sabe","né não","é isso aí"], girias:{ bom:"top demais", ruim:"pesado demais", espera:"aguenta aí", alternativa:"tem como desviar" } },
    { id:"nordestino",  nome:"Nordeste 🌵",      regiao:"Bahia, Ceará, Pernambuco", expressoes:["oxe","visse","sô","meu rei","arretado","vixe"], girias:{ bom:"arretado demais", ruim:"tá osso visse", espera:"aguenta um fio", alternativa:"tem jeito de desviar não" } },
    { id:"carioca",     nome:"Carioca 🏖️",       regiao:"Rio de Janeiro", expressoes:["cara","mano","véi","ô cara","que isso","tá ligado"], girias:{ bom:"na moita tá tranquilo", ruim:"tá um caos aqui ó", espera:"segura o rojão aí", alternativa:"tem desvio aí" } },
    { id:"paulistano",  nome:"Paulistano 🏙️",    regiao:"São Paulo", expressoes:["mano","cara","né","po","véi","entendeu"], girias:{ bom:"tá de boa", ruim:"tá travado demais", espera:"segura a onda", alternativa:"dá pra desviar mano" } },
    { id:"mineiro",     nome:"Mineiro ⛏️",        regiao:"Minas Gerais", expressoes:["uai","sô","trem","ocê","uai sô","que isso"], girias:{ bom:"tá bão sô", ruim:"tá embolado que só", espera:"fica sossegado um fio", alternativa:"tem um atalho aí sô" } },
    { id:"gaucho",      nome:"Gaúcho 🐎",         regiao:"Rio Grande do Sul", expressoes:["bah","tchê","tri","guri","barbaridade","bah tchê"], girias:{ bom:"tá tri bão tchê", ruim:"tá uma bagunça bah", espera:"guarda o chimarrão e espera", alternativa:"tem rota alternativa tchê" } },
    { id:"nortista",    nome:"Nortista 🌿",        regiao:"Pará, Amazonas", expressoes:["égua","bicho","mano","danado","égua bicho"], girias:{ bom:"tá maneiro bicho", ruim:"tá entupido demais égua", espera:"espera um bocado ainda", alternativa:"tem caminho diferente bicho" } },
    { id:"catarinense", nome:"Catarinense 🌊",    regiao:"Santa Catarina", expressoes:["bah","tchê","tri","guri","né"], girias:{ bom:"tá tranquilo tchê", ruim:"tá feio bah", espera:"espera um tique aí", alternativa:"tem desvio bah" } }
  ],

  humores: [
    { id:"extrovertido", nome:"Extrovertido 🎉", desc:"Energia máxima e animação" },
    { id:"alegre",       nome:"Alegre 😄",       desc:"Positivo e leve" },
    { id:"girias",       nome:"Com Gírias 🤙",   desc:"Fala igual ao povo local" },
    { id:"normal",       nome:"Normal 😌",        desc:"Direto e equilibrado" },
    { id:"formal",       nome:"Formal 👔",        desc:"Tom profissional" },
    { id:"direto",       nome:"Direto 😤",        desc:"Curto e objetivo" },
    { id:"zen",          nome:"Zen 🧘",           desc:"Calmo e filosófico" },
    { id:"humor",        nome:"Humorístico 😂",   desc:"Piadas e memes sobre o trânsito" }
  ],

  // ── Sotaques da Espanha por comunidade ──────────────────
  sotaquesES: [
    { id:"madrilenho",  nome:"Madrileño 🏛️",     regiao:"Comunidad de Madrid",    expressoes:["tío","macho","mola","guay","flipar","de puta madre"],  girias:{bom:"mola mazo tío",         ruim:"es un rollo",    espera:"espera tío",         alternativa:"hay otra ruta"} },
    { id:"sevillano",   nome:"Sevillano 🌸",       regiao:"Sevilla / Andalucía",    expressoes:["illo","chiquillo","esha","arsa","salero","ole"],        girias:{bom:"está de lujo illo",     ruim:"qué rollo illo", espera:"espera un ratito",   alternativa:"hay otro camino illo"} },
    { id:"andaluz",     nome:"Andaluz ☀️",         regiao:"Andalucía",              expressoes:["coño","macho","tío","joder","ole","esha"],              girias:{bom:"está mu bien",          ruim:"es mu pesao",    espera:"espera un momento",  alternativa:"hay otro camino"} },
    { id:"catalan",     nome:"Catalán 🔴🟡",       regiao:"Catalunya",              expressoes:["ei","nano","collons","home","ostres","au va"],          girias:{bom:"molt bé nano",          ruim:"és un rotllo",   espera:"espera un moment",   alternativa:"hi ha una altra ruta"} },
    { id:"vasco",       nome:"Vasco ⬛🟩",          regiao:"País Vasco",             expressoes:["ostia","tío","mola","buah","joer","aupa"],              girias:{bom:"genial tío",            ruim:"qué rollo",      espera:"espera un momento",  alternativa:"hay otra ruta"} },
    { id:"gallego",     nome:"Galego 🌊",           regiao:"Galicia",                expressoes:["home","meu","carallo","vaia","eh tío"],                 girias:{bom:"está de medo meu",      ruim:"é un lío",       espera:"espera un pouco",    alternativa:"hai outro camiño"} },
    { id:"valenciano",  nome:"Valenciano 🌊🟠",    regiao:"Comunitat Valenciana",   expressoes:["tio","home","ostres","mira","au"],                      girias:{bom:"molt bé tio",           ruim:"és un rollo",    espera:"espera un moment",   alternativa:"hi ha una altra ruta"} },
    { id:"canario",     nome:"Canario 🌋",          regiao:"Canarias",               expressoes:["guagua","mago","bicho","pisha","tío"],                  girias:{bom:"está chévere tío",      ruim:"es un lío",      espera:"espera un momento",  alternativa:"hay otro camino bicho"} },
    { id:"castellano",  nome:"Castellano 🏰",       regiao:"Castilla / Resto",       expressoes:["tío","hombre","vamos","joder","hostia"],                girias:{bom:"está muy bien",         ruim:"es un rollo",    espera:"espera un momento",  alternativa:"hay otra ruta"} },
    { id:"murciano",    nome:"Murciano 🌶️",        regiao:"Región de Murcia",       expressoes:["hala","tío","miarma","jolin","oye"],                    girias:{bom:"está mu bien miarma",   ruim:"es un coñazo",   espera:"espera un momento",  alternativa:"hay otro camino"} },
    { id:"aragones",    nome:"Aragonés ⛰️",        regiao:"Aragón",                 expressoes:["ostia","charrán","maño","tío","joder"],                 girias:{bom:"está muy bien maño",    ruim:"es un rollo",    espera:"espera maño",        alternativa:"hay otra ruta maño"} },
    { id:"asturiano",   nome:"Asturiano 🌿",        regiao:"Asturias",               expressoes:["xusto","fíu","coño","home","vaya"],                     girias:{bom:"está de puta madre fíu",ruim:"ye un rollo",    espera:"espera un momentín", alternativa:"hay otra ruta fíu"} },
    { id:"extremenho",  nome:"Extremeño 🦅",        regiao:"Extremadura",            expressoes:["coño","tío","mira","eh","anda"],                        girias:{bom:"está muy bien",         ruim:"es un lío",      espera:"espera tío",         alternativa:"hay otro camino"} },
    { id:"balear",      nome:"Balear 🏖️",          regiao:"Illes Balears",          expressoes:["ei","homo","ostres","mira","au"],                       girias:{bom:"molt bé homo",          ruim:"és un rotllo",   espera:"espera un poc",      alternativa:"hi ha una altra ruta"} }
  ],

  // ── Mapeamento província → sotaque (Espanha) ─────────────
  sotaqueESPorProvincia: {
    AL:"andaluz", CA:"andaluz", CO:"andaluz", GR:"andaluz", H:"andaluz", J:"andaluz", MA:"andaluz", SE:"sevillano",
    HU:"aragones", TE:"aragones", Z:"aragones",
    O:"asturiano", IB:"balear", GC:"canario", TF:"canario", S:"castellano",
    AB:"castellano", CR:"castellano", CU:"castellano", GU:"castellano", TO:"castellano",
    AV:"castellano", BU:"castellano", LE:"castellano", P:"castellano", SA:"castellano",
    SG:"castellano", SO:"castellano", VA:"castellano", ZA:"castellano",
    B:"catalan", GI:"catalan", L:"catalan", T:"catalan",
    BA:"extremenho", CC:"extremenho",
    C:"gallego", LU:"gallego", OR:"gallego", PO:"gallego",
    LO:"castellano", M:"madrilenho", MU:"murciano", NA:"castellano",
    VI:"vasco", SS:"vasco", BI:"vasco",
    A:"valenciano", CS:"valenciano", V:"valenciano",
    CE:"castellano", ML:"castellano"
  },

  // ── Sotaques de Portugal por região ──────────────────────
  sotaquesPT: [
    { id:"lisboeta",     nome:"Lisboeta 🏛️",       regiao:"Lisboa e Vale do Tejo",  expressoes:["pá","tipo","fixe","epá","olha","vai lá"],               girias:{bom:"é fixe pá",             ruim:"que seca",       espera:"espera aí pá",       alternativa:"há outro caminho"} },
    { id:"portuense",    nome:"Portuense 🌉",        regiao:"Porto e Norte",          expressoes:["mano","bué","fixes","olha","caramba"],                  girias:{bom:"é bué fixes mano",      ruim:"que chatice",    espera:"espera aí mano",     alternativa:"há outra rota mano"} },
    { id:"minhoto",      nome:"Minhoto 🌿",          regiao:"Braga / Viana do Castelo",expressoes:["ó","eh pá","olha","caramba","vá lá"],                  girias:{bom:"é uma maravilha",       ruim:"que canseira",   espera:"aguarda um momento", alternativa:"há outro caminho"} },
    { id:"transmontano", nome:"Transmontano ⛰️",     regiao:"Trás-os-Montes",         expressoes:["ó","caramba","home","bem","tu vês"],                    girias:{bom:"está muito bem",        ruim:"é um aborrecimento", espera:"espera aí",      alternativa:"há outro caminho"} },
    { id:"alentejano",   nome:"Alentejano 🌻",       regiao:"Alentejo",               expressoes:["ó mano","olha","eh pá","tá","caramba"],                 girias:{bom:"tá bem mano",           ruim:"que maçada",     espera:"espera um bocadinho",alternativa:"há outro caminho mano"} },
    { id:"algarvio",     nome:"Algarvio 🏖️",        regiao:"Faro / Algarve",         expressoes:["ó","então","olha","vai lá","bom"],                      girias:{bom:"está muito bom",        ruim:"que chateação",  espera:"espera aí",          alternativa:"há outra rota"} },
    { id:"acoriano",     nome:"Açoriano 🌊",         regiao:"Açores",                 expressoes:["ó","caramba","então","olha","vá"],                      girias:{bom:"está muito bem",        ruim:"que seca",       espera:"espera um momento",  alternativa:"há outro caminho"} },
    { id:"madeirense",   nome:"Madeirense 🏝️",      regiao:"Madeira",                expressoes:["ó","então","olha","caramba","bom dia"],                 girias:{bom:"está muito bom",        ruim:"que chatice",    espera:"aguarda aí",         alternativa:"há outra rota"} },
    { id:"beirao",       nome:"Beirão 🏔️",          regiao:"Beiras",                 expressoes:["ó","caramba","então","olha","vá lá"],                   girias:{bom:"está muito bem",        ruim:"que maçada",     espera:"espera aí",          alternativa:"há outro caminho"} },
    { id:"coimbrão",     nome:"Coimbrão 🎓",         regiao:"Coimbra",                expressoes:["ó pá","então","olha","vai lá","tipo"],                  girias:{bom:"é fixe pá",             ruim:"que seca",       espera:"espera pá",          alternativa:"há outra rota pá"} },
    { id:"ribatejano",   nome:"Ribatejano 🐂",       regiao:"Santarém / Ribatejo",    expressoes:["ó","então","olha","vá","caramba"],                      girias:{bom:"está muito bem",        ruim:"que aborrecimento",espera:"espera aí",          alternativa:"há outro caminho"} }
  ],

  // ── Mapeamento distrito → sotaque (Portugal) ─────────────
  sotaquePTPorDistrito: {
    "PT-01":"beirao", "PT-02":"alentejano", "PT-03":"minhoto",
    "PT-04":"transmontano", "PT-05":"beirao", "PT-06":"coimbrão",
    "PT-07":"alentejano", "PT-08":"algarvio", "PT-09":"beirao",
    "PT-10":"beirao", "PT-11":"lisboeta", "PT-12":"alentejano",
    "PT-13":"portuense", "PT-14":"ribatejano", "PT-15":"lisboeta",
    "PT-16":"minhoto", "PT-17":"transmontano", "PT-18":"beirao",
    "PT-20":"acoriano", "PT-30":"madeirense"
  },

  profissoes: [
    { id:"nenhum",     nome:"Sem perfil 🎯",          desc:"Linguagem universal" },
    { id:"medico",     nome:"Médico / Saúde 👨‍⚕️",     desc:"Diagnóstico de rota" },
    { id:"advogado",   nome:"Advogado / Jurídico ⚖️", desc:"Argumentação formal" },
    { id:"professor",  nome:"Professor 🎓",            desc:"Tom educativo e incentivo" },
    { id:"militar",    nome:"Militar 🪖",              desc:"Missão e estratégia" },
    { id:"chef",       nome:"Chef de Cozinha 👨‍🍳",     desc:"Metáforas culinárias" },
    { id:"personal",   nome:"Personal Trainer 🏋️",    desc:"Motivação e metas" },
    { id:"locutor",    nome:"Locutor de Rádio 🎙️",    desc:"Notícia ao vivo" },
    { id:"ceo",        nome:"Executivo / CEO 👨‍💼",     desc:"ROI e métricas" },
    { id:"uber",       nome:"Motorista de App 🚗",     desc:"Foco em corridas" },
    { id:"engenheiro", nome:"Engenheiro 🏗️",           desc:"Dados técnicos precisos" },
    { id:"comerciante",nome:"Comerciante 🛍️",         desc:"Foco em negócios" }
  ]
};
