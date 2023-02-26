import ButtonMin from '../buttons/ButtonMin';
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
        <ButtonMin size='small'>Kirim</ButtonMin>
      </div>
    </form>
  );
};

export default AddCommentForm;
