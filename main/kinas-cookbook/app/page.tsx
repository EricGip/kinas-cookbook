'use client'    
import RandomDishCard from "@/components/RandomDishCard"
import NewRecipeForm from "@/components/RecipeForm"
import NavBar from "@/components/Navbar"

export default function Home() {
    
  const handleClick = (e) => {
    e.preventDefault()
   console.log("test") 
  }
  
  return (
    <div>
      <main> 

        < NavBar />
        < NewRecipeForm />
        < RandomDishCard />

      </main>
    </div>
  );
}
