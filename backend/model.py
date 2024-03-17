from pydantic import BaseModel
from typing import Any, Dict, List, Optional



class Tweets(BaseModel):
    email: str
    twitterUsername: List[str]
    tweetsList: List[str]

class UpdateTweets(BaseModel):
    email : str
    twitterUsername : str
    summary : str