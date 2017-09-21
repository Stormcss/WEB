var jsonData;
var players = {'Андрей':['andr_games','andr_wins','andr_persent'],
                'Алина':['alin_games','alin_wins','alin_persent'],
                'Даниил':['dan_games','dan_wins','dan_persent'],
                'Иван':['ivan_games','ivan_wins','ivan_persent'],
                'Руслан':['rus_games','rus_wins','rus_persent']};

var isDebug = true;
var isInfo = true;

var andr_wins = 0;
var alin_wins = 0;
var dan_wins = 0;
var ivan_wins = 0;
var rus_wins = 0;

var andr_games = 0;
var alin_games = 0;
var dan_games = 0;
var ivan_games = 0;
var rus_games = 0;

function Player() {
    this.name='';
    this.totalGames = 0;
    this.totalWins = 0;
    this.forwardWins = 0;
    this.forwardLooses = 0;
    this.defenceWins = 0;
    this.defenceLooses = 0;
    this.frequentTeammate = '';
    this.mostWinsWith = '';
    this.mostLoosesWith='';
}
//// ARRAY OF PLAYERS
var playersArray = new Array();

$(document).ready(function() {

    getJson();
    
    parseJson();

    $('#wins_andr').text(andr_games+" ("+andr_wins+")");
    $('#wins_alin').text(alin_games+" ("+alin_wins+")");
    $('#wins_dan').text(dan_games+" ("+dan_wins+")");
    $('#wins_ivan').text(ivan_games+" ("+ivan_wins+")");
    $('#wins_rus').text(rus_games+" ("+rus_wins+")");

    calc_persent();

    deepStats();
});

/****  Showing and hiding scores  ****/
$(document).click(function(e) {

  if( !$(e.target).hasClass('score')) {
          $('.scores').hide();

          if (isDebug) console.log('hide1!!');
  } else {
      
    $Scores_block = $(e.target).parent().nextAll('.scores').eq(0);
      
    if ($Scores_block.is(":visible")){
          $Scores_block.animate({
                    height: "0px",
                }, 300 ).hide();
          if (isDebug) console.log('hide2!!');
    } else{
        
        var totalHeight = 0;

        $Scores_block.show();
        $Scores_block.children().each(function(){
            totalHeight += $(this).outerHeight(true);
        });
        $Scores_block.height(0).hide();
        
        $Scores_block.show().animate({
                    height: totalHeight+20,
                }, 300 );
        if (isDebug) console.log('show!!');
    }
  }

});

function calc_persent(){
    for (var name in players){
        $(window[players[name][2]]).text((Math.round(window[players[name][1]]/window[players[name][0]]* 100)).toFixed(0));
    };
}

function getJson(){
    	$.ajax({
				url: '../shashlyk/getScores.php',
				type: "GET",
				async: false,
				datatype: 'json',
		    success: function (doc) {
                //console.log(doc);
                jsonData = doc;
		    },
		    error: function (err) {
		        alert('Error in fetching data: ' + err);
		    }
		});
}


function isInArray(nameVar) {
    if (nameVar == undefined || nameVar == null) 
        return true; 
        
   for (var ii = 0; ii < playersArray.length; ii++){
        if (playersArray[ii].name.localeCompare(nameVar) == 0) 
            return true;
   }
   return false;
};


function getPlayerByName(nameVar){
    console.log("in getPlayerByName " + nameVar);
    for (var ii = 0; ii < playersArray.length; ii++){
        if (playersArray[ii].name.localeCompare(nameVar) == 0) 
            return playersArray[ii];
    }
    alert("SUPER EXCEPTION. Something went wrong and will never be the same... ");
    return null;
}
            
    

