import React, { useState } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const FileModal = (props) => {

  const [file, setFile] = useState(null)
  const { modal, closeModal, onUploadFile } = props;

  const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']

  const onChangeHandler = (e) =>{
    setFile(e.target.files[0])
  }

  const clearFile = () => setFile(null)

  const onSendHandler = (e) => {
    e.preventDefault()

    if(file == null) {
      alert('Please upload a file')
      return;
    }
    
    if(!types.includes(file.type)){
      alert('File type is image')
      return;
    }
    onUploadFile(file)
    clearFile()
    closeModal()
  }

  return (
    <Modal basic open={modal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input onChange={(e) => onChangeHandler(e)} fluid label="File types: jpg, png" name="file" type="file" />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={(e) => onSendHandler(e)}>
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;
