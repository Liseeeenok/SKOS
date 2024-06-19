import axios from 'axios';
import { useStore } from '../stores/PlanStore';
import router from '../router';

const host = 'mypew.ru:7070'; //имя или ip хоста api
const admin = useStore();
const date = new Date();

export function max(a ,b) {
    return a > b ? a : b;
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
            console.log(admin.professions);
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
        .then(response => {admin.professions = response.data});
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

export function saveDirection() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'directions': admin.directions.filter((direction) => typeof direction.status !== "undefined" && direction.status != 3),
    };
    axios
        .post('https://' + host + '/directions', request)
        .then((response) => {
            getDirection();
        })
}

export function saveDivision() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'divisions': admin.divisions.filter((division) => typeof division.status !== "undefined" && division.status != 3),
    };
    axios
        .post('https://' + host + '/divisions', request)
        .then((response) => {
            getDivision();
        })
}

export function saveRole() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'roles_change',
        'roles': admin.roles.filter((role) => typeof role.status !== "undefined" && role.status != 3),
    };
    axios
        .post('https://' + host + '/roles', request)
        .then((response) => {
            getRole();
        })
}

export function saveProfession() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'professions': admin.professions.filter((profession) => typeof profession.status !== "undefined" && profession.status != 3),
    };
    axios
        .post('https://' + host + '/professions', request)
        .then((response) => {
            saveProfessionGroup();
        });
    
}

export async function saveProfessionGroup() {
    let profession_groups = [];
    admin.professions.forEach(element => {
        let groups = element.groups.filter((group) => {
            group.name_prof = element.name;
            return typeof group.status !== "undefined" && group.status != 3;
        });
        profession_groups = profession_groups.concat(groups);
    });
    await getProfessionAsync();
    let idName = {};
    admin.professions.forEach((element) => {idName[element.name] = element.id});
    profession_groups.forEach((element) => {element.id_profession = idName[element.name_prof]});
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'profession_groups': profession_groups,
    };
    axios
        .post('https://' + host + '/profession_groups', request)
        .then((response) => {
            getProfession();
        });
}

export function saveSection() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'sections': admin.sections.filter((section) => typeof section.status !== "undefined" && section.status != 3),
    };
    axios
        .post('https://' + host + '/sections', request)
        .then((response) => {
            getSection();
        })
}

export function saveUsers() {
    let answer = users.value.filter((user) => typeof user.status !== "undefined" && user.status != 3);
    let count = 0;
    for(let ans of answer) {
        let request = {
            'jwt': localStorage.getItem('skos-token'),
            'type_request': 'user_change',
            'user': ans,
        }
        axios
            .post('https://' + host + '/accounts', request)
            .then((response) => {
                count++;
                if (count == answer.length) router.go(0);
            })
    };
}

export function getPlan() {
    localStorage.setItem('skos-year', admin.academic_year)
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'request_type': 'VIEW',
        'academic_year': admin.academic_year,
        'table_type': 2,
    };
    axios
        .post('https://'+host+'/table', request)
        .then(response => {
            admin.plan = response.data;
            console.log(response.data);
        });
}

export function savePlan() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'request_type': "SAVE",
        'training_list': [],
        'academic_year': admin.plan.arr_plan.year,
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
    console.log('answer:');
    console.log((request));
    console.log('answer string:');
    console.log(JSON.stringify(request));
    axios
        .post('https://' + host + '/table', request)
        .then((response) => {
            getPlan();
            if (response.data == 'OK') alert('Успешно сохранено!');
            else console.log(response);
        })
}