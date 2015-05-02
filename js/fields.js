var fields = [
	{ type: 'select', name: 'typeCombo', internalName: 'type' },

	{ type: 'slider', name: 'xPosSlider', internalName: 'xOffset', config: { min: -500, max: 500 }},
	{ type: 'slider', name: 'yPosSlider', internalName: 'yOffset', config: { min: -500, max: 500 }},
	{ type: 'slider', name: 'heightSlider', internalName: 'heightOffset', config: { min: -500, max: 500 }},
	{ type: 'slider', name: 'widthSlider', internalName: 'widthOffset', config: { min: -150, max: 150 }},
	{ type: 'slider', name: 'heightChangeSlider', internalName: 'heightChange', config: { min: 0.5, max: 1.5, step: 0.05 }},
	{ type: 'slider', name: 'widthChangeSlider', internalName: 'widthChange', config: { min: 0.75, max: 1.25, step: 0.025 }},
	{ type: 'slider', name: 'countSlider', internalName: 'count', config: { min: 1, max: 100 }},
	{ type: 'slider', name: 'rotationSlider', internalName: 'rotationChange', config: { min: -0.8, max: 0.8, step: 0.05 }},
	{ type: 'slider', name: 'initialRotationSlider', internalName: 'initialRotation', config: { min: -Math.PI, max: Math.PI, step: 0.01 }},
	{ type: 'slider', name: 'xCentreOffsetSlider', internalName: 'xCentreOffset', config: { min: -300, max: 300 }},
	{ type: 'slider', name: 'yCentreOffsetSlider', internalName: 'yCentreOffset', config: { min: -300, max: 300 }},

	{ type: 'colour', name: 'startColour', internalName: 'startColour' },
	{ type: 'colour', name: 'endColour', internalName: 'endColour' },
];

function createField(field) {
	var cssSelector = '#' + field.name;
	switch (field.type) {
		case 'slider': {
			$(cssSelector).slider(field.config);
			$(cssSelector).on('slidechange', function (event, ui) {
				if (event.originalEvent) {
					options[field.internalName] = ui.value;
					doDraw();
				}
			});
			break;
		}
		case 'colour': {
			$(cssSelector).on('change', function() {
				options[field.internalName] = $(this).val();
				doDraw();
			});
			break;
		}
		case 'select': {
			$(cssSelector).on('change', function() {
				options[field.internalName] = this.value;
				doDraw();
			});
			break;
		}
	}
}

function setSliderValues() {
	fields.forEach(function (field) {
		var cssSelector = '#' + field.name;
		switch (field.type) {
			case 'slider': {
				$(cssSelector).slider('value', options[field.internalName]);
				break;
			}
			case 'colour': {
				$(cssSelector).val(options[field.internalName]);
				break;
			}
			case 'select': {
				$(cssSelector).val(options[field.internalName]);
				break;
			}
		}
	});
}

$(function() {
	var resizeId = false;
	$(window).resize(function() {
		if (resizeId) {
			clearTimeout(resizeId);
		}
		resizeId = setTimeout(function() {
			resize();
		}, 300);
	});

	var sideBarVisible = true;
	$('#buttonToggle').click(function(){
		$('#sideBar').toggleClass('useSideBar');
		if (sideBarVisible) {
			$('#arrowSpan').html('&#x25BC;');
		} else {
			$('#arrowSpan').html('&#x25B2;');
		}
		sideBarVisible = !sideBarVisible;
	});

	$('#preset1').on('click', function () { setPreset('preset1'); setSliderValues(); });
	$('#preset2').on('click', function () { setPreset('preset2'); setSliderValues(); });
	$('#preset3').on('click', function () { setPreset('preset3'); setSliderValues(); });

	fields.forEach(createField);

	setSliderValues();
});