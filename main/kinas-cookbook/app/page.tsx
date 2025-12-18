'use client'    
import Image from "next/image";
import Form from 'next/form'
import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Home() {
  
  // Both ways work, but the other code is more preferred.
  // const [recipe, setRecipe] = React.useState("");
  // const [ingredients, setIngredients] = React.useState("");
  // const [seasonings, setSeasonings] = React.useState("");
  // const [instructions, setInstructions] = React.useState("");
  // const [recipeLink, setRecipeLink] = React.useState("");
  // const [tags, setTags] = React.useState("");

  const [inputs, setInputs] = React.useState({
    recipeName: "",
    ingredients: "",
    seasonings: "",
    instructions: "",
    recipeLink: "",
    tags: ""
  });

  const handleChange = (e) => {
    const recipe = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [recipe]: value}))
    console.log(inputs)
  }
  
  const handleClick = (e) => {
    e.preventDefault()
   console.log("test") 
  }
  
  return (
    <div>
      <main> 
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Random</NavigationMenuTrigger>
              <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
              <NavigationMenuTrigger>Add Recipe</NavigationMenuTrigger>
              <NavigationMenuTrigger>Log in?</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

          <Button onClick={handleClick}>
            Get Random Recipe - add api
          </Button>
    
          <Form action="/search">
            <FieldGroup>
              <FieldSet>
                <FieldLegend> Add a new recipe </FieldLegend>
                    <FieldGroup>

                      <Field>
                        <FieldLabel>
                          Name of Recipe 
                          <Input 
                            type="text"
                            name="recipeName"
                            value={inputs.recipeName}
                            onChange={handleChange}
                            placeholder="Test"
                          />
                        </FieldLabel>
                      </Field>

                      <Field>
                        <FieldLabel>
                          Ingredients
                          <Input
                            type="text"
                            name="ingredients"
                            value={inputs.ingredients}
                            onChange={handleChange}
                            placeholder="Test"
                          />
                        </FieldLabel>
                      </Field>

                      <Field>
                        <FieldLabel>
                          Seasonings
                          <Input 
                            type="text"
                            name="seasonings"
                            value={inputs.seasonings}
                            onChange={handleChange}
                            placeholder="Test"
                          />
                        </FieldLabel>
                      </Field>

                      <Field>
                        <FieldLabel>
                          Instruction
                          <Textarea 
                            name="instructions"
                            value={inputs.instructions}
                            onChange={handleChange}
                            placeholder="Test"
                          />
                        </FieldLabel>
                      </Field>

                      <Field>
                        <FieldLabel>
                          link
                          <Input 
                            type="text"
                            name="recipeLink"
                            value={inputs.recipeLink}
                            onChange={handleChange}
                            placeholder="Test"
                          />
                        </FieldLabel>
                      </Field>

                      <Field>
                        <FieldLabel>
                          tags
                          <Input 
                            type="text"
                            name="tags"
                            value={inputs.tags}
                            onChange={handleChange}
                            placeholder="Test"
                          />
                        </FieldLabel>
                      </Field>

                    </FieldGroup>
              </FieldSet>
            </FieldGroup>
            <Button type="submit" onClick={handleClick}>Submit</Button>
          </Form>

          <Card>
          <CardHeader>
            <CardTitle> Randomized Dish Result</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
            <CardAction >View Recipe</CardAction>
            <CardAction>I'm not feeling this, another result</CardAction>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

          <Card>
          <CardHeader>
            <CardTitle> Recipe Detail</CardTitle>
            <CardDescription> Recipe </CardDescription>
          </CardHeader>
            <CardAction>View Recipe</CardAction>
            <CardAction>I'm not feeling this, another result</CardAction>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}
