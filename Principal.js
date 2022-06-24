window.addEventListener("load", function (event) {
    DesenhaTabuleiro();
    DesenhaPecasIniciais();
});

var PecasJogando = [];
var jogada = 1;
var roqueTorreBranco1 = true;
var roqueTorreBranco2 = true;
var roqueReiBranco = true;
var roqueTorrePreto1 = true;
var roqueTorrePreto2 = true;
var roqueReiPreto = true;
var validaCaminho = 0;
var caminhoInimigo = [];
xeque = false;


//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function DesenhaTabuleiro() {

    var tabuleiro = '';

    var casa = 0;

    for (linhas = 0; linhas < 8; linhas++) {
        tabuleiro += `<tr>`;
        if (linhas % 2 != 0) {
            for (colunas = 0; colunas < 8; colunas++) {
                casa++;
                if (colunas % 2 == 0) {
                    tabuleiro += `<th class="casaPreta"  id="${casa}"><input type="button"  class="semCaminho" value=""/></th>`;
                }
                else {
                    tabuleiro += `<th class="casaBranca" id="${casa}"><input type="button"  class="semCaminho" value=""/></th>`;
                }
            }

        }

        else {
            for (colunas = 0; colunas < 8; colunas++) {
                casa++;
                if (colunas % 2 == 0) {
                    tabuleiro += `<th class="casaBranca" id="${casa}"><input type="button"  class="semCaminho" value=""/></th>`;
                }
                else {
                    tabuleiro += `<th class="casaPreta" id="${casa}"><input type="button"  class="semCaminho" value=""/></th>`;
                }
            }

        }

        tabuleiro += `</tr>`;
        document.getElementById('tabuleiro').innerHTML = tabuleiro;

    }

};

function DesenhaPecasIniciais() {

    //Peças Brancas
    PecasJogando.push(PeaoBranco1 = new Peca('PeaoBranco1', 49));
    PecasJogando.push(PeaoBranco2 = new Peca('PeaoBranco2', 50));
    PecasJogando.push(PeaoBranco3 = new Peca('PeaoBranco3', 51));
    PecasJogando.push(PeaoBranco4 = new Peca('PeaoBranco4', 52));
    PecasJogando.push(PeaoBranco5 = new Peca('PeaoBranco5', 53));
    PecasJogando.push(PeaoBranco6 = new Peca('PeaoBranco6', 54));
    PecasJogando.push(PeaoBranco7 = new Peca('PeaoBranco7', 55));
    PecasJogando.push(PeaoBranco8 = new Peca('PeaoBranco8', 56));
    PecasJogando.push(TorreBranco1 = new Peca('TorreBranco1', 57));
    PecasJogando.push(CavaloBranco1 = new Peca('CavaloBranco1', 58));
    PecasJogando.push(BispoBranco1 = new Peca('BispoBranco1', 59));
    PecasJogando.push(RainhaBranco1 = new Peca('RainhaBranco1', 60));
    PecasJogando.push(BispoBranco2 = new Peca('BispoBranco2', 62));
    PecasJogando.push(CavaloBranco2 = new Peca('CavaloBranco2', 63));
    PecasJogando.push(TorreBranco2 = new Peca('TorreBranco2', 64));
    PecasJogando.push(ReiBranco1 = new Peca('ReiBranco1', 61));

    //Peças Pretas
    PecasJogando.push(PeaoPreto1 = new Peca('PeaoPreto1', 9));
    PecasJogando.push(PeaoPreto2 = new Peca('PeaoPreto2', 10));
    PecasJogando.push(PeaoPreto3 = new Peca('PeaoPreto3', 11));
    PecasJogando.push(PeaoPreto4 = new Peca('PeaoPreto4', 12));
    PecasJogando.push(PeaoPreto5 = new Peca('PeaoPreto5', 13));
    PecasJogando.push(PeaoPreto6 = new Peca('PeaoPreto6', 14));
    PecasJogando.push(PeaoPreto7 = new Peca('PeaoPreto7', 15));
    PecasJogando.push(PeaoPreto8 = new Peca('PeaoPreto8', 16));
    PecasJogando.push(TorrePreto1 = new Peca('TorrePreto1', 1));
    PecasJogando.push(CavaloPreto1 = new Peca('CavaloPreto1', 2));
    PecasJogando.push(BispoPreto1 = new Peca('BispoPreto1', 3));
    PecasJogando.push(RainhaPreto1 = new Peca('RainhaPreto1', 4));
    PecasJogando.push(BispoPreto2 = new Peca('BispoPreto2', 6));
    PecasJogando.push(CavaloPreto2 = new Peca('CavaloPreto2', 7));
    PecasJogando.push(TorrePreto2 = new Peca('TorrePreto2', 8));
    PecasJogando.push(ReiPreto1 = new Peca('ReiPreto1', 5));

};

function DesenhaPecasJogando() {
    DesenhaTabuleiro();
    for (const property in PecasJogando) {
        PecasJogando[property].DesenhaPeca();
    }
    if (xeque) {
        Xeque();
    };
};

