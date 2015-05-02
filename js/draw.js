console.log("Test");

var presets = {
	preset1: {
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
	},
	preset2: {
		xOffset: -114,
		yOffset: 0,
		heightOffset: 126,
		widthOffset: 116,
		count: 20,
		rotationChange: -0.25,
		heightChange: 0.8,
		widthChange: 1.025,
		startColour: '#ebc02c',
		endColour: '#a20d63',
		xCentreOffset: -67,
		yCentreOffset: 140,
		initialRotation: 0.28841,
		type: 'diamond'
	},
	preset3: {
		xOffset: 0,
		yOffset: 45,
		heightOffset: 380,
		widthOffset: -2,
		count: 33,
		rotationChange: 0.35,
		heightChange: 0.9,
		widthChange: 0.925,
		startColour: '#18dae4',
		endColour: '#e0d838',
		xCentreOffset: -31,
		yCentreOffset: 126,
		initialRotation: -0.81159,
		type: 'oval'
	}
};

var canvas;
var centre;
var options;

$(function() {
	canvas = document.getElementById("canvas");
	setPreset('preset1');
});

function setPreset(presetName) {
	options = jQuery.extend({}, presets[presetName]);
	resize();
}

function resize() {
	canvas.width = $(window).width() - 18;
	canvas.height = $(window).height() - 18;
	centre = { x: canvas.width / 2, y: canvas.height / 2 };
	doDraw();
}

function doDraw() {
	centre = { x: canvas.width / 2 + options.xOffset, y: canvas.height / 2 + options.yOffset };
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.clearRect (0, 0, canvas.width, canvas.height);
		var height = canvas.width / 2 * 0.8;
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