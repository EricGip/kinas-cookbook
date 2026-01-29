import pymongo
import os


# extracting DB logic
def get_collection():
    client = pymongo.MongoClient(os.getenv("Mongodb_URI"))
    collection = client['Kinas-Cookbook']['RecipeBook']