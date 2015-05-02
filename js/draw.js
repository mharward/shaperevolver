console.log("Test");

var canvas;
var centre;
var options = {
	canvasWidth: 0,
	canvasHeight: 0,
	xOffset: 0,
	yOffset: 0,
	heightOffset: 0,
	widthOffset: 0,
	count: 33,
	rotationChange: 0.3,
	heightChange: 0.9,
	widthChange: 1.05,
	startColour: '#a92370',
	endColour: '#1a129c',
	xCentreOffset: 0,
	yCentreOffset: 0,
	initialRotation: 0,
	type: 'triangle'
}

window.onload = function () {
	canvas = document.getElementById("canvas");
	resize();
};

function resize() {
	canvas.width = $(window).width() - 18;
	canvas.height = $(window).height() - 18;
	options.canvasWidth = canvas.width;
	options.canvasHeight = canvas.height;
	centre = { x: options.canvasWidth / 2, y: options.canvasHeight / 2 };
	doDraw();
}

function doDraw() {
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
		var height = options.canvasWidth / 2 * 0.8;
		var width = height / 4;
		height = height + options.heightOffset;
		width = width + options.widthOffset;
		var rotation = Math.PI * 1.5 + options.initialRotation;
		var i = 0;
		var interval;
		function draw() {
			var color = getGradientColor(options.startColour, options.endColour, i / options.count);
			drawTriangle(ctx, color, 0.8, height, width, rotation, options.xCentreOffset, options.yCentreOffset, options.type);
			height = height * options.heightChange;
			width = width * options.widthChange;
			rotation = rotation + options.rotationChange;
			i++;
			if (i >= options.count) {
				window.clearInterval(interval);
			}
		}
		interval = window.setInterval(draw, 20);
	}
}

function setType(type) {
	options.type = type;
	doDraw();
}

function setXPosOffset(amount) {
	options.xOffset = amount;
	centre = { x: options.canvasWidth / 2 + options.xOffset, y: options.canvasHeight / 2 + options.yOffset };
	doDraw();
}

function setYPosOffset(amount) {
	options.yOffset = -amount;
	centre = { x: options.canvasWidth / 2 + options.xOffset, y: options.canvasHeight / 2 + options.yOffset };
	doDraw();
}

function setHeightOffset(amount) {
	options.heightOffset = amount;
	doDraw();
}

function setWidthOffset(amount) {
	options.widthOffset = amount;
	doDraw();
}

function setHeightChange(amount) {
	options.heightChange = amount;
	doDraw();
}

function setWidthChange(amount) {
	options.widthChange = amount;
	doDraw();
}

function setCount(amount) {
	options.count = amount;
	doDraw();
}

function setRotationChange(amount) {
	options.rotationChange = amount;
	doDraw();
}

function setInitialRotation(amount) {
	options.initialRotation = amount;
	doDraw();
}

function setStartColour(value) {
	options.startColour = value;
	doDraw();
}

function setEndColour(value) {
	options.endColour = value;
	doDraw();
}

function setXCentreOffset(amount) {
	options.xCentreOffset = amount;
	doDraw();
}

function setYCentreOffset(amount) {
	options.yCentreOffset = amount;
	doDraw();
}

function drawTriangle (ctx, color, alpha, height, width, rotation, offsetX, offsetY, type) {
	
	ctx.fillStyle = color;
	ctx.globalAlpha = alpha;
	ctx.save();
		ctx.translate(centre.x, centre.y);
		ctx.rotate(rotation);
		ctx.translate(-centre.x, -centre.y);
		ctx.translate(offsetX, offsetY);

		ctx.beginPath();
		if (type == 'triangle') {
			ctx.moveTo(centre.x, centre.y);
			ctx.lineTo(centre.x + (width / 2), centre.y + height);
			ctx.lineTo(centre.x - (width / 2), centre.y + height);
		} else if (type == 'diamond') {
			ctx.moveTo(centre.x, centre.y);
			ctx.lineTo(centre.x + (width / 2), centre.y + (height / 2));
			ctx.lineTo(centre.x, centre.y + height);
			ctx.lineTo(centre.x - (width / 2), centre.y + (height / 2));
		} else if (type == 'oval') {
			drawOval(ctx, centre.x, centre.y, width, height / 4);
		}
		ctx.closePath();
		ctx.fill();
	ctx.restore();
}

function drawOval(ctx, x, y, rw, rh) {
	ctx.save();
	ctx.scale(1,  rh/rw);
	ctx.beginPath();
	ctx.arc(x, y, rw, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.restore();
}

getGradientColor = function(start_color, end_color, percent) {
   // strip the leading # if it's there
   start_color = start_color.replace(/^\s*#|\s*$/g, '');
   end_color = end_color.replace(/^\s*#|\s*$/g, '');

   // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
   if(start_color.length == 3){
     start_color = start_color.replace(/(.)/g, '$1$1');
   }

   if(end_color.length == 3){
     end_color = end_color.replace(/(.)/g, '$1$1');
   }

   // get colors
   var start_red = parseInt(start_color.substr(0, 2), 16),
       start_green = parseInt(start_color.substr(2, 2), 16),
       start_blue = parseInt(start_color.substr(4, 2), 16);

   var end_red = parseInt(end_color.substr(0, 2), 16),
       end_green = parseInt(end_color.substr(2, 2), 16),
       end_blue = parseInt(end_color.substr(4, 2), 16);

   // calculate new color
   var diff_red = end_red - start_red;
   var diff_green = end_green - start_green;
   var diff_blue = end_blue - start_blue;

   diff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
   diff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
   diff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

   // ensure 2 digits by color
   if( diff_red.length == 1 )
     diff_red = '0' + diff_red

   if( diff_green.length == 1 )
     diff_green = '0' + diff_green

   if( diff_blue.length == 1 )
     diff_blue = '0' + diff_blue

   return '#' + diff_red + diff_green + diff_blue;
 };