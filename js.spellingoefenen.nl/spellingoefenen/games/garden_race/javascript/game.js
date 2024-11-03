// *** GAME FLOW

// *** Show playbutton and afterwards the preload bar
function showPlaybutton()
{	
	console.log("showPlaybutton");
	game["status"] = "PLAYBUTTON";

	if(klas_wachtwoord == "")
	{
		// wlClick(1, 0);	// **************************************

		// wlGetList();
		
		//game["score"] = 1;
		//highscoreView();
	}
}

// *** Show preload bar
function showPreloader()
{
	if(versionHTML != gameEngine["version"])
	{
		alert("Je hebt een verouderde versie (" + gameEngine["version"] + ") in je cache staan terwijl het spel aangeeft dat er een nieuwere is (" + versionHTML + "). Verwijder je cache of druk SHIFT+F5.");
	}
	else
	{
		// *** Android must be in fullscreen as navigation bars are too big
		if(gameEngine["isAndroid"] && gameEngine["isTopWindow"])
		{
			gameEngine["globalFullscreen"] = checkFullscreen(); // does not work in all browsers
			console.log("globalFullscreen: " + gameEngine["globalFullscreen"]);
			if(!gameEngine["globalFullscreen"]) toggleFullScreen();
		}
			
		showPreloaderProceed();
	}
}

function showPreloaderProceed()
{
	game["status"] = "PRELOAD";
	loadManifest();
}

// *** Show intro screen
function showIntro()
{
	deleteAllO();
	game["status"] = "INTRO";
	if(!gameEngine["iOS"]) showIntroProceed();
}

function showIntroProceed()
{	
	gameEngine["playButtonIntroMessage"] = false;
}

// *** Start game (start playing)
function startGame()
{
	console.log("--- startGame ---"); console.log("klas_wachtwoord: " + klas_wachtwoord); console.log("taak: " + taak); console.log("leerling: " + leerling); console.log("taakNaam: " + taakNaam);
	
	pressedKeys = [];
	for(key in o) { delete o[key]; }
	for(key in particle) delete particle[key];
	
	// completeWL = "a,b"; // Alle mensen ... (vinden v.t.) dat de minister-president moest aftreden
	// wlAjaxGet();
	//if(!gameEngine["isTabletSmartphone"]) mySunbeam = addSunbeam(1200, 500, 0.5, "BEHIND");
	//wlInit(completeWL);
	//wlNextRound();
	//nextQuestion();
		
	game["score"] = 0;

	// startWLTaak() ??
	if(klas_wachtwoord != "" && taak != "" && leerling != "" && 1==2) ajaxUpdate("a=wlAjaxGetTaak&klas_wachtwoord=" + klas_wachtwoord + "&taak=" + taak + "&leerling=" + leerling);	else wlRetrieve();	
	
	// addText("100", 700, 350);
	// setTimeout(function(){ game["wlCheckAnswerParticles"] = false; nextQuestion(); game["status"] = "QUESTION"; }, 3000);	
	/* *** Show questions setTimeout(function(){ game["playerNextLevel"] = false; game["wlCheckAnswerParticles"] = false; nextQuestion(); game["status"] = "QUESTION"; }, 5000); */
		
	showSelectScreen();
	// startRace();
	// showRanking();
	
	getRaceCookie();
}

function showRanking()
{
	playSound("fanfare");

	game["status"] = "RANKING";
	game["rankingY"] = -game["rankingPosPrev"]*70 + 8*70;
	game["count"] = 0;
}

function wlRetrieve()
{
	console.log("wlRetrieve: get WL word here maybe?");
}

function setRaceCookie()
{
	cookie = "";
	
	cookie += game["avatar"] + "|";
	cookie += game["avatarName"].split("|").join("I") + "|";
	cookie += (game["coins"]*4) + "|";
	cookie += game["trackCurrent"] + "|";
	cookie += game["racesFinished"] + "|";
	cookie += game["selectedBoat"] + "|";
	cookie += game["rankingPos"] + "|";
	cookie += game["rankingPosPrev"] + "|";

	for(i = 1; i <= 5; i++)
	{
		cookie += game["track"][i].best + "|";
		cookie += game["track"][i].bestCompare + "|";
	}
		
	for(i = 1; i <= 4; i++)
	{
		if(game["boat"][i].bought) cookie += "1|"; else cookie += "0|";
		cookie += game["boat"][i]["upgrade1"].upgradesDone + "|";
		cookie += game["boat"][i]["upgrade2"].upgradesDone + "|";
		cookie += game["boat"][i]["upgrade3"].upgradesDone + "|";
		cookie += game["boat"][i]["upgrade4"].upgradesDone + "|";
		cookie += game["boat"][i]["upgrade5"].upgradesDone + "|";
	}
	
	
	//console.log("setRaceCookie: " + cookie);
	
	setCookie("raceCookie", cookie);

}

function getRaceCookie()
{
	cookie = getCookie("raceCookie");
	//console.log("getRaceCookie: " + cookie);
	
	if(typeof cookie !== "undefined" && cookie && cookie != "")
	{
		cookie = cookie.split("|");
		game["avatar"] = parseInt(cookie[0]);
		game["avatarName"] = cookie[1];
		game["coins"] = parseInt(cookie[2])/4;
		//game["coins"] = 50000;
		game["trackCurrent"] = parseInt(cookie[3]);
		game["racesFinished"] = parseInt(cookie[4]);
		game["selectedBoat"] = parseInt(cookie[5]);
		game["rankingPos"] = parseInt(cookie[6]);
		game["rankingPosPrev"] = parseInt(cookie[7]);
		game["track"][1].best        = parseFloat(cookie[6+2]);
		game["track"][1].bestCompare = parseFloat(cookie[7+2]);
		game["track"][2].best        = parseFloat(cookie[8+2]);
		game["track"][2].bestCompare = parseFloat(cookie[9+2]);
		game["track"][3].best        = parseFloat(cookie[10+2]);
		game["track"][3].bestCompare = parseFloat(cookie[11+2]);
		game["track"][4].best        = parseFloat(cookie[12+2]);
		game["track"][4].bestCompare = parseFloat(cookie[13+2]);
		game["track"][5].best        = parseFloat(cookie[14+2]);
		game["track"][5].bestCompare = parseFloat(cookie[15+2]);
	
		if(parseInt(cookie[16+2]) == 1) game["boat"][1].bought = true; else game["boat"][1].bought = false;
		game["boat"][1]["upgrade1"].upgradesDone = parseInt(cookie[17+2]);
		game["boat"][1]["upgrade2"].upgradesDone = parseInt(cookie[18+2]);
		game["boat"][1]["upgrade3"].upgradesDone = parseInt(cookie[19+2]);
		game["boat"][1]["upgrade4"].upgradesDone = parseInt(cookie[20+2]);
		game["boat"][1]["upgrade5"].upgradesDone = parseInt(cookie[21+2]);
			
		if(parseInt(cookie[22+2]) == 1) game["boat"][2].bought = true; else game["boat"][2].bought = false;
		game["boat"][2]["upgrade1"].upgradesDone = parseInt(cookie[23+2]);
		game["boat"][2]["upgrade2"].upgradesDone = parseInt(cookie[24+2]);
		game["boat"][2]["upgrade3"].upgradesDone = parseInt(cookie[25+2]);
		game["boat"][2]["upgrade4"].upgradesDone = parseInt(cookie[26+2]);
		game["boat"][2]["upgrade5"].upgradesDone = parseInt(cookie[27+2]);
			
		if(parseInt(cookie[28+2]) == 1) game["boat"][3].bought = true; else game["boat"][3].bought = false;
		game["boat"][3]["upgrade1"].upgradesDone = parseInt(cookie[29+2]);
		game["boat"][3]["upgrade2"].upgradesDone = parseInt(cookie[30+2]);
		game["boat"][3]["upgrade3"].upgradesDone = parseInt(cookie[31+2]);
		game["boat"][3]["upgrade4"].upgradesDone = parseInt(cookie[32+2]);
		game["boat"][3]["upgrade5"].upgradesDone = parseInt(cookie[33+2]);
			
		if(parseInt(cookie[34+2]) == 1) game["boat"][4].bought = true; else game["boat"][4].bought = false;
		game["boat"][4]["upgrade1"].upgradesDone = parseInt(cookie[35+2]);
		game["boat"][4]["upgrade2"].upgradesDone = parseInt(cookie[36+2]);
		game["boat"][4]["upgrade3"].upgradesDone = parseInt(cookie[37+2]);
		game["boat"][4]["upgrade4"].upgradesDone = parseInt(cookie[38+2]);
		game["boat"][4]["upgrade5"].upgradesDone = parseInt(cookie[39+2]);
	}
	else
	{
		console.log("No cookie found.");
	}
}

