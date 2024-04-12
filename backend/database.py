from model import (Tweets, UpdateTweets)
from fastapi import HTTPException
from dotenv import load_dotenv
# MongoDB
import motor.motor_asyncio
import os

load_dotenv()

client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URI"))
database = client.TweetsSummarizer
collection = database.tweets

async def create_user_helper(user_email : str):
    existing_user = await collection.find_one({"email": user_email})
    if existing_user:
        raise HTTPException(status_code=400, detail ="User already exists")
    
    new_user  = {
        "email" : user_email,
        "twitterUsername": [],
        "tweetsList": []
        }
    print("creating user")
    created_user = await collection.insert_one(new_user)
    print("user_created")

    return str(created_user.inserted_id)



async def add_data(tweet_data):
    tweet = UpdateTweets.parse_obj(tweet_data)
    
    await collection.update_one(
        {"email": tweet.email},
        {"$push": {
            "twitterUsername": {"$each": [tweet.twitterUsername]},
            "tweetsList" : {"$each": [tweet.summary]}
        }}
    )

    document = await collection.find_one({"email": tweet.email})
    return Tweets(**document)
    
async def fetch_all_data(email):
    cursor = await collection.find_one({"email" : email})
    if cursor:
        return Tweets(**cursor)
    return None



async def delete_data(twitterUsername):
    await collection.delete_one({"twitterUsername":twitterUsername})
    return True

