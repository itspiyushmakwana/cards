import "./App.css";
import React, { useState, useRef, useCallback } from "react";
import useCustomFetch from "./hooks/useCustomFetch";
import Card from "./components/card";

export default function App() {
  const [result, setResult] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const { users, hasMore, loading, error } = useCustomFetch(result, pageNumber);

  const observer = useRef();
  const lastUserElementRef = useCallback(
    (refNode) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (refNode) observer.current.observe(refNode);
    },
    [loading, hasMore]
  );

  console.log(users);

  return (
    <>
      <div className="cards-wrapper">
        <h1>Users Card</h1>
        {users.map((user, index) => {
          if (users.length === index + 1) {
            return (
              <div ref={lastUserElementRef} key={user}>
                <Card user={user} />
              </div>
            );
          } else {
            return (
              <div key={user}>
                {" "}
                <Card user={user} />
              </div>
            );
          }
        })}
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error"}</div>
      </div>
    </>
  );
}
