from fastapi import APIRouter
from fastapi.responses import JSONResponse
import pandas as pd
import math

router = APIRouter()

# Read dataset
df = pd.read_csv("dataset/data.csv", encoding='ISO-8859-1')

# [ HOME PAGE ] 
# [GET] the trend of total medals won over the years by each country.
@router.get("/summary/medals_trend")
async def get_medals_trend():
    # Group by country and year, and count the number of medals
    grouped_data = df.groupby(["Country", "Year"])["Medal"].count().reset_index()

    # Sum up the total medals by country
    total_medals_by_country = grouped_data.groupby("Country")["Medal"].sum()

    # Sort countries and get the top 20
    top_countries = total_medals_by_country.sort_values(ascending=False).head(20)

    # Prepare Results
    result = {}
    for country, total_medals in top_countries.items():
        result[country] = {
            "Gold": int(df[(df["Country"] == country) & (df["Medal"] == "Gold")]["Medal"].count()),
            "Silver": int(df[(df["Country"] == country) & (df["Medal"] == "Silver")]["Medal"].count()),
            "Bronze": int(df[(df["Country"] == country) & (df["Medal"] == "Bronze")]["Medal"].count()),
            "Total": int(total_medals)
        }

    return result

# ##################################################################################
# [ COUNTRY COMPARISON PAGE ]
# [GET] the total medal count by each country for each year.
@router.get("/total_medal_count_by_year")
async def get_medals_by_year(year: int = None):
    # Filter data by year if value present
    if year is not None:
        filtered_data = df[df["Year"] == int(year)]
    else:
        filtered_data = df

    grouped_data = filtered_data.groupby(["Year", "Country"])["Medal"].count().reset_index()

    pivoted_data = grouped_data.pivot(index='Year', columns='Country', values='Medal')

    # Convert NaN values to None
    pivoted_data = pivoted_data.where(pd.notna(pivoted_data), None)

    result = pivoted_data.to_dict(orient='index')

    # Prepare results
    result_no_nan = {int(year): {country: count for country, count in medals.items() if not pd.isna(count)}  for year, medals in result.items()}
    
    return result_no_nan

# [GET] the medals by country for an year.
@router.get("/get_medals_by_country")
async def get_medals_by_country(chart_type: str = None, year: int = None):
    if chart_type == "radar":

        # Fetch medals by year
        medals_by_year = await get_medals_by_year(year)

        # Count the total medal counts for each country
        country_totals = {}
        for medals in medals_by_year.values():
            for country, count in medals.items():
                country_totals[country] = country_totals.get(country, 0) + count

        sorted_countries = sorted(country_totals.items(), key=lambda x: x[1], reverse=True)

        top_countries = sorted_countries[:20]

        # Prepare resuts
        result = [{"domain": country, "value": count} for country, count in top_countries]

        return result

    elif chart_type == "choropleth" :
        
        # Fetch medals by year
        medals_by_year = await get_medals_by_year(year)
        
        # Prepare resuts
        result=[]
        for year, medals in medals_by_year.items():
            for country, count in medals.items():
                entry = {
                    "year": int(year),
                    "country": country,
                    "totalMedals": count
                }
                result.append(entry)

        return result

    elif chart_type == "area_chart":
        # Fetch medals by year 
        medals_by_year = await get_medals_by_year(year)

        # Prepare resuts
        result = []
        for year, medals in medals_by_year.items():
            # Select top 15 countries for area chart
            sorted_medals = sorted(medals.items(), key=lambda x: x[1], reverse=True)[:5]  
            for country, count in sorted_medals:
                entry = {
                    "year": int(year),
                    "country": country,
                    "totalMedals": count
                }
                result.append(entry)
        return result

    else:
        return {"error": "chart_type not supported"}

# ##################################################################################
# [ HISTORICAL TRENDS PAGE ]
# [GET] the medals by sports by year
@router.get("/medals_by_sport")
async def get_medals_by_sport(year: int = None):
    # Filter data by year if value present
    if year is not None:
        filtered_df = df[df["Year"] == year]
    else:
        filtered_df = df
    
    # Group by Year and Sport, to get medal count
    grouped_df = filtered_df.groupby(["Year", "Sport"]).size().reset_index(name="medal")
    
    top_df = grouped_df.head(20)
    
    # Prepare result
    result = []
    for _, row in top_df.iterrows():
        result.append({
            "Year": int(row["Year"]),
            "Key": row["Sport"],
            "medal": int(row["medal"])
        })
    return result

# [GET] the medals by sports-discipline by year
@router.get("/medals_by_discipline")
async def get_medals_by_discipline(year: int = None):
    # Filter data by year if value present
    if year is not None:
        filtered_df = df[df["Year"] == year]
    else:
        filtered_df = df
    
    # Group by Year and Discipline, to get medal count
    grouped_df = filtered_df.groupby(["Year", "Discipline"]).size().reset_index(name="medal")
    top_df = grouped_df.head(20)

    # Prepare result
    result = []
    for _, row in top_df.iterrows():
        result.append({
            "Year": int(row["Year"]),
            "Key": row["Discipline"],
            "medal": int(row["medal"])
        })
    return result


# ##################################################################################
# [ ATHELETE ANALYSIS PAGE ]
# [GET] the athletes medals by year
@router.get("/athlete_medal_by_year")
async def get_athlete_medal_by_year(year: int = None):
    # Filter data by year if value present
    if year is not None:
        filtered_df = df[df["Year"] == year]
    else:
        filtered_df = df
    
    # Group by Athlete, to get medal count
    grouped_df = filtered_df.groupby("Athlete")["Medal"].count().reset_index()

    df_sorted =  grouped_df.sort_values(by="Medal", ascending=False)

    top_df = df_sorted.head(15)

    # Prepare result
    result = []
    for _, row in top_df.iterrows():
        result.append({"Athlete": row["Athlete"], "Medal": int(row["Medal"])})

    return result

# [GET] the athletes medals by country &  year
@router.get("/country_medals_athletes")
async def get_country_medals_athletes(year: int = None):
    # Filter data by year if value present
    if year is not None:
        filtered_df = df[df["Year"] == year]
    else:
        filtered_df = df

    # Group by country
    grouped_df = df.groupby("Country").agg(
        medals=("Medal", "count"),
        athletes=("Athlete", lambda x: x.nunique())
    ).reset_index()

    sorted_df = grouped_df.sort_values(by="medals", ascending=False).head(15)

    # Prepare result
    result = []
    for _, row in sorted_df.iterrows():
        result.append({
            "country": row["Country"],
            "medals": int(row["medals"]),
            "athletes": int(row["athletes"])
        })

    return result