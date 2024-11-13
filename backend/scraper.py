# scraper.py
from twscrape import API, gather
from typing import Dict, List, Union
from fastapi import HTTPException

async def initialize_twitter_api() -> API:
    """Initialize and set up the Twitter API with credentials"""
    try:
        api = API()  # Use default accounts.db
        
        # For newer versions, we can just try to use the API
        # If there are no accounts or they're not logged in,
        # the subsequent operations will fail appropriately
        return api
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Twitter API initialization failed: {str(e)}"
        )

async def scrape_tweets(username: str, tweet_count: int = 10) -> Dict[str, Union[List[str], str]]:
    """
    Scrape tweets from a specific Twitter user
    """
    try:
        api = await initialize_twitter_api()
        
        # Get the user ID
        try:
            user = await api.user_by_login(username)
            if not user:
                raise HTTPException(
                    status_code=404,
                    detail=f"User {username} not found"
                )
        except Exception as e:
            raise HTTPException(
                status_code=404,
                detail=f"Failed to fetch user {username}. Make sure you have added and logged in Twitter accounts using twscrape CLI."
            )
        
        # Fetch tweets
        try:
            tweets = await gather(api.user_tweets(user.id, limit=tweet_count))
            
            if not tweets:
                raise HTTPException(
                    status_code=404,
                    detail=f"No tweets found for user {username}"
                )
            
            # Extract tweet text
            tweet_texts = [tweet.rawContent for tweet in tweets]
            
            return {
                "tweets": tweet_texts,
                "username": username
            }
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to fetch tweets: {str(e)}"
            )
        
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch tweets: {str(e)}"
        )