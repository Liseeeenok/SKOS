import { useStore } from '../stores/PlanStore';
import router from '../router';

const admin = useStore();

export function changeMenu(chapter, menuId = -1) {
    admin.menu = chapter;
    localStorage.setItem('skos-menu', chapter);
    if (menuId !== -1) {
        admin.menuId = menuId;
        localStorage.setItem('skos-menu-id', menuId);
    }
    router.push(`/${chapter}`);
}

export function logOut() {
    localStorage.removeItem('skos-token');
    localStorage.removeItem('skos-dir');
    admin.isAuth = false;
    router.push('/');
}