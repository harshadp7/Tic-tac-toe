$(document).ready(function (){
    $("#result").text("Select a Mode...!");
    $(".mybutton").hide();

 $("#exit").on('click',function(){
     location.reload();
 });   
 
 $("#MultiPalyer").click(function(){
     multi();
     $(".mybutton").show();
     $(this).prop('disabled', true);
     $("#SinglePlayer").prop('disabled', true);

 });
 
 $("#SinglePlayer").click(function(){
     single();
     $(".mybutton").show();
     $(this).prop('disabled', true);
     $("#MultiPalyer").prop('disabled', true);
 });
 var gotwin=0;
 playername="";
 function single(){
    $("#result").text("")
     playername=prompt("Enter Your Name ");
     if(playername==""||playername==null){
        alert("Name not Entered..!")
        location.reload();
        return;
    }singlegame();
};
 function singlegame(){   
     rows=[],columns=[],movess=0;
     ai = 0;
     aipos = 0;
     player = 0;
     console.log(JSON.stringify(grid))
     grid =  [[0,0,0],[0,0,0],[0,0,0]];
     console.log(JSON.stringify(grid))
     $("#icon_select").show();
     iconSelect();


function reset(){
    $("#turn").text("");
    $("div.col").map(function() {
        $('.col').find('i').attr("class","");
    }); 
     cell='',cell2=0,row=0,col=0,result=0,pos=0,gotwin=0;
     singlegame();   
    }   
 $("#reset").off('click').on('click',function(){
        console.log("Resetted..!")
        reset();
    });       
 
 function checkrow(a, b, c) {  
     if (a === player && b === player && c === player) { 
         console.log("win")
         return 1;  
     } else if (a === ai && b === ai && c === ai ) {  
         console.log(" ai win")
         return -1;  
     } else {  
         return 0;  
     }  
 } 
 function checkwin(board){
     console.log("Checking")
   return checkrow(board[0][0],board[0][1],board[0][2])
         +checkrow(board[1][0],board[1][1],board[1][2])
         +checkrow(board[2][0],board[2][1],board[2][2])
         +checkrow(board[0][0],board[1][0],board[2][0])
         +checkrow(board[0][1],board[1][1],board[2][1])
         +checkrow(board[0][2],board[1][2],board[2][2])
         +checkrow(board[0][0],board[1][1],board[2][2])
         +checkrow(board[0][2],board[1][1],board[2][0]);
 }
 function selectmove(grid) {  
     var i,j; 
     rows=[];
     columns=[];
     for (i = 0; i < 3; i += 1) { 
         for (j = 0; j < 3; j += 1) {
            //  console.log("col")
         if (grid[i][j] === 0 ) {  
             rows.push(i); 
             columns.push(j)
         }  
     }}
     if (columns.length === 0) {
         return -1;  
     } else {  
         pos = columns[Math.floor(Math.random() * columns.length)]; 
         if(pos == 0){
             return pos+1;
         }else{
             return pos
         }
     }  
 }
 
 function gameOver(result) {   
     if (result > 0) { 
        alert(playername+" Wins..!"); 
         $("#turn").text(playername+" is Winner..!");  
         $("#reset").attr("value","Play again");
         gotwin++; return(winner);
        } else if (result < 0) {  
         alert("Ai Wins..!");
         $("#turn").text("AI Winner..!"); 
         $("#reset").attr("value","Play again");
         gotwin++;return(winner);
        } else {  
         $("#turn").text("Draw..!"); 
         $("#reset").attr("value","Play again");
        }  

 } 
 icon=0;
 function iconSelect(){
 $("i#x").click(function(){
         player = 1;ai = 2;
         icon=$(this).attr("class")
         icon2=$('i#o').attr("class")
         console.log(icon,icon2)
         $('#icon_select').hide();  
         $("#turn").text(playername+": ").append('<i class="'+icon+'">');
     })
 $("i#o").click(function(){
         player=2;ai = 1;
         icon=$(this).attr("class")
         icon2=$('i#x').attr("class")
         console.log(icon,icon2)
         $('#icon_select').hide();   
         $("#turn").text(playername+": ").append('<i class="'+icon+'">');
    
 });};
 console.log(" Not clicked........!")
 
 $("div.col").off('click').on('click',function (){
    if(gotwin != 0){alert("Game Over...!")}else{
    console.log("clicked........!")
    if(icon==0){alert("Select Your Icon...!");return;}
     var cell,cell2,row=0,col=0,result;
     cell = $(this);
     col=cell.find('i').parent().index();
     row=cell.find('i').parent().parent().index();
     console.log("before",JSON.stringify(grid))
     if(grid[row][col]!==0){
        console.log(grid[row][col]);
        alert("This position is taken. Please try other position.");
        return;
    }
     cell.find('i').attr("class",""+icon+"");
     grid[row][col] = player;
     console.log("after",JSON.stringify(grid))
     result = checkwin(grid);
     if (result !== 0) {  
         gameOver(result); 
         return;  
     }  
     aipos = selectmove(grid);
     console.log(aipos)
     if (aipos < 0) {  
         gameOver(0,0);  
         alert("Draw..!")
         return;  
     }   
     grid[rows[aipos-1]][columns[aipos-1]] = ai
     console.log("ai played",rows[aipos-1], columns[aipos-1])
     cell2= $(".col").find("i#icon"+rows[aipos-1]+columns[aipos-1]);
     cell2.attr("class",""+icon2+"");
     result=checkwin(grid);
     if(result !== 0){
         gameOver(result);
         return ;
     }}
 });
}

 
 //  ************************************************************//
 var grid =  [[0,0,0],[0,0,0],[0,0,0]];
 var gotwinner = 0, moves=0;
 var player1="" , player2="", turn = 0,icon_plyr1=0;

 function multi(){
    $("#result").text("")
 if(gotwinner==1){
     reset();
 }
 if(player1 =="" || player2 ==""){
 player1 = prompt("Enter Player 1's Name");
 player2 = prompt("Enter Player 2's Name");
 setTurn();}else{alert("Game Reset");reset();}

 $("#reset").click(function(){
     reset();
 });
 
 function reset(){
    $("#result").text("")
     turn = 0;
     icon_plyr1=0;
     grid =  [[0,0,0],[0,0,0],[0,0,0]];
     alert("Game Reset..!");
     $("div.col").map(function() {
         $('.col').find('i').attr("class","");
     }).get();
     moves=0;
     setTurn();
 }   
 
 function setTurn(){
    if((player1==""||player1==null) ||( player2==""||player2==null)){
        alert("Please Set Players Name...!");
        location.reload();
        return; }
     var r = Math.floor((Math.random() * 2) + 1);
     console.log(r)
     gotwinner=0;
    if(r==1){
         turn = player1;
         $("#icon_select").find('p').text(player1+" select Your Icon...!")
         $("#icon_select").show(); 
         $("i#x").click(function(){
            icon_plyr1=$(this).attr("class")
            icon_plyr2=$('i#o').attr("class")
            console.log(icon_plyr1,icon_plyr2)
            $('#icon_select').hide();  
        });
        $("i#o").click(function(){
            icon_plyr1=$(this).attr("class")
            icon_plyr2=$('i#x').attr("class")
            console.log(icon_plyr1,icon_plyr1)
            $('#icon_select').hide();  
        });
        gamemsg(player1+"'s turn now! ")
    }
     else{
         turn = player2;
         $("#icon_select").find('p').text(player2+" select Your Icon...!")
         $("#icon_select").show(); 
        //  gamemsg(player2+"'s turn now!");
         $("i#x").click(function(){
            icon_plyr2=$(this).attr("class")
            icon_plyr1=$('i#o').attr("class")
            console.log(icon_plyr1,icon_plyr2)
            $('#icon_select').hide();  
        });
        $("i#o").click(function(){
            icon_plyr2=$(this).attr("class")
            icon_plyr1=$('i#x').attr("class")
            console.log(icon_plyr1,icon_plyr2)
            $('#icon_select').hide();  
        });
        gamemsg(player2+"'s now!")
     }
 };
 
 function gamemsg(x){
    console.log(x)
    return $("#turn").text(x);
 }
 
 $("div.col").click(function () { 
     if(icon_plyr1 == 0){ 
        alert("Please select your icon..!");return;}
     if(gotwinner == 1){
        alert("Game Over..!")
        return false;
     }
     var row = $(this).find('i').parent().parent().index();
     var col = $(this).find('i').parent().index();
     console.log(row,col);
     
 
     if(grid[row][col]!==0){
         console.log(grid[row][col]);
         alert("This position is taken. Please try other position.");
         return;
     }
     if (turn == player1){
         moves++;
         grid[row][col] = 1;
         var result = win_check(1,player1);
         $(this).find('i').attr("class",""+icon_plyr1+"");
         console.log(grid[row][col]);
         if(!result){
             if(moves>=9){
                 gamemsg("Match Drawn!");
                 moveCount=0;
                 $("#reset").attr("value","Play again");
                 gotwinner=1;
                 return;
             }else{
                 turn = player2;
                 gamemsg(player2+"'s turn now: ");
                 $("#turn").append('<i class="'+icon_plyr2+'">');
             }
             return;    
         }
         else{
             return;
         } 
     } else if(turn == player2){
         moves++;
         grid[row][col] = 2;
         var result = win_check(2,player2);
         $(this).find('i').attr("class",""+icon_plyr2+"");
         console.log(grid[row][col]);
         if(!result){
             if(moves>=9){
                 gamemsg("Match Drawn!");
                 moveCount=0;
                 $("#reset").attr("value","Play again");
                 gotwinner=1;
                 return;
             }else{
                 turn = player1;
                 gamemsg(player1+"'s turn now: ");
                 $("#turn").append('<i class="'+icon_plyr1+'">');

             }
             return;    
         }
         else{
             return;
         } 
     }   
     function win_check(n,player){
         if(
     
             (grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
             (grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
             (grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||
             (grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
             (grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
             (grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||   
             (grid[0][0]==n && grid[1][1]==n && grid[2][2]==n) ||
             (grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)
             ){
             $("#result").text(player+" Is The Winner..!");
             console.log("win")
             gotwinner = 1;
             moveCount=0;
             $("#turn").text("Game Over..!");
             $("#reset").attr("value","Play again");
             return true;
         }
         return false;
     } 
 });
 };
 }); 