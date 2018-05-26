;+function($){
//	加到原型上,单例模式
	$.fn.banner=function(selector,options){
		new Banner(selector,options,this);
	}
	function Banner(selector,options,base_ele){
		this.init(selector,options,base_ele);
	}
	Banner.prototype={
		constructor:Banner,
		init:function(selector,options,base_ele){
//			初始化,获取元素
			this.index=0;
			this.bannerWrapper=$(selector);
			this.direction=options.animate;
			this.bannerItem = this.bannerWrapper.children();
			this.bannerNum=this.bannerItem.length;
			this.prevBtn=options.prevBtn;
			this.nextBtn=options.nextBtn;
			this.autoPlay=options.autoPlay;
			
				
			     this.prevBtn
                .on("click",{turn:"prev"},$.proxy(this.changeIndex,this))
                .on("click",$.proxy(this.animation,this));
            
			
                 this.nextBtn
                .on("click",{turn:"next"},$.proxy(this.changeIndex,this))
                .on("click",$.proxy(this.animation,this));
              
		},
//		改变下标
        changeIndex:function(event){
        	var turnList={
        		"prev":function(){
        			this.hidden=this.index;
        			if(this.index==0){
        				this.index=this.bannerNum-1;
        			}else{
        				this.index--;
        			}
        		}.bind(this),
        		"next":function(){
        			this.hidden=this.index;
        			if(this.index==this.bannerNum-1){
        				this.index=0
        			}else{
        				this.index++;
        			}
        		}.bind(this)
        	}
        	turnList[event.data.turn]();
        	
        },
//      轮播动画
        animation:function(event){
        	var animationList={
        		"slide":function(){
        			
        			animationList.slideFadeInit();
        			
        			this.bannerItem.eq(this.index)
        			.addClass("active")
        			.slideDown()
        			.siblings()
        			.removeClass("active");
        		}.bind(this),
        		"fade":function(){
        			
        			animationList.slideFadeInit();
        			
        			this.bannerItem.eq(this.index)
        			.addClass("active")
        			.fadeIn()
        			.siblings()
        			.removeClass("active");
        		}.bind(this),
        		"slideFadeInit":function(){
        		
                    this.bannerItem.eq(this.hidden)
                    .css({
                        zIndex:1
                    })
                    .siblings()
                    .css({
                        zIndex:""
                    })
                }.bind(this)
        	}
        	
        	animationList[this.direction]();
        	
        },
        zidong:function(){
        	console.log(this.autoPlay);
        	if(this.autoPlay){
        		var c=setInterval(function(){
        			this.turnList.next();
        			console.log(this.turnList.next());
        			this.animationList[this.direction]();
        		},1000).bind(this)
        	}
        	
        }
        
           
	}
}(jQuery);
