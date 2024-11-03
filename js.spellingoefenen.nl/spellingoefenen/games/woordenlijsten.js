// *** Words

wordsGroep = 4; // 1 tot 8
wordsCat = "WOORDPAKKET"; // WOORDPAKKET, SPELLINGSCATEGORIE, ALLES
wordsMethode = "taalactief5";
wordsPakketten = ""; // ,W4.1,W4.2,W4.3, (ook komma's vóór en achter)


wordsGroep = ""; // 0
wordsCat = "";
wordsMethode = "";
wordsPakketten = ""; 
if (typeof pit === undefined) {
    var pit = {};
}
if (typeof nnj === undefined) {
    var nnj = {};
}
if (typeof taalactief5 === undefined) {
    var taalactief5 = {};
}
if (typeof strategischsspellen === undefined) {
    var strategischsspellen = {};
}
if (typeof staal2 === undefined) {
    var staal2 = {};
}
if (typeof taaljacht === undefined) {
    var taaljacht = {};
}

wordsOk = false;	


   
if(gameType!="dictee"){ 
	var words = mergeLists([lijn3,veiliglerenlezen,taaljournaal,taalactief3,taalactief4,taalactief5,taalverhaal,taalopmaat,spellingopmaat,tijdvoortaal,staal,spellinginbeeld,spellinginbeeld2,taalverhaalnu,allesineen,pit,nnj,strategischsspellen,staal2,taaljacht,Categorie]);
}
else if(gameType=="dictee"){
	var words = mergeLists([lijn3,veiliglerenlezen,taalactief3,taalactief4,taalactief5,spellinginbeeld2,taaljournaal,taalverhaalnu,pit,staal,staal2,taaljacht,Categorie]);	
}

	
console.log(gameType);
	   
function mergeLists(items){


    var newList = new Object();
    for(i=0;i<items.length;i++){
        for(var prop in items[i]) {
            newList[prop] = items[i][prop];
        }
     }
     return newList;


}


function showWL()
{
	//console.log("showWL");

	ge("wl").style.display = "table";
	updateWL();
}

