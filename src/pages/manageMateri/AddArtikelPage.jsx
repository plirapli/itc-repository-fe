import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';

// Components
import Input from '../../components/inputForm/Input';
import Button from '../../components/buttons/Button';

const AddArtikelPage = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const backButtonHandler = () => navigate(-1);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
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
              label='Judul'
              placeholder='Masukkan judul artikel'
              required
            />
          </div>

          <div className='col-span-6'>
            <label className='block mb-1 text-sm font-medium text-primary'>
              Isi materi
            </label>
            <Editor
              apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue='<p>This is the initial content of the editor.</p>'
              init={{
                plugins:
                  'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
                editimage_cors_hosts: ['picsum.photos'],
                menubar: 'file edit view insert format tools table help',
                toolbar:
                  'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                toolbar_sticky: true,
                autosave_ask_before_unload: true,
                autosave_interval: '30s',
                autosave_prefix: '{path}{query}-{id}-',
                autosave_restore_when_empty: false,
                autosave_retention: '2m',
                image_advtab: true,
                link_list: [
                  { title: 'My page 1', value: 'https://www.tiny.cloud' },
                  { title: 'My page 2', value: 'http://www.moxiecode.com' },
                ],
                image_list: [
                  { title: 'My page 1', value: 'https://www.tiny.cloud' },
                  { title: 'My page 2', value: 'http://www.moxiecode.com' },
                ],
                image_class_list: [
                  { title: 'None', value: '' },
                  { title: 'Some class', value: 'class-name' },
                ],
                importcss_append: true,
                file_picker_callback: (callback, value, meta) => {
                  /* Provide file and text for the link dialog */
                  if (meta.filetype === 'file') {
                    callback('https://www.google.com/logos/google.jpg', {
                      text: 'My text',
                    });
                  }

                  /* Provide image and alt text for the image dialog */
                  if (meta.filetype === 'image') {
                    callback('https://www.google.com/logos/google.jpg', {
                      alt: 'My alt text',
                    });
                  }

                  /* Provide alternative source and posted for the media dialog */
                  if (meta.filetype === 'media') {
                    callback('movie.mp4', {
                      source2: 'alt.ogg',
                      poster: 'https://www.google.com/logos/google.jpg',
                    });
                  }
                },
                templates: [
                  {
                    title: 'New Table',
                    description: 'creates a new table',
                    content:
                      '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                  },
                  {
                    title: 'Starting my story',
                    description: 'A cure for writers block',
                    content: 'Once upon a time...',
                  },
                  {
                    title: 'New list with dates',
                    description: 'New List with dates',
                    content:
                      '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                  },
                ],
                template_cdate_format:
                  '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                template_mdate_format:
                  '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
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

export default AddArtikelPage;
