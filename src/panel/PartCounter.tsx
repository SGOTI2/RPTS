import { useContext } from "react";
import { FeedManager } from "../lib/feedManager";

function sum(elements: Array<number>) {
  let count = 0;
  elements.forEach((element) => {
    count += element
  });
  return count;
}

export default function PartCounter() {
  const feedManger = useContext(FeedManager);

  return (
    <h2 className="text-5xl">{sum(Object.values(feedManger.feeds).map((feed) => feed.data.length))}</h2>
  );
}