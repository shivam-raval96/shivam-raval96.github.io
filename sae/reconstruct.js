
        // Sample decoder weights (Wdec) and bias
        const Wdec = [
        [ 5.0995e-01,  4.9447e-01],
        [ 4.9473e-01, -5.0940e-01],
        [-5.0441e-01, -5.0242e-01],
        [-4.9068e-01,  4.9355e-01]]; // Replace with your actual weights
        const bias = [-0.0070, -0.0030]; // Replace with your actual bias
        const latentDim = Wdec.length;

        // Create sliders for each dimension in the latent space
        const sliderContainer = d3.select("#sliderContainer");
        const sliders = [];
        const maxPerColumn = 10;
        for (let i = 0; i < latentDim; i++) {
            if (i % maxPerColumn === 0) {
                var columnDiv = sliderContainer.append("div").attr("class", "columnDiv");
            }
            const sliderDiv = columnDiv.append("div").attr("class", "sliderDiv");
            sliderDiv.append("label").text(`h${i}:`);
            const slider = sliderDiv.append("input")
                .attr("type", "range")
                .attr("min", 0)
                .attr("max", 1)
                .attr("step", 0.01)
                .attr("value", 0)
                .attr("id", `h${i}`);
            sliders.push(slider);
        }

        // SVG setup
        const width = 500, height = 500, margin = 50;
        const svg = d3.select("#plotContainer")
            .append("svg")
            .attr("width", width + margin * 2)
            .attr("height", height + margin * 2)
            .append("g")
            .attr("transform", `translate(${margin}, ${margin})`);

        const xScale = d3.scaleLinear().domain([-1, 1]).range([0, width]);
        const yScale = d3.scaleLinear().domain([-1, 1]).range([height, 0]);

        // Axes
        svg.append("g")
            .attr("transform", `translate(0, ${height / 2})`)
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("transform", `translate(${width / 2}, 0)`)
            .call(d3.axisLeft(yScale));

        // Array to store old points
        let oldPoints = [];

        // Plot circle data
        function plotCircle(data, color) {
            svg.selectAll("circle").remove();
            svg.selectAll("circle")
                .data(oldPoints)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d[0]))
                .attr("cy", d => yScale(d[1]))
                .attr("r", 3)
                .style("fill", "grey");

            svg.append("circle")
                .attr("cx", xScale(data[0]))
                .attr("cy", yScale(data[1]))
                .attr("r", 3)
                .style("fill", color);
        }

        // Function to calculate the output of the model
        function calculateOutput(h) {
            console.log(h,Wdec[0].length)
            const output = [];
            for (let i = 0; i < Wdec[0].length; i++) {
                let value = bias[i];
                for (let j = 0; j < latentDim; j++) {
                    value += Wdec[j][i] * h[j];
                }
                output.push(value);
            }
            return output;
        }

        // Update function
        function updatePlot() {
            const h = sliders.map(slider => +slider.property("value"));
            const output = calculateOutput(h);
            oldPoints.push(output);
            plotCircle(output, "blue");
        }

        // Clear old points function
        function clearOldPoints() {
            oldPoints = [];
            updatePlot();
        }

        // Initial plot
        updatePlot();

        // Add event listeners to sliders
        sliders.forEach(slider => {
            slider.on("input", updatePlot);
        });

        // Add event listener to refresh button
        d3.select("#refreshButton").on("click", clearOldPoints);