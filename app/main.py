import logging
import pymongo
import datetime
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from fastapi import FastAPI, status
from pydantic import BaseModel

app = FastAPI()
load_dotenv()

client = pymongo.MongoClient(os.getenv("Mongodb_URI"))
collection = client['Kinas-Cookbook']['RecipeBook']
    

class Recipe(BaseModel):
    recipeName: str
    mainIngredients: list
    seasonings: list
    instructions: list
    link: str
    tags: list

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to Kina's Cookbook!"}

@app.get("/cors-test")
async def cors_test():
    return {"ok": True}

@app.get("/testDB")
async def test_db():
    client = pymongo.MongoClient(os.getenv("Mongodb_URI"))

    # Select the database and collection
    collection = client['Kinas-Cookbook']['RecipeBook']

    RecipeBookRecipes = [
        {
            "name": "Lentils",
            "main_ingredients": ["lentils", "onion", "garlic", "dried chillies"],
            "seasonings": ["salt", "pepper", "cumin", "paprika", "turmeric"],
            "instructions": ["Cut aromatics, sauté in oil", "Add 1 Cup lentils and 4 cups of water into an instapot", "Pressure cook for 12 minutes"],
            "link": "test",
            "tags": ["easy", "protein-rich", "cheap"],
        },
        {
            "name": "Ginger and Scallion Chicken",
            "main_ingredients": ["chicken", "ginger", "scallions"],
            "seasonings": ["salt", "pepper", "basil", "oregano"],
            "instructions": ["Cut ginger and scallions and toss into a pot of boiling water", "Add the chicken into the boiling water for about 20 minutes", "Heat up oil, add cut ginger and scallions into a small bowl, pour oil on top of aromatics", "Take chicken out, shred into pieces"],
            "link": "test",
            "tags": ["cantonese", "quick", "comfort food"],
        },
    ]

    # # insert documents
    # collection.insert_many(RecipeBookRecipes)

    result = collection.find_one({"name": "Lentils"})

    # print results
    print("Document found:\n", result)

@app.post("/recipes/", response_model=Recipe, status_code=status.HTTP_201_CREATED)
async def create_recipe(recipe: Recipe):

    # FastAPI expects this is the body of request in JSON
    recipe =  {
            "recipeName": recipe.recipeName,
            "mainIngredients": recipe.mainIngredients,
            "seasonings": recipe.seasonings,
            "instructions": recipe.instructions,
            "link": recipe.link,
            "tags": recipe.tags
        }
    collection.insert_one(recipe)
    
    result = collection.find_one({"name": recipe})
    return recipe

@app.get("/recipes/", status_code=status.HTTP_200_OK)
async def get_recipes(name: str): 
    # FastAPI expects takes in the argument as a json in body
    result = collection.find_one({"name": name})
    # Have to pop this out in order to return result to readable format 
    result.pop("_id")
    return result