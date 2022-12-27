export interface Season {
    id: string; // use this to query for playlist videos
    title: string;
    description: string;
    thumbnail: {
        url: string;
        height: number;
        width: number;
    };
}

export interface Episode {
    videoId: string;
    title: string;
    description: string;
    thumbnail: {
        url: string;
        height: number;
        width: number;
    }
}

export interface CurrentEpisode {
    title: string;
    description: string;
    player: string; // html embed
    thumbnail: {
        url: string;
        height: number;
        width: number;
    }
}
