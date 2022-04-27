import * as _ from 'lodash';
import {Skills} from '../../../common/models/skills';

export class SkillsService {
    public collection;

    constructor() {
    }

    public findAll() {
        return this.collection.find({}).toArray()
            .then((data) => {
                return _.map(data, (d) => d._id);
            });
    }

    public insertSkills(skills: Skills[]) {
        const insertSkills = _.map(skills, (skill) => {
            return {_id: skill.name};
        });
        return this.collection.insertMany(insertSkills, {ordered: false})
            .catch((err) => {
                // Ignore duplicates..
                return;
            });
    }
}
