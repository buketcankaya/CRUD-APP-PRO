import { v4 } from "uuid";
import { useState } from "react";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "./components/EditModal";

function App() {
  const [books, setBooks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    // kitap isminine erişme
    const title = e.target[0].value;

    if (!title) {
      toast.warn('Lütfen kitap ismi giriniz', { autoClose: 2000 });
      return;
    }
    // kitap objesi oluşturma
    const newBook = {
      id: v4(),
      title,
      date: new Date(),
      isRead: false,
    };
    console.log(newBook);

    // oluşturulan objeyi kitaplar dizisine aktar
    setBooks([...books, newBook]);

    // setBook(books.concat()); bu da bir diğer yöntem 2 diziyi birleştirir.ya da bir objeyi bir dizye

    // inputu temizleme

    e.target[0].value = "";
  };

  // silme modulu için fonksiyon
  const handleModal = (id) => {
    // deleteId değişkenini verilen id'ye atar(silinecek elemanın id sni state e aktarır)
    setDeleteId(id);
    // modalı açar
    setShowDelete(true);
  };


  // silme işlemi yapar
  const handleDelete = () => {
    // id sini bildiğimiz elemanı diziden çıkarma
    const filtered = books.filter((book) => book.id !== deleteId);
    //  statei günceller
    setBooks(filtered);
    // modalı kapatır
    setShowDelete(false);
    // bildirim verme
    toast.success("kitap başarıyla silindi", { autoClose: 2000 });
  };


  // okundu işleminde çalşır
  const handleRead = (editItem) => {
    const updated = { ...editItem, isRead: !editItem.isRead };

    // dizide ki bir elamanı güncelleme
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    );

    // state'i günceller
    setBooks(newBooks);
  };

  const handleEditModal = (item) => {
    setShowEdit(true);
    // düzenlenecek elemanı state aktarma
    setEditingItem(item);
  };

  // elemanı düzenleme
  const updateItem = () => {
    // kitaplr dizisinin bir elemanı güncelleme

    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );
    // state i güncelleme
    setBooks(newBooks);

    // modalı kapatır
    setShowEdit(false);
    // bildirim verme
    toast.info('Kitap ismi düzenlendi', {autoClose: 2000});
  };

  return (
    <div className="container">
      <header className="bg-warning text-dark py-2 fs-5 text-center rounded">
        <h1>KİTAPLIĞIM</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="d-flex p-4 gap-3 mt-4">
          <input
            className="form-control shadow"
            type="text"
            placeholder="Kitap adını yazın..."
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

        {/* kitaplar listesi boşsa */}
        {books.length === 0 && (
      <h4 className="mt-5 text-center text-black">Henüz kitap eklenmedi.</h4>)}

        {/* kitaplar listesi */}
        {books.map((book) => (
          <BookCard
            key={book.id}
            handleModal={handleModal}
            data={book}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </main>

      {/* modal */}
      {showDelete && (
        <DeleteModal
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
        />
      )}
      {showEdit && (
        <EditModal
          updateItem={updateItem}
          setEditingItem={setEditingItem}
          editingItem={editingItem}
          setShowEdit={setShowEdit}
        />
      )}

      {/* bildirimler için */}
      <ToastContainer />
    </div>
  );
}

export default App;
