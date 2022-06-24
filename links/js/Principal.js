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
    PecasJogando.push(RainhaBranco = new Peca('RainhaBranco', 60));
    PecasJogando.push(BispoBranco2 = new Peca('BispoBranco2', 62));
    PecasJogando.push(CavaloBranco2 = new Peca('CavaloBranco2', 63));
    PecasJogando.push(TorreBranco2 = new Peca('TorreBranco2', 64));
    PecasJogando.push(ReiBranco = new Peca('ReiBranco', 61));

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
    PecasJogando.push(RainhaPreto = new Peca('RainhaPreto', 4));
    PecasJogando.push(BispoPreto2 = new Peca('BispoPreto2', 6));
    PecasJogando.push(CavaloPreto2 = new Peca('CavaloPreto2', 7));
    PecasJogando.push(TorrePreto2 = new Peca('TorrePreto2', 8));
    PecasJogando.push(ReiPreto = new Peca('ReiPreto', 5));

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
            console.log(c);
            parar = true;
            return parar;

            if (!casaInimiga.includes('rei')) {	//xeque = true;	parar = false; return parar;

            }



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
                document.getElementById(c).innerHTML = `< input type = "button"  onclick = "${nome}.MovePeca(${c})" class="caminho" /> `;
            }
            else if (casasInimigasNoCaminho.includes(`${c} `)) {
                imgCapturada = '';
                for (const property in PecasJogando) {
                    if (PecasJogando[property].posicao == c) { imgCapturada = PecasJogando[property].tipoPeca }
                };
                document.getElementById(c).innerHTML = `< input  type = "image" src = "links/img/${imgCapturada}.png" onclick = "CapturaPeca(${posicao},${c})" class="pecaInimiga" id = "${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" /> `;
            }
        }
    }

    function DesenhaCasasPossiveisPeao() {

        for (c = 64; c > 0; c--) {
            if (casasLivres.includes(`${c} `)) {
                if (c <= 8 || c >= 57) {
                    document.getElementById(c).innerHTML = `< input type = "button"  onclick = "PromocaoPeao(${posicao}, ${c});" class="caminho" /> `;
                }
                else {
                    document.getElementById(c).innerHTML = `< input type = "button"  onclick = "${nome}.MovePeca(${c})" class="caminho" /> `;
                }
            }
            else if (casasInimigasNoCaminho.includes(`${c} `)) {

                imgCapturada = '';
                for (const property in PecasJogando) {
                    if (PecasJogando[property].posicao == c) { imgCapturada = PecasJogando[property].tipoPeca }
                };
                if (c <= 8 || c >= 57) {
                    document.getElementById(c).innerHTML = `< img class="pecaInimiga" src = "links/img/${imgCapturada}.png"	  onclick = "CapturaPecaComPromocao(${posicao},${c})" class="pecaInimiga" id = "${document.getElementById(c).children[0].id}" value = "${document.getElementById(c).children[0].value}" /> `;
                }
                else {
                    document.getElementById(c).innerHTML = `< img class="pecaInimiga" src = "links/img/${imgCapturada}.png"  onclick = "CapturaPeca(${posicao},${c})" id = "${document.getElementById(c).children[0].id}" /> `;

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
                            document.getElementById(63).innerHTML = `< input type = "button"  onclick = "fazRoque('63')" class="caminho" /> `;
                        }
                        if (roqueTorrePreto2 && roqueReiPreto && meuTime == 'preto') {
                            document.getElementById(7).innerHTML = `< input type = "button"  onclick = "fazRoque('7')" class="caminho" /> `;
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
                            document.getElementById(59).innerHTML = `< input type = "button"  onclick = "fazRoque('59')" class="caminho" /> `;
                        }
                        if (roqueTorrePreto1 && roqueReiPreto && meuTime == 'preto') {
                            document.getElementById(3).innerHTML = `< input type = "button"  onclick = "fazRoque('3')" class="caminho" /> `;
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

    document.getElementById('promocao').innerHTML = `< img src = "links/img/cavalo${imgCapturada}.png"  onclick = "viraCavalo(${de}, ${para})" class="promocao${imgCapturada}" value = "Cavalo" /> `;

    document.getElementById('promocao').innerHTML += `< img src = "links/img/bispo${imgCapturada}.png"  onclick = "viraBispo(${de}, ${para})" class="promocao${imgCapturada}" value = "Bispo" /> `;

    document.getElementById('promocao').innerHTML += `< img src = "links/img/torre${imgCapturada}.png"  onclick = "viraTorre(${de}, ${para})" class="promocao${imgCapturada}" value = "Torre" /> `;

    document.getElementById('promocao').innerHTML += `< img src = "links/img/rainha${imgCapturada}.png"  onclick = "viraRainha(${de}, ${para})" class="promocao${imgCapturada}" value = "Rainha" /> `;

}

function viraCavalo(de, para) {

    for (const property in PecasJogando) {

        if (PecasJogando[property].posicao == de) {
            var pecaCapturada = PecasJogando[property];
        }
    }

    const index = PecasJogando.indexOf(pecaCapturada);
    PecasJogando.splice(index, 1);

    var time = `${pecaCapturada.nome} `;

    time = time.toLowerCase();

    if (time.includes('branco')) {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(CavaloBrancoP1 = new Peca('CavaloBrancoP1', para));
                break;
            case '2':
                PecasJogando.unshift(CavaloBrancoP2 = new Peca('CavaloBrancoP2', para));
                break;
            case '3':
                PecasJogando.unshift(CavaloBrancoP3 = new Peca('CavaloBrancoP3', para));
                break;
            case '4':
                PecasJogando.unshift(CavaloBrancoP4 = new Peca('CavaloBrancoP4', para));
                break;
            case '5':
                PecasJogando.unshift(CavaloBrancoP5 = new Peca('CavaloBrancoP5', para));
                break;
            case '6':
                PecasJogando.unshift(CavaloBrancoP6 = new Peca('CavaloBrancoP6', para));
                break;
            case '7':
                PecasJogando.unshift(CavaloBrancoP7 = new Peca('CavaloBrancoP7', para));
                break;
            case '8':
                PecasJogando.unshift(CavaloBrancoP8 = new Peca('CavaloBrancoP8', para));
                break;
            default:
                break;

        }

    }
    else {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(CavaloPretoP1 = new Peca('CavaloPretoP1', para));
                break;
            case '2':
                PecasJogando.unshift(CavaloPretoP2 = new Peca('CavaloPretoP2', para));
                break;
            case '3':
                PecasJogando.unshift(CavaloPretoP3 = new Peca('CavaloPretoP3', para));
                break;
            case '4':
                PecasJogando.unshift(CavaloPretoP4 = new Peca('CavaloPretoP4', para));
                break;
            case '5':
                PecasJogando.unshift(CavaloPretoP5 = new Peca('CavaloPretoP5', para));
                break;
            case '6':
                PecasJogando.unshift(CavaloPretoP6 = new Peca('CavaloPretoP6', para));
                break;
            case '7':
                PecasJogando.unshift(CavaloPretoP7 = new Peca('CavaloPretoP7', para));
                break;
            case '8':
                PecasJogando.unshift(CavaloPretoP8 = new Peca('CavaloPretoP8', para));
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

    var time = `${pecaCapturada.nome} `;

    time = time.toLowerCase();

    if (time.includes('branco')) {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(BispoBrancoP1 = new Peca('BispoBrancoP1', para));
                break;
            case '2':
                PecasJogando.unshift(BispoBrancoP2 = new Peca('BispoBrancoP2', para));
                break;
            case '3':
                PecasJogando.unshift(BispoBrancoP3 = new Peca('BispoBrancoP3', para));
                break;
            case '4':
                PecasJogando.unshift(BispoBrancoP4 = new Peca('BispoBrancoP4', para));
                break;
            case '5':
                PecasJogando.unshift(BispoBrancoP5 = new Peca('BispoBrancoP5', para));
                break;
            case '6':
                PecasJogando.unshift(BispoBrancoP6 = new Peca('BispoBrancoP6', para));
                break;
            case '7':
                PecasJogando.unshift(BispoBrancoP7 = new Peca('BispoBrancoP7', para));
                break;
            case '8':
                PecasJogando.unshift(BispoBrancoP8 = new Peca('BispoBrancoP8', para));
                break;
            default:
                break;

        }

    }
    else {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(BispoPretoP1 = new Peca('BispoPretoP1', para));
                break;
            case '2':
                PecasJogando.unshift(BispoPretoP2 = new Peca('BispoPretoP2', para));
                break;
            case '3':
                PecasJogando.unshift(BispoPretoP3 = new Peca('BispoPretoP3', para));
                break;
            case '4':
                PecasJogando.unshift(BispoPretoP4 = new Peca('BispoPretoP4', para));
                break;
            case '5':
                PecasJogando.unshift(BispoPretoP5 = new Peca('BispoPretoP5', para));
                break;
            case '6':
                PecasJogando.unshift(BispoPretoP6 = new Peca('BispoPretoP6', para));
                break;
            case '7':
                PecasJogando.unshift(BispoPretoP7 = new Peca('BispoPretoP7', para));
                break;
            case '8':
                PecasJogando.unshift(BispoPretoP8 = new Peca('BispoPretoP8', para));
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

    var time = `${pecaCapturada.nome} `;

    time = time.toLowerCase();

    if (time.includes('branco')) {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(TorreBrancoP1 = new Peca('TorreBrancoP1', para));
                break;
            case '2':
                PecasJogando.unshift(TorreBrancoP2 = new Peca('TorreBrancoP2', para));
                break;
            case '3':
                PecasJogando.unshift(TorreBrancoP3 = new Peca('TorreBrancoP3', para));
                break;
            case '4':
                PecasJogando.unshift(TorreBrancoP4 = new Peca('TorreBrancoP4', para));
                break;
            case '5':
                PecasJogando.unshift(TorreBrancoP5 = new Peca('TorreBrancoP5', para));
                break;
            case '6':
                PecasJogando.unshift(TorreBrancoP6 = new Peca('TorreBrancoP6', para));
                break;
            case '7':
                PecasJogando.unshift(TorreBrancoP7 = new Peca('TorreBrancoP7', para));
                break;
            case '8':
                PecasJogando.unshift(TorreBrancoP8 = new Peca('TorreBrancoP8', para));
                break;
            default:
                break;

        }

    }
    else {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(TorrePretoP1 = new Peca('TorrePretoP1', para));
                break;
            case '2':
                PecasJogando.unshift(TorrePretoP2 = new Peca('TorrePretoP2', para));
                break;
            case '3':
                PecasJogando.unshift(TorrePretoP3 = new Peca('TorrePretoP3', para));
                break;
            case '4':
                PecasJogando.unshift(TorrePretoP4 = new Peca('TorrePretoP4', para));
                break;
            case '5':
                PecasJogando.unshift(TorrePretoP5 = new Peca('TorrePretoP5', para));
                break;
            case '6':
                PecasJogando.unshift(TorrePretoP6 = new Peca('TorrePretoP6', para));
                break;
            case '7':
                PecasJogando.unshift(TorrePretoP7 = new Peca('TorrePretoP7', para));
                break;
            case '8':
                PecasJogando.unshift(TorrePretoP8 = new Peca('TorrePretoP8', para));
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

    var time = `${pecaCapturada.nome} `;

    time = time.toLowerCase();

    if (time.includes('branco')) {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(RainhaBrancoP1 = new Peca('RainhaBrancoP1', para));
                break;
            case '2':
                PecasJogando.unshift(RainhaBrancoP2 = new Peca('RainhaBrancoP2', para));
                break;
            case '3':
                PecasJogando.unshift(RainhaBrancoP3 = new Peca('RainhaBrancoP3', para));
                break;
            case '4':
                PecasJogando.unshift(RainhaBrancoP4 = new Peca('RainhaBrancoP4', para));
                break;
            case '5':
                PecasJogando.unshift(RainhaBrancoP5 = new Peca('RainhaBrancoP5', para));
                break;
            case '6':
                PecasJogando.unshift(RainhaBrancoP6 = new Peca('RainhaBrancoP6', para));
                break;
            case '7':
                PecasJogando.unshift(RainhaBrancoP7 = new Peca('RainhaBrancoP7', para));
                break;
            case '8':
                PecasJogando.unshift(RainhaBrancoP8 = new Peca('RainhaBrancoP8', para));
                break;
            default:
                break;

        }

    }
    else {

        num = time[time.length - 1];
        switch (num) {
            case '1':
                PecasJogando.unshift(RainhaPretoP1 = new Peca('RainhaPretoP1', para));
                break;
            case '2':
                PecasJogando.unshift(RainhaPretoP2 = new Peca('RainhaPretoP2', para));
                break;
            case '3':
                PecasJogando.unshift(RainhaPretoP3 = new Peca('RainhaPretoP3', para));
                break;
            case '4':
                PecasJogando.unshift(RainhaPretoP4 = new Peca('RainhaPretoP4', para));
                break;
            case '5':
                PecasJogando.unshift(RainhaPretoP5 = new Peca('RainhaPretoP5', para));
                break;
            case '6':
                PecasJogando.unshift(RainhaPretoP6 = new Peca('RainhaPretoP6', para));
                break;
            case '7':
                PecasJogando.unshift(RainhaPretoP7 = new Peca('RainhaPretoP7', para));
                break;
            case '8':
                PecasJogando.unshift(RainhaPretoP8 = new Peca('RainhaPretoP8', para));
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

        if (!PecasJogando[property].nome.toLowerCase().includes(`${time} `)) {
            CaminhoPeca(PecasJogando[property].nome, PecasJogando[property].posicao)
            //console.log(PecasJogando[property].nome)

        }

    }
    meuTime = time;
};

function Xeque() {
    console.log(`Xeque! na jogada -> ${jogada} `);

}


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




