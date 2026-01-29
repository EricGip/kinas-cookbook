from fastapi.testclient import TestClient
from app.main import app
from app.db import get_collection


# =============================================================================
# MOCK DATABASE
# =============================================================================
# This FakeCollection simulates MongoDB without actually connecting to it
# Benefits: Fast, reliable, no network calls, no test data pollution

# class FakeCollection:
#     """Mock MongoDB collection for testing"""

#     def __init__(self):
#         # In-memory storage for our fake database
#         self.data = {
#             "Lentils": {
#                 "name": "Lentils",
#                 "recipe_name": "Lentils",
#                 "main_ingredients": ["lentils", "onion"],
#                 "seasonings": ["salt", "cumin"],
#                 "instructions": ["Cook lentils"],
#                 "link": "http://example.com",
#                 "tags": ["easy"]
#             }
#         }

class FakeCollection:
    def __init__(self):
        # In-memory storage for our fake database
        self.data = {
            "Lentils": {
                "recipe_name": "Lentils",
                "main_ingredients": ["lentils", "onion"],
                "seasonings": ["salt", "cumin"],
                "instructions": ["Cook lentils in instapot for 12 minutes"],
                "link": "http://example.com",
                "tags": ["easy"]
            }
        }

    def find_one(self, query):
        """Mock the find_one method"""
        # If querying by 'recipe_name' (current schema)
        if "recipe_name" in query:
            result = self.data.get(query["recipe_name"])
            if result:
                new_result = result.copy()
                new_result["_id"] = "507f1f77bcf86cd799439011"  # Simulate MongoDB _id
                return new_result
            return None
        return None

    def insert_one(self, document):
        """Mock the insert_one method"""
        recipe_name = document.get("recipe_name")
        if recipe_name:
            new_recipe = document.copy()
            new_recipe["_id"] = "fake_id_123"  # Simulate MongoDB _id
            self.data[new_recipe["recipe_name"]] = new_recipe
        # return type('obj', (object,), {'inserted_id': 'fake_id_123'})()
        return None

    def aggregate(self, pipeline):
        """Mock the aggregate method for random recipe"""
        # Return an iterator with one random recipe
        if self.data:
            first_recipe = list(self.data.values())[0]
            # MongoDB adds _id field
            first_recipe["_id"] = "507f1f77bcf86cd799439011"
            return iter([first_recipe])
        return iter([])


# =============================================================================
# DEPENDENCY OVERRIDE
# =============================================================================
# This tells FastAPI: "When you see get_collection(), use our fake instead"

def override_get_collection():
    """Returns our mock collection instead of real MongoDB"""
    return FakeCollection()


# Apply the override - now all endpoints will use FakeCollection
app.dependency_overrides[get_collection] = override_get_collection

# Create test client - this makes HTTP requests to our app
client = TestClient(app)


# =============================================================================
# TESTS
# =============================================================================

def test_root_endpoint():
    """Test the root endpoint returns welcome message"""
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to Kina's Cookbook!"}

def test_get_existing_recipe():
    """FakeCollection already has "lentils recipe", should be able to call it"""
    response = client.get("/recipes/?name=Lentils")

    assert response.status_code == 200
    assert response.json()["recipe_name"] == "Lentils"

def test_create_new_recipe():
    new_recipe = {
        "recipe_name": "Lentils",
        "main_ingredients": ["lentils", "onion"],
        "seasonings": ["salt", "cumin"],
        "instructions": ["Cook lentils in instapot for 12 minutes"],
        "link": "http://example.com",
        "tags": ["easy"]
    }
    client.post("/recipes/", json=new_recipe)
    response = client.get("/recipes/?name=Lentils")
    assert response.status_code == 200
    assert response.json()["recipe_name"] == "Lentils"
    assert response.json()["main_ingredients"] == ["lentils", "onion"]


def test_cors_test_endpoint():
    """Test the CORS test endpoint"""
    response = client.get("/cors-test")

    assert response.status_code == 200
    assert response.json() == {"ok": True}


def test_get_recipe_by_name_success():
    """Test getting a recipe that exists"""
    response = client.get("/recipes/?name=Lentils")

    assert response.status_code == 200
    data = response.json()
    assert data["recipe_name"] == "Lentils"
    assert "main_ingredients" in data
    assert "lentils" in data["main_ingredients"]


def test_get_recipe_by_name_not_found():
    """
    Test getting a recipe that doesn't exist
    This will currently CRASH because main.py:96 tries to call .pop() on None
    We fixed this in main.py by adding a check and raising 404 if not found
    """

    response = client.get("/recipes/?name=NonExistentRecipe")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()
    pass


def test_create_recipe_success():
    """Test creating a new recipe"""
    new_recipe = {
        "recipe_name": "Pasta Carbonara",
        "main_ingredients": ["pasta", "eggs", "bacon"],
        "seasonings": ["black pepper", "parmesan"],
        "instructions": ["Boil pasta", "Fry bacon", "Mix with eggs"],
        "link": "https://example.com/carbonara",
        "tags": ["italian", "quick"]
    }

    response = client.post("/recipes/", json=new_recipe)

    assert response.status_code == 201
    data = response.json()
    assert data["recipe_name"] == "Pasta Carbonara"
    assert data["main_ingredients"] == ["pasta", "eggs", "bacon"]


def test_create_recipe_missing_fields():
    """
    Test creating a recipe with missing required fields

    Pydantic (your Recipe model) should reject this
    """
    incomplete_recipe = {
        "recipe_name": "Incomplete Recipe"
        # Missing all other required fields!
    }

    response = client.post("/recipes/", json=incomplete_recipe)

    # FastAPI returns 422 for validation errors
    assert response.status_code == 422


def test_get_random_recipe_success():
    """Test getting a random recipe"""
    response = client.get("/recipes/random")

    assert response.status_code == 200
    data = response.json()
    assert "recipe_name" in data
    assert "_id" in data  # Should be converted to string


def test_get_random_recipe_empty_database():
    """Test getting random recipe when database is empty"""
    # We need a fresh FakeCollection with no data
    class EmptyFakeCollection(FakeCollection):
        def __init__(self):
            self.data = {}  # Empty!

    def override_empty():
        return EmptyFakeCollection()

    # Temporarily override with empty collection
    app.dependency_overrides[get_collection] = override_empty

    response = client.get("/recipes/random")

    assert response.status_code == 404
    assert "No recipes found" in response.json()["detail"]

    # Restore original override for other tests
    app.dependency_overrides[get_collection] = override_get_collection


# =============================================================================
# CLEANUP
# =============================================================================

def teardown_module():
    """Clean up after all tests in this module"""
    app.dependency_overrides.clear()
