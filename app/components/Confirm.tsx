interface Props {
  modalHide: () => void;
}

export default function Confirm({ modalHide }: Props) {
  return (
    <div>
      <div>
        <h1>Are you sure you want to save the data?</h1>
      </div>
      <div>
        <button type="submit" name="_action" value="save">
          Save
        </button>
      </div>
      <div>
        <button type="button" onClick={modalHide}>
          Cancel
        </button>
      </div>
    </div>
  );
}
