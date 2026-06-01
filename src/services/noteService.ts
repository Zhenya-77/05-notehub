import axios from "axios";
import type { GetNotes, Note, NewNoteData } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common.Authorization = `Bearer ${
  import.meta.env.VITE_NOTEHUB_TOKEN
}`;

interface fetchNotesProps {
  page: number;
  searchQuery?: string;
}

export async function fetchNotes({ page, searchQuery }: fetchNotesProps) {
  const res = await axios.get<GetNotes>("/notes", {
    params: {
      page,
      ...(searchQuery && { search: searchQuery }),
      perPage: 12,
    },
  });

  console.log(res.data);

  return res.data;
}

export async function createNote(noteData: NewNoteData) {
  const res = await axios.post<Note>("/notes", noteData);
  return res.data;
}

export async function deleteNote(noteId: string) {
  const res = await axios.delete(`/notes/${noteId}`);
  return res.data;
}
