import React from "react";
import Form from 'next/form'
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";

export default function NewRecipeForm() {

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
        setInputs(values => ({ ...values, [recipe]: value }))
        console.log(inputs)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const payload = {
                recipeName: inputs.recipeName,
                // main_ingredients: inputs.ingredients.split(",").map(i => i.trim()),
                mainIngredients: [inputs.ingredients],
                seasonings: [inputs.seasonings],
                instructions: [inputs.instructions],
                link: inputs.recipeLink,
                tags: [inputs.tags]
            }

            const response = await fetch("http://localhost:8000/recipes/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            })
            if (!response.ok) {
                throw new Error(`failed to add recipe: ${response.status}`)
            }
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
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
            <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}