/** DTO for the selected thumbnail */
type SelectedThumbnailDTO = {
    thumbnail: Thumbnail;
    needsCropping: boolean;
};

/**
 * Selects the thumbnail to be downloaded
 * @param list List of thumbnails
 * @returns
 */
export function selectThumbnail(list: Thumbnail[]): SelectedThumbnailDTO {
    if (list.length === 0) throw new TypeError("thumbnails array is empty");

    const squareThumbnails = list.filter(
        (thumbnail) =>
            "width" in thumbnail && thumbnail.width === thumbnail.height,
    );

    if (squareThumbnails.length !== 0)
        return {
            thumbnail: squareThumbnails.reduce((t1, t2) =>
                t1.width! > t2.width! ? t1 : t2,
            ),

            needsCropping: false,
        };

    console.log(
        "No square thumbnails found. Selecting highest resolution thumbnail for cropping...",
    );

    const allThumbnailsWithDims = list.filter(
        (thumbnail) => "width" in thumbnail && "height" in thumbnail,
    );
    const hasThumbnailsWithDims = allThumbnailsWithDims.length !== 0;
    const sortByKey = (
        hasThumbnailsWithDims ? "width" : "preference"
    ) satisfies keyof Thumbnail;

    return {
        thumbnail: (hasThumbnailsWithDims
            ? allThumbnailsWithDims
            : list
        ).reduce((t1, t2) =>
            (t1[sortByKey] ?? 0) > (t2[sortByKey] ?? 0) ? t1 : t2,
        ),
        needsCropping: true,
    };
}
