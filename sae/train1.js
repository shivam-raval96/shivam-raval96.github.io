async function createAndTrainAutoencoder(learningRate, epochs, h_d) {
    const data = tf.randomNormal([1000, 100]);

    // Define the encoder
    const encoder = tf.sequential();
    encoder.add(tf.layers.dense({inputShape: [100], units: h_d, activation: 'relu'}));

    // Define the decoder
    const decoder = tf.sequential();
    decoder.add(tf.layers.dense({inputShape: [h_d], units: 100, activation: 'none'}));

    // Combine encoder and decoder into an autoencoder
    const autoencoder = tf.sequential();
    autoencoder.add(encoder);
    autoencoder.add(decoder);

    autoencoder.compile({
        optimizer: tf.train.adam(learningRate),
        loss: 'meanSquaredError'
    });

    await autoencoder.fit(data, data, {
        epochs: epochs,
        batchSize: 32,
        shuffle: true
    });

    const reconstructedData = autoencoder.predict(data);

    return {data, reconstructedData};
}

function plotData(originalData, reconstructedData) {
    const original2D = originalData.map(d => [d[0], d[1]]);
    const reconstructed2D = reconstructedData.map(d => [d[0], d[1]]);
    console.log(original2D,reconstructed2D)


    const originalTrace = {
        x: original2D.map(d => d[0]),
        y: original2D.map(d => d[1]),
        mode: 'markers',
        type: 'scatter',
        name: 'Original Data'
    };

    const reconstructedTrace = {
        x: reconstructed2D.map(d => d[0]),
        y: reconstructed2D.map(d => d[1]),
        mode: 'markers',
        type: 'scatter',
        name: 'Reconstructed Data'
    };

    Plotly.newPlot('originalDataPlot', [originalTrace], {title: 'Original Data'});
    Plotly.newPlot('reconstructedDataPlot', [reconstructedTrace], {title: 'Reconstructed Data'});
}

document.getElementById('trainButton').addEventListener('click', async () => {
    const learningRate = parseFloat(document.getElementById('learningRate').value);
    const epochs = parseInt(document.getElementById('epochs').value);
    const h_d = parseInt(document.getElementById('h_d').value);

    const {data, reconstructedData} = await createAndTrainAutoencoder(learningRate, epochs, h_d);
    plotData(data.arraySync(), reconstructedData.arraySync());
});




<>







  <h2>Sparse Autoencoder with Interactive Training</h2>
    <div>
        <label for="learningRate">Learning Rate: </label>
        <input type="number" id="learningRate" step="0.001" value="0.01">
    </div>
    <div>
        <label for="epochs">Epochs: </label>
        <input type="number" id="epochs" value="50">
    </div>
    <div>
      <label for="h_d">Bottleneck dim: </label>
      <input type="number" id="h_d" value="10">
  </div>
    <button id="trainButton">Train Autoencoder</button>
    <div id="originalDataPlot"></div>
    <div id="reconstructedDataPlot"></div>
  </div>    


  This is a great, but dense recap of SAE for transformers by <a href ="https://www.linkedin.com/in/tom-yeh/">Tom Yeh</a>:
  <img src="https://substack-post-media.s3.amazonaws.com/public/images/b00b036f-eb9c-40ae-8fbe-245b73ccefc2_540x720.gif">
    <br/>
</>


<h3>Reconstructing data with high dimensionality </h3>
<div class="l-page"> 
  
<div class="button-bar">
  <button class="button active" title="Data sampled from a unit normal distirbuion in 20D"  data-distribution="gaussian20d" onclick=updateImage2("gaussian20d")>Gaussian20D</button>
  <button class="button" data-distribution="3gaussian20d" onclick="updateImage2()">3 Gaussians in 20D </button>
  <button class="button" data-distribution="5spokes20d" onclick="updateImage2()">5 Spokes in 20D </button>

  <div class="slider-container">
    <br/>
    <label for="d-slider2">Hidden dimension:</label>
    <input type="range" id="d-slider2" min="0" max="9" step="1"  value="2" oninput=updateImage2()>
    <span id="d-value2">2</span>
    <br/>
    <label for="l-slider2">lambda:</label>
    <input type="range" id="l-slider2" min="0" max="8" step="1" value="0" oninput=updateImage2()>
    <span id="l-value2">1e-2</span>
  </div>
  <div class="image-container2">
    <img id="display-img2" src="img/gaussian20d/10_0.005.png" width="60%" alt="[Move the slider if loading fails]">
  </div>
  <script src="slider2.js"></script>