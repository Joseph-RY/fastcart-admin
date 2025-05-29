import { Link, useParams } from "react-router-dom";

export default function Other() {
  const { pageId } = useParams();

  return (
    <div>
      <h1>Other page</h1>
      {pageId && <p>Page ID: {pageId}</p>}
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/dashboard/other/1">Other 1</Link>
        <Link to="/dashboard/other/2">Other 2</Link>
        <Link to="/dashboard/other/3">Other 3</Link>
      </div>
    </div>
  );
}
