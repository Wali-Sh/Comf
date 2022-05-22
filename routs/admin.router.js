const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongodb = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongodb],
  rootPath: '/admin',
})
const ADMIN = {
    email:  'shokrullahw8@gmail.com',
    password: 'Wali1078$'
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'super-secret-and-long-password-for-admin',
    authenticate: async (email, password) => {
        if(email === ADMIN.email && password === ADMIN.password){
            return ADMIN;
        }
        return null;  
    }
})

module.exports = router