function updateWL()
{
	//console.log('updateWL');
	
	
	if(gameType!="dictee")
	{ 
		var words = mergeLists([lijn3,veiliglerenlezen,taaljournaal,taalactief3,taalactief4,taalactief5,taalverhaal,taalopmaat,spellingopmaat,tijdvoortaal,staal,spellinginbeeld,spellinginbeeld2,taalverhaalnu,allesineen,pit,nnj,strategischsspellen,staal2,taaljacht,Categorie]);
	}
	else if(gameType=="dictee")
	{
		var words = mergeLists([lijn3,veiliglerenlezen,taalactief3,taalactief4,taalactief5,spellinginbeeld2,taaljournaal,taalverhaalnu,pit,staal,staal2,taaljacht,Categorie]);	
	}
	
	
	if(typeof klas_wachtwoord === "undefined") klas_wachtwoord = "";
	if(typeof taak === "undefined") taak = "";
	if(typeof leerling === "undefined") leerling = "";
	
	
	if(klas_wachtwoord != "" && taak != "" && leerling != "")
	{
	
	}
	else
	{
		if(wordsGroep != 0)
		{
	
			$('#wl_logosimpel_img').animate({"height": 70 }, 250);
			$('#wl_logo_img').animate({"height": 70 }, 250);
				
		}
		
		
		// *** Groep
		if(wordsGroep == 0 || wordsCat == "" || wordsCat == "ALLES")
		{
			$("#wl_groep").slideDown(250);
	
			
			for(i = 1; i <= 8; i++)
			{
				var myElem = document.getElementById("wl_groep_" + i);

				if(myElem === null)
				{
					//console.log(i + ' does not exist!');
				}
				else
				{				
					if(i == wordsGroep)
					{
						ge("wl_groep_" + i).className = "wl_groep_button_selected"; 
					}
					else
					{
						ge("wl_groep_" + i).className = "wl_groep_button";
					}
				
				}
			}
		}
		else
		{
			$("#wl_groep").slideUp(250);
		}
		
		// *** Cat
		if(wordsGroep > 0 && wordsCat == "" || wordsCat == "ALLES")
		{
			//ge("wl_cat").style.display = "block";
			$("#wl_cat").slideDown(250);
			
			if(wordsCat == "WOORDPAKKET") 		ge("wl_cat_1").className = "wl_button_selected"; else ge("wl_cat_1").className = "wl_button";
			if(wordsCat == "SPELLINGSCATEGORIE") 	ge("wl_cat_2").className = "wl_button_selected"; else ge("wl_cat_2").className = "wl_button";
			if(wordsCat == "ALLES") 		ge("wl_cat_3").className = "wl_button_selected"; else ge("wl_cat_3").className = "wl_button";
		}
		else
		{
			//ge("wl_cat").style.display = "none";
			$("#wl_cat").slideUp(250);
		}		
			
		// *** Woordenlijsten
		if(wordsGroep > 0 && wordsCat != "" && wordsCat != "ALLES")
		{		
			if(wordsCat == "ALLES")
			{
				ge("wl_woordenlijsten").innerHTML = "";
			}
			else if(wordsCat == "WOORDPAKKET" && wordsMethode == "")
			{
				//$("#wl_groep").slideUp(250);
				//$("#wl_cat").slideUp(250);
				
				html = "<div>Kies een methode:</div>";
				
				keyFound = false;
				
				methodesDone = "";
				
				
				for(key in words)
				{			
					if(words[key].groep == wordsGroep && words[key].cat == wordsCat)
					{
						thisMethode = words[key].titel.substr(0, words[key].titel.indexOf("|"));
						
						if(methodesDone.indexOf("~||~" + thisMethode + "~||~") < 0)
						{
							if(thisMethode == wordsMethode) thisClass = "wl_list_selected"; else thisClass = "wl_list";
						
							html += "<a href='javascript: selectMethode(\"" + thisMethode + "\"); void(0);' id='methode_" + thisMethode + "' class='" + thisClass + "'>" + thisMethode + "</a>";
											
							methodesDone += "~||~" + thisMethode + "~||~";
							
							keyFound = true;
						}
					}		
				}
				
				if(!keyFound) html += "<i>Helaas geen woordenlijsten gevonden!<br>Kies een andere categorie!</i>";
	
	
				html += "<a href='javascript: selectCatWL(\"\"); void(0);' class='wl_terug'>Terug</a>";
							
				ge("wl_woordenlijsten").innerHTML = html;
			}		
			else
			{
				extraTitle = "";
				
				if(wordsMethode != "")
				{
					extraTitle = " van methode " + wordsMethode;
				}
				
				wordsCategorie = wordsCat;
				if(wordsCat=="SPELLINGSCATEGORIE"){wordsCategorie="SPELLINGCATEGORIE"}
				
				html = "<div>Kies tenminste &eacute;&eacute;n " + wordsCategorie.toLowerCase() + extraTitle + ":</div>";
				
				keyFound = false;
						
				for(key in words)
				{
					methodeCheck = true;
					
					if(wordsMethode != "")
					{
						if(words[key].titel.indexOf(wordsMethode + "|") >=0) methodeCheck = true; else methodeCheck = false;
					}
					
					if(words[key].groep == wordsGroep && words[key].cat == wordsCat && methodeCheck)
					{
						if(wordsPakketten.indexOf("," + key + ",") >= 0) thisClass = "wl_list_selected"; else thisClass = "wl_list";
						
						html += "<a  title =" + words[key].woorden.split(" ").join("_") + "\ href='javascript: selectWL(\"" + key + "\"); void(0);' id='woordenlijst_" + key + "' class='" + thisClass + "'>" + words[key].titel.split(wordsMethode + "|").join("") + "</a>";
						
						keyFound = true;
					}		
				}
				
				if(!keyFound){ html += "<i>Helaas geen woordenlijsten gevonden!<br>Kies een andere categorie!</i>";}
				
				
				if(wordsMethode != "") html += "<a href='javascript: selectMethode(\"\"); void(0);' class='wl_terug'>Terug</a>"; else html += "<a href='javascript: selectCatWL(\"\"); void(0);' class='wl_terug'>Terug</a>";
				
				ge("wl_woordenlijsten").innerHTML = html;
			}
	
			$("#wl_woordenlijsten").slideDown(250);
			
		}
		else
		{
			$("#wl_woordenlijsten").slideUp(250);
		}
	
	
		// *** Start button
		if(wordsGroep > 0 && wordsCat != "" && (wordsPakketten != "" || wordsCat == "ALLES"))
		{
			$("#wl_start").slideDown(250);
			$("#wl_logo").slideUp(250);
			wordsOk = true;
		}
		else
		{
			$("#wl_start").slideUp(250);
			$("#wl_logo").slideDown(250);
			wordsOk = false;
		}	
		
		//console.log(ge("wl_td_div").scrollHeight) // = objDiv.scrollHeight;
		
		
		
		if(typeof wlNoScroll === "undefined") wlNoScroll = false;
		
		if(!wlNoScroll)
		{
			setTimeout(function(){ 
			
				window.scrollTo(0,document.body.scrollHeight); 
				//alert("scroll");
			
			}, 500);
		}	
	}	
}

function selectGroepWL(groep)
{
	//console.log("selectGroepWL");
	
	wordsGroep = groep;
	wordsMethode = "";
	wordsPakketten = "";
	updateWL();
}

function selectCatWL(cat)
{
	//console.log("selectCatWL");

	wordsCat = cat;
	wordsMethode = "";
	wordsPakketten = "";
	updateWL();	
}

