/*  LOGIC for the solution

The number is passed as a string at the beginning .
validate() function validates the length of the string which in turn goes through parses the string (parseStr function) and removeDuplicates function to give the end result
Get all the pair combinations of the string: For eg: 4798 will give 47,79,98.
If length of the string 
      < 7 -> INVALID
      = 7 & not a zero , is unique and <59 -> OUTPUT
      >7 -> passes through a logic explained below 

      Taking two consecutive elements (val1,val2) at a time,
      Scenario 1 : If val1 <val2 && val1 <59 ---> retain val1 and discard val2
      Scenario 2 : If val1< val 2 && val1>59 ----> Split val1 and take first digit, discard val2
      Scenario 3: If val1 >val2 && val1 <59 ----> retain val1 
      Scenario 4 : If val1> val 2 && val1>59 ----> Split val1 and take first digit, discard val2

Parse the result to check for the length again :
   if >7 , aggregate the adjacent single digits to double until length is 7.
   else , split the double digits until length is 7.

Check the result from parsing to make sure there are no duplicates.


*/


var item='1234568947';
lottoPicks=[];
var combinations=[];

function validate(){
   if (item.length < 7) {
     console.log("Invalid...");
     return false;
   }
    //taking care of the zero case
    if (item.length === 7 && item.indexOf(0) !== -1) {                 
    console.log("length===7 but has a zero...Invalid...");
    return false;
    }
    var numArr = item.split('');
    if (item.length === 7) {
      console.log("item length is 7");
      var isUnique = true;
      numArr.some(function(item, index, arr) {
        if (arr.indexOf(item) !== arr.lastIndexOf(item)) {
          isUnique = false;
          return true;
        }
      });
      if (isUnique) {
        console.log("Final output: "+ numArr);
        return item;
        //lottoPicks.push(item.split('').join(' '));
      }
    }
  else if(item.length>7){
    console.log(Math.floor(item.length-item.length%7)+" single digits possible and "+item.length%7+" double digits");
    for(let i=0;i<item.length-1;i++){
      combinations[i]=item.charAt(i)+item.charAt(i+1);
    }
          console.log("Combinations are :"+combinations);
     for(let i=0;i<item.length-1;i++){
       if(combinations[i]!=combinations[combinations.length-1]){
         
     if(combinations[i]<combinations[i+1]||combinations[i]>combinations[i+1]&&combinations[i]<59){
        combinations.splice(i+1,1);
        console.log("combinations[i]<59,After " +(i)+" spliced iteration :" +combinations);
        }  
         
      else if(combinations[i]<combinations[i+1]||combinations[i]>combinations[i+1]&&combinations[i]>59){
       console.log("else if...case 2...split val1");
       
      console.log("After i=" +(i)+" spliced iteration :" +combinations);
           var splitval1=combinations[i].toString();
           
           //Replacing 94 with 9 and 4
          combinations.splice(i,1,splitval1.charAt(0),splitval1.charAt(1)); 
                  console.log("Splitval1 "+splitval1);
          console.log("After converting combinations[i+1] to string..."+combinations);
        i++;
         }//else if
         }//closing if combinations[i]!=combinations[combinations.length-1]
         //else-Split the last element and take the last digit
         else{
           console.log("else- Split the last element and take the last digit");
                      var splitlast=combinations[i].toString();
          console.log("Splitlast :"+splitlast);
          console.log("Last char is :"+splitlast.charAt(1));

          combinations.splice(i,1,splitlast.charAt(1)); 

       console.log("Finally :" +combinations);
 
         }
      
    }//else if item.length>7

  
  }//for
  
 parseStr(combinations) ; 
}

function parseStr(input){
  
  console.log("Passed array is "+input);
  if(input.length===7)
return input;
  else if(input.length<7){
   // var counter=0;
    
             for(let i=0;i<input.length;i++){
               if(input.length<7){
                 console.log("Input's length now is "+input.length);
      if(input[i]>9&&input[i]<60){
        var splitval=input[i].toString();
           //Replacing 94 with 9 and 4
          input.splice(i,1,splitval.charAt(0),splitval.charAt(1)); 
                  console.log("Splitval "+splitval);
        input.removeDuplicates();
           }//if
                 
               }   
    }//for
  }//else if
  
  else{
    for(let i=0;i<input.length;i++){
      console.log("Input's length now is "+input.length);
      if(input[i]<9&&input[i]>0){
        if(input[i] + input[i + 1]<59)
      //var splitval=input[i].toString();
           //Replacing 94 with 9 and 4
    input.splice(i + 1, 1);
                  //console.log("Splitval "+splitval);
        input.removeDuplicates();
           }//if
    }
  }
  console.log("Final output :" +input);
}


Array.prototype.removeDuplicates=function(){
  var tem,i=0,j;
  while(i<this.length){
    tem= this[i];
    j= this.length-1;
    while(j>i){
      if(this[j]===tem)this.splice(j,1);
      --j;
    }
    ++i;
  }
  return this;
}



validate();