'use strict';
function Gallery(gallery) {
    if (!gallery) {
        throw new Error('No gallery found!');
    }
    // select the images we need
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');

    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');

    let currentImage;

    function openModal() {
        console.info('Opening modal... ');
        if (modal.matches('.open')) {
            console.info('Modal already open...');
            return; // stop the function from running... 
        }
        modal.classList.add('open');

        window.addEventListener('keyup', handleKeyUp);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);

    }

    function closeModal() {
        modal.classList.remove('open');

        window.removeEventListener('keyup', handleKeyUp);
        nextButton.removeEventListener('click', showNextImage);
        prevButton.removeEventListener('click', showPrevImage);
    }

    function handleClickOutside(e) {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    function handleKeyUp(e) {
        if (e.key === 'Escape') return closeModal();
        if (e.key === 'ArrowLeft') return showPrevImage();
        if (e.key === 'ArrowRight') return showNextImage();
    }

    function showPrevImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showImage(el) {
        if (!el) {
            console.info('no image to show');
            return;
        }
        console.log(el);
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;

        console.log(modal);
        currentImage = el;

        openModal();
    }

    // Open Modal
    images.forEach(image => image.addEventListener('click', (e) => showImage(e.currentTarget)));

    // Tab and Focus
    images.forEach(image =>
        image.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                showImage(e.currentTarget);
            }
        })
    )

    // close modal
    modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));

const gallery2 = Gallery(document.querySelector('.gallery2'));