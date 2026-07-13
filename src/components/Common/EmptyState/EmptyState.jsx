import "./EmptyState.css";
import Button from "../Button/Button";

function EmptyState({
  title = "No Data Found",
  description = "There are no records available.",
  buttonText,
  onButtonClick,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📂</div>

      <h2>{title}</h2>

      <p>{description}</p>

      {buttonText && (
        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;