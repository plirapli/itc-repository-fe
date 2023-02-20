import Button from '../buttons/Button';
import Input from './Input';

const AddCommentForm = ({ onSubmit, onChange, body }) => {
  return (
    <form onSubmit={onSubmit} className='mt-3'>
      <Input
        onChange={onChange}
        value={body}
        placeholder='Tuliskan komentar anda'
        required
      />
      <div className='mt-3'>
        <Button type='submit'>Kirim</Button>
      </div>
    </form>
  );
};

export default AddCommentForm;
