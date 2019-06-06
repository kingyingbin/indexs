(function () {
    var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;
		setTimeout(function(){
			window.resize = resize();
		},300)
    // Main
    initHeader();
    addListeners();
    function initHeader() {
        width = window.innerWidth-17;
        height = window.innerHeight-6;
        target = {x: 0, y: height};

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create particles
        circles = [];
        for(var x = 0; x < width*0.5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }
    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }
    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }
    function resize() {
        width = window.innerWidth-17;
        height = window.innerHeight-6;
        canvas.width = width;
        canvas.height = height;
        initHeader();
    }
	
    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }
    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
         })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = height+Math.random()*100 *  (100 - upupooConfig.density.value*1);//气泡初始化出现的数量 （越大越少）
            _this.alpha = 0.1+Math.random()*0.3 + upupooConfig.transparent.value*0.01;//气泡随机透明度（越大越明显）
            _this.scale = 0.1+Math.random()*0.3 + upupooConfig.size.value*0.1; //气泡大小（越大越大）
            _this.velocity = Math.random() + upupooConfig.speed.value*0.1;//气泡上升速度
            _this.styleColor1 = parseInt("0x"+upupooConfig.color.value.slice(1,3))
            _this.styleColor2 =	parseInt("0x"+upupooConfig.color.value.slice(3,5))
            _this.styleColor3 =	parseInt("0x"+upupooConfig.color.value.slice(5,7))
        }

        this.draw = function() {
            if(_this.alpha <= 0) {
                init();
            }
            _this.pos.y -= _this.velocity;
            _this.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba('+_this.styleColor1+','+_this.styleColor2+','+_this.styleColor3+','+ _this.alpha+')';
            ctx.fill();
        };
    }
})();