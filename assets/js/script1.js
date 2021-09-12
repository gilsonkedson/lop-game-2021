var widthWindow = 400;
var heightWindow = 400;
var windowGame = 1;
var fontColor = '#dcfcd4';
var timerValue = 120;
var life = 3;
var x_moveAstronaut = 30;
var stateAstronaut = 0;
var x_positionAsteroid = 50 + Math.floor(Math.random() * 330);
var y_moveAsteroid = -80;
var victory = 0;
var phase = 1;
var win = false;
var lose = false,
    alive = true;
var convertion;
var asteroids = [];
var options = ['JOGAR', 'INSTRUÇÕES', 'CRÉDITOS'];
var sprite = [];
var lifeImage = [];
var collided = [],
    countCollided = 0,
    nCollided = 0;
var backgroundGame, backgroundGame2, backgroundImage, myImage, fontGame, profImage;
var controlLife = 1;
var backgroundColor = '#54814a';
var PAGINATION = 1
let INDICE_ASTEROIDE = Math.floor(Math.random() * 6);
let SETARIGHT;
let SETALEFT;
let SETARIGHT2;
let SETALEFT2;
let COLIDIU = false;
let RECEBIDO;
let POSITION_MISSAOX = widthWindow / 2 + 110; // POSIÇÃO DO BOTÃO DE FECHAR DA MISSÃO
let POSITION_MISSAO_RECT_TEXT = widthWindow / 2; // POSIÇÃO NO EIXO X DO RETÂNGULO E O TEXTO DA MISSÃO

function preload() {
    backgroundGame2 = loadImage('assets/images/indigo_lf.png');
    backgroundGame = loadImage('assets/images/parallax-space-backgound.png');
    backgroundImage = loadImage('assets/images/aoinfinitoalem.jpg');
    fontGame = loadFont('assets/fonts/game_over.ttf');
    lifeImage[0] = loadImage('assets/images/life/hp cheio.png');
    lifeImage[1] = loadImage('assets/images/life/hp perdido.png');
    sprite[0] = loadImage('assets/images/astronaut1.png');
    sprite[1] = loadImage('assets/images/astronaut2.png');
    sprite[2] = loadImage('assets/images/astronaut3.png');
    sprite[3] = loadImage('assets/images/astronaut1LEFT.png');
    sprite[4] = loadImage('assets/images/astronaut2LEFT.png');
    sprite[5] = loadImage('assets/images/astronaut3LEFT.png');
    asteroids[0] = loadImage('assets/images/asteroids/Asteroid Brown 1.png');
    asteroids[1] = loadImage('assets/images/asteroids/Asteroid Brown 2.png');
    asteroids[2] = loadImage('assets/images/asteroids/Asteroid Brown 3.png');
    asteroids[3] = loadImage('assets/images/asteroids/Asteroid Brown 5.png');
    asteroids[4] = loadImage('assets/images/asteroids/Asteroid Brown 6.png');
    asteroids[5] = loadImage('assets/images/asteroids/Asteroid Brown 7.png');
    myImage = loadImage('assets/images/KedsonCredito.png');
    profImage = loadImage('assets/images/fulano.png');
    SETARIGHT = loadImage('assets/images/seta.png');
    SETALEFT = loadImage('assets/images/setaLEFT.png');
    SETARIGHT2 = loadImage('assets/images/setaBRANCO.png');
    SETALEFT2 = loadImage('assets/images/setaLEFTBRANCO.png');
}

function setup() {
    createCanvas(widthWindow, heightWindow);
    imageMode(CENTER);
    textAlign(CENTER);
    rectMode(CENTER);
    setInterval(timerGame, 1000);
}

function draw() {
    background(backgroundColor);
    textFont(fontGame);

    // APENAS AS TELAS QUE TENHAM VALORES DIFERENTES DE 4 E 2 MOSTRAM O BACKGROUND DO BUZZ.
    if (windowGame == 1 || windowGame == 3) {
        image(backgroundImage, widthWindow / 2, heightWindow / 2);
    }
    // ---------------------------------------------------------------------------------
    // VERIFICANDO QUAL FUNÇÃO DEVE SER APRESENTADA.
    if (windowGame === 1) {
        menu();
    } else if (windowGame === 2) {
        playGame();
    } else if (windowGame === 3) {
        instructions();
    } else if (windowGame === 4) {
        credits();
    } else if (windowGame === 5) {
        gameOver(lose, alive);
    } else if (windowGame === 6) {
        congratulations();
    }
}

