"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { GitBranch, Globe2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DeveloperCard } from "@/components/developer-card";
import { HandwrittenHeading } from "@/components/handwritten-heading";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { SearchBar } from "@/components/search-bar";
import { SketchButton } from "@/components/sketch-button";
import { getFeaturedCities, findCitySync, type City } from "@/services/geo.service";
import { searchDevelopers } from "@/services/search.service";
import type { Developer } from "@/services/github.service";

const AnimatedGlobe = dynamic(() => import("@/components/animated-globe"), {
  ssr: false,
  loading: () => <div className="h-[420px] rounded-[2rem] bg-card sketch-border sm:h-[520px]" />,
});

export default function SearchPage() {
  const examples = useMemo(() => getFeaturedCities(), []);
  const [query, setQuery] = useState("Hyderabad");
  const [activeCity, setActiveCity] = useState<City>(findCitySync("Hyderabad"));
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const perPage = 12;

  useEffect(() => {
    const cityName = query.trim();
    if (!cityName) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      setCurrentPage(1);
      setActiveCity(findCitySync(cityName));

      try {
        const result = await searchDevelopers(cityName, 1, perPage);
        if (!controller.signal.aborted) {
          setActiveCity(result.city);
          setDevelopers(result.developers);
          setTotalCount(result.totalCount);
          setHasMore(result.hasMore);
        }
      } catch (searchError) {
        if (!controller.signal.aborted) {
          setDevelopers([]);
          setTotalCount(0);
          setHasMore(false);
          setError(
            searchError instanceof Error
              ? searchError.message
              : "Unable to search developers right now."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 500);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query, perPage]);

  const loadMoreDevelopers = async () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      const result = await searchDevelopers(query.trim(), nextPage, perPage);
      setDevelopers((prev) => [...prev, ...result.developers]);
      setCurrentPage(nextPage);
      setHasMore(result.hasMore);
      setTotalCount(result.totalCount);
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Unable to load more developers."
      );
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="px-5 py-12 sm:py-16 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-7xl text-center">
        <HandwrittenHeading className="text-5xl sm:text-6xl lg:text-8xl">
          Where should we look?
        </HandwrittenHeading>
        <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-secondary px-4 sm:px-0">
          Search a city and Voyager will rotate the map, mark the location, and
          rank active GitHub developers nearby.
        </p>
        <div className="mt-7 sm:mt-9">
          <SearchBar
            value={query}
            onChange={(value) => {
              setQuery(value);
              if (!value.trim()) {
                setDevelopers([]);
              }
            }}
          />
        </div>
        <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-2 sm:gap-3">
          {examples.map((city) => (
            <button
              className="rounded-2xl bg-card px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-secondary shadow-soft sketch-border transition hover:-translate-y-1 hover:text-primary"
              key={city.name}
              onClick={() => setQuery(city.name)}
              type="button"
            >
              {city.name}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 sm:mt-14 grid max-w-7xl items-center gap-6 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <AnimatedGlobe city={activeCity} />
        <div className="rounded-[2rem] bg-card p-5 sm:p-6 lg:p-8 shadow-soft sketch-border">
          <div className="mb-5 sm:mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-heading text-3xl sm:text-4xl font-bold">
                {activeCity.name}
              </p>
              <p className="text-sm sm:text-base text-secondary">{activeCity.country}</p>
            </div>
            <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-accent sketch-border">
              <Globe2 size={20} className="sm:hidden" />
              <Globe2 size={24} className="hidden sm:block" />
            </div>
          </div>
          <p className="text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 lg:leading-8 text-secondary">
            Ranking score = followers x 4 + stars x 3 + repos x 2 +
            contribution estimate. The contribution signal is estimated from
            public profile activity because GitHub does not expose total
            contributions through the search endpoint.
          </p>
          <div className="mt-5 sm:mt-7">
            <SketchButton href={`https://github.com/search?q=location%3A${encodeURIComponent(activeCity.name)}&type=users`} target="_blank" variant="secondary" className="w-full sm:w-auto text-sm sm:text-base">
              <GitBranch size={16} className="sm:hidden" />
              <GitBranch size={18} className="hidden sm:block" />
              View raw GitHub search
            </SketchButton>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 sm:mt-16 max-w-7xl">
        <div className="mb-6 sm:mb-8 flex flex-col justify-between gap-3 sm:gap-4 sm:flex-row sm:items-end">
          <div>
            <HandwrittenHeading className="text-4xl sm:text-5xl lg:text-6xl">
              Ranked developers
            </HandwrittenHeading>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-secondary">
              {loading
                ? "Fetching profiles, stars, and repository signals..."
                : totalCount > 0
                ? `Showing ${developers.length} of ${totalCount.toLocaleString()} developers`
                : `${developers.length} profiles discovered`}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoadingSkeleton />
            </motion.div>
          ) : developers.length > 0 ? (
            <motion.div
              key={activeCity.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="grid gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {developers.map((developer, index) => (
                <DeveloperCard
                  developer={developer}
                  key={developer.id}
                  rank={index + 1}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-[2rem] bg-card p-8 sm:p-10 text-center shadow-soft sketch-border"
            >
              <svg className="mx-auto h-28 w-28 sm:h-36 sm:w-36 text-primary/45" viewBox="0 0 180 180" fill="none">
                <circle cx="90" cy="90" r="62" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="12 10" />
                <path d="M35 88c24 10 54 9 95-3M82 30c-14 42-14 80 4 125M116 38c14 38 13 76-5 116" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <h3 className="mt-5 sm:mt-6 font-heading text-4xl sm:text-5xl font-bold">
                No developers found here.
              </h3>
              <p className="mx-auto mt-3 sm:mt-4 max-w-md text-sm sm:text-base text-secondary">
                {error || "Try a nearby city, alternate spelling, or a larger tech hub."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {!loading && developers.length > 0 && hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 sm:mt-10 text-center"
          >
            <SketchButton
              onClick={loadMoreDevelopers}
              variant="secondary"
              size="lg"
              disabled={loadingMore}
              className="w-full sm:w-auto"
            >
              {loadingMore ? (
                <>
                  <span className="inline-block h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span className="text-sm sm:text-base">Loading more...</span>
                </>
              ) : (
                <>
                  <span className="text-sm sm:text-base">Load More Developers</span>
                  <span className="font-heading text-xl sm:text-2xl">↓</span>
                </>
              )}
            </SketchButton>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-secondary">
              {totalCount - developers.length} more developers available
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
