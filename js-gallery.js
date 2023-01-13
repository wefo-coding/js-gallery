/**
 * JavaScript Gallery - Easy to use.
 * 
 * Link:    https://github.com/wefo-coding/js-gallery
 * Author:  Florian Otten
 * Version: 0.1.0
 */

(function (global){
    
    /**
     * Represents a gallery
     * @constructor
     * 
     * @param {HTMLElement} element - The HTML element of the gallery. 
     */
    function Gallery(element){
        
        if(!(element instanceof HTMLElement)){
            return;
        }
        
        var self = this;
        self.htmlRoot = element;
        self.images = [];
        self.currentImgID = 0;
        
        let imgElements = element.getElementsByTagName('figure');
        for (var i = 0; i < imgElements.length; i++){
            self.images.push(new GalleryImage(i, imgElements[i], self));
        }
        
        self.render(self.currentImgID);
    }
    
    Gallery.prototype.render = function(id = 0){
        var self = this;
        id = id % self.images.length;
        self.currentImgID = id < 0 ? id + self.images.length : id;
        
        self.htmlRoot.innerHTML = '';
        //delete all classes except js-gallery
        //self.htmlRoot.setAttribute('class', 'js-gallery');
        
        if(self.images.length < 1){
            self.htmlRoot.innerHTML = "<p>This gallery is empty!</p>";
            return;
        }
        var main = global.document.createElement('div');
        main.appendChild(self.images[self.currentImgID].getHtml());
        main.classList.add('js-gallery-main');
        self.htmlRoot.appendChild(main);
        
        var last = global.document.createElement('div');
        last.classList.add('js-gallery-last');
        last.onclick = function(){
            self.last();
        }
        main.appendChild(last);
        
        var next = global.document.createElement('div');
        next.classList.add('js-gallery-next');
        next.onclick = function(){
            self.next();
        }
        main.appendChild(next);
        
        self.bg = global.document.createElement('div');
        self.bg.classList.add('js-gallery-bg');
        self.bg.setAttribute('style', 'background-image: url(\'' + self.images[self.currentImgID].src + '\')');
        main.appendChild(self.bg);
        
        var previews = global.document.createElement('div');
        previews.classList.add('js-gallery-previews');
        self.htmlRoot.appendChild(previews);
        
        for(var img of self.images){
            previews.appendChild(img.getHtml());
        }
    }
    
    Gallery.prototype.last = function(){
        var self = this;
        self.render(self.currentImgID - 1);
    }
    
    Gallery.prototype.next = function(){
        var self = this;
        self.render(self.currentImgID + 1);
    }
    
    /**
     * Represents an image of a gallery
     * @constructor
     * 
     * @param {HTMLElement} element - The HTML element of the gallery. 
     */
    function GalleryImage(id, element, gallery){
        
        if(!(element instanceof HTMLElement)){
            return;
        }
        
        var self = this;
        self.gallery = gallery;
        self.id = id;
        try{
            self.src = element.getElementsByTagName('img')[0].getAttribute('src');
            self.caption = element.getElementsByTagName('figcaption')[0].innerText;
        }
        catch(error){
            return;
        }
    }
    
    GalleryImage.prototype.getHtml = function(){
        var self = this;
        
        var figureElement = global.document.createElement('figure');
        figureElement.onclick = function(){
            self.gallery.render(self.id);
        };
        if(self.id == self.gallery.currentImgID){
            figureElement.classList.add('active');
        }
        var imgElement = global.document.createElement('img');
        imgElement.setAttribute("src", self.src);
        figureElement.appendChild(imgElement);
        
        if(self.caption){
            var captionElement = global.document.createElement('figcaption');
            captionElement.innerHTML = self.caption;
            figureElement.appendChild(captionElement);
        }
        
        return figureElement;
    }
    
    /**
     * Initialization function
     */
    function init(){
        
        /* Load galleries */
        var galleryElements = global.document.getElementsByClassName('js-gallery');
        for (var i = 0; i < galleryElements.length; i++){
            new Gallery(galleryElements[i]);
        }
        
    }
    
    /* Call init function onload. */
    global.addEventListener('load', init);
    
}(window));
