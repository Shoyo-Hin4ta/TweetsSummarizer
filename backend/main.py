from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from scraper import scrape_tweets


from model import(
    Tweets, 
    UpdateTweets) 

app = FastAPI()

from database import(
    add_data,
    fetch_all_data,
    create_user_helper
)

# origins = "*"


app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def read_root():
    return {"Working":"YES"}

@app.post("/api/create_user/{email}")
async def create_user(email : str):
    response = await create_user_helper(email)
    if response:
        return response
    raise HTTPException(409, "User can't be created or already exists")

@app.get("/api/get_tweets/{profile_tweets}")
async def get_tweets(profile_tweets: str):
    result = await scrape_tweets(profile_tweets, 10)
    return result["tweets"]
   
@app.put("/api/add_tweets", response_model = Tweets)
async def post_tweets(tweet:UpdateTweets):

    response = await add_data(tweet.dict())
    if response:
        return response
    
    raise HTTPException(400, "Something went wrong")

# @app.delete("/api/delete_tweets/{email}")
# async def delete_tweets(email):
#     response = await delete_data(profile)
#     if response:
#         return "Successfully deleted the item"
#     raise HTTPException(400, "Something went wrong")


@app.get("/api/get_all_tweets/{email}")
async def get_all_tweets(email : str):
    response = await fetch_all_data(email)
    if response:
        return response

    raise HTTPException(400, "Something went wrong")
