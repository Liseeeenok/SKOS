import { useStore } from '../stores/PlanStore';
import router from '../router';

const admin = useStore();

export function changeMenu(chapter) {
    admin.menu = chapter;
    localStorage.setItem('skos-menu', chapter);
    admin.menuStatus = 'main';
    localStorage.setItem('skos-menu-status', 'main');
    router.push(`/${chapter}`);
}

export function logOut() {
    localStorage.removeItem('skos-token');
    localStorage.removeItem('skos-dir');
    admin.isAuth = false;
    router.push('/');
}