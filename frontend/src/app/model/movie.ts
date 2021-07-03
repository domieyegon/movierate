export interface IMovie {
    id?: number;
    title?: string;
    description?: string;
    no_of_ratings?: number;
    avg_ratings?: number;
    user_rating?: number;
    logo?: string;
}

export class Movie implements IMovie {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public no_of_ratings?: number,
        public avg_ratings?: number,
        public user_rating: number = 0,
        public logo?: string,
    ) { }
}
