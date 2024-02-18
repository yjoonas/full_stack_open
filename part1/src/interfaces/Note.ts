import {Entity} from "./Entity";

export interface Note {
    content: string,
    important: boolean
}

export interface NoteEntity extends Note,Entity {}