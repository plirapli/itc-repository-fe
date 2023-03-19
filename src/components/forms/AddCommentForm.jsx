import Button from '../buttons/Button';
import Input from './Input';

const AddCommentForm = ({ onSubmit, onChange, body, errMsg }) => {
  return (
    <form onSubmit={onSubmit} className='mt-3'>
      <Input
        onChange={onChange}
        value={body}
        placeholder='Tuliskan komentar anda'
        required
      />
      {errMsg && <small className='text-danger-main'>{errMsg}</small>}
      <div className='mt-3'>
        <Button size='small'>Kirim</Button>
      </div>
    </form>
  );
};

export default AddCommentForm;
