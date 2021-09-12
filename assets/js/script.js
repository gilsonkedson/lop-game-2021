let WIDTH_WINDOW = 400; // LARGURA DA TELA
let HEIGHT_WINDOW = 400; // ALTURA DA TELA
let OPCOES = ['JOGAR', 'INSTRUÇÕES', 'CRÉDITOS']; // OPÇÕES DO MENU
let FONT_COLOR = '#dcfcd4'; // COR DA FONTE
let BACKGROUND_COLOR = '#54814a'; // COR PADRÃO DO FUNDO DAS TELAS
let TELA = 1; // TELA INICIAL
let PAGINATION = 1 // PARA INSTRUÇÕES E CRÉDITOS
let MOVEX_TEXT = WIDTH_WINDOW / 2; // MOVIMENTO DO NOME DA FASE NO EIXO X
let MOVEX = 30; // MOVIMENTO DO ASTRONAUTA NO EIXO X
let STATE_ASTRONAUT = 0; // ESTADO DO ASTRONAUTA (DIREÇÃO)
let MOVEY_AS = -80 // MOVE ASTEROIDE NO EIXO Y
let POSITION_X = 50 + Math.floor(Math.random() * 330); // POSIÇÃO DO ASTEROIDE NO EIXO X
let INDICE_ASTEROIDE = Math.floor(Math.random() * 9); // INDICE PRA MOSTRAR A FOTO DO ASTEROIDE
let COLIDIU = false; // CONTROLE DE COLISÃO
let POSITION_MISSAOX = WIDTH_WINDOW / 2 + 110; // POSIÇÃO DO BOTÃO DE FECHAR DA MISSÃO
let POSITION_MISSAO_RECT_TEXT = WIDTH_WINDOW / 2; // POSIÇÃO NO EIXO X DO RETÂNGULO E O TEXTO DA MISSÃO
let FASE = 0;
var TIMERVALUE = 180;
let VIDAS = 3;
let MORREU = false;
let SONG_FAIL;
let VIDA = []
let HOVER_MUSIC;
let GANHOU_MUSIC;
let SPRITE = [],
    SONG_COLLISION = [],
    ASTEROIDES = [],
    BACKGROUND_MUSIC, BACKGROUND_IMAGE, FONTGAME, SETARIGHT, SETALEFT, MYIMAGE, SETARIGHT2, SETALEFT2, PROFIMAGE, BACKGROUND_GAME, BACKGROUND_GAME_2; // VARIAVEIS QUE TEM ARQUIVOS A SEREM CARREGADOS

function preload() {
    soundFormats('mp3', 'ogg', 'wav');
    BACKGROUND_IMAGE = loadImage('assets/images/aoinfinitoalem.jpg');
    BACKGROUND_GAME = loadImage('assets/images/parallax-space-backgound.png');
    BACKGROUND_GAME_2 = loadImage('assets/images/indigo_lf.png')
    FONTGAME = loadFont('assets/fonts/game_over.ttf');
    SETARIGHT = loadImage('assets/images/seta.png');
    SETALEFT = loadImage('assets/images/setaLEFT.png');
    MYIMAGE = loadImage('assets/images/KedsonCredito.png');
    SETARIGHT2 = loadImage('assets/images/setaBRANCO.png');
    SETALEFT2 = loadImage('assets/images/setaLEFTBRANCO.png');
    PROFIMAGE = loadImage('assets/images/fulano.png');
    SPRITE[0] = loadImage('assets/images/astronaut1.png');
    SPRITE[1] = loadImage('assets/images/astronaut2.png');
    SPRITE[2] = loadImage('assets/images/astronaut3.png');
    SPRITE[3] = loadImage('assets/images/astronaut1LEFT.png');
    SPRITE[4] = loadImage('assets/images/astronaut2LEFT.png');
    SPRITE[5] = loadImage('assets/images/astronaut3LEFT.png');
    SONG_COLLISION[0] = loadSound('assets/songs/colidiu_certo.wav');
    SONG_FAIL = loadSound('assets/songs/game_over_bad_chest.wav');
    ASTEROIDES[0] = loadImage('assets/images/asteroids/Asteroid Brown 1.png');
    ASTEROIDES[1] = loadImage('assets/images/asteroids/Asteroid Brown 2.png');
    ASTEROIDES[2] = loadImage('assets/images/asteroids/Asteroid Brown 3.png');
    ASTEROIDES[3] = loadImage('assets/images/asteroids/Asteroid Brown 4.png');
    ASTEROIDES[4] = loadImage('assets/images/asteroids/Asteroid Brown 5.png');
    ASTEROIDES[5] = loadImage('assets/images/asteroids/Asteroid Brown 6.png');
    ASTEROIDES[6] = loadImage('assets/images/asteroids/Asteroid Brown 7.png');
    ASTEROIDES[7] = loadImage('assets/images/asteroids/Asteroid Brown 8.png');
    ASTEROIDES[8] = loadImage('assets/images/asteroids/Asteroid Brown 9.png');
    VIDA[0] = loadImage('assets/images/life/hp cheio.png');
    VIDA[1] = loadImage('assets/images/life/hp perdido.png');
    BACKGROUND_MUSIC = loadSound('assets/songs/Dungeon Theme.mp3');
    MENU_MUSIC = loadSound('assets/songs/Loop-Menu.wav');
    GANHOU_MUSIC = loadSound('assets/songs/Well Done CCBY3.ogg');
}

