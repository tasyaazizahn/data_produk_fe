import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function ProdukEdit() {
  const [kodeProduk, setKodeProduk] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchDataById = () => {
    axios
      .get(`http://localhost:3000/produk/${id}`)
      .then((res) => {
        const d = res.data;
        setKodeProduk(d.kode_produk);
        setNamaProduk(d.nama_produk);
        setKategori(d.kategori);
        setHarga(d.harga);
        setStok(d.stok);
        setDeskripsi(d.deskripsi);
      })
      .catch((err) => console.error("Gagal memuat data!", err));
  };

  useEffect(() => {
    fetchDataById();
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/produk/${id}`, {
        nama_produk: namaProduk,
        kategori: kategori,
        harga: Number(harga),
        stok: Number(stok),
        deskripsi: deskripsi,
      })
      .then(() => navigate("/produk"))
      .catch((err) => console.error("Gagal mengubah data!", err));
  };

  return (
    <div>
      <div
        className="modal fade"
        id="editProduk"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Edit Data Produk</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEdit}>
                <div className="form-floating mb-1">
                  <input className="form-control" value={kodeProduk} disabled />
                  <label>Kode Produk</label>
                </div>

                <div className="form-floating mb-1">
                  <input
                    className="form-control"
                    value={namaProduk}
                    onChange={(e) => setNamaProduk(e.target.value)}
                  />
                  <label>Nama Produk</label>
                </div>

                <div className="form-floating mb-1">
                  <input
                    className="form-control"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                  />
                  <label>Kategori</label>
                </div>

                <div className="form-floating mb-1">
                  <input
                    className="form-control"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                  />
                  <label>Harga</label>
                </div>

                <div className="form-floating mb-1">
                  <input
                    className="form-control"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                  />
                  <label>Stok</label>
                </div>

                <div className="form-floating mb-1">
                  <textarea
                    className="form-control"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  ></textarea>
                  <label>Deskripsi</label>
                </div>

                <button className="btn btn-primary col-12 mt-3">
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
