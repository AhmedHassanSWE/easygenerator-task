"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { authService } from "@/lib/auth-service"
import { userService } from "@/lib/user-service"
import { UserProfile } from "@/lib/types"
import { Icons } from "@/components/icons"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    async function loadUserProfile() {
      try {
        if (!authService.isAuthenticated()) {
          router.push("/")
          return
        }

        const userData = await userService.getUserProfile()
        setUser(userData)
      } catch (error) {
        console.error("Failed to load user profile", error)
        setError("Failed to load user profile. Please try again.")
        router.push("/")
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [router])

  const handleLogout = () => {
    authService.logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" onClick={() => router.push("/")} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welcome to the application</CardTitle>
          <CardDescription>You are now securely signed in!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Name</div>
                <div className="text-lg font-medium">{user?.name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Email</div>
                <div className="text-lg font-medium">{user?.email}</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/profile")}>Edit Profile</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Protected Content</CardTitle>
          <CardDescription>This content is only visible to authenticated users</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a protected section of the application that requires authentication to access.</p>
        </CardContent>
      </Card>
    </div>
  )
}