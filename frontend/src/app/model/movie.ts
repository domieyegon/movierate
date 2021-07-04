export interface IMovie {
    id?: number;
    title?: string;
    title_temp?: string;
    description?: string;
    description_temp?: string;
    no_of_ratings?: number;
    avg_ratings?: number;
    user_rating?: number;
    user_rating_temp?: number;
    logo?: string;
}

export class Movie implements IMovie {
    constructor(
        public id?: number,
        public title?: string,
        public title_temp?: string,
        public description?: string,
        public description_temp?: string,
        public no_of_ratings?: number,
        public avg_ratings?: number,
        public user_rating: number = 0,
        public user_rating_temp: number = 0,
        public logo?: string,
    ) { }
}