function menu() { // FUNÇÃO RESPONSÁVEL POR APRESENTAR O MENU DO JOGO.
    textSize(80);
    fill(fontColor);
    noStroke();
    text('DEFINIDO & INFINITO', widthWindow / 2, 45);

    // APRESENTANDO AS OPÇÕES DO MENU.
    textSize(25);
    textFont('roboto');
    for (x = 0; x < 3; x++) {
        fill('#81558a');
        rect(widthWindow / 2, heightWindow / 2.6 + (x * 50), 180, 40);
        fill(fontColor);
        text(options[x], widthWindow / 2, heightWindow / 2.45 + (x * 50));
    }
    // ---------------------------------------------------------------------------------
    // HOVER DAS OPÇÕES.
    if (mouseX >= 110 && mouseX <= 290) {
        stroke('#000000');
        if (mouseY >= 134 && mouseY <= 174) {
            fill('#154049');
            rect(widthWindow / 2, heightWindow / 2.6, 180, 40);
            fill(fontColor);
            text(options[0], widthWindow / 2, heightWindow / 2.45);
        }
        if (mouseY >= 184 && mouseY <= 224) {
            fill('#154049');
            rect(widthWindow / 2, heightWindow / 2.6 + 50, 180, 40);
            fill(fontColor);
            text(options[1], widthWindow / 2, heightWindow / 2.45 + 50);
        }
        if (mouseY >= 234 && mouseY <= 274) {
            fill('#154049');
            rect(widthWindow / 2, heightWindow / 2.6 + 100, 180, 40);
            fill(fontColor);
            text(options[2], widthWindow / 2, heightWindow / 2.45 + 100);
        }
    }
}

function playGame() { // FUNÇÃO RESPONSÁVEL POR INICIAR O JOGO.
    
    scenery();
    mission();
    astronaut();
    collision();
    fase();
    exitAndRestartText();
}

function instructions() { // FUNÇÃO RESPONSÁVEL POR APRESENTAR AS INSTRUÇÕES DO JOGO.
    noStroke();
    fill('#b4b0a5');
    rect(widthWindow / 2, heightWindow / 2.2, 300, 300);

    textSize(25);
    textFont('roboto');
    fill('#81558a');
    text('INSTRUÇÕES', widthWindow / 2, 60);

    textSize(20);

    // VERIFICANDO QUAL TEXTO DEVE SER MOSTRADO
    if (PAGINATION === 1) {
        text('8º ano do ensino fundamental I', widthWindow / 2, 110);
        text('(EF08MA05) Reconhecer e utilizar\n procedimentos para a obtenção de\n uma fração geratriz para uma\n dízima periódica.', widthWindow / 2, 150);
        image(SETARIGHT, widthWindow / 2, 300, 50, 50)
    } else if (PAGINATION === 2) {
        text('DEFINIDO E INFINITO é um jogo\n voltado para os alunos do 8º ano do\n ensino fundamental, o jogo tenta\n ensiná-los a reconhecer e utilizar\n procedimentos para a obtenção de\n uma fração geratriz para uma\n dízima periódica.', widthWindow / 2, 110);
        image(SETARIGHT, widthWindow / 2, 300, 50, 50)
    } else {
        textSize(22);
        text('Como jogar?', widthWindow / 2, 110);
        textSize(20);
        text('Utilize as setas presentes\n no seu teclado para movimentar\n o astronauta (INCOMPLETO)', widthWindow / 2, 140);
        image(SETARIGHT, widthWindow / 2, 300, 50, 50)
    }
    // ---------------------------------------------------------------------------------
    // APRESENTANDO INTERAÇÕES PARA SAIR DE INSTRUÇÕES
    backAndPlayText();
}

