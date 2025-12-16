import random
import logging
from fastapi import FastAPI 

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to Kina's Cookbook!"}