function CaminhoPeca(nome, posicao) {

    DesenhaPecasJogando();
    nomeBusca = nome.toLowerCase();
    meuTime = '';
    vez = '';
    casasLivres = [];
    casasInimigas = [];
    casasInimigasNoCaminho = [];
    casasAmigas = [];
    casasOcupadas = [];
    casasAmeacadas = [];
    parar = false;



    //valida de quem é a vez de jogar
    if (nomeBusca.includes("branco")) { meuTime = 'branco'; }
    else if (nomeBusca.includes("preto")) { meuTime = 'preto'; }

    if (jogada % 2 != 0) { vez = 'branco' }
    else { vez = 'preto' };


    //valida as posições das peças no tabuleiro

    for (const property in PecasJogando) {

        casaInimiga = `${PecasJogando[property].nome} `;
        casaInimiga = casaInimiga.toLowerCase();
        casasOcupadas.push(PecasJogando[property].posicao);
        if (!casaInimiga.includes(meuTime)) { casasInimigas.push(PecasJogando[property].posicao) }
        else { casasAmigas.push(PecasJogando[property].posicao) }

    }



    //valida casas livres
    function ValidaCasasGeral() {
        if (casasAmigas.indexOf(c) >= 0) {
            casasAmeacadas.push(`${c} `);
            if (posicao != c) {
                parar = true;
                return parar;
            }
        }
        else if (casasInimigas.indexOf(c) >= 0) {
            casasAmeacadas.push(`${c} `);
            casasInimigasNoCaminho.push(`${c} `);
            //console.log(c);
            parar = true;
            return parar;



        }
        casasLivres.push(`${c} `);
    }

    function ValidaCaminhoPeao() {


        if (casasAmigas.indexOf(c) >= 0) {
            if (posicao != c) {
                parar = true;
                return parar;
            }
        }
        else if (casasInimigas.indexOf(c) >= 0) {
            parar = true;
            return parar;
        }
        casasLivres.push(`${c} `);
    }

    function ValidaCapturaPeao() {
        if (casasInimigas.indexOf(c) >= 0) {
            casasInimigasNoCaminho.push(`${c} `);
        }
        else {
            casasAmeacadas.push(`${c} `)
        }
    }

    function ValidaRotasInimigas() {
        for (c = 65; c >= 0; c--) {
            if (casasLivres.includes(`${c} `) && c != posicao) {
                caminhoInimigo.push(c);
            }
            else if (casasAmeacadas.includes(`${c} `) && c != posicao) {
                caminhoInimigo.push(c);
            }

        }
    }

    //desenha casas livres 
    function DesenhaCasasPossiveis() {
        for (c = 64; c > 0; c--) {
            if (casasLivres.includes(`${c} `)) {
                document.getElementById(c).innerHTML = `<input type = "button"  onclick = "${nome}.MovePeca(${c})" class="caminho" />`;
            }
            else if (casasInimigasNoCaminho.includes(`${c} `)) {


                imgCapturada = '';
                for (const property in PecasJogando) {
                    if (PecasJogando[property].posicao == c) { imgCapturada = PecasJogando[property].tipoPeca }
                };
                document.getElementById(c).innerHTML = `<canvas onclick = "CapturaPeca(${posicao},${c})" class="pecaInimiga" id = "${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" width="65" height="85"></canvas> `;
                DesenhaTipo(document.getElementById(c).children[0].id);



            }
        }
    }

    function DesenhaCasasPossiveisPeao() {

        for (c = 64; c > 0; c--) {
            if (casasLivres.includes(`${c} `)) {
                if (c <= 8 || c >= 57) {
                    document.getElementById(c).innerHTML = `<input type = "button"  onclick = "PromocaoPeao(${posicao}, ${c});" class="caminho" /> `;
                }
                else {
                    document.getElementById(c).innerHTML = `<input type = "button"  onclick = "${nome}.MovePeca(${c})" class="caminho" /> `;
                }
            }
            else if (casasInimigasNoCaminho.includes(`${c} `)) {

                imgCapturada = '';
                for (const property in PecasJogando) {
                    if (PecasJogando[property].posicao == c) { imgCapturada = PecasJogando[property].tipoPeca }
                };
                if (c <= 8 || c >= 57) {
                    document.getElementById(c).innerHTML = `<canvas onclick = "CapturaPecaComPromocao(${posicao},${c})" class="pecaInimiga" id = "${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" width="65" height="85"></canvas> `;
                    DesenhaTipo(document.getElementById(c).children[0].id);

                }
                else {
                    document.getElementById(c).innerHTML = `<canvas onclick = "CapturaPeca(${posicao},${c})" class="pecaInimiga" id = "${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" width="65" height="85"></canvas> `;
                    DesenhaTipo(document.getElementById(c).children[0].id);

                }
            }
        }

    }

    //valida os movimentos de cada peça

    if (nomeBusca.includes("peaobranco") && !xeque) {

        //valida movimento
        parar = false;
        for (c = posicao; c > 0; c--) {
            if (c >= 32) {
                if (c == (posicao - 8) || c == (posicao - 16)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }
            }
            else {
                if (c == (posicao - 8)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }

            }
        }

        //valida captura
        parar = false;

        for (c = posicao; c > 0; c--) {

            //primeira coluna
            if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {
                if (c == (posicao - 7)) {
                    ValidaCapturaPeao()
                }

            }

            //ultima coluna
            else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                if (c == (posicao - 9)) {

                    ValidaCapturaPeao()
                }

            }

            //geral
            else {
                if (c == (posicao - 7) || c == (posicao - 9)) {

                    ValidaCapturaPeao()
                }
            }

        }

        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveisPeao()
        }
        else {
            for (c = 65; c >= 0; c--) {
                if (casasAmeacadas.includes(`${c} `) && c != posicao) {
                    caminhoInimigo.push(c);
                }
            }
        }


    }

    if (nomeBusca.includes("peaopreto")) {



        //valida movimento
        parar = false;
        for (c = posicao; c <= 64; c++) {
            if (c <= 32) {
                if (c == (posicao + 8) || c == (posicao + 16)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }
            }
            else {
                if (c == (posicao + 8)) {
                    ValidaCaminhoPeao()
                    if (parar) { break }
                }

            }
        }

        //valida captura
        for (c = posicao; c <= 64; c++) {

            //primeira coluna
            if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {
                if (c == (posicao + 9)) {
                    ValidaCapturaPeao()
                }

            }

            //ultima coluna
            else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                if (c == (posicao + 7)) {
                    ValidaCapturaPeao()
                }

            }
            //geral
            else {


                if (c == (posicao + 7) || c == (posicao + 9)) {

                    ValidaCapturaPeao()
                }
            }
        }
        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveisPeao()
        }
        else {
            for (c = 65; c >= 0; c--) {
                if (casasAmeacadas.includes(`${c} `) && c != posicao) {
                    caminhoInimigo.push(c);
                }
            }
        }

    }

    if (nomeBusca.includes("rei")) {
        if (vez == meuTime) {

            function ValidaCasasRei() {
                if (caminhoInimigo.indexOf(c) >= 0) {

                }
                else if (casasInimigas.indexOf(c) >= 0) {
                    casasInimigasNoCaminho.push(`${c} `);
                }
                else if (casasAmigas.indexOf(c) < 0) {
                    casasLivres.push(`${c} `);
                }

            }

            ValidaCaminhosInimigos(meuTime);

            var casasLivres = [];
            var casasInimigas = [];
            var casasInimigasNoCaminho = [];
            var casasAmigas = [];

            for (const property in PecasJogando) {
                casaInimiga = `${PecasJogando[property].nome} `;
                casaInimiga = casaInimiga.toLowerCase();
                if (!casaInimiga.includes(meuTime)) { casasInimigas.push(PecasJogando[property].posicao) }
                else { casasAmigas.push(PecasJogando[property].posicao) }
            };


            for (c = 64; c > 0; c--) {

                //primeira coluna
                if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {

                    if (c == (posicao - 8) || c == (posicao - 7)) {
                        ValidaCasasRei()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9)) {
                        ValidaCasasRei()
                    }
                }

                //ultima coluna
                else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9)) {
                        ValidaCasasRei()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 7)) {
                        ValidaCasasRei()
                    }


                }

                //geral
                else {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9) || c == (posicao - 7)) {
                        ValidaCasasRei()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9) || c == (posicao + 7)) {
                        ValidaCasasRei()
                    }
                }
            }

            //roque
            if (posicao == 5 || posicao == 61) {

                //direita
                linhaDireita = 0;
                linhaEsquerda = 0;
                direitaLivre = 0;
                esquerdaLivre = 0;

                if (posicao == 5) { linhaDireita = 1; }
                else if (posicao == 61) { linhaDireita = 8; }

                for (c = posicao; c <= (8 * linhaDireita); c++) {
                    if (casasOcupadas.includes(c + 1)) { direitaLivre++ };
                    if (casasOcupadas.includes(c + 2)) { direitaLivre++ };
                    if (meuTime == 'branco' && !PecasJogando.includes(TorreBranco2)) { direitaLivre++ };
                    if (meuTime == 'preto' && !PecasJogando.includes(TorrePreto2)) { direitaLivre++ };
                    if (direitaLivre == 0) {
                        if (roqueTorreBranco2 && roqueReiBranco && meuTime == 'branco') {
                            document.getElementById(63).innerHTML = `<input type = "button"  onclick = "fazRoque('63')" class="caminho" /> `;
                        }
                        if (roqueTorrePreto2 && roqueReiPreto && meuTime == 'preto') {
                            document.getElementById(7).innerHTML = `<input type = "button"  onclick = "fazRoque('7')" class="caminho" /> `;
                        }
                    }
                }


                for (c = posicao; (8 * linhaEsquerda) < c; c--) {
                    if (casasOcupadas.includes(c - 1)) { esquerdaLivre++ };
                    if (casasOcupadas.includes(c - 2)) { esquerdaLivre++ };
                    if (casasOcupadas.includes(c - 3)) { esquerdaLivre++ };
                    if (!PecasJogando.includes(TorreBranco1)) { direitaLivre++ };
                    if (esquerdaLivre == 0) {
                        if (roqueTorreBranco1 && roqueReiBranco && meuTime == 'branco') {
                            document.getElementById(59).innerHTML = `<input type = "button"  onclick = "fazRoque('59')" class="caminho" /> `;
                        }
                        if (roqueTorrePreto1 && roqueReiPreto && meuTime == 'preto') {
                            document.getElementById(3).innerHTML = `<input type = "button"  onclick = "fazRoque('3')" class="caminho" /> `;
                        }
                    }
                }

            }

            //desenha casas livres
            DesenhaCasasPossiveis();
        }
        else {

            function ValidaCasasReiInimigo() {
                if (casasInimigas.indexOf(c) >= 0) {
                    casasInimigasNoCaminho.push(`${c} `);
                }
                else if (casasAmigas.indexOf(c) < 0) {
                    casasLivres.push(`${c} `);
                }

            }

            for (c = 64; c > 0; c--) {

                //primeira coluna
                if (posicao == 1 || posicao == 9 || posicao == 17 || posicao == 25 || posicao == 33 || posicao == 41 || posicao == 49 || posicao == 57) {

                    if (c == (posicao - 8) || c == (posicao - 7)) {
                        ValidaCasasReiInimigo()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9)) {
                        ValidaCasasReiInimigo()
                    }
                }

                //ultima coluna
                else if (posicao == 8 || posicao == 16 || posicao == 24 || posicao == 32 || posicao == 40 || posicao == 48 || posicao == 56 || posicao == 64) {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9)) {
                        ValidaCasasReiInimigo()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 7)) {
                        ValidaCasasReiInimigo()
                    }


                }

                //geral
                else {
                    if (c == (posicao - 8) || c == (posicao - 1) || c == (posicao - 9) || c == (posicao - 7)) {
                        ValidaCasasReiInimigo()
                    }
                    else if (c == (posicao + 8) || c == (posicao + 1) || c == (posicao + 9) || c == (posicao + 7)) {
                        ValidaCasasReiInimigo()
                    }
                }
            }

            for (c = 65; c >= 0; c--) {
                if (casasLivres.includes(`${c} `) && c != posicao) {
                    caminhoInimigo.push(c);
                }
            }

        }


    }

    if (nomeBusca.includes("bispo")) {

        var corCasa = document.getElementById(posicao).className;

        //diagonal superior direita
        parar = false;
        for (c = posicao; c > 0; c = c - 7) {
            if (posicao == 64) { break }

            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }

            }
        }

        //diagonal superior esquerda
        parar = false;
        for (c = posicao; c > 0; c = c - 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }

        //diagonal inferior direita
        parar = false;
        for (c = posicao; c < 65; c = c + 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }

        //diagonal inferior esquerda
        parar = false;
        for (c = posicao; c < 65; c = c + 7) {
            if (posicao == 1) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }

        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveis()
            //ValidaCasasGeral()
        }

        else {
            ValidaRotasInimigas()
        }
    }

    if (nomeBusca.includes("cavalo")) {



        var primeiraColuna = [1, 9, 17, 25, 33, 41, 49, 57];
        var segundaColuna = [2, 10, 18, 26, 34, 42, 50, 58];
        var ultimaColuna = [8, 16, 24, 32, 40, 48, 56, 64];
        var penultimaColuna = [7, 15, 23, 31, 39, 47, 55, 63];

        //primeira coluna
        if (primeiraColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 6) || c == (posicao + 10) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }

        }
        //segunda coluna
        else if (segundaColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {

                if (c == (posicao - 15) || c == (posicao - 17) || c == (posicao - 6) || c == (posicao + 10) || c == (posicao + 15) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        //penultima coluna
        else if (penultimaColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {

                if (c == (posicao - 15) || c == (posicao - 17) || c == (posicao - 10) || c == (posicao + 6) || c == (posicao + 15) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        //ultima coluna
        else if (ultimaColuna.includes(posicao)) {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 17) || c == (posicao - 10) || c == (posicao + 6) || c == (posicao + 15)) {
                    ValidaCasasGeral()
                }
            }
        }
        //geral
        else {
            for (c = 64; c > 0; c--) {
                if (c == (posicao - 15) || c == (posicao - 17) || c == (posicao - 6) || c == (posicao + 10) || c == (posicao - 10) || c == (posicao + 6) || c == (posicao + 15) || c == (posicao + 17)) {
                    ValidaCasasGeral()
                }
            }
        }
        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }

    };

    if (nomeBusca.includes("torre")) {



        //reta superior
        parar = false;
        for (c = posicao - 8; c > 0; c = c - 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }

        //reta inferior
        parar = false;
        for (c = posicao + 8; c < 65; c = c + 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }

        //direita
        linhaDireita = 0;

        if (posicao > 0 && posicao < 9) { linhaDireita = 1; }
        else if (posicao < 17) { linhaDireita = 2; }
        else if (posicao < 25) { linhaDireita = 3; }
        else if (posicao < 33) { linhaDireita = 4; }
        else if (posicao < 41) { linhaDireita = 5; }
        else if (posicao < 49) { linhaDireita = 6; }
        else if (posicao < 57) { linhaDireita = 7; }
        else if (posicao < 65) { linhaDireita = 8; };

        parar = false;
        for (c = posicao + 1; c <= (8 * linhaDireita); c++) {
            ValidaCasasGeral()
            if (parar) { break }
        }

        //esquerda
        linhaEsquerda = 0;

        if (posicao > 0 && posicao < 9) { linhaEsquerda = 0; }
        else if (posicao < 17) { linhaEsquerda = 1; }
        else if (posicao < 25) { linhaEsquerda = 2; }
        else if (posicao < 33) { linhaEsquerda = 3; }
        else if (posicao < 41) { linhaEsquerda = 4; }
        else if (posicao < 49) { linhaEsquerda = 5; }
        else if (posicao < 57) { linhaEsquerda = 6; }
        else if (posicao < 65) { linhaEsquerda = 7; };;

        parar = false;
        for (c = posicao - 1; (8 * linhaEsquerda) < c; c--) {

            ValidaCasasGeral()
            if (parar) { break }

        }

        if (vez == meuTime) {
            //desenha casas livres
            DesenhaCasasPossiveis()
        }
        else {
            ValidaRotasInimigas()
        }


    };

    if (nomeBusca.includes("rainha")) {

        var corCasa = document.getElementById(posicao).className;

        //diagonal superior direita
        parar = false;
        for (c = posicao; c > 0; c = c - 7) {
            if (posicao == 64) { break }

            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }

            }
        }

        //diagonal superior esquerda
        parar = false;
        for (c = posicao; c > 0; c = c - 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }

        //diagonal inferior direita
        parar = false;
        for (c = posicao; c < 65; c = c + 9) {
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }

        //diagonal inferior esquerda
        parar = false;
        for (c = posicao; c < 65; c = c + 7) {
            if (posicao == 1) { break }
            var corCaminho = document.getElementById(c).className;
            if (corCaminho == corCasa && posicao != c) {
                ValidaCasasGeral()
                if (parar) { break }
            }
        }


        //reta superior
        parar = false;
        for (c = posicao - 8; c > 0; c = c - 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }

        //reta inferior
        parar = false;
        for (c = posicao + 8; c < 65; c = c + 8) {
            ValidaCasasGeral()
            if (parar) { break }
        }

        //direita
        linhaDireita = 0;

        if (posicao > 0 && posicao < 9) { linhaDireita = 1; }
        else if (posicao < 17) { linhaDireita = 2; }
        else if (posicao < 25) { linhaDireita = 3; }
        else if (posicao < 33) { linhaDireita = 4; }
        else if (posicao < 41) { linhaDireita = 5; }
        else if (posicao < 49) { linhaDireita = 6; }
        else if (posicao < 57) { linhaDireita = 7; }
        else if (posicao < 65) { linhaDireita = 8; };

        parar = false;
        for (c = posicao + 1; c <= (8 * linhaDireita); c++) {
            ValidaCasasGeral()
            if (parar) { break }
        }

        //esquerda
        linhaEsquerda = 0;

        if (posicao > 0 && posicao < 9) { linhaEsquerda = 0; }
        else if (posicao < 17) { linhaEsquerda = 1; }
        else if (posicao < 25) { linhaEsquerda = 2; }
        else if (posicao < 33) { linhaEsquerda = 3; }
        else if (posicao < 41) { linhaEsquerda = 4; }
        else if (posicao < 49) { linhaEsquerda = 5; }
        else if (posicao < 57) { linhaEsquerda = 6; }
        else if (posicao < 65) { linhaEsquerda = 7; };;

        parar = false;
        for (c = posicao - 1; (8 * linhaEsquerda) < c; c--) {

            ValidaCasasGeral()
            if (parar) { break }

        }


        //desenha casas livres
        if (vez == meuTime) {
            DesenhaCasasPossiveis()
        }

        else {
            ValidaRotasInimigas()
        }

    }



};

