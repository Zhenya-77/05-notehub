import { fetchNotes } from "../../services/noteService";
import Modal from "../Modal/Modal";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../blablabal/SearchBox";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [deboucedValue] = useDebounce(inputValue, 300);

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", currentPage, deboucedValue],
    queryFn: () =>
      fetchNotes({ page: currentPage, searchQuery: deboucedValue }),
    placeholderData: keepPreviousData,
  });

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={setInputValue} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isOpenModal && (
        <Modal closeModal={closeModal}>
          {<NoteForm closeModal={closeModal} />}
        </Modal>
      )}
    </div>
  );
}

export default App;
