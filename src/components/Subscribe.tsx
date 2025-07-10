import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Subscribe() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    // mock action
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Get the latest updates and book reviews straight to your inbox.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSubscribe} className="w-full sm:w-auto">
          Subscribe
        </Button>
      </div>
    </section>
  );
}
