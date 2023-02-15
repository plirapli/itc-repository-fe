import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

// Components
import Input from '../../components/forms/Input';
import Button from '../../components/buttons/Button';
import { authApi } from '../../api/api';

const AddArticlePage = () => {
  const navigate = useNavigate();
  const { id_materi, id_bab } = useParams();
  const url = `/course/${id_materi}/chapter/${id_bab}/article`;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState();

  const backButtonHandler = () => navigate(-1);

  const imgUploadHandler = async (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());

      authApi
        .post(`${url}/image`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          console.log(data.location);
          resolve(data.location);
        })
        .catch(({ response }) => reject(response.data.message));
    });

  const submitHandler = (e) => {
    e.preventDefault();

    if (content) {
      const articleContent = content.getContent();
      const newArticle = { title, content: articleContent };

      authApi.post(url, newArticle).then(() => {
        // Reset state
        // setIsLoading(false);
        setTitle('');
        setContent('');

        // Redirect to list materi page
        navigate(-1);
      });
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
                  'autosave',
                  'save',
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
                  'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen preview save print | image link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: '{path}{query}-{id}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',
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

          <div className='col-span-6 sm:col-span-2 sm:col-start-5 mt-8 flex gap-3 sm:gap-4'>
            <Button
              onClick={backButtonHandler}
              variant='text-only'
              color='gray'
            >
              Kembali
            </Button>
            <Button type='submit' variant='text-only'>
              Kirim
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddArticlePage;