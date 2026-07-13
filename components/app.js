const { useState } = React;

function NavShell() {
  const [page, setPage] = useState("map");

  const pages = [
    { id: "map", label: "Term Map" },
    { id: "week1", label: "Week 1 · Line" },
    { id: "week2", label: "Week 2 · Shape & Form" },
    { id: "week3", label: "Week 3 · Colour" },
  ];

  return React.createElement(
    "div",
    { style: { minHeight: "100vh", background: "#fdf8ef" } },
    React.createElement(
      "nav",
      {
        style: {
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          padding: "10px 16px",
          background: "#201b3d",
          fontFamily: "'DM Sans', sans-serif",
        },
      },
      pages.map((p) =>
        React.createElement(
          "button",
          {
            key: p.id,
            onClick: () => setPage(p.id),
            style: {
              padding: "7px 14px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              fontFamily: "inherit",
              background: page === p.id ? "#8b5cf6" : "rgba(255,255,255,0.12)",
              color: "#fff",
            },
          },
          p.label
        )
      )
    ),
    page === "map" && React.createElement(ArtExplorerTermMap),
    page === "week1" && React.createElement(Week1Line),
    page === "week2" && React.createElement(Week2ShapeForm),
    page === "week3" && React.createElement(Week3Colour)
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(NavShell));
