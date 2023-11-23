

const DeleteModal = (props) => {
  return (
    <div className="delete-modal">
        <div className="modal-inner"> 
        <h5>Silme işlemini onaylıyor musunuz</h5>
        <button onClick={()=> props.setShowDelete(false)} className="btn btn-danger">vazgeç</button>
        <button onClick={()=> props.handleDelete(false)} className=" btn btn-success">onayla</button>
        </div>
    </div>
  )
}

export default DeleteModal;