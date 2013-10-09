var high = new Array(), 
	 low = new Array(), 
   range = new Array();

initData();

$('input').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		$("#runBtn").click();
	}
});

$("#runBtn").click(function(){
	$("#color_bar").empty();
	$("#wordsNotFound").find("#words").empty();
	var str = $("input").val();
	var str_array = str.split(',');

	for(var i = 0; i < str_array.length; i++)
	{
	   // Trim the excess whitespace.
	   str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
	   // Add additional code here, such as:
	   paintWord(str_array[i]);
	}
})

$("#luckBtn").click(function(){
	$("#color_bar").empty();
	$("#wordsNotFound").find("#words").empty();
	$("#wordsNotFound").hide();

	for(var i = 0; i < 5; i++){
		var rand = getRandom(4, 4999);
		paintWord(words[rand][2]);
	}
})

function initData()
{
	$("div#wordsNotFound").hide();
	var canvas = document.getElementById("color_scale"),
	   context = canvas.getContext("2d");
	for(var i=0; i<85; i++){
		context.fillStyle = decToHex(255-3*i, 3*i, 3*i);
		context.fillRect(i*3,0,3,40);
	}

	for(var i=0; i<64; i++){
		low.push(Infinity);
		high.push(-Infinity);
	}

	//Go through each dimension
	for(var index=0; index<64; index++){
		for(var i=0; i<5000; i++){
			if(embeddings[i][index]<low[index])
				low[index] = embeddings[i][index];
			if(embeddings[i][index]>high[index])
				high[index] = embeddings[i][index];
		}
		range[index] = high[index] - low[index];
	}
}

/**  1. Add a canvas to the view
	 2. Based on pre-cal data, paint the canvas **/
function paintWord(word)
{
	var index = -1;

	//Search this word in the 5000 words dataset
	 $.ajax({ 
        type: "GET",
        dataType: "json",
        data: {"word": word},
        url: "http://wenbin.us/wordscolor/data/getWord.php",
        success: function(data){        
            if(data == -1){
            	$("div#wordsNotFound").show();
            	$("#wordsNotFound").find("#words").append(word + "  ");
            }
			else{
				createColorBar(word);

				var canvas = document.getElementById("word_" + word),
				   context = canvas.getContext("2d");
				
				for(var i=0; i<64; i++){
					//embedding value of this word at such index
					var value = data[i];
					var ratio = (value - low[i]) / range[i];
					//console.log(ratio*255);
					context.fillStyle = decToHex(255-255*ratio, 255*ratio, 255*ratio);
					context.fillRect(i*14,0,14,40);
				}
			}
        }
    });
}

function createColorBar(word)
{
	var canvas = document.createElement('canvas');
	var label = $("<div class='word_left'>").text(word);
	var canvasDiv = $("<div class='bar_right'>");
	canvas.id = "word_"+word;
	canvas.width = 896;
	canvas.height = 40;
	canvas.style.border = "1px solid #d3d3d3";
	canvasDiv.append(canvas);
	$("#color_bar").append(label, canvasDiv)
}

/**  Convert Decimal RGB value to Hex  **/
function decToHex(r, g, b)
{
	var rS = (r==0)?'00':r.toString(16).substring(0,2),
		gS = (g==0)?'00':g.toString(16).substring(0,2),
		bS = (b==0)?'00':b.toString(16).substring(0,2);
	return rS+gS+bS;
}

// Returns a random number between min and max
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}