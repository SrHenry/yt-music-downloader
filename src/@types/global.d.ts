/** Thumbnail object from Youtube API */
declare interface Thumbnail {
    /** Thumbnail ID from Youtube API */
    id: string;

    /** Thumbnail URL to fetch */
    url: string;

    /** Thumbnail preference to order the thumbnail collection */
    preference: number;

    /** Thumbnail width */
    width?: number;

    /** Thumbnail height*/
    height?: number;

    /** Thumbnail resolution (`width`x`height`) */
    resolution?: string;
}

/** Thumbnails collection */
declare type Thumbnails = Thumbnail[];

declare type Prettify<T> = {
    [K in keyof T]: T[K]
} & {};