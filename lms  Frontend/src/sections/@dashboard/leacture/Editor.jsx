/* eslint-disable */
import React from 'react';
import { Editor } from '@tinymce/tinymce-react'
// import './App.css';
import renderHTML from 'react-render-html';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import Loading from './Loading';
var h2m = require('h2m')
const cloudName = 'nonenone25251325zz';
const unsignedUploadPreset = 'adz8s31b';
import parse from 'html-react-parser';


function App({newLectureData,setNewLectureData}) {
  const [state, setState] = React.useState("")
 const _handleEditorChange = e => {
   console.log('Content was updated:', e.target.getContent())
   setState( e.target.getContent())
   setNewLectureData({...newLectureData,content:e.target.getContent()})
   }

  const _handSave = () => {
    //Let push state.content which you got to server
    //can view result at console window :)
    console.log(state.content)
    setState({ ...state, saved: true })

  }
 
  const navigate = useNavigate()

  // React.useEffect(() => {
  //   const input = document.getElementsByTagName("input")
  //   if (state.loading && input) {

  //     input.disabled = true
  //   }
  //   else if (!state.loading && input) {
  //     input.disabled = false
  //   }
  // })


  return (
    <div className="App">
      <div style={{ width: '100%' }}>
        <Editor
          apiKey={`0l9ca7pyz0qyliy0v9mmkfl2cz69uodvc8l6md8o4cnf6rnc`}
          initialValue=''
          init={{
            height: 380,
            menubar: true,
            config: {},
            skin: 'oxide-dark',
            content_css: 'dark',
            images_upload_base_path: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            images_upload_credentials: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              `undo redo| link code image | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help`,
            image_title: true,
            automatic_uploads: true,
            file_picker_types: 'image',
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
              var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
              var xhr = new XMLHttpRequest();
              var fd = new FormData();
              xhr.open('POST', url, true);

              input.onchange = function () {
                var file = this.files[0];
                var reader = new FileReader();
                xhr.onload = function () {
                  if (xhr.readyState === 4 && xhr.status === 200) {
                    // File uploaded successfully
                    var response = JSON.parse(xhr.responseText);

                    // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
                    var url = response.secure_url;
                    // console.log(url)
                    // Create a thumbnail of the uploaded image, with 150px width
                    cb(url, { title: response.original_filename });

                  }
                };

                reader.onload = function () {
                  var id = 'blobid' + (new Date()).getTime();
                  var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                  var base64 = reader.result.split(',')[1];

                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  // call the callback and populate the Title field with the file name

                  fd.append('upload_preset', unsignedUploadPreset);
                  fd.append('tags', 'browser_upload');
                  fd.append('file', blobInfo.blob(), blobInfo.filename());

                  xhr.send(fd);

                };

                reader.readAsDataURL(file);
              };

              input.click();
            },
            images_upload_handler: (blobInfo, success, failure) => {
              let data = new FormData();
              var reader = new FileReader();
              // var file = this.files[0];
              var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
              data.append('file', blobInfo.blob(), blobInfo.filename());
              data.append('upload_preset', unsignedUploadPreset);
              data.append('tags', 'browser_upload');
              axios.post(url, data)
                .then(function (res) {
                  success(res.data.secure_url)
                })
                .catch(function (err) {
                  console.log(err)
                });
              reader.readAsDataURL(blobInfo.blob())
            },
          }}

          onChange={_handleEditorChange}
          value={state.saved ? "" : state.content}
        />
        <div>

        {/* <button onClick={_handSave}>Save</button> */}

        </div>
        <div className="save_cancle_published_button">
        <button onClick={()=>{
          navigate("/dashboard/lecture")
        }} style={{
           background:"#FFE5E5",
           color:"#C20000" 
        }}>
        <svg width="19" height="19" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.94846 17.0716C-0.98282 13.1663 -0.98282 6.8346 2.94846 2.92942C6.87974 -0.975823 13.2537 -0.975823 17.1849 2.92942C21.1162 6.83467 21.1162 13.1664 17.1849 17.0716C13.2536 20.9768 6.87967 20.9768 2.94846 17.0716ZM5.79581 5.75798C5.43833 6.1131 5.43833 6.68863 5.79581 7.04376L8.12532 9.35784C8.48281 9.71296 8.48281 10.2885 8.12532 10.6434L5.79581 12.9577C5.43833 13.3126 5.43833 13.8883 5.79581 14.2432C6.1533 14.5983 6.73266 14.5983 7.09016 14.2432L9.41967 11.9291C9.77715 11.574 10.3565 11.574 10.7138 11.9291L13.0435 14.2432C13.4007 14.5983 13.9804 14.5983 14.3376 14.2432C14.6951 13.8884 14.6951 13.3126 14.3376 12.9577L12.0081 10.6434C11.6506 10.2885 11.6506 9.71297 12.0081 9.35784L14.3376 7.04376C14.6951 6.68864 14.6951 6.11311 14.3376 5.75798C13.9804 5.40287 13.4008 5.40287 13.0435 5.75798L10.7138 8.07207C10.3565 8.42718 9.77716 8.42718 9.41967 8.07207L7.09016 5.75798C6.73268 5.40287 6.15331 5.40287 5.79581 5.75798Z" fill="#C20000"/>
        </svg> &nbsp;
        Cancle</button>
        <button style={{
        background:"#D9FFDA",
        color: "#006D05"
        }}>
        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0.000488281C4.48429 0.000488281 0 4.48477 0 10.0005C0 15.513 4.48429 20.0005 10 20.0005C15.5125 20.0005 20 15.513 20 10.0005C20 4.48477 15.5125 0.000488281 10 0.000488281ZM15.0282 7.78192L9.25643 13.5537C9.07827 13.7349 8.84082 13.8319 8.58761 13.8319C8.33454 13.8319 8.09696 13.7351 7.91575 13.5537L4.96889 10.6068C4.60018 10.2381 4.60018 9.6381 4.96889 9.26938C5.14705 9.09123 5.3845 8.99441 5.63771 8.99441C5.89399 8.99441 6.12836 9.09123 6.30957 9.26938L8.59082 11.5506L13.694 6.44742C13.8753 6.2662 14.1129 6.16923 14.3659 6.16923C14.619 6.16923 14.8565 6.26605 15.0347 6.44742C15.2129 6.62557 15.3129 6.86302 15.3129 7.11624C15.3065 7.36289 15.2065 7.60356 15.0284 7.7817L15.0282 7.78192Z" fill="#006D05"/>
        </svg> &nbsp;
        Save</button>
        <button style={{
            background:"#9460ff",
            color:"white"
        }} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="white" d="M11 21.95q-1.9-.2-3.538-1.037t-2.85-2.175Q3.4 17.4 2.7 15.675T2 12q0-2.275.913-4.2T5.4 4.5H3v-2h6v6H7V5.775q-1.375 1.1-2.188 2.713T4 12q0 3.075 2.013 5.313T11 19.925v2.025Zm-.425-5.35L6.35 12.35l1.4-1.4l2.825 2.825L16.25 8.1l1.4 1.425l-7.075 7.075ZM15 21.5v-6h2v2.725q1.375-1.125 2.188-2.725T20 12q0-3.075-2.013-5.313T13 4.075V2.05q3.8.375 6.4 3.2T22 12q0 2.275-.913 4.2T18.6 19.5H21v2h-6Z"/></svg> &nbsp; Published</button>
    </div>
        <div>
      {  parse(state) }
        </div>
      </div>
    </div>
  );
}

export default App;
