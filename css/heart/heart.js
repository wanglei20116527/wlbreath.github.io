(function(window, document, undefined){

var heart = document.querySelector('.heart');


heart.addEventListener('click', brustHeart, false);

heart.addEventListener('webkitAnimationEnd', function(){
	heart.classList.remove('brust-heart');
	heart.addEventListener('click', brustHeart, false);
}, false);

function brustHeart(){
	heart.classList.add('brust-heart');
	heart.removeEventListener('click', brustHeart, false);
}

})(window, document);