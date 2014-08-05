function readText(filePath) { 

		var output = ""; //placeholder for text output
        var reader =reader = new FileReader();       
        reader.onload = function (e) {
                output = e.target.result;
                //displayContents(output);
                ConvertKMLContent(output);
        };//end onload()
        
        reader.readAsText(filePath.files[0]);
         
        return true;
    }   
function displayContents(txt) {
        var el = document.getElementById('main'); 
        el.innerHTML = txt; //display output in DOM
    } 
function ConvertKMLContent(txt) {		
	
		if (window.DOMParser)
		  {
		  parser=new DOMParser();
		  xmlDoc=parser.parseFromString(txt,"text/xml");
		  var coordString = xmlDoc.getElementsByTagName("coordinates")[0].childNodes[0].nodeValue;
		  var arrayOfCoord = coordString.split(" ");
		  
		  var coord;
		  var newTxt = '';
		  var someInt = 0;
		  var vertexes = new Array();
		  for(coord in arrayOfCoord){
		  	if (!(someInt % 10)) {
		  		vertexes.push(arrayOfCoord[coord]);
		  	};
		  	someInt = someInt + 1;
		  }
		  console.log(vertexes);
		  var tab = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp';
		  var tabCoord = +tab+tab+tab+tab+tab+tab+tab+tab+tab+tab+'&nbsp';
		  var dkml = "<p style='margin-left:-30em;'>"+"&lt;Document>"+ "<br>" +tab+ "&lt;Vertexes>" + "<br>";
		  for(var vertex in vertexes){
		  	dkml = dkml +tab+tab+ "&lt;vertex>"+ "<br>";
		  	dkml = dkml +tab+tab+tab+ "&lt;id>"+ vertex +"&lt;/id>"+ "<br>"
		  	dkml = dkml +tabCoord+"&lt;coordinates>"+ vertexes[vertex] +"&lt;/coordinates>"+ "<br>"
		  	dkml = dkml +tab+tab+ "&lt;/vertex>"+ "<br>";
		  }
		  dkml = dkml +tab+ "&lt;/Vertexes>"+ "<br>";
		  dkml = dkml +tab+ "&lt;Placemark>"+ "<br>";
		  dkml = dkml +tab+tab+ "&lt;name>"+"0-1"+"&lt;/name>"+"<br>";
		  dkml = dkml +tab+tab+ "&lt;weight>"+"1"+"&lt;/weight>"+"<br>";
		  dkml = dkml +tab+tab+ "&lt;src>"+"0"+"&lt;/src>"+"<br>";
		  dkml = dkml +tab+tab+ "&lt;dest>"+"1"+"&lt;/dest>"+"<br>";
		  dkml = dkml +tab+tab+ "&lt;LineString>"+"<br>";
		  dkml = dkml +tab+tab+tab+ "&lt;coordinates>"+"<br>";
		  //dkml = dkml.replace(/&/g, '&amp;').replace(/</g, '&lt;');
		  displayContents(dkml);
		  }
		else // Internet Explorer
		  {
		  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		  xmlDoc.async=false;
		  xmlDoc.loadXML(txt); 
		  } 
}