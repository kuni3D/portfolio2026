document.addEventListener('DOMContentLoaded', () => {
    // === ELEMENTOS DEL DOM ===
    const mailButton = document.querySelector('.mail');
    const copyMessage = document.querySelector('.copy-message');
    const gallery = document.querySelector('.gallery');
    const backBtn = document.querySelector('.back-btn');
    const homeBtn = document.querySelector('.home-btn');
    const galleryDescContainer = document.querySelector('.gallery-desc-container');
    const creditsContainer = document.querySelector('.gallery-credits-container');
    const langBtn = document.querySelector('.lang-btn');
    const langMenu = document.querySelector('.lang-menu');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');

    if (!mailButton || !gallery || !backBtn || !homeBtn || !galleryDescContainer || !creditsContainer || !langBtn || !langMenu || !modal || !modalContent || !closeModal) {
        console.error('Faltan elementos en el DOM');
        return;
    }

    // === VARIABLES GLOBALES ===
    let currentLang = 'es';
    let currentGalleryId = null;
    let mainGallery = []; // Se llenará después

    // === GALERÍAS DETALLADAS ===
    let detailedGalleries = {
        galeria1: { content: ['./imagenes/pancake.png', './videos/pancake1 (1).mp4', './imagenes/pancake2.png', './imagenes/pancake3.png', './imagenes/pancake4.png', './imagenes/pancake5.png'], desc: '' },
        galeria2: { content: ['./imagenes/image2.png', './imagenes/image.png', './imagenes/image3.png'], desc: '' },
        galeria3: { content: ['./imagenes/R03.png', './imagenes/R04.png', './videos/Render Fight 1.mp4', './videos/0001-0165.mp4', './videos/Render Fight 2.mp4', './videos/habitacion1.mp4', './imagenes/BLENDER1.png'], desc: '' },
        galeria4: { content: ['./imagenes/rubia1.jpg', './imagenes/rubia2.jpg'], desc: '' },
        galeria5: { content: ['./imagenes/deepchat2.png', './imagenes/deepchat3.png', './imagenes/deepchat4.png'], desc: '' },
        galeria6: { content: ['./imagenes/raze2.png', './videos/raze1.mp4', './videos/raze2.mp4', './videos/raze3.mp4', './videos/raze4.mp4'], desc: '' },
        galeria7: { content: ['./imagenes/robot construccion.jpg', './videos/Chasm Call pwnisher challenge.mp4', './imagenes/robot construccion2.jpg'], desc: '' },
        galeria8: { content: ['./imagenes/blueball.jpg'], desc: '' },
        galeria9: { content: ['./imagenes/gatito.jpg', './imagenes/gatito2.jpg', './imagenes/gatito3.jpg'], desc: '' },
        galeria10: { content: ['./imagenes/Yumel.png'], desc: '' }
    };

    // === ESTILO DE TEXTO UNIFICADO (LTR + RTL safe) ===
    const textStyle = 'font-family: "Inter", sans-serif; font-size: 0.9em; color: #8E8E8E; margin: 10px 0; direction: ltr; unicode-bidi: embed; text-align: center;';

    // === ACTUALIZAR IDIOMA ===
    function updateLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        const profileDesc = document.querySelector('.profile-desc');
        const backBtnText = document.querySelector('.back-btn');
        const signature = document.querySelector('.signature');
        const mailBtn = document.querySelector('.mail');
        const artstationBtn = document.querySelector('.artstation');
        const devlogBtn = document.querySelector('.devlog');
        const copyMsg = document.querySelector('.copy-message');

        if (!profileDesc || !backBtnText || !signature || !mailBtn || !artstationBtn || !devlogBtn || !copyMsg) return;

        profileDesc.textContent = translations[lang].profileDesc;
        backBtnText.textContent = translations[lang].backBtn;
        signature.textContent = translations[lang].signature;
        mailBtn.firstChild.textContent = translations[lang].mail;
        artstationBtn.firstChild.textContent = translations[lang].artstation;
        devlogBtn.firstChild.textContent = translations[lang].devlog;
        copyMsg.textContent = translations[lang].copied;

        // Actualizar descripciones
        detailedGalleries = Object.fromEntries(
            Object.entries(detailedGalleries).map(([key, value]) => {
                const num = key.replace('galeria', '');
                const t = translations[lang][`gallery${num}`] || '';
                return [key, {
                    content: value.content,
                    desc: (t && typeof t === 'object' && t.para1 && t.para2) ? { para1: t.para1, para2: t.para2 } : t
                }];
            })
        );

        if (currentGalleryId) loadDetailedGallery(currentGalleryId);
    }

    // === COPIAR EMAIL ===
    mailButton.addEventListener('click', () => {
        const email = mailButton.dataset.copy;
        if (email) {
            navigator.clipboard.writeText(email).then(() => {
                copyMessage.classList.add('show');
                setTimeout(() => copyMessage.classList.remove('show'), 2000);
            });
        }
    });

    // === CARGAR GALERÍA DETALLADA ===
    function loadDetailedGallery(galleryId) {
        currentGalleryId = galleryId;
        const data = detailedGalleries[galleryId];
        if (!data) return;

        gallery.classList.add('detailed');
        gallery.innerHTML = '';
        galleryDescContainer.innerHTML = '';
        galleryDescContainer.classList.add('show');

        // Descripción
        if (typeof data.desc === 'object' && data.desc.para1) {
            const p1 = document.createElement('p');
            p1.textContent = data.desc.para1;
            p1.style.cssText = textStyle;
            galleryDescContainer.appendChild(p1);

            const p2 = document.createElement('p');
            p2.textContent = data.desc.para2;
            p2.style.cssText = textStyle;
            galleryDescContainer.appendChild(p2);
        } else if (data.desc) {
            const p = document.createElement('p');
            p.textContent = data.desc;
            p.style.cssText = textStyle;
            galleryDescContainer.appendChild(p);
        }

        // === CRÉDITOS Y ENLACE (solo galeria1) ===
        if (galleryId === 'galeria1') {
            const t = translations[currentLang].gallery1;
            if (t?.credits && t?.play) {
                creditsContainer.innerHTML = '';

                const credits = document.createElement('p');
                credits.textContent = t.credits;
                credits.style.cssText = textStyle.replace('0.9em', '0.8em') + 'color: #6E6E6E; font-style: italic;';
                creditsContainer.appendChild(credits);

                const link = document.createElement('a');
                link.href = t.play.split(': ')[1]?.trim() || '#';
                link.textContent = t.play;
                link.target = '_blank';
                link.rel = 'noopener';
                link.style.cssText = textStyle + 'color: #00aaff; text-decoration: underline;';
                creditsContainer.appendChild(link);

                creditsContainer.classList.add('show');
            }
        } else {
            creditsContainer.classList.remove('show');
            creditsContainer.innerHTML = '';
        }

        // Cargar contenido
        data.content.forEach(src => {
            if (src.endsWith('.mp4')) {
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.preload = 'metadata';
                video.style.width = '100%';
                gallery.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Imagen de ${galleryId}`;
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    modalContent.src = src;
                    modal.style.display = 'block';
                });
                gallery.appendChild(img);
            }
        });

        // Forzar LTR en botones
        backBtn.style.cssText = 'direction: ltr; unicode-bidi: embed;';
        homeBtn.style.cssText = 'direction: ltr; unicode-bidi: embed;';

        backBtn.classList.add('show');
        homeBtn.classList.add('show');
    }

    // === RESTAURAR GALERÍA PRINCIPAL ===
    function restoreMainGallery() {
        currentGalleryId = null;
        gallery.classList.remove('detailed');
        gallery.innerHTML = '';
        galleryDescContainer.innerHTML = '';
        galleryDescContainer.classList.remove('show');
        creditsContainer.classList.remove('show');
        creditsContainer.innerHTML = '';

        backBtn.style.cssText = '';
        homeBtn.style.cssText = '';

        mainGallery.forEach(clone => {
            const img = clone.cloneNode(true);
            gallery.appendChild(img);
        });

        backBtn.classList.remove('show');
        homeBtn.classList.remove('show');
        modal.style.display = 'none';
    }

    // === EVENTOS DE GALERÍA ===
    gallery.addEventListener('click', e => {
        const img = e.target.closest('img');
        if (img?.dataset.detailGallery) {
            loadDetailedGallery(img.dataset.detailGallery);
        }
    });

    backBtn.addEventListener('click', restoreMainGallery);
    homeBtn.addEventListener('click', restoreMainGallery);

    // === MENÚ DE IDIOMAS ===
    langBtn.addEventListener('click', e => {
        e.stopPropagation();
        langMenu.classList.toggle('show');
    });

    langMenu.querySelectorAll('div').forEach(item => {
        item.addEventListener('click', e => {
            e.stopPropagation();
            updateLanguage(item.dataset.lang);
            langMenu.classList.remove('show');
        });
    });

    // === GUARDAR GALERÍA PRINCIPAL (con atributos) ===
    function initMainGallery() {
        mainGallery = Array.from(document.querySelectorAll('.gallery[data-gallery="main"] img')).map(original => {
            const clone = original.cloneNode(true);
            Array.from(original.attributes).forEach(attr => {
                clone.setAttribute(attr.name, attr.value);
            });
            return clone;
        });
    }

    // === INICIALIZAR TODO ===
    updateLanguage(currentLang);
    requestAnimationFrame(() => setTimeout(initMainGallery, 50));

    // === MODAL ===
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', () => langMenu.classList.remove('show'));
});