function CapturaPeca(ataque, defesa) {

    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == defesa) {
            pecaCapturada = PecasJogando[property];
        }
        else if (PecasJogando[property].posicao == ataque) {
            pecaCapturante = PecasJogando[property];
        }

    }

    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    const index2 = PecasJogando.indexOf(pecaCapturante);
    nomeAtacante = document.getElementById(ataque).children[0].id;

    pecaCapturante.MovePeca(defesa);

}

function CapturaPecaComPromocao(ataque, defesa) {

    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == defesa) {
            pecaCapturada = PecasJogando[property];
        }
        else if (PecasJogando[property].posicao == ataque) {
            pecaCapturante = PecasJogando[property];
        }

    }

    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);
    const index2 = PecasJogando.indexOf(pecaCapturante);
    nomeAtacante = document.getElementById(ataque).children[0].id;

    PromocaoPeao(ataque, defesa);

}

function PromocaoPeao(de, para) {

    document.getElementById('promocao').style.display = 'block';
    var imgCapturada = '';
    if (meuTime == 'branco') { imgCapturada = 'Branco' }
    else { imgCapturada = 'Preto' }

    //  document.getElementById('promocao').innerHTML = `<img src = "links/img/cavalo${imgCapturada}.png"  onclick = "viraCavalo(${de}, ${para})" class="promocao${imgCapturada}" value = "Cavalo" /> `;

    document.getElementById('promocao').innerHTML = `<canvas onclick = "viraCavalo(${de}, ${para})" class="promocao${imgCapturada}" id = "cavalo${imgCapturada}" value = "Cavalo" width="65" height="85"></canvas> `;
    document.getElementById('promocao').innerHTML += `<canvas onclick = "viraBispo(${de}, ${para})" class="promocao${imgCapturada}" id = "bispo${imgCapturada}" value = "Bispo" width="65" height="85"></canvas> `;
    document.getElementById('promocao').innerHTML += `<canvas onclick = "viraTorre(${de}, ${para})" class="promocao${imgCapturada}" id = "torre${imgCapturada}" value = "Torre" width="65" height="85"></canvas> `;
    document.getElementById('promocao').innerHTML += `<canvas onclick = "viraRainha(${de}, ${para})" class="promocao${imgCapturada}" id = "rainha${imgCapturada}" value = "Rainha" width="65" height="85"></canvas> `;


    DesenhaTipo(`cavalo${imgCapturada}`);
    DesenhaTipo(`bispo${imgCapturada}`);
    DesenhaTipo(`torre${imgCapturada}`);
    DesenhaTipo(`rainha${imgCapturada}`);


    //document.getElementById(c).innerHTML = `<canvas onclick = "CapturaPeca(${posicao},${c})" class="pecaInimiga" id = "${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" width="65" height="85"></canvas> `;
    //DesenhaTipo(document.getElementById(c).children[0].id);
    /*
    
        document.getElementById('promocao').innerHTML += `<img src = "links/img/bispo${imgCapturada}.png"  onclick = "viraBispo(${de}, ${para})" class="promocao${imgCapturada}" value = "Bispo" /> `;
    
        document.getElementById('promocao').innerHTML += `<img src = "links/img/torre${imgCapturada}.png"  onclick = "viraTorre(${de}, ${para})" class="promocao${imgCapturada}" value = "Torre" /> `;
    
        document.getElementById('promocao').innerHTML += `<img src = "links/img/rainha${imgCapturada}.png"  onclick = "viraRainha(${de}, ${para})" class="promocao${imgCapturada}" value = "Rainha" /> `;
    */
}

