import axios from 'axios';
import { useStore } from '../stores/PlanStore';
import router from '../router';

const host = 'mypew.ru:7070'; //имя или ip хоста api
const admin = useStore();

export function getDirection() {
    axios.get('https://'+host+'/directions').then(response => {admin.directions = response.data});
}

export function getDivision() {
    axios.get('https://'+host+'/divisions').then(response => {admin.divisions = response.data});
}

export function getProfession() {
    axios.get('https://'+host+'/professions?type=full').then(response => {admin.professions = response.data});
}

export function getRole() {
    let request = {
        jwt: localStorage.getItem('skos-token'),
        type_request: 'roles_info',
    };
    axios.post('https://'+host+'/roles', request).then(response => {admin.roles = response.data});
}

export function saveDirection() {
    let request = {
        jwt: localStorage.getItem('skos-token'),
        directions: admin.directions.filter((direction) => typeof direction.status !== "undefined" && direction.status != 3),
    };
    axios
        .post('https://' + host + '/directions', request)
        .then((response) => {
            getDirection();
        })
}

export function saveDivision() {
    let request = {
        jwt: localStorage.getItem('skos-token'),
        divisions: admin.divisions.filter((division) => typeof division.status !== "undefined" && division.status != 3),
    };
    axios
        .post('https://' + host + '/divisions', request)
        .then((response) => {
            getDivision();
        })
}

export function saveRole() {
    let request = {
        jwt: localStorage.getItem('skos-token'),
        type_request: 'roles_change',
        roles: admin.roles.filter((role) => typeof role.status !== "undefined" && role.status != 3),
    };
    axios
        .post('https://' + host + '/roles', request)
        .then((response) => {
            getRole();
        })
}

export function saveProfession() {
    let request1 = {
        jwt: localStorage.getItem('skos-token'),
        professions: admin.professions.filter((profession) => typeof profession.status !== "undefined" && profession.status != 3),
    };
    let trig = 0;
    axios
        .post('https://' + host + '/professions', request1)
        .then((response) => {
            console.log(request1, response);
            trig == 2 ? getProfession() : trig = 1;
        });
    
    let profession_groups = [];
    admin.professions.forEach(element => {
        let groups = element.groups.filter((group) => typeof group.status !== "undefined" && group.status != 3);
        profession_groups = profession_groups.concat(groups);
    });
    let request2 = {
        jwt: localStorage.getItem('skos-token'),
        profession_groups: profession_groups,
    };
    axios
        .post('https://' + host + '/profession_groups', request2)
        .then((response) => {
            console.log(request2, response);
            trig == 1 ? getProfession() : trig = 2;
        });
}