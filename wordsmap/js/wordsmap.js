var windowH, windowW,
	maxX=0, minX=0, maxY=0, minY=0;
var xRange, yRange;
var isZoomIn = false;

var zoom_degree = 10;

initView();

function initView()
{
	windowH = 760;
	windowW = 960;
	for(var i = 0; i<5000; i++)
	{ 
		var x = words[i][0],
			y = words[i][1];
		if(x>maxX) maxX = x;
		if(x<minX) minX = x;
		if(y>maxY) maxY = y;
		if(y<minY) minY = y;
	}		
	xRange = maxX - minX;
	yRange = maxY - minY;

	console.log(minX + " " + minY + " " + maxX + " " + maxY)

	for(var i = 0; i<5000; i++)
	{
		var x = windowW * (words[i][0] - minX) / xRange;
		var y = windowH * (words[i][1] - minY) / yRange;

		//var word = $("<div class='word_point'>").text(words[i][2]);
		var word = $("<div>").text("*");
		word.attr("style", "margin-left:" + x + "px;margin-top:" + y + "px");
		$("#main").append(word);
	}

	$("#main").fadeIn(5000);	
}

function zoomIn(clickX, clickY, degree)
{
	var temp_minX, temp_minY, temp_maxX, temp_maxY;

	var boxLeft = clickX - windowW / degree / 2,
		boxTop = clickY - windowH / degree / 2,
		boxRight = clickX + windowW / degree / 2,
		boxBottom = clickY + windowH / degree / 2;

	if(boxLeft < 0) temp_minX = minX;
	else temp_minX = minX + xRange * boxLeft / windowW

	if(boxTop < 0) temp_minY = minY;
	else temp_minY = minY + yRange * boxTop / windowH;
	
	if(boxRight > windowW) temp_maxX = maxX;
	else temp_maxX = minX + xRange + boxRight / windowW;
	
	if(boxBottom < windowH) temp_maxY = maxY;
	else temp_maxY = minY + yRange * boxBottom / windowH;

	console.log(temp_minX + " " + temp_minY + " " + temp_maxX + " " + temp_maxY)

	for(var i = 0; i<5000; i++)
	{
		var w_x = words[i][0], w_y = words[i][1];

		if(w_x < temp_minX || w_x > temp_maxX || w_y < temp_minY || w_y > temp_maxY) { }
		else
		{
			var x = windowW * (words[i][0] - temp_minX) / xRange * degree;
			var y = windowH * (words[i][1] - temp_minY) / yRange * degree;

			var word = $("<div>").text(words[i][2]);
			word.attr("style", "margin-left:" + x + "px;margin-top:" + y + "px; font-size: 16pt");
			var body = $("#zoom");
			body.append(word);	
		}
	}

	$("#zoom").find("div").hover(function(){
		this.style.fontSize = "30pt"; }, function(){
	        this.style.fontSize = "16pt";;
	})
}

$("#main, #zoom").click(function(e) {
	if(isZoomIn)
	{
		$("#zoom").hide().empty();
		$("#mouse_box").show();
		$("#main").show();
		isZoomIn = false;
	}
	else
	{	
		$("#mouse_box").hide();
		$("#main").hide();
		$("#zoom").show();
		zoomIn(e.pageX, e.pageY, 20);
		isZoomIn = true;
	}
});

$(document).on('mousemove', function(e){
    $('#mouse_box').css({
       left:  e.pageX-25,
       top:   e.pageY-25
    });
});