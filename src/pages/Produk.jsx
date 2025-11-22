import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

export default function Produk() {
  const [search, setSearch] = useState("");
  const [produk, setProduk] = useState([]);
  const [filteredProduk, setFilteredProduk] = useState([]);

  // state form
  const [idEdit, setIdEdit] = useState(null);
  const [kodeProduk, setKodeProduk] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const fetchData = () => {
    axios
      .get(`http://localhost:3000/produk`)
      .then((response) => {
        setProduk(response.data);
        setFilteredProduk(response.data);
      })
      .catch((error) => console.error("Gagal mengambil data!", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // search filter
  const handleSearch = () => {
    const txt = search.toLowerCase();
    const result = produk.filter(
      (item) =>
        item.nama_produk.toLowerCase().includes(txt) ||
        item.kategori.toLowerCase().includes(txt)
    );
    setFilteredProduk(result);
  };

  const clearForm = () => {
    setIdEdit(null);
    setKodeProduk("");
    setNamaProduk("");
    setKategori("");
    setHarga("");
    setStok("");
    setDeskripsi("");
  };

  const openCreateModal = () => {
    clearForm();
    const modal = Modal.getOrCreateInstance("#modalProduk");
    modal.show();
  };

  const openEditModal = (item) => {
    setIdEdit(item.id);
    setKodeProduk(item.kode_produk);
    setNamaProduk(item.nama_produk);
    setKategori(item.kategori);
    setHarga(item.harga);
    setStok(item.stok);
    setDeskripsi(item.deskripsi);

    const modal = Modal.getOrCreateInstance("#modalProduk");
    modal.show();
  };

  const handleSave = (e) => {
    e.preventDefault();

    const data = {
      kode_produk: kodeProduk,
      nama_produk: namaProduk,
      kategori,
      harga: Number(harga),
      stok: Number(stok),
      deskripsi,
    };

    const url = idEdit
      ? `http://localhost:3000/produk/${idEdit}`
      : `http://localhost:3000/produk`;

    const request = idEdit ? axios.put(url, data) : axios.post(url, data);

    request
      .then(() => fetchData())
      .catch((error) => console.error("Gagal menyimpan data!", error))
      .finally(() => {
        const modal = Modal.getOrCreateInstance("#modalProduk");
        modal.hide();
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus produk?")) return;

    axios
      .delete(`http://localhost:3000/produk/${id}`)
      .then(() => fetchData())
      .catch((err) => console.error("Gagal menghapus!", err));
  };

  return (
    <div className="container mt-4">
      <h3>Data Produk</h3>

      {/* Search */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Cari nama / kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <button className="btn btn-primary mb-3" onClick={openCreateModal}>
        Tambah Produk
      </button>

      {/* Tabel */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Deskripsi</th>
            <th>Tanggal Input</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredProduk.length > 0 ? (
            filteredProduk.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama_produk}</td>
                <td>{item.kategori}</td>
                <td>{item.harga}</td>
                <td>{item.stok}</td>
                <td>{item.deskripsi}</td>
                <td>
                  {new Date(item.tanggal_input).toLocaleDateString("id-ID")}
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr colSpan="8">
              <td colSpan={8} className="py-3 text-center text-secondary">
                Data tidak ada
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Tambah & Edit */}
      <div className="modal fade" id="modalProduk" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSave}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {idEdit ? "Edit Produk" : "Tambah Produk"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                />
              </div>

              <div className="modal-body">
                <div className="form-floating mb-2">
                  <input
                    className="form-control"
                    placeholder="Kode Produk"
                    value={kodeProduk}
                    onChange={(e) => setKodeProduk(e.target.value)}
                    required
                  />
                  <label>Kode Produk</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    className="form-control"
                    placeholder="Nama Produk"
                    value={namaProduk}
                    onChange={(e) => setNamaProduk(e.target.value)}
                    required
                  />
                  <label>Nama Produk</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    className="form-control"
                    placeholder="Kategori"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    required
                  />
                  <label>Kategori</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Harga"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    required
                  />
                  <label>Harga</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Stok"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    required
                  />
                  <label>Stok</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    className="form-control"
                    placeholder="Deskripsi"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                  <label>Deskripsi</label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
