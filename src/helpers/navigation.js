import router from '../router';

export function logOut() {
    localStorage.removeItem('skos-token');
    localStorage.removeItem('skos-dir');
    router.push('/');
}