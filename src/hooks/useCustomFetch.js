import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserSearch(result, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setUsers([]);
  }, [result]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://randomuser.me/api",
      params: { result: result, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setUsers((prevUsers) => {
          return [...new Set([...prevUsers, ...res.data.results])];
        });
        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [result, pageNumber]);

  return { loading, error, users, hasMore };
}
