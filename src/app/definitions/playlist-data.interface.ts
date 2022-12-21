export interface Playlist {
    id: string; // use this to query for playlist videos
    title: string;
    description: string;
    thumbnail: {
        url: string;
        height: number;
        width: number;
    };
    videos?: Video[];
}

export interface Video {
    videoId: string;
    url: string;
    thumbnail: {
        url: string;
        height: number;
        width: number;
    }
}

export interface Video {
    playlists: Playlist[];
}
