import { File } from './File';
export class Test {
    constructor (
        public name: string,
        public slug: string,
        public icon: any,
        public topic?: number,
        public subjects?: string[],
        public id?: number
    ){ }
}