import axios from 'axios';
import { useStore } from '../stores/PlanStore';
import { jwtDecode } from "jwt-decode";
import router from '../router';

const host = 'mypew.ru:7070'; //имя или ip хоста api
const admin = useStore();

//---------------------------------------------------------------------------------------------------
//--------------------------------------------------AUTH---------------------------------------------
//---------------------------------------------------------------------------------------------------
export async function authorization(login, password) {
    let response = '';
    let request = {
        login: login,
        password: password
    }
    await axios
        .post('https://' + host + '/login', request)
        .then((response_jwt) => {
            console.log(response_jwt);
            if (response_jwt.data.jwt) {
                //-----------------
                let responseJwt = jwtDecode(response_jwt.data.jwt);
                console.log(responseJwt);
                //-----------------
                localStorage.setItem('skos-token', response_jwt.data.jwt);

                response = 'successfully';
            } else {
                response = response_jwt.data.error;
            }
        })
    return response;
}

export function verify() {
    admin.isAuth = false;
    let request = {
        'jwt': localStorage.getItem('skos-token'),
    }
    axios
        .post('https://' + host + '/token_verify', request)
        .then((response) => {
            if (response.data.token_verify) admin.isAuth = true;
            else router.push('/');
        })
}
//---------------------------------------------------------------------------------------------------
//--------------------------------------------------GET----------------------------------------------
//---------------------------------------------------------------------------------------------------

export function preLoad() {
    if (admin.isPreLoad) return;
    getDirection();
    getDivision();
    getProfession();
    getSection();
    getRole();
    getUser();
    getUsers();
    getPlan();
    getStatement();
    getCompany();
    getNotify();
    getPosition();
    admin.isPreLoad = true;
}

export function getDirection() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'directions_info',
    };
    axios
        .post('https://'+host+'/directions', request)
        .then(response => {
            admin.directions = {};
            response.data.forEach((direction) => {
                admin.directions[direction.id] = direction;
            })
        });
}

export function getDivision() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'divisions_info',
    };
    axios
        .post('https://'+host+'/divisions', request)
        .then(response => {
            admin.divisions = {};
            response.data.forEach((division) => {
                admin.divisions[division.id] = division;
            })
        });
}

export function getProfession() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'professions_info',
        'type_info': 'full'
    };
    axios
        .post('https://'+host+'/professions', request)
        .then(response => {
            response.data.forEach((profession) => {
                admin.professions[profession.id] = profession;
            });
        });
}

export async function getProfessionAsync() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'professions_info',
        'type_info': 'full'
    };
    await axios
        .post('https://'+host+'/professions', request)
        .then(response => {
            let professions = response.data;
            professions.forEach((element) => {
                admin.professions[element.id] = element;
            });
        });
}

export function getSection() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'sections_info',
    };
    axios
        .post('https://'+host+'/sections', request)
        .then(response => {
            admin.sections = {};
            response.data.forEach((section) => {
                admin.sections[section.id] = section;
            })
        });
}

export function getRole() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'roles_info',
    };
    axios
        .post('https://'+host+'/roles', request)
        .then(response => {
            admin.roles = {};
            response.data.forEach((role) => {
                admin.roles[role.id] = role;
            })
    });
}

export function getUser() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request':'user_info',
    }
    axios
        .post('https://' + host + '/accounts', request)
        .then((response) => {
            admin.user = response.data;
        })
}

export function getUsers() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request':'users_info',
    }
    axios
        .post('https://' + host + '/accounts', request)
        .then((response) => {
            admin.users = response.data;
        })
}

export function getPlan() {
    localStorage.setItem('skos-year', admin.academic_year)
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'VIEW',
        'academic_year': admin.academic_year,
        'table_type': 2,
    };
    axios
        .post('https://'+host+'/table', request)
        .then(response => {
            admin.plan = response.data;
        });
}

