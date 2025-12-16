import Image from "next/image";

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
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"> 
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

        <Button>
          Get Random Recipe - add api
        </Button>

        <Card>
        <CardHeader>
          <CardTitle> Randomized Dish Result</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>View Recipe</CardAction>
          <CardAction>I'm not feeling this, another result</CardAction>
        </CardHeader>
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
          <CardAction>View Recipe</CardAction>
          <CardAction>I'm not feeling this, another result</CardAction>
        </CardHeader>
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
