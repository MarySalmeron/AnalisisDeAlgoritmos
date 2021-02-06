 //******************************************************************************************************
//PROGRAMA PRINCIPAL SELECCION DE ACTIVIDADES
//Programadores: Sanchez Sanchez Luis Gerardo y Salmerón Contreras María José
//Grupo: 3CM3
//EJECUTAR: Animación de el algoritmo de selección de actividades con enfoque greedy.
//¿Cómo lo hace? Utilizando las librerías de P5.js 
//¿Qué recibe? Recibe el inicio y fin de cada actividad.
//¿Causa de errores? La librería P5.js presenta algunas dificultades para trabajar con el canvas por lo 
//que el acomodo en x en el canvas de las actividades puede no ser  muy preciso, sin embargo cumple con
//la función del algoritmo.
//******************************************************************************************************

//******************************************************************
//DEFINICIÓN DE CONSTANTES DEL PROGRAMA
//******************************************************************

let rectangulos =[];
let inicio_actividad =[];
let fin_actividad = [];
let altura_canvas = 720;
let ancho_canvas = 550;
let numero_actividades = 10;
let constante_x;
let constante_y;
let posicionx_rec;
let y=60;
let S=[];
let cont=0;
let j=0;
let k=0;
let actividadAncho=ancho_canvas/numero_actividades;

//******************************************************************
//FUNCIÓN SETUP
//******************************************************************

function setup() {
    // crear un lienzo
    var canvas= createCanvas(altura_canvas,ancho_canvas);
    canvas.parent('animacionaqui');
    rectMode(CENTER);
    noLoop();
    //actividadAncho=ancho_canvas/fin_actividad[fin_actividad.length-1];
}

//******************************************************************
//FUNCIÓN DRAW 
//******************************************************************

function draw() {
    background(0);
    if(inicio_actividad.length<=0) setup();
    frameRate(10);

    if(cont!=0){
      ordenarAct();
  
      constante_x=altura_canvas/fin_actividad[fin_actividad.length-1];   
      for(let i=0;i<inicio_actividad.length;i++){
        
        posicionx_rec =  constante_x * inicio_actividad[i] ;
        valor = (fin_actividad[i] - inicio_actividad[i]) * constante_x;
        rectangulos[i]=new Rectangulo(posicionx_rec+10,y,valor,30, inicio_actividad[i], fin_actividad[i], i);
        y=y+30;
      }
      cont=0;
      seleccion();
    }

    k=0;
    j=0;
    console.log("rectangulos length",rectangulos.length);
    for(let i=0;i<rectangulos.length;i++){
       //console.log("i:",i);
        
        
        if(i==S[j]){ 
          if(i===0){
            console.log("entre a i=0");
            rectangulos[i].move();
            rectangulos[i].colorear(1);
            j++;
          }else if(rectangulos[k].intersects(rectangulos[i])){
            k=i;            
            rectangulos[i].move();
            rectangulos[i].colorear(1);
            
            j++;
          }
      
        }else{
          rectangulos[i].colorear(0);
        }
        if(i==0) rectangulos[i].show(1);
        else
        rectangulos[i].show(0);
        rectangulos[i].TEXTFIN();
        
    }

}

//******************************************************************
//FUNCIÓN ORDENAR ACTIVIDADES
//******************************************************************

function ordenarAct(){
  console.log('Hi from ordenar!');
  console.log(inicio_actividad);
  console.log(fin_actividad);

  let aux1=0;
  let aux2=0;
  let band=1;
  
  for(let i=inicio_actividad.length;i>0 && band==1;i--){
    band=0;
    for(let j=0;j<i;j++){
      if(fin_actividad[j]>fin_actividad[j+1]){
        aux1=fin_actividad[j];
        fin_actividad[j]   = fin_actividad[j+1] ;
        fin_actividad[j+1] = aux1   ;
        aux2   = inicio_actividad[j]   ;
        inicio_actividad[j]   = inicio_actividad[j+1] ;
        inicio_actividad[j+1] = aux2   ;
        band = 1 ;
      }
    }
  }

  console.log('Arreglo ordenado:');
  console.log(inicio_actividad);
  console.log(fin_actividad);


}

