var slider = function (opt) {
    var $box = $(opt.box),
        index = 0,
        time = opt.time || 2500,
        image = opt.imgs,
        length = opt.imgs.length,
        auto = opt.auto;
   
    var $slider = $('<div class="slider" id="slider"></div>'),
        $leftBtn = $('<span id="left"><</span>'),
        $rightBtn = $('<span id="right">></span>'),
        $dot = $('<ul class="nav" id="navs"></ul>'),
        $li = [];
        $slider.append($('<div class="slide"><img src="' + image[length - 1] + '" alt=""></div>'));

    for (var i=0; i<length; i++) {
        var $imgDiv=$('<div class="slide"><img src="'+image[i]+'"alt=""></div>');
        $li[i]=$('<li>'+(i+1)+'</li>');
        $slider.append($imgDiv);
        $dot.append($li[i]);
    }
        $slider.append($('<div class="slide"><img src="'+image[0]+'"alt=""></div>'));
        $li[0].addClass("active");

    function prevent() {
        if (index == 0) {
            changeli(length - 1);
            $slider.animate({ 'left': '+=' + 1200 }, 800, function () { $slider.css('left', -1200 * len); });
            index = length - 1;
        } else {
            changeli(index - 1);
            $slider.animate({ 'left': '+=' + 1200 }, 800);
            index--;
        }
    }
    function next() {
        if (index == length - 1) {
            changeli(0);
            $slider.animate({ 'left': '-=' + 1200 }, 800, function () { $slider.css('left', -1200); });
            index = 0;
        } else {
            changeli(index + 1);
            $slider.animate({ 'left': '-=' + 1200 }, 800);
            index++;
        }
    }
    function changeli(num) {
        for (var i=0; i<length; i++) {
            if ($li[i].hasClass("active")) {
                $li[i].removeClass("active");
            }
        }
        $li[num].addClass("active");
    }
    if (auto) {
        var timer = setInterval(next, time);
    }

    $box.hover(function () {
        $leftBtn.stop().animate({ 'opacity': 0.5 }, 'fast');
        $rightBtn.stop().animate({ 'opacity': 0.5 }, 'fast');
        if (auto) {
            clearInterval(timer);
        }           
    }, function () {
        $leftBtn.stop().animate({ 'opacity': 0 }, 'fast');
        $rightBtn.stop().animate({ 'opacity': 0 }, 'fast');
        if (auto) {
            timer = setInterval(next, time);
        }
    });
    $leftBtn.click(prevent);
    $rightBtn.click(next);

    for (var i=0; i<length; i++) {
        (function(num){
            $li[num].click(function(){
                changeli(num);
                var distance=num-index;
                if (distance>0) {
                    $slider.animate({ 'left':'+='+(distance*-1200)},800);
                } else if (distance<0) {
                    $slider.animate({ 'left':'-='+(distance*1200)}, 800);
                }
                index = num;
            });
        })(i);
    }
    $box.append($slider);
    $box.append($leftBtn);
    $box.append($rightBtn);
    $box.append($dot);
    return $box;
}