function viraCavalo(de, para) {

    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }

    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);

    var time = `${pecaCapturada.nome}`;

    time = time.toLowerCase();

    if (time.includes('branco')) {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(CavaloBrancoA = new Peca('CavaloBrancoA', para));
                break;
            case '2':
                PecasJogando.unshift(CavaloBrancoB = new Peca('CavaloBrancoB', para));
                break;
            case '3':
                PecasJogando.unshift(CavaloBrancoC = new Peca('CavaloBrancoC', para));
                break;
            case '4':
                PecasJogando.unshift(CavaloBrancoD = new Peca('CavaloBrancoD', para));
                break;
            case '5':
                PecasJogando.unshift(CavaloBrancoE = new Peca('CavaloBrancoE', para));
                break;
            case '6':
                PecasJogando.unshift(CavaloBrancoF = new Peca('CavaloBrancoF', para));
                break;
            case '7':
                PecasJogando.unshift(CavaloBrancoG = new Peca('CavaloBrancoG', para));
                break;
            case '8':
                PecasJogando.unshift(CavaloBrancoH = new Peca('CavaloBrancoH', para));
                break;
            default:
                break;

        }

    }
    else {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(CavaloPretoA = new Peca('CavaloPretoA', para));
                break;
            case '2':
                PecasJogando.unshift(CavaloPretoB = new Peca('CavaloPretoB', para));
                break;
            case '3':
                PecasJogando.unshift(CavaloPretoC = new Peca('CavaloPretoC', para));
                break;
            case '4':
                PecasJogando.unshift(CavaloPretoD = new Peca('CavaloPretoD', para));
                break;
            case '5':
                PecasJogando.unshift(CavaloPretoE = new Peca('CavaloPretoE', para));
                break;
            case '6':
                PecasJogando.unshift(CavaloPretoF = new Peca('CavaloPretoF', para));
                break;
            case '7':
                PecasJogando.unshift(CavaloPretoG = new Peca('CavaloPretoG', para));
                break;
            case '8':
                PecasJogando.unshift(CavaloPretoH = new Peca('CavaloPretoH', para));
                break;
            default:
                break;

        }
    }
    DesenhaPecasJogando();

    jogada++;

    document.getElementById('promocao').style.display = 'none';


};

