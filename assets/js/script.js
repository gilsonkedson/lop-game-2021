let WIDTH_WINDOW = 400;
let HEIGHT_WINDOW = 400;
let TELA = 1;
let PAGINATION = 1;
let BACKGROUND_COLOR = '#54814a';
let FONT_COLOR = '#dcfcd4';
let OPCOES = ['JOGAR', 'INSTRUÇÕES', 'CRÉDITOS'];
let PROFIMAGE;
let SETARIGHT; // SETA VERDE
let SETARIGHT2; // SETA BRANCA
let SETALEFT; // SETA VERDE
let SETALEFT2; // SETA BRANCA
let FONTGAME;
let BACKGROUND;
let MYIMAGE;

function preload(){
    FONTGAME = loadFont('assets/fonts/game_over.ttf');
    SETARIGHT = loadImage('assets/images/seta.png');
    SETALEFT = loadImage('assets/images/setaLEFT.png');
    BACKGROUND = loadImage('assets/images/aoinfinitoalem.jpg');
    MYIMAGE = loadImage('assets/images/KedsonCredito.png');
    SETARIGHT2 = loadImage('assets/images/setaBRANCO.png');
    SETALEFT2 = loadImage('assets/images/setaLEFTBRANCO.png');
    PROFIMAGE = loadImage('assets/images/fulano.png');
}

function setup(){
    createCanvas(WIDTH_WINDOW, HEIGHT_WINDOW);
    imageMode(CENTER);
    textAlign(CENTER);
    rectMode(CENTER);

}

function draw(){
    background(BACKGROUND_COLOR);
    if(TELA != 4){
        image(BACKGROUND, WIDTH_WINDOW/2, HEIGHT_WINDOW/2);
    }
    textFont(FONTGAME);
    if(TELA == 1){
        menu();
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

function playGame(){
    
}

function instrucoes(){
    noStroke();
    fill('#b4b0a5');
    rect(WIDTH_WINDOW/2, HEIGHT_WINDOW/2.2, 300, 300);

    textSize(25);
    textFont('roboto');
    fill('#81558a');
    text('INSTRUÇÕES', WIDTH_WINDOW/2, 60);

    textSize(20);

    if(PAGINATION == 1){
        text('8º ano do ensino fundamental I', WIDTH_WINDOW/2, 110);
        text('(EF08MA05) Reconhecer e utilizar\n procedimentos para a obtenção de\n uma fração geratriz para uma\n dízima periódica.', WIDTH_WINDOW/2, 150);
        image(SETARIGHT, WIDTH_WINDOW/2, 300, 50, 50)
    }else{
        text('DEFINIDO E INFINITO é um jogo\n voltado para os alunos do 8º ano do\n ensino fundamental, o jogo tenta\n ensiná-los a reconhecer e utilizar\n procedimentos para a obtenção de\n uma fração geratriz para uma\n dízima periódica.', WIDTH_WINDOW/2, 110);
        image(SETALEFT, WIDTH_WINDOW/2, 300, 50, 50)
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
        image(SETARIGHT2, WIDTH_WINDOW/2, 300, 50, 50)
    }else{
        image(SETALEFT2, WIDTH_WINDOW/2, 300, 50, 50)
    }

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

function mouseClicked(){
    // PARA AS TELAS 3 E 4 (INSTRUÇÕES E CRÉDITOS)
    if(TELA == 3 || TELA == 4){
        if((mouseX >= 179 && mouseX <= 223) && (mouseY >= 278 && mouseY <= 320)){
            if(PAGINATION == 1){
                PAGINATION = 2;
            }
            else if(PAGINATION == 2){
                PAGINATION = 1;
            }
        }
    }
}