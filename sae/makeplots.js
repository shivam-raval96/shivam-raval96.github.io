document.addEventListener("DOMContentLoaded", function() {

    // Initial load
    loadData('circle2d', '0', 25, 0.1);
    loadData('3x3spokes2', '1', 3, 0.3);
    const colors = ['crimson','steelblue','darkgreen', 'peru', 'navy', 'olive', 'gold', 'darkviolet', 'teal']


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
            .attr("stroke", (d, i) => colors[(i)%9]);

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
    function loadData(dataFile, index,currentD, currentL) {
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
                const transposedEncoded = d3.transpose(encoded);
                const maxValuesDim = transposedEncoded.map(col => d3.max(col));
                const maxEnc = d3.max(encoded, function(row) {
                    return d3.max(row);
                });
                const minEnc = d3.min(encoded, function(row) {
                    return d3.min(row);
                });
                const cmapRange = [minEnc, maxEnc];

                // Clear previous elements
                svg.selectAll("*").remove();
                d3.select("#barplot_" + index).selectAll("*").remove();

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
                        fillBarPlot(encoded[i], currentD, cmapRange);
                    })
                    .on("mouseout", function(event, d) {
                        const i = data.data.indexOf(d);
                        d3.select(this).attr("r", r_small).attr("opacity", 0.7); // Reset data point size
                        d3.select(`.rec-point-${i}`).attr("r", r_small).attr("opacity", 0.7); // Reset corresponding reconstructed point size
                        clearBarPlot();
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
                    fillBarPlot(encoded[i], currentD, cmapRange);
                })
                .on("mouseout", function(event, d) {
                    const i = reconstructed.indexOf(d);
                    d3.select(this).attr("r", r_small).attr("opacity", 0.7); // Reset reconstructed point size
                    d3.select(`.data-point-${i}`).attr("r", r_small).attr("opacity", 0.7); // Reset corresponding data point size
                    clearBarPlot();
                });


                // Bar plot setup
                const barPlot = d3.select("#barplot_" + index)
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);

                const xBarScale = d3.scaleBand()
                    .domain(d3.range(currentD))
                    .range([0, width - margin.left - margin.right])
                    .padding(0.2);

                const yBarScale = d3.scaleLinear()
                    .domain(cmapRange)
                    .range([height - margin.top - margin.bottom, 0]);

                    const xBarAxisBottom = d3.axisBottom(xBarScale).tickFormat((d, i) => "");
                    const xBarAxisTop = d3.axisTop(xBarScale).tickFormat((d, i) => "").tickSizeInner(0).tickSizeOuter(0);
                    const yBarAxisLeft = d3.axisLeft(yBarScale).tickFormat((d, i) => "").tickSizeInner(0).tickSizeOuter(0);
                    const yBarAxisRight = d3.axisRight(yBarScale).tickFormat((d, i) => "").tickSizeInner(0).tickSizeOuter(0);
                    
                    barPlot.append("g")
                        .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
                        .call(xBarAxisBottom)
                    
                    
                    barPlot.append("g")
                        .call(yBarAxisLeft);
                    
                    barPlot.append("g")
                        .attr("transform", `translate(0, 0)`)
                        .call(xBarAxisTop)
                    
                    barPlot.append("g")
                        .attr("transform", `translate(${width - margin.left - margin.right}, 0)`)
                        .call(yBarAxisRight);

                // Add x-axis label
                barPlot.append("text")
                .attr("x", (width - margin.left - margin.right) / 2)
                .attr("y", height- margin.top - margin.bottom)
                .attr("dy", "1.5em")
                .style("text-anchor", "middle")
                .text("Neuron number");

                // Add the max value bars in light grey
                barPlot.selectAll(".max-bar")
                    .data(maxValuesDim)
                    .enter()
                    .append("rect")
                    .attr("class", "max-bar")
                    .attr("x", (d, i) => xBarScale(i))
                    .attr("y", d => yBarScale(d))
                    .attr("width", xBarScale.bandwidth())
                    .attr("height", d => height - margin.top - margin.bottom - yBarScale(d))
                    .attr("fill", "#f0f0f0")
                    .attr("stroke", "black")
                    .attr("stroke-width", 1);

                function fillBarPlot(data, d, cmapRange) {
                    
                    yBarScale.domain(cmapRange);  // Adjust y domain based on the expected range of your data


                    barPlot.selectAll(".bar")
                        .data(data.slice(0, d))
                        .enter()
                        .append("rect")
                        .attr("class", "bar")
                        .attr("x", (d, i) => xBarScale(i))
                        .attr("y", d => yBarScale(d))
                        .attr("width", xBarScale.bandwidth())
                        .attr("height", d => height - margin.top - margin.bottom - yBarScale(d))
                        .attr("fill", (d, i) => colors[i%9])
                        .attr("stroke", "black")
                        .attr("stroke-width", 1);
                }

                function clearBarPlot() {
                    barPlot.selectAll(".bar").remove();
                }
            
            }

            
        });
    }
});
