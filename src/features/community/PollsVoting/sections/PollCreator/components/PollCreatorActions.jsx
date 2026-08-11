import Button from "../../../../../../components/Common/Button/Button";

function PollCreatorActions({
  onCreate,
}) {
  return (
    <Button
      onClick={onCreate}
    >
      + Create Poll
    </Button>
  );
}

export default PollCreatorActions;