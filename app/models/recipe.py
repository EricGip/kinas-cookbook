from typing import List
from pydantic import BaseModel

class Recipe(BaseModel):
    recipe_name: str
    main_ingredients: List[str]
    seasonings: List[str]
    instructions: List[str]
    link: str
    tags: List[str]