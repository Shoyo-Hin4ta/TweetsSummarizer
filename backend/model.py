from pydantic import BaseModel
from typing import Any, Dict, List, Optional


class Tweet(BaseModel):
    URL: str
    Date: Optional[str] = None
    Text: Optional[str] = None
    Lang : str
    Likes : str
    Retweets : str
    Replies : str

class Tweets(BaseModel):
    userName: str
    twitterUsername: List[str]
    # numberOfTweets: int
    tweetsList: List[Tweet]