export function getStatement() {
    localStorage.setItem('skos-year', admin.academic_year)
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'VIEW_STATEMENT',
        'academic_year': admin.academic_year,
        'table_type': 2,
    };
    axios.post('https://'+host+'/table', request)
        .then(response => {
            let statement = response.data;
            statement.forEach(profession => {
                profession.count_directions = 0;
                profession.count_people = 0;
                profession.count_people_fact = 0;
                profession.count_people_trained = 0;
                profession.directions.forEach((direction, index_direction) => {
                    profession.count_people += direction.count_people;
                    profession.count_people_fact += direction.count_people_fact;
                    profession.count_people_trained += direction.count_people_trained;
                    profession.count_directions++;
                });
            });
            admin.statement = statement;
        });
}

export function getNotify() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'notifications_info',
    };
    axios
        .post('https://'+host+'/notifications', request)
        .then(response => {
            response.data.forEach((notif) => {
                admin.notify[notif.id] = notif;
            })
        });
}

export function getCompany() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'companies_info',
    };
    axios
        .post('https://'+host+'/companies', request)
        .then(response => {
            admin.companies = response.data;
        });
}

export function getPosition() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'positions_info',
    };
    axios
        .post('https://'+host+'/positions', request)
        .then(response => {
            admin.positions = response.data;
        });
}

//---------------------------------------------------------------------------------------------------
//--------------------------------------------------SAVE---------------------------------------------
//---------------------------------------------------------------------------------------------------

export function saveDirection() {
    let directions = [];
    for (let i in admin.directions) if (typeof admin.directions[i].status !== "undefined" && admin.directions[i].status != 3) directions.push(admin.directions[i]);

    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'directions': directions,
        'type_request': 'directions_change',
    };
    axios
        .post('https://' + host + '/directions', request)
        .then((response) => {
            getDirection();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(request, response);
        })
}

export function saveDivision() {
    let divisions = [];
    for (let i in admin.divisions) if (typeof admin.divisions[i].status !== "undefined" && admin.divisions[i].status != 3) divisions.push(admin.divisions[i]);

    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'divisions': divisions,
        'type_request': 'divisions_change',
    };
    axios
        .post('https://' + host + '/divisions', request)
        .then((response) => {
            getDivision();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(request, response);
        })
}

export function saveRole() {
    let roles = [];
    for (let i in admin.roles) {
        if (typeof admin.roles[i].status !== "undefined" && admin.roles[i].status != 3) roles.push(admin.roles[i]);
    }

    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'roles': roles,
        'type_request': 'roles_change',
    };
    axios
        .post('https://' + host + '/roles', request)
        .then((response) => {
            console.log(request);
            getRole();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(response);
        })
}

export function saveProfession() {
    let professions = [];
    for (let id in admin.professions) {
        if (typeof admin.professions[id].status !== "undefined" && admin.professions[id].status != 3) professions.push(admin.professions[id]);
    }

    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'professions': professions,
        'type_request': 'professions_change',
    };
    axios
        .post('https://' + host + '/professions', request)
        .then((response) => {
            saveProfessionGroup();
        });
    
}

export async function saveProfessionGroup() {
    let profession_groups = [];
    for (let id in admin.professions) { 
        let groups = admin.professions[id].groups.filter((group) => {
            group.name_prof = admin.professions[id].name;
            return typeof group.status !== "undefined" && group.status != 3;
        });
        profession_groups = profession_groups.concat(groups);
        if (admin.professions[id].id == null) delete(admin.professions[id]);
    }
    await getProfessionAsync();
    let idName = {};
    for (let id in admin.professions) { 
        idName[admin.professions[id].name] = id;
    }
    profession_groups.forEach((element) => {element.id_profession = idName[element.name_prof]});
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'profession_groups': profession_groups,
        'type_request': 'profession_groups_change',
    };
    axios
        .post('https://' + host + '/profession_groups', request)
        .then((response) => {
            getProfession();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(response);
        });
}

