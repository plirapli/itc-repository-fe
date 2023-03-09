import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTitle } from '../../hooks';

// Components
import Input from '../../components/forms/Input';
import Button from '../../components/buttons/Button';
import { addArticle, addImageArticle } from '../../utils/article';
import OverlayLoading from '../../components/overlay/OverlayLoading';
import { Editor } from '@tinymce/tinymce-react';

const AddArticlePage = () => {
  const navigate = useNavigate();
  const { id_materi, id_bab } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState();
  useTitle('Tambah Artikel');

  const imgUploadHandler = async (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());

      addImageArticle(id_materi, id_bab, formData)
        .then((data) => resolve(data.location))
        .catch(({ data }) => reject(data.message));
    });

  const submitHandler = (e) => {
    e.preventDefault();

    if (content) {
      const articleContent = content.getContent();
      const newArticle = { title, content: articleContent };

      setIsLoading(true);
      addArticle(id_materi, id_bab, newArticle)
        .then(() => {
          // Reset state
          setTitle('');
          setContent('');

          // Redirect to list materi page
          navigate(`/manage/course/${id_materi}/${id_bab}`);
        })
        .catch(({ data }) => data.message)
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      <h1 className='text-2xl mb-3 sm:mb-1'>Artikel</h1>
      <form
        onSubmit={submitHandler}
        method='POST'
        encType='multipart/form-data'
      >
        <div className='grid grid-cols-6 gap-3 sm:gap-4'>
          <div className='col-span-6'>
            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              label='Judul'
              placeholder='Masukkan judul artikel'
              required
            />
          </div>

          <div className='col-span-6'>
            <label className='block mb-1 text-sm font-medium text-primary'>
              Isi materi
            </label>

            {/* WYSIWYG Editor */}
            <Editor
              apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
              onInit={(evt, editor) => setContent(editor)}
              initialValue='<p>This is the initial content of the editor.</p>'
              init={{
                plugins: [
                  'preview',
                  'searchreplace',
                  'autolink',
                  'directionality',
                  'code',
                  'fullscreen',
                  'image',
                  'link',
                  'codesample',
                  'table',
                  'charmap',
                  'nonbreaking',
                  'anchor',
                  'lists',
                  'wordcount',
                  'help',
                  'charmap',
                  'quickbars',
                  'emoticons',
                ],
                editimage_cors_hosts: ['picsum.photos'],
                menubar: 'file edit view insert format tools table help',
                toolbar:
                  'undo redo | bold italic underline strikethrough | fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen preview print | image link anchor codesample | ltr rtl',
                image_title: true,
                images_upload_handler: imgUploadHandler,
                file_picker_callback: (callback, value, meta) => {
                  const input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*');

                  input.addEventListener('change', (e) => {
                    const file = e.target.files[0];

                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                      /*
                      Note: Now we need to register the blob in TinyMCEs image blob
                      registry. In the next release this part hopefully won't be
                      necessary, as we are looking to handle it internally.
                      */
                      const id = 'blobid' + new Date().getTime();
                      const blobCache =
                        window.tinymce.activeEditor.editorUpload.blobCache;
                      const base64 = reader.result.split(',')[1];
                      const blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);

                      /* call the callback and populate the Title field with the file name */
                      callback(blobInfo.blobUri(), { title: file.name });
                    });
                    reader.readAsDataURL(file);
                  });

                  input.click();
                },
                file_picker_types: 'image',
                height: 500,
                image_caption: true,
                quickbars_selection_toolbar:
                  'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                noneditable_class: 'mceNonEditable',
                toolbar_mode: 'sliding',
                contextmenu: 'link image table',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
          </div>

          <div className='col-span-6 sm:col-span-1 sm:col-start-6 mt-4'>
            <Button variant='text-only'>Kirim</Button>
          </div>
        </div>
      </form>

      <OverlayLoading loadingState={isLoading} />
    </>
  );
};

export default AddArticlePage;
