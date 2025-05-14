"use client";

import { useState } from "react";
import { Header, PlaceList } from "../components/common";
import { Button, Container, Input } from "../components/base";
import { API_URL } from "../config/constants";

export default function Home() {
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    const response = await fetch(`${API_URL}/api/execute`, {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
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
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        <div className="mt-4">
          <PlaceList />
        </div>
      </div>
    </Container>
  );
}
