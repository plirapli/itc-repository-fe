import Button from "../buttons/Button";

const AddCommentForm = ({
  submitHandler,
  displayReplyHandler,
  inputBodyHandler,
  body,
}) => {
  return (
    <form onSubmit={submitHandler} className="mt-4">
      <label htmlFor="komentar" className="text-sm font-medium text-primary">
        Tambah komentar
      </label>
      <div className="mt-1">
        <textarea
          onChange={inputBodyHandler}
          value={body}
          id="komentar"
          name="komentar"
          rows={7}
          className="input-primary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none"
          placeholder="Tuliskan komentar anda"
        />
      </div>
      <div className="mt-3 flex gap-3">
        <Button onClick={displayReplyHandler} color="gray">
          Kembali
        </Button>
        <Button type="submit">Kirim</Button>
      </div>
    </form>
  );
};

export default AddCommentForm;
