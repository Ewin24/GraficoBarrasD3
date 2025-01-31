document.addEventListener("DOMContentLoaded", function () {
    const dataInput = document.getElementById("dataInput");
    const updateButton = document.getElementById("updateData");
    const chartDiv = document.getElementById("chart");

    updateButton.addEventListener("click", function () {
        const inputData = dataInput.value.trim();
        if (!inputData) {
            alert("Por favor, ingrese datos válidos.");
            return;
        }

        const data = inputData.split(",").map(Number);
        if (data.some(isNaN)) {
            alert("Por favor, ingrese solo números separados por comas.");
            return;
        }

        updateChart(data);
    });

    function updateChart(data) {
        d3.select("#chart").selectAll("*").remove();

        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };

        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleBand()
            .domain(data.map((d, i) => i))
            .range([0, height - margin.top - margin.bottom])
            .padding(0.1);

        const x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .nice()
            .range([0, width - margin.left - margin.right]);

        const colors = d3.schemeCategory10;
        const colorScale = (i) => colors[i % colors.length];

        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("y", (d, i) => y(i))
            .attr("x", 0)
            .attr("width", d => x(d))
            .attr("height", y.bandwidth())
            .attr("fill", (d, i) => colorScale(i)); // colores
    }
});