function credits() { // FUNÇÃO RESPONSÁVEL POR APRESENTAR OS CRÉDITOS DO JOGO.
    noStroke();
    fill(fontColor);
    textSize(42);

    // VERIFICANDO QUAL PERFIL E SETA DEVEM SER MOSTRADOS
    if (PAGINATION === 1) {
        image(myImage, widthWindow / 2, 120, 250, 250);
        text('GILSON KEDSON - PROGRAMADOR', widthWindow / 2, 220);
        image(SETARIGHT2, widthWindow / 2, 300, 50, 50);
    } else {
        image(profImage, widthWindow / 2, 120, 150, 150);
        text('FULANO SILVA - EDUCADOR', widthWindow / 2, 220);
        image(SETALEFT2, widthWindow / 2, 300, 50, 50);
    }
    // ---------------------------------------------------------------------------------
    // APRESENTANDO INTERAÇÕES PARA SAIR DE INSTRUÇÕES
    backAndPlayText();
}

// SUBFUNÇÃO GLOBAL:
function mouseClicked() { // RESPONSÁVEL PELAS INTERAÇÕES COM O MOUSE.
    if (windowGame === 1) {
        if (mouseX >= 110 && mouseX <= 290) {
            if (mouseY >= 134 && mouseY <= 174) {
                windowGame = 2; // PLAY
            } else if (mouseY >= 184 && mouseY <= 224) {
                windowGame = 3; // INSTRUÇÕES
            } else if (mouseY >= 234 && mouseY <= 274) {
                windowGame = 4; // CRÉDITOS
            }
        }
    }
    if (windowGame === 2) {
        exitAndRestartLogic();
    }

    // VERIFICAÇÃO DAS INSTRUÇÕES/CRÉDITOS VOLTAR E PLAY
    if (windowGame === 3 || windowGame === 4) {
        if ((mouseX >= 15 && mouseX <= 105) && (mouseY >= 363 && mouseY <= 381)) { // VOLTAR
            windowGame = 1; // MENU
            PAGINATION = 1;
            console.log('clicado')
        }
        if ((mouseX >= 321 && mouseX <= 381) && (mouseY >= 363 && mouseY <= 381)) { // PLAY
            windowGame = 2; // PLAY
            PAGINATION = 1;
        }
    }

    if (windowGame === 3) {
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
    if (windowGame === 4) {
        if ((mouseX >= 179 && mouseX <= 223) && (mouseY >= 278 && mouseY <= 320)) {
            if (PAGINATION === 1) {
                PAGINATION = 2;
            } else {
                PAGINATION = 1;
            }
        }
    }
}

// SUBFUNÇÕES JOGAR:
function scenery() { // CENÁRIO DO JOGO.
    image(backgroundGame, widthWindow / 2, heightWindow / 2, 400, 400);
    image(backgroundGame2, widthWindow / 2, heightWindow / 2 + 50, 400, 400);
    image(asteroids[INDICE_ASTEROIDE], x_positionAsteroid, y_moveAsteroid, 50, 50);

    // MOVENDO O ASTEROIDE
    y_moveAsteroid += 2;
    if (y_moveAsteroid >= 430) {
        y_moveAsteroid = -80;
        x_positionAsteroid = 50 + Math.floor(Math.random() * 330);
        INDICE_ASTEROIDE = Math.floor(Math.random() * 6);
    }

    if (COLIDIU) {
        collided[countCollided] = RECEBIDO + 1;
        countCollided++;
    }

    logicFraction(collided[0], collided[1]);

    text(collided, widthWindow / 2, heightWindow / 2);
}

function mission() { // MISSÃO DA FASE E FASE EM SI.
    fill('#812F33');
    rect(POSITION_MISSAO_RECT_TEXT, heightWindow / 2, 250, 150);
    textFont('roboto');
    fill("red");
    textSize(20);
    text("x", POSITION_MISSAOX, 140);
    fill(fontColor);
    if (phase === 0) {
        text("1) Colida nos asteroids que\n dão origem a dizima simples: \n 0,333333...", POSITION_MISSAO_RECT_TEXT, heightWindow / 2 - 20)
    } else if (phase === 2) {
        text("2) Colida nos asteroids que\n dão origem a dizima simples: \n 1,222222...", POSITION_MISSAO_RECT_TEXT, heightWindow / 2 - 20)
    }
    textFont(fontGame);
}

function astronaut() { // MOVIMENTAÇÃO DO ASTRONAUTA.
    exitAndRestartText();
    if (stateAstronaut == 0) {
        image(sprite[0], x_moveAstronaut, heightWindow / 2 + 50, 40, 40);
        if (keyCode == RIGHT_ARROW) { // MOVENDO PARA A DIREITA
            if (keyIsPressed) {
                if (x_moveAstronaut >= 30 && x_moveAstronaut <= 369) { // LIMITANDO A ÁREA DE MOVIMENTO
                    x_moveAstronaut += 2.5;
                    // LÓGICA DA sprite DIREITA
                    if (x_moveAstronaut % 2 != 0) {
                        image(sprite[1], x_moveAstronaut, heightWindow / 2 + 50, 40, 40);
                    } else {
                        image(sprite[2], x_moveAstronaut, heightWindow / 2 + 50, 40, 40);
                    }
                }
            }
        } else if (keyCode == LEFT_ARROW) {
            stateAstronaut = 1; // ALTERANDO ESTADO
        }
    }
    // -----------------------------------------------------------------------------
    if (stateAstronaut == 1) {
        image(sprite[3], x_moveAstronaut, heightWindow / 2 + 50, 40, 40);
        if (keyCode == LEFT_ARROW) { // MOVENDO PARA A ESQUERDA
            if (keyIsPressed) {
                if (x_moveAstronaut >= 31 && x_moveAstronaut <= 372) { // LIMITANDO A ÁREA DE MOVIMENTO
                    x_moveAstronaut -= 2.5;
                    // LÓGICA DA sprite ESQUERDA
                    if (x_moveAstronaut % 2 != 0) {
                        image(sprite[4], x_moveAstronaut, heightWindow / 2 + 50, 40, 40);
                    } else {
                        image(sprite[5], x_moveAstronaut, heightWindow / 2 + 50, 40, 40);
                    }
                }
            }
        } else if (keyCode == RIGHT_ARROW) { // ESTADO PADRÃO
            stateAstronaut = 0;
        }
    }
}

function lifeOfAstronaut() { // VIDA DO ASTRONAUTA.

    if (timerValue <= 0) {
        lose = true;
    } else {
        lose = false;
    }

    if (life == 3) {
        image(lifeImage[0], widthWindow / 2 - 50, 380, 25, 25);
        image(lifeImage[0], widthWindow / 2, 380, 25, 25);
        image(lifeImage[0], widthWindow / 2 + 50, 380, 25, 25);
    } else if (life == 2) {
        image(lifeImage[0], widthWindow / 2 - 50, 380, 25, 25);
        image(lifeImage[0], widthWindow / 2, 380, 25, 25);
        image(lifeImage[1], widthWindow / 2 + 50, 380, 25, 25);
    } else if (life == 1) {
        image(lifeImage[0], widthWindow / 2 - 50, 380, 25, 25);
        image(lifeImage[1], widthWindow / 2, 380, 25, 25);
        image(lifeImage[1], widthWindow / 2 + 50, 380, 25, 25);
    } else {
        image(lifeImage[1], widthWindow / 2 - 50, 380, 25, 25);
        image(lifeImage[1], widthWindow / 2, 380, 25, 25);
        image(lifeImage[1], widthWindow / 2 + 50, 380, 25, 25);
        alive = false;
    }
    gameOver(lose, alive);
}

function collision() { // COLISÃO ENTRE ASTRONAUTA E ASTEROIDE.
    astronaut_y = heightWindow / 2 + 50;

    // VERIFICANDO QUAL CORPO ESTÁ COM COORDENADA MAIOR
    if (x_positionAsteroid > Math.floor(x_moveAstronaut)) {
        z = x_positionAsteroid - Math.floor(x_moveAstronaut);
    } else {
        z = Math.floor(x_moveAstronaut) - x_positionAsteroid;
    }
    // --------------------------------------------------
    // VERIFICANDO SE HOUVE COLISÃO
    if ((z >= -26 && z <= 26) && astronaut_y === y_moveAsteroid) {
        COLIDIU = true;
        y_moveAsteroid = 430;
        RECEBIDO = INDICE_ASTEROIDE;
        SONG_COLLISION[0].play();
        nCollided++;
    } else {
        COLIDIU = false;
    }
}

function restartCollision() { // FUNÇÃO RESPONSÁVEL POR REINICIAR AS COLISÕES (LIMPAR VETOR).
    while (collided.length > 0) {
        collided.pop();
        countCollided = 0;
    }
}

function logicFraction(denominator, divisor) { // FUNÇÃO RESPONSÁVEL POR SABER SE A FRAÇÃO ESTÁ CORRETA.
    if (phase === 1 && nCollided === 2) {
        convertion = (parseFloat(denominator / divisor).toFixed(6))
        if (parseFloat(convertion) == 0.333333) {
            win = true;
            nCollided = 0;
            restartCollision();
        } else if (controlLife == 1) {
            life = 2;
            controlLife = 2;
            nCollided = 0;
            restartCollision();
        } else if (controlLife == 2) {
            life = 1;
            controlLife = 3;
            nCollided = 0;
            restartCollision();
        } else if (controlLife == 3) {
            life = 0;
            controlLife = 4;
            nCollided = 0;
            restartCollision();
        }
    }
}

function timerGame() { // CRONÔMETRO.
    if (timerValue > 0) {
        timerValue--;
    }
}

function gameOver(timer, life) { // FIM DE JOGO -> DERROTA... (var lose, var alive).
    background('red');
    text("Game Over", widthWindow / 2, heightWindow / 2);

    if (timer) {
        text("Tempo esgotado", widthWindow / 2, heightWindow / 2 + 50);
    } else if (!life) {
        text("Vidas acabaram", widthWindow / 2, heightWindow / 2 + 50);
    }

    exitAndRestartText();
}

function congratulations() { // FIM DE JOGO -> VITÓRIA
    textSize(120);
    text("Parabéns", widthWindow / 2, heightWindow / 2);
    textSize(80);
    if (victory == 3) {
        text("Você venceu o jogo, parabéns!!!", widthWindow / 2, heightWindow / 2 + 50)
    } else {
        text("Voce passou de fase", widthWindow / 2, heightWindow / 2 + 50);
        image(SETARIGHT2, widthWindow / 2, 300, 50, 50);
    }
    exitAndRestartText();
}
// ------------------------

// SUBFUNÇÕES INSTRUÇÕES:
function backAndPlayText() { // RESPONSÁVEL POR APRESENTAR AS OPÇÕES VOLTAR E PLAY NAS INSTRUÇÕES E CRÉDITOS.
    textSize(60)
    fill(fontColor);
    textFont(fontGame);
    text('VOLTAR', 60, 380);
    text('PLAY', 350, 380);
}

function exitAndRestartLogic() { // RESPONSÁVEL POR APRESENTAR AS OPÇÕES DE SAÍDA E REINICIAR AS VARIÁVEIS.
    // REINICIANDO VALORES PARA O PADRÃO.
    if ((mouseX >= 9 && mouseX <= 52) && (mouseY >= 15 && mouseY <= 29)) { // PARA VOLTAR.
        valuesPattern();
        phase = 1;
        victory = 0;
        win = false;
    } else if ((mouseX >= 291 && mouseX <= 390) && (mouseY >= 15 && mouseY <= 29)) { // PARA REINICIAR.
        if (phase === 1 && win) {
            valuesPattern();
            phase = 2;
            victory = 1;
            win = false;
        } else if (phase === 2 && win) {
            valuesPattern();
            phase = 3;
            victory = 2;
            win = false;
        } else if (phase === 3 && win) {
            valuesPattern();
            victory = 3;
            win = false;
        }

        if (phase === 1 && !win) {
            valuesPattern();
            victory = 0;
        } else if (phase === 2 && !win) {
            valuesPattern();
            victory = 1;
        } else if (phase === 3 && !win && victory != 3) {
            valuesPattern();
            victory = 2;
        }
    }
}

function valuesPattern() {
    restartCollision();
    timerValue = 120;
    life = 3;
    lose = false;
    alive = true;
    x_moveAstronaut = 30;
    stateAstronaut = 0
    x_positionAsteroid = 50 + Math.floor(Math.random() * 330);
    y_moveAsteroid = -80;
    controlLife = 1;
    nCollided = 0;
    win = false;
}

function exitAndRestartText() {
    textSize(50);
    text('EXIT', 30, 30);
    text('REINICIAR', 340, 30);
}