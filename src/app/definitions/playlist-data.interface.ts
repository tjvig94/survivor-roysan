export interface Playlist {
    id: string; // use this to query for playlist videos
    title: string;
    description: string;
    thumbnail: {
        url: string;
        height: number;
        width: number;
    };
}

export interface Video {
    videoId: string;
    thumbnail: {
        url: string;
        height: number;
        width: number;
    }
}
