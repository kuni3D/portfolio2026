document.addEventListener('DOMContentLoaded', () => {
    const mailButton = document.querySelector('.mail');
    const copyMessage = document.querySelector('.copy-message');
    const gallery = document.querySelector('.gallery');
    const backBtn = document.querySelector('.back-btn');
    const homeBtn = document.querySelector('.home-btn');

    // Definir las galerías específicas, incluyendo el video en galeria3
    const detailedGalleries = {
        galeria1: [
            './imagenes/pancake.png',
            './videos/pancake1 (1).mp4',
            './imagenes/nueva2.jpg',
            './imagenes/nueva3.jpg',
            './imagenes/nueva4.jpg',
            './imagenes/nueva5.jpg'
        ],
        galeria2: [
            './imagenes/image2.png',
            './imagenes/image.png',
            './imagenes/otras2.jpg',
            './imagenes/otras3.jpg',
            './imagenes/otras4.jpg',
            './imagenes/otras5.jpg'
        ],
        galeria3: [
            './imagenes/R03.png',
            './imagenes/R04.png',
            './videos/Render Fight 1.mp4',
            './videos/0001-0165.mp4',
            './videos/Render Fight 2.mp4',
            './videos/habitacion1.mp4'
        ],
        galeria4: [
            './imagenes/rubia1.jpg',
            './imagenes/rubia2.jpg',
            './imagenes/gal4_2.jpg',
            './imagenes/gal4_3.jpg',
            './imagenes/gal4_4.jpg',
            './imagenes/gal4_5.jpg'
        ],
        galeria5: [
            './imagenes/deepchat2.png',
            './imagenes/deep1.jpg',
            './imagenes/deep2.jpg',
            './imagenes/deep3.jpg',
            './imagenes/deep4.jpg',
            './imagenes/deep5.jpg'
        ],
        galeria6: [
            './imagenes/raze2.png',
            './videos/raze1.mp4',
            './videos/raze2.mp4',
            './videos/raze3.mp4',
            './videos/raze4.mp4',
            './imagenes/deep5.jpg'
        ],
        galeria7: [
            './imagenes/robot construccion.jpg',
            './videos/Chasm Call pwnisher challenge.mp4',
            './imagenes/robot construccion2.jpg',
            './imagenes/deep3.jpg',
            './imagenes/deep4.jpg',
            './imagenes/deep5.jpg'
        ],
        galeria8: [
            './imagenes/blueball.jpg',
            './imagenes/#',
            './imagenes/#',
            './imagenes/#',
            './imagenes/deep4.jpg',
            './imagenes/deep5.jpg'
        ],
        galeria9: [
            './imagenes/gatito.jpg',
            './imagenes/gatito2.jpg',
            './imagenes/gatito3.jpg',
            './imagenes/deep3.jpg',
            './imagenes/deep4.jpg',
            './imagenes/deep5.jpg'
        ],
        galeria10: [
            './imagenes/Yumel.png',
            './imagenes/deep1.jpg',
            './imagenes/deep2.jpg',
            './imagenes/deep3.jpg',
            './imagenes/deep4.jpg',
            './imagenes/deep5.jpg'
        ]
    };

    // Almacenar la galería principal inicial
    const mainGallery = Array.from(document.querySelectorAll('.gallery[data-gallery="main"] img'));

    // Copy email functionality
    mailButton.addEventListener('click', () => {
        const email = mailButton.getAttribute('data-copy');
        navigator.clipboard.writeText(email).then(() => {
            copyMessage.classList.add('show');
            setTimeout(() => {
                copyMessage.classList.remove('show');
            }, 2000);
        });
    });

    // Función para cargar galería específica
    function loadDetailedGallery(galleryId) {
        const galleryContent = detailedGalleries[galleryId];
        if (galleryContent) {
            gallery.classList.add('detailed');
            gallery.innerHTML = ''; // Limpiar galería actual

            galleryContent.forEach(src => {
                if (src.endsWith('.mp4')) {
                    const video = document.createElement('video');
                    video.src = src;
                    video.controls = true;
                    video.preload = 'metadata';
                    gallery.appendChild(video);
                } else {
                    const newImg = document.createElement('img');
                    newImg.src = src;
                    newImg.alt = `Image from ${galleryId}`;
                    gallery.appendChild(newImg);
                }
            });

            backBtn.classList.add('show');
            homeBtn.classList.add('show'); // Mostrar el botón de regreso a la galería principal
        }
    }

    // Función para restaurar galería principal
    function restoreMainGallery() {
        gallery.classList.remove('detailed');
        gallery.innerHTML = ''; // Limpiar galería actual
        mainGallery.forEach(img => gallery.appendChild(img.cloneNode(true)));
        backBtn.classList.remove('show');
        homeBtn.classList.remove('show');
    }

    // Handle gallery image click
    gallery.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (img && img.dataset.detailGallery) {
            const galleryId = img.dataset.detailGallery;
            loadDetailedGallery(galleryId);
        }
    });

    // Handle back button click (regresar a la galería anterior)
    backBtn.addEventListener('click', () => {
        restoreMainGallery();
    });

    // Handle home button click (regresar a la galería principal)
    homeBtn.addEventListener('click', () => {
        restoreMainGallery();
    });
});
