export type DownloadOptions = {
    /** informs the program to treat <sources> as playlists */
    playlist?: boolean;

    /** informs the program to not download thumbnails */
    noThumbnail?: boolean;

    /** informs the program to not process the music file in any way, download as is */
    noProcessing?: boolean;

    /** informs the program to skip default arguments passed to yt-dlp */
    skipDefaultArgs?: boolean;

    /** list of arguments to pass to yt-dlp */
    ytDlpArgs?: string[];
};
