import { createContext, useState, type ReactNode } from "react";
import type { Feed } from "./networking/types";
import { produce } from "immer";
import GetFullFeed from "./networking/getFullFeed";

type ContextType = {
  feeds: {
    [fscn: string]: Feed
  },
  setFeed: (fscn: string, feed: Feed) => void,
  acquireFeed: (fscn: string) => Promise<void>
}

const providerlessContext: ContextType = {feeds: {}, setFeed: () => {}, acquireFeed: async () => {}};

export const FeedManager = createContext(providerlessContext);

export function FeedManagerProvider({ children }: { children: ReactNode }) {
  const [feeds_, setFeeds_] = useState<typeof providerlessContext.feeds>({})

  function setFeed(fscn: string, feed: Partial<Feed>) {
    setFeeds_((draft) => {
      draft[fscn] = {
        ...draft[fscn] ?? {},
        ...feed
      };
      return draft;
    })
  }

  async function acquireFeed(fscn: string) {
    if (Object.keys(feeds_).includes(fscn)) {
      if (feeds_[fscn].isAcquiring || feeds_[fscn].available) return;
      setFeed(fscn, {isAcquiring: true});
    } else {
      setFeed(fscn, {
        data: [],
        name: fscn,
        latestUpdate: new Date(),
        available: false,
        isAcquiring: true
      } as Feed);
    }
    
    const data = await GetFullFeed(fscn);

    setFeed(fscn, {
      data: data,
      available: true,
      isAcquiring: false
    })
  }

  return (
    <FeedManager value={{
      feeds: feeds_, 
      setFeed: setFeed,
      acquireFeed: acquireFeed
    }}>
      {children}
    </FeedManager>
  )
}