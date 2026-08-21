export function exportSocietiesCsv(societies) {
  const headers = [
    "Society",
    "City",
    "State",
    "Country",
    "Registration Number",
    "Units",
    "Residents",
    "Plan",
    "Status",
    "Collection",
    "Open Tickets",
    "Last Active",
  ];

  const rows = societies.map((society) => [
    society.society,
    society.city,
    society.state,
    society.country,
    society.registrationNumber,
    society.units,
    society.residents,
    society.plan,
    society.status,
    `${society.collection}%`,
    society.openTickets,
    society.lastActive,
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "society-plans.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}