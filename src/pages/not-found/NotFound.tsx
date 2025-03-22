import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="h-screen w-screen grid place-content-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="mt-2 text-center">
        <Button variant="link" className="text-md text-blue-400 cursor-pointer">
          Go to home page
        </Button>
      </Link>
    </div>

  )
}