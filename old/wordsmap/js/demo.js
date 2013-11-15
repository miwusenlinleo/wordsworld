$("#addWordBtn").click(function(){
	var input = $("<span><input type='text' placeholder='Type a word ...'><i class='icon-trash'></i></span>")
	$("#wordInputs").append(input);
	updateTrashListener();
})

/* Change trash icon to white upon hover
$("i").hover(function(){
	$(this).toggleClass('icon-white');
});
*/
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

function updateTrashListener()
{
	$("i").each(function(){
		$(this).click(function(){
			$(this).parent().remove();
			console.log($(this));
		})	
	})
}

var high = new Array(), 
	 low = new Array(), 
   range = new Array();

initData();


function initData()
{
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
	for(var i=0; i<5000; i++)
		if(words[i][2].toLowerCase() == word.toLowerCase()){
			index = i;
			console.log(index);
			break;
		}
	
	if(index == -1){
		$("#wordsNotFound").find("#words").append(word + "  ");
		return -1;
	}

	createColorBar(word);

	var canvas = document.getElementById("word_" + word.toLowerCase()),
	   context = canvas.getContext("2d");
	
	for(var i=0; i<64; i++){
		//embedding value of this word at such index
		var value = embeddings[index][i];
		var ratio = (value - low[i]) / range[i];
		//console.log(ratio*255);
		context.fillStyle = decToHex(255-255*ratio, 255*ratio, 255*ratio);
		context.fillRect(i*16,0,16,40);
	}
	return 1;
}

function createColorBar(word)
{
	var canvas = document.createElement('canvas');
	var label = $("<h3>").text(word);
	canvas.id = "word_"+word;
	canvas.width = 1024;
	canvas.height = 40;
	canvas.style.border = "1px solid #d3d3d3";

	$("#color_bar").append(label, canvas)
}

/**  Convert Decimal RGB value to Hex  **/
function decToHex(r, g, b)
{
	var rS = (r==0)?'00':r.toString(16).substring(0,2),
		gS = (g==0)?'00':g.toString(16).substring(0,2),
		bS = (b==0)?'00':b.toString(16).substring(0,2);
	return rS+gS+bS;
}