function viraBispo(de, para) {

    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }

    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);

    var time = `${pecaCapturada.nome}`;

    time = time.toLowerCase();

    if (time.includes('branco')) {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(BispoBrancoA = new Peca('BispoBrancoA', para));
                break;
            case '2':
                PecasJogando.unshift(BispoBrancoB = new Peca('BispoBrancoB', para));
                break;
            case '3':
                PecasJogando.unshift(BispoBrancoC = new Peca('BispoBrancoC', para));
                break;
            case '4':
                PecasJogando.unshift(BispoBrancoD = new Peca('BispoBrancoD', para));
                break;
            case '5':
                PecasJogando.unshift(BispoBrancoE = new Peca('BispoBrancoE', para));
                break;
            case '6':
                PecasJogando.unshift(BispoBrancoF = new Peca('BispoBrancoF', para));
                break;
            case '7':
                PecasJogando.unshift(BispoBrancoG = new Peca('BispoBrancoG', para));
                break;
            case '8':
                PecasJogando.unshift(BispoBrancoH = new Peca('BispoBrancoH', para));
                break;
            default:
                break;

        }

    }
    else {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(BispoPretoA = new Peca('BispoPretoA', para));
                break;
            case '2':
                PecasJogando.unshift(BispoPretoB = new Peca('BispoPretoB', para));
                break;
            case '3':
                PecasJogando.unshift(BispoPretoC = new Peca('BispoPretoC', para));
                break;
            case '4':
                PecasJogando.unshift(BispoPretoD = new Peca('BispoPretoD', para));
                break;
            case '5':
                PecasJogando.unshift(BispoPretoE = new Peca('BispoPretoE', para));
                break;
            case '6':
                PecasJogando.unshift(BispoPretoF = new Peca('BispoPretoF', para));
                break;
            case '7':
                PecasJogando.unshift(BispoPretoG = new Peca('BispoPretoG', para));
                break;
            case '8':
                PecasJogando.unshift(BispoPretoH = new Peca('BispoPretoH', para));
                break;
            default:
                break;

        }
    }

    DesenhaPecasJogando();
    jogada++;

    document.getElementById('promocao').style.display = 'none';


};

