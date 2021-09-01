let WIDTH_WINDOW = 400;
let HEIGHT_WINDOW = 400;
let TELA = 1;
let PAGINATION = 1;
let AUX_PAGINATION = 0;
let BACKGROUND_COLOR = '#54814a';
let FONT_COLOR = '#dcfcd4';
let OPCOES = ['JOGAR', 'INSTRUÇÕES', 'CRÉDITOS'];
let moveX = 30; // MOVIMENTO DO ASTRONAUTA NO EIXO X
let state = 0; // ESTADO DO ASTROUNAUTA (DIREITA OU ESQUERDA)
let moveX_TEXT = WIDTH_WINDOW/2;
let PROFIMAGE; // IMAGEM PROFESSOR
let SETARIGHT; // SETA VERDE
let SETARIGHT2; // SETA BRANCA
let SETALEFT;
let SETALEFT2;
let FONTGAME;
let BACKGROUND;
let MYIMAGE;
let SPRITE = [];

function preload(){
    FONTGAME = loadFont('assets/fonts/game_over.ttf');
    SETARIGHT = loadImage('assets/images/seta.png');
    SETALEFT = loadImage('assets/images/setaLEFT.png');
    BACKGROUND = loadImage('assets/images/aoinfinitoalem.jpg');
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
}

function setup(){
    createCanvas(WIDTH_WINDOW, HEIGHT_WINDOW);
    imageMode(CENTER);
    textAlign(CENTER);
    rectMode(CENTER);
}

function draw(){
    background(BACKGROUND_COLOR);
    if(TELA != 4 && TELA != 2){
        image(BACKGROUND, WIDTH_WINDOW/2, HEIGHT_WINDOW/2);
    }
    textFont(FONTGAME);
    if(TELA == 1){
        menu();
    }else if(TELA == 2){
        jogar();
    }else if(TELA == 3){
        instrucoes();
    }else if(TELA == 4){
        creditos();
    }
}

function menu(){
    textSize(80);
    fill(FONT_COLOR);
    noStroke();
    text('DEFINIDO & INFINITO', WIDTH_WINDOW/2, 45);

    // OPÇÕES
    textSize(25);
    textFont('roboto');
    for(x = 0; x < 3; x++){
        // 0 1 2
        fill('#81558a');
        rect(WIDTH_WINDOW/2, HEIGHT_WINDOW/2.6 + (x * 50), 180, 40);
        fill(FONT_COLOR);
        text(OPCOES[x], WIDTH_WINDOW/2, HEIGHT_WINDOW/2.45 + (x * 50));
    }

    if(mouseX >= 110 && mouseX <= 290){
        stroke('#000000');
        if(mouseY >= 134 && mouseY <= 174){
            fill('#154049');
            rect(WIDTH_WINDOW/2, HEIGHT_WINDOW/2.6, 180, 40);
            fill(FONT_COLOR);
            text(OPCOES[0], WIDTH_WINDOW/2, HEIGHT_WINDOW/2.45);
            if(mouseIsPressed){
                TELA = 2; // PLAY
            }
        }

        if(mouseY >= 184 && mouseY <= 224){
            fill('#154049');
            rect(WIDTH_WINDOW/2, HEIGHT_WINDOW/2.6 + 50, 180, 40);
            fill(FONT_COLOR);
            text(OPCOES[1], WIDTH_WINDOW/2, HEIGHT_WINDOW/2.45 + 50);
            if(mouseIsPressed){
                TELA = 3; // INSTRUÇÕES
            }
        }

        if(mouseY >= 234 && mouseY <= 274){
            fill('#154049');
            rect(WIDTH_WINDOW/2, HEIGHT_WINDOW/2.6 + 100, 180, 40);
            fill(FONT_COLOR);
            text(OPCOES[2], WIDTH_WINDOW/2, HEIGHT_WINDOW/2.45 + 100);
            if(mouseIsPressed){
                TELA = 4; // CRÉDITOS
            }
        }
    }
}

function jogar(){
    textSize(100);
    text('FASE 1', moveX_TEXT, HEIGHT_WINDOW/2);

    if(!(moveX_TEXT==460)){
        moveX_TEXT*=1.006
        textSize(50)
        text('DIZIMA SIMPLES', moveX_TEXT, HEIGHT_WINDOW/2 + 30);
    }
    
    textSize(50);
    text('EXIT', 30, 30);
    text('REINICIAR', 340, 30);

    if(state==0){
        image(SPRITE[0], moveX, HEIGHT_WINDOW/2, 40, 40);
        if(keyCode == RIGHT_ARROW){
            if(keyIsPressed){
                if(moveX >= 30 && moveX <=370){
                    moveX+=3;
                    if(moveX%2!=0){
                        image(SPRITE[1], moveX, HEIGHT_WINDOW/2, 40, 40);
                    }else{
                        image(SPRITE[2], moveX, HEIGHT_WINDOW/2, 40, 40);
                    }
                }
            }
        }else if(keyCode==LEFT_ARROW){
            state = 1;
        }
    }else if(state==1){
        image(SPRITE[3], moveX, HEIGHT_WINDOW/2, 40, 40);
        if(keyCode == LEFT_ARROW){
            if(keyIsPressed){
                if(moveX >= 31 && moveX <=372){
                    moveX-=3;
                    if(moveX%2!=0){
                        image(SPRITE[4], moveX, HEIGHT_WINDOW/2, 40, 40);
                    }else{
                        image(SPRITE[5], moveX, HEIGHT_WINDOW/2, 40, 40);
                    }
                }  
            }
        }else if(keyCode==RIGHT_ARROW){
            state = 0;
        }
    }

    if((mouseX >= 9 && mouseX <= 52) && (mouseY >= 15 && mouseY <= 29)){
        if(mouseIsPressed){
            TELA = 1;
            moveX = 30;
            state = 0;
            keyCode = 0;
            moveX_TEXT = HEIGHT_WINDOW/2;
        }
    }else if((mouseX >= 291 && mouseX <= 390) && (mouseY >= 15 && mouseY <= 29)){
        if(mouseIsPressed){
            moveX = 30;
            state = 0;
            keyCode = 0;
            moveX_TEXT = WIDTH_WINDOW/2;
        }
    }  
}