function loadLevel()
{
	console.log("loadLevel (racesFinished " + game["racesFinished"] + "): " + game["trackCurrent"]);
	
	game["checkpointCount"] = 0;
	
	for(key in o)
	{
		delete o[key];
	}
	
	if(game["trackCurrent"] == 1)
	{
		addLevelObject(17, -1703, -444); addLevelObject(17, -1003, 688); 
		addLevelObject(13, 634, -501); addLevelObject(13, -343, -1526); 		
		addLevelObject(13, -1350, -226); addLevelObject(13, -1126, 1156); addLevelObject(13, -1119, 1478); 
		addLevelObject(13, 221, 1368); addLevelObject(15, -19, -1082); 
		addLevelObject(14, 707, -1528); 		
		addLevelObject(16, -1275, -867); addLevelObject(18, 1540, -296); addLevelObject(16, 461, 760); addLevelObject(17, 41, 703); 
		addLevelObject(13, 302, 464); addLevelObject(13, 347, 627); 
		
		addLevelObject(10, 481, -135); addLevelObject(7, 332, -150); addLevelObject(8, 322, -42); addLevelObject(8, 359, 52); addLevelObject(8, 644, -113); addLevelObject(10, 517, -47); addLevelObject(8, 205, 184); addLevelObject(8, -298, 75); addLevelObject(8, -389, 167); addLevelObject(8, -366, 286); addLevelObject(8, -474, 3); addLevelObject(8, -525, 78); addLevelObject(8, -393, 455); addLevelObject(8, -450, 567); addLevelObject(8, -650, 418); addLevelObject(10, -525, 258); addLevelObject(9, -607, 161); addLevelObject(5, -732, 109); addLevelObject(5, -731, 143); addLevelObject(5, -730, 178); addLevelObject(5, -730, 208); addLevelObject(5, -730, 245); addLevelObject(7, 136, 361); addLevelObject(6, -441, -265); addLevelObject(7, -495, -304); addLevelObject(7, -554, -352); addLevelObject(9, -667, -450); addLevelObject(8, -737, -342); addLevelObject(8, -556, -554); addLevelObject(7, -471, -630); addLevelObject(7, -808, -233); addLevelObject(7, -784, -274); addLevelObject(6, -754, -530); addLevelObject(6, -799, -567); addLevelObject(8, -872, -627); addLevelObject(5, -997, -540); addLevelObject(7, -952, -574); addLevelObject(5, -801, -772); addLevelObject(7, -827, -715); addLevelObject(7, -796, -864); addLevelObject(8, -261, -626); addLevelObject(8, -633, -986); addLevelObject(8, -550, -879); addLevelObject(8, -431, -916); addLevelObject(8, -384, -1016); addLevelObject(8, -207, -948); addLevelObject(8, -338, -820); addLevelObject(8, -223, -795); addLevelObject(8, -92, -767); addLevelObject(6, 117, -741); addLevelObject(5, 156, -753); addLevelObject(5, 151, -747); addLevelObject(5, 183, -767); addLevelObject(5, 211, -783); addLevelObject(5, 235, -797); addLevelObject(6, 1297, -763); addLevelObject(7, 1120, -787); addLevelObject(8, 1118, -788); addLevelObject(8, 1010, -713); addLevelObject(8, 886, -649); addLevelObject(8, 967, -567); addLevelObject(8, 858, -489); addLevelObject(8, 759, -587); addLevelObject(7, 1966, -1603); addLevelObject(8, 1792, -1521); addLevelObject(8, 1717, -1461); addLevelObject(8, 1569, -1508); addLevelObject(8, 1613, -1729); addLevelObject(9, 1710, -1709); addLevelObject(10, 1862, -1787); addLevelObject(9, 1853, -1929); addLevelObject(7, -820, -1784); addLevelObject(8, -920, -1626); addLevelObject(8, -1006, -1422); addLevelObject(8, -518, -1248); addLevelObject(8, -534, -1134); addLevelObject(11, -1263, -1392); addLevelObject(8, -1517, -1252); addLevelObject(8, -1716, -1105); addLevelObject(8, -1664, -1239); addLevelObject(8, -1792, -1332); addLevelObject(7, -1941, -1117); addLevelObject(7, -1373, -1702); addLevelObject(9, -1509, -529); addLevelObject(9, -1453, -670); addLevelObject(9, -1310, -684); addLevelObject(9, -1258, -481); addLevelObject(9, -1384, -491); addLevelObject(11, -1720, 473); addLevelObject(8, -1363, 245); addLevelObject(8, -1312, 438); addLevelObject(8, -1183, 387); addLevelObject(7, -1202, 234); addLevelObject(9, -1226, 312); addLevelObject(6, -1373, 589); addLevelObject(7, -931, 759); addLevelObject(8, -1021, 875); addLevelObject(7, -1032, 1021); addLevelObject(4, -1159, 1954); addLevelObject(4, -1133, 1958); addLevelObject(4, -1105, 1966); addLevelObject(4, -1077, 1971); addLevelObject(4, -1050, 1980); addLevelObject(4, -1025, 1984); addLevelObject(4, -983, 1993); addLevelObject(4, -954, 1993); addLevelObject(4, -926, 1996); addLevelObject(4, -898, 1999); addLevelObject(4, -871, 2002); addLevelObject(4, -846, 2002); addLevelObject(11, -910, 1408); addLevelObject(8, -921, 1631); addLevelObject(9, -668, 1393); addLevelObject(6, -724, 1090); addLevelObject(8, -306, 977); addLevelObject(8, -422, 946); addLevelObject(7, -387, 1046); addLevelObject(8, -184, 1258); addLevelObject(8, -59, 1246); addLevelObject(9, -118, 1406); addLevelObject(8, -125, 1544); addLevelObject(7, -187, 1471); addLevelObject(8, -9, 1424); addLevelObject(8, 519, 1695); addLevelObject(9, 689, 1698); addLevelObject(8, 845, 1674); addLevelObject(9, 775, 2062); addLevelObject(9, 1014, 1942); addLevelObject(12, 2056, 1912); addLevelObject(9, 1745, 1635); addLevelObject(10, 1565, 1857); addLevelObject(9, 1678, 1751); addLevelObject(9, 1995, 1427); addLevelObject(9, 2078, 1233); addLevelObject(9, 1043, 850); addLevelObject(8, 1052, 1054); addLevelObject(10, 1222, 963); addLevelObject(10, 1172, 767); addLevelObject(8, 1435, 791); addLevelObject(8, 1385, 1028); addLevelObject(9, 1327, 1142); addLevelObject(9, 1228, 1088); addLevelObject(6, 1369, 604); addLevelObject(8, 1182, 576); addLevelObject(4, 1698, 286); addLevelObject(4, 1673, 273); addLevelObject(4, 1648, 258); addLevelObject(4, 1622, 246); addLevelObject(4, 1599, 230); addLevelObject(3, 1578, 216); addLevelObject(6, 1524, 175); addLevelObject(6, 1490, 159); addLevelObject(8, 965, 50); addLevelObject(6, 835, -25); addLevelObject(7, 762, 64); addLevelObject(7, -679, -14); addLevelObject(7, -699, -692); addLevelObject(4, 325, -999); addLevelObject(4, 319, -1000); 
		addLevelObject(8, 300, 748); addLevelObject(7, 872, 820); addLevelObject(7, 860, 1045); addLevelObject(7, 649, 1121); addLevelObject(8, 410, 460); 

		// *** Opponent track
		addLevelObject(1, 0, 0); 
		addLevelObject(1, 28, -220); addLevelObject(1, 108, -429); addLevelObject(1, 183, -543); addLevelObject(1, 333, -664); addLevelObject(1, 510, -756); addLevelObject(1, 685, -802); addLevelObject(1, 843, -853); 
		addLevelObject(1, 1007, -983); addLevelObject(1, 1114, -1111); addLevelObject(1, 1172, -1261); addLevelObject(1, 1185, -1452); addLevelObject(1, 1153, -1635); 
		addLevelObject(1, 1033, -1772); addLevelObject(1, 900, -1811); addLevelObject(1, 746, -1802); addLevelObject(1, 514, -1708); addLevelObject(1, 346, -1593); addLevelObject(1, 144, -1544); addLevelObject(1, -115, -1636); addLevelObject(1, -284, -1752); addLevelObject(1, -428, -1787); addLevelObject(1, -561, -1720); addLevelObject(1, -632, -1587); addLevelObject(1, -723, -1395); addLevelObject(1, -859, -1113); addLevelObject(1, -960, -996); addLevelObject(1, -1068, -951); addLevelObject(1, -1226, -935); addLevelObject(1, -1386, -949); addLevelObject(1, -1536, -915); addLevelObject(1, -1666, -814); addLevelObject(1, -1765, -653); addLevelObject(1, -1803, -495); addLevelObject(1, -1777, -298); addLevelObject(1, -1666, -133); addLevelObject(1, -1495, -32); addLevelObject(1, -1328, -1); addLevelObject(1, -1133, 1); addLevelObject(1, -992, 24); addLevelObject(1, -909, 110); addLevelObject(1, -896, 235); addLevelObject(1, -929, 402); addLevelObject(1, -1017, 557); addLevelObject(1, -1146, 716); addLevelObject(1, -1276, 870); addLevelObject(1, -1386, 1013); addLevelObject(1, -1463, 1189); addLevelObject(1, -1475, 1372); addLevelObject(1, -1438, 1546); addLevelObject(1, -1310, 1694); addLevelObject(1, -1132, 1814); addLevelObject(1, -928, 1862); addLevelObject(1, -609, 1872); addLevelObject(1, -271, 1840); addLevelObject(1, -37, 1753); addLevelObject(1, 213, 1652); addLevelObject(1, 412, 1517); addLevelObject(1, 539, 1440); addLevelObject(1, 668, 1412); addLevelObject(1, 800, 1422); addLevelObject(1, 930, 1465); addLevelObject(1, 1050, 1515); addLevelObject(1, 1188, 1545); addLevelObject(1, 1342, 1542); addLevelObject(1, 1476, 1527); addLevelObject(1, 1601, 1463); addLevelObject(1, 1685, 1364); addLevelObject(1, 1750, 1222); addLevelObject(1, 1791, 1085); addLevelObject(1, 1809, 888); addLevelObject(1, 1775, 671); addLevelObject(1, 1694, 536); addLevelObject(1, 1588, 413); addLevelObject(1, 1450, 313); addLevelObject(1, 1271, 224); addLevelObject(1, 1097, 230); addLevelObject(1, 902, 285); addLevelObject(1, 787, 407); addLevelObject(1, 699, 558); addLevelObject(1, 611, 738); addLevelObject(1, 518, 870); addLevelObject(1, 419, 965); addLevelObject(1, 280, 993); addLevelObject(1, 128, 970); addLevelObject(1, 9, 891); addLevelObject(1, -78, 745); addLevelObject(1, -124, 581); addLevelObject(1, -114, 432); addLevelObject(1, -28, 207); 


		addCheckpoint(1157, -1274, 0); addCheckpoint(-745, -1392, 0); addCheckpoint(-1032, 19, 0); addCheckpoint(-1142, 1808, 0); addCheckpoint(1727, 1316, 0); addCheckpoint(-85, 328, 0); 
	}

	if(game["trackCurrent"] == 2)
	{
		// *** Objects
		addLevelObject(15, -323, -120); addLevelObject(19, 1080, -1478); addLevelObject(19, 1780, -1511); addLevelObject(19, 1350, -526); addLevelObject(18, -1284, 1173); addLevelObject(15, -1320, -62); addLevelObject(19, -732, 243); addLevelObject(13, -411, 1640); addLevelObject(13, 53, 1890); addLevelObject(13, -754, 1752); 
		
		// *** Opponent track
		addLevelObject(1, 0, 0); 
		addLevelObject(1, -36, -209); addLevelObject(1, -102, -455); addLevelObject(1, -99, -681); addLevelObject(1, -30, -886); addLevelObject(1, 62, -1069); addLevelObject(1, 169, -1213); addLevelObject(1, 304, -1318); addLevelObject(1, 490, -1427); addLevelObject(1, 649, -1556); addLevelObject(1, 805, -1652); addLevelObject(1, 1005, -1681); addLevelObject(1, 1174, -1658); addLevelObject(1, 1342, -1609); addLevelObject(1, 1523, -1490); addLevelObject(1, 1644, -1298); addLevelObject(1, 1653, -1138); addLevelObject(1, 1571, -905); addLevelObject(1, 1404, -797); addLevelObject(1, 1230, -709); addLevelObject(1, 1130, -508); addLevelObject(1, 1197, -369); addLevelObject(1, 1234, -146); addLevelObject(1, 1240, 42); addLevelObject(1, 1241, 319); addLevelObject(1, 1258, 716); addLevelObject(1, 1228, 1022); addLevelObject(1, 1098, 1223); addLevelObject(1, 849, 1336); addLevelObject(1, 676, 1523); addLevelObject(1, 559, 1669); addLevelObject(1, 329, 1772); addLevelObject(1, 163, 1731); addLevelObject(1, -16, 1605); addLevelObject(1, -192, 1508); addLevelObject(1, -351, 1437); addLevelObject(1, -570, 1449); addLevelObject(1, -774, 1514); addLevelObject(1, -1090, 1573); addLevelObject(1, -1499, 1546); addLevelObject(1, -1664, 1373); addLevelObject(1, -1709, 1156); addLevelObject(1, -1716, 868); addLevelObject(1, -1632, 587); addLevelObject(1, -1527, 282); addLevelObject(1, -1669, 88); addLevelObject(1, -1810, -65); addLevelObject(1, -1760, -237); addLevelObject(1, -1587, -369); addLevelObject(1, -1438, -536); addLevelObject(1, -1502, -768); addLevelObject(1, -1640, -991); addLevelObject(1, -1606, -1193); addLevelObject(1, -1402, -1282); addLevelObject(1, -1153, -1315); addLevelObject(1, -910, -1228); addLevelObject(1, -771, -983); addLevelObject(1, -784, -624); addLevelObject(1, -901, -352); addLevelObject(1, -1002, -119); addLevelObject(1, -1037, 167); addLevelObject(1, -923, 548); addLevelObject(1, -840, 814); addLevelObject(1, -589, 901); addLevelObject(1, -350, 816); addLevelObject(1, -162, 645); addLevelObject(1, -65, 445); 

		// *** Checkpoints
		addCheckpoint(55, -1069, 0); addCheckpoint(1642, -1081, 0); addCheckpoint(1205, 1146, 0); addCheckpoint(-886, 1543, 0); addCheckpoint(-1758, -26, 0); addCheckpoint(-1244, -1301, 0); addCheckpoint(-669, 888, 0); addCheckpoint(1, 159, 0); 
		
		// *** Hitarea's
		addLevelObject(7, 284, 102); addLevelObject(8, 385, 15); addLevelObject(7, 463, 83); addLevelObject(7, 542, 125); addLevelObject(7, 357, -226); addLevelObject(7, 430, -268); addLevelObject(10, -337, 69); addLevelObject(10, -451, -93); addLevelObject(8, 129, -594); addLevelObject(10, -440, -1045); addLevelObject(8, -526, -896); addLevelObject(8, -236, -1081); addLevelObject(8, -597, -1261); addLevelObject(8, -191, -1311); addLevelObject(8, 185, -806); addLevelObject(11, 667, -976); addLevelObject(8, 322, -1058); addLevelObject(11, 497, -841); addLevelObject(8, 473, -579); addLevelObject(7, 591, -470); addLevelObject(10, 773, -363); addLevelObject(9, 674, -339); addLevelObject(8, 834, -214); addLevelObject(8, 774, -169); addLevelObject(7, 817, 104); addLevelObject(8, 982, 49); addLevelObject(7, 894, 61); addLevelObject(8, 1007, 218); addLevelObject(8, 955, 124); addLevelObject(7, 394, -45); addLevelObject(8, 0, -1478); addLevelObject(8, -169, -1518); addLevelObject(8, 83, -1622); addLevelObject(10, 924, -1097); addLevelObject(10, 1161, -1178); addLevelObject(10, 1198, -1284); addLevelObject(8, 1378, -1160); addLevelObject(8, 2031, -890); addLevelObject(8, 1782, -769); addLevelObject(8, 1938, -685); addLevelObject(8, 1995, -534); addLevelObject(8, 1838, -502); addLevelObject(9, 1542, -481); addLevelObject(7, 909, -559); addLevelObject(6, 1388, -24); addLevelObject(6, 1408, 104); addLevelObject(6, 1393, 236); addLevelObject(6, 1411, 358); addLevelObject(6, 1410, 485); addLevelObject(6, 1410, 601); addLevelObject(6, 1414, 720); addLevelObject(6, 1395, 863); addLevelObject(7, 987, 716); addLevelObject(8, 535, 464); addLevelObject(8, 811, 449); addLevelObject(7, 879, 510); addLevelObject(7, 749, 496); addLevelObject(7, 513, 375); addLevelObject(8, 261, 398); addLevelObject(7, 317, 373); addLevelObject(7, 267, 318); addLevelObject(6, 177, 405); addLevelObject(6, 207, 335); addLevelObject(6, 302, 281); addLevelObject(6, 196, 367); addLevelObject(7, 1790, 796); addLevelObject(7, 1736, 974); addLevelObject(7, 1930, 930); addLevelObject(8, 1070, 1543); addLevelObject(8, 953, 1564); addLevelObject(8, 919, 1637); addLevelObject(11, 552, 871); 
		addLevelObject(10, 847, 975); addLevelObject(10, 541, 1168); addLevelObject(8, 473, 1362); addLevelObject(8, -262, 1758); addLevelObject(8, -159, 1844); addLevelObject(8, 22, 1304); addLevelObject(6, -120, 1358); addLevelObject(8, -63, 1288); addLevelObject(8, -51, 1272); addLevelObject(8, 195, 600); addLevelObject(8, 78, 699); addLevelObject(8, 349, 742); addLevelObject(8, 250, 801); addLevelObject(7, -34, 802); addLevelObject(6, -151, 868); addLevelObject(6, -263, 930); addLevelObject(6, -305, 962); addLevelObject(6, -353, 996); addLevelObject(7, -454, 1045); addLevelObject(7, -515, 1078); addLevelObject(7, -591, 1124); addLevelObject(11, -498, 2099); addLevelObject(7, -1208, 1799); addLevelObject(8, -1366, 1785); addLevelObject(8, -1510, 1758); addLevelObject(8, -1648, 1859); addLevelObject(8, -1652, 1708); addLevelObject(8, -1746, 1589); addLevelObject(8, -1843, 1476); addLevelObject(8, -1881, 1309); addLevelObject(8, -1930, 1397); addLevelObject(8, -1907, 1583); addLevelObject(8, -1185, 437); addLevelObject(8, -1253, 297); addLevelObject(8, -1286, 191); addLevelObject(8, -1863, 257); addLevelObject(8, -1896, 360); addLevelObject(6, -1805, 361); addLevelObject(7, -1944, 334); addLevelObject(5, -1945, 223); addLevelObject(5, -1220, -335); addLevelObject(7, -1169, -373); addLevelObject(4, -1224, -433); addLevelObject(4, -1212, -416); addLevelObject(4, -1109, -375); addLevelObject(3, -1070, -376); addLevelObject(3, -1091, -371); addLevelObject(10, -1912, -754); addLevelObject(10, -1833, -699); addLevelObject(8, -1770, -592); addLevelObject(8, -2047, -974); addLevelObject(7, -1351, -1002); addLevelObject(8, -1239, -1080); addLevelObject(9, -1060, -1033); addLevelObject(6, -972, -966); addLevelObject(6, -1168, -1002); addLevelObject(8, -1842, -1225); addLevelObject(8, -1962, -1225); addLevelObject(8, -1857, -1346); addLevelObject(8, -1450, -1637); addLevelObject(8, -1546, -2062); addLevelObject(8, -1346, -1972); addLevelObject(8, -334, -1411); addLevelObject(10, -687, -52); addLevelObject(10, -678, 121); addLevelObject(8, -698, 463); addLevelObject(8, -642, 606); addLevelObject(7, -522, 600); addLevelObject(6, -292, 418); addLevelObject(8, -359, 333); addLevelObject(8, -434, 360); 		
		
	}


	if(game["trackCurrent"] == 3)
	{
		// *** Objects
		addLevelObject(15, 651, -1043); addLevelObject(19, 1600, -1859); addLevelObject(19, 1026, -742); addLevelObject(20, -830, 621); addLevelObject(19, -1268, 647); addLevelObject(15, -430, 860); 		addLevelObject(19, 486, -125); 		addLevelObject(19, -1529, 1395); 		
		
		// *** Opponent track
		addLevelObject(1, 0, 0); addLevelObject(1, -33, -213); addLevelObject(1, -37, -429); addLevelObject(1, -16, -656); addLevelObject(1, 11, -878); addLevelObject(1, 10, -1136); addLevelObject(1, 60, -1336); addLevelObject(1, 170, -1509); addLevelObject(1, 347, -1652); addLevelObject(1, 618, -1725); addLevelObject(1, 845, -1668); addLevelObject(1, 1111, -1615); addLevelObject(1, 1453, -1522); addLevelObject(1, 1629, -1274); addLevelObject(1, 1651, -933); addLevelObject(1, 1469, -600); addLevelObject(1, 1234, -454); addLevelObject(1, 853, -416); addLevelObject(1, 511, -456); addLevelObject(1, 164, -510); addLevelObject(1, -167, -564); addLevelObject(1, -459, -555); addLevelObject(1, -751, -443); addLevelObject(1, -1046, -323); addLevelObject(1, -1361, -316); addLevelObject(1, -1605, -425); addLevelObject(1, -1712, -630); addLevelObject(1, -1736, -901); addLevelObject(1, -1718, -1148); addLevelObject(1, -1585, -1330); addLevelObject(1, -1399, -1455); addLevelObject(1, -1145, -1465); addLevelObject(1, -928, -1282); addLevelObject(1, -789, -1035); addLevelObject(1, -668, -791); addLevelObject(1, -599, -453); addLevelObject(1, -588, -92); addLevelObject(1, -609, 211); addLevelObject(1, -713, 493); addLevelObject(1, -848, 701); addLevelObject(1, -1023, 889); addLevelObject(1, -1133, 1155); addLevelObject(1, -1114, 1386); addLevelObject(1, -943, 1595); addLevelObject(1, -687, 1727); addLevelObject(1, -399, 1740); addLevelObject(1, -134, 1618); addLevelObject(1, 5, 1389); addLevelObject(1, 35, 1118); addLevelObject(1, 2, 859); addLevelObject(1, -7, 512); addLevelObject(1, -20, 270); 

		// *** Checkpoints
		addCheckpoint(186, -1548, 0); addCheckpoint(1374, -492, 0); addCheckpoint(-1454, -318, 0); addCheckpoint(-1257, -1476, 0); addCheckpoint(-579, 75, 0); addCheckpoint(-516, 1786, 0); addCheckpoint(-2, 152, 0); 		
		
		// *** Hitarea's
		addLevelObject(6, 212, -111); addLevelObject(6, 198, -222); addLevelObject(7, 318, -190); addLevelObject(8, 309, -45); addLevelObject(8, -325, -199); addLevelObject(8, -344, -56); addLevelObject(8, -320, 79); addLevelObject(8, -337, 196); addLevelObject(8, -325, 304); addLevelObject(7, -316, -345); addLevelObject(6, -262, -927); addLevelObject(9, -347, -1023); addLevelObject(8, -321, -1187); addLevelObject(8, -516, -1199); addLevelObject(8, -445, -1302); addLevelObject(8, -411, -972); addLevelObject(8, -529, -1458); addLevelObject(8, -325, -1435); addLevelObject(8, 320, -1113); addLevelObject(7, 499, -1348); addLevelObject(8, 507, -969); addLevelObject(8, 398, -885); addLevelObject(8, 619, -813); addLevelObject(7, 740, -1282); addLevelObject(7, 854, -1166); addLevelObject(10, 1124, -1131); addLevelObject(9, 1267, -1081); addLevelObject(10, 1158, -1059); addLevelObject(9, 1027, -982); addLevelObject(8, 1839, -1659); addLevelObject(6, 1776, -1582); addLevelObject(8, 1917, -1640); addLevelObject(8, 1763, -278); addLevelObject(6, 1684, -227); addLevelObject(6, 1817, -357); addLevelObject(7, 1824, -259); addLevelObject(7, 750, -148); addLevelObject(7, 844, -704); addLevelObject(7, 820, -966); addLevelObject(7, -950, -655); addLevelObject(8, -1061, -673); addLevelObject(6, -964, -754); addLevelObject(7, -998, -727); addLevelObject(11, -1247, -876); addLevelObject(8, -1417, -690); addLevelObject(8, -1150, -42); addLevelObject(8, -1022, -57); addLevelObject(8, -929, 47); addLevelObject(7, -860, -92); addLevelObject(8, -932, 177); addLevelObject(7, -1371, -1150); addLevelObject(7, -1381, -1136); addLevelObject(10, -472, 916); addLevelObject(11, -558, 1162); addLevelObject(8, -812, 1200); addLevelObject(8, -734, 1296); addLevelObject(8, -610, 1402); addLevelObject(8, -405, 1421); addLevelObject(11, -1634, 1809); addLevelObject(11, -1513, 1860); addLevelObject(11, -1320, 2043); addLevelObject(7, -1204, 1802); addLevelObject(7, -1093, 1902); addLevelObject(7, -984, 1971); addLevelObject(10, 52, 1969); addLevelObject(11, 263, 1875); addLevelObject(9, 154, 1699); addLevelObject(11, 455, 1746); addLevelObject(8, 435, 1487); addLevelObject(8, 294, 1582); addLevelObject(8, 585, 1547); addLevelObject(5, 539, 1261); addLevelObject(6, 562, 1279); addLevelObject(7, 612, 1307); addLevelObject(7, 651, 1330); addLevelObject(8, 723, 1380); addLevelObject(8, 808, 1420); addLevelObject(8, 884, 1469); addLevelObject(11, 1002, 1594); addLevelObject(11, 1417, 1635); addLevelObject(10, 1579, 1399); 
		addLevelObject(9, 1674, 1249); addLevelObject(11, 1759, 1920); addLevelObject(11, 2012, 1871); addLevelObject(8, 1788, 823); addLevelObject(9, 1650, 751); addLevelObject(10, 1446, 654); addLevelObject(6, 1343, 1144); addLevelObject(6, 967, 873); addLevelObject(7, 1026, 900); addLevelObject(7, 1295, 1092); addLevelObject(8, 1232, 1014); addLevelObject(8, 1107, 935); addLevelObject(7, 1229, 911); addLevelObject(7, 1274, 856); addLevelObject(7, 1318, 785); addLevelObject(10, 614, 900); addLevelObject(9, 760, 930); addLevelObject(9, 1303, 515); addLevelObject(8, 1203, 415); addLevelObject(7, 1115, 321); addLevelObject(8, 1150, 373); addLevelObject(8, 523, 1082); addLevelObject(8, 474, 993); addLevelObject(8, 739, 1019); addLevelObject(6, 292, 1383); addLevelObject(6, 309, 1246); addLevelObject(6, 310, 1125); addLevelObject(6, 314, 1005); addLevelObject(6, 300, 878); addLevelObject(6, 312, 878); addLevelObject(6, 289, 750); addLevelObject(6, 310, 626); addLevelObject(6, 288, 507); addLevelObject(7, -355, 396); addLevelObject(8, 1529, 508); addLevelObject(8, 1577, 427); addLevelObject(8, 1624, 369); addLevelObject(7, 1669, 297); addLevelObject(6, 1699, 256); addLevelObject(5, 1716, 229); addLevelObject(3, 1623, 151); addLevelObject(3, 1640, 166); addLevelObject(3, 1659, 181); addLevelObject(3, 1676, 190); addLevelObject(3, 1694, 207); addLevelObject(3, 1738, 241); addLevelObject(3, 1755, 251); addLevelObject(3, 1773, 264); addLevelObject(3, 1796, 276); addLevelObject(3, 1818, 291); 				
	}



	// *** Load oppontent checkpoints
	game["opponentCheckpoint"] = new Array();
	tempCount = 1;
	
	for(key in o)
	{
		if(o[key].prototype == "LEVEL_OBJECT_1")
		{
			// console.log("Here's a checkpoint");
			
			game["opponentCheckpoint"][tempCount] = new Array();
			game["opponentCheckpoint"][tempCount].x = o[key].x;
			game["opponentCheckpoint"][tempCount].y = o[key].y;
			
			tempCount++;
		}
	}
	
	game["opponentCheckpointCount"] = tempCount - 1;
	console.log("opponentCheckpointCount: " + game["opponentCheckpointCount"]);
	console.log(game["opponentCheckpoint"]);

	// *** Player
	game["lap"] = 1;
	game["checkpoint"] = 1;
	game["position"] = 0; 
	game["positionY"] = 0; 	

	game["finished"] = false; 	
	game["raceStarted"] = false;
	game["raceCountdown"] = 0;
	game["raceEnded"] = false;
	game["raceEndedTime"] = 0;
	game["raceCounter"] = 0;
	game["raceOpponents"] = 4;
	game["raceProgress"] = 0;
	game["raceTime"] = 0;
	game["raceTimeMilli"] = 0;
	// game["racesFinished"] = 0;

	game["playerAcceleration"] = 1; // 0.6 - 2.0 (acceleratie)
	game["playerMaxspeed"] = 20; // 10 - 30 (topsnelheid)
	game["playerRotationSpeed"] = 1; // 0.5 - 1.0 (manouvreren)
	game["playerStartBoost"] = 100; // 0.5 - 1.0 (manouvreren)

	game["playerX"] = 0;
	game["playerY"] = 0;
	game["playerR"] = 0;
	game["playerSpeed"] = 0;	
	game["playerXspeed"] = 0;
	game["playerYspeed"] = 0;
	game["playerRspeed"] = 0;
	game["playerRextra"] = 0; // drift illusion
	

	// *** Set start positions of opponents
	game["opponent"][1].x = -80;	game["opponent"][1].y = -120;	game["opponent"][1].r = 180;	game["opponent"][1].position = 0;	game["opponent"][1].positionY = 0;	game["opponent"][1].raceProgress = 0;	game["opponent"][1].checkpointProgress = 1;	game["opponent"][1].checkpoint = 5;
	game["opponent"][2].x = 0;	game["opponent"][2].y = -120;	game["opponent"][2].r = 180;	game["opponent"][2].position = 0;	game["opponent"][2].positionY = 0;	game["opponent"][2].raceProgress = 0;	game["opponent"][2].checkpointProgress = 1;	game["opponent"][2].checkpoint = 5;
	game["opponent"][3].x = 80;	game["opponent"][3].y = -120;	game["opponent"][3].r = 180;	game["opponent"][3].position = 0;	game["opponent"][3].positionY = 0;	game["opponent"][3].raceProgress = 0;	game["opponent"][3].checkpointProgress = 1;	game["opponent"][3].checkpoint = 5;
	game["opponent"][4].x = -80;	game["opponent"][4].y = 0;	game["opponent"][4].r = 180;	game["opponent"][4].position = 0;	game["opponent"][4].positionY = 0;	game["opponent"][4].raceProgress = 0;	game["opponent"][4].checkpointProgress = 1;	game["opponent"][4].checkpoint = 5;
	game["opponent"][5].x = 80;	game["opponent"][5].y = 0;	game["opponent"][5].r = 180;	game["opponent"][5].position = 0;	game["opponent"][5].positionY = 0;	game["opponent"][5].raceProgress = 0;	game["opponent"][5].checkpointProgress = 1;	game["opponent"][5].checkpoint = 5;


	// *** Add slow trucks	
	if(game["racesFinished"] <= 5) tempTruckAmount = 0; else tempTruckAmount = game["racesFinished"] - 5;
	if(tempTruckAmount > 15) tempTruckAmount = 15;

	// *** Delete existing trucks
	for(key in game["opponent"])
	{
		if(key > 5) delete game["opponent"][key];
	}
	
	tempMaxKey = 0;
	for(key in game["opponent"])
	{
		if(key > tempMaxKey) tempMaxKey = key;
	}
	
	console.log("Add slow trucks (" + tempMaxKey + "): " + tempTruckAmount);
	
	for(i = 1; i <= tempTruckAmount; i++)
	{
		tempMaxKey++;
		
		game["opponent"][tempMaxKey] = new Array();
		
		tempCheckpoint = Math.round(Math.random() * (game["opponentCheckpointCount"]-15) + 10);
		
		game["opponent"][tempMaxKey].car = 5;
		game["opponent"][tempMaxKey].x = (game["opponentCheckpoint"][tempCheckpoint].x) + Math.random() * 200 - 100;
		game["opponent"][tempMaxKey].y = (game["opponentCheckpoint"][tempCheckpoint].y) + Math.random() * 200 - 100;
		game["opponent"][tempMaxKey].r = 180;
		game["opponent"][tempMaxKey].checkpoint = tempCheckpoint + 1;
		game["opponent"][tempMaxKey].speed = 12;
		game["opponent"][tempMaxKey].speedCur = 0;
		game["opponent"][tempMaxKey].speedAcceleration = 0.25;
		game["opponent"][tempMaxKey].rSpeed = 0.55;
		game["opponent"][tempMaxKey].rSpeedCur = 0;
		game["opponent"][tempMaxKey].trackManipulation = Math.round(Math.random()*30*2-30);
		game["opponent"][tempMaxKey].version = Math.ceil(Math.random()*5);
	}
	
	
	// *** Pick word to spell
	pickWord();
}

function pickWord()
{
	playSound("whipbong");
	
	thisWord = "";
	
	console.log("pickWord:" + completeWL);
	
	thisWL = completeWL.split(",");
	
	while(thisWord == "")
	{
		thisWord = thisWL[Math.round(Math.random() * thisWL.length-1)];
	}
	
	
	if(typeof thisWord === "undefined") thisWord = "nitro";
	
	thisWord = thisWord.toUpperCase().trim();
	console.log("pickWord: " + thisWord);

	game["pickWordCounter"] = 30;
	
	// *** LEVEL_OBJECT_1 <-- point in middle of track

	tempPointAmount = 0;
	
	for(key in o)
	{
		if(o[key].prototype == "LEVEL_OBJECT_1") tempPointAmount++;
	}
	
	// console.log("tempPointAmount: " + tempPointAmount);
	


	tempLetters = thisWord.split("");
	tempLetterCount = 0;
	tempLetterStart = Math.ceil(Math.random() * (tempPointAmount-10)) + 5; // *** Start point of letters not around finishline
	// tempLetterStart = 10;
	
	tempLetterStartCount = 0;

	console.log("tempLetterStart: " + tempLetterStart);

	for(key in o)
	{
		if(o[key].prototype == "LEVEL_OBJECT_1")
		{
			o[key].letter = "";
		}
	}
	
	tempOddEven = false;
	
	for(ii = 1; ii <= 2; ii++)
	{
		for(key in o)
		{			
			if(o[key].prototype == "LEVEL_OBJECT_1")
			{
				if(tempOddEven) tempOddEven = false; else tempOddEven = true;

				tempLetterStartCount++;
	
				if(tempOddEven)
				{					
					if(tempLetterStartCount >= tempLetterStart)
					{
						if(tempLetterCount < tempLetters.length)
						{			
							if(Math.random() > 0.30)
							{
								// *** Correct letter
								o[key].letter = tempLetters[tempLetterCount];
								tempLetterCount++;
							}
							else if(Math.random() > 1.0)
							{
								// *** Empty space
							}
							else
							{
								// *** Wrong letter
								o[key].letter = String.fromCharCode(Math.ceil(Math.random()*(90-65) + 65));
							}
						}
					}
				}
			}
		}
	}
	
	game["playerWord"] = thisWord;
	game["playerWordSpelled"] = "";
	
	return(thisWord);	
}



