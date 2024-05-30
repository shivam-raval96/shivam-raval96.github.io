
let currentData = 'gaussian20d';
let currentD = 2;
let currentL = 1;
// Initial load
loadData(currentData);
updateData()

function updateData() {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadData(this.getAttribute('data'))

        });
    });
}


function loadData(dataFile) {
    d3.json('./data/'+dataFile+'.json').then(function(data) {
        const width = 600;
        const height = 400;
        let r_small = 5;
        let r_big = 10;

        const dValues = [2, 5, 10, 15, 20, 25, 30, 35, 40];
        const lValues = [1,0.5,0.1,0.05,0.01,0.008,0.005,0.002,0.001,8e-4,5e-4,1e-4, 0];
    
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    
        function zoomed(event) {
            const transform = event.transform;
            const newX = transform.rescaleX(x);
            const newY = transform.rescaleY(y);
    
            dataPoints.attr("cx", d => newX(d[0])).attr("cy", d => newY(d[1]));
            reconstructedPoints.attr("cx", d => newX(d[0])).attr("cy", d => newY(d[1]));
    
            lines
                .attr("x1", d => newX(d[0]))
                .attr("y1", d => newY(d[1]))
                .attr("x2", (d, i) => newX(reconstructed[i][0]))
                .attr("y2", (d, i) => newY(reconstructed[i][1]));
        }
        d3.select("#scatterplot").selectAll("*").remove();
        const svg = d3.select("#scatterplot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .call(d3.zoom().scaleExtent([0.5, 20]).on("zoom", zoomed))
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    
        const x = d3.scaleLinear()
            .domain(d3.extent(data.data, d => d[0]))
            .range([0, width]);
    
        const y = d3.scaleLinear()
            .domain(d3.extent(data.data, d => d[1]))
            .range([height, 0]);
    
        // Initialize the plot with default values
        updatePlot(currentD, currentL);
    
        // Sliders
        const dSlider = d3.select("#d-slider0");
        const lSlider = d3.select("#l-slider0");
    
        dSlider.on("input", function() {
            currentD = dValues[+this.value];
            d3.select("#d-value0").text(currentD);
            updatePlot(currentD, currentL);
        });
    
        lSlider.on("input", function() {
            currentL = lValues[+this.value];
            d3.select("#l-value0").text(currentL);
            updatePlot(currentD, currentL);
        });
    
        function updatePlot(d, l) {
            const key = `${d}_${l}`;
            const reconstructed = data[key].reconstructed;
            const encoded = data[key].encoded;
            var maxEnc = d3.max(encoded, function(row) {
                return d3.max(row);
              });
            var minEnc = d3.min(encoded, function(row) {
                return d3.min(row);
              });
            const cmapRange = [maxEnc, minEnc]
            console.log(cmapRange)

          
    
            // Clear previous elements
            svg.selectAll("*").remove();
            d3.select("#heatmap").selectAll("*").remove();
    
            // Draw lines connecting corresponding points
            const lines = svg.selectAll("line")
                .data(data.data)
                .enter()
                .append("line")
                .attr("x1", d => x(d[0]))
                .attr("y1", d => y(d[1]))
                .attr("x2", (d, i) => x(reconstructed[i][0]))
                .attr("y2", (d, i) => y(reconstructed[i][1]))
                .attr("stroke", "grey")
                .attr("stroke-width", 1);
    
            // Plot reconstructed points
            const reconstructedPoints = svg.selectAll(".reconstructed-point")
                .data(reconstructed)
                .enter()
                .append("circle")
                .attr("class", (d, i) => `reconstructed-point rec-point-${i}`)
                .attr("cx", d => x(d[0]))
                .attr("cy", d => y(d[1]))
                .attr("r", r_small)
                .attr("fill", "#ff6666")
                .attr("opacity", 0.7)
                .attr("stroke", "black")
                .attr("stroke-width", 0.3)
                .on("mouseover", function(event, d) {
                    const i = reconstructed.indexOf(d);
                    d3.select(this).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge hovered reconstructed point
                    d3.select(`.data-point-${i}`).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge corresponding data point
                    fillHeatmap(encoded[i], currentD,cmapRange);
                })
                .on("mouseout", function(event, d) {
                    const i = reconstructed.indexOf(d);
                    d3.select(this).attr("r", r_small).attr("opacity", 0.7); // Reset reconstructed point size
                    d3.select(`.data-point-${i}`).attr("r", r_small).attr("opacity", 0.7); // Reset corresponding data point size
                    clearHeatmap();
                });
    
            // Plot data points
            const dataPoints = svg.selectAll(".data-point")
                .data(data.data)
                .enter()
                .append("circle")
                .attr("class", (d, i) => `data-point data-point-${i}`)
                .attr("cx", d => x(d[0]))
                .attr("cy", d => y(d[1]))
                .attr("r", r_small)
                .attr("fill", "lightsteelblue")
                .attr("opacity", 0.7)
                .attr("stroke", "black")
                .attr("stroke-width", 0.3)
                .on("mouseover", function(event, d) {
                    const i = data.data.indexOf(d);
                    d3.select(this).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge hovered data point
                    d3.select(`.rec-point-${i}`).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge corresponding reconstructed point
                    fillHeatmap(encoded[i], currentD,cmapRange);
                })
                .on("mouseout", function(event, d) {
                    const i = data.data.indexOf(d);
                    d3.select(this).attr("r", r_small).attr("opacity", 0.7); // Reset data point size
                    d3.select(`.rec-point-${i}`).attr("r", r_small).attr("opacity", 0.7); // Reset corresponding reconstructed point size
                    clearHeatmap();
                });
    
            // Heatmap setup
            const columns = d > 20 ? Math.ceil(d / 20) : 1;
            const rows = Math.min(d, 20 );
    
            const heatmap = d3.select("#heatmap")
                .style("width", `${columns * 50}px`)
                .style("height", `${rows * 20}px`)  // Adjust height based on rows
                .style("display", "grid")
                .style("grid-template-rows", `repeat(${rows}, 25px)`)  // Adjust number of rows based on rows
                .style("grid-template-columns", `repeat(${columns}, 50px)`);  // Adjust number of columns based on columns
    
            // Initialize heatmap with white cells
            const size = 25;
            const cells = heatmap.selectAll("div")
                .data(d3.range(d))
                .enter()
                .append("div")
                .style("width", `${size}px`)
                .style("height", `${size}px`)
                .style("background-color", "white")
                .style("border", "1px solid lightgrey");
    
            function fillHeatmap(data, d, cmapRange) {
                const color = d3.scaleSequential(d3.interpolateYlGnBu)
                    .domain(cmapRange);  // Adjust domain based on the expected range of your data
    
                heatmap.selectAll("div")
                    .data(data.slice(0, d))
                    .style("background-color", d => color(d));
            }
    
            function clearHeatmap() {
                heatmap.selectAll("div")
                    .style("background-color", "white");
            }
        }
    });

    
}

