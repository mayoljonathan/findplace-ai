"use client";

import { useState } from "react";
import { Header, Hero, PlaceList } from "../components/common";
import { Button, Container, EmptyState, Input } from "../components/base";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FoursquarePlace, ApiError } from "../types";
import { HttpService } from "../service/http";
import { setApiErrorToForm } from "../lib/form";
import { LucideSearch, LucideSparkles } from "lucide-react";
import NoResults from "../../public/svg/no_results.svg";
import { PhotoProvider, PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const formSchema = z.object({
  message: z.string(),
});

type FormInput = z.infer<typeof formSchema>;

const http = new HttpService();

// TODO: Cycle through these examples
const SEARCH_MESSAGE_EXAMPLES = [
  "I'm craving some good pizza. Can you find a budget-friendly pizza spot in IT Park Cebu that's open right now",
  "Find me a Tennis court in Cebu City",
];

export default function Home() {
  const [places, setPlaces] = useState<FoursquarePlace[]>();
  const [selectedPhotoPreviewPlace, setSelectedPhotoPreviewPlace] = useState<{
    open: boolean;
    item?: FoursquarePlace;
    selectedPhotoIndex?: number;
  }>();

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const {
    mutate: executeSearch,
    isPending: isLoading,
    isError,
    error,
    reset: resetPlaces,
    status,
  } = useMutation<FoursquarePlace[], ApiError, FormInput>({
    mutationFn: (data) => http.post("/api/execute", data),
    onSuccess: setPlaces,
    onError: ({ errors }) => {
      setApiErrorToForm({
        errors,
        setError: form.setError,
      });
      setPlaces([]);
    },
  });

  const handleSubmit = async (data: FormInput) => executeSearch(data);

  const hasSearchError = form.formState.errors.message || isError;

  const selectedPhotoPreviewPlacePhotos =
    selectedPhotoPreviewPlace?.item?.photos.map((photo) => ({
      src: `${photo.prefix}original${photo.suffix}`,
      key: photo.id,
    }));

  return (
    <PhotoProvider>
      <PhotoSlider
        images={selectedPhotoPreviewPlacePhotos ?? []}
        visible={selectedPhotoPreviewPlace?.open ?? false}
        index={selectedPhotoPreviewPlace?.selectedPhotoIndex ?? 0}
        onIndexChange={(index) =>
          setSelectedPhotoPreviewPlace((prev) => ({
            ...prev!,
            selectedPhotoIndex: index,
          }))
        }
        onClose={() =>
          setSelectedPhotoPreviewPlace((prev) => ({
            ...prev,
            open: false,
            selectedPhotoIndex: 0,
          }))
        }
      />

      <Container className="h-full flex flex-col gap-4">
        <Header />
        <Hero />

        <div className="flex-1">
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="mt-2 flex gap-2 flex-col sm:flex-row">
              <div className="flex-1">
                <Input
                  {...form.register("message", {
                    onChange: () => resetPlaces(),
                  })}
                  className="h-10"
                  iconLeft={<LucideSearch />}
                  placeholder={SEARCH_MESSAGE_EXAMPLES[0]}
                  disabled={isLoading}
                />
                {hasSearchError && (
                  <p className="text-red-500 text-sm mt-1.5">
                    {form.formState.errors.message
                      ? form.formState.errors.message?.message
                      : error?.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full sm:w-36 h-10"
                isLoading={isLoading}
                iconLeft={<LucideSparkles />}
                loadingIcon={<LucideSparkles className="animate-pulse" />}
                effect="shine"
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>

          {places && (
            <div className="my-4">
              {isLoading || places.length ? (
                <PlaceList
                  items={places}
                  isLoading={isLoading}
                  onThumbnailClick={(item) =>
                    setSelectedPhotoPreviewPlace({
                      open: true,
                      item,
                    })
                  }
                />
              ) : (
                <>
                  {status === "success" && !places.length && (
                    <EmptyState
                      image={NoResults}
                      title="No results found"
                      description="Please try again with a different search query"
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Container>
    </PhotoProvider>
  );
}
