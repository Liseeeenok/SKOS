import axios from 'axios';
import { useStore } from '../stores/PlanStore';
import router from '../router';

const host = 'mypew.ru:7070'; //имя или ip хоста api
const admin = useStore();

export function max(a ,b) {
    return a > b ? a : b;
}

export function getDirection() {
    axios.get('https://'+host+'/directions').then(response => {admin.directions = response.data});
}

export function getDivision() {
    axios.get('https://'+host+'/divisions').then(response => {admin.divisions = response.data});
}

export function getProfession() {
    axios.get('https://'+host+'/professions?type=full').then(response => {admin.professions = response.data});
}

export async function getProfessionAsync() {
    await axios.get('https://'+host+'/professions?type=full').then(response => {admin.professions = response.data});
}

function getSection() {
    axios.get('https://'+host+'/sections').then(response => {sections.value = response.data;});
}

export function getRole() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'type_request': 'roles_info',
    };
    axios.post('https://'+host+'/roles', request).then(response => {admin.roles = response.data});
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

function saveSection() {
    let request = {
        'jwt': localStorage.getItem('skos-token'),
        'sections': sections.value.filter((section) => typeof section.status !== "undefined" && section.status != 3),
    };
    axios
        .post('https://' + host + '/sections', request)
        .then((response) => {
            getSection();
        })
}