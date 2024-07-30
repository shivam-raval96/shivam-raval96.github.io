document.addEventListener('DOMContentLoaded', function() {
    const width = 800;
    const height = 800;
    const margin = { top: 60, right: 20, bottom: 30, left: 40 };
    console.log("DOM fully loaded and parsed");

    const svg = d3.select("#lrp-scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("border", "1px solid black") // Add border to see SVG boundaries
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Add buttons
    const buttonContainer = d3.select("#lrp-scatterplot")
        .insert("div", "svg")
        .attr("class", "button-container")
        .style("margin-bottom", "10px");

    const datasets = ["claims", "eng2es", "cities"];
    buttonContainer.selectAll("button")
        .data(datasets)
        .enter()
        .append("button")
        .text(d => d)
        .attr("class", d => d === "claims" ? "active" : "")
        .on("click", function(event, d) {
            d3.selectAll("button").classed("active", false);
            d3.select(this).classed("active", true);
            loadDataset(d);
        });

        function calculatePerpendicularArrow(x1, y1, x2, y2, length) {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const angle = Math.atan2(dy, dx);
        
            // Perpendicular angle
            const perpAngle = angle + Math.PI / 2;
        
            // Arrow end points
            const startX = width/2 - Math.cos(perpAngle) * length / 2;
            const startY = height/2 - Math.sin(perpAngle) * length / 2;
            const endX = width/2 + Math.cos(perpAngle) * length / 2;
            const endY = height/2 + Math.sin(perpAngle) * length / 2;
        
            return { startX, startY, endX, endY };
        }
       
    function loadDataset(dataset) {
        d3.json(`data/${dataset}_data.json`).then(data => {
            console.log(data)

            if (!data || !data.points || !data.grid || !data.hyperplane) {
                console.error("Data structure is not as expected");
                return;
            }

            // Clear previous visualization
            svg.selectAll("*").remove();

            const xExtent = d3.extent(data.points, d => d.x);
            const yExtent = d3.extent(data.points, d => d.y);

            const xScale = d3.scaleLinear()
                .domain(xExtent)
                .range([0, width]);

            const yScale = d3.scaleLinear()
                .domain(yExtent)
                .range([height, 0]);

            // Draw pixelated background
            const gridSize = Math.sqrt(data.grid.length);
            const cellWidth = width / gridSize;
            const cellHeight = height / gridSize;

            svg.selectAll(".grid-cell")
                .data(data.grid)
                .enter().append("rect")
                .attr("class", "grid-cell")
                .attr("x", d => xScale(d.x) - cellWidth / 2)
                .attr("y", d => yScale(d.y) - cellHeight / 2)
                .attr("width", cellWidth)
                .attr("height", cellHeight)
                .attr("fill", d => d3.interpolateRdBu(d.confidence));

            // Draw decision boundary
            svg.append("line")
                .attr("x1", xScale(data.hyperplane.x1))
                .attr("y1", yScale(data.hyperplane.y1))
                .attr("x2", xScale(data.hyperplane.x2))
                .attr("y2", yScale(data.hyperplane.y2))
                .attr("stroke", "white")
                .attr("stroke-width", 2);

            // Create separate groups for points and labels
            const pointsGroup = svg.append("g").attr("class", "points-group");
            const labelsGroup = svg.append("g").attr("class", "labels-group");

            // Draw points
            const points = pointsGroup.selectAll(".point")
                .data(data.points)
                .enter().append("g")
                .attr("class", "point")
                .attr("transform", d => `translate(${xScale(d.x)},${yScale(d.y)})`);

            points.append("circle")
                .attr("r", 5)
                .attr("fill", d => d.label === 1 ? "#99d0f0" : "#f296a1")
                .attr("opacity", 0.7)
                .style("stroke", "black");

    // Specify indices of the data points to show
    const indicesToShow = [250, 100, 19, 60]; // Example indices

    // Filter the data points based on specified indices
    const filteredPoints = indicesToShow.map(index => data.points[index]);
    labelsGroup.selectAll(".point-text-container")
        .data(filteredPoints)
        .enter()
        .append("g")
        .attr("class", "point-text-container")
        .attr("transform", function(d) {
            const xPos = xScale(d.x);
            const yPos = yScale(d.y);
            const isLeftHalf = xPos < width / 2;
            const offset = 200; // Distance from point for labels on the left half

            if (isLeftHalf) {
                return `translate(${xPos}, ${yPos})`; // Position text on the left
            } else {
                return `translate(${xPos - offset}, ${yPos})`; // Position text on the right
            }
        })
        .each(function(d) {
            const textElement = d3.select(this).append("text")
                .attr("class", "point-text")
                .attr("dy", "0.35em")
                .text(d.text)
                .style("font-size", "13px");

            const bbox = textElement.node().getBBox();

            d3.select(this).insert("rect", "text")
                .attr("x", bbox.x - 4)
                .attr("y", bbox.y - 2)
                .attr("width", bbox.width + 8)
                .attr("height", bbox.height + 4)
                .style("fill", "white")
                .style("stroke", "black")
                .style("stroke-width", "1px");
        });

            // Hover functionality
            points.on("mouseover", function(event, d) {
                d3.select(this).select("circle").attr("r", 8);
                labelsGroup.selectAll(".point-text-container").style("opacity", 0);
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.text)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                d3.select(this).select("circle").attr("r", 5);
                labelsGroup.selectAll(".point-text-container").style("opacity", 1);
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

            // Calculate perpendicular arrow
            const arrowLength = width * 0.4; // 30% of the width
            const arrow = calculatePerpendicularArrow(
                xScale(data.hyperplane.x1), yScale(data.hyperplane.y1),
                xScale(data.hyperplane.x2), yScale(data.hyperplane.y2),
                arrowLength
            );

            //console.log(arrow)
            // Define arrowhead marker
            svg.append("defs").append("marker")
                .attr("id", "arrowhead")
                .attr("viewBox", "-0 -5 10 10")
                .attr("refX", 8)
                .attr("refY", 0)
                .attr("orient", "auto")
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("xoverflow", "visible")
                .append("svg:path")
                .attr("d", "M 0,-5 L 10 ,0 L 0,5")
                .attr("fill", "#000")
                .style('z-Index',-1)
                .style("stroke", "none");

            // Draw arrow
            svg.append("line")
                .attr("class", "factual-correctness-arrow")
                .attr("x1", arrow.startX)
                .attr("y1", arrow.startY)
                .attr("x2", arrow.endX)
                .attr("y2", arrow.endY)
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .style('z-Index',-1)
                .attr("marker-end", "url(#arrowhead)");

            // Add text above the arrow
            svg.append("text")
                .attr("class", "arrow-text")
                .attr("x", (arrow.startX + arrow.endX) / 2)
                .attr("y", (arrow.startY + arrow.endY) / 2 - 15) // Offset above the arrow
                .attr("text-anchor", "middle")
                .attr("fill", "black")
                .text("Factual Correctness");
        }).catch(error => {
            console.error("Error loading dataset:", error);
        });
    }

    // Initially load the first dataset
    loadDataset("claims");
});