function viraTorre(de, para) {

    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }

    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);

    var time = `${pecaCapturada.nome}`;

    time = time.toLowerCase();

    if (time.includes('branco')) {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(TorreBrancoA = new Peca('TorreBrancoA', para));
                break;
            case '2':
                PecasJogando.unshift(TorreBrancoB = new Peca('TorreBrancoB', para));
                break;
            case '3':
                PecasJogando.unshift(TorreBrancoC = new Peca('TorreBrancoC', para));
                break;
            case '4':
                PecasJogando.unshift(TorreBrancoD = new Peca('TorreBrancoD', para));
                break;
            case '5':
                PecasJogando.unshift(TorreBrancoE = new Peca('TorreBrancoE', para));
                break;
            case '6':
                PecasJogando.unshift(TorreBrancoF = new Peca('TorreBrancoF', para));
                break;
            case '7':
                PecasJogando.unshift(TorreBrancoG = new Peca('TorreBrancoG', para));
                break;
            case '8':
                PecasJogando.unshift(TorreBrancoH = new Peca('TorreBrancoH', para));
                break;
            default:
                break;

        }

    }
    else {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(TorrePretoA = new Peca('TorrePretoA', para));
                break;
            case '2':
                PecasJogando.unshift(TorrePretoB = new Peca('TorrePretoB', para));
                break;
            case '3':
                PecasJogando.unshift(TorrePretoC = new Peca('TorrePretoC', para));
                break;
            case '4':
                PecasJogando.unshift(TorrePretoD = new Peca('TorrePretoD', para));
                break;
            case '5':
                PecasJogando.unshift(TorrePretoE = new Peca('TorrePretoE', para));
                break;
            case '6':
                PecasJogando.unshift(TorrePretoF = new Peca('TorrePretoF', para));
                break;
            case '7':
                PecasJogando.unshift(TorrePretoG = new Peca('TorrePretoG', para));
                break;
            case '8':
                PecasJogando.unshift(TorrePretoH = new Peca('TorrePretoH', para));
                break;
            default:
                break;

        }
    }
    DesenhaPecasJogando();
    jogada++;

    document.getElementById('promocao').style.display = 'none';


};

