
function drawTextarea(tempText, tempSpot, tempX, tempY, tempAlt)
{
	tempText = "" + tempText;
	
	if(typeof tempY === "undefined") tempY = spot[tempSpot].y;

	// *** maxWidth
	if(typeof spot[tempSpot].maxWidth !== "undefined" && spot[tempSpot].maxWidth > 0)
	{
		context.font = spot[tempSpot].font;
		
		//tempText = spot[tempSpot].maxWidth + ":" + tempText;
		
		newTempText = "";
		tempWord = tempText.split(" ");
		tempTextline = "";
		tempTextlinePrev = "";
		
		for(i = 0; i < tempWord.length; i++)
		{
			
			tempTextlinePrev = tempTextline;
			tempTextline += tempWord[i] + " ";

			//console.log("- " + tempTextline + ": " + context.measureText(tempTextline).width);
			
			if(context.measureText(tempTextline).width > spot[tempSpot].maxWidth)
			{
				newTempText += tempTextlinePrev + "\n";				
				tempTextline = tempWord[i] + " ";
			}
		}
		
		newTempText += tempTextline;
		newTempText = newTempText.split(" \n").join("\n");
		
		tempText = newTempText;
	}
		
	tempTextline = tempText.split("\n");
	
	for(ii = 0; ii < tempTextline.length; ii++)
	{
		drawText(tempTextline[ii], tempSpot, tempX, tempY, tempAlt);
		tempY += spot[tempSpot].lineHeight;
	}
}

function drawText(tempText, tempSpot, tempX, tempY, tempAlt)
{
	context.save(); 

	if(typeof tempX === "undefined") tempX = spot[tempSpot].x;
	if(typeof tempY === "undefined") tempY = spot[tempSpot].y;
	if(typeof tempAlt === "undefined") tempAlt = false;
	
	if(typeof spot[tempSpot].font === "undefined") context.font = "Arial 18px";	else context.font = spot[tempSpot].font;
	
	if(typeof spot[tempSpot].textAlign === "undefined")
	{
		context.textAlign = "left";
	}
	else
	{
		if(spot[tempSpot].textAlign == "monocenter")
		{
			if(typeof spot[tempSpot].monocenterPaddingLeft === "undefined" || spot[tempSpot].monocenterStrlen != tempText.length)
			{
				spot[tempSpot].monocenterPaddingLeft = Math.ceil(context.measureText(tempText).width/2);
				spot[tempSpot].monocenterStrlen = tempText.length;
				
				//console.log("drawText monocenter recalculate: " + spot[tempSpot].monocenterPaddingLeft + " / " + spot[tempSpot].monocenterStrlen);
			}
			
			context.textAlign = "left";
			tempX -= spot[tempSpot].monocenterPaddingLeft;
		}
		else
		{
			context.textAlign = spot[tempSpot].textAlign;
		}
	}
	
	if(typeof spot[tempSpot].color === "undefined") context.fillStyle = "#FFFFFF"; 	else context.fillStyle = spot[tempSpot].color;
	if(tempAlt && typeof spot[tempSpot].colorAlt !== "undefined") context.fillStyle = spot[tempSpot].colorAlt;

	if(spot[tempSpot].shadow) applyShadow();
	
	context.fillText(tempText, tempX, tempY);	

	context.restore(); 
	
	return(tempX);
}
