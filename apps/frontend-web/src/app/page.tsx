"use client";

import { useState } from "react";
import { Header, PlaceList } from "../components/common";
import { Button, Container, Input } from "../components/base";

export default function Home() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/execute`, {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="h-full flex flex-col">
      <Header />
      <div className="flex-1">
        <div>
          <div>What are you looking for?</div>
          <div className="flex gap-2">
            <Input
              value={message}
              placeholder="Affordable ramen restaurant near me"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <PlaceList />
        </div>
      </div>
    </Container>
  );
}
