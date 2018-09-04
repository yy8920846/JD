window.onload = function () {
search();
banner();
downTime();
};
var search = function () {
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    window.onscroll = function () {
        var scrollTop= document.body.scrollTop;
        console.log(scrollTop);
        var opacity = 0;
        if(scrollTop < height){
            opacity = scrollTop / height *0.85
        }else{
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')' ;
    }
};
var banner = function () {
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    var imageBox = banner.querySelector('ul:first-child');
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');
    
    var addtransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    };
    var removeTranstion = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX('+translateX+'px)';
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
    };
    
    var index = 1;
    var time = setInterval(function () {
        index ++;
      addtransition();
       setTranslateX(-index*width);
    },1000);
    imageBox.addEventListener('transitionend',function () {
        if(index >=9){
            index = 1;
            removeTranstion();
            setTranslateX(-index*width);
        }else if(index <= 0){
            index = 8;
       removeTranstion();
            setTranslateX(-index*width);
        }
        setPoint();
    });
    var setPoint = function () {
        for (var i = 0 ; i<points.length;i++){
            var obj = points[i];
            obj.classList.remove('now');
        }
        points[index-1].classList.add('now');
    };

    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart',function (e) {
        clearInterval(time);
        var startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        var translateX = - index * width + distanceX;
        removeTranstion();
        setTranslateX(translateX);
        isMove = true;

    });
    imageBox.addEventListener('touchend',function (e) {
        if (isMove) {
            if(Math.abs(distanceX)<width/3){
                addtransition();
                setTranslateX(- index * width);
            }else{
                if(distanceX > 0){
                    index --;
                }else{
                    index ++;
                }
                addtransition();
                setTranslateX(-index * width);
            }
        }

        startX = 0;
        distanceX = 0;

        isMove=false;
    });

};
 var downTime = function () {
     var time = 2*60*60;
     var spans = document.querySelector('.sk_time').querySelectorAll('span');

     var timer = setInterval(function () {
         time --;
         var h =Math.floor(time/3600);
         var m =Math.floor(time%3600/60);
         var s=time%60;

         spans[0].innerHTML = Math.floor(h/10);
         spans[1].innerHTML = h%10;
         spans[3].innerHTML = Math.floor(m/10);
         spans[4].innerHTML = m%10;
         spans[6].innerHTML = Math.floor(s/10);
         spans[7].innerHTML = s%10;
         if(time <=0){
             clearInterval(timer);
         }
     },1000);
 };