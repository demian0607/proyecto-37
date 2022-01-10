class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //escribe aquí el código para ocultar los elementos de la pregunta
    question.hide()


    //escribe aquí el código para cambiar el color de fondo
    background("green") 

    //escribe el código para mostrar un encabezado que indique el resultado del Cuestionario
    fill("white")
    textSize(26);
    text("resultado del cuestionario",340.50)

    //llama aquí a getContestantInfo( )
    Contestant.getPlayerInfo();


    //escribe la condición para comprobar si contestantInfor no está indefinido
    if(allContestants!== undefined){
      fill("white");
      textSize(20);
      text("El concursante que respondio correctamente, esta resaltado en color verde",130,230);

      var display_Answers = 230

      for (var plr in allContestants){
        var respuestaC = "2"

        if (respuestaC === allContestants[plr].answer){
          fill("green");
          
        }else {
          fill("red");
        }
        display_Answers += 30;
        text(allContestants[plr].name+": "+allContestants[plr].answer,250,display_Answers);
      }
    } 

    //escribe aquí el código para agregar una nota

    //escribe el código para resaltar al concursante que respondió correctamente
    
  }

}
