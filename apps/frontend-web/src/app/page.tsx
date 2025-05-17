"use client";

import { ComponentPropsWithoutRef, useMemo, useState } from "react";
import { PhotoProvider, PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { LucideSearch, LucideSparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "../lib/utils";

import {
  Header,
  Hero,
  PlaceList,
  PlaceListToolbar,
} from "../components/common";
import { Button, Container, EmptyState, Input } from "../components/base";
import { FoursquarePlace, ApiError } from "../types";
import { HttpService } from "../service/http";
import { setApiErrorToForm } from "../lib/form";
import NoResults from "../../public/svg/no_results.svg";
import { useSearchMessagePlaceholder } from "../hooks";

const formSchema = z.object({
  message: z.string(),
});

type FormInput = z.infer<typeof formSchema>;

const http = new HttpService();

export default function Home() {
  const searchMessage = useSearchMessagePlaceholder();

  const [places, setPlaces] = useState<FoursquarePlace[]>();
  const [selectedPhotoPreviewPlace, setSelectedPhotoPreviewPlace] = useState<{
    open: boolean;
    item?: FoursquarePlace;
    selectedPhotoIndex?: number;
  }>();
  const [sortBy, setSortBy] =
    useState<ComponentPropsWithoutRef<typeof PlaceListToolbar>["sortBy"]>(
      "relevance"
    );

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
    onSuccess: (data) => {
      setPlaces(data);
      setSortBy("relevance");
    },
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

  const sortedPlaces = useMemo(() => {
    if (sortBy === "relevance") return places;

    return places?.toSorted((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      else if (sortBy === "price-desc") return b.price - a.price;
      else if (sortBy === "rating-asc") return a.rating - b.rating;
      else if (sortBy === "rating-desc") return b.rating - a.rating;
      return 0;
    });
  }, [places, sortBy]);

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

      <Container className="h-full flex flex-col">
        <Header />
        <Hero className="mt-4" />

        <div className="flex-1">
          <form
            className="py-4 sticky top-0 z-50 bg-background flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <div className="flex gap-2 flex-col sm:flex-row">
              <div className="flex-1">
                <Input
                  {...form.register("message", {
                    onChange: () => resetPlaces(),
                  })}
                  className={cn("h-10", searchMessage.className)}
                  iconLeft={<LucideSearch />}
                  placeholder={searchMessage.placeholder}
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

            {(!!places?.length || isLoading) && (
              <PlaceListToolbar
                itemCount={places?.length}
                isLoading={isLoading}
                onSortByChange={setSortBy}
                sortBy={sortBy}
              />
            )}
          </form>

          <div className="mb-4 flex flex-col gap-4">
            {isLoading || places?.length ? (
              <PlaceList
                items={sortedPlaces}
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
                {status === "success" && !places?.length && (
                  <EmptyState
                    image={NoResults}
                    title="No results found"
                    description="Please try again with a different search query"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </PhotoProvider>
  );
}
