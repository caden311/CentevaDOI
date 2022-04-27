/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.web.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.web.ts":
/*!**************************!*\
  !*** ./src/index.web.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __webpack_require__(/*! ./server/web/server */ "./src/server/web/server.ts");
const db_1 = __webpack_require__(/*! ./server/db/db */ "./src/server/db/db.ts");
db_1.DB.create()
    .then((db) => {
    // db.users.insertOne({_id: 'aaaa'})
    //     .then(() => {
    //        console.log('user created');
    //     });
    const server = new server_1.Server();
    server.init(db);
    server.start(3000);
});


/***/ }),

/***/ "./src/server/db/db.ts":
/*!*****************************!*\
  !*** ./src/server/db/db.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = __webpack_require__(/*! mongodb */ "mongodb");
const user_service_1 = __webpack_require__(/*! ./services/user.service */ "./src/server/db/services/user.service.ts");
const _ = __webpack_require__(/*! lodash */ "lodash");
const skills_service_1 = __webpack_require__(/*! ./services/skills.service */ "./src/server/db/services/skills.service.ts");
exports.DB_URL = 'mongodb+srv://caden311:Jntc5hUlom33rhrX@centeva-2mkhc.mongodb.net/test?retryWrites=true&w=majority';
class DB {
    constructor(client, dbName = 'doi') {
        this.users = new user_service_1.UserService();
        this.skills = new skills_service_1.SkillsService();
        this.client = client;
        this.db = client.db(dbName);
        this.collections = {
            Users: this.users,
            Skills: this.skills,
        };
        _.forEach(this.collections, (service, name) => {
            this.initService(service, name);
        });
    }
    static create(url) {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(url || exports.DB_URL, {
                poolSize: 100,
                connectTimeoutMS: 3000000,
                socketTimeoutMS: 3000000,
                keepAlive: 3000000,
                useNewUrlParser: true,
            }, (err, client) => {
                if (err) {
                    console.log(err);
                }
                const db = new DB(client, 'doi');
                resolve(db);
            });
        });
    }
    close() {
        return new Promise((resolve) => {
            this.client.close(true, () => resolve());
        });
    }
    initService(service, collectionName) {
        service.collection = this.db.collection(collectionName);
        service.getService = (name) => {
            if (this[name] && this[name].collection) {
                return this[name];
            }
        };
    }
}
exports.DB = DB;


/***/ }),

/***/ "./src/server/db/services/skills.service.ts":
/*!**************************************************!*\
  !*** ./src/server/db/services/skills.service.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _ = __webpack_require__(/*! lodash */ "lodash");
class SkillsService {
    constructor() {
    }
    findAll() {
        return this.collection.find({}).toArray()
            .then((data) => {
            return _.map(data, (d) => d._id);
        });
    }
    insertSkills(skills) {
        const insertSkills = _.map(skills, (skill) => {
            return { _id: skill.name };
        });
        return this.collection.insertMany(insertSkills, { ordered: false })
            .catch((err) => {
            // Ignore duplicates..
            return;
        });
    }
}
exports.SkillsService = SkillsService;


/***/ }),

/***/ "./src/server/db/services/user.service.ts":
/*!************************************************!*\
  !*** ./src/server/db/services/user.service.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionTokenExpiresIn = 3600 * 24; // 24 hours
class UserService {
    constructor() {
    }
    createOrUpdateUser(userObj) {
        return this.collection.findOne({ _id: userObj._id })
            .then((user) => {
            if (user) {
                return this.collection.updateOne({ _id: user._id }, {
                    $set: {
                        firstname: userObj.firstname,
                        lastname: userObj.lastname || null,
                        updatedAt: new Date(),
                        skills: userObj.skills,
                    },
                });
            }
            else {
                return this.collection.insertOne(userObj)
                    .then(() => {
                    return userObj;
                });
            }
        });
    }
    findBySkill(skill) {
        return this.collection.find({ 'skills.name': skill }).toArray();
    }
    // public createUser(userObj: ICreateUserObj) {
    //     const hash = PasswordHash.generate(userObj.password);
    //     const newUser = {_id: userObj._id, passwordHash: hash, createdAt: new Date(), updatedAt: new Date()};
    //     return this.collection.insertOne(newUser)
    //         .then((data) => {
    //             return newUser;
    //         });
    // }
    //
    // public loginUser(user: ICreateUserObj) {
    //     const resObj = {
    //         success: false,
    //         code: 403,
    //         token: null,
    //     };
    //     return this.collection.findOne({_id: user._id})
    //         .then((foundUser) => {
    //            if (PasswordHash.verify(user.password, foundUser.passwordHash)) {
    //                resObj.success = true;
    //                resObj.code = 200;
    //                resObj.token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: SessionTokenExpiresIn });
    //            }
    //            return resObj;
    //         });
    // }
    findById(id) {
        return this.collection.findOne({ _id: id });
    }
}
exports.UserService = UserService;


/***/ }),