function setup() {
    createCanvas(WIDTH_WINDOW, HEIGHT_WINDOW);
    imageMode(CENTER);
    textAlign(CENTER);
    rectMode(CENTER);
    setInterval(tempo, 1000);
}

function draw() {
    background(BACKGROUND_COLOR);
    textFont(FONTGAME);

    // APENAS AS TELAS QUE TENHAM VALORES IGUAIS A 1 E 3 MOSTRAM O BACKGROUND DO BUZZ.
    if (TELA == 1 || TELA == 3) {
        image(BACKGROUND_IMAGE, WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2);
    }
    // ---------------------------------------------------------------------------------
    // VERIFICANDO QUAL FUNÇÃO DEVE SER APRESENTADA.
    if (TELA === 1) {
        menu();
    } else if (TELA === 2) {
        if (MENU_MUSIC.isPlaying) {
            MENU_MUSIC.stop();
        }
        jogar();
    } else if (TELA === 3) {
        if (MENU_MUSIC.isPlaying) {
            MENU_MUSIC.stop();
        }
        instrucoes();
    } else if (TELA === 4) {
        if (MENU_MUSIC.isPlaying) {
            MENU_MUSIC.stop();
        }
        creditos();
    } else if (TELA === 5) {
        if (MENU_MUSIC.isPlaying) {
            MENU_MUSIC.stop();
        }
        gameover(causa_morte);
    } else if (TELA === 6) {
        if (MENU_MUSIC.isPlaying) {
            MENU_MUSIC.stop();
        }
        if (BACKGROUND_MUSIC.isPlaying) {
            BACKGROUND_MUSIC.stop();
        }
        congratulations();
    }
    // ---------------------------------------------------------------------------------
}

function menu() {
    textSize(80);
    fill(FONT_COLOR);
    noStroke();
    text('DEFINIDO & INFINITO', WIDTH_WINDOW / 2, 45);

    // APRESENTANDO AS OPÇÕES DO MENU.
    textSize(25);
    textFont('roboto');
    for (x = 0; x < 3; x++) {
        fill('#81558a');
        rect(WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2.6 + (x * 50), 180, 40);
        fill(FONT_COLOR);
        text(OPCOES[x], WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2.45 + (x * 50));
    }
    // ---------------------------------------------------------------------------------
    // HOVER DAS OPÇÕES.
    if (mouseX >= 110 && mouseX <= 290) {
        stroke('#000000');
        if (mouseY >= 134 && mouseY <= 174) {
            fill('#154049');
            rect(WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2.6, 180, 40);
            fill(FONT_COLOR);
            text(OPCOES[0], WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2.45);
        }
        if (mouseY >= 184 && mouseY <= 224) {
            fill('#154049');
            rect(WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2.6 + 50, 180, 40);
            fill(FONT_COLOR);
            text(OPCOES[1], WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2.45 + 50);
        }
        if (mouseY >= 234 && mouseY <= 274) {
            fill('#154049');
            rect(WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2.6 + 100, 180, 40);
            fill(FONT_COLOR);
            text(OPCOES[2], WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2.45 + 100);
        }
    }
    // ---------------------------------------------------------------------------------
}

