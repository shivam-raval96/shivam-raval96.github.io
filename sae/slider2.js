

const dValues2 = [2,5,10,15,20,25,30,35,40,50];
const lValues2 = [0,0.01,0.008,0.005,0.002,0.001,8e-4,5e-4,1e-4];


function updateImage2() {
    const dSlider = document.getElementById('d-slider2');
    const lSlider = document.getElementById('l-slider2');
    const dValue = document.getElementById('d-value2');
    const lValue = document.getElementById('l-value2');
    const displayImg = document.getElementById('display-img2');
    const activeButton = document.querySelector('.button-bar .active');
    const distribution = activeButton.getAttribute('data-distribution');
    
   
    const dIndex = parseInt(dSlider.value) ;
    const lIndex = parseInt(lSlider.value) ;
    console.log(dIndex,lIndex)

    const d = dValues2[dIndex];
    const l = lValues2[lIndex];

    dValue.textContent = d;
    lValue.textContent = l;
    console.log('img/'+distribution+'/'+d+'_'+l+'.png')
    displayImg.src = 'img/'+distribution+'/'+d+'_'+l+'.png';
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        updateImage2();
    });
});

updateImage2();
