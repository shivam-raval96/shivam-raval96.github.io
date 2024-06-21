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


  -----------------



<h2>[Redundant]Training an SAE on two dimensional gaussain data</h2>
<div class="l-page side"> 
  <div class="slider-container">
    <br/>
    <label for="d-slider">Hidden dimension:</label>
    <input type="range" id="d-slider" min="0" max="13" step="1"  value="2" oninput=updateImage("gaussian2d")>
    <span id="d-value">2</span>
    <br/>
    <label for="l-slider">lambda:</label>
    <input type="range" id="l-slider" min="0" max="12" step="1" value="0" oninput=updateImage("gaussian2d")>
    <span id="l-value">1e-2</span>
  </div>
  <div class="image-container">
    <img id="display-img" src="img/gaussian2d/10_0.005.png" width="100%" alt="[Move the slider if loading fails]">
  </div>
</div>
<div class="side">
  Let's train a SAE to reconstruct a Gaussian distribution \(\mathcal{N}(\mu = 0, \sigma = 1) \text{ in }\) in two dimensions. 
  The figures on the side show the original data (in blue) and the reconstructed data (in red) from a trained model for a range of hidden dimensions and the sparsity regularization parameter \( \lambda \)
  A datapoint and its reconstruction are connected by a thin grey line, as a visual aid.
  The lines in green are the learned feature directions. They are scaled by the activation value averaged across all inputs, i.e., \(\sum_{i=1}^M h_i\). If a feature direction is very small or near zero, its feature direction will not be prominent on the plot, and that feature is a "dead feature". It does not help in reconstruction
  <br/>
  <h4>Effect of sparsity regularization </h4>  High values enforces a stronger sparsity constraint on the hidden layer activations, encouraging most neurons to be inactive for any given input. As a result, the feature directions may become more distinct, but also result in many dead features. However, if \( \lambda \) is too high, it may hinder the SAE's ability to reconstruct the data accurately (not shown here).
 </div>

<script src="slider.js"></script>

<h2>Reconstructing data with high dimensionality</h2>
<div class="l-page button-bar"> 
<button class="button active" title="Data sampled from a unit normal distirbuion in 20D"  data="gaussian20d" onclick=updateData()>Gaussian20D</button>
<button class="button" data="3gaussian20d" onclick="updateData()">3 Gaussians in 20D </button>
<button class="button" data="5spokes20d" onclick="updateData()">5 Spokes in 20D </button>
<button class="button" data="20spokes10d" onclick="updateData()">20 Spokes in 10D </button>
<button class="button" data="sphere20d" onclick="updateData()">Spherical shell 20D </button>
<button class="button" data="circle2d" onclick="updateData()">Circle in 2D </button>
<button class="button" data="swiss3d" onclick="updateData()">Swiss roll in 3D </button>
<button class="button" data="cube10d" onclick="updateData()">Cube edges in 10D </button>
<button class="button" data="circle2dl1_0.5" onclick="updateData()">Circle with l1^1/2 </button>


</div>
<div class="slider-container">
  <br/>
  Hover on a point to view the hidden layer activations 
  <br/>
  <label for="d-slider_1">Hidden dimension:</label>
  <input type="range" id="d-slider_1" min="0" max="8" step="1"  value="4" >
  <span id="d-value_1">20</span>
  <br/>
  <label for="l-slider_1">lambda:</label>
  <input type="range" id="l-slider_1" min="0" max="12" step="1" value="4">
  <span id="l-value_1">0.01</span>
</div>

<div style="display: flex;">
  <div id="scatterplot"></div>
  <div id="heatmap"></div>
  <div id="legend"></div>

  </div>
</div>



</div>
</div>


<div class="l-page"> 
  [Hello its me]
  <iframe src="plots/plot_div.html" width="100%" height="400" style="border:none;"></iframe>

</div>