function missao() {
    fill('#812F33');
    rect(POSITION_MISSAO_RECT_TEXT, HEIGHT_WINDOW / 2, 250, 150);
    textFont('roboto');
    fill("red");
    textSize(20);
    text("x", POSITION_MISSAOX, 140);
    fill(FONT_COLOR);
    if (FASE == 0) {
        text("1) Colida nos asteroides que\n dão origem a dizima simples: \n 0,333333...", POSITION_MISSAO_RECT_TEXT, HEIGHT_WINDOW / 2 - 20)
    } else if (FASE == 0.1) {
        text("2) Colida nos asteroides que\n dão origem a dizima simples: \n 1,222222...", POSITION_MISSAO_RECT_TEXT, HEIGHT_WINDOW / 2 - 20)
    }
    textFont(FONTGAME);
}

let causa_morte;

function fase() {
    if (FASE == 1) {
        textSize(40);
        text("Tempo", WIDTH_WINDOW / 2, 20);
        if (TIMERVALUE >= 10 && TIMERVALUE < 60) {
            text("0:" + TIMERVALUE, WIDTH_WINDOW / 2, 40);
        } else if (TIMERVALUE < 10) {
            text("0:0" + TIMERVALUE, WIDTH_WINDOW / 2, 40);
        } else if (TIMERVALUE >= 60 && TIMERVALUE % 60 >= 10) {
            text("0" + parseInt(TIMERVALUE / 60) + ":" + TIMERVALUE % 60, WIDTH_WINDOW / 2, 40);
        } else {
            text("0" + parseInt(TIMERVALUE / 60) + ":0" + TIMERVALUE % 60, WIDTH_WINDOW / 2, 40);
        }
        text('FASE 1', MOVEX_TEXT, HEIGHT_WINDOW / 2);
        if (!(MOVEX_TEXT == 460)) {
            MOVEX_TEXT *= 1.006;
            textSize(50);
            text('DIZIMA SIMPLES', MOVEX_TEXT, HEIGHT_WINDOW / 2 + 30);
        }

        vida();

        if (TIMERVALUE <= 0) {
            TELA = 5;
            causa_morte = "TIMER";
        } else if (MORREU) {
            TELA = 5;
            causa_morte = "VIDAS";
            MORREU = false;
        }
        if (GANHOU) {
            TELA = 6;
            GANHOU = false;
        }
    } else if (FASE == 2) {
        textSize(40);
        text("Tempo", WIDTH_WINDOW / 2, 20);
        if (TIMERVALUE >= 10 && TIMERVALUE < 60) {
            text("0:" + TIMERVALUE, WIDTH_WINDOW / 2, 40);
        } else if (TIMERVALUE < 10) {
            text("0:0" + TIMERVALUE, WIDTH_WINDOW / 2, 40);
        } else if (TIMERVALUE >= 60 && TIMERVALUE % 60 >= 10) {
            text("0" + parseInt(TIMERVALUE / 60) + ":" + TIMERVALUE % 60, WIDTH_WINDOW / 2, 40);
        } else {
            text("0" + parseInt(TIMERVALUE / 60) + ":0" + TIMERVALUE % 60, WIDTH_WINDOW / 2, 40);
        }
        text('FASE 2', MOVEX_TEXT, HEIGHT_WINDOW / 2);
        if (!(MOVEX_TEXT == 460)) {
            MOVEX_TEXT *= 1.004;
            textSize(50);
            text('DIZIMA SIMPLES MAIS DIFICIL', MOVEX_TEXT, HEIGHT_WINDOW / 2 + 30);
        }

        vida();

        if (TIMERVALUE <= 0) {
            TELA = 5;
            causa_morte = "TIMER";
        } else if (MORREU) {
            TELA = 5;
            causa_morte = "VIDAS";
            MORREU = false;
        }
        if (GANHOU) {
            TELA = 6;
            GANHOU = false;
        }
    }
}

function jogar() {
    cenario();
    missao();
    astronaut();
    colisao();
    textSize(100);
    fill(FONT_COLOR);
    fase();

    textSize(50);
    text('EXIT', 30, 30);
    text('REINICIAR', 340, 30);
}

