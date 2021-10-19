/*
* Author: Caleb Hunter
* Contact: cjhunter@svsu.edu
* Date: 10-18-2021
* Project: assignment03
*----------------------------------------------------
* Description: This is a golf score card app that keeps track of a player's strokes.
*   The app will also calculate how far over par the player is, and tally up a
*   total score and total over par for the entire game. 
*/

let elem = [];
// assign the entire table row for hole 1 to a variable, elem
// elem[1] = document.getElementById("1");

// display the number of children (all td elements)
// console.log(elem.children.length);
// display the content of the + button, which is the first child of the fifth element
// console.log(elem.children[4].children[0]); 

// assign a function to the + button
// elem[1].children[4].children[0].onclick = function(){add1(elem[1]);};


//loop through rows of table and check if buttons are clicked, then execute their respective functions (add stroke, subtract stroke, clear row)
for(let i=1; i<=18; i++) {
  elem[i] = document.getElementById(i.toString());
  elem[i].children[4].children[0].onclick = function(){add1(elem[i]);};
  elem[i].children[4].children[1].onclick = function(){subtract1(elem[i]);};
  elem[i].children[4].children[2].onclick = function(){clearHole(elem[i]);};
}





// create an "add1" function
function add1 (elem) {
  if(elem.children[2].innerHTML == "-") 
    elem.children[2].innerHTML = "1";
  else {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    elem.children[2].innerHTML = currentScore + 1;
  }

  //I added this function to calculate the over/under of a single hole (row), the row that is calculated is the argument that is passed (in this case "elem" is the specific row)
  overAdjust(elem);
}

//This function subtracts one stroke from the argument's score and calculates the over accordingly by calling overAdjust(elem)
function subtract1 (elem)
{
  if(elem.children[2].innerHTML == "-")
  {
    elem.children[2].innerHTML = "-1";
  }
  else
  {
    let currentScore = elem.children[2].innerHTML;
    currentScore = Number.parseInt(currentScore);
    elem.children[2].innerHTML = currentScore - 1;
  }

  //call overAdjust(elem) to calculate over for this hole (elem) 
  overAdjust(elem);
}

//function that calculates over for given hole 
function overAdjust(elem)
{
  //variable over to store value of and calculate over
  let over = Number.parseInt(elem.children[2].innerHTML) - Number.parseInt(elem.children[1].innerHTML);
  //pass over to the DOM
  elem.children[3].innerHTML = over;

  //adjust total score and over for entire game overall
  totalAdjust();
}

//function that adjusts "TOTAL" row to display the score and over for the entire game in the DOM
function totalAdjust()
{
  let totalScore = 0, totalOver = 0;

  //loop very that goes through every hole (finds them by id) and totals up score and over for entire game
  for(let i = 1; i <= 18; i++)
  {
    elem[i] = document.getElementById(i.toString());
    let curScore = elem[i].children[2].innerHTML;
    let curOver = elem[i].children[3].innerHTML;
    
    if(curScore != "-" && curOver != "-")
    {
      totalScore += Number.parseInt(elem[i].children[2].innerHTML);
      totalOver += Number.parseInt(elem[i].children[3].innerHTML);
    }
  }

  //passes totalScore and totalOver to DOM
  document.getElementById("totals").children[2].innerHTML = totalScore;
  document.getElementById("totals").children[3].innerHTML = totalOver;
}

//clears score and over for specific hole that is passed by argument
function clearHole(elem)
{
  //I have to initially set the DOM's over to a number so overAdjust doesn't return NaN and I can't just leave over because it will cause a logic error with the over calculation
  elem.children[2].innerHTML = "-";
  elem.children[3].innerHTML = "0";

  overAdjust(elem);

  //here I just set the DOM's over to "-" for the specific argument
  elem.children[3].innerHTML = "-";
}
