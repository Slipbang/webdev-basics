'use strict';
import '../styles/styles.css';


function detectMobile() {
    const userAgent = navigator.userAgent;

    return !!(userAgent.match(/Android/i) ||
        userAgent.match(/webOS/i) ||
        userAgent.match(/iPhone/i) ||
        userAgent.match(/iPad/i) ||
        userAgent.match(/iPod/i) ||
        userAgent.match(/BlackBerry/i) ||
        userAgent.match(/Windows Phone/i)) && window.screen.width < 975;
}

const modalWin = document.createElement('div');
modalWin.classList.add('imgModalWin');
const container = document.createElement('div');
container.classList.add('modalDiv')
modalWin.appendChild(container);
const closeButton = document.createElement('button');
closeButton.innerHTML = '&times;';
container.appendChild(closeButton);
document.querySelector('body').appendChild(modalWin);
closeButton.setAttribute('aria-label', 'Close modal window');
closeButton.setAttribute('tabindex', '0');

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalWin.style.display === 'flex') {
        closeModal();
    }
});


const showBigPicture = (img) => {
    let cloneImg = img.cloneNode(true);
    const existingImg = container.querySelector('img');
    if (existingImg) existingImg.remove();
    container.appendChild(cloneImg);
    modalWin.style.display = 'flex';
};

const closeModal = () => {
    modalWin.style.display = 'none';
};

document.querySelector('main').addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG' && event.target.closest('main')) {
        showBigPicture(event.target);
    }
})

closeButton.addEventListener('click', closeModal);
modalWin.addEventListener('click', (event) => {
    if (event.target === modalWin) {
        closeModal();
    }
});

const createNav = (section, headers4) => {
    const nav = document.createElement('nav');
    nav.classList.add(`${section.id.replace('Button', '')}`, 'displayNoneClass');
    headers4.forEach(header4 => {
        if (header4.id) {
            const link = document.createElement('a');
            link.href = `#${header4.id}`;
            link.textContent = header4.textContent;
            nav.appendChild(link);
        }
    })

    return nav;
}

const buildNavigation = (section, navMenu, sideBar, navMenuButtons, headerLinks) => {
    const navigatorButton = document.createElement('button');
    const header1 = section.querySelector('section > h2');

    const a = document.createElement('a');
    a.href = `#${header1.id}`;
    a.textContent = header1.textContent;
    headerLinks.appendChild(a);

    navigatorButton.textContent = header1.textContent.replace('Основы ', '');
    navigatorButton.id = `${section.id}Button`;

    navMenuButtons.appendChild(navigatorButton)

    const subSections = [...section.querySelectorAll('section > section')].filter(section => section.hasAttribute('id'));

    if (subSections.length) {
        const subNav = document.createElement('nav');
        subNav.classList.add(`${section.id.replace('Button', '')}`, 'displayNoneClass');
        subSections.forEach(subSection => {
            const header3 = subSection.querySelector('section > h3');
            const subNavigatorButton = document.createElement('button');

            subNavigatorButton.textContent = header3.textContent.replace('Основы ', '');
            subNavigatorButton.id = `${subSection.id}Button`;

            subNav.appendChild(subNavigatorButton);

            navMenu.appendChild(subNav);

            const subHeaders4 = subSection.querySelectorAll('h4');

            const nav = createNav(subSection, subHeaders4);

            navMenu.appendChild(nav.cloneNode(true));
            if (!detectMobile()) sideBar.appendChild(nav.cloneNode(true));
        })
    } else {
        const headers4 = section.querySelectorAll('h4');
        const nav = createNav(section, headers4);
        navMenu.appendChild(nav.cloneNode(true));
        if (!detectMobile()) sideBar.appendChild(nav.cloneNode(true));
    }
}

const navMenu = document.querySelector('#navMenu');
const navMenuButtons = document.querySelector('#navMenuButtons');
const headerLinks = document.querySelector('.headerLinks');
const sections = document.querySelectorAll('main > div > section');
const sideBar = document.querySelector('.sideBarContainer');
sections.forEach(section => buildNavigation(section, navMenu, sideBar, navMenuButtons, headerLinks));

const navs = document.querySelectorAll('.navButtonsStyles nav');
const clearStylesFunction = () => navs.forEach(item => item.classList.replace('displayFlexClass', 'displayNoneClass'));

const mainNavigation = document.querySelector('.navButtonsStyles');

mainNavigation.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const requiredClass = `.${event.target.id.replace('Button', '')}`;
        const requiredElement = document.querySelector(requiredClass);
        if (requiredElement.classList.contains('displayNoneClass')) {
            clearStylesFunction();
            requiredElement.classList.replace('displayNoneClass', 'displayFlexClass')
        }
    }
})

document.querySelector('#navButtons').addEventListener('click', () => {
    clearStylesFunction();
    mainNavigation.style.display = 'block';
});

const headerElems = [
    document.querySelector('main'),
    document.querySelector('aside'),
    document.querySelector('.headerLinks'),
    document.querySelector('h1')
];
headerElems.forEach(elem => elem.addEventListener('click', () => mainNavigation.style.display = 'none'));

//---------------------------------------------------------------------------------------------------------------------

let prevNav = null;
let prevClass = null;
const sideBarBuilder = (selectedClass) => {
    if (prevClass !== selectedClass) {
        const nav = document.querySelector(`aside > .sideBarContainer > .${selectedClass}`);
        nav.classList.remove('displayNoneClass');
        if (prevNav) prevNav.classList.add('displayNoneClass');
        prevNav = nav;
        prevClass = selectedClass;
    }
};

const anchorsH4 = document.querySelectorAll('h4');

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}


const anchorHandler = debounce((anchors, observer) => {
    anchors.forEach(anchor => {
        const id = anchor.target.id;

        if (id && !detectMobile() && anchor.isIntersecting) {
            let a = document?.querySelector(`nav > a[href*=${id}]`);
            const parentClass = a?.parentElement?.classList[0] || null;

            if (parentClass) sideBarBuilder(parentClass);
            history.replaceState(null, '', `#${id}`);
        }
    })
});

const anchorObserver = new IntersectionObserver(anchorHandler, {
    root: null,
    rootMargin: '0px 0px -50% 0px',
    threshold: 0.5,
});

anchorsH4.forEach(elem => anchorObserver.observe(elem));

//---------------------------------------------------------------------------------------------------------------------