from model import Tweets

# MongoDB
import motor.motor_asyncio


uri = "mongodb+srv://ritik224:IF5wzBzXzQrvrGNf@cluster0.thmuygd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


client = motor.motor_asyncio.AsyncIOMotorClient(uri)
database = client.TweetsSummarizer
collection = database.tweets


async def add_data(tweets):
    document = tweets
    result = await collection.insert_one(document)
    return document

async def fetch_all_data():
    tweets = []
    cursor = collection.find({})
    async for document in cursor:
        tweets.append(Tweets(**document))
    return tweets

async def delete_data(twitterUsername):
    await collection.delete_one({"twitterUsername":twitterUsername})
    return True

