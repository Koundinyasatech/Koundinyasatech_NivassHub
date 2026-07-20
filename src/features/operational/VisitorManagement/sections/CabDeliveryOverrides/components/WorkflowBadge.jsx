function WorkflowBadge({ workflow }) {
  const getClassName = () => {
    switch (workflow) {
      case "Yes":
        return "workflow-badge workflow-yes";

      case "No":
        return "workflow-badge workflow-no";

      default:
        return "workflow-badge";
    }
  };

  return (
    <span className={getClassName()}>
      <span className="workflow-dot"></span>
      {workflow}
    </span>
  );
}

export default WorkflowBadge;