function astronaut() {
    if (STATE_ASTRONAUT == 0) {
        image(SPRITE[0], MOVEX, HEIGHT_WINDOW / 2 + 50, 40, 40);
        if (keyCode == RIGHT_ARROW) { // MOVENDO PARA A DIREITA
            if (keyIsPressed) {
                if (MOVEX >= 30 && MOVEX <= 369) { // LIMITANDO A ÁREA DE MOVIMENTO
                    MOVEX += 2.5;
                    // LÓGICA DA SPRITE DIREITA
                    if (MOVEX % 2 != 0) {
                        image(SPRITE[1], MOVEX, HEIGHT_WINDOW / 2 + 50, 40, 40);
                    } else {
                        image(SPRITE[2], MOVEX, HEIGHT_WINDOW / 2 + 50, 40, 40);
                    }
                }
            }
        } else if (keyCode == LEFT_ARROW) {
            STATE_ASTRONAUT = 1; // ALTERANDO ESTADO
        }
    }
    // -----------------------------------------------------------------------------
    if (STATE_ASTRONAUT == 1) {
        image(SPRITE[3], MOVEX, HEIGHT_WINDOW / 2 + 50, 40, 40);
        if (keyCode == LEFT_ARROW) { // MOVENDO PARA A ESQUERDA
            if (keyIsPressed) {
                if (MOVEX >= 31 && MOVEX <= 372) { // LIMITANDO A ÁREA DE MOVIMENTO
                    MOVEX -= 2.5;
                    // LÓGICA DA SPRITE ESQUERDA
                    if (MOVEX % 2 != 0) {
                        image(SPRITE[4], MOVEX, HEIGHT_WINDOW / 2 + 50, 40, 40);
                    } else {
                        image(SPRITE[5], MOVEX, HEIGHT_WINDOW / 2 + 50, 40, 40);
                    }
                }
            }
        } else if (keyCode == RIGHT_ARROW) { // ESTADO PADRÃO
            STATE_ASTRONAUT = 0;
        }
    }
}

let RECEBIDO;

function colisao() {
    // ASTRONAUTA -> MOVEX, HEIGHT_WINDOW / 2 + 50
    // ASTEROIDE -> MOVEY_AS, POSITION_X

    ASTRONAUT_Y = HEIGHT_WINDOW / 2 + 50;

    // VERIFICANDO QUAL CORPO ESTÁ COM COORDENADA MAIOR
    if (POSITION_X > Math.floor(MOVEX)) {
        z = POSITION_X - Math.floor(MOVEX);
    } else {
        z = Math.floor(MOVEX) - POSITION_X;
    }
    // --------------------------------------------------
    // VERIFICANDO SE HOUVE COLISÃO
    if ((z >= -26 && z <= 26) && ASTRONAUT_Y === MOVEY_AS) {
        COLIDIU = true;
        MOVEY_AS = 430;
        RECEBIDO = INDICE_ASTEROIDE;
        SONG_COLLISION[0].play();
        n_colisoes++;
    } else {
        COLIDIU = false;
    }
}

colididos = [];
count = 0;

function cenario() {
    image(BACKGROUND_GAME, WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2, 400, 400);
    image(BACKGROUND_GAME_2, WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2 + 50, 400, 400);
    image(ASTEROIDES[INDICE_ASTEROIDE], POSITION_X, MOVEY_AS, 50, 50);
    //console.log(colididos)

    // MOVENDO O ASTEROIDE
    MOVEY_AS += 2.5;
    if (MOVEY_AS >= 430) {
        MOVEY_AS = -80;
        POSITION_X = 50 + Math.floor(Math.random() * 330);
        INDICE_ASTEROIDE = Math.floor(Math.random() * 9);
    }

    if (COLIDIU) {
        colididos[count] = RECEBIDO + 1;
        count++;
    }

    if (FASE == 2) {
        logic_fracao(colididos[0] + '' + colididos[1], colididos[2]);
    } else {
        logic_fracao(colididos[0], colididos[1]);
    }
    text(colididos, WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2);
}

