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
                 	 var dkmlConcat = "";
                 	for(dkml in dkmlArray){
                 		dkmlConcat = dkmlConcat + dkmlArray[dkml];
                 	}
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
function ConvertKMLContent(txt,numberOfDivision) {		
		
		if (window.DOMParser)
		  {
		  parser=new DOMParser();
		  xmlDoc=parser.parseFromString(txt,"text/xml");
		  var coordString = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
		  var arrayOfCoord = coordString.split(" ");
		  
		  var coord;
		  var newTxt = '';
		  var someInt = 0;
		  var vertexesCoord = new Array();
		  var vertexesId = new Array();
		  for(coord in arrayOfCoord){
		  	if (!(someInt % numberOfDivision)) {
		  		vertexesId.push(someInt);
		  		vertexesCoord.push(arrayOfCoord[coord]);
		  	};
		  	someInt = someInt + 1;
		  }
		  vertexesId.push(someInt - 1)
		  vertexesCoord.push(arrayOfCoord[someInt-1]);//to add the last coord

		  var tab = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp';
		  var tabCoord = +tab+tab+tab+tab+tab+tab+tab+tab+tab+tab+'&nbsp';
		  var dkml = "<p style='margin-left:-30em;'>"+"&lt;Document>"+ "<br>" +tab+ "&lt;Vertexes>" + "<br>";
		  for(var vertex in vertexesCoord){
		  	dkml = dkml +tab+tab+ "&lt;vertex>"+ "<br>";
		  	dkml = dkml +tab+tab+tab+ "&lt;id>"+ vertexesId[vertex] +"&lt;/id>"+ "<br>"
		  	dkml = dkml +tabCoord+"&lt;coordinates>"+ vertexesCoord[vertex] +"&lt;/coordinates>"+ "<br>"
		  	dkml = dkml +tab+tab+ "&lt;/vertex>"+ "<br>";
		  }

		 
		  var firstVertixId;
		  var lastVertixId;

		  for(var vertex in vertexesId){

		  	  firstVertixId = vertexesId[vertex];
		  	  
		  	  if(lastVertixId>=0){
		  	  	
		  	  	  dkml = dkml +tab+ "&lt;/Vertexes>"+ "<br>";
				  dkml = dkml +tab+ "&lt;Placemark>"+ "<br>";
				  dkml = dkml +tab+tab+ "&lt;name>"+lastVertixId+"-"+firstVertixId+"&lt;/name>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;weight>"+"1"+"&lt;/weight>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;src>"+lastVertixId+"&lt;/src>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;dest>"+firstVertixId+"&lt;/dest>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;LineString>"+"<br>";
				  dkml = dkml +tab+tab+tab+ "&lt;coordinates>"+"<br>";
				  for (var i = lastVertixId; i <= firstVertixId; i++) {
				  	dkml = dkml +tab+tab+tab+tab+arrayOfCoord[i]+"<br>";	
				  };
				  dkml = dkml +tab+tab+tab+ "&lt;/coordinates>"+"<br>";
				  dkml = dkml +tab+tab+ "&lt;/LineString>"+"<br>";
				  dkml = dkml +tab+ "&lt;/Placemark>"+ "<br>";
			  }
			  lastVertixId = vertexesId[vertex];
			}
		 dkml = dkml+"&lt;/Document>";	

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