function opponentDraw(thisKey, thisCar, thisX, thisY, thisR)
{
	if(cX(thisX) > -100 && cX(thisX) < 1500 && cY(thisY) > -100 && cY(thisY) < 800)
	{
		
		thisR -= 180;
		
		context.globalAlpha = 0.4;
		drawImage(manifest["boat_" + thisCar + "_small_shadow"], cX(thisX) + 7, cY(thisY) + 5, true, true, thisR, false, false, true);
		
		context.globalAlpha = 1;

		if(thisCar == 5)
		{
			drawImage(manifest["boat_" + thisCar + "_small_v" + game["opponent"][thisKey].version], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
		}
		else
		{
			drawImage(manifest["boat_" + thisCar + "_small_v" + game["opponent"][thisKey].carVariation], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
		}
		
		tempO = Math.cos(toRadians(thisR));
		if(tempO < 0) tempO = 0;		
		context.globalAlpha = tempO/1.5;
		drawImage(manifest["boat_" + thisCar + "_gloss_f"], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
				
		tempO = Math.cos(toRadians(thisR - 90));
		if(tempO < 0) tempO = 0;		
		context.globalAlpha = tempO/1.5;
		drawImage(manifest["boat_" + thisCar + "_gloss_r"], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
				
		tempO = Math.cos(toRadians(thisR + 90));
		if(tempO < 0) tempO = 0;		
		context.globalAlpha = tempO/1.5;
		drawImage(manifest["boat_" + thisCar + "_gloss_l"], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
				
		tempO = Math.cos(toRadians(thisR + 180));
		if(tempO < 0) tempO = 0;		
		context.globalAlpha = tempO/1.5;
		drawImage(manifest["boat_" + thisCar + "_gloss_b"], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
		
		
		tempO = Math.cos(toRadians(thisR + 180));
		if(tempO < 0) tempO = 0;		
		context.globalAlpha = tempO/1.5;
		drawImage(manifest["boat_" + thisCar + "_shade_f"], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
			
		tempO = Math.cos(toRadians(thisR - 90 + 180));
		if(tempO < 0) tempO = 0;		
		context.globalAlpha = tempO/1.5;
		drawImage(manifest["boat_" + thisCar + "_shade_r"], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
				
		tempO = Math.cos(toRadians(thisR + 90 + 180));
		if(tempO < 0) tempO = 0;		
		context.globalAlpha = tempO/1.5;
		drawImage(manifest["boat_" + thisCar + "_shade_l"], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
				
		tempO = Math.cos(toRadians(thisR + 180 + 180));
		if(tempO < 0) tempO = 0;		
		context.globalAlpha = tempO/1.5;
		drawImage(manifest["boat_" + thisCar + "_shade_b"], cX(thisX), cY(thisY), true, true, thisR, false, false, true);
		
		context.globalAlpha = 1;

	
		for(l = 1; l <= 2; l++)
		{
			if(game["boat"][thisCar]["engineDistance" + l] != 0)
			{
				for(k = 1; k <= game["opponent"][thisKey].speedCur/8; k++)
				{
					tempR = toRadians(thisR + game["boat"][thisCar]["engineAngle" + l]);
					thisParticle = addParticle(17, cX(thisX) - Math.sin(tempR)*game["boat"][thisCar]["engineDistance" + l], cY(thisY) - Math.cos(tempR)*game["boat"][thisCar]["engineDistance" + l], "GAME_UNDERWATER");
				}	
			}
		}
			
		if(game["levelcreator"])
		{
			context.strokeStyle = "#FFFFFF";
			
			cCW = game["boat"][game["opponent"][thisKey].car].collisionCircleWidth;
			cCD = game["boat"][game["opponent"][thisKey].car].collitionCircleDistance;
			context.beginPath(); context.arc(cX(game["opponent"][thisKey].x), cY(game["opponent"][thisKey].y), cCW, 0, 2 * Math.PI); context.stroke();
			context.beginPath(); context.arc(cX(game["opponent"][thisKey].x) + Math.sin(toRadians(game["opponent"][thisKey].r))*cCD, cY(game["opponent"][thisKey].y) + Math.cos(toRadians(game["opponent"][thisKey].r))*cCD, cCW, 0, 2 * Math.PI); context.stroke();				
			context.beginPath(); context.arc(cX(game["opponent"][thisKey].x) + Math.sin(toRadians(game["opponent"][thisKey].r + 180))*cCD, cY(game["opponent"][thisKey].y) + Math.cos(toRadians(game["opponent"][thisKey].r + 180))*cCD, cCW, 0, 2 * Math.PI); context.stroke();			
		
			//drawTextarea("type:" + tempType + " r:" + Math.round(game["opponent"][thisKey].r), "INTRO_VERSION", cX(game["opponent"][thisKey].x) + 30, cY(game["opponent"][thisKey].y) + 60);	
			drawTextarea(thisKey, "INTRO_VERSION", cX(game["opponent"][thisKey].x) + 30, cY(game["opponent"][thisKey].y) + 60);	
		}
	}
}

function opponentMove()
{
	if(game["raceStarted"] && game["raceCountdown"] >= 5) // !game["raceEnded"] && 
	{
		for(key in game["opponent"])
		{			
			if(game["opponent"][key].r > 360) game["opponent"][key].r -= 360;
			if(game["opponent"][key].r < 0) game["opponent"][key].r += 360;
			
			checkpoint = game["opponent"][key].checkpoint;
			
			// *** If all opponents go exactly through the same checkpoint locations, they always crash into each other.
			// *** So let's manipulate the exact coordinate of the checkpoint slightly, depending on speed of the car, so they follow slightly different tracks.
			// *** X and Y are manipulated in a diagonal fashion.
			// checkpointLocationManipulation = ((game["opponent"][key].speed - 14)*22 - 88);

			checkpointLocationManipulation = 80; // 80 to right and 80 down.
			if(isEven(game["opponent"][key].speed)) checkpointLocationManipulation *= -1; // *** 80 to left and 80 up
			
			// *** Slow trucks have random manipulations (but more in middle) to make it challenging to get past (set at init)
			if(game["opponent"][key].car == 5) checkpointLocationManipulation = game["opponent"][key].trackManipulation;
								
			// console.log(game["opponentCheckpoint"]);
			cpx = game["opponentCheckpoint"][checkpoint].x + checkpointLocationManipulation;
			cpy = game["opponentCheckpoint"][checkpoint].y + checkpointLocationManipulation;
			
			// addParticle(9, cX(cpx), cY(cpy));
	
			if(game["levelcreator"])
			{
				context.beginPath();
				context.arc(cX(cpx), cY(cpy), 20, 0, 2 * Math.PI);
				context.strokeStyle = "#FFFFFF";
				context.stroke();
				context.fill();
		
				context.beginPath();
				context.arc(cX(game["opponentCheckpoint"][checkpoint].x), cY(game["opponentCheckpoint"][checkpoint].y), 10, 0, 2 * Math.PI);
				context.strokeStyle = "#FFFFFF";
				context.stroke();
				context.fill();
			}		
								
			opposite = cpy - game["opponent"][key].y;
			adjacent = game["opponent"][key].x - cpx;
			
			tempDegrees = toDegrees(Math.atan(opposite / adjacent));
			if(game["opponent"][key].x >= cpx) tempDegrees += 180;
			tempDegrees += 90;
			
			// game["opponent"][key].r = tempDegrees;
			
			tempType = 0;			
			
			if(game["opponent"][key].r == tempDegrees)
			{
				if(game["opponent"][key].rSpeedCur > 0) game["opponent"][key].rSpeedCur -= game["opponent"][key].rSpeed;
				if(game["opponent"][key].rSpeedCur < 0) game["opponent"][key].rSpeedCur += game["opponent"][key].rSpeed;
				if(Math.abs(game["opponent"][key].rSpeedCur) <= game["opponent"][key].rSpeed) game["opponent"][key].rSpeedCur = 0;
			}
			else if(tempDegrees > 270 && game["opponent"][key].r < 90)
			{
				game["opponent"][key].rSpeedCur -= game["opponent"][key].rSpeed;
				tempType = 5;
			}			
			else if(tempDegrees < 90 && game["opponent"][key].r > 270)
			{
				game["opponent"][key].rSpeedCur += game["opponent"][key].rSpeed;
				tempType = 6;
			}			
			else if(tempDegrees > game["opponent"][key].r)
			{
				game["opponent"][key].rSpeedCur += game["opponent"][key].rSpeed;
				tempType = 3;
			}
			else if(tempDegrees < game["opponent"][key].r)
			{
				game["opponent"][key].rSpeedCur -= game["opponent"][key].rSpeed;
				tempType = 4;
			}
			
			game["opponent"][key].r += game["opponent"][key].rSpeedCur;
			
			game["opponent"][key].rSpeedCur *= 0.85;
			
			
			if(Math.abs(game["opponent"][key].r - tempDegrees) <= game["opponent"][key].rSpeed) game["opponent"][key].r = tempDegrees;
			
			
			
			game["opponent"][key].speedCur += game["opponent"][key].speedAcceleration;
			if(game["opponent"][key].speedCur > game["opponent"][key].speed) game["opponent"][key].speedCur = game["opponent"][key].speed;
			
			// if(game["raceEnded"]) game["opponent"][key].rSpeedCur *= 0.5;
							
			game["opponent"][key].x += Math.sin(toRadians(game["opponent"][key].r)) * game["opponent"][key].speedCur;
			game["opponent"][key].y += Math.cos(toRadians(game["opponent"][key].r)) * game["opponent"][key].speedCur;
			
			tempCheckpointRadius = 100 + (game["opponent"][key].speed*5);
			
			tempOX = game["opponentCheckpoint"][checkpoint].x + checkpointLocationManipulation;
			tempOY = game["opponentCheckpoint"][checkpoint].y + checkpointLocationManipulation;
			
			if(game["opponent"][key].x > tempOX - tempCheckpointRadius && game["opponent"][key].x < tempOX + tempCheckpointRadius && game["opponent"][key].y > tempOY - tempCheckpointRadius && game["opponent"][key].y < tempOY + tempCheckpointRadius)
			{
				game["opponent"][key].checkpoint++;
				if(game["opponent"][key].checkpoint > game["opponentCheckpointCount"]) game["opponent"][key].checkpoint = 1;
	
				// console.log("checkpoint:" + game["opponent"][key].checkpoint);
				// console.log(game["opponentCheckpoint"]);
				// console.log(game["opponentCheckpointCount"]);
			}
			
			opponentDraw(key, game["opponent"][key].car, game["opponent"][key].x, game["opponent"][key].y, game["opponent"][key].r);
			
			/*
			context.beginPath();
			context.strokeStyle = "#000000";
			context.moveTo(game["opponent"][key].x, game["opponent"][key].y);
			context.lineTo(game["opponent"][key].x + Math.sin(toRadians(tempDegrees))*200, game["opponent"][key].y + Math.cos(toRadians(tempDegrees))*200);
			context.stroke();
			*/
			
			cDL = game["boat"][game["opponent"][key].car].collisionDetectorLength;
			thisCollision1 = opponentCollisionCheck(key, game["opponent"][key].x + Math.sin(toRadians(game["opponent"][key].r))*cDL, game["opponent"][key].y + Math.cos(toRadians(game["opponent"][key].r))*cDL);						
			thisCollision2 = opponentCollisionCheck(key, game["opponent"][key].x + Math.sin(toRadians(game["opponent"][key].r + 20))*cDL, game["opponent"][key].y + Math.cos(toRadians(game["opponent"][key].r + 20))*cDL);						
			thisCollision3 = opponentCollisionCheck(key, game["opponent"][key].x + Math.sin(toRadians(game["opponent"][key].r - 20))*cDL, game["opponent"][key].y + Math.cos(toRadians(game["opponent"][key].r - 20))*cDL);			
			
			if(thisCollision1 || thisCollision2 || thisCollision3) game["opponent"][key].speedCur = 0;
		}
	}
	else
	{
		for(key in game["opponent"])
		{
			opponentDraw(key, game["opponent"][key].car, game["opponent"][key].x, game["opponent"][key].y, game["opponent"][key].r);		
		}	
	}	
}
	
function opponentCollisionCheck(thisKey, thisX, thisY)
{
	if(game["levelcreator"])
	{
		context.beginPath();
		context.strokeStyle = "#FFFFFF";
		context.moveTo(cX(game["opponent"][thisKey].x), cY(game["opponent"][thisKey].y));
		context.lineTo(cX(thisX), cY(thisY));
		context.stroke();
	}
	
	collision = false;
	
	// *** Collide with other opponents
	for(key2 in game["opponent"])
	{
		if(key2 != thisKey)
		{
			cCW = game["boat"][game["opponent"][key2].car].collisionCircleWidth;
			cCD = game["boat"][game["opponent"][key2].car].collitionCircleDistance;
			
			distance = pythagoras(thisX - game["opponent"][key2].x, thisY - game["opponent"][key2].y);			
			if(distance <= cCW) { collision = true; opponentCollisionNudge(key2, thisKey, thisX, thisY); }

			distance = pythagoras(thisX - (game["opponent"][key2].x + Math.sin(toRadians(game["opponent"][key2].r))*cCD), thisY - (game["opponent"][key2].y + Math.cos(toRadians(game["opponent"][key2].r))*cCD));			
			if(distance <= cCW) { collision = true; opponentCollisionNudge(key2, thisKey, thisX, thisY); }

			distance = pythagoras(thisX - (game["opponent"][key2].x + Math.sin(toRadians(game["opponent"][key2].r + 180))*cCD), thisY - (game["opponent"][key2].y + Math.cos(toRadians(game["opponent"][key2].r + 180))*cCD));			
			if(distance <= cCW) { collision = true; opponentCollisionNudge(key2, thisKey, thisX, thisY); }


		}	
	}
	

	// *** Collide with player
	cCW = game["boat"][game["selectedBoat"]].collisionCircleWidth;
	cCD = game["boat"][game["selectedBoat"]].collitionCircleDistance;

	distance = pythagoras(thisX - game["playerX"], thisY - game["playerY"]);			
	if(distance <= cCW) { collision = true; collisionEffect(thisX, thisY, game["opponent"][thisKey].speedCur, true); /* opponentCollisionNudge("PLAYER", thisKey, thisX, thisY); */ }
	
	distance = pythagoras(thisX - (game["playerX"] + Math.sin(toRadians(game["playerR"]))*cCD), thisY - (game["playerY"] + Math.cos(toRadians(game["playerR"]))*cCD));			
	if(distance <= cCW) { collision = true; collisionEffect(thisX, thisY, game["opponent"][thisKey].speedCur, true); /* opponentCollisionNudge("PLAYER", thisKey, thisX, thisY); */ }
	
	distance = pythagoras(thisX - (game["playerX"] + Math.sin(toRadians(game["playerR"] + 180))*cCD), thisY - (game["playerY"] + Math.cos(toRadians(game["playerR"] + 180))*cCD));			
	if(distance <= cCW) { collision = true; collisionEffect(thisX, thisY, game["opponent"][thisKey].speedCur, true); /* opponentCollisionNudge("PLAYER", thisKey, thisX, thisY); */ }
	
	/*
	context.beginPath(); context.arc(700, 350, cCW, 0, 2 * Math.PI); context.stroke();	
	context.beginPath(); context.arc(700 + Math.sin(toRadians(game["playerR"]))*cCD, 350 + Math.cos(toRadians(game["playerR"]))*cCD, cCW, 0, 2 * Math.PI); context.stroke();	
	context.beginPath(); context.arc(700 + Math.sin(toRadians(game["playerR"] + 180))*cCD, 350 + Math.cos(toRadians(game["playerR"] + 180))*cCD, cCW, 0, 2 * Math.PI); context.stroke();			
	*/
		
	return(collision);
}

function opponentCollisionNudge(nudgeKey, pusherKey, thisCollisionX, thisCollisionY)
{
	if(nudgeKey == "PLAYER") thisPlayer = true; else thisPlayer = false;
	
	// console.log("opponentCollisionNudge: " + Math.round(game["opponent"][pusherKey].speedCur));
	
	collisionEffect(thisCollisionX, thisCollisionY, game["opponent"][pusherKey].speedCur, true);
	
	if(thisPlayer)
	{	
		// console.log(Math.sin(toRadians(game["opponent"][pusherKey].r)) * game["opponent"][pusherKey].speedCur * 0.6);
		game["playerSpeed"] += 1;
	}
	else
	{	
		game["opponent"][nudgeKey].x += Math.sin(toRadians(game["opponent"][pusherKey].r)) * game["opponent"][pusherKey].speedCur * 0.6;
		game["opponent"][nudgeKey].y += Math.cos(toRadians(game["opponent"][pusherKey].r)) * game["opponent"][pusherKey].speedCur * 0.6;
	}
}



function collisionEffect(thisX, thisY, thisSpeed, thisC)
{
	if(thisC)
	{
		thisX = cX(thisX);
		thisY = cY(thisY);
	}
	
	if(thisX < -100 || thisX > 1500 || thisY < -100 || thisY > 800) thisMuffled = "_muffled"; else thisMuffled = "";
	
	if(thisSpeed >= 15 && thisSpeed < 20)
	{
		playSound("car_crash_2" + thisMuffled);
		
		if(thisMuffled == "")
		{
			for(i = 1; i <= 5; i++) addParticle(9, thisX + Math.random()*4-2, thisY + Math.random()*4-2);
		}
	}
	else if(thisSpeed >= 20)
	{
		playSound("car_crash_3" + thisMuffled);
		
		if(thisMuffled == "")
		{
			for(i = 1; i <= 5; i++) addParticle(1,  thisX, thisY);
			for(i = 1; i <= 15; i++) addParticle(2,  thisX, thisY);
			for(i = 1; i <= 15; i++) addParticle(9,  thisX + Math.random()*8-4, thisY + Math.random()*8-4);
		}
	}
	else
	{
		if(game["carCrashSoundCounter"] <= 0 && thisSpeed > 0.4)
		{
			playSound("car_crash_1" + thisMuffled);
			game["carCrashSoundCounter"] = Math.ceil(4 + Math.random()*4);
		}

		if(thisMuffled == "") addParticle(8,  thisX, thisY);
	}
}
	
function steerUp()
{
	game["playerSpeed"] += game["playerAcceleration"];
	
	if(game["playerSpeed"] > game["playerMaxspeed"]) game["playerSpeed"] = game["playerMaxspeed"];

	if(game["playerStartBoost"] > 0) game["playerStartBoost"]--;
	if(game["playerStartBoost"] > 0) { game["playerSpeed"] += 5; }
	
	if(Math.random() > 0.70) playSound("engine_" + game["selectedBoat"]);
	
}

function steerDown()
{
	game["playerSpeed"] -= game["playerAcceleration"];
	if(game["playerSpeed"] < -game["playerMaxspeed"]) game["playerSpeed"] = -game["playerMaxspeed"];
}

function steerLeft()
{
	game["playerRspeed"] += game["playerRotationSpeed"];
	game["playerRextra"] += game["playerSpeed"];

	// if(Math.random() > 0.5) playSound("swirl");			

}

function steerRight()
{
	game["playerRspeed"] -= game["playerRotationSpeed"];
	game["playerRextra"] -= game["playerSpeed"];

	// if(Math.random() > 0.5) playSound("swirl");
}



function drawCutsceneText()
{
	drawText("Je bent " + game["positionFinish"] + "e geworden!", "TEXT_HUGE_LEFT", 430, 530);
	
	if(game["positionFinish"] <= 3)
	{
		drawText("Je hebt", "TEXT_LARGE_LEFT_BOLD", 430, 600);
		
		tempMultiplier = game["boat"][game["selectedBoat"]]["upgrade4"][game["boat"][game["selectedBoat"]]["upgrade4"].upgradesDone].value;
		
		drawCoinValue(Math.ceil(game["trackWin" + game["positionFinish"]] * tempMultiplier), 580, 600, "LARGE");
		drawText("gewonnen!", "TEXT_LARGE_LEFT_BOLD", 760, 600); 
	}	
}


function addCheckpoint(thisX, thisY)
{
	thisO = addO("CHECKPOINT", thisX, thisY);

	game["checkpointCount"]++;
	o[thisO].sequence = game["checkpointCount"];
	o[thisO].z = "GAME_UNDERWATER";
	
	return(thisO);
}

function addLevelObject(thisObject, thisX, thisY)
{
	thisO = addO("LEVEL_OBJECT_" + thisObject, thisX, thisY);
	//o[thisO].text = thisText;
	o[thisO].z = oPrototype["LEVEL_OBJECT_" + thisObject].z;
	
	return(thisO);
}

function addLevelDecoration(thisObject, thisX, thisY, thisR)
{
	thisO = addO("LEVEL_DECORATION_" + thisObject, thisX, thisY);
	o[thisO].r = thisR;
	o[thisO].z = "GAME_UNDERWATER";
	
	return(thisO);
}

function drawSmallBoat(thisBoat, thisX, thisY, thisR, thisSpeed)
{
	tempUpgrade = new Array();
	tempName = "";
	tempOpponent = false;
	
	if(thisBoat != 1 && thisBoat != 2 && thisBoat != 3 && thisBoat != 4 && thisBoat.indexOf("OPPONENT") >= 0)
	{
		temp = thisBoat.split("OPPONENT");
		thisOpponent = parseInt(temp[1]);
		
		thisBoat = opponent[i].boat;
		
		temp = opponent[i].boatUpgrades.split("|");
		tempUpgrade[1] = temp[0];
		tempUpgrade[2] = temp[1];
		tempUpgrade[3] = temp[2];
		tempUpgrade[4] = temp[3];
		tempUpgrade[5] = temp[4];
		
		tempName = opponent[i].name;
		
		tempOpponent = true;
		
		tempProgress = opponent[i].raceProgress;
		tempPosition = opponent[i].position;

		if(opponent[i].x == 0 && opponent[i].y == 0) tempName = "";
	}
	else
	{
		//console.log(thisBoat);
		tempUpgrade[1] = game["boat"][thisBoat]["upgrade1"].upgradesDone;
		tempUpgrade[2] = game["boat"][thisBoat]["upgrade2"].upgradesDone;
		tempUpgrade[3] = game["boat"][thisBoat]["upgrade3"].upgradesDone;
		tempUpgrade[4] = game["boat"][thisBoat]["upgrade4"].upgradesDone;
		tempUpgrade[5] = game["boat"][thisBoat]["upgrade5"].upgradesDone;
		
		tempName = game["avatarName"];
		tempProgress = game["raceProgress"];
		tempPosition = game["position"];		
		
		if(game["playerX"] == 0 && game["playerY"] == 0) tempName = "";
	}
	
	/*
	game["playerShadowAniCount"]++;
	
	if(game["playerShadowAniCount"] >= 3)
	{
		game["playerShadowAniCount"] = 0;
		game["playerShadowAni"]++;
		if(game["playerShadowAni"] > 6) game["playerShadowAni"] = 1;
	}
	*/
	
	context.globalAlpha = 0.2;
	//drawImage(manifest["boat_" + thisBoat + "_small_shadow_" + game["playerShadowAni"]], thisX + 6, thisY + 8, 60*0.8, 118*0.8, thisR, false, false, true);
	drawImage(manifest["boat_" + thisBoat + "_small_shadow"], thisX + 6, thisY + 8, true, true, thisR, false, false, true);

	context.globalAlpha = 1;
	if(tempOpponent) context.globalAlpha = 0.5;
	
	drawImage(manifest["boat_" + thisBoat + "_small"], thisX, thisY, true, true, thisR, false, false, true);
	
	for(k = 1; k <= 5; k++)
	{
		if(tempUpgrade[k] >= 5) drawImage(manifest["boat_" + thisBoat + "_small_upgrade_" + k], thisX, thisY, true, true, thisR, false, false, true);
	}



	tempO = Math.cos(toRadians(thisR));
	if(tempO < 0) tempO = 0;		
	context.globalAlpha = tempO/1.5;
	drawImage(manifest["boat_" + thisBoat + "_gloss_f"], thisX, thisY, true, true, thisR, false, false, true);
			
	tempO = Math.cos(toRadians(thisR - 90));
	if(tempO < 0) tempO = 0;		
	context.globalAlpha = tempO/1.5;
	drawImage(manifest["boat_" + thisBoat + "_gloss_r"], thisX, thisY, true, true, thisR, false, false, true);
			
	tempO = Math.cos(toRadians(thisR + 90));
	if(tempO < 0) tempO = 0;		
	context.globalAlpha = tempO/1.5;
	drawImage(manifest["boat_" + thisBoat + "_gloss_l"], thisX, thisY, true, true, thisR, false, false, true);
			
	tempO = Math.cos(toRadians(thisR + 180));
	if(tempO < 0) tempO = 0;		
	context.globalAlpha = tempO/1.5;
	drawImage(manifest["boat_" + thisBoat + "_gloss_b"], thisX, thisY, true, true, thisR, false, false, true);
	
	
	tempO = Math.cos(toRadians(thisR + 180));
	if(tempO < 0) tempO = 0;		
	context.globalAlpha = tempO/1.5;
	drawImage(manifest["boat_" + thisBoat + "_shade_f"], thisX, thisY, true, true, thisR, false, false, true);
		
	tempO = Math.cos(toRadians(thisR - 90 + 180));
	if(tempO < 0) tempO = 0;		
	context.globalAlpha = tempO/1.5;
	drawImage(manifest["boat_" + thisBoat + "_shade_r"], thisX, thisY, true, true, thisR, false, false, true);
			
	tempO = Math.cos(toRadians(thisR + 90 + 180));
	if(tempO < 0) tempO = 0;		
	context.globalAlpha = tempO/1.5;
	drawImage(manifest["boat_" + thisBoat + "_shade_l"], thisX, thisY, true, true, thisR, false, false, true);
			
	tempO = Math.cos(toRadians(thisR + 180 + 180));
	if(tempO < 0) tempO = 0;		
	context.globalAlpha = tempO/1.5;
	drawImage(manifest["boat_" + thisBoat + "_shade_b"], thisX, thisY, true, true, thisR, false, false, true);
	
	context.globalAlpha = 1;



	
	for(l = 1; l <= 2; l++)
	{
		if(tempOpponent) tempParticle = 18; else tempParticle = 17;
		
		if(game["boat"][thisBoat]["engineDistance" + l] != 0)
		{
			for(k = 1; k <= thisSpeed*2; k++)
			{	
			
				tempR = toRadians(thisR + game["boat"][thisBoat]["engineAngle" + l]);
				
				if(Math.random()>0.6)
				{
					thisParticle = addParticle(tempParticle, thisX - Math.sin(tempR)*game["boat"][thisBoat]["engineDistance" + l], thisY - Math.cos(tempR)*game["boat"][thisBoat]["engineDistance" + l], "GAME_UNDERWATER");
				}
					
				if(!tempOpponent && game["playerStartBoost"] > 0 && Math.random() > 0.98)
				{
					thisParticle = addParticle(14, thisX - Math.sin(tempR)*game["boat"][thisBoat]["engineDistance" + l] - Math.random()*Math.sin(tempR)*thisSpeed*3, thisY - Math.cos(tempR)*game["boat"][thisBoat]["engineDistance" + l] - Math.random()*Math.cos(tempR)*thisSpeed*3, "GAME_UNDERWATER");
				}
			}	
		}
	}
	
	// if(tempName != "") drawText("#" + tempPosition + " " + tempName, "TEXT_SMALL_LEFT", thisX + 50, thisY + 15);
	
	// *** Draw collision points
	if(game["levelcreator"] && !tempOpponent)
	{
		for(k = 1; k <= 6; k++)
		{
			tempR = toRadians(thisR + game["boat"][thisBoat]["collisionPoint" + k].angle);				
			context.beginPath(); context.arc(700 - Math.sin(tempR)*game["boat"][thisBoat]["collisionPoint" + k].distance, 350 - Math.cos(tempR)*game["boat"][thisBoat]["collisionPoint" + k].distance, 1, 0, 2 * Math.PI); context.stroke();
		}
		
		// drawText("(" + Math.round(game["playerX"]) + ", " + Math.round(game["playerY"]) + ", " + Math.round(game["playerR"]) + ")", "TEXT_SMALL_LEFT", 750, 375);
		
		cCW = game["boat"][thisBoat].collisionCircleWidth;
		cCD = game["boat"][thisBoat].collitionCircleDistance;
		
		context.beginPath(); context.arc(700, 350, cCW, 0, 2 * Math.PI); context.stroke();	
		context.beginPath(); context.arc(700 + Math.sin(toRadians(game["playerR"]))*cCD, 350 + Math.cos(toRadians(game["playerR"]))*cCD, cCW, 0, 2 * Math.PI); context.stroke();	
		context.beginPath(); context.arc(700 + Math.sin(toRadians(game["playerR"] + 180))*cCD, 350 + Math.cos(toRadians(game["playerR"] + 180))*cCD, cCW, 0, 2 * Math.PI); context.stroke();	
	}
	
	context.globalAlpha = 1;
}

function checkCollision()
{
	tempCollision = false;
	
	for(k = 1; k <= 6; k++)
	{
		tempR = toRadians(game["playerR"] + game["playerRextra"] + game["boat"][game["selectedBoat"]]["collisionPoint" + k].angle);	
		
		collisionPointX = 700 - Math.sin(tempR)*game["boat"][game["selectedBoat"]]["collisionPoint" + k].distance;
		collisionPointY = 350 - Math.cos(tempR)*game["boat"][game["selectedBoat"]]["collisionPoint" + k].distance;
		
		// *** Collision with objects
		for(key in o)
		{
			if(o[key].category == "level_objects" && !tempCollision)
			{
				if(typeof o[key].unhittable !== "undefined" && o[key].unhittable > 0)
				{
					// *** Temporary unhittable
				}
				else
				{					
					for(i = 1; i <= 10; i++)
					{
						if(o[key]["collisionArea" + i].size != 0) 
						{
							thisX = cX(o[key].x + o[key]["collisionArea" + i].x);
							thisY = cY(o[key].y + o[key]["collisionArea" + i].y);
							
							if(pythagoras(thisX-collisionPointX, thisY-collisionPointY) < o[key]["collisionArea" + i].size)
							{
								tempCollision = true;
								if(typeof o[key].wobble !== "undefined") o[key].wobble = 10;
								if(typeof o[key].unhittable !== "undefined") o[key].unhittable = 100;
								
								if(game["playerSpeed"] > 2) playSound("thud");
							}
						}
					}
				}
			}			
		}
			

		// *** Collide with other opponents
		if((game["playerSpeed"] > 0 && k <= 3) || (game["playerSpeed"] < 0 && k > 3))
		{
			for(key2 in game["opponent"])
			{
				cCW = game["boat"][game["opponent"][key2].car].collisionCircleWidth;
				cCD = game["boat"][game["opponent"][key2].car].collitionCircleDistance;
				
				distance = pythagoras(collisionPointX - cX(game["opponent"][key2].x), collisionPointY - cY(game["opponent"][key2].y));			
				if(distance <= cCW) { tempCollision = true; collisionEffect(collisionPointX, collisionPointY, game["playerSpeed"], false); /* opponentCollisionNudge(key2, key2, thisX, thisY); */ }
	
				distance = pythagoras(collisionPointX - (cX(game["opponent"][key2].x) + Math.sin(toRadians(game["opponent"][key2].r))*cCD), collisionPointY - (cY(game["opponent"][key2].y) + Math.cos(toRadians(game["opponent"][key2].r))*cCD));			
				if(distance <= cCW) { tempCollision = true; collisionEffect(collisionPointX, collisionPointY, game["playerSpeed"], false); /* opponentCollisionNudge(key2, key2, thisX, thisY); */ }
	
				distance = pythagoras(collisionPointX - (cX(game["opponent"][key2].x) + Math.sin(toRadians(game["opponent"][key2].r + 180))*cCD), collisionPointY - (cY(game["opponent"][key2].y) + Math.cos(toRadians(game["opponent"][key2].r + 180))*cCD));			
				if(distance <= cCW) { tempCollision = true; collisionEffect(collisionPointX, collisionPointY, game["playerSpeed"], false); /* opponentCollisionNudge(key2, key2, thisX, thisY); */ }
		
			}
		}
	}
	
	
	if(game["playerX"] < -2000) tempCollision = true;
	if(game["playerX"] > 2000) tempCollision = true;
	if(game["playerY"] < -2000) tempCollision = true;
	if(game["playerY"] > 2000) tempCollision = true;
	
	return(tempCollision);
}

function recalculateRotation()
{
	// sucks
	//game["playerR"] += game["playerRextra"];
	//game["playerRextra"] = 0;
}

function tick()
{
	if(game["status"] == "" && !game["raceStarted"])
	{
		game["raceCountdown"]++;
		game["count"] = 0;
		
		if(game["raceCountdown"] == 2) playSound("voice_3");
		if(game["raceCountdown"] == 3) playSound("voice_2");
		if(game["raceCountdown"] == 4) playSound("voice_1");
		
		if(game["raceCountdown"] == 4) game["raceStarted"] = true;
	}
	else if(game["status"] == "" && game["raceStarted"] && game["raceCountdown"] == 4)
	{
		playSound("voice_go");
		game["raceCountdown"] = 5;
		game["count"] = 0;
	}
	else if(game["status"] == "" && game["raceStarted"] && game["raceCountdown"] == 5)
	{
		game["raceCountdown"] = 6;
		game["count"] = 0;
		game["raceTime"]++;
		game["raceTimeMilli"] = 0;
	}
	else if(game["status"] == "" && game["raceStarted"])
	{
		if(!game["raceEnded"])
		{
			game["raceTime"]++;
			game["raceTimeMilli"] = 0;
		}
	}
}

function startRace()
{
	console.log("--- startRace ---");
	loadLevel();
	
	stopSound(game["music"]);
	game["music"] = playSound("music_" + game["trackCurrent"], true);
			
	game["coins"] -= game["raceCost"];
	if(game["coins"] < 0) game["coins"] = 0;
	
	game["bgOceanX"] = 0;
	game["bgOceanY"] = 0;
	
	game["status"] = "RACE_LOADING";
	game["lap"] = 1;
	game["checkpoint"] = 1;
	game["finished"] = false;
	
	game["raceStarted"] = false; // officially starts when the 3,2,1 countdown is finished
	game["raceEnded"] = false;
	game["raceCountdown"] = 0;
	game["raceCounter"] = 0;
	game["raceProgress"] = 0;
	game["raceTime"] = 0;
	game["raceTimeMilli"] = 0;
		
	game["playerX"] = 0;
	game["playerY"] = 0;
	game["playerR"] = 0;
	game["playerSpeed"] = 0;	
	game["playerXspeed"] = 0;
	game["playerYspeed"] = 0;
	game["playerRspeed"] = 0;
	game["playerRextra"] = 0;
	
	game["endedRaceManually"] = false;
	game["levelcreatorMinimapMarkers"] = 0;
	currentRace = "";
	
	// *** Copy boat settings from boat array to global settings
	game["playerAcceleration"] = game["boat"][game["selectedBoat"]]["upgrade1"][game["boat"][game["selectedBoat"]]["upgrade1"].upgradesDone].value;		console.log("1. playerAcceleration set to " + game["playerAcceleration"]);	
	game["playerRotationSpeed"] = game["boat"][game["selectedBoat"]]["upgrade2"][game["boat"][game["selectedBoat"]]["upgrade2"].upgradesDone].value;	console.log("2. playerRotationSpeed set to " + game["playerRotationSpeed"]);	
	game["playerMaxspeed"] = game["boat"][game["selectedBoat"]]["upgrade3"][game["boat"][game["selectedBoat"]]["upgrade3"].upgradesDone].value;		console.log("3. playerMaxspeed set to " + game["playerMaxspeed"]);	
	game["playerStartBoost"] = game["boat"][game["selectedBoat"]]["upgrade5"][game["boat"][game["selectedBoat"]]["upgrade5"].upgradesDone].value;		console.log("5. playerStartBoost set to " + game["playerStartBoost"]);
	

	// *** Copy opponent info into game array
	tempStart = game["rankingPos"] - 3;
	tempEnd = game["rankingPos"] + 1;
	
	if(tempEnd > 100)
	{
		tempMinus = tempEnd - 100;
		tempStart -= tempMinus;
		tempEnd -= tempMinus;
	}
	
	if(tempStart < 1)
	{
		tempPlus = -tempStart + 1;
		tempStart += tempPlus;
		tempEnd += tempPlus;
	}
	
	console.log("startRace rangingPos: " + game["rankingPos"] + ". Taking opponents ranged " + tempStart + " to " + tempEnd);
	
	for(i = 1; i <= 5; i++)
	{
		thisO = tempStart + i - 1;
		
		game["opponent"][i].car = opponentInfo[thisO].car;
		game["opponent"][i].carVariation = opponentInfo[thisO].carVariation;
		game["opponent"][i].speed = opponentInfo[thisO].speed;
		game["opponent"][i].speedAcceleration = opponentInfo[thisO].speedAcceleration;
		game["opponent"][i].rSpeed = opponentInfo[thisO].rSpeed;
		game["opponent"][i].name = opponentInfo[thisO].name;
		game["opponent"][i].avatar = opponentInfo[thisO].avatar;	
	}
	


	
	if(1==1 || game["track"][game["trackCurrent"]].bestCompare == 0)
	{
		console.log("Racing without opponents");
		
		for(key in opponent) delete opponent[key];
		startRaceReturn();
	}
	else
	{
		ajaxUpdate("a=loadBoatraceRecording&track=" + game["trackCurrent"] + "&time=" + game["track"][game["trackCurrent"]].bestCompare + "&name=" + game["avatarName"]);
	}
	
	setRaceCookie();
	
	// *** Show questions
	//game["status"] = ""; // **********************************************
	
	/*
	game["wlCheckAnswerParticles"] = false; 
	nextQuestion(); 
	game["status"] = "QUESTION";
	*/
	
	game["status"] = "";
	startRaceReturn();
}

function startRaceReturn()
{
	// game["status"] = ""; // **********************************************
	
	/* var opponent = { 1 : { "boat" : 2, "boatUpgrades" : "5|5|5|5|5", "x" : 0, "y" : 0, "checkpoint" : 1, "finished" : false, "raceProgress" : 0, "position" : 0, "positionY" : 0, "name" : "Guusje123", 	"avatar" : 2, "track" : "0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,0,0,0|0,-1,0,1|0,-3,0,2|0,-6,0,3|0,-9,0,4|0,-14,0,4|0,-19,0,5|0,-25,0,6|0,-32,0,7|0,-39,0,7|0,-47,0,8|0,-56,0,9|0,-65,0,9|0,-75,0,10|0,-85,0,10|0,-96,0,11|0,-108,0,12|0,-120,0,12|0,-132,0,12|0,-145,0,13|0,-159,0,13|0,-172,-12,14|1,-187,-23,14|2,-201,-33,15|3,-216,-29,15|5,-231,-26,15|7,-247,-23,16|10,-263,-21,16|13,-279,-33,16|16,-295,-45,17|21,-311,-55,17|26,-328,-64,17|32,-344,-72,18|39,-361,-80,18|47,-377,-71,18|55,-393,-64,18|64,-409,-74,18|75,-425,-84,19|86,-440,-93,19|98,-455,-84,19|110,-470,-77,19|123,-484,-71,19|136,-498,-66,19|149,-512,-63,19|163,-525,-76,19|177,-538,-88,19|192,-550,-99,19|207,-562,-91,19|223,-573,-85,19|238,-584,-80,19|254,-595,-76,19|270,-606,-73,19|287,-616,-70,19|303,-626,-85,19|320,-635,-98,19|337,-644,-108,19|354,-652,-118,19|372,-659,-110,19|390,-666,-103,19|408,-673,-97,19|426,-678,-110,19|445,-683,-121,19|464,-688,-130,19|483,-691,-139,19|502,-693,-146,19|521,-694,-136,19|540,-695,-128,19|559,-695,-122,19|578,-695,-117,19|598,-694,-112,19|617,-693,-109,19|636,-692,-106,19|655,-691,-104,19|674,-689,-103,19|693,-688,-101,19|713,-686,-100,19|732,-684,-99,19|751,-683,-99,19|770,-681,-115,19|789,-678,-129,19|808,-675,-141,19|827,-671,-151,19|845,-666,-160,19|863,-660,-151,19|882,-654,-144,19|900,-647,-138,19|917,-640,-151,19|935,-632,-161,19|952,-623,-171,19|968,-613,-179,19|985,-603,-170,19|1000,-592,-162,19|1016,-581,-156,19|1031,-569,-151,19|1046,-557,-147,19|1061,-545,-144,19|1076,-533,-142,19|1091,-521,-123,19|1106,-509,-107,19|1122,-498,-94,19|1137,-487,-99,19|1153,-476,-103,19|1169,-465,-107,19|1185,-455,-109,19|1202,-445,-111,19|1218,-435,-96,19|1235,-425,-83,19|1252,-417,-72,19|1269,-409,-79,19|1287,-401,-85,19|1305,-393,-90,19|1322,-386,-93,19|1340,-380,-96,19|1358,-373,-99,18|1374,-367,-101,18|1390,-361,-102,17|1406,-356,-103,16|1420,-351,-118,16|1434,-345,-130,15|1448,-340,-140,14|1461,-334,-149,15|1475,-327,-158,15|1488,-319,-165,16|1501,-310,-173,16|1514,-300,-165,16|1527,-290,-160,17|1540,-279,-155,17|1553,-268,-151,17|1566,-257,-148,17|1579,-244,-161,18|1591,-232,-173,18|1604,-218,-183,18|1615,-204,-192,18|1625,-190,-199,18|1635,-175,-206,18|1644,-159,-213,18|1652,-142,-203,18|1660,-126,-195,19|1667,-108,-189,19|1674,-91,-184,19|1681,-73,-180,18|1679,-78,-176,-4|1678,-81,-173,-4|1677,-85,-171,-4|1675,-89,-170,-4|1674,-92,-168,-4|1673,-96,-167,-4|1672,-99,-166,-3|1671,-102,-164,-3|1670,-105,-163,-3|1670,-108,-163,-3|1669,-110,-164,-2|1669,-111,-167,-1|1669,-111,-170,0|1669,-110,-172,1|1669,-108,-175,2|1669,-105,-180,3|1669,-103,-185,3|1669,-100,-189,3|1669,-96,-194,3|1668,-92,-199,4|1667,-87,-200,5|1665,-82,-201,6|1664,-75,-201,7|1661,-68,-202,7|1659,-61,-202,8|1656,-53,-202,9|1653,-44,-194,9|1650,-35,-186,10|1647,-25,-178,10|1644,-15,-181,11|1641,-3,-183,11|1638,8,-185,12|1635,20,-186,12|1632,33,-187,13|1629,46,-188,13|1626,59,-188,14|1623,73,-189,14|1620,87,-189,15|1617,102,-190,15|1614,117,-190,15|1611,132,-176,16|1608,148,-164,16|1606,164,-154,16|1605,181,-159,17|1604,197,-163,17|1603,215,-166,17|1602,232,-169,17|1601,250,-171,18|1601,268,-172,18|1600,286,-190,18|1600,304,-205,18|1598,323,-201,19|1597,342,-198,19|1595,361,-196,19|1594,380,-194,19|1592,399,-193,19|1590,418,-192,19|1588,437,-191,19|1585,456,-190,19|1583,475,-189,19|1581,494,-189,19|1579,513,-189,19|1577,533,-188,19|1574,552,-188,19|1572,571,-188,19|1570,590,-188,19|1567,609,-188,19|1565,628,-188,19|1563,647,-187,19|1560,666,-204,19|1557,685,-218,19|1553,704,-214,19|1550,723,-210,19|1546,741,-207,19|1541,760,-205,19|1537,779,-203,19|1532,797,-218,19|1527,816,-231,19|1521,834,-242,19|1514,852,-252,19|1506,870,-244,19|1498,887,-254,19|1489,904,-263,19|1479,920,-271,19|1468,936,-278,19|1457,951,-285,19|1444,966,-291,19|1431,980,-280,19|1417,993,-271,19|1403,1006,-264,19|1388,1018,-258,19|1373,1031,-253,19|1358,1042,-250,19|1343,1054,-247,19|1328,1066,-244,19|1312,1077,-243,19|1297,1089,-241,19|1281,1100,-240,19|1266,1111,-239,19|1250,1122,-238,19|1235,1134,-238,19|1219,1145,-237,19|1203,1156,-237,19|1187,1167,-253,19|1171,1177,-267,19|1155,1187,-262,19|1138,1197,-259,19|1122,1207,-255,19|1105,1216,-270,19|1088,1224,-282,19|1070,1233,-276,19|1053,1240,-271,19|1035,1248,-267,19|1017,1255,-264,19|999,1262,-278,19|981,1268,-290,19|963,1273,-301,19|944,1278,-293,19|925,1282,-287,19|907,1286,-282,19|888,1290,-279,19|869,1293,-275,19|850,1296,-273,19|831,1299,-288,19|812,1301,-300,19|793,1302,-311,19|773,1303,-304,19|754,1303,-298,19|735,1303,-294,19|716,1303,-290,19|697,1302,-287,19|678,1301,-285,19|658,1300,-283,19|639,1299,-281,19|620,1297,-280,19|601,1296,-279,19|582,1295,-278,19|563,1293,-261,19|543,1293,-246,19|524,1292,-250,19|505,1292,-254,19|486,1292,-256,19|467,1292,-275,19|447,1292,-291,19|428,1291,-288,19|409,1290,-285,19|390,1289,-283,19|371,1288,-282,19|352,1287,-280,19|332,1285,-296,19|313,1283,-310,19|294,1280,-321,19|275,1276,-331,19|257,1272,-340,19|238,1266,-348,19|220,1259,-355,19|203,1252,-361,19|186,1243,-367,19|169,1233,-373,19|153,1222,-378,19|138,1211,-383,19|124,1198,-388,19|111,1184,-393,19|98,1169,-397,19|87,1154,-401,19|90,1158,-402,-5|92,1161,-387,-4|93,1163,-377,-3|93,1164,-371,-1|94,1165,-367,0|93,1164,-366,1|93,1163,-367,1|93,1161,-369,2|93,1157,-372,3|92,1153,-376,4|93,1148,-381,5|93,1143,-386,6|95,1137,-391,6|96,1130,-391,7|99,1122,-390,8|101,1115,-389,8|105,1106,-389,9|108,1097,-389,10|112,1088,-388,10|117,1078,-388,11|121,1068,-388,11|126,1057,-388,12|131,1046,-388,12|137,1034,-388,13|143,1023,-376,13|148,1010,-365,14|154,997,-355,14|158,984,-347,14|163,969,-338,15|167,955,-331,15|170,940,-323,16|172,924,-331,16|174,908,-336,16|176,891,-326,17|176,875,-317,17|176,857,-309,17|175,840,-301,17|173,823,-294,18|173,827,-291,-4|174,830,-302,-3|174,832,-310,-2|175,834,-314,-1|175,834,-316,0|174,833,-316,1|174,832,-314,2|172,829,-311,3|170,827,-308,3|167,824,-303,4|164,820,-303,5|159,816,-303,6|154,812,-303,7|149,807,-303,7|142,802,-303,8|136,797,-303,9|128,792,-303,9|120,786,-303,10|112,780,-303,10|103,774,-303,11|93,768,-303,11|83,761,-303,12|73,754,-303,12|62,747,-303,13|51,740,-303,13|40,732,-303,14|28,725,-303,14|16,717,-303,15|3,709,-289,15|-10,701,-278,15|-24,693,-267,16|-38,686,-258,16|-53,680,-249,16|-69,674,-241,17|-85,669,-234,17|-102,665,-227,17|-119,662,-220,17|-136,660,-214,18|-154,659,-208,18|-172,659,-202,18|-191,660,-197,18|-209,663,-191,19|-228,666,-186,19|-246,672,-180,19|-264,678,-175,19|-282,686,-170,19|-299,695,-166,19|-315,705,-161,19|-331,716,-173,19|-346,727,-183,19|-361,739,-208,19|-376,751,-228,19|-391,763,-246,19|-407,774,-260,19|-423,785,-273,19|-439,796,-284,19|-455,806,-276,19|-472,815,-270,19|-468,813,-264,-5|-465,811,-261,-4|-462,810,-258,-3|-461,809,-255,-1|-461,809,-253,0|-461,809,-252,1|-462,810,-250,1|-465,811,-249,2|-468,812,-249,3|-471,814,-244,4|-475,816,-239,5|-480,819,-233,6|-486,822,-233,6|-492,826,-233,7|-498,830,-233,8|-505,834,-233,8|-513,840,-233,9|-521,845,-233,10|-529,851,-233,10|-538,857,-233,11|-547,864,-233,11|-557,870,-233,12|-567,878,-233,12|-577,885,-233,13|-588,893,-233,13|-599,901,-233,14|-610,909,-233,14|-622,918,-246,14|-634,926,-258,15|-647,934,-254,15|-660,942,-252,16|-673,951,-250,16|-687,959,-262,16|-702,967,-274,17|-717,974,-284,17|-733,981,-293,17|-749,987,-301,17|-766,992,-309,18|-783,996,-316,18|-801,999,-322,18|-819,1001,-329,18|-838,1002,-335,19|-857,1002,-341,19|-876,1001,-346,19|-895,998,-352,19|-914,994,-357,19|-932,989,-362,19|-950,982,-350,19|-968,975,-340,19|-986,968,-332,19|-1003,960,-326,19|-1020,951,-321,19|-1037,942,-334,19|-1054,932,-328,19|-1070,923,-324,19|-1086,912,-337,19|-1102,901,-348,19|-1118,890,-358,19|-1132,877,-367,19|-1146,864,-375,19|-1159,850,-382,19|-1172,836,-388,19|-1183,820,-377,19|-1195,805,-368,19|-1205,789,-361,19|-1215,772,-356,19|-1225,756,-351,19|-1235,739,-348,19|-1244,722,-362,19|-1253,705,-374,19|-1260,688,-384,19|-1267,670,-393,19|-1274,652,-384,19|-1280,633,-377,19|-1285,615,-372,19|-1290,596,-367,19|-1294,578,-364,19|-1299,559,-361,19|-1303,540,-359,19|-1307,522,-357,19|-1311,503,-372,19|-1314,484,-385,19|-1317,465,-396,19|-1318,446,-389,19|-1320,427,-384,19|-1321,407,-379,19|-1321,388,-376,19|-1322,369,-390,19|-1321,350,-402,19|-1320,331,-412,19|-1318,312,-421,19|-1314,293,-429,19|-1310,274,-436,19|-1305,255,-443,19|-1298,237,-449,19|-1291,220,-455,19|-1282,203,-460,19|-1273,186,-465,19|-1262,170,-470,19|-1250,155,-475,19|-1237,141,-479,19|-1223,127,-484,19|-1208,115,-488,19|-1193,104,-492,19|-1177,93,-497,19|-1160,84,-501,19|-1142,76,-505,19|-1124,70,-509,19|-1106,64,-496,19|-1087,59,-486,19|-1069,55,-478,19|-1050,52,-488,19|-1031,49,-497,19|-1012,48,-505,19|-992,47,-513,19|-973,48,-519,19|-954,49,-508,19|-935,52,-500,19|-916,55,-493,19|-897,58,-487,19|-878,62,-483,19|-860,66,-480,19|-841,70,-460,19|-822,73,-443,19|-803,76,-429,19|-784,79,-434,19|-765,82,-438,19|-746,84,-441,19|-727,86,-444,19|-708,88,-446,19|-689,89,-447,19|-669,91,-448,19|-650,93,-449,19|-631,94,-450,19|-612,95,-451,19|-593,97,-451,19|-574,98,-452,19|-554,99,-435,19|-535,100,-421,19|-516,100,-426,19|-497,99,-430,19|-478,99,-433,19|-459,98,-436,19|-439,97,-438,19|-420,96,-439,19|-401,95,-440,19|-382,94,-441,19|-363,93,-425,19|-344,91,-412,19|-325,88,-417,19|-306,85,-421,19|-287,82,-424,19|-268,79,-410,19|-249,75,-398,19|-230,70,-388,19|-212,64,-378,19|-194,57,-387,19|-176,50,-394,19|-159,43,-399,19|-141,35,-404,19|-124,26,-391,19|-107,17,-379,19|-90,8,-369,19|-74,-3,-360,19|-59,-14,-369,19|-43,-26,-377,19|-28,-38,-366,19|-14,-51,-356,19|-1,-64,-348,19|12,-79,-340,19|24,-94,-333,19|35,-109,-327,19|46,-125,-338,19|55,-142,-346,19|64,-159,-353,19|73,-176,-359,19|71,-172,-365,-5|69,-168,-370,-4|68,-166,-373,-3|68,-165,-374,-1|68,-164,-374,0|68,-165,-374,1|68,-166,-374,1|69,-168,-374,2|70,-172,-374,3|71,-175,-374,4|72,-180,-374,5|74,-185,-374,6|76,-192,-374,6|78,-198,-375,7|80,-206,-375,8|82,-214,-375,8|84,-223,-375,9|87,-232,-375,10|89,-242,-375,10|92,-252,-375,11|95,-263,-375,11|98,-274,-375,12|101,-286,-386,12|105,-298,-396,13|109,-311,-405,13|114,-324,-401,14|119,-337,-398,14|125,-350,-396,14|130,-364,-394,15|137,-378,-393,15|143,-392,-405,16|151,-406,-416,16|158,-420,-412,16|167,-434,-408,17|175,-449,-406,17|184,-463,-419,17|194,-477,-430,17|205,-492,-424,18|215,-506,-420,18|227,-520,-432,18|239,-534,-443,18|252,-547,-453,19|266,-560,-462,19|280,-572,-453,19|295,-584,-446,19|311,-596,-458,19|327,-606,-467,19|343,-616,-476,19|360,-626,-467,19|377,-634,-460,19|394,-642,-471,19|412,-649,-480,19|430,-656,-489,19|449,-661,-496,19|468,-665,-486,19|486,-669,-478,19|505,-672,-472,19|524,-675,-467,19|543,-678,-463,19|562,-680,-460,19|581,-682,-457,19|601,-684,-455,19|620,-685,-453,19|639,-687,-452,19|658,-688,-451,19|677,-690,-450,19|696,-691,-449,19|715,-693,-449,19|735,-694,-465,19|754,-694,-479,19|773,-694,-491,19|792,-693,-484,19|811,-692,-479,19|831,-691,-475,19|850,-688,-489,19|869,-686,-500,19|887,-682,-510,19|906,-678,-519,19|925,-672,-527,19|943,-666,-534,19|960,-658,-541,19|977,-650,-547,19|994,-640,-552,19|1010,-629,-558,19|1025,-618,-563,19|1040,-605,-551,19|1054,-592,-541,19|1067,-578,-533,19|1081,-565,-510,19|1094,-551,-491,19|1108,-538,-475,19|1122,-524,-461,19|1137,-512,-450,19|1152,-500,-439,19|1167,-489,-430,19|1183,-478,-423,19|1200,-469,-415,19|1217,-460,-426,19|1235,-452,-434,19|1252,-445,-440,19|1270,-437,-446,19|1288,-431,-450,19|1306,-424,-470,19|1324,-417,-487,19|1342,-409,-501,19|1359,-401,-514,19|1376,-392,-524,19|1393,-383,-533,19|1409,-372,-542,19|1424,-361,-549,19|1439,-349,-556,19|1453,-336,-562,19|1467,-322,-568,19|1479,-308,-556,19|1491,-293,-547,19|1502,-277,-557,19|1513,-261,-565,19|1522,-244,-573,19|1531,-227,-563,19|1539,-210,-555,19|1547,-192,-548,19|1554,-174,-543,19|1561,-157,-539,19|1568,-139,-536,19|1575,-121,-533,19|1581,-103,-531,19|1587,-84,-529,19|1594,-66,-528,19|1600,-48,-527,19|1606,-30,-526,19|1611,-11,-542,19|1617,7,-539,19|1622,25,-537,19|1627,44,-535,19|1632,63,-550,19|1636,81,-563,19|1640,100,-557,19|1643,119,-553,19|1646,138,-549,19|1649,157,-546,19|1651,176,-544,19|1654,195,-542,19|1656,214,-557,19|1657,233,-570,19|1658,253,-582,19|1658,272,-575,19|1658,291,-569,19|1657,310,-565,19|1656,329,-561,19|1655,349,-558,19|1653,368,-556,19|1652,387,-554,19|1650,406,-552,19|1648,425,-551,19|1646,444,-550,19|1644,463,-566,19|1641,482,-580,19|1638,501,-575,19|1635,520,-571,19|1631,539,-568,19|1627,558,-565,19|1623,576,-563,19|1618,595,-578,19|1613,614,-591,19|1607,632,-585,19|1601,650,-581,19|1595,668,-577,19|1589,686,-574,19|1582,704,-572,19|1575,722,-570,19|1568,740,-569,19|1561,758,-584,19|1553,776,-597,19|1545,793,-609,19|1536,810,-602,19|1526,827,-597,19|1517,843,-592,19|1507,860,-589,19|1497,876,-603,19|1486,892,-615,19|1474,907,-625,19|1462,922,-634,19|1449,936,-642,19|1435,949,-633,19|1421,962,-625,19|1407,975,-619,19|1392,987,-631,19|1377,999,-641,19|1361,1010,-634,19|1345,1021,-627,19|1329,1031,-622,19|1312,1041,-618,19|1296,1051,-615,19|1279,1060,-613,19|1262,1070,-611,19|1246,1079,-609,19|1229,1088,-625,19|1211,1096,-638,19|1194,1104,-632,19|1176,1112,-628,19|1159,1120,-625,19|1141,1127,-622,19|1123,1134,-620,19|1105,1141,-618,19|1087,1148,-616,19|1069,1154,-615,19|1051,1161,-614,19|1033,1168,-614,19|1015,1174,-613,19|997,1181,-612,19|979,1187,-612,19|961,1194,-612,19|943,1200,-612,19|925,1207,-611,19|907,1213,-611,19|889,1219,-611,19|870,1226,-611,19|852,1232,-611,19|834,1239,-611,19|816,1245,-628,19|798,1250,-642,19|779,1256,-637,19|761,1261,-633,19|742,1265,-630,19|723,1270,-628,19|705,1274,-626,19|686,1278,-642,19|667,1282,-655,19|648,1285,-649,19|629,1287,-644,19|610,1290,-641,19|591,1292,-638,19|572,1294,-636,19|553,1296,-634,19|534,1297,-632,19|514,1299,-631,19|495,1300,-630,19|476,1302,-630,19|457,1303,-629,19|438,1304,-629,19|419,1305,-645,19|400,1306,-659,19|380,1306,-654,19|361,1305,-650,19|342,1305,-664,19|323,1303,-676,19|304,1301,-686,19|285,1298,-695,19|266,1294,-703,19|248,1288,-710,19|229,1282,-716,19|212,1275,-722,19|194,1266,-728,19|178,1257,-733,19|162,1246,-738,19|147,1234,-743,19|132,1222,-748,19|119,1208,-752,19|106,1193,-757,19|109,1197,-757,-5|111,1200,-743,-4|113,1202,-732,-3|114,1203,-726,-1|114,1204,-723,0|114,1203,-721,1|113,1202,-722,1|113,1200,-724,2|112,1197,-727,3|112,1192,-731,4|112,1188,-736,5|112,1182,-741,6|113,1176,-747,6|114,1169,-753,7|116,1161,-752,8|118,1153,-751,8|121,1145,-750,9|124,1136,-749,10|128,1126,-749,10|132,1116,-748,11|136,1106,-738,11|141,1095,-728,12|145,1083,-719,12|149,1071,-722,13|153,1059,-725,13|158,1046,-727,14|162,1032,-728,14|166,1019,-717,14|169,1004,-706,15|172,989,-697,15|175,974,-688,16|176,958,-680,16|177,942,-673,16|177,925,-666,17|176,909,-659,17|174,892,-668,17|172,875,-660,17|168,857,-652,18|163,840,-645,18|157,823,-638,18|150,806,-632,18|142,789,-642,19|133,773,-650,19|123,756,-657,19|113,740,-645,19|102,724,-635,19|90,709,-626,19|78,695,-618,19|64,681,-611,19|50,668,-605,19|35,656,-599,19|19,645,-593,19|3,635,-588,19|-14,626,-583,19|-31,618,-578,19|-49,611,-573,19|-68,606,-569,19|-87,602,-564,19|-106,599,-560,19|-125,598,-556,19|-144,597,-552,19|-163,599,-547,19|-182,601,-543,19|-201,605,-539,19|-220,610,-535,19|-238,616,-531,19|-255,624,-527,19|-272,633,-523,19|-289,643,-519,19|-304,654,-515,19|-319,666,-511,19|-333,679,-507,19|-346,693,-503,19|-358,708,-499,19|-369,724,-495,19|-379,740,-491,19|-388,757,-520,19|-397,774,-545,19|-406,792,-565,19|-415,809,-582,19|-424,825,-597,19|-434,842,-609,19|-444,858,-620,19|-456,873,-629,19|-468,888,-638,19|-481,902,-645,19|-494,916,-652,19|-509,929,-658,19|-524,940,-664,19|-540,951,-669,19|-557,961,-674,19|-574,969,-679,19|-591,977,-684,19|-610,983,-688,19|-628,988,-693,19|-647,991,-697,19|-666,994,-702,19|-685,995,-706,19|-704,994,-710,19|-724,993,-714,19|-743,990,-701,19|-762,987,-674,19|-780,983,-669,19|-799,979,-664,19|-818,975,-661,19|-837,970,-658,19|-855,965,-656,19|-874,960,-654,19|-892,955,-669,19|-910,949,-682,19|-928,943,-694,19|-946,935,-703,19|-964,927,-695,19|-981,919,-689,19|-998,910,-684,19|-1015,900,-696,19|-1031,890,-707,19|-1047,880,-717,19|-1062,868,-725,19|-1077,856,-733,19|-1091,843,-723,19|-1105,829,-715,19|-1118,815,-708,19|-1131,801,-703,19|-1143,787,-699,19|-1156,772,-713,19|-1167,757,-724,19|-1179,741,-734,19|-1189,725,-743,19|-1198,708,-751,19|-1207,691,-741,19|-1215,674,-734,19|-1223,656,-727,19|-1230,638,-723,19|-1237,620,-719,19|-1243,602,-732,19|-1249,584,-744,19|-1254,565,-754,19|-1259,547,-746,19|-1263,528,-740,19|-1266,509,-735,19|-1269,490,-731,19|-1272,471,-728,19|-1275,452,-725,19|-1277,433,-723,19|-1279,414,-721,19|-1282,395,-720,19|-1284,376,-719,19|-1286,357,-718,19|-1288,338,-717,19|-1289,318,-734,19|-1291,299,-747,19|-1291,280,-759,19|-1291,261,-770,19|-1289,242,-779,19|-1287,223,-787,19|-1284,204,-794,19|-1280,185,-800,19|-1274,167,-806,19|-1267,149,-812,19|-1259,131,-817,19|-1251,114,-822,19|-1240,98,-827,19|-1229,82,-832,19|-1217,67,-837,19|-1204,53,-841,19|-1190,40,-845,19|-1175,28,-850,19|-1159,17,-854,19|-1143,7,-858,19|-1126,-2,-862,19|-1108,-9,-866,19|-1090,-16,-870,19|-1072,-21,-874,19|-1053,-24,-878,19|-1034,-27,-883,19|-1015,-28,-887,19|-995,-28,-891,19|-976,-26,-895,19|-957,-23,-899,19|-939,-19,-903,19|-943,-20,-903,-5|-947,-21,-890,-4|-949,-22,-880,-3|-950,-22,-871,-1|-951,-22,-865,0|-950,-22,-860,1|-949,-22,-855,1|-947,-21,-852,2|-944,-19,-853,3|-941,-17,-855,4|-936,-15,-858,5|-933,-12,-861,5|-929,-9,-865,4|-926,-7,-868,4|-923,-4,-871,4|-920,-1,-874,4|-917,3,-878,5|-914,7,-883,6|-910,13,-888,6|-907,19,-887,7|-903,25,-886,8|-900,33,-885,8|-896,41,-877,9|-892,50,-868,10|-888,59,-860,10|-884,68,-854,10|-879,76,-848,9|-874,83,-842,9|-869,91,-837,10|-863,99,-831,10|-856,108,-825,11|-848,116,-820,11|-840,124,-814,12|-830,131,-808,12|-820,139,-802,13|-809,146,-796,13|-797,152,-790,14|-784,158,-784,14|-770,163,-778,14|-756,167,-772,15|-741,170,-780,15|-726,173,-786,16|-710,175,-791,16|-694,177,-795,16|-678,179,-784,16|-661,180,-773,17|-644,179,-764,17|-627,179,-756,17|-609,177,-748,18|-592,173,-741,18|-574,170,-750,18|-556,165,-757,18|-538,160,-763,19|-521,154,-768,19|-502,148,-788,19|-484,142,-806,19|-466,137,-820,19|-447,132,-816,19|-429,127,-812,19|-410,122,-810,19|-391,118,-791,19|-373,113,-775,19|-354,107,-761,19|-336,101,-766,19|-318,95,-770,19|-300,88,-774,19|-282,82,-776,19|-264,74,-762,19|-247,67,-749,19|-229,58,-738,19|-212,49,-745,19|-196,40,-751,19|-179,30,-756,19|-163,20,-760,19|-147,10,-763,19|-131,-1,-748,19|-115,-12,-736,19|-100,-24,-725,19|-85,-36,-716,19|-71,-50,-708,19|-58,-63,-717,19|-45,-78,-725,19|-33,-92,-714,19|-21,-108,-704,19|-10,-124,-696,19|0,-140,-689,19|9,-157,-699,19|17,-174,-707,19|26,-191,-713,19|33,-209,-718,19|41,-227,-722,19|48,-244,-742,19|56,-262,-759,19|64,-279,-774,19|73,-296,-786,19|82,-313,-796,19|92,-330,-789,19|103,-346,-800,19|114,-361,-809,19|126,-376,-817,19|139,-390,-808,19|152,-404,-801,19|165,-418,-795,19|179,-431,-790,19|193,-445,-786,19|207,-457,-783,19|222,-470,-780,19|236,-483,-779,19|251,-495,-777,19|265,-508,-793,19|281,-520,-806,19|296,-531,-800,19|312,-542,-796,19|327,-553,-793,19|343,-564,-790,19|359,-574,-804,19|376,-584,-817,19|393,-593,-828,19|410,-602,-820,19|427,-610,-814,19|445,-618,-810,19|463,-625,-823,19|481,-632,-834,19|499,-638,-827,19|517,-643,-821,19|536,-649,-817,19|554,-654,-813,19|573,-658,-810,19|592,-663,-808,19|610,-667,-806,19|629,-671,-805,19|648,-675,-820,19|667,-679,-834,19|686,-681,-845,19|705,-683,-855,19|724,-684,-847,19|743,-685,-840,19|762,-685,-852,19|782,-684,-862,19|801,-682,-871,19|820,-679,-879,19|838,-675,-886,19|857,-670,-893,19|875,-664,-899,19|893,-656,-904,19|910,-648,-893,19|927,-639,-884,19|944,-630,-893,19|960,-619,-901,19|976,-608,-909,19|991,-596,-899,19|1005,-583,-891,19|1019,-571,-884,19|1033,-557,-879,19|1047,-544,-875,19|1061,-530,-855,19|1074,-517,-838,19|1089,-504,-824,19|1103,-491,-828,19|1118,-479,-832,19|1132,-467,-835,19|1147,-455,-821,19|1163,-443,-808,19|1179,-433,-797,19|1195,-423,-788,19|1212,-414,-780,19|1230,-405,-772,19|1247,-398,-766,19|1266,-392,-759,19|1284,-387,-771,19|1303,-382,-779,19|1321,-378,-786,19|1340,-375,-809,19|1359,-371,-828,19|1378,-367,-843,19|1396,-362,-857,19|1415,-357,-868,19|1433,-351,-879,19|1451,-343,-887,19|1468,-336,-895,19|1485,-327,-902,19|1502,-317,-909,19|1518,-306,-915,19|1533,-294,-920,19|1547,-281,-926,19|1560,-267,-931,19|1573,-253,-935,19|1584,-237,-940,19|1595,-221,-945,19|1604,-204,-949,19|1612,-187,-953,19|1619,-169,-958,19|1625,-151,-962,19|1629,-132,-949,19|1633,-113,-922,19|1637,-94,-900,19|1641,-76,-898,19|1644,-57,-897,19|1648,-38,-895,19|1651,-19,-895,19|1655,0,-894,19|1658,19,-910,19|1660,38,-924,19|1662,57,-935,19|1663,76,-946,19|1663,96,-955,19|1662,115,-963,19|1661,134,-953,19|1658,153,-945,19|1655,172,-939,19|1652,191,-934,19|1649,210,-914,19|1646,229,-896,19|1643,248,-882,19|1641,267,-886,19|1639,286,-889,19|1637,305,-892,19|1635,324,-894,19|1634,343,-896,19|1633,362,-880,19|1632,382,-867,19|1632,401,-873,19|1632,420,-877,19|1633,439,-881,19|1634,458,-883,19|1635,477,-903,19|1635,497,-919,19|1635,516,-915,19|1635,535,-913,19|1635,554,-911,19|1634,573,-909,19|1634,593,-925,19|1632,612,-938,19|1630,631,-949,19|1627,650,-959,19|1624,669,-951,19|1620,687,-961,19|1614,706,-970,19|1608,724,-979,19|1601,742,-986,19|1593,759,-976,19|1585,777,-967,19|1575,794,-961,19|1566,810,-956,19|1556,827,-951,19|1546,843,-948,19|1536,859,-945,19|1526,875,-960,19|1514,891,-973,19|1503,906,-983,19|1491,921,-976,19|1478,936,-970,19|1465,950,-982,19|1451,963,-993,19|1437,976,-985,19|1423,989,-979,19|1408,1002,-974,19|1393,1014,-970,19|1378,1026,-967,19|1363,1037,-981,19|1347,1048,-994,19|1331,1059,-988,19|1315,1069,-983,19|1299,1079,-979,19|1282,1089,-975,19|1265,1098,-990,19|1248,1107,-1002,19|1231,1115,-996,19|1213,1123,-991,19|1196,1131,-987,19|1178,1138,-983,19|1160,1145,-981,19|1142,1152,-979,19|1124,1159,-977,19|1106,1166,-976,19|1088,1172,-975,19|1070,1179,-974,19|1052,1185,-973,19|1034,1192,-973,19|1016,1198,-972,19|998,1205,-972,19|980,1211,-972,19|962,1218,-972,19|944,1224,-971,19|926,1231,-971,19|908,1237,-971,19|889,1243,-988,19|871,1249,-1002,19|852,1254,-1014,19|834,1258,-1008,19|815,1262,-1003,19|796,1266,-999,19|777,1270,-996,19|758,1273,-1010,19|739,1275,-1022,19|720,1277,-1016,19|701,1278,-1011,19|682,1279,-1007,19|663,1280,-1004,19|643,1281,-1001,19|624,1281,-999,19|605,1281,-1014,19|586,1281,-1027,19|567,1280,-1021,19|548,1278,-1017,19|528,1277,-1013,19|509,1275,-1010,19|490,1272,-1025,19|471,1269,-1037,19|452,1266,-1031,19|434,1262,-1026,19|415,1258,-1022,19|396,1253,-1036,19|378,1247,-1048,19|360,1241,-1058,19|342,1234,-1067,19|325,1226,-1075,19|308,1217,-1082,19|291,1207,-1089,19|275,1196,-1095,19|260,1184,-1100,19|246,1172,-1089,19|232,1158,-1080,19|218,1145,-1072,19|205,1131,-1083,19|193,1116,-1093,19|182,1100,-1101,19|171,1084,-1109,19|161,1068,-1099,19|152,1051,-1091,19|143,1034,-1101,19|135,1017,-1110,19|128,999,-1118,19|122,980,-1126,19|117,962,-1115,19|113,943,-1107,19|108,925,-1084,19|104,906,-1064,19|100,887,-1048,19|95,869,-1034,19|89,850,-1022,19|83,832,-1012,19|75,814,-1003,19|67,797,-995,19|58,780,-988,19|48,764,-981,19|37,748,-975,19|25,733,-969,19|12,719,-964,19|-2,706,-959,19|-17,694,-954,19|-33,682,-949,19|-49,672,-945,19|-66,663,-940,19|-83,655,-936,19|-101,648,-932,19|-120,643,-928,19|-138,639,-923,19|-157,636,-919,19|-177,634,-915,19|-196,634,-911,19|-215,635,-907,19|-234,638,-903,19|-253,642,-899,19|-271,647,-895,19|-289,653,-891,19|-307,661,-887,19|-324,669,-883,19|-341,679,-879,19|-356,691,-875,19|-371,703,-871,19|-385,716,-867,19|-398,730,-863,19|-410,745,-876,19|-422,760,-903,19|-434,775,-925,19|-445,790,-944,19|-457,806,-960,19|-470,820,-973,19|-483,834,-985,19|-496,848,-995,19|-510,861,-1003,19|-525,873,-1011,19|-541,885,-1018,19|-557,895,-1025,19|-573,904,-1031,19|-591,913,-1036,19|-608,920,-1042,19|-627,926,-1047,19|-645,931,-1051,19|-664,934,-1056,19|-683,937,-1044,19|-702,938,-1034,19|-722,940,-1026,19|-741,940,-1020,19|-760,940,-1015,19|-779,940,-1011,19|-798,939,-1024,19|-817,938,-1036,19|-836,935,-1046,19|-855,932,-1055,19|-874,928,-1063,19|-893,923,-1070,19|-911,917,-1060,19|-929,910,-1052,19|-947,903,-1045,19|-964,895,-1057,19|-981,886,-1067,19|-998,877,-1075,19|-1014,866,-1083,19|-1030,855,-1074,19|-1045,844,-1066,19|-1060,832,-1060,19|-1075,819,-1071,19|-1089,806,-1082,19|-1102,793,-1074,19|-1116,779,-1068,19|-1129,765,-1063,19|-1141,750,-1075,19|-1153,735,-1087,19|-1164,719,-1096,19|-1175,703,-1105,19|-1184,687,-1112,19|-1193,670,-1102,19|-1201,652,-1094,19|-1209,635,-1088,19|-1216,617,-1083,19|-1223,599,-1079,19|-1230,581,-1076,19|-1236,563,-1090,19|-1242,544,-1102,19|-1247,526,-1096,19|-1252,507,-1091,19|-1256,489,-1087,19|-1260,470,-1100,19|-1263,451,-1095,19|-1267,432,-1091,19|-1269,413,-1088,19|-1272,394,-1085,19|-1275,375,-1083,19|-1277,356,-1081,19|-1279,337,-1080,19|-1281,318,-1096,19|-1282,299,-1109,19|-1283,279,-1121,19|-1283,260,-1131,19|-1281,241,-1139,19|-1279,222,-1147,19|-1276,203,-1154,19|-1272,184,-1161,19|-1266,166,-1167,19|-1259,148,-1172,19|-1252,130,-1178,19|-1243,113,-1183,19|-1233,97,-1187,19|-1222,81,-1192,19|-1209,67,-1197,19|-1196,53,-1201,19|-1182,39,-1205,19|-1167,27,-1210,19|-1152,16,-1214,19|-1135,6,-1218,19|-1118,-2,-1222,19|-1100,-10,-1226,19|-1082,-16,-1230,19|-1064,-21,-1234,19|-1045,-25,-1238,19|-1026,-27,-1243,19|-1007,-29,-1247,19|-988,-28,-1251,19|-968,-27,-1255,19|-949,-24,-1259,19|-954,-25,-1259,-5|-958,-25,-1244,-4|-960,-26,-1233,-3|-962,-27,-1227,-1|-962,-27,-1223,0|-962,-27,-1222,1|-960,-26,-1222,1|-958,-24,-1224,2|-956,-22,-1224,3|-953,-19,-1228,4|-950,-16,-1233,5|-946,-12,-1238,6|-942,-6,-1243,6|-939,-1,-1249,7|-935,6,-1248,8|-931,14,-1247,8|-927,22,-1246,9|-923,31,-1236,10|-919,40,-1228,10|-914,50,-1219,11|-909,60,-1211,11|-904,70,-1204,12|-897,80,-1197,12|-890,91,-1190,13|-882,101,-1183,13|-873,112,-1176,14|-863,122,-1170,14|-853,132,-1164,14|-841,141,-1157,15|-829,150,-1151,15|-816,158,-1146,16|-802,165,-1140,16|-787,172,-1134,16|-771,178,-1128,17|-755,182,-1123,17|-739,186,-1117,17|-721,189,-1112,17|-704,190,-1107,18|-686,190,-1101,18|-668,189,-1096,18|-650,187,-1091,18|-631,183,-1086,19|-613,179,-1114,19|-595,174,-1137,19|-576,169,-1156,19|-558,164,-1173,19|-539,160,-1187,19|-520,156,-1199,19|-501,153,-1209,19|-482,151,-1218,19|-463,150,-1210,19|-444,149,-1186,19|-424,148,-1166,19|-405,147,-1149,19|-386,145,-1135,19|-367,143,-1140,19|-348,140,-1144,19|-329,138,-1147,19|-310,135,-1149,19|-291,132,-1151,19|-272,128,-1136,19|-253,124,-1123,19|-235,119,-1112,19|-217,113,-1102,19|-198,107,-1093,19|-181,99,-1085,19|-164,91,-1079,19|-147,81,-1072,19|-131,71,-1066,19|-115,59,-1061,19|-101,47,-1056,19|-87,34,-1051,19|-74,19,-1046,19|-62,4,-1041,19|-52,-11,-1037,18|-43,-26,-1034,18|-36,-42,-1031,17|-29,-57,-1043,16|-24,-71,-1053,16|-19,-85,-1060,15|-14,-99,-1066,14|-11,-112,-1071,14|-7,-125,-1075,13|-4,-138,-1078,13|-1,-150,-1081,12|1,-161,-1083,12|4,-172,-1084,11|6,-183,-1086,11|8,-193,-1087,10|10,-203,-1087,10|12,-212,-1088,10|14,-221,-1089,9|15,-230,-1089,9|17,-238,-1089,8|19,-246,-1090,8|20,-254,-1090,8|22,-261,-1090,8|23,-268,-1090,7|24,-275,-1090,7|25,-282,-1090,7|27,-288,-1090,6|28,-294,-1090,6|29,-300,-1091,6|30,-305,-1091,6|31,-311,-1091,5|32,-316,-1091,5|33,-321,-1091,5|34,-325,-1091,5|35,-330,-1091,5|35,-334,-1091,4|36,-338,-1091,4|37,-342,-1091,4|38,-346,-1091,4|38,-350,-1091,4|39,-353,-1091,4|40,-357,-1091,3|40,-360,-1091,3|41,-363,-1091,3|41,-366,-1091,3|42,-369,-1091,3|43,-372,-1091,3|43,-374,-1091,3|44,-377,-1091,3|44,-379,-1091,2|44,-382,-1091,2|45,-384,-1091,2|45,-386,-1091,2|46,-388,-1091,2|46,-390,-1091,2|46,-392,-1091,2|47,-394,-1091,2|47,-396,-1091,2|47,-398,-1091,2|48,-399,-1091,2|48,-401,-1091,2|48,-402,-1091,2|49,-404,-1091,1|49,-405,-1091,1|49,-406,-1091,1|49,-408,-1091,1|50,-409,-1091,1|50,-410,-1091,1|50,-411,-1091,1|50,-412,-1091,1|50,-413,-1091,1|51,-414,-1091,1|51,-415,-1091,1|51,-416,-1091,1|51,-417,-1091,1|51,-418,-1091,1|51,-419,-1091,1|52,-420,-1091,1|52,-420,-1091,1|52,-421,-1091,1|52,-422,-1091,1|52,-422,-1091,1|52,-423,-1091,1|52,-424,-1091,1|52,-424,-1091,1|53,-425,-1091,1|53,-425,-1091,1|53,-426,-1091,1|53,-426,-1091,1|53,-427,-1091,0|53,-427,-1091,0|53,-428,-1091,0|53,-428,-1091,0|53,-429,-1091,0|53,-429,-1091,0|53,-429,-1091,0|53,-430,-1091,0|54,-430,-1091,0|54,-430,-1091,0|54,-431,-1091,0|54,-431,-1091,0|54,-431,-1091,0|54,-432,-1091,0|54,-432,-1091,0|54,-432,-1091,0|54,-432,-1091,0|54,-433,-1091,0|54,-433,-1091,0|54,-433,-1091,0|54,-433,-1091,0|54,-433,-1091,0|54,-434,-1091,0|54,-434,-1091,0|54,-434,-1091,0|54,-434,-1091,0|54,-434,-1091,0|54,-434,-1091,0|54,-435,-1091,0|54,-435,-1091,0|54,-435,-1091,0|54,-435,-1091,0|55,-435,-1091,0|55,-435,-1091,0|55,-435,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-436,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|55,-437,-1091,0|", }, }; */
	
	for(key in opponent)
	{
		opponent[key].x = 0;
		opponent[key].y = 0;
		opponent[key].checkpoint = 1;
		opponent[key].finished = false;
		opponent[key].raceProgress = 0;
		opponent[key].position = 0;
		opponent[key].positionY = 0;
		opponent[key].x = 0;
	}


	for(ii = 1; ii <= game["raceOpponents"]; ii++)
	{
		if(typeof opponent[ii] !== "undefined")
		{
			opponent[ii]["trackSplit"] = opponent[ii]["track"].split("|");
			
			if(ii == 1) opponent[ii].extraX = -45;
			if(ii == 2) opponent[ii].extraX = 45;
			if(ii == 3) opponent[ii].extraX = -90;
			if(ii == 4) opponent[ii].extraX = 90;
			
			opponent[ii].x = 0;
			opponent[ii].y = 0;
			opponent[ii].checkpoint = 1;
			opponent[ii].finished = false;
			opponent[ii].raceProgress = 0;
			opponent[ii].position = 0;
			opponent[ii].positionY = 0;
		}
	}
		
	console.log("startRaceReturn");
	// console.log(opponent);
	
}

function endRace()
{
	
	console.log("--- endRace --- " + game["track"][game["trackCurrent"]].bestCompare);
	
	stopSound(game["music"]);
	
	playSound("success");
	// playSound("boom");
	playSound("applaude");

	game["raceEnded"] = true;
	game["count"] = 0;
	
	thisEndTime = game["raceTime"] + game["raceTimeMilli"]/100;
	console.log("thisEndTime: " + thisEndTime);
	
	
	CountOpponents = 0;
	
	for(ii = 1; ii <= 5; ii++)
	{
		if(typeof game["opponent"][ii] !== "undefined")
		{
			CountOpponents +=1;
		}
	}
	

	if(game["track"][game["trackCurrent"]].best == 0 || game["track"][game["trackCurrent"]].bestCompare == 0 || CountOpponents==0) game["track"][game["trackCurrent"]].bestCompare = thisEndTime;
	
	
	game["positionFinish"] = game["position"];

	console.log("Previous bestCompare: " + game["track"][game["trackCurrent"]].bestCompare);
	console.log("positionFinish: " + game["positionFinish"]);
	
	game["rankingPosPrev"] = game["rankingPos"];
	if(game["position"] == 1) game["rankingPos"] -= 5;
	if(game["position"] == 2) game["rankingPos"] -= 4;
	if(game["position"] == 3) game["rankingPos"] -= 3;
	if(game["position"] == 4) game["rankingPos"] -= 0;
	if(game["position"] == 5) game["rankingPos"] += 2;
	if(game["position"] == 6) game["rankingPos"] += 4;
	if(game["rankingPos"] < 1) game["rankingPos"] = 1;
	if(game["rankingPos"] > 100) game["rankingPos"] = 100;
	
	if(game["position"] == 2 && game["rankingPos"] < 2) game["rankingPos"] = 2;
	if(game["position"] == 3 && game["rankingPos"] < 3) game["rankingPos"] = 3;
	if(game["position"] == 4 && game["rankingPos"] < 4) game["rankingPos"] = 4;
	if(game["position"] == 5 && game["rankingPos"] < 5) game["rankingPos"] = 5;
	if(game["position"] == 6 && game["rankingPos"] < 6) game["rankingPos"] = 6;
	
	console.log("Changed ranking from " + game["rankingPosPrev"] + " to " + game["rankingPos"]);
	
	
	if(game["position"] == 1)
	{
		thisAdd = (game["track"][game["trackCurrent"]].bestCompare - thisEndTime)/1.5;
		if(thisAdd < 5) thisAdd = 5;
		
		game["track"][game["trackCurrent"]].bestCompare -= thisAdd;
		// console.log("SUBTRACTED " + thisAdd + " from bestCompare to " + game["track"][game["trackCurrent"]].bestCompare + " to make it harder");
		

		
	}
	else if(game["position"] == 2)
	{
		// console.log("UNCHANGED bestCompare: " + game["track"][game["trackCurrent"]].bestCompare);
	}
	else
	{
		thisAdd = (thisEndTime - game["track"][game["trackCurrent"]].bestCompare)/1.5;
		if(thisAdd < 5) thisAdd = 5;
		
		game["track"][game["trackCurrent"]].bestCompare += thisAdd;
		// console.log("ADDED " + thisAdd + " to bestCompare to " + game["track"][game["trackCurrent"]].bestCompare + " to make it easier");
	}

	// *** Set position badges straight in lower left corner	
	for(i = 1; i <= 5; i++)
	{
		if(typeof game["opponent"][i] !== "undefined")
		{
			tempDest = (game["opponent"][i].position-1)*50;
			game["opponent"][i].positionY += (tempDest-game["opponent"][i].positionY)*1;		
		}
	}

	tempDest = (game["position"]-1)*50;
	game["positionY"] += (tempDest-game["positionY"])*1;
				
	/*
	if(thisEndTime < game["track"][game["trackCurrent"]].bestCompare)
	{
		game["track"][game["trackCurrent"]].bestCompare -= (game["track"][game["trackCurrent"]].bestCompare - thisEndTime)/2;
		console.log("SUBTRACTED from bestCompare to " + game["track"][game["trackCurrent"]].bestCompare);
	}
	else if(thisEndTime > game["track"][game["trackCurrent"]].bestCompare)
	{
		game["track"][game["trackCurrent"]].bestCompare += (thisEndTime - game["track"][game["trackCurrent"]].bestCompare)/2;
		console.log("ADDED to bestCompare to " + game["track"][game["trackCurrent"]].bestCompare);
	}
	*/
	
	// game["track"][game["trackCurrent"]].bestCompare += (game["track"][game["trackCurrent"]].best - game["track"][game["trackCurrent"]].bestCompare)/4;
	
	console.log("bestCompare: " + game["track"][game["trackCurrent"]].bestCompare);

	
	if(thisEndTime < game["track"][game["trackCurrent"]].best || game["track"][game["trackCurrent"]].best == 0)
	{
		game["track"][game["trackCurrent"]].best = thisEndTime;		
	}
	
	game["raceEndedTime"] = thisEndTime;
	
	
}

function showSelectScreen()
{
	console.log("--- showSelectScreen ---");
	
	stopSound(game["music"]);
	game["music"] = playSound("music_1", true);
	
	game["status"] = "SELECT";
	game["count"] = 0;

	if(game["selectScreenFirstTime"])
	{
		game["count"] = 50;
		game["selectScreenFirstTime"] = false;
	}
}


// *** Click in game
function click(thisX, thisY, scale)
{
	gameEngine["userInteractionOccured"] = true;
	
	if(!game["dragging"])
	{
		if(typeof scale === "undefined") scale = true;
		if(scale) { thisX = scaleX(thisX); thisY = scaleY(thisY); }
			
		
		// logGamePlay("click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));

		if(hitSpot(thisX, thisY, "CLOSE_ICON")) { if(confirm('Wil je zeker dit spel wil verlaten?') == true) { history.go(-1); }}
		else if(!gameEngine["globalFullscreenDisabled"] && hitSpot(thisX, thisY, "FULLSCREEN_ICON")) toggleFullScreen();
		else if(!gameEngine["globalAudioDisabled"] && hitSpot(thisX, thisY, "SOUND_ICON")) switchSound();
		//else if(hitSpot(thisX, thisY, "KEYBOARD_ICON") && game["status"] != "PLAYBUTTON") { if(keyboard["status"] == "hidden") showKeyboard("", true); else hideKeyboard(true); }		
		// else if(hitSpot(thisX, thisY, "MAIN_MENU_ICON") && game["status"] != "PLAYBUTTON" && klas_wachtwoord == "") { if(confirm("Wil je terugkeren naar het selectie menu?")) { game["status"] = "PLAYBUTTON"; stopSound(game["music"]); /*delete o[game["sentenceGlitterBox"]];*/ }}
		else if(keyboard["status"] == "show" && thisY > keyboard["yDest"]) clickKeyboard(thisX, thisY);		
		else if(game["status"] == "PLAYBUTTON")
		{
			// *** wl
			if(!game["gamePreloaded"])
			{
				game["gamePreloaded"] = true;
				showPreloader();
			}
			else
			{
				startGame();
				if(game["gamePreloaded"]) playSound("start_game");
			}
		}
		else if(game["status"] == "INTRO")
		{
			if(hitTest(thisX, thisY, "INTRO_IOS_BUTTON", "button") && gameEngine["playButtonIntroMessage"]) showIntroProceed();
			else if(hitTest(thisX, thisY, "INTRO_PLAY_BUTTON", "button")) startGame();
			else if(hitTest(thisX, thisY, "INTRO_HIGHSCORE_BUTTON", "button")) endGame();
		}		
		else if(game["status"] == "QUESTION")
		{
			if(game["statusAni"] == "EXPLANATION")
			{
				if(hitTest(thisX, thisY, "EXPLANATION_BUTTON", "button")) { playSound("start_game"); nextQuestion(); }
			}		
			else if(game["statusAni"] == "RESULT")
			{
				if(hitTest(thisX, thisY, "RESULT_BUTTON", "button")) showScore();
			}
			else if(game["statusAni"] == "SCORE")
			{
				if(hitTest(thisX, thisY, "SCORE_BUTTON", "button")) { playSound("start_game"); highscoreView(); } //  wlBackToIntro();
			}
			else
			{
				// *** wl
				wlClickQuestion(thisX, thisY);
			}
		}
		else if(game["status"] == "RANKING")
		{
			if(hitSpot(thisX, thisY, "SELECT_BUTTON_RACE")) { showSelectScreen(); }
		}		
		else if(game["status"] == "SELECT")
		{
			if(hitSpot(thisX, thisY, "SELECT_BUTTON_AVATAR_LEFT")) { playSound("mouse_click"); game["avatar"]--; if(game["avatar"] <= 0) game["avatar"] = 56; setRaceCookie(); }
			if(hitSpot(thisX, thisY, "SELECT_BUTTON_AVATAR_RIGHT")) { playSound("mouse_click"); game["avatar"]++; if(game["avatar"] > 56) game["avatar"] = 1; setRaceCookie(); }
			if(hitSpot(thisX, thisY, "SELECT_BUTTON_AVATAR_NAME")) { playSound("mouse_click"); game["avatarName"] = prompt("Wat is je race naam?", game["avatarName"]); 
				if(game["avatarName"] == null || game["avatarName"] == "") game["avatarName"] = "Speler"; 
				else { 
					if(hasCurseword(game["avatarName"])) { game["avatarName"] = "Speler"; alert("Naam helaas niet toegestaan."); } 
					else if((game["avatarName"]).length>12) { game["avatarName"] = "Speler"; alert("Gebruik maximaal 12 letters."); } else { playSound("mouse_click_2"); setRaceCookie(); } 
					} 
			}

			if(hitSpot(thisX, thisY, "SELECT_BUTTON_BOAT_1")) selectBoat(1);
			if(hitSpot(thisX, thisY, "SELECT_BUTTON_BOAT_2")) selectBoat(2);
			if(hitSpot(thisX, thisY, "SELECT_BUTTON_BOAT_3")) selectBoat(3);
			if(hitSpot(thisX, thisY, "SELECT_BUTTON_BOAT_4")) selectBoat(4);
			
			if(hitSpot(thisX, thisY, "SELECT_UPGRADE_1")) upgradeBoat(1);
			if(hitSpot(thisX, thisY, "SELECT_UPGRADE_2")) upgradeBoat(2);
			if(hitSpot(thisX, thisY, "SELECT_UPGRADE_3")) upgradeBoat(3);
			if(hitSpot(thisX, thisY, "SELECT_UPGRADE_4")) upgradeBoat(4);
			if(hitSpot(thisX, thisY, "SELECT_UPGRADE_5")) upgradeBoat(5);

			if(hitSpot(thisX, thisY, "SELECT_BUTTON_RACE"))
			{
				thisPossible = false;
					
				for(key in wl)
				{
					if(!wl[key].done) thisPossible = true;
				}	
				
				if(1==1 || thisPossible) // *********************************
				{		
					playSound("coins"); playSound("success"); startRace();
				}
			}
			
		}
		else if(game["status"] == "")
		{
			if(hitSpot(thisX, thisY, "BUTTON_END_RACE"))
			{
				if(confirm("Wil je de race stoppen?"))
				{
					game["endedRaceManually"] = true; showSelectScreen();
					// endRace();
				}
			}
			
			// shoot();	

			/*
			addLevelDecoration(1, 180, -350, -45);
			
			addLevelObject(1, -400, -500);
			addLevelObject(2, 180, -280);
			addLevelObject(2, 180, -480);
			addCheckpoint(180, -380);
			*/			
			
			if(game["levelcreator"])
			{
				// console.log("click: " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)));
				
				if(game["levelcreatorItem"] == 1) { game["levelcreatorLastItem"] = addLevelObject(1, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 		console.log("addLevelObject(1, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
								
				if(game["levelcreatorItem"] == 2) { game["levelcreatorLastItem"] = addCheckpoint(Math.round(rcX(thisX)), Math.round(rcY(thisY)));		console.log("addCheckpoint(" + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + ", 0); "); }

				if(game["levelcreatorItem"] == 3)  { game["levelcreatorLastItem"] = addLevelObject(3, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 		console.log("addLevelObject(3, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 4)  { game["levelcreatorLastItem"] = addLevelObject(4, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 		console.log("addLevelObject(4, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 5)  { game["levelcreatorLastItem"] = addLevelObject(5, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 		console.log("addLevelObject(5, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 6)  { game["levelcreatorLastItem"] = addLevelObject(6, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 		console.log("addLevelObject(6, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 7)  { game["levelcreatorLastItem"] = addLevelObject(7, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 		console.log("addLevelObject(7, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 8)  { game["levelcreatorLastItem"] = addLevelObject(8, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 		console.log("addLevelObject(8, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 9)  { game["levelcreatorLastItem"] = addLevelObject(9, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 		console.log("addLevelObject(9, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 10) { game["levelcreatorLastItem"] = addLevelObject(10, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(10, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 11) { game["levelcreatorLastItem"] = addLevelObject(11, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(11, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 12) { game["levelcreatorLastItem"] = addLevelObject(12, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(12, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }

				if(game["levelcreatorItem"] == 13) { game["levelcreatorLastItem"] = addLevelObject(13, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(13, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 14) { game["levelcreatorLastItem"] = addLevelObject(14, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(14, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 15) { game["levelcreatorLastItem"] = addLevelObject(15, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(15, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 16) { game["levelcreatorLastItem"] = addLevelObject(16, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(16, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 17) { game["levelcreatorLastItem"] = addLevelObject(17, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(17, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 18) { game["levelcreatorLastItem"] = addLevelObject(18, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(18, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 19) { game["levelcreatorLastItem"] = addLevelObject(19, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(19, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }
				if(game["levelcreatorItem"] == 20) { game["levelcreatorLastItem"] = addLevelObject(20, Math.round(rcX(thisX)), Math.round(rcY(thisY))); 	console.log("addLevelObject(20, " + Math.round(rcX(thisX)) + ", " + Math.round(rcY(thisY)) + "); "); }

			}							
		}
		else if(game["status"] == "HIGHSCORES")
		{
			if(hitTest(thisX, thisY, "HIGHSCORE_SUBMIT", "button")) { if(game["score"] > 0) highscoreOpen(); }
			else if(hitTest(thisX, thisY, "HIGHSCORE_PLAY", "button")) { game["playerLevelCurr"] = 1; wlBackToIntro(); /* document.location = document.location; */ }
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_TOP")) highscoreScroll("TOP");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_UP")) highscoreScroll("UP");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_USER")) highscoreScroll("USER");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_DOWN")) highscoreScroll("DOWN");
			else if(hitSpot(thisX, thisY, "HIGHSCORE_SCROLL_BOTTOM")) highscoreScroll("BOTTOM");
		}		
	}
				
	endDrag();			
}

// *** Dragging starts
function startDragCustom(thisX, thisY)
{
	console.log("startDragCustom");
	
	if(!isNaN(thisX) && !isNaN(thisY) && thisX != 0 && thisY != 0)
	{
		thisX = scaleX(thisX); thisY = scaleY(thisY);	
		translateTouch(thisX, thisY);
	}
}

function endDragCustom()
{
	game["touchAction"] = "";
}

function translateTouch(thisX, thisY)
{
	game["driverKeys"] = false;
	
	if(thisX < 320 && thisY > 380 && thisY < 640) game["touchAction"] = "LEFT";
	if(thisX > 1400-320 && thisY > 380 && thisY < 640) game["touchAction"] = "RIGHT";
	if(thisX >= 10 && thisX <= 310 && thisY >= 90 && thisY <= 90+90) game["touchSpeed"] = 1;
	if(thisX >= 10 && thisX <= 310 && thisY >= 190 && thisY <= 190+90) game["touchSpeed"] = 0;
	if(thisX >= 10 && thisX <= 310 && thisY >= 290 && thisY <= 290+90) game["touchSpeed"] = -1;
}

function getMousePosCustom(canvas, evt)
{
	var rect = canvas.getBoundingClientRect();

	if(evt.type == 'touchstart' || evt.type == 'touchmove' || evt.type == 'touchend' || evt.type == 'touchcancel')
	{
        	var touch = evt.touches[0] || evt.changedTouches[0];
		game["mouseX"] = touch.pageX - rect.left;
		game["mouseY"] = touch.pageY - rect.top - document.body.scrollTop;
        }
        else
        {
		game["mouseX"] = evt.clientX - rect.left;
		game["mouseY"] = evt.clientY - rect.top - document.body.scrollTop;
	}
	
	game["mouseX"] = scaleX(game["mouseX"]); game["mouseY"] = scaleY(game["mouseY"]);
	
	translateTouch(game["mouseX"], game["mouseY"]);
}


function drag(thisX, thisY)
{
	console.log("drag: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
	// wlDrag(thisX, thisY);	
}

// *** Dragging ends
function endDrag()
{
	gameEngine["userInteractionOccured"] = true;
	
	thisX = game["mouseX"];
	thisY = game["mouseY"];
		
	if(game["dragging"])
	{
		// *** At the end of a drag invoce a click (when playing an intended click can accidentally easily become a short drag)
		console.log("endDrag results in click: " + Math.ceil(thisX) + ", " + Math.ceil(thisY));
		game["dragging"] = false;
		click(thisX, thisY, false);
	}

	game["draggingX"] = 0;
	game["draggingY"] = 0;
	game["dragging"] = false;
	game["draggingCheck"] = false;
}


// *** (custom) Keyboard key pressed
function keyboardKeyPressed(thisKey)
{
	// delete o[game["sentenceGlitterBox"]];
	
	if(thisKey == "<<")
	{
		game["wordTyped"] = game["wordTyped"].substr(0, game["wordTyped"].length-1);
	}
	else if(thisKey == "SHIFT")
	{
		if(keyboard.shift) keyboard.shift = false; else keyboard.shift = true;
	}
	else if(thisKey == "+")
	{
		console.log("+");
		
	}		
	else if(thisKey == "OK")
	{
		if(game["status"] == "" && game["statusAni"] == "")
		{
			if(game["wordTyped"] == "")
			{
				//if(keyboard["status"] == "hidden" || keyboard["status"] == "hide") showKeyboard(); else hideKeyboard();
			}
			else
			{
				console.log("keyboardKeyPressed checkAnswer");
				//checkAnswer(game["wordTyped"]);
			}			
		}
		else hideKeyboard();
	}		
	else
	{
		game["wordTyped"] += thisKey;
	}
	
	console.log("keyboardKeyPressed \"" + thisKey + "\": " + game["wordTyped"]);
	
}

function keyPress(e)
{
	e = e || window.event;

	// console.log("keyPress " + e.keyCode);
	
	if(game["statusAni"] == "RESULT" && e.keyCode == '13') showScore();
	else if(game["statusAni"] == "SCORE" && e.keyCode == '13') { playSound("start_game"); wlNextRound(); }
	else if(game["statusAni"] == "EXPLANATION" && e.keyCode == '13') { playSound("start_game"); nextQuestion(); }
	else if(game["status"] == "" && e.keyCode == '32') { shoot(); }
	//else if(game["status"] == "QUESTION" && e.keyCode == '32') { game["status"] = ""; }
	else if(game["status"] == "" && e.keyCode == '107' && game["levelcreator"]) { game["levelcreatorItem"]++; }
	else if(game["status"] == "" && e.keyCode == '109' && game["levelcreator"]) { game["levelcreatorItem"]--; }
	else if(game["status"] == "" && e.keyCode == '46' && game["levelcreator"] && game["levelcreatorLastItem"] != 0) { delete o[game["levelcreatorLastItem"]]; game["levelcreatorLastItem"] = 0; }
	// *************************************** LEVELCREATOR: else if(game["status"] == "" && e.keyCode == '88') { game["levelcreator"] = !game["levelcreator"]; }
	
	/*
	if(keyboard["status"] != "hidden")
	{
		pressKeyboard(e.key);
	}
	else
	{		
		if 	(e.keyCode == '38' || e.keyCode == '87') 	{ console.log("keyPress UP"); }
		else if (e.keyCode == '40' || e.keyCode == '83') 	{ console.log("keyPress DOWN"); }
		else if (e.keyCode == '37' || e.keyCode == '65') 	{ console.log("keyPress LEFT"); }
		else if (e.keyCode == '39' || e.keyCode == '68') 	{ console.log("keyPress RIGHT"); }
		else if (e.keyCode == '13') 				{ console.log("keyPress ENTER"); }
	}
	*/
}

function keyPressed(keyCode)
{
	
	r = false;
	
	if(keyCode == "RIGHT")		{ if(pressedKeys[39] || pressedKeys[68] || pressedKeys[102]) r = true; }
	else if(keyCode == "LEFT")	{ if(pressedKeys[37] || pressedKeys[65] || pressedKeys[100]) r = true; }
	else if(keyCode == "UP")	{ if(pressedKeys[38] || pressedKeys[87] || pressedKeys[104]) r = true; }
	else if(keyCode == "DOWN")	{ if(pressedKeys[40] || pressedKeys[83] || pressedKeys[98]) r = true;}
	else if(keyCode == "SPACE")	{ if(pressedKeys[32]) r = true; }
	else r = pressedKeys[keyCode];
	
	return(r);

}

// *** Answer returns from AJAX request
gProgress = "";

function ajaxReturn(data)
{
	var answer = $.parseJSON(data);
	
	console.log("ajaxReturn: " + answer["a"]);
	console.log(answer);
	
	if(answer["a"] == "highscoreView" && answer["status"] == "OK")
	{
		game["highscoreList"] = answer;
		game["highscoreListScroll"] = parseInt(answer["highscore_list_scroll"]);
		game["highscoreListBusy"] = false;
		
		console.log("highscoreListScroll: " + game["highscoreListScroll"]);
	}
	else if((answer["a"] == "wlAjaxGet" || answer["a"] == "wlAjaxGetTaak") && answer["status"] == "OK")
	{
		wlRetrieveReturn(answer["wl"]);

		if(typeof answer["progress"] !== "undefined")
		{
			gProgress = answer["progress"];
			setTimeout(function(){ wlRetrieveProgress(gProgress); }, 500);
		}
		
		if(typeof answer["wrongWords"] !== "undefined") game["wrongWords"] = answer["wrongWords"];
		//klas_wachtwoord = "";
		wlAjaxReturn(answer["wl"], 0);		
	}
	else if(answer["a"] == "highscoreSubmit" && answer["status"] == "OK")
	{
		highscoreView();
	}
	else if(answer["a"] == "loadBoatraceRecording" && answer["status"] == "OK")
	{
		opponent = answer["opponent"];
		startRaceReturn();
	}	
	else if(answer["a"] == "getTaak" && answer["status"] == "OK")
	{
		console.log("ajaxReturn>getTaak");
		startWLTaakReturn(answer);
	}
	else if(answer["a"] == "wlList" && answer["status"] == "OK")
	{
		wlGetListReturn(answer["wlSelect"]);
	}		
	else if(answer["a"] == "wlListGet" && answer["status"] == "OK")
	{
		wlRetrieveReturn(answer["completeWL"]);
		console.log("noAutoStartMusic: " + game["noAutoStartMusic"]);
		game["status"] = "SELECT";
	} 	
	else if(answer["status"] == "OK")
	{
		console.log("ajaxReturn: " + answer["status"]);	
	}
	else
	{
		console.error("highscoreView ERROR: " + answer["status"]);
		game["highscoreListBusy"] = false;
	}
}



// *** FUNCTIONS

// *** Objects in game
function addO(thisPrototype, thisX, thisY, thisWidth, thisHeight, thisSpecial, thisZ)
{	
	if(typeof thisZ === "undefined") thisZ = "";

	game["keyCount"]++;
	thisKey = game["keyCount"];

	//console.log("addO " + thisKey + ": prototype " + thisPrototype + " at (" + thisX + ", " + thisY + ")");
	
	o[thisKey] = new Object;

	for(keyTempO in oPrototype[thisPrototype]) o[thisKey][keyTempO] = oPrototype[thisPrototype][keyTempO];
	
	o[thisKey].prototype = thisPrototype;
	o[thisKey].x = thisX;
	o[thisKey].y = thisY;
	o[thisKey].z = thisZ;

	if(typeof thisWidth !== "undefined") o[thisKey].width = thisWidth;
	if(typeof thisHeight !== "undefined") o[thisKey].height = thisHeight;
	if(typeof thisSpecial !== "undefined") o[thisKey].special = thisSpecial;
	
	if(typeof o[thisKey].width === "undefined") o[thisKey].width = false;
	if(typeof o[thisKey].height === "undefined") o[thisKey].height = false;
	if(typeof o[thisKey].special === "undefined") o[thisKey].special = false;
	
	//if(o[thisKey].category == "particles" && thisSpecial == "OPPOSITE") o[thisKey].position = "bottom"; 
		
	/*
	o[thisKey].xSpeed = oPrototype[thisPrototype].xSpeed;
	o[thisKey].ySpeed = oPrototype[thisPrototype].ySpeed;

	o[thisKey].r = oPrototype[thisPrototype].r;
	o[thisKey].rSpeed = oPrototype[thisPrototype].rSpeed;
		
	o[thisKey].manifest = oPrototype[thisPrototype].manifest;
	*/
	
	return(thisKey);
}

// *** Particles
function addParticle(thisPrototype, thisX, thisY, thisZ)
{
	if(typeof thisZ === "undefined") thisZ = "";
	
	if(gameEngine["isTabletSmartphone"] && Math.random() > 0.5)
	{
		// *** Save CPU
	}
	else
	{
		game["keyCount"]++;
		thisKey = game["keyCount"];
		
		particle[thisKey] = new Object;
		
		particle[thisKey].prototype = thisPrototype;
		particle[thisKey].x = thisX;
		particle[thisKey].y = thisY;
		particle[thisKey].z = thisZ;
			
		particle[thisKey].xSpeed = particlePrototype[thisPrototype].xSpeed + particlePrototype[thisPrototype].xSpeedVariation * Math.random();
		particle[thisKey].xSpeedChange = particlePrototype[thisPrototype].xSpeedChange + particlePrototype[thisPrototype].xSpeedChangeVariation * Math.random();
		
		particle[thisKey].ySpeed = particlePrototype[thisPrototype].ySpeed + particlePrototype[thisPrototype].ySpeedVariation * Math.random();
		particle[thisKey].ySpeedChange = particlePrototype[thisPrototype].ySpeedChange + particlePrototype[thisPrototype].ySpeedChangeVariation * Math.random();
		
		particle[thisKey].size = particlePrototype[thisPrototype].size + particlePrototype[thisPrototype].sizeVariation * Math.random();
		particle[thisKey].sizeChange = particlePrototype[thisPrototype].sizeChange + particlePrototype[thisPrototype].sizeChangeVariation * Math.random();
		
		particle[thisKey].alpha = particlePrototype[thisPrototype].alpha + particlePrototype[thisPrototype].alphaVariation * Math.random();
		particle[thisKey].alphaChange = particlePrototype[thisPrototype].alphaChange + particlePrototype[thisPrototype].alphaChangeVariation * Math.random();
		
		tempParticleManifest = particlePrototype[thisPrototype].manifest;
		if(particlePrototype[thisPrototype].manifestVariation > 0 && Math.random() < particlePrototype[thisPrototype].manifestVariation) tempParticleManifest = particlePrototype[thisPrototype].manifestVariationManifest;
		particle[thisKey].manifest = tempParticleManifest;
	}
}

function renderParticles(thisZ)
{

	for(key in particle)
	{
		if(particle[key].z == thisZ)
		{
			
			context.globalAlpha = particle[key].alpha;
			tempSize = particle[key].size;
			
			// *** Flash
			if(particlePrototype[particle[key].prototype].flashChance > 0 && Math.random() < particlePrototype[particle[key].prototype].flashChance)
			{
				context.globalAlpha = 1; 
				tempSize *= particlePrototype[particle[key].prototype].flashSizeMultiplier;
			}
			
			drawImage(manifest[particle[key].manifest], particle[key].x, particle[key].y, tempSize, tempSize, false, false, false, true);
			
			if(particlePrototype[particle[key].prototype].name == "Firework")
			{
				if(particle[key].ySpeed >= 0 & Math.random() > 0.9)
				{
					tempAmount = 100;
					tempSize = 50;
					if(Math.random() > 0.99) { tempAmount = 1000; tempSize = 150; }
					
					for(ii = 1; ii <= tempAmount; ii++)
					{
						addParticle(20, particle[key].x + Math.sin(toRadians(ii*3.6))*tempSize, particle[key].y + Math.cos(toRadians(ii*3.6))*tempSize);   
					}
				
					delete particle[key];
				}
			}
		}			      		
	}
	
	context.globalAlpha = 1; 
}	

function renderObjects(thisZ)
{
	// *** Objects
	for(key in o)
	{
		if(o[key].z == thisZ)
		{
			context.globalAlpha = 1;
			
			if(o[key].category == "sunbeam")
			{					
				for(i = 1; i <= 10; i++)
				{	
					if(!o[key].initialize)
					{
						context.globalAlpha = Math.sin(o[key][i].alpha)/10;
						drawImage(manifest["sunbeam"], o[key].x, o[key].y, manifest["sunbeam"].width * o[key].radius, manifest["sunbeam"].height * o[key].radius, o[key][i].r, false, false, true);
					}
				}				
			}
			else if(o[key].category == "texts")
			{
				o[key].y--;
				o[key].count++;
				
				if(o[key].count > 50)
				{
					context.globalAlpha = 1 - (o[key].count-50)/50;
				}
				
				drawText(o[key].text, "O_TEXT", o[key].x, o[key].y);
				
				if(o[key].count >= 100) delete o[key];
					
			}			
			else if(o[key].category == "texts_big")
			{
				//o[key].y--;
				o[key].count++;
				o[key].sizeCount += 0.2;
				
				//console.log(Math.sin(o[key].sizeCount)+1);
				//console.log(Math.round(76 + (Math.sin(o[key].sizeCount)+1)*100));
				
				spot["O_TEXT_BIG"].font = "bold " + Math.round(56 + (Math.sin(o[key].sizeCount)+1)*20) + "px Arial";
				
				if(o[key].count > 75)
				{
					context.globalAlpha = 1 - (o[key].count-75)/25;
				}
				
				drawText(o[key].text, "O_TEXT_BIG", o[key].x, o[key].y);
				
				if(o[key].count >= 100) delete o[key];
					
			}			
			else if(o[key].category == "level_objects")
			{
				tempExtraX = 0;
				tempExtraY = 0;
				
				if(typeof o[key].wobble !== "undefined")
				{
					tempExtraX = game["pulsate"]*o[key].wobble;
					tempExtraY = game["pulsateCos"]*o[key].wobble;
					
					o[key].wobble *= 0.95;
				}

				if(typeof o[key].unhittable !== "undefined" && o[key].unhittable > 0)     
				{
					o[key].unhittable--;
					context.globalAlpha = 0.25 + game["pulsate"]/2;
				}
				
		
				 if(o[key].manifest != "" && cX(o[key].x) > -400 && cX(o[key].x) < 1800 && cY(o[key].y) > -400 && cY(o[key].y) < 1100)
				 {
				 	tEY = 0;
				 	tEX = 0;

					if(o[key].parallax)
					{
					 	tY = cY(o[key].y) + tempExtraY;
					 	tEY = (tY - 350) * 0.15;
					 	
					 	tX = cX(o[key].x) + tempExtraX;
					 	tEX = (tX - 700) * 0.15;
				 	}
				 	
				 	drawImage(manifest[o[key].manifest], cX(o[key].x) + tempExtraX + tEX, cY(o[key].y) + tempExtraY + tEY, true, true, true, false, false, true);
				 	
				 }
				
					
				context.globalAlpha = 1;
				
				if(o[key].prototype == "LEVEL_OBJECT_1" && o[key].letter != "") //  && o[key].letter != ""
				{					
					drawImage(manifest["checkpoint_word"], cX(o[key].x), cY(o[key].y), true, true, true, false, false, true);

					tempHit = false;
					
					for(k = 1; k <= 6; k++)
					{
						tempR = toRadians(game["playerR"] + game["boat"][game["selectedBoat"]]["collisionPoint" + k].angle);				
						
						tempX = 700 - Math.sin(tempR)*game["boat"][game["selectedBoat"]]["collisionPoint" + k].distance;
						tempY = 350 - Math.cos(tempR)*game["boat"][game["selectedBoat"]]["collisionPoint" + k].distance;
						
						// context.beginPath(); context.arc(tempX, tempY, 10, 0, 2 * Math.PI); context.stroke();
						
						if(pythagoras(cX(o[key].x) - tempX, cY(o[key].y) - tempY) < 45) tempHit = true;
						
						// context.beginPath(); context.arc(cX(o[key].x), cY(o[key].y), 15, 0, 2 * Math.PI); context.stroke();
						
					}					
					
					if(tempHit && o[key].letterCount <= 0)
					{
						game["playerWordSpelled"] += o[key].letter;
						
						o[key].letterCount = 100;
						
						if(game["playerWordSpelled"] != game["playerWord"].substr(0, game["playerWordSpelled"].length))
						{
							playSound("mouse_error");
							pickWord();
							
						}
						else if(game["playerWordSpelled"] == game["playerWord"])
						{
							playSound("correct");
							playSound("doppler");
							
							game["playerStartBoost"] += 150;
							pickWord();
						}
						else
						{
							playSound("mouse_succes");
						}
						
					}
					
					if(o[key].letterCount > 0) o[key].letterCount--;
				}
				
				// *** Draw collision area's
				if(game["levelcreator"])
				{
					if(typeof o[key] !== "undefined")
					{
						for(i = 1; i <= 10; i++)
						{
							if(typeof o[key]["collisionArea" + i] !== "undefined")
							{
								if(o[key]["collisionArea" + i].size != 0) 
								{
									context.beginPath();
									context.arc(cX(o[key].x + o[key]["collisionArea" + i].x), cY(o[key].y + o[key]["collisionArea" + i].y), o[key]["collisionArea" + i].size, 0, 2 * Math.PI);
									context.stroke();
								}
							}
						}
						
						// console.log(o[key]);
						
						if(o[key].prototype == "LEVEL_OBJECT_1" & Math.random() > 0.5) addParticle(9, cX(o[key].x), cY(o[key].y));
					}
				}
				
				// drawText("(" + Math.round(o[key].x) + ", " + Math.round(o[key].y) + ")", "TEXT_SMALL_LEFT", cX(o[key].x) + 20, cY(o[key].y) + 20);
				
			}
			else if(o[key].category == "level_decorations")
			{
				o[key].aniFrameCount++;
				
				if(o[key].aniFrameCount >= 2)
				{
					o[key].aniFrameCount = 0;
					o[key].aniFrame++;
					if(o[key].aniFrame > o[key].aniFrameMax) o[key].aniFrame = 1;
				}
				
				context.globalAlpha = o[key].alpha;
				drawImage(manifest[o[key].manifest + "" + o[key].aniFrame], cX(o[key].x), cY(o[key].y), true, true, o[key].r, false, false, true);
				context.globalAlpha = 1;
			}
			else if(o[key].category == "checkpoints")
			{
				if(game["levelcreator"]) drawImage(manifest[o[key].manifest], cX(o[key].x), cY(o[key].y), true, true, true, false, false, true);
				
				if(o[key].sequence == game["checkpoint"] && !game["finished"])
				{
					context.globalAlpha = 0.5 + game["pulsate"]/2;
					drawImage(manifest[o[key].manifest], cX(o[key].x), cY(o[key].y), true, true, -game["countCheckpoint"], false, false, true);
					context.globalAlpha = 1;
					
					// *** Check if player reaches checkpoint
					if(pythagoras(700-cX(o[key].x), 350-cY(o[key].y)) < 225)
					{
						playSound("ting");
						
						game["checkpoint"]++;
						game["raceProgress"]++;
					
						// if(game["checkpoint"] == 2) endRace(); 
						
						// endRace(); // *********************************
						 
						if(game["checkpoint"] > game["checkpointCount"])
						{
							game["lap"]++;
							console.log("Lap " + game["lap"]);
							game["checkpoint"] = 1;	
							
							if(game["lap"] == 2) { playSound("voice_final_lap");   } //  endRace(); *********************************
							if(game["lap"] == 3) { playSound("voice_awesome"); endRace(); }
							if(game["lap"] == 4) { playSound("voice_awesome"); endRace(); }
						}

						if(Math.round(game["raceProgress"]) == game["checkpointCount"]*3 && !game["finished"])
						{
							// *** Finished!
							game["finished"] = true;
							
							tempCount = 0;
							
							for(j = 1; j <= 5; j++)
							{
								if(typeof game["opponent"][j] !== "undefined" && game["opponent"][j].finished) tempCount++;
							}
														
							game["raceProgress"] = 100010 - tempCount;
							
							console.log("Player finished! " + game["raceProgress"]);
						}						
					}					
				}
				
				// *** Check if opponent has reached checkpoint
				for(i = 1; i <= 5; i++)
				{
					if(typeof game["opponent"][i] !== "undefined" && o[key].sequence == game["opponent"][i].checkpointProgress && !game["opponent"][i].finished)
					{						
						if(pythagoras(game["opponent"][i].x-o[key].x, game["opponent"][i].y-o[key].y) < 225)
						{							
							game["opponent"][i].checkpointProgress++;
							game["opponent"][i].raceProgress++;

							if(game["opponent"][i].checkpointProgress > game["checkpointCount"]) game["opponent"][i].checkpointProgress = 1;
							
							if(Math.round(game["opponent"][i].raceProgress) == game["checkpointCount"]*3 && !game["opponent"][i].finished)
							{
								// *** Finished!
								game["opponent"][i].finished = true;
								
								tempCount = 0;
								
								for(j = 1; j <= 5; j++)
								{
									if(typeof game["opponent"][j] !== "undefined" && j != i && game["opponent"][j].finished) tempCount++;
								}
								
								if(game["finished"]) tempCount++;
								
								game["opponent"][i].raceProgress = 100010 - tempCount;
								
								console.log("Oponent " + i + " finished: " + game["opponent"][i].raceProgress);
							}
						}
					}
				}
				
			}						
			else
			{	
				proto = oPrototype[o[key].prototype];
				
				if(typeof o[key].manifest !== "undefined" && o[key].manifest != "")
				{			
					if(proto.hasShadow) drawImage(manifest[o[key].manifest + "_shadow"], o[key].x + 5, o[key].y + 5, true, true, false, false, false, true);
					drawImage(manifest[o[key].manifest], o[key].x, o[key].y, true, true, o[key].r, false, false, true);
				}
			}
		}
	}
	
	context.globalAlpha = 1; 
}
	
		
function applyShadow()
{
	context.shadowColor = "rgba(0, 0, 0, 1)";
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 1;
	context.shadowBlur = 4;
}


function addGlitterbox(thisX, thisY, thisWidth, thisHeight)
{
	thisKey = addO("GLITTERBOX", thisX, thisY, thisWidth, thisHeight);
	return(thisKey);
}


function addGlittercircle(thisX, thisY, thisR)
{
	thisKey = addO("GLITTERCIRCLE", thisX, thisY); 
	o[thisKey].r = thisR;
	return(thisKey);
}


function addSunbeam(thisX, thisY, thisRadius, thisZ)
{
	thisKey = addO("SUNBEAM", thisX, thisY); 
	
	if(typeof thisRadius === "undefined") thisRadius = 1;
	if(typeof thisZ === "undefined") thisZ = "";
	
	o[thisKey].radius = thisRadius;
	o[thisKey].z = thisZ;
	
	return(thisKey);
}

function isOdd(num) { return num % 2;}


function drawCoinValue(thisValue, thisX, thisY, thisSize)
{
	if(typeof thisSize === "undefined") thisSize = "SMALL";
	
	if(thisSize == "SMALL")
	{
		drawImage(manifest["game_ui_coin_small"], thisX - 2, thisY - 15);
		drawText(thisValue, "TEXT_SMALL_LEFT_BOLD", thisX + 20, thisY);
	}
	
	if(thisSize == "MEDIUM")
	{
		drawImage(manifest["game_ui_coin_medium"], thisX - 2, thisY - 24);
		drawText(thisValue, "TEXT_MEDIUM_LEFT_BOLD", thisX + 30, thisY);
	}
	
	if(thisSize == "LARGE")
	{
		drawImage(manifest["game_ui_coin_big"], thisX, thisY - 43);
		drawText(thisValue, "TEXT_LARGE_LEFT_BOLD", thisX + 60, thisY);
	}
	
}

function drawStopwatch(thisTitle, thisTime, thisX, thisY)
{
	drawText(thisTitle, "TEXT_SMALL_LEFT", thisX, thisY - 37);
	
	thisTime = thisTime + "";
	thisTempTime = thisTime.split(".");
	thisSec = thisTempTime[0];
	thisMilli = thisTempTime[1];
	if(typeof thisMilli === "undefined") thisMilli = "00";
	thisMilli = thisMilli + "";
	if(thisMilli.length > 2) thisMilli = thisMilli.substr(0,2);
	if(thisMilli.length == 1) thisMilli += "0";
	
	drawText(stopwatch(thisSec), "TEXT_LARGE_LEFT", thisX, thisY);
	
	context.font = spot["TEXT_LARGE_LEFT"].font;
	thisWidth = context.measureText(stopwatch(thisSec)).width
	drawText(":" + thisMilli, "TEXT_SMALL_LEFT", thisX + thisWidth, thisY);
}


function addText(thisText, thisX, thisY)
{
	thisO = addO("TEXT", thisX, thisY);
	o[thisO].text = thisText;
	o[thisO].z = "GAME";
	
}

function addTextBig(thisText, thisX, thisY)
{
	playSound("notification");
	
	thisO = addO("TEXT_BIG", thisX, thisY);
	o[thisO].text = thisText;
	o[thisO].z = "GAME";
}


function drawLargeBoat(thisBoat, thisX, thisY, thisR, thisSize)
{
	context.globalAlpha = 0.4;
	drawImage(manifest["boat_" + thisBoat + "_large_shadow"], thisX + 30*thisSize, thisY + 30*thisSize, 280*thisSize, 550*thisSize, thisR, false, false, true);

	context.globalAlpha = 1;
	drawImage(manifest["boat_" + thisBoat + "_large"], thisX, thisY, 280*thisSize, 550*thisSize, thisR, false, false, true);
	
	for(k = 1; k <= 5; k++)
	{
		// console.log(game["boat"][thisBoat]["upgrade" + k].upgradesDone);
		
		if(game["boat"][thisBoat]["upgrade" + k].upgradesDone >= 5) drawImage(manifest["boat_" + thisBoat + "_large_upgrade_" + k], thisX, thisY, 280*thisSize, 550*thisSize, thisR, false, false, true);
	}
}

function showScore()
{
	game["statusAni"] = "SCORE";
	playSound("start_game");
	
	tempCorrect = 0;
	tempTotal = 0;
	
	for(i = 1; i <= game["answer"][game["round"]].questions; i++)
	{
		tempTotal++;
		if(game["answer"][game["round"]][i].correct == 1) tempCorrect++;
	}
	
	tempCorrect = tempCorrect+((tempTotal-tempCorrect)/3)
	console.log("Correct:" + tempCorrect+"FDSFSDFSFD"+(tempTotal-tempCorrect)/2);
	game["answer"][game["round"]].score = Math.round((tempCorrect / tempTotal)*100)/10;
	
	if(game["answer"][game["round"]].score >= 10) playSound("woohoo");
	if(game["answer"][game["round"]].score <= 5) playSound("oops");
}

function renderBackground(thisRenderObjects)
{
	context.globalAlpha = 1;
	context.fillStyle = "#031800";
	context.fillRect(0, 0, game["width"], game["height"]); 	

	drawImage(manifest["level_" + game["trackCurrent"]], game["bgOceanX"] - 1400, game["bgOceanY"] - 1750);

	//context.globalAlpha = 0.25;
	//drawImage(manifest["bg_ocean_glare"], 0, -100);

	context.globalAlpha = 1;
}

function renderForeground()
{


}

function pythagoras(thisW, thisH)
{
	return(Math.round(Math.sqrt(Math.pow(thisW, 2) + Math.pow(thisH, 2))));
}

function selectBoat(thisBoat)
{
	if(thisBoat == game["selectedBoat"])
	{
	
	}
	else if(game["boat"][thisBoat].bought)
	{
		playSound("mouse_click_2");
		game["selectedBoat"] = thisBoat;
	}
	else if(game["boat"][thisBoat].price > game["coins"])
	{
		playSound("mouse_error");
	}
	else
	{
		playSound("mouse_click");
		
		if(confirm("Wil je deze auto kopen voor " + game["boat"][thisBoat].price + " coins?"))
		{
			playSound("coins");
			playSound("mouse_succes");
			game["boat"][thisBoat].bought = true;
			game["coins"] -= game["boat"][thisBoat].price;
			game["selectedBoat"] = thisBoat;
		}
	}
	
	setRaceCookie();
}

function upgradeBoat(thisUpgrade)
{
	// console.log("upgradeBoat " + thisUpgrade);
	
	thisUpgradesDone = game["boat"][game["selectedBoat"]]["upgrade" + thisUpgrade].upgradesDone;
	
	if(thisUpgradesDone >= 5)
	{
	
	}
	else if(game["boat"][game["selectedBoat"]]["upgrade" + thisUpgrade][(thisUpgradesDone+1)].cost > game["coins"])
	{
		playSound("mouse_error");
	}
	else
	{
		playSound("mouse_click");
		playSound("mouse_click_2");
		
		game["coins"] -= game["boat"][game["selectedBoat"]]["upgrade" + thisUpgrade][(thisUpgradesDone+1)].cost;
		game["boat"][game["selectedBoat"]]["upgrade" + thisUpgrade].upgradesDone++;
		
		if(game["boat"][game["selectedBoat"]]["upgrade" + thisUpgrade].upgradesDone >= 5)
		{
			playSound("mouse_succes");
			if(thisUpgrade == 1) playSound("voice_awesome");
			if(thisUpgrade == 2) playSound("voice_cool");
			if(thisUpgrade == 3) playSound("voice_nice");
			if(thisUpgrade == 4) playSound("voice_wicked");
			if(thisUpgrade == 5) playSound("voice_you_rock");
			
			for(i = 1; i <= 100; i++) addParticle(14, spot["SELECT_UPGRADE_" + thisUpgrade].x + Math.random()*spot["SELECT_UPGRADE_" + thisUpgrade].width, spot["SELECT_UPGRADE_" + thisUpgrade].y + Math.random()*spot["SELECT_UPGRADE_" + thisUpgrade].height);
		}

		// *** Upgrade reduces bestCompare
		tempReduction = 2;			
		if(thisUpgrade == 3) tempReduction = 10;
		if(thisUpgrade == 4) tempReduction = 0;
		
		for(key in game["track"])
		{
			game["track"][key].bestCompare -= tempReduction;
		}		
	}
	
	setRaceCookie();
}



// *** End game
function endGame()
{
	console.log("endGame");
	
	if(game["highscoreEmail"] != "")
	{
		highscoreSubmit();	
	}
	else
	{
		highscoreView();
	}
}

function checkAnswer(thisAnswer)
{
	thisCorrect = wlCheckAnswer(thisAnswer);
	
	if(thisCorrect == true)
	{
		game["questionsCorrect"]++;
		game["playerBullets"]+=6;
	}
}

function nextQuestion(thisFast)
{
	playSound("bubbling");
	playSound("whoop");
	//playSound("underwater");
	
	if(typeof thisFast === "undefined") thisFast = false;
	
	console.log("nextQuestion: " + game["question"] + " / " + game["wl"] + " done");
	
	if(game["question"] != 0 && klas_wachtwoord != "")
	{
		// if(!thisFast) ajaxUpdate("a=progressTaak&klas_wachtwoord=" + klas_wachtwoord + "&taak=" + taak + "&leerling=" + leerling + "&voortgang=" + (game["wl"]+2) + "&woord=" + wl[game["wl"]].answer + "&poging_1=" + game["answer"][game["round"]][game["question"]].answer + "&poging_2=" + wl[game["wl"]].cat + "");
	} 
		
	game["statusAni"] = "";
	game["sentenceExtraY"] = -250;
	
	if(game["question"] >= game["questions"] && 1==2)
	{
		console.log("Next round (collectable: " + game["collectableFish"][game["collectable"]] + ")");
		if(!thisFast) playSound("whoop");
		if(!thisFast) playSound("bubbling");
		
		
		//delete o[game["sentenceGlitterBox"]];

		thisX = spot["PROGRESS"].x + (game["questions"]-1)*85 + 20;
		thisY = spot["PROGRESS"].y;
		
		//for(i = 1; i <= 25; i++) addParticle(12, thisX + Math.random()*130-65, thisY + Math.random()*130-65);
		//for(i = 1; i <= 25; i++) addParticle(3, thisX + Math.random()*70-35, thisY + Math.random()*70-35);
		
		// addFish(game["collectableFish"][game["collectable"]], Math.random()*1200+100, 400 + Math.random()*200);
		
		game["collectableDestX"] = Math.random()*1200+100;
		game["collectableDestY"] = 400 + Math.random()*200;
		
		
		game["count"] = 0;
		game["statusAni"] = "COLLECTABLE";
		game["collectableX"] = spot["PROGRESS"].x + (game["questions"]-1)*85 + 20;
		game["collectableY"] = spot["PROGRESS"].y;

		game["collectableYjump"] = 0;
		game["collectableYjumpGravity"] = -60+3;
		
		game["collectableXspeed"] = (game["collectableDestX"] - game["collectableX"]) / 20;
		game["collectableYspeed"] = (game["collectableDestY"] - game["collectableY"]) / 20;
		
		/*
		if(thisFast)
		{
			game["collectable"]++;
			if(game["collectable"] > 9) game["collectable"] = 1;
			
			wlNextRound();
		}
		else
		{
			//game["statusAni"] = "COLLECTABLE_WAIT";
			//game["count"] = 0;		
		}
		*/
		console.log("COLLECTABLE_WAIT continue");
		game["statusAni"] = "";
		
		game["collectable"]++;
		if(game["collectable"] > 9) game["collectable"] = 1;
		
		hideKeyboard();
		
		game["statusAni"] = "RESULT";
		game["count"] = 0;
		
		playSound("start_game");

		//stopSound(game["music"]);
		//game["music"] = playSound("music", true);			
	}
	else
	{
		if(game["reshowKeyboard"])
		{
			showKeyboard();
			game["reshowKeyboard"] = false;
		}
		
		game["question"]++;
		game["try"] = 0;
		
		wlGet(true);
	}
}


function cX(thisX)
{
	thisX += 700;
	thisX -= game["playerX"];
	
	return(thisX);
}

function cY(thisY)
{
	thisY += 350;
	thisY -= game["playerY"];
	
	return(thisY);
}

function rcX(thisX)
{
	thisX -= 700;
	thisX += game["playerX"];
	
	return(thisX);
}

function rcY(thisY)
{
	thisY -= 350;
	thisY += game["playerY"];
	
	return(thisY);
}

function isEven(n)
{
	return n % 2 == 0;
}
