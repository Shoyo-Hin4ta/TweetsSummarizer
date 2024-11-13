# scraper.py
from twscrape import API, gather
from typing import Dict, List, Union
from fastapi import HTTPException
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

async def initialize_twitter_api() -> API:
    """Initialize and set up the Twitter API with credentials"""
    try:
        api = API()  
        
        try:
            accounts = await api.pool.list_accounts()
            if not accounts:
                await api.pool.add_account(
                    username=os.getenv("TWITTER_USERNAME"),
                    password=os.getenv("TWITTER_PASSWORD"),
                    email=os.getenv("TWITTER_EMAIL"),
                    email_password=os.getenv("TWITTER_EMAIL_PASSWORD")
                )
                await api.pool.login_all()
        except Exception:
            # If we can't list accounts, try adding new ones
            await api.pool.add_account(
                username=os.getenv("TWITTER_USERNAME"),
                password=os.getenv("TWITTER_PASSWORD"),
                email=os.getenv("TWITTER_EMAIL"),
                email_password=os.getenv("TWITTER_EMAIL_PASSWORD")
            )
            await api.pool.login_all()
            
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
                detail=f"Failed to fetch user {username}. Error: {str(e)}"
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