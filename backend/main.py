from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from index import scrape_tweets
from model import Tweets

app = FastAPI()


from database import(
    add_data,
    fetch_all_data,
    delete_data
)

origins = "*"

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def read_root():
    return {"Working":"YES"}

@app.get("/api/get_tweets/{profile_tweets}")
async def get_tweets(profile_tweets: str):
    try:
        name, tweets = profile_tweets.split('_')
        tweets = int(tweets)

        data = scrape_tweets(name, tweets)

        with open("../backend/files/temp.json", "r") as file:
            data = json.load(file)
        return data
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/api/get_tweets", response_model = Tweets)
async def post_tweets(tweets:Tweets):

    response = await add_data(tweets.dict())
    if response:
        return response
    
    raise HTTPException(400, "Something went wrong")

@app.delete("/api/get_tweets{profile}")
async def delete_tweets(profile):
    response = await delete_data(profile)
    if response:
        return "Successfully deleted the item"
    raise HTTPException(400, "Something went wrong")
