const card1Button = document.querySelector('.card1 button');
card1Button.addEventListener('click', () => {
    const section = document.getElementById('aboutus');
    section.scrollIntoView({behavior: 'smooth'});
})

const form = document.getElementById('crop-form');
if(form){
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            crop: document.getElementById('crop').value,
            temp: parseFloat(document.getElementById('temp').value),
            humidity: parseFloat(document.getElementById('humidity').value),
            rainfall: parseFloat(document.getElementById('rainfall').value),
            N: parseFloat(document.getElementById('N').value),
            P: parseFloat(document.getElementById('P').value),
            K: parseFloat(document.getElementById('K').value),
            ph: parseFloat(document.getElementById('ph').value)
        };
        try{
            const res = await fetch('http://127.0.0.1:5000', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            });

            const result = await res.json();
            document.getElementById('result').innerHTML = `
                <h3>Recommended Crop</h3>
                <pre>${JSON.stringify(result, null, 2)}</pre>
                `;
        }   catch (err) {
            document.getElementById('result').textContent = 'Error connecting to server!';
            console.error(err);
        }
    });
};