function instrucoes() {
    noStroke();
    fill('#b4b0a5');
    rect(WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2.2, 300, 300);

    textSize(25);
    textFont('roboto');
    fill('#81558a');
    text('INSTRUÇÕES', WIDTH_WINDOW / 2, 60);

    textSize(20);

    // VERIFICANDO QUAL TEXTO DEVE SER MOSTRADO
    if (PAGINATION === 1) {
        text('8º ano do ensino fundamental I', WIDTH_WINDOW / 2, 110);
        text('(EF08MA05) Reconhecer e utilizar\n procedimentos para a obtenção de\n uma fração geratriz para uma\n dízima periódica.', WIDTH_WINDOW / 2, 150);
        image(SETARIGHT, WIDTH_WINDOW / 2, 300, 50, 50)
    } else if (PAGINATION === 2) {
        text('DEFINIDO E INFINITO é um jogo\n voltado para os alunos do 8º ano do\n ensino fundamental, o jogo tenta\n ensiná-los a reconhecer e utilizar\n procedimentos para a obtenção de\n uma fração geratriz para uma\n dízima periódica.', WIDTH_WINDOW / 2, 110);
        image(SETARIGHT, WIDTH_WINDOW / 2, 300, 50, 50)
    } else {
        textSize(22);
        text('Como jogar?', WIDTH_WINDOW / 2, 110);
        textSize(20);
        text('Utilize as setas presentes\n no seu teclado para movimentar\n o astronauta e colidir nos asteroides\n que caem até formarem uma\n determinada dizima.', WIDTH_WINDOW / 2, 140);
        image(SETARIGHT, WIDTH_WINDOW / 2, 300, 50, 50)
    }
    // ---------------------------------------------------------------------------------
    // APRESENTANDO INTERAÇÕES PARA SAIR DE INSTRUÇÕES
    voltar_and_play();
}

function creditos() {
    noStroke();
    fill(FONT_COLOR);
    textSize(42);

    // VERIFICANDO QUAL PERFIL E SETA DEVEM SER MOSTRADOS
    if (PAGINATION === 1) {
        image(MYIMAGE, WIDTH_WINDOW / 2, 120, 250, 250);
        text('GILSON KEDSON - PROGRAMADOR', WIDTH_WINDOW / 2, 220);
        image(SETARIGHT2, WIDTH_WINDOW / 2, 300, 50, 50);
    } else {
        image(PROFIMAGE, WIDTH_WINDOW / 2, 120, 150, 150);
        text('FULANO SILVA - EDUCADOR', WIDTH_WINDOW / 2, 220);
        image(SETALEFT2, WIDTH_WINDOW / 2, 300, 50, 50);
    }
    // ---------------------------------------------------------------------------------
    // APRESENTANDO INTERAÇÕES PARA SAIR DE INSTRUÇÕES
    voltar_and_play();
}

// FUNÇÃO DE APRESENTAÇÃO DAS INTERAÇÕES PARA AS TELAS 3 E 4.
function voltar_and_play() {
    textSize(60)
    fill(FONT_COLOR);
    textFont(FONTGAME);
    text('VOLTAR', 60, 380);
    text('PLAY', 350, 380);
}