function viraRainha(de, para) {

    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }

    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);

    var time = `${pecaCapturada.nome}`;

    time = time.toLowerCase();

    if (time.includes('branco')) {

        num = time[time.length - 1];

        switch (num) {
            case '1':
                PecasJogando.unshift(RainhaBrancoA = new Peca('RainhaBrancoA', para));
                break;
            case '2':
                PecasJogando.unshift(RainhaBrancoB = new Peca('RainhaBrancoB', para));
                break;
            case '3':
                PecasJogando.unshift(RainhaBrancoC = new Peca('RainhaBrancoC', para));
                break;
            case '4':
                PecasJogando.unshift(RainhaBrancoD = new Peca('RainhaBrancoD', para));
                break;
            case '5':
                PecasJogando.unshift(RainhaBrancoE = new Peca('RainhaBrancoE', para));
                break;
            case '6':
                PecasJogando.unshift(RainhaBrancoF = new Peca('RainhaBrancoF', para));
                break;
            case '7':
                PecasJogando.unshift(RainhaBrancoG = new Peca('RainhaBrancoG', para));
                break;
            case '8':
                PecasJogando.unshift(RainhaBrancoH = new Peca('RainhaBrancoH', para));
                break;
            default:
                break;

        }

    }
    else {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(RainhaPretoA = new Peca('RainhaPretoA', para));
                break;
            case '2':
                PecasJogando.unshift(RainhaPretoB = new Peca('RainhaPretoB', para));
                break;
            case '3':
                PecasJogando.unshift(RainhaPretoC = new Peca('RainhaPretoC', para));
                break;
            case '4':
                PecasJogando.unshift(RainhaPretoD = new Peca('RainhaPretoD', para));
                break;
            case '5':
                PecasJogando.unshift(RainhaPretoE = new Peca('RainhaPretoE', para));
                break;
            case '6':
                PecasJogando.unshift(RainhaPretoF = new Peca('RainhaPretoF', para));
                break;
            case '7':
                PecasJogando.unshift(RainhaPretoG = new Peca('RainhaPretoG', para));
                break;
            case '8':
                PecasJogando.unshift(RainhaPretoH = new Peca('RainhaPretoH', para));
                break;
            default:
                break;

        }
    }
    DesenhaPecasJogando();
    jogada++;

    document.getElementById('promocao').style.display = 'none';


};

function fazRoque(destino) {

    if (destino == 63) {
        TorreBranco2.MovePeca(62);
        ReiBranco.MovePeca(63);
        jogada++;
    }
    else if (destino == 7) {
        TorrePreto2.MovePeca(6);
        ReiPreto.MovePeca(7);
        jogada++;
    }
    else if (destino == 59) {
        TorreBranco1.MovePeca(60);
        ReiBranco.MovePeca(59);
        jogada++;
    }
    else if (destino == 3) {
        TorrePreto1.MovePeca(4);
        ReiPreto.MovePeca(3);
        jogada++;
    }

}

function ValidaCaminhosInimigos(time) {

    caminhoInimigo = [];

    for (const property in PecasJogando) {

        if (!PecasJogando[property].nome.toLowerCase().includes(`${time}`)) {
            //console.log(PecasJogando[property].nome)
            CaminhoPeca(PecasJogando[property].nome, PecasJogando[property].posicao)

        }

    }
    meuTime = time;
};

function Xeque() {
    console.log(`Xeque! na jogada -> ${jogada} `);

}



