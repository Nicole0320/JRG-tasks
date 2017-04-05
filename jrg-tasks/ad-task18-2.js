function Barrel(options){
    //内部变量
    this._leftImages = []; //图片暂存数组
    this._isLoading = false;
    this._currentPage = 1;
    this._images = []; //要放入行的图片
    this._rowWidth = 0;

    //传递参数
    this.container = options.$container;
    this.width = options.width+5;
    this.height = options.height;
    
    //函数调用
    this.loadImage();

    var THIS = this;
    $(window).on('scroll',function(){
        if(isVisible($("#more"))&&(!THIS._isLoading)){
            THIS.loadImage();
            console.log('scrolling');
        }
    });
}

Barrel.prototype={
    loadImage: function(){
        this._isLoading = true;
        var imageNum = 5;
        var THIS = this;
        $.ajax({
            url: 'https://pixabay.com/api/',
            type: 'get',
            data: {
                key: '4996025-c5c3d37a93ad72d4d09ef21ea',
                q: 'sunshine',
                image_type: 'photo',
                pretty: true,
                page: this._currentPage,
                per_page: imageNum
            },
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'func',
            success: onSuccess,
            error: onError    
        });
        function func(res){
        }
        function onSuccess(res){
            /*
            解析response：
            1. 得到图片对象数组
            2. 图片按比例缩放后，选取有用信息加入_leftImages[]数组尾部
            */
            THIS._currentPage++;
            $.each(res.hits, function(index,element) {
                var temp = (element.imageWidth*THIS.height/element.imageHeight);
                var image = {
                    imageURL: element.webformatURL,
                    width: temp,
                    pageURL: element.pageURL
                };
                THIS._leftImages.push(image);
            });
            THIS._isLoading = false;
            
            while(isVisible($("#more"))&&(!THIS._isLoading)){
                THIS.appendImages();
            }
        }
        function onError(){
            console.log('ajax error~!');
            THIS._isLoading = false;
        }
    },

    appendImages: function(){
        /*
        1. 循环检查是否可以放入images数组，如果可以则放入数组，并删除leftImages中对应的对象元素，否则完成存放操作
        2. 将image数组中元素的的总宽与width对比，得到缩放因子，整体再次缩放
        3. 将缩放完成的images拼装成HTML放到页面上
        */
        
        var THIS = this;
        while(THIS._rowWidth+THIS._leftImages[0].width+5 < THIS.width){
            THIS._rowWidth += THIS._leftImages[0].width+5;
            THIS._images.push(THIS._leftImages[0]);
            THIS._leftImages.shift();
            
            if(THIS._leftImages[0] === undefined){
                THIS.loadImage();
                return;
            }
        }
        var rowHeight = THIS.height*(THIS.width/THIS._rowWidth);
        var ul = $('<ul></ul>')
        ul.addClass('row');

        //拼接HTML
        $.each(THIS._images,function(index,element){
            element.width = element.width*(THIS.width/THIS._rowWidth);
            var li = $(`<li><a href="${element.pageURL}">
				<img src="${element.imageURL}">
			</a></li>`);
            li.find('img').css({
                width: element.width+'px',
                height: rowHeight+'px'
            });
            
            ul.append(li);
        });
        this.container.append(ul);
        THIS._images = [];
        THIS._rowWidth = 0;
    }
}


//判断元素是否是出现在窗口可视范围
function isVisible($node){
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var offsetTop = $node.offset().top;
    var nodeHeight = $node.outerHeight(true);
    if(scrollTop >= offsetTop-windowHeight && scrollTop <= offsetTop+nodeHeight){
        return true;
    }
    else{
        return false;
    }
}

//调用
var barrel = new Barrel({
    $container: $('.container'),
    width: $('.container').width(),
    height: 200
});