// FUNÇÃO MOUSECLICKED UTILIZADA PARA VERIFICAÇÃO DAS INTERAÇÕES DO USUÁRIO COM O MOUSE.
function mouseClicked() {
    // VERIFICAÇÃO DO MENU
    if (TELA === 1) {
        if (mouseX >= 110 && mouseX <= 290) {
            if (mouseY >= 134 && mouseY <= 174) {
                TELA = 2; // PLAY
            } else if (mouseY >= 184 && mouseY <= 224) {
                TELA = 3; // INSTRUÇÕES
            } else if (mouseY >= 234 && mouseY <= 274) {
                TELA = 4; // CRÉDITOS
            }
        }
        MENU_MUSIC.play();
    }
    // ---------------------------------------------------------------------------------
    // VERIFICAÇÃO DAS INSTRUÇÕES/CRÉDITOS VOLTAR E PLAY
    if (TELA === 3 || TELA === 4) {
        if ((mouseX >= 15 && mouseX <= 105) && (mouseY >= 363 && mouseY <= 381)) { // VOLTAR
            TELA = 1; // MENU
            PAGINATION = 1;
        }
        if ((mouseX >= 321 && mouseX <= 381) && (mouseY >= 363 && mouseY <= 381)) { // PLAY
            TELA = 2; // PLAY
            PAGINATION = 1;
        }
    }
    // ---------------------------------------------------------------------------------
    // PAGINAÇÃO DE INSTRUÇÕES
    if (TELA === 3) {
        if ((mouseX >= 179 && mouseX <= 223) && (mouseY >= 278 && mouseY <= 320)) {
            if (PAGINATION === 1) {
                PAGINATION = 2;
            } else if (PAGINATION === 2) {
                PAGINATION = 3;
            } else {
                PAGINATION = 1;
            }
        }
    }
    // ---------------------------------------------------------------------------------
    // PAGINAÇÃO DOS CRÉDITOS
    if (TELA === 4) {
        if ((mouseX >= 179 && mouseX <= 223) && (mouseY >= 278 && mouseY <= 320)) {
            if (PAGINATION === 1) {
                PAGINATION = 2;
            } else {
                PAGINATION = 1;
            }
        }
    }
    if (TELA === 6) {
        if ((mouseX >= 179 && mouseX <= 223) && (mouseY >= 278 && mouseY <= 320)) {
            TELA = 2;
            FASE = 0.1;
            MOVEX = 30;
            STATE_ASTRONAUT = 0;
            keyCode = 0;
            MOVEY_AS = -80;
            POSITION_X = 50 + Math.floor(Math.random() * 330);
            MOVEX_TEXT = HEIGHT_WINDOW / 2;
            POSITION_MISSAOX = WIDTH_WINDOW / 2 + 110;
            POSITION_MISSAO_RECT_TEXT = WIDTH_WINDOW / 2;
            TIMERVALUE = 180;
            VIDAS = 3;
            controle = 1;
        }
    }
    // ---------------------------------------------------------------------------------
    // VOLTAR E REINICIAR DO JOGAR
    if ((mouseX >= 9 && mouseX <= 52) && (mouseY >= 15 && mouseY <= 29)) { // VOLTAR
        TELA = 1;
        MOVEX = 30;
        STATE_ASTRONAUT = 0;
        keyCode = 0;
        MOVEY_AS = -80;
        POSITION_X = 50 + Math.floor(Math.random() * 330);
        MOVEX_TEXT = HEIGHT_WINDOW / 2;
        POSITION_MISSAOX = WIDTH_WINDOW / 2 + 110;
        POSITION_MISSAO_RECT_TEXT = WIDTH_WINDOW / 2;
        FASE = 0;
        TIMERVALUE = 180;
        VIDAS = 3;
        controle = 1;
        SONG_FAIL.stop();
        if (BACKGROUND_MUSIC.isPlaying) {
            BACKGROUND_MUSIC.stop();
        }
        // LIMPANDO O VETOR
        reiniciar_colisao();
    } else if ((mouseX >= 291 && mouseX <= 390) && (mouseY >= 15 && mouseY <= 29)) { // REINICIAR
        MOVEX = 30;
        TELA = 2;
        STATE_ASTRONAUT = 0;
        keyCode = 0;
        MOVEY_AS = -80;
        POSITION_X = 50 + Math.floor(Math.random() * 330);
        MOVEX_TEXT = WIDTH_WINDOW / 2;
        POSITION_MISSAOX = WIDTH_WINDOW / 2 + 110;
        POSITION_MISSAO_RECT_TEXT = WIDTH_WINDOW / 2;
        FASE = 0;
        TIMERVALUE = 180;
        VIDAS = 3;
        controle = 1;
        SONG_FAIL.stop();
        if (BACKGROUND_MUSIC.isPlaying) {
            BACKGROUND_MUSIC.stop();
        }
        reiniciar_colisao();
    }
    // ---------------------------------------------------------------------------------
    // FECHANDO MENSAGEM DA MISSÃO
    if (TELA == 2 && FASE == 0) {
        if ((mouseX >= WIDTH_WINDOW / 2 + 105 && mouseX <= WIDTH_WINDOW / 2 + 115) && (mouseY >= 130 && mouseY <= 150)) {
            POSITION_MISSAOX = 1000;
            POSITION_MISSAO_RECT_TEXT = 1000;
            FASE = 1;
            MOVEY_AS = -80;
            POSITION_X = 50 + Math.floor(Math.random() * 330);
            TIMERVALUE = 180;
            VIDAS = 3;
            controle = 1;
            reiniciar_colisao();
            BACKGROUND_MUSIC.play();
        }
    } else if (TELA == 2 && FASE == 0.1) {
        if ((mouseX >= WIDTH_WINDOW / 2 + 105 && mouseX <= WIDTH_WINDOW / 2 + 115) && (mouseY >= 130 && mouseY <= 150)) {
            POSITION_MISSAOX = 1000;
            POSITION_MISSAO_RECT_TEXT = 1000;
            FASE = 2;
            MOVEY_AS = -80;
            POSITION_X = 50 + Math.floor(Math.random() * 330);
            TIMERVALUE = 180;
            VIDAS = 3;
            controle = 1;
            reiniciar_colisao();
            BACKGROUND_MUSIC.play();
        }
    }
}

function tempo() {
    if (TIMERVALUE > 0) {
        TIMERVALUE--;
    }
}

