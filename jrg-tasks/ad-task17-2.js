    var imgContainer = $('.carousel>.image-container');
    var preButton = $('.carousel>.previous');
    var nextButton = $('.carousel>.next');
    var bullet = $('.carousel>.bullet');
    var imgLength = imgContainer.children().length;
    var intervalId;
    var timoutId;

    var lastImage = imgContainer.children().last();
    var firstImage = imgContainer.children().first();
    imgContainer.prepend(lastImage.clone());
    imgContainer.append(firstImage.clone());

    imgContainer.width(firstImage.width()*(imgLength+2));
    imgContainer.css('left','-400px');

    var currentPage = 0;
    var isAnimate = false;

    function playNext(n){
        isAnimate = true;
        imgContainer.fadeOut(300);
        left = parseInt(imgContainer.css('left'));
        imgContainer.css('left',left-firstImage.width()*n);
        imgContainer.fadeIn(300,function(){
            currentPage += n;
            if(currentPage === imgLength){
                imgContainer.css('left','-400px');
                currentPage = 0;
            }
            setBullet();
            isAnimate = false;
        });
    }

    function playPrevious(n){
        isAnimate = true;
        imgContainer.fadeOut(300);
        left = parseInt(imgContainer.css('left'));
        imgContainer.css('left',left+firstImage.width()*n);
        imgContainer.fadeIn(300,function(){
            currentPage -= n;
            if(currentPage < 0){
                imgContainer.css('left',-(imgLength*firstImage.width()));
                currentPage = 3;
            }
            setBullet();
            isAnimate = false;
        });
    }

    nextButton.on('click',function(e){
        if(!isAnimate){
            clearInterval(intervalId);
            clearTimeout(timoutId);
            e.preventDefault();
            playNext(1);
            laterAuto();
        }
    });

    preButton.on('click',function(e){
        if(!isAnimate){
            clearInterval(intervalId);
            clearTimeout(timoutId);
            e.preventDefault();
            playPrevious(1);
            laterAuto();
        }
    });

    $('a').on('click',function(e){
        e.preventDefault();
    })

    function setBullet(){
        bullet.children().removeClass('active').eq(currentPage).addClass('active');
    }

    bullet.children().on('click',function(){
        if(!isAnimate){
            clearInterval(intervalId);
            clearTimeout(timoutId);
            var curBullet = $(this).index();
            var activeBullet = bullet.children('.active').index();
            var offset = curBullet-activeBullet;
            if(offset > 0){
                playNext(offset);
            }
            else if(offset <0){
                playPrevious(-offset);
            }
            laterAuto();
        }
    });
    
    function startAuto(){
        intervalId=setInterval(function(){
            playNext(1);
        }, 2500);
    };

    function laterAuto(){
        timoutId = setTimeout(function() {
            startAuto();
        }, 8000);
    }

    startAuto.call();
     

    