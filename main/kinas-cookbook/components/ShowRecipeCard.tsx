import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function ShowRecipeCard() {
    return (
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
    )
}