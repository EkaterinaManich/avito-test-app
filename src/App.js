import React, {useState, useEffect} from 'react';

import './App.scss';
import CustomImage from './components/CustomImage';
import closeImage from './assets/img/close.png';

function App() {

const [images, setImages] = useState(null);
const [modal, setModal] = useState(null);

const [name, setName] = useState('');
const [comment, setComment] = useState('');
const [commentStatus, setCommentStatus] = useState(null);


useEffect(() => { 
  fetch('https://boiling-refuge-66454.herokuapp.com/images')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    setImages(data);
  });
}, [])


function showModalById(id) {
  fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    setModal(data);
  });
}

function postComment(id,commentData) {
  fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(commentData),
  }).then((response) => {
      if (response.status === 204) {
        setCommentStatus(true);
      }
      return response.json();
    })
    .then((data) => {
      setName('');
      setComment('');
      //do some stuff if server send data
      console.log(data);
    }).catch((error) => {
      setName('');
      setComment('');
      //do some stuff if server do not send data
      console.log(error)
    });
}

  return (
    <div className="App">
      <h1>Test App</h1>
      {images ? (
      <>
        {images.map((item) => {
          return <CustomImage url={item.url} key={item.id} onClick={() => showModalById(item.id)} />
        })}
      </>
      ) : 'Loading...'}
      {modal && (
        <div className="modal">
          <div className="modal--main">
            <div>
              <img style={{width:"100%", maxWidth:"350px"}} src={modal.url} alt="some" />\
            </div>
            {modal.comments.map((item) => {
              return (
                <div key={item.id} style={{margin:"0 50px"}}>
                  <div>{new Date(item.date).getDate()}.{new Date(item.date).getMonth() + 1}.{new Date(item.date).getFullYear()}</div>
                  <div>{item.text}</div>
                </div>
              )
            })}
            <div className="modal--form">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={(event)=>setName(event.target.value)}
              />
              <input
                type="text"
                name="comment"
                placeholder="Your comment"
                value={comment}
                onChange={(event)=>setComment(event.target.value)}
              />
              <button
                onClick={()=> {postComment(modal.id, {name: name, comment: comment})}}
              >Post comment</button>
              {commentStatus && <div>Comment Sended</div>}
            </div>
            <img className="modal--close" width="50px" height="50px" src={closeImage} alt="close" onClick={ () => setModal(null) } />
          </div>
        </div>)}
    </div>
  );
}

export default App;
