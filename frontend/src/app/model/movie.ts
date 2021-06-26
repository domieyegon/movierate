export interface IMovie {
    id: number;
    title?: string;
    description?: string;
    no_of_ratings?: number;
    avg_ratings: number;
}
export class Movie implements IMovie {
    constructor(
        public id: number = 0,
        public title?: string,
        public description?: string,
        public no_of_ratings?: number,
        public avg_ratings: number = 0,
    ) { }
}
