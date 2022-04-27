import * as _ from 'lodash';

export class Skills {
    constructor(data = {}) {
        _.assign(this, data);
    }
    public _id: string;
}
