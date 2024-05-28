

const dValues = [2,3,4,5,6,7,8,9,10,12,14,16,18,20];
const lValues = [1, 0.5, 0.1, 0.05, 0.01,0.008,0.005,0.002,0.001,8e-4,5e-4,1e-4, 0];


function updateImage(distribution) {
    const dSlider = document.getElementById('d-slider');
    const lSlider = document.getElementById('l-slider');
    const dValue = document.getElementById('d-value');
    const lValue = document.getElementById('l-value');
    const displayImg = document.getElementById('display-img');
    
   
    const dIndex = parseInt(dSlider.value) ;
    const lIndex = parseInt(lSlider.value) ;
    console.log(dIndex,lIndex)

    const d = dValues[dIndex];
    const l = lValues[lIndex];

    dValue.textContent = d;
    lValue.textContent = l;
    displayImg.src = 'img/'+distribution+'/'+d+'_'+l+'.png';
}



updateImage("gaussian2d");
