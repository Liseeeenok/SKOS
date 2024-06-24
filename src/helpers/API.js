import axios from 'axios';
import { useStore } from '../stores/PlanStore';
import router from '../router';

const host = 'mypew.ru:7070'; //имя или ip хоста api
const admin = useStore();

export function preLoad() {
    getDirection();
    getDivision();
    getProfession();
    getSection();
    getRole();
    getUser();
    getUsers();
    getPlan();
    getStatement();
}

export function getDirection() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'directions_info',
    };
    axios
        .post('https://'+host+'/directions', request)
        .then(response => {admin.directions = response.data});
}

export function getDivision() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'divisions_info',
    };
    axios
        .post('https://'+host+'/divisions', request)
        .then(response => {admin.divisions = response.data});
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
            let professions = response.data;
            professions.forEach((element) => {
                admin.professions[element.id] = element;
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
        .then(response => {admin.sections = response.data});
}

export function getRole() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'roles_info',
    };
    axios.post('https://'+host+'/roles', request).then(response => {
        admin.roles = response.data;
        admin.role = admin.roles.find(x => x.id == admin.roleId);
        console.log(admin.role);
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
    console.log(request);
    axios
        .post('https://'+host+'/notifications', request)
        .then(response => {
            admin.notify = response.data;
            console.log(response.data);
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
            console.log(response.data);
        });
}
//---------------------------------------------------------------------------------------------------
//--------------------------------------------------SAVE---------------------------------------------
//---------------------------------------------------------------------------------------------------

export function saveDirection() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'directions': admin.directions.filter((direction) => typeof direction.status !== "undefined" && direction.status != 3),
        'request_type': 'directions_change',
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
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'divisions': admin.divisions.filter((division) => typeof division.status !== "undefined" && division.status != 3),
        'request_type': 'divisions_change',
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
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'roles': admin.roles.filter((role) => typeof role.status !== "undefined" && role.status != 3),
        'type_request': 'roles_change',
    };
    axios
        .post('https://' + host + '/roles', request)
        .then((response) => {
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
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'sections': admin.sections.filter((section) => typeof section.status !== "undefined" && section.status != 3),
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

export function saveUsers(idx) {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'user': admin.users[idx],
        'type_request': 'user_change',
    }
    axios
        .post('https://' + host + '/accounts', request)
        .then((response) => {
            getUsers();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(request, response);
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
            getUsers();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(request, response);
        })
}