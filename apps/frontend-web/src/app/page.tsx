"use client";

import { useState } from "react";
import { Header, PlaceList } from "../components/common";
import { Button, Container, Input } from "../components/base";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <Container className="h-full flex flex-col">
      <Header />
      <div className="flex-1">
        <div>
          <div>What are you looking for?</div>
          <div className="flex gap-2">
            <Input
              value={search}
              placeholder="Affordable ramen restaurant near me"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button>Search</Button>
          </div>
        </div>

        <div className="mt-4">
          <PlaceList />
        </div>
      </div>
    </Container>
  );
}
