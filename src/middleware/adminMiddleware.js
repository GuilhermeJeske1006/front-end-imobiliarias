export default function adminMiddleware(to, from, next) {
  const isAuthenticated =
    localStorage.getItem("token") !== null &&
    localStorage.getItem("empresa_id") !== null &&
    localStorage.getItem("usuario_id") !== null;
    localStorage.getItem("is_master") !== 1;

  if (isAuthenticated) {
    next(); 
  } else {
    next('/login'); 
  }
}
