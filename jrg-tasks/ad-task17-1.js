    var imgContainer = $('.carousel>.image-container');
    var preButton = $('.carousel>.previous');
    var nextButton = $('.carousel>.next');
    var bullet = $('.carousel>.bullet');
    var imgLength = imgContainer.children().length;

    var lastImage = imgContainer.children().last();
    var firstImage = imgContainer.children().first();
    imgContainer.prepend(lastImage.clone());
    imgContainer.append(firstImage.clone());

    imgContainer.width(firstImage.width()*(imgLength+2));
    imgContainer.css('left','-400px');

    var currentPage = 0;

    function playNext(n){
        imgContainer.animate({
            left: '-='+firstImage.width()*n+'px'
        },function(){
            console.log(firstImage.width()*n);
            currentPage += n;
            if(currentPage === imgLength){
                imgContainer.css('left','-400px');
                currentPage = 0;
            }
            setBullet();
        });
    }

    function playPrevious(n){
        imgContainer.animate({
            left: '+='+firstImage.width()*n+'px'
        },function(){
            console.log(currentPage);
            currentPage -= n;
            if(currentPage < 0){
                imgContainer.css('left',-(imgLength*firstImage.width()));
                currentPage = 3;
            }
            setBullet();
        });
    }

    nextButton.on('click',function(e){
        e.preventDefault();
        playNext(1);
    });

    preButton.on('click',function(e){
        e.preventDefault();
        playPrevious(1);
    });

    function setBullet(){
        bullet.children().removeClass('active').eq(currentPage).addClass('active');
    }

    bullet.children().on('click',function(){
        var curBullet = $(this).index();
        var activeBullet = bullet.children('.active').index();
        var offset = curBullet-activeBullet;
        if(offset > 0){
            playNext(offset);
        }
        else if(offset <0){
            playPrevious(-offset);
        }
    })