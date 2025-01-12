import React, { useEffect, useState } from "react";
import { fetchSummary } from "../../api/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./SummaryPanel.css";

interface Summary {
  top_users: { userId: number; unique_words: number }[];
  top_words: { word: string; count: number }[];
}

const SummaryPanel: React.FC = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSummary();
        setSummary(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch summary.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="summary-panel">
      <h3>Top Users</h3>
      <ul>
        {summary?.top_users?.length ? (
          summary.top_users.map((user) => (
            <li key={user.userId}>
              User {user.userId}: {user.unique_words} unique words
            </li>
          ))
        ) : (
          <li className="no-data">No top users available</li>
        )}
      </ul>
      <h3>Common Words</h3>
      <ul>
        {summary?.top_words?.length ? (
          summary.top_words.map((word, index) => (
            <li key={index}>{word.word}: {word.count}</li>
          ))
        ) : (
          <li className="no-data">No common words available</li>
        )}
      </ul>
    </div>
  );
};

export default SummaryPanel;
