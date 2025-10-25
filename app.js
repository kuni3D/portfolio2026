document.addEventListener('DOMContentLoaded', () => {
    const mailButton = document.querySelector('.mail');
    const copyMessage = document.querySelector('.copy-message');
    const gallery = document.querySelector('.gallery');
    const backBtn = document.querySelector('.back-btn');
    const homeBtn = document.querySelector('.home-btn');
    const galleryDescContainer = document.querySelector('.gallery-desc-container'); // Contenedor para las descripciones

    // Definir las galerías específicas con sus descripciones
    const detailedGalleries = {
        galeria1: {
            content: [
                './imagenes/pancake.png',
                './videos/pancake1 (1).mp4',
                './imagenes/nueva2.jpg',
                './imagenes/nueva3.jpg',
                './imagenes/nueva4.jpg',
                './imagenes/nueva5.jpg'
            ],
            desc: {
                para1: 'Videojuego desarrollado en 3 días para la WomenGameJam2025.',
                para2: 'Lideré un equipo con 3 mujeres para que juntos completemos el juego lo más rápido posible. Escribí código, modelé, rigguié y animé.'
            }
        },
        galeria2: {
            content: [
                './imagenes/image2.png',
                './imagenes/image.png',

            ],
            desc: 'Fan Art de Yunara.'
        },
        galeria3: {
            content: [
                './imagenes/R03.png',
                './imagenes/R04.png',
                './videos/Render Fight 1.mp4',
                './videos/0001-0165.mp4',
                './videos/Render Fight 2.mp4',
                './videos/habitacion1.mp4'
            ],
            desc: 'Un luchador chibi, inspirado en un concept.'
        },
        galeria4: {
            content: [
                './imagenes/rubia1.jpg',
                './imagenes/rubia2.jpg',

            ],
            desc: 'Una cybergirl inspirada de varios concepts.'
        },
        galeria5: {
            content: [
                './imagenes/deepchat2.png',

            ],
            desc: 'Un cyborg styilized inspirado en DeepChat un personaje de un video de Youtube.'
        },
        galeria6: {
            content: [
                './imagenes/raze2.png',
                './videos/raze1.mp4',
                './videos/raze2.mp4',
                './videos/raze3.mp4',
                './videos/raze4.mp4'
            ],
            desc: 'Raze chibi, inspirada de los stickers de Valorant.'
        },
        galeria7: {
            content: [
                './imagenes/robot construccion.jpg',
                './videos/Chasm Call pwnisher challenge.mp4',
                './imagenes/robot construccion2.jpg',

            ],
            desc: 'Un robot rusty para el desafío de Pwnisher "Chasm Call".'
        },
        galeria8: {
            content: [
                './imagenes/blueball.jpg',

            ],
            desc: 'Un pequeño proyecto que desarrollé cuando empezaba con el 3D.'
        },
        galeria9: {
            content: [
                './imagenes/gatito.jpg',
                './imagenes/gatito2.jpg',
                './imagenes/gatito3.jpg',

            ],
            desc: 'Un gatito adorable para un videojuego de celular.'
        },
        galeria10: {
            content: [
                './imagenes/Yumel.png',

            ],
            desc: 'Solo un personaje que cree con lo que se me ocurría en el momento.'
        }
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
        const galleryData = detailedGalleries[galleryId];
        if (galleryData) {
            gallery.classList.add('detailed');
            gallery.innerHTML = ''; // Limpiar galería actual
            galleryDescContainer.innerHTML = ''; // Limpiar contenedor de descripción
            galleryDescContainer.classList.add('show'); // Mostrar contenedor

            // Añadir descripción
            if (galleryData.desc.para1 && galleryData.desc.para2) {
                const para1 = document.createElement('p');
                para1.textContent = galleryData.desc.para1;
                para1.style.cssText = 'font-family: "Inter", sans-serif; font-size: 0.9em; color: #8E8E8E; margin-bottom: 10px;';
                const para2 = document.createElement('p');
                para2.textContent = galleryData.desc.para2;
                para2.style.cssText = 'font-family: "Inter", sans-serif; font-size: 0.9em; color: #8E8E8E; margin-bottom: 10px;';
                galleryDescContainer.appendChild(para1);
                galleryDescContainer.appendChild(para2);
            } else {
                const para = document.createElement('p');
                para.textContent = galleryData.desc;
                para.style.cssText = 'font-family: "Inter", sans-serif; font-size: 0.9em; color: #8E8E8E; margin-bottom: 10px;';
                galleryDescContainer.appendChild(para);
            }

            galleryData.content.forEach(src => {
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
        galleryDescContainer.innerHTML = ''; // Limpiar contenedor de descripción
        galleryDescContainer.classList.remove('show'); // Ocultar contenedor
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
