"use client"

import { useActionState, useState } from "react"
import { useFormStatus } from "react-dom"
import Image from "next/image"
import { loginAction } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full cursor-pointer rounded-lg bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary/90"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : (
        "Sign In to Dashboard"
      )}
    </Button>
  )
}

export default function LoginForm() {
  const [state, formAction] = useActionState(loginAction, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="relative hidden w-1/2 flex-col items-center justify-center bg-primary lg:flex">
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden opacity-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center px-12 text-center">
          <div className="relative mb-8 h-32 w-64 md:h-48 md:w-full">
            <Image
              src="/logo.png"
              alt="Himalayan Legal Solutions"
              fill
              className="object-cover drop-shadow-lg"
              priority
            />
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80 md:text-base">
            Welcome to the internal management portal. Securely manage your
            publications, practice areas, and content.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-muted/30 px-4 lg:w-1/2">
        <div className="w-full max-w-md space-y-8 rounded-2xl border border-border/50 bg-card p-8 shadow-sm md:p-10 md:shadow-xl">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          {state?.error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute top-3.5 left-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@himalayanlegal.com"
                  required
                  className="h-12 rounded-lg pl-10 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute top-3.5 left-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="h-12 rounded-lg pr-10 pl-10 focus-visible:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3.5 right-3 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  )
}