//******************************************************************
//FUNCIÓN SELECCION DE ACTIVIDADES QUE FORMAN PARTE DE LA RESPUESTA
//******************************************************************
  
  function seleccion(){
    console.log('Hi from seleccion!');
    let z=0;
    let k=1;
    
    S[0]=0;
    for(let i=1;i<inicio_actividad.length;i++){
      if(inicio_actividad[i]>= fin_actividad[z] ){
        S[k] = i ;     // actividad seleccionada
        z    = i ;
        k++ ;
      }
    }
    console.log(S);
    
    
  }

//******************************************************************************************
//                          CLASE RECTANGULO, AUXILIAR PARA LA ANIMACIÓN
//  TIENE LOS MÉTODOS:
//  MOVE: REALIZA EL MOVIMIENTO DE LOS RECTANGULOS 
//  SHOW: MUESTRA Y CREA LOS RECTANGULOS EN EL CANVAS
//  COLOREAR: COLOREA LOS RECTANGULOS DEPENDIENDO SI FORMA PARTE DE LA SOLUCIÓN O NO
//  INTERSECTS: DEVUELVE UN ENTERO SI ES QUE DOS RECTANGULOS ESTAN EN LA MISMA 'y DEL CANVAS
//  TEXTFIN: MUESTRA EL TEXTO DE SOLUCIÓN FINAL UNA VEZ QUE LA ANIMACIÓN TERMINA
//******************************************************************************************

class Rectangulo{
    constructor(x, y, valor, ancho_actividad, inicio, fin, num_actividad){
      this.x=x;
      this.y=y;
      this.valor=valor;
      this.ancho_actividad=ancho_actividad;
      this.inicio = inicio;
      this.fin = fin;
      this.num_actividad = num_actividad;
    }
    
    move(){

        if(this.y!=450) this.y=this.y+ 5;
        
    }

    show (val_auxiliar) 
    {
      if(val_auxiliar){
        stroke(240);
        strokeWeight(1);
        noFill();
        rect(this.x, this.y, this.valor, this.ancho_actividad );
        var texto ="No. " + this.num_actividad + " Inicio: " + this.inicio+ " Fin: " + this.fin;
        text(texto, Math.abs(this.x-(this.valor/2)), this.y-25);
        
      }else{
        stroke(240);
        strokeWeight(1);
        noFill();
        rect(this.x, this.y, this.valor, this.ancho_actividad );
        var texto ="No. " + this.num_actividad + " Inicio: " + this.inicio+ " Fin: " + this.fin;
        text(texto, Math.abs(this.x-(this.valor/2)), this.y-25);
      }
        
    }

    colorear(val_aux2){
      if(val_aux2){
        noStroke();
        strokeWeight(1);
        fill('green');
        rect(this.x, this.y, this.valor, this.ancho_actividad );

      }else{
        noStroke();
        strokeWeight(1);
        fill('red');
        rect(this.x, this.y, this.valor, this.ancho_actividad );
      }
        
    }
      
    

    intersects(other){
      return this.y===other.y;
    }

    TEXTFIN(){
      if(this.y===450){
        var texto ="----------Solución final----------";
        text(texto, 300, 400);
      }
      
    }
}


//******************************************************************
//FUNCIONES PARA OBTENER LOS DATOS DE LAS ACTIVIDAES
//******************************************************************

function Capturar_inicio(){
    let lstNumero = document.getElementsByClassName("inicio_actividad");     
    for (var i = 0; i < lstNumero.length; i++) {    
        inicio_actividad[i] =  parseInt(lstNumero[i].value, 10);   
        }  
    }
  
  
    function Capturar_fin (){
      let lstNumero1 = document.getElementsByClassName("fin_actividad");  
      for (var i = 0; i < lstNumero1.length; i++) {    
          fin_actividad[i] = parseInt( lstNumero1[i].value,10); 
          } 
          cont++;     
      loop(); 
      }




  


