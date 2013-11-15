//global variables
var view_width = 854, view_height = 580, // hard code it for now.
	max_x = 99.21003030377884,
	max_y = 105.16257634433812,
	min_x = -111.71307251618799,
	min_y = -107.96437088667292,
	max_x_tmp = max_x, 
	max_y_tmp = max_y, 
	min_x_tmp = min_x, 
	min_y_tmp = min_y,
	shift_x = 10,
	shift_y = 10;

var zoom_scale = 1, words;

$(document).ready(function() {
	//view_width  = $("#viewport").width() - 20;
	//view_height  = $("#viewport").height() - 20;
	updateWords("init");
	addNavigationBtnListeners();
});

//dynamiclly get words from the backend based on different zoom in/out scale & location
function updateWords(type) {
	if(type == "init") {
		$.get("http://www.wenbin.us/wordsworld/backend/words.php?type=init", function(data) {
			repaint(data);
			words = data;
		}, "json" );
	}
	else if(type == "render") {
		$.get("http://www.wenbin.us/wordsworld/backend/words.php?type=render&max_x=" 
			+ max_x_tmp + "&max_y=" + max_y_tmp + "&min_x=" + min_x_tmp + "&min_y=" + min_y_tmp, function(data) {
			repaint(data);
			words = data;
		}, "json" );
	}
}


/***********************************************************************
 ******************** Helper Functions to Zoom / Move *****************/

function repaint(data) {
	$("#loading").hide();
	$("#map").empty();
	range_x = max_x_tmp - min_x_tmp;
	range_y = max_y_tmp - min_y_tmp;

    for(item in data) {
        var x = view_width * (data[item][1] - min_x_tmp) / range_x;
        var y = view_height * (data[item][2] - min_y_tmp) / range_y;
        
        var star = ".",
            text = data[item][0],
		    word = $("<div class='word'>").text((data.length > 500)?star:text);

        word.attr("style", "margin-left:" + x + "px;margin-top:" + y + "px; position:fixed;");
        if(data.length < 200)
        	word.draggable();
        $("#map").append(word);
    }
}

function rebuildMapScale(type) {
	//$("#loading").show();
	
	if(type == "zoomIn") {
		zoom_scale += 0.2;
		var mid_x = (max_x_tmp + min_x_tmp) / 2;
		var range_x = (max_x - min_x) / zoom_scale;
		min_x_tmp = mid_x - range_x / 2;
		max_x_tmp = mid_x + range_x / 2;

		var mid_y = (max_y_tmp + min_y_tmp) / 2;
		var range_y = (max_y - min_y) / zoom_scale;
		min_y_tmp = mid_y - range_y / 2;
		max_y_tmp = mid_y + range_y / 2;

		shift_x = 10 / zoom_scale;
		shift_y = 10 / zoom_scale;
	}
	else if(type == "left") {
		max_x_tmp -= shift_x;
		min_x_tmp -=shift_x;
	}
	else if(type == "right") {
		max_x_tmp += shift_x;
		min_x_tmp += shift_x;
	}
	else if(type == "up") {
		max_y_tmp -= shift_y;
		min_y_tmp -= shift_y;
	}
	else if(type == "down") {
		max_y_tmp += shift_y;
		min_y_tmp += shift_y;
	}

	updateWords("render");
}

/****  Add listeners to navigation buttons of the map  ****/
function addNavigationBtnListeners() {
	$("#zoom").click(function(){ if(zoom_scale < 15) rebuildMapScale("zoomIn") });
	$("#left").click(function(){ if(min_x_tmp > min_x) rebuildMapScale("left") });
	$("#right").click(function(){ if(max_x_tmp < max_x) rebuildMapScale("right") });
	$("#up").click(function(){ if(min_y_tmp > min_y) rebuildMapScale("up") });
	$("#down").click(function(){ if(max_y_tmp < max_y) rebuildMapScale("down") });

	$("body").keydown(function(e) {
		if(e.keyCode == 37) { // left
			if(min_x_tmp > min_x) rebuildMapScale("left")
	  	}
  		else if(e.keyCode == 39) { // right
    		if(max_x_tmp < max_x) rebuildMapScale("right")	
  		}
  		else if(e.keyCode == 38) { // up
    		if(min_y_tmp > min_y) rebuildMapScale("up")
  		}
  		else if(e.keyCode == 40) { // down
    		if(max_y_tmp < max_y) rebuildMapScale("down")	
  		}
	});
}

