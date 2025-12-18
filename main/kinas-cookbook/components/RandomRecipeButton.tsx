import { Button } from "@/components/ui/button"

export default function RandomRecipeButton() {

  const handleClick = (e) => {
    e.preventDefault()
   console.log("test") 
  }
  
    return(
          <Button onClick={handleClick}>
            Get Random Recipe - add api
          </Button>
    )
}