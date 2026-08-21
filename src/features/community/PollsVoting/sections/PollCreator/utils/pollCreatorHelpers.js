export const getStatusClass = (
  status
) => {
  switch (status) {
    case "Open":
      return "success";

    case "Closed":
      return "danger";

    case "Draft":
      return "warning";

    default:
      return "";
  }
};