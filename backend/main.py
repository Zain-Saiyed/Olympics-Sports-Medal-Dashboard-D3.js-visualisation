from fastapi import FastAPI
import pandas as pd

app = FastAPI()

df = pd.read_csv("dataset/data.csv", encoding='ISO-8859-1')

@app.get("/top_athletes_medal/{year}")
async def get_ytd_highest_medal_athletes(year: int):
    # Get secific year data 
    df_year = df[df["Year"] == year]

    # Group by Athlete and calculate the total number of medals earned
    athlete_medals = df_year.groupby("Athlete")["Medal"].count()

    # Get top 10 athletes with the highest medal count
    top_10_athletes = athlete_medals.nlargest(10).reset_index()
    
    return {"year": year, "athletes": top_10_athletes.to_dict(orient="records")}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



# Setup-Installation:
# pip install fastapi uvicorn plotly
# pip install -U websockets