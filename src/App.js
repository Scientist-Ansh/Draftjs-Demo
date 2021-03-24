import { useState, useRef } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import './App.css';

function App() {

  const [preview, setPreview] = useState(false)
  const editor = useRef(null);

  const handleSubmit = () => {
    // post request
    console.log(convertToRaw(editor.current.state.editorState.getCurrentContent()))
  }

  function uploadImageCallback(file) {
    const data = new FormData();
    data.append("image", file)
    console.log(data)
    return axios.post("https://ewently-backend.herokuapp.com/api/v1/image/upload",
      data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    ).then(response => {
      console.log(response.data.profile_pic_url);
      return { data: { link: response.data.profile_pic_url } }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="App">
      <h1>Text Editor Demo</h1>
      <Editor
        ref={editor}
        editorStyle={{ height: "23rem" }}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        readOnly={preview ? true : false}
        toolbarHidden={preview ? true : false}
        toolbar={{
          image: {
            uploadEnabled: true, uploadCallback: uploadImageCallback, previewImage: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          }
        }}
      />

      <button
        onClick={() => setPreview(!preview)}
        style={{
          padding: "0.7rem 2rem",
          borderRadius: "0.7rem",
          background: "#926CF6", color: "white", outline: "none",
          marginRight: "10px"
        }}>
        {preview ? "Edit" : "Preview"}
      </button>

      <button
        onClick={handleSubmit}
        style={{
          padding: "0.7rem 2rem",
          borderRadius: "0.7rem",
          background: "#926CF6", color: "white", outline: "none"
        }}>
        Save
        </button>

    </div>
  );
}

export default App;
