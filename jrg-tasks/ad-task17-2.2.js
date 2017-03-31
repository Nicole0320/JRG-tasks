    var imgContainer = $('.carousel>.image-container');
    var preButton = $('.carousel>.previous');
    var nextButton = $('.carousel>.next');
    var bullet = $('.carousel>.bullet');
    var imgLength = imgContainer.children().length;
    var intervalId;
    var timoutId;

    var lastImage = imgContainer.children().last();
    var firstImage = imgContainer.children().first();
    
    var currentPage = 0;
    var isAnimate = false;
    

    function playNext(n){
        isAnimate = true;
        var node = $('.display');
        var nextNode;
        
        currentPage += n;
        if(currentPage === 4){
            currentPage = 0;
            nextNode = imgContainer.children().first();
        }
        else{
            nextNode = node;
            for(var i=0; i<n; i++){
                nextNode = nextNode.next();
            }
        }

        node.fadeOut(300,function(){
            $(this).removeClass('display');
            nextNode.addClass('display');
        });
        nextNode.fadeIn(300,function(){
            setBullet();
            isAnimate = false;
        });
    }

    function playPrevious(n){
        isAnimate = true;
        var node = $('.display');
        var prevNode;
        
        currentPage -= n;
        if(currentPage < 0){
            currentPage = 3;
            prevNode = imgContainer.children().last();
        }
        else{
            prevNode = node;
            for(var i=0; i<n; i++){
                prevNode = prevNode.prev();
            }
        }

        node.fadeOut(300,function(){
            $(this).removeClass('display');
            prevNode.addClass('display');
        });
        prevNode.fadeIn(300,function(){
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
        }, 6000);
    }

    startAuto.call();
     

    