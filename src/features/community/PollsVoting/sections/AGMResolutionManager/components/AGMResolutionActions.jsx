import Button from "../../../../../../components/Common/Button/Button";

function AGMResolutionActions({ resolution, onEdit }) {
  return (
    <Button
      variant="primary"
      onClick={() => onEdit(resolution)}
    >
      Edit
    </Button>
  );
}

export default AGMResolutionActions;