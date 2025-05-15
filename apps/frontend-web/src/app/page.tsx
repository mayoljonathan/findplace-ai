"use client";

import { Header, PlaceList } from "../components/common";
import { Button, Container, Input } from "../components/base";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Place, ApiError } from "../types";
import { HttpService } from "../service/http";
import { setApiErrorToForm } from "../lib/form";

const formSchema = z.object({
  message: z.string(),
});

type FormInput = z.infer<typeof formSchema>;

const http = new HttpService();

export default function Home() {
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const {
    mutate: executeSearch,
    data: places,
    isPending: isLoading,
    isError,
    error,
    reset: resetSearch,
  } = useMutation<Place[], ApiError, FormInput>({
    mutationFn: (data) => http.post("/api/execute", data),
    onError: ({ errors }) => {
      setApiErrorToForm({
        errors,
        setError: form.setError,
      });
    },
  });

  const handleSubmit = async (data: FormInput) => executeSearch(data);

  const hasSearchError = form.formState.errors.message || isError;

  return (
    <Container className="h-full flex flex-col">
      <Header />
      <div className="flex-1">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div>What are you looking for?</div>
          <div className="flex gap-2">
            <Input
              {...form.register("message", {
                onChange: () => resetSearch(),
              })}
              placeholder="Affordable ramen restaurant near me"
              readOnly={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
          {hasSearchError && (
            <span className="text-red-500 text-sm">
              {form.formState.errors.message
                ? form.formState.errors.message?.message
                : error?.message}
            </span>
          )}
        </form>

        <div className="mt-4">
          <PlaceList />
        </div>
      </div>
    </Container>
  );
}
