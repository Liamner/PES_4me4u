// ======================
// PUERTO
// ======================

process.env.PORT = process.env.PORT || 5000;

// ======================
// ENTORNO
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// BASE DE DATOS
// ======================
let urlDB = "";
urlDB = "mongodb+srv://admin:1234@4me4u.4lr2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
process.env.URLDB = urlDB;

// ======================
// CADUCIDAD DEL TOKEN
// ======================

process.env.CADUCIDAD_TOKEN = '48h';

// ======================
// SEED DE AUTENTICACIÓN
// ======================

process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';
