document.addEventListener('DOMContentLoaded', () => {
    // Verificar si los elementos existen
    const mailButton = document.querySelector('.mail');
    const copyMessage = document.querySelector('.copy-message');
    const gallery = document.querySelector('.gallery');
    const backBtn = document.querySelector('.back-btn');
    const homeBtn = document.querySelector('.home-btn');
    const galleryDescContainer = document.querySelector('.gallery-desc-container');
    const langBtn = document.querySelector('.lang-btn');
    const langMenu = document.querySelector('.lang-menu');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');

    if (!mailButton || !gallery || !backBtn || !homeBtn || !galleryDescContainer || !langBtn || !langMenu || !modal || !modalContent || !closeModal) {
        console.error('Algunos elementos no se encontraron en el DOM:', {
            mailButton, gallery, backBtn, homeBtn, galleryDescContainer, langBtn, langMenu, modal, modalContent, closeModal
        });
        return;
    }

    // Establecer idioma inicial y estado de la galería
    let currentLang = 'es';
    let currentGalleryId = null;
    let detailedGalleries = {
        galeria1: {
            content: [
                './imagenes/pancake.png',
                './videos/pancake1 (1).mp4',
                './imagenes/pancake2.png',
            ],
            desc: {
                para1: translations[currentLang].gallery1.para1,
                para2: translations[currentLang].gallery1.para2
            }
        },
        galeria2: {
            content: [
                './imagenes/image2.png',
                './imagenes/image.png',
            ],
            desc: translations[currentLang].gallery2
        },
        galeria3: {
            content: [
                './imagenes/R03.png',
                './imagenes/R04.png',
                './videos/Render Fight 1.mp4',
                './videos/0001-0165.mp4',
                './videos/Render Fight 2.mp4',
                './videos/habitacion1.mp4',
                './imagenes/BLENDER1.png'
            ],
            desc: translations[currentLang].gallery3
        },
        galeria4: {
            content: [
                './imagenes/rubia1.jpg',
                './imagenes/rubia2.jpg',
            ],
            desc: translations[currentLang].gallery4
        },
        galeria5: {
            content: [
                './imagenes/deepchat2.png',
            ],
            desc: translations[currentLang].gallery5
        },
        galeria6: {
            content: [
                './imagenes/raze2.png',
                './videos/raze1.mp4',
                './videos/raze2.mp4',
                './videos/raze3.mp4',
                './videos/raze4.mp4'
            ],
            desc: translations[currentLang].gallery6
        },
        galeria7: {
            content: [
                './imagenes/robot construccion.jpg',
                './videos/Chasm Call pwnisher challenge.mp4',
                './imagenes/robot construccion2.jpg',
            ],
            desc: translations[currentLang].gallery7
        },
        galeria8: {
            content: [
                './imagenes/blueball.jpg',
            ],
            desc: translations[currentLang].gallery8
        },
        galeria9: {
            content: [
                './imagenes/gatito.jpg',
                './imagenes/gatito2.jpg',
                './imagenes/gatito3.jpg',
            ],
            desc: translations[currentLang].gallery9
        },
        galeria10: {
            content: [
                './imagenes/Yumel.png',
            ],
            desc: translations[currentLang].gallery10
        }
    };

    // Función para actualizar el idioma
    function updateLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        const profileDesc = document.querySelector('.profile-desc');
        const backBtnText = document.querySelector('.back-btn');
        const signature = document.querySelector('.signature');
        const mailBtn = document.querySelector('.mail');
        const artstationBtn = document.querySelector('.artstation');
        const devlogBtn = document.querySelector('.devlog');
        const copyMessage = document.querySelector('.copy-message');

        if (!profileDesc || !backBtnText || !signature || !mailBtn || !artstationBtn || !devlogBtn || !copyMessage) {
            console.error('Elementos de traducción no encontrados:', {
                profileDesc, backBtnText, signature, mailBtn, artstationBtn, devlogBtn, copyMessage
            });
            return;
        }

        profileDesc.textContent = translations[lang].profileDesc;
        backBtnText.textContent = translations[lang].backBtn;
        signature.textContent = translations[lang].signature;
        mailBtn.firstChild.textContent = translations[lang].mail;
        artstationBtn.firstChild.textContent = translations[lang].artstation;
        devlogBtn.firstChild.textContent = translations[lang].devlog;
        copyMessage.textContent = translations[lang].copied;

        detailedGalleries = Object.fromEntries(
            Object.entries(detailedGalleries).map(([key, value]) => {
                const translation = translations[lang][`gallery${key.slice(-1)}`];
                if (translation && typeof translation === 'object' && translation.para1 && translation.para2) {
                    return [key, {
                        content: value.content,
                        desc: {
                            para1: translation.para1,
                            para2: translation.para2
                        }
                    }];
                } else {
                    return [key, {
                        content: value.content,
                        desc: translation || ''
                    }];
                }
            })
        );

        if (currentGalleryId) {
            loadDetailedGallery(currentGalleryId);
        }
    }

    // Inicializar idioma
    updateLanguage(currentLang);

    // Copy email functionality
    mailButton.addEventListener('click', () => {
        const email = mailButton.getAttribute('data-copy');
        if (email) {
            navigator.clipboard.writeText(email).then(() => {
                copyMessage.classList.add('show');
                setTimeout(() => {
                    copyMessage.classList.remove('show');
                }, 2000);
            }).catch(err => console.error('Error copying to clipboard:', err));
        }
    });

    // Función para cargar galería específica
    function loadDetailedGallery(galleryId) {
        currentGalleryId = galleryId;
        const galleryData = detailedGalleries[galleryId];
        if (galleryData) {
            gallery.classList.add('detailed');
            gallery.innerHTML = '';
            galleryDescContainer.innerHTML = '';
            galleryDescContainer.classList.add('show');

            if (typeof galleryData.desc === 'object' && galleryData.desc.para1 && galleryData.desc.para2) {
                const para1 = document.createElement('p');
                para1.textContent = galleryData.desc.para1;
                para1.style.cssText = 'font-family: "Inter", sans-serif; font-size: 0.9em; color: #8E8E8E; margin-bottom: 10px;';
                const para2 = document.createElement('p');
                para2.textContent = galleryData.desc.para2;
                para2.style.cssText = 'font-family: "Inter", sans-serif; font-size: 0.9em; color: #8E8E8E; margin-bottom: 10px;';
                galleryDescContainer.appendChild(para1);
                galleryDescContainer.appendChild(para2);
            } else if (galleryData.desc) {
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
                    newImg.addEventListener('click', () => {
                        modalContent.src = src;
                        modal.style.display = 'block';
                    });
                    gallery.appendChild(newImg);
                }
            });

            backBtn.classList.add('show');
            homeBtn.classList.add('show');
        }
    }

    // Función para restaurar galería principal
    function restoreMainGallery() {
        currentGalleryId = null;
        gallery.classList.remove('detailed');
        gallery.innerHTML = '';
        galleryDescContainer.innerHTML = '';
        galleryDescContainer.classList.remove('show');
        mainGallery.forEach(img => gallery.appendChild(img.cloneNode(true)));
        backBtn.classList.remove('show');
        homeBtn.classList.remove('show');
        modal.style.display = 'none';
    }

    // Handle gallery image click
    gallery.addEventListener('click', (e) => {
        const img = e.target.closest('img');
        if (img && img.dataset.detailGallery) {
            const galleryId = img.dataset.detailGallery;
            loadDetailedGallery(galleryId);
        }
    });

    // Handle back button click
    backBtn.addEventListener('click', () => {
        restoreMainGallery();
    });

    // Handle home button click
    homeBtn.addEventListener('click', () => {
        restoreMainGallery();
    });

    // Language menu functionality
    langBtn.addEventListener('click', (e) => {
        e.preventDefault();
        langMenu.classList.toggle('show');
    });

    // Change language on menu item click
    langMenu.querySelectorAll('div').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = item.getAttribute('data-lang');
            updateLanguage(lang);
            langMenu.classList.remove('show');
        });
    });

    // Almacenar la galería principal inicial
    const mainGallery = Array.from(document.querySelectorAll('.gallery[data-gallery="main"] img'));
    if (!mainGallery.length) {
        console.error('No images found in main gallery');
    }

    // Cerrar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
