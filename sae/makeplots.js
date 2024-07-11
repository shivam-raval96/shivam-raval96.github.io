document.addEventListener("DOMContentLoaded", function() {

    // Initial load
    loadData('circle2d', '0', 25, 0.1, false);
    loadData('3x3spokes2', '1', 3, 0.3, false);
    loadData('mixgauss', '2', 15, 0.3, false);
    loadData('kcircle2d', '3', 10, 0, 2);
    loadData('k3spokes', '4', 10, 0, 1);
    loadData('k16spokes', '5', 10, 0, 1);

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
        const height = 100;
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };

        const svg = d3.select("#feat_directions_"+ index)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

            let [xExtent1,xExtent2] = d3.extent(data, d => d[0])
            let [yExtent1,yExtent2] = d3.extent(data, d => d[1])

        let maxVal = (d3.max([Math.abs(xExtent1),Math.abs(xExtent2),Math.abs(yExtent1),Math.abs(yExtent2)]))
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
            .attr("stroke", (d, i) => colors[(i)%9])
            .attr("stroke-width", 3);
            ;

        // Create points
        svg.selectAll(".point")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(scaler*d[0]))
            .attr("cy", d => yScale(scaler*d[1]))
            .attr("r", 7)
            .attr("fill", (d, i) => colors[i%9])
            .attr("class", "point");
    }
    function loadData(dataFile, index,currentD, currentL, currentK) {
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
            updatePlot(currentD, currentL, currentK, index);

            // Sliders
            const dSlider = d3.select("#d-slider_" + index);
            const lSlider = d3.select("#l-slider_" + index);

            dSlider.on("input", function() {
                currentD = dValues[+this.value];
                d3.select("#d-value_" + index).text(currentD);
                updatePlot(currentD, currentL, currentK, index);
            });

            lSlider.on("input", function() {
                currentL = lValues[+this.value];
                d3.select("#l-value_" + index).text(currentL);
                updatePlot(currentD, currentL, currentK, index);
            });

            function updatePlot(d, l, k, index) {
                const insetWidth = 80;
                const insetHeight = 80;
                const insetMargin = { top: 10, right: 10, bottom: 10, left: 10 };

                function drawActiveDirections(encodedData, directions) {
                    insetPlot.selectAll("*").remove(); // Clear previous directions

                    let [xExtent1,xExtent2] = d3.extent(directions, d => d[0])
                    let [yExtent1,yExtent2] = d3.extent(directions, d => d[1])

                    let maxVal = (d3.max([Math.abs(xExtent1),Math.abs(xExtent2),Math.abs(yExtent1),Math.abs(yExtent2)]))
                    let maxEncVal = d3.max(encodedData)
                    
                    let scaler = 1


                    // Create scales for inset plot
                    const insetXScale = d3.scaleLinear()
                        .domain([-maxVal,maxVal])
                        .range([0, insetWidth ]);


                    const insetYScale = d3.scaleLinear()
                        .domain([-maxVal,maxVal])
                        .range([insetHeight, 0]);

                    // Add border for inset plot
                    insetPlot.append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", insetWidth)
                    .attr("height", insetHeight)
                    .attr("fill", "none")
                    .attr("stroke", "black");


                   
                    directions.forEach((dir, i) => {
                        const length = 0.8*encodedData[i]/maxEncVal; // Length of the direction line based on the encoded value
                        if (length > 0) {
                            insetPlot.append("line")
                                .attr("x1", insetXScale(0))
                                .attr("y1", insetYScale(0))
                                .attr("x2", insetXScale(length * dir[0]))
                                .attr("y2", insetYScale(length * dir[1]))
                                .attr("stroke", colors[i % 9])
                                .attr("stroke-width", 2);
                
                            insetPlot.append("circle")
                                .attr("cx", insetXScale(length * dir[0]))
                                .attr("cy", insetYScale(length * dir[1]))
                                .attr("r", 3)
                                .attr("fill", colors[i % 9]);
                        }
                    });
                }
                console.log(k)
                let key = `${d}_${l}`;
                if (k!=false){
                    key = key+`_${k}`;
                }
                console.log(key)
                makeFeatDirectionsPlot(data[key].directions, index)
                console.log(key, data)

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

                // Add inset plot for active directions
                const insetPlot = svg.append("g")
                .attr("transform", `translate(${width - insetWidth - margin.right+55}, ${height - insetHeight - margin.bottom +80})`)
                .attr("class", "inset-plot")
                .style("background-color", "white");

                

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
                        drawActiveDirections(encoded[i], data[key].directions);

                    })
                    .on("mouseout", function(event, d) {
                        const i = data.data.indexOf(d);
                        d3.select(this).attr("r", r_small).attr("opacity", 0.7); // Reset data point size
                        d3.select(`.rec-point-${i}`).attr("r", r_small).attr("opacity", 0.7); // Reset corresponding reconstructed point size
                        clearBarPlot();
                        insetPlot.selectAll("*").remove(); // Clear inset plot

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
                    drawActiveDirections(encoded[i], data[key].directions); 

                })
                .on("mouseout", function(event, d) {
                    const i = reconstructed.indexOf(d);
                    d3.select(this).attr("r", r_small).attr("opacity", 0.7); // Reset reconstructed point size
                    d3.select(`.data-point-${i}`).attr("r", r_small).attr("opacity", 0.7); // Reset corresponding data point size
                    clearBarPlot();
                    insetPlot.selectAll("*").remove(); // Clear inset plot

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

                console.log(data)

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
                    .attr("stroke-width", 1)
                    .on("mouseover", function(event, d) {
                        const barIndex = maxValuesDim.indexOf(d);
                        handleBarHover(barIndex, this);
                    })
                    .on("mouseout", handleBarHoverOut);

            const colorScale = d3.scaleSequential(d3.interpolateViridis)
                .domain([0, maxEnc]);

            // Create an opacity scale
            const opacityScale = d3.scaleLinear()
            .domain([0, maxEnc])
            .range([0.01, 1]); // Adjust this range as needed

            let currentHoveredBar = null;


            function handleBarHover(barIndex, barElement) {
                         // Reset previously hovered bar, if any
                        if (currentHoveredBar) {
                            d3.select(currentHoveredBar).attr("stroke-width", 1);
                        }
                        // Highlight the current hovered bar
                        currentHoveredBar = barElement;
                        d3.select(currentHoveredBar).attr("stroke-width", 3);

                        // Update data points color based on encoded value
                        //dataPoints.attr("fill", (d, i) => colorScale(encoded[i][barIndex] / maxEnc));
                        dataPoints.attr("fill", colors[barIndex % 9])
                            .attr("opacity", (d, i) => opacityScale(encoded[i][barIndex]));
                        // Make reconstructed points light grey with low opacity
                        reconstructedPoints
                            .attr("fill", "grey")
                            .attr("opacity", 0.01);
            
                        // Make connecting lines thinner
                        lines.attr("stroke-width", 0.05);
                    }

            function handleBarHoverOut() {
                        // Reset data points to original color
                        dataPoints
                            .attr("fill", "lightsteelblue")
                            .attr("opacity", 0.7);
            
                        // Reset reconstructed points
                        reconstructedPoints
                            .attr("fill", "#ff6666")
                            .attr("opacity", 0.7);
            
                        // Reset connecting lines
                        lines.attr("stroke-width", 1);
                        d3.select(currentHoveredBar).attr("stroke-width", 1);
                    }
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
                        .attr("stroke-width", 1)
                        .on("mouseover", function(event, d) {
                            const barIndex = maxValuesDim.indexOf(d);
                            handleBarHover(barIndex, this);
                        })
                        .on("mouseout", handleBarHoverOut);
                }

                function clearBarPlot() {
                    barPlot.selectAll(".bar").remove();
                }
            
            }

            
        });
    }
});