function selectMethode(title)
{
	//console.log("selectMethode");

	wordsMethode = title;
	wordsPakketten = "";
	updateWL();	
	//if(gameType=='oefenen'){BijTellen(wordsMethode);}
}


function selectWL(key)
{
	//console.log("selectWL");

	if(wordsPakketten.indexOf("," + key + ",") >= 0)
	{
		wordsPakketten = wordsPakketten.split("," + key + ",").join(",");
	}
	else
	{
		wordsPakketten += "," + key + ",";
	}

	// *** Verschonen
	wordsPakketten = wordsPakketten.trim();
	wordsPakketten = wordsPakketten.split(",,").join(",");
	if(wordsPakketten == ",") wordsPakketten = "";
	wordsPakketten = wordsPakketten.trim();
	//console.log(wordsPakketten);
	
		setCookie('groep',wordsGroep,100)
		setCookie('categorie',wordsCat,100)
		setCookie('methode',wordsMethode,100)
		setCookie('paketten',wordsPakketten,100)
	
	updateWL();	
}

function startWL()
{
	
	if(gameType!="dictee"){ 
	var words = mergeLists([lijn3,veiliglerenlezen,taaljournaal,taalactief3,taalactief4,taalactief5,taalverhaal,taalopmaat,spellingopmaat,tijdvoortaal,staal,spellinginbeeld,spellinginbeeld2,taalverhaalnu,allesineen,pit,nnj,strategischsspellen,staal2,taaljacht,Categorie]);
}
else if(gameType=="dictee"){
	var words = mergeLists([lijn3,veiliglerenlezen,taalactief3,taalactief4,taalactief5,spellinginbeeld2,taaljournaal,taalverhaalnu,pit,staal,staal2,taaljacht,Categorie]);	
}
	
	if(wordsOk)
	{
		completeWL = "";
		
		// *** Alles: alles van de groep pakken!
		if(wordsCat == "ALLES")
		{
			wordsPakketten = "";
			
			for(key in words)
			{
				if(words[key].groep == wordsGroep)
				{
					wordsPakketten += "," + key + ",";
				}		
			}		
		}
		
		
		// *** Woordenlijsten samenvoegen
		temp = wordsPakketten.split(",");
		
		for(i = 0; i < temp.length; i++)
		{
			if(temp[i] != "")
			{
				completeWL += words[temp[i]].woorden + ",";
			}
		}
	
	
		completeWL = completeWL.split(",,").join(",");		
		console.log("completeWL: " + completeWL);
		
		spelPool = completeWL;
		
		ge("wl").style.display = "none";
		
		setCookie('groep',wordsGroep,100)
		setCookie('categorie',wordsCat,100)
		setCookie('methode',wordsMethode,100)
		setCookie('paketten',wordsPakketten,100)
		
		resetGame();
	}
	else console.log("startWL could not start: " + wordsOk);
	
	play = true;
}


function initWL()
{	
	
   if(typeof klas_wachtwoord === "undefined") klas_wachtwoord = "";
	if(typeof taak === "undefined") taak = "";
	if(typeof leerling === "undefined") leerling = "";
	
	
	
	// *** Oefenen met klas of normaal spelen?
	if(klas_wachtwoord != "" && taak != "" && leerling != "")
	{
		// *** Oefenen met klas
		console.log("Oefenen met klas (klas_wachtwoord: " + klas_wachtwoord + ", taak: " + taak + ", leerling: " + leerling + ")");
	
		ge("wl_groep").style.display = "none";
	
		ge("wl_start").innerHTML = "<h1>Taak " + taakNaam + "</h1><a href='javascript: startWLTaak(); void(0);' class='wl_start_button'>Start</a>";
		ge("wl_start").style.display = "block";
		
		
	}
	else
	{
		
		
		// *** Normaal spelen
		selectGroepWL(groep);
		selectCatWL(categorie);
		selectMethode(methode);
		selectWL(paketten)
		
	}	
}

function startWLTaak()
{
	// *** Er werd op de start-knop gedrukt om de taak voor de leerling te starten
	ajaxUpdate("a=getTaak&klas_wachtwoord=" + klas_wachtwoord + "&taak=" + taak + "&leerling=" + leerling);
}

function startWLTaakReturn(answer)
{
	// *** Taak array binnengehaald voor de leerling
	console.log("startWLTaakReturn");
	
	// *** Woordenlijst
	var wl_array = $.parseJSON(answer["wl"]);
	completeWL = wl_array.join(",");		
	console.log("completeWL: " + completeWL);
	spelPool = completeWL;
	
	// *** Voortgang
	voortgang = parseInt(answer["voortgang"]);
	console.log("voortgang: " + voortgang);
	
	// *** Pogingen
	console.log("Pogingen array:");
	pogingen = answer["pogingen"];
	console.log(pogingen);
	
	ge("wl").style.display = "none";
	
	resetGame();
}



function setCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}