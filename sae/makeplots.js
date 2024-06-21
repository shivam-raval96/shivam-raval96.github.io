document.addEventListener("DOMContentLoaded", function() {
    let currentD = 20;
    let currentL = 0.01;

    // Initial load
    loadData('circle2d', '0');
    loadData('3x3spokes2', '1');


    function updateData() {
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                loadData(this.getAttribute('data'), '1');
            });
        });
    }

    function makeFeatDirectionsPlot(data, index){
        d3.select("#feat_directions_"+ index).selectAll("*").remove();
        const colors = ['crimson','steelblue','darkgreen', 'salmon', 'green', 'lightblue', 'pink', 'lightgreen', 'navy']
        // Set dimensions
        const width = 100;
        const height = 150;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        const svg = d3.select("#feat_directions_"+ index)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

            let [xExtent1,xExtent2] = d3.extent(data, d => d[0])
            let [yExtent1,yExtent2] = d3.extent(data, d => d[1])

        let maxVal = (d3.max([Math.abs(xExtent1),Math.abs(xExtent2),Math.abs(yExtent1),Math.absyExtent2]))
        // Create scales
        const xScale = d3.scaleLinear()
            .domain([-maxVal,maxVal])
            .range([0, width - margin.left - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([-maxVal,maxVal])
            .range([height - margin.top - margin.bottom, 0]);

        let scaler = 1
        // Create lines
        svg.selectAll(".line")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", (d, i) => xScale(0))
            .attr("y1", (d, i) => yScale(0))
            .attr("x2", (d, i) => xScale(scaler*d[0]))
            .attr("y2", (d, i) => yScale(scaler*d[1]))
            .attr("stroke", (d, i) => colors[(i + 1)%9]);

        // Create points
        svg.selectAll(".point")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(scaler*d[0]))
            .attr("cy", d => yScale(scaler*d[1]))
            .attr("r", 5)
            .attr("fill", (d, i) => colors[i%9])
            .attr("class", "point");
    }
    function loadData(dataFile, index) {
        d3.json('./data/' + dataFile + '.json').then(function(data) {
            const width = 400;
            const height = 300;
            let r_small = 5;
            let r_big = 15;

            const dValues = data.h_dims;
            const lValues = data.lambdas;


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

            d3.select("#scatterplot_" + index).selectAll("*").remove();
            const svg = d3.select("#scatterplot_" + index)
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
            updatePlot(currentD, currentL, index);

            // Sliders
            const dSlider = d3.select("#d-slider_" + index);
            const lSlider = d3.select("#l-slider_" + index);

            dSlider.on("input", function() {
                currentD = dValues[+this.value];
                d3.select("#d-value_" + index).text(currentD);
                updatePlot(currentD, currentL, index);
            });

            lSlider.on("input", function() {
                currentL = lValues[+this.value];
                d3.select("#l-value_" + index).text(currentL);
                updatePlot(currentD, currentL, index);
            });

            function updatePlot(d, l, index) {
                const key = `${d}_${l}`;
                makeFeatDirectionsPlot(data[key].directions, index)
                const reconstructed = data[key].reconstructed;
                const encoded = data[key].encoded;
                const maxEnc = d3.max(encoded, function(row) {
                    return d3.max(row);
                });
                const minEnc = d3.min(encoded, function(row) {
                    return d3.min(row);
                });
                const cmapRange = [maxEnc, minEnc];

                // Clear previous elements
                svg.selectAll("*").remove();
                d3.select("#heatmap_" + index).selectAll("*").remove();

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

                

                // Plot data points
                const dataPoints = svg.selectAll(".data-point")
                    .data(data.data)
                    .enter()
                    .append("circle")
                    .attr("class", (d, i) => `data-point data-point-${i}`)
                    .attr("cx", d => x(d[0]))
                    .attr("cy", d => y(d[1]))
                    .attr("r", r_small*1.3)
                    .attr("fill", "lightsteelblue")
                    .attr("opacity", 0.7)
                    .attr("stroke", "black")
                    .attr("stroke-width", 0.3)
                    .style("z-index", 0)
                    .on("mouseover", function(event, d) {
                        const i = data.data.indexOf(d);
                        d3.select(this).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge hovered data point
                        d3.select(`.rec-point-${i}`).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge corresponding reconstructed point
                        fillHeatmap(encoded[i], currentD, cmapRange);
                    })
                    .on("mouseout", function(event, d) {
                        const i = data.data.indexOf(d);
                        d3.select(this).attr("r", r_small).attr("opacity", 0.7); // Reset data point size
                        d3.select(`.rec-point-${i}`).attr("r", r_small).attr("opacity", 0.7); // Reset corresponding reconstructed point size
                        clearHeatmap();
                    });

                // Plot reconstructed points
                const reconstructedPoints = svg.selectAll(".reconstructed-point")
                .data(reconstructed)
                .enter()
                .append("circle")
                .attr("class", (d, i) => `reconstructed-point rec-point-${i}`)
                .attr("cx", d => x(d[0]))
                .attr("cy", d => y(d[1]))
                .attr("r", r_small*0.7)
                .attr("fill", "#ff6666")
                .attr("opacity", 0.7)
                .attr("stroke", "black")
                .attr("stroke-width", 0.3)
                .style("z-index", 3)
                .on("mouseover", function(event, d) {
                    const i = reconstructed.indexOf(d);
                    d3.select(this).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge hovered reconstructed point
                    d3.select(`.data-point-${i}`).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge corresponding data point
                    fillHeatmap(encoded[i], currentD, cmapRange);
                })
                .on("mouseout", function(event, d) {
                    const i = reconstructed.indexOf(d);
                    d3.select(this).attr("r", r_small).attr("opacity", 0.7); // Reset reconstructed point size
                    d3.select(`.data-point-${i}`).attr("r", r_small).attr("opacity", 0.7); // Reset corresponding data point size
                    clearHeatmap();
                });

                // Heatmap setup
                let n = 10
                const columns = d > n ? Math.ceil(d / n) : 1;
                const rows = Math.min(d, n);

                const heatmap = d3.select("#heatmap_" + index)
                    .style("width", `${columns * 50}px`)
                    .style("height", `${rows * 25}px`)  // Adjust height based on rows
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

            // Add legend
            if (d3.select("#legend svg").empty()) {
                const legendHeight = 200;
                const legendWidth = 20;
                const legendMargin = { top: 25, bottom: 25 };

                const legendSvg = d3.select("#legend")
                    .append("svg")
                    .attr("width", legendWidth + 150)  // Increased width to provide space for the labels
                    .attr("height", legendHeight + legendMargin.top + legendMargin.bottom)
                    .append("g")
                    .attr("transform", `translate(70,${legendMargin.top})`);  // Translate to center the gradient

                const legendScale = d3.scaleLinear()
                    .domain([3, 0])  // Match the color scale domain
                    .range([legendHeight, 0]);

                const legendAxis = d3.axisRight(legendScale)
                    .ticks(6);

                const gradient = legendSvg.append("defs")
                    .append("linearGradient")
                    .attr("id", "gradient")
                    .attr("x1", "0%")
                    .attr("y1", "100%")
                    .attr("x2", "0%")
                    .attr("y2", "0%");

                gradient.append("stop")
                    .attr("offset", "0%")
                    .attr("stop-color", d3.interpolateYlGnBu(1));
                gradient.append("stop")
                    .attr("offset", "25%")
                    .attr("stop-color", d3.interpolateYlGnBu(0.75));
                gradient.append("stop")
                    .attr("offset", "50%")
                    .attr("stop-color", d3.interpolateYlGnBu(0.5));
                gradient.append("stop")
                    .attr("offset", "75%")
                    .attr("stop-color", d3.interpolateYlGnBu(0.25));
                gradient.append("stop")
                    .attr("offset", "100%")
                    .attr("stop-color", d3.interpolateYlGnBu(0));

                legendSvg.append("rect")
                    .attr("width", legendWidth - 1)
                    .attr("height", legendHeight)
                    .style("fill", "url(#gradient)");

                // Add labels
                legendSvg.append("text")
                    .attr("x", legendWidth / 2)
                    .attr("y", legendHeight + legendMargin.bottom)
                    .attr("dy", "-0.3em")
                    .style("text-anchor", "middle")
                    .text("Low activation");

                legendSvg.append("text")
                    .attr("x", legendWidth / 2)
                    .attr("y", -legendMargin.top)
                    .attr("dy", "0.7em")
                    .style("text-anchor", "middle")
                    .text("High activation");
            }
        });
    }
});
