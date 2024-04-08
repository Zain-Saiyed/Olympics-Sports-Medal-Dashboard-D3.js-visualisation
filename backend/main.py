from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import homepage_router
import pandas as pd

app = FastAPI()

# Not needed whendeploying on render.com
# ! REF: https://stackoverflow.com/questions/65635346/how-can-i-enable-cors-in-fastapi
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow request from all origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(homepage_router.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



# Setup-Installation:
# pip install fastapi uvicorn plotly
# pip install -U websockets