function DesenhaTipo(nome) {

    nomeMin = nome.toLowerCase();



    if (nomeMin.includes('cavalopreto')) { RecortaImagem(`${nome}`, 1008, 1051, 75, 93) }
    else if (nomeMin.includes('peaopreto')) { RecortaImagem(`${nome}`, 1210, 1058, 70, 85) }
    else if (nomeMin.includes('peaobranco')) { RecortaImagem(`${nome}`, 1209, 864, 68, 84) }
    else if (nomeMin.includes('cavalobranco')) { RecortaImagem(`${nome}`, 1008, 855, 74, 93) }
    else if (nomeMin.includes('bispobranco')) { RecortaImagem(`${nome}`, 808, 855, 83, 104) }
    else if (nomeMin.includes('bispopreto')) { RecortaImagem(`${nome}`, 808, 1049, 82, 107) }
    else if (nomeMin.includes('torrepreto')) { RecortaImagem(`${nome}`, 619, 1051, 67, 93) }
    else if (nomeMin.includes('torrebranco')) { RecortaImagem(`${nome}`, 618, 855, 68, 93) }
    else if (nomeMin.includes('rainhapreto')) { RecortaImagem(`${nome}`, 413, 1050, 82, 95) }
    else if (nomeMin.includes('rainhabranco')) { RecortaImagem(`${nome}`, 413, 855, 82, 95) }
    else if (nomeMin.includes('reipreto')) { RecortaImagem(`${nome}`, 214, 1051, 86, 94) }
    else if (nomeMin.includes('reibranco')) { RecortaImagem(`${nome}`, 214, 855, 86, 94) }



}


function RecortaImagem(id, inicioX, incioY, largura, altura) {


    const canvas = document.getElementById(id);

    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = "links/img/novasPecas.png";
    img.onload = function () {

        sx = inicioX  //(eixo x da imagem de origem) - Este parâmetro diz de onde você deseja recortar ou começar a recortar a imagem a partir do eixo x.
        sy = incioY//eixo y da imagem de origem) - Este parâmetro diz de onde você deseja recortar ou começar a recortar a imagem a partir do eixo y.
        sWidth = largura//- A largura da imagem a partir de sx.
        sHeight = altura//- A altura da imagem a partir de sy.
        //dx = 10 //- O ponto a partir do qual começar a desenhar a imagem na tela a partir do eixo x.
        //dy = 10// - O ponto a partir do qual começar a desenhar a imagem na tela a partir do eixo y.
        dWidth = 65//- Comprimento das imagens que devem ser apresentadas no ecrã.
        dHeight = 85//- A altura das imagens que devem ser apresentadas no ecrã.

        //ctx.fillText('Smoothing = TRUE', w * 2.5, 200);
        //ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
        //ctx.drawImage(img, w, h, w, h); //desenha a imagem (variavel, posição x da imagem, posição y da imagem, escala x da imagem, escala y da imagem  )


    };

}




/*

class Peca {

// Constructor
constructor(nome, posicao) {
this.nome = nome;
this.posicao = posicao;
this.DesenhaPeca();
}

// Method
DesenhaPeca() {

var tipoPeca = this.nome.toLowerCase();


if (tipoPeca.includes("peaobranco")) {
this.tipoPeca = 'peaoBranco';
};

if (tipoPeca.includes("bispobranco")) {
this.tipoPeca = 'bispoBranco';
};

if (tipoPeca.includes("cavalobranco")) {
this.tipoPeca = 'cavaloBranco';
};

if (tipoPeca.includes("torrebranco")) {
this.tipoPeca = 'torreBranco';
};

if (tipoPeca.includes("rainhabranco")) {
this.tipoPeca = 'rainhaBranco';
};

if (tipoPeca.includes("reibranco")) {
this.tipoPeca = 'reiBranco';
};

if (tipoPeca.includes("peaopreto")) {
this.tipoPeca = 'peaoPreto';
};


if (tipoPeca.includes("bispopreto")) {
this.tipoPeca = 'bispoPreto';
};

if (tipoPeca.includes("cavalopreto")) {
this.tipoPeca = 'cavaloPreto';
};

if (tipoPeca.includes("torrepreto")) {
this.tipoPeca = 'torrePreto';
};

if (tipoPeca.includes("rainhapreto")) {
this.tipoPeca = 'rainhaPreto';
};

if (tipoPeca.includes("reipreto")) {
this.tipoPeca = 'reiPreto';
};



//input de imagem -> type="image" src="links/img/${tipoPeca}.png"

//input de tabela -> type="button" 


var desenha = `< img src = "links/img/${this.tipoPeca}.png" onclick = "CaminhoPeca('${this.nome}',${this.posicao})" class="peca" id = "${this.nome}" value = "${tipoPeca}" /> `;

document.getElementById(`${this.posicao} `).innerHTML = desenha;


};

MovePeca(destino) {

this.posicao = destino;
if (this.nome == 'TorreBranco1') { roqueTorreBranco1 = false };
if (this.nome == 'TorreBranco2') { roqueTorreBranco2 = false };
if (this.nome == 'TorrePreto1') { roqueTorrePreto1 = false };
if (this.nome == 'TorrePreto2') { roqueTorrePreto2 = false };
if (this.nome == 'ReiBranco') { roqueReiBranco = false };
if (this.nome == 'ReiPreto') { roqueReiPreto = false };
this.DesenhaPeca();
DesenhaPecasJogando();
jogada++;

}

};




/* 		AREA DE TESTE



TESTE VALIDAÇÃO DE MOVIMENTOS
 
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


for (const property in PecasJogando) {
console.log(PecasJogando[property].nome);
console.log(PecasJogando[property]);
CaminhoPeca(PecasJogando[property].nome, PecasJogando[property].posicao);
await sleep(1000);

};
console.log('fim');


TESTE RECORTE IMAGEN

const sprites = new Image();

sprites.src = src = "links/img/pecas.png";

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
console.log(contexto);
contexto.drawImage(
sprites
)



*/




