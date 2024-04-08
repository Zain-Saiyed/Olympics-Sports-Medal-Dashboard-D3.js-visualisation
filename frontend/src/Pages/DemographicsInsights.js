import React, { useEffect, useState } from 'react';
import { getChartContainer } from '../Components/Utility.js';
import { createChoroplethChart } from '../Components/ChoroplethChartHelper.js';

const DemographicsInsights = () => {
  // chart data states
  const [selected_year, setSelectedYear] = useState("");
  const [choroplethChartData, setChoroplethChartData] = useState([]);

  // Iniital useEffect
  useEffect(() => {
    const fetchDemograhicsData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/get_medals_by_country?chart_type=choropleth`);
        const data = await response.json();
        setChoroplethChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDemograhicsData();
  }, []);


  // Get unique years from the API data for slider steps
  const unique_years = [...new Set(choroplethChartData.map(d => d.year))].sort((a, b) => a - b);

  // function for filtering data by year 
  const filter_data_by_year = (data, year) => {
    if (!year) return data;
    return data.filter(d => d.year === year);
  };
  
  // When year selection and data present then render chart
  useEffect(() => { 
    // If no data then return blank to avoid black map
    if (!choroplethChartData)
      return null;

    // define chart settings
    const svgWidth = window.innerWidth;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    var chart1_height = 680;
    var chart1_width  = svgWidth;
    
    // Get chart svg container
    var chart1_svg = getChartContainer("#choropleth-chart-container", svgWidth, chart1_height, margin);
    chart1_svg = chart1_svg.append("g");
    
    // plot choropleth map 
    createChoroplethChart(chart1_svg, filter_data_by_year(choroplethChartData, selected_year), chart1_width, chart1_height);
    
    // ===================================================================================
  },[choroplethChartData,selected_year])

  return (
    <div style={{textAlign: 'center'}}>
      
      <h2>Choropleth Chart: Visualise the total medal wins by each country.</h2>
      
      <div id="choropleth-chart-container"></div>
      
      <div style={{ width: '40%', margin: '0 auto', marginTop:"24px", position: 'relative' }}>
        <div style={{ display: 'flex', fontSize: '22px', color: '#9b5de5',  alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>Year=</div>
          <div style={{ fontWeight: 'bold' }}>{selected_year || unique_years[0]}</div>
        </div>
        {/* !REF: https://stackoverflow.com/questions/18389224/how-to-style-html5-range-input-to-have-different-color-before-and-after-slider */}
        <input
          type="range"
          min={0}
          max={unique_years.length - 1}
          value={unique_years.indexOf(selected_year)}
          onChange={(e) => {
            const slider_value = parseInt(e.target.value);
            const selected_year = unique_years[slider_value] || unique_years[0];
            setSelectedYear(selected_year);
          }}
          style={{
            width: '100%',
            height: '10px',
            borderRadius: '10px',
            background: 'linear-gradient(to right, #9b5de5, #ff6b6b)', // purple gradient
            opacity: '0.7',
            transition: 'opacity .2s',
            WebkitAppearance: 'none', // To Hide default styling in Nomral browsers
            MozAppearance: 'none', // To Hide default styling in Mozilla browsers
          }}  
        />
      </div>
      
    </div>
  );
};

export default DemographicsInsights;