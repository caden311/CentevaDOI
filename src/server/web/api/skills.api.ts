
import {BaseApi} from './base.api';

export class SkillsApi extends BaseApi {

    constructor(db) {
        super(db);
    }
    public registerRoutes(app) {
        app.get('/api/skills', this.getSkills.bind(this));
    }

    public getSkills(req, res) {
        this.db.skills.findAll()
            .then((skills) => {
               res.send(skills);
            });
    }
}
