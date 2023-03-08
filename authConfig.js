const passportConfig = {
    credentials: {
        tenantID: "a7bae7fa-0df1-4562-a554-16a95f54c8ce",
        clientID: "d76f4c48-fcf4-4182-ba25-6b92e5ba3e7f"
    },
    metadata: {
        authority: "login.microsoftonline.com",
        discovery: ".well-known/openid-configuration",
        version: "v2.0"
    },
    settings: {
        validateIssuer: true,
        passReqToCallback: true,
        loggingNoPII: true,
    },
    // protectedRoutes: {
    //     todolist: {
    //         endpoint: "/api/todolist",
    //         delegatedPermissions: {
    //             read: ["Todolist.Read", "Todolist.ReadWrite"],
    //             write: ["Todolist.ReadWrite"]
    //         },
    //         applicationPermissions: {
    //             read: ["Todolist.Read.All", "Todolist.ReadWrite.All"],
    //             write: ["Todolist.ReadWrite.All"]
    //         }
    //     }
    // }
}

module.exports = passportConfig;
