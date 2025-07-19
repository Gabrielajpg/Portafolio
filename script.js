document.addEventListener("DOMContentLoaded", function() {
    var formulario = document.getElementById("formulario");
    if (formulario) {
        formulario.addEventListener("submit", function(e) {
            e.preventDefault(); 
            alert("¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.");
            formulario.reset();
        });
    }

    var items = document.querySelectorAll(".slider .item");
    var dots = document.querySelectorAll(".dots li");
    var currentIndex = 0; 
    function showSlide(index) {
        if (index >= items.length) {
            index = 0;
        }
        if (index < 0) {
            index = items.length - 1;
        }

        for (var i = 0; i < items.length; i++) {
            items[i].classList.remove("active");
            dots[i].classList.remove("active");

            var galleryOverlay = items[i].querySelector('.gallery-overlay');
            if (galleryOverlay) {
                galleryOverlay.classList.remove('show');
            }
            var viewProjectButton = items[i].querySelector('.view-project');
            if (viewProjectButton) {
                viewProjectButton.textContent = "Ver proyecto completo";
            }
        }
        
        items[index].classList.add("active");
        dots[index].classList.add("active");
        currentIndex = index;
    }

    for (var i = 0; i < dots.length; i++) {
        (function(index) { 
            dots[i].addEventListener("click", function() {
                showSlide(index);
            });
        })(i);
    }

    if (items.length > 0) {
        showSlide(0);
    }

    var viewProjectButtons = document.querySelectorAll('.view-project');
    for (var i = 0; i < viewProjectButtons.length; i++) {
        viewProjectButtons[i].addEventListener('click', function() {
            var overlay = this.closest('.block').querySelector('.gallery-overlay');
            var slides = overlay.querySelectorAll('.gallery-slide img');
            var totalSlidesSpan = overlay.querySelector('.total-slides');
            var currentSlideSpan = overlay.querySelector('.current-slide');
            
            totalSlidesSpan.textContent = slides.length;
            currentSlideSpan.textContent = '1';
            
            for (var j = 0; j < slides.length; j++) {
                slides[j].classList.remove('active');
            }
            slides[0].classList.add('active');
            
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden'; 
        });
    }

    var closeGalleryButtons = document.querySelectorAll('.close-gallery');
    for (var i = 0; i < closeGalleryButtons.length; i++) {
        closeGalleryButtons[i].addEventListener('click', function() {
            this.closest('.gallery-overlay').classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    var galleryArrows = document.querySelectorAll('.gallery-arrow');
    for (var i = 0; i < galleryArrows.length; i++) {
        galleryArrows[i].addEventListener('click', function() {
            var overlay = this.closest('.gallery-overlay');
            var slides = overlay.querySelectorAll('.gallery-slide img');
            var currentSlideSpan = overlay.querySelector('.current-slide');
            var currentImageIndex = -1;

            for (var j = 0; j < slides.length; j++) {
                if (slides[j].classList.contains('active')) {
                    currentImageIndex = j;
                    break;
                }
            }
            
            if (this.classList.contains('prev-arrow')) {
                currentImageIndex = (currentImageIndex - 1 + slides.length) % slides.length;
            } else {
                currentImageIndex = (currentImageIndex + 1) % slides.length;
            }
            
            for (var j = 0; j < slides.length; j++) {
                slides[j].classList.remove('active');
            }
            slides[currentImageIndex].classList.add('active');
            currentSlideSpan.textContent = currentImageIndex + 1;
        });
    }

    var galleryOverlays = document.querySelectorAll('.gallery-overlay');
    for (var i = 0; i < galleryOverlays.length; i++) {
        galleryOverlays[i].addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        var activeOverlay = document.querySelector('.gallery-overlay.show');
        if (!activeOverlay) return;
        
        var arrows = activeOverlay.querySelectorAll('.gallery-arrow');
        
        if (e.key === 'ArrowLeft') {
            arrows[0].click();
        } else if (e.key === 'ArrowRight') {
            arrows[1].click();
        } else if (e.key === 'Escape') {
            activeOverlay.querySelector('.close-gallery').click();
        }
    });

    window.dispatchEvent(new Event('scroll'));
});