import {BaseApi} from './base.api';
import {AuthRouter} from '../authRouter';
import * as _ from 'lodash';

export class UserApi extends BaseApi {

    constructor(db) {
        super(db);
    }

    public registerRoutes(app) {
        app.post('/api/users', this.createOrUpdateUser.bind(this));
        app.get('/api/users/:id', this.getUser.bind(this));
        app.get('/api/userskills/:skill', this.findUserBySkill.bind(this));
    }

    public createOrUpdateUser(req, res) {
        if (req.body && req.body.skills) {
            this.db.skills.insertSkills(req.body.skills);
        }
        this.db.users.createOrUpdateUser(req.body)
            .then((user) => {
                res.send(user);
            });
    }

    public findUserBySkill(req, res) {
        this.db.users.findBySkill(req.params.skill)
            .then((users) => {
                res.send(users);
            });
    }

    public getUser(req, res) {
        this.db.users.findById(req.params.id)
            .then((user) => {
                res.send(user);
            });
    }
}