function parseJson(){
    if (isDebug) console.log("jsonData is " + jsonData);
    
    $.each(JSON.parse(jsonData), function(idx, obj) {
        
        team1_pl1 = obj.team1_player1;
        team1_pl2 = obj.team1_player2;
        team2_pl1 = obj.team2_player1;
        team2_pl2 = obj.team2_player2;

        scoresArray = $.parseJSON(obj.scores);
        //scoresArray = obj.scores;
        
        if (isDebug) console.log("scoresArray is " + scoresArray + ". Non object:  " + obj.scores);
        
        for (i = 1; i < 3; i++){
            for (j = 1; j < 3; j++){
                //console.log(i+ " "+ j);
                playerName = window['team'+i+'_pl'+j];
                
                if (!isInArray(playerName)){
                    //console.log('not in array! ' + playerName + " " + i +" " +j)
                    player = new Player();
                    player.name = playerName;
                    playersArray.push(player);
                    if (isInfo) console.log('=====added player with name '+ playerName + " playersArray size: "+playersArray.length);
                }
            }
        };
        
        //for (z = 0; z < scoresArray.length; z++){
        //scoresArray.forEach( function (scoresItem){
        
        for (var c in scoresArray) {    
            //calc wins and looses in Forward and Defence
            
            if (isDebug) console.log("--------- c is " + " c \  defender1 " + getPlayerByName(scoresArray[c].defender1));
            
            if (Number(scoresArray[c].score1) > Number(scoresArray[c].score2)){
                if (isDebug) console.log(scoresArray[c].score1 + " > " + scoresArray[c].score2);
                getPlayerByName(scoresArray[c].forward1).forwardWins += 1;
                getPlayerByName(scoresArray[c].defender1).defenceWins += 1;
                
                getPlayerByName(scoresArray[c].forward2).forwardLooses += 1;
                getPlayerByName(scoresArray[c].defender2).defenceLooses += 1;
                
            } else{
                if (isDebug) console.log(scoresArray[c].score1 + " < " + scoresArray[c].score2);
                getPlayerByName(scoresArray[c].forward2).forwardWins += 1;
                getPlayerByName(scoresArray[c].defender2).defenceWins += 1;
                
                getPlayerByName(scoresArray[c].forward1).forwardLooses += 1;
                getPlayerByName(scoresArray[c].defender1).defenceLooses += 1;
            }
            
            
        };
        
        
        team1 =  obj.team1_player1+" - "+obj.team1_player2;
        team2 =  obj.team2_player1+" - "+obj.team2_player2;
        score1 = obj.Счет1;
        score2 = obj.Счет2;
        
        if (isDebug) console.log('team1 is '+team1 + ' / team2 is ' + team2);
        if (isDebug) console.log('score1 is '+score1 + ' / score1 is ' + score2);
        
        for (var name in players){ ///FIX IT
            if (isDebug) console.log(name + " > " +players[name][0]);
            
            /*** Calc games  ***/
            if(~team1.indexOf(name) || ~team2.indexOf(name)) {
                playersArray.find(x => x.name === name).totalGames += Number(obj.Счет1) + Number(obj.Счет2);
                
                //@Deprecated
                window[players[name][0]] += Number(obj.Счет1) + Number(obj.Счет2);
            }
            
            /*** calc wins ***/
            
            if (~team1.indexOf(name)){
                playersArray.find(x => x.name === name).totalWins += Number(score1);
                
                //@Deprecated
                window[players[name][1]] += Number(score1);
            } else if (~team2.indexOf(name)){
                playersArray.find(x => x.name === name).totalWins += Number(score2);
                
                //@Deprecated
                window[players[name][1]] += Number(score2);
            }
            /*** calc wins in forward***/
            
        }
        
    	if (isDebug) console.log(obj.Счет1 + " "+ obj.Счет2);
    });
  
    console.log(playersArray);
}

function deepStats(){
    
}; 

function deepStatsClickListener(player){

    $('#DeepStats #name').text(player.name.toString());
    $('#DeepStats #totalWins').text(player.totalWins);
    $('#DeepStats #totalLooses').text(Number(player.totalGames) - Number(player.totalWins));
    
    $('#DeepStats #persentWins').text(Math.round(Number(player.totalWins)/Number(player.totalGames)*100).toFixed(0)+"%");
    $('#DeepStats #persentLooses').text(100 - Number($('#DeepStats #persentWins').text().slice(0, -1))+"%");
    
    $('#DeepStats #forwardWins').text(player.forwardWins);
    $('#DeepStats #forwardLooses').text(player.forwardLooses);
    $('#DeepStats #defenceLooses').text(player.defenceLooses);
    $('#DeepStats #defenceWins').text(player.defenceWins);
    
    
    $('#cover').fadeIn();
    $('#DeepStats').fadeIn();
    
}; 


$('#DeepStats #close-button').click(function(){
    $('#DeepStats').fadeOut();
    $('#cover').fadeOut();
});

$('#shashlyk_stats .player .name').click(function(){
    deepStatsClickListener(getPlayerByName($(this).text()));
});