export function saveSection() {
    let sections = [];
    for (let i in admin.sections) if (typeof admin.sections[i].status !== "undefined" && admin.sections[i].status != 3) sections.push(admin.sections[i]);

    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'sections': sections,
        'type_request': 'sections_change',
    };
    axios
        .post('https://' + host + '/sections', request)
        .then((response) => {
            getSection();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(response);
        })
}

export function saveUsers(id) {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'user': admin.users[id],
        'type_request': 'user_change',
    }
    axios
        .post('https://' + host + '/accounts', request)
        .then((response) => {
            if (response.data == 'OK') {
                getUsers();
                alert('Успешно сохранено!');
            }
            else {
                alert('Ошибка при сохранении');
                console.log(request, response)
            };
            router.push('/admin/users/all');
        })
}

export function savePlan() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': "SAVE",
        'training_list': [],
        'academic_year': admin.academic_year,
        'table_type': 2
    }
    admin.plan.arr_plan.forEach((division) => {
        division.arr_chapter.forEach((chapter) => {
            chapter.arr_profession.forEach((profession) => {
                if (profession.status == undefined) return;
                let profession_groups = [];
                profession.code.forEach((code, index_code) => {
                    profession_groups.push({
                        "id":code.id,
                        "id_PG":code.name,
                        "status":code.status,
                    });
                });
                let directions = [];
                profession.direction.forEach((direction, index_direction) => {
                    directions.push({
                        "id":direction.id,
                        "status":direction.status,
                        "id_direction":direction.id_direction,
                        "count_people":profession.count[index_direction],
                        "date_start_training":profession.start_o[index_direction],
                        "date_start_industrial_training":profession.start_po[index_direction],
                        "date_end_industrial_training":profession.end_po[index_direction],
                        "date_exam":profession.qual_ex[index_direction],
                    });
                });
                request.training_list.push({
                    "id":profession.id, 
                    "status":profession.status,
                    "academic_year":admin.plan.year,
                    "table_type":2,
                    "id_division":division.division,
                    "id_section":chapter.title,
                    "id_profession":profession.name,
                    "profession_groups": profession_groups,
                    "directions":directions,
                    "to1":profession.to1,
                    "per":profession.per,
                    "indt":profession.indt,
                    "tren":profession.tren,
                    "exam":profession.exam,
                    "to2":profession.to2,
                    "po":profession.po
                });
            });
        });
    });
    console.log(request);
    axios
        .post('https://' + host + '/table', request)
        .then((response) => {
            getPlan();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(response);
        })
}

export function saveStatement() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': "SAVE_STATEMENT",
        'training_list': admin.statement,
        'academic_year': admin.academic_year,
        'table_type': 2
    }
    axios
        .post('https://' + host + '/table', request)
        .then((response) => {
            getStatement();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(response);
        })
}

export function saveCompany() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'companies': admin.companies.filter((company) => typeof company.status !== "undefined" && company.status != 3),
        'type_request': 'companies_change',
    }
    axios
        .post('https://' + host + '/companies', request)
        .then((response) => {
            getCompany();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(request, response);
        })
}

export function savePosition() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'positions': admin.positions.filter((position) => typeof position.status !== "undefined" && position.status != 3),
        'type_request': 'positions_change',
    }
    axios
        .post('https://' + host + '/positions', request)
        .then((response) => {
            getPosition();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(request, response);
        })
}

export function saveNotification() {
    let notifications = [];
    for (var key of Object.keys(admin.notify)) {
        if (typeof admin.notify[key].status !== "undefined" && admin.notify[key].status != 3) notifications.push(admin.notify[key])
    }
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'notifications': notifications,
        'type_request': 'notifications_change',
    }
    axios
        .post('https://' + host + '/notifications', request)
        .then((response) => {
            getPosition();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(request, response);
        })
}