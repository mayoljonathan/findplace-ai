"use client";

import { useState } from "react";
import { Header, PlaceList } from "../components/common";
import { Button, Container, Input } from "../components/base";
import axios from "axios";
import { ApiError } from "../types/common";

export default function Home() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const response = await axios.post("/api/execute", {
        message,
      });

      console.log("response", response);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { message } = e.response?.data as ApiError;
        setErrorMessage(message);
      }
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
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>

        <div className="mt-4">
          <PlaceList />
        </div>
      </div>
    </Container>
  );
}
