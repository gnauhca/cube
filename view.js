var view = (function() {
	var view = {},
		cubeWrapEle = null,
		mouseHandle = false;//是否游戏已经开始，允许鼠标操控视角

	function init() {
		cubeWrapEle = document.getElementById('cubeWrap');
		//startRotateAnimate();
		initEvent();
		gamer.registerStart(view.start);
		gamer.registerReset(view.reset);
	}

	function initEvent() {

		+function() {
			var initMouseSize = {x:0,y:0},
				initTranInfo = {rx: 0, ry: -0},
				currentTranInfo = {rx: 0, ry:0},
				mouseDown = false;

			document.onmousedown = function(event) {
				var event = event||window.event;
				if (mouseHandle) {
					mouseDown = true;
					initMouseSize.x = event.clientX;
					initMouseSize.y = event.clientY;
				}
				setTimeout(function() {
					document.onmousemove = function(event) {
						var event = event||window.event;

						if (mouseHandle && mouseDown) {
							currentTranInfo.rx = (initTranInfo.rx + (event.clientX - initMouseSize.x)/5) % 360;
							currentTranInfo.ry = (initTranInfo.ry + (event.clientY - initMouseSize.y)/5) % 360;
							cubeWrapEle.style.transform = 'rotateX(' + -currentTranInfo.ry + 'deg) rotateY(' + currentTranInfo.rx + 'deg)';
						}
					}
				},100);

			}



			document.onmouseup = function(event) {
				mouseDown = false;

				if (mouseHandle) {
					document.onmousemove = null;
					initTranInfo.rx = currentTranInfo.rx;
					initTranInfo.ry = currentTranInfo.ry;
				}
			}			
		}();

	}
	

	view.reset = function() {
		mouseHandle = false;
	}

	view.start = function() {
		mouseHandle = true;
	}

	init();
	return view;
})();