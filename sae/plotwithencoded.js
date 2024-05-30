d3.json('./data/gaussian20d/gaussian20d.json').then(function(data) {
        console.log(data)
        const width = 800;
        const height = 600;
        let r_small = 5
        let r_big = 10
      
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      
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
      
    
      
    // Draw lines connecting corresponding points
    const lines = svg.selectAll("line")
    .data(data.data)
    .enter()
    .append("line")
    .attr("x1", d => x(d[0]))
    .attr("y1", d => y(d[1]))
    .attr("x2", (d, i) => x(data.reconstructed[i][0]))
    .attr("y2", (d, i) => y(data.reconstructed[i][1]))
    .attr("stroke", "grey")
    .attr("stroke-width", 1);

    // Plot reconstructed points
    const reconstructedPoints = svg.selectAll(".reconstructed-point")
    .data(data.reconstructed)
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
        const i = data.reconstructed.indexOf(d);
        d3.select(this).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge hovered reconstructed point
        d3.select(`.data-point-${i}`).attr("r", r_big).attr("opacity", 1).raise(); // Enlarge corresponding data point
        fillHeatmap(data.encoded[i]);
    })
    .on("mouseout", function(event, d) {
        const i = data.reconstructed.indexOf(d);
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
        fillHeatmap(data.encoded[i]);
    })
    .on("mouseout", function(event, d) {
        const i = data.data.indexOf(d);
        d3.select(this).attr("r", r_small).attr("opacity", 0.7); // Reset data point size
        d3.select(`.rec-point-${i}`).attr("r", r_small).attr("opacity", 0.7); // Reset corresponding reconstructed point size
        clearHeatmap();
    });

        

        
        // Heatmap setup
        const heatmap = d3.select("#heatmap")
          .style("width", "220px")
          .style("height", "220px")
          .style("display", "grid")
          .style("grid-template-columns", "repeat(20, 50px)")
          .style("grid-template-rows", "10px");
      
        // Initialize heatmap with white cells
        const size = 50;
        const cells = heatmap.selectAll("div")
          .data(d3.range(20))
          .enter()
          .append("div")
          .style("width", `${size}px`)
          .style("height", `${size}px`)
          .style("background-color", "white")
          .style("border", "1px solid lightgrey");
      
        function fillHeatmap(data) {
            console.log(d3.extent(data))
          const color = d3.scaleSequential(d3.interpolateYlGnBu)
            .domain([3,0]);
      
          heatmap.selectAll("div")
            .data(data)
            .style("background-color", d => color(d));
        }
      
        function clearHeatmap() {
          heatmap.selectAll("div")
            .style("background-color", "white");
        }

        function zoomed(event) {
            const transform = event.transform;
            const newX = transform.rescaleX(x);
            const newY = transform.rescaleY(y);

            dataPoints.attr("cx", d => newX(d[0])).attr("cy", d => newY(d[1]));
            reconstructedPoints.attr("cx", d => newX(d[0])).attr("cy", d => newY(d[1]));

            lines
            .attr("x1", d => newX(d[0]))
            .attr("y1", d => newY(d[1]))
            .attr("x2", (d, i) => newX(data.reconstructed[i][0]))
            .attr("y2", (d, i) => newY(data.reconstructed[i][1]));
        }
        });
        