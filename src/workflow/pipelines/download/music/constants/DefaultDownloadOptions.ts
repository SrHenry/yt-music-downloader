export const playlist = false;
export const noThumbnail = false;
export const noProcessing = false;
export const skipDefaultArgs = false;
export const ytDlpArgs: string[] = [];
export const outputDir: string | null = null;

export const DefaultDownloadOptions = {
    playlist,
    noThumbnail,
    noProcessing,
    skipDefaultArgs,
    ytDlpArgs,
    outputDir,
} as const;

export default DefaultDownloadOptions;