/***/ "./src/server/web/api/base.api.ts":
/*!****************************************!*\
  !*** ./src/server/web/api/base.api.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BaseApi {
    constructor(db) {
        this.db = db;
    }
}
exports.BaseApi = BaseApi;


/***/ }),

/***/ "./src/server/web/api/skills.api.ts":
/*!******************************************!*\
  !*** ./src/server/web/api/skills.api.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_api_1 = __webpack_require__(/*! ./base.api */ "./src/server/web/api/base.api.ts");
class SkillsApi extends base_api_1.BaseApi {
    constructor(db) {
        super(db);
    }
    registerRoutes(app) {
        app.get('/api/skills', this.getSkills.bind(this));
    }
    getSkills(req, res) {
        this.db.skills.findAll()
            .then((skills) => {
            res.send(skills);
        });
    }
}
exports.SkillsApi = SkillsApi;


/***/ }),

/***/ "./src/server/web/api/user.api.ts":
/*!****************************************!*\
  !*** ./src/server/web/api/user.api.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const base_api_1 = __webpack_require__(/*! ./base.api */ "./src/server/web/api/base.api.ts");
class UserApi extends base_api_1.BaseApi {
    constructor(db) {
        super(db);
    }
    registerRoutes(app) {
        app.post('/api/users', this.createOrUpdateUser.bind(this));
        app.get('/api/users/:id', this.getUser.bind(this));
        app.get('/api/userskills/:skill', this.findUserBySkill.bind(this));
    }
    createOrUpdateUser(req, res) {
        if (req.body && req.body.skills) {
            this.db.skills.insertSkills(req.body.skills);
        }
        this.db.users.createOrUpdateUser(req.body)
            .then((user) => {
            res.send(user);
        });
    }
    findUserBySkill(req, res) {
        this.db.users.findBySkill(req.params.skill)
            .then((users) => {
            res.send(users);
        });
    }
    getUser(req, res) {
        this.db.users.findById(req.params.id)
            .then((user) => {
            res.send(user);
        });
    }
}
exports.UserApi = UserApi;


/***/ }),

/***/ "./src/server/web/server.ts":
/*!**********************************!*\
  !*** ./src/server/web/server.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express = __webpack_require__(/*! express */ "express");
