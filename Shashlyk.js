var jsonData;

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

$(document).ready(function() {



    $('.line').each(function(){
        
        team1 = $(this).text().split(/\s+/)[1] + $(this).text().split(/\s+/)[3] ;
        team2 = $(this).text().split(/\s+/)[5] + $(this).text().split(/\s+/)[7] ;
    
        score = $(this).text().split(/\s+/)[4];
        
        team1Score = score.substr(0, score.indexOf(':')); 
        team2Score = score.substr(score.indexOf(':') + 1, score.length); 
        
        
        if(~$(this).text().indexOf("Андрей")) andr_games += Number(team1Score) + Number(team2Score);
        if(~$(this).text().indexOf("Алина")) alin_games += Number(team1Score) + Number(team2Score);
        if(~$(this).text().indexOf("Даниил")) dan_games += Number(team1Score) + Number(team2Score);
        if(~$(this).text().indexOf("Иван")) ivan_games += Number(team1Score) + Number(team2Score);
        if(~$(this).text().indexOf("Руслан")) rus_games += Number(team1Score) + Number(team2Score);

        calc_scores();
        
    });
    
    $('#wins_andr').text(andr_games+" ("+andr_wins+")");
    $('#wins_alin').text(alin_games+" ("+alin_wins+")");
    $('#wins_dan').text(dan_games+" ("+dan_wins+")");
    $('#wins_ivan').text(ivan_games+" ("+ivan_wins+")");
    $('#wins_rus').text(rus_games+" ("+rus_wins+")");

    calc_persent();

    getJson();
});

function calc_scores(){
        if (~team1.indexOf("Андрей")){
            andr_wins += Number(team1Score);
        } else if (~team2.indexOf("Андрей")){
            andr_wins += Number(team2Score);
        }
  
        if (~team1.indexOf("Алина")){
            alin_wins += Number(team1Score);
        } else if (~team2.indexOf("Алина")){
            alin_wins += Number(team2Score);
        }   

        if (~team1.indexOf("Иван")){
            ivan_wins += Number(team1Score);
        } else if (~team2.indexOf("Иван")){
            ivan_wins += Number(team2Score);
        }
  
        if (~team1.indexOf("Даниил")){
            dan_wins += Number(team1Score);
        } else if (~team2.indexOf("Даниил")){
            dan_wins += Number(team2Score);
        }  
        
        if (~team1.indexOf("Руслан")){
            rus_wins += Number(team1Score);
        } else if (~team2.indexOf("Руслан")){
            rus_wins += Number(team2Score);
        }  
        
        
        /*$(".score").unbind().hover(
            
            function(e) {
                console.log('show!!');
                $(this).parent().nextAll('.scores').eq(0).show().animate({
                    height: "100px",
                }, 300 );
            },
            function(e) {
                console.log('hide!!');
                $(this).parent().nextAll('.scores').eq(0).animate({
                    height: "0px",
                }, 100 ).hide();
            }    
        );   */
        
        /*$( ".score" ).unbind().click(function() {
          $(this).parent().nextAll('.scores').eq(0).show();
            console.log('clicked!');
        });*/
        
        
        
          /*  
            $(this).parent().nextAll('.scores').eq(0).show();
            console.log('clicked!'); }*/
        
        /*$(".shashlyk_data").mouseup(function(e){
            var scores = $(".scores");
            console.log('clicked!');
            if (!$(e.target).is('.scores') ) {
                $(this).fadeOut(); //if the click element is not the above id will hide
            }
    });*/
        
}

$(document).click(function(e) {

  if( !$(e.target).hasClass('score')) {
          $('.scores').hide();

          console.log('hide1!!');
  } else {
      
    $Scores_block = $(e.target).parent().nextAll('.scores').eq(0);
      
    if ($Scores_block.is(":visible")){
          $Scores_block.animate({
                    height: "0px",
                }, 300 ).hide();
          console.log('hide2!!');
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
        console.log('show!!');
    }
  }

});

function calc_persent(){
    
    $('#persent_andr').text((Math.round(andr_wins/andr_games* 100)).toFixed(0));
    $('#persent_alin').text((Math.round(alin_wins/alin_games* 100)).toFixed(0));
    $('#persent_dan').text((Math.round(dan_wins/dan_games* 100)).toFixed(0));
    $('#persent_ivan').text((Math.round(ivan_wins/ivan_games* 100)).toFixed(0));
    $('#persent_rus').text((Math.round(rus_wins/rus_games* 100)).toFixed(0));
    
}

function getJson(){
    	$.ajax({
				url: '../shashlyk/getScores.php',
				type: "GET",
				datatype: 'json',
		    success: function (doc) {
                console.log(doc);
                jsonData = doc;
		    },
		    error: function (err) {
		        alert('Error in fetching data: ' + err);
		    }
		});
}


