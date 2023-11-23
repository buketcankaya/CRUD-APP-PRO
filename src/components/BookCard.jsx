const BookCard = ({ data, handleModal, handleRead ,handleEditModal }) => {
  return (
    <div className="d-flex gap-3 justify-content-between border shadow rounded p-3 align-item-center mt-5 container  ">
      <div>
        {/* isRead değeri true ise üzerini çizer */}
        <h5 className={data.isRead ? "text-decoration-line-through" : ""}>
          {data.title}
        </h5>
        <p>{new Date(data.date).toDateString()}</p>
      </div>
      <div className="gap-2 d-flex">
        <button
          onClick={() => handleModal(data.id)}
          className="btn btn-outline-danger "
        >
          Sil
        </button>
        <button onClick={()=>handleEditModal(data)} className="btn btn-outline-success btn-sm">Düzenle</button>
        <button
          onClick={() => handleRead(data)}
          className="btn btn-outline-primary btn-sm "
        >
        {data.isRead ? 'okundu' : 'okunmadı'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
