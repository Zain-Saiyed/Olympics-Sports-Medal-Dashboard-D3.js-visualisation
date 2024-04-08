import { useEffect, useState } from 'react';
import { getChartContainer } from '../Components/Utility.js';
import { createAreaChart } from '../Components/LineChartHelper.js';
import { display_text, display_axis_label } from '../Components/TextHelper.js';
import { createPolarAreaDiagram } from '../Components/PolarAreaChartHelper.js';
import { primary_text_color_accent } from '../Components/Utility.js';

const HistoricalTrends = () => {
  // State of data to fetch and status variables
  const [apiFetchStatus, setApiFetchStatus] = useState(false);
  const [areaChartData, setAreaChartData] = useState([]);
  const [polarArea1ChartData, setPolarArea1ChartData] = useState([]);
  const [polarArea2ChartData, setPolarArea2ChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [showPolarChart, setShowPolarChart] = useState(false);

  // Fetch chart data from backend
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Fetch stacked bar chart data
        const areaChartResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get_medals_by_country?chart_type=area_chart`);
        const areaChartData = await areaChartResponse.json();
        setAreaChartData(areaChartData);
        
        // Fetch sport-medal data for polar area chart
        const polarArea1ChartResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/medals_by_sport${selectedYear ? `?year=${selectedYear}` : ''}`);
        const polarArea1ChartData = await polarArea1ChartResponse.json();
        setPolarArea1ChartData(polarArea1ChartData);

        // Fetch discipline-medal data for polar area chart
        const polarArea2ChartResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/medals_by_discipline${selectedYear ? `?year=${selectedYear}` : ''}`);
        const polarArea2ChartData = await polarArea2ChartResponse.json();
        setPolarArea2ChartData(polarArea2ChartData);

        setApiFetchStatus(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiFetchStatus(false);
      }
    };

    fetchChartData();
  }, [selectedYear]);  

  // Display charts 
  useEffect(() => { 
    // Define chart dimensions
    const chartWidth = 75;
    const svgWidth = window.innerWidth * (chartWidth / 100);
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    var chart1_height = 400;
    var chart1_width  = 800;
    var height = 500;  
    
    // Get container svg
    var chart1_svg = getChartContainer("#area-chart-container", svgWidth, height, margin);
    chart1_svg = chart1_svg.append("g")
      .attr("transform", `translate(${chart1_width/3},${chart1_height/4})`);
    
    // Create area chart
    createAreaChart(chart1_svg, areaChartData, chart1_height, chart1_width, margin);
    // Display axis labels
    chart1_svg = display_text(chart1_svg,chartWidth, -height*0.1,"Historical Medals Earned Trends by Country by Year","28px",primary_text_color_accent)
    display_axis_label(chart1_svg, "Year", chart1_width, chart1_height);
    display_axis_label(chart1_svg, "# of Medals →", -chart1_width*0.1, height/3, "-90");
    
    // For polar area diagram, if data is null then return blank after selction only display charts
    if (!selectedYear || !polarArea1ChartData || !polarArea2ChartData) return;

    // ===================================================================================
    if (showPolarChart) { 
      height = 700;  
      // Get chart svg container
      var chart2_svg = getChartContainer("#polar-area-chart-container", svgWidth, height, margin);
      var chart2_heading_svg = chart2_svg.append("g")
                    .attr("transform", `translate(${margin.left*3},${margin.top*20})`);
      chart2_svg = chart2_svg.append("g")
                    .attr("transform", `translate(${margin.left*3},${margin.top*20})`);
      var chart2_height = 400;
      var chart2_width  = 800;
      
      // Create Sport polar area chart
      var radar_svg = createPolarAreaDiagram(chart2_svg, polarArea1ChartData, chart2_width, chart2_height );
      display_text(chart2_heading_svg,-chart2_width*0.2, -chart2_height*0.8,`In the year ${selectedYear} By Sport`,"28px",primary_text_color_accent)
      
      // ===================================================================================

      radar_svg = radar_svg.append("g")
                    .attr("transform", `translate(${chart2_width*1.5},${0})`);
      // Create Discipline polar area chart
      createPolarAreaDiagram(radar_svg, polarArea2ChartData, chart2_width, chart2_height );
      display_text(chart2_heading_svg, chart2_width*1.22, -chart2_height*0.8,`In the year ${selectedYear} By Sport Catgeory`,"28px",primary_text_color_accent)

    }
  }, [apiFetchStatus, selectedYear, showPolarChart,areaChartData, polarArea1ChartData, polarArea2ChartData])


  return (
    <div style ={{textAlign:'center'}}>
      <h1>Historical Trends</h1>

      <h2>Area Chart: Visualise the overall trend of medal wins.</h2>
      <div id="area-chart-container"></div>
      
      <h2>Polar Area Diagram: Visualise the distribution of medals across different sports categories within a specific sport.</h2>
      
      {/* Drop down of years */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '8px', fontSize: '16px', fontWeight:'bold' }}>Choose Year:</div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(parseInt(e.target.value));
              setShowPolarChart(true);
            }}
            style={{
              padding: '8px 16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '200px', 
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
            }}
          >
            <option value="">All Years</option>
            {areaChartData && [...new Set(areaChartData.map(d => d.year))].map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
          <span style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>&#9660;</span>
        </div>
      </div>
      
      {/* Polar area chart containers */}
      
      <div id="polar-area-chart-container"></div>
      
      <div id="polar-area2-chart-container"></div>
    </div>
  );
};

export default HistoricalTrends;