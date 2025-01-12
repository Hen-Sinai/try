import React, { useEffect, useState } from "react";
import "./AnomaliesTable.css";
import { fetchAnomalies } from "../../api/api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface Anomaly {
  userId: number;
  id: number;
  title: string;
  reasons: string[];
}

const AnomaliesTable: React.FC = () => {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [filteredAnomalies, setFilteredAnomalies] = useState<Anomaly[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userIdFilter, setUserIdFilter] = useState<number | "">("");
  const [sortBy, setSortBy] = useState<string>("userId");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAnomalies();
        setAnomalies(data);
        setFilteredAnomalies(data); // initialize filtered anomalies with all data
      } catch (err: any) {
        setError(err.message || "Failed to fetch anomalies.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    let filteredData = anomalies;

    if (userIdFilter) {
      filteredData = anomalies.filter((anomaly) => anomaly.userId === userIdFilter);
    }

    filteredData = filteredData.sort((a, b) => {
      const aValue = a[sortBy as keyof Anomaly];
      const bValue = b[sortBy as keyof Anomaly];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    setFilteredAnomalies(filteredData);
  }, [userIdFilter, sortBy, sortOrder, anomalies]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="table-container">
      <div className="filters">
        <div className="filter-card">
          <label>Filter by User ID:</label>
          <select
            value={userIdFilter}
            onChange={(e) => setUserIdFilter(e.target.value === "" ? "" : parseInt(e.target.value))}
          >
            <option value="">All Users</option>
            {[...new Set(anomalies.map((a) => a.userId))].map((userId) => (
              <option key={userId} value={userId}>
                {userId}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-card">
          <label>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="userId">User ID</option>
            <option value="id">Post ID</option>
            <option value="title">Title</option>
            <option value="reasons">Reasons</option>
          </select>
        </div>

        <div className="filter-card">
          <label>Sort Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Post ID</th>
            <th>Title</th>
            <th>Reasons</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnomalies.map((anomaly) => (
            <tr key={anomaly.id}>
              <td>{anomaly.userId}</td>
              <td>{anomaly.id}</td>
              <td>{anomaly.title}</td>
              <td>
                {anomaly.reasons.length > 1 ? (
                  <ul className="reason-list">
                    {anomaly.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))}
                  </ul>
                ) : (
                  <span>{anomaly.reasons[0]}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnomaliesTable;