const Parser = __webpack_require__(/*! body-parser */ "body-parser");
const cors = __webpack_require__(/*! cors */ "cors");
const user_api_1 = __webpack_require__(/*! ./api/user.api */ "./src/server/web/api/user.api.ts");
const skills_api_1 = __webpack_require__(/*! ./api/skills.api */ "./src/server/web/api/skills.api.ts");
class Server {
    constructor() {
    }
    init(db) {
        this.db = db;
        this.app = express();
        this.app.use(Parser.json({ limit: '50mb' }));
        this.app.use(Parser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
        this.initApi(this.db);
    }
    start(port = 3000) {
        return new Promise((resolve, reject) => {
            this.app.get('/', (req, res) => res.send('Hello World!'));
            this.server = this.app.listen(port, () => {
                console.log(`WebServer listening on port ${port}`);
                resolve();
            });
        });
    }
    initApi(db) {
        const apis = [
            new user_api_1.UserApi(db),
            new skills_api_1.SkillsApi(db),
        ];
        this.registerRoutes(apis);
    }
    registerRoutes(apis) {
        apis.forEach((api) => {
            api.registerRoutes(this.app);
        });
    }
}
exports.Server = Server;


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LndlYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL2RiL2RiLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvZGIvc2VydmljZXMvc2tpbGxzLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci9kYi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci93ZWIvYXBpL2Jhc2UuYXBpLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvd2ViL2FwaS9za2lsbHMuYXBpLnRzIiwid2VicGFjazovLy8uL3NyYy9zZXJ2ZXIvd2ViL2FwaS91c2VyLmFwaS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmVyL3dlYi9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZGFzaFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1vbmdvZGJcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxPQUFPLENBQUMsRUFBRTtRQUNiLE1BQU0sSUFBSSxHQUFlO1lBQ3JCLElBQUksa0JBQU8sQ0FBQyxFQUFFLENBQUM7WUFDZixJQUFJLHNCQUFTLENBQUMsRUFBRSxDQUFDO1NBQ3BCLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxjQUFjLENBQUMsSUFBZ0I7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBMUNELHdCQTBDQzs7Ozs7Ozs7Ozs7O0FDbkRELHdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG9DOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLG9DIiwiZmlsZSI6IndlYi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC53ZWIudHNcIik7XG4iLCJpbXBvcnQge1NlcnZlcn0gZnJvbSAnLi9zZXJ2ZXIvd2ViL3NlcnZlcic7XG5pbXBvcnQge0RCfSBmcm9tICcuL3NlcnZlci9kYi9kYic7XG5cbkRCLmNyZWF0ZSgpXG4gICAgLnRoZW4oKGRiOiBEQikgPT4ge1xuICAgICAgICAvLyBkYi51c2Vycy5pbnNlcnRPbmUoe19pZDogJ2FhYWEnfSlcbiAgICAgICAgLy8gICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKCd1c2VyIGNyZWF0ZWQnKTtcbiAgICAgICAgLy8gICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICAgICAgc2VydmVyLmluaXQoZGIpO1xuICAgICAgICBzZXJ2ZXIuc3RhcnQoMzAwMCk7XG4gICAgfSk7XG5cblxuIiwiaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tICdtb25nb2RiJztcbmltcG9ydCB7VXNlclNlcnZpY2V9IGZyb20gJy4vc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7U2tpbGxzU2VydmljZX0gZnJvbSAnLi9zZXJ2aWNlcy9za2lsbHMuc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBEQl9VUkwgPSAnbW9uZ29kYitzcnY6Ly9jYWRlbjMxMTpKbnRjNWhVbG9tMzNyaHJYQGNlbnRldmEtMm1raGMubW9uZ29kYi5uZXQvdGVzdD9yZXRyeVdyaXRlcz10cnVlJnc9bWFqb3JpdHknO1xuXG5leHBvcnQgY2xhc3MgREIge1xuICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh1cmw/OiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBNb25nb0NsaWVudC5jb25uZWN0KHVybCB8fCBEQl9VUkwsIHtcbiAgICAgICAgcG9vbFNpemU6IDEwMCxcbiAgICAgICAgY29ubmVjdFRpbWVvdXRNUzogMzAwMDAwMCxcbiAgICAgICAgc29ja2V0VGltZW91dE1TOiAzMDAwMDAwLFxuICAgICAgICBrZWVwQWxpdmU6IDMwMDAwMDAsXG4gICAgICAgIHVzZU5ld1VybFBhcnNlcjogdHJ1ZSxcbiAgICAgIH0gYXMgYW55LCAoZXJyLCBjbGllbnQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGIgPSBuZXcgREIoY2xpZW50LCAnZG9pJyk7XG4gICAgICAgIHJlc29sdmUoZGIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2xpZW50OiBhbnk7XG4gIHB1YmxpYyBkYjogYW55O1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbGxlY3Rpb25zO1xuICBwdWJsaWMgdXNlcnM6IFVzZXJTZXJ2aWNlID0gbmV3IFVzZXJTZXJ2aWNlKCk7XG4gIHB1YmxpYyBza2lsbHM6IFNraWxsc1NlcnZpY2UgID0gbmV3IFNraWxsc1NlcnZpY2UoKTtcblxuICBjb25zdHJ1Y3RvcihjbGllbnQsIGRiTmFtZSA9ICdkb2knKSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgdGhpcy5kYiA9IGNsaWVudC5kYihkYk5hbWUpO1xuICAgIHRoaXMuY29sbGVjdGlvbnMgPSB7XG4gICAgICAgIFVzZXJzOiB0aGlzLnVzZXJzLFxuICAgICAgICBTa2lsbHM6IHRoaXMuc2tpbGxzLFxuICAgIH07XG4gICAgXy5mb3JFYWNoKHRoaXMuY29sbGVjdGlvbnMsIChzZXJ2aWNlLCBuYW1lKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdFNlcnZpY2Uoc2VydmljZSwgbmFtZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC5jbG9zZSh0cnVlLCAoKSA9PiByZXNvbHZlKCkpO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgaW5pdFNlcnZpY2Uoc2VydmljZSwgY29sbGVjdGlvbk5hbWUpIHtcbiAgICAgIHNlcnZpY2UuY29sbGVjdGlvbiA9IHRoaXMuZGIuY29sbGVjdGlvbihjb2xsZWN0aW9uTmFtZSk7XG4gICAgICBzZXJ2aWNlLmdldFNlcnZpY2UgPSAobmFtZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzW25hbWVdICYmIHRoaXNbbmFtZV0uY29sbGVjdGlvbikge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lXTtcbiAgICAgICAgICB9XG4gICAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7U2tpbGxzfSBmcm9tICcuLi8uLi8uLi9jb21tb24vbW9kZWxzL3NraWxscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2tpbGxzU2VydmljZSB7XHJcbiAgICBwdWJsaWMgY29sbGVjdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluZEFsbCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmZpbmQoe30pLnRvQXJyYXkoKVxyXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ubWFwKGRhdGEsIChkKSA9PiBkLl9pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbnNlcnRTa2lsbHMoc2tpbGxzOiBTa2lsbHNbXSkge1xyXG4gICAgICAgIGNvbnN0IGluc2VydFNraWxscyA9IF8ubWFwKHNraWxscywgKHNraWxsKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7X2lkOiBza2lsbC5uYW1lfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmluc2VydE1hbnkoaW5zZXJ0U2tpbGxzLCB7b3JkZXJlZDogZmFsc2V9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIGR1cGxpY2F0ZXMuLlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge1VzZXJ9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9tb2RlbHMvdXNlcic7XG5pbXBvcnQge0lDcmVhdGVVc2VyT2JqfSBmcm9tICcuLi8uLi8uLi9jb21tb24vaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZSc7XG5pbXBvcnQgKiBhcyBQYXNzd29yZEhhc2ggZnJvbSAncGFzc3dvcmQtaGFzaCc7XG5pbXBvcnQgKiBhcyBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcbmltcG9ydCB7U0VDUkVUfSBmcm9tICcuLi8uLi93ZWIvYXV0aFJvdXRlcic7XG5leHBvcnQgY29uc3QgU2Vzc2lvblRva2VuRXhwaXJlc0luID0gMzYwMCAqIDI0OyAgICAvLyAyNCBob3Vyc1xuXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xuICAgIHB1YmxpYyBjb2xsZWN0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU9yVXBkYXRlVXNlcih1c2VyT2JqOiBJQ3JlYXRlVXNlck9iaikge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmZpbmRPbmUoe19pZDogdXNlck9iai5faWR9KVxuICAgICAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi51cGRhdGVPbmUoe19pZDogdXNlci5faWR9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0bmFtZTogdXNlck9iai5maXJzdG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0bmFtZTogdXNlck9iai5sYXN0bmFtZSB8fCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2tpbGxzOiB1c2VyT2JqLnNraWxscyxcbiAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5pbnNlcnRPbmUodXNlck9iailcbiAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJPYmo7XG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgZmluZEJ5U2tpbGwoc2tpbGw6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmZpbmQoeydza2lsbHMubmFtZSc6IHNraWxsfSkudG9BcnJheSgpO1xuICAgIH1cbiAgICAvLyBwdWJsaWMgY3JlYXRlVXNlcih1c2VyT2JqOiBJQ3JlYXRlVXNlck9iaikge1xuICAgIC8vICAgICBjb25zdCBoYXNoID0gUGFzc3dvcmRIYXNoLmdlbmVyYXRlKHVzZXJPYmoucGFzc3dvcmQpO1xuICAgIC8vICAgICBjb25zdCBuZXdVc2VyID0ge19pZDogdXNlck9iai5faWQsIHBhc3N3b3JkSGFzaDogaGFzaCwgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLCB1cGRhdGVkQXQ6IG5ldyBEYXRlKCl9O1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLmluc2VydE9uZShuZXdVc2VyKVxuICAgIC8vICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm4gbmV3VXNlcjtcbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vIH1cbiAgICAvL1xuICAgIC8vIHB1YmxpYyBsb2dpblVzZXIodXNlcjogSUNyZWF0ZVVzZXJPYmopIHtcbiAgICAvLyAgICAgY29uc3QgcmVzT2JqID0ge1xuICAgIC8vICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgLy8gICAgICAgICBjb2RlOiA0MDMsXG4gICAgLy8gICAgICAgICB0b2tlbjogbnVsbCxcbiAgICAvLyAgICAgfTtcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5maW5kT25lKHtfaWQ6IHVzZXIuX2lkfSlcbiAgICAvLyAgICAgICAgIC50aGVuKChmb3VuZFVzZXIpID0+IHtcbiAgICAvLyAgICAgICAgICAgIGlmIChQYXNzd29yZEhhc2gudmVyaWZ5KHVzZXIucGFzc3dvcmQsIGZvdW5kVXNlci5wYXNzd29yZEhhc2gpKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgcmVzT2JqLnN1Y2Nlc3MgPSB0cnVlO1xuICAgIC8vICAgICAgICAgICAgICAgIHJlc09iai5jb2RlID0gMjAwO1xuICAgIC8vICAgICAgICAgICAgICAgIHJlc09iai50b2tlbiA9IGp3dC5zaWduKHsgdXNlcklkOiB1c2VyLl9pZCB9LCBTRUNSRVQsIHsgZXhwaXJlc0luOiBTZXNzaW9uVG9rZW5FeHBpcmVzSW4gfSk7XG4gICAgLy8gICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICByZXR1cm4gcmVzT2JqO1xuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gfVxuXG4gICAgcHVibGljIGZpbmRCeUlkKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24uZmluZE9uZSh7X2lkOiBpZH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7REJ9IGZyb20gJy4uLy4uL2RiL2RiJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VBcGkge1xuICAgIHB1YmxpYyBkYjogREI7XG4gICAgcHVibGljIGFic3RyYWN0IHJlZ2lzdGVyUm91dGVzKGFwcCk7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZGIpIHtcbiAgICAgICAgdGhpcy5kYiA9IGRiO1xuICAgIH1cbn1cbiIsIlxyXG5pbXBvcnQge0Jhc2VBcGl9IGZyb20gJy4vYmFzZS5hcGknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNraWxsc0FwaSBleHRlbmRzIEJhc2VBcGkge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRiKSB7XHJcbiAgICAgICAgc3VwZXIoZGIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlZ2lzdGVyUm91dGVzKGFwcCkge1xyXG4gICAgICAgIGFwcC5nZXQoJy9hcGkvc2tpbGxzJywgdGhpcy5nZXRTa2lsbHMuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNraWxscyhyZXEsIHJlcykge1xyXG4gICAgICAgIHRoaXMuZGIuc2tpbGxzLmZpbmRBbGwoKVxyXG4gICAgICAgICAgICAudGhlbigoc2tpbGxzKSA9PiB7XHJcbiAgICAgICAgICAgICAgIHJlcy5zZW5kKHNraWxscyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7QmFzZUFwaX0gZnJvbSAnLi9iYXNlLmFwaSc7XG5pbXBvcnQge0F1dGhSb3V0ZXJ9IGZyb20gJy4uL2F1dGhSb3V0ZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY2xhc3MgVXNlckFwaSBleHRlbmRzIEJhc2VBcGkge1xuXG4gICAgY29uc3RydWN0b3IoZGIpIHtcbiAgICAgICAgc3VwZXIoZGIpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3RlclJvdXRlcyhhcHApIHtcbiAgICAgICAgYXBwLnBvc3QoJy9hcGkvdXNlcnMnLCB0aGlzLmNyZWF0ZU9yVXBkYXRlVXNlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgYXBwLmdldCgnL2FwaS91c2Vycy86aWQnLCB0aGlzLmdldFVzZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIGFwcC5nZXQoJy9hcGkvdXNlcnNraWxscy86c2tpbGwnLCB0aGlzLmZpbmRVc2VyQnlTa2lsbC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlT3JVcGRhdGVVc2VyKHJlcSwgcmVzKSB7XG4gICAgICAgIGlmIChyZXEuYm9keSAmJiByZXEuYm9keS5za2lsbHMpIHtcbiAgICAgICAgICAgIHRoaXMuZGIuc2tpbGxzLmluc2VydFNraWxscyhyZXEuYm9keS5za2lsbHMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGIudXNlcnMuY3JlYXRlT3JVcGRhdGVVc2VyKHJlcS5ib2R5KVxuICAgICAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh1c2VyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBmaW5kVXNlckJ5U2tpbGwocmVxLCByZXMpIHtcbiAgICAgICAgdGhpcy5kYi51c2Vycy5maW5kQnlTa2lsbChyZXEucGFyYW1zLnNraWxsKVxuICAgICAgICAgICAgLnRoZW4oKHVzZXJzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzLnNlbmQodXNlcnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFVzZXIocmVxLCByZXMpIHtcbiAgICAgICAgdGhpcy5kYi51c2Vycy5maW5kQnlJZChyZXEucGFyYW1zLmlkKVxuICAgICAgICAgICAgLnRoZW4oKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICByZXMuc2VuZCh1c2VyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgKiBhcyBQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xuaW1wb3J0ICogYXMgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCB7VXNlckFwaX0gZnJvbSAnLi9hcGkvdXNlci5hcGknO1xuaW1wb3J0IHtCYXNlQXBpfSBmcm9tICcuL2FwaS9iYXNlLmFwaSc7XG5pbXBvcnQge1Nlc3Npb25BcGl9IGZyb20gJy4vc2Vzc2lvbi9zZXNzaW9uLmFwaSc7XG5pbXBvcnQge0RCfSBmcm9tICcuLi9kYi9kYic7XG5pbXBvcnQge1NraWxsc0FwaX0gZnJvbSAnLi9hcGkvc2tpbGxzLmFwaSc7XG5cbmV4cG9ydCBjbGFzcyBTZXJ2ZXIge1xuXG4gICAgcHVibGljIGRiOiBEQjtcbiAgICBwdWJsaWMgYXBwO1xuICAgIHB1YmxpYyBzZXJ2ZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgcHVibGljIGluaXQoZGIpIHtcbiAgICAgICAgdGhpcy5kYiA9IGRiO1xuICAgICAgICB0aGlzLmFwcCA9IGV4cHJlc3MoKTtcbiAgICAgICAgdGhpcy5hcHAudXNlKFBhcnNlci5qc29uKHsgbGltaXQ6ICc1MG1iJyB9KSk7XG4gICAgICAgIHRoaXMuYXBwLnVzZShQYXJzZXIudXJsZW5jb2RlZCh7IGxpbWl0OiAnNTBtYicsIGV4dGVuZGVkOiB0cnVlIH0pKTtcbiAgICAgICAgdGhpcy5hcHAudXNlKGNvcnMoKSk7XG5cbiAgICAgICAgdGhpcy5pbml0QXBpKHRoaXMuZGIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGFydChwb3J0OiBudW1iZXIgPSAzMDAwKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwLmdldCgnLycsIChyZXEsIHJlcykgPT4gcmVzLnNlbmQoJ0hlbGxvIFdvcmxkIScpKVxuXG4gICAgICAgICAgICB0aGlzLnNlcnZlciA9IHRoaXMuYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFdlYlNlcnZlciBsaXN0ZW5pbmcgb24gcG9ydCAke3BvcnR9YCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBpbml0QXBpKGRiKSB7XG4gICAgICAgIGNvbnN0IGFwaXM6IEJhc2VBcGkgW10gPSBbXG4gICAgICAgICAgICBuZXcgVXNlckFwaShkYiksXG4gICAgICAgICAgICBuZXcgU2tpbGxzQXBpKGRiKSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclJvdXRlcyhhcGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJSb3V0ZXMoYXBpczogQmFzZUFwaSBbXSkge1xuICAgICAgICBhcGlzLmZvckVhY2goKGFwaSkgPT4ge1xuICAgICAgICAgICBhcGkucmVnaXN0ZXJSb3V0ZXModGhpcy5hcHApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvZGJcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==