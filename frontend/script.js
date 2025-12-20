const card1Button = document.querySelector('.card1 button');
card1Button.addEventListener('click', () => {
    const section = document.getElementById('aboutus');
    section.scrollIntoView({behavior: 'smooth'});
})

const tipCard = document.querySelector('.card3 button');
tipCard.addEventListener('click', () => {
    const section = document.getElementById('sustainabletips');
    section.scrollIntoView({behavior: 'smooth'}); 
})