function vida() {
    if (VIDAS == 3) {
        image(VIDA[0], WIDTH_WINDOW / 2 - 50, 380, 25, 25);
        image(VIDA[0], WIDTH_WINDOW / 2, 380, 25, 25);
        image(VIDA[0], WIDTH_WINDOW / 2 + 50, 380, 25, 25);
    } else if (VIDAS == 2) {
        image(VIDA[0], WIDTH_WINDOW / 2 - 50, 380, 25, 25);
        image(VIDA[0], WIDTH_WINDOW / 2, 380, 25, 25);
        image(VIDA[1], WIDTH_WINDOW / 2 + 50, 380, 25, 25);
    } else if (VIDAS == 1) {
        image(VIDA[0], WIDTH_WINDOW / 2 - 50, 380, 25, 25);
        image(VIDA[1], WIDTH_WINDOW / 2, 380, 25, 25);
        image(VIDA[1], WIDTH_WINDOW / 2 + 50, 380, 25, 25);
    } else {
        image(VIDA[1], WIDTH_WINDOW / 2 - 50, 380, 25, 25);
        image(VIDA[1], WIDTH_WINDOW / 2, 380, 25, 25);
        image(VIDA[1], WIDTH_WINDOW / 2 + 50, 380, 25, 25);
        MORREU = true;
    }

    return MORREU;
}

function gameover(causa) {
    textSize(120);
    background('red');
    if (causa === "TIMER") {
        text("Game Over", WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2);
        text("Tempo esgotado", WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2 + 50);
    } else {
        text("Game Over", WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2);
        text("Vidas acabaram", WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2 + 50);
    }
    if (BACKGROUND_MUSIC.isPlaying()) {
        BACKGROUND_MUSIC.stop();
    }
    if (!SONG_FAIL.isPlaying()) {
        SONG_FAIL.play();
    }
    reiniciar_colisao();
    textSize(50);
    text('EXIT', 30, 30);
    text('REINICIAR', 340, 30);
}

// RESETANDO AS COLISÕES
function reiniciar_colisao() {
    while (colididos.length > 0) {
        colididos.pop();
        count = 0;
    }
}

let GANHOU;
let n_colisoes = 0;
let a;
let controle = 1;

function logic_fracao(denominador, divisor) {
    if (FASE == 1 && n_colisoes == 2) {
        a = (parseFloat(denominador / divisor).toFixed(6))
        if (parseFloat(a) == 0.333333) {
            GANHOU = true;
            n_colisoes = 0;
            reiniciar_colisao();
        } else if (controle == 1) {
            VIDAS = 2;
            controle = 2;
            n_colisoes = 0;
            reiniciar_colisao();
        } else if (controle == 2) {
            VIDAS = 1;
            controle = 3;
            n_colisoes = 0;
            reiniciar_colisao();
        } else if (controle == 3) {
            VIDAS = 0;
            controle = 4;
            n_colisoes = 0;
            reiniciar_colisao();
        }
    }
    if (FASE == 2 && n_colisoes == 3) {
        a = (parseFloat(denominador / divisor).toFixed(6))
        if (parseFloat(a) == 1.222222) {
            GANHOU = true;
            n_colisoes = 0;
            reiniciar_colisao();
        } else if (controle == 1) {
            VIDAS = 2;
            controle = 2;
            n_colisoes = 0;
            reiniciar_colisao();
        } else if (controle == 2) {
            VIDAS = 1;
            controle = 3;
            n_colisoes = 0;
            reiniciar_colisao();
        } else if (controle == 3) {
            VIDAS = 0;
            controle = 4;
            n_colisoes = 0;
            reiniciar_colisao();
        }
    }
    return GANHOU;
}

function congratulations() {
    //textSize(120);
    textSize(65);
    if (FASE == 2) {
        text("Parabéns, é isso mesmo... 11/9", WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2);
        text("VOCE VENCEU O JOGO!", WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2 + 50);
    } else {
        text("Parabéns, é isso mesmo... 1/3", WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2);
        text("Voce passou de fase", WIDTH_WINDOW / 2, HEIGHT_WINDOW / 2 + 50);
        image(SETARIGHT2, WIDTH_WINDOW / 2, 300, 50, 50);
        if (!GANHOU_MUSIC.isPlaying()) {
            GANHOU_MUSIC.play();
        }
    }
}


// ORGANIZAÇÃO TÁ TERRÍVEL