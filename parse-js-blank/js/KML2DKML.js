var tab = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp';
var tabCoord = +tab+tab+tab+tab+tab+tab+tab+tab+tab+tab+'&nbsp;';

function readText(filePath,numberOfDivision) { 

/*
		var output = ""; //placeholder for text output
        var reader =reader = new FileReader();       
        reader.onload = function (e) {
                output = e.target.result;
                //displayContents(output);
                ConvertKMLContent(output,numberOfDivision);
        };//end onload()
        
        reader.readAsText(filePath.files[0]);
*/
		var data = new Object;
		var dkmlArray = new Array();
		var txtFile = " ";
        var j = 0, k = filePath.files.length;
     	for (var i = 0; i < k; i++) {
         var reader = new FileReader();
         reader.onloadend = function (evt) {
             if (evt.target.readyState == FileReader.DONE) {
             	//txtFile = txtFile + evt.target.result;
             	dkmlArray.push(ConvertKMLContent(evt.target.result,numberOfDivision));
                 data["File_Content" + j] = btoa(evt.target.result);
                 j++;
                 if (j == k){
                 	 var dkmlConcat = "<p style='margin-left:-30em;'>"+"&lt;Document>"+ "<br>";
                 	for(dkml in dkmlArray){
                 		dkmlConcat = dkmlConcat + dkmlArray[dkml];
                 	}
                 	dkmlConcat = dkmlConcat+"&lt;/Document>";
                 	displayContents(dkmlConcat);
                 	alert("All file has been read");
                     
                 }
             }
         };
         reader.readAsBinaryString(filePath.files[i]);
     }
         

        return true;
    }   
function displayContents(txt) {
        var el = document.getElementById('main'); 
        el.innerHTML = txt; //display output in DOM
    } 

 var someInt = 0;  
function ConvertKMLContent(txt,numberOfDivision) {		
		
		if (window.DOMParser)
		  {
		  parser=new DOMParser();
		  xmlDoc=parser.parseFromString(txt,"text/xml");
		  var coordString = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
		  var arrayOfCoord = coordString.split(" ");
		  
		  var arrayCleaner = new Array();
		  for(var coord in arrayOfCoord){
			if (arrayOfCoord[coord]) {
				arrayCleaner.push(arrayOfCoord[coord]);
			};
		  }
		  arrayOfCoord = arrayCleaner;
		 
		  var vertexesCoord = new Array();
		  var vertexesId = new Array();

		  var someIntFirstInt = someInt;
		  for(var coord in arrayOfCoord){
		  	if (!(someInt % numberOfDivision)) {

		  		vertexesId.push(someInt);
		  		vertexesCoord.push(arrayOfCoord[coord]);
		  	};
		  	someInt = someInt + 1;
		  }
		  
		  var lastElement = arrayOfCoord.pop();
		  arrayOfCoord.push(lastElement);

		  var firstElement = arrayOfCoord[0];
		  if (vertexesCoord.indexOf(firstElement) == -1 ) {
		  	vertexesId.unshift(someIntFirstInt);
		  	vertexesCoord.unshift(firstElement);
		  };
		  if (vertexesCoord.indexOf(lastElement) == -1 ) {
		  	vertexesId.push(someInt-1);
		  	vertexesCoord.push(lastElement);
		  };

		  //vertexesId.push(someInt - 1)
		  //vertexesCoord.push(arrayOfCoord[someInt-1]);//to add the last coord

		  
		  var dkml = tab+ "&lt;Vertexes>" + "<br>";
		  for(var vertex in vertexesCoord){
		  	dkml = dkml +tab+tab+ "&lt;vertex>"+ "<br>";
		  	dkml = dkml +tab+tab+tab+ "&lt;id>"+ vertexesId[vertex] +"&lt;/id>"+ "<br>";
		  	dkml = dkml +tab+tab+tab+ "&lt;coordinates>"+ vertexesCoord[vertex] +"&lt;/coordinates>"+ "<br>";
		  	//dkml = dkml +tabCoord+"&lt;coordinates>"+ vertexesCoord[vertex] +"&lt;/coordinates>"+ "<br>";
		  	dkml = dkml +tab+tab+ "&lt;/vertex>"+ "<br>";
		  }
		  dkml = dkml + tab+ "&lt;/Vertexes>" + "<br>";
		 
		  var firstVertixId;
		  var lastVertixId;
		  var arrayOffSet = -1;

		  for(var vertex in vertexesId){

		  	  firstVertixId = vertexesId[vertex];
		  	  
		  	  if(lastVertixId>=0){
				  dkml = dkml +tab+ "&lt;Placemark>"+ "<br>";
				  dkml = dkml +tab+tab+ "&lt;name>"+lastVertixId+"-"+firstVertixId+"&lt;/name>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;weight>"+"1"+"&lt;/weight>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;src>"+lastVertixId+"&lt;/src>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;dest>"+firstVertixId+"&lt;/dest>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;LineString>"+"<br>";
				  dkml = dkml +tab+tab+tab+ "&lt;coordinates>";
				  for (var i = lastVertixId; i <= firstVertixId; i++) {
				  	if (i == firstVertixId) {
				  		dkml = dkml+arrayOfCoord[i-arrayOffSet];
				  	}
				  	else{
				  		dkml = dkml+arrayOfCoord[i-arrayOffSet]+" ";
				  	}	
				  };
				  dkml = dkml +"&lt;/coordinates>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;/LineString>"+"<br>";
				  dkml = dkml +tab+ "&lt;/Placemark>"+ "<br>";
			  }
			  if (arrayOffSet == -1) {
			  		arrayOffSet = vertexesId[vertex];
			  };
			  lastVertixId = vertexesId[vertex];
			}
		 	

		  //dkml = dkml.replace(/&/g, '&amp;').replace(/</g, '&lt;');
		  return dkml;
		  }
		else // Internet Explorer
		  {
		  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		  xmlDoc.async=false;
		  xmlDoc.loadXML(txt); 
		  } 
}