function instrucoes(){
    noStroke();
    fill('#b4b0a5');
    rect(WIDTH_WINDOW/2, HEIGHT_WINDOW/2.2, 300, 300);
    //PAGINATION = 2;
    textSize(25);
    textFont('roboto');
    fill('#81558a');
    text('INSTRUÇÕES', WIDTH_WINDOW/2, 60);

    textSize(20);

    if(PAGINATION == 1){
        text('8º ano do ensino fundamental I', WIDTH_WINDOW/2, 110);
        text('(EF08MA05) Reconhecer e utilizar\n procedimentos para a obtenção de\n uma fração geratriz para uma\n dízima periódica.', WIDTH_WINDOW/2, 150);
        image(SETARIGHT, WIDTH_WINDOW/2, 300, 50, 50)
    }else if(PAGINATION == 2){
        text('DEFINIDO E INFINITO é um jogo\n voltado para os alunos do 8º ano do\n ensino fundamental, o jogo tenta\n ensiná-los a reconhecer e utilizar\n procedimentos para a obtenção de\n uma fração geratriz para uma\n dízima periódica.', WIDTH_WINDOW/2, 110);
        image(SETARIGHT, WIDTH_WINDOW/2, 300, 50, 50)
    }else{
        textSize(22);
        text('Como jogar?', WIDTH_WINDOW/2, 110);
        textSize(20);
        text('Utilize as setas presentes\n no seu teclado para movimentar\n o astronauta (INCOMPLETO)', WIDTH_WINDOW/2, 140);
        image(SETARIGHT, WIDTH_WINDOW/2, 300, 50, 50)
    }

    // INTERAÇÕES PARA SAIR DE INSTRUÇÕES
    textSize(60)
    fill(FONT_COLOR);
    textFont(FONTGAME);
    text('VOLTAR', 60, 380);
    text('PLAY', 350, 380);

    // VOLTAR
    if((mouseX >= 15 && mouseX <= 105) && (mouseY >= 363 && mouseY <= 381)){
        if(mouseIsPressed){
            TELA = 1; // MENU
            PAGINATION = 1;
        }
    }

    // PLAY
    if((mouseX >= 321 && mouseX <= 381) && (mouseY >= 363 && mouseY <= 381)){
        if(mouseIsPressed){
            TELA = 2; // PLAY
            PAGINATION = 1;
        }
    }
}

function creditos(){
    noStroke();
    fill(FONT_COLOR);
    textSize(42);
    if(PAGINATION == 1){
        image(MYIMAGE, WIDTH_WINDOW/2, 120, 250, 250);
        text('GILSON KEDSON - PROGRAMADOR', WIDTH_WINDOW/2, 220);
    }else{
        image(PROFIMAGE, WIDTH_WINDOW/2, 120, 150, 150);
        text('FULANO SILVA - EDUCADOR', WIDTH_WINDOW/2, 220);
    }
    textSize(60)
    fill(FONT_COLOR);
    textFont(FONTGAME);
    text('VOLTAR', 60, 380);
    text('PLAY', 350, 380);

    if(PAGINATION == 1){
        image(SETARIGHT2, WIDTH_WINDOW/2, 300, 50, 50);
    }else{
        image(SETALEFT2, WIDTH_WINDOW/2, 300, 50, 50);
        AUX_PAGINATION = 1;
    }

    // VOLTAR
    if((mouseX >= 15 && mouseX <= 105) && (mouseY >= 363 && mouseY <= 381)){
        if(mouseIsPressed){
            TELA = 1; // MENU
            PAGINATION = 1;
            AUX_PAGINATION = 0;
        }
    }

    // PLAY
    if((mouseX >= 321 && mouseX <= 381) && (mouseY >= 363 && mouseY <= 381)){
        if(mouseIsPressed){
            TELA = 2; // PLAY
            PAGINATION = 1;
            AUX_PAGINATION = 0;
        }
    }
}

function mouseClicked(){
    // PARA AS TELAS 3 E 4 (INSTRUÇÕES E CRÉDITOS)
    if(TELA == 3 || TELA == 4){
        if((mouseX >= 179 && mouseX <= 223) && (mouseY >= 278 && mouseY <= 320)){
            if(PAGINATION == 1){
                PAGINATION = 2;
            }
            else if(PAGINATION == 2){
                if(AUX_PAGINATION == 1){ // PARA CRÉDITOS
                    PAGINATION = 1;
                }else{
                    PAGINATION = 3;
                } // AS INTRUÇÕES
            }else{
                PAGINATION = 1;
            }
        }
    }
}