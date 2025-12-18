const card1Button = document.querySelector('.card1 button');
card1Button.addEventListener('click', () => {
    const section = document.getElementById('aboutus');
    section.scrollIntoView({behavior: 'smooth'});
})